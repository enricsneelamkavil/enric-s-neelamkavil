# Resume Page — Revision 1 Diff

Figma nodes compared: Desktop `410:2112` · Mobile `306:1320`
Built files compared: `app/resume/page.tsx` · `components/resume/`

---

## Summary of Changes

The Figma revision is a full redesign of the Resume page. The functional Toolbar (zoom/print) and dark DownloadSection card have been removed entirely. The page is now minimal: a centered header block with the PDF card below it, red-glow shadow on the card, footer underneath. Download CTA moves into the header.

---

## 1. PageHeader — Complete Redesign

### Title
| | Built | Figma |
|---|---|---|
| Text | `Resume.` | `sure, let's keep it formal` |
| Secondary span | `.` in `text.secondary` | `sure,` in `text.secondary` |
| Font | Notch Medium | Notch Medium |
| Desktop size | 64px / 72px (`fontSizes['3xl']`) | **48px / 56px** (`fontSizes['2xl']`) |
| Mobile size | 32px / 40px | 32px / 40px (unchanged) |
| Letter spacing | `letterSpacings.tightest` | `-0.96px` (desktop) / `-0.64px` (mobile) |

### Label row (new — above title)
- Figma adds a label row above the title: diamond bullet dot (12×12px) + "RESUME" text
- Text: `fontSizes.xs` (12px) / `lineHeights.tight` (16px), `fonts.sans` Light, `text.secondary`
- Gap between label row and title: **12px** (not the standard 0px SectionLabel gap)

### Subtitle
| | Built | Figma |
|---|---|---|
| Text | "The one pager" | "For recruiters, hiring managers, and anyone who prefers the short version." |
| Font | Sans Regular | Sans Light |
| Size | 16px / 12px mobile | 16px desktop / 16px mobile |
| Max-width | none | **408px desktop / 320px mobile** |
| Alignment | center | center |

### Download button (NEW — moved into header)
- Now lives directly inside the header section, replacing the old DownloadSection
- Desktop: `surface.inverse` bg, `radii.lg` (12px), `padding: 12px 24px`, font 16px Regular, external/download icon 18×18px
- Mobile: same bg, `radii.md` (8px), `padding: 12px 16px`, font 14px Regular, icon 16×16px
- Is an `<a href="/resume.pdf" download>` link (annotation: "Should trigger a download of the uploaded pdf.")

---

## 2. Toolbar — REMOVED

**Built:** Container with PDF filename, page count, file size, paper size (left side) + zoom minus/label/plus controls + print button (right side, desktop only). Also exported `ZOOM_MIN`, `ZOOM_MAX`, `ZOOM_STEP` constants.

**Figma:** Not present. Toolbar is completely gone from the redesign.

**Consequence:** The `zoom` state in `page.tsx`, `onZoomIn`/`onZoomOut` handlers, and the `zoom` prop on `ResumeCanvas` are all dead code.

---

## 3. DownloadSection — REMOVED

**Built:** Dark `surface.inverse` card with:
- "TAKE IT WITH YOU" label + "Download the Resume." heading + "Last updated June 2026" date
- Download button (PDF link) + Email Enric button (`mailto:`)
- Max-width 1168px, padding 48px desktop / 24px mobile

**Figma:** Not present. The download CTA is now a single button in the header (see §1 above). Email Enric button is gone.

---

## 4. ResumeCanvas / PDF Card — Shadow + Container Changed

### Canvas wrapper
| | Built | Figma |
|---|---|---|
| Container bg | `surface.tertiary` (gray `#f7f7f7`) | **None** — no gray container |
| Container padding | 80px vertical | **None** |
| Border radius | `radii.xl` (16px) | Not applicable |
| Max-width | 1168px | Not applicable |

The gray canvas wrapper is **removed**. The PDF card sits directly in the page flow with no surrounding container.

