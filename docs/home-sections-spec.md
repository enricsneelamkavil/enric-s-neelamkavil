# Home Sections Spec — Remaining 4 Sections

Sourced from a single bulk Figma read on 2026-06-13.
File: `cGxPfzhfg2zi9MivaiE7dX` · Nodes: 136:3384, 136:3022, 136:3257, 136:3056

---

## Shared component needed before building these sections

### `components/shared/DiamondBullet.tsx`

The red rotated-square diamond bullet appears in three sections at three sizes. Should be built once and shared.

```
Interests      → 10×10px square, container ~14×14px
FeatureProduct → 8×8px square, container ~11×11px
MyWorks tags   → 6×6px square, container ~8.5×8.5px
```

**Pattern:** A square div (`background: icon.highlight`, `border-radius: radii.xs`) rotated `–45deg` inside a flex centering wrapper. The container size is `side × √2` to fit the rotated square without clipping.

**Props:**
```ts
interface Props {
  size?: number  // inner square side in px, default 8
}
```

**Styled approach:**
```tsx
const Wrapper = styled.div<{ $boxSize: number }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: ${({ $boxSize }) => $boxSize}px;   /* size × √2, rounded up */
  height: ${({ $boxSize }) => $boxSize}px;
`
const Square = styled.div<{ $size: number }>`
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ theme }) => theme.colors.icon.highlight};
  border-radius: ${({ theme }) => theme.radii.xs};
  transform: rotate(-45deg);
  flex-shrink: 0;
`
```

---

## Section 1 — Interests (136:3384)

**File:** `components/home/Interests.tsx`  
**Type:** `'use client'` (scroll listener)

### Visual

Full-width horizontal ticker strip, border top + bottom in `border.tertiary`, `padding-y: spacing[4]` (16px).

### Interaction annotation

> "Marquee to the right on scrolling below. The speed of the marquee depends on the scroll behaviour of the user"

This is **scroll-driven**, not auto-playing. As the user scrolls the page down, the strip moves **right** (positive X). Speed is proportional to `window.scrollY`, not scroll velocity — the strip position is directly mapped to scroll depth.

### Items (8 labels, 9 separator bullets)

Pattern: `bullet · Photography · bullet · Interaction · bullet · Experience · bullet · Product · bullet · Travel · bullet · Food · bullet · Credit Cards · bullet · Music · bullet`

**Item text style:**
- `fonts.notch`, `fontWeights.regular`, `fontSizes.lg` (32px)
- `line-height: 3.1rem` (49.6px — Figma value, not in theme tokens)
- `colors.text.secondary`
- `white-space: nowrap`

**Separator bullet:**
- `DiamondBullet` at `size={10}` (container `~14×14px`)

### Marquee implementation

Duplicate the full scroller strip once (2× total). Container: `overflow: hidden`, full width. Track: `display: flex; width: max-content`. Offset driven by scroll:

```ts
const SCROLL_FACTOR = 0.3  // tune this to control speed

useEffect(() => {
  const handle = () => setOffset(window.scrollY * SCROLL_FACTOR)
  window.addEventListener('scroll', handle, { passive: true })
  return () => window.removeEventListener('scroll', handle)
}, [])

// Track style:
// transform: translateX(${offset % halfWidth}px)
```

To handle infinite looping, track the total strip width (via ref), then wrap the offset with `offset % (stripWidth / 2)`. Both the original and the duplicate fill the track; as the first copy slides right out of view, the second takes over.

### Token mapping

| Property | Token |
|---|---|
| Border top/bottom | `1px solid colors.border.tertiary` |
| Padding-y | `spacing[4]` (16px) |
| Item gap | `spacing[12]` (48px) |
| Item font | `fonts.notch`, `fontWeights.regular` |
| Item size | `fontSizes.lg` (32px) |
| Item line-height | `3.1rem` (49.6px, no token) |
| Item color | `colors.text.secondary` |
| Bullet size | 10px, `colors.icon.highlight` |

---

## Section 2 — FeatureProduct (136:3022)

**File:** `components/home/FeatureProduct.tsx`  
**Type:** `'use client'` (styled-components)

### Overall layout

Flex-col, `gap: spacing[10]` (40px), `max-width: layout.maxWidth`.

### Title container

```tsx
<SectionLabel>The one I built solo</SectionLabel>
<SectionHeader before="A product of " muted="my own" />
```

> Note: Figma uses `#6e6a63` for the muted span here vs `#5c5c5c` (text.secondary). Treat as a design inconsistency — use `text.secondary` via SectionHeader.

