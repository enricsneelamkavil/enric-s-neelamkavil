'use client'

import { useState, useEffect } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'
import { fetchMediumArticles, type MediumArticle } from '@/lib/medium'

// ─── Layout constants (Figma-derived) ────────────────────────────────────────
const THUMBNAIL_SIZE_DESKTOP = 80
const THUMBNAIL_SIZE_MOBILE = 56
const THUMBNAIL_RADIUS = 8
const ARROW_SIZE = 32
const EXTERNAL_ICON_DESKTOP = 18
const EXTERNAL_ICON_MOBILE = 16

// ─── Fallback data (shown on load and on fetch error) ────────────────────────
const FALLBACK_ARTICLES: MediumArticle[] = [
  {
    title: 'I Failed the Challenge and Still Got an Apple Watch for Free',
    readTime: '5 min read',
    url: 'https://medium.com/@enricsneelamkavil/i-failed-the-challenge-and-still-got-an-apple-watch-for-free-be7a0bb8d10f',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*Fm9J95pVA929xCapkFdHcw.png',
    pubDate: '',
  },
  {
    title: 'The Portfolio I Never Submitted Got Me to awwwards.',
    readTime: '3 min read',
    url: 'https://medium.com/@enricsneelamkavil/the-portfolio-i-never-submitted-got-me-to-awwwards-2ce43a5886b3',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*FPUA_5rh5WYQQOGCnuB9lQ.png',
    pubDate: '',
  },
  {
    title: 'From Nothing to a DESIGNER today!',
    readTime: '4 min read',
    url: 'https://medium.com/@enricsneelamkavil/from-nothing-to-a-designer-today-d05c02edf1e1',
    thumbnail: null,
    pubDate: '',
  },
  {
    title: "The Best Thing I Brought Back From Ahmedabad Wasn't Coldplay",
    readTime: '4 min read',
    url: 'https://medium.com/@enricsneelamkavil/the-best-thing-i-brought-back-from-ahmedabad-wasnt-coldplay-af0afa66350c',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*EPTt8KgIIK2V9KqOgvlUeg.jpeg',
    pubDate: '',
  },
  {
    title: 'The Story I Might Have Missed',
    readTime: '2 min read',
    url: 'https://medium.com/@enricsneelamkavil/the-story-i-might-have-missed-cae9b34200f0',
    thumbnail: null,
    pubDate: '',
  },
  {
    title: 'Got a Delulu in real life',
    readTime: '6 min read',
    url: 'https://medium.com/@enricsneelamkavil/got-delulud-for-real-0b8d127b974a',
    thumbnail: 'https://cdn-images-1.medium.com/max/1024/1*2-eRYJqSuWDaDEhO0UEBdg.avif',
    pubDate: '',
  },
]

const MEDIUM_URL = 'https://medium.com/@enricsneelamkavil'

