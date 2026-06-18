'use client'

import styled from 'styled-components'
import { mq } from '@/styles/theme'
import IntroSection from '@/components/about/IntroSection'
import ProfileImage from '@/components/about/ProfileImage'
import AboutDescription from '@/components/about/AboutDescription'
import MyTools from '@/components/about/MyTools'
import Journey from '@/components/about/Journey'
import ProfessionalTimeline from '@/components/about/ProfessionalTimeline'
import AwardShelf from '@/components/about/AwardShelf'

export default function About() {
  return (
    <PageSections>
      <LandingGroup>
        <IntroSection />
        <ProfileImage />
        <AboutDescription />
      </LandingGroup>
      <MyTools />
      <Journey />
      <ProfessionalTimeline />
      <AwardShelf />
    </PageSections>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const PageSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 62px;
  width: 100%;

  ${mq.tablet} {
    gap: 60px;
  }

  ${mq.mobile} {
    gap: 48px;
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
