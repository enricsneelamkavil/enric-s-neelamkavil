'use client'

import { useState } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'

// ─── PDF.js worker ───────────────────────────────────────────────────────────
// Safe at module level — this file is only ever loaded client-side (ssr: false)

pdfjs.GlobalWorkerOptions.workerSrc = `https://unpkg.com/pdfjs-dist@${pdfjs.version}/build/pdf.worker.min.mjs`

// ─── Figma layout constants ───────────────────────────────────────────────────
// Desktop PDF card: 820×1160px — node 410:2119
// Mobile  PDF card: 300×424px  — node 411:1661

const PDF_PATH    = '/resume.pdf'
const CARD_W      = 820   // desktop render width (fixed)
const MOBILE_W    = 300   // mobile render width (fixed)
const RED_GLOW_DESKTOP = '0 0 250px 26px rgba(232, 52, 42, 0.15)'
const RED_GLOW_MOBILE  = '0 0 50px 5px rgba(232, 52, 42, 0.15)'

// ─── Component ────────────────────────────────────────────────────────────────

const ResumeCanvasClient = () => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Canvas>
      <Placeholder $loaded={loaded} aria-hidden="true" />
      <ContentLayer $loaded={loaded}>
        <Document
          file={PDF_PATH}
          loading={<></>}
          onLoadSuccess={() => setLoaded(true)}
          onError={(err) => console.error('PDF error:', err)}
        >
          <MobilePage pageNumber={1} width={MOBILE_W} loading={<></>} renderTextLayer={true} renderAnnotationLayer={false} />
          <DesktopPage pageNumber={1} width={CARD_W}  loading={<></>} renderTextLayer={true} renderAnnotationLayer={false} />
        </Document>
      </ContentLayer>
    </Canvas>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

// Fixed-aspect box reserves the card's final footprint up front — Placeholder and
// ContentLayer are absolutely stacked inside it, so nothing jumps when the PDF loads.
const Canvas = styled.div`
  position: relative;
  flex-shrink: 0;
  width: ${CARD_W}px;
  aspect-ratio: 820 / 1160;
  border-radius: 12px;
  overflow: hidden;
  box-shadow: ${RED_GLOW_DESKTOP};

  ${mq.mobile} {
    width: ${MOBILE_W}px;
    border-radius: 8px;
    box-shadow: ${RED_GLOW_MOBILE};
  }
`

const pulse = keyframes`
  0%, 100% { opacity: 0.6; }
  50% { opacity: 1; }
`

const Placeholder = styled.div<{ $loaded: boolean }>`
  position: absolute;
  inset: 0;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  animation: ${pulse} 1.8s ease-in-out infinite;
  opacity: ${({ $loaded }) => ($loaded ? 0 : 1)};
  transition: opacity 0.4s ease;
  pointer-events: none;
`

const ContentLayer = styled.div<{ $loaded: boolean }>`
  position: absolute;
  inset: 0;
  background: white;
  opacity: ${({ $loaded }) => ($loaded ? 1 : 0)};
  transition: opacity 0.4s ease;
`

// Two separate Page instances — desktop hides on mobile, mobile hides on desktop.
// Avoids a window.innerWidth resize listener while keeping correct render widths.

const DesktopPage = styled(Page)`
  ${mq.mobile} {
    display: none;
  }
`

const MobilePage = styled(Page)`
  display: none;

  ${mq.mobile} {
    display: block;
  }
`

export default ResumeCanvasClient
