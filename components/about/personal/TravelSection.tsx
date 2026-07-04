'use client'

import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Types ────────────────────────────────────────────────────────────────────

type CardColor = 'tertiary' | 'highlight' | 'primary' | 'secondary'
type CardBorder = 'none' | 'highlight' | 'inverse' | 'secondary'

interface CountryDef {
  name: string
  label: string
  code: string
  colorKey: CardColor
  borderKey: CardBorder
  radius: number
  rotation: number
  ringType?: 'india' | 'oman'
}

// ─── Data ────────────────────────────────────────────────────────────────────

const COUNTRIES: CountryDef[] = [
  { name: 'INDIA',     label: 'HOME', code: 'COK', colorKey: 'tertiary',  borderKey: 'none',      radius: 12, rotation: -5, ringType: 'india' },
  { name: 'QATAR',     label: '2018', code: 'DOH', colorKey: 'highlight', borderKey: 'highlight', radius: 12, rotation:  5 },
  { name: 'SINGAPORE', label: '2024', code: 'SIN', colorKey: 'primary',   borderKey: 'inverse',   radius:  8, rotation: -5 },
  { name: 'MALAYSIA',  label: '2024', code: 'KUL', colorKey: 'highlight', borderKey: 'highlight', radius: 64, rotation:  5 },
  { name: 'VIETNAM',   label: '2025', code: 'HAN', colorKey: 'secondary', borderKey: 'secondary', radius: 24, rotation: -5 },
  { name: 'OMAN',      label: '2025', code: 'MCT', colorKey: 'highlight', borderKey: 'none',      radius: 56, rotation:  5, ringType: 'oman'  },
]

const STAT_TARGETS = [6, 55, 2]

const fmtDesktop = (i: number, v: number) => {
  if (i === 0) return String(v).padStart(2, '0')
  if (i === 1) return v >= 50 ? '50+' : String(v)
  return `${v}%`
}

const fmtMobile = (i: number, v: number) => {
  if (i === 0) return String(v).padStart(2, '0')
  if (i === 2) return `${v}%`
  return String(v)
}

// ─── Inline SVG Icons ─────────────────────────────────────────────────────────

const SparkleIcon = () => (
  <svg width="12" height="12" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M6.85297 10.5376L4.83983 12.5552C4.75129 12.6489 4.65413 12.6942 4.54834 12.6912C4.44255 12.6882 4.34665 12.6475 4.26065 12.5691C4.17464 12.4906 4.10424 12.3895 4.04943 12.2656C3.99463 12.1418 3.97336 11.9993 3.98565 11.8381L4.25944 8.33372L2.13208 6.18115C2.03522 6.07913 1.96983 5.95889 1.9359 5.82043C1.90198 5.68198 1.89646 5.54447 1.91934 5.40792C1.94221 5.27136 1.98498 5.15713 2.04764 5.06522C2.1103 4.97331 2.2015 4.91009 2.32124 4.87555L4.83362 4.34269L5.53082 1.00383C5.56166 0.853816 5.61979 0.738241 5.7052 0.657108C5.79061 0.575976 5.88115 0.531226 5.97679 0.522858C6.07244 0.51449 6.16937 0.54284 6.26757 0.607908C6.36577 0.672976 6.44309 0.776701 6.49952 0.919084L7.7659 4.08615L10.3326 4.17464C10.457 4.18832 10.5577 4.23475 10.635 4.31392C10.7123 4.3931 10.7743 4.49817 10.8209 4.62913C10.8675 4.76009 10.8862 4.8967 10.8768 5.03894C10.8674 5.18119 10.8237 5.31073 10.7456 5.42756L9.02439 7.91684L9.90256 11.3204C9.9426 11.4765 9.94641 11.6206 9.91399 11.7526C9.88156 11.8845 9.82979 11.9964 9.75867 12.088C9.68754 12.1797 9.60017 12.2365 9.49656 12.2583C9.39294 12.2801 9.28938 12.2524 9.18588 12.175L6.85297 10.5376Z" fill="currentColor" />
  </svg>
)

