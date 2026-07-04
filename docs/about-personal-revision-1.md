# About Page — Personal Mode Revision 1
**Figma source:** Desktop `328:908` · Mobile `328:1384`
**Compared against:** `components/about/personal/` + `components/about/common/`

---

## Section Order

| # | Figma section name | Current component | Status |
|---|---|---|---|
| 1 | About Description | `PersonalAboutDescription.tsx` | ✅ No changes |
| 2 | Travel section | `TravelSection.tsx` | 🔴 Major redesign |
| 3 | Work desk section | `WorkDeskSection.tsx` | 🟠 Redesign (photo removed) |
| 4 | Podcast Section | `PodcastMediumSection.tsx` (split) | 🟠 Layout/content changes |
| 5 | Writing Section | _(does not exist)_ | 🔴 New component |
| 6 | Credit cards section | `CreditCardsSection.tsx` | 🟠 Desktop layout change |

No sections added or removed at the top level. The change is that `PodcastMediumSection` (currently one two-column component) splits into two separate stacked sections.

---

## 1. PersonalAboutDescription.tsx — ✅ NO CHANGES

All content and layout matches Figma exactly:
- Section label: `MEET THE REAL ME` ✅
- Section header: `True to my soul.` with `my soul` muted ✅
- Bio text (both paragraphs) ✅
- To Do List tasks (Plan Sri Lanka, Start drafting first book, Redesign Portfolio checked, Next medium article, Shoot podcast episode) ✅
- Widget width 320px desktop ✅
- Hover tilt + task completion on hover ✅
- Mobile: full-width card, no tilt ✅

---

## 2. TravelSection.tsx — 🔴 Major Redesign

The entire map + flags + albums approach is **replaced** with passport-stamp country card tiles.

### Sections removed from current code
- `TravelMap` (desktop draggable canvas) — entirely gone from Figma
- `MobileFlagsRow` (5 flag icons with tooltips) — gone
- `MobileStatsCard` (standalone mobile stats card) — gone
- `AlbumsScroller` (horizontal scroll album photos) — gone
- `TravelMap.tsx` and `TravelMapClient.tsx` — both become dead code after this redesign

### New: Country Card Tiles container
Both desktop and mobile now show a **`surface.tertiary` background container** with country card "stamps" inside:
- Container: `background: surface.tertiary`, `padding: 40px`, `border-radius: radii.xl` (16px), `gap: 32px`
- Desktop: single flex row (horizontal)
- Mobile: `flex-wrap` (wraps to 2 rows), `px: 12px`, `py: 40px`

### New: CountryCard sub-component (per card spec)
Each card: year/HOME label (10px light, tracking 0.2px) + country name (24px notch semibold) + airport code row (12px notch light, tracking 0.24px, with icon).

| Country | Year label | Color | Border | Radius | Rotation | Icon asset | Airport code |
|---|---|---|---|---|---|---|---|
| INDIA | `HOME` | `text.tertiary` | none (outer ring SVG) | 12px | -5° | `AirportCodeIcon` | COK |
| QATAR | `2018` | `text.highlight` | 2px `surface.highlight` | 12px | +5° | `AirportCodeIcon` | DOH |
| SINGAPORE | `2024` | `text.primary` | 2px `surface.inverse` | 8px | -5° | `AirportCodeIcon` | SIN |
| MALAYSIA | `2024` | `text.highlight` | 2px `surface.highlight` | 64px | +5° | `AirportCodeIcon` | KUL |
| VIETNAM | `2025` | `text.secondary` | 2px `text.secondary` | 24px | -5° | `AirportCodeIcon` | HAN |
| OMAN | `2025` | `text.highlight` | none (outer ring SVG) | 56px | +5° | `AirportCodeIcon` | MCT |

INDIA and OMAN have a decorative outer ring SVG (like a passport stamp circle). These are separate from the card border. On mobile, the icon is a Star icon SVG instead of the airport code icon.

Desktop card size: ~109–189px wide, auto height (~113–115px). Mobile: slightly smaller (~80–96px height).

### Travel stats — layout change
Desktop stats now sit in a **two-column row** with the "Travel with me" CTA:
- Left: stats group (3 stats with separator lines)
- Right: `flex: 1` — description text + "Travel with me" button

Mobile stats: stay as 3 stats in a single horizontal row (unchanged pattern), but below the country cards (no CTA beside them). The "Travel with me" CTA moves below as its own block.

### Stats value changes
| Stat | Desktop (new) | Mobile (new) | Current |
|---|---|---|---|
| Stat 1 value | `06` | `06` | `06` |
| Stat 1 label | `STAMPS UNLOCKED` (2 lines) | `COUNTRIES DISCOVERED` (1 line) | `COUNTRIES DISCOVERED` |
| Stat 2 value | `50+` | `55` | `55` |
| Stat 2 label | `FLIGHTS BOARDED` | `FLIGHTS BOARDED` | `FLIGHTS BOARDED` |
| Stat 3 value | `2%` | `2%` | `2%` |
| Stat 3 label | `WORLD COVERED` | `WORLD COVERED` | `WORLD COVERED` |

