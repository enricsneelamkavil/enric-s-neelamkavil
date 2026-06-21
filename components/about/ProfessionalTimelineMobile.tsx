import styled from 'styled-components'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Figma-derived layout constants (Size=SM, node 261:1062) ─────────────────

const STRIP_W = 137   // center column width, px
const STRIP_H = 1304  // center column height, px
const COL_H = 1306  // event column height, px
const COL_W = 100   // event column width, px

// 10px and 14px are outside the theme scale — Figma-derived
const MOBILE_DESC_FONT_SIZE = '10px'
const MOBILE_DESC_LINE_HEIGHT = '14px'
// Year label tracking from Figma SM spec (-0.64px, differs from desktop -1.6px)
const YEAR_TRACKING = '-0.64px'

const IMG_SHAPE_MASK = '/about/timeline/shape-mask.svg'

// ─── Event data ───────────────────────────────────────────────────────────────

interface TLEvent { title: string; sub: string; desc: string }

const TOP_EVENTS: TLEvent[] = [
  { title: 'Co-host', sub: 'BEACH HACK 5', desc: 'Co-hosted the 5th edition of the flagship event Beach hackathon.' },
  { title: 'Founder Host', sub: "CODe Design Week (CDW '23)", desc: 'Hosted the first ever Design Week, in Engineering Colleges across Kerala.' },
  { title: 'Designers Award', sub: 'Huddle Global', desc: 'Secured the position in Top 13 Designers in Branding Challenge.' },
  { title: 'Speaker', sub: 'Christ College of Engieering', desc: 'Handled multiple sessions on interface design for digital products.' },
  { title: 'Invited Attendee', sub: 'Config APAC', desc: "Figma's first Config APAC at Marina Bay Sands Conventional Center, Singapore." },
  { title: 'Attendee', sub: 'Figma India Launch', desc: "Attended Figma's India office Launch representing Strollby Design." },
]

const BOTTOM_EVENTS: TLEvent[] = [
  { title: 'Chairman', sub: 'Community of Developers (CODe)', desc: 'Association of Department of Computer Science, Christ College of Engineering.' },
  { title: 'UI Designer', sub: 'GTech MuLearn', desc: 'First Internship as UI Designer, led a team, mentored junior designers.' },
  { title: 'Attendee', sub: 'Lollypop Designathon', desc: 'Shortlisted attendee for Designathon 2024 hosted by Lollypop Design Studio.' },
  { title: 'Lead Host', sub: 'DESIGNATHON 2024', desc: "Hosted second edition of Designathon, after CODe Design Week '23." },
  { title: 'Graduation', sub: 'Christ College of Engieering', desc: 'Graduated Bachelors of Engineering in Computer Science & Engineering.' },
  { title: 'Young Jury 2025', sub: 'Awwwards.', desc: 'Selected as a jury member, evaluating and rating top digital designs globally.' },
]

// ─── Photo data (SM variant — aspect ratios from Figma 261:1062) ─────────────

type PositionedPhoto = { kind: 'positioned'; src: string; ar: string; w: string; h: string; l: string; t: string }
type SimplePhoto = { kind: 'simple'; src: string; ar: string; pos: 'bottom' | 'center' }
type MobilePhoto = PositionedPhoto | SimplePhoto

const MOBILE_PHOTOS: MobilePhoto[] = [
  { kind: 'simple', src: '/about/timeline/tl-image-1.webp', ar: '181/137', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-2.webp', ar: '230/137', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-3.webp', ar: '180/137', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-4.webp', ar: '235/137', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-5.webp', ar: '188/137', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-6.webp', ar: '259/137', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-7.webp', ar: '181/137', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-8.webp', ar: '170/137', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-9.webp', ar: '149/137', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-10.webp', ar: '155/137', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-11.webp', ar: '2363/3150', pos: 'center' },
  { kind: 'simple', src: '/about/timeline/tl-image-12.webp', ar: '177/137', pos: 'center' },
]

// Year label vertical positions derived from Figma horizontal strip coords.
// Figma places labels at `left: X` in a horizontal strip (width=1304px) rotated
// -90deg. After rotation: top_in_column = strip_width - horizontal_left.
// Figma: 2025→left=279, 2024→731, 2023→983, 2022→1179
const YEAR_LABELS = [
  { text: '> 2022', top: 125 },
  { text: '> 2023', top: 321 },
  { text: '> 2024', top: 573 },
  { text: '> 2025', top: 1025 },
]

