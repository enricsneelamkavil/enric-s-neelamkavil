'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Assets ──────────────────────────────────────────────────────────────────

const BG = '/about/personal/desk/desk-bg.webp'

// ─── Data ────────────────────────────────────────────────────────────────────
// All left/top/width/height values are percentages of the desk Frame's own
// box (1920×1093.5 desktop / 402×1093 mobile in Figma) — desktop and mobile
// are authored independently in Figma (e.g. the Macbook rotates 20.46° on
// desktop vs 49.95° on mobile), not a uniform scale-down of one another, so
// each product/tag carries its own desktop and mobile spot rather than a
// single shared percentage set. Shadow is applied via CSS filter: drop-shadow()
// (not box-shadow, which the Frame's overflow:hidden would clip) — values read
// from Figma's per-shape shadow effect. The QR code is baked into desk-bg.webp.

interface Spot {
  left: number
  top: number
  width: number
  height: number
  rotate: number
  shadow: string
}

interface Product {
  key: string
  src: string
  alt: string
  desktop: Spot
  mobile: Spot
}

const PRODUCTS: Product[] = [
  {
    key: 'macbook',
    src: '/about/personal/desk/macbook-pro-m3.webp',
    alt: 'MacBook Pro M3',
    desktop: { left: 71.11, top: -5.13, width: 46.89, height: 58.52, rotate: 20.46, shadow: '47px 59px 4px rgba(0,0,0,0.5)' },
    mobile: { left: 54.73, top: 19.06, width: 82.28, height: 21.51, rotate: 49.95, shadow: '5px 29px 4px rgba(0,0,0,0.5)' },
  },
  {
    key: 'iphone',
    src: '/about/personal/desk/iphone-16-pro-max.webp',
    alt: 'iPhone 16 Pro Max',
    desktop: { left: 38.62, top: -25.24, width: 16.78, height: 60.45, rotate: -107.41, shadow: '25px 21px 4px rgba(0,0,0,0.5)' },
    mobile: { left: 38.47, top: -11.22, width: 31.51, height: 23.79, rotate: -107.41, shadow: '16px 12px 4px rgba(0,0,0,0.5)' },
  },
  {
    key: 'watch',
    src: '/about/personal/desk/apple-watch-series-10.webp',
    alt: 'Apple Watch Series 10',
    desktop: { left: 45.37, top: 32.68, width: 14.01, height: 38.77, rotate: -8.3, shadow: '19px 16px 4px rgba(0,0,0,0.5)' },
    mobile: { left: 12.71, top: 29.84, width: 27.81, height: 16.09, rotate: -8.3, shadow: '12px 9px 4px rgba(0,0,0,0.5)' },
  },
  {
    key: 'airpods',
    src: '/about/personal/desk/airpods-pro-3.webp',
    alt: 'AirPods Pro 3rd Gen',
    desktop: { left: 71.14, top: 58.39, width: 20.46, height: 55.05, rotate: -5.76, shadow: '11px 23px 4px rgba(0,0,0,0.5)' },
    mobile: { left: 65.28, top: 56.79, width: 41.63, height: 23.47, rotate: -5.76, shadow: '6px 14px 4px rgba(0,0,0,0.5)' },
  },
  {
    key: 'rog',
    src: '/about/personal/desk/rog-flow-x16.webp',
    alt: 'ASUS ROG Flow X16',
    desktop: { left: -25.81, top: 25.82, width: 57.11, height: 68.90, rotate: -102.55, shadow: '80px 38px 4px rgba(0,0,0,0.5)' },
    mobile: { left: -54.70, top: 61.16, width: 106.08, height: 26.81, rotate: -102.55, shadow: '25px 24px 4px rgba(0,0,0,0.25)' },
  },
  {
    key: 'stylus',
    src: '/about/personal/desk/asus-stylus.webp',
    alt: 'ASUS Pen SA201H',
    desktop: { left: 20.19, top: 69.39, width: 14.34, height: 37.80, rotate: 72.81, shadow: '37px 20px 4px rgba(0,0,0,0.5)' },
    mobile: { left: 31.53, top: 87.12, width: 36.66, height: 20.24, rotate: 72.81, shadow: '12px 11px 4px rgba(0,0,0,0.5)' },
  },
]

interface TagSpot {
  left: number
  top: number
  order: 'tag-first' | 'dot-first'
}

interface TagItem {
  key: string
  label: string
  desktop: TagSpot
  mobile: TagSpot
}

const TAGS: TagItem[] = [
  { key: 'macbook', label: 'MACBOOK PRO M3', desktop: { left: 72.14, top: 28.09, order: 'tag-first' }, mobile: { left: 20.90, top: 22.97, order: 'tag-first' } },
  { key: 'iphone', label: 'IPHONE 16 PRO MAX', desktop: { left: 47.03, top: 15.19, order: 'dot-first' }, mobile: { left: 48.01, top: 4.76, order: 'dot-first' } },
  { key: 'rog', label: 'ASUS ROG FLOW X16', desktop: { left: 20.94, top: 51.50, order: 'dot-first' }, mobile: { left: 16.42, top: 55.35, order: 'dot-first' } },
  { key: 'watch', label: 'APPLE WATCH SERIES 10', desktop: { left: 36.98, top: 63.48, order: 'tag-first' }, mobile: { left: 26.62, top: 40.35, order: 'dot-first' } },
  { key: 'airpods', label: 'AIRPODS PRO 3RD GEN', desktop: { left: 64.95, top: 67.78, order: 'tag-first' }, mobile: { left: 41.54, top: 70.36, order: 'tag-first' } },
  { key: 'stylus', label: 'ASUS PEN SA201H', desktop: { left: 36.98, top: 89.17, order: 'dot-first' }, mobile: { left: 41.54, top: 91.03, order: 'dot-first' } },
]

