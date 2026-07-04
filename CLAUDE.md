# Project Context — Personal Portfolio

## Stack
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Styled Components
- **Database + Storage:** Supabase
- **Package Manager:** npm

## Supabase Usage
- `projects` table — case study content (title, description, tags, cover image URL)
- `timeline_events` table — professional timeline cards; fetched server-side in `app/about/page.tsx`
- Storage bucket — images and assets
- `/api/visitor` route — POST increments visitor counter, returns `{ count: number }`

## Folder Structure
```
portfolio/                        # project root
├── app/
│   ├── page.tsx                  # Home ✅ Done
│   ├── about/page.tsx            # About ✅ Done — server component; fetches timeline_events, renders AboutClient
│   ├── works/page.tsx            # Works ✅ Done — 'use client' (WorksClient), filter state, Supabase connected
│   ├── resume/page.tsx           # Resume ✅ Done — 'use client' (zoom state)
│   ├── contact/page.tsx          # Contact ✅ Done — 'use client', two-column sticky layout
│   ├── api/
│   │   ├── visitor/route.ts      # POST — increments visitor counter
│   │   └── contact/route.ts      # POST — Resend email to enricsneelamkavil@gmail.com
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
│   │   ├── AboutClient.tsx               ✅ Done — 'use client'; all About page state/layout; accepts timelineEvents prop
│   │   ├── HeaderImage.tsx               ✅ Done — ENRIC letterform mask over panoramic banner photo
│   │   ├── ModeTogglePill.tsx            ✅ Done — bottom mode toggle pill; jiggle arrow animation on hover
│   │   ├── IntroSection.tsx              ✅ Done — title, subtitle, professional/personal mode toggle
│   │   ├── ProfileImage.tsx              ✅ Done — accepts mode prop; different photo + icons per mode
│   │   ├── AboutDescription.tsx          ✅ Done — bio paragraph, IST clock, highlights table
│   │   ├── MyTools.tsx                   ✅ Done — desktop dock + separate MobileGrid (6×2 static grid)
│   │   ├── Journey.tsx                   ✅ Done — CAREER LADDER label, 3 entries: UST + FunDesigns + Freelance
│   │   ├── ProfessionalTimeline.tsx      ✅ Done — 12-card horizontal scroll; Supabase-connected; accepts events prop
│   │   ├── AwardShelf.tsx                ✅ Done — 5 award cards with seal images
│   │   ├── PersonalAboutDescription.tsx  ✅ Done — personal bio + To Do List widget
│   │   ├── TravelSection.tsx             ✅ Done — travel title, desktop map, mobile flags/stats, albums
│   │   ├── TravelMap.tsx                 ✅ Done — next/dynamic SSR wrapper for TravelMapClient
│   │   ├── TravelMapClient.tsx           ✅ Done — draggable map canvas with pins, flags, stats
│   │   ├── WorkDeskSection.tsx           ✅ Done — desk photo + gear inventory list
│   │   ├── PodcastMediumSection.tsx      ✅ Done — podcast card + medium articles list
│   │   └── CreditCardsSection.tsx        ✅ Done — 2×4 desktop grid + mobile swipe stack
│   ├── works/
│   │   ├── PageHeader.tsx        ✅ Done — centered "Work." title + subtitle
│   │   ├── FilterRow.tsx         ✅ Done — filter chips: All / Case Study / Landing / Brand Identity
│   │   ├── FeaturedCard.tsx      ✅ Done — Plush featured card, shown when filter is 'all'
│   │   ├── WorkCard.tsx          ✅ Done — project card, used in WorksGrid
│   │   ├── WorksGrid.tsx         ✅ Done — grid layout, receives filtered projects
│   │   └── WorksClient.tsx       ✅ Done — 'use client', filter state, Supabase fetch
│   ├── resume/
│   │   ├── PageHeader.tsx        ✅ Done — centered "Resume." title + subtitle
│   │   ├── Toolbar.tsx           ✅ Done — PDF metadata + zoom/print (desktop only)
│   │   ├── ResumeCanvas.tsx      ✅ Done — next/dynamic wrapper (ssr: false) for SSR safety
│   │   ├── ResumeCanvasClient.tsx ✅ Done — all react-pdf code, client-only
│   │   └── DownloadSection.tsx   ✅ Done — dark card, Download + Email Enric CTAs
│   ├── contact/
│   │   ├── PageHeader.tsx        ✅ Done — centered "Contact Me." title + "Let's talk" subtitle
│   │   ├── EnquiryForm.tsx       ✅ Done — 'use client', chips + fields + Resend API submission
│   │   ├── DirectContact.tsx     ✅ Done — 'use client', IST clock, Based/Email/Phone rows
│   │   ├── Services.tsx          ✅ Done — dark card, 4 service rows, red separators
│   │   ├── Elsewhere.tsx         ✅ Done — 8 social platforms, 4×2 desktop grid
│   │   └── EmailFallback.tsx     ✅ Done — dark card, email link, agent note
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
│   ├── supabase.ts               ✅ Done
│   ├── timeline.ts               ✅ Done — TimelineEvent interface + getTimelineEvents() (orders by sort_order ASC)
│   └── pdfWorker.ts              ✅ Done — sets pdfjs worker URL (currently unused; worker set in ResumeCanvasClient.tsx instead)
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
- `components/about/AboutClient.tsx` ✅
- `components/about/HeaderImage.tsx` ✅
- `components/about/ModeTogglePill.tsx` ✅
- `components/about/IntroSection.tsx` ✅
- `components/about/ProfileImage.tsx` ✅
- `components/about/AboutDescription.tsx` ✅
- `components/about/MyTools.tsx` ✅
- `components/about/Journey.tsx` ✅
- `components/about/ProfessionalTimeline.tsx` ✅
- `components/about/AwardShelf.tsx` ✅
- `components/about/PersonalAboutDescription.tsx` ✅
- `components/about/TravelSection.tsx` ✅
- `components/about/TravelMap.tsx` ✅
- `components/about/TravelMapClient.tsx` ✅
- `components/about/WorkDeskSection.tsx` ✅
- `components/about/PodcastMediumSection.tsx` ✅
- `components/about/CreditCardsSection.tsx` ✅
- `components/works/PageHeader.tsx` ✅
- `components/works/FilterRow.tsx` ✅
- `components/works/FeaturedCard.tsx` ✅
- `components/works/WorkCard.tsx` ✅
- `components/works/WorksGrid.tsx` ✅
- `components/works/WorksClient.tsx` ✅
- `components/resume/PageHeader.tsx` ✅
- `components/resume/Toolbar.tsx` ✅
- `components/resume/ResumeCanvas.tsx` ✅
- `components/resume/ResumeCanvasClient.tsx` ✅
- `components/resume/DownloadSection.tsx` ✅
- `components/contact/PageHeader.tsx` ✅
- `components/contact/EnquiryForm.tsx` ✅
- `components/contact/DirectContact.tsx` ✅
- `components/contact/Services.tsx` ✅
- `components/contact/Elsewhere.tsx` ✅
- `components/contact/EmailFallback.tsx` ✅

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
- **Mobile** (`mq.mobile`, ≤768px): single-column, 24px horizontal padding handled by `Layout.tsx` globally — do NOT add `padding: 0 24px` to individual section wrappers
- **Tablet** (`mq.tablet`, 769–1024px): side-by-side layouts preserved where possible
- **Desktop** (>1024px): base styles, `max-width: 1168px` content width
- `FeatureProduct`: horizontal at tablet AND desktop — stacks only on mobile
- `MyWorks WorkCard`: side-by-side at tablet AND desktop — stacks only on mobile
- `Footer InfoRow`: `flex-wrap: wrap` at tablet
- Full-bleed horizontal scroll (albums, awards): use `overflow-x: auto; scroll-snap-type: x mandatory` on container, `scroll-snap-align: start; flex-shrink: 0` on cards — no negative-margin bleed escapes
- Travel map desktop canvas hides at `mq.tabletDown` (≤1024px), not just mobile
- Contact two-column layout collapses at `mq.tabletDown` (≤1024px) — right col (500px) + gap leaves left col too narrow at tablet

## globals.css — Known Global Rule
`app/globals.css` uses `overflow-x: clip` on `html, body` (NOT `overflow-x: hidden`). This is intentional — `hidden` promotes body/html as the scroll container which silently breaks `position: sticky` everywhere. `clip` prevents horizontal overflow without creating a new scroll context.

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

## Icon Color Convention
- All SVG icons in `/icons/` are designed in `text.secondary` color (`#5C5C5C`) by default
- **Never assume the default color is correct** — always check Figma for the intended color at each specific usage point
- Apply the correct color via CSS `filter` or a fill override (e.g. wrapping the `<img>` in a styled element with `color` + `filter: brightness(...)` or using an inline SVG with `currentColor`)
- This applies to every icon from `/icons/` used in any component

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

