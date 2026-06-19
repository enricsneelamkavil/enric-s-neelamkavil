'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Figma-derived layout constants ───────────────────────────────────────────

const MASK_W = 2723   // shape-mask rendered width, px
const MASK_H = 169    // photo strip height, px
const SCROLL_STEP = 600    // px per nav click

// ─── Assets ───────────────────────────────────────────────────────────────────

const IMG_ARROW_LEFT = '/about/timeline/arrow-left.svg'
const IMG_ARROW_RIGHT = '/about/timeline/arrow-right.svg'
const IMG_SHAPE_MASK = '/about/timeline/shape-mask.svg'

// ─── Event data ───────────────────────────────────────────────────────────────

interface TLEvent { title: string; sub: string; desc: string; descW: number }

const TOP_EVENTS: TLEvent[] = [
  { title: 'Co-host', sub: 'BEACH HACK 5', desc: 'Co-hosted the 5th edition of the flagship event Beach hackathon.', descW: 182 },
  { title: 'Founder Host', sub: "CODe Design Week (CDW '23)", desc: 'Hosted the first ever Design Week, in Engineering Colleges across Kerala.', descW: 204 },
  { title: 'Designers Award', sub: 'Huddle Global', desc: 'Secured the position in Top 13 Designers in Branding Challenge.', descW: 238 },
  { title: 'Speaker', sub: 'Christ College of Engieering', desc: 'Handled multiple sessions on interface design for digital products.', descW: 222 },
  { title: 'Invited Attendee', sub: 'Config APAC', desc: "Figma's first Config APAC at Marina Bay Sands Conventional Center, Singapore.", descW: 222 },
  { title: 'Attendee', sub: 'Figma India Launch', desc: "Attended Figma's India office Launch representing Strollby Design.", descW: 202 },
]

const BOTTOM_EVENTS: TLEvent[] = [
  { title: 'Chairman', sub: 'Community of Developers (CODe)', desc: 'Association of Department of Computer Science, Christ College of Engineering.', descW: 222 },
  { title: 'UI Designer', sub: 'GTech MuLearn', desc: 'First Internship as UI Designer, led a team, mentored junior designers.', descW: 192 },
  { title: 'Attendee', sub: 'Lollypop Designathon', desc: 'Shortlisted attendee for Designathon 2024 hosted by Lollypop Design Studio.', descW: 217 },
  { title: 'Lead Host', sub: 'DESIGNATHON 2024', desc: "Hosted second edition of Designathon, after CODe Design Week '23.", descW: 215 },
  { title: 'Graduation', sub: 'Christ College of Engieering', desc: 'Graduated Bachelors of Engineering in Computer Science & Engineering.', descW: 222 },
  { title: 'Young Jury 2025', sub: 'Awwwards.', desc: 'Selected as a jury member, evaluating and rating top digital designs globally.', descW: 222 },
]

// ─── Photo data ───────────────────────────────────────────────────────────────

type PositionedPhoto = { kind: 'positioned'; src: string; ar: string; w: string; h: string; l: string; t: string }
type SimplePhoto = { kind: 'simple'; src: string; ar: string; pos: 'bottom' | 'center' }
type TLPhoto = PositionedPhoto | SimplePhoto

