# Project Context — Personal Portfolio

## Stack
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Styled Components
- **Database + Storage:** Supabase
- **Package Manager:** npm

## Supabase Usage
- `projects` table — case study content (title, description, tags, cover image URL)
- Storage bucket — images and assets
- `/api/visitor` route — POST increments visitor counter, returns `{ count: number }`

## Folder Structure
```
portfolio/                        # project root
├── app/
│   ├── page.tsx                  # Home ✅ Done
│   ├── about/page.tsx            # About ✅ Done — 'use client'
│   ├── works/page.tsx            # Works — not started
│   ├── resume/page.tsx           # Resume ✅ Done — 'use client' (zoom state)
│   ├── contact/page.tsx          # Contact — not started
│   └── layout.tsx                # Global layout (Navbar + Footer + PersonalAgent)
├── components/
│   ├── common/
│   │   ├── Navbar.tsx            ✅ Done — desktop glass pill + mobile bottom pill
│   │   ├── Footer.tsx            ✅ Done — visitor counter wired to /api/visitor
│   │   ├── Button.tsx            ✅ Done
│   │   ├── PersonalAgent.tsx     ✅ Done (hidden globally via display:none — interaction TBD)
│   │   └── Layout.tsx            ✅ Done — ThemeProvider + PageWrapper + Main
│   ├── home/
│   │   ├── Landing.tsx           ✅ Done
│   │   ├── AboutBrief.tsx        ✅ Done
│   │   ├── Interests.tsx         ✅ Done
│   │   ├── FeatureProduct.tsx    ✅ Done
│   │   ├── AwardShelf.tsx        ✅ Done
│   │   └── MyWorks.tsx           ✅ Done
│   ├── about/
│   │   ├── IntroSection.tsx      ✅ Done — title, subtitle, professional/personal mode toggle
│   │   ├── ProfileImage.tsx      ✅ Done — 1168px banner, 6 floating SVG icons, profile photo
│   │   ├── AboutDescription.tsx  ✅ Done — bio paragraph, IST clock, highlights table
│   │   ├── MyTools.tsx           ✅ Done — desktop dock + separate MobileGrid (6×2 static grid)
│   │   ├── Journey.tsx           ✅ Done — CAREER LADDER label, UST + FunDesigns only, shimmer bullets
│   │   ├── ProfessionalTimeline.tsx         ✅ Done — desktop horizontal scrollable timeline
│   │   ├── ProfessionalTimelineMobile.tsx   ✅ Done — mobile vertical timeline
│   │   ├── Companies.tsx         ⚠️  Removed from page — no longer in Figma spec
│   │   └── AwardShelf.tsx        ✅ Done — 5 award cards with seal images
│   ├── works/
│   ├── resume/
│   │   ├── PageHeader.tsx        ✅ Done — centered "Resume." title + subtitle
│   │   ├── Toolbar.tsx           ✅ Done — PDF metadata + zoom/print (desktop only)
│   │   ├── ResumeCanvas.tsx      ✅ Done — react-pdf viewer, CSS transform zoom
│   │   └── DownloadSection.tsx   ✅ Done — dark card, Download + Email Enric CTAs
│   ├── contact/
│   └── shared/
│       ├── SectionLabel.tsx      ✅ Done — 16px desktop / 12px mobile, no pill/chip styling
│       ├── SectionHeader.tsx     ✅ Done — 32px/40px desktop / 24px/32px mobile
│       ├── DiamondBullet.tsx     ✅ Done
│       └── ModeToggle.tsx        ✅ Done — left/right knob toggle, hover-preview animation
├── styles/
│   ├── theme.ts                  ✅ Done — colors, fonts, spacing, breakpoints (bp + mq)
│   ├── GlobalStyle.ts            ✅ Done
│   └── StyledComponentsRegistry.tsx  ✅ Done — SSR fix for styled-components + Next.js
├── lib/
│   └── supabase.ts               ✅ Done
├── hooks/                        # Custom hooks (useProjects, etc.)
├── types/                        # Shared TypeScript interfaces
└── CLAUDE.md                     # This file
```