### Works ✅ Done
**Figma frames:** Desktop `390:1745` · Mobile `390:1079`

**Page file:** `app/works/page.tsx` — server component; renders `WorksClient` which handles all interactivity

**Components:**
- `PageHeader.tsx` — centered "Work." title + subtitle
- `FilterRow.tsx` — filter chips: All / Case Study / Landing / Brand Identity
- `FeaturedCard.tsx` — Plush featured card, only shown when filter is `'all'`
- `WorkCard.tsx` — individual project card used in `WorksGrid`
- `WorksGrid.tsx` — grid layout, receives filtered projects array
- `WorksClient.tsx` — `'use client'`; owns filter state, fetches from Supabase `projects` table, filters by `type` field (`case-study` / `landing` / `brand-identity`), passes filtered list to `WorksGrid`

---

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

**Page file:** `app/about/page.tsx` — server component; `export const dynamic = 'force-dynamic'`; fetches `timeline_events` from Supabase, passes to `<AboutClient timelineEvents={events} />`

**Client component:** `components/about/AboutClient.tsx` — `'use client'`; manages `mode: 'professional' | 'personal'` state + snapping animation

**Behaviour:**
- Mode persisted to `localStorage` key `portfolio_about_mode` — restored on mount via `useEffect`
- On mode change: `snapping` state fires `scale(0.98)` on ModeContent for 150ms, then snaps back; page scrolls to top smoothly
- `handleModeChange` wired to both the top `IntroSection` toggle and the bottom `ModeTogglePill`

