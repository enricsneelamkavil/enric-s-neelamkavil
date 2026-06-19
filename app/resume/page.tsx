'use client'

import { useState } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import PageHeader from '@/components/resume/PageHeader'
import Toolbar, { ZOOM_MIN, ZOOM_MAX, ZOOM_STEP } from '@/components/resume/Toolbar'
import ResumeCanvas from '@/components/resume/ResumeCanvas'
import DownloadSection from '@/components/resume/DownloadSection'

export const dynamic = 'force-dynamic'

export default function Resume() {
  const [zoom, setZoom] = useState(100)

  const zoomIn  = () => setZoom(z => Math.min(z + ZOOM_STEP, ZOOM_MAX))
  const zoomOut = () => setZoom(z => Math.max(z - ZOOM_STEP, ZOOM_MIN))

  return (
    <PageSections>
      <HeaderGroup>
        <PageHeader />
        <DetailsGroup>
          <Toolbar zoom={zoom} onZoomIn={zoomIn} onZoomOut={zoomOut} />
          <ResumeCanvas zoom={zoom} />
          <DownloadSection />
        </DetailsGroup>
      </HeaderGroup>
    </PageSections>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const PageSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 8.75rem; /* 140px — Figma: Content top offset below sticky navbar */

  ${mq.tablet} {
    padding-top: 6rem;
  }

  ${mq.mobile} {
    padding-top: 40px;
  }
`

// 80px gap between PageHeader and the toolbar/canvas/download group (Figma: Resume Header gap)
const HeaderGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[20]};
  width: 100%;

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[6]};
  }
`

// 40px gap between Toolbar, ResumeCanvas, and DownloadSection (Figma: Resume Details gap)
const DetailsGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[8]};
  }
`
