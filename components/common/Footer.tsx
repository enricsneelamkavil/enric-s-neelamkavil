'use client'

import Link from 'next/link'
import styled, { css } from 'styled-components'
import Button from './Button'

// ─── Assets (Figma URLs — expire 7 days from generation) ─────────────────────

// Figma 145:786 "Footer style" — full-bleed red background image (kept from previous file)
const BG_IMAGE = 'https://www.figma.com/api/mcp/asset/fa710887-2012-4664-a010-ef19a012ab66'

// Shape assets — fresh from Figma read 2026-06-13
const SHAPE_A = 'https://www.figma.com/api/mcp/asset/fcfe8a51-0e1f-4bfd-bf8a-c07bd21c1060'
const SHAPE_B = 'https://www.figma.com/api/mcp/asset/4275419a-1c6c-469c-9100-c56d31ea3550'
const SHAPE_C = 'https://www.figma.com/api/mcp/asset/bd0b7ea1-66b9-46ef-b575-f2bd3f950e3d'
const SHAPE_D = 'https://www.figma.com/api/mcp/asset/9e9cb64d-8b29-40e7-87be-259ad440c5a8'
const HEART_ICON = 'https://www.figma.com/api/mcp/asset/2afd27d0-04e0-42aa-b80f-7d4d596d165d'

// ─── Data ─────────────────────────────────────────────────────────────────────

// Figma 145:788: pattern A B C D repeated 5× = 20 shapes. C is 60px wide; rest are 64px square.
const SHAPES = [
  { src: SHAPE_A, w: 64 },
  { src: SHAPE_B, w: 64 },
  { src: SHAPE_C, w: 60 },
  { src: SHAPE_D, w: 64 },
] as const

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

// ─── Component ────────────────────────────────────────────────────────────────

