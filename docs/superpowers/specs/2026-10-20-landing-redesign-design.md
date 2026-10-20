# Landing Redesign: "ebook" Design

Date: 2026-10-20
Status: approved by owner, 2026-10-20
Visual reference: `docs/superpowers/specs/2026-10-20-landing-redesign-mockup.html` (static mockup, open in a browser from the repo root or serve `public/` so `/images/*` paths resolve). The mockup's floating hint bubble in the bottom right corner is a mockup artifact and is not part of the design.

## Intent

The current landing page looks dated and boring. The new one should feel simple, clean and current, like a person flipping through an ebook. It must not look AI-generated.

Two audiences:

- Recruiters. They should understand who Serhii is within seconds, then write to him or download the CV.
- Fellow developers. They come mostly for the blog.

Inspiration came from vipertecpro.com (a calm neutral base, one accent color, mono-font meta labels, a faint grid, small motion like arrows nudging on hover and lines drawing in) and antfu.me/posts (quiet reading layout). Neither site is copied.

## Goals

1. Redesign the landing page (`app/[locale]/page.tsx`) and the shared shell (header, footer, Get In Touch) in the ebook style described below.
2. Redesign the blog list (`app/[locale]/blog/page.tsx`) and blog post page (`app/[locale]/blog/[slug]/page.tsx`) in the same style, so the site reads as one book.
3. Keep light and dark themes. Keep both locales (en, ua).
4. Make "Download CV" and the contact block easy to reach from anywhere on the page.

## Non-goals

- Blog comments and view counters. The owner wants them later, not in this round. The post page layout should leave room for them under the article, but nothing gets built.
- Page-by-page (paginated) reading. The page scrolls normally.
- `posts` and `events` routes (under `app/[locale]`) get no content redesign. They only inherit the new header and footer through the shared layout and must keep working.
- `app/admin` and `app/login` sit outside `app/[locale]` and do not get the new header or footer. They only must not break. `app/globals.css` applies to every page, so the color variable changes must leave the admin's shadcn styling readable.
- Changes to the database, auth or MDX content.

## Anti-goals

The redesign fails, even if it works, if any of these happen:

- It looks generated. Avoid bento tile grids, glowing cards, gradient text, "open to offers" pills, stats rows ("4+ years · 3 companies"), terminal `whoami` blocks, and a hero headline with one word in accent color. The owner rejected all of these when shown.
- Any UPPERCASE text used as styling (eyebrows, labels, tracking-wide caps). Sentence case only.
- Copy changes. All existing texts stay exactly as in `locales/en.json` and `locales/ua.json`. Company logos stay.
- Warm "paper" palettes and serif body fonts. The owner rejected Newsreader/Inter and the cream plus rust palette.

## Constraints

- Stack stays: Next.js 14 app router, Tailwind CSS, next-themes, next-intl, MDX via next-mdx-remote, shiki.
- Fonts must support Cyrillic (the ua locale).
- Texts come from the existing translation keys. New keys are allowed only for new UI words that have no existing text (see "New translation keys").
- Images come from `public/images` as today. CV stays at `/CV.pdf`.
- Respect `prefers-reduced-motion`: all motion turns off, content shows immediately.

## Visual system

### Fonts

- Onest (400, 500, 600) for everything. Onest is made by a Ukrainian studio and has native Cyrillic.
- JetBrains Mono (400, 500) for small meta text: section numbers, dates, location line, the running chapter label, copy hints.
- Load both with `next/font/google`, subsets `latin` and `cyrillic`. Replace the current Inter.

### Colors

Light theme:

| token | value |
|---|---|
| background | `#f7f7f8` |
| surface (cards, chips) | `#ffffff` |
| ink (main text) | `#18181b` |
| soft (secondary text) | `#6a6a73` |
| line (hairlines, borders) | `#18181b14` |
| grid | `#18181b0b` |
| accent | `#3563e9` |
| accent-soft (tag and hover tint) | `#3563e914` |

Dark theme:

| token | value |
|---|---|
| background | `#18181b` |
| surface | `#1f1f23` |
| ink | `#f1f1f3` |
| soft | `#9b9ba6` |
| line | `#ffffff14` |
| grid | `#ffffff09` |
| accent | `#7b9cff` |
| accent-soft | `#7b9cff1a` |

The "Online" dot is green `#22a55a`. The project already uses shadcn-style HSL variables in `app/globals.css`. Map these tokens onto those variables (or add new ones) so existing shadcn components used by admin pages keep working. The approach is the builder's call.

### Type scale (desktop, from the mockup)

- Hero h1: 52px, weight 600, letter-spacing -1.6px, line-height 1.05.
- Section h2: 30px, weight 600, letter-spacing -0.6px.
- Section lead (the existing `title` text under each heading): 17px, soft color.
- Body: 16px, line-height 1.65. Hero paragraph 18px.
- Mono meta: 11 to 12.5px.

