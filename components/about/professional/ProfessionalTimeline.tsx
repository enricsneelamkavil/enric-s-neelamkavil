'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import { type TimelineEvent } from '@/lib/timeline'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Figma-derived constants ──────────────────────────────────────────────────

const CARD_PHOTO_H_DESKTOP = 169   // px
const CARD_PHOTO_H_MOBILE  = 128   // px
const NAV_ICON_SIZE        = 18    // px desktop
const NAV_ICON_SIZE_MOBILE = 16    // px mobile
const NAV_RADIUS_MOBILE    = 8     // px — below theme scale
const SCROLL_STEP          = 600   // px per nav click

// ─── Assets ───────────────────────────────────────────────────────────────────

const IMG_ARROW_LEFT  = '/icons/arrow-left.svg'
const IMG_ARROW_RIGHT = '/icons/arrow-right.svg'

// ─── Sub-components ───────────────────────────────────────────────────────────

const CardPhoto = ({ photoUrl }: { photoUrl: string }) => (
  <PhotoWrap>
    <PhotoImg alt="" src={photoUrl} fill sizes="(max-width: 768px) 200px, 264px" />
  </PhotoWrap>
)

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

  const getStep = () => window.innerWidth <= 768 ? 220 : SCROLL_STEP
  const handleScrollLeft  = () => scrollRef.current?.scrollBy({ left: -getStep(), behavior: 'smooth' })
  const handleScrollRight = () => scrollRef.current?.scrollBy({ left:  getStep(), behavior: 'smooth' })

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
          {events.map((event) => (
            <EventCard key={event.id}>
              {event.image_position === 'above' && event.photo_url && (
                <CardPhoto photoUrl={event.photo_url} />
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
                <CardPhoto photoUrl={event.photo_url} />
              )}
            </EventCard>
          ))}
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
    padding-right: 24px;
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

const PhotoWrap = styled.div`
  position: relative;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  height: ${CARD_PHOTO_H_DESKTOP}px;
  width: 100%;

  ${mq.mobile} {
    height: ${CARD_PHOTO_H_MOBILE}px;
  }
`

const PhotoImg = styled(Image)`
  border-radius: inherit;
  pointer-events: none;
  object-fit: cover;
  object-position: center;
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
