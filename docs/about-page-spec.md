# About Page — Design Spec

Figma file: `cGxPfzhfg2zi9MivaiE7dX`
**Desktop frame:** `248:1175` — "About - Professional" — 1920 × 4033px  
**Mobile frame:** `251:729` — "About - Professional (Mobile)" — 402 × 4394px

> **Mode note:** Professional / Personal toggle exists. Only Professional is designed. Toggle renders as static UI only — no functional mode switching needed until Personal content is designed.

> **Previous spec reference:** The old spec (node `230:425`) is superseded. This document reflects the **updated Figma** fetched fresh on 2026-06-18.

---

## Desktop Diff — What Changed vs. Current Code

### Section 1 — IntroSection

#### ❌ REMOVED
- **WelcomeTag pill** ("ABOUT 🍎 ENRIC S NEELAMKAVIL") — not present in frame `248:1178`. Remove `MainLander`, `WelcomeTag`, `TagText`, `AppleIcon` styled components and the `IMG_APPLE` asset import.

#### ✏️ CHANGED

| Element | Current Code | Figma `248:1178` |
|---|---|---|
| Gap between CommonHeader and ModeSwitch | `spacing[10]` (40px) via `Header` | **32px** (Intro Section direct `gap: 32px`) |
| ModeLabel font-size | `theme.fontSizes.lg` | **32px**, `Stack_Sans_Notch:Bold`, line-height 40px |
| Toggle container padding | current ModeToggle impl | padding: 6px, gap: 4px, border-radius: 999px |
| Toggle "Selected" button | current impl | size: 40×40px, padding: 12px, border-radius: 999px, bg: surface-primary, border: 1px border-tertiary |
| Toggle arrow icon | current impl | **24×24px** |
| Toggle "Not Selected" button | current impl | size: 40×40px, no bg |

The outer `Section` gap and `PageTitle` / `PageSubtitle` are unchanged.

---

### Section 2 — ProfileImage

#### ✏️ CHANGED — Significant structural update

| Element | Current Code | Figma `248:1186` |
|---|---|---|
| Container strategy | Absolute-positioned group, **710px wide** | Full content width: **1168px**, `overflow: clip`, height: 470px |
| Photo position | `absolute, left: ~140px` within 710px group | Centered within 1168px wrapper |
| Photo size | 431px circle | **430.983px** (same) |
| Hair image (IMG_5295 3) | Merged into `profile-group.png` | Separate element — **216×48px**, `object-bottom`, positioned at `left: 114.43px, top: 0` atop the circle |
| Floating icon count | **3 icons** | **6 icons** |

**New icon layout** (all 72×72px, absolute within 1168×470px container):

| Icon | Approx position | Rotation |
|---|---|---|
| Icon 2 (cube) | left: 95.57px, top: 41.12px | **-12.29°** |
| Icon 6 (sparkle/vector) | left: 1052px, top: 150px | **+14.87°** |
| Icon 3 (cursor) | left: 235.11px, top: 219.91px | **+3.42°** |
| Icon 5 (new) | left: 929.25px, top: 315.93px | **-8.74°** |
| Icon 4 (new) | left: 873px, top: 75px | 0° |
| Icon 1 (new) | left: 29.76px, top: 331.64px | **+12.94°** |

Icons 4, 5, 6 are new assets that need to be sourced/downloaded from Figma. Hide all 6 icons on `tabletDown` (same pattern as before).

---

### Section 3 — AboutDescription

#### ✏️ CHANGED

| Element | Current Code | Figma `248:1224–1244` |
|---|---|---|
| Bio font-size | `theme.fontSizes.md` (~18px) | **24px** |
| Bio line-height | `theme.lineHeights.relaxed` | **32px** |
| Bio font weight | `fontWeights.light` | Light (same) |
| BASED time value display | Live IST clock ("10:30 AM") | Figma static shows "UTC +5:30" — annotation says `"Live time at 'Kerala, India'"` → **keep live IST clock** |

No content changes. Table rows unchanged.

---

### Section 4 — MyTools

#### ✅ NO CHANGES

All 12 tools, same dock layout, same hover animation.

---

### Section 5 — Journey

#### ❌ REMOVED: CCE (university) entry — 3 entries → 2 entries (UST + FunDesigns only)

#### ✏️ CHANGED

| Element | Current Code | Figma `248:1258–1291` |
|---|---|---|
| Section label text | "The Journey · 2018 → 2026" | **"CAREER LADDER"** |
| UST bullet visual | `<Bullet>` circle div + `<BulletDot>` div | Image asset `imgBulletShimmer` — 24×24px shimmer/glowing dot |
| FunDesigns bullet | Same plain circle | Image asset `imgBulletContainer` — 24×24px plain circle image |

Entry row structure and description column structure unchanged (4 columns × 240px, gap 40px, 16px font, line-height 24px).

