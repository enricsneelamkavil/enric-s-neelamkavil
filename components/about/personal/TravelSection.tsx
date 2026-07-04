'use client'

import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Data ────────────────────────────────────────────────────────────────────

const STAMPS = [
  { key: 'india',     src: '/about/personal/travel/india.svg',     rotation: -5 },
  { key: 'qatar',     src: '/about/personal/travel/qatar.svg',     rotation:  5 },
  { key: 'singapore', src: '/about/personal/travel/singapore.svg', rotation: -5 },
  { key: 'malaysia',  src: '/about/personal/travel/malaysia.svg',  rotation:  5 },
  { key: 'vietnam',   src: '/about/personal/travel/vietnam.svg',   rotation: -5 },
  { key: 'oman',      src: '/about/personal/travel/oman.svg',      rotation:  5 },
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
        <SectionLabel>TRAVEL PASSPORT</SectionLabel>
        <SectionHeader before="Places I've " muted="been to" after="." />
      </TitleBlock>

      {/* Stamp seals */}
      <StampsContainer>
        {STAMPS.map(({ key, src, rotation }) => (
          <StampWrapper key={key} $rotation={rotation}>
            <StampImg src={src} alt={key} />
          </StampWrapper>
        ))}
      </StampsContainer>

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

// ── Stamps ───────────────────────────────────────────────────────────────────

const StampsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-wrap: wrap;
  gap: 24px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: 40px;
  width: 100%;

  ${mq.tabletDown} {
    padding: 32px 16px;
    gap: 16px;
  }
`

const StampWrapper = styled.div<{ $rotation: number }>`
  transform: rotate(${({ $rotation }) => $rotation}deg);
  flex-shrink: 0;
`

const StampImg = styled.img`
  display: block;
  max-width: 100%;
  height: auto;
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
  align-items: center;
  width: 100px;
  text-align: center;
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  line-height: 56px;
  color: ${({ theme }) => theme.colors.text.secondary};
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
  text-align: center;
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
  align-items: center;
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
  color: ${({ theme }) => theme.colors.text.secondary};
`

const MobileStatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  text-align: center;
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