> ⚠️ No `src/` directory — all paths are relative to project root. Never create a src/ folder.

## Existing Components (DO NOT recreate)
- `components/common/Navbar.tsx` ✅
- `components/common/Footer.tsx` ✅
- `components/common/Button.tsx` ✅
- `components/common/PersonalAgent.tsx` ✅
- `components/common/Layout.tsx` ✅
- `components/shared/SectionLabel.tsx` ✅
- `components/shared/SectionHeader.tsx` ✅
- `components/shared/DiamondBullet.tsx` ✅
- `components/shared/ModeToggle.tsx` ✅
- All `components/home/*.tsx` ✅
- `components/about/IntroSection.tsx` ✅
- `components/about/ProfileImage.tsx` ✅
- `components/about/AboutDescription.tsx` ✅
- `components/about/MyTools.tsx` ✅
- `components/about/Journey.tsx` ✅
- `components/about/ProfessionalTimeline.tsx` ✅
- `components/about/ProfessionalTimelineMobile.tsx` ✅
- `components/about/AwardShelf.tsx` ✅
- `components/resume/PageHeader.tsx` ✅
- `components/resume/Toolbar.tsx` ✅
- `components/resume/ResumeCanvas.tsx` ✅
- `components/resume/DownloadSection.tsx` ✅

## Breakpoint System
Defined in `styles/theme.ts` — import `mq` directly, never write raw media queries:
```ts
export const mq = {
  mobile:       '@media (max-width: 768px)',
  tablet:       '@media (min-width: 769px) and (max-width: 1024px)',
  tabletDown:   '@media (max-width: 1024px)',
  smallDesktop: '@media (min-width: 1025px) and (max-width: 1280px)',
  largeDesktop: '@media (min-width: 1281px)',
}
```

## Responsive Rules (established patterns)
- **Mobile** (`mq.mobile`, ≤768px): single-column, 24px horizontal padding, `max-width: none`
- **Tablet** (`mq.tablet`, 769–1024px): side-by-side layouts preserved where possible, `padding: 0 24px`
- **Desktop** (>1024px): base styles, `max-width: 1168px` content width
- `FeatureProduct`: horizontal at tablet AND desktop — stacks only on mobile
- `MyWorks WorkCard`: side-by-side at tablet AND desktop — stacks only on mobile
- `Footer InfoRow`: `flex-wrap: wrap` at tablet
- Full-bleed escape in centered flex parent: use `align-self: stretch; width: auto; margin-left: -24px; margin-right: -24px` (not `calc(100% + 48px)`)

## Navbar — Mobile Bottom Pill
- **Desktop**: 5 nav links (Home, About, Work, Resume, Contact) — glass pill, fixed top-center
- **Mobile**: 4 nav links (Home, About, Work, Contact) — **Resume omitted** — solid bottom pill
- Mobile pill ends with: vertical separator + agent icon button (placeholder, `onClick={() => {}}`)
- Agent icon: `/icons/agent.svg` — stored as `AGENT_ICON` constant in Navbar.tsx
- PersonalAgent is fully hidden (`display: none`) everywhere — mobile interaction TBD

## PersonalAgent
- Currently `display: none` everywhere (Wrapper has `display: none` as the only rule)
- ⌘K / Ctrl+K shortcut wired but has no visible effect while hidden
- Mobile agent trigger button exists in Navbar but is a no-op placeholder
- Interaction design not yet defined — do not implement until specified

## Design Tokens
- All tokens in `styles/theme.ts` ✅ — colors, fonts, font sizes, line heights, spacing, radii, breakpoints
- **Never hardcode hex values or px values** — always use `theme.*` tokens
- Exception: Figma-derived layout measurements (icon positions, photo dimensions) may be hardcoded px constants at the top of the component file
- Exception: breakpoint media queries use `mq.*` imported directly (not via ThemeProvider)


