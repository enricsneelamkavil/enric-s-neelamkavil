# Contact Page — Design Spec

Sourced from Figma file `cGxPfzhfg2zi9MivaiE7dX`, section `359:993` (Contact).

---

## Node IDs

| Frame / Section | Node ID | Dimensions |
|---|---|---|
| Contact section | `359:993` | 2982×4014 canvas |
| Desktop frame | `359:1468` | 1920×2866px |
| Mobile frame | `359:1033` | 402×3854px |
| Desktop — Navigation Bar | `359:1645` | 473×64px |
| Desktop — Common Header | `359:1471` | 1920×96px |
| Desktop — Tags Container (content) | `359:1474` | 1168px wide |
| Desktop — Enquiry Section (form card) | `359:1475` | flex-1 (628px) |
| Desktop — Direct Contact Container (right col) | `359:1539` | 500px wide |
| Desktop — Email Section | `360:1157` | 1168px wide |
| Desktop — Footer | `359:1644` | 1920×824px (instance) |
| Mobile — Form Section | `359:1743` | full width |
| Mobile — Info Box Container | `359:1808` | full width |
| Mobile — Service Details Section | `359:1828` | full width |
| Mobile — Social Links Section | `359:1857` | full width |
| Mobile — Email Section | `360:1164` | full width |
| Mobile — Footer | `359:1061` | 403×962px |

---

## Section Inventory — Top to Bottom

### 1. Page Header

Both breakpoints have a centered title + subtitle at the top.

| | Desktop | Mobile |
|---|---|---|
| Title | "Contact Me." (period in `text.secondary`) | Same |
| Title font | `fonts.notch` Medium, 64px, tracking -1.28px | `fonts.notch` Medium, 32px, tracking -0.64px |
| Subtitle | "Let's talk" | Same |
| Subtitle font | `fonts.sans` Regular, 16px/24px | `fonts.sans` Regular, 12px/16px |
| Alignment | Full-width centered | Full-width centered |

---

### 2. Main Content

**Desktop**: two-column layout inside a `1168px` centered container, `gap: 40px`.
- Left column: Enquiry Section (form card) — `flex: 1` — **sticky on scroll** (Figma annotation: "Fix this on scroll in the left side")
- Right column: Direct Contact Container — `500px` wide, 3 cards stacked with `gap: 24px`

**Mobile**: single column, all sections stacked vertically with `gap: 24px` inside `padding: 24px`.

---

### 2a. Enquiry Section (Form Card)

**Node ID:** Desktop `359:1475` · Mobile `359:1743`  
**Card style:** `border: 1px solid border.tertiary`, `border-radius: radii.xl` (16px), `padding: 24px`, `gap: 40px`

#### Header (Title Container component instance)
- Label: `"TELL ME A LITTLE"` — `fonts.sans` Regular, 16px/24px (desktop) / 12px/16px (mobile), `text.tertiary`
- Heading: `"Start an enquiry."` — `fonts.notch` Regular; "enquiry" in `text.secondary`, period in `text.primary`
- Desktop size: 32px/40px · Mobile size: 24px/32px

