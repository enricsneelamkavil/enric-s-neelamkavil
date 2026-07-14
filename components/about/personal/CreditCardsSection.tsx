'use client'

import React, { useEffect, useRef, useState } from 'react'
import Image from 'next/image'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Layout constants (Figma-derived) ────────────────────────────────────────
const MOBILE_CARD_OVERLAP = 190
const DESKTOP_CARD_OVERLAP = 141.154
const DESKTOP_STACK_WIDTH = 261.606
const DESKTOP_CARD_RADIUS = '9.81px'
const DESKTOP_CARD_BORDER = '0.464px'
const EXTERNAL_ICON_DESKTOP = 18
const EXTERNAL_ICON_MOBILE = 16
const PLUSH_LOGO_W = 189.157
const PLUSH_LOGO_H = 56

// ─── Card data ────────────────────────────────────────────────────────────────

interface CardDef { key: string; src: string; alt: string }

// Canonical order — also the mobile stack's top-to-back order (confirmed
// against Figma's mobile frame, unchanged from before this rebuild).
const CARDS: CardDef[] = [
  { key: 'amex',     src: '/about/personal/cards/american-express-membership-rewards.webp', alt: 'American Express Membership Rewards' },
  { key: 'marriott', src: '/about/personal/cards/hdfc-marriott-bonvoy.webp',               alt: 'HDFC Marriott Bonvoy'               },
  { key: 'phonepe',  src: '/about/personal/cards/phonepe-sbi-select-black.webp',           alt: 'PhonePe SBI Select Black'           },
  { key: 'idfc',     src: '/about/personal/cards/idfc-first-select.webp',                  alt: 'IDFC First Select'                  },
  { key: 'millenia', src: '/about/personal/cards/hdfc-millenia.webp',                      alt: 'HDFC Millennia'                     },
  { key: 'swiggy',   src: '/about/personal/cards/hdfc-swiggy.webp',                        alt: 'HDFC Swiggy'                        },
  { key: 'flipkart', src: '/about/personal/cards/flipkart-axis.webp',                      alt: 'Flipkart Axis'                      },
  { key: 'icici',    src: '/about/personal/cards/icici-amazon-pay.webp',                   alt: 'ICICI Amazon Pay'                   },
]

// Desktop's vertical pile uses its own front-to-back order — confirmed against
// a fresh Figma read of node 328:1182 (idfc/millenia and flipkart/icici are
// swapped relative to CARDS/mobile order; not an artifact, checked twice).
const DESKTOP_ORDER_KEYS = ['amex', 'marriott', 'phonepe', 'millenia', 'idfc', 'swiggy', 'icici', 'flipkart']
const DESKTOP_CARDS: CardDef[] = DESKTOP_ORDER_KEYS.map(key => CARDS.find(c => c.key === key)!)

const TOTAL = CARDS.length
const PLUSH_URL = 'https://plush.money/in/find-your-card'

const FEATURES = [
  'Great returns on everyday spending, helping you earn perks.',
  'Fraud protection on purchases and interest-free credit.',
  'Exclusive benefits like airport lounge access, discounts, & partner offers.',
]

const STAT_TARGETS = [TOTAL, 6]

const CTA_HEADING_DESKTOP = 'Not sure which card you need?'
const CTA_BODY_DESKTOP = "Find your right card in one click. Get your spends and preferences, and Plush will tell you exactly what I'd pick."
const CTA_HEADING_MOBILE = 'Confused which card you need?'
const CTA_BODY_MOBILE = "Not sure which card you need? Enter your spends and preferences, and Plush will tell you exactly what I'd pick."
const PLUSH_TAGLINE = 'Your Personalised AI Powered Credit Card Assistant'

// ─── Swipe-to-cycle hook (top card only, translateY-based) ──────────────────
// Shared by both the desktop vertical pile and the mobile stack — Figma's
// desktop stack now carries the same "swipe up to cycle" annotation the
// mobile stack already had, so both need an independent instance of this.

