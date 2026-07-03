# About Page — Professional Mode Revision 1 Diff

Figma frames compared: Desktop `248:1175` · Mobile `284:834`  
Built files compared: `app/about/page.tsx` + all `components/about/*.tsx`

---

## Summary

The About page has been significantly redesigned. The top mode toggle is gone. The old `ProfileImage.tsx` banner (621px with floating icons) is replaced by a new shorter masked-photo banner (293px desktop / 91px mobile). The intro section now uses the shared `PageHeader` component. The bottom toggle is redesigned from a two-label toggle into a single contextual "Switch to Personal Mode" pill. Journey gains a 3rd entry. One content text fix in AboutDescription.

---

## 1. Page Composition — Structural Changes (page.tsx)

### Old structure:
```
PageSections
  IntroSection (custom title + subtitle + top ModeToggle)
  ModeContent
    ModeGroup professional
      LandingGroup
        ProfileImageWrapper → ProfileImage (621px banner + floating icons)
        AboutDescription
      MyTools
      Journey (2 entries)
      DesktopTimeline / MobileTimeline
      AwardShelf
    ModeGroup personal
      ...
  BottomToggleWrapper (PROFESSIONAL + ModeToggle + PERSONAL labels)
```

### New structure (Figma 248:1175):
```
PageSections
  IntroSection (SharedPageHeader + HeaderImage + AboutDescription — no toggle at top)
  ModeContent
    ModeGroup professional
      MyTools
      Journey (3 entries)
      DesktopTimeline / MobileTimeline
      AwardShelf
    ModeGroup personal
      ...
  BottomTogglePill ("Switch to Personal Mode" pill — single button)
```

**Changes:**
- `ProfileImage` removed from `LandingGroup` entirely
- `AboutDescription` moved out of `LandingGroup` and into `IntroSection` (sits at bottom of intro section, below the banner)
- `LandingGroup` no longer needed in professional mode — `MyTools` is the first child of `ModeGroup`
- `BottomToggleWrapper` completely redesigned (see §6)

---

## 2. IntroSection.tsx — Complete Redesign

### Old design (built):
- Custom `PageTitle` h1: "About Me." (period in secondary) — 64px notch medium
- `PageSubtitle` p: "Two sides of one designer" — 16px sans regular, secondary
- `ModeSwitch`: PROFESSIONAL (button) + `<ModeToggle>` + PERSONAL (button)
- Props: `mode` + `onModeChange`

### New design (Figma 248:1178):
- Uses the **shared `PageHeader`** component (`components/shared/PageHeader.tsx`)
  - `label="ABOUT"`
  - `titleMuted="two sides"`
  - `titleAfter=" of one designer"`
  - No subtitle, no action
  - Desktop title: 48px notch medium, 56px line-height (same as shared PageHeader)
  - Mobile title: 32px notch medium, 40px line-height, letter-spacing -0.64px
- A new **`HeaderImage`** after the PageHeader (see §3)
- `AboutDescription` placed below the HeaderImage (see §4)
- **No ModeToggle** — removed from top entirely

The `IntroSection` component needs to:
1. Accept no `mode`/`onModeChange` props
2. Render `SharedPageHeader` + `HeaderImage` + `AboutDescription`
3. Use 32px gap between children (desktop), 24px gap (mobile)
4. Retain the page-top padding: 140px desktop / 6rem tablet / 40px mobile

---

## 3. HeaderImage — New Component (replaces ProfileImage.tsx)

The current `ProfileImage.tsx` (1168×621px, floating icons, mode switching) is **replaced** by a new simple masked banner.

### Figma spec (desktop node 485:1470):
| Property | Desktop | Mobile |
|---|---|---|
| Outer container | 1134×293px | 354×91px |
| Inner image | `object-fit: cover` | `object-fit: cover` |
| Mask | SVG mask creates shaped fade effect | SVG mask same shape |
| Photo asset | `header-banner.webp` (panoramic collage) | Same image, smaller |
| Gap from PageHeader | 32px | 24px |

