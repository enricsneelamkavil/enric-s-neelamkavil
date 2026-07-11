'use client'

import { useState, useMemo } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import PageHeader from '@/components/shared/PageHeader'
import FilterRow from './FilterRow'
import FeaturedCard from './FeaturedCard'
import WorksGrid from './WorksGrid'
import ProcessSection from './ProcessSection'
import type { Project } from '@/types/project'

interface Props {
  projects: Project[]
}

const WorksClient = ({ projects }: Props) => {
  const [activeFilter, setActiveFilter] = useState('all')
  const [view, setView] = useState<'grid' | 'list'>('grid')

  const gridProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((p) => p.type === activeFilter)
  }, [projects, activeFilter])

  // FeaturedCard (Plush) is hardcoded — always show on 'all' and 'case-study' tabs
  const showFeatured = activeFilter === 'all' || activeFilter === 'case-study'

  // Count label: featured card counts as 1 extra when visible
  const totalShown = showFeatured ? gridProjects.length + 1 : gridProjects.length

  // Per-tab badge counts — derived from full projects list
  // +1 on 'all' and 'case-study': the hardcoded FeaturedCard (Plush) isn't in `projects`
  // but is shown on both those tabs, so it must count toward their badges.
  const counts = useMemo(
    () => ({
      all:              projects.length + 1,
      'case-study':     projects.filter((p) => p.type === 'case-study').length + 1,
      'landing':        projects.filter((p) => p.type === 'landing').length,
      'brand-identity': projects.filter((p) => p.type === 'brand-identity').length,
    }),
    [projects],
  )

  return (
    <PageSections>
      {/* Header + filter tabs + featured card share a tighter gap on mobile */}
      <HeroGroup>
        <PageHeader
          label="WORKS"
          titleBefore="crafting the "
          titleMuted="finest"
          titleAfter=" of all."
        />
        <FilterRow
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
          totalShown={totalShown}
          view={view}
          onViewChange={setView}
        />
        {showFeatured && <FeaturedCard />}
      </HeroGroup>

      {gridProjects.length > 0 && <WorksGrid projects={gridProjects} view={view} />}

      {gridProjects.length === 0 && !showFeatured && (
        <EmptyState>
          {projects.length === 0
            ? 'No projects yet.'
            : 'No projects in this category.'}
        </EmptyState>
      )}

      <ProcessSection />
    </PageSections>
  )
}

// ─── Layout ──────────────────────────────────────────────────────────────────

const PageSections = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  padding-top: 8.75rem; /* 140px — below fixed navbar */
  gap: ${({ theme }) => theme.spacing[10]}; /* 40px between HeroGroup and grid */

  ${mq.tablet} {
    padding-top: 6rem;
  }

  ${mq.mobile} {
    padding-top: ${({ theme }) => theme.spacing[10]}; /* 40px */
    gap: 72px; /* Figma: outer gap between header/filter/featured group and grid */
  }
`

/* Groups PageHeader + FilterRow + FeaturedCard with their own inner gap */
const HeroGroup = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 100%;
  gap: ${({ theme }) => theme.spacing[10]}; /* 40px desktop */

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[8]}; /* 32px — Figma Text Container gap */
  }
`

const EmptyState = styled.p`
  margin: 0;
  font-family: ${({ theme }) => theme.fonts.sans};
  font-weight: ${({ theme }) => theme.fontWeights.light};
  font-size: ${({ theme }) => theme.fontSizes.sm};
  line-height: ${({ theme }) => theme.lineHeights.normal};
  color: ${({ theme }) => theme.colors.text.secondary};
`

export default WorksClient
