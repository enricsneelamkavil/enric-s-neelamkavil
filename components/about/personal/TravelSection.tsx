'use client'

import React, { useRef, useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Data ────────────────────────────────────────────────────────────────────

const STAMP_FRAME = '/about/personal/travel/stamp-frame-1.svg'

const ALBUMS = [
  { key: 'oman', name: 'OMAN', photo: '/about/personal/travel/oman.webp', w: 768, h: 1024, location: 'MUSCAT', date: 'DEC 2025' },
  { key: 'vietnam', name: 'VIETNAM', photo: '/about/personal/travel/vietnam.webp', w: 1980, h: 3520, location: 'HANOI', date: 'OCT 2025' },
  { key: 'malaysia', name: 'MALAYSIA', photo: '/about/personal/travel/malaysia.webp', w: 768, h: 1024, location: 'KUALA LUMPUR', date: 'NOV 2024' },
  { key: 'singapore', name: 'SINGAPORE', photo: '/about/personal/travel/singapore.webp', w: 768, h: 1024, location: 'SINGAPORE', date: 'JUL 2024' },
  { key: 'qatar', name: 'QATAR', photo: '/about/personal/travel/qatar.webp', w: 762, h: 1024, location: 'DOHA', date: 'APR 2018' },
  { key: 'india', name: 'INDIA', photo: '/about/personal/travel/india.webp', w: 768, h: 1024, location: 'THRISSUR', date: 'HOME' },
] as const

const CTA_COPY = "Completely self planned, Rush itineraries, lots of walking, and customised experiences. Send me a text if you'd like to join me when I plan the next, prolly Sri Lanka or Thailand!"

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

      {/* Travel albums */}
      <AlbumsRow>
        {ALBUMS.map(({ key, name, photo, w, h, location, date }) => (
          <AlbumCard key={key}>
            <FrameImg src={STAMP_FRAME} alt="" aria-hidden />
            <AlbumContent>
              <PhotoWrap>
                <PhotoImg src={photo} alt={name} width={w} height={h} />
              </PhotoWrap>
              <AlbumTitle>
                <AlbumName>{name}</AlbumName>
                <AlbumSubtitle>
                  <span>{location}</span>
                  <StarIcon aria-hidden="true" />
                  <span>{date}</span>
                </AlbumSubtitle>
              </AlbumTitle>
            </AlbumContent>
          </AlbumCard>
        ))}
      </AlbumsRow>

      {/* Stats + CTA */}
      <StatsArea ref={statsRef}>

        {/* Desktop: CTA left + stats right */}
        <DesktopStatsRow>
          <CTABlock>
            <CTAText>{CTA_COPY}</CTAText>
            <CTAButton href="mailto:enricsneelamkavil@gmail.com">
              <CTAButtonLabel>Travel with me</CTAButtonLabel>
              <CTAIcon src="/icons/external.svg" alt="" aria-hidden width={18} height={18} />
            </CTAButton>
          </CTABlock>
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
          <CTAText>{CTA_COPY}</CTAText>
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

// ── Travel albums ─────────────────────────────────────────────────────────────

const AlbumsRow = styled.div`
  display: flex;
  align-items: flex-start;
  flex-wrap: nowrap;
  gap: 16px;
  width: 100%;
  overflow: visible;

  ${mq.mobile} {
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 4px;

    &::-webkit-scrollbar {
      display: none;
    }
  }
`

const AlbumCard = styled.div`
  position: relative;
  flex: 1 1 0;
  min-width: 0;
  padding: 16px;

  ${mq.mobile} {
    flex: none;
    flex-shrink: 0;
    width: auto;
    scroll-snap-align: start;
  }
`

const FrameImg = styled.img`
  position: absolute;
  inset: 0;
  display: block;
  width: 100%;
  height: 100%;
  pointer-events: none;
`

const AlbumContent = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
`

const PhotoWrap = styled.div`
  width: 100%;

  /* Cards go from equal-width columns to a natural-width scroll strip on
     mobile — a shared height (with width driven by each photo's own aspect
     ratio) is what makes "natural size" cards actually legible instead of
     rendering at full native photo resolution. */
  ${mq.mobile} {
    width: auto;
    height: 220px;
  }
`

const PhotoImg = styled(Image)`
  display: block;
  width: 100%;
  height: auto;
  margin: 0 auto;
  object-fit: cover;
  object-position: center;
  pointer-events: none;

  ${mq.mobile} {
    width: auto;
    height: 100%;
  }
`

const AlbumTitle = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
`

const AlbumName = styled.p`
  margin: 0;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;
`

const AlbumSubtitle = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  text-transform: uppercase;
  text-align: center;
  white-space: nowrap;

  span:first-child { color: ${({ theme }) => theme.colors.text.secondary}; }
  span:last-child { color: ${({ theme }) => theme.colors.text.tertiary}; }
`

const StarIcon = styled.span`
  display: inline-block;
  width: 10px;
  height: 10px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(/icons/star.svg) no-repeat center / contain;
  mask: url(/icons/star.svg) no-repeat center / contain;
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
