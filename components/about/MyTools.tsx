'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Tool definitions ─────────────────────────────────────────────────────────

type Variant = 'flat' | 'rounded-fit' | 'rounded-overflow'

interface Tool {
  name: string
  src: string
  variant: Variant
  shadow?: string
}

// "rounded-overflow" = image is ~124% of the 64px box, clipped by border-radius
// "rounded-fit"      = image fills box exactly with object-cover
// "flat"             = SVG, no radius, no shadow

const TOOLS: Tool[] = [
  { name: 'Figma', src: '/tools/figma.png', variant: 'rounded-overflow', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'Photoshop', src: '/tools/photoshop.svg', variant: 'flat', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'Sketch', src: '/tools/sketch.png', variant: 'rounded-overflow', shadow: '0px 0px 12px rgba(0,0,0,0.15)' },
  { name: 'Illustrator', src: '/tools/illustrator.svg', variant: 'flat', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'Lovable', src: '/tools/lovable.png', variant: 'rounded-fit', shadow: '0px 0px 12px rgba(0,0,0,0.15)' },
  { name: 'XD', src: '/tools/xd.svg', variant: 'flat', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'Gemini', src: '/tools/gemini.png', variant: 'rounded-fit', shadow: '0px 0px 12px rgba(0,0,0,0.15)' },
  { name: 'ChatGPT', src: '/tools/chatgpt.png', variant: 'rounded-fit', shadow: '0px 0px 12px rgba(0,0,0,0.15)' },
  { name: 'Claude', src: '/tools/claude.png', variant: 'rounded-fit', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'CorelDraw', src: '/tools/coreldraw.png', variant: 'rounded-overflow', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'After Effects', src: '/tools/after-effects.svg', variant: 'flat', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'Premiere Pro', src: '/tools/premiere-pro.svg', variant: 'flat', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
]

const RISE = 24 // px — hovered icon rise
const RISE_NEIGHBOR = RISE / 2

// ─── Component ────────────────────────────────────────────────────────────────

const MyTools = () => {
  const [hovered, setHovered] = useState<number | null>(null)

  const translateY = (i: number): number => {
    if (hovered === null) return 0
    const dist = Math.abs(i - hovered)
    if (dist === 0) return -RISE
    if (dist === 1) return -RISE_NEIGHBOR
    return 0
  }

  return (
    <Section>
      <DockContainer>
        {TOOLS.map((tool, i) => (
          <IconSlot
            key={tool.name}
            $y={translateY(i)}
            onMouseEnter={() => setHovered(i)}
            onMouseLeave={() => setHovered(null)}
            title={tool.name}
          >
            {tool.variant === 'flat' && (
              <FlatImg src={tool.src} alt={tool.name} />
            )}

            {tool.variant === 'rounded-fit' && (
              <RoundedBox $shadow={tool.shadow!}>
                <FitImg src={tool.src} alt={tool.name} />
              </RoundedBox>
            )}

            {tool.variant === 'rounded-overflow' && (
              <RoundedBox $shadow={tool.shadow!}>
                <OverflowClip>
                  <OverflowImg src={tool.src} alt={tool.name} />
                </OverflowClip>
              </RoundedBox>
            )}
          </IconSlot>
        ))}
      </DockContainer>
    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
  /* extra vertical space so risen icons aren't clipped by sibling sections */
  padding: ${RISE}px 0 0;
`

const DockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: 24px;

  ${mq.tablet} {
    gap: 12px;
    padding: 16px 20px;
  }

  ${mq.mobile} {
    gap: 10px;
    padding: 14px 16px;
    max-width: calc(100vw - 48px);
    overflow-x: auto;
    overflow-y: visible;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
  }
`

interface SlotProps { $y: number }

const IconSlot = styled.div<SlotProps>`
  flex-shrink: 0;
  width: 64px;
  height: 64px;
  transform: translateY(${({ $y }) => $y}px);
  transition: transform 0.3s cubic-bezier(0.34, 1.56, 0.64, 1);
  will-change: transform;
  cursor: default;
  position: relative;

  ${mq.mobile} {
    width: 48px;
    height: 48px;
    transform: none;
    will-change: auto;
  }
`

// ── Flat (SVG, no radius) ─────────────────────────────────────────────────────

const FlatImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`

// ── Rounded container ─────────────────────────────────────────────────────────

const RoundedBox = styled.div<{ $shadow: string }>`
  width: 100%;
  height: 100%;
  border-radius: 16px;
  box-shadow: ${({ $shadow }) => $shadow};
  overflow: hidden;
  position: relative;
`

// ── Rounded-fit (fills box exactly) ──────────────────────────────────────────

const FitImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 16px;
  pointer-events: none;
`

// ── Rounded-overflow (image ~124% of box, clipped) ───────────────────────────

const OverflowClip = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 16px;
  pointer-events: none;
`

const OverflowImg = styled.img`
  position: absolute;
  left: -12%;
  top: -12%;
  width: 124%;
  height: 124%;
  pointer-events: none;
`

export default MyTools