## Key Theme Tokens (quick reference)
```ts
fontSizes:   xs=12px, sm=16px, md=24px, lg=32px, xl=40px, 2xl=48px, 3xl=64px
lineHeights: tight=16px, snug=20px, normal=24px, relaxed=32px, loose=40px
spacing:     [1]=4px, [2]=8px, [3]=12px, [4]=16px, [6]=24px, [8]=32px, [10]=40px
layout.maxWidth = '1168px'
radii:       lg=12px, xl=16px, 2xl=20px, 3xl=24px, full=9999px
```

## Architecture Rules
- Every visual section = its own component file, even if used once
- Page files only import and compose sections — zero JSX logic in pages
- Page-specific components → `components/[page-name]/`
- Cross-page components → `components/shared/`
- Global components → `components/common/` (Navbar, Footer, Layout, PersonalAgent)
- Styled Components only — no inline styles, no CSS/Tailwind
- All color, font, spacing values come from `theme.ts` via ThemeProvider — no hardcoded hex or px values ever
- TypeScript strict mode — all props typed via interfaces
- Never recreate any component listed under Existing Components above
- PersonalAgent goes inside `app/layout.tsx` so it appears on every page

## Component Pattern
```tsx
interface Props {
  // typed props
}

const ComponentName = ({ prop }: Props) => {
  return (
    <Wrapper>
      {/* content */}
    </Wrapper>
  )
}

const Wrapper = styled.div`
  // styles using theme
`

export default ComponentName
```

---

## Pages

### Home ✅ Complete
- [x] `Landing.tsx` — hero, photo row (bleed on mobile), marquee, company logo strip
- [x] `AboutBrief.tsx` — bio + 3 animated count-up stats
- [x] `Interests.tsx` — scrolling ticker
- [x] `FeatureProduct.tsx` — Plush feature card
- [x] `AwardShelf.tsx` — award medallions
- [x] `MyWorks.tsx` — 3 WorkCards with Figma gradients
- [x] `Footer.tsx` — visitor counter, heart ↔ hourglass toggle

### About ✅ Done
**Figma frames:** Desktop `248:1175` · Mobile `284:834`

**Page file:** `app/about/page.tsx` — marked `'use client'`

**Composition:**
```
PageSections (62px gap)
  └── LandingGroup (80px gap)
        ├── IntroSection
        ├── ProfileImage
        └── AboutDescription
  MyTools
  Journey
  ProfessionalTimeline        ← desktop (hidden on mobile)
  ProfessionalTimelineMobile  ← mobile (hidden on desktop)
  AwardShelf
```

#### IntroSection.tsx ✅
- `'use client'`, `useState<Mode>('professional' | 'personal')`
- PageTitle "About Me." (Period in `colors.text.secondary`)
- PageSubtitle "Two sides of one designer"
- ModeToggle (from `components/shared/ModeToggle.tsx`) between two ModeLabel buttons
- ModeLabel: `fontSizes.sm` (16px) on mobile, `fontSizes.lg` (32px) desktop, notch bold, color changes on `$active`
- PersonalNote renders when `mode === 'personal'`
- Mobile: padding-top 40px, reduced gaps

#### ProfileImage.tsx ✅
- Figma node: `248:1186` (Image Banner)
- **Banner**: `position: relative; width: 1168px; height: 470px; overflow: clip`
  - On `tabletDown`: `display: flex; justify-content: center; height: auto; overflow: visible`
- **PhotoCenter**: `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center`
  - On `tabletDown`: `position: static; display: contents` (passes children to Banner flex)
- **PhotoGroup**: `431px` wide on desktop, `360px` tablet, `min(257px, 100%)` mobile
- **CirclePhoto**: `profile-group.png` — 431×470 RGBA, renders `width: 100%; height: auto`
- **6 floating icons**: `IconBox` (position + rotation) + `IconImg` (size) — hidden on `tabletDown`
  - Icon sources: `/about/icons/icon-1.svg` … `icon-6.svg`
  - Positions/rotations from Figma (all absolute within Banner):
    - Icon 1: left 29.76, top 331.64, rotate +12.94°, img 65×72
    - Icon 2: left 95.57, top 41.12, rotate −12.29°, img 72×68.174
    - Icon 3: left 235.11, top 219.91, rotate +3.42°, img 72×65.571
    - Icon 4: left 873, top 75, no rotation, img 60.832×72
    - Icon 5: left 929.25, top 315.93, rotate −8.74°, img 72×68
    - Icon 6: left 1052, top 150, rotate +14.87°, img 72×72

