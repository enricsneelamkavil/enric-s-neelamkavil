import { Fragment } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import SectionLabel from '@/components/shared/SectionLabel'
import SectionHeader from '@/components/shared/SectionHeader'

// ─── Assets ───────────────────────────────────────────────────────────────────

const IMG_BULLET_SHIMMER    = '/about/journey/bullet-shimmer.svg'
const IMG_BULLET_DOT        = '/about/journey/bullet-dot.svg'
const IMG_BULLET_CONTAINER  = '/about/journey/bullet-container.svg'

// ─── Entry data ───────────────────────────────────────────────────────────────

interface JourneyEntry {
  key:        string
  bullet:     'shimmer' | 'container'
  logo:       string
  logoW:      number
  logoH:      number
  href:       string
  role:       string
  dates:      string
  columns:    React.ReactNode[]
}

const ENTRIES: JourneyEntry[] = [
  {
    key:    'ust',
    bullet: 'shimmer',
    logo:   '/about/journey/ust-icon.svg',
    logoW: 26, logoH: 28,
    href:   'https://ust.com',
    role:   'Associate Product Designer',
    dates:  'August 2024 – Present',
    columns: [
      "Building the world's most human centred travel app, personalised recommendations, and stress-free travel all in one place.",
      'Developed wireframes and interactive prototypes, accelerating timelines to enhance design approval rates.',
      'Handling end-to-end flows for expense management module solving complex problems with business thinking.',
      'Handling complex B2B use cases for admin dashboard designs, connecting end-to-end modules seamlessly.',
    ],
  },
  {
    key:    'fundesigns',
    bullet: 'container',
    logo:   '/about/journey/fundesigns-icon.svg',
    logoW: 28, logoH: 28,
    href:   'https://fundesign.in',
    role:   'Lead UI Designer',
    dates:  'May 2024 – July 2024',
    columns: [
      'Crafting user-centric products and the best experiences delivering the promise for clients all over the world.',
      'Led a design team to complete 15+ major projects, improving experiences for multiple clients for the company.',
      'Shipped projects with tight deadlines, with zero compromise on design quality or user experience.',
      'Worked across multiple domains solving problems across various industries and agencies ensuring user experience.',
    ],
  },
  {
    key:    'freelance',
    bullet: 'container',
    logo:   '/about/journey/freelance-icon.svg',
    logoW: 28, logoH: 28,
    href:   'https://mulearn.org',
    role:   'Graphic Designer / Video Editor',
    dates:  'Till May 2024',
    columns: [
      'UI Design Lead at GTech MuLearn redesigning the official website, creating new flows, screens & dashboards for MuLearn.',
      'Worked as a Graphic Design intern helping Hound Electric and EV High Performance Shop in their Graphic Design needs.',
      'Occasional Video Editor at Sanjos Voice, official media team of St. Joseph\'s Parish Shrine, Pavaratty.',
      'UI Designer in Christ College of Engineering Website Development team, Graphic Design Lead at GDSC CCE.',
    ],
  },
]

// ─── Component ────────────────────────────────────────────────────────────────

const Journey = () => (
  <Section>
    <TitleBlock>
      <SectionLabel>CAREER LADDER</SectionLabel>
      <SectionHeader before="How I got " muted="here" after="." />
    </TitleBlock>

    <JourneySection>
      {ENTRIES.map((entry, i) => {
        const isLast = i === ENTRIES.length - 1
        return (
          <Fragment key={entry.key}>
            <EntryRow>
              <BulletImg
                src={entry.bullet === 'shimmer' ? IMG_BULLET_SHIMMER : IMG_BULLET_CONTAINER}
                alt=""
                aria-hidden="true"
              />
              {entry.bullet === 'shimmer' && (
                <BulletInnerDot src={IMG_BULLET_DOT} alt="" aria-hidden="true" />
              )}

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

  ${mq.tablet} {
    max-width: none;
    padding: 0 24px;
  }

  ${mq.mobile} {
    max-width: none;
  }
`

const TitleBlock = styled.div`
  display: flex;
  flex-direction: column;
`

const JourneySection = styled.div`
  display: flex;
  flex-direction: column;
  gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;

  ${mq.mobile} {
    gap: 32px;
  }
`

// ── Entry row ─────────────────────────────────────────────────────────────────

const EntryRow = styled.div`
  position: relative;
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing[6]};
  width: 100%;

  ${mq.mobile} {
    flex-wrap: nowrap;
    gap: 16px;
    align-items: center;
  }
`

const BulletImg = styled.img`
  display: block;
  width: 24px;
  height: 24px;
  flex-shrink: 0;
  pointer-events: none;

  ${mq.mobile} {
    display: none;
  }
`

const BulletInnerDot = styled.img`
  position: absolute;
  left: 6px;
  top: 50%;
  transform: translateY(-50%);
  width: 12px;
  height: 12px;
  display: block;
  pointer-events: none;

  ${mq.mobile} {
    display: none;
  }
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
    font-size: ${({ theme }) => theme.fontSizes.md};
    line-height: 32px;
    white-space: normal;
    word-break: break-word;
    overflow-wrap: break-word;
    width: 100%;
  }
`

const DateTag = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: ${({ theme }) => `${theme.spacing[1]} ${theme.spacing[4]}`};
  background: ${({ theme }) => theme.colors.surface.tertiary};
  border: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  border-radius: ${({ theme }) => theme.radii.lg};
  white-space: nowrap;
  flex-shrink: 0;

  ${mq.mobile} {
    display: none;
  }
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

  ${mq.mobile} {
    display: none;
  }
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

  ${mq.mobile} {
    flex-direction: column;
    overflow-x: visible;
    gap: 32px;
    padding: 0;
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
    display: flex;
    align-items: flex-start;
    gap: 12px;
    width: auto;

    &::before {
      content: '';
      display: block;
      width: 8px;
      height: 8px;
      flex-shrink: 0;
      margin-top: 8px;
      background: ${({ theme }) => theme.colors.text.highlight};
      border-radius: 2px;
      transform: rotate(45deg);
    }

    &:nth-child(n+3) {
      display: none;
    }
  }
`

export default Journey
