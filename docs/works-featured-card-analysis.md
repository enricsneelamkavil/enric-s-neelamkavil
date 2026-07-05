# Works Page — FeaturedCard & WorkCard Grid Analysis

Figma frames read fresh: Desktop `390:1745`, Mobile `390:1079` (section `390:1078`).
Compared against current code: `components/works/FeaturedCard.tsx`, `components/works/WorkCard.tsx`, `components/works/WorksGrid.tsx`.

**No tablet frame exists.** The Works section (`390:1078`) contains exactly two children: `Mobile` (`390:1079`, 402px canvas) and `Desktop` (`390:1745`, 1920px canvas). There is no intermediate/tablet-specific frame or breakpoint anywhere in the Works page design — Figma only specifies two states.

---

## 1. FeaturedCard — Desktop (node `390:1771`, "Article")

```
Article            x=376  y=220  w=1168   h=328
  Container (left)  x=24   y=24   w=760.34 h=280   ← text content
  BG (cover image)   x=824.34 y=24 w=319.66 h=280   ← cover image
```

Derived values:
- Card padding: **24px** all sides (left content starts at x=24/y=24; cover right edge = 824.34+319.66=1144.0 = 1168-24 ✓)
- Gap between left content and cover image: 824.34 − (24+760.34) = **40px** (= `theme.spacing[10]`)
- **Cover image height always equals left-content height** (both 280px here) — i.e. the cover is stretched to the content's height, not an independent fixed box.
- **Cover image width = height × (540/473)`** — 280 × 1.14164 = 319.66, exact match to aspect-ratio `540/473`. The width is *derived from the height*, not a fixed pixel value.

This confirms the cover image sizing rule on desktop is: **fixed aspect-ratio (540/473), height matches content height, width is whatever that produces.** There is no fixed-pixel width in the Figma spec (e.g. not literally `541px`) — `319.66px` here is only correct for this placeholder's 280px-tall content block. With the real (longer) Plush description, `LeftContent` will render taller than 280px, and per this same ratio the cover would scale up proportionally (e.g. at ~400px content height → ~456px cover width). A fixed `541px` width only happens to be roughly right at one specific content height (~473px) and will be wrong at any other content height.

### Left content structure (desktop)
- `Frame 374` (title + description): h=124 → title row h=40, description at y=52 h=72 (gap between title row and description = 12px)
- `Highlights` block: h=132, starts at y=148 (gap after title block = 148−124=24px)
  - Row 1 "Based" h=48, Row 2 "Currently" h=48, Row 3 "Domain" h=36 (tags row, no bottom padding)

---

## 2. FeaturedCard — Mobile (node `390:1999`, "Article")

```
Article            x=0   y=204  w=354   h=604.03
  BG (cover image)  x=24  y=24   w=306   h=268.03
  Container (text)  x=24  y=324.03 w=306 h=256
