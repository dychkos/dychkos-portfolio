# Landing and Blog "ebook" Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Rebuild the public site (landing page, shared shell, blog list, blog post) in the approved ebook style without changing any copy.

**Architecture:** New site tokens live next to (not instead of) the shadcn variables, so admin pages keep their look. A small set of shared client pieces (chapter context, scroll spy, scroll progress, reveal, contents list, header, footer, reading layout) wraps every `app/[locale]` page. Logic that can be tested without a browser (phone groups, scramble frames, year grouping, adjacent posts, date format, heading extraction) lives in import-free modules under `lib/site/` and is covered by `node --test`.

**Tech Stack:** Next.js 14.2.3 app router, TypeScript, Tailwind 3.4, next-themes, next-intl 3, next-mdx-remote 6 with rehype-slug and rehype-pretty-code (shiki), react-icons, Node 24 built-in test runner.

**Spec:** `docs/superpowers/specs/2026-10-20-landing-redesign-design.md`. Mockups: `docs/superpowers/specs/2026-10-20-landing-redesign-mockup.html` and `docs/superpowers/specs/2026-10-20-blog-mockup.html`. Read the spec first. Where this plan and the mockups disagree, the spec wins.

## Global Constraints

- No copy changes. Every visible string comes from `locales/en.json` / `locales/ua.json` as it is today. The only new keys are `Site.contents` ("Contents" / "Зміст") and `Site.hi` ("Hi" / "Привіт").
- No UPPERCASE styling (`uppercase`, `tracking-widest` caps labels). Locale codes "UA"/"EN" come from the existing `LocaleSwitcher.locale` message and are fine.
- No bento tiles, glow, gradient text, stats rows, status pills, terminal blocks.
- Fonts: Onest 400/500/600 and JetBrains Mono 400/500 via `next/font/google`, subsets `latin` and `cyrillic`.
- Light tokens: bg `#f7f7f8`, surface `#ffffff`, ink `#18181b`, soft `#6a6a73`, line `#18181b14`, grid `#18181b0b`, accent `#3563e9`, accent-soft `#3563e914`, online `#22a55a`.
- Dark tokens: bg `#18181b`, surface `#1f1f23`, ink `#f1f1f3`, soft `#9b9ba6`, line `#ffffff14`, grid `#ffffff09`, accent `#7b9cff`, accent-soft `#7b9cff1a`, online `#22a55a`.
- Do not change the shadcn HSL variables or Tailwind `fontFamily.sans`. `app/admin` and `app/login` must look exactly as before.
- `prefers-reduced-motion: reduce` turns every animation off and shows all content at once.
- Desktop breakpoint for the contents column is 1000px (`min-[1000px]:` variant).
- Tests run on Node 24 with `npm test`. Test files live in `tests/`, which is excluded from `tsconfig.json`. Modules under `lib/site/` may only use `import type` and bare package imports (no `@/` aliases), so Node can load them directly.

## Review Focus

1. Ukrainian posts. The in-article table of contents heading is "Зміст" (id `зміст`), not "Table of Contents". The post contents list must skip both, and Cyrillic heading ids must match the ids rehype-slug puts in the HTML. Pinned by `extractHeadings` tests in Task 6.
2. Landing from another page via `/#contact` or `/#experience`. The target section must be visible after the jump, and content that is on screen at first paint must never flash hidden. Without JavaScript all content shows. Pinned by the manual checks in Task 2.
3. Theme toggle when the theme is "system" (the default). The icon and the click must follow `resolvedTheme`, not `theme`. Pinned by the manual check in Task 2.
4. Moving the mouse quickly in and out of the phone row. The digits must always end on `404 25 36` after the cursor leaves. Pinned by the manual check in Task 4.
5. First and last post, and a locale with a single post. Previous/next cards must not crash or link to a missing post. Pinned by `getAdjacentPosts` tests in Task 5.

---

### Task 1: Tokens, fonts, test runner, translation keys

