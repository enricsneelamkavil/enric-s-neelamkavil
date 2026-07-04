import styled from 'styled-components'
import { mq } from '@/styles/theme'

interface Props {
  label: string
  titleBefore: string
  titleMuted: string
  titleAfter?: string
  subtitle?: string
  action?: React.ReactNode
}

const PageHeader = ({ label, titleBefore, titleMuted, titleAfter, subtitle, action }: Props) => (
  <Wrapper>
    <HeaderBlock>
      <LabelRow>
        <svg width="12" height="12" viewBox="0 0 12 12" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
            <defs>
              <linearGradient id="agentIconGradient" x1="9.8652" y1="0.782859" x2="4.66194" y2="13.4536" gradientUnits="userSpaceOnUse">
                <stop stopColor="#EC6AA8" />
                <stop offset="0.502906" stopColor="#E8342A" />
                <stop offset="1" stopColor="#FFCC00" />
              </linearGradient>
            </defs>
            <path d="M2.51031 2.184C5.20572 -0.372955 8.95362 -0.737438 10.8815 1.36995C11.9219 2.50745 12.2175 4.13217 11.8472 5.78921C6.62995 5.78238 7.09531 3.12186 7.27475 2.27564C7.30301 2.1424 7.22123 2.02817 7.08954 2.00378C6.93688 1.97557 6.79123 2.082 6.76336 2.23746C6.15002 5.65898 4.66679 5.95853 2.19613 5.80448C2.07595 5.79699 1.9678 5.8805 1.94418 6.00074C1.91699 6.13982 2.01226 6.27293 2.14964 6.29628C4.7001 6.72989 4.94315 8.58721 4.7838 9.7205C4.76509 9.8536 4.84244 9.98361 4.96976 10.0191C5.11667 10.0599 5.26562 9.9555 5.28844 9.80221C5.92129 5.52558 8.6257 6.25686 11.7265 6.25733C11.3508 7.51607 10.595 8.76879 9.49126 9.81596C6.79584 12.373 3.04797 12.7374 1.12012 10.63C-0.807622 8.52253 -0.185062 4.74112 2.51031 2.184Z" fill="url(#agentIconGradient)" fillOpacity="0.8" />
          </svg>
        <LabelText>{label}</LabelText>
      </LabelRow>
      <Title>
        <span>{titleBefore}</span>
        <Muted>{titleMuted}</Muted>
        {titleAfter && <span>{titleAfter}</span>}
      </Title>
    </HeaderBlock>
    {subtitle && <Subtitle>{subtitle}</Subtitle>}
    {action && action}
  </Wrapper>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  text-align: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[6]};

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[8]};
  }
`

const HeaderBlock = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[3]};
`

const LabelRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`

const LabelText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

const Title = styled.h1`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  line-height: 3.5rem; /* 56px — Figma, between theme tokens */
  letter-spacing: ${({ theme }) => theme.letterSpacings.tightest};
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    line-height: ${({ theme }) => theme.lineHeights.loose};
  }
`

const Muted = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

const Subtitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
  max-width: 408px;

  ${mq.mobile} {
    max-width: 320px;
  }
`

export default PageHeader