// ─── Component ───────────────────────────────────────────────────────────────
const WritingSection = () => {
  const [articles, setArticles] = useState<MediumArticle[]>(FALLBACK_ARTICLES)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    fetchMediumArticles()
      .then(data => setArticles(data))
      .catch(() => { /* keep fallback */ })
      .finally(() => setLoading(false))
  }, [])

  const rowsPerColumn = Math.max(1, Math.ceil(articles.length / 2))

  return (
    <Section>
      <HeaderRow>
        <TitleContainer>
          <SectionLabel>SOMETIMES I WRITE</SectionLabel>
          <SectionHeader before="Scribbled from the " muted="heart" after="." />
        </TitleContainer>
        <DesktopReadAll
          href={MEDIUM_URL}
          target="_blank"
          rel="noopener noreferrer"
        >
          Read all
          <img
            src="/icons/external.svg"
            alt=""
            aria-hidden="true"
            width={EXTERNAL_ICON_DESKTOP}
            height={EXTERNAL_ICON_DESKTOP}
          />
        </DesktopReadAll>
      </HeaderRow>

      <ArticleList $loading={loading} $rows={rowsPerColumn}>
        {articles.map(({ title, readTime, url, thumbnail }, i) => (
          <ArticleRow
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            $first={i === 0 || i === rowsPerColumn}
          >
            {thumbnail
              ? <ThumbnailImg src={thumbnail} alt="" width={THUMBNAIL_SIZE_DESKTOP} height={THUMBNAIL_SIZE_DESKTOP} />
              : <ThumbnailPlaceholder />
            }
            <ArticleInfo>
              <ArticleTitle>{title}</ArticleTitle>
              <ArticleReadTime>{readTime}</ArticleReadTime>
            </ArticleInfo>
            <ArrowWrap>
              <ArrowIcon aria-hidden="true" />
            </ArrowWrap>
          </ArticleRow>
        ))}
      </ArticleList>

      <MobileReadAll
        href={MEDIUM_URL}
        target="_blank"
        rel="noopener noreferrer"
      >
        Read all
        <img
          src="/icons/external.svg"
          alt=""
          aria-hidden="true"
          width={EXTERNAL_ICON_MOBILE}
          height={EXTERNAL_ICON_MOBILE}
        />
      </MobileReadAll>
    </Section>
  )
}

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

const HeaderRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: center;
  width: 100%;
`

const TitleContainer = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
`

const ReadAllButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
`

const DesktopReadAll = styled(ReadAllButton)`
  ${mq.mobile} { display: none; }
`

const MobileReadAll = styled(ReadAllButton)`
  display: none;
  ${mq.mobile} {
    display: flex;
    align-self: flex-start;
    padding: 12px 16px;
    height: 42px;
    border-radius: ${({ theme }) => theme.radii.md};
  }
`

interface ArticleListProps { $loading: boolean; $rows: number }

const ArticleList = styled.div<ArticleListProps>`
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  grid-template-rows: ${({ $rows }) => `repeat(${$rows}, auto)`};
  grid-auto-flow: column;
  column-gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  opacity: ${({ $loading }) => ($loading ? 0.5 : 1)};
  transition: opacity 0.3s ease;

  ${mq.mobile} {
    display: flex;
    flex-direction: column;
  }
`

interface ArticleRowProps { $first: boolean }

const ArticleRow = styled.a<ArticleRowProps>`
  display: flex;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: center;
  padding: 20px 0;
  text-decoration: none;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  ${({ $first, theme }) => $first && `border-top: 1px solid ${theme.colors.border.tertiary};`}
  cursor: pointer;

  ${mq.mobile} {
    padding: 16px 0;
  }
`

const ThumbnailBase = `
  width: ${THUMBNAIL_SIZE_DESKTOP}px;
  height: ${THUMBNAIL_SIZE_DESKTOP}px;
  flex-shrink: 0;
  border-radius: ${THUMBNAIL_RADIUS}px;
  object-fit: cover;
  display: block;

  ${mq.mobile} {
    width: ${THUMBNAIL_SIZE_MOBILE}px;
    height: ${THUMBNAIL_SIZE_MOBILE}px;
  }
`

const ThumbnailPlaceholder = styled.div`
  ${ThumbnailBase}
  background: ${({ theme }) => theme.colors.surface.tertiary};
`

const ThumbnailImg = styled(Image)`
  ${ThumbnailBase}
`

const ArticleInfo = styled.div`
  flex: 1 0 0;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
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
`

const ArrowWrap = styled.div`
  width: ${ARROW_SIZE}px;
  height: ${ARROW_SIZE}px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.mobile} { display: none; }
`

const ArrowIcon = styled.span`
  display: inline-block;
  width: ${ARROW_SIZE}px;
  height: ${ARROW_SIZE}px;
  background-color: ${({ theme }) => theme.colors.text.tertiary};
  -webkit-mask: url(/icons/external.svg) no-repeat center / contain;
  mask: url(/icons/external.svg) no-repeat center / contain;
  flex-shrink: 0;
`

export default WritingSection