const useSwipeStack = (total: number) => {
  const [stackOrder, setStackOrder] = useState<number[]>(() => Array.from({ length: total }, (_, i) => i))
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const isDraggingRef = useRef(false)
  const pointerStartY = useRef(0)
  const latestDragY = useRef(0)

  const handlePointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (isExiting) return
    e.currentTarget.setPointerCapture(e.pointerId)
    isDraggingRef.current = true
    setIsDragging(true)
    pointerStartY.current = e.clientY
    latestDragY.current = 0
    setDragY(0)
  }

  const handlePointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    const dy = e.clientY - pointerStartY.current
    latestDragY.current = Math.min(0, dy)
    setDragY(Math.min(0, dy))
  }

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)

    if (latestDragY.current < -50) {
      setIsExiting(true)
      setTimeout(() => {
        setStackOrder(prev => {
          const next = [...prev]
          const top = next.shift()!
          next.push(top)
          return next
        })
        setIsExiting(false)
        setDragY(0)
        latestDragY.current = 0
      }, 350)
    } else {
      setDragY(0)
      latestDragY.current = 0
    }
  }

  const topCardStyle = (): React.CSSProperties => {
    if (isExiting) return { transform: 'translateY(-200%)', opacity: 0, transition: 'transform 0.3s ease-out, opacity 0.3s ease-out', cursor: 'grabbing' }
    if (isDragging && dragY < 0) return { transform: `translateY(${dragY}px)`, transition: 'none', cursor: 'grabbing' }
    return { transform: 'translateY(0)', transition: 'transform 0.2s ease-out', cursor: 'grab' }
  }

  return { stackOrder, topCardStyle, handlePointerDown, handlePointerMove, handlePointerUp }
}

// ─── Swipe stack sub-component ───────────────────────────────────────────────

interface SwipeStackProps {
  cards: CardDef[]
  variant: 'desktop' | 'mobile'
}

const SwipeStack = ({ cards, variant }: SwipeStackProps) => {
  const total = cards.length
  const { stackOrder, topCardStyle, handlePointerDown, handlePointerMove, handlePointerUp } = useSwipeStack(total)

  return (
    <StackWrap $variant={variant}>
      {[...stackOrder].reverse().map((cardIdx, revIndex) => {
        const position = total - 1 - revIndex
        const card = cards[cardIdx]
        const isTop = position === 0
        const flip = variant === 'desktop' && card.key === 'phonepe'
        return (
          <StackCard
            key={card.key}
            $variant={variant}
            $zIndex={total - position}
            $hasNegMargin={!isTop}
            $flip={flip}
            style={isTop ? topCardStyle() : undefined}
            onPointerDown={isTop ? handlePointerDown : undefined}
            onPointerMove={isTop ? handlePointerMove : undefined}
            onPointerUp={isTop ? handlePointerUp : undefined}
            onPointerCancel={isTop ? handlePointerUp : undefined}
          >
            <Image src={card.src} alt={card.alt} draggable={false} fill sizes={variant === 'desktop' ? '20vw' : '100vw'} />
          </StackCard>
        )
      })}
    </StackWrap>
  )
}

// ─── Component ───────────────────────────────────────────────────────────────

