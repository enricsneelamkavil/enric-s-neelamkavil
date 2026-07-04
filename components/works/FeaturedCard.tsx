import styled from 'styled-components'
import { mq } from '@/styles/theme'
import Button from '@/components/common/Button'

// ─── Hardcoded Plush data ─────────────────────────────────────────────────────

const PLUSH = {
  title: 'Plush',
  tagline: 'Your Personalised AI Powered Credit Card Assistant',
  long_description: 'Plush simplifies the credit card ecosystem through card discovery, comparison, personalised portfolio tracking, and community-driven insights. It\'s the clearest example of how to solve a confusing problem simply, and don\'t make the user do the work of understanding it.',
  role: 'Founder • Designer',
  timeline: 'In Progress',
  tags: ['CASE STUDY', 'FIN TECH', 'APPLICATION'],
  cover_image_url: '/home/works/featured/plush-feature.webp',
  logo_url: '/home/works/featured/plush-logo.svg',
  cta_label: 'Visit Plush',
  cta_url: 'https://plush.money',
} as const

// Logo dimensions (Figma-derived, not in theme)
const LOGO_W_DESKTOP = 189
const LOGO_H_DESKTOP = 56
const LOGO_W_MOBILE = 136
const LOGO_H_MOBILE = 40

// ─── Component ────────────────────────────────────────────────────────────────

const FeaturedCard = () => {
  const roleParts = PLUSH.role.split(' • ')

  return (
    <Card>
      {/* ── Left content (text side) ─────────────────────────────── */}
      <LeftContent>

        {/* Logo + tagline — always first */}
        <LogoBlock>
          <LogoImg src={PLUSH.logo_url} alt={PLUSH.title} />
          <Tagline>{PLUSH.tagline}</Tagline>
        </LogoBlock>

        {/* Description — desktop: 2nd; mobile: 3rd */}
        <Description>{PLUSH.long_description}</Description>

        {/* Highlights table — desktop: 3rd; mobile: 2nd */}
        <Highlights>
          {/* Row 1 — Role */}
          <HighlightRow>
            <RowLabel>Role</RowLabel>
            <RoleValue>
              <RolePart>{roleParts[0]}</RolePart>
              <img src="/icons/diamond.svg" width={6} height={6} alt="" aria-hidden />
              <RolePart>{roleParts[1]}</RolePart>
            </RoleValue>
          </HighlightRow>

          {/* Row 2 — Timeline */}
          <HighlightRow>
            <RowLabel>Timeline</RowLabel>
            <ValueText>{PLUSH.timeline}</ValueText>
          </HighlightRow>

          {/* Row 3 — Tags (border-bottom + slightly taller padding) */}
          <HighlightRow $last>
            <RowLabel>Tags</RowLabel>
            <TagContainer>
              {PLUSH.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagContainer>
          </HighlightRow>
        </Highlights>

        {/* CTA button — always last */}
        <CtaWrapper>
          <Button label={PLUSH.cta_label} href={PLUSH.cta_url} />
        </CtaWrapper>
      </LeftContent>

      {/* ── Cover image (right on desktop, top on mobile) ────────── */}
      <CoverImageWrap>
        <CoverImg src={PLUSH.cover_image_url} alt={PLUSH.title} />
      </CoverImageWrap>
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
  order: 2;

  ${mq.mobile} {
    order: 3;
  }
`

// ─── Highlights table ────────────────────────────────────────────────────────

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
