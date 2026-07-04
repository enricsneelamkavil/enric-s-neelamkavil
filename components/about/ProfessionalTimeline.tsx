'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import { type TimelineEvent } from '@/lib/timeline'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Figma-derived constants ──────────────────────────────────────────────────

const CARD_PHOTO_H_DESKTOP = 169   // px
const CARD_PHOTO_H_MOBILE  = 128   // px
const PORTRAIT_W_DESKTOP   = 127   // px — Young Jury narrow portrait
const PORTRAIT_W_MOBILE    = 96    // px
const NAV_ICON_SIZE        = 18    // px desktop
const NAV_ICON_SIZE_MOBILE = 16    // px mobile
const NAV_RADIUS_MOBILE    = 8     // px — below theme scale
const SCROLL_STEP          = 600   // px per nav click

// ─── Assets ───────────────────────────────────────────────────────────────────

const IMG_ARROW_LEFT  = '/icons/arrow-left.svg'
const IMG_ARROW_RIGHT = '/icons/arrow-right.svg'

// ─── Photo crop types ─────────────────────────────────────────────────────────

type CropSimple = { kind: 'simple' }
type CropPortrait = { kind: 'portrait' }
type CropPositioned = { kind: 'positioned'; h: string; left: string; top: string; w: string }
type Crop = CropSimple | CropPortrait | CropPositioned

// Per-photo crop data keyed by photo_url — pure CSS implementation detail.
// Default (no entry) = simple object-bottom cover.
// Add an entry here whenever a new event's photo needs portrait or positioned cropping.
const CROP_MAP: Record<string, Crop> = {
  '/about/timeline/card-01-young-jury.png': { kind: 'portrait' },
  '/about/timeline/card-02-graduation.png': {
    kind: 'positioned', h: '207.51%', left: '-0.08%', top: '-50.51%', w: '100.08%',
  },
  '/about/timeline/card-05-designers-award.png': {
    kind: 'positioned', h: '129.03%', left: '-6.1%', top: '-11.93%', w: '123.88%',
  },
  '/about/timeline/card-08-code-design-week.png': {
    kind: 'positioned', h: '336.59%', left: '-25.71%', top: '-141.55%', w: '160.58%',
  },
  '/about/timeline/card-10-mulearn.png': {
    kind: 'positioned', h: '173.76%', left: '-45.33%', top: '-17.99%', w: '167.23%',
  },
}

const getCrop = (photoUrl: string | null): Crop =>
  (photoUrl && CROP_MAP[photoUrl]) ? CROP_MAP[photoUrl] : { kind: 'simple' }

// ─── Sub-components ───────────────────────────────────────────────────────────