### Article card

- `border: 1px solid colors.border.tertiary`
- `border-radius: radii['3xl']` (24px)
- `padding: spacing[6]` (24px)
- `display: flex; gap: spacing[10]` (40px); `align-items: center`
- Full width

#### Left: Plush Image panel

- Width: `33.75rem` (540px — no theme token)
- Height: `29.625rem` (474px — no theme token)
- `border-radius: radii['2xl']` (18px)
- `overflow: hidden`
- Background gradient: `linear-gradient(to bottom, #f3efe6, #ebe5d8)` (warm cream — hardcode, no theme token)

**Contents (absolute positioned, best effort):**

| Layer | Description | Asset |
|---|---|---|
| BG | Nature/sky scene, `object-fit: cover; object-position: bottom` | `imgBg` = `497ba364-d8f8-453b-83fd-11c3825c85f3` |
| Card | Credit card at `rotate(-61.11deg)`, centered-left | `img66D10207...` = `eff8d3bc-3b90-4e69-8c13-fdba142d7b32` |

The card is positioned at `left: 50%, top: 141px`, translated by `(-50%, -50%)`. Its dimensions: `199.9×228px` wrapper, inner card `193.3×121.7px`. A card shadow strip (`#f7f7f7`, 16.985×44.81px, rotated 29.3°) sits behind it at `left: 325px, top: 195.5px`.

**Simplification option:** Render `imgBg` as a fill image and the card as an absolutely positioned image. Skip the shadow strip unless pixel-perfect is required — it's barely visible.

#### Right: Content

`flex: 1 0 0`, flex-col, `gap: spacing[6]` (24px), justify-center, `height: 100%`

**Logo group** (flex-col, `gap: spacing[1]` = 4px):
- Plush logo image: height `3.5rem` (56px), width auto
  - Asset: `imgPlushLogo` = `1e9b7871-d1f8-4421-857b-5e5fd925dbc0`
- Tagline: "Your Personalised AI Powered Credit Card Assistant"
  - `fonts.sans`, `fontWeights.regular`, `fontSizes.sm`, `colors.text.tertiary`

**Description:**
- "Plush simplifies the credit card ecosystem through card discovery..."
- `fonts.sans`, `fontWeights.light`, `fontSizes.sm`, `lineHeights.normal`, `colors.text.primary`

**Feature list** (flex-col, `gap: spacing[1]` = 4px):
Each row: flex-row, `gap: spacing[2]` (8px), items-center

- `DiamondBullet size={8}`
- Feature text: `fonts.sans`, `fontWeights.regular`, `fontSizes.sm`, `lineHeights.normal`, `colors.text.secondary`, `white-space: nowrap`

Three features:
1. "Discover the right card based on your lifestyle & spending habits."
2. "Optimise your card portfolio & plan future upgrades."
3. "Learn real experiences, card combinations, and community insights."

**Button:**
```tsx
<Button
  label="Visit Plush"
  variant="primary"
  href="https://plush.money"
  external
/>
```
Dev annotation: "Open 'plush.money' in new tab"

### Arrow icon in button

The Figma shows a custom `imgSvg` arrow inside the button icon box. This should be handled by the existing `Button.tsx` ArrowIcon inline SVG — no asset needed.

---

## Section 3 — AwardShelf (136:3257)

**File:** `components/home/AwardShelf.tsx`  
**Type:** `'use client'` (styled-components)

### Overall layout

