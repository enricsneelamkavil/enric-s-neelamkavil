# Mobile Home Page Spec

Figma node: `184:383` — "Home (Mobile)"  
Frame size: **402 × 5445 px**  
Reference breakpoint: ≤ 402px (implement as `@media (max-width: 768px)` unless otherwise noted)

---

## Global layout

| Property | Desktop | Mobile |
|---|---|---|
| Frame width | 1920px | 402px |
| Content padding (horizontal) | 376px each side (max-width 1168px centered) | 24px each side |
| Content padding (top) | 140px (navbar clearance) | 80px |
| Section gap | varies per section | **71px** between all sections (flex-col gap) |

---

## Navbar

**Desktop:** fixed/absolute at top-center, width 473px, height 68px.  
**Mobile:** **sticky bottom**, horizontally centered pill.

| Property | Mobile value |
|---|---|
| Position | `position: fixed; bottom: ~24px; left: 50%; transform: translateX(-50%)` |
| Width | ~356px |
| Height | 40px |
| Background | `#f7f7f7` (surface-tertiary) |
| Border | 1px solid `#e0e0e0` |
| Border-radius | 8px |
| Padding | 6px all sides |
| Link padding | 10px horizontal, 4px vertical |
| Link font | Stack_Sans_Headline:Regular, 12px, uppercase, line-height 20px |
| Active link bg | `#171717` (surface-inverse), border-radius 8px |
| Active link text | white |
| Inactive link text | `#171717` |
| Trailing element | Separator line (0px wide, 20px tall) + small logo icon (~31.6 × 23.3px) |
| Links (in order) | Home · About · Work · Resume · Contact · [logo] |

The desktop top navbar is **hidden** on mobile. Replace it entirely with this bottom bar.

---

## Section 1 — Landing (Hero)

### Welcome Tag
No changes from desktop — same border, padding (px-16 py-8), rounded-12, font-size 12px.

### Hero Title
| Property | Desktop | Mobile |
|---|---|---|
| Font | Stack_Sans_Notch:Medium | Stack_Sans_Notch:Medium |
| Size | ~64px | **32px** |
| Line-height | ~72px | 40px |
| Letter-spacing | — | -0.64px |
| Alignment | center | center |
| Width | 1168px | 100% |

Text content: "Building Products. Exploring Culture. Enriching Experiences."  
Periods colored `#5c5c5c`, main text `#171717`.

### Hero Subtitle
| Property | Desktop | Mobile |
|---|---|---|
| Font | Stack_Sans_Headline:Regular | Stack_Sans_Headline:Regular |
| Size | ~16px | **12px** |
| Line-height | 24px | 16px |
| Color | `#5c5c5c` | `#5c5c5c` |
| Alignment | center | center |

### Hero Images (3 photos)
| Property | Desktop | Mobile |
|---|---|---|
| Each image width | 373px | 212px |
| Each image height | 336px | 191px |
| Border-radius | ~16px | **9.095px** |
| Gap between images | ~24px | ~13.6px |
| Container width | 1168px | **663.95px** (overflows viewport — bleeds left and right) |
| Container left offset | 376px | **-130.98px** (negative, creates bleed effect) |
| Annotation | — | "Image shrinked but in a cut through margin style" |

### Company Logos
| Property | Desktop | Mobile |
|---|---|---|
| Label font size | 24px | **12px** |
| Label color | `#a3a3a3` | `#a3a3a3` |
| Mask/logo height | 56px | 56px (same) |
| Container width | 1920px | 401px |

---

## Section 2 — About Brief

**Desktop:** Info section (left) + Stats (right) — horizontal, side by side.  
**Mobile:** Stacked — Info section on top, Stats below. Gap between the two: **40px**.

### Info Section
| Property | Desktop | Mobile |
|---|---|---|
| Width | 564px | 100% |
| Eyebrow label size | 12px | 12px |
| Eyebrow label color | `#a3a3a3`, uppercase | same |
| Section heading size | ~32–40px | **24px** |
| Section heading font | Stack_Sans_Notch:Regular | Stack_Sans_Notch:Regular |
| Section heading line-height | ~40px | 32px |
| Description size | 16px | 16px |
| Description font | Stack_Sans_Headline:Light | same |

Heading text uses mixed-color: "Little about " `#171717` + "myself" `#5c5c5c` + "." `#171717`.

