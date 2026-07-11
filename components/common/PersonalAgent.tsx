'use client'

import { useEffect, useRef, useState } from 'react'
import { usePathname } from 'next/navigation'
import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'
import AgentMessage, { type AgentResponse } from '@/app/ask/AgentMessage'
import ThinkingIndicator from '@/app/ask/ThinkingIndicator'

// ─── Types ──────────────────────────────────────────────────────────────────

type Stage = 'closed' | 'input' | 'chat'

interface UIMessage {
  role: 'user' | 'agent'
  content: AgentResponse
}

// ─── Data ───────────────────────────────────────────────────────────────────

const QUICK_PROMPTS = [
  'Why should I hire you?',
  'What have you built?',
  'Where have you traveled?',
  'Tell me about Plush',
  'Obsessed with credit cards?',
  'How do you work in teams?',
]

const COLLAPSED_BAR_WIDTH = '180px'

// ─── Component ────────────────────────────────────────────────────────────────

const PersonalAgent = () => {
  const pathname = usePathname()
  const [stage, setStage] = useState<Stage>('closed')
  const [barExpanded, setBarExpanded] = useState(false)
  const [messages, setMessages] = useState<UIMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)
  const cardRef = useRef<HTMLDivElement>(null)

  // ⌘K / Ctrl+K → open (jumps straight to chat if a conversation already
  // exists, otherwise the minimal input bar). ESC steps back one stage at a
  // time: chat → input → closed.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        setStage(s => (s === 'closed' ? (messages.length > 0 ? 'chat' : 'input') : s))
        return
      }
      if (e.key === 'Escape') {
        setStage(s => (s === 'chat' ? 'input' : s === 'input' ? 'closed' : s))
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [messages.length])

  // Mobile Navbar trigger button dispatches this to open the agent
  useEffect(() => {
    const onOpenRequest = () => setStage(messages.length > 0 ? 'chat' : 'input')
    window.addEventListener('open-personal-agent', onOpenRequest)
    return () => window.removeEventListener('open-personal-agent', onOpenRequest)
  }, [messages.length])

  // Bar width starts collapsed (matching the trigger's footprint) then flips
  // to its full expanded width one frame later, so the width actually has
  // something to transition from — a freshly mounted node has no prior state
  // for `transition: width` to animate.
  useEffect(() => {
    const id = requestAnimationFrame(() => setBarExpanded(stage !== 'closed'))
    return () => cancelAnimationFrame(id)
  }, [stage])

  // Auto-focus the input whenever the bar/card is showing
  useEffect(() => {
    if (stage !== 'closed') inputRef.current?.focus()
  }, [stage])

  // Lock background scroll while expanded
  useEffect(() => {
    if (stage === 'closed') return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [stage])

  // 'input' stage has no backdrop to catch outside clicks — handle it directly
  useEffect(() => {
    if (stage !== 'input') return
    const onDocClick = (e: MouseEvent) => {
      if (cardRef.current && !cardRef.current.contains(e.target as Node)) {
        setStage('closed')
      }
    }
    document.addEventListener('mousedown', onDocClick)
    return () => document.removeEventListener('mousedown', onDocClick)
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
    setStage('chat')
    setIsLoading(true)

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

  if (stage === 'closed') {
    return (
      <FloatingTrigger
        type="button"
        onClick={() => setStage(messages.length > 0 ? 'chat' : 'input')}
        aria-label="Ask Enric"
      >
        <FloatingIcon src="/icons/agent.svg" alt="" aria-hidden="true" width={20} height={20} />
        <FloatingLabel>Ask Enric</FloatingLabel>
      </FloatingTrigger>
    )
  }

  return (
    <>
      {stage === 'chat' && <Backdrop onClick={() => setStage('closed')} />}

      <Card ref={cardRef} $stage={stage} $wide={barExpanded} role="dialog" aria-modal="true" aria-label="Ask Enric">
        {stage === 'chat' && (
          <Header>
            <HeaderSpacer aria-hidden="true" />
            <HeaderTitle>ask enric</HeaderTitle>
            <CloseButton type="button" onClick={() => setStage('closed')} aria-label="Close">
              ×
            </CloseButton>
          </Header>
        )}

        {stage === 'chat' && (
          <ConversationArea ref={conversationRef} role="log" aria-live="polite">
            {messages.map((m, i) => (
              <MessageEntrance key={i}>
                <AgentMessage role={m.role} content={m.content} />
              </MessageEntrance>
            ))}
            <ThinkingIndicator visible={isLoading} />
          </ConversationArea>
        )}

        {messages.length === 0 && (
          <QuickPromptsRow>
            {QUICK_PROMPTS.map(prompt => (
              <PromptChip key={prompt} type="button" onClick={() => sendMessage(prompt)}>
                {prompt}
              </PromptChip>
            ))}
          </QuickPromptsRow>
        )}

        <InputBar>
          <TextInput
            ref={inputRef}
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => e.key === 'Enter' && sendMessage(input)}
            placeholder=">_ ask me anything..."
            aria-label="Ask me anything"
          />
          <SendButton
            type="button"
            onClick={() => sendMessage(input)}
            disabled={!input.trim() || isLoading}
            aria-label="Send"
          >
            <SendIconImg src="/icons/arrow-right.svg" alt="" aria-hidden="true" width={16} height={16} />
          </SendButton>
        </InputBar>
      </Card>
    </>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// ── Floating trigger (closed stage) ───────────────────────────────────────────

const agentPulse = keyframes`
  0%, 100% { opacity: 1; }
  80% { opacity: 0.6; }
`

const FloatingTrigger = styled.button`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  gap: 8px;
  height: 48px;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.surface.inverse};
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  box-shadow: 0 4px 24px rgba(0, 0, 0, 0.15);
  cursor: pointer;
  transition: transform 0.2s ease;

  &:hover {
    transform: translateX(-50%) scale(1.04);
  }
`

const FloatingIcon = styled.img`
  display: block;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  filter: brightness(0) invert(1);
  animation: ${agentPulse} 3s ease infinite;
`

const FloatingLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.inverse};
  white-space: nowrap;
`

// ── Backdrop (chat stage only) ────────────────────────────────────────────────

const Backdrop = styled.div`
  position: fixed;
  inset: 0;
  z-index: 998;
  background: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
`

// ── Card (input + chat stages — same element, morphing) ──────────────────────

const Card = styled.div<{ $stage: Stage; $wide: boolean }>`
  position: fixed;
  bottom: 32px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  width: ${({ $wide }) => ($wide ? 'min(600px, calc(100vw - 48px))' : COLLAPSED_BAR_WIDTH)};
  max-height: 70vh;
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ $stage, theme }) => ($stage === 'chat' ? theme.radii['3xl'] : theme.radii.full)};
  box-shadow: 0 8px 48px rgba(0, 0, 0, 0.12);
  transition: width 0.4s cubic-bezier(0.4, 0, 0.2, 1), border-radius 0.3s ease;

  ${mq.mobile} {
    width: ${({ $wide }) => ($wide ? 'calc(100vw - 48px)' : COLLAPSED_BAR_WIDTH)};
  }