#### Enquiry Type — Multi-select chip group
- Question label: `"WHAT ARE YOU HERE FOR?"` — `fonts.notch` ExtraLight, 10px/12px, `text.tertiary`
- Tags wrap (`flex-wrap: wrap`, `gap: 8px`)
- **7 options:** WEBSITE, DASHBOARD, APPLICATION, UX AUDIT, DESIGN SYSTEM, TALK SESSION, SOMETHING ELSE
- **Unselected chip:** `surface.tertiary` bg, `border.tertiary` border, `radii.xl` (16px? — Figma shows `rounded-[12px]`), `padding: 10px 12px`, text `fonts.sans` Light 12px/16px `text.secondary`
- **Selected chip:** `surface.inverse` bg (#171717), no border, text `text.inverse` (white)
- Annotation: "Selection behavior for chips" — chips are toggleable multi-select (not radio); any number can be selected

#### Form Fields

Desktop renders Name+Email, Company+Role, Budget+Timeline as **side-by-side pairs** (two fields per row, `gap: 16px`).  
Mobile renders **all fields stacked** individually.

| Field | Label | Placeholder | Type | Notes |
|---|---|---|---|---|
| YOUR NAME | YOUR NAME | Huges Wattson | text | Required |
| EMAIL | EMAIL | you@company.com | email | Required |
| COMPANY / TEAM | COMPANY / TEAM | Studio · Startup · Self | text | Optional |
| YOUR ROLE | YOUR ROLE | Founder · PM · Designer | text | Optional |
| BUDGET | BUDGET | $15k-$40k | select/dropdown | Has chevron-down icon; required (either budget OR when) |
| WHEN? | WHEN? | In 1–2 months | select/dropdown | Has chevron-down icon; required (either budget OR when) |
| A LITTLE BRIEF | A LITTLE BRIEF | What are you building? Who is it for? What's keeping you up at night about it? | textarea | Height: 100px; has live word counter |

**Input field styles:**
- Label: `fonts.notch` ExtraLight 10px/12px, `text.tertiary`
- Input container: `border: 1px solid border.tertiary`, `border-radius: radii.lg` (8px), `padding: 12px`
- Placeholder text: `fonts.sans` Light 12px/16px, `text.tertiary`, `opacity: 0.5`
- Filled/value text: `fonts.sans` Regular 12px/16px, `text.primary` (no opacity)
- Gap between label and input: 6px

**Word counter** (inside textarea):
- `"0 words. Keep it loose – I'll ask follow-ups."` — 8px, `text.tertiary`, `opacity: 0.5`
- Annotation: "Total number of words typed." — counter updates live as user types

**Submit button + notice:**
- Button label: "Send it" with arrow pill icon
- Desktop: `px-24 py-12`, `fonts.sans` Regular 16px/24px, `text.inverse`
- Mobile: `px-16 py-12`, `fonts.sans` Regular 14px/18px, `text.inverse`
- Arrow pill: `surface.inverse` (white bg in this case — actually it's `icon.inverse`), 18px (desktop) / 16px (mobile), `border-radius: 9px`
- Notice text next to button: `"Reply in < 24h on weekdays · I read everything"` — 12px `fonts.sans` Light, `text.tertiary`, `opacity: 0.5`

**Form submission annotation (Figma):**
- Required fields: Name, email, and either budget OR when
- Responses must be sent to: `ngpersonal18@gmail.com`

---

### 2b. Direct Contact Section

**Node ID:** Desktop `359:1540` · Mobile `359:1808`  
**Card style:** same as form card — `border: 1px solid border.tertiary`, `radii.xl`, `padding: 24px`, `gap: 40px`

#### Header
- Label: `"OR, THE OLD WAY"` — same title container component
- Heading: `"Reach out direct."` — "direct" in `text.secondary`

#### Contact info rows (separated by `border-top: 1px solid border.tertiary`, `padding: 13px 0`)

| Label | Value | Implementation |
|---|---|---|
| BASED | Trivandrum, IN · UTC +5:30 | Location text + red diamond bullet + live IST clock. Annotation: "Live time at 'Kerala, India'" |
| EMAIL | enricsneelamkavil@gmail.com | `mailto:enricsneelamkavil@gmail.com` |
| PHONE | +91 94007 43624 | `href="https://wa.me/+919400743624"` (WhatsApp link) |

Row layout:
- Label column: `fonts.sans` Regular 12px/16px, `text.secondary`, uppercase, `max-width: 120px`, `flex: 1`
- Value column: `fonts.notch` Light, `text.primary`, `flex: 1`
  - Desktop value: 16px/24px
  - Mobile value: 12px/16px
- Location row: value is `fonts.notch` Light (location) + red rotated square bullet + `fonts.notch` Regular (timezone)
- Bullet: 6px square `icon.highlight` (#e8342a), `border-radius: 2px`, `rotate(-45deg)`

---

### 2c. Services Section (Dark Card)

**Node ID:** Desktop `359:1560` · Mobile `359:1828`  
**Card style:** `background: surface.inverse` (#171717), `border: 1px solid border.tertiary`, `radii.xl`, `padding: 24px`, `gap: 40px`

#### Header
- Label: `"SERVICES"` — `text.tertiary` (#a3a3a3)
- Heading: `"What I take on."` — white text, "take on" in `text.tertiary` (#a3a3a3)

#### 4 service rows

Row separators: `border-top: 1px solid #e8342a` (highlight red — NOT the default tertiary border; this is intentional branding). First row has no border-top.

| # | Title | Description |
|---|---|---|
| 01 | Website design | High-converting custom layouts, responsive journeys and landing pages. |
| 02 | App design | End-to-end mobile screens, native iOS/Android patterns, clean components. |
| 03 | Dashboard design | Complex B2B/SaaS logic and data tables into intuitive admin panels. |
| 04 | UX & branding | Wireframing, flows, developer handoff, and cohesive visual identities. |

Row layout (`py-13`, align items center, justify between):
- Number: `fonts.sans` Regular 12px/16px, `text.tertiary` (#a3a3a3), uppercase, `width: 40px`
- Service title: `fonts.notch` Regular 16px/24px, `text.inverse` (white)
- Service description: `fonts.notch` Light 12px/16px, `text.tertiary` (#a3a3a3)
- Title + description stacked vertically, `flex: 1`, `min-width: 0`

---

### 2d. Elsewhere / Social Links Section

**Node ID:** Desktop `359:1589` · Mobile `359:1857`  
**Card style:** same as contact card — `border: 1px solid border.tertiary`, `radii.xl`, `padding: 24px`, `gap: 40px`

#### Header
- Label: `"ELSEWHERE"`
- Heading: `"Find me on the internet."` — "internet" in `text.secondary`

#### 8 social link cards

**Desktop layout:** 2 items per row (`gap: 16px`), 4 rows total.  
**Mobile layout:** single column, all 8 stacked vertically (`gap: 16px` between items).

Each social link card:
- Border: `1px solid border.tertiary`, `border-radius: radii.lg` (12px), `padding: 13px 15px`, `gap: 12px`, `display: flex`, `align-items: center`
- Icon: 40×40px, `box-shadow: 0 0 12px rgba(0,0,0,0.15)`, `object-fit: cover`
- Platform name: `fonts.notch` Regular 16px/24px, `text.primary`
- Handle: `fonts.notch` Light 12px/16px, `text.tertiary`

| Platform | Handle | URL |
|---|---|---|
| LinkedIn | enricsneelamkavil | https://www.linkedin.com/in/enricsneelamkavil/ |
| Instagram | enricsneelamkavil | https://www.instagram.com/enricsneelamkavil/ |
| Behance | enricsneelamkavil | https://www.behance.net/enricsneelamkavil |
| Dribbble | enricsneelamkavil | https://dribbble.com/enricsneelamkavil |
| X | enricneels | https://x.com/enricneels |
| Facebook | enricsneelamkavil | https://facebook.com/enricsneelamkavil |
| Medium | @enricsneelamkavil | https://medium.com/@enricsneelamkavil |
| YouTube | @enricsneelamkavil | https://www.youtube.com/@enricsneelamkavil |

All 8 cards are `<a>` tags with `href` and `target="_blank" rel="noopener noreferrer"`. Icon images come from the component library / Figma assets.

---

### 3. Email Section (Dark Fallback Card)

**Node ID:** Desktop `360:1157` · Mobile `360:1164`  
**Card style:** `background: surface.inverse` (#171717), `border-radius: radii.xl`, below the two-column layout

| | Desktop | Mobile |
|---|---|---|
| Label | "If forms aren't your thing" (12px, `text.tertiary`, uppercase) | "IF FORMS AREN'T YOUR THING" (same) |
| Email (big) | enricsneelamkavil@gmail.com | enricsneelamkavil@gmail.com |
| Email font | `fonts.notch` Regular 32px/40px, `text.inverse` | `fonts.notch` Regular 20px/32px, `text.inverse` |
| Sub-text | "Or use the agent at the bottom of the page — it knows my work better than I do, and is awake at 3am." | Same |
| Sub-text font | `fonts.sans` Light 12px/16px, `text.tertiary` | Same |
| Padding | `48px` all sides | `24px` all sides |
| Email link | `mailto:enricsneelamkavil@gmail.com` | Same |

---

### 4. Footer

Desktop uses the shared `Footer` component instance (`359:1644`) — same as all other pages.  
Mobile has an inline Footer (`359:1061`) — same content and layout as the shared footer component but not an instance.

Footer content is identical to the existing `Footer.tsx` already implemented — no new footer work needed.

---

## Desktop vs Mobile Differences Summary

| Feature | Desktop | Mobile |
|---|---|---|
| Layout | Two columns (form left, 3 cards right) | Single column, all sections stacked |
| Form fields | Name+Email in a row; Company+Role in a row; Budget+Timeline in a row | All fields stacked vertically |
| Social links | 2 per row (4 rows) | 1 per row (8 rows) |
| Page title | 64px, tracking -1.28px | 32px, tracking -0.64px |
| Section headers | 32px notch regular | 24px notch regular |
| Email (big text) | 32px | 20px |
| Form sticky | Yes — sticky on left column scroll | N/A (no sticky) |
| Navbar | Standard glass pill (CONTACT highlighted) | Bottom mobile pill (standard) |

---

## Components from the Library

| Component | Usage |
|---|---|
| `Title Container` (instance, e.g. `360:1129`) | Section headers throughout — SectionLabel + SectionHeader pattern |
| `Button` (instance, e.g. `359:1537`) | "Send it" CTA button in form |
| `cheveron-down` (instance, e.g. `360:1139`) | Dropdown arrow icon inside Budget and When fields |
| `Footer` (instance `359:1644`) | Desktop footer |
| `Menu Navigation` (instance `359:1646`) | Desktop navbar inside Navigation Bar wrapper |

The "Title Container" component renders a label (SectionLabel) + header (SectionHeader) pair — matches the existing `SectionLabel` + `SectionHeader` component pattern in the codebase.

---

## Interaction & Behaviour Notes

### Chip multi-select (enquiry type)
- Multiple chips can be toggled on/off independently
- Unselected → selected: swap `surface.tertiary` + `border.tertiary` for `surface.inverse` (no border), text becomes `text.inverse`
- Selected → unselected: reverse
- No minimum selection required (optional)

### Dropdown fields (Budget, WHEN?)
- Budget and Timeline are dropdowns (not free-text)
- Show a `chevron-down` icon (14×14px, component instance) on the right side of the input
- Placeholder values shown are the default selected values in Figma: "$15k-$40k" and "In 1–2 months"
- Exact options not specified in Figma — define sensible ranges when implementing

### Word counter
- Brief textarea tracks word count live
- Counter text: `"{count} words. Keep it loose – I'll ask follow-ups."`
- Shown inside the textarea at the bottom-left, 8px `fonts.sans`, `text.tertiary`, 50% opacity

### Timezone (Based row)
- UTC +5:30 label is live — Figma annotation: "Live time at 'Kerala, India'"
- Implement same IST clock as used in `AboutDescription.tsx`

### Email link
- The big email address in the Email Section is a clickable `mailto:` link
- Annotation: `mailto:enricsneelamkavil@gmail.com`

### WhatsApp link
- Phone number in Direct Contact section links to WhatsApp
- Annotation: `href="https://wa.me/+919400743624"`

### Form sticky (desktop)
- The form card (Enquiry Section) is sticky on the left column as the right column scrolls
- Annotation: "Fix this on scroll in the left side."
- Implement with `position: sticky; top: [navbar height + gap]`

### Form submission
- Required: Name, Email, and at least one of Budget or When
- Form data emails to: `ngpersonal18@gmail.com`
- No success/error state shown in Figma — to be defined

---

## Annotations Summary

| Node | Annotation | Type |
|---|---|---|
| `359:1475` / `359:1743` (Form card) | "Fix this on scroll in the left side." | Interaction |
| `359:1475` / `359:1743` (Form card) | "The form should have Name, email id & either budget/when mandatory. And should send responses to 'ngpersonal18@gmail.com'." | Interaction / Backend |
| `359:1485` (DASHBOARD chip, selected) | "Selection behavior for chips" | Interaction |
| `359:1534` (word count text) | "Total number of words typed." | Interaction |
| `359:1551` (timezone text) | "Live time at 'Kerala, India'" | Dynamic data |
| `359:1555` (email row value) | "mailto:enricsneelamkavil@gmail.com" | Link |
| `359:1559` (phone row value) | "Give href to 'https://wa.me/+919400743624'" | Link |
| `359:1645` (nav bar wrapper) | "Navigation bar sticky at the top." | Interaction |
| All social link cards | "Give href link to: [URL]" (per platform) | Links |
| `360:1161` (email big text, desktop) | "mailto:enricsneelamkavil@gmail.com" | Link |

---

## Figma Node IDs to Add to CLAUDE.md

| Section | Desktop | Mobile |
|---|---|---|
| Contact (full page) | `359:1468` | `359:1033` |
| Contact — Form card | `359:1475` | `359:1743` |
| Contact — Direct Contact | `359:1540` | `359:1808` |
| Contact — Services | `359:1560` | `359:1828` |
| Contact — Social Links | `359:1589` | `359:1857` |
| Contact — Email Section | `360:1157` | `360:1164` |

---

## Proposed Component Files

```
components/contact/
  ├── PageHeader.tsx          — "Contact Me." title + "Let's talk" subtitle
  ├── EnquiryForm.tsx         — form card with chip group + all fields + submit
  ├── DirectContact.tsx       — "Reach out direct." card with 3 info rows
  ├── ServicesSection.tsx     — dark card with 4 service rows
  ├── ElsewhereSection.tsx    — social links grid/stack
  └── EmailSection.tsx        — dark fallback email card
```

Page file `app/contact/page.tsx` composes all sections.
