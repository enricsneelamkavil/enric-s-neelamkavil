'use client'

import React, { useRef, useState, useEffect, useCallback } from 'react'
import styled from 'styled-components'

// ─── Map geometry ─────────────────────────────────────────────────────────────

const MAP_W = 2536
const MAP_H = 2474
const CANVAS_W = 1168
const CANVAS_H = 522

// MapImg is placed at this CSS position inside MapLayer (not part of offset)
// so the initial view shows Asia / Middle East
const MAP_X0 = -684    // -(MAP_W - CANVAS_W) / 2
const MAP_Y0 = -1237   // Figma annotation

// Drag offset starts at (0,0). Bounds keep MapImg edges flush with canvas edges:
//   right: MAP_X0 + offset.x = 0          → max =  684
//   left:  MAP_X0 + offset.x + MAP_W = CW → min = -684
//   bottom: MAP_Y0 + oy + MAP_H = CH      → min = -715
//   top:    MAP_Y0 + oy = 0               → max = 1237
const DRAG_X_MIN = -684
const DRAG_X_MAX = 684
const DRAG_Y_MIN = -715
const DRAG_Y_MAX = 1237

// ─── Data ────────────────────────────────────────────────────────────────────

interface PinDef { name: string; l: number; t: number; dotFirst: boolean }

// Canvas-absolute positions from Figma spec (outside MapLayer — fixed on screen)
const PINS: PinDef[] = [
  { name: 'INDIA', l: 491, t: 341, dotFirst: false },
  { name: 'OMAN', l: 344, t: 228, dotFirst: true },
  { name: 'SINGAPORE', l: 775, t: 464, dotFirst: false },
  { name: 'MALAYSIA', l: 848, t: 422, dotFirst: true },
  { name: 'VIETNAM', l: 877, t: 241, dotFirst: true },
  { name: 'QATAR', l: 255, t: 176, dotFirst: true },
]

interface FlagDef { name: string; src: string }
const FLAGS: FlagDef[] = [
  { name: 'Qatar', src: '/about/personal/travel/qatar-flag.svg' },
  { name: 'Singapore', src: '/about/personal/travel/singapore-flag.svg' },
  { name: 'Malaysia', src: '/about/personal/travel/malaysia-flag.svg' },
  { name: 'Vietnam', src: '/about/personal/travel/vietnam-flag.svg' },
  { name: 'Oman', src: '/about/personal/travel/oman-flag.svg' },
]

const STAT_TARGETS = [6, 55, 2]
const STAT_LABELS: string[][] = [
  ['COUNTRIES', 'DISCOVERED'],
  ['FLIGHTS BOARDED'],
  ['WORLD COVERED'],
]

const formatStat = (i: number, v: number) => {
  if (i === 0) return String(v).padStart(2, '0')
  if (i === 2) return `${v}%`
  return String(v)
}

// ─── Component ───────────────────────────────────────────────────────────────

