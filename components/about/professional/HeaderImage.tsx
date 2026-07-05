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

  ${mq.tabletDown} {
    width: 100%;
  }
`

const Photo = styled.img`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
`

export default HeaderImage
