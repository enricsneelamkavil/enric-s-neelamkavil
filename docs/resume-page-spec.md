# Resume Page — Figma Spec

**Figma file:** `cGxPfzhfg2zi9MivaiE7dX`
**Section node:** `284:1108`
**Desktop frame:** `282:772` (1920×2944px)
**Mobile frame:** `306:1320` (402×1949px)

---

## Section Inventory (top to bottom)

| # | Section | Desktop node | Mobile node | Notes |
|---|---------|-------------|-------------|-------|
| 1 | Page Header | `282:775` | `306:1323` | Title + subtitle, full-width centered |
| 2 | Toolbar | `282:779` | `306:1599` | PDF metadata + zoom/print controls |
| 3 | Resume Canvas | `282:801` | `306:1617` | PDF viewer area |
| 4 | Download Section | `282:803` | `306:1649` | Dark card with download + email CTAs |
| 5 | Footer | `282:812` | `306:1423` | Shared Footer component (same as all pages) |

---

## Page-Level Layout

### Desktop
- Viewport: 1920px
- Content column: `max-width: 1168px`, centered
- Top offset: 140px (below sticky navbar)
- Content gap between major groups: **120px** (Resume Header → Footer)
- Resume Header internal gap: **80px** (header → toolbar/canvas → download)
- Content: `flex-direction: column; align-items: center`

### Mobile
- Viewport: 402px, padding: `0 24px`
- Top offset: 40px
- Sections gap: **72px** (header group → footer)
- Internal group gap: **24px** (toolbar → canvas → download)

---

## 1. Page Header

**Node:** Desktop `282:775` · Mobile `306:1323`

### Title
| Property | Desktop | Mobile |
|----------|---------|--------|
| Text | `Resume.` | `Resume.` |
| Font | `fonts.notch`, Medium | `fonts.notch`, Medium |
| Size | `fontSizes['3xl']` = 64px | `fontSizes.lg` = 32px |
| Line-height | 72px | `lineHeights.loose` = 40px |
| Letter-spacing | −1.28px (`letterSpacings.tightest`) | −0.64px |
| Color | `colors.text.primary` | `colors.text.primary` |
| Period | `colors.text.secondary` | `colors.text.secondary` |
| Alignment | center | center |

### Subtitle
| Property | Desktop | Mobile |
|----------|---------|--------|
| Text | `"The one pager"` | `"The one pager"` |
| Font | `fonts.sans`, Regular | `fonts.sans`, Regular |
| Size | `fontSizes.sm` = 16px | `fontSizes.xs` = 12px |
| Line-height | `lineHeights.normal` = 24px | `lineHeights.tight` = 16px |
| Color | `colors.text.secondary` | `colors.text.secondary` |
| Alignment | center | center |

---

## 2. Toolbar

**Node:** Desktop `282:779` · Mobile `306:1599`

### Container
| Property | Desktop | Mobile |
|----------|---------|--------|
| Width | 880px | 354px (full content width) |
| Padding | 16px all sides | 12px all sides |
| Border | 1px `colors.border.tertiary` | 1px `colors.border.tertiary` |
| Border-radius | `radii['2xl']` = 16px | `radii['2xl']` = 16px |
| Layout | `flex-direction: row; justify-content: space-between; align-items: center` | `flex-direction: column` (File Info only) |
| Background | transparent | transparent |

### Left — File Info Container
Shared across both breakpoints.

- **PDF Icon box**: 40×40px, `colors.surface.tertiary`, 1px border `colors.border.tertiary`, `radii.lg` = 12px, `padding: 12px`
  - Icon: `Icons/pdf` from library, 16×16px
- **File Name**: `"Enric S Neelamkavil - Resume.pdf"`
  - Font: `fonts.notch`, Regular
  - Desktop: 16px / 24px, `colors.text.primary`
  - Mobile: 12px / 16px, `colors.text.primary`
- **File Details** (annotation: _"No. of pages for the pdf, size of the pdf should be fetched. The paper size will always be A4."_):
  - `"1 page"` + DiamondBullet + `"217 KB"` + DiamondBullet + `"A4"`
  - Font: `fonts.sans`, Light, 12px / 16px, `colors.text.tertiary`
  - Bullets: 6px diamond, `colors.icon.highlight`, rotate 45°
  - Page count and file size are **dynamic** — fetched from the PDF asset
  - Paper size is always hardcoded: `"A4"`

