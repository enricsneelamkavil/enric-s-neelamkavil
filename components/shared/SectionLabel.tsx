import styled from 'styled-components'

interface Props {
  children: React.ReactNode
}

const SectionLabel = ({ children }: Props) => {
  return <Label>{children}</Label>
}

const Label = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
`

export default SectionLabel
