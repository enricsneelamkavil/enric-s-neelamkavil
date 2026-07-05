import styled from 'styled-components'
import { mq } from '@/styles/theme'
import WorkCard from './WorkCard'
import type { Project } from '@/types/project'

interface Props {
  projects: Project[]
  view: 'grid' | 'list'
}

const WorksGrid = ({ projects, view }: Props) => {
  if (view === 'list') {
    return (
      <ListContainer>
        {projects.map((project) => (
          <WorkCard key={project.id} project={project} view="list" />
        ))}
      </ListContainer>
    )
  }

  return (
    <Grid>
      {projects.map((project) => (
        <WorkCard key={project.id} project={project} />
      ))}
    </Grid>
  )
}

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: ${({ theme }) => theme.spacing[10]};
  row-gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  @media (max-width: 1248px) and (min-width: 769px) {
    grid-template-columns: repeat(2, 1fr);
  }

  ${mq.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`

const ListContainer = styled.div`
  display: flex;
  flex-direction: column;
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  & > * + * {
    border-top: 1px solid ${({ theme }) => theme.colors.border.tertiary};
  }

  ${mq.mobile} {
    gap: ${({ theme }) => theme.spacing[6]};

    & > * + * {
      border-top: none;
    }
  }
`

export default WorksGrid
