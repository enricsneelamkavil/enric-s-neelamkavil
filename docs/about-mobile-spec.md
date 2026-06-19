# About Page — Mobile Spec (284:834)

**Frame:** 402px viewport · 24px horizontal padding → 354px usable width  
**Page container:** `flex-col gap-[72px] items-center pt-[40px] px-[24px]`  
**Source:** Figma node 284:834 — fetched fresh 2026-06-19

---

## 1. IntroSection (284:836–843)

### Profile Section container
`flex-col gap-[24px] items-center w-full`

### Text Container (title + subtitle)
| Token | Figma | Current | Fix |
|---|---|---|---|
| Title font-size | **32px** (Notch Medium, tracking -0.64px) | `fontSizes['2xl']` = 48px | → `fontSizes.lg` (32px) |
| Title line-height | **40px** | `lineHeights['2xl']` (56px) | → 40px |
| Subtitle font | Headline Regular ✓ | Headline Regular ✓ | — |
| Subtitle font-size | **12px**, leading-16px | `fontSizes.sm` = 16px | → `fontSizes.xs` |
| Text align | center ✓ | center ✓ | — |

### Tab Navigation (mode switch row)
`flex gap-[16px] items-center`

| Token | Figma | Current | Fix |
|---|---|---|---|
| Row gap | **16px** | `spacing[3]` = 12px | → `spacing[4]` (16px) |
| Label font-size | Notch Bold, **16px**, leading-24px ✓ | `fontSizes.sm` = 16px ✓ | — |
| Label active color | highlight (#e8342a) ✓ | ✓ | — |
| Toggle total slot size | **24px × 24px** per slot | 40px × 40px knob | needs mobile size override |

**Toggle note:** desktop knob = 40px, mobile slot = 24px. Arrow icon inside is 16px. Pill total width ≈ 58px (4+24+2+24+4). Current pill ≈ 100px. Add `mq.mobile` size overrides on `Pill`, `Knob`, and `Slot` in `ModeToggle.tsx`.

---

## 2. ProfileImage (284:844)

### Mobile layout
No floating icons (hidden on `tabletDown` ✓). Photo centered:
- Circular masked profile photo: **~257px × 257px** (exact: 256.756px)
- Shadow stub below: h=28.6px, w=128.7px, ml=68.17px — baked into `profile-group.png`, no separate element needed

| Property | Figma | Current | Fix |
|---|---|---|---|
| PhotoGroup width | **min(257px, 100%)** | `min(300px, 100%)` | → `min(257px, 100%)` |
| Banner centered ✓ | flex + justify-center ✓ | — | — |
| Icons | hidden ✓ | hidden on tabletDown ✓ | — |

---

## 3. AboutDescription (284:849)

### Mobile structure
Title → bio → highlights stacked (no side-by-side). Already `flex-direction: column` on mobile ✓. **Gaps are wrong.**

### Gap corrections
| Gap | Figma | Current | Fix |
|---|---|---|---|
| Section gap (title → content) | **12px** | `spacing[10]` = 40px on mobile | → 12px on `mq.mobile` |
| ContentRow gap (bio → highlights) | **40px** | `spacing[8]` = 32px on mobile | → `spacing[10]` (40px) |

### Bio paragraph
Headline Light, 16px, leading-24px — matches current ✓

### Highlights row values (mobile only — drop to 12px)
| Component | Figma | Current | Fix |
|---|---|---|---|
| ValueLight font-size | **12px** | `fontSizes.sm` = 16px | → `fontSizes.xs` on `mq.mobile` |
| ValueRegular font-size | **12px** | `fontSizes.sm` = 16px | → `fontSizes.xs` on `mq.mobile` |
| RowLabel font-size | 12px ✓ | `fontSizes.xs` = 12px ✓ | — |

---

## 4. Journey (284:885) — COMPLETELY DIFFERENT ON MOBILE

Desktop: shimmer bullet → logo → role → date tag → 4 scrollable text columns  
Mobile: **vertical stacked** — no bullets before role, no date tags, 2 bullets per entry, CSS diamond replaces SVG bullet assets

### Container
`flex-col gap-[40px] w-[354px]`  
Inner Journey Section: `flex-col gap-[32px]`

### Entry structure on mobile
```
Role row         flex gap-[16px] items-start
  ├── Company logo (26×28px UST / 28×28px FunDesigns)
  └── Role title  Notch Medium, 24px, leading-32px, text-primary, nowrap

Bullet row       flex gap-[12px] items-start w-full
  ├── Diamond    outer size-[11.314px] (= 8px × √2)
  │              inner: 8px sq, rotate(-45deg), bg-highlight, border-radius 2px
  └── Text       Headline Light, 16px, leading-24px, text-tertiary (#a3a3a3)

(second bullet — same structure)
```

### Per-entry bullet count
Only **2 bullets per entry** on mobile. UST: columns[0] + columns[1]. FunDesigns: columns[0] + columns[1].

### Removed on mobile
- ❌ Shimmer/container SVG bullet before role row  
- ❌ Date tags  
- ❌ Connector line between entries  
- ❌ Bullets 3 and 4 per entry  
- ❌ Horizontal 4-column scrollable layout  

### Gap summary
| Gap | Value |
|---|---|
| Title block → journey section | 40px |
| Between all items within journey section | 32px |
| Diamond bullet → text (within bullet row) | 12px |
| Logo → role title (UST row) | 16px |
| Logo → role title (FunDesigns row) | 24px |

---

## 5. MyTools (284:872)

### Container spec
`flex-wrap gap-[8px] p-[12px] rounded-[12px] w-[304px]`  
bg surface-tertiary · border border-tertiary · `content-start items-start`  
Centered via `margin: 0 auto`

| Property | Figma | Current | Fix |
|---|---|---|---|
| Container width | **304px** (centered) | `width: 100%` | → 304px, margin: 0 auto |
| Container padding | **12px all sides** | `spacing[3]` vertical, 0 horizontal | → `padding: 12px` |
| Container gap | **8px** ✓ | `spacing[2]` = 8px ✓ | — |
| Container border-radius | **12px** ✓ | `radii.lg` = 12px ✓ | — |
| Icon size | **40px × 40px** | 52px | → 40px fixed |
| RoundedBox border-radius | 12px ✓ | 12px ✓ | — |

### Math verification
`304 - 2×12(padding) = 280px usable`  
`6 × 40px + 5 × 8px(gap) = 280px` ✓ — exactly 6 per row, 2 rows for 12 icons

---

## 6. AwardShelf (284:909)

| Property | Figma | Current | Fix |
|---|---|---|---|
| Section label text | **"ACHIEVEMENTS"** | "Recognition" | → `mq.mobile` label override |
| SectionHeader font-size | **24px, leading-32px** | no mobile override (desktop size) | → 24px on `mq.mobile` |
| Awards row gap | **24px** | 32px on mobile | → 24px |
| Seal image size | **120×120px** | GarlandWrapper 152×120px | → 120×120 on mobile |
| Card width | 212px ✓ | 212px ✓ | — |
| Award name | 16px Notch Medium ✓ | `fontSizes.sm` = 16px ✓ | — |
| Award subtitle | 12px Headline Light ✓ | `fontSizes.xs` = 12px ✓ | — |

---

## 7. ProfessionalTimeline — Mobile (284:906)

Already implemented in `ProfessionalTimelineMobile.tsx`. Figma confirms:
- Container: `flex gap-[8px] items-start w-[354px]` — total height ~1306px
- Left column (top events): 100px wide, 6 events, `justify-between`, `padding-top: 100px`
- Center photo strip: 137px wide, rotated -90deg trick, 1304px horizontal strip with shape mask
- Right column (bottom events): 100px wide, 6 events, `justify-between`, `padding-bottom: 100px`
- Event title: Notch Medium, 16px, leading-24px, text-primary
- Event sub: Headline Regular, 12px, leading-16px, text-highlight
- Event desc: Headline Light, 10px, leading-14px, text-secondary
- Internal event gap: 8px

---

## Implementation Priority

### High impact (visually obvious)
1. **Journey** — structure is entirely wrong on mobile; needs complete mobile layout rewrite
2. **IntroSection** — page title 48px→32px is very noticeable
3. **MyTools** — icon 52px→40px + container width 100%→304px

### Medium impact
4. **AboutDescription** — outer gap 40px→12px (too much breathing room between title and bio)
5. **AboutDescription** — row value text 16px→12px on mobile
6. **ProfileImage** — photo width 300px→257px

### Lower impact
7. **AwardShelf** — label text, seal size, row gap
8. **IntroSection** — subtitle 16px→12px  
9. **ModeToggle** — 40px→24px size on mobile
