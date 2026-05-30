# Landing Page & Blog Redesign — Design

**Date:** 2026-05-30
**Status:** Approved (design phase)

## Goal

Redesign the landing page and blog (list + post detail) in a modern, distinctive aesthetic inspired by [antfu.me](https://antfu.me): a persistent sidebar shell, quiet typography, dated rows, generous whitespace. Preserve all existing content sections and data sources. Support dark and light theme.

## Aesthetic — "Deep Quiet"

- **Dark mode (default):** background `#0f0f10`, sidebar `#0a0a0b`, text `#e8e6e3`, muted `rgba(255,255,255,0.55)`, hairline `rgba(255,255,255,0.06)`, accent `#c084fc` (purple)
- **Light mode:** background `#fdfcf9` (warm cream), sidebar `#faf8f3`, text `#1a1a1a`, muted `rgba(0,0,0,0.55)`, hairline `rgba(0,0,0,0.06)`, accent `#8b5cf6`
- **Font:** Inter (already loaded). Base size 14px, line-height 1.55. h1 32px / weight 500 / letter-spacing -0.5px.
- **Section labels:** lowercase, normal letter-spacing (no uppercase, no tracking), 11px, muted.
- **Dividers:** 1px hairlines using the theme's hairline color.
- **Motion:** subtle. 150ms color transitions on links/buttons. Fade-up on section first-view (once). Active sidebar nav item shows a small filled dot in accent color. No parallax, no scroll-jacking.

## Layout

### Desktop (≥1024px)

Two-column shell (`SiteShell` component):

- **Left sidebar** — sticky, width 220px, full viewport height, vertical padding 28px, horizontal padding 18px, right hairline border.
  - Avatar (48px, rounded full)
  - Name (14px / weight 600) + role (11px / muted)
  - Vertical nav: Home, About, Skills, Experience, Posts, Blog. Active item shows accent-colored dot + text; inactive dots muted.
  - Bottom: social links (GitHub, Twitter/X, LinkedIn) as small icons, theme toggle, locale switcher.
- **Main column** — `max-width: 680px`, left-aligned with 38px horizontal padding, 36px top padding. Sections separated by a single hairline divider with 48px vertical spacing.

### Mobile (<1024px)

- Sidebar hidden; top bar (height 56px) shows avatar + name on the left, hamburger on the right.
- Hamburger opens a full-screen drawer with the same nav, socials, theme toggle, locale switcher.
- Main column padding reduces to 20px horizontal.

## Landing Sections (preserve all 5)

All sections live in the main column with the same lowercase label style. All copy comes from existing `next-intl` translations — no copy changes required.

1. **Hero (`Preview`)** — small "hi —" tag (muted), `<h1>Serhii Dychko <span className="text-accent">→</span></h1>`, one-paragraph tagline (muted), two text-link CTAs (`view work →`, `get in touch →`) with hover underline.
2. **About** — label `about`, 1–2 short paragraphs. No duplicate avatar (the sidebar carries it).
3. **Skills** — label `stack`, flat list of tag chips (subtle accent-tinted bg, 11px, rounded 4px). Grouped optionally by category (languages / frameworks / infra) with a small muted sub-label per group.
4. **Experience** — label `experience`, antfu-style rows: `<role @ company> ········· <year>`. One row per entry, hairline between rows. Click expands inline details (description, stack used). Use `<details>` for a no-JS-friendly toggle.
5. **PostsPreview** — label `latest writing`, three rows: `<title> ········· <date>` with `tabular-nums` for dates. Footer text-link `all posts →` linking to `/blog`.

## Blog

### Post list (`app/[locale]/blog/page.tsx`)

- Wrapped in `SiteShell`.
- Main column heading: `<h1>blog</h1>`.
- Tag filter chips at top (purple-tinted accent chips, active chip = filled).
- Posts grouped by year (year shown as muted label above its group). Inside each year: dated rows (`<title> ········· <MMM dd>`). Whole row is clickable; hover reveals accent color on title.

### Post detail (`app/[locale]/blog/[slug]/page.tsx`)

- Same `SiteShell`.
- Main column = reading column, max-width 680px.
- Header: small `← back to blog` link, title in h1 style, meta line (`date · reading time · tags`).
- MDX body restyled to match palette: paragraphs at 15px / line-height 1.7, headings using same weights as h1 scale, blockquotes with left accent bar, links accented purple with underline-offset.
- Shiki code blocks: adapt themes — `github-light` for light, `github-dark-dimmed` (or similar) for dark. Keep existing horizontal scroll behavior added in commit `8fed0c4`.
- Footer: hairline-separated row with `← prev post` and `next post →` titles.

### Posts route

`app/[locale]/posts/page.tsx` receives the same shell + dated-row treatment as the blog list.

## Component changes

### New

- `components/SiteShell.tsx` — sidebar + main wrapper. Accepts `children` and an optional `activeNav` hint.
- `components/site/Sidebar.tsx`, `components/site/MobileTopBar.tsx`, `components/site/MobileDrawer.tsx`, `components/site/ThemeToggle.tsx` (or reuse if present), `components/site/LocaleSwitcher.tsx` (or reuse).
- `components/site/SectionLabel.tsx` — renders the lowercase label.
- `components/site/Row.tsx` — generic dated row with dotted leader (title left, date right, hairline divider).

### Modified

- `app/[locale]/layout.tsx` — wrap `{children}` in `SiteShell`. Remove top `Header` and `Footer` from this layout (they're replaced by the sidebar/mobile bar). `GetInTouch` stays as the final section before the divider or moves into the Contact area on landing — TBD during implementation, default: remove from layout, render as the last section on landing only.
- `components/index/Preview.tsx` — new hero markup as above.
- `components/index/About.tsx` — strip duplicate avatar, two-paragraph layout.
- `components/index/Skills.tsx` — chip list.
- `components/index/Experience.tsx` — rows + `<details>`.
- `components/index/PostsPreview.tsx` — 3 rows + footer link.
- `app/globals.css` — replace background classes with CSS variables for the palette. Define `:root` (light) and `.dark` (dark) tokens: `--bg`, `--bg-sidebar`, `--fg`, `--fg-muted`, `--hairline`, `--accent`.
- `tailwind.config.ts` — expose those variables as Tailwind colors (`bg`, `bg-sidebar`, `fg`, `fg-muted`, `hairline`, `accent`).
- `app/[locale]/blog/page.tsx`, `app/[locale]/blog/[slug]/page.tsx`, `app/[locale]/posts/page.tsx` — wrap in `SiteShell`, apply new typography/MDX styles.

### Untouched

- `app/admin/**`, `app/login/**`, `app/api/**`
- `components/Header.tsx`, `components/Footer.tsx` — kept in repo but no longer imported by `[locale]/layout.tsx`. Safe to delete in a follow-up if confirmed unused elsewhere.
- All data sources: translations, prisma, MDX content fetcher.

## Theme

- Continue using `next-themes` (already wired in `Providers.tsx`).
- Default theme: dark.
- Theme toggle lives in sidebar bottom and mobile drawer.
- Tokens defined as CSS variables on `:root` and `.dark`, consumed via Tailwind.

## Responsive breakpoints

- `lg` (1024px) — sidebar appears, main column gets full padding.
- `md` (768px) — main column padding 28px.
- Below `md` — main column padding 20px, single-column everything.

## Out of scope

- Admin UI, login flow, API routes.
- New content or copy (translations reused as-is).
- New blog features (search, RSS rework, comments).
- Animations beyond fade-up + color transitions.

## Acceptance

- Landing page renders all 5 sections in the new shell, dark + light.
- Sidebar nav anchors scroll to sections and highlight active section on scroll.
- Mobile drawer opens/closes, theme toggle and locale switcher work from it.
- Blog list and detail pages use the same shell, dated rows, restyled MDX.
- No regressions on admin, login, or API routes.
- Lighthouse: no significant regression vs. current site on landing.
