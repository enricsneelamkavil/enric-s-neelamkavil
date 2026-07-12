'use client'

import { useEffect, useState } from 'react'
import Image from 'next/image'
import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'
import { WORKS, TRAVEL_PHOTOS, CREDIT_CARDS, PROFILE } from './agentData'

// ─── Types ──────────────────────────────────────────────────────────────────

export interface AgentCard {
  type: 'work' | 'travel' | 'profile' | 'image' | 'credit-card' | 'stat'
  // work card
  title?: string
  description?: string
  tags?: string[]
  cover_image_url?: string
  cta_url?: string
  flagship?: boolean
  // travel card
  country?: string
  year?: number
  city?: string
  photo?: string
  // image card
  src?: string
  caption?: string
  // credit card
  card_name?: string
  card_image?: string
  // stat card
  value?: string
  label?: string
}

export interface AgentResponse {
  text?: string
  cards?: AgentCard[]
}

interface Props {
  role: 'user' | 'agent'
  content: AgentResponse
  /** Skip the typewriter and show the full text immediately — for messages
   * that have already finished animating once (e.g. after a remount). */
  instant?: boolean
  /** Fired once the typewriter reaches the end of the text. */
  onTypingComplete?: () => void
}

const TYPE_SPEED_MS = 12

// Figma-derived-equivalent layout constants for this page (no Figma frame
// exists for /ask — these are the spec's literal values).
const WORK_IMAGE_HEIGHT = '200px'
const WORK_TITLE_SIZE = '1.25rem' // 20px
const WORK_DESC_SIZE = '0.875rem' // 14px
const TRAVEL_PHOTO_SIZE = '120px'
const CREDIT_CARD_ASPECT = '86 / 54'
const FLAGSHIP_BORDER = '4px'

const CARD_TYPE_ORDER: AgentCard['type'][] = ['work', 'profile', 'travel', 'credit-card', 'stat', 'image']

// Fills in image paths/details the model has no way of knowing exactly,
// by matching against the real data it's describing.
const enrichCard = (card: AgentCard): AgentCard => {
  if (card.type === 'work') {
    const match = WORKS.find(w => w.title.toLowerCase() === card.title?.toLowerCase())
    if (match) {
      return {
        ...card,
        cover_image_url: card.cover_image_url ?? match.cover_image_url,
        cta_url: card.cta_url ?? match.cta_url,
        description: card.description ?? match.description,
        tags: card.tags ?? match.tags,
        flagship: card.flagship ?? match.flagship,
      }
    }
  }
  if (card.type === 'travel' && !card.photo && card.country) {
    const photo = TRAVEL_PHOTOS[card.country]
    if (photo) return { ...card, photo }
  }
  if (card.type === 'credit-card' && !card.card_image) {
    const match = CREDIT_CARDS.find(c => c.card_name.toLowerCase() === card.card_name?.toLowerCase())
    if (match) return { ...card, card_image: match.card_image }
  }
  return card
}

const getISTTime = () =>
  new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

const useTypewriter = (text: string, enabled: boolean, onComplete?: () => void) => {
  const [shown, setShown] = useState(() => (enabled ? '' : text))

  useEffect(() => {
    if (!enabled || !text) return
    let i = 0
    const id = setInterval(() => {
      i += 1
      setShown(text.slice(0, i))
      if (i >= text.length) {
        clearInterval(id)
        onComplete?.()
      }
    }, TYPE_SPEED_MS)
    return () => clearInterval(id)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text, enabled])

  return shown
}

// ─── Per-type card items ────────────────────────────────────────────────────

const WorkCardItem = ({ card }: { card: AgentCard }) => (
  <WorkCardEl as={card.cta_url ? 'a' : 'div'} href={card.cta_url} target="_blank" rel="noopener noreferrer" $flagship={!!card.flagship}>
    {card.cover_image_url && (
      <WorkImageWrap>
        <Image src={card.cover_image_url} alt={card.title ?? ''} fill sizes="400px" style={{ objectFit: 'cover' }} />
      </WorkImageWrap>
    )}
    <WorkBody>
      {card.tags && card.tags.length > 0 && (
        <CardTagsRow>
          {card.tags.map(tag => <CardTag key={tag}>{tag}</CardTag>)}
        </CardTagsRow>
      )}
      {card.title && (
        <WorkTitle>
          {card.title}<HighlightPeriod>.</HighlightPeriod>
        </WorkTitle>
      )}
      {card.description && <WorkDescription>{card.description}</WorkDescription>}
      {card.cta_url && <VisitLink>Visit →</VisitLink>}
    </WorkBody>
  </WorkCardEl>
)

