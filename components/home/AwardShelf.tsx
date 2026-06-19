'use client'

import styled from 'styled-components'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'
import { mq } from '@/styles/theme'

const IMG_GARLAND = '/home/garland.webp'

const AWARDS = [
  {
    name: 'Awwwards Young Jury',
    subtitle: 'Jury Member (2026, 2025)',
    logo: 'home/awards-logos/awwwards.svg',
  },
  {
    name: 'Awwwards Honors',
    subtitle: 'enric.design (2025)',
    logo: 'home/awards-logos/awwwards.svg',
  },
  {
    name: 'Config APAC Attendee',
    subtitle: 'Marina Bay Sands, Singapore (2024)',
    logo: 'home/awards-logos/figma.svg',
  },
  {
    name: 'Huddle Designers Award',
    subtitle: 'Kelp Kookies (2023)',
    logo: 'home/awards-logos/ksum.svg',
  },
] as const

// ─── AwardCard sub-component ──────────────────────────────────────────────────

interface AwardCardProps {
  name: string
  subtitle: string
  logo: string
}

const AwardCard = ({ name, subtitle, logo }: AwardCardProps) => (
  <CardWrapper>
    <GarlandWrapper>
      <GarlandImg src={IMG_GARLAND} alt="" />
    </GarlandWrapper>
    <AwardLogo src={logo} alt={name} />
    <AwardInfo>
      <AwardName>{name}</AwardName>
      <AwardSubtitle>{subtitle}</AwardSubtitle>
    </AwardInfo>
  </CardWrapper>
)

// ─── Component ────────────────────────────────────────────────────────────────

const AwardShelf = () => {
  return (
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
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.mobile} {
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

// ── Award card ────────────────────────────────────────────────────────────────

const CardWrapper = styled.div`
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  /* 13.25rem = 212px — Figma explicit card width */
  width: 13.25rem;
  flex-shrink: 0;

  ${mq.mobile} {
    scroll-snap-align: start;
  }
`

const GarlandWrapper = styled.div`
  position: relative;
  width: 9.5rem;
  height: 7.5rem;
  flex-shrink: 0;
`

const GarlandImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-position: bottom;
  max-width: none;
  pointer-events: none;
`

const AwardLogo = styled.img`
  position: absolute;
  top: calc(50% - 27.78px);
  left: 50%;
  transform: translate(-50%, -50%);
  width: 40px;
  height: 40px;
`

const AwardInfo = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
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
