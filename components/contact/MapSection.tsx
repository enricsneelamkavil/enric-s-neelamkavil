import Image from 'next/image'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Data ─────────────────────────────────────────────────────────────────────

// 9 client/testimonial photos scattered over the map (Figma node 685:3225).
// Each file in public/contact/avatars/ is a single flattened export straight
// from Figma (photo + its gradient vignette overlay baked in as one image —
// not a separate CSS gradient layer), downloaded via get_screenshot per node.
// Positions below are converted from Figma's absolute desktop px (652×362
// frame) to percentages of the frame, so a single fluid component covers both
// breakpoints instead of two hardcoded pixel sets — Figma's own mobile frame
// (272×151, node 685:3492) is the exact same layout scaled by a uniform
// ~41.7%, confirming percentage positioning is safe here.
const MAP_POINTS: { left: number; top: number; image: string }[] = [
  { left: 26.16, top: 29.28, image: '/contact/avatars/avatar-1.webp' },
  { left: 14.81, top: 66.57, image: '/contact/avatars/avatar-2.webp' },
  { left: 75.77, top: -5.80, image: '/contact/avatars/avatar-3.webp' },
  { left: 110.20, top: 75.41, image: '/contact/avatars/avatar-4.webp' },
  { left: 60.28, top: 18.23, image: '/contact/avatars/avatar-5.webp' },
  { left: 99.94, top: 29.28, image: '/contact/avatars/avatar-6.webp' },
  { left: 50.09, top: 55.52, image: '/contact/avatars/avatar-7.webp' },
  { left: 3.46, top: 5.52, image: '/contact/avatars/avatar-8.webp' },
  { left: -14.50, top: 38.12, image: '/contact/avatars/avatar-9.webp' },
]

// Avatar size as a percentage of the frame's own width (6.135% ≈ 40/652px at
// the Figma desktop frame) — scales proportionally with MapFrame at any
// breakpoint since MapFrame's width/height shrink by the same factor together.
const AVATAR_SIZE_PERCENT = 6.135

// ─── Component ──────────────────────────────────────────────────────────────

const MapSection = () => (
  <Wrapper>
    <MapFrame>
      <MapBackground src="/contact/world-map.svg" alt="" aria-hidden="true" draggable={false} />
      {MAP_POINTS.map((point, i) => (
        <Avatar
          key={i}
          aria-hidden="true"
          style={{ left: `${point.left}%`, top: `${point.top}%` }}
        >
          <Image
            src={point.image}
            alt=""
            fill
            sizes="(max-width: 768px) 17px, 40px"
            quality={90}
            draggable={false}
          />
        </Avatar>
      ))}
    </MapFrame>
  </Wrapper>
)

// ─── Styles ──────────────────────────────────────────────────────────────────

const Wrapper = styled.div`
  display: flex;
  justify-content: center;
  width: 100%;
`

const MapFrame = styled.div`
  position: relative;
  width: 652px;
  aspect-ratio: 652 / 362;

  ${mq.mobile} {
    width: 272px;
  }
`

// The source SVG's root has percentage width/height (100%) with no explicit
// pixel size, so loading it via <img> gives it no usable intrinsic size —
// browsers fall back to the historical 300×150 replaced-element default
// instead of deriving size from its viewBox. Explicit width/height here force
// it to actually fill the frame; preserveAspectRatio="none" in the source
// means it's designed to stretch to fit exactly, matching Figma's own
// inset-0 + size-full export (no object-fit).
const MapBackground = styled.img`
  position: absolute;
  top: 3.87%;
  left: -0.06%;
  width: 99.8%; /* 100% − (-0.06% left inset) − 0.26% right inset */
  height: 96.13%; /* 100% − 3.87% top inset − 0% bottom inset */
`

const Avatar = styled.div`
  position: absolute;
  width: ${AVATAR_SIZE_PERCENT}%;
  aspect-ratio: 1 / 1;
  border-radius: 40%;
  overflow: hidden;

  img {
    object-fit: cover;
  }
`

export default MapSection
