'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'
import AgentMessage, { uiMessageToAgentResponse } from './AgentMessage'
import ThinkingIndicator from './ThinkingIndicator'

// ─── Data ───────────────────────────────────────────────────────────────────

const QUICK_PROMPTS = [
  'Why should I hire you?',
  'Show me your work',
  'Where have you traveled?',
  'Tell me about Plush',
  'Obsessed with credit cards?',
  "What's your design process?",
  'Tell me something personal',
  'How do you work in teams?',
]

// Figma-derived-equivalent layout constants — no Figma frame exists for
// this panel, these are the spec's literal values.
const TRIGGER_BOTTOM = 32
const SLIDE_TRANSITION_MS = 400
const DRAG_CLOSE_THRESHOLD = 100 // px dragged down before the panel closes
const TRIGGER_FONT_SIZE = '0.875rem' // 14px
const HEADER_TITLE_FONT_SIZE = '0.9375rem' // 15px
const EMPTY_TITLE_FONT_SIZE = '1.125rem' // 18px
const EMPTY_SUBTITLE_FONT_SIZE = '0.875rem' // 14px
const INPUT_FONT_SIZE = '0.875rem' // 14px

// ─── Component ──────────────────────────────────────────────────────────────

const PersonalAgent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isDragging, setIsDragging] = useState(false)
  const [dragOffset, setDragOffset] = useState(0)

  const inputRef = useRef<HTMLInputElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)
  const dragStartY = useRef<number | null>(null)

  const { messages, sendMessage, status, setMessages } = useChat({
    transport: new DefaultChatTransport({ api: '/api/agent' }),
    onFinish: () => {
      conversationRef.current?.scrollTo({ top: conversationRef.current.scrollHeight, behavior: 'smooth' })
    },
    onError: err => {
      console.error('[agent] request failed:', err)
      setMessages(prev => [
        ...prev,
        {
          id: crypto.randomUUID(),
          role: 'assistant',
          parts: [{ type: 'text', text: 'Sorry, something went wrong on my end. Try again in a moment.' }],
        },
      ])
    },
  })

  const isBusy = status === 'submitted' || status === 'streaming'

  const resetConversation = useCallback(() => {
    setMessages([])
    setInput('')
  }, [setMessages])

  const handleOpen = useCallback(() => setIsOpen(true), [])

  // Closing always clears the conversation — a fresh start next time, per spec.
  const handleClose = useCallback(() => {
    setIsOpen(false)
    setDragOffset(0)
    resetConversation()
  }, [resetConversation])

  // ⌘K / Ctrl+K opens the panel from anywhere; ESC closes it.
  useEffect(() => {
    const onKeyDown = (e: KeyboardEvent) => {
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault()
        handleOpen()
        return
      }
      if (e.key === 'Escape' && isOpen) {
        handleClose()
      }
    }
    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [isOpen, handleOpen, handleClose])

  // Mobile Navbar's agent icon button dispatches this to open the panel.
  useEffect(() => {
    window.addEventListener('open-personal-agent', handleOpen)
    return () => window.removeEventListener('open-personal-agent', handleOpen)
  }, [handleOpen])

  // Auto-focus the input once the slide-up transition finishes.
  useEffect(() => {
    if (!isOpen) return
    const id = setTimeout(() => inputRef.current?.focus(), SLIDE_TRANSITION_MS)
    return () => clearTimeout(id)
  }, [isOpen])

  // Lock background scroll while the panel is open.
  useEffect(() => {
    if (!isOpen) return
    const prevOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prevOverflow
    }
  }, [isOpen])

  // Keep the conversation scrolled to the latest message.
  useEffect(() => {
    conversationRef.current?.scrollTo({ top: conversationRef.current.scrollHeight, behavior: 'smooth' })
  }, [messages, status])

  const submitMessage = (raw: string) => {
    const query = raw.trim()
    if (!query || isBusy) return
    setInput('')
    sendMessage({ text: query })
  }

  // Drag-to-dismiss on the handle — follows the pointer 1:1 while dragging
  // (transition disabled), then either finishes the close or snaps back.
  const handleDragStart = (e: React.PointerEvent) => {
    dragStartY.current = e.clientY
    setIsDragging(true)
    e.currentTarget.setPointerCapture(e.pointerId)
  }

  const handleDragMove = (e: React.PointerEvent) => {
    if (dragStartY.current === null) return
    setDragOffset(Math.max(0, e.clientY - dragStartY.current))
  }

  const handleDragEnd = () => {
    if (dragStartY.current === null) return
    dragStartY.current = null
    setIsDragging(false)
    if (dragOffset > DRAG_CLOSE_THRESHOLD) {
      handleClose()
    } else {
      setDragOffset(0)
    }
  }

  return (
    <>
      <Backdrop $open={isOpen} onClick={handleClose} aria-hidden={!isOpen} />

      <Panel
        role="dialog"
        aria-modal="true"
        aria-label="Chat with Enric"
        aria-hidden={!isOpen}
        $open={isOpen}
        $dragOffset={dragOffset}
        $dragging={isDragging}
      >
        <DragHandleArea
          onPointerDown={handleDragStart}
          onPointerMove={handleDragMove}
          onPointerUp={handleDragEnd}
          onPointerCancel={handleDragEnd}
        >
          <DragHandle />
        </DragHandleArea>

        <Header>
          <HeaderLeft>
            <HeaderIcon aria-hidden="true" />
            <HeaderTitle>Ask Enric</HeaderTitle>
          </HeaderLeft>
          <CloseButton type="button" onClick={handleClose} aria-label="Close">
            <CloseIconSvg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
              <path d="M1 1L13 13M13 1L1 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
            </CloseIconSvg>
          </CloseButton>
        </Header>

        <ConversationArea ref={conversationRef} role="log" aria-live="polite">
          {messages.length === 0 && (
            <EmptyState>
              <EmptyIcon aria-hidden="true" />
              <EmptyTitle>Hey! Ask me anything about Enric</EmptyTitle>
              <EmptySubtitle>His work, travels, skills — or just say hi.</EmptySubtitle>
            </EmptyState>
          )}

          {messages.map(m => (
            <MessageEntrance key={m.id}>
              <AgentMessage role={m.role === 'user' ? 'user' : 'agent'} content={uiMessageToAgentResponse(m)} />
            </MessageEntrance>
          ))}
          <ThinkingIndicator visible={status === 'submitted'} />
        </ConversationArea>

        <QuickPromptsRow>
          {QUICK_PROMPTS.map(prompt => (
            <PromptChip key={prompt} type="button" onClick={() => sendMessage({ text: prompt })}>
              {prompt}
            </PromptChip>
          ))}
        </QuickPromptsRow>

        <InputBar>
          <InputPill>
            <TextInput
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitMessage(input)}
              placeholder=">_ ask me anything..."
              aria-label="Ask me anything about Enric"
            />
            <SendButton
              type="button"
              onClick={() => submitMessage(input)}
              disabled={!input.trim() || isBusy}
              $active={!!input.trim()}
              aria-label="Send"
            >
              <SendIcon aria-hidden="true" />
            </SendButton>
          </InputPill>
        </InputBar>
      </Panel>

      {!isOpen && (
        <Trigger type="button" onClick={handleOpen} aria-label="Ask Enric">
          <TriggerIcon aria-hidden="true" />
          <TriggerLabel>Ask Enric</TriggerLabel>
        </Trigger>
      )}
    </>
  )
}