**Mask approach:** The image has a `mask-image` CSS property pointing to an SVG mask shape (separate from the content photo). The mask has a Figma URL `c7a6270e-4a71-41be-9c52-bd33fbe9a8fa` — this needs to be downloaded and saved as `/about/header-mask.svg` (or raster fallback). The photo URL is `fd5b5402-4b2c-431b-8c23-c6f1d720dfa6`.

**No mode switching** — same image regardless of professional/personal mode.

**`ProfileImage.tsx` is no longer used** once the HeaderImage component is built. It can be deleted or repurposed for personal mode if the personal banner remains as a separate element. The `ProfileImageWrapper` in `page.tsx` is also removed.

### New asset paths to save:
```
public/about/header-banner.webp     # panoramic photo collage (from Figma asset fd5b5402)
public/about/header-mask.svg        # mask shape SVG (from Figma asset c7a6270e)
```

---

## 4. AboutDescription.tsx — Content Fix

One content difference: the "Based" row location text.

| | Built | Figma |
|---|---|---|
| Based location | `"Kerala, IN"` | `"Trivandrum, IN"` |

Everything else is correct — section label, header text, bio paragraph, IST clock, Currently row, Domain row.

**Fix:** In `AboutDescription.tsx` line 52, change `"Kerala, IN"` → `"Trivandrum, IN"`.

---

## 5. Journey.tsx — 3rd Entry Added

### Current built:
2 entries: UST + FunDesigns

### Figma (desktop 248:1262, mobile 284:887):
**3 entries:**

| | Entry 1 | Entry 2 | Entry 3 (NEW) |
|---|---|---|---|
| Role | Associate Product Designer | Lead UI Designer | Graphic Designer / Video Editor |
| Dates | August 2024 – Present | May 2024 – July 2024 | **Till May 2024** |
| Logo | `/about/journey/ust-icon.svg` | `/about/journey/fundesigns-icon.svg` | **New icon — 403:1690** |
| Bullet | shimmer | container | container |
| Logo link | `https://ust.com` | `https://fundesign.in` | none (general freelance work) |

**Entry 3 description columns (desktop):**
1. "UI Design Lead at GTech MuLearn Redesigning the official website, creating new flows, screens & dashboards for MuLearn."
2. "Worked as an Graphic Design intern helping Hound Electric and EV High Perfomance Shop in their Graphic Design needs."
3. "Occasional Video Editor at Sanjos Voice, official media team of St. Joseph's Parish Shrine, Pavaratty"
4. "UI Designer in Christ College fo Engineering Website Development team, Graphic Design Lead at GDSC CCE"

**Mobile entry 3** (Figma nodes 457:1565–457:1572):
- Role: "Graphic Designer / Video Editor" (wraps to 2 lines on mobile, 64px height → `white-space: normal`)
- Bullets: same 2 bullets shown (first 2 columns, matching mobile behavior of `&:nth-child(n+3) { display: none }`)

**New asset needed:**
```
public/about/journey/freelance-icon.svg  # from Figma node 403:1690 — crossed tools/scissors icon
```

**ConnectorLine logic:** The current code uses `isLast` to hide the connector after the last entry. With 3 entries, connectors appear after entries 1 and 2. The `isLast = i === ENTRIES.length - 1` check already handles this correctly once the 3rd entry is added.

---

## 6. Bottom Toggle — Complete Redesign

### Old design (built, in `page.tsx`):
```
BottomToggleWrapper
  ModeSwitch (flex row, gap 24px)
    ModeLabel "PROFESSIONAL" (button, active = red)
    ModeToggle (left/right knob)
    ModeLabel "PERSONAL" (button, active = red)
```

### New design (Figma 488:1530):
A single **contextual pill button**:

```
TogglePill
  IconCircle (white circle 40×40, border: border.tertiary, border-radius: 9999px, padding: 12px)
    ArrowLeftIcon (24×24 SVG)
  PillText "Switch to Personal Mode" (or "Switch to Professional Mode")
```

