import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Data ────────────────────────────────────────────────────────────────────

interface GearItem {
  name: string
  detail: string
  apple: boolean
}

const GEAR: GearItem[] = [
  { name: 'MACBOOK PRO M3',    detail: '16" · 16/512 · Work Laptop',           apple: true  },
  { name: 'ROG FLOW X16',      detail: '16" · 8/64 · Personal Laptop',         apple: false },
  { name: 'WATCH SERIES 10',   detail: '46mm · Jet Black · Watch',             apple: true  },
  { name: 'AIRPODS PRO 3',     detail: 'ANC · Personal TWC · Earphones',       apple: true  },
  { name: 'BOYA VY V20',       detail: 'Set of 2 · Wireless Microphones',      apple: false },
  { name: 'DIGITEK DTR 550 LW',detail: '67" · Professional Tripod',            apple: false },
  { name: 'IPHONE 16 PRO MAX', detail: '256 · Natural Titanium · Smartphone',  apple: true  },
  { name: 'ANKER MAGGO 10K',   detail: 'Qi 2 Certified · Powerbank',           apple: false },
]

// ─── Component ───────────────────────────────────────────────────────────────

const WorkDeskSection = () => (
  <Section>
    <TitleBlock>
      <DesktopLabelWrap><SectionLabel>THE TECH GLOVE BOX</SectionLabel></DesktopLabelWrap>
      <MobileLabelWrap><SectionLabel>THE DESK</SectionLabel></MobileLabelWrap>
      <SectionHeader before="Where the " muted="work" after=" happens." />
    </TitleBlock>

    {/* Desktop: inline flex-wrap */}
    <GearContainer>
      {GEAR.map(({ name, detail, apple }) => (
        <GearItem key={name}>
          <GearName>{name}</GearName>
          {apple && (
            <img
              src="/icons/apple.svg"
              alt="Apple"
              width={8.293}
              height={10.2}
              style={{ flexShrink: 0 }}
            />
          )}
          <GearDetail>{detail}</GearDetail>
        </GearItem>
      ))}
    </GearContainer>

    {/* Mobile: table-row pattern */}
    <MobileInventory>
      {GEAR.map(({ name, detail, apple }, i) => (
        <MobileRow key={name} $first={i === 0}>
          <GearName>{name}</GearName>
          {apple && (
            <img
              src="/icons/apple.svg"
              alt="Apple"
              width={8.293}
              height={10.2}
              style={{ flexShrink: 0 }}
            />
          )}
          <MobileDetail>{detail}</MobileDetail>
        </MobileRow>
      ))}
    </MobileInventory>
  </Section>
)

// ─── Styles ──────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tablet} {
    max-width: none;
  }

  ${mq.mobile} {
    max-width: none;
  }
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const DesktopLabelWrap = styled.div`
  ${mq.tabletDown} { display: none; }
`

const MobileLabelWrap = styled.div`
  display: none;
  ${mq.tabletDown} { display: block; }
`

// ── Desktop: flex-wrap grid ───────────────────────────────────────────────────

const GearContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  align-items: flex-start;
  align-content: flex-start;
  gap: 40px;
  width: 100%;

  ${mq.tabletDown} { display: none; }
`

const GearItem = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  flex-shrink: 0;
`

// ── Mobile: table rows ────────────────────────────────────────────────────────

const MobileInventory = styled.div`
  display: none;

  ${mq.tabletDown} {
    display: flex;
    flex-direction: column;
    width: 100%;
  }
`

const MobileRow = styled.div<{ $first: boolean }>`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[2]};
  padding: 14px 0;
  border-bottom: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  ${({ $first, theme }) => $first && `border-top: 1px solid ${theme.colors.border.tertiary};`}
  width: 100%;
`

// ── Shared ────────────────────────────────────────────────────────────────────

const GearName = styled.span`
  flex-shrink: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.primary};
  text-transform: uppercase;
  white-space: nowrap;
`

const GearDetail = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};
  white-space: nowrap;
`

const MobileDetail = styled.span`
  flex: 1 0 0;
  min-width: 0;
  text-align: right;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.tertiary};
`

export default WorkDeskSection