// ─── Component ───────────────────────────────────────────────────────────────

type Variant = 'desktop' | 'mobile'

const DeskFrame = ({ variant }: { variant: Variant }) => (
  <Frame $variant={variant}>
    <BgImage src={BG} alt="" fill priority sizes="100vw" />

    <TitleBlock $variant={variant}>
      <Label $variant={variant}>TECH GEAR</Label>
      <Heading $variant={variant}>My Work Desk.</Heading>
    </TitleBlock>

    {PRODUCTS.map((p) => {
      const spot = variant === 'desktop' ? p.desktop : p.mobile
      return (
        <ProductPhoto
          key={p.key}
          style={{
            left: `${spot.left}%`,
            top: `${spot.top}%`,
            width: `${spot.width}%`,
            height: `${spot.height}%`,
            transform: `rotate(${spot.rotate}deg)`,
            filter: `drop-shadow(${spot.shadow})`,
          }}
        >
          <Image src={p.src} alt={p.alt} fill sizes={variant === 'desktop' ? '40vw' : '80vw'} />
        </ProductPhoto>
      )
    })}

    {TAGS.map((t) => {
      const spot = variant === 'desktop' ? t.desktop : t.mobile
      return (
        <TagWrapper
          key={t.key}
          style={{ left: `${spot.left}%`, top: `${spot.top}%` }}
        >
          {spot.order === 'tag-first' ? (
            <>
              <TagPill $variant={variant}>
                <TagLabel $variant={variant}>{t.label}</TagLabel>
              </TagPill>
              <SelectionDot aria-hidden="true" />
            </>
          ) : (
            <>
              <SelectionDot aria-hidden="true" />
              <TagPill $variant={variant}>
                <TagLabel $variant={variant}>{t.label}</TagLabel>
              </TagPill>
            </>
          )}
        </TagWrapper>
      )
    })}
  </Frame>
)

const DeskSection = () => (
  <Section>
    <DeskFrame variant="desktop" />
    <DeskFrame variant="mobile" />
  </Section>
)

// ─── Styles ──────────────────────────────────────────────────────────────────

const Section = styled.section`
  position: relative;
  width: 100vw;
  margin-left: calc(50% - 50vw);
  margin-right: calc(50% - 50vw);
  padding-left: 0;
  padding-right: 0;
`

const Frame = styled.div<{ $variant: Variant }>`
  position: relative;
  width: 100%;
  overflow: hidden;
  aspect-ratio: ${({ $variant }) => ($variant === 'desktop' ? '1920 / 1093.5' : '402 / 1093')};
  display: ${({ $variant }) => ($variant === 'desktop' ? 'block' : 'none')};

  ${mq.mobile} {
    display: ${({ $variant }) => ($variant === 'desktop' ? 'none' : 'block')};
  }
`

const BgImage = styled(Image)`
  object-fit: cover;
  object-position: center;
`

const TitleBlock = styled.div<{ $variant: Variant }>`
  position: absolute;
  z-index: 2;
  display: flex;
  flex-direction: column;

  ${({ $variant }) =>
    $variant === 'desktop'
      ? `
        left: 24.95%;
        top: 30.65%;
        width: 11.25%;
      `
      : `
        left: 24px;
        top: 11.71%;
        width: calc(100% - 48px);
      `}
`

const Label = styled.p<{ $variant: Variant }>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ $variant, theme }) => ($variant === 'desktop' ? theme.fontSizes.sm : theme.fontSizes.xs)};
  line-height: ${({ $variant, theme }) => ($variant === 'desktop' ? theme.lineHeights.normal : theme.lineHeights.tight)};
  color: ${({ theme }) => theme.colors.text.inverse};
  text-transform: uppercase;
  text-shadow: 0 0 14px rgba(0, 0, 0, 0.25);
`

const Heading = styled.h2<{ $variant: Variant }>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ $variant, theme }) => ($variant === 'desktop' ? theme.fontSizes.lg : theme.fontSizes.md)};
  line-height: ${({ $variant, theme }) => ($variant === 'desktop' ? theme.lineHeights.loose : theme.lineHeights.relaxed)};
  color: ${({ theme }) => theme.colors.text.inverse};
  text-shadow: 0 0 14px rgba(0, 0, 0, 0.25);
  white-space: nowrap;

  @media (max-width: 480px) {
    font-size: clamp(20px, 5vw, 32px);
  }
`

const ProductPhoto = styled.div`
  position: absolute;
  z-index: 1;

  img {
    object-fit: contain;
  }
`

const TagWrapper = styled.div`
  position: absolute;
  z-index: 3;
  display: flex;
  align-items: center;
  gap: 6px;
`

const TagPill = styled.div<{ $variant: Variant }>`
  display: flex;
  align-items: center;
  padding: ${({ $variant }) => ($variant === 'desktop' ? '12px 16px' : '8px 12px')};
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  white-space: nowrap;
`

const TagLabel = styled.span<{ $variant: Variant }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ $variant, theme }) => ($variant === 'desktop' ? theme.fontSizes.sm : theme.fontSizes.xs)};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`

const SelectionDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background: ${({ theme }) => theme.colors.text.highlight};
  box-shadow: 0 0 0 6px ${({ theme }) => theme.colors.text.highlight}33;
  flex-shrink: 0;
`

export default DeskSection
