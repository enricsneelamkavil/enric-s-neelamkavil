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

// ─── Types ──────────────────────────────────────────────────────────────────

interface ChatMessage {
  role: 'user' | 'assistant'
  content: string
}

// ─── Typing indicator ───────────────────────────────────────────────────────

const TypingDots = () => (
  <DotsWrapper aria-label="Thinking">
    <Dot $delay={0} />
    <Dot $delay={0.15} />
    <Dot $delay={0.3} />
  </DotsWrapper>
)

// ─── Component ────────────────────────────────────────────────────────────────

const PersonalAgent = () => {
  const pathname = usePathname()
  const inputRef = useRef<HTMLInputElement>(null)
  const [message, setMessage] = useState('')
  const [messages, setMessages] = useState<ChatMessage[]>([])
  const [isStreaming, setIsStreaming] = useState(false)
  const [forceVisible, setForceVisible] = useState(false)
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

  // ⌘K / Ctrl+K → reveal the agent bar and focus the input
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setForceVisible(true)
        inputRef.current?.focus()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [])

  const handleSubmit = async () => {
    const query = message.trim()
    if (!query || isStreaming) return
    setMessage('')

    const userMessage: ChatMessage = { role: 'user', content: query }
    const history = [...messages, userMessage]
    setMessages([...history, { role: 'assistant', content: '' }])
    setIsStreaming(true)

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: history }),
      })

      if (!res.ok) throw new Error('Request failed')

      const data = await res.json()
      const content = data.content

      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = { role: 'assistant', content }
        return updated
      })
    } catch (err) {
      console.error('[agent] request failed:', err)
      setMessages(prev => {
        const updated = [...prev]
        updated[updated.length - 1] = {
          role: 'assistant',
          content: "Sorry, something went wrong on my end. Try again in a moment.",
        }
        return updated
      })
    } finally {
      setIsStreaming(false)
    }
  }

  const isVisible = (scrollVisible && !footerVisible) || forceVisible

  return (
    <Wrapper $visible={isVisible} role="search" aria-label="Ask Enric">
      {messages.length > 0 && (
        <ConversationPanel role="log" aria-live="polite">
          {messages.map((m, i) => {
            const isLast = i === messages.length - 1
            const showTyping = m.role === 'assistant' && !m.content && isStreaming && isLast
            return (
              <MessageBubble key={i} $role={m.role}>
                {showTyping ? <TypingDots /> : m.content}
              </MessageBubble>
            )
          })}
        </ConversationPanel>
      )}
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
  display: ${({ $visible }) => ($visible ? 'flex' : 'none')};
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: ${({ theme }) => theme.spacing[8]};
  left: 50%;
  transform: translateX(-50%);
  z-index: 40;

  ${mq.mobile} {
    bottom: ${({ theme }) => theme.spacing[6]};
  }
`

const ConversationPanel = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  width: min(44rem, calc(100vw - ${({ theme }) => theme.spacing[6]} * 2));
  max-height: 22rem;
  overflow-y: auto;
  margin-bottom: ${({ theme }) => theme.spacing[3]};
  padding: ${({ theme }) => theme.spacing[4]};
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
`

const MessageBubble = styled.div<{ $role: 'user' | 'assistant' }>`
  align-self: ${({ $role }) => ($role === 'user' ? 'flex-end' : 'flex-start')};
  max-width: 85%;
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[3]};
  border-radius: ${({ theme }) => theme.radii.lg};
  background-color: ${({ theme, $role }) =>
    $role === 'user' ? theme.colors.surface.inverse : theme.colors.surface.tertiary};
  color: ${({ theme, $role }) =>
    $role === 'user' ? theme.colors.text.inverse : theme.colors.text.primary};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  white-space: pre-wrap;
  word-break: break-word;
`

const dotPulse = keyframes`
  0%, 80%, 100% { opacity: 0.3; transform: scale(0.8); }
  40% { opacity: 1; transform: scale(1); }
`

const DotsWrapper = styled.span`
  display: inline-flex;
  align-items: center;
  gap: 4px;
  padding: 2px 0;
`

const Dot = styled.span<{ $delay: number }>`
  width: 6px;
  height: 6px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.text.tertiary};
  animation: ${dotPulse} 1.2s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay}s;
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