const CreditCardsSection = () => {
  const [counts, setCounts] = useState([0, 0])
  const animatedRef = useRef(false)
  const desktopStatsRef = useRef<HTMLDivElement>(null)
  const mobileStatsRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const runCountUp = () => {
      if (animatedRef.current) return
      animatedRef.current = true
      const t0 = performance.now()
      const DURATION = 1500
      const tick = (now: number) => {
        const p = Math.min((now - t0) / DURATION, 1)
        const eased = 1 - Math.pow(1 - p, 3)
        setCounts(STAT_TARGETS.map(v => Math.round(v * eased)))
        if (p < 1) requestAnimationFrame(tick)
      }
      requestAnimationFrame(tick)
    }

    const observer = new IntersectionObserver((entries) => {
      if (entries.some(e => e.isIntersecting)) runCountUp()
    }, { threshold: 0.5 })

    if (desktopStatsRef.current) observer.observe(desktopStatsRef.current)
    if (mobileStatsRef.current) observer.observe(mobileStatsRef.current)

    return () => observer.disconnect()
  }, [])

  const statValues = [
    { value: counts[0], label: 'CREDIT CARDS' },
    { value: counts[1], label: 'CARD ISSUERS' },
  ]

  return (
    <Section>
      <TitleBlock>
        <SectionLabel>CREDIT LINEUP</SectionLabel>
        <SectionHeader before="My " muted="Card" after=" collection." />
      </TitleBlock>

      {/* ── Desktop: 3-column row ───────────────────────────────────────── */}
      <DesktopRow>
        <InfoColumn>
          <FeaturesBlock>
            <FeaturesHeading $variant="desktop">Why use Credit Cards?</FeaturesHeading>
            <FeaturesList>
              {FEATURES.map(text => (
                <FeatureRow key={text}>
                  <BulletIcon aria-hidden="true" />
                  <FeatureText>{text}</FeatureText>
                </FeatureRow>
              ))}
            </FeaturesList>
          </FeaturesBlock>

          <StatsRow ref={desktopStatsRef} $center={false}>
            {statValues.map(({ value, label }, i) => (
              <React.Fragment key={label}>
                {i > 0 && <StatSep />}
                <StatBlock>
                  <StatNumber>{String(value).padStart(2, '0')}</StatNumber>
                  <StatLabel>{label}</StatLabel>
                </StatBlock>
              </React.Fragment>
            ))}
          </StatsRow>
        </InfoColumn>

        <SwipeStack cards={DESKTOP_CARDS} variant="desktop" />

        <CTAColumn>
          <CTATextBlock>
            <CTAHeading $variant="desktop">{CTA_HEADING_DESKTOP}</CTAHeading>
            <CTABody>{CTA_BODY_DESKTOP}</CTABody>
          </CTATextBlock>
          <PlushBlock>
            <PlushLogoWrap>
              <PlushLogo src="/about/personal/credit-cards/plush-logo.svg" alt="Plush" width={PLUSH_LOGO_W} height={PLUSH_LOGO_H} />
              <PlushTagline>{PLUSH_TAGLINE}</PlushTagline>
            </PlushLogoWrap>
            <CTAButton href={PLUSH_URL} target="_blank" rel="noopener noreferrer">
              Find your card
              <CTAIcon $size={EXTERNAL_ICON_DESKTOP} aria-hidden="true" />
            </CTAButton>
          </PlushBlock>
        </CTAColumn>
      </DesktopRow>

      {/* ── Mobile: single column ───────────────────────────────────────── */}
      <MobileColumn>
        <FeaturesBlock>
          <FeaturesHeading $variant="mobile">Why use Credit Cards?</FeaturesHeading>
          <FeaturesList>
            {FEATURES.map(text => (
              <FeatureRow key={text}>
                <BulletIcon aria-hidden="true" />
                <FeatureText>{text}</FeatureText>
              </FeatureRow>
            ))}
          </FeaturesList>
        </FeaturesBlock>

        <StatsRow ref={mobileStatsRef} $center>
          {statValues.map(({ value, label }, i) => (
            <React.Fragment key={label}>
              {i > 0 && <StatSep />}
              <StatBlock>
                <StatNumber>{String(value).padStart(2, '0')}</StatNumber>
                <StatLabel>{label}</StatLabel>
              </StatBlock>
            </React.Fragment>
          ))}
        </StatsRow>

        <SwipeStack cards={CARDS} variant="mobile" />

        <MobileCTABlock>
          <CTATextBlock>
            <CTAHeading $variant="mobile">{CTA_HEADING_MOBILE}</CTAHeading>
            <CTABody>{CTA_BODY_MOBILE}</CTABody>
          </CTATextBlock>
          <PlushBlock>
            <PlushLogoWrap>
              <PlushLogo src="/about/personal/credit-cards/plush-logo.svg" alt="Plush" width={PLUSH_LOGO_W} height={PLUSH_LOGO_H} />
              <PlushTagline>{PLUSH_TAGLINE}</PlushTagline>
            </PlushLogoWrap>
            <MobileCTAButton href={PLUSH_URL} target="_blank" rel="noopener noreferrer">
              Find your card
              <CTAIcon $size={EXTERNAL_ICON_MOBILE} aria-hidden="true" />
            </MobileCTAButton>
          </PlushBlock>
        </MobileCTABlock>
      </MobileColumn>
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

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

// ── Desktop row ───────────────────────────────────────────────────────────────

const DesktopRow = styled.div`
  display: flex;
  gap: 80px;
  align-items: center;
  width: 100%;

  ${mq.mobile} { display: none; }
`

const InfoColumn = styled.div`
  flex: 1 0 0;
  min-width: 1px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`

const FeaturesBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
`

const FeaturesHeading = styled.p<{ $variant: 'desktop' | 'mobile' }>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ $variant, theme }) => ($variant === 'desktop' ? theme.fontSizes.md : theme.fontSizes.sm)};
  line-height: ${({ $variant, theme }) => ($variant === 'desktop' ? theme.lineHeights.relaxed : theme.lineHeights.normal)};
  color: ${({ theme }) => theme.colors.text.primary};
`

const FeaturesList = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
`

const FeatureRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  width: 100%;
`

const BulletIcon = styled.span`
  display: inline-block;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(/icons/diamond.svg) no-repeat center / contain;
  mask: url(/icons/diamond.svg) no-repeat center / contain;
`

const FeatureText = styled.p`
  margin: 0;
  flex: 1 0 0;
  min-width: 1px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ── Stats ──────────────────────────────────────────────────────────────────────

const StatsRow = styled.div<{ $center: boolean }>`
  display: flex;
  align-items: center;
  justify-content: ${({ $center }) => ($center ? 'center' : 'flex-start')};
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;
`

const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100px;
  text-align: center;
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  line-height: 56px;
  color: ${({ theme }) => theme.colors.text.highlight};
`

const StatLabel = styled.div`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`

const StatSep = styled.div`
  width: 1px;
  height: 64px;
  background: ${({ theme }) => theme.colors.border.tertiary};
  flex-shrink: 0;
`

// ── Swipe stack (shared desktop/mobile) ─────────────────────────────────────────

const StackWrap = styled.div<{ $variant: 'desktop' | 'mobile' }>`
  display: flex;
  flex-direction: column;
  flex-shrink: 0;
  width: ${({ $variant }) => ($variant === 'desktop' ? `${DESKTOP_STACK_WIDTH}px` : '100%')};
`

interface StackCardProps { $variant: 'desktop' | 'mobile'; $zIndex: number; $hasNegMargin: boolean; $flip: boolean }

const StackCard = styled.div<StackCardProps>`
  position: relative;
  width: 100%;
  aspect-ratio: 160 / 100;
  overflow: hidden;
  z-index: ${({ $zIndex }) => $zIndex};
  border-radius: ${({ $variant, theme }) => ($variant === 'desktop' ? DESKTOP_CARD_RADIUS : theme.radii.lg)};
  border: ${({ $variant }) => ($variant === 'desktop' ? DESKTOP_CARD_BORDER : '1px')} solid ${({ theme }) => theme.colors.border.tertiary};
  margin-bottom: ${({ $hasNegMargin, $variant }) => ($hasNegMargin ? `-${$variant === 'desktop' ? DESKTOP_CARD_OVERLAP : MOBILE_CARD_OVERLAP}px` : '0')};
  transform: ${({ $flip }) => ($flip ? 'rotate(180deg)' : 'none')};
  user-select: none;
  touch-action: none;

  img {
    position: absolute;
    inset: 0;
    width: 100%;
    height: 100%;
    object-fit: cover;
    pointer-events: none;
    display: block;
  }
`

// ── CTA column (shared desktop/mobile) ──────────────────────────────────────────

const CTAColumn = styled.div`
  flex: 1 0 0;
  min-width: 1px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: flex-start;
`

const CTATextBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;
`

const CTAHeading = styled.p<{ $variant: 'desktop' | 'mobile' }>`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ $variant, theme }) => ($variant === 'desktop' ? theme.fontSizes.md : theme.fontSizes.sm)};
  line-height: ${({ $variant, theme }) => ($variant === 'desktop' ? theme.lineHeights.relaxed : theme.lineHeights.normal)};
  color: ${({ theme }) => theme.colors.text.primary};
