'use client'

import styled from 'styled-components'
import { mq } from '@/styles/theme'

import PageHeader from '@/components/contact/PageHeader'
import EnquiryForm from '@/components/contact/EnquiryForm'
import DirectContact from '@/components/contact/DirectContact'
import Elsewhere from '@/components/contact/Elsewhere'
import EmailFallback from '@/components/contact/EmailFallback'

export default function Contact() {
  return (
    <PageSections>
      <FormGroup>
        <PageHeader />

        <TwoCol>
          <LeftCol>
            <EnquiryForm />
          </LeftCol>
          <Divider />
          <RightCol>
            <DirectContact />
            <Elsewhere />
          </RightCol>
        </TwoCol>
      </FormGroup>

      <FullWidth>
        <EmailFallback />
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

/* Groups PageHeader + TwoCol with the Figma-specified 80px gap between them */
const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: 80px;

  ${mq.tabletDown} {
    gap: ${({ theme }) => theme.spacing[10]};
  }

  ${mq.mobile} {
    gap: 32px;
  }
`

/* Two-column layout: form left (flex-1), info cards right (500px fixed) */
const TwoCol = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: flex-start;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tabletDown} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[6]};
  }

  ${mq.mobile} {
    gap: 72px;
  }
`

/* Sticky form — sticks inside the scroll while right col scrolls past */
const LeftCol = styled.div`
  flex: 1 0 0;
  min-width: 0;
  position: sticky;
  top: 80px;
  align-self: flex-start;
  max-height: calc(100vh - 80px);
  overflow-y: auto;

  ${mq.tabletDown} {
    position: static;
    flex: none;
    width: 100%;
    max-height: none;
    overflow-y: visible;
  }
`

/* 1px vertical line between form and right col — Figma node 374:1112 */
const Divider = styled.div`
  width: 1px;
  height: 560px;
  flex-shrink: 0;
  align-self: flex-start;
  background: ${({ theme }) => theme.colors.border.tertiary};

  ${mq.tabletDown} {
    display: none;
  }
`

/* Right column: DirectContact + Elsewhere, gap 24px */
const RightCol = styled.div`
  width: 500px;
  flex-shrink: 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[6]};

  ${mq.tabletDown} {
    width: 100%;
  }

  ${mq.mobile} {
    gap: 72px;
  }
`

/* EmailFallback spans the full 1168px content width below the two-col */
const FullWidth = styled.div`
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
`
