'use client'

import { useCallback, useEffect, useRef, useState } from 'react'
import { useChat } from '@ai-sdk/react'
import { DefaultChatTransport } from 'ai'
import styled, { createGlobalStyle, keyframes } from 'styled-components'
import { mq } from '@/styles/theme'
import AgentMessage, { uiMessageToAgentResponse } from './AgentMessage'
import ThinkingIndicator from './ThinkingIndicator'

// ─── Types ──────────────────────────────────────────────────────────────────

type ChatSize = 'active' | 'expanded'

// ─── Data ───────────────────────────────────────────────────────────────────
// Figma's quick-prompt cards are nav-style (title + description), not
// conversational questions — read fresh from node 661:1495 / 696:1537.

const QUICK_PROMPTS = [
  { title: 'My Work', description: 'Projects & Experiments' },
  { title: 'Experience', description: 'Career Journey' },
  { title: 'Skills', description: 'Expertise & Tools' },
  { title: 'About Me', description: 'Background & Interests' },
  { title: 'Contact Me', description: 'Get in Touch' },
  { title: 'Resume', description: 'Download PDF' },
]

// Figma pixel-exact values (agent trigger 658:1670, Active card 661:1495,
// Expanded card 696:1537, Agent input component 184:510 SM/Size3).
const TRIGGER_BOTTOM = 32
const CARD_BOTTOM = 32
const CARD_ACTIVE_WIDTH = 1000
const CARD_ACTIVE_HEIGHT = 768
const CARD_EXPANDED_WIDTH = 1200
const CARD_EXPANDED_HEIGHT = 896

// Figma's brand gradient (pink → red → yellow), confirmed identical across
// the trigger icon, header icon, trigger/input borders, and send icon.
const GRADIENT_STOPS = '#EC6AA8, #E8342A, #FFCC00, #EC6AA8'

// A registered custom property lets the browser smoothly interpolate the
// gradient's angle across the animation (plain custom properties can't be
// animated without this registration). Rotating the angle — rather than
// hue-rotating the rendered pixels, or spinning an oversized clipped layer —
// is what gives a perfectly continuous border with no seams, gaps, or
// off-palette colors ever appearing.
const GradientAngleProperty = createGlobalStyle`
  @property --agent-gradient-angle {
    syntax: '<angle>';
    initial-value: 0deg;
    inherits: false;
  }
`

const rotateGradientAngle = keyframes`
  to { --agent-gradient-angle: 360deg; }
`

// ─── Reusable gradient agent icon ──────────────────────────────────────────
// Figma's trigger (18px) and header (32px) icons are the exact same path as
// /icons/agent.svg (confirmed by comparing path coordinates), just filled
// with the brand linear-gradient at 80% opacity instead of a solid color —
// same technique as components/shared/PageHeader.tsx's label icon.

