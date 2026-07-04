'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── IST day ─────────────────────────────────────────────────────────────────

const getISTDay = () =>
  new Date()
    .toLocaleDateString('en-US', { timeZone: 'Asia/Kolkata', weekday: 'long' })
    .toUpperCase()

// ─── Task data ───────────────────────────────────────────────────────────────

const TASKS = [
  { label: 'Plan Sri Lanka', completedOnHover: false },
  { label: 'Start drafting first book', completedOnHover: false },
  { label: 'Redesign Portfolio', completedOnHover: true },
  { label: 'Next medium article', completedOnHover: false },
  { label: 'Shoot podcast episode', completedOnHover: false },
]

// ─── Component ───────────────────────────────────────────────────────────────

const PersonalAboutDescription = () => {
  const [istDay, setIstDay] = useState('')
  const [widgetHovered, setWidgetHovered] = useState(false)

  useEffect(() => {
    setIstDay(getISTDay())
  }, [])

  return (
    <Section>
      {/* Left: bio text */}
      <DescriptionBlock>
        <TitleBlock>
          <SectionLabel>MEET THE REAL ME</SectionLabel>
          <SectionHeader before="True to " muted="my soul" after="." />
        </TitleBlock>

        <BioText>
          <p>
            {'Off the clock I '}
            <Highlight>travel</Highlight>
            {' a lot, host '}
            <Highlight>Chumma Oru Podcast</Highlight>
            {', write on Medium, and fall down rabbit holes about product design, user psychology and '}
            <Highlight>credit-card points</Highlight>
            {". Here's the realest me!"}
          </p>
          <p>
            {"There's the version that runs design reviews, ships at standup, and lives inside Figma. And then this is the one that wakes up to make coffee with film loaded."}
          </p>
        </BioText>
      </DescriptionBlock>

      {/* Right: To Do List widget */}
      <ToDoCard
        $hovered={widgetHovered}
        onMouseEnter={() => setWidgetHovered(true)}
        onMouseLeave={() => setWidgetHovered(false)}
      >
        <DayHeading>{istDay}</DayHeading>
        <CardBody>
          <CardTitle>To do List</CardTitle>
          <TaskGroup>
            {TASKS.map(({ label, completedOnHover }) => (
              <Task key={label}>
                <CheckBox $completedOnHover={completedOnHover} $hovered={widgetHovered}>
                  {completedOnHover && (
                    <CheckIcon aria-hidden="true" $hovered={widgetHovered} />
                  )}
                </CheckBox>
                <TaskLabel $completedOnHover={completedOnHover} $hovered={widgetHovered}>
                  {label}
                </TaskLabel>
              </Task>
            ))}
          </TaskGroup>
        </CardBody>
      </ToDoCard>
    </Section>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tablet} {
    max-width: none;
  }

  ${mq.mobile} {
    flex-direction: column;
    max-width: none;
  }
`

const DescriptionBlock = styled.div`
  flex: 1 0 0;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  min-width: 0;

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[3]};
  }
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const BioText = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.lineHeights.relaxed};

  p {
    margin: 0;
    font-family: ${({ theme }) => theme.fonts.sans};
    font-weight: ${({ theme }) => theme.fontWeights.light};
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: ${({ theme }) => theme.lineHeights.relaxed};
    color: ${({ theme }) => theme.colors.text.primary};
  }

  ${mq.mobile} {
    gap: ${({ theme }) => theme.lineHeights.normal};

    p {
      font-size: ${({ theme }) => theme.fontSizes.sm};
      line-height: ${({ theme }) => theme.lineHeights.normal};
    }
  }
`

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

// ─── To Do Widget ────────────────────────────────────────────────────────────

const ToDoCard = styled.div<{ $hovered: boolean }>`
  flex-shrink: 0;
  width: 320px;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  overflow: hidden;
  cursor: default;
  transform: ${({ $hovered }) => ($hovered ? 'rotate(5deg)' : 'rotate(0deg)')};
  transition: transform 0.3s ease;

  ${mq.mobile} {
    width: 100%;
    align-self: stretch;
    transform: rotate(0deg);
  }
`

// Red heading bar. mb-[-10px] pulls CardBody up so its rounded-[12px] top corners
// are visible over the flat bottom of the red bar. No z-index — natural DOM order
// (CardBody is later) means CardBody paints on top in the overlap zone, which is
// exactly the Figma effect: white card's rounded corners over the red bar's flat bottom.
const DayHeading = styled.div`
  background: ${({ theme }) => theme.colors.surface.highlight};
  padding: 12px 24px 16px;
  margin-bottom: -10px;
  overflow: hidden;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: 600;
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  letter-spacing: 1.2px;
  color: ${({ theme }) => theme.colors.text.inverse};
  text-align: left;
  text-transform: uppercase;
  white-space: nowrap;
`

const CardBody = styled.div`
  background: ${({ theme }) => theme.colors.surface.primary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: 24px;
  overflow: hidden;
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[4]};
`

const CardTitle = styled.h3`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.secondary};
`

const TaskGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[3]};
`

const Task = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
`

const CheckBox = styled.div<{ $completedOnHover: boolean; $hovered: boolean }>`
  width: 16px;
  height: 16px;
  flex-shrink: 0;
  border-radius: 4px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition: background 0.15s ease, border 0.15s ease;

  ${({ $completedOnHover, $hovered, theme }) => {
    if (!$completedOnHover) {
      return `border: 1px solid ${theme.colors.border.tertiary};`;
    }
    return `
      border: ${$hovered ? 'none' : `1px solid ${theme.colors.border.tertiary}`};
      background: ${$hovered ? theme.colors.surface.inverse : 'transparent'};

      ${mq.mobile} {
        border: none;
        background: ${theme.colors.surface.inverse};
      }
    `;
  }}
`

const CheckIcon = styled.span<{ $hovered: boolean }>`
  display: inline-block;
  width: 12px;
  height: 12px;
  background-color: ${({ theme }) => theme.colors.text.inverse};
  -webkit-mask: url(/icons/tick.svg) no-repeat center / contain;
  mask: url(/icons/tick.svg) no-repeat center / contain;
  opacity: ${({ $hovered }) => ($hovered ? 1 : 0)};
  transition: opacity 0.15s ease;

  ${mq.mobile} {
    opacity: 1;
  }
`

const TaskLabel = styled.span<{ $completedOnHover: boolean; $hovered: boolean }>`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  white-space: nowrap;
  
  ${({ $completedOnHover, $hovered }) => {
    if (!$completedOnHover) return 'text-decoration: none;';
    return `
      text-decoration: ${$hovered ? 'line-through' : 'none'};
      ${mq.mobile} {
        text-decoration: line-through;
      }
    `;
  }}
`

export default PersonalAboutDescription
