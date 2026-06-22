# Contact Page — Design Spec

Sourced from Figma file `cGxPfzhfg2zi9MivaiE7dX`.  
Last refreshed: 2026-06-22.  
Desktop frame `359:1468` · Mobile frame `359:1033`.

---

## Node IDs

| Frame / Section | Node ID | Dimensions |
|---|---|---|
| Desktop frame | `359:1468` | 1920×2106px |
| Mobile frame | `359:1033` | 402×3164px |
| Desktop — Navigation Bar | `359:1645` | 473×64px |
| Desktop — Common Header | `359:1471` | 1920×96px |
| Desktop — Tags Container (content) | `359:1474` | 1168px wide |
| Desktop — Enquiry Section (form card) | `359:1475` | flex-1 (~628px) |
| Desktop — Direct Contact Container (right col) | `359:1539` | 500px wide |
| Desktop — Email Section | `360:1157` | 1168px wide |
| Desktop — Footer | `359:1644` | 1920×824px (instance) |
| Mobile — Form Section | `359:1743` | full width |
| Mobile — Info Box Container (DirectContact) | `359:1808` | full width |
| Mobile — Service Details Section | `359:1828` | full width |
| Mobile — Social Links Section (Elsewhere) | `359:1857` | full width |
| Mobile — Email Section | `360:1164` | full width |
| Mobile — Footer | `359:1061` | 403×962px |
| **Done State (new)** | **`367:1227`** | **628px (same card as form)** |

---

## What Changed Since Last Spec (2026-06-22 Session)

### Figma-side additions
- **Done state frame added** — node `367:1227` "Enquiry Section - Done" appears next to the existing form card on the Figma canvas. This is a post-submission state — not a new page section. Annotation: "Fix this on scroll in the left side. This is the view after submitting the form. Change back to the previous form after 5 seconds."

### Code changes made this session (not purely Figma-driven)
These were applied during the session as UX improvements or fixes:

| What | Change |
|---|---|
| Chip border | Always `1px solid` — `transparent` when selected, `border.tertiary` when not (prevents layout shift on toggle) |
| `ChipQuestion` + `FieldLabel` | Changed from 10px/12px `text.tertiary` → **12px/16px `text.primary`** |
| Placeholder text | Changed from `text.tertiary` → **`text.secondary`**, opacity 0.5 |
| Word counter size | Changed from 8px/10px → **10px/12px**; color `text.secondary` |
| Company/Role row | **Hidden on mobile** via `$hideOnMobile` prop on `FieldRow` |
| Card styling (mobile) | `EnquiryForm`, `DirectContact`, `Elsewhere` cards go **flat on mobile** (no border, no radius, no padding). `Services` keeps its card on mobile. `EmailFallback` keeps its card on all breakpoints. |
| Services — row alignment | `RowInner` uses `align-items: flex-start`; `Num` has `align-self: flex-start` |
| Submit email `TO` | Changed from `ngpersonal18@gmail.com` → **`enricsneelamkavil@gmail.com`** (Resend free-tier fix) |
| Submit timeout | Changed from 4s → **5s** before reverting to idle |
| Submit button guard | Removed `status === 'sent'` from button `disabled` condition (dead code after early-return done state) |

---

## Section Inventory — Top to Bottom

### 1. Page Header

| | Desktop | Mobile |
|---|---|---|
| Title | "Contact Me." (period in `text.secondary`) | Same |
| Title font | `fonts.notch` Medium, 64px, tracking −1.28px | `fonts.notch` Medium, 32px, tracking −0.64px |
| Subtitle | "Let's talk" | Same |
| Subtitle font | `fonts.sans` Regular, 16px/24px | `fonts.sans` Regular, 12px/16px |
| Alignment | Full-width centered | Full-width centered |

---

### 2. Main Layout

**Desktop:** Two-column `max-width: 1168px` container, `gap: 40px`, `align-items: flex-start`.
- Left col: `EnquiryForm` — `flex: 1`, **sticky** (`position: sticky; top: 80px; max-height: calc(100vh - 80px); overflow-y: auto`)
- Right col: `DirectContact` + `Services` + `Elsewhere` — `width: 500px`, `gap: 24px`

