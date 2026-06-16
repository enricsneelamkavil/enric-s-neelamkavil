import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Company data ─────────────────────────────────────────────────────────────

interface Company {
  name:    string
  logo?:   string   // undefined = missing asset, renders text fallback
  href?:   string
}

// Grid order: left→right, top→bottom (4 cols × 3 rows)
// ⚠️  reputeup-logo.svg is missing from public/company logos/ — text fallback used
const COMPANIES: Company[] = [
  { name: 'RE/MAX',        logo: '/company logos/remax-logo.svg' },
  { name: 'Deep5',         logo: '/company logos/deep5-logo.svg' },
  { name: 'ReputeUp'       /* logo missing */                    },
  { name: 'Urban Trash',   logo: '/company logos/urbantrash-logo.svg' },

  { name: 'UST',           logo: '/company logos/ust-logo.svg',         href: 'https://ust.com' },
  { name: 'Vurse',         logo: '/company logos/vurse-logo.svg' },
  { name: 'Karghewale',    logo: '/company logos/karghewale-logo.svg' },
  { name: 'Apro IT',       logo: '/company logos/apro-it-logo.svg' },

  { name: 'OpenGrad',      logo: '/company logos/opengrad-logo.svg' },
  { name: 'FunDesigns',    logo: '/company logos/fundesigns-logo.svg',   href: 'https://fundesign.in' },
  { name: 'Iris Holidays', logo: '/company logos/irisholidays-logo.svg' },
  { name: 'mulearn',       logo: '/company logos/mulearn-logo.svg' },
]

// ─── Component ────────────────────────────────────────────────────────────────

const ROWS = [
  COMPANIES.slice(0, 4),
  COMPANIES.slice(4, 8),
  COMPANIES.slice(8, 12),
]

const renderCell = (co: Company) => {
  const inner = co.logo
    ? <Logo src={co.logo} alt={co.name} />
    : <FallbackName>{co.name}</FallbackName>

  return (
    <Cell key={co.name}>
      {co.href
        ? <CellLink href={co.href} target="_blank" rel="noopener noreferrer" aria-label={co.name}>{inner}</CellLink>
        : inner
      }
    </Cell>
  )
}

const Companies = () => (
  <Section>
    <TitleBlock>
      <SectionLabel>WORKED WITH THEM</SectionLabel>
      <SectionHeader before="Teams that " muted="trusted " after="my work." />
    </TitleBlock>

    <Grid>
      {/* vertical separators — absolutely positioned, span full grid height */}
      <VertSep $left={25} />
      <VertSep $left={50} />
      <VertSep $left={75} />

      {ROWS[0].map(renderCell)}
      <Separator />
      {ROWS[1].map(renderCell)}
      <Separator />
      {ROWS[2].map(renderCell)}
    </Grid>
  </Section>
)

// ─── Styles ───────────────────────────────────────────────────────────────────

const Section = styled.section`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.tabletDown} {
    max-width: none;
    padding: 0 24px;
  }
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[2]};
`

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(4, 1fr);
  width: 100%;
  position: relative;

  ${mq.mobile} {
    grid-template-columns: repeat(2, 1fr);
  }
`

const Cell = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 16px 24px;
  height: 107px;

  ${mq.mobile} {
    padding: 12px 16px;
    height: 88px;
  }
`

const Separator = styled.div`
  grid-column: 1 / -1;
  height: 1px;
  background: linear-gradient(
    to right,
    transparent 0%,
    ${({ theme }) => theme.colors.border.tertiary} 50%,
    transparent 100%
  );
`

interface VertSepProps { $left: number }

const VertSep = styled.div<VertSepProps>`
  position: absolute;
  top: 0;
  left: ${({ $left }) => $left}%;
  width: 1px;
  height: 100%;
  background: linear-gradient(
    to bottom,
    transparent 0%,
    ${({ theme }) => theme.colors.border.tertiary} 50%,
    transparent 100%
  );
  pointer-events: none;

  ${mq.mobile} {
    /* 2-col grid — only the centre separator (50%) is relevant */
    display: ${({ $left }) => $left === 50 ? 'block' : 'none'};
  }
`

const CellLink = styled.a`
  display: flex;
  align-items: center;
  justify-content: center;
  width: 100%;
  height: 100%;
  opacity: 1;
  transition: opacity 0.15s ease;

  &:hover { opacity: 0.65; }
`

const Logo = styled.img`
  max-height: 52px;
  max-width: 80%;
  width: auto;
  height: auto;
  object-fit: contain;
  display: block;
`

const FallbackName = styled.span`
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  color: ${({ theme }) => theme.colors.text.tertiary};
  text-transform: uppercase;
  letter-spacing: ${({ theme }) => theme.letterSpacings.wide};
`

export default Companies