```

Derived values:
- Card padding: **24px** all sides (306 = 354−24−24 ✓)
- Gap between cover image and text container: 324.03 − (24+268.03) = **32px** (= `theme.spacing[8]`)
- Cover image aspect ratio: 306 / 268.03 = 1.1416 → **same 540/473 ratio**, but here it's **width-driven**: full available width (306px, i.e. card width minus padding) determines the height (306 × 473/540 = 268.03). This is the inverse relationship of desktop (there, height drives width).

### Important structural difference from desktop
The mobile `Article` node contains **only**:
1. Cover image (full width, aspect-ratio 540/473)
2. One text container: title+"Featured" badge row (h=40) + description (h=192), gap = 64−40 = **24px**

There is **no Highlights table (Role/Market/Domain rows) and no separate logo/tagline block** in the Figma mobile design — the mobile card is just image → title+badge → description. Nothing else.

**This is a real divergence from the current implementation.** `FeaturedCard.tsx` currently renders, on mobile: `LogoBlock` (logo image + tagline) in place of the title row, followed by the full `Highlights` table (Role, Market, Tags) below the description. That's more content than the Figma mobile spec shows. Flagging this since it directly affects "exact mobile layout" — the extra sections may be an intentional product decision made during implementation, but they are not present in the Figma frame.

---

## 3. Cover image behavior — summary

| Breakpoint | Driving dimension | Formula | Figma-derived example |
|---|---|---|---|
| Desktop | height (from content) | `width = height × 540/473` | 280 → 319.66 |
| Mobile | width (full card width) | `height = width × 473/540` | 306 → 268.03 |
| Tablet | — | no Figma spec exists | n/a |

Current code (`CoverImageOuter`/`CoverImageInner` as of this session) uses a **fixed `width: 541px`** on desktop and a **fixed `height: 300px`** on mobile — neither is driven by the aspect-ratio/content-height relationship Figma actually specifies. Per the analysis above, both breakpoints in Figma are strictly `540/473` aspect-ratio-driven (desktop: height-in → width-out; mobile: width-in → height-out), with no fixed pixel box at either size. No code changes were made as part of this task — this is reported for awareness only.

---

## 4. WorkCard grid — Desktop (node `390:1812` and siblings)

Three-column grid, one row shown at `390:1812` (x=375, y=588, w=1170, h=384):

```
Card 1   x=0        w=363.33
Card 2   x=403.33   w=363.33
Card 3   x=806.67   w=363.33
```
- Column gap: 403.33 − 363.33 = **40px**
- Row gap (checked across 3 row containers at y=588, 1012, 1436): 1012−(588+384) = 40px, 1436−(1012+384) = **40px**
- Card height: 384px (image block 233.85–234.20 + gap ~24px + info block 120px)

**Discrepancy vs. current code:** `WorksGrid.tsx`'s `Grid` styled-component sets `column-gap: theme.spacing[6]` (24px) and `row-gap: theme.spacing[10]` (40px). Figma shows **both column and row gap at 40px** — the column gap in code (24px) doesn't match Figma's 40px. Row gap already matches.

### Card internals (desktop, e.g. node `423:1659` "urban-trash")
- Outer bordered image box: w=363.33 (card width) h≈233.85–234.20
- Inner colored `Background` rrect: w=343.22, inset ~10px each side horizontally, full height
- Inner `Image`: w=341.08, h=203.62 (small ~6–9px top/bottom inset)
- Info block below: h=120 total → title+desc block h=84, tag row h=24, gap=12px between them

This matches the current `WorkCard.tsx` implementation closely: `ImageContainer` padding `9px 0`, `border-radius: 14px`, `ImageBg` inset `10px` (`BG_INSET_X`), `border-radius: 12px` — all consistent with the Figma insets measured above. `ImageFrame` height in code is fixed at `222px` (grid) vs. Figma's ~215.85px effective image height (233.85 outer − 9×2 padding) — close, minor rounding difference, not flagged as a real bug.

## 5. WorkCard grid — Mobile

Mobile grid cards (e.g. node `551:1787`) use the **same card height (384px)** as desktop, just full mobile width (354px) in a single column — confirmed by comparing `551:1787` (w=354, h=384) against desktop's `390:1814` (w=363.33, h=384). Internal proportions (image block, info block, gaps) are identical to desktop; only the card width changes to fill the mobile column. This matches `WorkCard.tsx`'s `mq.mobile` override, which sets `ImageContainer`/`Info` to `width: 100%` and bumps `ImageFrame` height to `248px` (vs. Figma's mobile image block height ~233.85–234.20, i.e. code runs slightly taller — again a minor rounding difference, not a functional bug).

---

## Summary of findings worth acting on (not applied — report only)

1. **No tablet frame in Figma** — any tablet-specific CSS in `FeaturedCard.tsx` is a developer judgment call, not a Figma spec.
2. **FeaturedCard cover image sizing in Figma is aspect-ratio-driven at both breakpoints** (540/473), not a fixed pixel width/height. Current code's fixed `541px` (desktop) / `300px` (mobile) values don't match this and will misalign once real Plush content height differs from the Figma placeholder's.
3. **FeaturedCard mobile Figma spec has no Highlights table or separate logo/tagline block** — current code renders more content on mobile than Figma shows.
4. **WorkCard grid column-gap should be 40px per Figma, not 24px** as currently set in `WorksGrid.tsx`.