`

const CTABody = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const PlushBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: flex-start;
`

const PlushLogoWrap = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  align-items: flex-start;
`

const PlushLogo = styled(Image)`
  display: block;
  height: 56px;
  width: auto;
`

const PlushTagline = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

const CTAButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.surface.inverse};
  border-radius: ${({ theme }) => theme.radii.lg};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
`

// ── Mobile column ────────────────────────────────────────────────────────────────

const MobileColumn = styled.div`
  display: none;

  ${mq.mobile} {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[10]};
    width: 100%;
  }
`

const MobileCTABlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  align-items: flex-start;
  width: 100%;
`

const MobileCTAButton = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 12px 16px;
  background: ${({ theme }) => theme.colors.surface.inverse};
  border-radius: 8px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: 0.875rem;
  line-height: 1.125rem;
  color: ${({ theme }) => theme.colors.text.inverse};
  text-decoration: none;
  white-space: nowrap;
  flex-shrink: 0;
  cursor: pointer;
`

const CTAIcon = styled.span<{ $size: number }>`
  display: inline-block;
  width: ${({ $size }) => $size}px;
  height: ${({ $size }) => $size}px;
  background-color: ${({ theme }) => theme.colors.text.inverse};
  -webkit-mask: url(/icons/external.svg) no-repeat center / contain;
  mask: url(/icons/external.svg) no-repeat center / contain;
  flex-shrink: 0;
`

export default CreditCardsSection
