'use client'

import { Fragment, useEffect, useRef } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'

// ─── Data ─────────────────────────────────────────────────────────────────────

const INTERESTS = [
  'Credit Cards',
  'Travel',
  'User Experience',
  'Food',
  'Product Design',
  'Photography',
  'Music',
] as const

// Tune to control scroll-to-movement ratio
const SCROLL_FACTOR = 0.3

// ─── Component ────────────────────────────────────────────────────────────────

const Interests = () => {
  const trackRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const track = trackRef.current
    if (!track) return

    // Measure one copy's span (including trailing padding-right gap) after paint
    const halfWidth = track.scrollWidth / 2

    const apply = () => {
      const offset = (window.scrollY * SCROLL_FACTOR) % halfWidth
      // -50% of 2× track = start of copy 2; adding offset moves right
      track.style.transform = `translateX(calc(-50% + ${offset}px))`
    }

    apply() // seed correct position if page is already scrolled
    window.addEventListener('scroll', apply, { passive: true })
    return () => window.removeEventListener('scroll', apply)
  }, [])

  // [item, bullet] pattern tiles perfectly when duplicated:
  // ...Music ◆ | Photography ◆ ... (no double-bullet at seam)
  const items = INTERESTS.map((item) => (
    <Fragment key={item}>
      <InterestItem>{item}</InterestItem>
      <img src="/icons/diamond.svg" width={10} height={10} alt="" aria-hidden />
    </Fragment>
  ))

  return (
    <Section>
      <Track ref={trackRef}>
        <ScrollerGroup>{items}</ScrollerGroup>
        {/* aria-hidden: duplicate exists only for seamless looping */}
        <ScrollerGroup aria-hidden="true">{items}</ScrollerGroup>
      </Track>
    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  width: 100%;
  overflow: hidden;
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  padding: ${({ theme }) => theme.spacing[4]} 0;

  ${mq.mobile} {
    width: auto;
    align-self: stretch;
    margin-left: -24px;
    margin-right: -24px;
  }
`

const Track = styled.div`
  display: flex;
  align-items: center;
  width: max-content;
  will-change: transform;
`

const ScrollerGroup = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[12]};
  /* trailing padding maintains the same gap across the copy boundary */
  padding-right: ${({ theme }) => theme.spacing[12]};
  flex-shrink: 0;
`

const InterestItem = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.lg};
  line-height: 3.1rem; /* 49.6px — Figma value, no theme token at this ratio */
  color: ${({ theme }) => theme.colors.text.secondary};
  white-space: nowrap;

  ${mq.tablet} {
    font-size: 1.75rem;
    line-height: 2.5rem;
  }

  ${mq.mobile} {
    font-size: 1.5rem;
    line-height: 2rem;
  }
`

export default Interests
