'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled from 'styled-components'

// px at which the agent reveals on the homepage (clears the landing section)
const LANDING_THRESHOLD = 800

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

  // Homepage: hide during landing section, reveal once user scrolls past it
  useEffect(() => {
    if (pathname !== '/') {
      setScrollVisible(true)
      return
    }
    const check = () => setScrollVisible(window.scrollY > LANDING_THRESHOLD)
    check()
    window.addEventListener('scroll', check, { passive: true })
    return () => window.removeEventListener('scroll', check)
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
  padding: ${({ theme }) => theme.spacing[2]};
  border-radius: ${({ theme }) => theme.radii.xl};
  /* glass halo — surface.primary at 20% opacity; no solid token covers alpha */
  background-color: rgba(255, 255, 255, 0.2);
  opacity: ${({ $visible }) => ($visible ? 1 : 0)};
  pointer-events: ${({ $visible }) => ($visible ? 'auto' : 'none')};
  transition: opacity 0.25s ease;
`

const Bar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border: 2px solid ${({ theme }) => theme.colors.surface.highlight};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  /* 52.5rem = 840px (Figma spec); shrinks on narrow viewports */
  width: min(52.5rem, calc(100vw - ${({ theme }) => theme.spacing[6]} * 2));
`

const InputArea = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
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
  gap: ${({ theme }) => theme.spacing[3]};
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
  width: ${({ theme }) => theme.spacing[8]};
  height: ${({ theme }) => theme.spacing[8]};
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.icon.secondary};
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
