'use client'

import { useState, useEffect } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'
import DiamondBullet from '@/components/shared/DiamondBullet'

// ─── IST clock ───────────────────────────────────────────────────────────────

const getISTTime = () =>
  new Date().toLocaleTimeString('en-IN', {
    timeZone: 'Asia/Kolkata',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true,
  })

// ─── Component ───────────────────────────────────────────────────────────────

const AboutDescription = () => {
  const [istTime, setIstTime] = useState('')

  useEffect(() => {
    setIstTime(getISTTime())
    const id = setInterval(() => setIstTime(getISTTime()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <Section>
      <TitleBlock>
        <SectionLabel>A SUMMARY</SectionLabel>
        <SectionHeader before="Know " muted="me " after="as I am." />
      </TitleBlock>

      <ContentRow>
        <BioColumn>
          <BioParagraph>
            <Highlight>I design products that get out of the way.</Highlight>
            {' '}4+ years across fintech, SaaS and consumer apps — from the brief to
            the build. I care about clarity, calmness and the boring details no one
            notices when they&apos;re done right.{' '}
          </BioParagraph>
        </BioColumn>

        <HighlightsTable>
          <HighlightRow $py={13}>
            <RowLabel>BASED</RowLabel>
            <RowValue>
              <ValueLight>Trivandrum, IN</ValueLight>
              <DiamondBullet size={6} />
              <ValueRegular>{istTime}</ValueRegular>
            </RowValue>
          </HighlightRow>

          <HighlightRow $py={13}>
            <RowLabel>CURRENTLY</RowLabel>
            <RowValue>
              <ValueLight>Product Designer</ValueLight>
              <DiamondBullet size={6} />
              <ValueRegular>UST</ValueRegular>
            </RowValue>
          </HighlightRow>

          <HighlightRow $py={14} $last>
            <RowLabel>DOMAIN</RowLabel>
            <RowValue>
              <ValueLight>User Experience Design</ValueLight>
            </RowValue>
          </HighlightRow>
        </HighlightsTable>
      </ContentRow>
    </Section>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tablet} {
    max-width: none;
    padding: 0 24px;
  }

  ${mq.mobile} {
    max-width: none;
    gap: 12px;
  }
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`

const ContentRow = styled.div`
  display: flex;
  align-items: flex-start;
  gap: ${({ theme }) => theme.spacing[10]};

  ${mq.mobile} {
    flex-direction: column;
    gap: ${({ theme }) => theme.spacing[10]};
  }
`

// ── Bio ───────────────────────────────────────────────────────────────────────

const BioColumn = styled.div`
  flex: 1;
  min-width: 0;
`

const BioParagraph = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.normal};
  }
`

const Highlight = styled.span`
  color: ${({ theme }) => theme.colors.text.highlight};
`

// ── Highlights table ──────────────────────────────────────────────────────────

const HighlightsTable = styled.div`
  width: 453px;
  flex-shrink: 0;

  ${mq.tablet} {
    width: 360px;
  }

  ${mq.mobile} {
    width: 100%;
  }
`

interface HighlightRowProps {
  $py: number
  $last?: boolean
}

const HighlightRow = styled.div<HighlightRowProps>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  padding: ${({ $py }) => $py}px 0;
  border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  ${({ $last, theme }) =>
    $last && `border-bottom: 1px solid ${theme.colors.border.tertiary};`}
`

const RowLabel = styled.span`
  flex-shrink: 0;
  width: 120px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`

const RowValue = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  flex: 1;
  min-width: 0;
`

const ValueLight = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: 16px;
  }
`

const ValueRegular = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: 16px;
  }
`

export default AboutDescription
