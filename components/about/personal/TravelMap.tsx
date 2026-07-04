import dynamic from 'next/dynamic'
import styled from 'styled-components'

const TravelMapClient = dynamic(
  () => import('./TravelMapClient'),
  {
    ssr: false,
    loading: () => <Placeholder />,
  }
)

const TravelMap = () => <TravelMapClient />

const Placeholder = styled.div`
  width: 100%;
  max-width: 1168px;
  height: 522px;
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii['3xl']};
  flex-shrink: 0;
`

export default TravelMap