Desktop stat number font: 48px notch regular, line-height 56px.
Mobile stat number font: 32px notch regular, line-height 40px.
Mobile stat label: 12px sans regular.

### "Travel with me" CTA
- Description text: `"Self planned, Rush itineraries, lots of walking, and best value for money. Send me an email if you'd like to hear when I plan the next."`
- Button: dark `surface.inverse`, label `"Travel with me"`, external icon 18px — `mailto:enricsneelamkavil@gmail.com`
- Desktop: button padding `12px 24px`, icon 18px
- Mobile: button padding `12px 16px`, font 14px, icon 16px

### Section label changes
| Breakpoint | New | Current |
|---|---|---|
| Desktop | `TRAVEL PASSPORT` | unknown (needs check) |
| Mobile | `TRAVEL · SLOWLY, MOSTLY` | unknown (needs check) |

---

## 3. WorkDeskSection.tsx — 🟠 Redesign (photo removed)

### Removed
- `DeskImage` (desk photo, Apple Watch overlay, iPhone screen overlay) — entirely gone
- Two-column `ContentRow` layout — gone

### Desktop layout: inline flex-wrap
Desktop now uses a **`flex-wrap` container** (`content-start`, `gap: 40px`). Each gear item is a single inline flex row: `[NAME] [apple icon?] [detail text]` — all on one line, items wrap naturally to fill the width.

- `GearName`: 16px sans regular, uppercase, `text.primary`
- Apple icon: inline, same as current (8.293×10.2px)
- `GearDetail`: 16px notch light, `text.tertiary`, inline (NOT right-aligned on desktop)

### Mobile layout: table rows (unchanged pattern)
Mobile keeps the current row-per-item approach, but `GearDetail` is **right-aligned** and **12px** (the current code already handles this via `fontSizes.xs` on mobile — ✅).

### Section label change
| Breakpoint | New | Current |
|---|---|---|
| Desktop | `THE TECH GLOVE BOX` | `THE DESK` |
| Mobile | `THE DESK` | `THE DESK` (no change) |

The section header text stays the same: `Where the work happens.` with `work` muted.

### Gear items: JUAREZ JRZ21UK
The ukulele (`JUAREZ JRZ21UK · 21" · Soprano · Ukulele`) appears in the current `GEAR` array and in mobile Figma — but is **absent from the desktop Figma**. This is likely a Figma omission. Keep all 9 items in the data array; the flex-wrap layout will handle it naturally.

---

## 4. PodcastMediumSection.tsx — 🟠 Split into two sections

The current single two-column component becomes **two separate stacked sections** in the `AboutClient` ModeGroup.

### 4a. PodcastSection (rename/rewrite from current podcast column)

**Section header changed:**
- Current: `"Chumma Oru Podcast."` with `Podcast` muted
- New: `"Hear my Podcast."` with `Podcast` muted

**Layout changed:** Podcast logo (left) + info block (right) in a flex row — gap 40px, `align-items: center`.

**Logo size changed:** 120×120px (was 64×64px). No border-radius specified (square/no overflow).

**Podcast info block** (right of logo):
- Title: `"Chumma Oru Podcast"` — notch regular, 24px, `text.primary`
- Description: notch light, 16px, `text.secondary` (same text as current)
- `"Watch Latest Episodes on:"` label — notch light, 16px, `text.primary`, whitespace nowrap
- Platform icons: **32px desktop** (was 64px), box-shadow `0 0 12px rgba(0,0,0,0.15)`, `border-radius: radii.lg` (8px) — **40px mobile**, border-radius 12px

**Removed:**
- `"04 EPISODES"` episode count — gone
- `"Watch Latest Episode"` link text with arrow pill — gone

**Mobile layout:** logo and info block **stack vertically** (logo first, then details), gap 24px.

### 4b. WritingSection (new component)

New file: `components/about/personal/WritingSection.tsx`

**Section label:** `SOMETIMES I WRITE`
**Section header:** `"Scribbled from the heart."` with `heart` muted
- Old header was: `"Medium Articles."` with `Articles` muted

**Desktop header row:** section title (left, `flex: 1`) + `"Read all"` button (right) — side-by-side in same row, gap 40px.

**Article rows:**
- Each row: `56×56px thumbnail placeholder` (`surface.tertiary`, `border-radius: radii.lg`) + article info (title + read time) + arrow icon (desktop only)
- Row gap: 24px
- Padding: `py-[20px]` desktop, `py-[16px]` mobile
- `ArticleTitle`: notch regular, 16px, `text.primary`
- `ArticleReadTime`: notch light, 16px, `text.tertiary`
- Gap between title and read time: `gap: 4px`
- Arrow icon: 32px (was 24px), desktop only — hidden on mobile

**"Read all" button:**
- Style: secondary (`surface.tertiary` bg + `border.tertiary` border + `radii.lg` radius)
- Label: `"Read all"`, external icon 18px (16px on mobile)
- Desktop: in section header row (top right)
- Mobile: below article list as standalone block

