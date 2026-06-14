'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Send arrow icon (inline SVG — no expiring asset URL) ─────────────────────

const SendIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <path
      d="M3 8H13M13 8L9 4M13 8L9 12"
      stroke="currentColor"
      strokeWidth="1.5"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

const PersonalAgent = () => {
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')
  const [scrollVisible, setScrollVisible] = useState(pathname !== '/')
  const [footerVisible, setFooterVisible] = useState(false)

  // Homepage: hide while Landing section is in view, reveal once scrolled past 100vh
  useEffect(() => {
    if (pathname !== '/') {
      setScrollVisible(true)
      return
    }

    const handleScroll = () => {
      // 20% of viewport height — appears much sooner as soon as user starts scrolling past the top
      setScrollVisible(window.scrollY > window.innerHeight * 0.2)
    }

    // Check immediately on mount
    handleScroll()

    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [pathname])

  // All pages: hide when the footer enters the viewport
  useEffect(() => {
    const footer = document.querySelector('footer')
    if (!footer) return
    const observer = new IntersectionObserver(
      ([entry]) => setFooterVisible(entry.isIntersecting),
      { threshold: 0 }
    )
    observer.observe(footer)
    return () => observer.disconnect()
  }, [])

  // ⌘K / Ctrl+K → focus the input
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleSubmit = () => {
    const query = message.trim()
    if (!query) return
    setMessage('')
    // TODO: wire to /api/agent (Anthropic SDK)
  }

  const isVisible = scrollVisible && !footerVisible

  return (
    <Wrapper $visible={isVisible} role="search" aria-label="Ask Enric">
      <BarContainer>
        <Bar>
          <InputArea>
            <Cursor aria-hidden="true">›_</Cursor>
            <ChatInput
              ref={inputRef}
              value={message}
              onChange={e => setMessage(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && handleSubmit()}
              placeholder="ask Enric…"
              aria-label="Ask Enric a question"
            />
          </InputArea>

          <Controls>
            <ShortcutHint aria-hidden="true">⌘ K</ShortcutHint>
            <SendButton
              type="button"
              onClick={handleSubmit}
              aria-label="Send"
              disabled={!message.trim()}
            >
              <SendIcon />
            </SendButton>
          </Controls>
        </Bar>
      </BarContainer>
    </Wrapper>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div<{ $visible: boolean }>`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing[6]};
  left: 50%;
  transform: translateX(-50%);
  z-index: 100;
  padding: 6px;
  border-radius: ${({ theme }) => theme.radii.xl};
  background-color: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(24px);
  -webkit-backdrop-filter: blur(24px);
  border: 1px solid rgba(255, 255, 255, 0.2);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.25s ease;

  ${mq.mobile} {
    display: none;
  }
`

const spin = keyframes`
  from { transform: rotate(0deg); }
  to { transform: rotate(360deg); }
`

const BarContainer = styled.div`
  position: relative;
  /* Reduced width from 52.5rem to 44rem as requested */
  width: min(44rem, calc(100vw - ${({ theme }) => theme.spacing[6]} * 2));
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 2px; /* Border thickness */
  overflow: hidden;

  &::before {
    content: '';
    position: absolute;
    /* Make the spinning element a massive square centered via margin so it never exposes gaps when rotating */
    top: 50%;
    left: 50%;
    width: 3000px;
    height: 3000px;
    margin: -1500px 0 0 -1500px;
    background: conic-gradient(
      from 0deg,
      #FF4D2E 0%,
      #FFCE74 33%,
      #E80064 66%,
      #FF4D2E 100%
    );
    animation: ${spin} 3s linear infinite;
    z-index: 0;
  }
`

const Bar = styled.div`
  position: relative;
  z-index: 1; /* Above the spinning gradient */
  display: flex;
  align-items: center;
  gap: 0;
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border-radius: calc(${({ theme }) => theme.radii.lg} - 2px); /* Inner radius */
  padding: 10px ${({ theme }) => theme.spacing[4]};
  width: 100%;
`

const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex: 1;
  min-width: 0;
`

const Cursor = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  flex-shrink: 0;
  user-select: none;
`

const ChatInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`

const Controls = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  flex-shrink: 0;
`

const ShortcutHint = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  user-select: none;
`

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 28px;
  height: 28px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.icon.highlight};
  flex-shrink: 0;
  transition: background-color 0.15s ease, color 0.15s ease;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  &:not(:disabled):hover {
    background-color: ${({ theme }) => theme.colors.surface.inverse};
    color: ${({ theme }) => theme.colors.icon.inverse};
  }
`

export default PersonalAgent