### PDF card
| | Built | Figma |
|---|---|---|
| Desktop width | 820px | 820px (unchanged) |
| Desktop height | 1160px (explicit, zoom-driven) | 1160px |
| Desktop shadow | `0px 30px 60px -20px rgba(0,0,0,0.25)` | **`0px 0px 250px 26px rgba(232,52,42,0.15)`** (red glow) |
| Desktop border-radius | 12px | 12px |
| Mobile width | `window.innerWidth - 80` | **300px fixed** |
| Mobile height | auto | ~424px |
| Mobile shadow | `0px 12px 24px -8px rgba(0,0,0,0.25)` | **`0px 0px 50px 5px rgba(232,52,42,0.15)`** (red glow) |
| Mobile border-radius | 5px | **8px** |
| Zoom CSS transform | `scale(zoom/100)` | **Not applicable — zoom removed** |

---

## 5. Page Structure — Restructured

### Old structure
```
PageSections (pt: 140px desktop / 6rem tablet / 40px mobile)
  HeaderGroup (gap: 80px)
    PageHeader                    ← title + subtitle only
    DetailsGroup (gap: 40px)
      Toolbar                     ← removed
      ResumeCanvas (gray box)     ← changed
      DownloadSection (dark card) ← removed
```

### New structure (Figma)
```
PageSections (pt: 140px desktop / 40px mobile)
  ResumeHeader (flex-col, gap: 80px desktop / 40px mobile, pb: 80px desktop / 32px mobile)
    ResumeContainer (flex-col, gap: 24px desktop / 32px mobile, items-center)
      PageHeader block
        LabelRow (diamond bullet + "RESUME" text, gap: 8px)
        Title ("sure, let's keep it formal")
        — gap 12px between LabelRow and Title —
      Subtitle text (408px desktop / 320px mobile)
      Download button
    PdfCard (820px desktop / 300px mobile, red glow shadow, no wrapper)
  Footer (120px gap from ResumeHeader on desktop — handled by gap on PageSections)
```

---

## 6. Zoom System — REMOVED

`page.tsx` currently manages zoom state and passes it through:
- `useState(100)` → can be deleted
- `onZoomIn` / `onZoomOut` handlers → can be deleted
- `ZOOM_MIN`, `ZOOM_MAX`, `ZOOM_STEP` imports from Toolbar → Toolbar file can be deleted
- `zoom` prop on `<ResumeCanvas>` → `ResumeCanvas` and `ResumeCanvasClient` props interface simplifies

`ResumeCanvasClient.tsx`: the `CANVAS_PADDING_V` constant and `canvasHeight` calculation can be removed. The `$scale` prop on `PdfCard` and `transform: scale()` can be removed.

---

## 7. Typography Details (Figma spec)

| Token | Desktop | Mobile |
|---|---|---|
| Label ("RESUME") | Sans Light 16px / 24px | Sans Light 12px / 16px |
| Label dot | 12×12px red diamond | 12×12px red diamond |
| Title | Notch Medium 48px / 56px | Notch Medium 32px / 40px |
| Subtitle | Sans Light 16px / 24px | Sans Light 16px / 24px |
| Button text | Sans Regular 16px / 24px | Sans Regular 14px / 18px |
| Button icon | 18×18px | 16×16px |

---

## 8. Components to Delete

- `components/resume/Toolbar.tsx` — entire file removed
- `components/resume/DownloadSection.tsx` — entire file removed

## 9. Components to Update

- `components/resume/PageHeader.tsx` — full rewrite: new title, label row, subtitle, download button
- `components/resume/ResumeCanvas.tsx` / `ResumeCanvasClient.tsx` — remove zoom prop/state; remove gray canvas container; update PDF card shadow to red glow; fix mobile dimensions
- `app/resume/page.tsx` — remove zoom state; remove Toolbar + DownloadSection imports; simplify structure

## 10. ResumeCanvas.tsx Loading Placeholder

Current placeholder is a `600px` tall gray div. With no canvas wrapper in the new design, the placeholder should be a `1160px` tall white card with the red glow shadow (or a transparent div matching PDF card dimensions). On mobile: `424px` tall, `300px` wide.

---

*Figma screenshot confirms: no Toolbar, no DownloadSection, red glow on PDF card, conversational title, download button in header.*
