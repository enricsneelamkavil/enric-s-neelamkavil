# Timeline Revision 1 — Diff Report

**Source:** Figma frame `248:1175` (Desktop – Professional), node `248:1292` "Professional Timeline"  
**Compared against:** `components/about/ProfessionalTimeline.tsx` + `ProfessionalTimelineMobile.tsx`  
**Date read:** 2026-07-03

---

## TL;DR

The timeline has been **completely redesigned**. The old three-row layout (top events → masked photo strip → bottom events) is gone. It is now a **single horizontal scrollable row of self-contained event cards**, each with their own photo and text block. The shape-mask SVG strip, year labels, and the TOP/BOTTOM event split are all removed.

---

## 1. Overall Layout

### Current
```
TitleRow (label + nav buttons)
ScrollWrapper ─ horizontal scroll
  ScrollTrack ─ flex-col gap: 24px
    TopEventsRow ─ 6 events, gap: 240px, padding-left: 240px
    ImageStripWrapper ─ 2723px wide, shape-mask, year labels overlaid
    BottomEventsRow ─ 6 events, gap: 240px, padding-right: 240px
```

### Figma (new)
```
TitleRow (label + nav buttons)  ← identical
ScrollContainer ─ horizontal scroll
  CardRow ─ flex-row gap: 40px, items-center
    EventCard × 12  ← NEW structure, all in one row
```

### Differences
- **REMOVED**: The 3-row structure (TopEventsRow / ImageStrip / BottomEventsRow) is gone entirely
- **REMOVED**: `shape-mask.svg` — no masked photo strip
- **REMOVED**: `YEAR_LABELS` — no `> 2022`, `> 2023`, `> 2024`, `> 2025` overlays
- **REMOVED**: TOP_EVENTS / BOTTOM_EVENTS split — all 12 events are now in one flat row
- **CHANGED**: Event gap: `240px` → `40px`
- **CHANGED**: Order is now **newest-first** (Figma annotation: "newest added at the beginning")
- **NEW**: Each event card contains its own photo (264×169px)
- **NEW**: Supabase annotation — `"Should be able to be added from Supabase, newest added at the beginning"` — the card list is intended to be dynamically driven

---

## 2. Photo Strip

### Current
- Single masked horizontal strip, 2723×169px
- Shape mask applied via `mask-image: url('/about/timeline/shape-mask.svg')`
- 12 photos arranged in a horizontal flex row inside the mask
- Photos: `/about/timeline/tl-image-1.webp` … `tl-image-12.webp`
- Red overlay (`rgba(232, 52, 42, 0.5)`) on every photo cell
- Year labels (`> 2022`, `> 2023`, `> 2024`, `> 2025`) positioned absolutely over the strip

### Figma (new)
- **No strip** — each event card has its own standalone photo
- Card photo: `264×169px`, `border-radius: 16px` (radii.xl)
- Some photos have complex crops (overflow hidden + absolutely positioned img with percentage offsets)
- No red overlay on card photos
- Photo assets are different from the existing `tl-image-*.webp` files — new images from Figma (`imgImage2`–`imgImage13`)

### Differences
- Strip, shape mask, and masked photo layout: **entirely removed**
- 12 existing `tl-image-*.webp` files: **no longer used** in the new layout
- Red overlay (`rgba(232, 52, 42, 0.5)`): **removed** from photos
- 12 new photo assets needed — one per card

---

## 3. Event Blocks

### Current structure
```tsx
<EventBlock>
  <EventHeader>
    <EventTitle>{title}</EventTitle>   // notch medium 24px
    <EventSub>{sub}</EventSub>         // sans regular 16px highlight
  </EventHeader>
  <EventDesc $w={descW}>{desc}</EventDesc>  // sans light 12px secondary, fixed px width
</EventBlock>
```

