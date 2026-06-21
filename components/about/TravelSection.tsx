'use client'

import React, { useRef, useState, useEffect } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'
import TravelMap from '@/components/about/TravelMap'

// ─── Data ────────────────────────────────────────────────────────────────────

interface FlagDef { name: string; src: string }
const FLAGS: FlagDef[] = [
  { name: 'Qatar', src: '/about/personal/travel/qatar-flag.svg' },
  { name: 'Singapore', src: '/about/personal/travel/singapore-flag.svg' },
  { name: 'Malaysia', src: '/about/personal/travel/malaysia-flag.svg' },
  { name: 'Vietnam', src: '/about/personal/travel/vietnam-flag.svg' },
  { name: 'Oman', src: '/about/personal/travel/oman-flag.svg' },
]

interface AlbumDef {
  country: string
  year: number
  photo: string
  objectPosition: string
}

const ALBUMS: AlbumDef[] = [
  { country: 'Qatar', year: 2018, photo: '/about/personal/travel/qatar-1.webp', objectPosition: 'center' },
  { country: 'Singapore', year: 2024, photo: '/about/personal/travel/singapore-1.webp', objectPosition: 'center' },
  { country: 'Malaysia', year: 2024, photo: '/about/personal/travel/malaysia-1.webp', objectPosition: 'center' },
  { country: 'Vietnam', year: 2025, photo: '/about/personal/travel/vietnam-1.webp', objectPosition: 'center' },
  { country: 'Oman', year: 2025, photo: '/about/personal/travel/oman-1.webp', objectPosition: 'center' },
]

const STAT_TARGETS = [6, 55, 2]

const formatStat = (index: number, val: number) => {
  if (index === 0) return String(val).padStart(2, '0')
  if (index === 2) return `${val}%`
  return String(val)
}

const STAT_LABELS = [
  ['COUNTRIES', 'DISCOVERED'],
  ['FLIGHTS BOARDED'],
  ['WORLD COVERED'],
]

// ─── Component ───────────────────────────────────────────────────────────────