#### ModeToggle.tsx ✅ (shared)
- `'use client'`, props: `selection: 'left'|'right'`, `onToggle: (side) => void`
- Internal `isHovered` state: on hover, knob previews the OPPOSITE side
- `Pill` div (not a native button) — `role="button"`, `tabIndex={0}`, `cursor: pointer`
- `Knob`: `position: absolute; top: 6px; left: 6px; 40×40px; pointer-events: none; z-index: 1`
  - Animates via `transform: translateX(0)` (left) ↔ `translateX(44px)` (right)
  - Mobile: 24×24px, translateX(26px)
- Two `Slot` divs (40×40 desktop, 24×24 mobile, `position: relative; z-index: 0`) contain `NotSelectedRing` SVGs
- `ArrowSvg` rotates 180° when on left side

#### AboutDescription.tsx ✅
- TitleBlock: `SectionLabel` + `SectionHeader`, no gap (Figma spec)
- Bio paragraph: `fontSizes.md` (24px) desktop, `fontSizes.sm` (16px) mobile
- Highlights table: 453px desktop, 360px tablet, 100% mobile
- ContentRow: side-by-side desktop, stacked mobile
- IST clock live in `ValueRegular` span

#### MyTools.tsx ✅
- **Desktop** (`DockContainer`): flex row, 64×64px icons, `translateY` hover magnification (RISE=16px, RISE_NEIGHBOR=8px), `border-radius: 24px`
  - Hidden on mobile via `display: none` in `mq.mobile`
- **Mobile** (`MobileGrid`): completely separate DOM element, `display: none` on desktop, `display: grid` on mobile
  - `grid-template-columns: repeat(6, min(40px, calc((100% - 24px - 40px) / 6)))` — icons capped at 40px, fluid below
  - `width: 100%; justify-content: start; padding: 12px; box-sizing: border-box`
  - `MobileCell`: `aspect-ratio: 1/1; border-radius: 12px; overflow: hidden`
  - No `$y` prop, no hover, no magnification — immune to styled-components dynamic class cascade
- ⚠️ Do NOT add mobile styles to `IconSlot` or `DockContainer` — the cascade issue (styled-components dynamic classes overriding media queries) is avoided by the separate MobileGrid approach

#### Journey.tsx ✅
- Label: `"CAREER LADDER"` — SectionLabel + SectionHeader, no gap
- 2 entries only: UST (Aug 2024–Present), FunDesigns (May–Jul 2024) — CCE removed
- Bullet assets: `bullet-shimmer.svg`, `bullet-dot.svg`, `bullet-container.svg`
- Desktop: horizontal description columns (4 per entry), ConnectorLine between entries
- Mobile: vertical layout, BulletImg/BulletInnerDot/DateTag hidden, ConnectorCol hidden
  - RoleTitle: `white-space: normal; word-break: break-word` on mobile
  - Column: `::before` CSS diamond bullet (8px rotate 45deg, `colors.text.highlight`), only first 2 columns shown

#### AwardShelf.tsx ✅ (about)
- 5 awards: Awwwards Young Jury, USTAR, Awwwards Honors, Config APAC, Huddle Designers
- Label swaps on mobile: "Recognition" (desktop) → "ACHIEVEMENTS" (mobile) via `DesktopLabel`/`MobileLabel` wrappers
- Seals from `public/about/seals/`: `awwwards.png`, `ust.png`, `figma.png`, `ksum.png`
- AwardsRow: horizontal scroll on mobile with `scroll-snap-type: x mandatory`

#### ProfessionalTimeline.tsx ✅ (desktop)
- Hidden on mobile (`display: none` in `mq.mobile`)
- Horizontal scrollable timeline with photo strip and year labels
- TitleBlock: no gap (Figma spec)