const AgentGradientIcon = ({ size, gradientId }: { size: number; gradientId: string }) => (
  <svg width={size} height={size} viewBox="0 0 16 16" fill="none" aria-hidden="true">
    <defs>
      <linearGradient id={gradientId} x1="12.8815" y1="3.36995" x2="6.24023" y2="25.26" gradientUnits="userSpaceOnUse">
        <stop stopColor="#EC6AA8" />
        <stop offset="0.502906" stopColor="#E8342A" />
        <stop offset="1" stopColor="#FFCC00" />
      </linearGradient>
    </defs>
    <path
      d="M4.51031 4.184C7.20572 1.62704 10.9536 1.26256 12.8815 3.36995C13.9219 4.50745 14.2175 6.13217 13.8472 7.78921C8.62995 7.78238 9.09531 5.12186 9.27475 4.27564C9.30301 4.1424 9.22123 4.02817 9.08954 4.00378C8.93688 3.97557 8.79123 4.082 8.76336 4.23746C8.15002 7.65898 6.66679 7.95853 4.19613 7.80448C4.07595 7.79699 3.9678 7.8805 3.94418 8.00074C3.91699 8.13982 4.01226 8.27293 4.14964 8.29628C6.7001 8.72989 6.94315 10.5872 6.7838 11.7205C6.76509 11.8536 6.84244 11.9836 6.96976 12.0191C7.11667 12.0599 7.26562 11.9555 7.28844 11.8022C7.92129 7.52558 10.6257 8.25686 13.7265 8.25733C13.3508 9.51607 12.595 10.7688 11.4913 11.816C8.79584 14.373 5.04797 14.7374 3.12012 12.63C1.19238 10.5225 1.81494 6.74112 4.51031 4.184Z"
      fill={`url(#${gradientId})`}
      fillOpacity="0.8"
    />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

const PersonalAgent = () => {
  const [isOpen, setIsOpen] = useState(false)
  const [chatSize, setChatSize] = useState<ChatSize>('active')
  const [input, setInput] = useState('')

  const inputRef = useRef<HTMLInputElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)

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

  // Figma shows no explicit close control — only Expand/Minus in the header.
  // Minimizing collapses back to the trigger and starts the next session fresh.
  const handleClose = useCallback(() => {
    setIsOpen(false)
    setChatSize('active')
    resetConversation()
  }, [resetConversation])

  // ⌘K / Ctrl+K opens the card from anywhere; ESC closes it.
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

  // Mobile Navbar's agent icon button dispatches this to open the card.
  useEffect(() => {
    window.addEventListener('open-personal-agent', handleOpen)
    return () => window.removeEventListener('open-personal-agent', handleOpen)
  }, [handleOpen])

  // Auto-focus the input once the card is showing.
  useEffect(() => {
    if (!isOpen) return
    const id = setTimeout(() => inputRef.current?.focus(), 50)
    return () => clearTimeout(id)
  }, [isOpen])

  // Lock background scroll while the card is open.
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

  return (
    <>
      <GradientAngleProperty />

      {isOpen && (
        <Card role="dialog" aria-modal="true" aria-label="Chat with Enric" $size={chatSize}>
          <Header>
            <HeaderLeft>
              <AgentGradientIcon size={32} gradientId="agentIconGradientHeader" />
              <HeaderTitleBlock>
                <HeaderTitle>Chat with Enric</HeaderTitle>
                <HeaderStatus>
                  <HeaderStatusIcon aria-hidden="true" />
                  {chatSize === 'active' ? 'Best expanded' : "You're in the expanded experience"}
                </HeaderStatus>
              </HeaderTitleBlock>
            </HeaderLeft>
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
              <HeaderIconButton type="button" onClick={handleClose} aria-label="Minimize">
                <MinusIcon aria-hidden="true" />
              </HeaderIconButton>
            </HeaderButtons>
          </Header>

          <ConversationArea ref={conversationRef} role="log" aria-live="polite">
            {messages.map(m => (
              <MessageEntrance key={m.id}>
                <AgentMessage role={m.role === 'user' ? 'user' : 'agent'} content={uiMessageToAgentResponse(m)} />
              </MessageEntrance>
            ))}
            <ThinkingIndicator visible={status === 'submitted'} />
          </ConversationArea>

          <QuickPromptsRow>
            {QUICK_PROMPTS.map(prompt => (
              <PromptCard key={prompt.title} type="button" onClick={() => submitMessage(prompt.title)}>
                <PromptTitle>{prompt.title}</PromptTitle>
                <PromptDescription>{prompt.description}</PromptDescription>
              </PromptCard>
            ))}
            {chatSize === 'active' && (
              <ScrollHint aria-hidden="true">
                <CheveronRightIcon aria-hidden="true" />
              </ScrollHint>
            )}
          </QuickPromptsRow>

          <AgentInputWrap>
            <CursorGlyph aria-hidden="true">›_</CursorGlyph>
            <PlaceholderInput
              ref={inputRef}
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => e.key === 'Enter' && submitMessage(input)}
              placeholder="Ask Enric…"
              aria-label="Ask Enric"
            />
            <SendButtonContainer>
              <CmdKHint aria-hidden="true">⌘ K</CmdKHint>
              <DesktopSendButton
                type="button"
                onClick={() => submitMessage(input)}
                disabled={!input.trim() || isBusy}
                aria-label="Send"
              >
                <AgentGradientIcon size={16} gradientId="agentIconGradientSend" />
              </DesktopSendButton>
              <MobileSendButton
                type="button"
                onClick={() => submitMessage(input)}
                disabled={!input.trim() || isBusy}
                aria-label="Send"
              >
                <MobileSendIcon aria-hidden="true" />
              </MobileSendButton>
            </SendButtonContainer>
          </AgentInputWrap>
        </Card>
      )}

      {!isOpen && (
        <Trigger type="button" onClick={handleOpen} aria-label="Ask Enric">
          <AgentGradientIcon size={18} gradientId="agentIconGradientTrigger" />
          <TriggerLabel>Ask Enric</TriggerLabel>
        </Trigger>
      )}
    </>
  )
}

