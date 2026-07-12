'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'
import AgentMessage, { type AgentResponse } from '@/app/ask/AgentMessage'
import ThinkingIndicator from '@/app/ask/ThinkingIndicator'

// ─── Types ──────────────────────────────────────────────────────────────────

type Stage = 'closed' | 'input' | 'chat'
type ChatSize = 'active' | 'expanded'

interface UIMessage {
  role: 'user' | 'agent'
  content: AgentResponse
}

// ─── Data ───────────────────────────────────────────────────────────────────
// Figma's quick-prompt cards are nav-style (title + description), not
// conversational questions — copied verbatim from the "Agent" section.

const QUICK_PROMPTS = [
  { title: 'My Work', description: 'Projects & Experiments' },
  { title: 'Experience', description: 'Career Journey' },
  { title: 'Skills', description: 'Expertise & Tools' },
  { title: 'About Me', description: 'Background & Interests' },
  { title: 'Contact Me', description: 'Get in Touch' },
  { title: 'Resume', description: 'Download PDF' },
]

// Figma layout constants (pixel-exact, from the "Agent" section frames)
const CLOSED_WIDTH = '170px' // approx. natural width of the "Ask Enric" pill
const INPUT_BAR_WIDTH = 'min(720px, calc(100vw - 48px))'
const CARD_ACTIVE_WIDTH = 'min(1064px, calc(100vw - 48px))'
const CARD_ACTIVE_HEIGHT = 'min(696px, 75vh)'
const CARD_EXPANDED_WIDTH = 'min(1256px, calc(100vw - 48px))'
const CARD_EXPANDED_HEIGHT = 'min(888px, 85vh)'
const TRIGGER_BOTTOM = 32
const INPUT_BAR_HEIGHT = 48
const CARD_GAP = 24
const CARD_BOTTOM = `${TRIGGER_BOTTOM + INPUT_BAR_HEIGHT + CARD_GAP}px` // 104px
const WIDTH_TRANSITION_MS = 400
const CHAT_REVEAL_DELAY_MS = 75 // chat card appears a beat after thinking starts

// Figma's brand gradient (pink → red → yellow) — same 3 stops as the shared
// PageHeader agent icon gradient, reused here for the animated border.
const GRADIENT_STOPS = '#EC6AA8, #E8342A, #FFCC00, #EC6AA8'

// ─── Component ────────────────────────────────────────────────────────────────

