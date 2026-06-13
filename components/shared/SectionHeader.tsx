import styled from 'styled-components'

interface Props {
  /** Text before the muted word — rendered in text.primary */
  before?: string
  /** The de-emphasised word or phrase — rendered in text.secondary */
  muted: string
  /** Text after the muted word — rendered in text.primary. Include the trailing "." here. */
  after?: string
}

const SectionHeader = ({ before, muted, after = '.' }: Props) => {
  return (
    <Heading>
      {before}
      <Muted>{muted}</Muted>
      {after}
    </Heading>
  )
}

const Heading = styled.h2`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: ${({ theme }) => theme.lineHeights.loose};
  letter-spacing: ${({ theme }) => theme.letterSpacings.tight};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Muted = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
`

export default SectionHeader
