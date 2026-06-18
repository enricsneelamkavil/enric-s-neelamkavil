'use client'

import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Assets ──────────────────────────────────────────────────────────────────

const IMG_APPLE_ICON = '/icons/apple.svg'

const IMG_LEFT = '/home/lander/left.webp'
const IMG_MAIN = '/home/lander/main.webp'
const IMG_RIGHT = '/home/lander/right.webp'

const LOGO_PATHS = [
  '/home/company-logos/remax-logo.svg',
  '/home/company-logos/apro-it-logo.svg',
  '/home/company-logos/urbantrash-logo.svg',
  '/home/company-logos/irisholidays-logo.svg',
  '/home/company-logos/ust-logo.svg',
  '/home/company-logos/vurse-logo.svg',
  '/home/company-logos/undesigns-logo.svg',
  '/home/company-logos/opengrad-logo.svg',
  '/home/company-logos/deep5-logo.svg',
  '/home/company-logos/mulearn-logo.svg',
] as const

// ─── Animation ───────────────────────────────────────────────────────────────

const marquee = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`

// ─── Component ────────────────────────────────────────────────────────────────

const Landing = () => {
  return (
    <Section data-section="landing">

      {/* 1 ── Main Lander */}
      <MainLander>
        <WelcomeTag>
          <TagText>Hello</TagText>
          <AppleIcon src={IMG_APPLE_ICON} alt="" />
          <TagText>Enric S Neelamkavil</TagText>
        </WelcomeTag>

        <TextContainer>
          <Headline>
            Building Products<Period>.</Period> Exploring Culture<Period>.</Period>{' '}
            Enriching Experiences<Period>.</Period>
          </Headline>
          <Subtitle>
            With award-winning branding expertise and a passion for cutting-edge design
            tools like Figma, I create compelling digital experiences tailored to your
            needs.
          </Subtitle>
        </TextContainer>
      </MainLander>

      {/* 2 ── Header Photos */}
      <PhotoRow>
        <PhotoPanel>
          <PhotoFill
            src={IMG_LEFT}
            alt="Close-up of lush green foliage and terracotta roof tiles"
          />
        </PhotoPanel>

        <PhotoPanel>
          <PhotoFill
            src={IMG_MAIN}
            alt="Portrait of Enric S Neelamkavil"
          />
        </PhotoPanel>

        <PhotoPanel>
          <PhotoFill
            src={IMG_RIGHT}
            alt="Close-up of large tropical leaves"
          />
        </PhotoPanel>
      </PhotoRow>

      {/* 3 ── Company Logos */}
      <LogoSection>
        <TrustLabel>Trusted by multiple clients worldwide</TrustLabel>
        <MarqueeWrapper>
          <MarqueeTrack>
            <LogoSet>
              {LOGO_PATHS.map((src) => (
                <LogoImage key={src} src={src} alt="" />
              ))}
            </LogoSet>
            <LogoSet aria-hidden="true">
              {LOGO_PATHS.map((src) => (
                <LogoImage key={src} src={src} alt="" />
              ))}
            </LogoSet>
          </MarqueeTrack>
        </MarqueeWrapper>
      </LogoSection>

    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 8.75rem;
  gap: ${({ theme }) => theme.spacing[20]};

  ${mq.tablet} {
    padding-top: 6rem;
    gap: ${({ theme }) => theme.spacing[10]};
  }

  ${mq.mobile} {
    padding-top: 40px;
    gap: ${({ theme }) => theme.spacing[10]};
  }
`

// ── 1: Main Lander ────────────────────────────────────────────────────────────

const MainLander = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  gap: ${({ theme }) => theme.spacing[6]};

  ${mq.mobile} {
    padding: 0 24px;
    max-width: none;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`

const WelcomeTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
`

const TagText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`

const AppleIcon = styled.img`
  width: 16px;
  height: 16px;
  max-width: none;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
  text-align: center;
`

const Headline = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  line-height: ${({ theme }) => theme.lineHeights['3xl']};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tightest};
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.tablet} {
    font-size: 3rem;
    line-height: 3.75rem;
  }

  ${mq.mobile} {
    font-size: 2rem;
    line-height: 2.5rem;
    letter-spacing: -0.64px;
  }
`

const Period = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Subtitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 44.25rem;
  text-align: center;

  ${mq.mobile} {
    font-size: 0.75rem;
    line-height: 1rem;
  }
`

// ── 2: Header Photos ─────────────────────────────────────────────────────────

const PhotoRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tablet} {
    max-width: 100%;
    padding: 0 24px;
    gap: ${({ theme }) => theme.spacing[3]};
  }

  ${mq.mobile} {
    /* Bleed: 663.952px container centered in viewport overflows on both sides */
    width: 663.952px;
    max-width: none;
    gap: 13.643px;
    flex-shrink: 0;
  }
`

const PhotoPanel = styled.div`
  position: relative;
  flex: 1 0 0;
  height: 21rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;

  ${mq.tablet} {
    height: 14rem;
  }

  ${mq.mobile} {
    height: 11.9375rem; /* 191px */
    border-radius: 9.095px;
  }
`

const PhotoFill = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
`

// ── 3: Company Logos ─────────────────────────────────────────────────────────

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[6]};

  ${mq.mobile} {
    padding: 0 24px;
  }
`

const TrustLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;

  ${mq.mobile} {
    font-size: 0.75rem;
    line-height: 1rem;
  }
`

const MarqueeWrapper = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  height: auto;
  overflow: hidden;
  -webkit-mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 6%,
    black 94%,
    transparent 100%
  );
  mask-image: linear-gradient(
    to right,
    transparent 0%,
    black 6%,
    black 94%,
    transparent 100%
  );

  ${mq.mobile} {
    /* Escape the 24px padding on LogoSection so the marquee is full-viewport-width */
    width: calc(100% + 48px);
    margin-left: -24px;
  }
`

const MarqueeTrack = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  animation: ${marquee} 40s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`

const LogoSet = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[20]};
  padding-right: ${({ theme }) => theme.spacing[20]};
  flex-shrink: 0;
`

const LogoImage = styled.img`
  display: block;
  height: auto;
  width: auto;
  max-width: none;
  flex-shrink: 0;
`

export default Landing
