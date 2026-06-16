import { Fragment } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Inline bold span for CCE event names ────────────────────────────────────

const Bold = styled.span`
  font-weight: ${({ theme }) => theme.fontWeights.medium};
`

// ─── Entry data ───────────────────────────────────────────────────────────────

interface JourneyEntry {
  key:     string
  logo:    string
  logoW:   number
  logoH:   number
  href:    string
  role:    string
  dates:   string
  columns: React.ReactNode[]
}

const ENTRIES: JourneyEntry[] = [
  {
    key:   'ust',
    logo:  '/about/journey/ust-icon.svg',
    logoW: 26, logoH: 28,
    href:  'https://ust.com',
    role:  'Associate Product Designer',
    dates: 'August 2024 – Present',
    columns: [
      "Building the world's most human centred travel app, personalised recommendations, and stress-free travel all in one place.",
      'Developed wireframes and interactive prototypes, accelerating timelines to enhance design approval rates.',
      'Handling end-to-end flows for expense management module solving complex problems with business thinking.',
      'Handling complex B2B use cases for admin dashboard designs, connecting end-to-end modules seamlessly.',
    ],
  },
  {
    key:   'fundesigns',
    logo:  '/about/journey/fundesigns-icon.svg',
    logoW: 28, logoH: 28,
    href:  'https://fundesign.in',
    role:  'Lead UI Designer',
    dates: 'May 2024 – July 2024',
    columns: [
      'Crafting user-centric products and the best experiences delivering the promise for clients all over the world.',
      'Led a design team to complete 15+ major projects, improving experiences for multiple clients for the company.',
      'Shipped projects with tight deadlines, with zero compromise on design quality or user experience.',
      'Worked across multiple domains solving problems across various industries and agencies ensuring user experience.',
    ],
  },
  {
    key:   'cce',
    logo:  '/about/journey/cce-icon.svg',
    logoW: 27, logoH: 28,
    href:  'https://cce.edu.in',
    role:  'Bachelors in Technology (Computer Science)',
    dates: 'September 2020 – June 2024',
    columns: [
      'Head of student community (CODe) of department of Computer Science, Christ College of Engineering',
      <>Formulated the first ever Design week in colleges across Kerala <Bold>CODe Design Week &apos;23</Bold>, hosted the sequel event in 2024.</>,
      <>Hosted the flagship event , <Bold>BEACH HACK 5</Bold> which is South India&apos;s one and only beach hackathon.</>,
      <>Joined in the Design team for reimagining the official website of Christ College of Engineering, associating with <Bold>tegain</Bold>.</>,
    ],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

const Journey = () => (
  <Section>
    <TitleBlock>
      <SectionLabel>The Journey · 2018 → 2026</SectionLabel>
      <SectionHeader before="How I got " muted="here" after="." />
    </TitleBlock>

    <JourneySection>
      {ENTRIES.map((entry, i) => {
        const isLast = i === ENTRIES.length - 1
        return (
          <Fragment key={entry.key}>
            {/* Entry row — bullet + logo + role + date tag */}
            <EntryRow>
              <Bullet>
                <BulletDot />
              </Bullet>

              <LogoLink href={entry.href} target="_blank" rel="noopener noreferrer">
                <LogoIcon
                  src={entry.logo}
                  alt={entry.key}
                  width={entry.logoW}
                  height={entry.logoH}
                />
              </LogoLink>

              <RoleTitle>{entry.role}</RoleTitle>

              <DateTag>
                <DateText>{entry.dates}</DateText>
              </DateTag>
            </EntryRow>

            {/* Description row — connector + 4 text columns */}
            <DescriptionRow>
              <ConnectorCol>
                {!isLast && <ConnectorLine />}
              </ConnectorCol>

              <DescriptionContainer>
                {entry.columns.map((col, ci) => (
                  <Column key={ci}>{col}</Column>
                ))}
              </DescriptionContainer>
            </DescriptionRow>
          </Fragment>
        )
      })}
    </JourneySection>
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

const JourneySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
`

// ── Entry row ─────────────────────────────────────────────────────────────────

const EntryRow = styled.div`
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;

  ${mq.mobile} {
    flex-wrap: wrap;
    gap: ${({ theme }) => theme.spacing[3]};
  }
`

const Bullet = styled.div`
  width: 24px;
  height: 24px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.border.tertiary};
  display: flex;
  align-items: center;
  justify-content: center;
  flex-shrink: 0;
`

const BulletDot = styled.div`
  width: 12px;
  height: 12px;
  border-radius: ${({ theme }) => theme.radii.full};
  background: ${({ theme }) => theme.colors.text.primary};
`

const LogoLink = styled.a`
  display: flex;
  align-items: center;
  flex-shrink: 0;
  opacity: 1;
  transition: opacity 0.15s ease;
  &:hover { opacity: 0.7; }
`

const LogoIcon = styled.img`
  display: block;
  object-fit: contain;
`

const RoleTitle = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.notch};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  font-size: ${({ theme }) => theme.fontSizes.md};
  line-height: ${({ theme }) => theme.lineHeights.relaxed};
  color: ${({ theme }) => theme.colors.text.primary};
  white-space: nowrap;

  ${mq.mobile} {
    font-size: ${({ theme }) => theme.fontSizes.sm};
    line-height: ${({ theme }) => theme.lineHeights.normal};
    white-space: normal;
  }
`

const DateTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[2]} ${theme.spacing[4]}`};
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  white-space: nowrap;
  flex-shrink: 0;
`

const DateText = styled.span`
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.regular};
  font-size: ${({ theme }) => theme.fontSizes.xs};
  line-height: ${({ theme }) => theme.lineHeights.tight};
  color: ${({ theme }) => theme.colors.text.secondary};
`

// ── Description row ───────────────────────────────────────────────────────────

const DescriptionRow = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: stretch;
  width: 100%;
`

const ConnectorCol = styled.div`
  width: 24px;
  flex-shrink: 0;
  display: flex;
  justify-content: center;
  align-self: stretch;
`

const ConnectorLine = styled.div`
  width: 1px;
  height: 100%;
  background: ${({ theme }) => theme.colors.border.tertiary};
`

const DescriptionContainer = styled.div`
  display: flex;
  gap: ${({ theme }) => theme.spacing[10]};
  align-items: flex-start;
  padding: ${({ theme }) => `${theme.spacing[6]} 0`};
  flex: 1;
  min-width: 0;

  ${mq.tabletDown} {
    overflow-x: auto;
    scrollbar-width: none;
    &::-webkit-scrollbar { display: none; }
    padding-bottom: 8px;
  }
`

const Column = styled.div`
  flex-shrink: 0;
  width: 240px;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.tertiary};

  ${mq.mobile} {
    width: 200px;
  }
`

export default Journey
