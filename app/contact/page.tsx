'use client'

import styled from 'styled-components'
import { mq } from '@/styles/theme'

import PageHeader from '@/components/contact/PageHeader'
import MapSection from '@/components/contact/MapSection'
import EnquiryForm from '@/components/contact/EnquiryForm'
import Elsewhere from '@/components/contact/Elsewhere'

export default function Contact() {
  return (
    <PageSections>
      <PageHeader />

      <ContentColumn>
        <MapSection />
        <EnquiryForm />
      </ContentColumn>

      <FullWidth>
        <Elsewhere />
      </FullWidth>
    </PageSections>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const PageSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 120px;
  padding-top: 8.75rem; /* 140px — below fixed navbar */

  ${mq.tablet} {
    padding-top: 6rem;
    gap: ${({ theme }) => theme.spacing[10]};
  }

  ${mq.mobile} {
    padding-top: 40px;
    gap: 72px;
  }
`

/* Groups PageHeader + Map + EnquiryForm with the Figma-specified 80px gap
   between the header and the rest of the "Form" block */
const ContentColumn = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  gap: ${({ theme }) => theme.spacing[10]};

  ${mq.mobile} {
    gap: 72px;
  }
`

/* Elsewhere spans the full 1168px content width, its own section below the form */
const FullWidth = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
`
