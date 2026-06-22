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

// ─── Component ────────────────────────────────────────────────────────────────

const DirectContact = () => {
  const [istTime, setIstTime] = useState('')

  useEffect(() => {
    setIstTime(getISTTime())
    const id = setInterval(() => setIstTime(getISTTime()), 60_000)
    return () => clearInterval(id)
  }, [])

  return (
    <Card>
      <TitleBlock>
        <SectionLabel>OR, THE OLD WAY</SectionLabel>
        <SectionHeader before="Reach out " muted="direct" after="." />
      </TitleBlock>

      <Highlights>
        {/* Row 1 — Based (no top border) */}
        <Row>
          <RowInner>
            <Label>Based</Label>
            <LocationValue>
              <ValueLight>Trivandrum, IN</ValueLight>
              <DiamondBullet size={6} />
              <ValueRegular>{istTime}</ValueRegular>
            </LocationValue>
          </RowInner>
        </Row>

        {/* Row 2 — Email */}
        <Row $bordered>
          <RowInner>
            <Label>Email</Label>
            <ValueLink href="mailto:enricsneelamkavil@gmail.com">
              enricsneelamkavil@gmail.com
            </ValueLink>
          </RowInner>
        </Row>

        {/* Row 3 — Phone / WhatsApp */}
        <Row $bordered>
          <RowInner>
            <Label>PHONE</Label>
            <ValueLink
              href="https://wa.me/+919400743624"
              target="_blank"
              rel="noopener noreferrer"
            >
              +91 94007 43624
            </ValueLink>
          </RowInner>
        </Row>
      </Highlights>
    </Card>
  )
}

// ─── Styles ──────────────────────────────────────────────────────────────────

const Card = styled.div`
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.xl};
  padding: ${({ theme }) => theme.spacing[6]};
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const Highlights = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
`

const Row = styled.div<{ $bordered?: boolean }>`
  padding: 13px 0;
  ${({ $bordered, theme }) =>
    $bordered && `border-top: 1px solid ${theme.colors.border.tertiary};`}
`

const RowInner = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`

const Label = styled.span`
  flex: 1 0 0;
  max-width: 120px;
  min-width: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
  text-transform: uppercase;
`

const LocationValue = styled.div`
  display: flex;
  align-items: center;
  gap: 4px;
  flex: 1 0 0;
  min-width: 0;
`

const ValueLight = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

const ValueRegular = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

const ValueLink = styled.a`
  flex: 1 0 0;
  min-width: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  text-decoration: none;

  &:hover {
    text-decoration: underline;
  }

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.xs};
    line-height: ${({ theme }) => theme.lineHeights.tight};
  }
`

export default DirectContact
