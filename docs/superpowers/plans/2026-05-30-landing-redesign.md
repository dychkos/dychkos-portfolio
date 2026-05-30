# Landing & Blog Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Redesign landing page and blog (list + post detail) in the "Deep Quiet" aesthetic — antfu-inspired sidebar shell, lowercase section labels, dated rows, purple accent, dark/light theme.

**Architecture:** A new `SiteShell` wraps `app/[locale]/layout.tsx`'s children, replacing the existing top `Header`/`Footer`. The shell renders a sticky left sidebar on `lg+` and a top bar + drawer on mobile. All five landing sections are rewritten in place (same `components/index/*` files, same translations). Blog list, blog detail, and posts list adopt the same shell and typography. Theme tokens are added by overriding the existing shadcn HSL variables in `app/globals.css` plus two new variables for sidebar/hairline.

**Tech Stack:** Next.js 14 (app router) · TypeScript · Tailwind CSS · next-themes · next-intl · MDX (next-mdx-remote) · shiki · lucide-react · react-icons.

**Reference spec:** `docs/superpowers/specs/2026-05-30-landing-redesign-design.md`

**Verification model:** This repo has no test runner configured. Each task ends with a manual verification step: run `npm run dev`, open the route in a browser, confirm the visual + interaction acceptance criteria, then commit.

---

## File Map

**New:**
- `components/site/SiteShell.tsx` — page shell (sidebar + main + mobile bar)
- `components/site/Sidebar.tsx` — desktop sidebar (avatar, nav, footer controls)
- `components/site/MobileTopBar.tsx` — mobile top bar with hamburger
- `components/site/MobileDrawer.tsx` — full-screen drawer
- `components/site/SectionLabel.tsx` — lowercase section label
- `components/site/Row.tsx` — dated row with dotted leader
- `components/site/SocialLinks.tsx` — GH / X / LinkedIn icons

**Modified:**
- `app/globals.css` — palette tokens
- `tailwind.config.ts` — expose `sidebar`, `hairline` colors
- `app/[locale]/layout.tsx` — wrap in `SiteShell`, drop `Header`/`Footer`
- `components/index/Preview.tsx`
- `components/index/About.tsx`
- `components/index/Skills.tsx`
- `components/index/Experience.tsx`
- `components/index/PostsPreview.tsx`
- `app/[locale]/blog/page.tsx`
- `app/[locale]/blog/[slug]/page.tsx`
- `app/[locale]/posts/page.tsx`
- `components/MDXComponents.tsx` — restyled to new palette

**Untouched:** admin, login, api, prisma, all existing partials (`DarkModeToggle`, `LocaleSwitcher`, `BurgerButton` are reused).

---

## Task 1 — Theme tokens & Tailwind colors

**Files:**
- Modify: `app/globals.css`
- Modify: `tailwind.config.ts`

- [ ] **Step 1: Read current `app/globals.css`** to find the existing `:root` and `.dark` HSL blocks (shadcn defaults).

- [ ] **Step 2: Replace the `:root` and `.dark` blocks** with the Deep Quiet palette. Add two new vars: `--sidebar` and `--hairline`. Keep all shadcn variable *names* so existing components don't break.

In `app/globals.css`, replace the `:root { ... }` and `.dark { ... }` blocks with:

```css
@layer base {
  :root {
    /* Deep Quiet — light (warm cream) */
    --background: 40 33% 98%;        /* #fdfcf9 */
    --foreground: 0 0% 10%;          /* #1a1a1a */
    --sidebar: 40 30% 96%;           /* #faf8f3 */
    --hairline: 0 0% 0% / 0.06;
    --muted: 40 33% 94%;
    --muted-foreground: 0 0% 45%;
    --card: 40 33% 98%;
    --card-foreground: 0 0% 10%;
    --popover: 40 33% 98%;
    --popover-foreground: 0 0% 10%;
    --primary: 258 90% 66%;          /* #8b5cf6 */
    --primary-foreground: 0 0% 100%;
    --secondary: 40 33% 94%;
    --secondary-foreground: 0 0% 10%;
    --accent: 258 90% 66%;           /* #8b5cf6 */
    --accent-foreground: 0 0% 100%;
    --destructive: 0 72% 51%;
    --destructive-foreground: 0 0% 100%;
    --border: 0 0% 0% / 0.06;
    --input: 0 0% 0% / 0.12;
    --ring: 258 90% 66%;
    --radius: 0.5rem;
  }
  .dark {
    /* Deep Quiet — dark (near-black) */
    --background: 240 4% 6%;         /* #0f0f10 */
    --foreground: 30 8% 91%;         /* #e8e6e3 */
    --sidebar: 240 5% 4%;            /* #0a0a0b */
    --hairline: 0 0% 100% / 0.06;
    --muted: 240 4% 10%;
    --muted-foreground: 0 0% 65%;
    --card: 240 4% 6%;
    --card-foreground: 30 8% 91%;
    --popover: 240 4% 8%;
    --popover-foreground: 30 8% 91%;
    --primary: 270 95% 75%;          /* #c084fc */
    --primary-foreground: 240 4% 6%;
    --secondary: 240 4% 12%;
    --secondary-foreground: 30 8% 91%;
    --accent: 270 95% 75%;           /* #c084fc */
    --accent-foreground: 240 4% 6%;
    --destructive: 0 62% 50%;
    --destructive-foreground: 30 8% 91%;
    --border: 0 0% 100% / 0.06;
    --input: 0 0% 100% / 0.12;
    --ring: 270 95% 75%;
  }
  body { @apply bg-background text-foreground; }
}
```

