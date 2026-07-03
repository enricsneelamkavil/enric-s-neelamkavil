'use client'

import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'professional' | 'personal'

interface Props {
  mode: Mode
  onModeChange: (mode: Mode) => void
}

// ─── Animation ────────────────────────────────────────────────────────────────

const jiggle = keyframes`
  0%   { transform: translateX(0); }
  20%  { transform: translateX(-5px); }
  40%  { transform: translateX(0); }
  60%  { transform: translateX(-3px); }
  80%  { transform: translateX(0); }
  100% { transform: translateX(0); }
`

// ─── Component ────────────────────────────────────────────────────────────────

const ModeTogglePill = ({ mode, onModeChange }: Props) => {
  const label =
    mode === 'professional' ? 'Switch to Personal Mode' : 'Switch to Professional Mode'

  return (
    <Pill
      type="button"
      onClick={() => onModeChange(mode === 'professional' ? 'personal' : 'professional')}
      aria-label={label}
    >
      <IconCircle>
        <ArrowWrap>
          {/* Left-pointing arrow from Figma node 488:1532 */}
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" aria-hidden="true">
            <path
              d="M20.9048 11.3291C21.0855 11.5055 21.1875 11.7474 21.1875 12C21.1875 12.2526 21.0855 12.4945 20.9048 12.6709L13.8757 19.5168C13.5047 19.8782 12.9111 19.8706 12.5493 19.5C12.1885 19.1295 12.1963 18.5366 12.5668 18.1757L17.9443 12.9375H4.6875C4.16973 12.9375 3.75 12.5178 3.75 12C3.75 11.4822 4.16973 11.0625 4.6875 11.0625H17.9443L12.5668 5.82432C12.1963 5.46343 12.1885 4.87054 12.5493 4.5C12.9111 4.12936 13.5047 4.12183 13.8757 4.48318L20.9048 11.3291Z"
              fill="currentColor"
            />
          </svg>
        </ArrowWrap>
      </IconCircle>
      <Label>{label}</Label>
    </Pill>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const ArrowWrap = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  line-height: 0;
  color: ${({ theme }) => theme.colors.text.highlight};
`

const Pill = styled.button`
  display: inline-flex;
  align-items: center;
  gap: 16px;
  padding: 12px 16px 12px 12px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  cursor: pointer;
  flex-shrink: 0;

  &:hover ${ArrowWrap} {
    animation: ${jiggle} 0.5s ease;
  }

  ${mq.mobile} {
    padding: 8px 16px 8px 8px;
  }
`

const IconCircle = styled.div`
  width: 40px;
  height: 40px;
  flex-shrink: 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.full};
`

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  white-space: nowrap;

  ${mq.mobile} {
    font-weight: ${({ theme }) => theme.fontWeights.light};
  }
`

export default ModeTogglePill
