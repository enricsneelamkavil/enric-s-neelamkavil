'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'
import { fetchMediumArticles, type MediumArticle } from '@/lib/medium'

// ─── Layout constants (Figma-derived) ────────────────────────────────────────
const THUMBNAIL_SIZE = 56
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

      <ArticleList $loading={loading}>
        {articles.map(({ title, readTime, url, thumbnail }, i) => (
          <ArticleRow
            key={url}
            href={url}
            target="_blank"
            rel="noopener noreferrer"
            $first={i === 0}
          >
            {thumbnail
              ? <ThumbnailImg src={thumbnail} alt="" />
              : <ThumbnailPlaceholder />
            }
            <ArticleInfo>
              <ArticleTitle>{title}</ArticleTitle>
              <ArticleReadTime>{readTime}</ArticleReadTime>
            </ArticleInfo>
            <ArrowWrap>
              <img
                src="/icons/external.svg"
                alt=""
                aria-hidden="true"
                width={ARROW_SIZE}
                height={ARROW_SIZE}
              />
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
  ${mq.mobile} { display: flex; }
`

interface ArticleListProps { $loading: boolean }

const ArticleList = styled.div<ArticleListProps>`
  display: flex;
  flex-direction: column;
  width: 100%;
  opacity: ${({ $loading }) => ($loading ? 0.5 : 1)};
  transition: opacity 0.3s ease;
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
  width: ${THUMBNAIL_SIZE}px;
  height: ${THUMBNAIL_SIZE}px;
  flex-shrink: 0;
  border-radius: ${THUMBNAIL_RADIUS}px;
  object-fit: cover;
  display: block;
`

const ThumbnailPlaceholder = styled.div`
  ${ThumbnailBase}
  background: ${({ theme }) => theme.colors.surface.tertiary};
`

const ThumbnailImg = styled.img`
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

  img { display: block; width: 100%; height: 100%; }

  ${mq.mobile} { display: none; }
`

export default WritingSection