Keep the `@tailwind` directives and any other rules in the file untouched.

- [ ] **Step 3: Expose `sidebar` and `hairline` in Tailwind.**

In `tailwind.config.ts`, inside `theme.extend.colors`, add:

```ts
sidebar: 'hsl(var(--sidebar))',
hairline: 'hsl(var(--hairline))',
```

Also add a max-width utility we'll use everywhere:

```ts
maxWidth: {
  reading: '680px',
},
```

- [ ] **Step 4: Set default theme to `dark` in `app/Providers.tsx`.**

Read the file, then ensure the `ThemeProvider` invocation has `defaultTheme="dark"` and `attribute="class"`. If `enableSystem` is true, leave it; the default still applies on first visit.

- [ ] **Step 5: Verify build compiles.**

Run: `npm run build`
Expected: build succeeds. If Tailwind complains about unknown colors, recheck the config edit.

- [ ] **Step 6: Commit.**

```bash
git add app/globals.css tailwind.config.ts app/Providers.tsx
git commit -m "feat(theme): introduce Deep Quiet palette tokens"
```

---

## Task 2 — `SectionLabel` and `Row` primitives

**Files:**
- Create: `components/site/SectionLabel.tsx`
- Create: `components/site/Row.tsx`

- [ ] **Step 1: Create `components/site/SectionLabel.tsx`:**

```tsx
import { ReactNode } from 'react';

export default function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <div className="text-[11px] text-muted-foreground mb-3 mt-12 first:mt-0">
      {children}
    </div>
  );
}
```

- [ ] **Step 2: Create `components/site/Row.tsx`:**

```tsx
import Link from 'next/link';
import { ReactNode } from 'react';

interface RowProps {
  title: ReactNode;
  meta: ReactNode;
  href?: string;
}

export default function Row({ title, meta, href }: RowProps) {
  const inner = (
    <div className="flex items-baseline gap-3 py-2 border-b border-hairline group">
      <span className="text-foreground group-hover:text-accent transition-colors">
        {title}
      </span>
      <span className="flex-1 border-b border-dotted border-hairline translate-y-[-3px]" />
      <span className="text-muted-foreground text-[12px] tabular-nums">
        {meta}
      </span>
    </div>
  );
  return href ? <Link href={href}>{inner}</Link> : inner;
}
```

- [ ] **Step 3: Verify the files exist.**

Run: `ls components/site/`
Expected: `Row.tsx  SectionLabel.tsx`

- [ ] **Step 4: Commit.**

```bash
git add components/site/SectionLabel.tsx components/site/Row.tsx
git commit -m "feat(site): add SectionLabel and Row primitives"
```

---

## Task 3 — `SocialLinks`

**Files:**
- Create: `components/site/SocialLinks.tsx`

- [ ] **Step 1: Create the component.** Reuses `react-icons` (already a dep). Replace the URLs with the user's actual handles if known; defaults are based on the existing footer/header — if those files have different URLs, mirror them.

