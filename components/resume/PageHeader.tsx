import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SharedPageHeader from '@/components/shared/PageHeader'

const PDF_PATH = '/resume.pdf'

const PageHeader = () => (
  <SharedPageHeader
    label="RESUME"
    titleBefore="sure, let's keep it "
    titleMuted="formal"
    subtitle="For recruiters, hiring managers, and anyone who prefers the short version."
    action={
      <DownloadBtn href={PDF_PATH} download="enric-s-neelamkavil-resume.pdf">
        <BtnText>Download</BtnText>
        <DownloadIcon src="/icons/download.svg" alt="" aria-hidden width={18} height={18} />
      </DownloadBtn>
    }
  />
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const DownloadBtn = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  background: ${({ theme }) => theme.colors.surface.inverse};
  border-radius: ${({ theme }) => theme.radii.lg};
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.15s ease;
  flex-shrink: 0;

  &:hover {
    opacity: 0.85;
  }

  ${mq.mobile} {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
    border-radius: ${({ theme }) => theme.radii.md};
  }
`

const BtnText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.inverse};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: 0.875rem; /* 14px — between theme tokens, Figma mobile spec */
    line-height: 1.125rem;
  }
`

const DownloadIcon = styled.img`
  display: block;
  flex-shrink: 0;
  /* /icons/ SVGs default to text.secondary (#5C5C5C) — invert to white for this dark button */
  filter: brightness(0) invert(1);
`

export default PageHeader
