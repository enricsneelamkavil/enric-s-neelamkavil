'use client'

import { useState } from 'react'
import styled from 'styled-components'

// ─── Types ────────────────────────────────────────────────────────────────────

export type ToggleSelection = 'left' | 'right'

interface Props {
  selection: ToggleSelection
  onToggle: (side: ToggleSelection) => void
}

// ─── SVGs ─────────────────────────────────────────────────────────────────────

interface ArrowSvgProps { $side: ToggleSelection }

const ArrowSvg = styled.svg.attrs({
  viewBox: '0 0 17.4375 16.3418',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
})<ArrowSvgProps>`
  display: block;
  width: 100%;
  height: 100%;
  overflow: visible;
  transform-origin: center;
  transform: ${({ $side }) => $side === 'left' ? 'rotate(180deg)' : 'rotate(0deg)'};
  transition: transform 0.3s ease-in-out;
  color: ${({ theme }) => theme.colors.text.highlight};
`

interface RingSvgProps { $visible: boolean }

const RingSvg = styled.svg.attrs({
  viewBox: '0 0 40 40',
  fill: 'none',
  xmlns: 'http://www.w3.org/2000/svg',
  'aria-hidden': 'true',
})<RingSvgProps>`
  display: block;
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  color: ${({ theme }) => theme.colors.text.highlight};
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: ${({ $visible }) => ($visible ? 'scale(1)' : 'scale(0.8)')};
  transition: all 0.3s ease-in-out;
`

// ─── Sub-components ───────────────────────────────────────────────────────────

const IconBox = styled.div`
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const ArrowIcon = ({ side }: { side: ToggleSelection }) => (
  <IconBox>
    <ArrowSvg $side={side}>
      <path
        d="M17.1548 7.5C17.3355 7.67641 17.4375 7.91829 17.4375 8.1709C17.4375 8.4235 17.3355 8.66538 17.1548 8.8418L9.4541 16.3418L8.79932 15.6709L8.146 15L14.1943 9.1084H0V7.2334H14.1943L8.146 1.3418L8.79932 0.670898L9.4541 0L17.1548 7.5Z"
        fill="currentColor"
      />
    </ArrowSvg>
  </IconBox>
)

const NotSelectedRing = ({ visible }: { visible: boolean }) => (
  <RingSvg $visible={visible}>
    <circle cx="20" cy="20" r="10" stroke="currentColor" strokeWidth="4" opacity="0.3" />
  </RingSvg>
)

// ─── Component ────────────────────────────────────────────────────────────────

const ModeToggle = ({ selection, onToggle }: Props) => {
  const [isHovered, setIsHovered] = useState(false)

  // On hover the knob previews the opposite side; on leave it returns.
  const previewSide: ToggleSelection = isHovered
    ? (selection === 'left' ? 'right' : 'left')
    : selection

  const handleClick = () => {
    // Clear hover so the knob settles at its new resting position after click.
    setIsHovered(false)
    onToggle(selection === 'left' ? 'right' : 'left')
  }

  return (
    <Pill
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={handleClick}
      role="button"
      tabIndex={0}
      aria-label="Toggle mode"
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          e.preventDefault()
          handleClick()
        }
      }}
    >
      <Knob $side={previewSide}>
        <ArrowIcon side={previewSide} />
      </Knob>

      <Slot>
        <NotSelectedRing visible={previewSide !== 'left'} />
      </Slot>
      <Slot>
        <NotSelectedRing visible={previewSide !== 'right'} />
      </Slot>
    </Pill>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Pill = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: 4px;
  padding: 6px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border-radius: ${({ theme }) => theme.radii.full};
  flex-shrink: 0;
  cursor: pointer;
  user-select: none;
`

interface KnobProps { $side: ToggleSelection }

const Knob = styled.div<KnobProps>`
  position: absolute;
  top: 6px;
  left: 6px;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  transform: ${({ $side }) => $side === 'left' ? 'translateX(0)' : 'translateX(44px)'};
  transition: transform 0.3s ease-in-out;
  pointer-events: none;
  z-index: 1;
`

const Slot = styled.div`
  position: relative;
  z-index: 0;
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

export default ModeToggle