```tsx
import { FaGithub, FaLinkedin, FaXTwitter } from 'react-icons/fa6';

const links = [
  { href: 'https://github.com/dychkos', icon: FaGithub, label: 'GitHub' },
  { href: 'https://x.com/dychkos', icon: FaXTwitter, label: 'X' },
  { href: 'https://www.linkedin.com/in/serhii-dychko', icon: FaLinkedin, label: 'LinkedIn' },
];

export default function SocialLinks() {
  return (
    <div className="flex gap-3">
      {links.map(({ href, icon: Icon, label }) => (
        <a
          key={href}
          href={href}
          target="_blank"
          rel="noreferrer"
          aria-label={label}
          className="text-muted-foreground hover:text-accent transition-colors"
        >
          <Icon size={16} />
        </a>
      ))}
    </div>
  );
}
```

- [ ] **Step 2: Check URLs against existing `components/Header.tsx` and `components/Footer.tsx`.** If different handles are used there, update `links` to match.

- [ ] **Step 3: Commit.**

```bash
git add components/site/SocialLinks.tsx
git commit -m "feat(site): add SocialLinks"
```

---

## Task 4 — `Sidebar` (desktop)

**Files:**
- Create: `components/site/Sidebar.tsx`

- [ ] **Step 1: Inspect `components/partials/DarkModeToggle.tsx` and `components/partials/LocaleSwitcher.tsx`** to confirm import names and default exports.

- [ ] **Step 2: Create `components/site/Sidebar.tsx`:**

```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useEffect, useState } from 'react';
import DarkModeToggle from '@/components/partials/DarkModeToggle';
import LocaleSwitcher from '@/components/partials/LocaleSwitcher';
import SocialLinks from '@/components/site/SocialLinks';

const navItems = [
  { id: 'home', label: 'home', href: '#home' },
  { id: 'about', label: 'about', href: '#about' },
  { id: 'skills', label: 'stack', href: '#skills' },
  { id: 'experience', label: 'experience', href: '#experience' },
  { id: 'posts', label: 'posts', href: '#posts' },
  { id: 'blog', label: 'blog', href: '/blog' },
];

export default function Sidebar() {
  const [active, setActive] = useState<string>('home');

  useEffect(() => {
    const sections = navItems
      .filter((n) => n.href.startsWith('#'))
      .map((n) => document.getElementById(n.id))
      .filter(Boolean) as HTMLElement[];
    if (!sections.length) return;
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((e) => {
          if (e.isIntersecting) setActive(e.target.id);
        });
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );
    sections.forEach((s) => observer.observe(s));
    return () => observer.disconnect();
  }, []);

  return (
    <aside className="hidden lg:flex flex-col w-[220px] shrink-0 bg-sidebar border-r border-hairline px-[18px] py-[28px] sticky top-0 h-screen">
      <Link href="/" className="flex items-center gap-3 mb-6">
        <Image
          src="/images/img_me.jpg"
          alt="Serhii Dychko"
          width={48}
          height={48}
          className="rounded-full"
        />
        <div>
          <div className="text-[14px] font-semibold leading-tight">Serhii Dychko</div>
          <div className="text-[11px] text-muted-foreground">software engineer</div>
        </div>
      </Link>

      <nav className="flex flex-col gap-1 text-[13px]">
        {navItems.map((n) => {
          const isActive = active === n.id;
          return (
            <Link
              key={n.id}
              href={n.href}
              className={`flex items-center gap-2 py-1 transition-colors ${
                isActive ? 'text-accent' : 'text-muted-foreground hover:text-foreground'
              }`}
            >
              <span
                className={`w-1 h-1 rounded-full ${
                  isActive ? 'bg-accent' : 'bg-muted-foreground/40'
                }`}
              />
              {n.label}
            </Link>
          );
        })}
      </nav>

      <div className="mt-auto flex flex-col gap-3">
        <SocialLinks />
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </aside>
  );
}
```

If `DarkModeToggle` / `LocaleSwitcher` use named exports, adjust the imports accordingly.

- [ ] **Step 3: Commit.**

```bash
git add components/site/Sidebar.tsx
git commit -m "feat(site): add desktop Sidebar with scroll-spy nav"
```

---

## Task 5 — `MobileTopBar` and `MobileDrawer`

**Files:**
- Create: `components/site/MobileTopBar.tsx`
- Create: `components/site/MobileDrawer.tsx`

- [ ] **Step 1: Create `components/site/MobileDrawer.tsx`:**