const TravelCardItem = ({ card }: { card: AgentCard }) => (
  <TravelItem>
    {card.photo && (
      <TravelPhotoWrap>
        <Image src={card.photo} alt={card.country ?? ''} fill sizes="120px" style={{ objectFit: 'cover' }} />
      </TravelPhotoWrap>
    )}
    {card.country && <TravelCountry>{card.country}</TravelCountry>}
    <TravelMeta>{[card.city, card.year].filter(Boolean).join(' — ')}</TravelMeta>
  </TravelItem>
)

const CreditCardItem = ({ card }: { card: AgentCard }) => (
  <CreditCardItemEl>
    {card.card_image && (
      <CreditCardImageWrap>
        <Image src={card.card_image} alt={card.card_name ?? ''} fill sizes="160px" style={{ objectFit: 'cover' }} />
      </CreditCardImageWrap>
    )}
    {card.card_name && <CreditCardName>{card.card_name}</CreditCardName>}
  </CreditCardItemEl>
)

const StatCardItem = ({ card }: { card: AgentCard }) => (
  <StatItem>
    {card.value && <StatValue>{card.value}</StatValue>}
    {card.label && <StatLabel>{card.label}</StatLabel>}
  </StatItem>
)

const ProfileCardItem = () => {
  // Starts empty and fills in via effect (not lazy useState init) so SSR
  // output and the client's first render match — same pattern as
  // DirectContact.tsx / AboutDescription.tsx's IST clocks.
  const [istTime, setIstTime] = useState('')

  useEffect(() => {
    setIstTime(getISTTime())
    const id = setInterval(() => setIstTime(getISTTime()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <ProfileCardEl>
      <ProfileBanner>
        <Image src={PROFILE.banner} alt="" fill sizes="400px" style={{ objectFit: 'cover' }} />
      </ProfileBanner>
      <ProfileBody>
        <ProfileName>{PROFILE.name}</ProfileName>
        <ProfileRole>{PROFILE.role} · {PROFILE.company}</ProfileRole>
        <ProfileLocation>{PROFILE.location}{istTime && ` — ${istTime} IST`}</ProfileLocation>
      </ProfileBody>
    </ProfileCardEl>
  )
}

const ImageCardItem = ({ card }: { card: AgentCard }) => (
  <Card>
    {card.src && (
      <CardImageWrap>
        <Image src={card.src} alt={card.caption ?? ''} fill sizes="280px" style={{ objectFit: 'cover' }} />
      </CardImageWrap>
    )}
    {card.caption && (
      <CardBody>
        <CardDescription>{card.caption}</CardDescription>
      </CardBody>
    )}
  </Card>
)

// ─── Component ──────────────────────────────────────────────────────────────

const AgentMessage = ({ role, content, instant, onTypingComplete }: Props) => {
  const isAgent = role === 'agent'
  const text = content.text ?? ''
  const displayedText = useTypewriter(text, isAgent && !instant, onTypingComplete)

  if (!isAgent) {
    return (
      <UserRow>
        <UserBubble>{text}</UserBubble>
      </UserRow>
    )
  }

  const cards = (content.cards ?? []).map(enrichCard)
  const groups = CARD_TYPE_ORDER
    .map(type => ({ type, items: cards.filter(c => c.type === type) }))
    .filter(g => g.items.length > 0)

  return (
    <AgentRow>
      {text && <AgentText>{displayedText}</AgentText>}
      {groups.map(({ type, items }) => {
        if (type === 'work') {
          return (
            <WorkGrid key={type}>
              {items.slice(0, 3).map((card, i) => (
                <CardEntrance key={i} $delay={i * 0.06} $span={!!card.flagship}>
                  <WorkCardItem card={card} />
                </CardEntrance>
              ))}
            </WorkGrid>
          )
        }
        if (type === 'profile') {
          return (
            <CardEntrance key={type} $delay={0}>
              <ProfileCardItem />
            </CardEntrance>
          )
        }
        if (type === 'travel') {
          return (
            <TravelRow key={type}>
              {items.map((card, i) => (
                <CardEntrance key={i} $delay={i * 0.06}>
                  <TravelCardItem card={card} />
                </CardEntrance>
              ))}
            </TravelRow>
          )
        }
        if (type === 'credit-card') {
          return (
            <CreditCardRow key={type}>
              {items.map((card, i) => (
                <CardEntrance key={i} $delay={i * 0.06}>
                  <CreditCardItem card={card} />
                </CardEntrance>
              ))}
            </CreditCardRow>
          )
        }
        if (type === 'stat') {
          return (
            <StatRow key={type}>
              {items.map((card, i) => (
                <CardEntrance key={i} $delay={i * 0.06}>
                  <StatCardItem card={card} />
                </CardEntrance>
              ))}
            </StatRow>
          )
        }
        return (
          <CardsGrid key={type}>
            {items.map((card, i) => (
              <CardEntrance key={i} $delay={i * 0.06}>
                <ImageCardItem card={card} />
              </CardEntrance>
            ))}
          </CardsGrid>
        )
      })}
    </AgentRow>
  )
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const UserRow = styled.div`
  display: flex;
  justify-content: flex-end;
`

const UserBubble = styled.div`
  max-width: 80%;
  padding: 12px 16px;
  border-radius: 16px 16px 4px 16px;
  background-color: ${({ theme }) => theme.colors.surface.inverse};
  color: ${({ theme }) => theme.colors.text.inverse};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  white-space: pre-wrap;
  word-break: break-word;
`

const AgentRow = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
  max-width: 100%;
`

const AgentText = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: pre-wrap;
  word-break: break-word;
`

const slideUp = keyframes`
  from { opacity: 0; transform: translateY(16px); }
  to   { opacity: 1; transform: translateY(0); }
`

const CardEntrance = styled.div<{ $delay: number; $span?: boolean }>`
  animation: ${slideUp} 0.35s ease both;
  animation-delay: ${({ $delay }) => $delay}s;
  ${({ $span }) => $span && `grid-column: 1 / -1;`}
`

// ── Generic fallback card (image type) ──────────────────────────────────────

const CardsGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  ${mq.mobile} {
    grid-template-columns: 1fr;
  }
`

const Card = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface.primary};
`

const CardImageWrap = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 4 / 3;
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
`

const CardBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
`

const CardDescription = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ── Work cards ───────────────────────────────────────────────────────────────

const WorkGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: ${({ theme }) => theme.spacing[4]};

  ${mq.mobile} {
    grid-template-columns: 1fr;
  }
`

const WorkCardEl = styled.div<{ $flagship: boolean }>`
  display: flex;
  flex-direction: column;
  height: 100%;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  ${({ $flagship, theme }) => $flagship && `border-left: ${FLAGSHIP_BORDER} solid ${theme.colors.surface.highlight};`}
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface.primary};
  text-decoration: none;
  transition: transform 0.15s ease, box-shadow 0.15s ease;

  &:is(a):hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.08);
  }
`

const WorkImageWrap = styled.div`
  position: relative;
  width: 100%;
  height: ${WORK_IMAGE_HEIGHT};
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
`

const WorkBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[4]};
`

const CardTagsRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[2]};
`

const CardTag = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const WorkTitle = styled.h4`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${WORK_TITLE_SIZE};
  color: ${({ theme }) => theme.colors.text.primary};
