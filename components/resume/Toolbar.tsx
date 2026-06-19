'use client'

import styled from 'styled-components'
import { mq } from '@/styles/theme'
import DiamondBullet from '@/components/shared/DiamondBullet'

// ─── PDF metadata constants ───────────────────────────────────────────────────

const FILE_NAME = 'enric-s-neelamkavil-resume.pdf'
const PAGE_COUNT = 1
const FILE_SIZE = '1.25 MB'
const PAPER_SIZE = 'A4'

// ─── Zoom bounds (controlled externally — see page.tsx) ──────────────────────

export const ZOOM_MIN = 50
export const ZOOM_MAX = 150
export const ZOOM_STEP = 10

// ─── Icon paths ───────────────────────────────────────────────────────────────

const ICON_PDF   = '/icons/pdf.svg'
const ICON_MINUS = '/icons/minus.svg'
const ICON_PLUS  = '/icons/add.svg'
const ICON_PRINT = '/icons/print.svg'

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
        <img src={ICON_PDF} width={16} height={16} alt="" aria-hidden />
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
            <img src={ICON_MINUS} width={16} height={16} alt="" aria-hidden />
          </ZoomBtn>
          <ZoomLabel aria-live="polite">{zoom}%</ZoomLabel>
          <ZoomBtn
            type="button"
            onClick={onZoomIn}
            disabled={zoom >= ZOOM_MAX}
            aria-label="Zoom in"
          >
            <img src={ICON_PLUS} width={16} height={16} alt="" aria-hidden />
          </ZoomBtn>
        </ZoomControl>

        <PrintBtn
          type="button"
          onClick={() => {
            const iframe = document.createElement('iframe')
            iframe.style.cssText = 'position:fixed;width:0;height:0;border:0;top:-100px'
            iframe.src = '/resume.pdf'
            document.body.appendChild(iframe)
            iframe.onload = () => iframe.contentWindow?.print()
          }}
          aria-label="Print resume"
        >
          <img src={ICON_PRINT} width={16} height={16} alt="" aria-hidden />
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
