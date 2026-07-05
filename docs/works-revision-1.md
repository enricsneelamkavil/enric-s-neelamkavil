# Works Page — Revision 1

Figma frames read: Desktop `390:1745`, Mobile `390:1079`.
Compared against: `app/works/page.tsx`, `components/works/PageHeader.tsx`, `FilterRow.tsx`, `FeaturedCard.tsx`, `WorkCard.tsx`, `WorksGrid.tsx`, `WorksClient.tsx`.

---

## 1. PageHeader (`components/works/PageHeader.tsx`)

### What Figma shows
- Agent gradient icon (12×12px) + label "WORKS" on one line, centered
- Title: **"crafting the finest of all"** — "crafting " in `text.secondary`, " the finest of all" in `text.primary`
- Desktop font: `fontSizes['2xl']` (48px), line-height 56px, letter-spacing -0.96px
- Mobile font: `fontSizes.lg` (32px), line-height `lineHeights.loose` (40px)
- Component gap: 12px between label row and title

### Current state
- Title: "My works." in `fontSizes['3xl']` (64px)
- No label row, no icon
- Subtitle: "Selected portfolio" (no equivalent in Figma)

### Changes needed
- **Delete** `components/works/PageHeader.tsx` entirely
- **Switch** `WorksClient.tsx` to import `PageHeader` from `@/components/shared/PageHeader`
- Pass props: `label="WORKS"` · `titleBefore=""` · `titleMuted="crafting "` · `titleAfter="the finest of all"`
- No `subtitle` prop needed

---

## 2. FilterRow (`components/works/FilterRow.tsx`)

### What Figma shows (desktop)
- Left: filter pill (same as current)
- Right: `"12 shown"` count label + **new view toggle pill** side by side
  - View toggle: bordered pill, `border: 1px solid border.tertiary`, `border-radius: radii.lg`, `padding: 8px`, `gap: 2px`
  - Inside: two `p-[8px]` slots — **grid icon** (active: `surface.highlight` red bg + white icon) and **list icon** (inactive: transparent)
  - Icon size: 16×16px each
  - Annotation: `Toggle to 'Card' & 'List' view`

### What Figma shows (mobile)
- No view toggle on mobile (same as desktop for filter chips — matches current)

### Current state
- Only shows count label on desktop right side
- No view toggle exists

### Changes needed
- Add `view: 'grid' | 'list'` + `onViewChange` props to `FilterRow`
- Render `ViewToggle` pill on desktop only (hide at `mq.mobile`)
- Add `/icons/grid.svg` and `/icons/list.svg` to `public/icons/`
- Active icon slot: `surface.highlight` bg (`#e8342a`), `radii.md`, white icon via CSS filter
- Inactive slot: transparent bg
- Wire up in `WorksClient.tsx` with `useState<'grid'|'list'>('grid')`

---

## 3. FeaturedCard (`components/works/FeaturedCard.tsx`)

### 3a. Desktop layout — Logo removed
- **Current**: Shows `LogoBlock` (Plush logo 189px + tagline) on desktop
- **Figma desktop**: Left content starts directly with `"Plush." + Featured badge` — no logo image, no tagline
- **Fix**: Hide `LogoBlock` on desktop (`display: none` at desktop), show only on mobile

### 3b. "Featured" badge — NEW
- Appears inline with the "Plush." title heading on same row
- Style: `background: rgba(232, 52, 42, 0.1)`, `border-radius: 4px`, `padding: 4px 8px`, `gap: 4px`
- Contents: laurel icon 16×16px + "Featured" text in `text.highlight` red, `fontWeights.regular`, 12px/16px
- Laurel icon at `/icons/laurel.svg` — needs to be downloaded from Figma or created
- No border on the badge (background fill only)

### 3c. Highlight Row 2 changed
- **Current**: `"Timeline"` / `"In Progress"`
- **Figma**: `"MARKET"` / `"Direct-to-Consumer (D2C)"`
- Fix: Update `PLUSH` constant in `FeaturedCard.tsx`:
  - Change `timeline: 'In Progress'` → `market: 'Direct-to-Consumer (D2C)'`
  - Change `RowLabel` text from "Timeline" to "MARKET"

### 3d. Description text updated
- **Current**: `"...It's the clearest example of how to solve a confusing problem simply, and don't make the user do the work of understanding it."`
- **Figma**: `"...Built to replace confusion with clarity, Plush helps users make smarter card decisions without pressure, complexity, or unnecessary financial jargon."`
- Fix: Update `long_description` in `PLUSH` constant

