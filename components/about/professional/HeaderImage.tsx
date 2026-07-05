import Image from 'next/image'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

interface Props {
  mode: 'professional' | 'personal'
}

const PHOTO = {
  professional: '/about/professional/header.webp',
  personal: '/about/personal/header.webp',
}

// Native photo dims (both mode photos share this size) — used for Next/Image's
// intrinsic sizing; CSS below still controls the actual rendered size.
const PHOTO_W = 1900
const PHOTO_H = 469

const HeaderImage = ({ mode }: Props) => (
  <Wrapper>
    <Photo src={PHOTO[mode]} alt="" aria-hidden width={PHOTO_W} height={PHOTO_H} priority sizes="100vw" />
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

const Photo = styled(Image)`
  width: 100%;
  height: auto;
  display: block;
  object-fit: contain;
`

export default HeaderImage
