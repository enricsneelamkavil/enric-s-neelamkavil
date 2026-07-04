import styled from 'styled-components'
import { mq } from '@/styles/theme'

const HeaderImage = () => (
  <Wrapper>
    <Photo src="/about/professional/header.webp" alt="" aria-hidden />
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
  height: auto;
  display: block;
`

export default HeaderImage
