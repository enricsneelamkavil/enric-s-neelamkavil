import styled from 'styled-components'
import { mq } from '@/styles/theme'
import WorkCard from './WorkCard'
import type { Project } from '@/types/project'

interface Props {
  projects: Project[]
}

const WorksGrid = ({ projects }: Props) => (
  <Grid>
    {projects.map((project) => (
      <WorkCard key={project.id} project={project} />
    ))}
  </Grid>
)

const Grid = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  column-gap: ${({ theme }) => theme.spacing[6]};
  row-gap: ${({ theme }) => theme.spacing[10]};
  width: 100%;
  max-width: ${({ theme }) => theme.layout.maxWidth};

  ${mq.mobile} {
    grid-template-columns: 1fr;
    gap: ${({ theme }) => theme.spacing[6]};
  }
`

export default WorksGrid
