'use client'

import { useEffect, useRef, useState } from 'react'
import styled, { css, keyframes } from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Data ───────────────────────────────────────────────────────────────────

const STEPS = [
  {
    number: '01',
    heading: 'Listen',
    description: 'Every project starts with good conversations. Learn about your goals, users, challenges, & expectations.',
  },
  {
    number: '02',
    heading: 'Define',
    description: 'Simplify the problem into a clear product vision, making sure every design decision supports what matters most.',
  },
  {
    number: '03',
    heading: 'Explore',
    description: 'Sketch, prototype, & test multiple approaches before committing, exploring possibilities to uncover best experience.',
  },
  {
    number: '04',
    heading: 'Design',
    description: 'With direction in place, craft polished interfaces, & realistic prototypes ready for collaboration & development.',
  },
  {
    number: '05',
    heading: 'Refine',
    description: 'Fine-tune every state, & transition, ensuring the final product feels thoughtful, intuitive, & ready for launch.',
  },
] as const

// ─── Component ──────────────────────────────────────────────────────────────

const ProcessSection = () => {
  const [revealed, setRevealed] = useState(false)
  const sectionRef = useRef<HTMLDivElement>(null)

  // Figma annotation: "Load each step card one by one from the side" —
  // a scroll-triggered stagger, not a mount animation (section sits below
  // the fold, after the works grid).
  useEffect(() => {
    const el = sectionRef.current
    if (!el) return
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setRevealed(true)
          observer.disconnect()
        }
      },
      { threshold: 0.2 },
    )
    observer.observe(el)
    return () => observer.disconnect()
  }, [])

  return (
    <Section ref={sectionRef}>
      <TitleContainer>
        <SectionLabel>HOW I WORK</SectionLabel>
        <SectionHeader before="The process, " muted="in brief" />
      </TitleContainer>

      <OrderedList>
        {STEPS.map((step, i) => (
          <Item key={step.number} $revealed={revealed} $delay={i * 0.1}>
            <Badge>{step.number}</Badge>
            <ItemBody>
              <Heading>{step.heading}</Heading>
              <Description>{step.description}</Description>
            </ItemBody>
          </Item>
        ))}
      </OrderedList>
    </Section>
  )
}

// ─── Styles ─────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: 36px;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.mobile} {
    max-width: none;
  }
`

const TitleContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`

const OrderedList = styled.div`
  display: flex;
  align-items: stretch;
  gap: ${({ theme }) => theme.spacing[4]};
  width: 100%;

  ${mq.mobile} {
    flex-direction: column;
    align-items: stretch;
  }
`

const slideInFromSide = keyframes`
  from { opacity: 0; transform: translateX(24px); }
  to   { opacity: 1; transform: translateX(0); }
`

const Item = styled.div<{ $revealed: boolean; $delay: number }>`
  display: flex;
  flex-direction: column;
  flex: 1 0 0;
  min-width: 0;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ theme }) => theme.spacing[4]};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  opacity: 0;
  ${({ $revealed, $delay }) => $revealed && css`
    animation: ${slideInFromSide} 0.5s ease both;
    animation-delay: ${$delay}s;
  `}

  ${mq.mobile} {
    flex: none;
  }
`

const Badge = styled.span`
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
  width: 40px;
  height: 40px;
  padding: ${({ theme }) => theme.spacing[2]};
  /* Figma-derived — no matching theme token (close to, but distinct from,
     colors.surface.highlight/text.highlight #E8342A). */
  background-color: rgba(255, 77, 46, 0.08);
  border-radius: ${({ theme }) => theme.radii.md};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.highlight};
  white-space: nowrap;
`

const ItemBody = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[1]};
  width: 100%;
`

const Heading = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
`

const Description = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export default ProcessSection
