import styled from 'styled-components'

interface Props {
  children: React.ReactNode
}

const SectionLabel = ({ children }: Props) => {
  return (
    <Container>
      <Item>
        <Typography>{children}</Typography>
      </Item>
    </Container>
  )
}

const Container = styled.div`
  display: inline-flex;
  padding: 6px;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  background: ${({ theme }) => theme.colors.surface.tertiary};
`

const Item = styled.div`
  display: flex;
  padding: 4px 10px;
  justify-content: center;
  align-items: center;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ theme }) => theme.colors.surface.inverse};
`

const Typography = styled.span`
  color: ${({ theme }) => theme.colors.text.inverse};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  font-style: normal;
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  line-height: ${({ theme }) => theme.lineHeights.snug};
  text-transform: uppercase;
`

export default SectionLabel
