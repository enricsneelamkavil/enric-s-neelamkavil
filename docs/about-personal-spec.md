# About Page — Personal Mode — Full Spec

> Last updated: 2026-06-20. All values sourced directly from Figma frames 328:908 (desktop) and 328:1384 (mobile).

---

## 1. Figma Frame Locations

| Frame | Node ID | Canvas position | Dimensions |
|---|---|---|---|
| Desktop — Personal | `328:908` | x=80, y=4565 | 1920×5298 |
| Mobile — Personal | `328:1384` | x=2500, y=4565 | 402×5725 |

Both are inside the `About` section (`284:722`) on the **UI Design** page (`136:3016`). The mobile frame is labeled "Mobile - Professional" in Figma but contains personal mode content.

---

## 2. Page Composition

### Desktop personal (`mode === 'personal'`)
```
Navbar (unchanged)
PageSections  [62px gap between sections, pt: 140px desktop]
  └── LandingGroup  [80px gap]
        ├── IntroSection          ← same structure, PERSONAL toggle active
        ├── PersonalImageBanner   ← different photo + food/phone bottom extrude
        └── PersonalAboutDescription  ← new bio + To Do List (replaces AboutDescription)
  TravelSection                   ← NEW
  WorkDeskSection                 ← NEW
  PodcastMediumSection            ← NEW (two-column: Podcast + Writing)
  CreditCardsSection              ← NEW
Footer (unchanged)
```

### Professional-only sections — hidden when `mode === 'personal'`
`MyTools`, `Journey`, `ProfessionalTimeline`, `ProfessionalTimelineMobile`, `AwardShelf`

---

## 3. IntroSection — Personal State

**Node:** `328:911` (1168×833px desktop)

