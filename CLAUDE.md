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
│   ├── about/page.tsx            # About 🚧 In Progress — 'use client'
│   ├── works/page.tsx            # Works — not started
│   ├── resume/page.tsx           # Resume — not started
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
│   │   ├── AboutDescription.tsx  ✅ Done — bio paragraph
│   │   ├── MyTools.tsx           ✅ Done — tool dock with hover animation
│   │   ├── Journey.tsx           🚧 Needs updates — label, remove CCE entry
│   │   ├── Companies.tsx         ⚠️  Remove from page — no longer in Figma spec
│   │   └── AwardShelf.tsx        ✅ Done — 5 award cards with seal images
│   ├── works/
│   ├── resume/
│   ├── contact/
│   └── shared/
│       ├── SectionLabel.tsx      ✅ Done — plain uppercase <p>, no pill/chip styling
│       ├── SectionHeader.tsx     ✅ Done
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
- `components/about/Journey.tsx` ✅ (needs edits — do not recreate)
- `components/about/AwardShelf.tsx` ✅

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

## Navbar — Mobile Bottom Pill
- **Desktop**: 5 nav links (Home, About, Work, Resume, Contact) — glass pill, fixed top-center
- **Mobile**: 4 nav links (Home, About, Work, Contact) — **Resume omitted** — solid bottom pill
- Mobile pill ends with: vertical separator + agent icon button (placeholder, `onClick={() => {}}`)
- Agent icon: Figma asset node `185:866` — stored as `AGENT_ICON` constant in Navbar.tsx
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

### About 🚧 In Progress
**Figma frames:** Desktop `248:1175` · Mobile `251:729`

**Page file:** `app/about/page.tsx` — marked `'use client'`

**Composition (current):**
```
PageSections (62px gap)
  └── LandingGroup (80px gap)
        ├── IntroSection
        ├── ProfileImage
        └── AboutDescription
  MyTools
  Journey
  Companies     ← REMOVE (no longer in Figma spec)
  AwardShelf
```

**Still needed:**
- `ProfessionalTimeline.tsx` — NEW component: horizontal scrollable timeline, photo strip, year labels, nav arrows (top/bottom event rows)
- Remove `Companies` from page composition
- `Journey.tsx` edits: rename label to `"CAREER LADDER"`, remove CCE entry, swap bullet to shimmer image assets
- Mobile responsiveness pass on all sections

#### IntroSection.tsx ✅
- `'use client'`, `useState<Mode>('professional' | 'personal')`
- PageTitle "About Me." (Period in `colors.text.secondary`)
- PageSubtitle "Two sides of one designer"
- ModeToggle (from `components/shared/ModeToggle.tsx`) between two ModeLabel buttons
- ModeLabel: `fontSizes.lg` (32px), notch bold, color changes on `$active`
- PersonalNote renders when `mode === 'personal'`
- Header gap: `spacing[8]` (32px)

#### ProfileImage.tsx ✅
- Figma node: `248:1186` (Image Banner)
- **Banner**: `position: relative; width: 1168px; height: 470px; overflow: clip`
  - On `tabletDown`: `display: flex; justify-content: center; height: auto; overflow: visible`
- **PhotoCenter**: `position: absolute; inset: 0; display: flex; align-items: center; justify-content: center`
  - On `tabletDown`: `position: static; display: contents` (passes children to Banner flex)
- **PhotoGroup**: `431px` wide on desktop, `360px` tablet, `min(300px, 100%)` mobile
- **CirclePhoto**: `profile-group.png` — 431×470 RGBA, renders `width: 100%; height: auto`
- **6 floating icons**: `IconBox` (position + rotation) + `IconImg` (size) — hidden on `tabletDown`
  - Icon sources: `/about/icons/Icon 1.svg` … `Icon 6.svg`
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
- Two `Slot` divs (40×40, `position: relative; z-index: 0`) contain `NotSelectedRing` SVGs
- `ArrowSvg` rotates 180° when on left side

#### Journey.tsx 🚧
- 3 entries: UST (Aug 2024–present), FunDesigns (May–Jul 2024), CCE (Sep 2020–Jun 2024)
- **Pending**: rename section label to `"CAREER LADDER"`, remove CCE entry
- ConnectorLine between entries (vertical 1px line); horizontal scroll on `tabletDown`

#### AwardShelf.tsx ✅
- 5 awards: Awwwards Young Jury, USTAR, Awwwards Honors, Config APAC, Huddle Designers
- Seals from `public/about/seals/`: `awwwards.png`, `ust.png`, `figma.png`, `ksum.png`

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
| About (professional) | `248:1175` | `251:729` |
| About — Image Banner | `248:1186` | — |

---

## About Page — Asset Paths
```
public/about/
├── profile-group.png          # 431×470 RGBA — composited circle photo (hair + circle baked in)
├── icons/
│   ├── Icon 1.svg             # floating icon — bottom-left
│   ├── Icon 2.svg             # floating icon — upper-left
│   ├── Icon 3.svg             # floating icon — left-center
│   ├── Icon 4.svg             # floating icon — right-top
│   ├── Icon 5.svg             # floating icon — right-bottom
│   └── Icon 6.svg             # floating icon — far-right (unified)
├── seals/
│   ├── awwwards.png
│   ├── ust.png
│   ├── figma.png
│   └── ksum.png
└── journey/
    ├── ust-icon.svg
    ├── fundesigns-icon.svg
    └── cce-icon.svg
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

### About Page (active branch: `feature/about-page`)
- [ ] Remove `Companies` from `app/about/page.tsx` composition
- [ ] `Journey.tsx` — rename label to "CAREER LADDER", remove CCE entry
- [ ] `ProfessionalTimeline.tsx` — NEW: horizontal scrollable timeline, photo strip, year labels, nav arrows
- [ ] Add `ProfessionalTimeline` to `app/about/page.tsx`
- [ ] Mobile responsiveness pass on all About sections
- [ ] `AboutDescription.tsx` — verify bio font-size matches Figma

### Other Pages
- [ ] Build Works page (`app/works/page.tsx`)
- [ ] Build Resume page (`app/resume/page.tsx`)
- [ ] Build Contact page (`app/contact/page.tsx`)

### Global
- [ ] Wire MyWorks to Supabase (`projects` table) when Works page is ready
- [ ] Define and implement PersonalAgent mobile interaction
- [ ] Wire PersonalAgent to `/api/agent` (Anthropic SDK)