### Figma (new) structure — per event card
```tsx
<EventCard>  // w-264px, flex-col, gap-24px
  // Alternates: some cards have image above content, some below
  <ContentContainer>  // flex-col, gap-4px
    <HeaderContainer>  // flex-col, whitespace-nowrap
      <EventTitle>{title}</EventTitle>   // notch medium 24px / line-height 32px
      <EventSub>{sub}</EventSub>         // sans regular 16px highlight / line-height 24px
    </HeaderContainer>
    <EventDesc>{desc}</EventDesc>        // sans light 12px secondary / line-height 16px
  </ContentContainer>
  <PhotoContainer>  // aspect-ratio 264/169, rounded-16px
    <img ... />
  </PhotoContainer>
</EventCard>
```

### Differences
- **CHANGED**: `EventDesc` no longer has a fixed `$w` (pixel width) — it fills the card width (`w-full` implied, or specific widths for some cards like `w-[210px]` on Young Jury)
- **CHANGED**: `gap` between header and desc: `spacing[1]` (4px) in current → `gap-[4px]` in Figma (same value, no change)
- **NEW**: Each event block gets a `264×169px` photo container with `border-radius: 16px`
- **NEW**: Photo alternates between being above or below the text content (cards 1,3,5,7,9,11 = image below; cards 2,4,6,8,10,12 = image above)
- **REMOVED**: `descW` prop — desc width is now determined by card width, not per-event fixed px

#### Image position pattern (12 cards, newest-first):
| # | Card | Photo position |
|---|------|---------------|
| 1 | Invited Attendee / Figma India | image **below** text |
| 2 | Young Jury 2025 / Awwwards. | image **above** text (photo width: 126.777px, not 264px) |
| 3 | Invited Attendee / Figma Config APAC | image **below** text |
| 4 | Graduation / Christ College | image **above** text |
| 5 | Speaker / Christ College | image **below** text |
| 6 | Lead Host / DESIGNATHON 2024 | image **above** text |
| 7 | Designers Award / Kerala Startup Mission | image **below** text |
| 8 | Participant attendee / Lollypop Designathon | image **above** text |
| 9 | Founder Host / CODe Design Week | image **below** text |
| 10 | UI Designer / GTech MuLearn | image **above** text |
| 11 | Co-host / BEACH HACK 5 | image **below** text |
| 12 | Chairman / CODe | image **above** text |

---

## 4. Year Labels

### Current
```ts
const YEAR_LABELS = [
  { text: '> 2022', left: 68, width: 252, height: 96 },
  { text: '> 2023', left: 564 },
  { text: '> 2024', left: 1494, width: 250, height: 96 },
  { text: '> 2025', left: 2333 },
]
```
Rendered as `position: absolute` overlays on the strip, font-size 80px/100px, `text.inverse` (white).

### Figma (new)
**No year labels anywhere** in the timeline section. The section label still reads "MY JOURNEY 2022 → 2026" but no per-year markers exist within the card row.

### Differences
- Year labels: **entirely removed**

---

## 5. Navigation

### Current
- Two `NavBtn` elements (left / right), `padding: spacing[4]` (16px), `surface.tertiary` bg, `border.tertiary` border, `radii.lg` (12px)
- Disabled state: `opacity: 0.4`
- Uses `/icons/arrow-left.svg` and `/icons/arrow-right.svg` (18×18)
- Nav buttons hidden on mobile

### Figma (new)
- Identical spec: two buttons, `p-[16px]`, `surface.tertiary`, `border.tertiary`, `rounded-[12px]`
- Same icons (18×18 arrow-left, arrow-right)
- Annotation: "Click to slide the timeline below. Disable respective icons at the ends."

### Differences
- Navigation: **no change** in structure or styling

---

## 6. Content Changes (event data)

Full comparison — old data (current code) vs new data (Figma):

### ORDER CHANGE
Old: split TOP + BOTTOM rows, left-to-right oldest-first  
New: single row, newest-first (Figma India → Chairman)

### TITLE CHANGES
| Old title | New title |
|-----------|-----------|
| Attendee *(Lollypop)* | **Participant attendee** |
| *(all others unchanged)* | |

