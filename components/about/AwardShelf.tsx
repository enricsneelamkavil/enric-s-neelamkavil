import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Seal assets ──────────────────────────────────────────────────────────────
// RGBA PNGs — circular seal shape baked into transparency

const SEAL_AWWWARDS = '/about/seals/awwwards.png'
const SEAL_UST      = '/about/seals/ust.png'
const SEAL_FIGMA    = '/about/seals/figma.png'
const SEAL_KSUM     = '/about/seals/ksum.png'

// ─── Award data ───────────────────────────────────────────────────────────────

const AWARDS = [
  { name: 'Awwwards Young Jury',   subtitle: 'Jury Member (2026, 2025)',              seal: SEAL_AWWWARDS },
  { name: 'USTAR',                 subtitle: 'Best Performer (2025)',                 seal: SEAL_UST      },
  { name: 'Awwwards Honors',       subtitle: 'enric.design (2025)',                   seal: SEAL_AWWWARDS },
  { name: 'Config APAC Attendee',  subtitle: 'Marina Bay Sands, Singapore (2024)',    seal: SEAL_FIGMA    },
  { name: 'Huddle Designers Award',subtitle: 'Kelp Kookies (2023)',                   seal: SEAL_KSUM     },
] as const

// ─── AwardCard ────────────────────────────────────────────────────────────────

interface AwardCardProps {
  name:     string
  subtitle: string
  seal:     string
}

const AwardCard = ({ name, subtitle, seal }: AwardCardProps) => (
  <CardWrapper>
    <SealBox>
      <SealImg src={seal} alt={name} />
    </SealBox>
    <AwardInfo>
      <AwardName>{name}</AwardName>
      <AwardSubtitle>{subtitle}</AwardSubtitle>
    </AwardInfo>
  </CardWrapper>
)

// ─── Component ────────────────────────────────────────────────────────────────

const AwardShelf = () => (
  <Section>
    <TitleContainer>
      <SectionLabel>Recognition</SectionLabel>
      <SectionHeader before="A " muted="shelf " after="of awards." />
    </TitleContainer>

    <AwardsRow>
      {AWARDS.map((award) => (
        <AwardCard key={award.name} {...award} />
      ))}
    </AwardsRow>
  </Section>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tablet} {
    padding: 0 24px;
  }

  ${mq.mobile} {
    padding: 0 24px;
    max-width: none;
    gap: 40px;
  }
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap;

  ${mq.mobile} {
    white-space: normal;
  }
`

const AwardsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;

  ${mq.tablet} {
    gap: 24px;
    justify-content: flex-start;
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }

  ${mq.mobile} {
    justify-content: flex-start;
    gap: 32px;
    overflow-x: auto;
    scroll-snap-type: x mandatory;
    -webkit-overflow-scrolling: touch;
    scrollbar-width: none;
    padding-bottom: 4px;
    &::-webkit-scrollbar { display: none; }
  }
`

// ── Card ──────────────────────────────────────────────────────────────────────

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};  /* 8px */
  width: 212px;
  flex-shrink: 0;

  ${mq.mobile} {
    scroll-snap-align: start;
    width: 160px;
  }
`

const SealBox = styled.div`
  position: relative;
  width: 120px;
  height: 120px;
  flex-shrink: 0;

  ${mq.mobile} {
    width: 96px;
    height: 96px;
  }
`

const SealImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  pointer-events: none;
  display: block;
`

const AwardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};  /* 4px */
  text-align: center;
  width: 100%;
`

const AwardName = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`

const AwardSubtitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export default AwardShelf
