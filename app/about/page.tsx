'use client'

import styled from 'styled-components'
import { mq } from '@/styles/theme'
import IntroSection from '@/components/about/IntroSection'
import ProfileImage from '@/components/about/ProfileImage'
import AboutDescription from '@/components/about/AboutDescription'
import MyTools from '@/components/about/MyTools'
import Companies from '@/components/about/Companies'
import AwardShelf from '@/components/about/AwardShelf'

export default function About() {
  return (
    <PageSections>
      <IntroSection />
      <ProfileImage />
      <AboutDescription />
      <MyTools />
      <Companies />
      <AwardShelf />
    </PageSections>
  )
}

const PageSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[30]};
  width: 100%;
  padding-bottom: 0;

  ${mq.tablet} {
    gap: 80px;
  }

  ${mq.mobile} {
    gap: 72px;
  }
`
