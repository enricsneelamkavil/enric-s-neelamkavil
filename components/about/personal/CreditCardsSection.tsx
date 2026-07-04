'use client'

import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Layout constants (Figma-derived) ────────────────────────────────────────
const CARD_OVERLAP = 190
const EXTERNAL_ICON_DESKTOP = 18
const EXTERNAL_ICON_MOBILE = 16

// ─── Card data ────────────────────────────────────────────────────────────────

interface CardDef { key: string; src: string; alt: string }

// Order is front-to-back for desktop (amex=front z:8, icici=back z:1)
// and top-to-back for mobile stack (amex=top card)
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

const TOTAL = CARDS.length
const PLUSH_URL = 'https://plush.money/in/find-your-card'
const CTA_TEXT = "Not sure which card you need? Enter your spends and preferences, and Plush will tell you exactly what I'd pick."

// ─── Component ───────────────────────────────────────────────────────────────

const CreditCardsSection = () => {
  const [stackOrder, setStackOrder] = useState<number[]>(CARDS.map((_, i) => i))
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const isDraggingRef = useRef(false)
  const pointerStartY = useRef(0)
  const latestDragY = useRef(0)

  // ── Mobile swipe handlers (top card only) ────────────────────────────────

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

  return (
    <Section>
      <TitleBlock>
        <SectionLabel>CREDIT LINEUP</SectionLabel>
        <SectionHeader before="My " muted="Card" after=" collection." />
      </TitleBlock>

      {/* ── Desktop: horizontal overlap stack + CTA column ──────────────── */}
      <CardInfoContainer>
        <CardStack>
          {CARDS.map(({ key, src, alt }, i) => (
            <DesktopCard key={key} $zIndex={TOTAL - i} $last={i === TOTAL - 1}>
              <img src={src} alt={alt} draggable={false} />
            </DesktopCard>
          ))}
        </CardStack>

        <CTAColumn>
          <CTAText>{CTA_TEXT}</CTAText>
          <CTAButton href={PLUSH_URL} target="_blank" rel="noopener noreferrer">
            Find the right card
            <CTAIcon $size={EXTERNAL_ICON_DESKTOP} aria-hidden="true" />
          </CTAButton>
        </CTAColumn>
      </CardInfoContainer>

      {/* ── Mobile: swipeable card stack ────────────────────────────────── */}
      <MobileStack>
        {[...stackOrder].reverse().map((cardIdx, revIndex) => {
          const position = TOTAL - 1 - revIndex
          const card = CARDS[cardIdx]
          const isTop = position === 0
          return (
            <MobileCard
              key={card.key}
              $zIndex={TOTAL - position}
              $hasNegMargin={!isTop}
              style={isTop ? topCardStyle() : undefined}
              onPointerDown={isTop ? handlePointerDown : undefined}
              onPointerMove={isTop ? handlePointerMove : undefined}
              onPointerUp={isTop ? handlePointerUp : undefined}
              onPointerCancel={isTop ? handlePointerUp : undefined}
            >
              <img src={card.src} alt={card.alt} draggable={false} />
            </MobileCard>
          )
        })}
      </MobileStack>

      {/* ── Mobile CTA block ────────────────────────────────────────────── */}
      <MobileCTABlock>
        <CTAText>{CTA_TEXT}</CTAText>
        <MobileCTAButton href={PLUSH_URL} target="_blank" rel="noopener noreferrer">
          Find the right card
          <CTAIcon $size={EXTERNAL_ICON_MOBILE} aria-hidden="true" />
        </MobileCTAButton>
      </MobileCTABlock>
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

const DesktopLabelWrap = styled.div`
  ${mq.mobile} { display: none; }
`

const MobileLabelWrap = styled.div`
  display: none;
  ${mq.mobile} { display: block; }
`

// ── Desktop: horizontal overlap stack ────────────────────────────────────────

const CardInfoContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: center;
  width: 100%;

  ${mq.mobile} { display: none; }
`

const CardStack = styled.div`
  flex: 1 0 0;
  min-width: 1px;
  isolation: isolate;
  display: flex;
  flex-direction: row;
  align-items: flex-start;
  position: relative;
`

interface DesktopCardProps { $zIndex: number; $last: boolean }

const DesktopCard = styled.div<DesktopCardProps>`
  flex: 1 0 0;
  min-width: 1px;
  aspect-ratio: 160 / 100;
  overflow: clip;
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  position: relative;
  z-index: ${({ $zIndex }) => $zIndex};
  margin-right: ${({ $last }) => ($last ? '0' : `-${CARD_OVERLAP}px`)};

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

const CTAColumn = styled.div`
  flex: 1 0 0;
  min-width: 1px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  align-items: flex-start;
`

const CTAText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
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

  img { display: block; flex-shrink: 0; }
`

// ── Mobile: swipeable stack ───────────────────────────────────────────────────

const MobileStack = styled.div`
  display: none;

  ${mq.mobile} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

interface MobileCardProps { $zIndex: number; $hasNegMargin: boolean }

const MobileCard = styled.div<MobileCardProps>`
  position: relative;
  z-index: ${({ $zIndex }) => $zIndex};
  width: 100%;
  aspect-ratio: 160 / 100;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  flex-shrink: 0;
  margin-bottom: ${({ $hasNegMargin }) => ($hasNegMargin ? '-185px' : '0')};
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

// ── Mobile CTA block ──────────────────────────────────────────────────────────

const MobileCTABlock = styled.div`
  display: none;

  ${mq.mobile} {
    display: flex;
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[4]};
    align-items: flex-start;
    width: 100%;
  }
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