const StarIcon = () => (
  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M7.9997 12.053L5.09126 13.8875C4.96278 13.9731 4.82845 14.0098 4.68829 13.9975C4.54812 13.9853 4.42548 13.9364 4.32035 13.8508C4.21523 13.7652 4.13347 13.6583 4.07506 13.5301C4.01666 13.4019 4.00498 13.2581 4.04002 13.0986L4.81093 9.63147L2.23539 7.30167C2.11859 7.1916 2.0457 7.06612 2.01673 6.92523C1.98777 6.78434 1.99641 6.64688 2.04266 6.51284C2.08892 6.3788 2.159 6.26873 2.25291 6.18263C2.34682 6.09653 2.47531 6.0415 2.63837 6.01753L6.03738 5.70566L7.35144 2.44028C7.40984 2.29352 7.50048 2.18345 7.62336 2.11007C7.74624 2.03669 7.87168 2 7.9997 2C8.12772 2 8.25317 2.03669 8.37605 2.11007C8.49892 2.18345 8.58956 2.29352 8.64797 2.44028L9.96202 5.70566L13.361 6.01753C13.5246 6.04199 13.653 6.09702 13.7465 6.18263C13.8399 6.26824 13.91 6.37831 13.9567 6.51284C14.0035 6.64737 14.0123 6.78508 13.9834 6.92596C13.9544 7.06685 13.8813 7.19209 13.764 7.30167L11.1885 9.63147L11.9594 13.0986C11.9944 13.2576 11.9827 13.4015 11.9243 13.5301C11.8659 13.6588 11.7842 13.7657 11.679 13.8508C11.5739 13.9359 11.4513 13.9848 11.3111 13.9975C11.1709 14.0103 11.0366 13.9736 10.9081 13.8875L7.9997 12.053Z" fill="currentColor" />
  </svg>
)

// ─── Component ───────────────────────────────────────────────────────────────

