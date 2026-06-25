# Works Page Spec

**Figma file:** `cGxPfzhfg2zi9MivaiE7dX`
**Figma section:** `390:1078` (Works)

| Frame | Node ID | Size |
|---|---|---|
| Desktop | `390:1745` | 1920×2768 |
| Mobile | `390:1079` | 402×3514 |

---

## Section Inventory — Top to Bottom

### 1. Page Header
**Desktop node:** `390:1748` · **Mobile node:** `390:1083`

| Property | Desktop | Mobile |
|---|---|---|
| Title | "My works." — 64px `fonts.notch` medium, `tracking: -1.28px` | "My works." — 32px `fonts.notch` medium, `tracking: -0.64px` |
| Title period | `colors.text.secondary` (#5c5c5c) | same |
| Subtitle | "Selected portfolio" — 16px `fonts.sans` regular, `text.secondary` | 12px, `text.secondary` |
| Alignment | centered | centered |
| Padding top | 140px (from layout) | 40px |

No `SectionLabel` above the title — headline-only, same pattern as Contact/Resume.

---

### 2. Filter Tabs + Count Row
**Desktop node:** `390:1751` · **Mobile node:** `390:2194`

**Figma annotation on mobile tablist:** *"Act as filters to show the below results"*

#### Tablist (`390:1752` desktop / `390:2194` mobile)

**Desktop:**
- Container: `border: 1px solid border.tertiary`, `border-radius: radii.lg (12px)`, `padding: 8px`
- Single-row, inline, within the 1168px container

**Mobile:**
- No border container — pills are standalone
- `display: flex; flex-wrap: wrap; gap: 8px` — wraps across 2 rows naturally

#### Tab Buttons — States

| State | Background | Text color | Badge bg | Badge text |
|---|---|---|---|---|
| Active | `surface.inverse` (#171717) | `text.inverse` (white) | `surface.highlight` (#e8342a) | `text.inverse` white |
| Inactive | transparent | `text.primary` (#171717) | `surface.secondary` (#e0e0e0) | `text.primary` |

**Button anatomy:**
- `padding: 8px 12px`, `border-radius: radii.md (8px)`
- Label: 16px `fonts.sans` light
- Badge: `24×24px`, `border-radius: 8px`, 12px `fonts.sans` regular/light

#### Filter Options (with counts from Figma)

| Label | Count | Type value |
|---|---|---|
| All | 12 | — |
| Case studies | 03 | `case_study` |
| Landing | 04 | `landing` |
| Brand Identity | 02 | `brand_identity` |

#### Count Label (desktop only, `390:1770`)
- **Figma annotation:** *"Total number of projects"*
- Position: right-aligned in the row, alongside tablist
- Format: `"12 shown"` — bold number `fonts.sans` medium (text.primary) + light " shown" text (text.secondary)
- 16px, 24px line-height
- **Hidden on mobile** — no equivalent in mobile frame

---

### 3. Featured / Hero Card
**Desktop node:** `390:1771` · **Mobile node:** `390:1999`

**Figma annotation on mobile:** *"Card layout shifted to top down format."*

#### Desktop layout
- `border: 1px solid border.tertiary`
- `border-radius: radii['3xl'] (24px)`
- `padding: 24px`
- `gap: 40px`
- `overflow: clip`
- `width: 1168px`
- Two-column flex: left (text content, `flex: 1`) + right (cover image, `541×474px`)

#### Mobile layout
- `border: 1px solid border.tertiary`
- `border-radius: radii.xl (16px)` — 16px, not 24px
- `padding: 24px`
- `gap: 32px`
- Stacked vertically: cover image (full width, `aspect-ratio: 540/473`) on top, content below

#### Left/Top Content

| Element | Spec |
|---|---|
| Logo | Brand logo image (not text) — desktop: 189×56px; mobile: 136×40px |
| Tagline | 16px `fonts.sans` regular, `text.tertiary` (#a3a3a3) — below logo |
| Description | 16px `fonts.sans` light, `text.primary` — full paragraph |
| Highlights table | See below |
| CTA button | See below |

#### Highlights Table

3 rows, each with `border-top: 1px solid border.tertiary`. Last row also has `border-bottom`.

| Row | Label | Value | Mobile size |
|---|---|---|---|
| Row 1 | "ROLE" | "Founder • Designer" (bullet = red diamond `colors.text.highlight`, same 8.485px rotated bullet as Journey/DirectContact) | 12px (mobile vs 16px desktop) |
| Row 2 | "TIMELINE" | "In Progress" | same |
| Row 3 | "TAGS" | Tag pills (see tag spec below) | wraps on mobile |

Label: 12px `fonts.sans` regular, uppercase, `text.secondary`, `flex: 1 0 0; max-width: 120px`  
Values: `flex: 1 0 0`, desktop 16px `fonts.notch` light, mobile 12px `fonts.notch` light

#### Tag Pills (used in both featured card and grid cards)
- `border: 1px solid border.tertiary`
- `border-radius: 6px` (below theme `radii.lg` — hardcode as `6px`)
- `padding: 4px 8px`
- 12px `fonts.sans` regular, uppercase, `text.secondary`

#### CTA Button
- `background: surface.inverse`
- `border-radius: radii.lg (12px)`
- Desktop: `padding: 12px 24px`, 16px text
- Mobile: `padding: 12px 16px`, 14px text
- `text.inverse` (white)
- Arrow icon pill: `background: icon.inverse (white)`, `18px` desktop / `16px` mobile, `border-radius: 9px`
- **Figma annotation:** *"Open 'plush.money' in new tab"*

---

### 4. Work Cards Grid
**Desktop nodes:** `390:1813` (row 1) + `390:1856` (row 2) · **Mobile node:** `390:2043`

**Figma annotation on each card:** *"Clickable card, link to case study/ external redirection if needed."*

#### Desktop Layout
- Container: `width: 1168px` (approx — `1170px` in Figma, treat as max-width 1168px)
- 3 equal columns per row, `gap: 24px` between columns
- Gap between row 1 and row 2: `40px`
- Each card: `flex: 1 0 0`, `min-width: 0`

#### Mobile Layout
- Single column, `gap: 24px` between cards
- Full width (`354px` in frame = 100% after 24px padding each side)

#### Grid Card Anatomy

```
Card (no border on card itself — border lives on the image container only)
├── Image container
│   ├── border: 1px solid border.tertiary
│   ├── border-radius: 14px (hardcoded — between radii.lg=12 and radii.xl=16)
│   ├── height: 280px desktop / 266px mobile
│   ├── overflow: clip
│   └── showcase image — centered, object-cover
└── Info container (gap: 12px)
    ├── Title group (gap: 4px)
    │   ├── Title: 24px fonts.notch medium, text.primary; period in text.highlight (#e8342a)
    │   └── Description: 16px fonts.sans light, text.secondary (2 lines max in design)
    └── Tag row (gap: 6px, flex-wrap: nowrap)
        └── Tag pills (see tag spec above)
```

#### Projects in Figma (as shown in design)

Desktop shows 6 cards (2 rows × 3):

| # | Title | Description | Tags | Image asset name |
|---|---|---|---|---|
| 1 | Urban Trash | "B2B waste aggregation platform dedicated to sustainable waste management." | B2B, End-to-end, WEB APP | `urban-trash-showcase` |
| 2 | ReputeUp | "All-in-one tool for gathering reviews and showcasing testimonials that can drive revenue." | AI, LANDING, REDESIGN | `repute-up-showcase` |
| 3 | Unnathi - KES | "Unnathi (Kerala Empowerment Society) is an initiative by the Government of Kerala." | NGO, GOVERNMENT, LANDING | `unnathi-showcase 1` |
| 4–6 | Same 3 repeated | (placeholder — Figma shows same cards twice) | same | same |

**Note:** Figma uses 3 real cards repeated as placeholders for a 12-item grid. The real 12 projects come from Supabase.

---

### 5. Footer
**Desktop node:** `390:1899` (instance of Footer component) · **Mobile node:** `390:1198`

Uses the **existing `Footer.tsx`** global component. Nothing to build here — the global layout already wraps every page in `app/layout.tsx`.

---

## Desktop vs Mobile Differences Summary

| Element | Desktop | Mobile |
|---|---|---|
| Page title size | 64px | 32px |
| Page subtitle size | 16px | 12px |
| Tablist | Single row, border container | Flex-wrap, no container |
| Count label ("12 shown") | Visible, right-aligned | Hidden |
| Featured card layout | Side-by-side (text left, image right) | Stacked (image top, content below) |
| Featured card radius | 24px (3xl) | 16px (xl) |
| Featured card image | 541×474px absolute right | Full-width, aspect-ratio 540/473 |
| Highlights row font size | 16px notch/light | 12px notch/light |
| CTA button text size | 16px | 14px |
| CTA button padding | 12px 24px | 12px 16px |
| CTA button icon | 18px | 16px |
| Grid layout | 3-col, gap 24px | Single col, gap 24px |
| Grid card image height | 280px | 266px |
| Grid row gap | 40px | 24px (continuous single col) |
| Footer layout | Horizontal (existing Footer.tsx) | Mobile variant (existing Footer.tsx) |

---

## Components to Build

**Page file:** `app/works/page.tsx` — `'use client'` (filter state)

```
PageSections (pt: 140px desktop / 6rem tablet / 40px mobile, gap: 40px)
  PageHeader              → components/works/PageHeader.tsx
  FilterRow               → components/works/FilterRow.tsx
    FilterTabs
    CountLabel (desktop only)
  FeaturedCard            → components/works/FeaturedCard.tsx
  WorksGrid               → components/works/WorksGrid.tsx
    WorkCard × N          → components/works/WorkCard.tsx
```

### `components/works/PageHeader.tsx`
- Same pattern as `components/contact/PageHeader.tsx` and `components/resume/PageHeader.tsx`
- Title: "My works." — period in `text.secondary`
- Subtitle: "Selected portfolio"

### `components/works/FilterRow.tsx`
- Container: `max-width: 1168px`, flex, `justify-content: space-between`, `align-items: center`
- Left: `FilterTabs` component
- Right: count label (desktop only, `display: none` on `mq.mobile`)
- Accepts: `activeFilter`, `onFilterChange`, `counts`, `total`

### `components/works/FilterTabs.tsx`
- Desktop: pill container `border: 1px solid border.tertiary`, `radii.lg`, `padding: 8px`, single-row flex
- Mobile: no container, `flex-wrap: wrap`, `gap: 8px`
- Each tab button: label + badge count
- Active tab: `surface.inverse` bg, `text.inverse`, red badge
- Inactive tab: transparent, `text.primary`, `surface.secondary` badge

### `components/works/FeaturedCard.tsx`
- Receives a single `Project` with `featured: true`
- Desktop: side-by-side, `border: border.tertiary`, `radii['3xl']`, `padding: 24px`
- Mobile: stacked, `radii.xl`, `padding: 24px`
- Renders: logo image, tagline, description, highlights table (role/timeline/tags), CTA button, cover image
- CTA opens `cta_url` in new tab

### `components/works/WorkCard.tsx`
- Receives a single `Project` with `featured: false`
- Renders: image thumbnail, title (notch/medium, red period), description, tag pills
- The card is clickable — links to `cta_url` (new tab if external, internal if case study page)
- No hover state specified in Figma — implement as cursor-pointer, can add subtle hover later

### `components/works/WorksGrid.tsx`
- Desktop: CSS grid, 3 columns, `gap: 24px`, rows separated by `40px` row-gap
- Mobile: single column, `gap: 24px`
- Receives filtered `Project[]` array, maps to `WorkCard`

---

## Supabase Data Structure

Table: **`projects`** (already exists per CLAUDE.md)

### Required Columns

| Column | Type | Notes |
|---|---|---|
| `id` | uuid / serial | PK |
| `title` | text | "Plush", "Urban Trash", etc. |
| `description` | text | Short description for grid cards |
| `long_description` | text | Full paragraph for featured card only |
| `tagline` | text | Featured card only — subtitle under logo |
| `role` | text | Featured card only — e.g. "Founder • Designer" |
| `timeline` | text | Featured card only — e.g. "In Progress" |
| `tags` | text[] | Array of uppercase strings — drives filter AND tag pills |
| `type` | text | Filter category: `'case_study' | 'landing' | 'brand_identity'` |
| `featured` | boolean | `true` = full-width hero card; `false` = grid card |
| `cover_image_url` | text | Supabase storage URL — full bleed cover (featured) or thumbnail (grid) |
| `logo_url` | text | Brand logo image (featured card only; null for grid cards) |
| `cta_label` | text | Button label e.g. "Visit Plush" (featured only) |
| `cta_url` | text | External URL or internal path |
| `sort_order` | integer | Display order (featured first, then grid) |
| `created_at` | timestamptz | Auto |

### Filter Logic
- "All" → show all projects, ordered by `sort_order`
- "Case studies" → `type = 'case_study'`
- "Landing" → `type = 'landing'`
- "Brand Identity" → `type = 'brand_identity'`

Filter is **client-side** — fetch all projects once on mount, filter in state. Total count (12) is the full array length; per-category count is derived from array.

### Supabase Query
```ts
const { data } = await supabase
  .from('projects')
  .select('*')
  .order('sort_order', { ascending: true })
```

### Featured Card Logic
- Only 1 project should have `featured: true` (Plush in the design)
- `featured` project renders as `FeaturedCard` above the grid
- `featured` project is still included when filtering (if its `type` matches), or always shown if "All"
- On filter change: if active filter matches featured card's type (or "All"), show `FeaturedCard` + filtered grid; if filter excludes it, show only the grid

---

## Figma Annotations Summary

| Location | Annotation | Implementation note |
|---|---|---|
| Desktop count label `390:1770` | "Total number of projects" | Dynamic: total projects in dataset |
| Desktop navbar `390:1900` | "Navigation bar sticky at the top." | Already handled by Navbar.tsx |
| Mobile tablist `390:2194` | "Act as filters to show the below results" | Client-side filter via useState |
| Mobile featured card `390:1999` | "Card layout shifted to top down format." | Stacked layout on mobile |
| Desktop featured CTA `390:1806` | "Open 'plush.money' in new tab" | `target="_blank" rel="noopener noreferrer"` |
| Each grid card `390:1814`, `390:2044` | "Clickable card, link to case study/ external redirection if needed." | Entire card is an `<a>` |
| Mobile footer `390:1202` | "Changed the layout to 1/2/1 format" | Handled by existing Footer.tsx |
| Mobile footer copyright `390:1251` | "Changed to two line and center aligned." | Handled by existing Footer.tsx |

---

## Known Node IDs (add to CLAUDE.md)

| Section | Desktop | Mobile |
|---|---|---|
| Works (full page section) | `390:1078` | — |
| Desktop frame | `390:1745` | — |
| Mobile frame | — | `390:1079` |
| Page Header | `390:1748` | `390:1083` |
| Filter Tabs | `390:1752` | `390:2194` |
| Count label | `390:1770` | — |
| Featured Card | `390:1771` | `390:1999` |
| Grid Row 1 | `390:1813` | — |
| Grid Row 2 | `390:1856` | — |
| Mobile Grid Cards | — | `390:2043` |

---

## Implementation Notes

- `'use client'` required on `app/works/page.tsx` (filter state, Supabase fetch)
- Filter state: `useState<'all' | 'case_study' | 'landing' | 'brand_identity'>('all')`
- Tag pills use `border-radius: 6px` (hardcoded — this is below the theme scale minimum of `radii.lg=12px`)
- Image container border-radius is `14px` (hardcoded — between `radii.lg=12` and `radii.xl=16`)
- Grid card image containers use `overflow: clip` not `overflow: hidden` (consistent with globals.css reasoning)
- Do NOT use the `WorkCard` from `components/home/MyWorks.tsx` — the Works page card has a different structure (no gradient overlays, different layout)
- Desktop grid gap between rows: `gap-row: 40px` (different from column gap of 24px — use CSS grid `row-gap` and `column-gap` separately)