### 3e. Desktop cover image sizing
- **Current**: `width: 541px; height: 474px` fixed
- **Figma**: `self-stretch; aspect-ratio: 540/473` — height fills card, width derived from aspect ratio
- Fix: `CoverImageWrap` on desktop → `align-self: stretch; aspect-ratio: 540 / 473; width: auto; height: auto`
- Remove fixed `width` and `height` on desktop

### 3f. Highlight row padding
- **Current**: `py-[13px]` for rows 1–2, `py-[14px]` for row 3
- **Figma**: `py-[12px]` for all three rows
- Fix: Change `HighlightRow` padding to `12px 0` uniformly

---

## 4. WorkCard (`components/works/WorkCard.tsx`)

### 4a. Image container — colored background layer
- **Current**: `ImageContainer` has `border: 1px solid border.tertiary`, `height: 280px`, image fills it via `object-fit: contain`
- **Figma**: Image container has `border: 1px solid border.tertiary`, `padding: 9px 0` (no fixed height), contains:
  - A colored background div (`bg_color`) with `border-radius: 12px` positioned centered inside
  - The project image centered inside the background
- This requires a `bg_color` (hex string) per project stored in Supabase

**Image area structure in Figma:**
```
ImageContainer: border, border-radius 14px, overflow-clip, py-9px
  Background: centered, border-radius 12px, project-specific bg_color
    Image: centered inside background
```

**Supabase schema change needed:**
```sql
ALTER TABLE projects ADD COLUMN bg_color text DEFAULT '#F5F5F5';
```

**WorkCard prop change:**
- `project.bg_color` accessed inside `WorkCard` for background fill
- If `bg_color` is null, fall back to `surface.tertiary` (#F5F5F5)

**Desktop image height implication:**
- Figma shows ~222px for the image area (background div height)
- Remove `height: 280px` from `ImageContainer`; let height be content-driven by image

### 4b. Mobile image container height
- **Current**: `height: auto; aspect-ratio: 660/394` on mobile (~209px at 350px width)
- **Figma**: Fixed `height: 266px` on mobile
- Fix: Change mobile `ImageContainer` to `height: 266px; aspect-ratio: unset`

### 4c. WorkCard image rendering
- **Current**: `CardImg` uses `object-fit: contain; object-position: center; position: absolute; inset: 0`
- **Figma**: Image is centered within the colored background at specific proportional dimensions
- With the new `py-9px` container + inner background approach, the image should `object-fit: contain` within the inner background layer, not fill to the container border

---

## 5. WorksGrid (`components/works/WorksGrid.tsx`)

### What Figma shows
- Desktop: 3-column flex row, `gap: 24px` — matches current `column-gap: spacing[6]`
- No structural changes

### Current state — matches

### Changes needed
- **Add list view layout**: When `view === 'list'`, render a single-column stacked layout (WorkCard full width, horizontal image+info side by side)
- `WorksGrid` needs a `view: 'grid' | 'list'` prop

---

## 6. WorksClient (`components/works/WorksClient.tsx`)

### Changes needed
- Add `const [view, setView] = useState<'grid' | 'list'>('grid')`
- Pass `view` and `onViewChange={setView}` to `FilterRow`
- Pass `view` to `WorksGrid`

---

## 7. New Assets Required

| Asset | Path | Description |
|---|---|---|
| Grid view icon | `/icons/grid.svg` | 16×16px grid icon for view toggle (active state) |
| List view icon | `/icons/list.svg` | 16×16px list icon for view toggle (inactive state) |
| Laurel icon | `/icons/laurel.svg` | 16×16px laurel wreath for "Featured" badge on FeaturedCard |

All three icons appear in the Figma as `/icons/grid`, `/icons/list`, `/icons/laurel` references. Download from Figma (node IDs for grid/list visible in the FilterRow section, laurel at `411:1819`).

---

## 8. Summary Table

| Component | Type | Priority |
|---|---|---|
| PageHeader — replace with shared component | Rebuild | High |
| FilterRow — add view toggle | Feature | Medium |
| FeaturedCard — remove logo on desktop | Style | High |
| FeaturedCard — add "Featured" badge | Feature | High |
| FeaturedCard — Row 2 label+value update | Content | High |
| FeaturedCard — description text update | Content | High |
| FeaturedCard — cover image self-stretch | Style | Medium |
| FeaturedCard — row padding 13→12px | Style | Low |
| WorkCard — colored background layer + new structure | Rebuild | High |
| WorkCard — mobile height 266px | Style | Medium |
| WorksGrid — list view layout | Feature | Medium |
| WorksClient — view state | Feature | Medium |
| Supabase — add `bg_color` column | Schema | High (for WorkCard) |
| New icons (grid, list, laurel) | Assets | High |