// ─── Styles ─────────────────────────────────────────────────────────────────

// ── Trigger ──────────────────────────────────────────────────────────────
// Figma annotation: "the colors run around the border slowly giving the
// agent a lively feeling." The border is drawn as two stacked backgrounds —
// a solid padding-box fill on top of a border-box gradient — with a
// transparent border creating the ring where the gradient shows through.
// Animating the gradient's own angle (via the registered custom property
// above) keeps the border a single continuous ring at all times: no seams,
// no gaps, and no colors other than the 3 named stops ever appear.

const Trigger = styled.button`
  position: fixed;
  bottom: ${TRIGGER_BOTTOM}px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 12px 24px;
  border: 2px solid transparent;
  border-radius: 12px;
  background:
    linear-gradient(${({ theme }) => theme.colors.surface.primary}, ${({ theme }) => theme.colors.surface.primary}) padding-box,
    linear-gradient(var(--agent-gradient-angle), ${GRADIENT_STOPS}) border-box;
  animation: ${rotateGradientAngle} 3s linear infinite;
  cursor: pointer;
  white-space: nowrap;
`

const TriggerLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  background: linear-gradient(188deg, rgba(236, 106, 168, 0.8) 9.8%, rgba(232, 52, 42, 0.8) 53.8%, rgba(255, 204, 0, 0.8) 97.3%);
  background-clip: text;
  -webkit-background-clip: text;
  color: transparent;
`

// ── Card ─────────────────────────────────────────────────────────────────

const cardEnter = keyframes`
  from { opacity: 0; transform: translateX(-50%) translateY(20px); }
  to   { opacity: 1; transform: translateX(-50%) translateY(0); }
`

const Card = styled.div<{ $size: ChatSize }>`
  position: fixed;
  bottom: ${CARD_BOTTOM}px;
  left: 50%;
  transform: translateX(-50%);
  z-index: 999;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  width: ${({ $size }) => ($size === 'expanded' ? `min(${CARD_EXPANDED_WIDTH}px, calc(100vw - 48px))` : `min(${CARD_ACTIVE_WIDTH}px, calc(100vw - 48px))`)};
  height: ${({ $size }) => ($size === 'expanded' ? `min(${CARD_EXPANDED_HEIGHT}px, 85vh)` : `min(${CARD_ACTIVE_HEIGHT}px, 80vh)`)};
  padding: 24px;
  background-color: ${({ theme }) => theme.colors.surface.primary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  /* Figma's export has no shadow class on this container, but the card floats
     directly over page content with no backdrop — a light shadow is kept for
     legibility since nothing else separates it from the page behind it. */
  box-shadow: 0 8px 48px rgba(0, 0, 0, 0.12);
  overflow: hidden;
  animation: ${cardEnter} 0.3s ease both;
  transition: width 0.3s ease, height 0.3s ease;

  ${mq.mobile} {
    width: calc(100vw - 32px);
    height: min(80vh, 700px);
    padding: 16px;
  }
`

// ── Header ───────────────────────────────────────────────────────────────

const Header = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-shrink: 0;
  width: 100%;
  padding-bottom: 16px;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.tertiary};
`

const HeaderLeft = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  min-width: 0;
`

const HeaderTitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  min-width: 0;
`

const HeaderTitle = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
`

const HeaderStatus = styled.span`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[1]};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
  white-space: nowrap;
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
  gap: ${({ theme }) => theme.spacing[3]};
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

