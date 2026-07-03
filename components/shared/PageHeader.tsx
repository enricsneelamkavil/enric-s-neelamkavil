import styled from 'styled-components'
import { mq } from '@/styles/theme'

interface Props {
  label: string
  titleBefore: string
  titleMuted: string
  titleAfter?: string
  subtitle: string
  action?: React.ReactNode
}

const PageHeader = ({ label, titleBefore, titleMuted, titleAfter, subtitle, action }: Props) => (
  <Wrapper>
    <HeaderBlock>
      <LabelRow>
        <img src="/icons/page-dot.svg" width={12} height={12} alt="" aria-hidden />
        <LabelText>{label}</LabelText>
      </LabelRow>
      <Title>
        <span>{titleBefore}</span>
        <Muted>{titleMuted}</Muted>
        {titleAfter && <span>{titleAfter}</span>}
      </Title>
    </HeaderBlock>
    <Subtitle>{subtitle}</Subtitle>
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
