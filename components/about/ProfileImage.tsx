import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Assets ───────────────────────────────────────────────────────────────────

const IMG_PHOTO = '/about/profile-group.png'
const ICON_1    = '/about/icons/Icon 1.svg'
const ICON_2    = '/about/icons/Icon 2.svg'
const ICON_3    = '/about/icons/Icon 3.svg'
const ICON_4    = '/about/icons/Icon 4.svg'
const ICON_5    = '/about/icons/Icon 5.svg'
const ICON_6    = '/about/icons/Icon 6.svg'

// ─── Component ────────────────────────────────────────────────────────────────

const ProfileImage = () => (
  <Section>
    <Banner>

      {/* Photo group — centered within the 1168px banner via PhotoCenter */}
      <PhotoCenter>
        <PhotoGroup>
          <CirclePhoto src={IMG_PHOTO} alt="Enric S Neelamkavil" />
        </PhotoGroup>
      </PhotoCenter>

      {/* Icon 1 — far left, bottom, +12.94° */}
      <IconBox $l={29.76} $t={331.64} $w={79.475} $h={84.73} $r={12.94}>
        <IconImg src={ICON_1} alt="" aria-hidden="true" $iw={65} $ih={72} />
      </IconBox>

      {/* Icon 2 — upper-left, -12.29° */}
      <IconBox $l={95.57} $t={41.12} $w={84.862} $h={81.939} $r={-12.29}>
        <IconImg src={ICON_2} alt="" aria-hidden="true" $iw={72} $ih={68.174} />
      </IconBox>

      {/* Icon 3 — left-center, +3.42° */}
      <IconBox $l={235.11} $t={219.91} $w={75.781} $h={69.747} $r={3.42}>
        <IconImg src={ICON_3} alt="" aria-hidden="true" $iw={72} $ih={65.571} />
      </IconBox>

      {/* Icon 4 — right-center top, no rotation */}
      <IconBox $l={873} $t={75} $w={60.832} $h={72} $r={0}>
        <IconImg src={ICON_4} alt="" aria-hidden="true" $iw={60.832} $ih={72} />
      </IconBox>

      {/* Icon 5 — right-center bottom, -8.74° */}
      <IconBox $l={929.25} $t={315.93} $w={81.496} $h={78.15} $r={-8.74}>
        <IconImg src={ICON_5} alt="" aria-hidden="true" $iw={72} $ih={68} />
      </IconBox>

      {/* Icon 6 — far right, unified, +14.87° */}
      <IconBox $l={1052} $t={150} $w={88.067} $h={88.067} $r={14.87}>
        <IconImg src={ICON_6} alt="" aria-hidden="true" $iw={72} $ih={72} />
      </IconBox>

    </Banner>
  </Section>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Banner = styled.div`
  position: relative;
  width: ${({ theme }) => theme.layout.maxWidth};
  height: 470px;
  overflow: clip;
  flex-shrink: 0;

  ${mq.tablet} {
    width: 100%;
    height: auto;
    overflow: visible;
    display: flex;
    justify-content: center;
    padding: 0 24px;
  }

  ${mq.mobile} {
    width: 100%;
    height: auto;
    overflow: visible;
    display: flex;
    justify-content: center;
    padding: 0 24px;
  }
`

/*
 * Positions the photo group centered within the desktop banner.
 * On tabletDown, becomes display:contents so Banner's flex centering takes over.
 */
const PhotoCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;

  ${mq.tabletDown} {
    position: static;
    display: contents;
  }
`

const PhotoGroup = styled.div`
  position: relative;
  width: 430.983px;
  flex-shrink: 0;

  ${mq.tablet} {
    width: 360px;
  }

  ${mq.mobile} {
    width: min(300px, 100%);
  }
`

const CirclePhoto = styled.img`
  display: block;
  width: 100%;
  height: auto;
  pointer-events: none;
  user-select: none;
`

// ── Floating icons (desktop only) ─────────────────────────────────────────────

interface BoxProps {
  $l: number
  $t: number
  $w: number
  $h: number
  $r: number
}

const IconBox = styled.div<BoxProps>`
  position: absolute;
  left: ${({ $l }) => $l}px;
  top: ${({ $t }) => $t}px;
  width: ${({ $w }) => $w}px;
  height: ${({ $h }) => $h}px;
  display: flex;
  align-items: center;
  justify-content: center;
  transform: rotate(${({ $r }) => $r}deg);
  pointer-events: none;
  user-select: none;

  ${mq.tabletDown} {
    display: none;
  }
`

interface ImgProps {
  $iw: number
  $ih: number
}

const IconImg = styled.img<ImgProps>`
  display: block;
  width: ${({ $iw }) => $iw}px;
  height: ${({ $ih }) => $ih}px;
  flex-shrink: 0;
`

export default ProfileImage
