'use client'

import styled from 'styled-components'
import { mq } from '@/styles/theme'
import DiamondBullet from '@/components/shared/DiamondBullet'

// ─── PDF metadata constants ───────────────────────────────────────────────────

const FILE_NAME   = 'enric-neelamkavil-resume.pdf'
const PAGE_COUNT  = 1
const FILE_SIZE   = '~200 KB'
const PAPER_SIZE  = 'A4'

// ─── Zoom bounds (controlled externally — see page.tsx) ──────────────────────

export const ZOOM_MIN  = 50
export const ZOOM_MAX  = 150
export const ZOOM_STEP = 10

// ─── Inline SVG icons ─────────────────────────────────────────────────────────

const PdfIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M3 2.5A1.5 1.5 0 014.5 1H9l4 4v8.5A1.5 1.5 0 0111.5 15h-7A1.5 1.5 0 013 13.5V2.5z"
      stroke="currentColor" strokeWidth="1.25" strokeLinejoin="round"/>
    <path d="M9 1v3.5A.5.5 0 009.5 5H13" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
  </svg>
)

const MinusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const PlusIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M8 4v8M4 8h8" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
  </svg>
)

const PrintIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" aria-hidden>
    <path d="M5 6V3.5A.5.5 0 015.5 3h5a.5.5 0 01.5.5V6" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    <rect x="2.5" y="6" width="11" height="7" rx="1" stroke="currentColor" strokeWidth="1.25"/>
    <path d="M5 10h6M5 12h4" stroke="currentColor" strokeWidth="1.25" strokeLinecap="round"/>
    <circle cx="12" cy="8.5" r="0.75" fill="currentColor"/>
  </svg>
)

// ─── Props ────────────────────────────────────────────────────────────────────

interface Props {
  zoom: number
  onZoomIn: () => void
  onZoomOut: () => void
}

// ─── Component ────────────────────────────────────────────────────────────────

const Toolbar = ({ zoom, onZoomIn, onZoomOut }: Props) => (
  <Container>
    <FileInfo>
      <PdfIconBox>
        <PdfIcon />
      </PdfIconBox>
      <FileMeta>
        <FileName>{FILE_NAME}</FileName>
        <FileDetails>
          <MetaText>{PAGE_COUNT} page</MetaText>
          <DiamondBullet size={6} />
          <MetaText>{FILE_SIZE}</MetaText>
          <DiamondBullet size={6} />
          <MetaText>{PAPER_SIZE}</MetaText>
        </FileDetails>
      </FileMeta>
    </FileInfo>

    <Controls>
      <ControlsBox>
        <ZoomControl>
          <ZoomBtn
            type="button"
            onClick={onZoomOut}
            disabled={zoom <= ZOOM_MIN}
            aria-label="Zoom out"
          >
            <MinusIcon />
          </ZoomBtn>
          <ZoomLabel aria-live="polite">{zoom}%</ZoomLabel>
          <ZoomBtn
            type="button"
            onClick={onZoomIn}
            disabled={zoom >= ZOOM_MAX}
            aria-label="Zoom in"
          >
            <PlusIcon />
          </ZoomBtn>
        </ZoomControl>

        <PrintBtn
          type="button"
          onClick={() => window.print()}
          aria-label="Print resume"
        >
          <PrintIcon />
        </PrintBtn>
      </ControlsBox>
    </Controls>
  </Container>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Container = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: 880px;
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};

  ${mq.mobile} {
    padding: ${({ theme }) => theme.spacing[3]};
    max-width: none;
  }
`

// ── File info ─────────────────────────────────────────────────────────────────

const FileInfo = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`

const PdfIconBox = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  padding: ${({ theme }) => theme.spacing[3]};
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.md};
  color: ${({ theme }) => theme.colors.icon.secondary};
  box-sizing: border-box;
`

const FileMeta = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const FileName = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

const FileDetails = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`

const MetaText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
  white-space: nowrap;
`

// ── Controls (desktop only) ───────────────────────────────────────────────────

const Controls = styled.div`
  display: flex;
  align-items: center;
  flex-shrink: 0;

  ${mq.mobile} {
    display: none;
  }
`

const ControlsBox = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[4]};
  padding: ${({ theme }) => theme.spacing[2]} ${({ theme }) => theme.spacing[4]};
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border-radius: ${({ theme }) => theme.radii.md};
`

const ZoomControl = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`

const ZoomBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.icon.primary};
  transition: opacity 0.15s ease;

  &:disabled {
    opacity: 0.3;
    cursor: default;
  }
`

const ZoomLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
  width: 33px;
`

const PrintBtn = styled.button`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 16px;
  height: 16px;
  padding: 0;
  background: none;
  border: none;
  cursor: pointer;
  color: ${({ theme }) => theme.colors.icon.primary};
  transition: opacity 0.15s ease;

  &:hover {
    opacity: 0.6;
  }
`

export default Toolbar
