# About Page — Personal Mode: Desk Section + Credit Cards — Figma vs. Built Code

Fresh Figma read of Desktop `328:908` ("Desktop - Personal") and Mobile `328:1384` ("Mobile - Personal"), focused on the desk section and the credit cards section. No code changed — findings only.

**Headline finding:** the "desk" section (Figma names it **"Desk Setup"**, not "travel desk" — there's no section literally called that; this is the closest match, sitting between Travel and Podcast) no longer exists in the codebase at all — `WorkDeskSection.tsx` has been deleted (confirmed: file doesn't exist, zero references anywhere including `AboutClient.tsx`'s composition). This needs to be **built new**, not modified. The credit cards section exists but is missing an entire new column of content and has a different desktop stack orientation.

---

## 1. Desk Setup section ("travel desk section")

### Where it is
- Desktop: node `708:1529`, sits between "Travel section" (`328:991`) and "Podcast Section" (`328:1140`) — full-bleed, `1920×1093px`, **not** constrained to the usual `1168px` content column (it breaks out to full viewport width, unlike every other section on the page).
- Mobile: node `722:1649`, same position in the flow, `402×1093px`, also full-bleed (breaks the usual `354px`/24px-padding content column).

### What it is
A photographic "flat-lay desk" scene — **not** the text-only gear list `WorkDeskSection.tsx` used to be. Structure:

- **Full-bleed background image** — a green cutting-mat/desk-mat texture photo (`Background` node), `object-fit` bottom-anchored.
- **Title overlay**: `SectionLabel` "TECH GEAR" + `SectionHeader` "My Work Desk." — white text (`text.inverse`) with a `text-shadow: 0px 0px 14px rgba(0,0,0,0.25)` (needed since it sits directly on the busy photo, no card/backdrop behind it) — positioned absolute, roughly centered-left on desktop (`left: calc(50% - 373px)`, `top: 335px`), top-left on mobile (`left: 24px, top: 128px`).
- **7 real product photos**, each individually rotated and drop-shadowed, scattered across the mat:
  - Macbook (rotate 20.46° desktop / 49.95° mobile — rotation itself differs between breakpoints, not just position)
  - iPhone (rotate -107.41°, same both breakpoints)
  - Apple Watch (rotate -8.3°, same both breakpoints)
  - AirPods, with a small separate "Mask" detail layer (rotate -5.76°, same both breakpoints)
  - ASUS ROG Flow X16 laptop (rotate -102.55°, same both breakpoints)
  - Stylus/ASUS Pen (rotate 72.81°, same both breakpoints)
  - **QR code sticker — desktop only.** No QR code element exists anywhere in the mobile frame. (No annotation on what it links to or represents — likely decorative "leave a note"/contact-card style prop, but there's no dev/interaction annotation confirming intent. Worth asking before building it in.)
  - Each photo has its own `box-shadow` (e.g. `11px 23px 4px rgba(0,0,0,0.5)`) for a "sitting on the desk" depth effect — these vary per item, not a single shared shadow value.
- **6 "Item Tag" callouts** (one per product, no tag for the QR code): a pill label + a small circular red "Selection" dot marker, positioned near each product. Label styling:
  - Desktop: `surface.tertiary` bg, `border.tertiary` border, `radius: 12px` (`radii.lg`), padding `16px 12px`, text `16px` (`fontSizes.sm`) `fonts.sans` Regular, `text.secondary`, **UPPERCASE** product name.
  - Mobile: same colors/radius, smaller padding `12px 8px`, text `12px` (`fontSizes.xs`).
  - Exact copy (all uppercase in Figma): **MACBOOK PRO M3**, **iPHONE 16 PRO MAX** (note the lowercase "i" — literal Figma text), **ASUS ROG FLOW X16**, **APPLE WATCH SERIES 10**, **AIRPODS PRO 3RD GEN**, **ASUS PEN SA201H**.
  - Tag↔dot order alternates per item (some render dot-then-label, some label-then-dot) depending on which side of the product the tag sits — this looks deliberate (keeps the dot always pointing toward the product), not arbitrary.
- No interaction annotations found on any Desk Setup element (no hover/click spec) — appears to be a static illustrative section.

### Assets needed
7 real product photography images (Macbook, iPhone, Watch, AirPods, ROG laptop, Stylus, background mat texture) plus the QR code graphic — none of these exist in `public/` currently. All would need to be sourced/downloaded from Figma.

---

## 2. Credit cards section — differences vs. current `CreditCardsSection.tsx`

Both frames confirm the section is a genuine **redesign**, not a tweak. Title copy is unchanged ("CREDIT LINEUP" / "My **Card** collection.") — everything below it has changed.

### New: "Why use Credit Cards?" column (entirely missing from current code)
- Heading "Why use Credit Cards?" — `24px` (desktop) / `16px` (mobile), `fonts.sans` Regular, `text.primary`.
- 3 feature bullets (icon + text, `16px` `text.secondary`), exact copy:
  1. "Great returns on everyday spending, helping you earn perks."
  2. "Fraud protection on purchases and interest-free credit."
  3. "Exclusive benefits like airport lounge access, discounts, & partner offers."
- Bullet icon: 12×12px (need to inspect/download — small dot/diamond marker, same family as the diamond icon already used elsewhere on the site per `/icons/diamond.svg`, unconfirmed without a visual diff).

### New: "Card stats" block (entirely missing from current code)
- Two stat blocks, separated by a vertical divider, same visual pattern as `AboutBrief.tsx`'s count-up stats and `TravelSection.tsx`'s count-up stats:
  - **"08" / "CREDIT CARDS"** — matches `CARDS.length` (8) in current code exactly.
  - **"06" / "CARD ISSUERS"** — a new derived stat (unique issuing banks across the 8 cards: Amex, HDFC, SBI, IDFC, Axis, ICICI = 6). Not currently computed or displayed anywhere.
- Both stat numbers carry an explicit annotation: **"Add counter interaction (count from 0)"** — these need to animate as count-up numbers on scroll-into-view, same pattern as the site's other stat counters (`AboutBrief.tsx` / `TravelSection.tsx`'s `IntersectionObserver`-driven count-up).
- Number styling: `48px` `fonts.notch` Regular, `text.highlight` (red). Label: `16px` `fonts.sans` Regular, `text.tertiary`, uppercase.
- Mobile stat row is horizontally centered (`justify-content: center`); desktop is not.

### Changed: desktop card stack orientation
- **Figma's desktop stack is now VERTICAL** (cards overlap top-to-bottom, `margin-bottom: -141.154px` between them) — matching the pattern the current code already uses for *mobile only*. The current desktop implementation (`CardStack`/`DesktopCard`) fans the cards out **horizontally** (`margin-right: -190px`, side-by-side row). This is a real orientation change, not just a spacing tweak.
- The desktop stack also carries the same interaction annotation as the mobile stack already has: *"Add a card stack interaction which each card can be swiped up to reveal the card just beneath it. The swiped card will go at the back. Implement a smooth interaction."* Currently, desktop only supports click-to-cycle (`handleFrontCardClick`, front card only); the swipe gesture is mobile-only (`handlePointerDown`/`Move`/`Up`). Figma wants the swipe behavior on desktop too — the current click-to-cycle desktop interaction is a fundamentally different mechanic (front card click, translateX-based) from what the vertical Figma stack calls for (swipe-up, translateY-based, matching the existing mobile `topCardStyle()`/`handlePointerUp` logic almost exactly).
- Desktop stack container width is a **fixed `261.606px`** (`shrink-0`, not `flex: 1`), flanked on both sides by `flex: 1 0 0` text columns — a true 3-column layout, not today's 2-column (`CardStack flex:1` + `CTAColumn flex:1`).
- Column gap: Figma's 3-column row uses `gap: 80px`. Current `CardInfoContainer` uses `theme.spacing[10]` = 40px.
- Card `border-radius`: desktop Figma shows `rounded-[9.81px]` and `border-[0.464px]` — both suspiciously non-round numbers, likely a Figma scaling artifact from the node being nested inside a scaled frame rather than a deliberate ~10px/0.46px design value. Mobile Figma's cards use a clean `rounded-[12px]` + full `1px` border, matching the current code's `radii.lg` (12px) + `1px` border exactly. Worth a live Figma inspection (not just the API export) before trusting the desktop 9.81px value as intentional.
- Card order (front-most → back-most) — minor discrepancy: current code and **mobile** Figma both use `amex, marriott, phonepe, idfc, millenia, swiggy, flipkart, icici`. **Desktop** Figma's actual DOM order works out to `amex, marriott, phonepe, millenia, idfc, swiggy, icici, flipkart` — `idfc`/`millenia` swapped and `flipkart`/`icici` swapped versus everything else. Low-confidence this is deliberate (could be incidental to how the frame was authored) but flagging since it's a measurable difference.
- The `phonepe-sbi-select-black` card is rendered **rotated 180°** partway down the desktop stack (`flex-none rotate-180` wrapping the card) — appears intentional (an art-directed "flipped card" moment in the pile), not present in the current implementation at all.

### New: third column — branded Plush promo (replaces plain CTA column)
Current `CTAColumn` is just body text + a single button, no branding. Figma's third column is a real product placement:
- Heading — **new, separate from the body copy** (current code has no separate heading, just one merged sentence in `CTA_TEXT`):
  - Desktop: "Not sure which card you need?" (`24px`)
  - Mobile: "Confused which card you need?" (`16px`) — note desktop and mobile literally use **different heading copy**, not just different sizes.
- Body copy — also differs by breakpoint:
  - Desktop: "Find your right card in one click. Get your spends and preferences, and Plush will tell you exactly what I'd pick."
  - Mobile: "Not sure which card you need? Enter your spends and preferences, and Plush will tell you exactly what I'd pick." (this is word-for-word the current code's single `CTA_TEXT` constant — so the *mobile* copy matches today's code exactly; the *desktop* copy is what's actually new/different.)
- **Plush logo image** (`56px` tall, real brand lockup asset — icon + "Plush" wordmark) — not present in current code at all.
- Tagline under the logo: "Your Personalised AI Powered Credit Card Assistant" (`16px`, `text.tertiary`) — new copy, not present currently.
- Button copy is unchanged ("Find your card"), still links to `https://plush.money/in/find-your-card` (matches current `PLUSH_URL` exactly) — but current code's button text reads **"Find the right card"**, not **"Find your card"** as Figma specifies. Minor copy mismatch.
- Button sizing/radius differs by breakpoint in Figma: desktop `padding: 12px 24px`, `radius: 12px`, text `16px`; mobile `padding: 12px 16px`, `radius: 8px`, text `14px` — this actually already matches the current code's `CTAButton` (desktop) vs `MobileCTAButton` (mobile) sizing split, so no change needed there, just the copy/logo additions.

### Unchanged
- Title copy and sizing ("CREDIT LINEUP" / "My **Card** collection.") — exact match, uses the same `SectionLabel`/`SectionHeader` desktop/mobile token pattern already documented site-wide.
- The 8 credit card images themselves, their names, and the Plush CTA URL.
- Section-level gap (`40px`, title → content) and the button's per-breakpoint padding/radius/font-size.

---

## Summary checklist for a future implementation pass

- [ ] Confirm with user: is rebuilding a photographic "Desk Setup" (7 rotated product photos + tag callouts) actually wanted, given it requires sourcing 7-8 new photo assets that don't exist in `public/` at all?
- [ ] Confirm with user: what the QR code sticker (desktop-only) links to / represents before building it in
- [ ] Source/download desk product photography + background mat texture from Figma
- [ ] Add "Why use Credit Cards?" heading + 3 feature bullets to `CreditCardsSection.tsx`
- [ ] Add animated count-up "Card stats" block (08 Credit Cards / 06 Card Issuers)
- [ ] Rework desktop card stack from horizontal fan (`margin-right`) to vertical pile (`margin-bottom`), matching mobile's existing pattern
- [ ] Extend the mobile swipe-to-cycle gesture to desktop (replacing today's click-to-cycle)
- [ ] Change desktop layout from 2-column (`flex:1` + `flex:1`) to 3-column (`flex:1` + fixed `261.6px` + `flex:1`), gap 40px → 80px
- [ ] Add Plush logo image + tagline to the CTA column; fix button copy "Find the right card" → "Find your card"
- [ ] Add the desktop-specific heading/body copy (currently only the mobile copy exists in code)
- [ ] Verify the desktop-only `idfc`/`millenia` and `flipkart`/`icici` order swap and the 9.81px card radius against live Figma (not just the API export) before treating them as intentional
