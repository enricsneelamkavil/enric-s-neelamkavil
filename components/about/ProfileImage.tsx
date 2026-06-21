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
  { src: '/about/icons/icon-1.svg', l: 29.76, t: 331.64, w: 79.475, h: 84.73, r: 12.94, iw: 65, ih: 72, delay: 0 },
  { src: '/about/icons/icon-2.svg', l: 95.57, t: 41.12, w: 84.862, h: 81.939, r: -12.29, iw: 72, ih: 68.174, delay: 0.5 },
  { src: '/about/icons/icon-3.svg', l: 235.11, t: 219.91, w: 75.781, h: 69.747, r: 3.42, iw: 72, ih: 65.571, delay: 1 },
  { src: '/about/icons/icon-4.svg', l: 873, t: 75, w: 60.832, h: 72, r: 0, iw: 60.832, ih: 72, delay: 1.5 },
  { src: '/about/icons/icon-5.svg', l: 929.25, t: 315.93, w: 81.496, h: 78.15, r: -8.74, iw: 72, ih: 68, delay: 2 },
  { src: '/about/icons/icon-6.svg', l: 1052, t: 150, w: 88.067, h: 88.067, r: 14.87, iw: 72, ih: 72, delay: 2.5 },
]

// ─── Personal Assets ─────────────────────────────────────────────────────────
// Composite photo (523×613 CSS px) includes circle crop, hair above, and
// food/phone bottom extrude — all layers composited from Figma node 328:922.

const PER_PHOTO = '/about/personal/personal-image.webp'

const PER_ICONS: IconDef[] = [
  { ...PRO_ICONS[0], src: '/about/personal/icons/icon-1.png' },
  { ...PRO_ICONS[1], src: '/about/personal/icons/icon-2.png' },
  { ...PRO_ICONS[2], src: '/about/personal/icons/icon-3.png' },
  { ...PRO_ICONS[3], src: '/about/personal/icons/icon-4.png' },
  { ...PRO_ICONS[4], src: '/about/personal/icons/icon-5.png' },
  { ...PRO_ICONS[5], src: '/about/personal/icons/icon-6.png' }
]

// ─── Component ────────────────────────────────────────────────────────────────

const ProfileImage = ({ mode = 'professional' }: Props) => {
  const isPro = mode === 'professional'

  return (
    <Section>
      <Banner>
        <PhotoCenter>
          <PhotoGroup $active={isPro}>
            <CirclePhoto src={PRO_PHOTO} alt="Professional Mode" />
          </PhotoGroup>

          <PhotoGroup $active={!isPro}>
            <CirclePhoto src={PER_PHOTO} alt="Personal Mode" />
          </PhotoGroup>
        </PhotoCenter>

        <IconsGroup $active={isPro}>
          {PRO_ICONS.map(({ src, l, t, w, h, r, iw, ih, delay }, i) => (
            <IconBox key={`pro-${i}`} $l={l} $t={t} $w={w} $h={h} $r={r}>
              <IconImg src={src} alt="" aria-hidden="true" $iw={iw} $ih={ih} $delay={delay} />
            </IconBox>
          ))}
        </IconsGroup>

        <IconsGroup $active={!isPro}>
          {PER_ICONS.map(({ src, l, t, w, h, r, iw, ih, delay }, i) => (
            <IconBox key={`per-${i}`} $l={l} $t={t} $w={w} $h={h} $r={r}>
              <IconImg src={src} alt="" aria-hidden="true" $iw={iw} $ih={ih} $delay={delay} />
            </IconBox>
          ))}
        </IconsGroup>
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

const Banner = styled.div`
  position: relative;
  width: ${({ theme }) => theme.layout.maxWidth};
  height: 621px; /* Uniform height for both identical dimension images */
  overflow: clip;
  flex-shrink: 0;
  transition: height 0.5s ease;

  ${mq.tablet} {
    width: 100%;
    height: 499.7px;
  }

  ${mq.mobile} {
    width: 100%;
    height: 357px;
  }
`

const PhotoCenter = styled.div`
  position: absolute;
  inset: 0;
  display: flex;
  align-items: center;
  justify-content: center;
`

const PhotoGroup = styled.div<{ $active: boolean }>`
  position: absolute;
  width: 523px; /* Uniform width */
  flex-shrink: 0;

  z-index: ${({ $active }) => ($active ? 2 : 1)};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: ${({ $active }) => ($active ? 'opacity 0.4s ease' : 'opacity 0s 0.4s')};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};

  ${mq.tablet} {
    width: 420px;
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

// ── Floating icons ─────────────────────────────────────────────

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

const IconsGroup = styled.div<{ $active: boolean }>`
  position: absolute;
  top: 0;
  left: 50%;
  transform: translateX(-50%);
  width: 1167.51px;
  height: 100%;
  z-index: ${({ $active }) => ($active ? 2 : 1)};
  opacity: ${({ $active }) => ($active ? 1 : 0)};
  transition: ${({ $active }) => ($active ? 'opacity 0.4s ease' : 'opacity 0s 0.4s')};
  pointer-events: ${({ $active }) => ($active ? 'auto' : 'none')};

  ${mq.tablet} {
    transform: translateX(-50%) scale(0.805);
  }

  ${mq.mobile} {
    display: none;
  }
`

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
