'use client'

import { useState, useMemo } from 'react'
import styled from 'styled-components'
import { mq } from '@/styles/theme'
import PageHeader from './PageHeader'
import FilterRow from './FilterRow'
import FeaturedCard from './FeaturedCard'
import WorksGrid from './WorksGrid'
import type { Project } from '@/types/project'

interface Props {
  projects: Project[]
}

const WorksClient = ({ projects }: Props) => {
  const [activeFilter, setActiveFilter] = useState('all')

  const gridProjects = useMemo(() => {
    if (activeFilter === 'all') return projects
    return projects.filter((p) => p.type === activeFilter)
  }, [projects, activeFilter])

  // FeaturedCard (Plush) is hardcoded — always show on 'all' and 'case-study' tabs
  const showFeatured = activeFilter === 'all' || activeFilter === 'case-study'

  // Count label: featured card counts as 1 extra when visible
  const totalShown = showFeatured ? gridProjects.length + 1 : gridProjects.length

  // Per-tab badge counts — derived from full projects list
  const counts = useMemo(
    () => ({
      all:              projects.length,
      'case-study':     projects.filter((p) => p.type === 'case-study').length,
      'landing':        projects.filter((p) => p.type === 'landing').length,
      'brand-identity': projects.filter((p) => p.type === 'brand-identity').length,
    }),
    [projects],
  )

  return (
    <PageSections>
      {/* Header + filter tabs + featured card share a tighter gap on mobile */}
      <HeroGroup>
        <PageHeader />
        <FilterRow
          activeFilter={activeFilter}
          onFilterChange={setActiveFilter}
          counts={counts}
          totalShown={totalShown}
        />
        {showFeatured && <FeaturedCard />}
      </HeroGroup>

      {gridProjects.length > 0 && <WorksGrid projects={gridProjects} />}

      {gridProjects.length === 0 && !showFeatured && (
        <EmptyState>
          {projects.length === 0
            ? 'No projects yet.'
            : 'No projects in this category.'}
        </EmptyState>
      )}
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