Flex-col, `gap: spacing[10]` (40px), `max-width: layout.maxWidth`.

### Title container

```tsx
<SectionLabel>Recognition</SectionLabel>
<SectionHeader before="A " muted="shelf " after="of awards." />
```

### Awards row

`display: flex`, `justify-content: space-between`, `align-items: center`, full width.

### AwardCard (×4)

Each card: `width: 13.25rem` (212px), flex-col, `gap: spacing[2]` (8px), items-center, justify-center.

**Internal structure:**
```
AwardCard (position: relative, flex-col)
  ├── GarlandWrapper (position: relative, width: 152px, height: 120px)
  │   ├── GarlandImg (position: absolute, inset: 0, object-fit: cover, object-position: bottom)
  │   └── AwardLogoImg (position: absolute, top: ~32px, left: 50%, transform: translateX(-50%))
  └── AwardInfo (flex-col, gap: 4px, items-center, text-center)
      ├── AwardName (Notch Medium, 16px, text.primary)
      └── AwardSubtitle (sans Light, 12px, text.secondary)
```

**Award logo position** (within the 152×120px garland):  
Figma places logos at `left: calc(50%), top: calc(50% - 27.78px)` → `transform: translate(-50%, -50%)` then offset up by 27.78px. Net: `top: 50%; transform: translate(-50%, calc(-50% - 1.74rem))`. Simplify to `top: 28%; left: 50%; transform: translateX(-50%)`.

**Garland image:** Same `imgGarland` reused for all 4 cards — `1ecca9e7` → wait, `imgGarland = 18f3a216-31d7-4837-ae55-d0c1e79fcc7b`

**Four award cards data:**

| # | Name | Subtitle | Logo asset |
|---|---|---|---|
| 1 | Awwwards Young Jury | Jury Member (2026, 2025) | `imgAwwwardsLogo` = `d45c183c-0fe6-429a-b172-bd41d9405dc2` |
| 2 | Awwwards Honors | enric.design (2025) | `imgAwwwardsLogo1` = `2817eda1-505e-436d-95c1-c70e295d5355` |
| 3 | Config APAC Attendee | Marina Bay Sands, Singapore (2024) | `imgVector` = `b156ad87-22fd-46e9-9459-2af0c93de7f3` |
| 4 | Huddle Designers Award | Kelp Kookies (2023) | `imgVector1` = `cbd529d0-f98f-4ca4-bd73-fa8ed211bd99` |

**Token mapping:**

| Property | Token |
|---|---|
| Award name | `fonts.notch`, `fontWeights.medium`, `fontSizes.sm`, `lineHeights.normal`, `text.primary` |
| Award subtitle | `fonts.sans`, `fontWeights.light`, `fontSizes.xs`, `lineHeights.tight`, `text.secondary` |
| Card width | `13.25rem` (212px, no token) |
| Garland size | `9.5rem × 7.5rem` (152×120px, no token) |
| Logo size | `1.9375rem × 1.152rem` (31×18.4px, from Figma) |

**Data model** (drive from a const array):
```ts
const AWARDS = [
  { name: 'Awwwards Young Jury', subtitle: 'Jury Member (2026, 2025)', logo: IMG_AWWWARDS_LOGO },
  { name: 'Awwwards Honors',     subtitle: 'enric.design (2025)',       logo: IMG_AWWWARDS_LOGO_1 },
  { name: 'Config APAC Attendee', subtitle: 'Marina Bay Sands, Singapore (2024)', logo: IMG_VECTOR },
  { name: 'Huddle Designers Award', subtitle: 'Kelp Kookies (2023)',    logo: IMG_VECTOR_1 },
] as const
```

---

## Section 4 — MyWorks (136:3056)

**File:** `components/home/MyWorks.tsx`  
**Type:** `'use client'` (styled-components)

### Dynamic vs static decision

The Figma shows 3 work cards with rich, unique, per-card product image compositions (5–15 absolutely positioned elements each, with specific rotations, shadows, decorative vectors). These compositions cannot be dynamically generated from Supabase rows without a full CMS image editor.