**Files:**
- Modify: `package.json` (scripts, dependency)
- Modify: `tsconfig.json` (exclude `tests`)
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`
- Modify: `app/[locale]/layout.tsx` (fonts and body classes only in this task)
- Modify: `locales/en.json`, `locales/ua.json`
- Create: `tests/smoke.test.ts`

**Interfaces:**
- Produces: Tailwind colors `site-bg`, `site-surface`, `site-ink`, `site-soft`, `site-line`, `site-grid`, `site-accent`, `site-accent-soft`, `site-online` (class names like `bg-site-bg`, `text-site-soft`, `border-site-line`). Font families `font-site` and `font-site-mono`. CSS variables `--font-onest`, `--font-jetbrains-mono`. CSS classes `site-grid-bg`, `reveal`, `is-shown`, `draw-line`, `logo-mask` (defined below). Translation keys `Site.contents`, `Site.hi`. Script `npm test`.

- [ ] **Step 1: Install dependencies**

Run: `npm ci`
Expected: exits 0 and runs `prisma generate`.

- [ ] **Step 2: Add the test runner and slugger**

In `package.json` add the script `"test": "node --test 'tests/**/*.test.ts'"` and the dependency `"github-slugger": "^2.0.0"` (the version rehype-slug 6 uses). Run `npm install`. In `tsconfig.json` set `"exclude": ["node_modules", "tests"]`.

Create `tests/smoke.test.ts` with one passing test (`assert.equal(1, 1)`) so the runner is proven before real tests arrive. Delete it in Task 4 once real tests exist.

Run: `npm test`
Expected: `pass 1`, `fail 0`.

- [ ] **Step 3: Add the tokens**

In `app/globals.css` add `--site-*` variables on `:root` and `.dark` with the Global Constraints values. Leave the shadcn blocks untouched.

In `tailwind.config.ts` add `colors.site` mapping each name to `var(--site-<name>)`, and `fontFamily.site = ['var(--font-onest)', 'system-ui', 'sans-serif']`, `fontFamily['site-mono'] = ['var(--font-jetbrains-mono)', 'ui-monospace', 'monospace']`.

- [ ] **Step 4: Add the shared CSS classes**

In `app/globals.css` under `@layer components`:
- `.site-grid-bg`: 28px grid from two 1px `var(--site-grid)` linear gradients, masked with `radial-gradient(70% 70% at 30% 30%, #000 30%, transparent 80%)` (plus `-webkit-mask-image`).
- `.reveal`: inside `@media (prefers-reduced-motion: no-preference)` only, `html.reveal-ready .reveal:not(.is-shown)` has `opacity: 0; translate: 0 14px`, and `.reveal` transitions opacity and translate over 0.7s ease.
- `.draw-line`: a 1px top hairline drawn as a pseudo element with `transform-origin: left`. Inside the same media query, `html.reveal-ready .reveal:not(.is-shown) .draw-line::before` has `scale: 0 1`, transition 0.9s `cubic-bezier(.2,.7,.2,1)`.
- `.logo-mask`: `background: currentColor; mask: var(--src) center / contain no-repeat;` plus the `-webkit-mask` form.

- [ ] **Step 5: Load the fonts**

In `app/[locale]/layout.tsx` replace `Inter` with `Onest({ subsets: ['latin', 'cyrillic'], weight: ['400', '500', '600'], variable: '--font-onest' })` and `JetBrains_Mono({ subsets: ['latin', 'cyrillic'], weight: ['400', '500'], variable: '--font-jetbrains-mono' })`. Body classes: both `.variable`s, `font-site flex min-h-full flex-col bg-site-bg text-site-ink antialiased`.

- [ ] **Step 6: Add translation keys**

`locales/en.json`: `"Site": { "contents": "Contents", "hi": "Hi" }`. `locales/ua.json`: `"Site": { "contents": "Зміст", "hi": "Привіт" }`.

- [ ] **Step 7: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.
Run `npm run dev`. Open `/en`: text renders in Onest on `#f7f7f8`. Open `/admin` (log in if needed) and `/login`: they look as before.

- [ ] **Step 8: Commit**

```bash
git add package.json package-lock.json tsconfig.json app/globals.css tailwind.config.ts "app/[locale]/layout.tsx" locales/en.json locales/ua.json tests/smoke.test.ts
git commit -m "add site tokens, fonts and test runner for redesign"
```

---

### Task 2: Shared shell

**Files:**
- Create: `components/site/ChapterProvider.tsx`
- Create: `hooks/useScrollSpy.ts`, `hooks/useScrollProgress.ts`
- Create: `components/site/ReadingProgress.tsx`
- Create: `components/site/Reveal.tsx`
- Create: `components/site/ReadingLayout.tsx`
- Create: `components/site/ContentsNav.tsx`
- Create: `components/site/SectionHeading.tsx`
- Create: `components/site/ThemeToggle.tsx`, `components/site/LocaleToggle.tsx`
- Create: `components/site/SiteHeader.tsx`, `components/site/SiteFooter.tsx`
- Modify: `components/ui/BurgerButton.tsx` (render a `<button type="button" aria-expanded>` instead of a `div`)
- Modify: `app/[locale]/layout.tsx` (use the new shell, drop `Header`, `Footer`, `GetInTouch`)

**Interfaces:**
- Consumes: Task 1 tokens and CSS classes.
- Produces:
  - `ChapterProvider({ children })` and `useChapter(): { label: string; setLabel: (label: string) => void }`. Initial label `''`.
  - `useScrollSpy(ids: string[], rootMargin?: string): string | null`, default rootMargin `'-40% 0px -55% 0px'`. Returns the id of the last observed element that entered the band.
  - `useScrollProgress(): number`, 0 to 1, `scrollY / (scrollHeight - innerHeight)`, clamped, passive listener.
  - `ReadingProgress()`: fixed 2px `bg-site-accent` bar at the top, width = progress.
  - `Reveal({ as?: 'section' | 'div'; id?: string; className?: string; children })`: renders the element with class `reveal`. In a layout effect (`typeof window === 'undefined' ? useEffect : useLayoutEffect`, so React 18 does not warn during SSR) it adds `is-shown` immediately if the element intersects the viewport, then adds `reveal-ready` to `<html>`. An IntersectionObserver (threshold 0.12) adds `is-shown` once and disconnects.
  - `ContentsItem = { id: string; label: string; num?: string; level?: 2 | 3 }`.
  - `ContentsNav({ title: string; items: ContentsItem[]; rootMargin?: string })`: sticky list, active item from `useScrollSpy`. Sets the chapter label to `` `${num} · ${label}` `` when `num` exists, else `label`. Active entry is `text-site-ink` with an accent number (or a 5px accent dot when there is no number). Level 3 entries are indented 12px and 12.5px. A 1px track under the list fills with `useScrollProgress`. Clicking scrolls smoothly (html `scroll-behavior: smooth` is already set).
  - `ReadingLayout({ aside?: ReactNode; children })`: container `max-w-[1080px] px-6`, grid `min-[1000px]:grid-cols-[200px_minmax(0,640px)] gap-16`. Aside is `hidden min-[1000px]:block`, sticky at `top-[84px]`, `pt-[72px]`, `max-h-[calc(100vh-100px)] overflow-auto`.
  - `SectionHeading({ num: string; title: string; lead?: string })`: mono accent num (12px), h2 30px/600/-0.6px, lead 17px soft.
  - `SiteHeader()` and `SiteFooter()` as described in the spec "Shell" section.

- [ ] **Step 1: Write the context and hooks**

`ChapterProvider` and `useChapter` in `components/site/ChapterProvider.tsx` (`'use client'`). `useScrollSpy` and `useScrollProgress` in `hooks/`. Both hooks must clean up observers and listeners on unmount and must not read `window` during render.

- [ ] **Step 2: Write `Reveal`, `ReadingProgress`, `ReadingLayout`, `SectionHeading`, `ContentsNav`**

Signatures and behavior as in Interfaces.

- [ ] **Step 3: Write the toggles**

`ThemeToggle`: client, mounted guard, uses `resolvedTheme` to pick the icon (`RiMoonLine` in light, `RiSunLine` in dark) and to choose the next theme. Small bordered button (`rounded-lg border border-site-line px-2 py-1`), `aria-label={t('Header.switch-theme')}`.

`LocaleToggle`: client, shows the other locale via `t('LocaleSwitcher.locale', { locale: other })`, on click `router.replace(pathname, { locale: other })` from `@/lib/navigation` inside `startTransition`. Same button style, mono 12px.

- [ ] **Step 4: Write `SiteHeader` and `SiteFooter`**

Header: `sticky top-0 z-10 backdrop-blur-md bg-[color-mix(in_oklab,var(--site-bg)_82%,transparent)] border-b border-site-line`. Inner row `max-w-[1080px] px-6 py-3`, 14px. Left to right: brand `dychkos` (600, links to `/`), chapter label (mono 12px soft, hidden when empty and below `md`), nav links `Header.about` → `/#about`, `Header.experience` → `/#experience`, `Header.blog` → `/blog`, `Header.contact` → `/#contact` (soft, ink on hover, use `Link` from `@/lib/navigation`), `Header.get-cv` + ` ↓` as `<a href="/CV.pdf" target="_blank" rel="noopener">` in accent 500, `LocaleToggle`, `ThemeToggle`. Below `md` the nav is in a dropdown panel opened by `BurgerButton`, which closes on link click and locks body scroll like the old `Header`.

Footer: `max-w-[1080px] mx-auto mt-auto border-t border-site-line px-6 pt-6 pb-10`, `Footer.main` left, current year in mono right, both 13px soft.

- [ ] **Step 5: Wire the layout**

In `app/[locale]/layout.tsx` render inside `Providers`: `ChapterProvider` > `ReadingProgress`, `SiteHeader`, `{children}`, `SiteFooter`. Remove `Header`, `Footer` and `GetInTouch` imports (Get In Touch moves into the landing page in Task 4). Keep `generateStaticParams` and `unstable_setRequestLocale`.

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.

Manual, with `npm run dev`:
- Header and footer show on `/en`, `/ua`, `/en/blog`, `/en/posts`, `/en/events`. Not on `/admin` or `/login`.
- With the OS in dark mode and no stored theme, the toggle shows the sun icon and one click switches to light. Repeat with the OS in light mode.
- UA/EN switches locale and keeps the current path.
- At 360px width the header fits on one line and the burger menu opens and closes.
- Disable JavaScript in devtools and reload `/en`: everything is visible.

- [ ] **Step 7: Commit**

```bash
git add components/site hooks components/ui/BurgerButton.tsx "app/[locale]/layout.tsx"
git commit -m "add ebook site shell: header, footer, contents, reveal"
```

---

### Task 3: Landing hero, About, Skills, Experience

**Files:**
- Modify: `components/index/Preview.tsx`, `components/index/About.tsx`, `components/index/Skills.tsx`, `components/index/Experience.tsx`
- Modify: `app/[locale]/page.tsx`
- Create: `public/images/icon-mysql.svg`, `public/images/icon-elasticsearch.svg`, `public/images/icon-elasticsearch-dark.svg`

**Interfaces:**
- Consumes: `Reveal`, `ReadingLayout`, `ContentsNav`, `ContentsItem`, `SectionHeading` from Task 2.
- Produces: landing section ids `hero`, `about`, `skills`, `experience`, `notes`, `contact`, and the contents list built in `page.tsx`. Tasks 4 and 5 replace the `contact` and `notes` sections and must keep those ids.

- [ ] **Step 1: Assemble the page**

`app/[locale]/page.tsx` renders `<ReadingLayout aside={<ContentsNav title={t('Site.contents')} items={items} />}>` with sections in order: `Preview`, `About`, `Skills`, `Experience`, `PostsPreview`, `GetInTouch`. Items:

| id | num | label key |
|---|---|---|
| hero | 00 | `Site.hi` |
| about | 01 | `About.heading` |
| skills | 02 | `Skills.heading` |
| experience | 03 | `Experience.heading` |
| notes | 04 | `PostsPreview.heading` |
| contact | 05 | `GetInTouch.heading` |

Until Tasks 4 and 5, wrap the old `PostsPreview` and `GetInTouch` in `<div id="notes">` and `<div id="contact">` so the contents list works. Keep the existing `metadata` export.

- [ ] **Step 2: Hero (`Preview.tsx`)**

`Reveal as="section" id="hero"`, relative, `pt-[72px]`, with an absolutely positioned `site-grid-bg` layer behind it (`-z-10`, inset `0 -60px -40px`). Row: `/images/me.jpg` 76px, `rounded-[18px]`, `object-cover`, next to a mono 12.5px soft block with `Preview.locale` and the availability line. Availability: compute `isWorkingHoursInUkraine()` in `useEffect` after mount (the page is statically rendered, so computing it during render causes a hydration mismatch). Before mount render nothing for that line. Online: 7px `bg-site-online` dot + `availability-yes`. Offline: 7px `bg-site-soft` dot + `availability-no`.
h1 `Preview.greeting` (52px desktop, 40px below `sm`, 600, `-1.6px`, leading 1.05). Paragraph `Preview.about` 18px soft, max 600px. Links row (15px, 500, gap 22px): `Header.get-cv` + `↓` to `/CV.pdf` in accent with accent underline, then GitHub `https://github.com/dychkos`, LinkedIn `https://www.linkedin.com/in/dychkos/`, Instagram `https://instagram.com/dychkos`, each with `↗`. Underline is a 1px `border-b border-site-line` that turns ink on hover. Arrows sit in a `span` with `inline-block transition-transform group-hover:translate-x-[3px]`. The link labels "GitHub", "LinkedIn", "Instagram" are brand names, not copy.

- [ ] **Step 3: About**

`Reveal as="section" id="about"`, `SectionHeading num="01" title={About.heading} lead={About.title}`. No photo. Then `body.0`, `body.1`, `avocation`. Two chips (Running → `https://www.runtastic.com/user/Q59CQ2ZBAVRS3NZN` with `adidas-logo.svg`, Sport → `https://hevy.com/user/dychkos` with `hevy-logo.svg`): `rounded-[10px] border border-site-line bg-site-surface`, hover border and text accent. Logos are `<span className="logo-mask h-[22px] w-[22px]" style={{ '--src': 'url(/images/adidas-logo.svg)' }} aria-hidden />` so they follow the text color. Then `summary`, the four `main` items as a two-column list (one column below `sm`) with a soft dash marker, then `last-thing`.

- [ ] **Step 4: Skills**

Download the icons:

```bash
curl -fsSL -o public/images/icon-mysql.svg https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mysql/mysql-original.svg
curl -fsSL -o public/images/icon-elasticsearch.svg https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/elasticsearch/elasticsearch-original.svg
sed 's/#343741/#c7c9d1/g' public/images/icon-elasticsearch.svg > public/images/icon-elasticsearch-dark.svg
```

Open each SVG and confirm it contains no `<script>`. `skillsData` order: JavaScript, Laravel, NodeJS, React, Vue, Docker, MySQL (`icon-mysql.svg`), Elasticsearch (`icon-elasticsearch.svg`, plus `darkImage: 'icon-elasticsearch-dark.svg'`). Render `image` with `dark:hidden` and `darkImage` with `hidden dark:block` when present.
Section: `Reveal id="skills"`, `SectionHeading num="02"`. Grid `grid-cols-2 sm:grid-cols-4` with hairline cell borders (top/left on the grid, right/bottom on cells), cell 18px/10px/14px padding, 34px icon, 13px soft label, hover `bg-site-accent-soft` and ink label, icon lifts 2px. Below: `Skills.combo` + ` ` + `Laravel + React` in accent 600, 17px.

- [ ] **Step 5: Experience**

`Reveal id="experience"`, `SectionHeading num="03"`. Iterate `messages.Experience.companies` (not `Array(4)`). Row: `draw-line` relative, grid `44px 1fr`, gap 16px, py 20px. Logo 44px `rounded-[11px]` with plate from:

```ts
const LOGO_PLATES: Record<string, { plate: string; pad: boolean }> = {
  Appflame: { plate: '#000000', pad: false },
  NewGen: { plate: '#0f1834', pad: false },
  FluidWeb: { plate: '#ffffff', pad: true },
  GrandySoft: { plate: '#18181b', pad: true },
};
```

`pad: false` → `object-cover`. `pad: true` → `object-contain p-[5px]`. Every logo gets `shadow-[inset_0_0_0_1px_var(--site-line),0_0_0_1px_var(--site-line)]`. Unknown names fall back to `{ plate: '#ffffff', pad: true }`. Right side: role (17px, 500, accent on row hover) with period in mono 12px soft on the right (wraps under on narrow screens), company name 14px soft, responsibilities as a soft 15px bullet list.

- [ ] **Step 6: Verify**

Run: `npx tsc --noEmit && npm run lint`
Expected: no errors.
Manual on `/en` and `/ua`, light and dark, desktop and 360px: matches the landing mockup for sections 00 to 03. Contents list highlights the section in view and the header label reads like `03 · My Experience` (`03 · Досвід`-style text from ua.json on `/ua`). Running and Sport icons are visible in dark mode. GrandySoft's white parts are visible in light mode. Elasticsearch's grey bar is visible in dark mode. The hero h1 does not overflow at 360px in either locale.

- [ ] **Step 7: Commit**

```bash
git add components/index/Preview.tsx components/index/About.tsx components/index/Skills.tsx components/index/Experience.tsx "app/[locale]/page.tsx" public/images/icon-mysql.svg public/images/icon-elasticsearch.svg public/images/icon-elasticsearch-dark.svg
git commit -m "redesign landing hero, about, skills and experience"
```

---

### Task 4: Get In Touch and the phone easter egg

**Files:**
- Create: `lib/site/phone.ts`, `lib/site/scramble.ts`
- Create: `tests/phone.test.ts`, `tests/scramble.test.ts`
- Delete: `tests/smoke.test.ts`
- Create: `components/site/PhoneEgg.tsx`
- Modify: `components/index/GetInTouch.tsx`
- Modify: `app/[locale]/page.tsx` (drop the temporary `contact` wrapper)

**Interfaces:**
- Consumes: `Reveal`, `SectionHeading`.
- Produces:
  - `PHONE_RAW = '+380734042536'`, `EMAIL = 'dychkos@proton.me'`, `type PhoneGroup = { text: string; egg?: string }`, `PHONE_GROUPS: PhoneGroup[]` in `lib/site/phone.ts`.
  - `SCRAMBLE_CHARS = '0123456789#%&*'` and `scrambleFrame(from: string, to: string, step: number, steps: number, rand: () => number): string` in `lib/site/scramble.ts`.

- [ ] **Step 1: Write the failing tests**

`tests/phone.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { PHONE_RAW, PHONE_GROUPS } from '../lib/site/phone.ts';

test('groups join back to the raw number', () => {
  assert.equal(PHONE_RAW, '+380734042536');
  assert.equal(PHONE_GROUPS.map((g) => g.text).join(''), PHONE_RAW);
  assert.equal(PHONE_GROUPS.map((g) => g.text).join(' '), '+380 73 404 25 36');
});

test('eggs sit on 404, 25 and 36 only', () => {
  assert.deepEqual(
    PHONE_GROUPS.map((g) => g.egg ?? null),
    [null, null, 'not found', '5²', '6²']
  );
});
```

`tests/scramble.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { scrambleFrame, SCRAMBLE_CHARS } from '../lib/site/scramble.ts';

const zero = () => 0;

test('last step is the target text', () => {
  assert.equal(scrambleFrame('404', 'not found', 10, 10, zero), 'not found');
  assert.equal(scrambleFrame('not found', '404', 10, 10, zero), '404');
});

test('first step is all scramble characters, spaces kept', () => {
  const f = scrambleFrame('404', 'not found', 0, 10, zero);
  assert.equal(f.length, 9);
  assert.equal(f[3], ' ');
  for (const [i, ch] of [...f].entries()) if (i !== 3) assert.ok(SCRAMBLE_CHARS.includes(ch));
});

test('settled prefix grows with the step', () => {
  const f = scrambleFrame('404', 'not found', 5, 10, zero);
  assert.ok(f.startsWith('not '));
});
```

Delete `tests/smoke.test.ts`.

- [ ] **Step 2: Run the tests to see them fail**

Run: `npm test`
Expected: FAIL, cannot find `lib/site/phone.ts`.

- [ ] **Step 3: Implement both modules**

`scrambleFrame`: `len = max(from.length, to.length)`, `done = floor(len * step / steps)`. If `step >= steps` return `to`. Otherwise for each `i < len`: `i < done` → `to[i] ?? ''`, else `to[i] === ' '` → `' '`, else `SCRAMBLE_CHARS[floor(rand() * SCRAMBLE_CHARS.length)]`.

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: all pass.

- [ ] **Step 5: Write `PhoneEgg`**

Client component, `PhoneEgg({ active: boolean })`, renders `PHONE_GROUPS` as spans with `gap-[0.32em]` in an `inline-flex`. When `active` turns true, each group with an egg animates from its current text to `egg` with 10 frames 28ms apart, group i starting `i * 90`ms after the first. When `active` turns false, back to `text`, `i * 60`ms apart. A generation counter in a ref is bumped on every change, and pending timeouts or intervals of an older generation do nothing and are cleared. Groups with eggs are accent while active. With `prefers-reduced-motion: reduce` (check with `matchMedia`), swap text instantly. All timers are cleared on unmount.

- [ ] **Step 6: Rewrite `GetInTouch`**

`Reveal as="section" id="contact"`, `SectionHeading num="05" title={heading} lead={title}`. Surface card (`rounded-2xl border border-site-line bg-site-surface px-[26px] py-1.5`) with two rows separated by a hairline: email value 17px/500 and mono 12px soft hint `email`, phone `<PhoneEgg active={hovered || tapped} />` and hint `phone`. Row `flex flex-wrap justify-between gap-x-4 gap-y-1 py-3.5 cursor-pointer`. Click copies `EMAIL` or `PHONE_RAW` (the old code copied `'+380734042536` with a stray apostrophe). On successful copy the hint reads `copied` for 1400ms. On rejection the hint does not change. The phone row sets `hovered` on mouse enter/leave and on `touchstart` sets `tapped` for 2200ms. Then `other` in soft, then Threads `https://www.threads.net/@dychkos`, X `https://x.com/SerhiiDychko`, Telegram `https://t.me/dychkos/` as text links with `↗`. Remove the old 5-second toggling egg.

In `page.tsx` render `<GetInTouch />` directly (it now carries `id="contact"`).

- [ ] **Step 7: Verify**

Run: `npm test && npx tsc --noEmit && npm run lint`
Expected: all pass, no errors.
Manual: hover the phone row: `404` becomes `not found`, `25` → `5²`, `36` → `6²`. Move the cursor in and out of the row 10 times fast, then leave: it ends on `+380 73 404 25 36`. Click: clipboard holds `+380734042536`. Open `/ua#contact` from another page: the section is visible.

- [ ] **Step 8: Commit**

```bash
git add lib/site/phone.ts lib/site/scramble.ts tests components/site/PhoneEgg.tsx components/index/GetInTouch.tsx "app/[locale]/page.tsx"
git commit -m "redesign get in touch with phone easter egg"
```

---

### Task 5: Post rows, latest notes, blog list

**Files:**
- Create: `lib/site/posts.ts`, `tests/posts.test.ts`
- Create: `components/site/PostRow.tsx`
- Modify: `components/index/PostsPreview.tsx`
- Modify: `app/[locale]/blog/page.tsx`
- Modify: `components/blog/SimplePaginationControl.tsx`
- Modify: `app/[locale]/page.tsx` (drop the temporary `notes` wrapper)

**Interfaces:**
- Consumes: `ReadingLayout`, `ContentsNav`, `Reveal`, `SectionHeading`, `BlogPostMetadata` from `lib/blog.ts`.
- Produces in `lib/site/posts.ts`:
  - `groupPostsByYear<T extends { date: string }>(posts: T[]): { year: string; posts: T[] }[]`, keeps input order, year from `new Date(date).getUTCFullYear()`.
  - `getAdjacentPosts<T extends { slug: string }>(posts: T[], slug: string): { newer: T | null; older: T | null }` for a newest-first list.
  - `formatPostDate(date: string, locale: 'en' | 'ua', withYear: boolean): string` with `toLocaleDateString(locale === 'ua' ? 'uk-UA' : 'en-US', { month: 'short', day: 'numeric', year: withYear ? 'numeric' : undefined, timeZone: 'UTC' })`.
  - `PostRow({ post: BlogPostMetadata; withYear: boolean; showDescription: boolean; readingLabel: string })`.

- [ ] **Step 1: Write the failing tests**

`tests/posts.test.ts` covers:
- `groupPostsByYear` of dates `2026-09-20`, `2025-11-22`, `2025-10-19` returns `[{ year: '2026', posts: [a] }, { year: '2025', posts: [b, c] }]`. Empty input returns `[]`.
- `getAdjacentPosts([a, b, c], 'b')` is `{ newer: a, older: c }`. For `'a'`: `{ newer: null, older: b }`. For `'c'`: `{ newer: b, older: null }`. For `'zzz'` and for a single-post list `[a]` with `'a'`: both null.
- `formatPostDate('2026-09-20', 'en', false)` is `'Sep 20'`. With `true` it is `'Sep 20, 2026'`. `formatPostDate('2026-01-01', 'en', true)` is `'Jan 1, 2026'` (no timezone shift).

- [ ] **Step 2: Run them to see them fail**

Run: `npm test`
Expected: FAIL, cannot find `lib/site/posts.ts`.

- [ ] **Step 3: Implement `lib/site/posts.ts`**

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: all pass.

- [ ] **Step 5: Write `PostRow`**

Link to `/${post.locale}/blog/${post.slug}`, `border-t border-site-line py-5`, grid `1fr auto`. Title 19px/500, accent on hover. Right: mono 12px soft `formatPostDate(...) · {readingTime} {readingLabel}`. Optional `description` in soft 15px on its own row. Tags as `rounded-md bg-site-accent-soft px-2 text-site-accent text-xs`.

- [ ] **Step 6: PostsPreview**

`Reveal as="section" id="notes"`, `SectionHeading num="04" title={heading} lead={title}`. Three latest posts as `PostRow withYear showDescription={false}`. Then `more` + ` →` in accent with the arrow nudge, linking to `/${locale}/blog`. No posts: `Blog.noPostsTitle` (the old code used a missing `PostsPreview.noPosts` key). In `page.tsx` render it directly.

- [ ] **Step 7: Blog list page**

Keep the data and pagination logic (`POSTS_PER_PAGE = 6`). Render `ReadingLayout` with `aside={<ContentsNav title={t('Site.contents')} items={years.map(y => ({ id: `y-${y.year}`, label: y.year }))} />}` where `years = groupPostsByYear(posts)` for the current page. Main: h1 `index.title` (44px, 600, -1.3px), lead `index.text` 18px soft, mono 12px `{totalPosts} {index.postCount}`. Then for each year: mono 12px soft label with `id="y-<year>"`, then `PostRow withYear={false} showDescription`. Empty state keeps `noPostsTitle` and `noPostsFound`, restyled to soft text without the emoji box styling (keep the emoji). The page sets `pt-[72px] pb-10` on main.

`SimplePaginationControls`: keep `createPageUrl` and the visible-pages logic, restyle to a row with a top hairline: previous on the left, page numbers in mono in the middle (current in ink, others soft), next on the right, disabled ends at 40% opacity. Still only rendered when `totalPages > 1`.

- [ ] **Step 8: Verify**

Run: `npm test && npx tsc --noEmit && npm run lint`
Expected: all pass.
Manual: `/en/blog` and `/ua/blog` match the blog list mockup in both themes. Year links in the contents list scroll to the groups. Landing section 04 shows three rows and "View more →".

- [ ] **Step 9: Commit**

```bash
git add lib/site/posts.ts tests/posts.test.ts components/site/PostRow.tsx components/index/PostsPreview.tsx "app/[locale]/blog/page.tsx" components/blog/SimplePaginationControl.tsx "app/[locale]/page.tsx"
git commit -m "redesign blog list and latest notes as post rows"
```

---

### Task 6: Blog post page

**Files:**
- Create: `lib/site/toc.ts`, `tests/toc.test.ts`
- Create: `components/blog/PostExtras.tsx`
- Modify: `app/[locale]/blog/[slug]/page.tsx`
- Modify: `components/MDXComponents.tsx`, `components/MDXContent.tsx`, `components/ui/CodeBlock.tsx`
- Modify: `app/globals.css` (code block line padding only if needed)

**Interfaces:**
- Consumes: `ReadingLayout`, `ContentsNav`, `ContentsItem`, `getAdjacentPosts`, `formatPostDate`, `getBlogPostsByLocale`, `getPostBySlug`.
- Produces:
  - `type TocHeading = { id: string; text: string; level: 2 | 3 }` and `extractHeadings(mdx: string): TocHeading[]` in `lib/site/toc.ts`, using `github-slugger`.
  - `TOC_SKIP_IDS = ['table-of-contents', 'зміст']`.
  - `PostExtras({ slug, locale }: { slug: string; locale: string })` returning `null`. This is the slot for future comments and views.

- [ ] **Step 1: Write the failing tests**

`tests/toc.test.ts`:

```ts
import { test } from 'node:test';
import assert from 'node:assert/strict';
import { extractHeadings } from '../lib/site/toc.ts';

test('h2 and h3, skipping the in-article table of contents', () => {
  const md = '## Table of Contents\n\n## Security headers middleware\n\n### Content-Security-Policy\n';
  assert.deepEqual(extractHeadings(md), [
    { id: 'security-headers-middleware', text: 'Security headers middleware', level: 2 },
    { id: 'content-security-policy', text: 'Content-Security-Policy', level: 3 },
  ]);
});

test('ukrainian headings keep cyrillic ids and skip Зміст', () => {
  assert.deepEqual(extractHeadings('## Зміст\n\n## Що таке Redis\n'), [
    { id: 'що-таке-redis', text: 'Що таке Redis', level: 2 },
  ]);
});

test('ignores headings inside code fences', () => {
  const md = '```php\n## not a heading\n```\n\n## Real\n';
  assert.deepEqual(extractHeadings(md).map((h) => h.id), ['real']);
});

