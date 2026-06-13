# Project Context — Personal Portfolio

## Stack
- **Framework:** Next.js (App Router) + TypeScript
- **Styling:** Styled Components
- **Database + Storage:** Supabase
- **Package Manager:** npm

## Supabase Usage
- `projects` table — case study content (title, description, tags, cover image URL)
- Storage bucket — images and assets

## Folder Structure
```
portfolio/                        # project root
├── app/
│   ├── page.tsx                  # Home
│   ├── about/page.tsx            # About
│   ├── works/page.tsx            # Works
│   ├── resume/page.tsx           # Resume
│   ├── contact/page.tsx          # Contact
│   └── layout.tsx                # Global layout (Navbar + Footer + PersonalAgent)
├── components/
│   ├── common/
│   │   ├── Navbar.tsx            ✅ Done
│   │   ├── Footer.tsx            ✅ Done
│   │   ├── Button.tsx            ✅ Done
│   │   ├── PersonalAgent.tsx     ✅ Done (global AI assistant widget)
│   │   └── Layout.tsx
│   ├── home/                     # Home-specific section components
│   ├── works/
│   ├── about/
│   ├── resume/
│   ├── contact/
│   └── shared/                   # Reusable across pages (SectionHeader, Tag, etc.)
├── styles/
│   ├── theme.ts                  # Design tokens — colors ✅, fonts + spacing TBD
│   ├── GlobalStyle.ts            # Global resets
│   └── StyledComponentsRegistry.tsx  # SSR fix for styled-components + Next.js
├── lib/
│   └── supabase.ts               # Supabase client
├── hooks/                        # Custom hooks (useProjects, etc.)
├── types/                        # Shared TypeScript interfaces
└── CLAUDE.md                     # This file
```

> ⚠️ No `src/` directory — all paths are relative to project root. Never create a src/ folder.

## Existing Components (DO NOT recreate)
- `components/common/Navbar.tsx` ✅
- `components/common/Footer.tsx` ✅
- `components/common/Button.tsx` ✅
- `components/common/PersonalAgent.tsx` ✅ (AI assistant widget — renders on every page globally)

## Design Tokens
- Color tokens defined in `styles/theme.ts` ✅
- Typography and spacing — extract from Figma home design and append to theme.ts

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
// Every component follows this pattern
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
- [x] Home — designed in Figma, ready to build
- [ ] Works
- [ ] About
- [ ] Resume
- [ ] Contact

## Home Page Sections
1. SectionLabel.tsx     → shared, eyebrow tags
2. SectionHeader.tsx    → shared, mixed-weight headings  
3. Landing.tsx          → hero, welcome tag, photos, marquee
4. AboutBrief.tsx       → bio + 3 stats
5. Interests.tsx        → scrolling ticker
6. FeatureProduct.tsx   → Plush feature card
7. AwardShelf.tsx       → four award medallions
8. MyWorks.tsx          → Supabase, WorkCard subcomponent
9. app/page.tsx         → compose all sections

## Build Order (Home Session)
1. Extract typography + spacing tokens from Figma → append to `styles/theme.ts`
2. Build `styles/StyledComponentsRegistry.tsx` — SSR boilerplate
3. Build `components/common/Layout.tsx` — wraps Navbar + Footer + PersonalAgent
4. Build home sections one by one from Figma annotations → `components/home/`
5. Wire into `app/page.tsx`

## Figma
- File: https://www.figma.com/design/cGxPfzhfg2zi9MivaiE7dX/Enric-S-Neelamkavil-|-Portfolio?node-id=136-3016
- Annotations in Figma are implementation instructions — always read and follow them
- Sections marked "Dynamic" → wire to Supabase
- Sections marked "Static" → hardcode content
- Sections marked "Reusable" → place in `components/shared/`

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
NEXT_PUBLIC_SUPABASE_URL=
NEXT_PUBLIC_SUPABASE_ANON_KEY=
```