#### ProfessionalTimelineMobile.tsx ✅ (mobile)
- Hidden on desktop (`display: none` above `mq.mobile`)
- Vertical timeline layout
- TitleBlock: no gap (Figma spec)

---

### Resume ✅ Done
**Figma frames:** Desktop `282:772` · Mobile `306:1320`

**Page file:** `app/resume/page.tsx` — `'use client'` (zoom state lives here)

**Dependencies:** `react-pdf@10.4.1` — installed via `npm install react-pdf`

**Composition:**
```
PageSections (pt: 140px desktop / 6rem tablet / 40px mobile)
  └── HeaderGroup (gap: 80px desktop / 24px mobile)
        ├── PageHeader
        └── DetailsGroup (gap: 40px desktop / 32px mobile)
              ├── Toolbar       zoom + onZoomIn + onZoomOut props
              ├── ResumeCanvas  zoom prop
              └── DownloadSection
```

**Zoom state (page.tsx):**
- `useState(100)` — default 100%
- `ZOOM_MIN / ZOOM_MAX / ZOOM_STEP` imported from `Toolbar.tsx` (50 / 150 / 10)
- `onZoomIn`: `setZoom(z => Math.min(z + ZOOM_STEP, ZOOM_MAX))`
- `onZoomOut`: `setZoom(z => Math.max(z - ZOOM_STEP, ZOOM_MIN))`

#### PageHeader.tsx ✅
- Centered "Resume." title — period in `colors.text.secondary`
- Subtitle "The one pager" — `fonts.sans` regular, `fontSizes.sm` desktop / `fontSizes.xs` mobile

#### Toolbar.tsx ✅
- **Left — File info**: PDF icon (`/icons/pdf.svg`) + filename + `1 page · 1.25 MB · A4` metadata
- **Right — Controls** (desktop only, `display: none` on mobile):
  - `ControlsBox`: `surface.tertiary` bg, `radii.md`, zoom minus/label/plus + print icon
  - Zoom buttons disabled at `ZOOM_MIN` (50) and `ZOOM_MAX` (150)
  - Print: injects a hidden `position: fixed; top: -100px` iframe, loads `/resume.pdf`, calls `contentWindow.print()` — no new tab
- Exports `ZOOM_MIN`, `ZOOM_MAX`, `ZOOM_STEP` constants for page.tsx
- Icons from `/icons/`: `pdf.svg`, `minus.svg`, `add.svg`, `print.svg` — `<img>` tags, not inline SVGs
- Max-width: 880px

#### ResumeCanvas.tsx ✅
- Uses `react-pdf` — `Document` + `Page` components
- Worker: `pdfjs.GlobalWorkerOptions.workerSrc = new URL('pdfjs-dist/build/pdf.worker.min.mjs', import.meta.url).toString()`
- Import `'react-pdf/dist/Page/TextLayer.css'` for text selection layer
- **Zoom approach — CSS transform only (never re-renders on zoom):**
  - Page always renders at `CARD_W = 820px` fixed width
  - `PdfCard` gets `transform: scale(zoom / 100)` + `transform-origin: top center`
  - `Canvas` height = `CANVAS_PADDING_V * 2 + CARD_H * (zoom / 100)` (explicit — transform is visual-only)
- **Mobile:** `mobileWidth = window.innerWidth - 80` (resize listener), Page renders at mobile width, `PdfCard transform: none`
- `loading={<></>}` on both Document and Page — suppresses flash during initial load
- PDF file: `public/resume.pdf` — place manually, no dynamic fetch

#### DownloadSection.tsx ✅
- Dark `surface.inverse` card, max-width 1168px
- Left: "TAKE IT WITH YOU" label + "Download the Resume." heading (Resume in `text.highlight`) + last updated date
- Right: Download button (`<a href="/resume.pdf" download>`) + Email Enric (`mailto:`)
- Mobile: stacks vertically, `gap: spacing[6]`
- Button mobile: `padding: 12px 16px`, text `14px / 18px`, icon pill `16×16px`

