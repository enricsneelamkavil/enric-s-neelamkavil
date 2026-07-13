# Contact Page — Figma vs. Built Code

Comparison of the fresh Figma read (Desktop `359:1468`, Mobile `359:1033`, fetched live) against the currently built `app/contact/page.tsx` + `components/contact/*`. No code has been changed — this is a findings report only.

**Headline finding:** the Figma file has been substantially redesigned since this page was last built. It is now a **single-column** page (form → map → social links → global footer), not the current **two-column sticky layout** (form left, info sidebar right). Three whole components built for this page no longer have any corresponding section in Figma, and one brand-new decorative section (a world map with floating avatar images) has been added that doesn't exist in code at all.

---

## 1. Sections added or removed

### Removed from Figma (no longer exist in the design, but are currently built and rendered)
- **`DirectContact.tsx`** ("Reach out direct." — Based/Trivandrum + live IST clock, Email `mailto:`, Phone/WhatsApp `wa.me` link). Zero trace of this content (no "Based", "Trivandrum", "wa.me", or IST-clock markup) anywhere in the fresh Figma dump for either frame.
- **`Services.tsx`** (dark card, "What I take on." — 4 numbered rows: Website design / App design / Dashboard design / UX & branding). Zero trace of this content (no "take on", "Website design", numbered rows) in Figma.
- **`EmailFallback.tsx`** (dark card, "If forms aren't your thing" + email + agent note). Zero trace in Figma.
- The **two-column sticky layout** itself (`TwoCol` / `LeftCol` sticky / `Divider` / `RightCol` in `app/contact/page.tsx`) — Figma's whole content column is a single 1168px-wide flex stack; there is no sidebar/right-column at any point in the tree.

  **Net content-loss consequence:** if these three components are actually removed, the direct email address, phone/WhatsApp link, and physical location (Trivandrum) disappear from the *page-specific* content entirely — the only email left is Enric's global site footer (`REACH OUT` column), which is a shared/global component outside `components/contact/`. **Worth confirming with the user this is intentional** before deleting anything, since it's a meaningful drop in contact-method redundancy.

### Added in Figma (no corresponding component exists yet)
- **"Map with images" section** — a brand-new decorative block sitting directly between the page header and the enquiry form. Not present in code at all today.
  - World-map dot-pattern SVG background (desktop 652×362px, mobile 272×151px, full width scaled down ~2.4×)
  - 9 small rounded-square images (40×40px desktop / ~16.7×16.7px mobile, `border-radius: 16px` desktop / `~6.7px` mobile) scattered at absolute positions over the map, each with a distinct subtle linear-gradient vignette overlay (mostly white↔red fades at varying angles) sitting under an `object-fit: cover`/`object-position: bottom` photo
  - **Open question:** no annotations or labels indicate what these 9 images represent (client avatars? team collaborators? testimonial photos?). Real image assets would be needed and none currently exist in `public/`. This needs a content/asset-sourcing decision before implementation.

### Unchanged sections (still present in both Figma and code)
- Page header block (**copy/structure changed — see §2**)
- Enquiry form (**field order/grouping changed — see §2/§4**)
- "Find me on the internet" social links section (**missing label — see §2**)

---

## 2. Design changes to existing sections

### Page Header (`components/contact/PageHeader.tsx`)
Completely different content and structure from what's currently built:

| | Currently built | Figma (fresh) |
|---|---|---|
| Label row | none | `CONTACT` label + 12×12 gradient agent icon (pink→red→yellow) |
| Title | "Contact Me." | "let's make **wonders**" (`let's make` muted gray, `wonders` default) |
| Subtitle | "Let's talk" | none |

The current `components/contact/PageHeader.tsx` is a bespoke one-off component. Figma's new header exactly matches the **existing shared `components/shared/PageHeader.tsx`** component already used on About/Works/Resume — including the label+icon row and, notably, its already-implemented (and otherwise unused-elsewhere-at-this-exact-size) `3.5rem`/56px hardcoded line-height for the 48px desktop title, which matches Figma's `text-[48px] leading-[56px]` precisely. **Recommendation for the eventual implementation: reuse `components/shared/PageHeader.tsx` directly** (`label="CONTACT"`, `titleBefore=""`, `titleMuted="let's make "`, `titleAfter="wonders"`, no `subtitle`) instead of maintaining a second bespoke header component — no new styling work would be needed, it already matches pixel-for-pixel.