**Same 3 articles as current** (hrefs unchanged).

---

## 5. CreditCardsSection.tsx — 🟠 Desktop layout change

### Desktop layout changed
- **Old:** CSS Grid `auto-fit, minmax(260px, 1fr)` — cards in a 4-column grid
- **New:** Two-column flex row:
  - Left (`flex: 1`, `isolate`): horizontal card stack — cards overlap using `mr-[-190px]` per card (same as mobile `mb-[-190px]` but horizontal). Cards render in a `flex` row (not column), each `flex: 1 0 0` with `aspect-ratio: 160/100`, `overflow: clip`, `border-radius: radii.lg`, `border: 1px solid border.tertiary`.
  - Right (`flex: 1`, `min-width: 0`): description text (`text.primary`, 16px light) + `"Find the right card"` button

Card order on desktop (front to back = left to right visually, z-index 8→1):
`amex` → `hdfc-marriott` → `phonepe-sbi` → `idfc-first` → `hdfc-millenia` → `hdfc-swiggy` → `flipkart-axis` → `icici-amazon-pay`

### Mobile: no change to layout (vertical stack unchanged)
Mobile card stack interaction and `mb-[-190px]` approach stays the same.

### Section label — mobile changed
| Breakpoint | New | Current |
|---|---|---|
| Desktop | `CREDIT LINEUP` | `CREDIT LINEUP` ✅ |
| Mobile | `COLLECT Points TO EXPERIENCE` | `CREDIT LINEUP` (assumed) |

### Section header — no change
`"My Card collection."` with `Card` muted ✅

---

## New Components Needed

| Component | File | Notes |
|---|---|---|
| `WritingSection` | `components/about/personal/WritingSection.tsx` | Splits from `PodcastMediumSection` |

## Components to be Rewritten

| Component | Notes |
|---|---|
| `TravelSection.tsx` | Full rewrite — map/flags/albums out, country cards in |
| `WorkDeskSection.tsx` | Photo + two-column layout out, flex-wrap desktop layout in |
| `PodcastMediumSection.tsx` → `PodcastSection.tsx` | Rename + restructure layout, logo size, platform icon size |

## Components That Become Dead Code (delete after TravelSection rewrite)

| File | Reason |
|---|---|
| `components/about/personal/TravelMap.tsx` | TravelMap no longer referenced |
| `components/about/personal/TravelMapClient.tsx` | TravelMap no longer referenced |

## AbouClient.tsx import update needed

Replace:
```tsx
import TravelSection from '@/components/about/personal/TravelSection'
import WorkDeskSection from '@/components/about/personal/WorkDeskSection'
import PodcastMediumSection from '@/components/about/personal/PodcastMediumSection'
```

With:
```tsx
import TravelSection from '@/components/about/personal/TravelSection'
import WorkDeskSection from '@/components/about/personal/WorkDeskSection'
import PodcastSection from '@/components/about/personal/PodcastSection'
import WritingSection from '@/components/about/personal/WritingSection'
```

And in the ModeGroup JSX, replace `<PodcastMediumSection />` with `<PodcastSection />` + `<WritingSection />`.

---

## New Assets Required

| Asset | Path | Notes |
|---|---|---|
| India outer ring SVG | `/about/personal/travel/india-ring.svg` | Decorative circle for India card |
| Oman outer ring SVG | `/about/personal/travel/oman-ring.svg` | Decorative circle for Oman card |
| Airport code icon | `/icons/airport-code.svg` (desktop) | Plane/location pin, 12×12 |
| Star icon | `/icons/star.svg` (mobile) | Used instead of airport icon on mobile |

Travel album photos (`/about/personal/travel/{country}-1.webp`) — no longer needed in the new design but can stay in public/ for now.

---

## Typography Differences Summary

| Element | Desktop | Mobile | Change? |
|---|---|---|---|
| Country card name | 24px notch semibold | 24px notch semibold | NEW |
| Country card year | 10px sans light, tracking 0.2px | 10px sans light | NEW |
| Country card code | 12px notch light, tracking 0.24px | 12px notch light | NEW |
| Stat number (travel) | 48px notch regular / lh 56px | 32px notch regular / lh 40px | Mobile value changed |
| Stat label (travel) | 16px sans regular, uppercase | 12px sans regular, uppercase | Mobile size changed |
| Gear detail (desktop) | 16px notch light, inline | — | Changed (was table-row right-align) |
| Gear detail (mobile) | — | 12px notch light, right-aligned | ✅ Same |
| Podcast logo | 120×120px | 120×120px | Size changed from 64px |
| Platform icon | 32px, radii.lg | 40px, 12px radius | Sizes changed from 64px |
| Article row padding | py 20px | py 16px | Changed (was 12px) |
| Article arrow icon | 32px | none | Was 24px; mobile removes it |
| Writing section header | "Scribbled from the heart." | same | Changed from "Medium Articles." |
| Podcast section header | "Hear my Podcast." | same | Changed from "Chumma Oru Podcast." |
