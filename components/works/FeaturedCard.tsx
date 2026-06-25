import styled from 'styled-components'
import { mq } from '@/styles/theme'
import DiamondBullet from '@/components/shared/DiamondBullet'
import Button from '@/components/common/Button'
import type { Project } from '@/types/project'

// Logo dimensions (Figma-derived, not in theme)
const LOGO_W_DESKTOP = 189
const LOGO_H_DESKTOP = 56
const LOGO_W_MOBILE  = 136
const LOGO_H_MOBILE  = 40

interface Props {
  project: Project
}

const FeaturedCard = ({ project }: Props) => {
  // Split "Founder • Designer" → ["Founder", "Designer"] for the diamond bullet
  const roleParts = project.role?.split(' • ') ?? []

  return (
    <Card>
      {/* ── Left content (text side) ─────────────────────────────── */}
      <LeftContent>

        {/* Logo + tagline — always first */}
        <LogoBlock>
          {project.logo_url ? (
            <LogoImg
              src={project.logo_url}
              alt={project.title}
            />
          ) : (
            <TitleFallback>{project.title}</TitleFallback>
          )}
          {project.tagline && (
            <Tagline>{project.tagline}</Tagline>
          )}
        </LogoBlock>

        {/* Description — desktop: 2nd; mobile: 3rd */}
        {project.long_description && (
          <Description>{project.long_description}</Description>
        )}

        {/* Highlights table — desktop: 3rd; mobile: 2nd */}
        <Highlights>
          {/* Row 1 — Role */}
          <HighlightRow>
            <RowLabel>Role</RowLabel>
            <RoleValue>
              {roleParts.length > 1 ? (
                <>
                  <RolePart>{roleParts[0]}</RolePart>
                  <DiamondBullet size={6} />
                  <RolePart>{roleParts[1]}</RolePart>
                </>
              ) : (
                <RolePart>{project.role}</RolePart>
              )}
            </RoleValue>
          </HighlightRow>

          {/* Row 2 — Timeline */}
          <HighlightRow>
            <RowLabel>Timeline</RowLabel>
            <ValueText>{project.timeline}</ValueText>
          </HighlightRow>

          {/* Row 3 — Tags (border-bottom + slightly taller padding) */}
          <HighlightRow $last>
            <RowLabel>Tags</RowLabel>
            <TagContainer>
              {project.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagContainer>
          </HighlightRow>
        </Highlights>

        {/* CTA button — always last */}
        {project.cta_url && (
          <CtaWrapper>
            <Button
              label={project.cta_label ?? 'View project'}
              href={project.cta_url}
            />
          </CtaWrapper>
        )}
      </LeftContent>

      {/* ── Cover image (right on desktop, top on mobile) ────────── */}
      {project.cover_image_url && (
        <CoverImageWrap>
          <CoverImg
            src={project.cover_image_url}
            alt={project.title}
          />
        </CoverImageWrap>
      )}
    </Card>
  )
}

// ─── Card shell ──────────────────────────────────────────────────────────────

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  padding: ${({ theme }) => theme.spacing[6]};
  overflow: clip;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.mobile} {
    flex-direction: column;
    align-items: stretch;
    gap: ${({ theme }) => theme.spacing[8]};
    border-radius: ${({ theme }) => theme.radii.xl};
  }
`

// ─── Left content ─────────────────────────────────────────────────────────────

const LeftContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  flex: 1;
  min-width: 0;
  justify-content: center;

  ${mq.mobile} {
    order: 2;
  }
`

// LogoBlock is always first — no explicit order needed (DOM order = 0)
const LogoBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  order: 1;
`

const LogoImg = styled.img`
  width: ${LOGO_W_DESKTOP}px;
  height: ${LOGO_H_DESKTOP}px;
  object-fit: contain;
  object-position: left center;

  ${mq.mobile} {
    width: ${LOGO_W_MOBILE}px;
    height: ${LOGO_H_MOBILE}px;
  }
`

const TitleFallback = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Tagline = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

// Description: desktop order 2 → mobile order 3
const Description = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  order: 2;

  ${mq.mobile} {
    order: 3;
  }
`

// ─── Highlights table ────────────────────────────────────────────────────────

// Highlights: desktop order 3 → mobile order 2
const Highlights = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  order: 3;

  ${mq.mobile} {
    order: 2;
  }
`

const HighlightRow = styled.div<{ $last?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ $last }) => ($last ? '14px 0' : '13px 0')};
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  ${({ $last, theme }) =>
    $last && `border-bottom: 1px solid ${theme.colors.border.tertiary};`}
`

const RowLabel = styled.span`
  flex: 1 0 0;
  max-width: 120px;
  min-width: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const RoleValue = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  min-width: 0;
`

const RolePart = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

const ValueText = styled.span`
  flex: 1 0 0;
  min-width: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

const TagContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 6px;
  flex: 1 0 0;
  min-width: 0;
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

// ─── CTA ─────────────────────────────────────────────────────────────────────

// Always last in the column regardless of order swaps
const CtaWrapper = styled.div`
  order: 4;
`

// ─── Cover image ─────────────────────────────────────────────────────────────

const CoverImageWrap = styled.div`
  position: relative;
  width: 541px;
  height: 474px;
  flex-shrink: 0;
  overflow: hidden;

  ${mq.mobile} {
    order: -1;
    width: 100%;
    height: auto;
    aspect-ratio: 540 / 473;
  }
`

const CoverImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
`

export default FeaturedCard