Mobile sizes are the builder's call. The hero h1 must not wrap awkwardly at 360px width.

### Motion

All subtle and short. Taken from the mockup:

- A 2px accent reading progress bar fixed at the very top, width follows scroll.
- Sections fade up 14px once when they first enter the viewport.
- Experience rows: the top hairline of each row draws in from the left when the section is revealed.
- Links with arrows (`→ ↓ ↗`): the arrow shifts 3px on hover.
- Rows (jobs, posts) turn their title accent on hover.
- Skill cells get the accent-soft tint on hover and the icon lifts 2px.

## Layout

### Shell

- Sticky header with a blurred translucent background and a bottom hairline. Contents left to right:
  - Brand text `dychkos` linking home. (Builder's note: the current brand is `<dy />`. The mockup uses `dychkos`. This is my call, see "Calls made".)
  - Running chapter label in mono, for example `03 · My Experience`. It updates as the reader scrolls, like the running header of a book. Hidden on mobile.
  - Nav: About, Experience, Blog, Contact (existing `Header` keys). Hidden on mobile behind the existing burger menu.
  - "Download CV ↓" in accent, opens `/CV.pdf`.
  - Locale switcher (UA/EN) and theme toggle as small bordered buttons.
- Desktop ≥1000px: two columns inside a 1080px container. A 200px sticky "Contents" list on the left and a reading column up to 640px on the right, 64px gap.
- Below 1000px: the contents list is hidden, the reading column takes the full width with 24px side padding.
- Footer: top hairline, `Made with ❤ by Serhii Dychko` (existing key) on the left, current year in mono on the right.

### Contents list (left sidebar)

Numbered like a book's table of contents. Each entry is a mono number plus the section heading:

```
00  Hi
01  About me
02  Skills
03  My Experience
04  Latest in my tech notes
05  Get In Touch
```

The entry for the section in view is ink-colored with an accent number. The others are soft. Below the list, a 1px track fills with accent as the reader scrolls. Clicking an entry scrolls smoothly to the section.

### Sections (landing page)

Every section after the hero starts with a mono accent number (`01`), the existing heading as h2, and the existing `title` text as a lead paragraph.

00. Hero (`Preview`)
- Faint 28px grid behind the hero only, faded out with a radial mask so it has no hard edges.
- Row: `me.jpg` as a 76px rounded square (radius 18px), next to a mono block with `Kyiv, Ukraine` and the availability line (green dot plus `Online`, or `Offline` from the existing `isWorkingHoursInUkraine` helper, with a muted dot for Offline).
- h1: `greeting`. Paragraph: `about`.
- Links row: "Download CV ↓" (accent, primary), then GitHub, LinkedIn, Instagram with `↗` (existing URLs from `Preview.tsx`). Text links with a thin underline, not buttons.

01. About me
- No photo in this section. The owner removed the large `me-vertical.jpg` banner as out of place. The only photo on the page is the small one in the hero.
- `body` paragraphs, then `avocation`.
- Two chips: Adidas Running and Hevy with their logos and existing links, on surface background with a hairline border that turns accent on hover. Both logos are black outline SVGs, so they would vanish in dark mode. Render them as a CSS mask filled with `currentColor` (or inline them with `stroke="currentColor"`) so they take the text color in both themes and turn accent on hover with the label. The owner asked for this.
- `summary`, then the four `main` facts in a two-column list with an em-dash-like soft marker (one column on mobile).
- `last-thing`.

02. Skills
- 8 skills with their SVG icons in a 4-column grid of hairline-bordered cells (2 columns on mobile). The owner changed the list: PostgreSQL becomes MySQL and MongoDB becomes Elasticsearch. Final order: JavaScript, Laravel, NodeJS, React, Vue, Docker, MySQL, Elasticsearch. The two new icons are the colored "original" logos from Devicon v2.16.0 (MIT), saved as `public/images/icon-mysql.svg` and `public/images/icon-elasticsearch.svg`:
  - `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/mysql/mysql-original.svg`
  - `https://cdn.jsdelivr.net/gh/devicons/devicon@v2.16.0/icons/elasticsearch/elasticsearch-original.svg`
  The Elasticsearch logo has a dark grey `#343741` part that nearly disappears on the dark background. Check both icons in dark mode and lighten that part for dark mode if needed.
- Below: `combo` followed by `Laravel + React` in accent, weight 600 (replaces the old yellow gradient).

03. My Experience
- All 4 companies from translations. Each row: 44px company logo (radius 11px), role in weight 500 with the period in mono on the right, company name in soft text, responsibilities as a bullet list in soft text.
- Hairline above each row, drawn in on reveal.
- Logo plates. The logo files differ: Appflame and NewGen have their own solid backgrounds, FluidWeb is dark text on transparent, GrandySoft has white parts on transparent. A single white plate made GrandySoft's white parts vanish on the light theme (the owner flagged this). Each logo sits on a fixed plate that is the same in both themes, plus a 1px hairline ring so light plates don't merge into the light background:
  - Appflame: `#000`, logo fills the plate.
  - NewGen: `#0f1834`, logo fills the plate.
  - FluidWeb: `#ffffff`, logo contained with 5px padding.
  - GrandySoft: `#18181b`, logo contained with 5px padding.
  Keep this mapping next to the company data rather than in translations.

04. Latest in my tech notes (`PostsPreview`)
- 3 latest posts for the current locale from `getBlogPostsByLocale`. Each row: title (18px, weight 500), date and reading time in mono on the right, tags as small accent-soft pills on a second line.
- `more` link with an arrow to `/blog`.

05. Get In Touch
- Existing `heading` and `title`.
- A surface card with two rows: email and phone. Each row shows the value on the left and the existing copy hint in mono on the right (`Click to copy email`, `Click to copy phone`). Clicking copies and the hint briefly reads `Copied` (existing key).
- `other` text, then Threads, X, Telegram as text links with `↗` (existing URLs from `GetInTouch.tsx`).

### Phone easter egg

The phone is displayed in groups: `+380 73 404 25 36`. The copied value stays `+380734042536`.

On hover over the phone row, the last three groups scramble through random characters (`0-9 # % & *`) for about 280ms each and settle on new text:

- `404` becomes `not found`
- `25` becomes `5²`
- `36` becomes `6²`

The groups start 90ms apart and turn accent color. When the cursor leaves, they scramble back to the digits (60ms apart). A newer hover state cancels pending older animations, so the text never ends up stuck in the wrong state. On touch devices a tap plays it and it reverts after 2.2s. With reduced motion, the text swaps without scrambling. The mockup has a working implementation.

## Blog pages

The owner decided the blog list and post page are part of this round. Mockup: `docs/superpowers/specs/2026-10-20-blog-mockup.html` (a switch in the bottom right corner toggles between list and post, and is a mockup artifact).

### Blog list

- Same shell. The left column holds a "Contents" list of years that have posts, linking to the year groups.
- h1 from `Blog.index.title`, lead from `Blog.index.text`, then the post count in mono (`3 Posts`, using `Blog.index.postCount`).
- Posts grouped by year, newest first. Each year starts with a mono year label.
- Each post row: title (19px, weight 500, accent on hover), date (`Sep 20`) and reading time in mono on the right, the post `description` from frontmatter in soft text, tags as accent-soft pills.
- Keep the existing pagination behavior, restyled as a hairline-separated row with previous and next on the sides and `1 / 1` in mono in the middle. Year groups apply within the current page.

### Post page

- Same shell and reading progress bar. The article column is the same 640px reading column.
- Left column: a "Contents" list built from the article's h2 and h3 headings (they already get ids), h3 indented. The heading with id `table-of-contents` is skipped because several articles have their own in-text table of contents. The entry in view gets ink color and a small accent dot. A track under the list fills with scroll progress. Hidden below 1000px. h3 is needed because some articles have only one real h2 (for example "Security Headers for an Admin Panel" has 12 h3 and one h2).
- The running chapter label in the header shows the current h2 or h3 of the article.
- Top: back link (`backToBlog`) with `←` that nudges left on hover, h1 title (44px), `description` as the lead paragraph, then a mono meta line: `publishedOn` with the date, reading time, tags. A hairline separates it from the body.
- MDX body restyled to the tokens: Onest at 17px and line-height 1.7, h2 26px and h3 20px in weight 600, accent links with underline offset, blockquote with an accent left bar, inline code in JetBrains Mono on accent-soft. Keep shiki code blocks and their horizontal scroll, use themes that match light and dark, rounded 12px with a hairline border.
- Under the article: an empty, clearly separated area where comments and views will go later. In production it renders nothing visible but the layout leaves the slot (a wrapper component) so adding them later does not require layout changes. The dashed box in the mockup only marks the spot.
- At the very bottom: previous and next post cards (surface background, hairline border that turns accent on hover) with `←` and `→` and the post title. Previous is the older post, next is the newer one, within the current locale. A missing side leaves an empty cell.

## New translation keys

Only these UI words are new, in both locales:

- `Contents` label for the sidebar (landing, blog list and post page).
- `Hi` label for section 00 in the contents list and the running header.

## Calls made (not discussed with the owner)

- Brand text `dychkos` instead of `<dy />`.
- Section numbering 00 to 05 and the "Contents" sidebar are new UI, not copy.
- Offline state uses a muted dot.
- The post page contents list uses h2 and h3, skipping `table-of-contents`.
- Blog list groups posts by year and shows the frontmatter description.
- Previous and next post cards on the post page.

## Left to the builder

- How the tokens map onto the existing Tailwind and shadcn variables.
- Component structure and file names.
- Exact mobile spacing and the mobile menu styling, reusing `BurgerButton`.
- Exact shiki theme names.
