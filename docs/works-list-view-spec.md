# Works Page — List View Spec

Figma frames read fresh: `Mobile` (`390:1079`), `Desktop - Cards` (`390:1745`, formerly just "Desktop"), and **`Desktop - List` (`552:2055`)** — all three are direct children of the Works section (`390:1078`). The Works section grew from height 4828→5656 between the previous read and this one, which is what tipped this off: a list-view frame has since been added to the file.

**Correction to the prior version of this doc:** that version reported no list-view design exists. That was accurate at the time of that read but is now outdated — `Desktop - List` (`552:2055`) is a fully fleshed-out frame. No `Mobile - List` equivalent exists (confirmed — exactly 3 children under the Works section, enumerated via full XML parse, not just visual scan).

---

## `Desktop - List` (node `552:2055`) — full structure

```
Desktop - List          552:2055   x=80    y=3484  w=1920  h=2092
  Content               552:2056           w=1920  h=2012
    Container           552:2057           w=1920  h=1068   (header + toolbar + featured card)
      Page Header       552:2058   x=376   y=0     w=1168  h=92
      Container         552:2059   x=376   y=132   w=1168  h=48    (filter chips + view toggle — identical to grid view)
      Article           552:2084   x=376   y=220   w=1168  h=328   (Featured/Plush card)
      Articles Container 552:2505  x=376   y=588   w=1168  h=480   (list rows)
    Footer instance     552:2391           w=1920  h=824
  Navigation Bar        552:2392
```

### 1. Toolbar (filter chips + view toggle) — unchanged from grid view
Node `552:2059` is dimensionally identical to the grid view's toolbar (`390:1751`): same `Tablist` (478×48), same "Items shown" + view-toggle container (177×48, toggle 82×48 with two 32×32 icon slots). Screenshot confirms the **list icon is now the active/highlighted one** (red-filled background) and the grid icon is inactive (plain outline) — i.e. the toggle's active-state styling swaps correctly between views, same visual treatment (red highlight bg) just on the other icon.

### 2. Featured/Plush card — identical to grid view, unaffected by view toggle
Node `552:2084` ("Article") is **pixel-identical** to the grid view's featured card (`390:1771`): `1168×328` overall, left content `760.34×280` at `(24,24)`, cover image `319.66×280` at `(824.34,24)`. The featured card does not change between grid and list views — same layout, same size, same position.

### 3. List rows (node `552:2505`, "Articles Container") — THE NEW DESIGN

Container: `1168×480` total, holding 3 stacked `Article` rows, each **exactly `1168×160`, stacked with zero gap between them** (row 2 starts at y=160.0, row 3 at y=320.0 — no row-gap, unlike the grid's 40px gap). A visible **1px divider line runs above each row** (including above the first row) — confirmed visually in the screenshot, not just inferred; consistent with the light `border.tertiary`-style dividers used elsewhere (e.g. grid card's `HighlightRow`).

**Per-row layout** (screenshot + measured, e.g. row 1 "Urban Trash"):
```
Article row                 1168 × 160
  Background+Border (thumb)  168 × 112   at (0, 24)     ← 24px top/bottom padding, left-aligned
    inner group               168 × 100   at (0, 6)      ← 6px top/bottom inset
      colored Background     ~155-157 × ~92-101, ~6-7px inset from inner group
      Image                  varies — see below
  Text Container              976 × 60    at (192, 50)   ← 24px gap after thumbnail; 50px top/bottom padding (vertically centered: (160-60)/2=50)
    Title+Description block   variable width × 60, at (0,0) within Text Container
      Title (Heading 3)       height 32
      Description             height 24, starts y=36 → 4px gap under title
    Tag Container             variable width × 24, right-aligned, y=18 → vertically centered within the 60px text block ((60-24)/2=18)
```

- **Thumbnail image**: much smaller than the grid card's image (168×112 outer box vs. grid's 363×234) — this is a genuinely different, compact thumbnail treatment, not a scaled-down version of the same component.
- **Image fit behavior varies per card** in the Figma mockup: card 1 ("Urban Trash")'s `Image` rect exactly matches its `Background` rect (full bleed, no letterboxing); cards 2 and 3 ("ReputeUp", "Unnathi - KES") have `Image` rects smaller than and inset within their `Background` rects (e.g. card 2: background `156×101`, image `150.75×76.31` offset `(8.31,12.26)` inside it) — i.e. `object-fit: contain`-style centering with visible background-color letterboxing where the source image's aspect ratio doesn't fill the box. This matches the existing `object-fit: contain` behavior already used in `WorkCard.tsx`'s grid image.
- **Tags**: same bordered-pill chip style as the grid view (not solid dark fill) — visually confirmed in the screenshot (light outline chips: "B2B", "BRAND IDENTITY", "CASE STUDY", etc.).
- **Row divider**: 1px line above each row, appears to be `border-top`, consistent styling with the rest of the site's divider convention.
- **No hover states**: still no hover-named layers, shadow/elevation variants, or interaction annotations found anywhere in `Desktop - List` (checked again in this fresh read) — consistent with the grid view and with current code (no `:hover` styles anywhere in `WorkCard.tsx`/`FeaturedCard.tsx`/etc.).

### 4. Mobile list view — still doesn't exist
Confirmed via full enumeration of the Works section's direct children: exactly `Mobile` (`390:1079`), `Desktop - Cards` (`390:1745`), `Desktop - List` (`552:2055`). **No `Mobile - List` frame.** Mobile only has the grid/stacked-card design; there is no Figma spec for how the list view should behave on mobile.

---

## Discrepancies vs. current code (`WorkCard.tsx`, `WorksGrid.tsx`)

| Aspect | Figma (`552:2505`) | Current code (`$view === 'list'`) |
|---|---|---|
| Thumbnail size | **168 × 112** | `ImageContainer` width `280px`, `ImageFrame` height `180px` — noticeably larger |
| Row gap | **0px** (divider lines instead) | `ListContainer` uses `gap: theme.spacing[6]` (24px), no divider lines |
| Row height | Fixed **160px** | Not fixed — height driven by content (`align-items: center`, no explicit row height) |
| Title/description gap | **4px** (36−32) | Uses `TitleGroup`'s `gap: theme.spacing[1]` (4px) — ✅ already matches |
| Tag alignment | Right-aligned, vertically centered in the text block | Currently tags render below title/description in normal document flow (no right-aligned column) — structurally different arrangement |
| Mobile list view | No Figma spec | Code collapses list to the same stacked layout as grid (`flex-direction: column` override) — reasonable default given no spec exists |

No code was changed as part of this task — this is a report only, updating the doc with the corrected, now-available Figma spec.