**Composition — both mode groups always in DOM; inactive is `position: absolute` so it takes no layout height:**
```
PageSections (gap: 32px desktop / 24px tablet / 24px mobile)
  IntroBlock
    SharedPageHeader
    HeaderImage                         ← ENRIC letterform mask over banner photo

  ModeContent (position: relative; overflow: clip)
    ModeGroup $active=professional      ← active = position: relative; inactive = position: absolute top:0 left:0
      AboutDescription
      MyTools
      Journey
      ProfessionalTimeline              ← single responsive component; receives events prop
      AwardShelf

    ModeGroup $active=personal
      PersonalAboutDescription
      TravelSection
      WorkDeskSection
      PodcastMediumSection
      CreditCardsSection

  BottomToggleWrapper
    ModeTogglePill                      ← replaces old two-label ModeToggle; jiggle arrow on hover
```

**ModeContent / ModeGroup pattern:**
- `ModeContent`: `position: relative; overflow: clip` — clips the inactive absolute group so it never expands page height/footer
- Active `ModeGroup`: `position: relative` — occupies normal layout flow; sets the page height
- Inactive `ModeGroup`: `position: absolute; top: 0; left: 0; opacity: 0; visibility: hidden; pointer-events: none` — zero layout footprint
- `ModeGroup` gap: 80px desktop / 64px tablet / 72px mobile; `padding-bottom`: 62px desktop / 48px tablet+mobile

**ProfileImageWrapper (professional only):**
- Wraps `<ProfileImage mode="professional" />` in the professional `LandingGroup`
- Applies negative margins so the face position aligns with where the original photo sat:
  - Desktop: `margin-top: -44px; margin-bottom: -120px`
  - Tablet: `margin-top: -35px; margin-bottom: -90px`
  - Mobile: `margin-top: -25px; margin-bottom: -60px`
- Personal mode does NOT use this wrapper — `<ProfileImage mode="personal" />` is placed directly