test('duplicate ids count every heading level, like rehype-slug', () => {
  assert.deepEqual(extractHeadings('#### Summary\n\n## Summary\n').map((h) => h.id), ['summary-1']);
});

test('inline markdown is stripped from text and id', () => {
  assert.deepEqual(extractHeadings('## Using `Redis` with [Laravel](https://laravel.com)\n'), [
    { id: 'using-redis-with-laravel', text: 'Using Redis with Laravel', level: 2 },
  ]);
});
```

- [ ] **Step 2: Run them to see them fail**

Run: `npm test`
Expected: FAIL, cannot find `lib/site/toc.ts`.

- [ ] **Step 3: Implement `extractHeadings`**

Walk lines, toggling a fence flag on lines starting with ```` ``` ```` or `~~~`. For every ATX heading `^(#{1,6})\s+(.+?)\s*#*$` outside fences: strip inline markdown (backticks, `**`, `__`, `*`, `_` emphasis markers, `[text](url)` → `text`, `<...>` tags), slug the text with one `GithubSlugger` instance (so every level advances the duplicate counter), and keep it only if the level is 2 or 3 and the id is not in `TOC_SKIP_IDS`.

- [ ] **Step 4: Run the tests**

Run: `npm test`
Expected: all pass.

- [ ] **Step 5: Confirm ids match the rendered HTML**

