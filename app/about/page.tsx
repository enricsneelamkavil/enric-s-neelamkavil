'use client'

import styled from 'styled-components'
import { mq } from '@/styles/theme'
import IntroSection from '@/components/about/IntroSection'
import ProfileImage from '@/components/about/ProfileImage'
import AboutDescription from '@/components/about/AboutDescription'
import MyTools from '@/components/about/MyTools'
import Companies from '@/components/about/Companies'
import AwardShelf from '@/components/about/AwardShelf'
import Journey from '@/components/about/Journey'

export default function About() {
  return (
    <PageSections>
      {/* First 3 sections share an 80px gap (Figma "Landing" sub-frame) */}
      <LandingGroup>
        <IntroSection />
        <ProfileImage />
        <AboutDescription />
      </LandingGroup>

      {/* Remaining sections: 62px gap (Figma Content auto-layout gap = 62.4px) */}
      <MyTools />
      <Journey />
      <Companies />
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
  padding-bottom: 0;

  ${mq.tablet} {
    gap: 60px;
  }

  ${mq.mobile} {
    gap: 48px;
  }
`

// First 3 sections (Intro + Profile + AboutDesc) use 80px gap between them,
// matching the Figma "Landing" sub-frame's auto-layout gap.
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