const TravelMapClient = () => {
  const [offset, setOffset] = useState({ x: 0, y: 0 })
  const [dragging, setDragging] = useState(false)
  const [hoveredFlag, setHoveredFlag] = useState<string | null>(null)
  const [counts, setCounts] = useState([0, 0, 0])

  const dragOrigin = useRef({ x: 0, y: 0 })
  const dragStart = useRef({ x: 0, y: 0 })
  const statsRef = useRef<HTMLDivElement>(null)
  const animated = useRef(false)

  // Count-up on scroll into view
  useEffect(() => {
    const el = statsRef.current
    if (!el) return
    const obs = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !animated.current) {
        animated.current = true
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
    }, { threshold: 0.5 })
    obs.observe(el)
    return () => obs.disconnect()
  }, [])

  // ── Drag ─────────────────────────────────────────────────────────────────

  const clamp = (v: number, lo: number, hi: number) => Math.max(lo, Math.min(hi, v))

  const handlePointerDown = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    e.currentTarget.setPointerCapture(e.pointerId)
    setDragging(true)
    dragOrigin.current = { x: e.clientX, y: e.clientY }
    dragStart.current = { ...offset }
  }, [offset])

  const handlePointerMove = useCallback((e: React.PointerEvent<HTMLDivElement>) => {
    if (!dragging) return
    const dx = e.clientX - dragOrigin.current.x
    const dy = e.clientY - dragOrigin.current.y
    setOffset({
      x: clamp(dragStart.current.x + dx, DRAG_X_MIN, DRAG_X_MAX),
      y: clamp(dragStart.current.y + dy, DRAG_Y_MIN, DRAG_Y_MAX),
    })
  }, [dragging])

  const handlePointerUp = useCallback(() => setDragging(false), [])

  return (
    <MapContainer
      $dragging={dragging}
      onPointerDown={handlePointerDown}
      onPointerMove={handlePointerMove}
      onPointerUp={handlePointerUp}
    >
      {/*
        MapLayer fills the canvas and translates by drag offset.
        MapImg sits at its CSS position (MAP_X0, MAP_Y0) inside MapLayer,
        so both map and overlay shift together and overlay always tracks
        the same region on the map SVG.
      */}
      <MapLayer style={{ transform: `translate(${offset.x}px, ${offset.y}px)` }}>
        <MapImg
          src="/about/personal/travel/map.svg"
          alt=""
          aria-hidden="true"
          draggable={false}
        />

        {/* Pins inside MapLayer — translate with the map on drag */}
        {PINS.map(({ name, l, t, dotFirst }) => (
          <PinGroup key={name} $l={l} $t={t}>
            {dotFirst ? (
              <>
                <PinDot src="/about/personal/travel/pin.svg" alt="" aria-hidden="true" draggable={false} />
                <PinTag>{name}</PinTag>
              </>
            ) : (
              <>
                <PinTag>{name}</PinTag>
                <PinDot src="/about/personal/travel/pin.svg" alt="" aria-hidden="true" draggable={false} />
              </>
            )}
          </PinGroup>
        ))}
      </MapLayer>

      {/* Flags strip — fixed in canvas, top-right */}
      <FlagsStrip>
        {FLAGS.map(({ name, src }) => (
          <FlagItem
            key={name}
            $raised={hoveredFlag === name}
            onMouseEnter={() => setHoveredFlag(name)}
            onMouseLeave={() => setHoveredFlag(null)}
          >
            <FlagInner>
              <img src={src} alt={name} draggable={false} />
            </FlagInner>
          </FlagItem>
        ))}
      </FlagsStrip>

      {/* Stats card — fixed in canvas, bottom-left */}
      <StatsCard ref={statsRef}>
        {STAT_TARGETS.map((_, i) => (
          <React.Fragment key={i}>
            {i > 0 && <StatSeparator />}
            <StatBlock>
              <StatNumber>{formatStat(i, counts[i])}</StatNumber>
              <StatLabel>
                {STAT_LABELS[i].map(line => <span key={line}>{line}</span>)}
              </StatLabel>
            </StatBlock>
          </React.Fragment>
        ))}
      </StatsCard>
    </MapContainer>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const MapContainer = styled.div<{ $dragging: boolean }>`
  position: relative;
  width: ${CANVAS_W}px;
  height: ${CANVAS_H}px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  overflow: hidden;
  flex-shrink: 0;
  cursor: ${({ $dragging }) => ($dragging ? 'grabbing' : 'grab')};
  user-select: none;
  touch-action: none;
`

// Fills canvas; translates on drag. MapImg and Overlay are children so they
// shift together, keeping the overlay anchored to the same map region.
const MapLayer = styled.div`
  position: absolute;
  inset: 0;
  will-change: transform;
`

const MapImg = styled.img`
  position: absolute;
  left: ${MAP_X0}px;
  top: ${MAP_Y0}px;
  width: ${MAP_W}px;
  height: ${MAP_H}px;
  pointer-events: none;
  display: block;
`

// ── Pins (inside MapLayer — translate with map on drag) ──────────────────────

interface PinProps { $l: number; $t: number }

const PinGroup = styled.div<PinProps>`
  position: absolute;
  left: ${({ $l }) => $l}px;
  top: ${({ $t }) => $t}px;
  display: flex;
  align-items: center;
  gap: 4px;
  pointer-events: none;
  z-index: 5;
`

const PinDot = styled.img`
  display: block;
  width: 12px;
  height: 12px;
  flex-shrink: 0;
`

const PinTag = styled.div`
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 2px;
  padding-left: 8px;
  padding-right:8px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
`

// ── Flags strip ───────────────────────────────────────────────────────────────

const FlagsStrip = styled.div`
  position: absolute;
  right: 15px;
  top: 15px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  z-index: 10;
`

const FlagItem = styled.div<{ $raised: boolean }>`
  position: relative;
  width: 36px;
  height: 24px;
  flex-shrink: 0;
  cursor: default;
  transform: ${({ $raised }) => ($raised ? 'translateY(-6px)' : 'translateY(0)')};
  transition: transform 0.15s ease;
`

// Slight bleed matching Figma's inset-[-2.5%_-1.67%] on flag images
const FlagInner = styled.div`
  position: absolute;
  inset: -2.5% -1.67%;

  img {
    display: block;
    width: 100%;
    height: 100%;
    pointer-events: none;
    user-select: none;
  }
`


// ── Stats card ────────────────────────────────────────────────────────────────

const StatsCard = styled.div`
  position: absolute;
  left: 15px;
  bottom: 15px;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing[4]};
  z-index: 10;
`

const StatBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100px;
`

const StatNumber = styled.div`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  line-height: 56px;
  color: ${({ theme }) => theme.colors.text.highlight};
`

const StatLabel = styled.div`
  display: flex;
  flex-direction: column;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  text-align: center;
`

const StatSeparator = styled.div`
  width: 1px;
  height: 64px;
  background: ${({ theme }) => theme.colors.border.tertiary};
  flex-shrink: 0;
`

export default TravelMapClient