---

### Section 6 — ProfessionalTimeline *(NEW COMPONENT)*

Does not exist in current codebase. Create `components/about/ProfessionalTimeline.tsx`.

**Figma node:** `248:1292` — "Professional Timeline"

**Outer layout:** `flex-col`, `gap: 40px`, `width: 1168px`

#### Title row (node `251:981`): `flex`, `gap: 40px`, `align-items: center`, `width: 100%`

**Left — Title block** (`flex: 1 0 0`):
- Label: "MY JOURNEY 2022 → 2026" — 16px, Stack Sans Headline Regular, uppercase, text-tertiary
- Header: "Being through " (text-primary) + "so far" (text-secondary) + "." (text-primary) — 32px Stack Sans Notch Regular

**Right — Nav buttons** (node `251:1001`): `gap: 12px`, `align-items: center`
- Both buttons: `padding: 16px`, `bg: surface-tertiary`, `border: 1px solid border-tertiary`, `border-radius: 12px`
- Left arrow icon: 18×18px
- Right arrow icon: 18×18px
- **Interaction:** clicking slides the timeline. Disable respective button at the scroll ends.

#### Timeline (node `248:1296`): `flex-col`, `gap: 24px`
Horizontally scrollable (annotated: "In scroll element, scrollable to the right for full view").

**Top events row** (node `I248:1296;248:1007`): `flex`, `gap: 240px`, `padding-left: 240px`, `align-items: center`

**Image strip** (node `I248:1296;248:1039`): 12 photos in a single horizontal row, height **169px**, masked using `imgShapeMask`
- Each photo has a **red overlay: `rgba(232,52,42,0.5)`** as an absolutely inset div on top
- Photo aspect ratios vary (see Figma for exact values)
- Year labels are absolutely positioned over the strip in white:
  - `"> 2022"`, `"> 2023"`, `"> 2024"`, `"> 2025"`
  - Font: **80px**, `Stack_Sans_Notch:Bold`, tracking: **-1.6px**, color: text-inverse (white), line-height 100px

**Bottom events row** (node `I248:1296;248:1058`): `flex`, `gap: 240px`, `padding-right: 240px`, `align-items: center`