### SUBTITLE CHANGES
| Old sub | New sub |
|---------|---------|
| Huddle Global | **Kerala Startup Mission** |
| Config APAC | **Figma Config APAC** |
| Figma India Launch | **Figma India** |
| *(all others unchanged)* | |

### DESCRIPTION CHANGES
| Event | Old desc | New desc |
|-------|----------|----------|
| Figma India | "Attended Figma's India office Launch representing Strollby Design." | "Attended Figma's India office Launch at Sheraton Grand Convention Center, Bangalore." |
| Designers Award | "Secured the position in Top 13 Designers in Branding Challenge." | "Won the position of Top 13 Designers in Branding Challenge at Huddle Global." |
| Speaker | "Handled multiple sessions on interface design for digital products." | "Handled multiple hands-on workshop sessions on interface design for digital products." |
| Lead Host | "Hosted second edition of Designathon, after CODe Design Week '23." | "Hosted second edition of Designathon, right a year after CODe Design Week '23." |
| Graduation | "Graduated Bachelors of **Engineering** in Computer Science & Engineering." | "Graduated Bachelors of **Technology (BTech.)** in Computer Science & Engineering." |
| Co-host | "Co-hosted the 5th edition of the flagship event Beach hackathon." | "Co-hosted the 5th edition of the flagship event Beach hackathon **aka Beach Hack**." |
| *(all others unchanged)* | | |

---

## 7. New Photo Assets Required

12 new card photos needed. Figma asset URLs (valid ~7 days from 2026-07-03):

| # | Event | Figma asset | Crop |
|---|-------|------------|------|
| 1 | Invited Attendee / Figma India | `imgImage2` – `3d48c5b8-...` | object-bottom |
| 2 | Young Jury 2025 / Awwwards. | `imgImage3` – `1cb6822f-...` | object-cover (126.777×169) |
| 3 | Invited Attendee / Config APAC | `imgImage4` – `7816632f-...` | object-bottom |
| 4 | Graduation | `imgImage5` – `3e07893c-...` | positioned: h=207.51%, top=-50.51% |
| 5 | Speaker | `imgImage6` – `233760e8-...` | object-bottom |
| 6 | Lead Host / DESIGNATHON 2024 | `imgImage7` – `b34d6165-...` | object-bottom |
| 7 | Designers Award | `imgImage8` – `f3ecc8ab-...` | positioned: h=129.03%, left=-6.1% |
| 8 | Participant attendee / Lollypop | `imgImage9` – `226a5ff1-...` | object-bottom |
| 9 | Founder Host / CODe Design Week | `imgImage10` – `874f282e-...` | positioned: h=336.59%, top=-141.55% |
| 10 | UI Designer / GTech MuLearn | `imgImage11` – `9350b484-...` | positioned: h=173.76%, left=-45.33% |
| 11 | Co-host / BEACH HACK 5 | `imgImage12` – `ba4e5434-...` | object-bottom |
| 12 | Chairman / CODe | `imgImage13` – `eb89baf1-...` | object-bottom |

Suggested local paths: `public/about/timeline/card-{01..12}.webp`

The existing `tl-image-1.webp` … `tl-image-12.webp` files remain on disk but are no longer used by the redesigned component.

---

## 8. Mobile Version Differences

### Current `ProfessionalTimelineMobile.tsx`
- 3-column vertical layout: LeftColumn | StripWrapper | RightColumn
- Center strip: 137px wide, 1304px tall, clip-path notch at top/bottom
- `StripContent`: 137px wide, vertical column of photos
- Year labels positioned vertically (`top` values derived from rotated horizontal coords)
- LeftColumn: 6 TOP_EVENTS spaced with `justify-content: space-between`, height 1306px
- RightColumn: 6 BOTTOM_EVENTS, `padding-bottom: 100px`

### Figma mobile (frame 284:834 — NOT read in this session)
The mobile frame was not fetched as part of this pass. Based on the complete structural change in the desktop frame, the mobile layout will also need redesigning. The 3-column vertical strip layout was designed to mirror the desktop horizontal strip — since the desktop strip is gone, the mobile strip will likely change too.

