'use client'

import Link from 'next/link'
import styled, { css } from 'styled-components'
import Button from './Button'
import { mq } from '@/styles/theme'

// ─── Assets ───────────────────────────────────────────────────────────────────

const BG_IMAGE = 'https://www.figma.com/api/mcp/asset/fa710887-2012-4664-a010-ef19a012ab66'

const SHAPE_A = 'https://www.figma.com/api/mcp/asset/fcfe8a51-0e1f-4bfd-bf8a-c07bd21c1060'
const SHAPE_B = 'https://www.figma.com/api/mcp/asset/4275419a-1c6c-469c-9100-c56d31ea3550'
const SHAPE_C = 'https://www.figma.com/api/mcp/asset/bd0b7ea1-66b9-46ef-b575-f2bd3f950e3d'
const SHAPE_D = 'https://www.figma.com/api/mcp/asset/9e9cb64d-8b29-40e7-87be-259ad440c5a8'
const HEART_ICON = 'https://www.figma.com/api/mcp/asset/2afd27d0-04e0-42aa-b80f-7d4d596d165d'

// ─── Data ─────────────────────────────────────────────────────────────────────

const SHAPES = [
  { src: SHAPE_A, w: 64 },
  { src: SHAPE_B, w: 64 },
  { src: SHAPE_C, w: 64 },
  { src: SHAPE_D, w: 64 },
] as const

const PAGE_LINKS = [
  { label: 'Home', href: '/' },
  { label: 'About', href: '#' },
  { label: 'Work', href: '#' },
  { label: 'Contact', href: '#' },
]

const SOCIAL_LINKS = [
  { label: 'LinkedIn', href: 'https://www.linkedin.com/in/enricsneelamkavil' },
  { label: 'Behance', href: 'https://www.behance.net/enricsneelamkavil' },
  { label: 'Dribbble', href: 'https://dribbble.com/enricsneelamkavil' },
  { label: 'Medium', href: 'https://medium.com/@enricsneelamkavil' },
]

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = () => (
  <FooterWrapper>

    <ContentCard>
      <ContentInner>
        <CTAHeading>
          <CTALine>Let&apos;s build</CTALine>
          <CTALine>
            <CTAMuted>something real</CTAMuted>
            <CTADot>.</CTADot>
          </CTALine>
        </CTAHeading>

        <InfoSection>
          <InfoRow>

            {/* Col 1 — bio + CTA */}
            <DesignerCol>
              <BioText>
                Product &amp; Experience Designer mapping complex user flows into clean,
                developer-friendly products. Based in Kerala, India.
              </BioText>
              <Button label="Start a project" href="#" />
            </DesignerCol>

            {/* Cols 2+3 — Pages and Connect, grouped so they sit side-by-side on mobile */}
            <LinksGroup>
              <NavCol>
                <ColLabel>Pages</ColLabel>
                <ColLinks>
                  {PAGE_LINKS.map(({ label, href }) => (
                    <ColLink key={label} href={href}>{label}</ColLink>
                  ))}
                </ColLinks>
              </NavCol>

              <NavCol>
                <ColLabel>Connect</ColLabel>
                <ColLinks>
                  {SOCIAL_LINKS.map(({ label, href }) => (
                    <ColExtLink key={label} href={href} target="_blank" rel="noopener noreferrer">
                      {label}
                    </ColExtLink>
                  ))}
                </ColLinks>
              </NavCol>
            </LinksGroup>

            {/* Col 4 — Reach out */}
            <NavCol>
              <ColLabel>Reach out</ColLabel>
              <ReachOutContent>
                <EmailText>enricsneelamkavil@gmail.com</EmailText>
                <VisitorBlock>
                  <VisitorLabel>You&apos;re visitor number:</VisitorLabel>
                  <VisitorCount>1001</VisitorCount>
                </VisitorBlock>
              </ReachOutContent>
            </NavCol>

          </InfoRow>
        </InfoSection>
      </ContentInner>
    </ContentCard>

    {/* ── Red bottom: shapes + copyright ── */}
    <BottomSection>

      <ShapesRow>
        {Array.from({ length: 5 }).flatMap((_, i) =>
          SHAPES.map((shape, j) => (
            <ShapeBox key={`${i}-${j}`} $w={shape.w}>
              <ShapeImg src={shape.src} alt="" />
            </ShapeBox>
          ))
        )}
      </ShapesRow>

      {/* Mobile: two lines centered. Desktop: single row. */}
      <CopyrightRow>
        <CopyrightFirstLine>
          <CopyrightText>© 2026 DESIGNED WITH</CopyrightText>
          <HeartImg src={HEART_ICON} alt="♥" />
        </CopyrightFirstLine>
        <CopyrightText>BY ENRIC S NEELAMKAVIL</CopyrightText>
      </CopyrightRow>

    </BottomSection>

  </FooterWrapper>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const FooterWrapper = styled.footer`
  width: 100%;
  background: linear-gradient(
    to top,
    ${({ theme }) => theme.colors.surface.highlight} 280px,
    #FFFFFF calc(50% + 140px)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
`

const ContentCard = styled.div`
  width: calc(100% - 72px);
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border-radius: 0 0 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  padding-top: 120px;

  ${mq.tablet} {
    width: calc(100% - 48px);
    padding-top: 80px;
  }

  ${mq.mobile} {
    width: 100%;
    border-radius: 0;
    padding-top: 48px;
  }
`

const ContentInner = styled.div`
  width: 100%;
  max-width: 1168px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 24px;
`

const CTAHeading = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: 64px;
  line-height: 80px;
  letter-spacing: -1.28px;
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.tablet} {
    font-size: 48px;
    line-height: 60px;
  }

  ${mq.mobile} {
    font-size: 40px;
    line-height: 48px;
    letter-spacing: -0.8px;
  }
