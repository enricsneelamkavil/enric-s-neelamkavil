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
// Loading skeleton: node 744:1670 "Shimmer / Loader" — desktop-authored only;
// mobile is the same layout scaled down by MOBILE_SCALE (no separate mobile spec in Figma).

const PDF_PATH    = '/resume.pdf'
const CARD_W      = 820   // desktop render width (fixed)
const MOBILE_W    = 300   // mobile render width (fixed)
const MOBILE_SCALE = MOBILE_W / CARD_W
const RED_GLOW_DESKTOP = '0 0 250px 26px rgba(232, 52, 42, 0.15)'
const RED_GLOW_MOBILE  = '0 0 50px 5px rgba(232, 52, 42, 0.15)'

// Number of entry "groups" (subtitle + 2 detail lines) per resume section —
// mirrors the real content: Education, Achievements, Experience, Contributions, Volunteering
const SECTION_GROUP_COUNTS = [1, 3, 2, 2, 2]

// ─── Component ────────────────────────────────────────────────────────────────

const ResumeCanvasClient = () => {
  const [loaded, setLoaded] = useState(false)

  return (
    <Canvas>
      <Skeleton $loaded={loaded} aria-hidden="true">
        <HeaderRow>
          <TitleCol>
            <Bar $w={394} $h={32} />
            <SubtitleRow>
              <Bar $w={219} $h={16} />
              <Bar $w={167} $h={16} />
            </SubtitleRow>
          </TitleCol>
          <MenuCol>
            <Bar $w={162} $h={10} />
            <Bar $w={162} $h={10} />
            <Bar $w={162} $h={10} />
          </MenuCol>
        </HeaderRow>

        {SECTION_GROUP_COUNTS.map((groupCount, i) => (
          <SectionBlock key={i}>
            <Bar $w={102} $h={24} />
            {Array.from({ length: groupCount }).map((_, gi) => (
              <Group key={gi}>
                <Bar $w={243} $h={16} />
                <Details>
                  <Bar $w={476} $h={10} />
                  <Bar $w={181} $h={10} />
                </Details>
              </Group>
            ))}
          </SectionBlock>
        ))}
      </Skeleton>
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

// Fixed-aspect box reserves the card's final footprint up front — Skeleton and
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

const shimmer = keyframes`
  0% { background-position: -200% 0; }
  100% { background-position: 200% 0; }
`

// 820px-wide, top-left anchored — scaled down bodily via transform on mobile
// (MOBILE_SCALE = 300/820) rather than re-authoring every bar at a second size.
const Skeleton = styled.div<{ $loaded: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  width: ${CARD_W}px;
  transform-origin: top left;
  display: flex;
  flex-direction: column;
  gap: 40px;
  padding: 42px 62px;
  background: white;
  border-radius: 12px;
  opacity: ${({ $loaded }) => ($loaded ? 0 : 1)};
  transition: opacity 0.4s ease;
  pointer-events: none;

  ${mq.mobile} {
    transform: scale(${MOBILE_SCALE});
  }
`

const Bar = styled.div<{ $w: number; $h: number }>`
  flex-shrink: 0;
  width: ${({ $w }) => $w}px;
  height: ${({ $h }) => $h}px;
  border-radius: 4px;
  background: linear-gradient(
    90deg,
    rgba(232, 52, 42, 0.08) 0%,
    rgba(232, 52, 42, 0.15) 50%,
    rgba(232, 52, 42, 0.08) 100%
  );
  background-size: 200% 100%;
  animation: ${shimmer} 2s ease-in-out infinite;
`

const HeaderRow = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  width: 100%;
`

const TitleCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 394px;
`

const SubtitleRow = styled.div`
  display: flex;
  align-items: center;
  gap: 8px;
`

const MenuCol = styled.div`
  display: flex;
  flex-direction: column;
  gap: 8px;
  width: 162px;
`

const SectionBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: 18px;
  width: 100%;
`

const Group = styled.div`
  display: flex;
  flex-direction: column;
  gap: 12px;
  width: 100%;
`

const Details = styled.div`
  display: flex;
  flex-direction: column;
  gap: 4px;
  width: 100%;
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