`

// ── Header (chat stage) ───────────────────────────────────────────────────────

const Header = styled.div`
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  flex-shrink: 0;
  padding: 16px 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.tertiary};
`

const HeaderSpacer = styled.span`
  display: block;
`

const HeaderTitle = styled.span`
  justify-self: center;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
`

const CloseButton = styled.button`
  justify-self: end;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border: none;
  background: transparent;
  font-size: 20px;
  line-height: 1;
  color: ${({ theme }) => theme.colors.text.secondary};
  cursor: pointer;
  transition: color 0.15s ease;

  &:hover {
    color: ${({ theme }) => theme.colors.text.primary};
  }
`

// ── Conversation (chat stage) ─────────────────────────────────────────────────

const ConversationArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: 20px;
`

const messageEnter = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const MessageEntrance = styled.div`
  animation: ${messageEnter} 0.35s ease both;
`

// ── Quick prompts (shown whenever there's no conversation yet) ───────────────

const QuickPromptsRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.spacing[2]};
  overflow-x: auto;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};

  &::-webkit-scrollbar {
    display: none;
  }
`

const PromptChip = styled.button`
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 8px 16px;
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
  cursor: pointer;
  transition: background-color 0.15s ease;

  &:hover {
    background-color: ${({ theme }) => theme.colors.surface.tertiary};
  }
`

// ── Input bar (present in every stage but closed) ─────────────────────────────

const InputBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  flex-shrink: 0;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};
`

const TextInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`

const SendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 36px;
  height: 36px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background-color: ${({ theme }) => theme.colors.surface.highlight};
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`

const SendIconImg = styled.img`
  display: block;
  filter: brightness(0) invert(1);
`

export default PersonalAgent