### Enquiry Form (`EnquiryForm.tsx`)
- **Field order is different.** Figma order top→bottom: **Name + Email + Budget + When (all 4 fields in one row)** → Brief → "WHAT ARE YOU HERE FOR?" tags → Submit. Currently built order: tags **first** → Name+Email row → Budget+When row (separate row) → Brief → Submit. The tags block needs to move from the top of the form to just above the submit button, and Budget/When need to join the same row as Name/Email on desktop.
- **Chip content differs**: Figma shows `WEBSITE, APPLICATION, UX AUDIT, DESIGN SYSTEM, TALK SESSION, BRAND IDENTITY, SOMETHING ELSE`. Currently built `CHIPS` array has **`DASHBOARD`** where Figma has **`BRAND IDENTITY`** — everything else matches.
- **Submit button has an extra element not in Figma.** The built `SendButton` includes an `ArrowPill` (18×18 circular icon with an arrow SVG) after the "Send it" label. Figma's button is text-only ("Send it", no icon).
- **Done-state copy differs.** Figma's interaction annotation for the response notice says the text should change to *"Thanks! I'll get back to you in under 24h on weekdays."* Currently built `DoneSub` says *"I'll get back to you in under 24h on weekdays. In the meantime, there's a podcast you might like →"* — an extra sentence (podcast plug) not specified in Figma.
- **Done-state presentation differs in scope.** Figma's annotation describes a lighter-weight change ("Changes to 'Message sent' + tick icon when clicked") suggesting the button itself swaps label + gets a tick icon. What's currently built replaces the *entire card* with a large icon (80×80 red rounded square) + heading + subtext. This may be an intentional enhancement, but it's a bigger UI change than the Figma annotation calls for — worth confirming which behavior is wanted.
- Budget field's example/placeholder wording: Figma shows `Upto $5k`; built `BUDGET_OPTIONS` starts with `Under $5k` (functionally equivalent, but worth a copy pass for consistency).

