import styled from 'styled-components'

interface Props {
  children: React.ReactNode
}

const SectionLabel = ({ children }: Props) => (
  <Label>{children}</Label>
)

const Label = styled.p`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.snug};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`

export default SectionLabel
