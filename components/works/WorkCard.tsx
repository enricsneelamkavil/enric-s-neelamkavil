import Link from 'next/link'
import styled, { css } from 'styled-components'
import { mq } from '@/styles/theme'
import type { Project } from '@/types/project'

// Figma-derived — between radii.lg (12px) and radii.xl (16px)
const IMAGE_RADIUS = '14px'

interface Props {
  project: Project
}

const WorkCard = ({ project }: Props) => {
  const inner = (
    <>
      <ImageContainer>
        {project.cover_image_url && (
          <CardImg src={project.cover_image_url} alt={project.title} />
        )}
      </ImageContainer>

      <Info>
        <TitleGroup>
          <Title>
            {project.title}<Period>.</Period>
          </Title>
          <Desc>{project.description}</Desc>
        </TitleGroup>

        {project.tags.length > 0 && (
          <TagRow>
            {project.tags.map((tag) => (
              <Tag key={tag}>{tag}</Tag>
            ))}
          </TagRow>
        )}
      </Info>
    </>
  )

  if (!project.cta_url) {
    return <CardDiv>{inner}</CardDiv>
  }

  if (project.cta_url.startsWith('http')) {
    return (
      <CardAnchor
        href={project.cta_url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {inner}
      </CardAnchor>
    )
  }

  return <CardLink href={project.cta_url}>{inner}</CardLink>
}

// ─── Shared card base ─────────────────────────────────────────────────────────

const cardBase = css`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;
  text-decoration: none;
  color: inherit;
  cursor: pointer;
`

const CardDiv    = styled.div`${cardBase}`
const CardAnchor = styled.a`${cardBase}`
const CardLink   = styled(Link)`${cardBase}`

// ─── Image container ─────────────────────────────────────────────────────────

const ImageContainer = styled.div`
  position: relative;
  width: 100%;
  height: 280px;
  flex-shrink: 0;
  overflow: hidden;
  border-radius: ${IMAGE_RADIUS};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};

  ${mq.mobile} {
    height: auto;
    aspect-ratio: 660 / 394;
  }
`

const CardImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: contain;
  object-position: center;
`

// ─── Info block ───────────────────────────────────────────────────────────────

const Info = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
`

const TitleGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
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

const TagRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 6px;
  align-items: center;
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