const PHOTOS: TLPhoto[] = [
  { kind: 'positioned', src: '/about/timeline/tl-image-1.jpg', ar: '181/137', w: '106.08%', h: '187.25%', l: '0', t: '-45.64%' },
  { kind: 'positioned', src: '/about/timeline/tl-image-2.jpg', ar: '230/137', w: '213.27%', h: '238.72%', l: '-41.74%', t: '-87.61%' },
  { kind: 'positioned', src: '/about/timeline/tl-image-3.jpg', ar: '180/137', w: '198.82%', h: '173.76%', l: '-45.86%', t: '-11.06%' },
  { kind: 'positioned', src: '/about/timeline/tl-image-4.jpg', ar: '235/137', w: '146.23%', h: '336.59%', l: '-12.3%', t: '-144.43%' },
  { kind: 'positioned', src: '/about/timeline/tl-image-5.jpg', ar: '188/137', w: '127.66%', h: '233.58%', l: '-25.53%', t: '-62.77%' },
  { kind: 'positioned', src: '/about/timeline/tl-image-6.jpg', ar: '259/137', w: '114.99%', h: '144.94%', l: '0', t: '-25.96%' },
  { kind: 'positioned', src: '/about/timeline/tl-image-7.jpg', ar: '181/137', w: '114.56%', h: '228.78%', l: '-0.31%', t: '-69.63%' },
  { kind: 'simple', src: '/about/timeline/tl-image-8.png', ar: '170/137', pos: 'center' },
  { kind: 'positioned', src: '/about/timeline/tl-image-9.jpg', ar: '149/137', w: '122.42%', h: '176.71%', l: '-13.56%', t: '-35.11%' },
  { kind: 'positioned', src: '/about/timeline/tl-image-10.jpg', ar: '155/137', w: '113.55%', h: '171.8%', l: '0', t: '-45.74%' },
  { kind: 'simple', src: '/about/timeline/tl-image-11.png', ar: '2363/3150', pos: 'center' },
  { kind: 'positioned', src: '/about/timeline/tl-image-12.jpg', ar: '177/137', w: '105.4%', h: '181.46%', l: '-4.96%', t: '-49.93%' },
]

