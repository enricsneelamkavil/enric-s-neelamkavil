'use client'

import styled from 'styled-components'
import { mq } from '@/styles/theme'
import PageHeader from '@/components/resume/PageHeader'
import ResumeCanvas from '@/components/resume/ResumeCanvas'

export const dynamic = 'force-dynamic'

export default function Resume() {
  return (
    <PageSections>
      <ResumeHeader>
        <PageHeader />
        <ResumeCanvas />
      </ResumeHeader>
    </PageSections>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const PageSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 8.75rem; /* 140px — below sticky navbar */

  ${mq.tablet} {
    padding-top: 6rem;
  }

  ${mq.mobile} {
    padding-top: 40px;
  }
`

// 80px gap between PageHeader block and PDF card; 80px bottom padding keeps
// space between the card and the footer (Figma: Resume Header pb-[80px])
const ResumeHeader = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[20]};
  padding-bottom: ${({ theme }) => theme.spacing[20]};
  width: 100%;

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[10]};
    padding-bottom: ${({ theme }) => theme.spacing[8]};
  }
`
