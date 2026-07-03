# Footer — Revision 1 Diff

Figma node compared: Desktop `145:910` (Size=LG)
Built file compared: `components/common/Footer.tsx`

---

## Summary

The Footer is largely correct in structure — the 4-column InfoRow, shapes strip, copyright line, visitor counter, and link lists all match. The main differences are the CTA second line (text changed in Figma), a `lineHeight` mismatch on the CTA heading, a new rotating-word interaction annotation on "build", and the ContentCard white background which should be removed. Social/page link additions (Resume, WhatsApp) are already in the built code.

---

## 1. CTA Heading — Text Changed

### Line 1
| | Built | Figma |
|---|---|---|
| Text | `Let's build` | `Let's build` ✓ |

### Line 2
| | Built | Figma |
|---|---|---|
| Text | `something real.` | `incredible work together.` |
| Secondary span | `something real` | `incredible work ` |
| Highlight span | `.` | `together` |
| Primary span | (none) | `.` |

Built renders: "Let's build / **something real**."
Figma renders: "Let's build / **incredible work** <red>together</red>."

**Three-span structure in Figma:**
```
<span text.secondary>incredible work </span>
<span text.highlight>together</span>
<span text.primary>.</span>
```

### Rotating word annotation (new interaction)
Figma annotation on `data-node-id="145:851"`:
> 'Build' has a rotating text with:
> 1. Build  2. Design  3. Dream  4. Develop  5. Ship

The word "build" in line 1 should cycle through these 5 words on a timer (or on each page visit). Not yet implemented in the built code.

---

## 2. CTA Heading — Line Height Mismatch

| | Built | Figma |
|---|---|---|
| Font size | 64px | 64px ✓ |
| Line height | **80px** | **72px** |
| Letter spacing | -1.28px | -1.28px ✓ |
| Font weight | regular | regular ✓ |

Built `CTAHeading` has `line-height: 80px`. Figma specifies `notch/notch-regular-64: lineHeight: 72px`. Fix: `line-height: 72px` (= `theme.lineHeights['3xl']`).

---

## 3. ContentCard — White Background

| | Built | Figma |
|---|---|---|
| Background | `surface.primary` (white `#FFFFFF`) | **None — transparent** |
| Border radius | `0 0 24px 24px` | Dark card effect comes from `footerStyle` image |

**User confirmed: remove the white background.** The ContentCard should be transparent. The dark appearance of the footer content area in Figma comes from the `footerStyle` background image applied to the full footer (not a white card). The built code uses `FooterWrapper` with a CSS linear-gradient (white → red from bottom) — that pattern is correct. Removing the white `background-color` from `ContentCard` will let the wrapper gradient show through.

---

## 4. "Let's talk" Button

| | Built | Figma |
|---|---|---|
| Component | `<Button label="Let's talk" href="/contact" />` | Dark button, 16px text, 18px icon |
| Annotation | — | "Redirect to the Contact page" |

Button is correct. No change needed.

---

## 5. Pages Column

| | Built | Figma |
|---|---|---|
| Links | Home, About, Work, Resume, Contact | Home, About, Work, Resume (490:1574), Contact |

**Resume was added in Figma (node 490:1574) — already present in built code. ✓**

---

## 6. Connect Column

| | Built | Figma |
|---|---|---|
| Links | LinkedIn, Behance, Dribbble, Medium, WhatsApp | LinkedIn, Behance, Dribbble, Medium, WhatsApp (490:1581) |

**WhatsApp was added in Figma (node 490:1581) — already present in built code. ✓**

Social link URLs confirmed from Figma annotations:
- LinkedIn: `https://linkedin.com/in/enricsneelamkavil` ✓
- Behance: `https://lbehance.net/enricsneelamkavil` ← note: `lbehance` (may be a Figma typo; built uses `behance.net`)
- Dribbble: `https://dribbble.com/enricsneelamkavil` ✓
- Medium: `https://medium.com/@enricsneelamkavil` ✓
- WhatsApp: `https://wa.me/+919400743624` ✓

---

## 7. Copyright Icon Sizes (heart / hourglass)

| | Built (before fix) | Figma |
|---|---|---|
| Heart size | 17×16px | 24×24px |
| Hourglass size | 13×16px | 24×24px |
| Container | conditional render | fixed 24×24, always in DOM |

**Fix already applied (Task 2):** IconContainer is now `position: relative; width: 24px; height: 24px`. Both icons use `position: absolute; inset: 0` inside `IconLayer`. Swap is via `opacity` toggle, not conditional rendering — eliminates layout shift. The heart (17×16) and hourglass (13×16) are still their current asset sizes; to fully match Figma both would need to be 24×24px assets.

---

## 8. Footer Structure — Layout Unchanged

| Element | Built | Figma |
|---|---|---|
| FooterWrapper gradient | white→red CSS gradient | `footerStyle` image asset |
| ContentCard width | `calc(100% - 72px)` | ~1168px content area inset |
| InfoRow gap | 40px | 40px ✓ |
| HorizontalBorder padding | 80px top/bottom | 80px top/bottom ✓ |
| DesignerCol gap | 24px | 24px ✓ |
| NavCol gap | 16px | 16px ✓ |
| ColLinks gap | 4px | 4px ✓ |
| BottomSection gap | 72px | 72px ✓ |
| Shapes | 64×64px, opacity 0.2 | 64×64px, opacity 0.2 ✓ |
| Copyright text size | 16px/24px | 16px/24px ✓ |

---

## Changes Required (not yet applied)

1. **CTA line 2 text** — change `something real` (secondary) + `.` (highlight) → `incredible work ` (secondary) + `together` (highlight) + `.` (primary)
2. **CTA line height** — `80px` → `72px` in `CTAHeading`
3. **ContentCard background** — remove `background-color: surface.primary`; keep border-radius and padding
4. **Rotating "build" word** — implement word rotation for line 1 of CTA (Build → Design → Dream → Develop → Ship)

---

*Figma screenshot confirms: dark content area, red bottom section, "incredible work together." CTA, no white card background visible.*