// Year label absolute positions within the 2723px strip (from Figma)
const YEAR_LABELS: { text: string; left: number; width?: number; height?: number }[] = [
  { text: '> 2022', left: 68, width: 252, height: 96 },
  { text: '> 2023', left: 564 },
  { text: '> 2024', left: 1494, width: 250, height: 96 },
  { text: '> 2025', left: 2333 },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const Event = ({ e }: { e: TLEvent }) => (
  <EventBlock>
    <EventHeader>
      <EventTitle>{e.title}</EventTitle>
      <EventSub>{e.sub}</EventSub>
    </EventHeader>
    <EventDesc $w={e.descW}>{e.desc}</EventDesc>
  </EventBlock>
)

const Photo = ({ p }: { p: TLPhoto }) => (
  <PhotoCell style={{ aspectRatio: p.ar }}>
    <PhotoInner aria-hidden>
      {p.kind === 'positioned' ? (
        <PhotoOverflow>
          <img
            alt=""
            src={p.src}
            style={{ position: 'absolute', width: p.w, height: p.h, left: p.l, top: p.t, maxWidth: 'none' }}
          />
        </PhotoOverflow>
      ) : (
        <img
          alt=""
          src={p.src}
          style={{
            position: 'absolute',
            inset: 0,
            width: '100%',
            height: '100%',
            objectFit: 'cover',
            objectPosition: p.pos,
            maxWidth: 'none',
          }}
        />
      )}
      <RedOverlay />
    </PhotoInner>
  </PhotoCell>
)

// ─── Component ────────────────────────────────────────────────────────────────

const ProfessionalTimeline = () => {
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

  const handleScrollLeft = () => scrollRef.current?.scrollBy({ left: -SCROLL_STEP, behavior: 'smooth' })
  const handleScrollRight = () => scrollRef.current?.scrollBy({ left: SCROLL_STEP, behavior: 'smooth' })

  return (
    <Section>
      <TitleRow>
        <TitleBlock>
          <SectionLabel>MY JOURNEY 2022 → 2026</SectionLabel>
          <SectionHeader before="Being through " muted="so far" after="." />
        </TitleBlock>
        <NavButtons>
          <NavBtn onClick={handleScrollLeft} disabled={!canScrollLeft} aria-label="Scroll timeline left">
            <NavIcon src={IMG_ARROW_LEFT} alt="" width={18} height={18} />
          </NavBtn>
          <NavBtn onClick={handleScrollRight} disabled={!canScrollRight} aria-label="Scroll timeline right">
            <NavIcon src={IMG_ARROW_RIGHT} alt="" width={18} height={18} />
          </NavBtn>
        </NavButtons>
      </TitleRow>

      <ScrollWrapper ref={scrollRef}>
        <ScrollTrack>
          <TopEventsRow>
            {TOP_EVENTS.map((e, i) => <Event key={i} e={e} />)}
          </TopEventsRow>

          <ImageStripWrapper>
            <ImageStrip>
              {PHOTOS.map((p, i) => <Photo key={i} p={p} />)}
            </ImageStrip>
            {YEAR_LABELS.map((y) => (
              <YearLabel
                key={y.text}
                style={{
                  left: y.left,
                  ...(y.width != null ? { width: y.width } : {}),
                  ...(y.height != null ? { height: y.height } : {}),
                }}
              >
                {y.text}
              </YearLabel>
            ))}
          </ImageStripWrapper>

          <BottomEventsRow>
            {BOTTOM_EVENTS.map((e, i) => <Event key={i} e={e} />)}
          </BottomEventsRow>
        </ScrollTrack>
      </ScrollWrapper>
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
  gap: ${({ theme }) => theme.spacing[1]};
`

const NavButtons = styled.div`
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

const NavIcon = styled.img`
  display: block;
  width: 18px;
  height: 18px;
`

// ── Scroll area ───────────────────────────────────────────────────────────────

const ScrollWrapper = styled.div`
  width: calc(100% + (100vw - 100%) / 2);
  overflow-x: auto;
  scrollbar-width: none;
  -webkit-overflow-scrolling: touch;

  &::-webkit-scrollbar {
    display: none;
  }
`

const ScrollTrack = styled.div`
  display: inline-flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  padding-right: max(0px, calc((100vw - ${({ theme }) => theme.layout.maxWidth}) / 2));

  ${mq.tablet} {
    padding-right: 24px;
  }

  ${mq.mobile} {
    padding-right: 24px;
  }
`

// ── Event rows ────────────────────────────────────────────────────────────────

const TopEventsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 240px;
  padding-left: 240px;
  flex-shrink: 0;
`

const BottomEventsRow = styled.div`
  display: flex;
  align-items: center;
  gap: 240px;
  padding-right: 240px;
  flex-shrink: 0;
`

// ── Event block ───────────────────────────────────────────────────────────────

const EventBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  flex-shrink: 0;
`

const EventHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const EventTitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
`

const EventSub = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.highlight};
  white-space: nowrap;
`

interface DescProps { $w: number }
const EventDesc = styled.p<DescProps>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  width: ${({ $w }) => $w}px;
`

// ── Photo strip ───────────────────────────────────────────────────────────────

const ImageStripWrapper = styled.div`
  position: relative;
  width: ${MASK_W}px;
  height: ${MASK_H}px;
  flex-shrink: 0;
`

const ImageStrip = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  height: ${MASK_H}px;
  overflow: clip;
  mask-image: url('${IMG_SHAPE_MASK}');
  mask-size: ${MASK_W}px ${MASK_H}px;
  mask-repeat: no-repeat;
  -webkit-mask-image: url('${IMG_SHAPE_MASK}');
  -webkit-mask-size: ${MASK_W}px ${MASK_H}px;
  -webkit-mask-repeat: no-repeat;
`

const PhotoCell = styled.div`
  position: relative;
  height: 100%;
  flex-shrink: 0;
`

const PhotoInner = styled.div`
  position: absolute;
  inset: 0;
  pointer-events: none;
`

const PhotoOverflow = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
`

const RedOverlay = styled.div`
  position: absolute;
  inset: 0;
  background: rgba(232, 52, 42, 0.5);
`

const YearLabel = styled.div`
  position: absolute;
  bottom: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 5rem;       /* 80px — outside theme scale */
  line-height: 6.25rem;  /* 100px — outside theme scale */
  letter-spacing: ${({ theme }) => theme.letterSpacings.tightest};
  color: ${({ theme }) => theme.colors.text.inverse};
  white-space: nowrap;
  pointer-events: none;
  user-select: none;
`

export default ProfessionalTimeline
