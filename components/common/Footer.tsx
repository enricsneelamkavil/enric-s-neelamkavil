'use client'

import Link from 'next/link'
import styled, { css } from 'styled-components'
import Button from './Button'

// Figma asset URLs — valid for 7 days from design sync (replace with permanent paths after)
const SHAPE_A = 'https://www.figma.com/api/mcp/asset/ff23ef65-d282-4fb9-b701-d371bb6eb8af'
const SHAPE_B = 'https://www.figma.com/api/mcp/asset/474045a8-27d4-424d-ac99-0d31d300a993'
const SHAPE_C = 'https://www.figma.com/api/mcp/asset/d0f77c83-3105-4ad7-a667-527a5cdfe700'
const SHAPE_D = 'https://www.figma.com/api/mcp/asset/11b42307-6072-4c88-abbe-a2a81924e3f7'
const HEART_ICON = 'https://www.figma.com/api/mcp/asset/29c1fef7-2902-49ad-8ffd-31a305ffb44f'

const SHAPES = [SHAPE_A, SHAPE_B, SHAPE_C, SHAPE_D]

const PAGE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '/about' },
  { label: 'Work', href: '/works' },
  { label: 'Contact', href: '/contact' },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/enricsneelamkavil' },
  { label: 'Behance', href: 'https://www.behance.net/enricsneelamkavil' },
  { label: 'Dribbble', href: 'https://dribbble.com/enricsneelamkavil' },
  { label: 'Medium', href: 'https://medium.com/@enricsneelamkavil' },
]

const Footer = () => {
  return (
    <FooterWrapper>
      <ContentCard>
        <CTAHeading>
          <CTALine>Let&apos;s build</CTALine>
          <CTALine>
            <CTASecondary>something real</CTASecondary>
            <CTAHighlight>.</CTAHighlight>
          </CTALine>
        </CTAHeading>

        <InfoSection>
          <DesignerBlock>
            <BioText>
              Product &amp; Experience Designer mapping complex user flows into clean,
              developer-friendly products. Based in Kerala, India.
            </BioText>
            <Button label="Start a project" href="/contact" />
          </DesignerBlock>

          <NavColumn>
            <ColHeader>Pages</ColHeader>
            <ColLinks>
              {PAGE_LINKS.map(({ label, href }) => (
                <ColLink key={label} href={href}>
                  {label}
                </ColLink>
              ))}
            </ColLinks>
          </NavColumn>

          <NavColumn>
            <ColHeader>Connect</ColHeader>
            <ColLinks>
              {SOCIAL_LINKS.map(({ label, href }) => (
                <ColExtLink key={label} href={href} target="_blank" rel="noopener noreferrer">
                  {label}
                </ColExtLink>
              ))}
            </ColLinks>
          </NavColumn>

          <ReachOutBlock>
            <ColHeader>Reach out</ColHeader>
            <EmailSection>
              <EmailText>enricsneelamkavil@gmail.com</EmailText>
              <VisitorBlock>
                <VisitorLabel>You&apos;re visitor number:</VisitorLabel>
                <VisitorCount>102</VisitorCount>
              </VisitorBlock>
            </EmailSection>
          </ReachOutBlock>
        </InfoSection>
      </ContentCard>

      <BottomSection>
        <ShapesRow>
          {Array.from({ length: 5 }).flatMap((_, i) =>
            SHAPES.map((src, j) => (
              <ShapeImg key={`${i}-${j}`} src={src} alt="" />
            ))
          )}
        </ShapesRow>
        <CopyrightRow>
          <CopyrightText>© 2026 DESIGNED WITH</CopyrightText>
          <HeartImg src={HEART_ICON} alt="♥" />
          <CopyrightText>BY ENRIC S NEELAMKAVIL</CopyrightText>
        </CopyrightRow>
      </BottomSection>
    </FooterWrapper>
  )
}

// ─── Wrapper ──────────────────────────────────────────────────────────────────

const FooterWrapper = styled.footer`
  width: 100%;
  background-color: ${({ theme }) => theme.colors.surface.highlight};
  display: flex;
  flex-direction: column;
  align-items: center;
`

// ─── White content card ───────────────────────────────────────────────────────

const ContentCard = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border-radius: 0 0 ${({ theme }) => theme.radii['3xl']} ${({ theme }) => theme.radii['3xl']};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
`

// ─── CTA heading ──────────────────────────────────────────────────────────────

const CTAHeading = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes['3xl']};
  line-height: ${({ theme }) => theme.lineHeights['4xl']};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tightest};
  color: ${({ theme }) => theme.colors.text.primary};
  padding-top: ${({ theme }) => theme.spacing[20]};
`

const CTALine = styled.p`
  margin: 0;
`

const CTASecondary = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const CTAHighlight = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

// ─── Info section ─────────────────────────────────────────────────────────────

const InfoSection = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: flex-start;
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  padding-top: ${({ theme }) => theme.spacing[20]};
  padding-bottom: ${({ theme }) => theme.spacing[20]};
`

// ─── Designer description block ───────────────────────────────────────────────

const DesignerBlock = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: flex-start;
  min-width: 0;
`

const BioText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ─── Navigation columns ───────────────────────────────────────────────────────

const NavColumn = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-shrink: 0;
  width: 240px;
`

const ReachOutBlock = styled(NavColumn)``

const ColHeader = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`

const ColLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`

const colLinkBase = css`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
  display: block;
`

const ColLink = styled(Link)`
  ${colLinkBase}
`

const ColExtLink = styled.a`
  ${colLinkBase}
`

// ─── Reach out column ─────────────────────────────────────────────────────────

const EmailSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`

const EmailText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`

const VisitorBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const VisitorLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const VisitorCount = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.highlight};
  letter-spacing: ${({ theme }) => theme.letterSpacings.widest};
`

// ─── Bottom red section ───────────────────────────────────────────────────────

const BottomSection = styled.div`
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* 72px gap = spacing[12] (48px) + spacing[6] (24px) */
  gap: calc(${({ theme }) => theme.spacing[12]} + ${({ theme }) => theme.spacing[6]});
  padding: ${({ theme }) => theme.spacing[20]} 0 ${({ theme }) => theme.spacing[10]};
`

const ShapesRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: center;
  justify-content: center;
  width: 100%;
  opacity: 0.2;
`

const ShapeImg = styled.img`
  display: block;
  width: 64px;
  height: 64px;
  object-fit: contain;
  flex-shrink: 0;
`

const CopyrightRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`

const CopyrightText = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.inverse};
  white-space: nowrap;
`

const HeartImg = styled.img`
  display: block;
  width: 17px;
  height: 16px;
`

export default Footer
