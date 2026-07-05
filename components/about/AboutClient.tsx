'use client'

import { useState, useCallback } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import { type TimelineEvent } from '@/lib/timeline'
import { useGlimm } from 'glimm/react'

// ── Shared ────────────────────────────────────────────────────────────────────
import SharedPageHeader from '@/components/shared/PageHeader'
import HeaderImage from '@/components/about/professional/HeaderImage'
import ModeTogglePill from '@/components/about/common/ModeTogglePill'

// ── Professional ──────────────────────────────────────────────────────────────
import AboutDescription from '@/components/about/common/AboutDescription'
import MyTools from '@/components/about/professional/MyTools'
import Journey from '@/components/about/professional/Journey'
import ProfessionalTimeline from '@/components/about/professional/ProfessionalTimeline'
import AwardShelf from '@/components/about/common/AwardShelf'

// ── Personal ──────────────────────────────────────────────────────────────────
import PersonalAboutDescription from '@/components/about/personal/PersonalAboutDescription'
import TravelSection from '@/components/about/personal/TravelSection'
import WorkDeskSection from '@/components/about/personal/WorkDeskSection'
import PodcastSection from '@/components/about/personal/PodcastSection'
import WritingSection from '@/components/about/personal/WritingSection'
import CreditCardsSection from '@/components/about/personal/CreditCardsSection'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'professional' | 'personal'

interface Props {
  timelineEvents: TimelineEvent[]
}

// ─── Component ────────────────────────────────────────────────────────────────

export default function AboutClient({ timelineEvents }: Props) {
  const [mode, setMode] = useState<Mode>('professional')
  const [snapping, setSnapping] = useState(false)
  const { sweep } = useGlimm()

  const handleModeChange = useCallback((newMode: Mode) => {
    sweep(() => {
      setSnapping(true)
      setMode(newMode)
      window.scrollTo({ top: 0, behavior: 'smooth' })
      setTimeout(() => setSnapping(false), 150)
    }, {
      palette: newMode === 'personal' ? 'ember' : 'prism',
      direction: newMode === 'personal' ? 'ltr' : 'rtl',
      sweepMs: 950,
      outroMs: 650,
    })
  }, [sweep])

  return (
    <PageSections>

      {/* Always-visible intro: page title + banner image */}
      <IntroBlock>
        <SharedPageHeader
          label="ABOUT"
          titleBefore=""
          titleMuted="two sides"
          titleAfter=" of one designer."
        />
        <HeaderImage mode={mode} />
      </IntroBlock>

      {/* Mode-specific content — grid stacks both groups; inactive fades out without layout shift */}
      <ModeContent $snapping={snapping}>

        {/* Professional */}
        <ModeGroup $active={mode === 'professional'} aria-hidden={mode !== 'professional'}>
          <AboutDescription />
          <MyTools />
          <Journey />
          <ProfessionalTimeline events={timelineEvents} />
          <AwardShelf />
        </ModeGroup>

        {/* Personal */}
        <ModeGroup $active={mode === 'personal'} aria-hidden={mode !== 'personal'}>
          <PersonalAboutDescription />
          <TravelSection />
          <WorkDeskSection />
          <PodcastSection />
          <WritingSection />
          <CreditCardsSection />
        </ModeGroup>

      </ModeContent>

      <BottomToggleWrapper>
        <ModeTogglePill mode={mode} onModeChange={handleModeChange} />
      </BottomToggleWrapper>

    </PageSections>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const PageSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 32px;

  ${mq.tablet} {
    gap: 24px;
  }

  ${mq.mobile} {
    gap: 24px;
  }
`

const IntroBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 8.75rem; /* 140px — below sticky navbar */
  gap: 32px;

  ${mq.tablet} {
    padding-top: 6rem;
    gap: 24px;
  }

  ${mq.mobile} {
    padding-top: 40px;
    gap: 24px;
  }
`

const ModeContent = styled.div<{ $snapping: boolean }>`
  position: relative;
  width: 100%;
  overflow: clip;
  transform: scale(${({ $snapping }) => ($snapping ? 0.98 : 1)});
  transition: transform 0.15s ease;
`

const ModeGroup = styled.div<{ $active: boolean }>`
  position: ${({ $active }) => ($active ? 'relative' : 'absolute')};
  top: 0;
  left: 0;
  width: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  padding-bottom: 62px;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  visibility: ${({ $active }) => ($active ? 'visible' : 'hidden')};
  transition: opacity 0.3s ease, visibility 0s linear ${({ $active }) => ($active ? '0s' : '0.3s')};

  ${mq.tablet} {
    gap: 64px;
    padding-bottom: 48px;
  }

  ${mq.mobile} {
    gap: 72px;
    padding-bottom: 48px;
  }
`

const BottomToggleWrapper = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  width: 100%;
  padding: 16px 0;
  position: relative;
  z-index: 1;
`