**Action required**: Read frame `284:834` fresh before implementing the mobile version.

---

## 9. Implementation Plan (not code — for planning only)

### Components to rebuild
1. **`ProfessionalTimeline.tsx`** — full rewrite:
   - Remove: `ImageStripWrapper`, `ImageStrip`, `TopEventsRow`, `BottomEventsRow`, year label machinery
   - Remove: `shape-mask.svg` dependency, `MASK_W`, `MASK_H` constants
   - Remove: `TOP_EVENTS` / `BOTTOM_EVENTS` arrays → replace with single `EVENTS` array
   - Add: `EventCard` styled component (264px, flex-col, gap 24px)
   - Add: `CardPhoto` styled component (aspect-ratio 264/169, rounded-16, overflow hidden)
   - Add: `imagePosition: 'above' | 'below'` per event
   - Add: photo asset path per event
   - Consider: Supabase integration for dynamic cards

2. **`ProfessionalTimelineMobile.tsx`** — needs fresh Figma read (frame 284:834) before implementation

### Assets to download
- 12 card photos from Figma (see table above) — download before implementing
- `shape-mask.svg` can be retired (no longer used)

### Supabase consideration
Figma annotation says cards should come from Supabase. Current `projects` table is for Works page. A new `timeline_events` table would be needed, or the cards can stay hardcoded if Supabase integration is deferred.

---

## 10. Mobile Findings — Frame 284:834

**Source node:** `284:906` "Sticky Container" (the mobile timeline section within the full mobile professional page)

### 10.1 Overall Mobile Layout

The mobile timeline is **structurally identical to desktop** — same single horizontal row of 12 event cards with alternating image position. This replaces the old 3-column vertical strip layout entirely.

```
Section (gap: 40px)
  TitleBlock (label + header)   ← same label/header text as desktop
  CardRow (flex, gap: 40px, items-center)  ← horizontal scroll
    EventCard × 12 (w-200px each)
  CTAIcons (flex, gap: 24px, justify-center)  ← nav buttons, BELOW cards
```

The old `ProfessionalTimelineMobile.tsx` structure (3-column strip, year labels, separate left/right event columns) is **fully replaced**.

### 10.2 Card Dimensions on Mobile

| Property | Desktop | Mobile |
|----------|---------|--------|
| Card width | 264px | **200px** |
| Photo height | 169px | **128px** |
| Photo width (standard) | 264px | **200px** |
| Photo width (Young Jury card) | 126.777px | **96px** |
| Photo border-radius (most cards) | 16px (radii.xl) | **16px** (radii.xl) |
| Photo border-radius (card 1 — Figma India) | 16px | **8px** (radii.lg) ← Figma inconsistency |
| Card gap | 40px | **40px** (same) |
| Content-to-photo gap (within card) | 24px | **24px** (same) |
| Header-to-desc gap (within content) | 4px | **4px** (same) |

> Note: Card 1 (Figma India) uses `rounded-[8px]` on its photo while all other mobile cards use `rounded-[16px]`. This appears to be a Figma inconsistency — implement as 16px for all cards for consistency, or match Figma exactly.

### 10.3 Typography on Mobile

| Element | Desktop | Mobile |
|---------|---------|--------|
| Event title | notch medium, 24px / 32px | **notch medium, 16px / 24px** |
| Event subtitle | sans regular, 16px / 24px (highlight) | **sans regular, 12px / 16px** (highlight) |
| Event desc | sans light, 12px / 16px (secondary) | **12px / 16px** (unchanged) |

Token mapping for mobile:
- Title → `fontSizes.sm` / `lineHeights.normal` (16px/24px)
- Sub → `fontSizes.xs` / `lineHeights.tight` (12px/16px)
- Desc → `fontSizes.xs` / `lineHeights.tight` (12px/16px) — same as desktop

### 10.4 Navigation Buttons on Mobile

**Position change:** On desktop, nav buttons are in the **title row** (right side). On mobile, they are in a **separate CTA row below the card strip**, centered.