const CardPhoto = ({ photoUrl, crop }: { photoUrl: string; crop: Crop }) => {
  if (crop.kind === 'positioned') {
    return (
      <PhotoWrap>
        <div style={{
          position: 'absolute', inset: 0, overflow: 'hidden',
          borderRadius: 'inherit', pointerEvents: 'none',
        }}>
          <img
            alt=""
            src={photoUrl}
            style={{
              position: 'absolute',
              height: crop.h, left: crop.left, top: crop.top, width: crop.w,
              maxWidth: 'none',
            }}
          />
        </div>
      </PhotoWrap>
    )
  }

  const isPortrait = crop.kind === 'portrait'
  return (
    <PhotoWrap $narrow={isPortrait}>
      <img
        alt=""
        src={photoUrl}
        style={{
          position: 'absolute', inset: 0,
          width: '100%', height: '100%',
          objectFit: 'cover',
          objectPosition: isPortrait ? 'center' : 'bottom',
          maxWidth: 'none', borderRadius: 'inherit', pointerEvents: 'none',
        }}
      />
    </PhotoWrap>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

interface Props {
  events: TimelineEvent[]
}

const ProfessionalTimeline = ({ events }: Props) => {
  const scrollRef = useRef<HTMLDivElement>(null)
  const [canScrollLeft, setCanScrollLeft] = useState(false)
  const [canScrollRight, setCanScrollRight] = useState(true)

  const updateScrollState = useCallback(() => {
    const el = scrollRef.current
    if (!el) return
    setCanScrollLeft(el.scrollLeft > 0)
    setCanScrollRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1)
  }, [])

  useEffect(() => {
    const el = scrollRef.current
    if (!el) return
    updateScrollState()
    el.addEventListener('scroll', updateScrollState, { passive: true })
    return () => el.removeEventListener('scroll', updateScrollState)
  }, [updateScrollState])

  const handleScrollLeft  = () => scrollRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' })
  const handleScrollRight = () => scrollRef.current?.scrollBy({ left:  SCROLL_STEP, behavior: 'smooth' })

  return (
    <Section>

      <TitleRow>
        <TitleBlock>
          <SectionLabel>MY JOURNEY 2022 → 2026</SectionLabel>
          <SectionHeader before="Being through " muted="so far" after="." />
        </TitleBlock>
        <DesktopNavButtons>
          <NavBtn onClick={handleScrollLeft} disabled={!canScrollLeft} aria-label="Scroll timeline left">
            <NavIcon src={IMG_ARROW_LEFT} alt="" width={NAV_ICON_SIZE} height={NAV_ICON_SIZE} />
          </NavBtn>
          <NavBtn onClick={handleScrollRight} disabled={!canScrollRight} aria-label="Scroll timeline right">
            <NavIcon src={IMG_ARROW_RIGHT} alt="" width={NAV_ICON_SIZE} height={NAV_ICON_SIZE} />
          </NavBtn>
        </DesktopNavButtons>
      </TitleRow>

      <ScrollWrapper ref={scrollRef}>
        <ScrollTrack>
          {events.map((event) => {
            const crop = getCrop(event.photo_url)
            return (
              <EventCard key={event.id}>
                {event.image_position === 'above' && event.photo_url && (
                  <CardPhoto photoUrl={event.photo_url} crop={crop} />
                )}
                <ContentBlock>
                  <HeaderBlock>
                    <EventTitle>{event.title}</EventTitle>
                    <EventSub>{event.subtitle}</EventSub>
                  </HeaderBlock>
                  {event.description && (
                    <EventDesc>{event.description}</EventDesc>
                  )}
                </ContentBlock>
                {event.image_position === 'below' && event.photo_url && (
                  <CardPhoto photoUrl={event.photo_url} crop={crop} />
                )}
              </EventCard>
            )
          })}
        </ScrollTrack>
      </ScrollWrapper>

      <MobileNavRow>
        <NavBtnMobile onClick={handleScrollLeft} disabled={!canScrollLeft} aria-label="Scroll timeline left">
          <NavIcon src={IMG_ARROW_LEFT} alt="" width={NAV_ICON_SIZE_MOBILE} height={NAV_ICON_SIZE_MOBILE} />
        </NavBtnMobile>
        <NavBtnMobile onClick={handleScrollRight} disabled={!canScrollRight} aria-label="Scroll timeline right">
          <NavIcon src={IMG_ARROW_RIGHT} alt="" width={NAV_ICON_SIZE_MOBILE} height={NAV_ICON_SIZE_MOBILE} />
        </NavBtnMobile>
      </MobileNavRow>

    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tablet} {
    max-width: none;
    padding: 0 24px;
  }

  ${mq.mobile} {
    max-width: none;
    gap: ${({ theme }) => theme.spacing[8]};
  }
`

// ── Title row ─────────────────────────────────────────────────────────────────

const TitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
`

const TitleBlock = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
`

const DesktopNavButtons = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-shrink: 0;

  ${mq.mobile} {
    display: none;
  }
`

const NavBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`

const NavBtnMobile = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${NAV_RADIUS_MOBILE}px;
  cursor: pointer;
  flex-shrink: 0;
  transition: opacity 0.2s ease;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`

const NavIcon = styled.img`
  display: block;
`

// ── Scroll area ───────────────────────────────────────────────────────────────

const ScrollWrapper = styled.div`
  width: calc(100% + (100vw - 100%) / 2);
  overflow-x: auto;
  scrollbar-width: none;
  &::-webkit-scrollbar { display: none; }
  -webkit-overflow-scrolling: touch;

  ${mq.tablet} {
    width: calc(100% + 24px);
  }

  ${mq.mobile} {
    width: 100vw;
  }
`

const ScrollTrack = styled.div`
  display: inline-flex;
  align-items: flex-start;
  gap: 40px;
  padding-right: max(40px, calc((100vw - ${({ theme }) => theme.layout.maxWidth}) / 2));

  ${mq.tablet} {
    padding-right: 24px;
    gap: 24px;
  }

  ${mq.mobile} {
    gap: 24px;
    padding-right: 24px;
    padding-left: 24px;
  }
`

// ── Event card ────────────────────────────────────────────────────────────────

const EventCard = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  flex-shrink: 0;
  width: 264px;

  ${mq.mobile} {
    width: 200px;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`

const PhotoWrap = styled.div<{ $narrow?: boolean }>`
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  height: ${CARD_PHOTO_H_DESKTOP}px;
  width: ${({ $narrow }) => ($narrow ? `${PORTRAIT_W_DESKTOP}px` : '100%')};

  ${mq.mobile} {
    height: ${CARD_PHOTO_H_MOBILE}px;
    width: ${({ $narrow }) => ($narrow ? `${PORTRAIT_W_MOBILE}px` : '100%')};
  }
`

const ContentBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  word-break: break-word;
`

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  white-space: nowrap;
`

const EventTitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }
`

const EventSub = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.highlight};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

const EventDesc = styled.p`
  margin: 0;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ── Mobile nav ────────────────────────────────────────────────────────────────

const MobileNavRow = styled.div`
  display: none;

  ${mq.mobile} {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 24px;
  }
`

export default ProfessionalTimeline
