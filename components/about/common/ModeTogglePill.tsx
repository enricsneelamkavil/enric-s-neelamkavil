'use client'

import { useRef, useState, useEffect, useCallback } from 'react'
import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'professional' | 'personal'

interface Props {
  mode: Mode
  onModeChange: (mode: Mode) => void
}

// ─── Constants ────────────────────────────────────────────────────────────────

const CIRCLE_D  = 42    // circle diameter desktop
const CIRCLE_M  = 36    // circle diameter mobile
const PAD       = 6     // pill padding all sides
const THRESHOLD = 0.75  // swipe threshold to trigger mode switch

// ─── Component ────────────────────────────────────────────────────────────────

const ModeTogglePill = ({ mode, onModeChange }: Props) => {
  const pillRef       = useRef<HTMLDivElement>(null)
  const circleRef     = useRef<HTMLDivElement>(null)
  const startXRef     = useRef(0)
  const isDraggingRef = useRef(false)
  const dragXRef      = useRef(0)
  const maxDragRef    = useRef(200)
  const circWRef      = useRef(CIRCLE_D)

  const [dragX,      setDragX]      = useState(0)
  const [isDragging, setIsDragging] = useState(false)

  const label = mode === 'professional' ? 'Slide for Personal Mode' : 'Slide for Professional Mode'

  // Reset slider position smoothly when mode changes (under glimm transition)
  useEffect(() => {
    setDragX(0)
    dragXRef.current = 0
    setIsDragging(false)
    isDraggingRef.current = false
  }, [mode])

  // Use clientWidth for inner pill space and offsetWidth for outer circle box
  // This ensures exact 6px right padding at the end position without border discrepancies
  // Both reads happen only here (mount/resize/pointerdown) — never during the move
  // handler or render body, which would force a synchronous reflow on every drag frame.
  const calculateMaxDrag = useCallback(() => {
    if (!pillRef.current || !circleRef.current) return 200
    const pillW = pillRef.current.clientWidth
    const circW = circleRef.current.offsetWidth
    circWRef.current = circW
    return Math.max(1, pillW - circW - PAD * 2)
  }, [])

  useEffect(() => {
    const updateMaxDrag = () => {
      maxDragRef.current = calculateMaxDrag()
    }
    updateMaxDrag()
    window.addEventListener('resize', updateMaxDrag)
    return () => window.removeEventListener('resize', updateMaxDrag)
  }, [calculateMaxDrag])

  const onDown = (e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    maxDragRef.current = calculateMaxDrag()
    
    // Track from pointer down position
    startXRef.current = e.clientX - dragXRef.current
    isDraggingRef.current = true
    setIsDragging(true)
  }

  const onMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!isDraggingRef.current) return
    const delta = e.clientX - startXRef.current
    const clamped = Math.max(0, Math.min(delta, maxDragRef.current))
    dragXRef.current = clamped
    setDragX(clamped)
  }

  const onUp = () => {
    if (!isDraggingRef.current) return
    isDraggingRef.current = false
    setIsDragging(false)

    const progress = dragXRef.current / maxDragRef.current
    if (progress >= THRESHOLD) {
      // Complete the slide smoothly to 100% before triggering mode change
      dragXRef.current = maxDragRef.current
      setDragX(maxDragRef.current)
      onModeChange(mode === 'professional' ? 'personal' : 'professional')
    } else {
      // Spring back to 0 like iOS call interaction when released early
      dragXRef.current = 0
      setDragX(0)
    }
  }

  const circW = circWRef.current
  const maxD = maxDragRef.current || 200
  const progress = Math.min(1, Math.max(0, dragX / maxD))

  return (
    <Pill
      ref={pillRef}
      role="slider"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={Math.round(progress * 100)}
      onPointerDown={onDown}
      onPointerMove={onMove}
      onPointerUp={onUp}
      onPointerCancel={onUp}
      $isDragging={isDragging}
    >
      {/* Active Fill Track — follows the thumb smoothly without bleeding out */}
      <FillTrack
        $isDragging={isDragging}
        style={{ width: `${dragX > 0 ? circW + dragX : 0}px` }}
      />

      {/* Tactile Thumb Circle — vertically centered & iOS spring physics */}
      <Circle
        ref={circleRef}
        $isDragging={isDragging}
        style={{
          transform: `translate3d(${dragX}px, -50%, 0) scale(${isDragging ? 1.015 : 1})`,
        }}
      >
        <IconWrapper $isDragging={isDragging}>
          <svg width="20" height="20" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M13.5 4.5L21 12m0 0l-7.5 7.5M21 12H3"
              stroke="currentColor"
              strokeWidth="2.2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </IconWrapper>
      </Circle>

      {/* Label Container — properly spaced right of rest position, fades on slide */}
      <LabelContainer
        style={{
          opacity: Math.max(0, 1 - progress * 1.5),
          transform: `translate3d(${progress * 12}px, 0, 0)`,
        }}
      >
        <ShimmerText>{label}</ShimmerText>
      </LabelContainer>
    </Pill>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Pill = styled.div<{ $isDragging: boolean }>`
  position: relative;
  display: inline-flex;
  align-items: center;
  overflow: hidden;
  padding: ${PAD}px;
  min-width: 280px;
  height: calc(${CIRCLE_D + PAD * 2}px + 2px);
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: 999px;
  cursor: ${({ $isDragging }) => ($isDragging ? 'grabbing' : 'grab')};
  flex-shrink: 0;
  user-select: none;
  touch-action: pan-y;
  box-shadow: inset 0 1px 2px rgba(0, 0, 0, 0.03);
  transition: box-shadow 0.25s ease;

  ${mq.mobile} {
    min-width: 250px;
    height: calc(${CIRCLE_M + PAD * 2}px + 2px);
  }
`

const FillTrack = styled.div<{ $isDragging: boolean }>`
  position: absolute;
  left: ${PAD}px;
  top: 50%;
  transform: translateY(-50%);
  height: calc(100% - ${PAD * 2}px);
  max-width: calc(100% - ${PAD * 2}px);
  background: ${({ theme }) => theme.colors.surface.highlight};
  border-radius: 999px;
  z-index: 1;
  pointer-events: none;
  transition: ${({ $isDragging }) => ($isDragging ? 'none' : 'width 0.5s cubic-bezier(0.34, 1.56, 0.64, 1)')};
`

const Circle = styled.div<{ $isDragging: boolean }>`
  position: absolute;
  left: ${PAD}px;
  top: 50%;
  width: ${CIRCLE_D}px;
  height: ${CIRCLE_D}px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid rgba(0, 0, 0, 0.08);
  border-radius: 50%;
  color: ${({ theme }) => theme.colors.text.highlight};
  z-index: 2;
  box-shadow: ${({ $isDragging }) =>
    $isDragging
      ? '0 2px 6px rgba(0, 0, 0, 0.08), 0 1px 2px rgba(0, 0, 0, 0.04)'
      : '0 1px 3px rgba(0, 0, 0, 0.06), 0 1px 2px rgba(0, 0, 0, 0.03)'};
  transition: ${({ $isDragging }) =>
    $isDragging
      ? 'none'
      : 'transform 0.5s cubic-bezier(0.34, 1.56, 0.64, 1), box-shadow 0.25s ease'};

  ${mq.mobile} {
    width: ${CIRCLE_M}px;
    height: ${CIRCLE_M}px;
  }
`

const IconWrapper = styled.div<{ $isDragging: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  transform: translateX(${({ $isDragging }) => ($isDragging ? '1px' : '0')});
  transition: transform 0.25s cubic-bezier(0.34, 1.56, 0.64, 1);
`

const LabelContainer = styled.div`
  position: relative;
  z-index: 1;
  pointer-events: none;
  display: flex;
  align-items: center;
  justify-content: center;
  flex: 1;
  margin-left: ${CIRCLE_D + PAD}px;
  padding-right: ${PAD + 8}px;
  transition: opacity 0.3s ease, transform 0.3s ease;

  ${mq.mobile} {
    margin-left: ${CIRCLE_M + PAD}px;
    padding-right: ${PAD + 4}px;
  }
`

const shimmer = keyframes`
  0% {
    background-position: -200% 0;
  }
  100% {
    background-position: 200% 0;
  }
`

const ShimmerText = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  white-space: nowrap;

  background: linear-gradient(
    110deg,
    ${({ theme }) => theme.colors.text.tertiary} 0%,
    ${({ theme }) => theme.colors.text.tertiary} 35%,
    ${({ theme }) => theme.colors.text.highlight} 50%,
    ${({ theme }) => theme.colors.text.tertiary} 65%,
    ${({ theme }) => theme.colors.text.tertiary} 100%
  );
  background-size: 200% 100%;
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  animation: ${shimmer} 3.5s infinite linear;

  ${mq.mobile} {
    font-size: 14px;
  }
`

export default ModeTogglePill

