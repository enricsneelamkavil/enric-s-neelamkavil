'use client'

import styled from 'styled-components'
import Button from '@/components/common/Button'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'
import DiamondBullet from '@/components/shared/DiamondBullet'
import { mq } from '@/styles/theme'


const IMG_URBAN_TRASH = 'home/works/urban-trash.webp'
const IMG_REPUTE_UP = 'home/works/repute-up.webp'
const IMG_UNNATHI = 'home/works/unnathi.webp'

// ─── WorkCard sub-component ───────────────────────────────────────────────────

interface WorkCardProps {
  gradient: string
  tags: readonly [string, string]
  title: string
  description: string
  buttonLabel: string
  buttonVariant?: 'primary' | 'secondary'
  buttonHref?: string
  buttonExternal?: boolean
  showcaseImg: string
  showcaseAlt: string
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
    {/* Image: order-1 on desktop, order-0 (first) on mobile via CSS */}
    <ImageArea>
      <ShowcaseImg src={showcaseImg} alt={showcaseAlt} />
    </ImageArea>

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
  </CardOuter>
)

// ─── Component ────────────────────────────────────────────────────────────────

const MyWorks = () => {
  return (
    <Section>
      <HeaderContainer>
        <TitleBlock>
          <SectionLabel>MY WORKS</SectionLabel>
          <SectionHeader before="Few things shipped " muted="for others" />
        </TitleBlock>
        {/* Hidden on mobile via HeaderCTA wrapper */}
        <HeaderCTA>
          <Button label="See all" variant="secondary" href="/works" />
        </HeaderCTA>
      </HeaderContainer>

      <WorkCard
        gradient="linear-gradient(173.56697364842574deg, rgb(229, 248, 220) 10.248%, rgb(212, 242, 199) 89.79%)"
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
        gradient="linear-gradient(174.1003339126334deg, rgb(238, 247, 255) 9.6176%, rgb(230, 244, 255) 90.443%)"
        tags={['Landing Showcase', 'Review Management']}
        title="ReputeUp AI"
        description="ReputeUp is your all-in-one tool for gathering reviews and showcasing testimonials that can drive revenue. Generate and collect Google reviews through WhatsApp/QR/SMS/Email"
        buttonLabel="View design"
        buttonVariant="secondary"
        buttonHref="https://www.behance.net/gallery/229810827/ReputeUp-AI-Review-Management-Landing"
        showcaseImg={IMG_REPUTE_UP}
        showcaseAlt="ReputeUp AI product showcase"
      />

      <WorkCard
        gradient="linear-gradient(173.92240614026673deg, rgb(255, 247, 228) 9.8046%, rgb(255, 241, 206) 90.195%)"
        tags={['Landing Showcase', 'Government NGO']}
        title="Unnathi"
        description="Unnathi (Kerala Empowerment Society) is an initiative by the Government of Kerala, registered under the Travancore-Cochin Literary, Scientific and Charitable Societies Registration Act."
        buttonLabel="View design"
        buttonVariant="secondary"
        buttonHref="https://www.behance.net/gallery/177469589/Unnathi-Kerala-Website-Showcase"
        showcaseImg={IMG_UNNATHI}
        showcaseAlt="Unnathi product showcase"
      />
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

  ${mq.mobile} {
    white-space: normal;
  }
`

const HeaderCTA = styled.div`
  flex-shrink: 0;

  ${mq.mobile} {
    display: none;
  }
`

// ── WorkCard ──────────────────────────────────────────────────────────────────

const CardOuter = styled.div<{ $gradient: string }>`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[2]};
  height: 29.625rem;
  width: 100%;
  padding: ${({ theme }) => theme.spacing[10]};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  background: ${({ $gradient }) => $gradient};

  /* Desktop: ProductContainer left, ImageArea right */
  & > *:first-child { order: 2; } /* ImageArea → right */
  & > *:last-child  { order: 1; } /* ProductContainer → left */

  ${mq.tablet} {
    height: auto;
    min-height: 320px;
    padding: ${({ theme }) => theme.spacing[6]};
  }

  ${mq.mobile} {
    flex-direction: column;
    height: auto;
    padding: 24px 12px;
    gap: 16px;
    border-radius: ${({ theme }) => theme.radii.xl};

    /* Mobile: ImageArea first, ProductContainer second */
    & > *:first-child { order: 1; } /* ImageArea → top */
    & > *:last-child  { order: 2; } /* ProductContainer → bottom */
  }
`

const ProductContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  width: 23.875rem;
  flex-shrink: 0;
  height: 100%;

  ${mq.tablet} {
    height: auto;
    gap: ${({ theme }) => theme.spacing[6]};
  }

  ${mq.mobile} {
    width: 100%;
    flex-shrink: 1;
    height: auto;
    gap: 16px;
    padding: 12px;
    justify-content: flex-start;
  }
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

  ${mq.mobile} {
    gap: 12px;
  }
`

const ProductTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xl};
  line-height: normal;
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.tablet} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
  }

  ${mq.mobile} {
    font-size: 2rem;
    line-height: 2.5rem;
  }
`

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

  ${mq.tablet} {
    flex: 1 0 0;
    height: 220px;
  }

  ${mq.mobile} {
    flex: none;
    width: 100%;
    height: auto;
    overflow: hidden;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`

const ShowcaseImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: right center;

  ${mq.mobile} {
    width: 100%;
    height: auto;
    object-fit: unset;
    object-position: unset;
  }
`

export default MyWorks
