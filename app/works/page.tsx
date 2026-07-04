import { getProjects } from '@/lib/works'
import WorksClient from '@/components/works/WorksClient'
import type { Project } from '@/types/project'

export default async function WorksPage() {
  const projects = await getProjects().catch((): Project[] => [])
  return <WorksClient projects={projects} />
}
