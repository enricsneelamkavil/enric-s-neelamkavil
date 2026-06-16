# About Page — Design Spec

Figma file: `cGxPfzhfg2zi9MivaiE7dX`
Source frame: **About - Professional** — node `230:425`
Canvas position: x=0, y=5597 | Size: **1920 × 4007px**

> **Mode note:** The design has a Professional / Personal toggle. Only the **Professional** mode is fully designed. Personal mode exists as a toggle state but has no content designed yet — build Professional only for now; toggle is rendered as a static UI element with no functional switching.

> **Mobile:** No mobile About frame exists in the Figma canvas yet. Build desktop-first; mobile responsive rules to follow the same patterns as the Home page.

---

## Section Inventory

| # | Section Name (Figma layer) | Node ID | y-offset (in frame) | Width | Height | Type |
|---|---|---|---|---|---|---|
| — | **Navigation Bar** | `230:613` | 16 | 473 | 68 | Static |
| 1 | **Intro Section** | `230:428` | 140 | 1168 | 256 | Static |
| 2 | **Profile Image** | `230:446` | 476 | ~710 | ~470 | Static |
| 3 | **About Description** | `230:461` | 1026 | 1168 | 256 | Static |
| 4 | **My Tools** | `230:486` | 1359 | 992 | 96 | Static |
| 5 | **My Journey** | `230:499` | 1503 | 1168 | 793 | Static |
| 6 | **Companies** | `230:548` | 2330 | 1168 | 424 | Static |
| 7 | **Award Shelf** | `230:582` | 2831 | 1168 | 276 | Static |
| 8 | **Footer** (shared component) | `230:612` | 3183 | 1920 | 824 | Static |

---

## Section Details

### Navigation Bar — `230:613`
- Absolute positioned at top of frame, sticky on scroll (`data-development-annotations: "Navigation bar sticky at the top."`)
- Reuses the existing `Navbar` component
- Active state: **About** tab has dark (inverse) background; all other tabs are plain text
- Same glass pill as Home — the `Navbar` component already handles active state via route

---

### 1. Intro Section — `230:428`

**Structure:**
```
Welcome Tag (pill)          → "ABOUT · 🍎 · ENRIC S NEELAMKAVIL"
Common Header               → Title + Subtitle
  Title: "About Me."        → "About Me" text-primary, "." text-secondary
                               Stack Sans Notch Medium, 64px, tracking -1.28px
  Subtitle: "Two sides of one designer"
                             → Stack Sans Headline Regular, 16px, text-secondary
Mode switch                 → PROFESSIONAL ←toggle→ PERSONAL
```

**Welcome Tag** (`230:430`):
- Same pill as Home landing — `border: 1px solid border-tertiary`, `border-radius: 12px`, `padding: 12px 16px`, `gap: 8px`
- Children: "ABOUT" text + apple icon (12px) + "ENRIC S NEELAMKAVIL" text
- Font: Stack Sans Headline Regular, 12px, text-secondary