**Tablet (≤1024px) and Mobile:** Single column, `flex-direction: column`, `gap: 24px`.

**Below two-col:** `EmailFallback` full-width at `max-width: 1168px`.

---

### 2a. Enquiry Section — Form State

**Component:** `components/contact/EnquiryForm.tsx`  
**Node:** Desktop `359:1475` · Mobile `359:1743`

**Card:** `border: 1px solid border.tertiary`, `border-radius: radii.xl` (16px), `padding: 24px`, `gap: 40px`  
**Mobile card:** flat — `border: none; border-radius: 0; padding: 0`

#### Title Block
- Label: `"TELL ME A LITTLE"` — `fonts.notch` Light, **12px/16px**, **`text.primary`**
- Heading: `"Start an enquiry."` — `fonts.notch` Regular; "enquiry" in `text.secondary`
- Desktop: 32px/40px · Mobile: 24px/32px · No gap between label and heading

#### Chip group
- Question: `"WHAT ARE YOU HERE FOR?"` — `fonts.notch` Light, **12px/16px**, **`text.primary`**
- 7 chips: WEBSITE, DASHBOARD, APPLICATION, UX AUDIT, DESIGN SYSTEM, TALK SESSION, SOMETHING ELSE
- Chip: `padding: 10px 12px`, `border-radius: radii.lg`, always `border: 1px solid`
  - Unselected: `surface.tertiary` bg, `border.tertiary` border, `text.secondary`
  - Selected: `surface.inverse` bg, `transparent` border, `text.inverse`
- Gap between chips: 8px; chips wrap

#### Fields

| Field | Label | Placeholder | Desktop | Mobile |
|---|---|---|---|---|
| YOUR NAME | YOUR NAME | Huges Wattson | Col 1 of row 1 | Shown |
| EMAIL | EMAIL | you@company.com | Col 2 of row 1 | Shown |
| COMPANY / TEAM | COMPANY / TEAM | Studio · Startup · Self | Col 1 of row 2 | **Hidden** |
| YOUR ROLE | YOUR ROLE | Founder · PM · Designer | Col 2 of row 2 | **Hidden** |
| BUDGET | BUDGET | $15k–$40k (select) | Col 1 of row 3 | Shown |
| WHEN? | WHEN? | In 1–2 months (select) | Col 2 of row 3 | Shown |
| A LITTLE BRIEF | A LITTLE BRIEF | textarea | Full width | Full width |

Field styles:
- Label: `fonts.notch` Light, **12px/16px**, **`text.primary`**
- Input: `border: 1px solid border.tertiary`, `border-radius: radii.md`, `padding: 12px`, font `fonts.sans` Regular 12px/16px `text.primary`
- Placeholder: `fonts.sans` Light, **`text.secondary`**, opacity 0.5
- Gap between label and input: 6px

#### Brief textarea
- `height: 100px` container; textarea `flex: 1`, no border
- Word counter inside: **10px/12px**, **`text.secondary`**, opacity 0.5
- Format: `"{count} words. Keep it loose – I'll ask follow-ups."`

#### Submit row
- Button: "Send it" + arrow pill; disabled during `sending` only
- Arrow pill: 18×18px desktop / 16×16px mobile, `icon.inverse` bg
- Notice: `"Reply in < 24h on weekdays · I read everything"` — `fonts.sans` Light 12px/16px, `text.secondary`, opacity 0.5

#### Validation
- Required: `name` non-empty + email matches `/\S+@\S+\.\S+/` + (budget OR when non-empty)
- On success: clears form → shows Done state for **5 seconds** → reverts to idle

---

### 2b. Enquiry Section — Done State

**Component:** handled by early-return in `EnquiryForm.tsx`  
**Figma node:** `367:1227`  
**Card:** same `Card` wrapper as form — desktop has border/padding, **mobile is flat**