Run `npm run dev`, open `/en/blog/security-headers-for-admin-panel` and `/ua/blog/redis-for-real-online`, and in the console run `[...document.querySelectorAll('article h2[id], article h3[id]')].map(h => h.id)`. Every id from `extractHeadings` for that post must be in that list. If one differs, fix `extractHeadings` and add the case to `tests/toc.test.ts`.

- [ ] **Step 6: Restyle the MDX output**

`MDXContent`: drop the `prose` wrapper classes (no typography plugin is installed), keep the plugins. Keep shiki themes `github-light` / `github-dark-dimmed`.

`MDXComponents`:
- Headings keep the id and the hover anchor, anchor icon in accent. h2 26px/600/-0.5px, `mt-11 mb-3`, h3 20px/600 `mt-8 mb-2.5`, both `scroll-mt-20`.
- `p` 17px, leading 1.7, ink, `mb-[18px]`. Lists the same size with soft markers.
- `a` accent, underline, `underline-offset-[3px]`, 1px thickness. External links keep `target="_blank"`.
- Inline `code` (not inside `pre`): `font-site-mono text-[0.84em] rounded-[5px] bg-site-accent-soft px-1.5 py-0.5`.
- `blockquote`: `border-l-2 border-site-accent pl-4 text-site-soft`, no background, no italics.
- Tables, `hr`, images use `border-site-line`.