const TravelSection = () => {
  const [counts, setCounts] = useState([0, 0, 0])
  const statsRef = useRef<HTMLDivElement>(null)
  const animatedRef = useRef(false)

  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animatedRef.current) {
        animatedRef.current = true
        const t0 = performance.now()
        const DURATION = 1500
        const tick = (now: number) => {
          const p = Math.min((now - t0) / DURATION, 1)
          const eased = 1 - Math.pow(1 - p, 3)
          setCounts(STAT_TARGETS.map(v => Math.round(v * eased)))
          if (p < 1) requestAnimationFrame(tick)
        }
        requestAnimationFrame(tick)
      }
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  return (
    <Section>
      {/* Title */}
      <TitleBlock>
        <DesktopLabelWrap><SectionLabel>TRAVEL PASSPORT</SectionLabel></DesktopLabelWrap>
        <MobileLabelWrap><SectionLabel>TRAVEL · SLOWLY, MOSTLY</SectionLabel></MobileLabelWrap>
        <SectionHeader before="Places I've " muted="been to" after="." />
      </TitleBlock>

      {/* Country Cards */}
      <CardsContainer>
        {COUNTRIES.map(({ name, label, code, colorKey, borderKey, radius, rotation, ringType }) => (
          <CardOuter key={name}>
            <CardRotator $rotation={rotation}>
              <CardInner
                $colorKey={colorKey}
                $borderKey={borderKey}
                $radius={radius}
                $isOman={name === 'OMAN'}
              >
                {ringType === 'india' && (
                  <RingImg
                    src="/about/personal/travel/india-ring.svg"
                    alt=""
                    aria-hidden
                    $offsetX={-1.84}
                    $offsetY={-0.24}
                    $size={113.159}
                    $centerY
                  />
                )}
                {ringType === 'oman' && (
                  <RingImg
                    src="/about/personal/travel/oman-ring.svg"
                    alt=""
                    aria-hidden
                    $offsetX={-3.01}
                    $offsetY={-2.28}
                    $size={105.003}
                    $centerY={false}
                  />
                )}
                <CardYear $colorKey={colorKey}>{label}</CardYear>
                <CardName $colorKey={colorKey}>{name}</CardName>
                <CodeRow>
                  <IconWrap $colorKey={colorKey}>
                    <DesktopIcon><SparkleIcon /></DesktopIcon>
                    <MobileIcon><StarIcon /></MobileIcon>
                  </IconWrap>
                  <CodeText $colorKey={colorKey}>{code}</CodeText>
                </CodeRow>
              </CardInner>
            </CardRotator>
          </CardOuter>
        ))}
      </CardsContainer>

      {/* Stats + CTA */}
      <StatsArea ref={statsRef}>

        {/* Desktop: stats left + CTA right */}
        <DesktopStatsRow>
          <StatsGroup>
            {STAT_TARGETS.map((_, i) => (
              <React.Fragment key={i}>
                {i > 0 && <StatSep />}
                <StatBlock>
                  <StatNumber>{fmtDesktop(i, counts[i])}</StatNumber>
                  <StatLabel>
                    {i === 0 ? (
                      <><span>STAMPS</span><span>UNLOCKED</span></>
                    ) : i === 1 ? (
                      'FLIGHTS BOARDED'
                    ) : (
                      'WORLD COVERED'
                    )}
                  </StatLabel>
                </StatBlock>
              </React.Fragment>
            ))}
          </StatsGroup>
          <CTABlock>
            <CTAText>
              Self planned, Rush itineraries, lots of walking, and best value for money.
              Send me an email if you&apos;d like to hear when I plan the next.
            </CTAText>
            <CTAButton href="mailto:enricsneelamkavil@gmail.com">
              <CTAButtonLabel>Travel with me</CTAButtonLabel>
              <CTAIcon src="/icons/external.svg" alt="" aria-hidden width={18} height={18} />
            </CTAButton>
          </CTABlock>
        </DesktopStatsRow>

        {/* Mobile: stats row */}
        <MobileStatsRow>
          {STAT_TARGETS.map((_, i) => (
            <React.Fragment key={i}>
              {i > 0 && <StatSep />}
              <MobileStatBlock>
                <MobileStatNumber>{fmtMobile(i, counts[i])}</MobileStatNumber>
                <MobileStatLabel>
                  {i === 0 ? 'COUNTRIES DISCOVERED' : i === 1 ? 'FLIGHTS BOARDED' : 'WORLD COVERED'}
                </MobileStatLabel>
              </MobileStatBlock>
            </React.Fragment>
          ))}
        </MobileStatsRow>

        {/* Mobile: CTA below stats */}
        <MobileCTABlock>
          <CTAText>
            Self planned, Rush itineraries, lots of walking, and best value for money.
            Send me an email if you&apos;d like to hear when I plan the next.
          </CTAText>
          <CTAButton href="mailto:enricsneelamkavil@gmail.com" $mobile>
            <CTAButtonLabel $mobile>Travel with me</CTAButtonLabel>
            <CTAIcon src="/icons/external.svg" alt="" aria-hidden width={16} height={16} />
          </CTAButton>
        </MobileCTABlock>

      </StatsArea>
    </Section>
  )
}

// ─── Helpers for styled-components color map ─────────────────────────────────

const cardColor = ($colorKey: CardColor, theme: any) => ({
  tertiary:  theme.colors.text.tertiary,
  highlight: theme.colors.text.highlight,
  primary:   theme.colors.text.primary,
  secondary: theme.colors.text.secondary,
}[$colorKey])

const cardBorder = ($borderKey: CardBorder, theme: any) => {
  const map = {
    none:      'none',
    highlight: `2px solid ${theme.colors.surface.highlight}`,
    inverse:   `2px solid ${theme.colors.surface.inverse}`,
    secondary: `2px solid ${theme.colors.text.secondary}`,
  }
  return map[$borderKey]
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tablet} {
    max-width: none;
  }

  ${mq.mobile} {
    max-width: none;
  }
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const DesktopLabelWrap = styled.div`
  ${mq.tabletDown} { display: none; }
`

const MobileLabelWrap = styled.div`
  display: none;
  ${mq.tabletDown} { display: block; }
`

// ── Cards ────────────────────────────────────────────────────────────────────

const CardsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 32px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 40px;
  width: 100%;

  ${mq.tabletDown} {
    flex-wrap: wrap;
    padding: 40px 12px;
  }
`

const CardOuter = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const CardRotator = styled.div<{ $rotation: number }>`
  transform: rotate(${({ $rotation }) => $rotation}deg);
