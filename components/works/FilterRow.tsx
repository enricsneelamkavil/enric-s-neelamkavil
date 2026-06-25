'use client'

import styled from 'styled-components'
import { mq } from '@/styles/theme'

const TABS = [
  { label: 'All',            value: 'all' },
  { label: 'Case studies',   value: 'case-study' },
  { label: 'Landing',        value: 'landing' },
  { label: 'Brand Identity', value: 'brand-identity' },
]

interface Props {
  activeFilter: string
  onFilterChange: (filter: string) => void
  counts: Record<string, number>
  totalShown: number
}

const FilterRow = ({ activeFilter, onFilterChange, counts, totalShown }: Props) => (
  <Row>
    <Tablist>
      {TABS.filter(({ value }) => (counts[value] ?? 0) > 0).map(({ label, value }) => {
        const active = activeFilter === value
        const count = counts[value] ?? 0
        return (
          <TabButton
            key={value}
            $active={active}
            onClick={() => onFilterChange(value)}
          >
            <TabLabel>{label}</TabLabel>
            <TabBadge $active={active}>
              {count.toString().padStart(2, '0')}
            </TabBadge>
          </TabButton>
        )
      })}
    </Tablist>
    <CountLabel>
      <CountNum>{totalShown}</CountNum>
      <CountText> shown</CountText>
    </CountLabel>
  </Row>
)

const Row = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};
`

const Tablist = styled.div`
  display: flex;
  align-items: center;
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  padding: ${({ theme }) => theme.spacing[2]};

  ${mq.mobile} {
    border: none;
    border-radius: 0;
    padding: 0;
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[2]};
  }
`

const TabButton = styled.button<{ $active: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[3]}`};
  border-radius: ${({ theme }) => theme.radii.md};
  border: none;
  cursor: pointer;
  background: ${({ $active, theme }) =>
    $active ? theme.colors.surface.inverse : 'transparent'};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.inverse : theme.colors.text.primary};

  ${mq.mobile} {
    border: ${({ $active, theme }) =>
      $active ? 'none' : `1px solid ${theme.colors.border.tertiary}`};
  }
`

const TabLabel = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  white-space: nowrap;
`

const TabBadge = styled.span<{ $active: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  border-radius: ${({ theme }) => theme.radii.md};
  background: ${({ $active, theme }) =>
    $active ? theme.colors.surface.highlight : theme.colors.border.tertiary};
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ $active, theme }) =>
    $active ? theme.colors.text.inverse : theme.colors.text.primary};
`

const CountLabel = styled.p`
  margin: 0;
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};

  ${mq.mobile} {
    display: none;
  }
`

const CountNum = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  color: ${({ theme }) => theme.colors.text.primary};
`

const CountText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export default FilterRow
