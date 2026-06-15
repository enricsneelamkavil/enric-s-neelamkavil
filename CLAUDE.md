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
│   ├── about/page.tsx            # About
│   ├── works/page.tsx            # Works
│   ├── resume/page.tsx           # Resume
│   ├── contact/page.tsx          # Contact
│   └── layout.tsx                # Global layout (Navbar + Footer + PersonalAgent)
├── components/
│   ├── common/
│   │   ├── Navbar.tsx            ✅ Done — desktop glass pill + mobile bottom pill
│   │   ├── Footer.tsx            ✅ Done — visitor counter wired to /api/visitor
│   │   ├── Button.tsx            ✅ Done
│   │   ├── PersonalAgent.tsx     ✅ Done (hidden globally via display:none — interaction TBD)
│   │   └── Layout.tsx
│   ├── home/
│   │   ├── Landing.tsx           ✅ Done
│   │   ├── AboutBrief.tsx        ✅ Done
│   │   ├── Interests.tsx         ✅ Done
│   │   ├── FeatureProduct.tsx    ✅ Done
│   │   ├── AwardShelf.tsx        ✅ Done
│   │   └── MyWorks.tsx           ✅ Done
│   ├── works/
│   ├── about/
│   ├── resume/
│   ├── contact/
│   └── shared/
│       ├── SectionLabel.tsx      ✅ Done — plain uppercase <p>, no pill/chip styling
│       ├── SectionHeader.tsx     ✅ Done
│       └── DiamondBullet.tsx     ✅ Done
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
- `components/shared/SectionLabel.tsx` ✅
- `components/shared/SectionHeader.tsx` ✅
- `components/shared/DiamondBullet.tsx` ✅
- All `components/home/*.tsx` ✅

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

## Responsive Rules (Home Page — established patterns)
- **Mobile** (`mq.mobile`, ≤768px): single-column, 24px horizontal padding, `max-width: none`
- **Tablet** (`mq.tablet`, 769–1024px): side-by-side layouts preserved (no vertical stacking except mobile-only sections), `padding: 0 24px`
- **Desktop** (>1024px): base styles, `max-width: 1168px` content width
- `FeatureProduct`: horizontal layout at tablet AND desktop — only stacks vertically on mobile
- `MyWorks WorkCard`: side-by-side at tablet AND desktop — only stacks on mobile
- `Footer InfoRow`: `flex-wrap: wrap` at tablet to prevent button clipping

## Navbar — Mobile Bottom Pill
- **Desktop**: 5 nav links (Home, About, Work, Resume, Contact) — glass pill, fixed top-center
- **Mobile**: 4 nav links (Home, About, Work, Contact) — **Resume omitted on mobile** — solid bottom pill
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
- Exception: breakpoint media queries use `mq.*` imported directly (not via ThemeProvider)

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

## Pages
- [x] Home — built and responsive ✅
- [ ] Works
- [ ] About
- [ ] Resume
- [ ] Contact

## Home Page Sections — All Complete ✅
1. `SectionLabel.tsx`   → shared — plain uppercase eyebrow text, `colors.text.tertiary`, no chip/pill
2. `SectionHeader.tsx`  → shared — mixed-weight headings (notch font)
3. `Landing.tsx`        → hero, photo row (bleed on mobile), marquee (full-bleed via negative margin), company logo strip (local SVGs from `public/company logos/`)
4. `AboutBrief.tsx`     → bio + 3 animated count-up stats
5. `Interests.tsx`      → scrolling ticker
6. `FeatureProduct.tsx` → Plush feature card, horizontal at tablet+desktop, stacks only on mobile
7. `AwardShelf.tsx`     → four award medallions, horizontal scroll on mobile/tablet
8. `MyWorks.tsx`        → 3 WorkCards, exact Figma gradients, images natural-proportion on mobile
   `Footer.tsx`         → visitor counter + HeartIcon: heart ↔ hourglass toggle (hover → delay → hourglass, unhover → back to heart)
9. `app/page.tsx`       → composes all sections

## Figma
- File: https://www.figma.com/design/cGxPfzhfg2zi9MivaiE7dX/Enric-S-Neelamkavil-|-Portfolio?node-id=136-3016
- Annotations in Figma are implementation instructions — always read and follow them
- Sections marked "Dynamic" → wire to Supabase
- Sections marked "Static" → hardcode content
- Sections marked "Reusable" → place in `components/shared/`
- **Always re-fetch Figma nodes fresh** — asset URLs and design values can change between sessions

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

## What's Next
- [ ] Build Works page (`app/works/page.tsx`)
- [ ] Build About page (`app/about/page.tsx`)
- [ ] Build Resume page (`app/resume/page.tsx`)
- [ ] Build Contact page (`app/contact/page.tsx`)
- [ ] Define and implement PersonalAgent mobile interaction
- [ ] Wire MyWorks to Supabase (`projects` table) when Works page is ready
- [ ] Wire PersonalAgent to `/api/agent` (Anthropic SDK)