`

const CTALine = styled.p`
  margin: 0;
`

const CTAMuted = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const CTADot = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

const InfoSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  padding-top: 80px;
  padding-bottom: 80px;

  ${mq.tablet} {
    padding-top: 48px;
    padding-bottom: 48px;
  }

  ${mq.mobile} {
    padding-top: 32px;
    padding-bottom: 32px;
  }
`

const InfoRow = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;

  ${mq.mobile} {
    flex-direction: column;
    gap: 40px;
  }
`

const DesignerCol = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;

  ${mq.mobile} {
    flex: none;
    width: 100%;
  }
`

const BioText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

/* On desktop: transparent wrapper so Pages+Connect flow as direct InfoRow children.
   On mobile: side-by-side row container for Pages and Connect columns. */
const LinksGroup = styled.div`
  display: contents;

  ${mq.mobile} {
    display: flex;
    flex-direction: row;
    gap: 40px;
    width: 100%;
  }
`

const NavCol = styled.div`
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;

  ${mq.tablet} {
    width: 160px;
  }

  ${mq.mobile} {
    flex: 1 0 0;
    width: auto;
  }
`

const ColLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`

const ColLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

const colLinkStyle = css`
  display: block;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;
`

const ColLink = styled(Link)`${colLinkStyle}`
const ColExtLink = styled.a`${colLinkStyle}`

const ReachOutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

const EmailText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: 16px;
  line-height: 24px;
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
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

const VisitorCount = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: 24px;
  line-height: 32px;
  color: ${({ theme }) => theme.colors.text.highlight};
  letter-spacing: 2.88px;
`

// ── Bottom section ─────────────────────────────────────────────────────────────

const BottomSection = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 72px;
  padding: 80px 0 40px;
  background-image: url('${BG_IMAGE}');
  background-size: cover;
  background-position: center;

  ${mq.mobile} {
    padding: 64px 0;
    gap: 48px;
  }
`

const ShapesRow = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
  opacity: 0.2;
`

const ShapeBox = styled.div<{ $w: number }>`
  position: relative;
  width: ${({ $w }) => $w}px;
  height: 64px;
  flex-shrink: 0;
`

const ShapeImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  max-width: none;
`

/* Desktop: single flex row with heart inline.
   Mobile: flex-col centered, with CopyrightFirstLine holding text+heart on one line. */
const CopyrightRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;

  ${mq.mobile} {
    flex-direction: column;
    align-items: center;
    gap: 0;
  }
`

/* On desktop: display:contents makes this transparent to the flex row.
   On mobile: renders as an inline flex so text and heart sit on one line. */
const CopyrightFirstLine = styled.div`
  display: contents;

  ${mq.mobile} {
    display: flex;
    align-items: center;
    gap: 8px;
  }
`

const CopyrightText = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.inverse};
  white-space: nowrap;
`

const HeartImg = styled.img`
  display: block;
  width: 17px;
  height: 16px;
  max-width: none;
`

export default Footer
