'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Data ─────────────────────────────────────────────────────────────────────

const STATS = [
  { target: 4,  label: 'Years in Design' },
  { target: 40, label: 'Projects Delivered' },
  { target: 2,  label: 'Honours Received' },
] as const

// ─── Count-up hook ─────────────────────────────────────────────────────────────
// Animates from 0 to `target` over `duration` ms once `active` flips true.

const useCountUp = (target: number, duration: number, active: boolean): number => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    if (!active) return
    let rafId: number
    const start = performance.now()

    const tick = (now: number) => {
      const progress = Math.min((now - start) / duration, 1)
      setCount(Math.round(progress * target))
      if (progress < 1) rafId = requestAnimationFrame(tick)
    }

    rafId = requestAnimationFrame(tick)
    return () => cancelAnimationFrame(rafId)
  }, [target, duration, active])

  return count
}

// ─── StatBlock ────────────────────────────────────────────────────────────────

interface StatBlockProps {
  target: number
  label: string
  active: boolean
}

const StatBlock = ({ target, label, active }: StatBlockProps) => {
  const count = useCountUp(target, 1500, active)
  return (
    <StatBlockWrapper>
      <StatValue>{String(count).padStart(2, '0')}</StatValue>
      <StatLabel>{label}</StatLabel>
    </StatBlockWrapper>
  )
}

// ─── Component ────────────────────────────────────────────────────────────────

const AboutBrief = () => {
  const [active, setActive] = useState(false)
  const statsRef = useRef<HTMLDivElement>(null)

  const handleIntersect: IntersectionObserverCallback = useCallback(
    ([entry], observer) => {
      if (entry.isIntersecting) {
        setActive(true)
        observer.disconnect()
      }
    },
    []
  )

  useEffect(() => {
    const node = statsRef.current
    if (!node) return
    const observer = new IntersectionObserver(handleIntersect, { threshold: 0.3 })
    observer.observe(node)
    return () => observer.disconnect()
  }, [handleIntersect])

  return (
    <Section>
      <InfoSection>
        <TitleContainer>
          <SectionLabel>Know Me</SectionLabel>
          <SectionHeader before="Little about " muted="myself" />
        </TitleContainer>
        <Bio>
          I&apos;m <BioEmphasis>Enric</BioEmphasis> — a Product &amp; Experience Designer
          based in Kerala. With engineering background, I map complex user flows into clean,
          beautiful, developer-friendly products across travel, healthcare, AI and enterprise.
        </Bio>
      </InfoSection>

      <StatsContainer ref={statsRef}>
        {STATS.map((stat, i) => (
          <Fragment key={stat.target}>
            {i > 0 && <Separator />}
            <StatBlock target={stat.target} label={stat.label} active={active} />
          </Fragment>
        ))}
      </StatsContainer>
    </Section>
  )
}

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  flex: 1;
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap;
`

const Bio = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
`

const BioEmphasis = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

const StatsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: ${({ theme }) => theme.spacing[8]};
  flex: 1;
`

// ── Stat Block ─────────────────────────────────────────────────────────────────

const StatBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  /* 6.25rem = 100px — Figma explicit stat block width */
  width: 6.25rem;
  text-align: center;
`

const StatValue = styled.p`
  margin: 0;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes['2xl']};
  line-height: ${({ theme }) => theme.lineHeights.xl};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-align: center;
`

const StatLabel = styled.p`
  margin: 0;
  width: 100%;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  text-align: center;
`

// Replaces Figma's imgSeparator asset — a plain 1px vertical rule
const Separator = styled.div`
  width: 1px;
  /* 4rem = 64px — Figma separator height */
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.border.tertiary};
  flex-shrink: 0;
`

export default AboutBrief