### Stats Container
| Property | Desktop | Mobile |
|---|---|---|
| Layout | Horizontal row with vertical separator lines | Horizontal row, **no separators** |
| Gap | — | 32px |
| Stat number size | ~48px | **32px** (Stack_Sans_Notch:Regular) |
| Stat number color | `#5c5c5c` | `#5c5c5c` |
| Stat number line-height | ~56px | 40px |
| Stat label size | 12px | 12px |
| Stat label font | Stack_Sans_Headline:Regular | same |
| Stat label color | `#a3a3a3`, uppercase | same |
| Gap (number → label) | — | 12px |
| Annotation | — | "Removed the separator in between" |

Each stat block: `flex: 1` equal width.

---

## Section 3 — Interests Ticker

| Property | Desktop | Mobile |
|---|---|---|
| Container height | 82px | **64px** |
| Scroller height | 50px | **32px** |
| Padding | — | py-16 |
| Item font size | ~40–50px | **24px** (Stack_Sans_Notch:Regular) |
| Item line-height | 50px | 32px |
| Item color | `#5c5c5c` | `#5c5c5c` |
| Gap between items | — | 48px |
| Top/bottom border | yes | yes (same) |

---

## Section 4 — Feature Product

**Desktop:** Horizontal article card (image left 540px, content right 540px).  
**Mobile:** Vertical card (image top, content below). Annotation: "Card layout shifted to top down format."

### Title Container
| Property | Desktop | Mobile |
|---|---|---|
| Eyebrow size | 12px | 12px |
| Heading size | ~32–40px | **24px** (Stack_Sans_Notch:Regular) |
| Heading line-height | ~40px | 32px |

### Article Card
| Property | Desktop | Mobile |
|---|---|---|
| Layout | Horizontal (image left, content right) | Vertical (image top, content bottom) |
| Border | none | 1px solid `#e0e0e0` |
| Border-radius | — | 16px |
| Padding | p-24 | **p-12** |

### Plush Image
| Property | Desktop | Mobile |
|---|---|---|
| Width | 540px | 100% |
| Height | 474px | auto (aspect-ratio 540/474) |
| Border-radius | 12px | 12px |

### Content Area
| Property | Desktop | Mobile |
|---|---|---|
| Logo height | 56px | **40.28px** |
| Tagline size | 16px | 16px |
| Tagline color | `#a3a3a3` | `#a3a3a3` |
| Description size | 16px | 16px |
| Description font | Stack_Sans_Headline:Light | same |
| Features gap | — | 8px |
| Feature text size | 12px | 12px |
| Feature text color | `#5c5c5c` | `#5c5c5c` |

### Button (SM variant)
| Property | Desktop | Mobile |
|---|---|---|
| Height | 52px | **42px** |
| Padding | px-24 py-16 (estimated) | **px-16 py-12** |
| Font size | 14px | 14px |
| Line-height | 18px | 18px |
| Border-radius | 12px | 12px |
| Icon size | 16px | 16px |
| Icon border-radius | 9px | 9px |

---

## Section 5 — Award Shelf

**Desktop:** 4 cards in a fixed horizontal row, 318.67px apart.  
**Mobile:** Horizontal scrollable row. Annotation: "Awards are changed to a horizontal scrollable format."

### Title Container
| Property | Desktop | Mobile |
|---|---|---|
| Eyebrow size | 12px | 12px |
| Heading size | ~32–40px | **24px** (Stack_Sans_Notch:Regular) |
| Heading line-height | ~40px | 32px |

### Awards Row
| Property | Desktop | Mobile |
|---|---|---|
| Layout | Fixed 4-column row | Horizontal scroll (`overflow-x: auto`) |
| Container width | 1168px | 377px (overflows 354px content width) |
| Gap between cards | 318.67px (3-across spacing) | **32px** |
| Card width | 212px | 212px (same) |
| Card height | 172px | 172px (same) |
| Visible cards | 4 at once | ~1.5 (scroll to see rest) |

Award card internal layout unchanged (garland 152×120, logo 32×32, info text below).

---

## Section 6 — My Works

**Desktop:** Header with title + CTA button, then 3 cards (image right, text left).  
**Mobile:** Header with title only (button **removed**), then 3 cards (image top, text below).

### Header
| Property | Desktop | Mobile |
|---|---|---|
| Eyebrow size | 12px | 12px |
| Heading size | ~32–40px | **24px** (Stack_Sans_Notch:Regular) |
| Heading line-height | ~40px | 32px |
| CTA Button | present (right side) | **removed** |

