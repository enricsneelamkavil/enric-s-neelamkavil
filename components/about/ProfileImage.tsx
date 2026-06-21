import styled, { keyframes } from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Types ────────────────────────────────────────────────────────────────────

type Mode = 'professional' | 'personal'

interface Props {
  mode?: Mode
}

interface IconDef {
  src: string
  l: number; t: number
  w: number; h: number
  r: number
  iw: number; ih: number
  delay: number
}

// ─── Professional Assets ──────────────────────────────────────────────────────

const PRO_PHOTO = '/about/professional-image.webp'

const PRO_ICONS: IconDef[] = [
  { src: '/about/icons/icon-1.svg', l: 29.76,   t: 331.64, w: 79.475, h: 84.73,  r: 12.94,  iw: 65,     ih: 72,     delay: 0   },
  { src: '/about/icons/icon-2.svg', l: 95.57,   t: 41.12,  w: 84.862, h: 81.939, r: -12.29, iw: 72,     ih: 68.174, delay: 0.5 },
  { src: '/about/icons/icon-3.svg', l: 235.11,  t: 219.91, w: 75.781, h: 69.747, r: 3.42,   iw: 72,     ih: 65.571, delay: 1   },
  { src: '/about/icons/icon-4.svg', l: 873,     t: 75,     w: 60.832, h: 72,     r: 0,      iw: 60.832, ih: 72,     delay: 1.5 },
  { src: '/about/icons/icon-5.svg', l: 929.25,  t: 315.93, w: 81.496, h: 78.15,  r: -8.74,  iw: 72,     ih: 68,     delay: 2   },
  { src: '/about/icons/icon-6.svg', l: 1052,    t: 150,    w: 88.067, h: 88.067, r: 14.87,  iw: 72,     ih: 72,     delay: 2.5 },
]

// ─── Personal Assets ─────────────────────────────────────────────────────────
// Composite photo (523×613 CSS px) includes circle crop, hair above, and
// food/phone bottom extrude — all layers composited from Figma node 328:922.

const PER_PHOTO = '/about/personal/personal-photo.png'

// Positions are within the 1167.51×621px personal banner (Figma node 328:920).
// Icons 1 & 2 use percentage-based inset in Figma — converted to px here.
const PER_ICONS: IconDef[] = [
  { src: '/about/personal/icons/icon-1.png', l: 25.8,   t: 55,     w: 84,  h: 76,  r: 9.46,   iw: 84, ih: 76,  delay: 0   },
  { src: '/about/personal/icons/icon-2.png', l: 93.7,   t: 435,    w: 93,  h: 101, r: -17.23, iw: 93, ih: 101, delay: 0.5 },
  { src: '/about/personal/icons/icon-3.png', l: 263.8,  t: 235.04, w: 76,  h: 76,  r: 3.21,   iw: 76, ih: 76,  delay: 1   },
  { src: '/about/personal/icons/icon-4.png', l: 869.75, t: 403,    w: 76,  h: 76,  r: 0,      iw: 76, ih: 76,  delay: 1.5 },
  { src: '/about/personal/icons/icon-5.png', l: 971.75, t: 142,    w: 75,  h: 76,  r: 0,      iw: 75, ih: 76,  delay: 2   },
  { src: '/about/personal/icons/icon-6.png', l: 1074.75, t: 285,   w: 81,  h: 86,  r: 14.1,   iw: 81, ih: 86,  delay: 2.5 },
]

// ─── Component ────────────────────────────────────────────────────────────────

const ProfileImage = ({ mode = 'professional' }: Props) => {
  const isPro = mode === 'professional'
  const photo  = isPro ? PRO_PHOTO  : PER_PHOTO
  const icons  = isPro ? PRO_ICONS  : PER_ICONS

  return (
    <Section>
      <Banner $personal={!isPro}>

        {/* Photo group — centered within the 1168px banner via PhotoCenter */}
        <PhotoCenter>
          <PhotoGroup $personal={!isPro}>
            <CirclePhoto src={photo} alt="Enric S Neelamkavil" />
          </PhotoGroup>
        </PhotoCenter>

        {icons.map(({ src, l, t, w, h, r, iw, ih, delay }, i) => (
          <IconBox key={i} $l={l} $t={t} $w={w} $h={h} $r={r}>
            <IconImg src={src} alt="" aria-hidden="true" $iw={iw} $ih={ih} $delay={delay} />
          </IconBox>
        ))}

      </Banner>
    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  justify-content: center;
  width: 100%;
`

const Banner = styled.div<{ $personal?: boolean }>`
  position: relative;
  width: ${({ theme }) => theme.layout.maxWidth};
  height: ${({ $personal }) => ($personal ? '621px' : '470px')};
  overflow: clip;
  flex-shrink: 0;

  ${mq.tablet} {
    width: 100%;
    height: auto;
    overflow: visible;
    display: flex;
    justify-content: center;
  }

  ${mq.mobile} {
    width: 100%;
    height: auto;
    overflow: visible;
    display: flex;
    justify-content: center;
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

// Personal photo composite is 523px wide (vs 431px professional) because the
// food bottom-extrude extends further right than the circle crop.
const PhotoGroup = styled.div<{ $personal?: boolean }>`
  position: relative;
  width: ${({ $personal }) => ($personal ? '523px' : '430.983px')};
  flex-shrink: 0;

  ${mq.tablet} {
    width: ${({ $personal }) => ($personal ? '420px' : '360px')};
  }

  ${mq.mobile} {
    width: ${({ $personal }) => ($personal ? 'min(300px, 100%)' : 'min(257px, 100%)')};
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

const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-8px); }
  100% { transform: translateY(0px); }
`

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
  $delay?: number
}

const IconImg = styled.img<ImgProps>`
  display: block;
  width: ${({ $iw }) => $iw}px;
  height: ${({ $ih }) => $ih}px;
  flex-shrink: 0;
  animation: ${float} 4s ease-in-out infinite;
  animation-delay: ${({ $delay }) => $delay || 0}s;
`

export default ProfileImage
