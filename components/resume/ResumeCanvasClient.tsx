'use client'

import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import styled from 'styled-components'
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

// ─── Component ────────────────────────────────────────────────────────────────

const ResumeCanvasClient = () => (
  <PdfCard>
    <Document
      file={PDF_PATH}
      loading={<></>}
      onError={(err) => console.error('PDF error:', err)}
    >
      <MobilePage pageNumber={1} width={MOBILE_W} loading={<></>} renderTextLayer={true} renderAnnotationLayer={false} />
      <DesktopPage pageNumber={1} width={CARD_W}  loading={<></>} renderTextLayer={true} renderAnnotationLayer={false} />
    </Document>
  </PdfCard>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const PdfCard = styled.div`
  flex-shrink: 0;
  border-radius: 12px;
  box-shadow: 0 0 250px 26px rgba(232, 52, 42, 0.15);
  background: white;
  overflow: hidden;

  ${mq.mobile} {
    border-radius: 8px;
    box-shadow: 0 0 50px 5px rgba(232, 52, 42, 0.15);
  }
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