`CodeBlock`: `rounded-xl border border-site-line bg-site-surface`, mono 13px, leading 1.6, keep `overflow-x-auto`, the copy button and its behavior, button colors from soft/ink tokens.

- [ ] **Step 7: Rewrite the post page**

Keep `generateStaticParams`, `notFound` handling and data loading. Add `const all = getBlogPostsByLocale(locale)` and `const { newer, older } = getAdjacentPosts(all, slug)`. Render:

- `ReadingLayout aside={<ContentsNav title={t('Site.contents')} items={extractHeadings(post.content).map(h => ({ id: h.id, label: h.text, level: h.level }))} rootMargin="-20% 0px -70% 0px" />}`. Pass no `num`, so the header label is the heading text.
- Main `pt-[72px] pb-10`: back link `← {blogPage.backToBlog}` (14px soft, arrow nudges left on hover), h1 44px/600/-1.3px, `description` as an 18px soft lead, mono 12px soft meta line `{blogPage.publishedOn} {formatPostDate(post.date, locale, true)} · {readingTime} {readingTime label}` with tag pills, `border-b border-site-line pb-[22px] mb-9`.
- `<article><MDXContent source={post.content} /></article>`, then `<PostExtras slug={slug} locale={locale} />`.
- Previous/next: two-column grid, gap 16px, `mt-7`. Left cell is `older` (`←` above the title), right cell is `newer` (`→`, right aligned). Cards: `rounded-xl border border-site-line bg-site-surface px-4 py-3.5`, hover border accent. A missing side renders an empty `div`.

