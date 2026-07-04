'use client'

import React, { useState, useRef } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Card data ────────────────────────────────────────────────────────────────

interface CardDef { key: string; src: string; alt: string }

const CARDS: CardDef[] = [
  { key: 'amex', src: '/about/personal/cards/american-express-membership-rewards.webp', alt: 'American Express Membership Rewards' },
  { key: 'marriott', src: '/about/personal/cards/hdfc-marriott-bonvoy.webp', alt: 'HDFC Marriott Bonvoy' },
  { key: 'phonepe', src: '/about/personal/cards/phonepe-sbi-select-black.webp', alt: 'PhonePe SBI Select Black' },
  { key: 'idfc', src: '/about/personal/cards/idfc-first-select.webp', alt: 'IDFC First Select' },
  { key: 'millenia', src: '/about/personal/cards/hdfc-millenia.webp', alt: 'HDFC Millennia' },
  { key: 'swiggy', src: '/about/personal/cards/hdfc-swiggy.webp', alt: 'HDFC Swiggy' },
  { key: 'flipkart', src: '/about/personal/cards/flipkart-axis.webp', alt: 'Flipkart Axis' },
  { key: 'icici', src: '/about/personal/cards/icici-amazon-pay.webp', alt: 'ICICI Amazon Pay' },
]

// Mobile stack: AmEx is frontmost (top), ICICI is backmost (bottom)
const MOBILE_STACK = [...CARDS]

const TOTAL = CARDS.length
const PLUSH_URL = 'https://plush.money/in/find-your-card'

// ─── Component ───────────────────────────────────────────────────────────────

const CreditCardsSection = () => {
  // stackOrder[i] = index into MOBILE_CARDS currently at position i
  const [stackOrder, setStackOrder] = useState<number[]>(MOBILE_STACK.map((_, i) => i))
  const [dragY, setDragY] = useState(0)
  const [isDragging, setIsDragging] = useState(false)
  const [isExiting, setIsExiting] = useState(false)

  const isDraggingRef = useRef(false)
  const pointerStartY = useRef(0)
  const latestDragY = useRef(0)

  // ── Swipe handlers (attached to top card only) ────────────────────────────

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
    const clamped = Math.min(0, dy) // only allow upward drag
    latestDragY.current = clamped
    setDragY(clamped)
  }

  const handlePointerUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)

    if (latestDragY.current < -50) {
      // Trigger exit: animate off-screen, then reorder
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
      // Spring back
      setDragY(0)
      latestDragY.current = 0
    }
  }

  // Inline style for top card (changes every frame during drag — avoids styled-components class churn)
  const topCardStyle = (): React.CSSProperties => {
    if (isExiting) {
      return {
        transform: 'translateY(-200%)',
        opacity: 0,
        transition: 'transform 0.3s ease-out, opacity 0.3s ease-out',
        cursor: 'grabbing',
      }
    }
    if (isDragging && dragY < 0) {
      return {
        transform: `translateY(${dragY}px)`,
        transition: 'none',
        cursor: 'grabbing',
      }
    }
    return {
      transform: 'translateY(0)',
      transition: 'transform 0.2s ease-out',
      cursor: 'grab',
    }
  }

  return (
    <Section>
      <TitleBlock>
        <SectionLabel>COLLECT POINTS TO EXPERIENCE</SectionLabel>
        <SectionHeader before="My " muted="Card" after=" collection." />
      </TitleBlock>

      {/* ── Desktop grid — hidden on mobile ─────────────────────────── */}
      <DesktopGrid>
        {CARDS.map(({ key, src, alt }) => (
          <DesktopCard key={key}>
            <img src={src} alt={alt} draggable={false} />
          </DesktopCard>
        ))}
      </DesktopGrid>

      {/* ── Mobile swipeable card stack — hidden on desktop ──────────────── */}
      <MobileStack>
        {[...stackOrder].reverse().map((cardIdx, revIndex) => {
          const position = TOTAL - 1 - revIndex
          const card = MOBILE_STACK[cardIdx]
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

      {/* ── CTA — flex row desktop, flex col mobile ───────────────────────── */}
      <CtaRow>
        <CtaText>
          Not sure which card you need? Enter your spends and preferences, and Plush will tell
          you exactly what I&apos;d pick.
        </CtaText>
        <CtaButton href={PLUSH_URL} target="_blank" rel="noopener noreferrer">
          <CtaButtonText>Find the right card</CtaButtonText>
          <CtaPill>
            <img
              src="/about/personal/podcast/arrow-watch.svg"
              alt=""
              aria-hidden="true"
              width={10}
              height={10}
            />
          </CtaPill>
        </CtaButton>
      </CtaRow>
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

  ${mq.tablet} {
    max-width: none;
  }

  ${mq.mobile} {
    max-width: none;
  }
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

// ── Desktop grid ──────────────────────────────────────────────────────────────

const DesktopGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  gap: ${({ theme }) => theme.spacing[6]};

  /* When the screen is narrower than ~1100px, start wrapping to maintain a good card width */
  @media (max-width: 1100px) {
    grid-template-columns: repeat(auto-fit, minmax(260px, 1fr));
  }

  ${mq.mobile} {
    display: none;
  }
`

const DesktopCard = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 160 / 100;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: 14px;
  overflow: hidden;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateY(-4px);
  }

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

// ── Mobile stack ──────────────────────────────────────────────────────────────

const MobileStack = styled.div`
  display: none;

  ${mq.mobile} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

interface MobileCardProps {
  $zIndex: number
  $hasNegMargin: boolean
}

const MobileCard = styled.div<MobileCardProps>`
  position: relative;
  z-index: ${({ $zIndex }) => $zIndex};
  width: 100%;
  aspect-ratio: 160 / 100;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: 16px;
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

// ── CTA ───────────────────────────────────────────────────────────────────────

const CtaRow = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;

  ${mq.tablet} {
    gap: ${({ theme }) => theme.spacing[6]};
  }

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[4]};
  }
`

const CtaText = styled.p`
  margin: 0;
  width: 564px;
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.tablet} {
    width: auto;
    flex: 1;
  }

  ${mq.mobile} {
    width: 100%;
  }
`

const CtaButton = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 12px 24px;
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-decoration: none;
  flex-shrink: 0;
  cursor: pointer;

  ${mq.mobile} {
    padding: 12px 16px;
  }
`

const CtaButtonText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: 0.875rem;
    line-height: 1.125rem;
  }
`

const CtaPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 18px;
  height: 18px;
  background: ${({ theme }) => theme.colors.icon.secondary};
  border-radius: 9px;
  flex-shrink: 0;

  img { display: block; }

  ${mq.mobile} {
    width: 16px;
    height: 16px;
  }
`

export default CreditCardsSection