```tsx
'use client';

import Link from 'next/link';
import { X } from 'lucide-react';
import DarkModeToggle from '@/components/partials/DarkModeToggle';
import LocaleSwitcher from '@/components/partials/LocaleSwitcher';
import SocialLinks from '@/components/site/SocialLinks';

const navItems = [
  { label: 'home', href: '#home' },
  { label: 'about', href: '#about' },
  { label: 'stack', href: '#skills' },
  { label: 'experience', href: '#experience' },
  { label: 'posts', href: '#posts' },
  { label: 'blog', href: '/blog' },
];

export default function MobileDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  if (!open) return null;
  return (
    <div className="fixed inset-0 z-50 bg-background flex flex-col p-6 lg:hidden">
      <div className="flex justify-end">
        <button onClick={onClose} aria-label="Close menu">
          <X size={24} />
        </button>
      </div>
      <nav className="flex flex-col gap-4 mt-8 text-2xl">
        {navItems.map((n) => (
          <Link
            key={n.href}
            href={n.href}
            onClick={onClose}
            className="text-foreground hover:text-accent transition-colors"
          >
            {n.label}
          </Link>
        ))}
      </nav>
      <div className="mt-auto flex flex-col gap-4">
        <SocialLinks />
        <div className="flex items-center gap-3">
          <DarkModeToggle />
          <LocaleSwitcher />
        </div>
      </div>
    </div>
  );
}
```

- [ ] **Step 2: Create `components/site/MobileTopBar.tsx`:**

```tsx
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { useState } from 'react';
import { Menu } from 'lucide-react';
import MobileDrawer from '@/components/site/MobileDrawer';

export default function MobileTopBar() {
  const [open, setOpen] = useState(false);
  return (
    <>
      <header className="lg:hidden flex items-center justify-between h-14 px-5 border-b border-hairline bg-sidebar sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <Image
            src="/images/img_me.jpg"
            alt="Serhii Dychko"
            width={28}
            height={28}
            className="rounded-full"
          />
          <span className="text-[13px] font-semibold">Serhii Dychko</span>
        </Link>
        <button onClick={() => setOpen(true)} aria-label="Open menu">
          <Menu size={22} />
        </button>
      </header>
      <MobileDrawer open={open} onClose={() => setOpen(false)} />
    </>
  );
}
```

- [ ] **Step 3: Commit.**

```bash
git add components/site/MobileTopBar.tsx components/site/MobileDrawer.tsx
git commit -m "feat(site): add MobileTopBar and MobileDrawer"
```

---

## Task 6 — `SiteShell` and wire into layout

**Files:**
- Create: `components/site/SiteShell.tsx`
- Modify: `app/[locale]/layout.tsx`

- [ ] **Step 1: Create `components/site/SiteShell.tsx`:**

```tsx
import { ReactNode } from 'react';
import Sidebar from '@/components/site/Sidebar';
import MobileTopBar from '@/components/site/MobileTopBar';

export default function SiteShell({ children }: { children: ReactNode }) {
  return (
    <div className="min-h-screen flex flex-col lg:flex-row">
      <Sidebar />
      <MobileTopBar />
      <main className="flex-1 min-w-0 px-5 md:px-7 lg:px-[38px] py-9 max-w-reading mx-auto lg:mx-0 w-full">
        {children}
      </main>
    </div>
  );
}
```

- [ ] **Step 2: Update `app/[locale]/layout.tsx`** — remove `Header`, `Footer`, `GetInTouch`; wrap children in `SiteShell`:

```tsx
import clsx from 'clsx';
import { Inter } from 'next/font/google';
import { unstable_setRequestLocale } from 'next-intl/server';
import React, { ReactNode } from 'react';
import { locales } from '@/config';
import Providers from '@/app/Providers';
import SiteShell from '@/components/site/SiteShell';

const inter = Inter({ subsets: ['latin'] });

type Props = {
  children: ReactNode;
  params: { locale: string };
};

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale },
}: Props) {
  unstable_setRequestLocale(locale);

  return (
    <html className="h-full scroll-smooth" lang={locale} suppressHydrationWarning>
      <body className={clsx(inter.className, 'bg-background text-foreground')}>
        <Providers>
          <SiteShell>{children}</SiteShell>
        </Providers>
      </body>
    </html>
  );
}
```

- [ ] **Step 3: Verify in browser.**

Run: `npm run dev`
Open: `http://localhost:3000`
Expected: sidebar visible on the left (≥1024px width), old sections still render as a stack in the main column (unstyled but legible). No console errors. Resize below 1024px → top bar appears with hamburger; click opens drawer.

- [ ] **Step 4: Commit.**

```bash
git add components/site/SiteShell.tsx app/[locale]/layout.tsx
git commit -m "feat(site): wire SiteShell into locale layout"
```

---

## Task 7 — Restyle Hero (`Preview.tsx`)

**Files:**
- Modify: `components/index/Preview.tsx`

