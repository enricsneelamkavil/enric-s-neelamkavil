'use client'

import Image from 'next/image'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Layout constants (Figma-derived) ────────────────────────────────────────
const LOGO_SIZE = 120
const PLATFORM_SIZE_DESKTOP = 32
const PLATFORM_SIZE_MOBILE = 40
const PLATFORM_RADIUS_DESKTOP = 8
const PLATFORM_RADIUS_MOBILE = 12

// ─── Data ────────────────────────────────────────────────────────────────────
const PLATFORMS = [
  {
    name: 'YouTube',
    src: '/app-icons/youtube.webp',
    href: 'https://www.youtube.com/playlist?list=PLhx_ytf61w01eqEuGXrV88F3EaY-8YvKc',
  },
  {
    name: 'Spotify',
    src: '/app-icons/spotify.webp',
    href: 'https://open.spotify.com/show/5AZaUyunCb3vo7EGzb67gf',
  },
  {
    name: 'Apple Podcasts',
    src: '/app-icons/apple-podcasts.webp',
    href: 'https://podcasts.apple.com/in/podcast/chumma-oru-podcast/id1879025130',
  },
]

// ─── Component ───────────────────────────────────────────────────────────────
const PodcastSection = () => (
  <Section>
    <TitleBlock>
      <SectionLabel>SOMETIMES I SPEAK</SectionLabel>
      <SectionHeader before="Hear my " muted="Podcast" after="." />
    </TitleBlock>

    <ContentRow>
      <PodcastLogo
        src="/about/personal/podcast-logo.webp"
        alt="Chumma Oru Podcast"
        width={LOGO_SIZE}
        height={LOGO_SIZE}
      />

      <InfoBlock>
        <PodcastName>Chumma Oru Podcast</PodcastName>
        <PodcastDesc>
          An informal podcast where I share thoughts as they come. Chumma Oru Podcast covers a
          mix of random topics, honest conversations, and plenty of casual chatter, all while
          keeping the fun alive.
        </PodcastDesc>
        <LinksRow>
          <LinksLabel>Watch Latest Episodes on:</LinksLabel>
          <PlatformsRow>
            {PLATFORMS.map(({ name, src, href }) => (
              <PlatformLink
                key={name}
                href={href}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={name}
              >
                <Image src={src} alt={name} draggable={false} fill sizes="40px" />
              </PlatformLink>
            ))}
          </PlatformsRow>
        </LinksRow>
      </InfoBlock>
    </ContentRow>
  </Section>
)

// ─── Styles ──────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tablet} { max-width: none; }
  ${mq.mobile} { max-width: none; }
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const ContentRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: center;
  width: 100%;

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`

const PodcastLogo = styled(Image)`
  display: block;
  width: ${LOGO_SIZE}px;
  height: ${LOGO_SIZE}px;
  flex-shrink: 0;
  object-fit: cover;
`

const InfoBlock = styled.div`
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  justify-content: center;
`

const PodcastName = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
`

const PodcastDesc = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const LinksRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`

const LinksLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
`

const PlatformsRow = styled.div`
  display: flex;
  gap: 12px;
  align-items: center;
`

const PlatformLink = styled.a`
  position: relative;
  display: block;
  width: ${PLATFORM_SIZE_DESKTOP}px;
  height: ${PLATFORM_SIZE_DESKTOP}px;
  border-radius: ${PLATFORM_RADIUS_DESKTOP}px;
  box-shadow: 0 0 12px rgba(0, 0, 0, 0.15);
  overflow: hidden;
  flex-shrink: 0;

  img {
    display: block;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
  }

  ${mq.mobile} {
    width: ${PLATFORM_SIZE_MOBILE}px;
    height: ${PLATFORM_SIZE_MOBILE}px;
    border-radius: ${PLATFORM_RADIUS_MOBILE}px;
  }
`

export default PodcastSection
