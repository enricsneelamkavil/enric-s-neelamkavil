import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Assets ───────────────────────────────────────────────────────────────────

const IMG_PHOTO  = '/about/profile-group.png'
const IMG_ICON_1 = '/about/profile-icon-1.png' // target  — top-right
const IMG_ICON_2 = '/about/profile-icon-2.png' // cube    — left-middle
const IMG_ICON_3 = '/about/profile-icon-3.png' // cursor  — bottom-right

// ─── Layout constants (from Figma) ────────────────────────────────────────────

const PHOTO_PX      = 431            // 430.98px rounded
const GROUP_PX      = 710            // total bounding box incl. side icons
const PHOTO_LEFT_PX = Math.round((GROUP_PX - PHOTO_PX) / 2) // ≈ 140px

// ─── Component ────────────────────────────────────────────────────────────────

const ProfileImage = () => {
  return (
    <Section>
      <PhotoGroup>
        {/* cube icon — left side, mid-height */}
        <FloatingIcon src={IMG_ICON_2} alt="" aria-hidden="true" $left={0}   $top={219} />

        {/* circular photo */}
        <PhotoContainer>
          <CirclePhoto src={IMG_PHOTO} alt="Enric S Neelamkavil" />
        </PhotoContainer>

        {/* target icon — top-right */}
        <FloatingIcon src={IMG_ICON_1} alt="" aria-hidden="true" $left={609} $top={18}  />
        {/* cursor icon — bottom-right */}
        <FloatingIcon src={IMG_ICON_3} alt="" aria-hidden="true" $left={637} $top={360} />
      </PhotoGroup>
    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`

// Image natural size: 431×470px — height is set to match so nothing is clipped
const PHOTO_NATURAL_H = 470

const PhotoGroup = styled.div`
  position: relative;
  width: ${GROUP_PX}px;
  height: ${PHOTO_NATURAL_H}px;
  flex-shrink: 0;

  ${mq.tablet} {
    width: 100%;
    display: flex;
    justify-content: center;
    height: auto;
  }

  ${mq.mobile} {
    width: 100%;
    display: flex;
    justify-content: center;
    padding: 0 24px;
  }
`

const PhotoContainer = styled.div`
  position: absolute;
  left: ${PHOTO_LEFT_PX}px;
  top: 0;
  width: ${PHOTO_PX}px;

  ${mq.tablet} {
    position: relative;
    left: auto;
    width: 360px;
  }

  ${mq.mobile} {
    position: relative;
    left: auto;
    width: min(300px, 100%);
  }
`

const CirclePhoto = styled.img`
  display: block;
  width: 100%;
  height: auto;
`

interface FloatingIconProps {
  $left: number
  $top: number
}

const FloatingIcon = styled.img<FloatingIconProps>`
  position: absolute;
  width: 72px;
  height: 72px;
  left: ${({ $left }) => $left}px;
  top: ${({ $top }) => $top}px;
  pointer-events: none;
  user-select: none;

  ${mq.tabletDown} {
    display: none;
  }
`

export default ProfileImage