const TravelSection = () => {
  const [hoveredFlag, setHoveredFlag] = useState<string | null>(null)
  const [activeFlag, setActiveFlag] = useState<string | null>(null)
  const [counts, setCounts] = useState([0, 0, 0])
  const statsRef = useRef<HTMLDivElement>(null)
  const animatedRef = useRef(false)

  // Mobile stats count-up (desktop count-up is inside TravelMapClient)
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

  const toggleFlag = (name: string) =>
    setActiveFlag(prev => (prev === name ? null : name))

  return (
    <Section>
      {/* Title */}
      <TitleBlock>
        <SectionLabel>TRAVEL · SLOWLY, MOSTLY</SectionLabel>
        <SectionHeader before="Places I've " muted="been to" after="." />
      </TitleBlock>

      {/* Desktop map — hidden on mobile */}
      <DesktopMap>
        <TravelMap />
      </DesktopMap>

      {/* Mobile flags row — hidden on desktop */}
      <MobileFlagsRow>
        {FLAGS.map(({ name, src }) => {
          const visible = hoveredFlag === name || activeFlag === name
          return (
            <MobileFlagItem
              key={name}
              $raised={visible}
              onMouseEnter={() => setHoveredFlag(name)}
              onMouseLeave={() => setHoveredFlag(null)}
              onClick={() => toggleFlag(name)}
            >
              {visible && <FlagTooltip>{name}</FlagTooltip>}
              <img src={src} alt={name} />
            </MobileFlagItem>
          )
        })}
      </MobileFlagsRow>

      {/* Mobile stats card — hidden on desktop */}
      <MobileStatsCard ref={statsRef}>
        {STAT_TARGETS.map((_, i) => (
          <React.Fragment key={i}>
            {i > 0 && <MobileStatSep />}
            <MobileStatBlock>
              <MobileStatNumber>{formatStat(i, counts[i])}</MobileStatNumber>
              <MobileStatLabel>
                {STAT_LABELS[i].map(line => <span key={line}>{line}</span>)}
              </MobileStatLabel>
            </MobileStatBlock>
          </React.Fragment>
        ))}
      </MobileStatsCard>

      {/* Travel with me */}
      <TravelWithMe>
        <TravelText>
          Self planned, Rush itineraries, lots of walking, and best value for money.
          Send me an email if you&apos;d like to hear when I plan the next.
        </TravelText>
        <TravelButton href="mailto:enricsneelamkavil@gmail.com">
          <ButtonText>Travel with me</ButtonText>
          <ArrowPill>
            <img src="/about/personal/travel/arrow.svg" alt="" aria-hidden="true" width={10} height={10} />
          </ArrowPill>
        </TravelButton>
      </TravelWithMe>

      {/* Travel Albums */}
      <AlbumsScroller>
        <AlbumsRow>
          {ALBUMS.map(({ country, year, photo, objectPosition }) => (
            <AlbumCard key={country}>
              <AlbumPhoto>
                <AlbumImg src={photo} alt={`${country} travel photo`} $objPos={objectPosition} />
                <AlbumGradient />
                <AlbumYear>{year}</AlbumYear>
                <AlbumName>{country}</AlbumName>
              </AlbumPhoto>
            </AlbumCard>
          ))}
        </AlbumsRow>
      </AlbumsScroller>
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

// Desktop map

const DesktopMap = styled.div`
  ${mq.tabletDown} {
    display: none;
  }
`

// Mobile flags row

const MobileFlagsRow = styled.div`
  display: none;

  ${mq.tabletDown} {
    display: flex;
    align-items: center;
    justify-content: space-between;
    width: 100%;
  }
`

const MobileFlagItem = styled.div<{ $raised: boolean }>`
  position: relative;
  width: 36px;
  height: 24px;
  flex-shrink: 0;
  cursor: pointer;
  transform: ${({ $raised }) => ($raised ? 'translateY(-6px)' : 'translateY(0)')};
  transition: transform 0.15s ease;

  img {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
  }
`

const FlagTooltip = styled.div`
  position: absolute;
  bottom: calc(100% + 8px);
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.surface.inverse};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  padding: 4px 8px;
  border-radius: ${({ theme }) => theme.radii.full};
  white-space: nowrap;
  pointer-events: none;
  z-index: 10;
`

// Mobile stats card

const MobileStatsCard = styled.div`
  display: none;

  ${mq.tabletDown} {
    display: flex;
    align-items: center;
    gap: ${({ theme }) => theme.spacing[6]};
    background: ${({ theme }) => theme.colors.surface.tertiary};
    border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
    border-radius: ${({ theme }) => theme.radii.xl};
    padding: ${({ theme }) => theme.spacing[4]};
    width: 100%;
  }
`

const MobileStatBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  flex: 1 0 0;
  min-width: 0;
`

const MobileStatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme }) => theme.colors.text.highlight};
`

const MobileStatLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  text-align: center;
`

const MobileStatSep = styled.div`
  display: none;

  ${mq.tabletDown} {
    display: block;
    width: 1px;
    height: 64px;
    background: ${({ theme }) => theme.colors.border.tertiary};
    flex-shrink: 0;
  }
`

// Travel with me row

const TravelWithMe = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`

const TravelText = styled.p`
  margin: 0;
  width: 564px;
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.tablet} {
    width: auto;
    flex: 1;
  }

  ${mq.mobile} {
    width: 100%;
  }
`

const TravelButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-decoration: none;
  cursor: pointer;
  flex-shrink: 0;

  ${mq.mobile} {
    padding: 12px 16px;
  }
`

const ButtonText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: 0.875rem;
    line-height: 1.125rem;
  }
`

const ArrowPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: ${({ theme }) => theme.colors.icon.secondary};
  border-radius: 9px;
  flex-shrink: 0;

  ${mq.mobile} {
    width: 16px;
    height: 16px;
    border-radius: 8px;

    img {
      width: 9px;
      height: 9px;
    }
  }
`

// Albums

const CARD_W = 214.4
const CARD_H = 239.348

const AlbumsScroller = styled.div`
  width: 100%;
  overflow: hidden;

  ${mq.mobile} {
    overflow-x: auto;
    overflow-y: hidden;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    -ms-overflow-style: none;
    &::-webkit-scrollbar { display: none; }
  }
`

const AlbumsRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  width: ${CARD_W * 5 + 24 * 4}px;

  ${mq.mobile} {
    width: auto;
  }
`

const AlbumCard = styled.div`
  flex-shrink: 0;
  width: ${CARD_W}px;
  scroll-snap-align: start;
`

const AlbumPhoto = styled.div`
  position: relative;
  width: ${CARD_W}px;
  height: ${CARD_H}px;
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
`

const AlbumImg = styled.img<{ $objPos?: string }>`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: ${({ $objPos }) => $objPos ?? 'center bottom'};
  pointer-events: none;
  display: block;
`

const AlbumGradient = styled.div`
  position: absolute;
  inset: 0;
  background: linear-gradient(to top, rgba(0, 0, 0, 0.5) 0%, transparent 30%);
  pointer-events: none;
`

const AlbumYear = styled.div`
  position: absolute;
  top: 12px;
  right: 12px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 6px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
  pointer-events: none;
`

const AlbumName = styled.div`
  position: absolute;
  bottom: 12px;
  left: 0;
  right: 0;
  text-align: center;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.inverse};
  text-shadow: 0 0 24px rgba(0, 0, 0, 0.5);
  white-space: nowrap;
  pointer-events: none;
`

export default TravelSection