- [ ] **Step 1: Read the current file** to capture the existing translation keys it uses (likely `Index.preview.*` or similar). Reuse the exact keys — do not rename.

- [ ] **Step 2: Rewrite `components/index/Preview.tsx`:**

```tsx
import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function Preview() {
  const t = useTranslations('Index.preview');
  return (
    <section id="home" className="pt-2">
      <p className="text-[12px] text-muted-foreground mb-2">hi —</p>
      <h1 className="text-[32px] font-medium tracking-[-0.5px] leading-tight">
        Serhii Dychko <span className="text-accent">→</span>
      </h1>
      <p className="text-muted-foreground mt-3 leading-relaxed">
        {t('tagline')}
      </p>
      <div className="flex gap-6 mt-6 text-[13px]">
        <Link href="#experience" className="hover:text-accent transition-colors">
          view work →
        </Link>
        <a href="mailto:dychkos@proton.me" className="hover:text-accent transition-colors">
          get in touch →
        </a>
      </div>
    </section>
  );
}
```

If `Index.preview.tagline` does not exist, fall back to the closest existing string (e.g. `t('description')`). Use the existing key — do **not** add new translation files.

If the existing `Preview` is a server component (no `'use client'`), keep `useTranslations` from `next-intl` (works in both). If it imports `getTranslations`, switch to the async form and `await` it.

- [ ] **Step 3: Verify** at `http://localhost:3000` — hero renders with new typography, both CTAs scroll/mail correctly.

- [ ] **Step 4: Commit.**

```bash
git add components/index/Preview.tsx
git commit -m "feat(landing): restyle hero in Deep Quiet aesthetic"
```

---

## Task 8 — Restyle About

**Files:**
- Modify: `components/index/About.tsx`

- [ ] **Step 1: Read the current `components/index/About.tsx`** and preserve translation keys.

- [ ] **Step 2: Rewrite:**

```tsx
import { useTranslations } from 'next-intl';
import SectionLabel from '@/components/site/SectionLabel';

export default function About() {
  const t = useTranslations('Index.about');
  return (
    <section id="about">
      <SectionLabel>about</SectionLabel>
      <div className="space-y-4 text-[14px] leading-relaxed text-foreground/90">
        <p>{t('paragraph1')}</p>
        <p>{t('paragraph2')}</p>
      </div>
    </section>
  );
}
```

If only one paragraph key exists, render one `<p>`. Match whatever keys the current file references.

- [ ] **Step 3: Verify** in browser.

- [ ] **Step 4: Commit.**

```bash
git add components/index/About.tsx
git commit -m "feat(landing): restyle About"
```

---

## Task 9 — Restyle Skills

**Files:**
- Modify: `components/index/Skills.tsx`

- [ ] **Step 1: Read the current `components/index/Skills.tsx`** to discover the data source (translations array, hardcoded list, or grouped object).

- [ ] **Step 2: Rewrite** preserving the data source. If skills are grouped (languages / frameworks / infra), render one sub-block per group; otherwise a single flat list.

Flat-list form:

```tsx
import { useTranslations } from 'next-intl';
import SectionLabel from '@/components/site/SectionLabel';

const skills = ['typescript', 'go', 'next.js', 'react', 'postgres', 'redis', 'docker', 'k8s'];

export default function Skills() {
  return (
    <section id="skills">
      <SectionLabel>stack</SectionLabel>
      <div className="flex flex-wrap gap-2">
        {skills.map((s) => (
          <span
            key={s}
            className="text-[11px] px-2 py-1 rounded bg-accent/10 text-accent"
          >
            {s}
          </span>
        ))}
      </div>
    </section>
  );
}
```

Use the existing skills array from the current file rather than the placeholder above.

- [ ] **Step 3: Verify** in browser.

- [ ] **Step 4: Commit.**

```bash
git add components/index/Skills.tsx
git commit -m "feat(landing): restyle Skills as chip list"
```

---

## Task 10 — Restyle Experience

**Files:**
- Modify: `components/index/Experience.tsx`

- [ ] **Step 1: Read current file** to find the experience data source (likely a translation-driven array of `{role, company, period, description}`).

- [ ] **Step 2: Rewrite** to render each entry as a `<details>` element with the summary using the `Row` primitive layout. Preserve translation keys / data shape — only the markup changes.

