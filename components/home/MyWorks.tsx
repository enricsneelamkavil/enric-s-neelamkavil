'use client'

import styled from 'styled-components'
import Button from '@/components/common/Button'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'
import DiamondBullet from '@/components/shared/DiamondBullet'

// ─── Assets (Figma URLs — expire 7 days from generation) ─────────────────────

const IMG_URBAN_TRASH = 'https://www.figma.com/api/mcp/asset/8cee8bf9-eaf3-4809-8f96-47a9dae3fd2a'
const IMG_REPUTE_UP   = 'https://www.figma.com/api/mcp/asset/3855e47a-8b50-497a-bb0c-02d2c0d10f7f'
const IMG_UNNATHI     = 'https://www.figma.com/api/mcp/asset/dc0632b6-12a7-4dcb-aab9-18e65b4264e7'

// ─── WorkCard sub-component ───────────────────────────────────────────────────

interface WorkCardProps {
  gradient:        string
  tags:            readonly [string, string]
  title:           string
  description:     string
  buttonLabel:     string
  buttonVariant?:  'primary' | 'secondary'
  buttonHref?:     string
  buttonExternal?: boolean
  showcaseImg:     string
  showcaseAlt:     string
}

const WorkCard = ({
  gradient,
  tags,
  title,
  description,
  buttonLabel,
  buttonVariant = 'primary',
  buttonHref,
  buttonExternal,
  showcaseImg,
  showcaseAlt,
}: WorkCardProps) => (
  <CardOuter $gradient={gradient}>
    <ProductContainer>
      <ProductTagsRow>
        <TagLabel>{tags[0]}</TagLabel>
        <DiamondBullet size={6} />
        <TagLabel>{tags[1]}</TagLabel>
      </ProductTagsRow>

      <ProductInfoBlock>
        <ProductTitle>
          {title}<HighlightPeriod>.</HighlightPeriod>
        </ProductTitle>
        <ProductDescription>{description}</ProductDescription>
      </ProductInfoBlock>

      <Button
        label={buttonLabel}
        variant={buttonVariant}
        href={buttonHref}
        external={buttonExternal}
      />
    </ProductContainer>

    <ImageArea>
      <ShowcaseImg src={showcaseImg} alt={showcaseAlt} />
    </ImageArea>
  </CardOuter>
)

// ─── Component ────────────────────────────────────────────────────────────────

const MyWorks = () => {
  return (
    <Section>
      <HeaderContainer>
        <TitleBlock>
          <SectionLabel>MY WORKS · 2022 → 2026</SectionLabel>
          <SectionHeader before="Other things I've " muted="shipped" />
        </TitleBlock>
        <Button label="See all works" variant="secondary" href="/works" />
      </HeaderContainer>

      <WorkCard
        gradient="linear-gradient(174.51deg, rgb(245,255,241) 72.22%, rgb(212,242,199) 86.11%)"
        tags={['Consumer Web App', 'Waste Management']}
        title="Urban Trash"
        description="Urban Trash is a B2B waste aggregation platform dedicated to sustainable waste management. They provide solutions for businesses, ensuring efficient waste collection."
        buttonLabel="Visit Website"
        buttonVariant="primary"
        buttonHref="https://urbantrash.in"
        buttonExternal
        showcaseImg={IMG_URBAN_TRASH}
        showcaseAlt="Urban Trash product showcase"
      />

      <WorkCard
        gradient="linear-gradient(174.51deg, rgb(246,251,255) 72.22%, rgb(230,244,255) 86.11%)"
        tags={['Landing Showcase', 'Review Management']}
        title="ReputeUp AI"
        description="ReputeUp is your all-in-one tool for gathering reviews and showcasing testimonials that can drive revenue. Generate and collect Google reviews through WhatsApp/QR/SMS/Email"
        buttonLabel="View design"
        buttonVariant="secondary"
        buttonHref="#"
        showcaseImg={IMG_REPUTE_UP}
        showcaseAlt="ReputeUp AI product showcase"
      />

      <WorkCard
        gradient="linear-gradient(174.51deg, rgb(255,254,251) 72.22%, rgb(255,241,206) 86.11%)"
        tags={['Landing Showcase', 'Government NGO']}
        title="Unnathi"
        description="Unnathi (Kerala Empowerment Society) is an initiative by the Government of Kerala, registered under the Travancore-Cochin Literary, Scientific and Charitable Societies Registration Act."
        buttonLabel="View design"
        buttonVariant="secondary"
        buttonHref="#"
        showcaseImg={IMG_UNNATHI}
        showcaseAlt="Unnathi product showcase"
      />
    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// ── Section shell ─────────────────────────────────────────────────────────────

const Section = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
`

const HeaderContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  flex: 1 0 0;
  white-space: nowrap;
  min-width: 0;
`

// ── WorkCard ──────────────────────────────────────────────────────────────────

const CardOuter = styled.div<{ $gradient: string }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
  /* 29.625rem = 474px — Figma card height */
  height: 29.625rem;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[10]};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  background: ${({ $gradient }) => $gradient};
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  /* 23.875rem = 382px — Figma left column width */
  width: 23.875rem;
  flex-shrink: 0;
  height: 100%;
`

const ProductTagsRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`

const TagLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
`

const ProductInfoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`

const ProductTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: normal;
  color: ${({ theme }) => theme.colors.text.primary};
`

/* Period is red in work cards — different from hero headline's text.secondary period */
const HighlightPeriod = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

const ProductDescription = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ImageArea = styled.div`
  position: relative;
  flex: 1 0 0;
  min-width: 1px;
  height: 100%;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  overflow: hidden;
`

const ShowcaseImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: right center;
`

export default MyWorks
