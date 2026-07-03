import styled from 'styled-components'
import { mq } from '@/styles/theme'

const MASK_PATH = '/about/header-mask.svg'
const PHOTO_PATH = '/about/header-banner.jpg'

const HeaderImage = () => (
  <Wrapper>
    <MaskedInner>
      <Photo src={PHOTO_PATH} alt="" aria-hidden />
    </MaskedInner>
  </Wrapper>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  width: 1134px;
  flex-shrink: 0;

  ${mq.tabletDown} {
    width: 100%;
  }
`

const MaskedInner = styled.div`
  position: relative;
  width: 100%;
  aspect-ratio: 1134 / 293;
  overflow: hidden;
  mask-image: url('${MASK_PATH}');
  mask-size: 100% 100%;
  mask-repeat: no-repeat;
  mask-mode: alpha;
  -webkit-mask-image: url('${MASK_PATH}');
  -webkit-mask-size: 100% 100%;
  -webkit-mask-repeat: no-repeat;
`

const Photo = styled.img`
  position: absolute;
  inset: 0;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center;
  display: block;
  pointer-events: none;
  user-select: none;
`

export default HeaderImage