// ─── Styles ─────────────────────────────────────────────────────────────────

// ── Trigger ──────────────────────────────────────────────────────────────

const triggerPulse = keyframes`
  0%, 100% { opacity: 1; }
  50% { opacity: 0.55; }
`

const Trigger = styled.button`
  position: fixed;
  bottom: ${TRIGGER_BOTTOM}px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[2]};
  height: 48px;
  padding: 12px 24px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.surface.inverse};
  cursor: pointer;
  white-space: nowrap;

  /* Temporarily hidden site-wide — see PersonalAgent panel below. */
  display: none;
`

const TriggerIcon = styled.span`
  display: block;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.text.inverse};
  -webkit-mask: url(/icons/agent.svg) no-repeat center / contain;
  mask: url(/icons/agent.svg) no-repeat center / contain;
  animation: ${triggerPulse} 2.4s ease-in-out infinite;
`

const TriggerLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${TRIGGER_FONT_SIZE};
  color: ${({ theme }) => theme.colors.text.inverse};
`

// ── Backdrop ─────────────────────────────────────────────────────────────

const Backdrop = styled.div<{ $open: boolean }>`
  position: fixed;
  inset: 0;
  z-index: 998;
  background-color: rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(4px);
  opacity: ${({ $open }) => ($open ? 1 : 0)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  transition: opacity 0.3s ease;

  /* Temporarily hidden site-wide — see Trigger/Panel above. */
  display: none;
`

// ── Panel ────────────────────────────────────────────────────────────────

const Panel = styled.div<{ $open: boolean; $dragOffset: number; $dragging: boolean }>`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 999;
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: 640px;
  margin: 0 auto;
  height: 70vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-bottom: none;
  border-radius: ${({ theme }) => theme.radii['3xl']} ${({ theme }) => theme.radii['3xl']} 0 0;
  box-shadow: 0 -8px 48px rgba(0, 0, 0, 0.12);
  transform: translateY(${({ $open, $dragOffset }) => ($open ? `${$dragOffset}px` : '100%')});
  transition: ${({ $dragging }) => ($dragging ? 'none' : `transform ${SLIDE_TRANSITION_MS}ms cubic-bezier(0.4, 0, 0.2, 1)`)};
  pointer-events: ${({ $open }) => ($open ? 'auto' : 'none')};
  overflow: hidden;

  ${mq.mobile} {
    height: 90vh;
  }

  /* Temporarily hidden site-wide — see Trigger above. */
  display: none;
`

const DragHandleArea = styled.div`
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  padding-top: 12px;
  padding-bottom: 8px;
  cursor: grab;
  touch-action: none;

  &:active {
    cursor: grabbing;
  }
`

const DragHandle = styled.div`
  width: 32px;
  height: 4px;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.border.tertiary};
