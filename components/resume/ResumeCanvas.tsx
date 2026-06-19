'use client'

import { useState, useEffect } from 'react'
import { Document, Page, pdfjs } from 'react-pdf'
import 'react-pdf/dist/Page/TextLayer.css'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── PDF.js worker ───────────────────────────────────────────────────────────

pdfjs.GlobalWorkerOptions.workerSrc = new URL(
  'pdfjs-dist/build/pdf.worker.min.mjs',
  import.meta.url,
).toString()

// ─── Figma layout constants ───────────────────────────────────────────────────
// Desktop canvas: node 282:801   PDF card: node 282:802
// Mobile  canvas: node 306:1617  PDF card: node 306:1618

const PDF_PATH         = '/resume.pdf'
const CARD_W           = 820    // PDF always renders at this width — zoom is CSS-only
const CARD_H           = 1160   // A4 at CARD_W — used for canvas height calculation
const CANVAS_PADDING_V = 80     // symmetric vertical inset inside canvas (desktop), px

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  zoom: number
}

// ─── Component ────────────────────────────────────────────────────────────────

const ResumeCanvas = ({ zoom }: Props) => {
  const [mobileWidth, setMobileWidth] = useState(0)

  useEffect(() => {
    const update = () => setMobileWidth(
      window.innerWidth <= 768 ? window.innerWidth - 80 : 0
    )
    update()
    window.addEventListener('resize', update)
    return () => window.removeEventListener('resize', update)
  }, [])

  // transform: scale() is purely visual — DOM layout stays at CARD_H px regardless of zoom.
  // Canvas height is set explicitly to match the visual size at each zoom level.
  const canvasHeight = Math.round(CANVAS_PADDING_V * 2 + CARD_H * (zoom / 100))

  return (
    <Canvas $height={canvasHeight}>
      <PdfCard $scale={zoom / 100}>
        <Document file={PDF_PATH} loading={<></>}>
          <Page
            pageNumber={1}
            width={mobileWidth > 0 ? mobileWidth : CARD_W}
            loading={<></>}
            renderTextLayer={true}
            renderAnnotationLayer={false}
          />
        </Document>
      </PdfCard>
    </Canvas>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

interface CanvasProps { $height: number }

const Canvas = styled.div<CanvasProps>`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  height: ${({ $height }) => $height}px;
  padding-top: ${CANVAS_PADDING_V}px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  overflow: hidden;

  ${mq.tablet} {
    max-width: none;
  }

  ${mq.mobile} {
    max-width: none;
    height: auto;
    padding: ${({ theme }) => theme.spacing[4]};
    align-items: center;
  }
`

interface CardProps { $scale: number }

const PdfCard = styled.div<CardProps>`
  flex-shrink: 0;
  border-radius: 12px;
  box-shadow: 0px 30px 60px -20px rgba(0, 0, 0, 0.25);
  background: white;
  overflow: hidden;
  transform: scale(${({ $scale }) => $scale});
  transform-origin: top center;
  transition: transform 0.2s ease;

  ${mq.mobile} {
    border-radius: 5px;
    box-shadow: 0px 12px 24px -8px rgba(0, 0, 0, 0.25);
    transform: none;
    transition: none;
  }
`

export default ResumeCanvas