| Property | Desktop | Mobile |
|----------|---------|--------|
| Position | Title row, right-aligned | **Below card row, centered** |
| Button padding | 16px | **12px** |
| Button border-radius | 12px (radii.lg) | **8px** (radii.md) |
| Icon size | 18×18px | **16×16px** |
| Gap between buttons | 12px | **24px** |
| Disabled behavior | opacity: 0.4 | same (from annotation) |

### 10.5 Scroll Behaviour

- Same horizontal scroll pattern as desktop
- Cards at 200px wide with 40px gap — on a 354px content-width mobile viewport, approximately 1.5 cards visible at a time
- No `scroll-snap` specified in Figma — smooth programmatic scroll via nav buttons
- The card row is inside a scroll wrapper (same as desktop ScrollWrapper pattern)
- No `scrollbar-width: none` specified but expected (matching desktop)

### 10.6 Elements Hidden / Shown on Mobile

**Hidden on mobile (existing behaviour, confirmed still applies):**
- The old `ProfessionalTimeline.tsx` (desktop) is `display: none` at `mq.mobile`
- The `ProfessionalTimelineMobile.tsx` (or its replacement) is `display: none` above `mq.mobile`

**No year labels** — same as desktop, fully removed.

**Section title label:** "MY JOURNEY 2022 → 2026" is shown on mobile (12px, `text.tertiary`). Not hidden.

### 10.7 Bonus: Additional Mobile Changes Spotted in Frame 284:834

These are outside the timeline but visible in the mobile frame and relevant to other components:

**AboutDescription — "Based" row:**
- Desktop (from frame 248:1175): `Kerala, IN`
- Mobile (from frame 284:834, node 284:858): **`Trivandrum, IN`**
- This confirms the "Kerala, IN → Trivandrum, IN" change needs to be applied to `AboutDescription.tsx`

**AboutDescription — "3+ years" vs "4+ years":**
- Desktop bio: "3+ years across fintech, SaaS and consumer apps"
- Mobile bio: **"4+ years across fintech, SaaS and consumer apps"**
- Discrepancy between desktop and mobile frames — mobile has updated copy

**ModeTogglePill label font weight:**
- Desktop pill text (node 488:1533): `font-['Stack_Sans_Notch:Regular']`
- Mobile pill text (node 488:1565): `font-['Stack_Sans_Notch:Light']`
- Current implementation uses `fontWeights.regular` — mobile should use `fontWeights.light`
- Minor discrepancy; may be intentional or a Figma oversight

---

## 11. Implementation Summary (Desktop + Mobile)

### Single shared component or two?
Both desktop and mobile use the **same card structure** — horizontal scroll row of 12 event cards. The differences are purely CSS (card width, photo height, font sizes, nav position). This can be implemented as one component with responsive styles, replacing both `ProfessionalTimeline.tsx` and `ProfessionalTimelineMobile.tsx`.

### Responsive token map
| CSS property | Desktop | Mobile (`mq.mobile`) |
|---|---|---|
| Card width | 264px | 200px |
| Card photo height | 169px | 128px |
| EventTitle font-size | 24px (fontSizes.md) | 16px (fontSizes.sm) |
| EventTitle line-height | 32px (lineHeights.relaxed) | 24px (lineHeights.normal) |
| EventSub font-size | 16px (fontSizes.sm) | 12px (fontSizes.xs) |
| EventSub line-height | 24px (lineHeights.normal) | 16px (lineHeights.tight) |
| Nav button padding | 16px (spacing[4]) | 12px (spacing[3]) |
| Nav button border-radius | 12px (radii.lg) | 8px (radii.md) |
| Nav icon size | 18px | 16px |
| Nav gap | 12px (spacing[3]) | 24px (spacing[6]) |
| Nav position | In title row (right) | Below card row (center) |

### Component to retire
`ProfessionalTimelineMobile.tsx` — can be deleted once the rebuilt `ProfessionalTimeline.tsx` handles mobile via responsive CSS. The `DesktopTimeline` / `MobileTimeline` wrappers in `app/about/page.tsx` should be collapsed back to a single render.