**Pill specs:**
| Property | Value |
|---|---|
| Background | `surface.tertiary` (`#f7f7f7`) |
| Border-radius | `9999px` (full) |
| Padding | `12px left, 16px right, 12px top/bottom` |
| Gap | `16px` between icon and text |
| Height | `64px` desktop / `56px` mobile |
| Text font | notch regular, 16px / 24px line-height |
| Text color | `text.tertiary` (`#a3a3a3`) |
| Text | `"Switch to Personal Mode"` when in professional mode (reverse when personal) |
| Arrow icon | `arrow-left.svg` (24×24) — annotated: "jiggle to left" micro-interaction hint |

**Interaction annotation:** `"Swipe to switch modes between 'Professional' and 'Personal'"` — the pill is a click/tap target, not a drag. The jiggle animation on the arrow is a hint that the user can switch modes.

**Gap from AwardShelf to toggle (Frame 8937):** 80px between the toggle and the footer (the 80px `gap` in Frame 8937 before Footer).

---

## 7. My Tools — No Changes

Figma shows 12 tools, same set as built: figma, photoshop, sketch, illustrator, lovable, xd, gemini, chatgpt, claude, coreldraw, after-effects, premiere-pro. Desktop 64×64px, mobile 40×40px in 6×2 grid. No changes needed.

---

## 8. ProfessionalTimeline.tsx — No Changes

Figma shows 12 timeline containers (6 top + 6 bottom), matching built. Same photo count (12), same event count. No content or structural changes needed.

---

## 9. ProfessionalTimelineMobile.tsx — No Changes

Same 12 events, same structure. No changes needed.

---

## 10. AwardShelf.tsx — No Changes

Same 5 awards (awwwards, ust, awwwards honors, figma, ksum). No changes needed.

---

## Mobile Differences (284:834)

| Section | Desktop | Mobile |
|---|---|---|
| PageHeader title size | 48px / 56px lh | 32px / 40px lh |
| PageHeader gap (LabelRow → title) | 12px | 12px |
| HeaderImage height | 293px | 91px |
| HeaderImage width | 1134px | 354px |
| Gap: PageHeader → HeaderImage | 32px | 24px |
| Gap: HeaderImage → AboutDescription | 32px | 24px* (About Desc separate section on mobile) |
| Journey entry 3 role | 1 line, `white-space: nowrap` | 2 lines (`white-space: normal`) |
| Bottom toggle height | 64px | 56px |

*On mobile (284:834), `About Description` (284:849) is a separate frame from `Profile Section` (284:836), with a 24px section gap, rather than being nested inside the intro section. Same visual result but mobile `IntroSection` only renders PageHeader + HeaderImage; AboutDescription is a sibling with `gap` applied at the page level.

---

## Changes Required

| Priority | File | Change |
|---|---|---|
| HIGH | `components/about/IntroSection.tsx` | Replace custom title/subtitle/toggle with SharedPageHeader; add HeaderImage; add AboutDescription; remove mode props |
| HIGH | `components/about/ProfileImage.tsx` | Remove or replace — the 621px floating-icon banner is no longer used for professional mode |
| HIGH | `app/about/page.tsx` | Remove top ModeToggle wiring; remove ProfileImage from LandingGroup; restructure BottomToggleWrapper to new pill design; move AboutDescription out of LandingGroup |
| HIGH | `components/about/Journey.tsx` | Add 3rd entry (Graphic Designer / Video Editor, "Till May 2024") |
| MED | `components/about/AboutDescription.tsx` | "Kerala, IN" → "Trivandrum, IN" |
| MED | Asset: `public/about/header-banner.webp` | Download from Figma asset fd5b5402 |
| MED | Asset: `public/about/header-mask.svg` | Download from Figma asset c7a6270e — mask shape for banner |
| LOW | Asset: `public/about/journey/freelance-icon.svg` | Download Figma node 403:1690 — 3rd journey entry logo |

---

*Screenshots confirmed: Figma desktop shows white-bg intro section with "ABOUT" / "two sides of one designer" title, collage banner below, then bio text. Mobile shows same layout compressed to 402px wide.*
