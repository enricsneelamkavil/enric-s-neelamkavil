import styled from 'styled-components'
import { mq } from '@/styles/theme'

interface Props {
  children: React.ReactNode
}

const SectionLabel = ({ children }: Props) => (
  <Label>{children}</Label>
)

const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

export default SectionLabel