// ── Conversation ─────────────────────────────────────────────────────────
// Figma's mockup shows this area completely blank (no messages, no empty
// state, no thinking-state visual) — left bare here rather than inventing a
// hero visual with no Figma basis. AgentMessage.tsx / ThinkingIndicator.tsx
// have no corresponding Figma spec either, so both are reused unchanged.

const ConversationArea = styled.div`
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: 24px 0;
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
  position: relative;
  display: flex;
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.spacing[4]};
  flex-shrink: 0;
  overflow-x: auto;
  padding-top: 24px;
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};

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

const ScrollHint = styled.span`
  position: absolute;
  top: 17px;
  right: 8px;
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.md};
  box-shadow: 0 0 4.1px rgba(0, 0, 0, 0.25);
  pointer-events: none;

  ${mq.mobile} {
    display: none;
  }
`

const CheveronRightIcon = styled.span`
  display: block;
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.text.secondary};
  -webkit-mask: url(/icons/cheveron-right.svg) no-repeat center / contain;
  mask: url(/icons/cheveron-right.svg) no-repeat center / contain;
`

// ── Input bar (the "Agent" component, Size3 desktop / SM mobile) ─────────
// Same stacked-background technique as the trigger — a single element, no
// extra wrapper/pseudo-layer needed.

const AgentInputWrap = styled.div`
  flex-shrink: 0;
  margin-top: 24px;
  display: flex;
  align-items: center;
  width: 100%;
  padding: 8px 8px 8px 12px;
  border: 2px solid transparent;
  border-radius: 12px;
  background:
    linear-gradient(${({ theme }) => theme.colors.surface.primary}, ${({ theme }) => theme.colors.surface.primary}) padding-box,
    linear-gradient(var(--agent-gradient-angle), ${GRADIENT_STOPS}) border-box;
  animation: ${rotateGradientAngle} 3s linear infinite;

  ${mq.mobile} {
    padding: 10px;
    border-radius: 8px;
  }
`

const CursorGlyph = styled.span`
  flex-shrink: 0;
  margin-right: ${({ theme }) => theme.spacing[3]};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  user-select: none;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
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

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
  }
`

const SendButtonContainer = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
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

// Desktop send button: 32px, light 20%-opacity brand-gradient bg, gradient icon.
const DesktopSendButton = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 32px;
  height: 32px;
  padding: 8px;
  border: none;
  border-radius: ${({ theme }) => theme.radii.md};
  background: linear-gradient(202deg, rgba(236, 106, 168, 0.2) 9.8%, rgba(232, 52, 42, 0.2) 53.8%, rgba(255, 204, 0, 0.2) 97.3%);
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  ${mq.mobile} {
    display: none;
  }
`

// Mobile send button (Figma SM variant): bare 16px solid-color icon, no
// background wrapper at all.
const MobileSendButton = styled.button`
  display: none;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  padding: 0;
  border: none;
  background: transparent;
  cursor: pointer;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }

  ${mq.mobile} {
    display: flex;
  }
`

const MobileSendIcon = styled.span`
  display: block;
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(/icons/arrow-right.svg) no-repeat center / contain;
  mask: url(/icons/arrow-right.svg) no-repeat center / contain;
`

export default PersonalAgent
