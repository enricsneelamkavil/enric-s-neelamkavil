'use client'

import { useEffect, useRef, useState } from 'react'
import Link from 'next/link'
import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'
import AgentMessage, { type AgentResponse } from './AgentMessage'
import ThinkingIndicator from './ThinkingIndicator'

// ─── Types ──────────────────────────────────────────────────────────────────

interface UIMessage {
  role: 'user' | 'agent'
  content: AgentResponse
}

// ─── Data ───────────────────────────────────────────────────────────────────

const QUICK_PROMPTS = [
  'Why should I hire you?',
  'Tell me about Plush',
  'Where have you traveled?',
  'Show me your work',
  'Are you obsessed with credit cards?',
  'How do you work in teams?',
  "What's your design process?",
  'Tell me something personal',
]

const HEADER_HEIGHT = '65px'

// ─── Component ──────────────────────────────────────────────────────────────

const AskPage = () => {
  const [messages, setMessages] = useState<UIMessage[]>([])
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)

  const inputRef = useRef<HTMLInputElement>(null)
  const conversationRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    inputRef.current?.focus()
  }, [])

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
      console.error('[ask] request failed:', err)
      setMessages(prev => [
        ...prev,
        { role: 'agent', content: { text: 'Sorry, something went wrong on my end. Try again in a moment.' } },
      ])
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <PageWrapper>
      <Header>
        <HeaderLeft href="/">
          <BackIcon aria-hidden="true" />
          <SiteLabel>enric.design</SiteLabel>
        </HeaderLeft>
        <HeaderCenter>ask enric</HeaderCenter>
        <HeaderAgentIcon aria-hidden="true" />
      </Header>

      <ConversationArea ref={conversationRef} role="log" aria-live="polite">
        {messages.map((m, i) => (
          <MessageEntrance key={i}>
            <AgentMessage role={m.role} content={m.content} />
          </MessageEntrance>
        ))}
        <ThinkingIndicator visible={isLoading} />
      </ConversationArea>

      <BottomFixed>
        <QuickPromptsRow>
          {QUICK_PROMPTS.map(prompt => (
            <PromptChip key={prompt} type="button" onClick={() => sendMessage(prompt)}>
              {prompt}
            </PromptChip>
          ))}
        </QuickPromptsRow>

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
            <SendIcon src="/icons/arrow-right.svg" alt="" aria-hidden="true" width={16} height={16} />
          </SendButton>
        </InputBar>
      </BottomFixed>
    </PageWrapper>
  )
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const PageWrapper = styled.div`
  position: relative;
  min-height: 100vh;
  background-color: ${({ theme }) => theme.colors.background.primary};
`

// ── Header ──────────────────────────────────────────────────────────────────

const Header = styled.header`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  display: grid;
  grid-template-columns: 1fr auto 1fr;
  align-items: center;
  width: 100%;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.background.primary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.tertiary};
`

const HeaderLeft = styled(Link)`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  justify-self: start;
  text-decoration: none;
`

const BackIcon = styled.span`
  display: block;
  flex-shrink: 0;
  width: 16px;
  height: 16px;
  background-color: ${({ theme }) => theme.colors.text.secondary};
  -webkit-mask: url(/icons/arrow-left.svg) no-repeat center / contain;
  mask: url(/icons/arrow-left.svg) no-repeat center / contain;
`

const SiteLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;
`

const HeaderCenter = styled.span`
  justify-self: center;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;
`

const agentPulse = keyframes`
  0%, 100% { opacity: 1; }
  80% { opacity: 0.5; }
`

const HeaderAgentIcon = styled.span`
  display: block;
  justify-self: end;
  flex-shrink: 0;
  width: 20px;
  height: 20px;
  background-color: ${({ theme }) => theme.colors.text.highlight};
  -webkit-mask: url(/icons/agent.svg) no-repeat center / contain;
  mask: url(/icons/agent.svg) no-repeat center / contain;
  animation: ${agentPulse} 3s ease infinite;
`

// ── Conversation ─────────────────────────────────────────────────────────────

const messageEnter = keyframes`
  from { opacity: 0; transform: translateY(20px); }
  to   { opacity: 1; transform: translateY(0); }
`

const MessageEntrance = styled.div`
  animation: ${messageEnter} 0.35s ease both;
`

const ConversationArea = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  padding-top: calc(${HEADER_HEIGHT} + 24px);
  padding-bottom: 160px;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};
  min-height: 100vh;

  ${mq.mobile} {
    padding-left: 16px;
    padding-right: 16px;
  }
`

// ── Fixed bottom (quick prompts + input) ─────────────────────────────────────

const BottomFixed = styled.div`
  position: fixed;
  bottom: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background-color: ${({ theme }) => theme.colors.background.primary};
`

const QuickPromptsRow = styled.div`
  display: flex;
  flex-wrap: nowrap;
  gap: ${({ theme }) => theme.spacing[2]};
  overflow-x: auto;
  padding: 12px 24px;
  background-color: ${({ theme }) => theme.colors.background.primary};
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

const InputBar = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 100%;
  max-width: 800px;
  margin: 0 auto;
  padding: 16px 24px;
  background-color: ${({ theme }) => theme.colors.background.primary};
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
  width: 40px;
  height: 40px;
  border-radius: ${({ theme }) => theme.radii.full};
  border: none;
  background-color: ${({ theme }) => theme.colors.surface.inverse};
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:disabled {
    opacity: 0.4;
    cursor: default;
  }
`

const SendIcon = styled.img`
  display: block;
  filter: brightness(0) invert(1);
`

export default AskPage