#### Event typography
| Property | Value |
|---|---|
| Title | 24px, `Stack_Sans_Notch:Medium`, line-height 32px, text-primary |
| Subtitle (event name) | 16px, `Stack_Sans_Headline:Regular`, line-height 24px, **text-highlight (#e8342a)** |
| Description | 12px, `Stack_Sans_Headline:Light`, line-height 16px, text-secondary |
| Event block structure | `flex-col`, gap: 4px; title+subtitle container has no gap |

#### Top row events (left → right)
| Title | Subtitle | Description |
|---|---|---|
| Co-host | BEACH HACK 5 | Co-hosted the 5th edition of the flagship event Beach hackathon. |
| Founder Host | CODe Design Week (CDW '23) | Hosted the first ever Design Week, in Engineering Colleges across Kerala. |
| Designers Award | Huddle Global | Secured the position in Top 13 Designers in Branding Challenge. |
| Speaker | Christ College of Engieering | Handled multiple sessions on interface design for digital products. |
| Invited Attendee | Config APAC | Figma's first Config APAC at Marina Bay Sands Conventional Center, Singapore. |
| Attendee | Figma India Launch | Attended Figma's India office Launch representing Strollby Design. |

#### Bottom row events (left → right)
| Title | Subtitle | Description |
|---|---|---|
| Chairman | Community of Developers (CODe) | Association of Department of Computer Science, Christ College of Engineering. |
| UI Designer | GTech MuLearn | First Internship as UI Designer, led a team, mentored junior designers. |
| Attendee | Lollypop Designathon | Shortlisted attendee for Designathon 2024 hosted by Lollypop Design Studio. |
| Lead Host | DESIGNATHON 2024 | Hosted second edition of Designathon, after CODe Design Week '23. |
| Graduation | Christ College of Engieering | Graduated Bachelors of Engineering in Computer Science & Engineering. |
| Young Jury 2025 | Awwwards. | Selected as a jury member, evaluating and rating top digital designs globally. |

#### Photo assets
12 photos needed in `public/about/timeline/` as `tl-image-1.jpg` through `tl-image-12.jpg`. Download from Figma asset URLs. All get the red overlay rendered in CSS (`rgba(232,52,42,0.5)` div absolutely inset), so the images themselves do not need pre-processing.

---

### Section 7 — Companies

#### ❌ COMPLETELY REMOVED

No Companies section exists in Figma `248:1175`. Remove from page composition. The component file can remain but should not be imported in `app/about/page.tsx`.

---

### Section 8 — AwardShelf

#### ✅ NO CHANGES

5 awards, same layout, same data, same typography. Unchanged.

---

### Page Composition — `app/about/page.tsx`

| # | Old | New |
|---|---|---|
| LandingGroup | Intro + ProfileImage + AboutDescription | Same |
| 1 | MyTools | MyTools |
| 2 | Journey | Journey (2 entries, new bullet assets) |
| 3 | Companies | **ProfessionalTimeline (NEW)** |
| 4 | AwardShelf | AwardShelf |

Remove `Companies` import. Add `ProfessionalTimeline` import.

---

## Mobile Spec — Frame `251:729`

**Frame width:** 402px · **Content width:** 354px (24px horizontal padding each side)  
**Outer layout:** `flex-col`, `gap: 72px`, `padding-top: 40px`, `padding-x: 24px`

---

### Mobile Intro (Profile Section — node `253:1043`)

**Text Container** (node `251:736`) — centered:
- Title: "About Me." — **32px**, `Stack_Sans_Notch:Medium`, tracking: -0.64px, line-height: 40px
- Subtitle: "Two sides of one designer" — **12px**, `Stack_Sans_Headline:Regular`, line-height: 16px

**Tab Navigation / Mode Switch** (node `253:1009`): `gap: 16px`
- "PROFESSIONAL": **16px**, `Stack_Sans_Notch:Bold`, line-height: 24px
- "PERSONAL": **16px**, `Stack_Sans_Notch:Bold`, line-height: 24px
- Toggle: `padding: 4px`, `gap: 2px`, `border-radius: 999px`
  - Selected button: **24×24px**, `padding: 12px`, `border-radius: 999px`
  - Arrow icon inside: **16×16px**
  - Not-selected button: **24×24px**

**vs desktop:** Title 32→64px · Subtitle 12→16px · Mode labels 16→32px · Toggle button 24→40px

---

### Mobile Image Banner (node `253:1079`)

- Container: **402px wide** (full bleed), height: **161.764px**, `overflow: clip`
- Profile photo circle: **148.335×148.335px** (mask same approach)
- Hair image (IMG_5295 3): **74.342×16.521px** at scaled position
- All 6 floating icons present at scaled-down positions (~24.781px each)
- Icons are **visible on mobile** (not hidden unlike the old 3-icon version)

**vs desktop:** Height 161→470px · Photo 148→431px · Icons proportionally scaled

---

### Mobile About Description (node `253:1114`)

Container: `354px` wide, `gap: 12px` between TitleBlock and content (vs 40px desktop)

| Element | Mobile | Desktop |
|---|---|---|
| Section label | **12px**, line-height 16px | 16px, line-height 24px |
| Section header | **24px**, line-height 32px | 32px, line-height 40px |
| Bio font-size | **16px**, `Stack_Sans_Headline:Light`, line-height 24px | 24px |
| Layout | `flex-col` (bio then table, stacked) | `flex-row` |
| Table value font | **12px** notch:Light / notch:Regular | 16px |
| Table label font | **12px** | 12px (same) |

---

### Mobile My Tools (node `253:1140`)

| Property | Mobile | Desktop |
|---|---|---|
| Container width | **304px** | Flexible (≤1168px) |
| Layout | `flex-wrap`, `content-start` | Single row |
| Container border-radius | **12px** | 24px |
| Padding | **12px** | 16px 24px |
| Gap | **8px** | 16px |
| Icon size | **40×40px** | 64×64px |
| Rounded icon border-radius | **4px** | 16px |
| Hover animation | **None** | MacOS dock bounce |

---

### Mobile Journey / Career Ladder (node `253:1154`)

| Element | Mobile | Desktop |
|---|---|---|
| Section label | **"CAREER LADDER"**, 12px | "CAREER LADDER", 16px |
| Section header | **24px** | 32px |
| Date tags | **REMOVED** | Present |
| Connector line | **REMOVED** | Present |
| Bullet type | Diamond: 8×8px red square rotated 45°, gap 12px to text | Circle image (shimmer/container) |
| Description layout | Vertical bullet list (2 bullets per entry) | 4 horizontal columns |
| Bullet text font | 16px, `Stack_Sans_Headline:Light`, line-height 24px | Same |
| UST role label | **"Assoc. Product Designer"** (abbreviated) | "Associate Product Designer" |

**Entry structure per company (mobile):**
```
[Logo] [Role Title]          ← Journey Role row, gap: 16px, items: flex-start
[◆] [Bullet text 1]         ← Journey Bullet row, gap: 12px
[◆] [Bullet text 2]         ← Journey Bullet row, gap: 12px
```
Gap between the two company entries: **32px**.

UST shows bullets 1+2. FunDesigns shows bullets 1+2. (2 of 4 columns each.)

---

### Mobile Professional Timeline (nodes `261:977`, `261:1062`)

Container: `354px` wide, `gap: 40px`, `flex-col`

**Title block** (node `261:973`):
- Label: "MY JOURNEY 2022 → 2026" — **12px**, text-tertiary
- Header: "Being through " + muted "so far" + "." — **24px**

**Timeline component** (node `261:1062`): `354px` wide, `flex`, `gap: 8px`

The mobile timeline is a **vertical strip** — the horizontal desktop photo strip is rotated 90° and placed in the center. The events are placed in columns flanking it.

| Column | Width | Content |
|---|---|---|
| Left | 100px | 6 top-row events, `justify-between`, `padding-top: 100px` |
| Center | 137px | Photo strip rotated 90°, height 1304px |
| Right | 100px | 6 bottom-row events, `justify-between`, `padding-bottom: 100px` |

**Year labels** (on the strip): `"> 2025"`, `"> 2024"`, `"> 2023"`, `"> 2022"` — **32px**, `Stack_Sans_Notch:Bold`, tracking: -0.64px, white, rotated to read vertically.

**Mobile event typography** (vs desktop):
| Property | Mobile | Desktop |
|---|---|---|
| Event title | **16px**, notch:Medium | 24px |
| Event subtitle | **12px**, headline:Regular, line-height 16px | 16px |
| Event description | **10px**, headline:Light, line-height 14px | 12px |
| Event block gap | **8px** | 4px |
| Column width | **100px** | ~180–240px |

No nav arrows on mobile. No horizontal scrolling — full height (≈1306px) renders vertically in the page flow.

---

### Mobile Award Shelf (node `253:1211`)

| Element | Mobile | Desktop |
|---|---|---|
| Section label | **12px** | 16px |
| Section header | **24px** | 32px |
| Awards row | `flex`, `gap: 24px`, **horizontal scroll** (5 × 212px = 1060px > 354px container) | `justify-between` |
| Card, seal, text sizes | Same as desktop (212px card, 120px seal, 16px/12px text) | Same |

---

### Mobile Footer (node `251:879`)

| Element | Mobile | Desktop |
|---|---|---|
| Heading | **40px**, line-height 48px, tracking -0.8px | 64px, line-height 80px, tracking -1.28px |
| Border section padding | `py: 32px` | `py: 80px` |
| Info layout | `flex-col`, gap: 40px — description+button stacked, then 2-col footer links | 4 columns side-by-side |
| Footer links | Pages + Connect as `flex`, `gap: 40px` row; Reach Out as separate row below | All in one row |
| Footer bottom background | **Red** (`surface-highlight`, `#e8342a`) | Dark (footer image) |
| Copyright layout | **Two lines**, center-aligned | Single line |

---

## File Changes Summary

| File | Action |
|---|---|
| `components/about/IntroSection.tsx` | Remove WelcomeTag; update ModeLabel to 32px; reduce Header gap to 32px |
| `components/about/ProfileImage.tsx` | Widen to 1168px container; add 3 new icons (Icons 4, 5, 6); add hair image element |
| `components/about/AboutDescription.tsx` | Bio font-size: 24px desktop, 16px mobile |
| `components/about/Journey.tsx` | Label → "CAREER LADDER"; remove CCE entry; swap bullets to image assets |
| `components/about/ProfessionalTimeline.tsx` | **CREATE NEW** — horizontal scrollable timeline with nav arrows |
| `components/about/Companies.tsx` | Keep file, remove from page (do not delete in case of reuse) |
| `app/about/page.tsx` | Remove Companies; add ProfessionalTimeline after Journey |

---

## Annotations (Desktop)

| Location | Node | Note |
|---|---|---|
| Toggle | `248:1184` | "Toggle to switch modes between 'Professional' and 'Personal'" — static UI |
| My Tools | `248:1245` | MacOS dock magnification — hovered icon rises, direct neighbours rise half height |
| BASED time | `248:1233` | "Live time at 'Kerala, India'" — live IST clock, updates every minute |
| Navigation | `248:1328` | Sticky at top on scroll |
| UST logo | `248:1265` | "Open https://ust.com in new tab" |
| FunDesigns logo | `248:1281` | "Open https://fundesign.in in new tab" |
| Timeline nav | `251:1001` | "Click to slide the timeline below. Disable respective icons at the ends." |
| Timeline scroll | `248:1296` | "In scroll element, scrollable to the right for full view." |

## Annotations (Mobile)

| Location | Node | Note |
|---|---|---|
| Toggle | `253:1031` | Same mode toggle — static UI |
| UST logo | `253:1161` | "Open https://ust.com in new tab" |
| FunDesigns logo | `253:1177` | "Open https://fundesign.in in new tab" |
| Footer button | `251:886` | "Redirect to the Contact page" |
| Footer info layout | `251:883` | "Changed the layout to 1/2/1 format" |
| Copyright | `251:932` | "Changed to two line and center aligned" |
| Nav bar | `251:937` | "Navigation bar sticky at the bottom" |
