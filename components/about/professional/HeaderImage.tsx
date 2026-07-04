import styled from 'styled-components'
import { mq } from '@/styles/theme'

interface Props {
  mode: 'professional' | 'personal'
}

const PHOTO = {
  professional: '/about/professional/header.webp',
  personal: '/about/personal/header.webp',
}

const HeaderImage = ({ mode }: Props) => (
  <Wrapper>
    <Photo src={PHOTO[mode]} alt="" aria-hidden />
  </Wrapper>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  width: 1134px;
  flex-shrink: 0;
  aspect-ratio: 1134 / 293;
  overflow: hidden;

  ${mq.tabletDown} {
    width: 100%;
  }
`

const Photo = styled.img`
  width: 100%;
  height: 100%;
  display: block;
  object-fit: cover;
`

export default HeaderImage
