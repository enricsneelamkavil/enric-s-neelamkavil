// ─────────────────────────────────────────────────────────────────────────────
// Design Tokens — sourced from Figma (node-id: 136-3016)
// File: Enric S Neelamkavil | Portfolio
// ─────────────────────────────────────────────────────────────────────────────

// ─── COLORS ──────────────────────────────────────────────────────────────────
// Color tokens extracted from Figma variables (VariableID references in nodes)

export const colors = {
  // Backgrounds
  bg: {
    primary: '#0A0A0A',       // page background (near-black)
    secondary: '#111111',     // elevated surface
    card: '#141414',          // card surface
    inverted: '#FFFFFF',      // light surface (footer CTA, tags)
  },

  // Text
  text: {
    primary: '#EDEDED',       // primary text on dark bg
    secondary: '#5C5C5C',     // secondary / muted (rgb ~36% grey — VariableID:78:192)
    muted: '#3A3A3A',         // tertiary / disabled
    inverted: '#0A0A0A',      // text on light surface
    accent: '#EDEDED',        // accent white
  },

  // Borders & strokes
  border: {
    default: '#1F1F1F',       // subtle divider
    strong: '#2E2E2E',        // card border
  },

  // Brand / accent — to be refined once Figma variables are confirmed
  accent: {
    primary: '#EDEDED',       // used for interactive highlights
  },
} as const

// ─── TYPOGRAPHY ──────────────────────────────────────────────────────────────
// Font families used in the design
// Stack Sans Headline & Stack Sans Notch are custom — served via next/font or
// a self-hosted @font-face. Instrument Serif is available on Google Fonts.

export const fonts = {
  // Primary sans — UI labels, body, nav, tags
  // CSS variable set by next/font in app/layout.tsx
  sans: "var(--font-stack-headline), 'Stack Sans Headline', system-ui, sans-serif",

  // Notch variant — display headings, stat numbers
  notch: "var(--font-stack-notch), 'Stack Sans Notch', system-ui, sans-serif",

  // Text variant — body copy, longer prose passages
  text: "var(--font-stack-text), 'Stack Sans Text', system-ui, sans-serif",

  // Serif — editorial headings, section titles
  serif: "var(--font-instrument-serif), 'Instrument Serif', Georgia, serif",
} as const

// Font weight scale (pulled from Figma text nodes)
export const fontWeights = {
  light:   300,
  regular: 400,
  medium:  500,
  bold:    700,
} as const

// Font size scale (px → rem, base 16px)
// Raw Figma values: 12, 16, 24, 32, 40, 48, 64
export const fontSizes = {
  xs:   '0.75rem',   // 12px  — labels, tags, copyright, nav headings
  sm:   '1rem',      // 16px  — body text, award titles, subtitles
  md:   '1.5rem',    // 24px  — visitor counter
  lg:   '2rem',      // 32px  — section headings (serif), interest items
  xl:   '2.5rem',    // 40px  — heading 3 / editorial titles (serif)
  '2xl': '3rem',     // 48px  — stat numbers
  '3xl': '4rem',     // 64px  — hero display title (notch), footer CTA (serif)
} as const

// Line height scale (px values from Figma, mapped to unitless ratio names)
// Raw: 16, 20, 24, 32, 40, 48, ~49.6, 52, 72, 80
export const lineHeights = {
  tight:   '1rem',     // 16px  — xs text, single-line labels
  snug:    '1.25rem',  // 20px  — (reserved)
  normal:  '1.5rem',   // 24px  — body / sm text
  relaxed: '2rem',     // 32px  — md text
  loose:   '2.5rem',   // 40px  — section heading serif
  xl:      '3rem',     // 48px  — stat numbers (1:1 ratio)
  '2xl':   '3.25rem',  // 52px  — editorial h3 (intrinsic %)
  '3xl':   '4.5rem',   // 72px  — hero display title
  '4xl':   '5rem',     // 80px  — footer CTA serif
} as const

// Letter spacing (from Figma, em converted from px at each font-size)
// Raw Figma values: 0, -1.28px, -0.64px, +0.66px, +2.88px
export const letterSpacings = {
  tightest: '-0.02em',   // -1.28px @ 64px  — hero title, footer CTA
  tight:    '-0.02em',   // -0.64px @ 32px  — kept same ratio
  normal:   '0em',       // 0px              — most text
  wide:     '0.04125em', // +0.66px @ 16px   — (reserved)
  widest:   '0.12em',    // +2.88px @ 24px   — visitor counter uppercase
} as const

// ─── SPACING ─────────────────────────────────────────────────────────────────
// 4px base grid. All values traced from Figma layout properties (padding, gap).

export const spacing = {
  0:    '0',
  1:    '0.25rem',   // 4px
  2:    '0.5rem',    // 8px   — nav padding, button icon gap, tag padding-y
  3:    '0.75rem',   // 12px  — tag padding-x, text container gap, stat block gap
  4:    '1rem',      // 16px  — tag padding-x (wider), section interest padding-y
  5:    '1.25rem',   // 20px  — (reserved)
  6:    '1.5rem',    // 24px  — landing gap, article padding, logo section gap
  8:    '2rem',      // 32px  — stats container gap
  10:   '2.5rem',    // 40px  — landing>about gap, feature padding, works header gap
  12:   '3rem',      // 48px  — interest scroller gap
  15:   '3.75rem',   // 60px  — (reserved)
  20:   '5rem',      // 80px  — landing section gap, footer vertical padding
  30:   '7.5rem',    // 120px — top-level section gap (Content frame gap)
  80:   '20rem',     // 320px — footer horizontal padding (desktop gutter)
} as const

// ─── LAYOUT ──────────────────────────────────────────────────────────────────
// Max-width and gutter for content-width sections

export const layout = {
  // The 'Content' inner frame is 1168px wide on a 1920px canvas
  maxWidth:       '1168px',  // main content column width
  canvasWidth:    '1920px',  // full bleed canvas width
  sectionGap:     '120px',   // vertical gap between top-level sections
  footerGutter:   '320px',   // footer left/right padding
} as const

// ─── BORDER RADIUS ───────────────────────────────────────────────────────────
// Clean rounded values from Figma (sub-pixel values normalised to nearest int)

export const radii = {
  none:  '0',
  xs:    '2px',    // subtle (dividers, thin chips)
  sm:    '6px',    // tags, small buttons
  md:    '8px',    // cards, inputs
  lg:    '12px',   // feature cards
  xl:    '16px',   // large cards
  '2xl': '18px',   // pill / welcome tag
  '3xl': '24px',   // feature article container
  full:  '9999px', // fully rounded (pill)
} as const

// ─── THEME OBJECT ────────────────────────────────────────────────────────────
// Assembled theme for use with styled-components ThemeProvider

const theme = {
  colors,
  fonts,
  fontWeights,
  fontSizes,
  lineHeights,
  letterSpacings,
  spacing,
  layout,
  radii,
} as const

export type Theme = typeof theme
export default theme