`

const HighlightPeriod = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

const WorkDescription = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${WORK_DESC_SIZE};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const VisitLink = styled.span`
  margin-top: auto;
  padding-top: ${({ theme }) => theme.spacing[2]};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.primary};
`

// ── Travel cards ─────────────────────────────────────────────────────────────

const TravelRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing[1]};
`

const TravelItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-shrink: 0;
  width: ${TRAVEL_PHOTO_SIZE};
`

const TravelPhotoWrap = styled.div`
  position: relative;
  width: ${TRAVEL_PHOTO_SIZE};
  height: ${TRAVEL_PHOTO_SIZE};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
`

const TravelCountry = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`

const TravelMeta = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ── Credit cards ─────────────────────────────────────────────────────────────

const CreditCardRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[4]};
  overflow-x: auto;
  padding-bottom: ${({ theme }) => theme.spacing[1]};
`

const CreditCardItemEl = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-shrink: 0;
  width: 160px;
`

const CreditCardImageWrap = styled.div`
  position: relative;
  width: 160px;
  aspect-ratio: ${CREDIT_CARD_ASPECT};
  border-radius: ${({ theme }) => theme.radii.md};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
`

const CreditCardName = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ── Stat cards ───────────────────────────────────────────────────────────────

const StatRow = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: ${({ theme }) => theme.spacing[8]};
`

const StatItem = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`

const StatValue = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme }) => theme.colors.text.highlight};
`

const StatLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
  text-transform: uppercase;
  color: ${({ theme }) => theme.colors.text.tertiary};
`

// ── Profile card ──────────────────────────────────────────────────────────────

const ProfileCardEl = styled.div`
  display: flex;
  flex-direction: column;
  max-width: 360px;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  background-color: ${({ theme }) => theme.colors.surface.primary};
`

const ProfileBanner = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 3 / 1;
  background-color: ${({ theme }) => theme.colors.surface.tertiary};
`

const ProfileBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  padding: ${({ theme }) => theme.spacing[4]};
`

const ProfileName = styled.h4`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.primary};
`

const ProfileRole = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const ProfileLocation = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

export default AgentMessage