### Right — Controls (Desktop only, hidden on mobile)

**Node:** `282:792`

- Container: `colors.surface.tertiary`, `radii.lg` = 12px, `padding: 8px 16px`, gap: 16px
- **Zoom Control** (`282:793`) — gap: 12px between elements
  - Minus icon: `Icons/minus`, 16×16px
  - Zoom level label: `"100%"`, `fonts.sans` Regular, 12px / 16px, `colors.text.secondary`, `width: 33px`, center-aligned
  - Plus icon: `Icons/add`, 16×16px
  - **Annotation:** _"Should be able to control the bottom pdf view. (Max 150% and Min 50%) Take the buffer 10% on each action."_
  - → Zoom range: 50%–150%, step: 10%
- **Print Icon** (`283:771`): 16×16px
  - **Annotation:** _"Should trigger the on-device print option."_
  - → `window.print()` on click

---

## 3. Resume Canvas

**Node:** Desktop `282:801` · Mobile `306:1617`

**Annotation (both):** _"This surround box acts as a canvas for the above zoom in and zoom out action."_

### Container
| Property | Desktop | Mobile |
|----------|---------|--------|
| Width | 1168px | 354px (full content width) |
| Padding | `80px 0` (vertical only) | `16px 0` (vertical only) |
| Background | `colors.surface.tertiary` | `colors.surface.tertiary` |
| Border-radius | `radii['2xl']` = 16px | `radii['2xl']` = 16px |
| Overflow | clip | clip |
| Layout | `flex; align-items: center; justify-content: center` | same |

### PDF Card (inside canvas)
**Node:** Desktop `282:802` · Mobile `306:1618`

**Annotation:** _"This is meant to be the uploaded pdf page, it should be replaced once the pdf is updated."_

| Property | Desktop | Mobile |
|----------|---------|--------|
| Width | 820px | 320.3px (scaled) |
| Height | 1160px | 453.1px (scaled) |
| Border-radius | 12px | 4.7px (scaled, ~12px ÷ 2.56) |
| Box-shadow | `0px 30px 60px -20px rgba(0,0,0,0.25)` | `0px 11.7px 23.4px -7.8px rgba(0,0,0,0.25)` (scaled) |
| Content | PDF render / `<iframe>` or `<embed>` | same |

> The PDF card scales proportionally. The desktop shadow and radius scale factor is approximately ÷2.56 on mobile.

### Zoom behaviour (desktop)
- Default: 100%
- Min: 50%, Max: 150%, step: 10%
- Zoom should scale the PDF card inside the fixed-size canvas container
- Canvas container itself does not resize — it stays 1168px wide, clips overflow

---

## 4. Download Section

**Node:** Desktop `282:803` · Mobile `306:1649`