**Recommendation:** Hardcode the 3 work card image compositions as static components. Card *metadata* (title, description, tags, button) can optionally be driven from Supabase in a future pass. Build fully static for now.

### Overall layout

Flex-col, `gap: spacing[10]` (40px), `max-width: layout.maxWidth`.

### Header container

`display: flex`, `gap: spacing[10]` (40px), `align-items: center`, full width.

**Title:**
```tsx
<SectionLabel>MY WORKS · 2022 → 2026</SectionLabel>
<SectionHeader before="Other things I've " muted="shipped" />
```

**"See all works" button:**
```tsx
<Button label="See all works" variant="secondary" href="/works" />
```
Dev annotation: "Redirects to the 'Work' page"

### Work Card structure

Each card: `height: 29.625rem` (474px), `border-radius: radii.xl` (16px), `overflow: hidden`, `padding: spacing[10]` (40px), `display: flex`, `gap: spacing[2]` (8px).

**Left: Product Container** (width `23.875rem` = 382px, flex-col, `gap: spacing[8]` = 32px, justify-center, h-full):

```
ProductTagsRow (flex-row, gap: spacing[3] = 12px, items-center)
  ├── TagLabel (Notch Regular, 12px, text.secondary, nowrap)
  ├── DiamondBullet size={6}
  └── TagLabel

ProductInfoBlock (flex-col, gap: spacing[3] = 12px)
  ├── ProductTitle (Notch Regular, 40px, line-height: normal, text.primary)
  │   └── Period span (text.highlight = #e8342a ← NOT text.secondary here)
  └── ProductDescription (sans Light, 16px, lineHeights.normal, text.secondary)

Button (variant per card)
```

