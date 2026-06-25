'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styled, { css, keyframes } from 'styled-components'
import Button from './Button'
import { mq } from '@/styles/theme'

const SHAPE_A = '/shapes/shape-1.svg'
const SHAPE_B = '/shapes/shape-2.svg'
const SHAPE_C = '/shapes/shape-3.svg'
const SHAPE_D = '/shapes/shape-4.svg'
const HEART_ICON = '/icons/heart.svg'
const HOURGLASS_ICON = '/icons/hourglass.svg'


const SHAPES = [
  { src: SHAPE_A, w: 64 },
  { src: SHAPE_B, w: 64 },
  { src: SHAPE_C, w: 64 },
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

const HeartIcon = () => {
  const [showHourglass, setShowHourglass] = useState(false)
  const [isJiggling, setIsJiggling] = useState(false)
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null)

  const handleMouseEnter = () => {
    if (showHourglass) return
    setIsJiggling(true)
    timerRef.current = setTimeout(() => {
      setIsJiggling(false)
      setShowHourglass(true)
    }, 400)
  }

  const handleMouseLeave = () => {
    if (timerRef.current) clearTimeout(timerRef.current)
    setIsJiggling(false)
    setShowHourglass(false)
  }

  return (
    <IconContainer onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
      {showHourglass ? (
        <a href="https://archive.enric.design" target="_blank" rel="noopener noreferrer">
          <HourglassImg src={HOURGLASS_ICON} alt="visit archive" />
        </a>
      ) : (
        <IconWrapper $jiggling={isJiggling}>
          <HeartImg src={HEART_ICON} alt="♥" />
        </IconWrapper>
      )}
    </IconContainer>
  )
}

const Footer = () => {
  const [visitorCount, setVisitorCount] = useState<number | null>(null)

  useEffect(() => {
    const fetchCount = async () => {
      // Check session storage first to avoid duplicate views per session
      const cachedCount = sessionStorage.getItem('visitorCount')
      if (cachedCount) {
        setVisitorCount(parseInt(cachedCount, 10))
        return
      }

      try {
        const res = await fetch('/api/visitor', { method: 'POST' })
        const data = await res.json()
        if (data && data.count !== null) {
          setVisitorCount(data.count)
          sessionStorage.setItem('visitorCount', data.count.toString())
        }
      } catch (err) {
        console.error('Failed to fetch visitor count', err)
      }
    }

    fetchCount()
  }, [])

  return (
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
                <ButtonWrapper>
                  <Button label="Start a project" href="#" />
                </ButtonWrapper>
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
                    <VisitorCount>
                      {visitorCount !== null ? String(visitorCount).padStart(3, '0') : '---'}
                    </VisitorCount>
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
            <HeartIcon />
          </CopyrightFirstLine>
          <CopyrightText>BY ENRIC S NEELAMKAVIL</CopyrightText>
        </CopyrightRow>

      </BottomSection>

    </FooterWrapper>
  )
}

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

  ${mq.tablet} {
    overflow: visible;
    flex-wrap: wrap;
  }

  ${mq.mobile} {
    flex-direction: column;
    gap: 40px;
  }
`

const DesignerCol = styled.div`
  flex: 1 1 0;
  min-width: 0;
  max-width: none;
  overflow: hidden;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  gap: 24px;
  align-items: flex-start;

  ${mq.tablet} {
    overflow: visible;
  }

  ${mq.mobile} {
    flex: none;
    width: 100%;
  }
`

const ButtonWrapper = styled.div`
  flex-shrink: 0;
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

    & > div {
      flex: 1 1 0;
      width: auto;
      max-width: none;
    }
  }
`

const NavCol = styled.div`
  flex: 1 1 0;
  min-width: 0;
  max-width: none;
  overflow: hidden;
  word-break: break-word;
  display: flex;
  flex-direction: column;
  gap: 16px;
  align-items: flex-start;

  ${mq.mobile} {
    flex: none;
    width: 100%;
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
  min-width: 0;
  max-width: 100%;
  overflow: hidden;
`

const EmailText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: 16px;
  line-height: 24px;
  color: ${({ theme }) => theme.colors.text.primary};
  display: block;
  width: 100%;
  white-space: normal;
  word-break: break-all;
  overflow-wrap: anywhere;
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

const jiggle = keyframes`
  0%   { transform: rotate(0deg); }
  20%  { transform: rotate(-15deg); }
  40%  { transform: rotate(15deg); }
  60%  { transform: rotate(-10deg); }
  80%  { transform: rotate(10deg); }
  100% { transform: rotate(0deg); }
`

const IconContainer = styled.span`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
`

const IconWrapper = styled.span<{ $jiggling: boolean }>`
  display: inline-flex;
  align-items: center;
  justify-content: center;
  animation: ${({ $jiggling }) =>
    $jiggling ? css`${jiggle} 0.4s ease forwards` : 'none'};
`

const HeartImg = styled.img`
  display: block;
  width: 17px;
  height: 16px;
  max-width: none;
`

const HourglassImg = styled.img`
  display: block;
  width: 13px;
  height: 16px;
  max-width: none;
`

export default Footer