### Container
| Property | Desktop | Mobile |
|----------|---------|--------|
| Width | 1168px | 354px (full content width) |
| Padding | 48px all sides | 24px all sides |
| Background | `colors.surface.inverse` (#171717) | `colors.surface.inverse` (#171717) |
| Border-radius | `radii['2xl']` = 16px | `radii['2xl']` = 16px |
| Layout | `flex-direction: row; justify-content: space-between; align-items: center` | `flex-direction: column; gap: 24px` |

### Download Info (left on desktop, top on mobile)

- **Label**: `"TAKE IT WITH YOU"` — `fonts.sans` Regular, 12px / 16px, `colors.text.tertiary`, uppercase
- **Heading**:
  - Desktop: `"Download the "` + `"Resume"` (highlight) + `"."` (inverse/white) — `fonts.notch` Regular, 32px / 40px
  - Mobile: same text — `fonts.notch` Regular, 24px / 32px
  - `"Resume"` in `colors.text.highlight` (#e8342a)
  - Period in `colors.text.inverse` (white)
- **Last updated date** (annotation: _"Last updated date should be the pdf upload date."_):
  - Text: `"Last updated 02 May 2026"` — `fonts.sans` Light, 12px / 16px, `colors.text.tertiary`
  - → **Dynamic**: pulled from PDF asset upload timestamp

### Download Buttons (right on desktop, bottom on mobile)

**Gap between buttons:** 10px

#### "Download" button (light)
- Desktop node: `282:810` · Mobile: `306:1654`
- **Annotation:** _"Should trigger a download of the uploaded pdf."_
- Background: `colors.surface.tertiary`
- Border: 1px `colors.border.tertiary`
- Border-radius: `radii.lg` = 12px
- Padding: `12px 24px` desktop / `12px 16px` mobile
- Text: `"Download"` — `fonts.sans` Regular, 16px desktop / 14px mobile, `colors.text.secondary`
- Icon: download SVG, 18px desktop / 16px mobile, background `colors.icon.secondary`, `border-radius: 9px`
- → `<a href={pdfUrl} download>` or programmatic download

#### "Email Enric" button (dark)
- Desktop node: `282:811` · Mobile: `306:1655`
- **Annotation:** _"Trigger a mailto:enricsneelamkavil@gmail.com"_
- Background: `colors.surface.inverse` (#171717)
- Border: 1px `colors.border.tertiary`
- Border-radius: `radii.lg` = 12px
- Padding: `12px 24px` desktop / `12px 16px` mobile
- Text: `"Email Enric"` — `fonts.sans` Regular, 16px desktop / 14px mobile, `colors.text.inverse` (white)
- No icon on this button
- → `href="mailto:enricsneelamkavil@gmail.com"`

---

## 5. Footer

**Node:** Desktop `282:812` · Mobile `306:1423`

Shared `Footer` component — already implemented in `components/common/Footer.tsx`. No changes required. Renders identically to all other pages.

---

## Navbar State

- Desktop: RESUME tab has active styling — `colors.surface.inverse` background, `colors.text.inverse` (white) text. All other tabs default.
- Mobile: Resume is **omitted** from the mobile bottom pill (per existing CLAUDE.md spec — 4 links: Home, About, Work, Contact + agent icon). No active-state change needed on mobile for this page.

---

## Reusable / Shared Components Used

| Component | Library node | Used as |
|-----------|-------------|---------|
| `Icons/pdf` | `283:720` | PDF icon in toolbar |
| `Icons/minus` | `283:761` | Zoom minus |
| `Icons/add` | `283:762` | Zoom plus |
| Print Icon | `283:771` | Trigger print |
| Button (light) | `78:*` instance | Download button |
| Button (dark) | `78:*` instance | Email Enric button |
| Menu Navigation (desktop) | `282:814` | Navbar pill |
| Menu Navigation (mobile) | `306:1481` | Bottom pill |
| Footer | `282:812` | Global footer |

---

## Dynamic Data Requirements

| Field | Source | Notes |
|-------|--------|-------|
| PDF file | Static asset in `public/` | Upload manually; path hardcoded or from env |
| Page count | Computed from PDF | Can use `pdf.js` or just hardcode if static |
| File size | Computed from PDF asset | Fetch `Content-Length` of PDF URL or hardcode |
| Last updated date | PDF upload timestamp | Hardcode or store in metadata |

> For a personal portfolio, all four can be hardcoded constants at the top of the component and updated manually when the resume PDF changes. Only the PDF itself needs to be an actual file.

---

## Component Files to Create

```
components/resume/
  ResumeHeader.tsx          ← page title + subtitle
  ResumeToolbar.tsx         ← PDF metadata bar + zoom/print controls
  ResumeCanvas.tsx          ← scrollable/zoomable PDF display area
  DownloadSection.tsx       ← dark card with download + email CTAs
```

**Page file:** `app/resume/page.tsx` — `'use client'` (zoom state needed), imports and composes sections.

**Composition:**
```
PageSections (gap: 120px desktop / 72px mobile)
  └── ResumeHeader
  └── ResumeToolbar
  └── ResumeCanvas
  └── DownloadSection
  Footer (in layout.tsx — already global)
```

> The gap structure differs slightly from other pages: Toolbar + Canvas + Download are tightly grouped inside the Resume Details container (gap: 40px desktop / 32px mobile), while the overall page has 120px gap to the footer.

---

## Known Figma Node IDs (Resume)

| Frame | Node ID |
|-------|---------|
| Resume section (canvas wrapper) | `284:1108` |
| Desktop full frame | `282:772` |
| Mobile full frame | `306:1320` |
| Desktop — Page Header | `282:775` |
| Desktop — Toolbar | `282:779` |
| Desktop — Resume Canvas | `282:801` |
| Desktop — PDF card | `282:802` |
| Desktop — Download Section | `282:803` |
| Mobile — Page Header | `306:1323` |
| Mobile — Toolbar | `306:1599` |
| Mobile — Resume Canvas | `306:1617` |
| Mobile — PDF card | `306:1618` |
| Mobile — Download Section | `306:1649` |
