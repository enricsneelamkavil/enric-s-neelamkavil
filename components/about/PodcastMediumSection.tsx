import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Data ────────────────────────────────────────────────────────────────────

const YOUTUBE_URL = 'https://www.youtube.com/playlist?list=PLhx_ytf61w01eqEuGXrV88F3EaY-8YvKc'

const PLATFORMS = [
  { name: 'YouTube', src: '/about/personal/podcast/youtube.webp', href: YOUTUBE_URL },
  { name: 'Spotify', src: '/about/personal/podcast/spotify.webp', href: 'https://open.spotify.com/show/5AZaUyunCb3vo7EGzb67gf' },
  { name: 'Apple Podcasts', src: '/about/personal/podcast/apple-podcasts.webp', href: 'https://podcasts.apple.com/in/podcast/chumma-oru-podcast/id1879025130' },
]

const ARTICLES = [
  { title: 'I Failed the Challenge and Still Got an Apple Watch for Free', readTime: '5 min read' },
  { title: 'The Portfolio I Never Submitted Got Me to awwwards.', readTime: '3 min read' },
  { title: 'From Nothing to a DESIGNER today!', readTime: '4 min read' },
]

const MEDIUM_URL = 'https://medium.com/@enricsneelamkavil'

// ─── Component ───────────────────────────────────────────────────────────────

const PodcastMediumSection = () => (
  <Section>
    {/* ── Left: Podcast column ─────────────────────────────────────────── */}
    <Column>
      <TitleBlock>
        <SectionLabel>SOMETIMES I SPEAK</SectionLabel>
        <SectionHeader before="Chumma Oru " muted="Podcast" after="." />
      </TitleBlock>

      <PodcastContent>
        {/* Logo + episode count + watch link */}
        <PodcastRow>
          <PodcastLogo
            src="/about/personal/podcast/podcast-logo.webp"
            alt="Chumma Oru Podcast"
            width={64}
            height={64}
          />
          <PodcastInfo>
            <EpisodeCount>04 EPISODES</EpisodeCount>
            <WatchLink href={YOUTUBE_URL} target="_blank" rel="noopener noreferrer">
              <WatchText>Watch Latest Episode</WatchText>
              <WatchPill>
                <img
                  src="/about/personal/podcast/arrow-watch.svg"
                  alt=""
                  aria-hidden="true"
                  width={10}
                  height={10}
                />
              </WatchPill>
            </WatchLink>
          </PodcastInfo>
        </PodcastRow>

        <PodcastDesc>
          An informal podcast where I share thoughts as they come. Chumma Oru Podcast covers a
          mix of random topics, honest conversations, and plenty of casual chatter, all while
          keeping the fun alive.
        </PodcastDesc>

        <PlatformRow>
          {PLATFORMS.map(({ name, src, href }) => (
            <PlatformLink
              key={name}
              href={href}
              target="_blank"
              rel="noopener noreferrer"
              aria-label={name}
            >
              <img src={src} alt={name} draggable={false} />
            </PlatformLink>
          ))}
        </PlatformRow>
      </PodcastContent>
    </Column>

    {/* ── Right: Writing column ─────────────────────────────────────────── */}
    <Column>
      <TitleBlock>
        <SectionLabel>SOMETIMES I WRITE</SectionLabel>
        <SectionHeader before="Medium " muted="Articles" after="." />
      </TitleBlock>

      <WritingContent>
        <ArticleList>
          {ARTICLES.map(({ title, readTime }, i) => (
            <ArticleRow
              key={title}
              href={MEDIUM_URL}
              target="_blank"
              rel="noopener noreferrer"
              $first={i === 0}
            >
              <ArticleInfo>
                <ArticleTitle>{title}</ArticleTitle>
                <ArticleReadTime>{readTime}</ArticleReadTime>
              </ArticleInfo>
              <ArrowWrap>
                <img
                  src="/about/personal/podcast/arrow-article.svg"
                  alt=""
                  aria-hidden="true"
                  width={24}
                  height={24}
                />
              </ArrowWrap>
            </ArticleRow>
          ))}
        </ArticleList>
      </WritingContent>
    </Column>
  </Section>
)

// ─── Styles ──────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: flex-start;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tablet} {
    max-width: none;
  }

  ${mq.mobile} {
    max-width: none;
    flex-direction: column;
  }
`

const Column = styled.div`
  flex: 0 0 564px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};

  ${mq.tablet} {
    flex: 1 0 0;
    min-width: 0;
  }

  ${mq.mobile} {
    flex: none;
    width: 100%;
  }
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

// ── Podcast content ────────────────────────────────────────────────────────────

const PodcastContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`

const PodcastRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: center;
`

const PodcastLogo = styled.img`
  display: block;
  width: 64px;
  height: 64px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.xl};
`

const PodcastInfo = styled.div`
  display: flex;
  flex-direction: column;
`

const EpisodeCount = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
  white-space: nowrap;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

const WatchLink = styled.a`
  display: flex;
  align-items: center;
  gap: 12px;
  text-decoration: none;
  cursor: pointer;
`

const WatchText = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }
`

const WatchPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: ${({ theme }) => theme.colors.icon.secondary};
  border-radius: 9px;
  flex-shrink: 0;

  img { display: block; }

  ${mq.mobile} {
    width: 16px;
    height: 16px;
  }
`

const PodcastDesc = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const PlatformRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: flex-start;

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[4]};
  }
`

const PlatformLink = styled.a`
  position: relative;
  display: block;
  width: 64px;
  height: 64px;
  border-radius: ${({ theme }) => theme.radii.xl};
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
    width: 40px;
    height: 40px;
    border-radius: ${({ theme }) => theme.radii.lg};
  }
`

// ── Writing content ────────────────────────────────────────────────────────────

const WritingContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
`

const WritingDesc = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ArticleList = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

interface ArticleRowProps { $first: boolean }

const ArticleRow = styled.a<ArticleRowProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: center;
  padding: 12px 0;
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  ${({ $first, theme }) => $first && `border-top: 1px solid ${theme.colors.border.tertiary};`}
  cursor: pointer;
`

const ArticleInfo = styled.div`
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const ArticleTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`

const ArticleReadTime = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  white-space: nowrap;
`

const ArrowWrap = styled.div`
  overflow: clip;
  width: 24px;
  height: 24px;
  flex-shrink: 0;

  img { display: block; width: 100%; height: 100%; }
`

export default PodcastMediumSection
