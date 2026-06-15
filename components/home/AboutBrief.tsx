'use client'

import { Fragment, useCallback, useEffect, useRef, useState } from 'react'
import styled from 'styled-components'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'
import { mq } from '@/styles/theme'

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

  ${mq.tablet} {
    gap: ${({ theme }) => theme.spacing[8]};
    padding: 0 24px;
  }

  ${mq.mobile} {
    flex-direction: column;
    align-items: flex-start;
    gap: 40px;
    padding: 0 24px;
    max-width: none;
  }
`

const InfoSection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
  flex: 1;

  ${mq.mobile} {
    flex: none;
    width: 100%;
    gap: 12px;
  }
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  white-space: nowrap;

  ${mq.mobile} {
    white-space: normal;
  }
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

  ${mq.mobile} {
    flex: none;
    width: 100%;
    justify-content: flex-start;
    gap: 32px;
  }
`

// ── Stat Block ─────────────────────────────────────────────────────────────────

const StatBlockWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[3]};
  width: 6.25rem;
  text-align: center;

  ${mq.mobile} {
    flex: 1 0 0;
    width: auto;
    gap: 12px;
    text-align: left;
  }
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

  ${mq.tablet} {
    font-size: 2.5rem;
    line-height: 3rem;
  }

  ${mq.mobile} {
    font-size: 2rem;
    line-height: 2.5rem;
    text-align: left;
  }
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

  ${mq.mobile} {
    text-align: left;
  }
`

// Replaces Figma's imgSeparator asset — a plain 1px vertical rule
const Separator = styled.div`
  width: 1px;
  height: 4rem;
  background-color: ${({ theme }) => theme.colors.border.tertiary};
  flex-shrink: 0;

  ${mq.mobile} {
    display: none;
  }
`

export default AboutBrief
