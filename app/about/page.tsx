'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ── Shared ────────────────────────────────────────────────────────────────────
import IntroSection from '@/components/about/IntroSection'
import ProfileImage from '@/components/about/ProfileImage'

// ── Professional ──────────────────────────────────────────────────────────────
import AboutDescription from '@/components/about/AboutDescription'
import MyTools from '@/components/about/MyTools'
import Journey from '@/components/about/Journey'
import ProfessionalTimeline from '@/components/about/ProfessionalTimeline'
import ProfessionalTimelineMobile from '@/components/about/ProfessionalTimelineMobile'
import AwardShelf from '@/components/about/AwardShelf'

// ── Personal ──────────────────────────────────────────────────────────────────
import PersonalAboutDescription from '@/components/about/PersonalAboutDescription'
import TravelSection from '@/components/about/TravelSection'
import WorkDeskSection from '@/components/about/WorkDeskSection'
import PodcastMediumSection from '@/components/about/PodcastMediumSection'
import CreditCardsSection from '@/components/about/CreditCardsSection'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'professional' | 'personal'

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function About() {
  const [mode, setMode] = useState<Mode>('professional')

  return (
    <PageSections>
      {/* Mode toggle — always visible, sits above both content groups */}
      <IntroSection mode={mode} onModeChange={setMode} />

      {/* Mode-specific content — both always in DOM, inactive collapses to height 0 */}
      <ModeContent>

        {/* Professional */}
        <ModeGroup $active={mode === 'professional'} aria-hidden={mode !== 'professional'}>
          <LandingGroup>
            <ProfileImage mode="professional" />
            <AboutDescription />
          </LandingGroup>
          <MyTools />
          <Journey />
          <DesktopTimeline>
            <ProfessionalTimeline />
          </DesktopTimeline>
          <MobileTimeline>
            <ProfessionalTimelineMobile />
          </MobileTimeline>
          <AwardShelf />
        </ModeGroup>

        {/* Personal */}
        <ModeGroup $active={mode === 'personal'} aria-hidden={mode !== 'personal'}>
          <LandingGroup>
            <ProfileImage mode="personal" />
            <PersonalAboutDescription />
          </LandingGroup>
          <TravelSection />
          <WorkDeskSection />
          <PodcastMediumSection />
          <CreditCardsSection />
        </ModeGroup>

      </ModeContent>
    </PageSections>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const PageSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 80px;

  ${mq.tablet} {
    gap: 64px;
  }

  ${mq.mobile} {
    gap: 56px;
  }
`

// Establishes position:relative context so inactive ModeGroup can be
// position:absolute without disrupting the outer page flow.
const ModeContent = styled.div`
  position: relative;
  width: 100%;
`

const ModeGroup = styled.div<{ $active: boolean }>`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 62px;
  width: 100%;
  padding-bottom: 62px;
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};
  transition: opacity 0.3s ease;

  /* Inactive: pull out of layout flow so it takes no height */
  ${({ $active }) => !$active && `
    position: absolute;
    top: 0;
    left: 0;
    right: 0;
    max-height: 0;
    overflow: hidden;
  `}

  ${mq.tablet} {
    gap: 60px;
    padding-bottom: 60px;
  }

  ${mq.mobile} {
    gap: 48px;
    padding-bottom: 48px;
  }
`

const LandingGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 80px;
  width: 100%;

  ${mq.tablet} {
    gap: 64px;
  }

  ${mq.mobile} {
    gap: 56px;
  }
`

const DesktopTimeline = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;

  ${mq.mobile} {
    display: none;
  }
`

const MobileTimeline = styled.div`
  display: none;

  ${mq.mobile} {
    display: block;
    width: 100%;
  }
`
