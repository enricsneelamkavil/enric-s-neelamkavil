'use client'

import styled from 'styled-components'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Assets (Figma URLs — expire 7 days from generation) ─────────────────────

const IMG_GARLAND        = 'https://www.figma.com/api/mcp/asset/18f3a216-31d7-4837-ae55-d0c1e79fcc7b'
const IMG_AWWWARDS_LOGO  = 'https://www.figma.com/api/mcp/asset/d45c183c-0fe6-429a-b172-bd41d9405dc2'
const IMG_AWWWARDS_LOGO_1 = 'https://www.figma.com/api/mcp/asset/2817eda1-505e-436d-95c1-c70e295d5355'
const IMG_CONFIG_LOGO    = 'https://www.figma.com/api/mcp/asset/b156ad87-22fd-46e9-9459-2af0c93de7f3'
const IMG_HUDDLE_LOGO    = 'https://www.figma.com/api/mcp/asset/cbd529d0-f98f-4ca4-bd73-fa8ed211bd99'

// ─── Data ─────────────────────────────────────────────────────────────────────

const AWARDS = [
  {
    name:     'Awwwards Young Jury',
    subtitle: 'Jury Member (2026, 2025)',
    logo:     IMG_AWWWARDS_LOGO,
  },
  {
    name:     'Awwwards Honors',
    subtitle: 'enric.design (2025)',
    logo:     IMG_AWWWARDS_LOGO_1,
  },
  {
    name:     'Config APAC Attendee',
    subtitle: 'Marina Bay Sands, Singapore (2024)',
    logo:     IMG_CONFIG_LOGO,
  },
  {
    name:     'Huddle Designers Award',
    subtitle: 'Kelp Kookies (2023)',
    logo:     IMG_HUDDLE_LOGO,
  },
] as const

// ─── AwardCard sub-component ──────────────────────────────────────────────────

interface AwardCardProps {
  name:     string
  subtitle: string
  logo:     string
}

const AwardCard = ({ name, subtitle, logo }: AwardCardProps) => (
  <CardWrapper>
    <GarlandWrapper>
      <GarlandImg src={IMG_GARLAND} alt="" />
      {/* Logo sits in the bowl of the wreath — ~28% from top, centered */}
      <AwardLogo src={logo} alt={name} />
    </GarlandWrapper>
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

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap;
`

const AwardsRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

// ── Award card ────────────────────────────────────────────────────────────────

const CardWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  /* 13.25rem = 212px — Figma explicit card width */
  width: 13.25rem;
`

const GarlandWrapper = styled.div`
  position: relative;
  /* 9.5rem × 7.5rem = 152px × 120px — Figma garland dimensions */
  width: 9.5rem;
  height: 7.5rem;
  flex-shrink: 0;
`

const GarlandImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
`

const AwardLogo = styled.img`
  position: absolute;
  /* Figma: left:50%, top:50%-27.78px → sits in the upper bowl of the wreath */
  top: 28%;
  left: 50%;
  transform: translateX(-50%);
  /* 1.9375rem = 31px — Figma logo width; height scales with aspect ratio */
  width: 1.9375rem;
  height: auto;
  max-width: none;
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