const Footer = () => (
  <FooterWrapper>

    {/* ── White content card — flush to top of footer, spanning full width ── */}
    <ContentCard>
      <ContentInner>
        {/* Figma 145:851: Stack_Sans_Notch Regular 64px/80px, tracking -1.28px */}
        <CTAHeading>
          <CTALine>Let&apos;s build</CTALine>
          <CTALine>
            <CTAMuted>something real</CTAMuted>
            <CTADot>.</CTADot>
          </CTALine>
        </CTAHeading>

        {/* Figma 145:852 HorizontalBorder: border-top, py-80px, flex-col */}
        <InfoSection>

          {/* Figma 145:853 Designer Info: flex, gap-40px, items-start */}
          <InfoRow>

            {/* Col 1 — Figma 145:854: flex-[1_0_0], gap-24px */}
            <DesignerCol>
              <BioText>
                Product &amp; Experience Designer mapping complex user flows into clean,
                developer-friendly products. Based in Kerala, India.
              </BioText>
              <Button label="Start a project" href="/contact" />
            </DesignerCol>

            {/* Col 2 — Figma 145:857: w-240px, gap-16px */}
            <NavCol>
              <ColLabel>Pages</ColLabel>
              <ColLinks>
                {PAGE_LINKS.map(({ label, href }) => (
                  <ColLink key={label} href={href}>{label}</ColLink>
                ))}
              </ColLinks>
            </NavCol>

            {/* Col 3 — Figma 145:864: w-240px, gap-16px */}
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

            {/* Col 4 — Figma 145:872: w-240px, gap-16px */}
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

      {/* Figma 145:788: 20 shapes, gap-40px, opacity-20, clips at viewport edges */}
      <ShapesRow>
        {Array.from({ length: 5 }).flatMap((_, i) =>
          SHAPES.map((shape, j) => (
            <ShapeBox key={`${i}-${j}`} $w={shape.w}>
              <ShapeImg src={shape.src} alt="" />
            </ShapeBox>
          ))
        )}
      </ShapesRow>

      {/* Figma 145:846: gap-8px, text-inverse */}
      <CopyrightRow>
        <CopyrightText>© 2026 DESIGNED WITH</CopyrightText>
        <HeartImg src={HEART_ICON} alt="♥" />
        <CopyrightText>BY ENRIC S NEELAMKAVIL</CopyrightText>
      </CopyrightRow>

    </BottomSection>

  </FooterWrapper>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

// Figma 145:910: full-width footer, red background image covers entire area.
const FooterWrapper = styled.footer`
  width: 100%;
  /* Gradient red to white bottom up. 
     Starts fading above BottomSection (280px).
     Finishes fading halfway up the remaining height (calc(50% + 140px)). */
  background: linear-gradient(
    to top, 
    ${({ theme }) => theme.colors.surface.highlight} 280px, 
    #FFFFFF calc(50% + 140px)
  );
  display: flex;
  flex-direction: column;
  align-items: center;
`

// Figma 145:850: 1168px content column (px-320px on 1920px canvas = w-1168px children).
// White card, no top radius — top edge is flush with footer. Bottom corners: 0 0 24px 24px.
// background-color is surface.primary (white). Full width container to cover red background.
const ContentCard = styled.div`
  /* 48px pillar-like margins on each side to expose the gradient background */
  width: calc(100% - 72px);
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border-radius: 0 0 24px 24px;
  display: flex;
  flex-direction: column;
  align-items: center;
  /* Add generous padding top to match the visual spacing above CTA */
  padding-top: 120px;
`

// Inner container that constrains the content to 1168px max width
const ContentInner = styled.div`
  width: 100%;
  max-width: 1168px;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 0 24px; /* safe area padding for smaller screens */
`

// Figma 145:851: Stack_Sans_Notch Regular, 64px / 80px lh, tracking -1.28px.
// No padding — CTA starts flush at the top of the ContentCard.
const CTAHeading = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: 64px;
  line-height: 80px;
  letter-spacing: -1.28px;
  color: ${({ theme }) => theme.colors.text.primary};
`

const CTALine = styled.p`
  margin: 0;
`

// "something real" → text-secondary
const CTAMuted = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

// "." → text-highlight
const CTADot = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

// Figma 145:852 HorizontalBorder: border-top border-tertiary, py-80px (top + bottom).
const InfoSection = styled.div`
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  padding-top: 80px;
  padding-bottom: 80px;
`

// Figma 145:853 Designer Info: flex, gap-40px, items-start, w-full.
const InfoRow = styled.div`
  display: flex;
  gap: 40px;
  align-items: flex-start;
  width: 100%;
`

// Figma 145:854: flex-[1_0_0], flex-col, gap-24px, items-start.
const DesignerCol = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;
`

// Figma 145:855: Stack_Sans_Headline Light, 16px / 24px, text-secondary #5c5c5c.
const BioText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

// Figma 145:857 / 145:864 / 145:872: w-240px, flex-col, gap-16px, items-start.
const NavCol = styled.div`
  width: 240px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;
`

// Figma: Stack_Sans_Notch Medium, 12px / 16px, text-tertiary #a3a3a3, uppercase.
const ColLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: 12px;
  line-height: 16px;
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`

// Figma: flex-col, gap-4px between links.
const ColLinks = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
`

// Figma: Stack_Sans_Headline Light, 16px / 24px, text-primary #171717.
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

// Figma 145:874: flex-col, gap-12px (email + visitor block).
const ReachOutContent = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
`

// Figma 145:875: Stack_Sans_Headline Light, 16px / 24px, text-primary.
const EmailText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
`

// Figma 145:876: flex-col, no gap between label and count.
const VisitorBlock = styled.div`
  display: flex;
  flex-direction: column;
`

// Figma 145:877: Stack_Sans_Headline Light, 16px / 24px, text-secondary.
const VisitorLabel = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.secondary};
`

// Figma 145:878: Stack_Sans_Headline Bold, 24px / 32px, text-highlight #e8342a, tracking 2.88px.
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
// Figma 145:787: Shapes container is flex-col, gap-72px (shapes row → copyright).
// overflow:hidden clips the shapes row — 20 shapes × ~104px each ≈ 2000px, wider than viewport.
const BottomSection = styled.div`
  width: 100%;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 72px;
  padding: 80px 0 40px;
  /* Original red texture background moved here to cover only the bottom section */
  background-image: url('${BG_IMAGE}');
  background-size: cover;
  background-position: center;
`

// Figma 145:788: flex, gap-40px, items-center, justify-center, opacity-20, w-full.
const ShapesRow = styled.div`
  display: flex;
  gap: 40px;
  align-items: center;
  justify-content: center;
  width: 100%;
  opacity: 0.2;
`

// Each shape: fixed-size wrapper (relative, shrink-0) + absolutely positioned img.
// Prevents flex-stretch. A/B/D = 64×64px · C = 60×64px.
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

// Figma 145:846: flex, gap-8px, items-center.
const CopyrightRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

// Figma: Stack_Sans_Notch Regular, 16px / 24px, text-inverse (white).
const CopyrightText = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.inverse};
  white-space: nowrap;
`

// Figma 145:848: 17px wide × 16px tall.
const HeartImg = styled.img`
  display: block;
  width: 17px;
  height: 16px;
  max-width: none;
`

export default Footer