const PersonalAgent = () => {
  const pathname = usePathname()
  const [stage, setStage] = useState<Stage>('closed')
  const [chatSize, setChatSize] = useState<ChatSize>('active')
  const [messages, setMessages] = useState<UIMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)
  // Scroll position captured the moment the bare input bar opens — used to
  // detect the user scrolling the page away from it (see effect below).
  const openScrollY = useRef(0)
  // Tracks the previous stage so auto-focus only waits out the width
  // transition when actually leaving 'closed' — input↔chat has no width
  // change on the bar, so it can focus immediately.
  const prevStageRef = useRef<Stage>('closed')
  // Message indices whose typewriter animation has already finished once —
  // survives ChatCard unmounting (minimize→reopen) since it lives up here,
  // not inside AgentMessage's own local state. Plain state (not a ref) since
  // it's read during render.
  const [typedIndices, setTypedIndices] = useState<Set<number>>(new Set())

  // Fully closing (not minimizing) starts the next session fresh — chat↔input
  // (minimize/expand) is the only transition that preserves the conversation.
  const resetConversation = () => {
    setMessages([])
    setInput('')
    setIsLoading(false)
    setTypedIndices(new Set())
  }

  // ⌘K / Ctrl+K → open the input bar first (matching a fresh trigger click);
  // jumps straight to the chat card if a conversation is already in progress.
  // ESC steps back one level at a time: expanded → active → input → closed.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setStage(s => (s === 'closed' ? (messages.length > 0 ? 'chat' : 'input') : s))
        return
      }
      if (e.key === 'Escape') {
        setStage(s => {
          if (s === 'chat') {
            if (chatSize === 'expanded') {
              setChatSize('active')
              return s
            }
            return 'input'
          }
          if (s === 'input') {
            resetConversation()
            return 'closed'
          }
          return s
        })
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [chatSize, messages.length])

  // Mobile Navbar trigger button dispatches this to open the agent
  useEffect(() => {
    const onOpenRequest = () => setStage(messages.length > 0 ? 'chat' : 'input')
    window.addEventListener('open-personal-agent', onOpenRequest)
    return () => window.removeEventListener('open-personal-agent', onOpenRequest)
  }, [messages.length])

  // Auto-focus the input once it's showing — wait out the pill→bar width
  // transition first so focus doesn't land mid-morph; input↔chat has no
  // width change on the bar itself, so those focus immediately.
  useEffect(() => {
    const wasClosed = prevStageRef.current === 'closed'
    prevStageRef.current = stage
    if (stage === 'closed') return
    if (wasClosed) {
      const id = setTimeout(() => inputRef.current?.focus(), WIDTH_TRANSITION_MS)
      return () => clearTimeout(id)
    }
    inputRef.current?.focus()
  }, [stage])

  // Scrolling the page away while just the bare bar is open (no chat, no
  // conversation to protect) reads as "never mind" — close back to the pill.
  // Once the chat card is open, scrolling is just the user reading the page;
  // only the explicit minimize/close controls should collapse it then.
  useEffect(() => {
    if (stage !== 'input') return
    openScrollY.current = window.scrollY

    const onScroll = () => {
      if (Math.abs(window.scrollY - openScrollY.current) > 50) {
        resetConversation()
        setStage('closed')
      }
    }
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [stage])

  // Lock background scroll only for the full chat card — the bare input bar
  // must leave the page scrollable, otherwise the scroll-to-close listener
  // above could never detect a scroll in the first place.
  useEffect(() => {
    if (stage !== 'chat') return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [stage])

  // Keep the conversation scrolled to the latest message
  useEffect(() => {
    conversationRef.current?.scrollTo({ top: conversationRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, isLoading])

  const sendMessage = async (raw: string) => {
    const query = raw.trim()
    if (!query || isLoading) return
    setInput('')

    const userMsg: UIMessage = { role: 'user', content: { text: query } }
    const history = [...messages, userMsg]
    const historyForApi = history.map(m => ({
      role: m.role === 'user' ? ('user' as const) : ('assistant' as const),
      content: m.content.text ?? '',
    }))

    setMessages(history)
    setIsLoading(true)
    // Input bar shows first; the chat card slides up from it a beat after
    // thinking has already started, not simultaneously with the send.
    setTimeout(() => setStage('chat'), CHAT_REVEAL_DELAY_MS)

    try {
      const res = await fetch('/api/agent', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ messages: historyForApi }),
      })
      if (!res.ok) throw new Error('Request failed')

      const data = await res.json()
      const agentContent: AgentResponse = data.content
      setMessages(prev => [...prev, { role: 'agent', content: agentContent }])
    } catch (err) {
      console.error('[agent] request failed:', err)
      setMessages(prev => [
        ...prev,
        { role: 'agent', content: { text: 'Sorry, something went wrong on my end. Try again in a moment.' } },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  // /ask is its own dedicated full-page chat experience — a second inline
  // trigger/overlay on top of it would just collide with its input bar.
  if (pathname === '/ask') return null

  const isClosed = stage === 'closed'

  return (
    <>
      {stage === 'chat' && (
        <ChatCard role="dialog" aria-modal="true" aria-label="Chat with Enric" $size={chatSize}>
          <Header>
            <HeaderIcon aria-hidden="true" />
            <HeaderTitleBlock>
              <HeaderTitle>Chat with Enric</HeaderTitle>
              <HeaderStatus>
                {chatSize === 'active' && <HeaderStatusIcon aria-hidden="true" />}
                {chatSize === 'active' ? 'Best expanded' : "You're in the expanded experience"}
              </HeaderStatus>
            </HeaderTitleBlock>
            <HeaderButtons>
              {chatSize === 'active' ? (
                <HeaderIconButton type="button" onClick={() => setChatSize('expanded')} aria-label="Expand">
                  <ExpandIcon aria-hidden="true" />
                </HeaderIconButton>
              ) : (
                <HeaderIconButton type="button" onClick={() => setChatSize('active')} aria-label="Shrink">
                  <ShrinkIcon aria-hidden="true" />
                </HeaderIconButton>
              )}
              <HeaderIconButton type="button" onClick={() => setStage('input')} aria-label="Minimize">
                <MinusIcon aria-hidden="true" />
              </HeaderIconButton>
            </HeaderButtons>
          </Header>

          <Divider />

          <ConversationArea ref={conversationRef} role="log" aria-live="polite">
            {messages.map((m, i) => (
              <MessageEntrance key={i}>
                <AgentMessage
                  role={m.role}
                  content={m.content}
                  instant={typedIndices.has(i)}
                  onTypingComplete={() => setTypedIndices(prev => (prev.has(i) ? prev : new Set(prev).add(i)))}
                />
              </MessageEntrance>
            ))}
            <ThinkingIndicator visible={isLoading} />
          </ConversationArea>

          {!isLoading && (
            <>
              <Divider />
              <QuickPromptsRow>
                {QUICK_PROMPTS.map(prompt => (
                  <PromptCard key={prompt.title} type="button" onClick={() => sendMessage(prompt.title)}>
                    <PromptTitle>{prompt.title}</PromptTitle>
                    <PromptDescription>{prompt.description}</PromptDescription>
                  </PromptCard>
                ))}
              </QuickPromptsRow>
            </>
          )}
        </ChatCard>
      )}

      {/* Single persistent element for both the closed pill and the open
          input bar — only its width/content morph, so the transition is a
          true seamless expand instead of one component swapping for another. */}
      <Shell
        role={isClosed ? 'button' : undefined}
        tabIndex={isClosed ? 0 : undefined}
        onClick={isClosed ? () => setStage(messages.length > 0 ? 'chat' : 'input') : undefined}
        onKeyDown={
          isClosed
            ? e => {
                if (e.key === 'Enter' || e.key === ' ') {
                  e.preventDefault()
                  setStage(messages.length > 0 ? 'chat' : 'input')
                }
              }
            : undefined
        }
        aria-label="Ask Enric"
        $open={!isClosed}
      >
        <ShellInner $open={!isClosed}>
          {isClosed ? (
            <TriggerContent>
              <TriggerIcon aria-hidden="true" />
              <TriggerLabel>Ask Enric</TriggerLabel>
            </TriggerContent>
          ) : (
            <InputContent>
              <ChatInputRow>
                <CursorGlyph aria-hidden="true">›_</CursorGlyph>
                <PlaceholderInput
                  ref={inputRef}
                  value={input}
                  onChange={e => setInput(e.target.value)}
                  onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
                  placeholder="Ask Enric…"
                  aria-label="Ask Enric"
                />
              </ChatInputRow>
              <SendButtonContainer>
                <CmdKHint aria-hidden="true">⌘ K</CmdKHint>
                <SendButton
                  type="button"
                  onClick={() => sendMessage(input)}
                  disabled={!input.trim() || isLoading}
                  aria-label="Send"
                >
                  <SendIcon aria-hidden="true" />
                </SendButton>
              </SendButtonContainer>
            </InputContent>
          )}
        </ShellInner>
      </Shell>
    </>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// ── Animated gradient border (Figma annotation: "colors run around the
// border slowly giving the agent a lively feeling") — a rotating oversized
// conic-gradient clipped to the pill shape, with solid content on top. ──────

const hueFlow = keyframes`
  from { filter: hue-rotate(0deg); }
  to   { filter: hue-rotate(360deg); }
`

const fadeIn = keyframes`
  from { opacity: 0; }
  to   { opacity: 1; }
`

// ── Shell — single persistent element for closed/input/chat ──────────────
// Only width/content morph here; the pill never unmounts into a separate
// input-bar component, so the width transition is a true seamless expand.

const Shell = styled.div<{ $open: boolean }>`
  position: fixed;
  bottom: ${TRIGGER_BOTTOM}px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: block;
  padding: 2px;
  width: ${({ $open }) => ($open ? INPUT_BAR_WIDTH : CLOSED_WIDTH)};
  border-radius: ${({ theme }) => theme.radii.lg};
  background: conic-gradient(${GRADIENT_STOPS});
  animation: ${hueFlow} 3s linear infinite;
  cursor: ${({ $open }) => ($open ? 'default' : 'pointer')};
  transition: width ${WIDTH_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.4s ease;

  ${mq.mobile} {
    width: ${({ $open }) => ($open ? 'calc(100vw - 48px)' : CLOSED_WIDTH)};
  }
`

const ShellInner = styled.div<{ $open: boolean }>`
  display: flex;
  align-items: center;
  width: 100%;
  overflow: hidden;
  padding: ${({ $open }) => ($open ? '8px 8px 8px 12px' : '12px 24px')};
  background-color: ${({ theme, $open }) => ($open ? theme.colors.surface.primary : theme.colors.surface.inverse)};
  border-radius: 10px;
  transition: background-color 0.3s ease, padding 0.3s ease;
`

const TriggerContent = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  width: 100%;
  white-space: nowrap;
`

const TriggerIcon = styled.span`
  display: block;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  background-color: ${({ theme }) => theme.colors.text.inverse};
  -webkit-mask: url(/icons/agent.svg) no-repeat center / contain;
  mask: url(/icons/agent.svg) no-repeat center / contain;
`

const TriggerLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.inverse};
  white-space: nowrap;
`

// Fades in only after the width transition finishes, per the animation-delay.
const InputContent = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  width: 100%;
  opacity: 0;
  animation: ${fadeIn} 0.2s ease ${WIDTH_TRANSITION_MS}ms both;
`

const ChatInputRow = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex: 1 0 0;
  min-width: 0;
`

const CursorGlyph = styled.span`
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  user-select: none;
`

const PlaceholderInput = styled.input`
  flex: 1 0 0;
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

const SendButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`

const CmdKHint = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;

  ${mq.mobile} {
    display: none;
  }
`

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  padding: 8px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  /* text.highlight (#E8342A) at 10% opacity — matches Figma exactly */
  background-color: rgba(232, 52, 42, 0.1);
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`

const SendIcon = styled.span`
  display: block;
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(/icons/arrow-right.svg) no-repeat center / contain;
  mask: url(/icons/arrow-right.svg) no-repeat center / contain;
`

// ── Chat card (chat stage) ────────────────────────────────────────────────

const chatCardEnter = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`

const ChatCard = styled.div<{ $size: ChatSize }>`
  position: fixed;
  bottom: ${CARD_BOTTOM};
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  width: ${({ $size }) => ($size === 'expanded' ? CARD_EXPANDED_WIDTH : CARD_ACTIVE_WIDTH)};
  height: ${({ $size }) => ($size === 'expanded' ? CARD_EXPANDED_HEIGHT : CARD_ACTIVE_HEIGHT)};
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;
  box-shadow: 0 8px 48px rgba(0, 0, 0, 0.12);
  animation: ${chatCardEnter} 0.3s ease both;
  transition: width 0.3s ease, height 0.3s ease;

  ${mq.mobile} {
    width: calc(100vw - 48px);
  }
`

const Header = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
  padding: 24px 24px 16px;
`

const HeaderIcon = styled.span`
  display: block;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(/icons/agent.svg) no-repeat center / contain;
  mask: url(/icons/agent.svg) no-repeat center / contain;
`

const HeaderTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  flex: 1 0 0;
  min-width: 0;
`

const HeaderTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.primary};
`

const HeaderStatus = styled.span`
  display: flex;
  align-items: center;
  gap: 4px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

const HeaderStatusIcon = styled.span`
  display: block;
  flex-shrink: 0;
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.text.tertiary};
  -webkit-mask: url(/icons/expand.svg) no-repeat center / contain;
  mask: url(/icons/expand.svg) no-repeat center / contain;
`

const HeaderButtons = styled.div`
  display: flex;
  align-items: center;
  gap: 12px;
  flex-shrink: 0;
`

const HeaderIconButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 32px;
  height: 32px;
  padding: 8px;
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.md};
  cursor: pointer;
`

const iconButtonMask = (icon: string) => `
  display: block;
  width: 16px;
  height: 16px;
  background-color: currentColor;
  -webkit-mask: url(${icon}) no-repeat center / contain;
  mask: url(${icon}) no-repeat center / contain;
`

const ExpandIcon = styled.span`
  ${iconButtonMask('/icons/expand.svg')}
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ShrinkIcon = styled.span`
  ${iconButtonMask('/icons/shrink.svg')}
  color: ${({ theme }) => theme.colors.text.secondary};
`

const MinusIcon = styled.span`
  ${iconButtonMask('/icons/minus.svg')}
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Divider = styled.div`
  flex-shrink: 0;
  height: 1px;
  background-color: ${({ theme }) => theme.colors.border.tertiary};
`

// ── Conversation ──────────────────────────────────────────────────────────

const ConversationArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding: 20px 24px;
`

const messageEnter = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const MessageEntrance = styled.div`
  animation: ${messageEnter} 0.35s ease both;
`

// ── Quick prompts ─────────────────────────────────────────────────────────

const QuickPromptsRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: 16px;
  flex-shrink: 0;
  overflow-x: auto;
  padding: 16px 24px;

  &::-webkit-scrollbar {
    display: none;
  }
`

const PromptCard = styled.button`
  display: flex;
  flex-direction: column;
  gap: 2px;
  flex-shrink: 0;
  width: 160px;
  padding: 12px 16px;
  background: transparent;
  backdrop-filter: blur(6px);
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-align: left;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface.tertiary};
  }
`

const PromptTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.primary};
`

const PromptDescription = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

export default PersonalAgent
