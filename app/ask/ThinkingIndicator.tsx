'use client'

import { useEffect, useRef, useState } from 'react'
import styled, { keyframes } from 'styled-components'

interface Props {
  visible: boolean
}

const PHRASES = [
  'let me think about that...',
  'give me a sec...',
  'good question...',
  'hmm...',
]

const ThinkingIndicator = ({ visible }: Props) => {
  const [phrase, setPhrase] = useState(PHRASES[0])
  const wasVisible = useRef(false)

  useEffect(() => {
    if (visible && !wasVisible.current) {
      setPhrase(PHRASES[Math.floor(Math.random() * PHRASES.length)])
    }
    wasVisible.current = visible
  }, [visible])

  return (
    <Row $visible={visible} aria-hidden={!visible}>
      <ShimmerInner>
        <IconSpan aria-hidden="true" />
        <Label>{phrase}</Label>
        <Dots>
          <Dot $delay={0} />
          <Dot $delay={0.15} />
          <Dot $delay={0.3} />
        </Dots>
      </ShimmerInner>
    </Row>
  )
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const Row = styled.div<{ $visible: boolean }>`
  max-width: 800px;
  margin: 0 auto;
  padding: 0 24px;
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  transform: translateY(${({ $visible }) => ($visible ? '0' : '12px')});
  transition: opacity 0.25s ease, transform 0.25s ease;
  pointer-events: none;
`

const shimmer = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`

const ShimmerInner = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  animation: ${shimmer} 1.6s ease-in-out infinite;
`

const IconSpan = styled.span`
  display: block;
  flex-shrink: 0;
  width: 24px;
  height: 24px;
  background-color: ${({ theme }) => theme.colors.text.secondary};
  -webkit-mask: url(/icons/agent.svg) no-repeat center / contain;
  mask: url(/icons/agent.svg) no-repeat center / contain;
`

const Label = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-style: italic;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

const dotPulse = keyframes`
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
`

const Dots = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
`

const Dot = styled.span<{ $delay: number }>`
  width: 6px;
  height: 6px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.text.highlight};
  animation: ${dotPulse} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
`

export default ThinkingIndicator