```tsx
import { useTranslations } from 'next-intl';
import SectionLabel from '@/components/site/SectionLabel';

interface Entry {
  role: string;
  company: string;
  period: string;
  description: string;
}

export default function Experience() {
  const t = useTranslations('Index.experience');
  // Replace with the actual data load used in the existing file:
  const entries: Entry[] = t.raw('items') as Entry[];

  return (
    <section id="experience">
      <SectionLabel>experience</SectionLabel>
      <div>
        {entries.map((e, i) => (
          <details key={i} className="group border-b border-hairline">
            <summary className="flex items-baseline gap-3 py-2 cursor-pointer list-none">
              <span className="text-foreground group-hover:text-accent transition-colors">
                {e.role} <span className="text-muted-foreground">@ {e.company}</span>
              </span>
              <span className="flex-1 border-b border-dotted border-hairline translate-y-[-3px]" />
              <span className="text-muted-foreground text-[12px] tabular-nums">{e.period}</span>
            </summary>
            <p className="text-muted-foreground text-[13px] leading-relaxed pb-3 pt-1">
              {e.description}
            </p>
          </details>
        ))}
      </div>
    </section>
  );
}
```

If the current file iterates over a different shape, adapt accordingly — the visual structure is what matters.

- [ ] **Step 3: Verify** rows render, click expands details, hairline divider visible between rows.

- [ ] **Step 4: Commit.**

```bash
git add components/index/Experience.tsx
git commit -m "feat(landing): restyle Experience as expandable rows"
```

---

## Task 11 — Restyle PostsPreview

**Files:**
- Modify: `components/index/PostsPreview.tsx`

- [ ] **Step 1: Read current file** to capture the post-fetching mechanism (likely an MDX or DB query returning `{title, slug, date}`).

- [ ] **Step 2: Rewrite** using `Row`:

```tsx
import Link from 'next/link';
import SectionLabel from '@/components/site/SectionLabel';
import Row from '@/components/site/Row';
// Keep the existing fetcher import from the current file
import { getLatestPosts } from '@/lib/posts'; // adjust path to the actual fetcher

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}

export default async function PostsPreview() {
  const posts = await getLatestPosts(3);
  return (
    <section id="posts">
      <SectionLabel>latest writing</SectionLabel>
      <div>
        {posts.map((p) => (
          <Row
            key={p.slug}
            title={p.title}
            meta={formatDate(p.date)}
            href={`/blog/${p.slug}`}
          />
        ))}
      </div>
      <Link
        href="/blog"
        className="inline-block mt-4 text-[13px] text-muted-foreground hover:text-accent transition-colors"
      >
        all posts →
      </Link>
    </section>
  );
}
```

**Important:** use whatever import + function name the existing `PostsPreview.tsx` uses for fetching posts. Do not invent a new fetcher. If the current component is sync (data is already in props or comes from a hook), preserve that pattern.

- [ ] **Step 3: Verify** in browser — three latest posts appear with dates, clicking navigates to detail.

- [ ] **Step 4: Commit.**

```bash
git add components/index/PostsPreview.tsx
git commit -m "feat(landing): restyle PostsPreview as dated rows"
```

---

## Task 12 — Restyle blog list

**Files:**
- Modify: `app/[locale]/blog/page.tsx`

- [ ] **Step 1: Read current `app/[locale]/blog/page.tsx`** to find: the post fetcher, the tag list source, and any existing tag filter logic.

- [ ] **Step 2: Rewrite** the page (keep all imports for data + i18n; replace only the JSX):

```tsx
// preserve existing imports (fetcher, getTranslations, etc.)
import Link from 'next/link';
import Row from '@/components/site/Row';

function formatDate(d: string | Date) {
  return new Date(d).toLocaleDateString('en-US', { month: 'short', day: '2-digit' });
}

function groupByYear<T extends { date: string | Date }>(posts: T[]) {
  return posts.reduce<Record<string, T[]>>((acc, p) => {
    const y = String(new Date(p.date).getFullYear());
    (acc[y] ??= []).push(p);
    return acc;
  }, {});
}

export default async function BlogPage(/* keep existing params */) {
  // keep existing data load:
  const posts = await getAllPosts(); // use the real call
  const tags = Array.from(new Set(posts.flatMap((p) => p.tags ?? [])));
  const grouped = groupByYear(posts);
  const years = Object.keys(grouped).sort((a, b) => +b - +a);

  return (
    <>
      <h1 className="text-[28px] font-medium tracking-[-0.5px] mb-2">blog</h1>
      <p className="text-muted-foreground text-[13px] mb-8">
        thoughts, notes, and experiments
      </p>

      {tags.length > 0 && (
        <div className="flex flex-wrap gap-2 mb-10">
          {tags.map((t) => (
            <Link
              key={t}
              href={`/blog?tag=${encodeURIComponent(t)}`}
              className="text-[11px] px-2 py-1 rounded bg-accent/10 text-accent hover:bg-accent/20 transition-colors"
            >
              {t}
            </Link>
          ))}
        </div>
      )}

      {years.map((year) => (
        <section key={year} className="mb-8">
          <div className="text-[11px] text-muted-foreground mb-2">{year}</div>
          {grouped[year].map((p) => (
            <Row
              key={p.slug}
              title={p.title}
              meta={formatDate(p.date)}
              href={`/blog/${p.slug}`}
            />
          ))}
        </section>
      ))}
    </>
  );
}
```