#### Content
- Icon: 80×80px rounded square, `border-radius: radii['3xl']` (24px), `surface.highlight` (#e8342a) bg, white SVG checkmark (inline, 25×18px path)
- Heading: `"Thanks - message sent."` — `fonts.notch` Regular, **32px/40px desktop / 24px/36px mobile**, `text.primary`
- Subtext: `"I'll get back to you in under 24h on weekdays. In the meantime, there's a podcast you might like →"` — `fonts.sans` Regular, 16px/24px, `text.tertiary`
- Gap between icon and text block: `spacing[10]` (40px); gap within text block: `spacing[2]` (8px)

**Behaviour:** After 5 seconds `setStatus('idle')` resets to blank form.

---

### 2c. Direct Contact Section

**Component:** `components/contact/DirectContact.tsx`  
**Node:** Desktop `359:1540` · Mobile `359:1808`

**Card:** `border: 1px solid border.tertiary`, `radii.xl`, `padding: 24px`, `gap: 40px`  
**Mobile card:** flat — `border: none; border-radius: 0; padding: 0`

#### Title Block
- Label: `"OR, THE OLD WAY"`
- Heading: `"Reach out direct."` — "direct" in `text.secondary`

#### Contact rows (`padding: 13px 0`, bordered by `border-top: 1px solid border.tertiary` from row 2 onward)

| Label | Value | Notes |
|---|---|---|
| BASED | Trivandrum, IN · UTC +5:30 | Live IST clock; diamond bullet between location + time |
| EMAIL | enricsneelamkavil@gmail.com | `mailto:` link |
| PHONE | +91 94007 43624 | `https://wa.me/+919400743624` |

- Label: `fonts.sans` Regular, 12px/16px, `text.secondary`, uppercase, `max-width: 120px`
- Value: `fonts.notch` Light/Regular, 16px/24px desktop / 12px/16px mobile, `text.primary`

---

### 2d. Services Section

**Component:** `components/contact/Services.tsx`  
**Node:** Desktop `359:1560` · Mobile `359:1828`

**Card:** `background: surface.inverse`, `border: 1px solid border.tertiary`, `radii.xl`, `padding: 24px`, `gap: 40px`  
**Mobile card:** card styling **preserved** on mobile (Services is the one contact card that stays boxed)

#### Title Block
- Label: `"SERVICES"` — `text.tertiary`
- Heading: `"What I take on."` — `text.inverse`; "take on" in `text.tertiary`

#### 4 Service rows (`padding: 13px 0`, row separators `border-top: 1px solid surface.highlight` — red, NOT tertiary)

Row layout: `align-items: flex-start`

| # | Title | Description |
|---|---|---|
| 01 | Website design | High-converting custom layouts, responsive journeys and landing pages. |
| 02 | App design | End-to-end mobile screens, native iOS/Android patterns, clean components. |
| 03 | Dashboard design | Complex B2B/SaaS logic and data tables into intuitive admin panels. |
| 04 | UX & branding | Wireframing, flows, developer handoff, and cohesive visual identities. |

- Number: `fonts.sans` Regular 12px/16px, `text.tertiary`, `width: 40px`, `align-self: flex-start`
- Title: `fonts.notch` Regular 16px/24px, `text.inverse`
- Description: `fonts.notch` Light 16px/24px, `text.tertiary`

---

### 2e. Elsewhere / Social Links Section

**Component:** `components/contact/Elsewhere.tsx`  
**Node:** Desktop `359:1589` · Mobile `359:1857`

**Card:** `border: 1px solid border.tertiary`, `radii.xl`, `padding: 24px`, `gap: 40px`  
**Mobile card:** flat — `border: none; border-radius: 0; padding: 0`

#### Title Block
- Label: `"ELSEWHERE"`
- Heading: `"Find me on the internet."` — "internet" in `text.secondary`

#### Platform grid
- **Desktop:** 2 platforms per row, 4 rows — `GridRow` flex with `gap: 16px`
- **Mobile:** single column — `GridRow` switches to `flex-direction: column`

Each card: `border: 1px solid border.tertiary`, `radii.lg`, `padding: 13px 15px`, `gap: 12px`
- Icon: 40×40px, `radii.md`, `box-shadow: 0 0 12px rgba(0,0,0,0.15)`, `object-fit: cover`
- Name: `fonts.notch` Regular 16px/24px, `text.primary`
- Handle: `fonts.notch` Light 12px/16px, `text.tertiary`

| Platform | Handle |
|---|---|
| LinkedIn | enricsneelamkavil |
| Instagram | enricsneelamkavil |
| Behance | enricsneelamkavil |
| Dribbble | enricsneelamkavil |
| X | enricneels |
| Facebook | enricsneelamkavil |
| Medium | @enricsneelamkavil |
| YouTube | @enricsneelamkavil |

Icon images: `/app-icons/{platform}.webp`

---

### 3. Email Fallback Section

**Component:** `components/contact/EmailFallback.tsx`  
**Node:** Desktop `360:1157` · Mobile `360:1164`

**Card:** `background: surface.inverse`, `border-radius: radii.xl`, **no border**  
**Card retained on all breakpoints** (not flattened on mobile)

| | Desktop | Mobile |
|---|---|---|
| Padding | 48px | `spacing[6]` (24px) |
| Gap | none (line heights only) | 4px |
| Label | "If forms aren't your thing" | Same |
| Label font | `fonts.sans` Regular 12px/16px, `text.tertiary`, uppercase | Same |
| Email | enricsneelamkavil@gmail.com | Same |
| Email font | `fonts.notch` Regular 32px/40px, `text.inverse` | `fonts.notch` Regular 20px/32px, `text.inverse` |
| Note | "Or use the agent at the bottom of the page — it knows my work better than I do, and is awake at 3am." | Same |
| Note font | `fonts.sans` Light 12px/16px, `text.tertiary` | Same |

---

### 4. Footer

Shared `Footer` component — same across all pages. No contact-specific changes.

---

## Mobile vs Desktop Summary

| Feature | Desktop | Mobile |
|---|---|---|
| Layout | Two columns (form sticky left, 3 cards right) | Single column |
| Card styling | All cards with border/radius/padding | `EnquiryForm`, `DirectContact`, `Elsewhere` flat; `Services` + `EmailFallback` keep card |
| Company / Role fields | Shown | Hidden |
| Social links | 2 per row | 1 per row (single column) |
| Form Done heading | 32px/40px | 24px/36px |
| Page title | 64px | 32px |
| Section headers | 32px | 24px |
| Email big text | 32px | 20px |

---

## API

**Route:** `app/api/contact/route.ts`  
**Method:** POST  
**TO:** `enricsneelamkavil@gmail.com` (Resend free tier — same as signup email)  
**FROM:** `onboarding@resend.dev` (update to verified domain when available)  
**replyTo:** sender's email  
**Subject:** `Enquiry from {name}`  
**Required:** `name`, `email`  
**Returns:** `{ ok: true }` on success · `{ error: '...' }` on failure

---

## Implementation Status

| Section | Component | Desktop | Mobile |
|---|---|---|---|
| Page Header | `PageHeader.tsx` | ✅ | ✅ |
| Enquiry Form | `EnquiryForm.tsx` | ✅ | ✅ |
| Done State | (in `EnquiryForm.tsx`) | ✅ | ✅ |
| Direct Contact | `DirectContact.tsx` | ✅ | ✅ |
| Services | `Services.tsx` | ✅ | ✅ |
| Elsewhere | `Elsewhere.tsx` | ✅ | ✅ |
| Email Fallback | `EmailFallback.tsx` | ✅ | ✅ |
| API route | `app/api/contact/route.ts` | ✅ | — |

### Remaining
- [ ] Place 8 social icon images at `public/app-icons/{platform}.webp`
- [ ] Update `FROM` in `route.ts` from `onboarding@resend.dev` to verified domain once set up in Resend
