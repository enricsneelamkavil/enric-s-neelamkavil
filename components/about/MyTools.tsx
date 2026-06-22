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
  { name: 'Figma', src: 'app-icons/figma.webp', variant: 'rounded-overflow', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'Photoshop', src: 'app-icons/photoshop.svg', variant: 'flat', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'Sketch', src: 'app-icons/sketch.webp', variant: 'rounded-overflow', shadow: '0px 0px 12px rgba(0,0,0,0.15)' },
  { name: 'Illustrator', src: 'app-icons/illustrator.svg', variant: 'flat', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'Lovable', src: 'app-icons/lovable.webp', variant: 'rounded-fit', shadow: '0px 0px 12px rgba(0,0,0,0.15)' },
  { name: 'XD', src: 'app-icons/xd.svg', variant: 'flat', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'Gemini', src: 'app-icons/gemini.webp', variant: 'rounded-fit', shadow: '0px 0px 12px rgba(0,0,0,0.15)' },
  { name: 'ChatGPT', src: 'app-icons/chatgpt.webp', variant: 'rounded-fit', shadow: '0px 0px 12px rgba(0,0,0,0.15)' },
  { name: 'Claude', src: 'app-icons/claude.webp', variant: 'rounded-fit', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'CorelDraw', src: 'app-icons/coreldraw.webp', variant: 'flat' },
  { name: 'After Effects', src: 'app-icons/after-effects.svg', variant: 'flat', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
  { name: 'Premiere Pro', src: 'app-icons/premiere-pro.svg', variant: 'flat', shadow: '0px 0px 12px rgba(0,0,0,0.25)' },
]

const RISE = 16
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

      <MobileGrid>
        {TOOLS.map((tool) => (
          <MobileCell key={tool.name} title={tool.name}>
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
          </MobileCell>
        ))}
      </MobileGrid>

    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`

// ── Desktop dock ──────────────────────────────────────────────────────────────

const DockContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 16px;
  padding: 16px 24px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: 24px;

  ${mq.tablet} {
    flex-wrap: wrap;
    justify-content: center;
    align-items: flex-start;
    align-content: flex-start;
    gap: 12px;
    padding: 16px 20px;
    margin: 0 auto;
  }

  ${mq.mobile} {
    display: none;
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
`

const FlatImg = styled.img`
  display: block;
  width: 100%;
  height: 100%;
`

const RoundedBox = styled.div<{ $shadow: string }>`
  width: 100%;
  height: 100%;
  border-radius: 25%;
  box-shadow: ${({ $shadow }) => $shadow};
  overflow: hidden;
  position: relative;
`

const FitImg = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 25%;
  pointer-events: none;
`

const OverflowClip = styled.div`
  position: absolute;
  inset: 0;
  overflow: hidden;
  border-radius: 25%;
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

// ── Mobile grid ───────────────────────────────────────────────────────────────

const MobileGrid = styled.div`
  display: none;

  ${mq.mobile} {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: clamp(8px, 2vw, 16px);
    width: 100%;
    padding: clamp(12px, 3vw, 24px);
    box-sizing: border-box;
    background: ${({ theme }) => theme.colors.surface.tertiary};
    border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
    border-radius: 16px;
  }
`

const MobileCell = styled.div`
  ${mq.mobile} {
    width: clamp(36px, 11vw, 64px);
    height: clamp(36px, 11vw, 64px);
    flex-shrink: 0;
    position: relative;
  }
`

export default MyTools