### "Find me on the internet" (`Elsewhere.tsx`)
- **Missing label.** Figma has a small tertiary-color label **"STALK ME? NAH"** above the "Find me on the internet." heading (same label+heading pattern as `EnquiryForm`'s `SectionLabel`+`SectionHeader`). The current `Elsewhere.tsx` renders only a bare `<Heading>` — no label at all, and it doesn't use the shared `SectionLabel`/`SectionHeader` components the rest of the site uses for this pattern.
- **Card width changes as a consequence of the layout change** (see §4) — same visual card design (icon, shadow, name/handle, border, radius all match Figma exactly), just currently constrained to a 500px sidebar column instead of the full 1168px width Figma now gives it.
- Platform list, order, and per-card content (icon/name/handle) all match exactly — no diff there.

---

## 3. Typography changes

- **Page header title line-height**: Figma wants 48px/56px desktop (already solved — see shared `PageHeader.tsx`'s existing `3.5rem` hack) and 32px/40px mobile — no new token needed, just needs the shared component to be reused instead of the bespoke one.
- **Input border color is different on mobile.** Figma's desktop inputs use `border.tertiary` (`#e0e0e0`), matching current code — but Figma's **mobile** inputs (Name/Email/Budget/When/Brief) use a lighter, hardcoded `#f1f1f1`, not the `border.tertiary` token. Currently, `TextInput`/`StyledSelect`/`BriefContainer` use the same `border.tertiary` color at every breakpoint — there's no mobile-specific lighter border today.
- **Chevron icon size changes on mobile.** Figma's Budget/When dropdown chevron is 14×14 on desktop and **16×16 on mobile**. The built `ChevronSvg` is hardcoded to 14×14 with no responsive variant.
- Everything else — chip label sizing (`fontSizes.xs`/12px uppercase), field labels (12px notch light uppercase), section label/header pairing (16px/32px desktop, 12px/24px mobile) — matches the established site-wide convention and the current implementation exactly. No other font-size/weight/line-height mismatches found.

---

## 4. Spacing/layout changes

- **Top-level page architecture changes from two-column to single-column.** Figma's content stack (desktop) is: PageHeader (gap 80 to next) → \[Map + Enquiry Section\] → Elsewhere Section, all inside one `gap-[80px]` flex column, itself inside a `gap-[120px]` flex column with the global Footer as the only other sibling. There is no sticky left column, no 1px vertical divider, and no fixed-500px right column anywhere in the design.
- Both the outer `gap: 120px` (`PageSections`) and the header-to-form `gap: 80px` (`FormGroup`) in the currently built `app/contact/page.tsx` already match Figma's top-level spacing — it's specifically the **contents inside** that group (the two-column split) that no longer matches.
- **Enquiry form internal spacing already matches**: `Enquiry Container` gap 40px (title→details) = current `Card` gap (`theme.spacing[10]`); `Details Section` gap 24px = current `Form` gap (`theme.spacing[6]`); Brief container total height 124px (16 label + 8 gap + 100 input) = matches current `BriefContainer` math exactly. No changes needed here — only the *ordering/grouping* of children, not the gap values themselves.
- **Elsewhere section card sizing changes as a direct result of dropping the sidebar** — each `PlatformCard` will roughly double in width once it's laid out across the full 1168px content width instead of a 500px column (2 cards per row either way, but the row itself gets much wider).
- **Map section** has no explicit gap value shown between it and the enquiry form's title block in the exported Figma code (the parent `Container` has no `gap-*` class) — worth confirming the exact spacing visually once that section is actually built, since it can't be read precisely from the export.

---

## 5. New components needed

1. **Map-with-avatars component** (no name reserved yet) — world map SVG + 9 absolutely-positioned, individually-gradient-overlaid avatar images. Needs real image assets sourced/decided before it can be built (see open question in §1).
2. **Nothing else structurally new** — the rest of the redesign is reordering/removing existing sections and reusing the already-built shared `PageHeader.tsx`, not new component types.

---

## 6. Mobile differences (`359:1033`)

- Same single-column stacking order as desktop: PageHeader → Map → Enquiry Form (fields in the same Name→Email→Budget→When→Brief→Tags→Submit order, just fully stacked one-per-row rather than any row grouping) → "Find me on the internet" → Footer.
- Map section shrinks to 272×151px, images scale down to ~16.7×16.7px with proportionally smaller corner radius (~6.7px vs 16px desktop) — same relative composition, just scaled.
- Page header title mobile: 32px/40px (`fontSizes.lg`/`lineHeights.loose`) — already exactly matches the shared `PageHeader.tsx`'s mobile styles, and the enquiry title mobile size (24px, `text-[24px] leading-[32px]`) matches the existing `SectionHeader` mobile convention (`fontSizes.md`/`lineHeights.relaxed`) used elsewhere on the site.
- **Input border color** (see §3) is lighter (`#f1f1f1`) on mobile specifically — this is a mobile-only visual difference, not present on desktop.
- **Chevron icon size** bumps to 16×16 on mobile (vs 14×14 desktop) — also mobile-specific.
- Submit button + response notice stack the same way already supported by the current responsive `ResponseRow`/`SendButton` mobile styles — no new mobile-specific layout issue there beyond the icon/copy differences already noted in §2.
- No responsive differences found for the "Find me on the internet" section beyond what's already implemented (`GridRow` already stacks to a column on mobile, matching Figma).

---

## Summary checklist for a future implementation pass

- [ ] Confirm with user: is removing `DirectContact.tsx`, `Services.tsx`, and `EmailFallback.tsx` actually intended, given it drops direct email/phone/location content from the page?
- [ ] Confirm with user: what do the 9 map avatar images represent, and source the actual image assets
- [ ] Replace bespoke `components/contact/PageHeader.tsx` usage with the shared `components/shared/PageHeader.tsx` (label="CONTACT", titleMuted="let's make ", titleAfter="wonders")
- [ ] Reorder `EnquiryForm.tsx`: tags block moves from top to just above submit; Budget+When join Name+Email in a single desktop row
- [ ] Fix chip content: swap `DASHBOARD` → `BRAND IDENTITY`
- [ ] Remove (or confirm keeping) the `ArrowPill` icon in the submit button
- [ ] Reconcile done-state copy/behavior with Figma's simpler annotation
- [ ] Add missing "STALK ME? NAH" label above `Elsewhere.tsx`'s heading, using `SectionLabel`
- [ ] Rebuild `app/contact/page.tsx` as a single-column layout (drop `TwoCol`/`LeftCol`/`Divider`/`RightCol`)
- [ ] Add mobile-specific lighter input border (`#f1f1f1`) and larger chevron (16px) if pursuing full Figma fidelity