If the file uses a different fetcher or post shape (e.g. `posts` is passed as prop, or there's pagination), adapt — preserve the existing data flow. Only the markup is being replaced.

- [ ] **Step 3: Verify** at `http://localhost:3000/blog` — posts grouped by year, tag chips render, clicking a post navigates to detail.

- [ ] **Step 4: Commit.**

```bash
git add app/[locale]/blog/page.tsx
git commit -m "feat(blog): restyle blog list with grouped dated rows"
```

---

## Task 13 — Restyle blog detail + MDX

**Files:**
- Modify: `app/[locale]/blog/[slug]/page.tsx`
- Modify: `components/MDXComponents.tsx`

- [ ] **Step 1: Read both files** to capture: how the MDX content is rendered, where shiki theme is configured (likely in `next.config.mjs` or a `rehype-pretty-code` options object), prev/next post fetching (if any).

- [ ] **Step 2: Update shiki themes** for dark + light.

Find the `rehype-pretty-code` options (search the repo: `grep -rn "rehype-pretty-code\|rehypePrettyCode" --include="*.{ts,tsx,mjs,js}"`). Set:

```ts
theme: {
  light: 'github-light',
  dark: 'github-dark-dimmed',
},
```

- [ ] **Step 3: Update `components/MDXComponents.tsx`** so paragraph/heading/link/blockquote styles match the new palette. Example minimal mapping:

```tsx
import Link from 'next/link';
import { ComponentProps } from 'react';

export const mdxComponents = {
  h1: (p: ComponentProps<'h1'>) => (
    <h1 className="text-[28px] font-medium tracking-[-0.5px] mt-10 mb-4" {...p} />
  ),
  h2: (p: ComponentProps<'h2'>) => (
    <h2 className="text-[22px] font-medium mt-10 mb-3" {...p} />
  ),
  h3: (p: ComponentProps<'h3'>) => (
    <h3 className="text-[17px] font-medium mt-8 mb-2" {...p} />
  ),
  p: (p: ComponentProps<'p'>) => (
    <p className="text-[15px] leading-[1.75] my-4 text-foreground/90" {...p} />
  ),
  a: ({ href = '', ...rest }: ComponentProps<'a'>) => (
    <Link
      href={href}
      className="text-accent underline underline-offset-4 hover:no-underline"
      {...rest}
    />
  ),
  blockquote: (p: ComponentProps<'blockquote'>) => (
    <blockquote
      className="border-l-2 border-accent pl-4 my-6 text-muted-foreground italic"
      {...p}
    />
  ),
  ul: (p: ComponentProps<'ul'>) => <ul className="list-disc pl-6 my-4 space-y-1" {...p} />,
  ol: (p: ComponentProps<'ol'>) => <ol className="list-decimal pl-6 my-4 space-y-1" {...p} />,
  code: (p: ComponentProps<'code'>) => (
    <code className="text-[13px] px-1 py-0.5 rounded bg-muted text-accent" {...p} />
  ),
};
```

**Important:** preserve any existing exports the file already provides (e.g. custom components, the `CodeBlock` wrapper that handles scroll from commit `8fed0c4`). Merge — do not replace blindly.

- [ ] **Step 4: Update the page** `app/[locale]/blog/[slug]/page.tsx`. Keep all data fetching as-is; replace only the JSX shell:

```tsx
// keep existing imports + data fetching
import Link from 'next/link';

export default async function BlogPostPage(/* keep existing params */) {
  // keep existing fetch:
  const post = await getPostBySlug(slug);
  // optional prev/next if your loader provides them:
  // const { prev, next } = await getAdjacentPosts(slug);

  return (
    <article>
      <Link
        href="/blog"
        className="text-[12px] text-muted-foreground hover:text-accent transition-colors"
      >
        ← back to blog
      </Link>
      <h1 className="text-[32px] font-medium tracking-[-0.5px] mt-4 mb-3">
        {post.title}
      </h1>
      <div className="text-[12px] text-muted-foreground mb-10 flex gap-3">
        <span>{new Date(post.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        {post.readingTime && <span>· {post.readingTime} min read</span>}
        {post.tags?.length ? <span>· {post.tags.join(', ')}</span> : null}
      </div>

      {/* keep the existing MDX renderer call here */}
      <div className="prose-none">
        {post.content /* or <MDXContent {...} /> as used today */}
      </div>

      {/* If prev/next exist: */}
      {/*
      <div className="mt-16 border-t border-hairline pt-6 grid grid-cols-2 gap-4 text-[13px]">
        {prev ? (
          <Link href={`/blog/${prev.slug}`} className="text-muted-foreground hover:text-accent">← {prev.title}</Link>
        ) : <span />}
        {next ? (
          <Link href={`/blog/${next.slug}`} className="text-right text-muted-foreground hover:text-accent">{next.title} →</Link>
        ) : <span />}
      </div>
      */}
    </article>
  );
}
```

Uncomment the prev/next block only if a matching loader exists; otherwise leave it commented and move on (out of scope per spec acceptance).

- [ ] **Step 5: Verify** at `http://localhost:3000/blog/<some-slug>` — title, meta, MDX paragraphs and code blocks render in new palette; toggle theme to confirm both modes look right.

- [ ] **Step 6: Commit.**

```bash
git add app/[locale]/blog/[slug]/page.tsx components/MDXComponents.tsx next.config.mjs
git commit -m "feat(blog): restyle post detail and MDX"
```

(Drop `next.config.mjs` from the `git add` if shiki theme lived elsewhere.)

---

## Task 14 — Restyle `posts` route

**Files:**
- Modify: `app/[locale]/posts/page.tsx`

- [ ] **Step 1: Read current file.** If it's a near-duplicate of `blog/page.tsx`, apply the same grouped-by-year row layout from Task 12. If it serves a different purpose (e.g. notes vs. posts), preserve the data source and only swap the markup to use `Row` + `SectionLabel`.

- [ ] **Step 2: Apply the same row treatment** as Task 12. Heading text: `posts` (lowercase).

- [ ] **Step 3: Verify** at `http://localhost:3000/posts`.

- [ ] **Step 4: Commit.**

```bash
git add app/[locale]/posts/page.tsx
git commit -m "feat(posts): restyle posts route to match new shell"
```

---

## Task 15 — Final QA pass

- [ ] **Step 1: Build.**

Run: `npm run build`
Expected: build succeeds.

- [ ] **Step 2: Walk the site in both themes.**

Run: `npm run dev`
Check each route in both light and dark mode:
- `/` — all 5 sections render, sidebar scroll-spy highlights active section
- `/blog` — list groups by year, tag chips work
- `/blog/<slug>` — MDX renders cleanly, code blocks themed correctly
- `/posts` — restyled
- Mobile width (`<1024px`) — top bar + drawer work, nav links scroll and close drawer

- [ ] **Step 3: Confirm admin/login untouched.**

Visit `/admin` and `/login` (or `/en/admin`, `/en/login`). They should still render — they don't use `SiteShell`. If they appear broken because they relied on the removed `Header`/`Footer`, restore those imports inside the admin/login layouts (not in `[locale]/layout.tsx`).

- [ ] **Step 4: Commit any QA fixes.**

```bash
git add -A
git commit -m "chore: QA pass for redesign"
```

---

## Notes for the executor

- **Translations:** never invent new keys. If a section needs copy you can't find in `locales/`, leave the existing copy in place — copy updates are out of scope.
- **Data sources:** every section preserves the existing data fetcher. Only the markup changes. If you can't find the fetcher, stop and ask rather than guessing.
- **CSS variable migration:** older components elsewhere in the app (admin, login) still read `bg-card`, `text-foreground`, etc. Because we kept the shadcn token *names* in Task 1, they should adapt to the new palette automatically. If something looks bad in admin, that's out of scope — note it in commit `chore: QA pass`.
- **Old Header/Footer/GetInTouch:** kept on disk for now. A follow-up cleanup PR can delete them once you confirm nothing else imports them. Use `grep -rn "from '@/components/Header'\|from '@/components/Footer'\|GetInTouch" --include="*.tsx"` to verify.
