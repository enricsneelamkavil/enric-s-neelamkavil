'use client'

import styled from 'styled-components'
import { mq } from '@/styles/theme'
import Landing from '@/components/home/Landing'
import AboutBrief from '@/components/home/AboutBrief'
import Interests from '@/components/home/Interests'
import FeatureProduct from '@/components/home/FeatureProduct'
import AwardShelf from '@/components/home/AwardShelf'
import MyWorks from '@/components/home/MyWorks'

export default function Home() {
  return (
    <PageSections>
      <Landing />
      <AboutBrief />
      <Interests />
      <FeatureProduct />
      <AwardShelf />
      <MyWorks />
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
    gap: 71px;
  }
`