// ─── Sub-components ───────────────────────────────────────────────────────────

const MobileEvent = ({ e }: { e: TLEvent }) => (
  <EventBlock>
    <EventHeader>
      <EventTitle>{e.title}</EventTitle>
      <EventSub>{e.sub}</EventSub>
    </EventHeader>
    <EventDesc>{e.desc}</EventDesc>
  </EventBlock>
)

const MobilePhotoCell = ({ p }: { p: MobilePhoto }) => (
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
          style={{ position: 'absolute', inset: 0, width: '100%', height: '100%', objectFit: 'cover', objectPosition: p.pos, maxWidth: 'none' }}
        />
      )}
      <RedOverlay />
    </PhotoInner>
  </PhotoCell>
)

// ─── Component ────────────────────────────────────────────────────────────────

const ProfessionalTimelineMobile = () => (
  <Section>
    <TitleBlock>
      <SectionLabel>MY JOURNEY 2022 → 2026</SectionLabel>
      <SectionHeader before="Being through " muted="so far" after="." />
    </TitleBlock>

    <TimelineLayout>
      <LeftColumn>
        {TOP_EVENTS.map((e, i) => <MobileEvent key={i} e={e} />)}
      </LeftColumn>

      <StripWrapper>
        <StripContent>
          {MOBILE_PHOTOS.map((p, i) => <MobilePhotoCell key={i} p={p} />)}
        </StripContent>
        {YEAR_LABELS.map((y) => (
          <YearLabelWrap key={y.text} $top={y.top}>
            <YearLabelText>{y.text}</YearLabelText>
          </YearLabelWrap>
        ))}
      </StripWrapper>

      <RightColumn>
        {BOTTOM_EVENTS.map((e, i) => <MobileEvent key={i} e={e} />)}
      </RightColumn>
    </TimelineLayout>
  </Section>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const TimelineLayout = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[2]};
  align-items: flex-start;
`

// ── Event columns ─────────────────────────────────────────────────────────────

const LeftColumn = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${COL_H}px;
  padding-top: 100px;
`

const RightColumn = styled.div`
  flex: 1;
  min-width: 0;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: ${COL_H}px;
  padding-bottom: 100px;
`

const EventBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
`

const EventHeader = styled.div`
  display: flex;
  flex-direction: column;
`

const EventTitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`

const EventSub = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.highlight};
`

const EventDesc = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${MOBILE_DESC_FONT_SIZE};
  line-height: ${MOBILE_DESC_LINE_HEIGHT};
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ── Center photo strip ────────────────────────────────────────────────────────

const StripWrapper = styled.div`
  position: relative;
  width: ${STRIP_W}px;
  height: ${STRIP_H}px;
  flex-shrink: 0;
  /* Clean pixel-perfect notch using clip-path, replacing distorted SVG rotation */
  clip-path: polygon(0 0, 50% 40px, 100% 0, 100% 100%, 50% calc(100% - 40px), 0 100%);

  @media (max-width: 402px) {
    width: 90px;
    /* Slightly shallower notch for the narrower width */
    clip-path: polygon(0 0, 50% 32px, 100% 0, 100% 100%, 50% calc(100% - 32px), 0 100%);
  }
`

const StripContent = styled.div`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: ${STRIP_W}px;
  height: 100%;
`

const PhotoCell = styled.div`
  position: relative;
  width: 100%;
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

// ── Year labels ───────────────────────────────────────────────────────────────

interface YearLabelProps { $top: number }

const YearLabelWrap = styled.div<YearLabelProps>`
  position: absolute;
  top: ${({ $top }) => $top}px;
  left: 0;
  transform: translateY(-50%);
  pointer-events: none;
`

const YearLabelText = styled.span`
  display: block;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.md};  /* 24px — fits within 137px strip */
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  letter-spacing: ${YEAR_TRACKING};
  color: ${({ theme }) => theme.colors.text.inverse};
  white-space: nowrap;
  user-select: none;
`

export default ProfessionalTimelineMobile