- [ ] **Step 8: Verify**

Run: `npm test && npx tsc --noEmit && npm run lint`
Expected: all pass.
Manual on all three posts in `/en` and `/ua`, both themes: matches the post mockup. Contents list lists h2 and h3 without "Table of Contents" / "Зміст", highlights while scrolling, and the header label shows the current heading. Code blocks scroll sideways on 360px and the copy button works. The newest post has no right card, the oldest has no left card.

- [ ] **Step 9: Commit**

```bash
git add lib/site/toc.ts tests/toc.test.ts components/blog/PostExtras.tsx "app/[locale]/blog/[slug]/page.tsx" components/MDXComponents.tsx components/MDXContent.tsx components/ui/CodeBlock.tsx app/globals.css
git commit -m "redesign blog post page with contents and adjacent posts"
```

---

### Task 7: Cleanup and full check

**Files:**
- Delete: `components/Header.tsx`, `components/Footer.tsx`, `components/blog/BlogPostCard.tsx`, `components/partials/DarkModeToggle.tsx`, `components/partials/LocaleSwitcher.tsx`, `components/partials/LocaleSwitcherSelect.tsx`

- [ ] **Step 1: Confirm nothing imports the old components**

Run: `grep -rnE "components/(Header|Footer)'|BlogPostCard|DarkModeToggle|LocaleSwitcher" app components lib`
Expected: no matches outside the files being deleted. Then delete them.

- [ ] **Step 2: Run everything**

Run: `npm test && npx tsc --noEmit && npm run lint && npm run build`
Expected: all pass, build completes. If `npm run build` fails only because of a missing database or env value that the old code also needed, note it and do not change env files.

- [ ] **Step 3: Final manual pass**

Check `/en`, `/ua`, `/en/blog`, `/ua/blog`, one post per locale, `/en/posts`, `/en/events`, `/admin`, `/login` in light and dark, at 1280px and 360px, with reduced motion on once. Compare with both mockups. Look for any uppercase text, any copy that differs from the locale files, and any horizontal scroll on the page body.

- [ ] **Step 4: Commit**

```bash
git add -A components
git commit -m "remove components replaced by the redesign"
```