`

const CardInner = styled.div<{
  $colorKey: CardColor
  $borderKey: CardBorder
  $radius: number
  $isOman: boolean
}>`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  padding: 24px;
  border-radius: ${({ $radius }) => $radius}px;
  border: ${({ $borderKey, theme }) => cardBorder($borderKey, theme)};
  overflow: visible;

  ${({ $isOman }) => $isOman && `
    width: 100px;
    height: 100px;
  `}
`

const RingImg = styled.img<{
  $offsetX: number
  $offsetY: number
  $size: number
  $centerY: boolean
}>`
  position: absolute;
  left: ${({ $offsetX }) => $offsetX}px;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  pointer-events: none;
  z-index: 0;

  ${({ $centerY, $offsetY }) => $centerY
    ? `top: calc(50% + ${$offsetY}px); transform: translateY(-50%);`
    : `top: ${$offsetY}px;`
  }
`

const CardYear = styled.div<{ $colorKey: CardColor }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: 10px;
  line-height: 12px;
  letter-spacing: 0.2px;
  color: ${({ $colorKey, theme }) => cardColor($colorKey, theme)};
  text-align: center;
  white-space: nowrap;
  position: relative;
  z-index: 1;
`

const CardName = styled.div<{ $colorKey: CardColor }>`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ $colorKey, theme }) => cardColor($colorKey, theme)};
  text-align: center;
  white-space: nowrap;
  position: relative;
  z-index: 1;
`

const CodeRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  width: 100%;
  position: relative;
  z-index: 1;
`

const IconWrap = styled.span<{ $colorKey: CardColor }>`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  color: ${({ $colorKey, theme }) => cardColor($colorKey, theme)};
`

const DesktopIcon = styled.span`
  display: inline-flex;
  ${mq.tabletDown} { display: none; }
`

const MobileIcon = styled.span`
  display: none;
  ${mq.tabletDown} { display: inline-flex; }
`

const CodeText = styled.div<{ $colorKey: CardColor }>`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  letter-spacing: 0.24px;
  color: ${({ $colorKey, theme }) => cardColor($colorKey, theme)};
  text-align: center;
  white-space: nowrap;
`

// ── Stats + CTA ───────────────────────────────────────────────────────────────

const StatsArea = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
`

const DesktopStatsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 80px;
  width: 100%;

  ${mq.tabletDown} { display: none; }
`

const StatsGroup = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
  flex-shrink: 0;
`

const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  width: 100px;
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  line-height: 56px;
  color: ${({ theme }) => theme.colors.text.highlight};
`

const StatLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`

const StatSep = styled.div`
  width: 1px;
  height: 64px;
  background: ${({ theme }) => theme.colors.border.tertiary};
  flex-shrink: 0;
`

const CTABlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[4]};
  flex: 1 0 0;
  min-width: 0;
`

const CTAText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`

const CTAButton = styled.a<{ $mobile?: boolean }>`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  background: ${({ theme }) => theme.colors.surface.inverse};
  padding: ${({ $mobile }) => $mobile ? '12px 16px' : '12px 24px'};
  border-radius: ${({ $mobile, theme }) => $mobile ? theme.radii.md : theme.radii.lg};
  text-decoration: none;
  cursor: pointer;
  flex-shrink: 0;
`

const CTAButtonLabel = styled.span<{ $mobile?: boolean }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ $mobile }) => $mobile ? '14px' : '16px'};
  line-height: ${({ $mobile }) => $mobile ? '18px' : '24px'};
  color: ${({ theme }) => theme.colors.text.inverse};
  white-space: nowrap;
`

const CTAIcon = styled.img`
  display: block;
  flex-shrink: 0;
  filter: brightness(0) invert(1);
`

// Mobile stats

const MobileStatsRow = styled.div`
  display: none;

  ${mq.tabletDown} {
    display: flex;
    align-items: center;
    gap: 24px;
    width: 100%;
  }
`

const MobileStatBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 12px;
  flex: 1 0 0;
  min-width: 0;
  text-align: center;
`

const MobileStatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme }) => theme.colors.text.highlight};
`

const MobileStatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`

const MobileCTABlock = styled.div`
  display: none;

  ${mq.tabletDown} {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[4]};
    width: 100%;
  }
`

export default TravelSection