Structurally identical to professional. Only difference: toggle is in the right (PERSONAL) position, and "PERSONAL" label renders in `colors.text.highlight` (#e8342a).

### Typography
| Element | Font | Size | Line-height | Weight | Color |
|---|---|---|---|---|---|
| "About Me." | Notch | 64px | 72px | Medium | text.primary; period in text.secondary |
| Letter-spacing | — | — | — | — | -1.28px (= -2px token) |
| Subtitle | Headline | 16px | 24px | Regular | text.secondary |
| "PROFESSIONAL" label | Notch | 32px | 40px | Bold | text.primary |
| "PERSONAL" label | Notch | 32px | 40px | Bold | text.highlight (#e8342a) |

### Toggle pill (328:918)
- Background: `surface.tertiary` (#f7f7f7)
- Padding: 6px all sides
- Border-radius: 9999px
- Inner gap: 4px
- Left slot ("Not selected"): 40×40px SVG ring
- Right slot ("Selected" = active): white bg, `border border-tertiary`, 12px padding, border-radius 9999px → 40×40px; arrow icon 24×24px inside (points right toward PERSONAL)

### Mobile IntroSection
- Title: 64px/72px same
- Mode switch row: "PROFESSIONAL" text | toggle (58×32px) | "PERSONAL" text — all 16px/24px Notch Bold
- Toggle pill proportionally smaller: 58×32px, knob ~24×24px

---

## 4. PersonalImageBanner

**Node:** `328:920` (1167.51×621px desktop)

Replaces the professional `ProfileImage.tsx`. The circle photo area is the same but the photo asset changes and a **Bottom extrude** layer is added below the circle, making the total height taller.

### Figma layer tree
```
Image banner (328:920)  1167.51×621px
  Image (328:921)       flex col, centered, pr 44px
    Profile Image (328:922)  grid (stacking layers)
      Mask group (328:923)   ml 23.75, mt 36.92
        Photo                 431×592px behind 430.98×430.98 circle mask
      Top extrude (328:926)  170×37px at ml 156.5, mt 0  — hair above circle
      Bottom extrude (328:927)  starts at mt 362.9px
        Phone (328:928)        mt 73px within extrude
          Phone strip           188×50px image
          Mask group            84.5×10.5px (phone screen reflection)
        Food (328:933)         ml 61px
          Food top image        321×123px at ml 141 — plate/burger
          Food bg image         351×159px at mt 91 — background food photo
  [6 floating icons — absolute within 1167.51×621px]
```

### Photo assets (personal mode)
| Layer | Description |
|---|---|
| `328:925` "IMG_5295 2" | Circle mask shape (SVG) |
| Photo inside mask | Person with sunglasses at café, holding drink — casual photo |
| `328:926` "top extrude" | Hair peeking above circle top |
| `328:929` "Phone strip" | Bottom edge of phone showing below circle |
| `328:934` "Food top" | Plate with burger/food |
| `328:935` "Food bg" | Food background/table surface |

### Floating icons — Personal (different icons from professional)
All 6 icons are red/pink outlined lifestyle SVGs (heart, 3D cube, award medal, target/goal, cursor with sparkle, burger).

| Icon | Left (px) | Top (px) | Rotation | Size |
|---|---|---|---|---|
| Icon 1 (top-left) | ~25.8 (2.21% of 1167.51) | ~55 (8.86% of 621) | +9.46° | ~84×76px |
| Icon 2 (lower-left) | ~93.7 (8.03%) | ~434.7 (70.05%) | −17.23° | ~93.5×101px |
| Icon 3 (left-center) | 263.8 | 235.04 | +3.21° | 72×72px (outer 75.92×75.92) |
| Icon 4 (right-center) | 869.75 | 403 | 0° | 72×72px |
| Icon 5 (upper-right) | 971.75 | 142 | 0° | 72×72px |
| Icon 6 (far-right) | 1074.75 | 285 | +14.1° | ~65.9×72px (outer 81.4×85.9) |

Icon sources: `/about/icons/icon-1.svg` through `icon-6.svg` (same filenames as professional; personal mode uses different artwork for the same 6 slots).

### Mobile PersonalImageBanner
From metadata (328:1712 within 328:1386):
- Banner frame: 341×368px
- Circle mask: 258.75×258.75px at x=299.74, y=22.16
- Top extrude: ~102×22px
- Bottom extrude: starts at y=217.88
  - Phone: 112.87×30px
  - Food: 277.38×150px
- No floating icons on mobile (same as professional mobile)

---

## 5. PersonalAboutDescription

**Node:** `328:963` (desktop) / `328:1399` (mobile)

### Desktop (1168×298px)
Layout: `flex row, gap 40px, align-items center`

#### Left — Description (881px wide)
| Element | Value |
|---|---|
| Label | "MEET THE REAL ME" |
| Label font | 16px/24px Headline Regular, text.tertiary |
| Header | "True to **my soul**." |
| Header font | 32px/40px Notch Regular; "True to " + "." in text.primary; "my soul" in text.secondary (#5c5c5c) |
| Gap label→header | 0 (TitleContainer pattern) |
| Bio paragraph 1 | "Off the clock I **travel** a lot, host **Chumma Oru Podcast**, write on Medium, and fall down rabbit holes about product design, user psychology and **credit-card points**. Here's the realest me!" |
| Bio paragraph 2 | "There's the version that runs design reviews, ships at standup, and lives inside Figma. And then this is the one that wakes up to make coffee with film loaded." |
| Bio font | 24px/32px Headline Light, text.primary; highlights (**bold** words above) in text.highlight (#e8342a) |

#### Right — To Do List widget (247px wide)
```
[Red header bar]  bg surface.highlight, px 24, pt 12, pb 16, mb -10px (overlaps body)
  Current IST day  12px/16px Headline SemiBold, white, letter-spacing 1.2px
[White body]  bg surface.primary, p 24, border-radius 12, gap 16px
  "To do List"     24px/32px Notch Regular, text.secondary
  [Task group]     flex col, gap 12px
    ☐ Plan Sri Lanka
    ☐ Start drafting first book
    ☑ ~~Redesign Portfolio~~    ← only checked on hover
    ☐ Next medium article
    ☐ Shoot podcast episode
```

**Checkbox anatomy:**
- Unchecked: 16×16px, border-radius 4px, border border-tertiary
- Checked: 16×16px, border-radius 4px, bg surface.inverse (#171717), white checkmark SVG (8.5×6.2px)

**Task text:** 16px/24px Headline Light, text.tertiary. Strikethrough on checked item.

**Widget container:** `border border-tertiary, border-radius 12px, overflow: hidden`

**Interactions (from Figma annotation):**
- Hover widget → tilt 5° clockwise (`transform: rotate(5deg)`)
- "Redesign Portfolio" task → only shows as checked + strikethrough ON hover; default state = unchecked, no strikethrough
- All tasks are read-only (not clickable)
- Day heading → shows current IST day name (e.g. "SATURDAY") — same pattern as IST clock in professional

### Mobile (354×614px)
Layout: `flex col, gap 40px`

**About Description block (354×276px):** `flex col, gap 12px`
- Label: **12px/16px** Headline Regular, tertiary
- Header: **24px/32px** Notch Regular
- Bio: **16px/24px** Headline Light (same highlight words)

**To Do List (354×298px, full width):**
- Identical structure and content to desktop
- Day heading: same 12px/16px SemiBold, same overlap pattern (mb -10px)
- Widget is full-width below the bio (not side-by-side)

---

## 6. TravelSection

**Node:** `328:991` (desktop) / `328:1817` (mobile)

### Desktop (1168×993px) — `flex col, gap 40px`

#### Title
| | Value |
|---|---|
| Label | "TRAVEL · SLOWLY, MOSTLY" |
| Header | "Places I've **been to**." — "been to" in text.secondary |
| Fonts | 16px/24px label, 32px/40px header (standard TitleContainer pattern) |

#### Map canvas (328:996 — 1168×522px)
- `bg surface.tertiary (#f7f7f7), border border-tertiary, border-radius 24px, overflow: hidden`
- World map SVG absolutely positioned (very large: 2536×2474px), offset to center on Asia/Middle East: starts at absolute left -684px, top -1237px relative to map container
- **Interaction:** Draggable canvas, slight zoom — "a small canvas where the map can be dragged around, zoomed in a little bit and interact"

**Country tags (6 absolute positions within 1168×522 canvas):**
Each tag = pill with 6px padding, `border-radius 12px, surface.tertiary bg, border border-tertiary` + 12px dot "Selection" marker
| Country | Left | Top | Tag side |
|---|---|---|---|
| INDIA | 491 | 341 | Tag right of pin |
| OMAN | 344 | 228 | Tag right of pin |
| SINGAPORE | 775 | 464 | Tag right of pin |
| MALAYSIA | 848 | 422 | Tag left of pin |
| VIETNAM | 877 | 241 | Tag left of pin |
| QATAR | 255 | 176 | Tag right of pin |

Tag text: 12px/16px Headline Regular, text.secondary

**Country flags strip (absolute left 923, top 15):**
- 5 flags, 36×24px each, gap 12px
- Order: 🇶🇦 Qatar, 🇸🇬 Singapore, 🇲🇾 Malaysia, 🇻🇳 Vietnam, 🇴🇲 Oman
- **Interaction (desktop):** Hover → raise flag + show country name in rounded macOS-style tooltip above

**Travel stats (absolute left 15, top 369 — within map):**
- Container: `bg surface.tertiary, border border-tertiary, border-radius 16px, padding 16px, gap 24px` between stat blocks
- 3 stat blocks, flex row:

| Stat | Number | Label line 1 | Label line 2 |
|---|---|---|---|
| Countries | **06** | COUNTRIES | DISCOVERED |
| Flights | **55** | FLIGHTS BOARDED | — |
| World | **2%** | WORLD COVERED | — |

- Number: 48px/56px Notch Regular, text.highlight (#e8342a) — count-up animation from 0
- Label: 16px/24px Headline Regular, uppercase, text.tertiary
- Separators between blocks: 64px tall vertical line (border-tertiary)

#### "Travel with me" row (328:1054 — 1168×48px)
- Layout: `flex row, justify-between, align-items center`
- Left text (564px wide): "Self planned, Rush itineraries, lots of walking, and best value for money. Send me an email if you'd like to hear when I plan the next." — 16px/24px Headline Light, text.primary
- Right button: `bg surface.primary, border border-tertiary, border-radius 12px, px 24px, py 12px, gap 8px`
  - "Travel with me" text: 16px/24px Headline Regular, text.secondary
  - Arrow icon: 18×18px, bg icon.secondary (#5c5c5c), border-radius 9px; arrow SVG 10×10px inside
  - **Action:** `mailto:enricsneelamkavil@gmail.com`

#### Travel Albums (328:1057 — 1168×239px, flex row, gap 24px)
5 photo cards, each **~214.4×239.348px**:

| Country | Year | Photo |
|---|---|---|
| Qatar | 2018 | Person in blue shirt at outdoor location |
| Singapore | 2024 | Person at Gardens by the Bay |
| Malaysia | 2024 | Person at Petronas Towers |
| Vietnam | 2025 | Person with Vietnamese hat, field |
| Oman | 2025 | Person in sea/water, back view |

**Card anatomy (CSS mask technique):**
- Mask shape SVG (`imgQatar1`) applied via `mask-image` for rounded rectangle with specific curve
- Photo image: `object-position: bottom`, no explicit border-radius (mask handles it)
- Gradient overlay: `background: linear-gradient(to top, rgba(0,0,0,0.5) 0%, transparent 30%)`
- Year tag: top-right corner, offset right ~162px from left edge, top 12px from top — `bg surface.tertiary, border border-tertiary, border-radius 12px, p 6px` — 12px/16px Headline Regular, text.secondary
- Destination name: bottom-center — `24px/32px Notch Medium, white, text-shadow: 0 0 24px rgba(0,0,0,0.5)`
- **Qatar card** has a slight blur effect (FOREGROUND_BLUR radius 5 = CSS `filter: blur(2.5px)`)

---

### Mobile TravelSection (354×717px) — `flex col, gap 40px`

#### Key differences from desktop

**Title:** 12px/16px label, 24px/32px header

**Country flags row (354×24px, REPLACES map on mobile):**
- Flags displayed as a horizontal row, `justify-between` across full width
- No draggable map — the map is omitted on mobile
- Same 5 flags, 36×24px
- **Interaction (mobile):** "Click" (tap) to raise flag + tooltip (not hover)

**Travel stats (354×116px):**
- Same flex-row layout with separators
- **Numbers: 32px/40px Notch Regular** (vs desktop 48px/56px)
- **Labels: 12px/16px Headline Regular** (vs desktop 16px/24px)
- Stat blocks: `flex-1` (equal width, no fixed 100px)

**"Travel with me" (354×130px):**
- Layout: `flex col, gap 16px` (STACKED — text above, button below)
- Button: `px 16px, py 12px`, text 14px/18px Headline Regular, icon 16×16px (border-radius 9px)

**Travel Albums:**
- Same 1168px wide total — horizontal scroll from 354px container
- `overflow-x: auto, scroll-snap-type: x mandatory`
- Cards: same 214.4×239.348px

---

## 7. WorkDeskSection

**Node:** `328:1088` (desktop) / `328:1944` (mobile)

### Desktop (1168×578px) — `flex col, gap 40px`

**Title:**
- Label: "THE DESK" — 16px/24px Headline Regular, tertiary
- Header: "Where the **work** happens." — "work" in text.secondary (#5c5c5c)

#### Image + Details (1168×474px, flex row, gap 40px)

**Desk image (540×474px):**
- `bg surface.highlight (#e8342a), border-radius 24px, overflow hidden`
- Desk photo (amber/warm tone): 80% opacity, absolute fill with slight crop (`h: 133.59%, left: -8.63%, top: -33.59%, w: 117.27%`)
- Apple Watch screen: outer 15.877×13.415px at left 64.04px, top 177.6px; inner 15.42×12.863px; rotate 2.08°; opacity 80%
- iPhone screen: 35.04×67.709px at left 58.02px, top 95.68px; opacity 80%

**Inventory (flex 1, full height, no padding):**
9 rows, each `py 13px` (rows 1–2) or `py 14px` (rows 3–9), `border-bottom border-tertiary`; row 1 also has `border-top`.

Each row: flex row, gap 8px, align-items center
- Item name: 16px/24px Headline Regular, **uppercase**, text.primary, `white-space: nowrap`, `shrink-0`
- Apple icon (Apple products only): 8.293×10.2px img, `shrink-0`
- Detail: 16px/24px Notch Light, text.tertiary, text-right, `flex: 1 0 0`

| Row | Item | Apple | Detail |
|---|---|---|---|
| 1 | MACBOOK PRO M3 | ✓ | 16" · 16/512 · Work Laptop |
| 2 | ROG FLOW X16 | — | 16" · 8/64 · Personal Laptop |
| 3 | IPHONE 16 PRO MAX | ✓ | 256 · Natural Titanium · Smartphone |
| 4 | WATCH SERIES 10 | ✓ | 46mm · Jet Black · Watch |
| 5 | AIRPODS PRO 3 | ✓ | ANC · Personal TWC · Earphones |
| 6 | ANKER MAGGO 10K | — | Qi 2 Certified · Powerbank |
| 7 | BOYA VY V20 | — | Set of 2 · Wireless Microphones |
| 8 | DIGITEK DTR 550 LW | — | 67" · Professional Tripod |
| 9 | JUAREZ JRZ21UK | — | 21" · Soprano · Ukulele |

---

### Mobile WorkDeskSection (354×902px) — `flex col, gap 40px`

**Title:** 12px/16px label, 24px/32px header

**Image + Details (flex col, gap 40px — stacked):**
- Desk image: **354×310px** (aspect-ratio 354/310), **border-radius 15.867px** (scaled), same `surface.highlight` bg
  - Same Watch and iPhone overlays, scaled proportionally (watch: ~10.5×8.9px, iPhone: ~23.2×44.8px)
- Inventory: 354px wide, same 9 rows, same item names/details
  - Item name: 16px/24px Headline Regular (same as desktop)
  - **Detail text: 12px/16px Notch Light** (SMALLER — vs desktop 16px/24px)
  - Apple icon: same 8.293×10.2px

---

## 8. PodcastMediumSection

**Node:** `328:1139` (desktop) / `328:2005` + `328:2025` (mobile, two separate sections)

### Desktop (1168×392px, flex row, gap 40px)

#### Podcast column (564px, flex col, gap 40px)

**Title:**
- Label: "SOMETIMES I SPEAK" — 16px/24px Headline Regular, tertiary
- Header: "**Chumma Oru** Podcast." — "Chumma Oru" in text.primary, " Podcast" in text.secondary; "." in text.primary

**Podcast Content (564×248px, flex col, gap 24px):**

_Podcast Row:_
- Podcast logo: 64×64px img (`absolute block inset-0`)
- Info column:
  - Episode count: 16px/24px Notch Light uppercase, text.secondary — "04 EPISODES" (fetch live from YouTube playlist)
  - "Watch **Latest** Episode →" link row (gap 12px):
    - Text: 24px/32px Notch Regular; "Watch " + "Episode" in text.primary; "Latest" in default (same primary)
    - Icon: 18×18px, bg icon.secondary, border-radius 9px, 10×10px arrow SVG inside
    - Link: `https://www.youtube.com/playlist?list=PLhx_ytf61w01eqEuGXrV88F3EaY-8YvKc`

_Description paragraph:_ 16px/24px Notch Light, text.secondary — "An informal podcast where I share thoughts as they come. Chumma Oru Podcast covers a mix of random topics, honest conversations, and plenty of casual chatter, all while keeping the fun alive."

_Podcast Platforms (gap 24px):_
- 3 platform icons, **64×64px each**, `border-radius 16px`, `box-shadow: 0 0 12px 0 rgba(0,0,0,0.15)`
- YouTube → `https://www.youtube.com/playlist?list=PLhx_ytf61w01eqEuGXrV88F3EaY-8YvKc`
- Spotify → `https://open.spotify.com/show/5AZaUyunCb3vo7EGzb67gf`
- Apple Podcasts → `https://podcasts.apple.com/in/podcast/chumma-oru-podcast/id1879025130`

#### Writing column (564px, flex col, gap 40px)

**Title:**
- Label: "SOMETIMES I WRITE"
- Header: "**Medium** Articles." — "Medium" in text.primary, " Articles" in text.secondary

**Writing Content (564×288px, flex col, gap 24px):**

_Description:_ 16px/24px Notch Light, text.secondary — "I write on Medium about my career experiences and personal reflections — thinking out loud to slow myself down."

_Writing Articles:_ 3 rows, `border-top + border-bottom` on first, `border-bottom` on subsequent, `py 12px`
- Each row: flex row, align-items center
  - Article Info: flex col, `flex: 1`
    - Title: 16px/24px Notch Regular, text.primary, **fixed height 24px** (single line truncated)
    - Read time: 16px/24px Notch Light, text.tertiary, `white-space: nowrap`
  - Arrow icon: 24×24px, overflow hidden, `flex-shrink: 0`, right side
  - **Fetch from:** `https://medium.com/@enricsneelamkavil`
  - Hardcoded fallback (3 articles):
    1. "I Failed the Challenge and Still Got an Apple Watch for Free" — 5 min read
    2. "The Portfolio I Never Submitted Got Me to awwwards." — 3 min read
    3. "From Nothing to a DESIGNER today!" — 4 min read

---

### Mobile (two separate sections, full-width, sequential)

#### Mobile Podcast (328:2005 — 354×360px, flex col, gap 40px)
**Title:** 12px/16px label, 24px/32px header

**Key differences from desktop:**
- Episode count: **12px/16px** Notch Light (vs desktop 16px)
- "Watch Latest Episode →" link: **16px/24px** Notch Regular (vs desktop 24px/32px), icon **16×16px** (vs desktop 18×18px)
- Platform icons: **40×40px**, **border-radius 12px**, **gap 16px** (vs desktop 64×64px, 16px, gap 24px)

#### Mobile Writing (328:2025 — 354×424px, flex col, gap 40px)
**Title:** 12px/16px label, 24px/32px header — note: header reads "Medium **articles**." (lowercase "a" on mobile)

**Key differences from desktop:**
- Article row: gap **16px** between info and arrow (vs desktop no explicit gap, space-between implied)
- Title text wraps to **multiple lines** (no fixed height, not truncated)
- Article heights: ~96px for articles 1-2, ~72px for article 3

---

## 9. CreditCardsSection

**Node:** `328:1182` (desktop) / `328:2059` (mobile)

### Desktop (1168×560px, flex col, gap 40px)

**Title:**
- Label: "COLLECT POINTS TO EXPERIENCE" — 16px/24px Headline Regular, tertiary
- Header: "My **Card** collection." — "My " + " collection." in text.primary; "Card" in text.secondary

**Card Collection (flex col, gap 24px between rows):**
- 2 rows × 4 cards
- Each row: flex row, gap 24px, height 172px
- Each card: `aspect-ratio: 160/100, flex: 1 0 0, border border-tertiary, border-radius 8px, overflow hidden`
- **Interaction:** Hover → card raises slightly (translateY, e.g. -4px)

Row 1 (left→right):
1. American Express Membership Rewards
2. HDFC Marriott Bonvoy
3. PhonePe SBI Select Black
4. IDFC First Select

Row 2:
5. HDFC Millennia
6. HDFC Swiggy
7. Flipkart Axis
8. ICICI Amazon Pay

**CTA row (1168px, space-between):**
- Left text (564px): "Not sure which card you need? Enter your spends and preferences, and Plush will tell you exactly what I'd pick." — 16px/24px Headline Light, text.primary
- Right button: `bg surface.primary, border border-tertiary, border-radius 12px, px 24px, py 12px, gap 8px`
  - "Find the right card" text: 16px/24px Headline Regular, text.secondary
  - Icon: 18×18px bg icon.secondary, border-radius 9px
  - **Link:** `https://plush.money/in/find-your-card`

---

### Mobile CreditCardsSection (354×698px, flex col, gap 40px)

**Title:** 12px/16px label, 24px/32px header

**Card Stack (328:2091 — COMPLETELY DIFFERENT from desktop):**
Layout: `flex col, 354px wide, ~440px total height`

**Stacking technique:**
- All 8 cards stacked vertically
- Cards 1–7 have `margin-bottom: -190px` (overlap the card beneath)
- Card 8 (bottom) has no negative margin
- Each card: `aspect-ratio: 160/100, border border-tertiary, border-radius 12px, overflow hidden, width: 100%`

**Stacking order (top-most = visually in front):**
The cards are positioned with the first card in DOM at the top. From visual front-to-back:
1. ICICI Amazon Pay (top of stack, frontmost)
2. Flipkart Axis
3. HDFC Swiggy
4. HDFC Millennia
5. IDFC First Select
6. PhonePe SBI Select Black
7. HDFC Marriott Bonvoy
8. American Express Membership Rewards (bottom, fully visible)

**Interaction (from Figma annotation):**
> "Add a card stack interaction which each card can be swiped up to reveal the card just beneath it. The swiped card will go at the back. Implement a smooth interaction."

Implementation: swipe-up gesture (or tap on mobile) sends top card to back of stack with smooth animation. The stack is a carousel deck — American Express starts at bottom, ICICI at top.

**CTA (flex col, gap 16px — stacked):**
- Text: full width, 16px/24px Headline Light
- Button: `px 16px, py 12px`, text **14px/18px** Headline Regular, icon **16×16px** border-radius 9px

---

## 10. Typography Reference — Desktop vs Mobile

| Token | Desktop | Mobile |
|---|---|---|
| SectionLabel | 16px / 24px / Headline Regular | 12px / 16px / Headline Regular |
| SectionHeader | 32px / 40px / Notch Regular | 24px / 32px / Notch Regular |
| Page title ("About Me.") | 64px / 72px / Notch Medium | 64px / 72px / Notch Medium |
| Mode labels | 32px / 40px / Notch Bold | 16px? / Notch Bold (from metadata) |
| Bio text | 24px / 32px / Headline Light | 16px / 24px / Headline Light |
| Body text | 16px / 24px / Headline Light | 16px / 24px / Headline Light |
| Stat numbers (travel) | 48px / 56px / Notch Regular | 32px / 40px / Notch Regular |
| Stat labels (travel) | 16px / 24px / Headline Regular | 12px / 16px / Headline Regular |
| Podcast watch link | 24px / 32px / Notch Regular | 16px / 24px / Notch Regular |
| Inventory details | 16px / 24px / Notch Light | 12px / 16px / Notch Light |
| Button text | 16px / 24px / Headline Regular | 14px / 18px / Headline Regular |
| Button icon | 18×18px | 16×16px |
| Album destination | 24px / 32px / Notch Medium | 24px / 32px / Notch Medium (same) |

---

## 11. New Components Required

All in `components/about/`:

| File | Figma node(s) | Notes |
|---|---|---|
| `PersonalImageBanner.tsx` | `328:920`, `328:1712` | Different photo, food/phone bottom extrude, same 6 icon positions |
| `PersonalAboutDescription.tsx` | `328:963`, `328:1399` | Bio + ToDoList; desktop = row, mobile = col |
| `TravelSection.tsx` | `328:991`, `328:1817` | Map (desktop), flags row (mobile), stats, albums |
| `WorkDeskSection.tsx` | `328:1088`, `328:1944` | Desk photo + gear list; detail text smaller on mobile |
| `PodcastMediumSection.tsx` | `328:1139` | Desktop two-column; on mobile renders as two stacked sections |
| `PodcastSection.tsx` | `328:2005` | Mobile-specific single-column podcast |
| `WritingSection.tsx` | `328:2025` | Mobile-specific single-column writing |
| `CreditCardsSection.tsx` | `328:1182`, `328:2059` | Desktop: 2×4 grid; mobile: swipeable card stack |

> Alternatively, `PodcastMediumSection.tsx` can handle both breakpoints internally using `mq.mobile` to reflow, rather than splitting into separate files. Decide at implementation time.

### Static assets to save to `public/about/personal/`
- Personal profile photo (circle, with food/phone bottom) — download from Figma asset URL `imgImg52953`
- Top extrude (hair) — `imgTopExtrude`
- Phone strip — `imgImg5295311`
- Food top image — `imgImg529531`
- Food background — `imgBackground11`
- 6 personal floating icon SVGs — `imgIcon1` through `imgIcon6`
- 5 travel album photos: qatar, singapore, malaysia, vietnam, oman
- Album mask shape SVG — `imgQatar1`, `imgMalaysia1`
- Desk background photo — `imgBackground`
- Apple Watch screen — `imgAppleWatchScreen`
- iPhone screen — `imgIphoneScreen`
- Apple icon (small logo) — `imgAppleIcon`
- Podcast logo — `imgPodcastLogo`
- Platform icons: YouTube, Spotify, Apple Podcasts
- 8 credit card images
- Map world SVG — large (2536×2474px); may need to download separately
- Flag images: Qatar, Singapore, Malaysia, Vietnam, Oman (36×24px each)
- Travel stats separator line SVG
- Arrow/external-link icon SVG (shared across CTA buttons)
- Selection/pin dot SVG (country map tags)
- Checkbox checkmark SVG

---

## 12. Interactions Summary

| Element | Trigger | Animation |
|---|---|---|
| To Do List widget | Hover (desktop) | `transform: rotate(5deg)` clockwise |
| "Redesign Portfolio" task | Hover widget | Shows checked state + strikethrough; reverts on mouse-leave |
| To Do List tasks | Click | Read-only — no action |
| To Do List day | — | Render current IST day name dynamically |
| Map canvas | Drag | Pan map; slight pinch/scroll zoom |
| Country flags (desktop) | Hover | Raise flag (translateY), show tooltip with country name |
| Country flags (mobile) | Tap | Same tooltip behavior |
| Travel stats | Scroll into view | Count-up from 0 to target number |
| Travel with me button | Click | `mailto:enricsneelamkavil@gmail.com` |
| Card Collection (desktop) | Hover each card | `transform: translateY(-4px)` or similar raise |
| Card Stack (mobile) | Swipe up | Top card animates to back of stack; smooth spring transition |
| Find the right card button | Click | Open `https://plush.money/in/find-your-card` in new tab |
| Podcast/article links | Click | External link open in new tab |

---

## 13. Page Toggle Behaviour

`app/about/page.tsx` manages `mode: 'professional' | 'personal'` state (already via `IntroSection`'s `ModeToggle`).

When mode changes:
- Swap `ProfileImage` ↔ `PersonalImageBanner`
- Swap `AboutDescription` ↔ `PersonalAboutDescription`
- Hide/show professional sections vs personal sections
- No page reload — pure conditional rendering
- Consider `AnimatePresence` or CSS fade transition between modes (not specified in Figma but would improve UX)