### Work Cards
| Property | Desktop | Mobile |
|---|---|---|
| Layout | Horizontal (text left 382px, image right 698px) | Vertical (image top full-width, info below) |
| Card border-radius | — | **16px** |
| Card padding | p-40 | **px-12 py-24** |
| Card background | gradient | gradient (same colors) |
| Image position | right column | **top**, full-width, aspect-ratio preserved |
| Image border-radius | — | 0 (image fills card top) |
| Gap between card sections | — | 16px |
| Gap between cards | — | 40px (section gap) |
| Annotation | — | "Card layout shifted to top down format and image first." |

### Work Card Content
| Property | Desktop | Mobile |
|---|---|---|
| Product tags size | 12px, Stack_Sans_Notch:Regular | 12px, Stack_Sans_Notch:Regular |
| Product name size | ~48px | **32px** (Stack_Sans_Notch:Regular, leading-40) |
| Description size | 16px | 16px, Stack_Sans_Headline:Light |
| Content padding | — | p-12 inner |
| Gap (tags → info) | — | 16px |
| Gap (name → desc) | — | 12px |

---

## Footer

**Desktop:** Wide multi-column layout, 1920×824.  
**Mobile:** Stacked 1-column layout, 403px wide. Annotation: "Changed the layout to 1/2/1 format."

### Footer Top — CTA Headline
| Property | Desktop | Mobile |
|---|---|---|
| Font | Stack_Sans_Notch:Regular | Stack_Sans_Notch:Regular |
| Size | ~56–64px | **40px** |
| Line-height | — | 48px |
| Letter-spacing | — | -0.8px |
| Layout | left-aligned | left-aligned |

Text: "Let's build" + "something real." — "something real" in `#5c5c5c`, "." in `#e8342a`.

### Designer Description
- Text: 16px, Stack_Sans_Headline:Light, `#5c5c5c`
- Button (SM): 149×42px, px-16 py-12, dark style
- Annotation: "Redirect to the Contact page"

### Links Columns (Pages + Connect)
- **Mobile:** Side by side, `flex gap-40`, each column `flex: 1`
- Heading: 12px, Stack_Sans_Notch:Medium, uppercase, `#a3a3a3`
- Links: 16px, Stack_Sans_Headline:Light, `#171717`, line-height 24px, gap-4 between items

### Reach Out Section
- Width: 240px (full-width on mobile)
- Email: 16px, Stack_Sans_Headline:Light, `#171717`
- Visitor counter number: 24px, Stack_Sans_Headline:Bold, `#e8342a`, letter-spacing 2.88px

### Footer Bottom (Red band)
| Property | Desktop | Mobile |
|---|---|---|
| Background | `#e8342a` | `#e8342a` |
| Padding | — | py-64 |
| Copyright layout | single line, left-aligned | **two lines, center-aligned** |
| Copyright font | Stack_Sans_Notch:Regular | Stack_Sans_Notch:Regular |
| Copyright size | — | **16px**, line-height 24px |
| Copyright color | white | white |
| Annotation | — | "Changed to two line and center aligned." |

Copyright line 1: "© 2026 DESIGNED WITH ♥"  
Copyright line 2: "BY ENRIC S NEELAMKAVIL"

---

## PersonalAgent (AI Widget)

| Desktop | Mobile |
|---|---|
| Visible — rendered as a wide bar (~840×56px), absolute in layout | **Hidden on mobile** — not present in mobile frame |

Hide `PersonalAgent` at mobile breakpoint via `display: none` in a media query.

---

## Button SM Variant Summary

The mobile design uses a consistently smaller button across all sections:

| Property | Desktop (standard) | Mobile (SM) |
|---|---|---|
| Height | 52px | **42px** |
| Padding | px-24 py-16 | **px-16 py-12** |
| Font size | 14px | 14px |
| Font | Stack_Sans_Headline:Regular | same |
| Line-height | 18px | 18px |
| Border-radius | 12px | 12px |
| Arrow icon size | 16px | 16px |
| Arrow icon border-radius | 9px | 9px |

Both dark (`bg #171717`, text white) and light (`bg white`, border #e0e0e0, text #5c5c5c) variants appear.

---

## Typography Delta Summary

| Element | Desktop | Mobile |
|---|---|---|
| Hero title | ~64px | **32px** |
| Hero subtitle | ~16px | **12px** |
| Interests ticker items | ~40–50px | **24px** |
| Section headings (About, Feature, Awards, Works) | ~32–40px | **24px** |
| Work card product name | ~48px | **32px** |
| Stat numbers | ~48px | **32px** |
| Eyebrow / label text | 12px | 12px (unchanged) |
| Body / description text | 16px | 16px (unchanged) |
| Footer headline | ~56–64px | **40px** |
| Navbar links | — | 12px, uppercase |
| Button text | 14px | 14px (unchanged) |
| Copyright text | — | **16px** |