`

// ── Header ───────────────────────────────────────────────────────────────

const Header = styled.div`
  flex-shrink: 0;
  height: 52px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 0 20px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.tertiary};
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`

const HeaderIcon = styled.span`
  display: block;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(/icons/agent.svg) no-repeat center / contain;
  mask: url(/icons/agent.svg) no-repeat center / contain;
`

const HeaderTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${HEADER_TITLE_FONT_SIZE};
  color: ${({ theme }) => theme.colors.text.primary};
`

const CloseButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
  cursor: pointer;
`

const CloseIconSvg = styled.svg`
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ── Conversation ─────────────────────────────────────────────────────────

const ConversationArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: 20px 20px 0;
`

const emptyPulse = keyframes`
  0%, 100% { opacity: 1; transform: scale(1); }
  50% { opacity: 0.6; transform: scale(1.05); }
`

const EmptyState = styled.div`
  flex: 1;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[3]};
  text-align: center;
  padding-bottom: 20px;
`

const EmptyIcon = styled.span`
  display: block;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(/icons/agent.svg) no-repeat center / contain;
  mask: url(/icons/agent.svg) no-repeat center / contain;
  animation: ${emptyPulse} 2.4s ease-in-out infinite;
`

const EmptyTitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${EMPTY_TITLE_FONT_SIZE};
  color: ${({ theme }) => theme.colors.text.primary};
`

const EmptySubtitle = styled.p`
  margin: 0;
  max-width: 280px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${EMPTY_SUBTITLE_FONT_SIZE};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const messageEnter = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const MessageEntrance = styled.div`
  animation: ${messageEnter} 0.35s ease both;
`

// ── Quick prompts ────────────────────────────────────────────────────────

const QuickPromptsRow = styled.div`
  flex-shrink: 0;
  display: flex;
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.spacing[2]};
  overflow-x: auto;
  padding: 10px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};

  &::-webkit-scrollbar {
    display: none;
  }
`

const PromptChip = styled.button`
  flex-shrink: 0;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 6px 14px;
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

// ── Input bar ────────────────────────────────────────────────────────────

const InputBar = styled.div`
  flex-shrink: 0;
  padding: 12px 16px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};
`

const InputPill = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.full};
  padding: 6px 6px 6px 16px;
`

const TextInput = styled.input`
  flex: 1;
  min-width: 0;
  border: none;
  outline: none;
  background: transparent;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${INPUT_FONT_SIZE};
  color: ${({ theme }) => theme.colors.text.primary};

  &::placeholder {
    color: ${({ theme }) => theme.colors.text.tertiary};
  }
`

const SendButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.full};
  background-color: ${({ theme, $active }) => ($active ? theme.colors.surface.inverse : theme.colors.surface.tertiary)};
  cursor: pointer;
  transition: background-color 0.2s ease;

  &:disabled {
    cursor: default;
  }
`

const SendIcon = styled.span`
  display: block;
  width: 14px;
  height: 14px;
  background-color: ${({ theme }) => theme.colors.text.inverse};
  -webkit-mask: url(/icons/arrow-right.svg) no-repeat center / contain;
  mask: url(/icons/arrow-right.svg) no-repeat center / contain;
`

export default PersonalAgent
