import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Hardcoded Plush data ─────────────────────────────────────────────────────

const PLUSH = {
  title: 'Plush',
  tagline: 'Your Personalised AI Powered Credit Card Assistant',
  long_description: "Plush simplifies the credit card ecosystem through card discovery, comparison, personalised portfolio tracking, and community-driven insights. Built to replace confusion with clarity, Plush helps users make smarter card decisions without pressure, complexity, or unnecessary financial jargon.",
  role: 'Founder • Designer',
  market: 'Direct-to-Consumer (D2C)',
  tags: ['CASE STUDY', 'FIN TECH', 'APPLICATION'],
  cover_image_url: '/home/works/featured/plush-feature.webp',
  logo_url: '/home/works/featured/plush-logo.svg',
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

        {/* Title+badge+description — shown on both desktop and mobile */}
        <UpperBlock>
          <DesktopTitleRow>
            <PlushTitle>Plush<TitlePeriod>.</TitlePeriod></PlushTitle>
            <FeaturedBadge>
              <LaurelIcon />
              <FeaturedText>Featured</FeaturedText>
            </FeaturedBadge>
          </DesktopTitleRow>
          <Description>{PLUSH.long_description}</Description>
        </UpperBlock>

        {/* Logo + tagline — hidden everywhere, no equivalent in Figma spec */}
        <LogoBlock>
          <LogoImg src={PLUSH.logo_url} alt={PLUSH.title} />
          <Tagline>{PLUSH.tagline}</Tagline>
        </LogoBlock>

        {/* Highlights table (desktop only — hidden on mobile per Figma) */}
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

          {/* Row 2 — Market */}
          <HighlightRow>
            <RowLabel>Market</RowLabel>
            <ValueText>{PLUSH.market}</ValueText>
          </HighlightRow>

          {/* Row 3 — Tags (no bottom padding) */}
          <HighlightRow $last>
            <RowLabel>Tags</RowLabel>
            <TagContainer>
              {PLUSH.tags.map((tag) => (
                <Tag key={tag}>{tag}</Tag>
              ))}
            </TagContainer>
          </HighlightRow>
        </Highlights>
      </LeftContent>

      {/* ── Cover image (right on desktop, top on mobile) ────────── */}
      <CoverImageOuter>
        <CoverImageInner>
          <CoverImg src={PLUSH.cover_image_url} alt={PLUSH.title} />
        </CoverImageInner>
      </CoverImageOuter>
    </Card>
  )
}

// ─── Card shell ──────────────────────────────────────────────────────────────

const Card = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  padding: ${({ theme }) => theme.spacing[6]};
  overflow: hidden;
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
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[6]};
  flex: 1 1 0;
  min-width: 0;
  justify-content: center;

  ${mq.mobile} {
    order: 2;
  }
`

const LogoBlock = styled.div`
  display: none;
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
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ─── Highlights table ────────────────────────────────────────────────────────

const Highlights = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  order: 2;

  ${mq.mobile} {
    display: none;
  }
`

const HighlightRow = styled.div<{ $last?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: ${({ $last }) => $last ? '12px 0 0' : '12px 0'};
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};
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

// ─── Title row + featured badge (shown on both desktop and mobile) ───────────

const UpperBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
  order: 1;
`

const DesktopTitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 24px;
`

const PlushTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme }) => theme.colors.text.primary};
`

const TitlePeriod = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

const FeaturedBadge = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 4px;
  padding: 4px 8px;
  background: ${({ theme }) => `${theme.colors.text.highlight}1a`};
  border-radius: 4px;
  flex-shrink: 0;
`

const LaurelIcon = styled.span`
  display: block;
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(/icons/laurel.svg) no-repeat center / contain;
  mask: url(/icons/laurel.svg) no-repeat center / contain;
`

const FeaturedText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.highlight};
  white-space: nowrap;
`

// ─── Cover image ─────────────────────────────────────────────────────────────

const CoverImageOuter = styled.div`
  flex: 0 0 45%;
  align-self: stretch;
  overflow: hidden;
  border-radius: ${({ theme }) => theme.radii.xl};
  position: relative;

  ${mq.mobile} {
    order: -1;
    flex: none;
    width: 100%;
    height: auto;
    position: relative;
    aspect-ratio: 540 / 473;
  }
`

const CoverImageInner = styled.div`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;

  ${mq.mobile} {
    position: relative;
    width: 100%;
    padding-top: 87.6%;
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
