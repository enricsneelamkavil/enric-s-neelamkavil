'use client'

import styled from 'styled-components'
import Button from '@/components/common/Button'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'
import DiamondBullet from '@/components/shared/DiamondBullet'
import { mq } from '@/styles/theme'


const IMG_BG = '/home/plush-feature.webp'
const IMG_PLUSH_LOGO = 'home/plush-logo.svg'


const FEATURES = [
  'Discover the right card based on your lifestyle & spending habits.',
  'Optimise your card portfolio & plan future upgrades.',
  'Learn real experiences, card combinations, and community insights.',
] as const



const FeatureProduct = () => {
  return (
    <Section>
      <TitleContainer>
        <SectionLabel>The one I built solo</SectionLabel>
        <SectionHeader before="A product of " muted="my own" />
      </TitleContainer>

      <Article>
        {/* ── Left: image panel ── */}
        <ImagePanel>
          <BgImage src={IMG_BG} alt="" />
        </ImagePanel>

        {/* ── Right: content ── */}
        <Content>
          <LogoGroup>
            <PlushLogo src={IMG_PLUSH_LOGO} alt="Plush" />
            <Tagline>Your Personalised AI Powered Credit Card Assistant</Tagline>
          </LogoGroup>

          <Description>
            Plush simplifies the credit card ecosystem through card discovery, comparison,
            personalised portfolio tracking, and community-driven insights. Built to replace
            confusion with clarity, Plush helps users make smarter card decisions without
            pressure, complexity, or unnecessary financial jargon.
          </Description>

          <FeatureList>
            {FEATURES.map((f) => (
              <FeatureRow key={f}>
                <DiamondBullet size={8} />
                <FeatureText>{f}</FeatureText>
              </FeatureRow>
            ))}
          </FeatureList>

          <Button
            label="Visit Plush"
            variant="primary"
            href="https://plush.money"
            external
          />
        </Content>
      </Article>
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
    gap: 32px;
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

const Article = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  padding: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii['3xl']};

  ${mq.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: 32px;
    border-radius: ${({ theme }) => theme.radii.xl};
    padding: 24px;
  }
`

// ── Image panel ───────────────────────────────────────────────────────────────

const ImagePanel = styled.div`
  position: relative;
  width: 33.75rem;
  height: 29.625rem;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii['2xl']};
  overflow: hidden;
  background: linear-gradient(to bottom, #f3efe6, #ebe5d8);

  ${mq.tablet} {
    flex: 1 0 0;
    width: auto;
  }

  ${mq.mobile} {
    width: 100%;
    height: auto;
    aspect-ratio: 540 / 474;
    flex-shrink: 1;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`

const BgImage = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
`

// ── Right content ─────────────────────────────────────────────────────────────

const Content = styled.div`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  gap: ${({ theme }) => theme.spacing[6]};
  justify-content: center;
  height: 100%;
  min-width: 0;

  ${mq.mobile} {
    flex: none;
    height: auto;
  }
`

const LogoGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`

const PlushLogo = styled.img`
  display: block;
  width: 189.157px;
  height: 56px;
  max-width: none;

  ${mq.mobile} {
    width: 136.05px;
    height: 40.278px;
  }
`

const Tagline = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

const Description = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`

const FeatureList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};

  ${mq.mobile} {
    display: none;
  }
`

const FeatureRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`

const FeatureText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: normal;
`

export default FeatureProduct
