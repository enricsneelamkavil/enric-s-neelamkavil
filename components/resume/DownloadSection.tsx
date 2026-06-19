import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Constants ────────────────────────────────────────────────────────────────

const PDF_PATH = '/resume.pdf'
const LAST_UPDATED = 'June 2026'
const EMAIL = 'enricsneelamkavil@gmail.com'

// ─── Download arrow icon ──────────────────────────────────────────────────────

const DownloadArrow = () => (
  <svg width="10" height="10" viewBox="0 0 10 10" fill="none" aria-hidden>
    <path d="M5 1v6M2.5 5L5 7.5 7.5 5" stroke="white" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M1.5 9h7" stroke="white" strokeWidth="1.5" strokeLinecap="round" />
  </svg>
)

// ─── Component ────────────────────────────────────────────────────────────────

const DownloadSection = () => (
  <Section>
    <DownloadInfo>
      <InfoLabel>Take it with you</InfoLabel>
      <DownloadOptions>
        <Heading>
          Download the<Highlight> Resume</Highlight>.
        </Heading>
        <UpdateDate>Last updated {LAST_UPDATED}</UpdateDate>
      </DownloadOptions>
    </DownloadInfo>

    <ButtonRow>
      <DownloadBtn
        href={PDF_PATH}
        download="enric-s-neelamkavil-resume.pdf"
      >
        <BtnText>Download</BtnText>
        <IconPill>
          <DownloadArrow />
        </IconPill>
      </DownloadBtn>

      <EmailBtn href={`mailto:${EMAIL}`}>
        <BtnTextInverse>Email Enric</BtnTextInverse>
      </EmailBtn>
    </ButtonRow>
  </Section>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
  padding: ${({ theme }) => theme.spacing[12]};
  background: ${({ theme }) => theme.colors.surface.inverse};
  border-radius: ${({ theme }) => theme.radii.xl};

  ${mq.tablet} {
    max-width: none;
  }

  ${mq.mobile} {
    max-width: none;
    flex-direction: column;
    align-items: flex-start;
    gap: ${({ theme }) => theme.spacing[6]};
    padding: ${({ theme }) => theme.spacing[6]};
  }
`

// ── Download info (left / top) ─────────────────────────────────────────────────

const DownloadInfo = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
`

const InfoLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  white-space: nowrap;
`

const DownloadOptions = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const Heading = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  color: ${({ theme }) => theme.colors.text.inverse};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    white-space: normal;
  }
`

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

const UpdateDate = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

// ── Buttons (right / bottom) ───────────────────────────────────────────────────

const ButtonRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: 10px;
  flex-shrink: 0;
`

const BaseBtn = styled.a`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[6]};
  border-radius: ${({ theme }) => theme.radii.lg};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  text-decoration: none;
  cursor: pointer;
  transition: opacity 0.15s ease;

  &:hover { opacity: 0.8; }

  ${mq.mobile} {
    padding: ${({ theme }) => theme.spacing[3]} ${({ theme }) => theme.spacing[4]};
  }
`

const DownloadBtn = styled(BaseBtn)`
  background: ${({ theme }) => theme.colors.surface.tertiary};
  justify-content: center;
`

const EmailBtn = styled(BaseBtn)`
  background: ${({ theme }) => theme.colors.surface.inverse};
`

const BtnText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: 0.875rem; /* 14px — outside theme scale, per Figma mobile spec */
    line-height: 1.125rem;
  }
`

const BtnTextInverse = styled(BtnText)`
  color: ${({ theme }) => theme.colors.text.inverse};
`

const IconPill = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 18px;
  height: 18px;
  background: ${({ theme }) => theme.colors.icon.secondary};
  border-radius: 9px;

  ${mq.mobile} {
    width: 16px;
    height: 16px;
    border-radius: 9px;
  }
`

export default DownloadSection