**Product title period color** is `colors.text.highlight` (#e8342a), NOT `text.secondary`. This differs from the `<Period>` component in the hero headline.

**Right: Product Image** (`flex: 1 0 0`, h-full, position-relative, `border-radius: radii['2xl']` = 18px):

Each card has a unique composition. Spec per card below.

---

### Card 1 — Urban Trash

**Background gradient:** `linear-gradient(174.51deg, rgb(245,255,241) 72.22%, rgb(212,242,199) 86.11%)` — light green

**Tags:** Consumer Web App · Waste Management

**Title:** Urban Trash **.**

**Description:** Urban Trash is a B2B waste aggregation platform dedicated to sustainable waste management. They provide solutions for businesses, ensuring efficient waste collection.

**Button:** `<Button label="Visit Website" variant="primary" href="https://urbantrash.in" external />` (dev annotation: "Open website 'urbantrash.in' in new tab")

**Product image composition:**

| Element | Asset | Position / Notes |
|---|---|---|
| Landing screenshot | `imgHomeLandingV11` = `cea41ab7-871e-45c6-84b7-7e26b531f203` | Tall card, `left: 50%+118.5px`, `top: 5.8px`, `463×382px`, `rounded-[12px]`, green border `#ceefbe`, green glow shadow |
| Green pricing card | `imgEllipse279` + `imgGraphBackgroundText` + `imgPlanName` + `imgPrice` + `imgChoosePlanButton` | `left: 56px`, `top: 26.8px`, `156×210px`, bg `#76d04d`, `rounded-[12px]`, green glow — complex internal layout |
| Dark icon card | gradient `#333→#111`, `left: 123px`, `top: 263.8px`, `89×107px`, `rounded-[6.47px]` with icon + description images inside |
| Urban Trash "U." logo | `imgIconLogo` = `871d0453-2eb1-43d3-82ba-e08f4d27efe0` | `left: 43px`, `top: 277.8px`, `50×40px` |

**Simplification note:** Render the landing screenshot and the two floating cards as absolutely positioned images using the Figma percentage offsets. The internal contents of the green pricing card and dark icon card are deeply nested sub-images — render them as single flat image assets rather than recreating their internal layout.

---

### Card 2 — ReputeUp AI

**Background gradient:** `linear-gradient(174.51deg, rgb(246,251,255) 72.22%, rgb(230,244,255) 86.11%)` — light blue

**Tags:** Landing Showcase · Review Management

**Title:** ReputeUp AI **.**

**Description:** ReputeUp is your all-in-one tool for gathering reviews and showcasing testimonials that can drive revenue. Generate and collect Google reviews through WhatsApp/QR/SMS/Email

**Button:** `<Button label="View design" variant="secondary" />` (no href given in Figma — leave as `#` placeholder for now)

**Product image composition:**

| Element | Asset | Position / Notes |
|---|---|---|
| Main dashboard screenshot | `imgImage` = `b76257b3-6de0-4f54-9116-a79ea99aa1c2` | `right: 7px`, `top: 50%+32.3px`, translated up 50%, `486×303px`, `rounded-[8px]`, `object-cover` |
| Rating card (floating) | `imgPortrait` + `imgVector2` | `left: 50%–254.33px`, `top: 134.8px`, white bg card `173×102px`, `rounded-[8px]`, blue glow shadow |
| Chat bubble | `imgChat` = `015aaec5-ccfd-455c-9862-bdf33d960719` | `left: 116px`, `top: 57.8px`, `49×49px` |
| Decorative vectors | `imgVector1`, `imgVector3`, `imgVector4`, `imgVector5` | Various small decorative elements scattered around |

---

### Card 3 — Unnathi

**Background gradient:** `linear-gradient(174.51deg, rgb(255,254,251) 72.22%, rgb(255,241,206) 86.11%)` — light yellow/cream

**Tags:** Landing Showcase · Government NGO

**Title:** Unnathi **.**

**Description:** Unnathi (Kerala Empowerment Society) is an initiative by the Government of Kerala, registered under the Travancore-Cochin Literary, Scientific and Charitable Societies Registration Act.

**Button:** `<Button label="View design" variant="secondary" />` (no href — placeholder)

**Product image composition:**

| Element | Asset | Position / Notes |
|---|---|---|
| Main website screenshot | `imgImage1` = `a37fd885-d613-491f-9a57-631286e77c9b` | `left: 239px`, `top: 50%+0.3px`, translated up 50%, `445×319px`, `rounded-[8px]`, overflow-hidden, image is `424.49%` tall (zoomed crop) |
| Unnathi logo (tilted) | `imgUnnathiLogo` = `755b580c-0ab8-4f7d-b032-66abbac4a7d7` | `left: 116.61px`, `top: 152.97px`, `91.6×49.8px`, `rotate(0.85deg)` |
| Yellow phone card | Custom border `#fbba16`, white bg, `rotate(-7.98deg)`, `left: 97.03px`, `top: 22.05px`, `98.8×72.9px`, `rounded-[10.65px]` — contains hand SVG group inside |
| Pin decoration | `imgGroup2` = `94e628b7-693c-49de-9fbf-656e263e2f3d` | `left: 64px`, `top: -0.2px`, `rotate(-43.11deg)`, `49.4×49.4px` |
| Decorative vectors | `imgVector6`, `imgVector7` | Large decorative elements |

---

## Build order recommendation

1. `components/shared/DiamondBullet.tsx` — needed by all 4 sections
2. `components/home/Interests.tsx` — simplest new logic (scroll listener)
3. `components/home/AwardShelf.tsx` — data-driven, medium complexity
4. `components/home/FeatureProduct.tsx` — single card, complex image panel
5. `components/home/MyWorks.tsx` — most complex (3 rich image compositions)
6. `app/page.tsx` — compose all sections

## Asset expiry note

All Figma image URLs in this spec expire **7 days** from 2026-06-13 (i.e., by 2026-06-20). Permanent assets should be uploaded to Supabase Storage or `/public` before that date.

## Figma asset URL index

| Variable | UUID | Used in |
|---|---|---|
| `IMG_GARLAND` | `18f3a216-31d7-4837-ae55-d0c1e79fcc7b` | AwardShelf (all 4 cards) |
| `IMG_AWWWARDS_LOGO` | `d45c183c-0fe6-429a-b172-bd41d9405dc2` | AwardShelf card 1 |
| `IMG_AWWWARDS_LOGO_1` | `2817eda1-505e-436d-95c1-c70e295d5355` | AwardShelf card 2 |
| `IMG_CONFIG_LOGO` | `b156ad87-22fd-46e9-9459-2af0c93de7f3` | AwardShelf card 3 |
| `IMG_HUDDLE_LOGO` | `cbd529d0-f98f-4ca4-bd73-fa8ed211bd99` | AwardShelf card 4 |
| `IMG_PLUSH_BG` | `497ba364-d8f8-453b-83fd-11c3825c85f3` | FeatureProduct image panel BG |
| `IMG_PLUSH_CARD` | `eff8d3bc-3b90-4e69-8c13-fdba142d7b32` | FeatureProduct credit card |
| `IMG_PLUSH_LOGO` | `1e9b7871-d1f8-4421-857b-5e5fd925dbc0` | FeatureProduct logo |
| `IMG_UT_SCREENSHOT` | `cea41ab7-871e-45c6-84b7-7e26b531f203` | MyWorks Urban Trash landing |
| `IMG_UT_ICON_LOGO` | `871d0453-2eb1-43d3-82ba-e08f4d27efe0` | MyWorks Urban Trash "U." |
| `IMG_UT_ELLIPSE` | `6ad58b47-5fe6-4988-b8b1-4b37886bd6e0` | MyWorks Urban Trash green card bg |
| `IMG_UT_GRAPH_BG` | `242d60f9-70cf-47ce-810a-6729d171f35b` | MyWorks Urban Trash green card |
| `IMG_UT_PLAN_NAME` | `a8a5f4e5-8fbc-44d0-8fa8-e73ea407bbb2` | MyWorks Urban Trash green card |
| `IMG_UT_PRICE` | `ab2904f0-3c30-428b-bfa4-8bee77e42a3f` | MyWorks Urban Trash green card |
| `IMG_UT_CHOOSE_PLAN` | `84c63a35-1380-4231-a605-fd91891c9c6e` | MyWorks Urban Trash green card |
| `IMG_UT_DETAILS` | `c4a4ff81-73be-48cf-8921-5d25db058e53` | MyWorks Urban Trash dark card |
| `IMG_UT_GLOW` | `ac8a7681-af09-4d8c-944d-586f978d22a1` | MyWorks Urban Trash dark card |
| `IMG_UT_ICON` | `ad28cef6-9aee-40d2-aa15-f920ffd63db2` | MyWorks Urban Trash dark card |
| `IMG_UT_ICON_DESC` | `f671f114-3cbe-4b47-b249-5f32e0d7d5cf` | MyWorks Urban Trash dark card |
| `IMG_REPUTEUP_DASHBOARD` | `b76257b3-6de0-4f54-9116-a79ea99aa1c2` | MyWorks ReputeUp screenshot |
| `IMG_REPUTEUP_PORTRAIT` | `71f86547-f3ff-4163-a9de-e8f06edad903` | MyWorks ReputeUp rating card |
| `IMG_REPUTEUP_RATING` | `77ac302b-3921-4b63-9fdc-7e340faadc64` | MyWorks ReputeUp rating card content |
| `IMG_REPUTEUP_CHAT` | `015aaec5-ccfd-455c-9862-bdf33d960719` | MyWorks ReputeUp chat bubble |
| `IMG_UNNATHI_SCREENSHOT` | `a37fd885-d613-491f-9a57-631286e77c9b` | MyWorks Unnathi screenshot |
| `IMG_UNNATHI_LOGO` | `755b580c-0ab8-4f7d-b032-66abbac4a7d7` | MyWorks Unnathi logo |
| `IMG_UNNATHI_PIN` | `94e628b7-693c-49de-9fbf-656e263e2f3d` | MyWorks Unnathi pin decoration |