---

## Figma
- File: https://www.figma.com/design/cGxPfzhfg2zi9MivaiE7dX/Enric-S-Neelamkavil-|-Portfolio?node-id=136-3016
- Annotations in Figma are implementation instructions — always read and follow them
- Sections marked "Dynamic" → wire to Supabase
- Sections marked "Static" → hardcode content
- Sections marked "Reusable" → place in `components/shared/`
- **Always re-fetch Figma nodes fresh** — asset URLs and design values expire between sessions

### Known Figma Node IDs
| Section | Desktop | Mobile |
|---|---|---|
| Full page | `136:3016` | — |
| About (professional) | `248:1175` | `284:834` |
| About — Image Banner | `248:1186` | — |
| Resume (full frame) | `282:772` | `306:1320` |
| Resume — Page Header | `282:775` | `306:1323` |
| Resume — Toolbar | `282:779` | `306:1599` |
| Resume — Canvas | `282:801` | `306:1617` |
| Resume — PDF Card | `282:802` | `306:1618` |
| Resume — Download Section | `282:803` | `306:1649` |

### Title Container — Figma Spec (applies everywhere SectionLabel + SectionHeader are stacked)
| | Desktop (LG) | Mobile (SM) |
|---|---|---|
| SectionLabel font-size | `fontSizes.sm` = 16px | `fontSizes.xs` = 12px |
| SectionLabel line-height | `lineHeights.normal` = 24px | `lineHeights.tight` = 16px |
| SectionHeader font-size | `fontSizes.lg` = 32px | `fontSizes.md` = 24px |
| SectionHeader line-height | `lineHeights.loose` = 40px | `lineHeights.relaxed` = 32px |
| Gap between label + header | **0** | **0** |
| Padding on container | none | none |

> These values are implemented in `SectionLabel.tsx` and `SectionHeader.tsx` — do not add gap to any `TitleBlock`/`TitleContainer` wrapper.

---

## About Page — Asset Paths
```
public/about/
├── profile-group.png          # 431×470 RGBA — composited circle photo (hair + circle baked in)
├── icons/
│   ├── icon-1.svg             # floating icon — bottom-left
│   ├── icon-2.svg             # floating icon — upper-left
│   ├── icon-3.svg             # floating icon — left-center
│   ├── icon-4.svg             # floating icon — right-top
│   ├── icon-5.svg             # floating icon — right-bottom
│   └── icon-6.svg             # floating icon — far-right (unified)
├── seals/
│   ├── awwwards.png
│   ├── ust.png
│   ├── figma.png
│   └── ksum.png
└── journey/
    ├── ust-icon.svg
    ├── fundesigns-icon.svg
    ├── bullet-shimmer.svg
    ├── bullet-dot.svg
    └── bullet-container.svg
```

---

## Supabase Client
```ts
// lib/supabase.ts
import { createClient } from '@supabase/supabase-js'

export const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL!,
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
)
```

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://rdkhdnbzhuwvthxagzdz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_630z8GqkaL53xi1EXO_1HQ_VZ-t3EoZ
```

## Landing — Company Logo Marquee
- 10 logos, all local SVGs: `public/company logos/{remax,apro-it,urbantrash,irisholidays,ust,vurse,fundesigns,opengrad,deep5,mulearn}-logo.svg`
- Defined as `LOGO_PATHS` constant in `Landing.tsx` — doubled in JSX for seamless infinite marquee
- Marquee pauses on hover; full-viewport-width on mobile via negative-margin escape

---

## What's Next

### Other Pages
- [ ] Build Works page (`app/works/page.tsx`)
- [ ] Build Contact page (`app/contact/page.tsx`)
- [x] ~~Build Resume page (`app/resume/page.tsx`)~~ ✅ Done

### Global
- [ ] Wire MyWorks to Supabase (`projects` table) when Works page is ready
- [ ] Define and implement PersonalAgent mobile interaction
- [ ] Wire PersonalAgent to `/api/agent` (Anthropic SDK)
