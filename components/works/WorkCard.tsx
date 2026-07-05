import Link from 'next/link'
import styled, { css } from 'styled-components'
import { mq } from '@/styles/theme'
import type { Project } from '@/types/project'

// Figma-derived measurements (not in theme)
const IMAGE_RADIUS = '14px'  // outer container — between radii.lg and radii.xl

interface Props {
  project: Project
  view?: 'grid' | 'list'
}

const WorkCard = ({ project, view }: Props) => {
  const inner = (
    <>
      <ImageContainer $view={view}>
        <ImageFrame $view={view}>
          {project.cover_image_url && (
            <CardImg $view={view} src={project.cover_image_url} alt={project.title} />
          )}
        </ImageFrame>
      </ImageContainer>

      <Info $view={view}>
        <TitleGroup $view={view}>
          <Title>
            {project.title}<Period>.</Period>
          </Title>
          <Desc>{project.description}</Desc>
        </TitleGroup>

        {project.tags.length > 0 && (
          <TagRow $view={view}>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagRow>
        )}
      </Info>
    </>
  )

  if (!project.cta_url) {
    return <CardDiv $view={view}>{inner}</CardDiv>
  }

  if (project.cta_url.startsWith('http')) {
    return (
      <CardAnchor
        $view={view}
        href={project.cta_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </CardAnchor>
    )
  }

  return <CardLink $view={view} href={project.cta_url}>{inner}</CardLink>
}

// ─── Shared card base ─────────────────────────────────────────────────────────

const cardBase = css<{ $view?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: ${({ $view }) => ($view === 'list' ? 'row' : 'column')};
  align-items: ${({ $view }) => ($view === 'list' ? 'center' : 'stretch')};
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;
  height: ${({ $view }) => ($view === 'list' ? '160px' : 'auto')};
  text-decoration: none;
  color: inherit;
  cursor: pointer;

  ${mq.mobile} {
    flex-direction: column;
    align-items: stretch;
    height: auto;
  }
`

const CardDiv    = styled.div<{ $view?: 'grid' | 'list' }>`${cardBase}`
const CardAnchor = styled.a<{ $view?: 'grid' | 'list' }>`${cardBase}`
const CardLink   = styled(Link)<{ $view?: 'grid' | 'list' }>`${cardBase}`

// ─── Image container ─────────────────────────────────────────────────────────

const ImageContainer = styled.div<{ $view?: 'grid' | 'list' }>`
  width: ${({ $view }) => ($view === 'list' ? '168px' : '100%')};
  flex-shrink: ${({ $view }) => ($view === 'list' ? '0' : 'unset')};
  height: auto;
  margin: 0;
  padding: ${({ $view }) => ($view === 'list' ? '4px' : '8px')};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ $view }) => ($view === 'list' ? '8px' : IMAGE_RADIUS)};
  overflow: hidden;

  ${mq.mobile} {
    width: 100%;
    flex-shrink: unset;
    padding: 8px;
    border-radius: 14px;
  }
`

const ImageFrame = styled.div<{ $view?: 'grid' | 'list' }>`
  position: relative;
  width: 100%;
  height: ${({ $view }) => ($view === 'list' ? '100%' : 'auto')};
  overflow: clip;

  ${mq.mobile} {
    height: auto;
  }
`

const CardImg = styled.img<{ $view?: 'grid' | 'list' }>`
  display: block;
  width: 100%;
  height: auto;
  object-fit: cover;
  object-position: center;
  border-radius: ${({ $view }) => ($view === 'list' ? '4px' : '8px')};

  ${mq.mobile} {
    border-radius: 8px;
  }
`

// ─── Info block ───────────────────────────────────────────────────────────────

const Info = styled.div<{ $view?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: ${({ $view }) => ($view === 'list' ? 'row' : 'column')};
  align-items: ${({ $view }) => ($view === 'list' ? 'center' : 'stretch')};
  gap: ${({ $view, theme }) => ($view === 'list' ? '0' : theme.spacing[3])};
  ${({ $view }) => ($view === 'list' ? 'flex: 1; min-width: 0;' : 'width: 100%;')}

  ${mq.mobile} {
    width: 100%;
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`

const TitleGroup = styled.div<{ $view?: 'grid' | 'list' }>`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
  ${({ $view }) => ($view === 'list' ? 'flex: 1; min-width: 0;' : '')}
`

const Title = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Period = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

const Desc = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ─── Tags ─────────────────────────────────────────────────────────────────────

const TagRow = styled.div<{ $view?: 'grid' | 'list' }>`
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  align-items: center;
  ${({ $view }) => ($view === 'list' ? css`
    margin-left: auto;
    flex-shrink: 0;
    align-self: center;
  ` : '')}

  ${mq.mobile} {
    margin-left: 0;
    flex-shrink: unset;
    align-self: flex-start;
  }
`

const Tag = styled.span`
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.sm};
  padding: 4px 8px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
`

export default WorkCard