**BottomToggleWrapper:**
- Renders a second `ModeSwitch` (ModeLabel + ModeToggle + ModeLabel) below all page content
- Calls the same `handleModeChange` — keeps both toggles in sync
- `ModeLabel` and `ModeSwitch` styled components defined in `page.tsx` (same shape as IntroSection's but living in page.tsx)

#### HeaderImage.tsx ✅
- `public/about/header-banner.jpg` (panoramic collage) masked through `public/about/header-mask.svg` (ENRIC letterform paths, white fill)
- CSS mask: `mask-image: url(...)`, `mask-size: 100% 100%`, `mask-mode: alpha`, `-webkit-` prefixes
- `aspect-ratio: 1134 / 293`, `width: 1134px` desktop → `width: 100%` at tabletDown
- SVG has `preserveAspectRatio="none"` so it stretches to match photo at any width

#### ModeTogglePill.tsx ✅
- Pill button at bottom of About page; single click toggles between professional/personal modes
- Props: `mode: 'professional' | 'personal'`, `onModeChange: (mode) => void`
- Label text: "Switch to Personal Mode" / "Switch to Professional Mode"
- `IconCircle` (40×40px, `surface.primary` bg, `border.tertiary` border, `radii.full`) contains left-pointing arrow SVG (`text.highlight` color)
- Jiggle keyframe animation on `ArrowWrap` triggers on `Pill:hover`
- Desktop padding: `12px 16px 12px 12px`; Mobile: `8px 16px 8px 8px`
- Mobile label: `fontWeights.light` (desktop uses `fontWeights.regular`)

#### IntroSection.tsx ✅
- `'use client'`, receives `mode` and `onModeChange` as props from `AboutClient`
- PageTitle "About Me." (Period in `colors.text.secondary`)
- PageSubtitle "Two sides of one designer"
- ModeToggle (from `components/shared/ModeToggle.tsx`) between two ModeLabel buttons
- ModeLabel: `fontSizes.sm` (16px) on mobile, `fontSizes.lg` (32px) desktop, notch bold, color changes on `$active`
- Mobile: padding-top 40px, reduced gaps

#### ProfileImage.tsx ✅
- Accepts `mode: 'professional' | 'personal'` prop — different photo + floating icons per mode
- Figma node: `248:1186` (professional banner)
- **Banner**: `position: relative; width: 1168px; height: 621px; overflow: clip`
  - Tablet: `width: 100%; height: 499.7px`
  - Mobile: `width: 100%; height: 357px`
- **PhotoCenter**: `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center` — centers both absolutely-positioned PhotoGroups
- **PhotoGroup**: always `position: absolute; width: 523px` — both photos overlay each other in the same space; active = `opacity: 1; z-index: 2`, inactive = `opacity: 0; z-index: 1`
  - Tablet: `width: 420px`
  - Mobile: `width: min(300px, 100%)`
  - Crossfade transition: active fades in over 0.4s; inactive snaps out instantly (`opacity 0s 0.4s`)
- **IconsGroup**: `position: absolute; left: 50%; transform: translateX(-50%); width: 1167.51px; height: 100%`
  - Tablet: additionally `transform: translateX(-50%) scale(0.805)` to scale icons down proportionally
  - Mobile: `display: none` — icons entirely hidden
  - Contains 6 `IconBox` elements (position absolute, Figma pixel coords) — different sets per mode
  - Professional icons: `/about/icons/icon-1.svg` … `icon-6.svg`
  - Personal icons: `/about/personal/icons/icon-1.png` … `icon-6.png`

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
  - `MobileCell`: `aspect-ratio: 1/1; border-radius: 12px; overflow: hidden`
  - No `$y` prop, no hover, no magnification — immune to styled-components dynamic class cascade
- ⚠️ Do NOT add mobile styles to `IconSlot` or `DockContainer` — the cascade issue (styled-components dynamic classes overriding media queries) is avoided by the separate MobileGrid approach

#### Journey.tsx ✅
- Label: `"CAREER LADDER"` — SectionLabel + SectionHeader, no gap
- 3 entries: UST (Aug 2024–Present), FunDesigns (May–Jul 2024), Freelance (Till May 2024 — GTech MuLearn + Hound Electric + Sanjos Voice + GDSC CCE)
- Freelance icon: `/about/journey/freelance-icon.svg` (28×28, design-tools scissors icon)
- Bullet assets: `bullet-shimmer.svg`, `bullet-dot.svg`, `bullet-container.svg`
- Desktop: horizontal description columns (4 per entry), ConnectorLine between entries
- Mobile: vertical layout, BulletImg/BulletInnerDot/DateTag hidden, ConnectorCol hidden
  - RoleTitle: `white-space: normal; word-break: break-word` on mobile
  - Column: `::before` CSS diamond bullet (8px rotate 45deg, `colors.text.highlight`), only first 2 columns shown

#### AwardShelf.tsx ✅ (about)
- 5 awards: Awwwards Young Jury, USTAR, Awwwards Honors, Config APAC, Huddle Designers
- Label swaps on mobile: "Recognition" (desktop) → "ACHIEVEMENTS" (mobile) via `DesktopLabel`/`MobileLabel` wrappers
- Seals from `public/about/seals/`: `awwwards.webp`, `ust.webp`, `figma.webp`, `ksum.webp`
- AwardsRow: horizontal scroll on mobile with `scroll-snap-type: x mandatory`

#### ProfessionalTimeline.tsx ✅
- Single responsive component (replaces old desktop + mobile split)
- Accepts `events: TimelineEvent[]` prop from `AboutClient` (fetched server-side)
- 12-card horizontal scroll; cards 264px desktop / 200px mobile; photos 169px tall desktop / 128px mobile
- `image_position: 'above' | 'below'` per card (from DB) controls content/photo stacking order
- Photo crops via `CROP_MAP` keyed by `photo_url` — stores CSS positioning data for 5 cards that need non-standard cropping (graduation, designers award, CODe design week, GTech MuLearn, Young Jury portrait)
- `getCrop(photoUrl)` returns `CROP_MAP[url] ?? { kind: 'simple' }` — default is `object-bottom` cover
- Desktop nav in TitleRow (hidden on mobile); mobile nav row below scroll track (hidden on desktop)
- `ScrollWrapper`: `width: calc(100% + (100vw - 100%) / 2)` bleeds to viewport right edge
- TitleBlock: `SectionLabel("MY JOURNEY 2022 → 2026")` + `SectionHeader("Being through so far.")`
- Photo assets: `/about/timeline/card-01-young-jury.png` through `card-12-beach-hack.png` (downloaded from Figma)

---

### About — Personal Mode ✅ Done

#### PersonalAboutDescription.tsx ✅
- Side-by-side desktop layout: bio text (left) + To Do List widget (right)
- Mobile: stacks vertically; `ToDoCard` is `width: 100%; align-self: stretch`
- Bio highlights `travel`, `Chumma Oru Podcast`, `credit-card points` in `text.highlight`
- **To Do List widget**: 5 tasks, one (`Redesign Portfolio`) checks itself on hover
  - `DayHeading`: red bar (`surface.highlight`) with current IST day name
  - `CardBody`: white card overlaps red bar by 10px (natural DOM stacking, no z-index)
  - `CheckBox`: 16×16px, border when unchecked, `surface.inverse` fill + SVG tick when done
  - `TaskLabel`: `text-decoration: line-through` when done
  - Widget rotates `5deg` on hover

#### TravelSection.tsx ✅
- Desktop: shows `TravelMap` (draggable canvas) — hidden at `mq.tabletDown` (≤1024px)
- Mobile/tablet: shows `MobileFlagsRow` (5 flags, raise on hover/tap, tooltip on tap) + `MobileStatsCard`
  - Flag tooltips use `$isFirst` and `$isLast` to dynamically adjust `left`/`transform` boundaries to prevent cutting off at the screen edges
  - No tooltips on desktop flags (those are inside TravelMapClient)
- Travel albums: horizontal scroll row — `AlbumsScroller` uses AwardShelf pattern (`overflow-x: auto; scroll-snap-type: x mandatory`), no negative-margin bleed
- 5 album photos from `/about/personal/travel/{country}-1.webp`
- Flag assets: `/about/personal/travel/{country}-flag.svg` (exact naming: `qatar-flag.svg`, etc.)

#### TravelMap.tsx ✅
- Thin `next/dynamic` wrapper, `ssr: false` — SSR firewall for TravelMapClient
- Shows `surface.tertiary` placeholder (`width: 100%; max-width: 1168px; height: 522px`) while loading

#### TravelMapClient.tsx ✅
- **Canvas**: 1168×522px, `surface.tertiary` background, `overflow: hidden`, `border-radius: radii['3xl']`
- **Map geometry**:
  - `MAP_W=2536, MAP_H=2474, CANVAS_W=1168, CANVAS_H=522`
  - `MAP_X0=-684` (centers map horizontally), `MAP_Y0=-1237` (shows Asia/Middle East)
  - `MapImg` uses `map.webp` (switched from SVG for payload/GPU optimization)
  - Drag `offset` starts at `{x:0, y:0}`; bounds: X ∈ [-684, 684], Y ∈ [-715, 1237]
- **MapLayer**: `position: absolute; inset: 0; will-change: transform` — translates by drag offset
  - Children: `MapImg` (map SVG at CSS position) — moves with layer
  - Pins are **inside MapLayer** — translate with map on drag, anchored to map coordinates
- **Pins**: 6 countries (INDIA, OMAN, SINGAPORE, MALAYSIA, VIETNAM, QATAR) at Figma canvas coords
  - `PinTag` chip: `padding: 6px` all sides, `border-radius: radii.lg`, `gap: 4px` from dot
  - `dotFirst` prop controls dot-before-label vs label-before-dot order
  - No tooltip on desktop — raise only not applicable (pins don't hover)
- **FlagsStrip**: `position: absolute; right: 15px; top: 15px` — outside MapLayer, fixed in canvas
  - 5 flags: Qatar, Singapore, Malaysia, Vietnam, Oman — raise `translateY(-6px)` on hover
  - No tooltip on desktop
- **StatsCard**: `position: absolute; left: 15px; bottom: 15px` — outside MapLayer, fixed in canvas
  - 3 stats: 06 countries / 55 flights / 2% world; count-up via IntersectionObserver
- **Drag**: `setPointerCapture` + `onPointerDown/Move/Up`; only upward drag clamped
- Hidden at `mq.tabletDown` via `DesktopMap` wrapper in TravelSection

#### WorkDeskSection.tsx ✅
- Left: desk photo (`desk-bg.png`) with Apple Watch screen overlay + iPhone screen overlay
- Right: `Inventory` list — 9 gear items from `GEAR` array
- `GearItem` interface has optional `mobileDetail?: string` — when set, shows different text on mobile
  - iPhone 16 Pro Max: desktop "256 · Natural Titanium · Smartphone", mobile "256 · Natural Titanium · Phone"
  - `DesktopText` (`display:none` on mobile) + `MobileText` (`display:none` on desktop)
- Apple icon (`apple-icon.svg`, 8.293×10.2px) shown inline for Apple items

#### PodcastMediumSection.tsx ✅
- Two-column desktop layout (podcast column + articles column), stacks on mobile
- Podcast card: logo, platform links (Apple Podcasts, Spotify, YouTube)
- Medium articles: list of articles with individual direct Medium `href`s via the `ARTICLES` array

#### CreditCardsSection.tsx ✅
- **Single source of truth**: one `CARDS` array (8 cards, `.webp` paths from `/about/personal/cards/`)
- **Desktop**: Grid layout using CSS Grid auto-fit (`repeat(auto-fit, minmax(260px, 1fr))`)
  - Ensures a fluid 4-column desktop wrapping naturally down to 3 and 2 columns on tablet without squishing the images horizontally
  - Hidden on mobile
- **Mobile**: swipeable stack (`MobileStack`), hidden on desktop
  - Drag/swipe upward to cycle cards; `stackOrder` state tracks current order
  - Exit animation: `translateY(-200%)` + fade, then reorder after 350ms
  - `MobileCard`: `aspect-ratio: 160/100`, `margin-bottom: -190px` for stack peek effect
- Both desktop + mobile: `border-radius: theme.radii.lg`, `border: 1px solid border.tertiary`, `object-fit: cover`
- CTA row links to `https://plush.money/in/find-your-card`

---

### Resume ✅ Done
**Figma frames:** Desktop `282:772` · Mobile `306:1320`

**Page file:** `app/resume/page.tsx` — `'use client'` (zoom state lives here) + `export const dynamic = 'force-dynamic'` (prevents static prerendering that would pull in react-pdf on the server)

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
- Thin `next/dynamic` wrapper — imports `ResumeCanvasClient` with `ssr: false`
- Shows a `#f7f7f7` placeholder div (600px tall) while the client bundle loads
- **Never import react-pdf here** — this file is the SSR firewall

#### ResumeCanvasClient.tsx ✅
- All react-pdf code lives here — only ever loaded client-side
- **Worker:** `pdfjs.GlobalWorkerOptions.workerSrc = \`https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs\`` — set at module level (safe because this file is never server-evaluated)
- Import `'react-pdf/dist/Page/TextLayer.css'` for text selection layer
- **Zoom approach — CSS transform only (never re-renders on zoom):**
  - `Page` always renders at `CARD_W = 820px` fixed width
  - `PdfCard` gets `transform: scale(zoom / 100)` + `transform-origin: top center`
  - `Canvas` height = `CANVAS_PADDING_V * 2 + CARD_H * (zoom / 100)` (explicit — `transform` is visual-only, DOM layout unchanged)
- **Mobile:** `mobileWidth = window.innerWidth - 80` via resize listener; `Page` renders at mobile width; `PdfCard transform: none`
- `loading={<></>}` on both `Document` and `Page` — suppresses flash
- `onError` on `Document` logs to console for diagnosis
- PDF asset: `public/resume.pdf` — place manually

#### SSR pattern for react-pdf (do not change)
react-pdf uses `DOMMatrix` internally which does not exist in Node.js. The two-file split is the correct fix:
- `ResumeCanvas.tsx` → `next/dynamic(..., { ssr: false })` — Next.js never evaluates the module graph below this point during SSR/build
- `ResumeCanvasClient.tsx` → all react-pdf imports, safe at module scope
- `page.tsx` → `export const dynamic = 'force-dynamic'` — belt-and-suspenders against static prerendering

#### DownloadSection.tsx ✅
- Dark `surface.inverse` card, max-width 1168px
- Left: "TAKE IT WITH YOU" label + "Download the Resume." heading (Resume in `text.highlight`) + last updated date
- Right: Download button (`<a href="/resume.pdf" download>`) + Email Enric (`mailto:`)
- Mobile: stacks vertically, `gap: spacing[6]`
- Button mobile: `padding: 12px 16px`, text `14px / 18px`, icon pill `16×16px`

---

### Contact ✅ Done
**Figma frames:** Desktop `359:1468` · Mobile `359:1033`

**Page file:** `app/contact/page.tsx` — `'use client'` (styled-components in page)

**Dependencies:** `resend` — installed via `npm install resend`

**API route:** `app/api/contact/route.ts` — POST, sends via Resend to `ngpersonal18@gmail.com`

**Composition:**
```
PageSections (pt: 140px desktop / 6rem tablet / 40px mobile, gap: 40px)
  PageHeader
  TwoCol (max-width: 1168px, flex gap: 40px, align-items: flex-start → flex-col gap: 24px at tabletDown)
    LeftCol (flex: 1, sticky top: 80px, max-height: calc(100vh - 80px), overflow-y: auto → static at tabletDown)
      EnquiryForm
    RightCol (width: 500px → 100% at tabletDown, flex-col gap: 24px)
      DirectContact
      Services
      Elsewhere
  FullWidth (max-width: 1168px)
    EmailFallback
```

**Sticky left column:**
- `LeftCol`: `position: sticky; top: 80px; align-self: flex-start; max-height: calc(100vh - 80px); overflow-y: auto`
- Requires `TwoCol` to have `align-items: flex-start` (not stretch)
- Requires `html, body` to NOT have `overflow: hidden` — see globals.css note above

#### PageHeader.tsx ✅
- Centered "Contact Me." title — period in `colors.text.secondary`
- Subtitle "Let's talk" — `fonts.sans` regular, `fontSizes.sm` desktop / `fontSizes.xs` mobile

#### EnquiryForm.tsx ✅
- `'use client'`
- `CHIPS`: 7 service chips (WEBSITE, DASHBOARD, APPLICATION, UX AUDIT, DESIGN SYSTEM, TALK SESSION, SOMETHING ELSE)
- `BUDGET_OPTIONS`: 6 options; `WHEN_OPTIONS`: 5 options
- `FormData` interface: `{ services: string[], name, email, company, role, budget, when, brief }`
- `Status` type: `'idle' | 'sending' | 'sent' | 'error'`
- `isValid`: name non-empty + email passes `/\S+@\S+\.\S+/` + (budget OR when non-empty)
- **Submission**: `fetch('/api/contact', { method: 'POST', body: JSON.stringify(form) })` — on success clears form, shows Done state for 5s then reverts to idle; shows red error notice on failure (retry allowed)
- **Done state** (`status === 'sent'`): early return renders `DoneIconWrap` (80×80px red rounded square `radii['3xl']`, white SVG tick) + `DoneHeading` ("Thanks - message sent.", notch 32px/40px desktop · 24px/36px mobile) + `DoneSub` (sans 16px/24px, text.tertiary). Same `Card` wrapper — flat on mobile. Node `367:1227`.
- `wordCount`: `form.brief.trim().split(/\s+/).length`
- Chips: `radii.lg`, `padding: 10px 12px`, always `border: 1px solid` — `transparent` when selected, `border.tertiary` when not (prevents size shift). Selected = `surface.inverse` bg; unselected = `surface.tertiary` bg.
- `ChipQuestion` + `FieldLabel`: `fontSizes.xs` (12px) / `lineHeights.tight` (16px), `text.primary`
- Placeholders (`TextInput`, `BriefTextarea`, `StyledSelect` empty): `text.secondary`, opacity 0.5
- Company/Role `FieldRow` has `$hideOnMobile` prop → `display: none` on mobile
- `StyledSelect`: `appearance: none`, `$empty` prop for opacity/color, `ChevronSvg` absolutely positioned
- `BriefContainer`: `height: 100px`, `flex-col`, `gap: 8px` — `BriefTextarea` (flex:1, no border) + `WordIndicator`
- Submit button: disabled during `sending` only; error state re-enables for retry
- `WORD_COUNTER_SIZE = '0.625rem'` (10px), `WORD_COUNTER_LINE = '0.75rem'` (12px) — below theme scale, Figma-derived; color `text.secondary`
- `Card` (outer): flat on mobile — `border: none; border-radius: 0; padding: 0`

#### DirectContact.tsx ✅
- `'use client'` — IST clock
- Card with 3 rows: Based (Trivandrum, IN + live IST time), Email (`mailto:`), Phone (WhatsApp `wa.me` link)
- Row separator: `border-top: 1px solid border.tertiary` via `$bordered` prop
- Label: `flex: 1 0 0; max-width: 120px` (Figma justify-between layout)
- `Card`: flat on mobile — `border: none; border-radius: 0; padding: 0`

#### Services.tsx ✅
- Dark `surface.inverse` card — cannot use `SectionHeader` (wrong text color on dark bg)
- `CardLabel` + `CardHeading` + `<Muted>` span written manually
- 4 service rows; row separators use `surface.highlight` (red `#e8342a`), NOT `border.tertiary`
- Both `ServiceTitle` and `ServiceDesc` are `fontSizes.sm` (16px) — confirmed from Figma
- `RowInner`: `align-items: flex-start` — `Num` has `align-self: flex-start` to pin numbers to top of multi-line rows
- Card styling kept on mobile (Services is the one contact card that keeps its border/padding on mobile)

#### Elsewhere.tsx ✅
- Light card, uses `SectionLabel` + `SectionHeader`
- `PLATFORMS: Platform[][]` — 4 rows × 2 platforms each
- `PlatformCard` (`<a>`): `flex: 1 0 0`, `border: border.tertiary`, `radii.lg`, `padding: 13px 15px`
- `IconWrap`: 40×40px, `box-shadow: 0 0 12px rgba(0,0,0,0.15)`, `radii.md`, `overflow: hidden`
- Icon images: `/contact/social/{platform}.webp` — **place files in `public/contact/social/`**
- Desktop: 2 per row; Mobile (`mq.mobile`): `GridRow` stacks to `flex-direction: column`
- `Card`: flat on mobile — `border: none; border-radius: 0; padding: 0`

#### EmailFallback.tsx ✅
- Dark `surface.inverse` card, `radii.xl`, **no border**
- Desktop: `padding: 48px`, no gap (children stack with line heights only)
- Mobile: `padding: spacing[6]`, `gap: 4px`
- `EmailLink`: `fontSizes.lg` (32px) desktop / `1.25rem` (20px — hardcoded, between theme tokens) mobile
- Copy: "Or use the agent at the bottom of the page — it knows my work better than I do, and is awake at 3am."

#### app/api/contact/route.ts ✅
- POST handler — validates `name` + `email`, sends via Resend
- `from`: `onboarding@resend.dev` (update to verified domain once set up)
- `to`: `enricsneelamkavil@gmail.com` — Resend free tier allows sending to the account's own email without domain verification
- `replyTo`: sender's email — allows direct reply from inbox
- `subject`: `Enquiry from {name}`
- HTML email: dark header with sender name, field table (email, company, role, budget, when, services), brief section
- Returns `{ ok: true }` on success, `{ error: '...' }` on failure

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
| About — Travel map canvas | `328:996` | — |
| Resume (full frame) | `282:772` | `306:1320` |
| Resume — Page Header | `282:775` | `306:1323` |
| Resume — Toolbar | `282:779` | `306:1599` |
| Resume — Canvas | `282:801` | `306:1617` |
| Resume — PDF Card | `282:802` | `306:1618` |
| Resume — Download Section | `282:803` | `306:1649` |
| Contact (full frame) | `359:1468` | `359:1033` |
| Contact — Tags Container (two-col) | `359:1474` | — |
| Contact — EnquiryForm | `359:1475` | — |
| Contact — DirectContact | `359:1540` | — |
| Contact — Services | `359:1560` | — |
| Contact — Elsewhere | `359:1589` | — |
| Contact — EnquiryForm Done state | `367:1227` | — |

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

## Asset Paths

### Professional About
```
public/about/
├── profile-group.png          # 431×470 RGBA — composited circle photo (professional)
├── professional-image.webp    # Professional banner photo
├── icons/
│   ├── icon-1.svg … icon-6.svg   # 6 floating icons (professional mode)
├── seals/
│   ├── awwwards.webp
│   ├── ust.webp
│   ├── figma.webp
│   └── ksum.webp
├── header-banner.jpg              # Panoramic photo collage for ENRIC letterform banner
├── header-mask.svg               # ENRIC letterform mask (white fill, preserveAspectRatio=none)
├── timeline/
│   ├── card-01-young-jury.png … card-12-beach-hack.png  # 12 timeline event photos (PNG, from Figma)
└── journey/
    ├── ust-icon.svg
    ├── fundesigns-icon.svg
    ├── freelance-icon.svg         # 28×28 design-tools scissors icon (for Freelance entry)
    ├── bullet-shimmer.svg
    ├── bullet-dot.svg
    └── bullet-container.svg
```

### Personal About
```
public/about/personal/
├── personal-image.webp        # Personal mode banner photo
├── checkmark.svg              # To Do List widget checkmark
├── icons/
│   ├── icon-1.png … icon-6.png   # 6 floating icons (personal mode)
├── travel/
│   ├── Map.svg                # World map SVG (2536×2474)
│   ├── pin.svg                # Map pin dot
│   ├── arrow.svg              # Travel with me button arrow
│   ├── separator.svg          # Stats card separator
│   ├── {country}-flag.svg     # Flag icons: qatar, singapore, malaysia, vietnam, oman
│   └── {country}-1.webp       # Album photos: qatar, singapore, malaysia, vietnam, oman
├── cards/
│   ├── american-express-membership-rewards.webp
│   ├── hdfc-marriott-bonvoy.webp
│   ├── phonepe-sbi-select-black.webp
│   ├── idfc-first-select.webp
│   ├── hdfc-millenia.webp
│   ├── hdfc-swiggy.webp
│   ├── flipkart-axis.webp
│   └── icici-amazon-pay.webp
├── desk/
│   ├── desk-bg.png            # Desk background photo
│   ├── apple-icon.svg         # Apple logo for gear list
│   ├── watch-screen.png       # Apple Watch screen overlay
│   └── iphone-screen.png      # iPhone screen overlay
└── podcast/
    ├── podcast-logo.webp      # Chumma Oru Podcast logo
    ├── apple-podcasts.webp    # Platform icon
    ├── spotify.webp           # Platform icon
    ├── youtube.webp           # Platform icon
    ├── arrow-watch.svg        # CTA arrow
    └── arrow-article.svg      # Article link arrow
```

### Contact
```
public/contact/social/
├── linkedin.webp
├── instagram.webp
├── behance.webp
├── dribbble.webp
├── x.webp
├── facebook.webp
├── medium.webp
└── youtube.webp
```
> ⚠️ These 8 files need to be placed manually before deploying — `Elsewhere.tsx` references them at `/contact/social/{platform}.webp`

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

## Supabase — timeline_events Table

```sql
CREATE TABLE timeline_events (
  id uuid primary key default gen_random_uuid(),
  title text not null,
  subtitle text not null,
  description text,
  photo_url text,
  image_position text not null default 'above'
    check (image_position in ('above', 'below')),
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

alter table timeline_events enable row level security;
create policy "Public read" on timeline_events
  for select using (true);
```

**Sort order convention:** lowest `sort_order` = newest (shown first in scroll). To prepend a new event, give it sort_order 0 and increment all others, or insert with sort_order -1.

**Photo crop overrides** live in `CROP_MAP` inside `ProfessionalTimeline.tsx` keyed by `photo_url`. Default crop is `object-bottom cover`. Add an entry to `CROP_MAP` when a new event photo needs portrait or positioned cropping.

**INSERT SQL for 12 current events:**
```sql
INSERT INTO timeline_events (title, subtitle, description, photo_url, image_position, sort_order) VALUES
  ('Young Jury 2025', 'Awwwards.', 'Selected as a jury member, evaluating and rating top digital designs globally.', '/about/timeline/card-01-young-jury.png', 'below', 0),
  ('Graduation', 'Christ College of Engineering', 'Graduated Bachelors of Technology (BTech.) in Computer Science & Engineering.', '/about/timeline/card-02-graduation.png', 'above', 1),
  ('Lead Host', 'DESIGNATHON 2024', 'Hosted second edition of Designathon, right a year after CODe Design Week ''23.', '/about/timeline/card-03-lead-host.png', 'below', 2),
  ('Invited Attendee', 'Figma Config APAC', 'Figma''s first Config APAC at Marina Bay Sands Conventional Center, Singapore.', '/about/timeline/card-04-config-apac.png', 'above', 3),
  ('Designers Award', 'Kerala Startup Mission', 'Won the position of Top 13 Designers in Branding Challenge at Huddle Global.', '/about/timeline/card-05-designers-award.png', 'below', 4),
  ('Speaker', 'Christ College of Engineering', 'Handled multiple hands-on workshop sessions on interface design for digital products.', '/about/timeline/card-06-speaker.png', 'above', 5),
  ('Participant attendee', 'Lollypop Designathon', 'Shortlisted attendee for Designathon 2024 hosted by Lollypop Design Studio.', '/about/timeline/card-07-lollypop.png', 'below', 6),
  ('Founder Host', 'CODe Design Week (CDW ''23)', 'Hosted the first ever Design Week, in Engineering Colleges across Kerala.', '/about/timeline/card-08-code-design-week.png', 'above', 7),
  ('Invited Attendee', 'Figma India', 'Attended Figma''s India office Launch at Sheraton Grand Convention Center, Bangalore.', '/about/timeline/card-09-figma-india.png', 'below', 8),
  ('UI Designer', 'GTech MuLearn', 'First Internship as UI Designer, led a team, mentored junior designers.', '/about/timeline/card-10-mulearn.png', 'above', 9),
  ('Chairman', 'Community of Developers (CODe)', 'Association of Department of Computer Science, Christ College of Engineering.', '/about/timeline/card-11-chairman.png', 'below', 10),
  ('Co-host', 'BEACH HACK 5', 'Co-hosted the 5th edition of the flagship event Beach hackathon aka Beach Hack.', '/about/timeline/card-12-beach-hack.png', 'above', 11);
```

## Environment Variables
```
NEXT_PUBLIC_SUPABASE_URL=https://rdkhdnbzhuwvthxagzdz.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=sb_publishable_630z8GqkaL53xi1EXO_1HQ_VZ-t3EoZ
RESEND_API_KEY=re_...          # Resend API key — add to Vercel env vars before deploying
```

## Landing — Company Logo Marquee
- 10 logos, all local SVGs: `public/company logos/{remax,apro-it,urbantrash,irisholidays,ust,vurse,fundesigns,opengrad,deep5,mulearn}-logo.svg`
- Defined as `LOGO_PATHS` constant in `Landing.tsx` — doubled in JSX for seamless infinite marquee
- Marquee pauses on hover; full-viewport-width on mobile via negative-margin escape

---

## What's Next

### Other Pages
- [x] ~~Build Works page (`app/works/page.tsx`)~~ ✅ Done
- [x] ~~Build Contact page (`app/contact/page.tsx`)~~ ✅ Done
- [x] ~~Build Resume page (`app/resume/page.tsx`)~~ ✅ Done

### Contact — Remaining
- [ ] Place 8 social icon images in `public/contact/social/*.webp`
- [ ] Update `FROM` in `app/api/contact/route.ts` from `onboarding@resend.dev` to verified domain email

### Global
- [x] ~~Wire MyWorks to Supabase (`projects` table) when Works page is ready~~ ✅ Done — Works page connected
- [x] ~~Wire ProfessionalTimeline to Supabase~~ ✅ Done — `timeline_events` table; run CREATE TABLE + INSERT SQL above in Supabase SQL editor
- [ ] Define and implement PersonalAgent mobile interaction
- [ ] Wire PersonalAgent to `/api/agent` (Anthropic SDK)