**Mode Switch** (`230:438`, toggle instance `230:780`):
- Horizontal row, centered, `gap: 24px`
- Left label "PROFESSIONAL": Stack Sans Notch Bold, 32px, **text-highlight (#e8342a)** — active state
- Toggle pill (`230:780`): `surface-tertiary` bg, `border-radius: 999px`, `padding: 6px`, `gap: 4px`
  - Left button (`I230:780;230:743` — "Selected"): white bg, `border: 1px solid border-tertiary`, 40×40px circle, arrow-left icon (mirrored: `-scale-x-100`), 24px
  - Right button (`I230:780;230:745` — "Not selected"): greyed-out circle, 40×40px
- Right label "PERSONAL": Stack Sans Notch Bold, 32px, **text-primary** (#171717) — inactive state
- **Annotation:** `"Toggle to switch modes between 'Professional' and 'Personal'"` — render as static UI only; personal mode not yet designed

---

### 2. Profile Image — `230:446`

_(Layer renamed from "Profile Section" → "Profile Image" in latest Figma revision)_

**Structure:**
- Centered profile photo with circular mask crop
- Name/location strip image overlaid at bottom of photo
- Three floating decorative icons positioned around the photo absolutely:

| Icon | Node | Position (relative to section) | Size |
|---|---|---|---|
| Icon 2 | `230:452` | left: 0, top: 219px | 72×72px |
| Icon 1 | `230:455` | left: 609px, top: 18px | 72×72px |
| Icon 3 | `230:458` | left: 637px, top: 360px | 72×72px |

_(Third icon renamed from "Avatar Container" → "Icon 3")_

**Profile photo:**
- Main circular crop (`230:450`, `230:448`): `IMG_5295 2` — 430.98 × 430.98px, mask applied, `object-bottom`
- Bottom name strip (`230:451`): `IMG_5295 3` — 216 × 48px, `object-bottom`, positioned at top-left offset 114px within photo group

---

### 3. About Description — `230:461`

**Structure:**
```
Title container
  SectionLabel → "A SUMMARY"       (text-tertiary, uppercase, 16px)
  SectionHeader → "Know me as I am."

About Section  (flex row, gap: 40px)
  Left  (flex-1):  Bio text
  Right (453px):   Highlights table — 3 rows
```

**Section header** (`230:464`) mixed weights, 32px:
- "Know " → Stack Sans Notch Regular, text-primary
- "me " → text-secondary (#5c5c5c)
- "as I am" → text-primary
- "." → text-primary

**Bio text** (`230:466`) — Stack Sans Headline Light, 24px, `line-height: 32px`:
- First span: text-highlight (#e8342a) → *"I design products that get out of the way."*
- Second span: text-primary → *" 4+ years across fintech, SaaS and consumer apps — from the brief to the build. I care about clarity, calmness and the boring details no one notices when they're done right. "*

**Highlights table** (`230:467`) — 453px wide, each row `border-top: 1px solid border-tertiary`, last row also `border-bottom`:

| Row | Node | Label (120px max, 12px, uppercase, text-secondary) | Value |
|---|---|---|---|
| 1 | `230:468` | "BASED" | "Trivandrum, IN" ◆ **[live IST clock]** |
| 2 | `230:475` | "CURRENTLY" | "Product Designer" ◆ "UST" |
| 3 | `230:482` | "DOMAIN" | "User Experience Design" |

- Row padding: `py: 13px` (rows 1–2), `py: 14px` (row 3)
- Label font: Stack Sans Headline Regular, 12px, uppercase, text-secondary
- Value font (before bullet): Stack Sans Notch Light, 16px, text-primary
- Value font (after bullet): Stack Sans Notch Regular, 16px, text-primary
- Diamond bullet: 6×6px square rotated 45°, icon-highlight (#e8342a), `border-radius: 2px`

**Live clock annotation** on `230:474`: `"Live time at 'Kerala, India'"` → render as a live clock displaying the current time in IST (UTC+5:30), updating every minute.

---

### 4. My Tools — `230:486`

**Container:**
- `background: surface-tertiary`, `border: 1px solid border-tertiary`, `border-radius: 24px`, `padding: 16px 24px`, `gap: 16px`
- Width: 992px (not full 1168px — centered within page)

**Icons (12 total, each 64×64px, left to right):**

| # | Tool | Node | Style |
|---|---|---|---|
| 1 | Figma | `230:487` | `border-radius: 16px`, shadow `0px 0px 12px rgba(0,0,0,0.25)`, image slightly overflows (+24%) |
| 2 | Photoshop | `230:488` | flat SVG, no radius |
| 3 | Sketch | `230:489` | `border-radius: 16px`, shadow `rgba(0,0,0,0.15)`, image slightly overflows (+24%) |
| 4 | Illustrator | `230:490` | flat SVG, no radius |
| 5 | Lovable | `230:491` | `border-radius: 16px`, shadow `rgba(0,0,0,0.15)`, `object-cover` |
| 6 | XD | `230:492` | flat SVG, no radius |
| 7 | Gemini | `230:493` | `border-radius: 16px`, shadow `rgba(0,0,0,0.15)`, `object-cover` |
| 8 | ChatGPT | `230:494` | `border-radius: 16px`, shadow `rgba(0,0,0,0.15)`, `object-cover` |
| 9 | Claude | `230:495` | `border-radius: 16px`, shadow `rgba(0,0,0,0.25)`, `object-cover` |
| 10 | CorelDraw | `230:496` | `border-radius: 16px`, shadow `rgba(0,0,0,0.25)`, image slightly overflows (+24%) |
| 11 | After Effects | `230:497` | flat SVG, no radius |
| 12 | Premiere Pro | `230:498` | flat SVG, no radius |

**Interaction annotation** on `230:486`: `"Hovering on each icon will trigger a 'MacOS toolbar' similar interaction (the hovered icon will be risen up and the just left and just right neighbours are also rose by half the rose height.)"` → MacOS dock magnification: hovered icon translates up (and scales), direct neighbours translate up half as much.

---

### 5. My Journey — `230:499`

_(Frame renamed from "Section - Companies / Worked with" → "My Journey")_

**Dimensions:** 1168 × 793px (grew from 721px — description rows are taller with real content)

**Section label** (`230:501`): "THE JOURNEY · 2018 → 2026" — Stack Sans Headline Regular, 16px, uppercase, text-tertiary
**Section header** (`230:502`) mixed weights, 32px:
- "How I got " → text-primary
- "here" → text-secondary (#5c5c5c)
- "." → text-primary

**Timeline structure** — 3 entries. Each entry = an Entry row + a Description row.

**Entry row anatomy:**
- Circle bullet (24px ellipse + 12px inner fill ellipse — `Bullet selection` node)
- Company logo icon (26–28px wide SVG) — **clickable link, opens in new tab**
- Role title — Stack Sans Notch Medium, 24px, text-primary
- Date tag pill — surface-tertiary bg, 1px border-tertiary, border-radius 12px, padding 8px 16px, Stack Sans Headline Regular, 12px, text-secondary

**Description row anatomy:**
- Connector (24px wide SVG vertical line) — aligns under the bullet
- 4 text columns, each ~240–243px wide, `gap: 40px`, `padding: 24px 0`
- Font: Stack Sans Headline Light, 16px, line-height 24px, text-tertiary (#a3a3a3)

---

#### Entry 1 — UST

| Field | Value |
|---|---|
| Logo node | `230:506` — `ust-logo-icon` |
| Logo link | `https://ust.com` (open in new tab) |
| Role | Associate Product Designer |
| Dates | August 2024 – Present |
| Tag node | `230:508` |

**Description columns** (nodes `230:514` container, left→right by x-position):

| Column | Node | Text |
|---|---|---|
| 1 | `230:515` | "Building the world's most human centred travel app, personalised recommendations, and stress-free travel all in one place." |
| 2 | `230:516` | "Developed wireframes and interactive prototypes, accelerating timelines to enhance design approval rates." |
| 3 | `230:517` | "Handling end-to-end flows for expense management module solving complex problems with business thinking." |
| 4 | `230:518` | "Handling complex B2B use cases for admin dashboard designs, connecting end-to-end modules seamlessly." |

---

#### Entry 2 — Fundesigns

| Field | Value |
|---|---|
| Logo node | `230:522` — `fundesigns-logo-icon` |
| Logo link | `https://fundesign.in` (open in new tab) |
| Role | Lead UI Designer |
| Dates | May 2024 – July 2024 |
| Tag node | `230:524` |

**Description columns** (nodes `230:529` container, order by x-position — note node IDs are out of sequence in Figma):

| Column | Node | x | Text |
|---|---|---|---|
| 1 | `230:531` | 0 | "Crafting user-centric products and the best experiences delivering the promise for clients all over the world." |
| 2 | `230:530` | 280 | "Led a design team to complete 15+ major projects, improving experiences for multiple clients for the company." |
| 3 | `230:532` | 560 | "Shipped projects with tight deadlines, with zero compromise on design quality or user experience." |
| 4 | `230:533` | 843 | "Worked across multiple domains solving problems across various industries and agencies ensuring user experience." |

---

#### Entry 3 — CCE (Education)

| Field | Value |
|---|---|
| Logo node | `230:537` — `cce-logo-icon` |
| Logo link | `https://cce.edu.in` (open in new page) |
| Role | Bachelors in Technology (Computer Science) |
| Dates | September 2020 – June 2024 |
| Tag node | `230:539` |

**Description columns** (nodes `230:543` container, order by x-position — note node IDs are out of sequence in Figma):

| Column | Node | x | Text | Bold spans |
|---|---|---|---|---|
| 1 | `230:544` | 0 | "Head of student community (CODe) of department of Computer Science, Christ College of Engineering" | — |
| 2 | `230:546` | 280 | "Formulated the first ever Design week in colleges across Kerala **CODe Design Week '23**, hosted the sequel event in 2024." | "CODe Design Week '23" → Stack Sans Headline Medium |
| 3 | `230:545` | 563 | "Hosted the flagship event , **BEACH HACK 5** which is South India's one and only beach hackathon." | "BEACH HACK 5" → Stack Sans Headline Medium |
| 4 | `230:547` | 843 | "Joined in the Design team for reimagining the official website of Christ College of Engineering, associating with **tegain**." | "tegain" → Stack Sans Headline Medium |

> Note: The CCE description columns have **inline bold spans** — render with `<strong>` or a bold styled span inside the text-tertiary paragraph.

---

### 6. Companies — `230:548`

_(Frame renamed from "Section - Companies / Worked with" → "Companies")_

**Section label** (`230:550`): "WORKED WITH THEM" — uppercase, 16px, text-tertiary
**Section header** (`230:551`) mixed weights, 32px:
- "Teams that " → text-primary
- "trusted " → text-secondary (#5c5c5c)
- "my work." → text-primary

**Companies grid** (`230:552`) — 4 columns × 3 rows = 12 logos, rendered as a single flattened image in Figma:
- Grid size: 1168 × 320px
- Horizontal separators at y=105 and y=215
- Vertical separators at x=314, x=610.5, x=907.5

| Col | Row 1 | Row 2 | Row 3 |
|---|---|---|---|
| Col 1 | RE/MAX | UST | OpenGrad |
| Col 2 | Deep5 | Vurse | FunDesigns |
| Col 3 | ReputeUp | Karghewale | Iris Holidays |
| Col 4 | Urban Trash | Apro IT | mulearn |

All 10 logos that overlap with the Home marquee are local SVGs in `public/company logos/`. Verify `reputeup-logo` and `karghewale-logo` exist there before building — they may need to be added.

---

### 7. Award Shelf — `230:582`

**Section label** (`230:584`): "RECOGNITION" — uppercase, 16px, text-tertiary
**Section header** (`230:585`) mixed weights, 32px:
- "A " → text-primary
- "shelf " → text-secondary (#5c5c5c)
- "of awards" → text-primary
- "." → text-primary

**Awards row** (`230:586`) — 5 cards, `justify-between`, each card 212px wide:

| # | Node | Seal image (node) | Title | Detail |
|---|---|---|---|---|
| 1 | `230:587` | `230:588` awwwards-seal | Awwwards Young Jury | Jury Member (2026, 2025) |
| 2 | `230:592` | `230:593` ust-seal | USTAR | Best Performer (2025) |
| 3 | `230:597` | `230:598` awwwards-seal | Awwwards Honors | enric.design (2025) |
| 4 | `230:602` | `230:603` figma-seal | Config APAC Attendee | Marina Bay Sands, Singapore (2024) |
| 5 | `230:607` | `230:608` ksum-seal | Huddle Designers Award | Kelp Kookies (2023) |

Each card:
- Seal: 120×120px, `object-cover`, circular
- Title: Stack Sans Notch Medium, 16px, text-primary, centered
- Detail: Stack Sans Headline Light, 12px, text-secondary, centered
- Card inner gap: 8px

This section is **structurally identical** to `AwardShelf.tsx` on the Home page (which already handles 5 cards and the same styling). Consider moving `AwardShelf.tsx` to `components/shared/` and reusing it directly.

---

### 8. Footer — `230:612`

- Instance of the shared `Footer` component — identical to Home page
- Reuse `components/common/Footer.tsx` as-is, no changes

---

## Toggle Component Detail — `230:780`

```
[PROFESSIONAL]  [ ◀ | ○ ]  [PERSONAL]
```

| Part | Node | Spec |
|---|---|---|
| "PROFESSIONAL" label | `230:439` | Stack Sans Notch Bold, 32px, text-highlight (#e8342a) |
| Toggle pill | `230:780` | surface-tertiary, border-radius 999px, padding 6px, gap 4px |
| Selected button | `I230:780;230:743` | white bg, border 1px border-tertiary, 40×40px circle, left-arrow icon (mirrored) |
| Unselected button | `I230:780;230:745` | greyed-out circle, 40×40px |
| "PERSONAL" label | `230:445` | Stack Sans Notch Bold, 32px, text-primary (#171717) |

**Build as static UI only.** Personal mode content is not yet designed in Figma — no functional toggle logic needed now.

---

## Annotations Summary

| Location | Node | Type | Note |
|---|---|---|---|
| Toggle | `230:780` | Interaction | "Toggle to switch modes between 'Professional' and 'Personal'" |
| My Tools bar | `230:486` | Interaction | MacOS dock magnification hover — hovered icon rises, neighbours rise at half height |
| UTC time | `230:474` | Development | "Live time at 'Kerala, India'" → live IST clock (UTC+5:30), updates every minute |
| Navigation Bar | `230:613` | Development | Sticky at top on scroll |
| UST logo | `230:506` | Development | "Open https://ust.com in new tab" |
| Fundesigns logo | `230:522` | Development | "Open https://fundesign.in in new tab" |
| CCE logo | `230:537` | Development | "Open https://cce.edu.in in new page" |

---

## Component Plan (files to create)

```
components/about/
  ├── AboutHero.tsx          # Section 1 — Welcome tag + title + mode switch
  ├── ProfileImage.tsx       # Section 2 — Profile photo + 3 floating icons
  ├── AboutDescription.tsx   # Section 3 — "Know me as I am" bio + highlights table + live clock
  ├── MyTools.tsx            # Section 4 — Tools icon row with dock hover animation
  ├── Journey.tsx            # Section 5 — Timeline: 3 entries with real descriptions
  └── Companies.tsx          # Section 6 — 4×3 logo grid
  # Section 7 AwardShelf — reuse from components/home/ or move to components/shared/
app/
  └── about/page.tsx         # Composes all sections
```

---

## Content Flags

1. **Profile photo** — `IMG_5295` series. Needs a local asset saved to `public/`.
2. **Floating icons** (Icon 1, Icon 2, Icon 3 around the profile photo) — Figma image assets, need to be downloaded and stored locally.
3. **Company logos** — verify `reputeup-logo.svg` and `karghewale-logo.svg` exist in `public/company logos/` before building the Companies grid.
4. **CCE description bold spans** — inline `Stack Sans Headline Medium` weight within text-tertiary paragraphs (event names: "CODe Design Week '23", "BEACH HACK 5", "tegain").
5. **Journey logo links** — all 3 logos (UST, Fundesigns, CCE) must be wrapped in `<a target="_blank">` per Figma annotations.
