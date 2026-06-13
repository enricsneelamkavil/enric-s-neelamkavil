'use client'

import styled, { keyframes } from 'styled-components'

// ─── Assets ──────────────────────────────────────────────────────────────────
// All Figma URLs expire 7 days from generation

const IMG_APPLE_ICON = 'https://www.figma.com/api/mcp/asset/9d335656-3da1-4e16-aaa5-c0659c20541e'

// TODO: replace with Supabase Storage URLs once photos are uploaded
const IMG_LEFT  = 'https://www.figma.com/api/mcp/asset/fcb8b190-87c9-4c8d-a91f-0db3aaaa9abc'
const IMG_MAIN  = 'https://www.figma.com/api/mcp/asset/6ca82b31-c4ff-42fe-85e1-c7b9a4055c7e'
const IMG_RIGHT = 'https://www.figma.com/api/mcp/asset/c401e8db-b79b-4df1-8744-67e108295e9b'

const IMG_LOGOS = 'https://www.figma.com/api/mcp/asset/c76576f3-a84a-4924-bc0d-442d46b0534f'

// ─── Animation ───────────────────────────────────────────────────────────────

const marqueeScroll = keyframes`
  from { transform: translateX(0); }
  to   { transform: translateX(-50%); }
`

// ─── Component ────────────────────────────────────────────────────────────────

const Landing = () => {
  return (
    <Section>

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
        {/* TODO: replace with Supabase Storage URL — foliage + terracotta roof tiles */}
        <PhotoPanel>
          <PhotoFill
            src={IMG_LEFT}
            alt="Close-up of lush green foliage and terracotta roof tiles"
          />
        </PhotoPanel>

        {/* TODO: replace with Supabase Storage URL — portrait of Enric */}
        <PhotoPanel>
          <PhotoZoomed
            src={IMG_MAIN}
            alt="Portrait of Enric S Neelamkavil"
            $left="-68.8%"
            $top="-83.29%"
            $width="262.89%"
            $height="392.46%"
          />
        </PhotoPanel>

        {/* TODO: replace with Supabase Storage URL — tropical leaves close-up */}
        <PhotoPanel>
          <PhotoZoomed
            src={IMG_RIGHT}
            alt="Close-up of large tropical leaves"
            $left="-173.11%"
            $top="-83.2%"
            $width="273.06%"
            $height="392.46%"
          />
        </PhotoPanel>
      </PhotoRow>

      {/* 3 ── Company Logos */}
      <LogoSection>
        <TrustLabel>Trusted by multiple clients worldwide</TrustLabel>
        <MarqueeWrapper>
          <MarqueeTrack>
            <LogoImage src={IMG_LOGOS} alt="Client logos" />
            <LogoImage src={IMG_LOGOS} alt="" aria-hidden="true" />
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
  /* 8.75rem = 140px — matches Figma Content frame y-offset; clears fixed navbar */
  padding-top: 8.75rem;
  gap: ${({ theme }) => theme.spacing[20]};
`

// ── 1: Main Lander ────────────────────────────────────────────────────────────

const MainLander = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  gap: ${({ theme }) => theme.spacing[6]};
`

const WelcomeTag = styled.div`
  display: inline-flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[3]} ${theme.spacing[4]}`};
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
  /* 10px decorative separator icon; Figma asset, replace when uploading to storage */
  height: 0.625rem;
  width: auto;
`

const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  text-align: center;
`

const Headline = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  /* Figma specifies Stack_Sans_Notch:Medium — not the Regular used in SectionHeader */
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  line-height: ${({ theme }) => theme.lineHeights['3xl']};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tightest};
  color: ${({ theme }) => theme.colors.text.primary};
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
  /* 44.25rem = 708px — explicit width constraint from Figma */
  max-width: 44.25rem;
  text-align: center;
`

// ── 2: Header Photos ─────────────────────────────────────────────────────────

const PhotoRow = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
`

const PhotoPanel = styled.div`
  position: relative;
  flex: 1 0 0;
  /* 21rem = 336px — Figma panel height, no theme token at this value */
  height: 21rem;
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
`

const PhotoFill = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: bottom;
`

interface PhotoZoomedProps {
  $left: string
  $top: string
  $width: string
  $height: string
}

const PhotoZoomed = styled.img<PhotoZoomedProps>`
  position: absolute;
  /* max-width: none overrides global img { max-width: 100% } — image is intentionally oversized for cropping */
  max-width: none;
  left: ${({ $left }) => $left};
  top: ${({ $top }) => $top};
  width: ${({ $width }) => $width};
  height: ${({ $height }) => $height};
`

// ── 3: Company Logos ─────────────────────────────────────────────────────────

const LogoSection = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[6]};
`

const TrustLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-align: center;
`

const MarqueeWrapper = styled.div`
  width: 100%;
  /* 3.5rem = 56px — Figma logo strip height */
  height: 3.5rem;
  overflow: hidden;
  /* replicates Figma's mask asset with a CSS gradient edge-fade */
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
`

const MarqueeTrack = styled.div`
  display: flex;
  width: max-content;
  animation: ${marqueeScroll} 30s linear infinite;

  &:hover {
    animation-play-state: paused;
  }
`

const LogoImage = styled.img`
  /* 3.5rem = 56px — matches MarqueeWrapper height */
  height: 3.5rem;
  width: auto;
  /* max-width: none overrides global reset — logo strip is a wide flat image */
  max-width: none;
  flex-shrink: 0;
`

export default Landing
