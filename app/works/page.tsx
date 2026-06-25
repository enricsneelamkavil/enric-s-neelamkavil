import { getProjects } from '@/lib/works'
import WorksClient from '@/components/works/WorksClient'
import type { Project } from '@/types/project'

// Server component — fetches projects and passes to client for filter state
export default async function WorksPage() {
  const projects = await getProjects().catch((): Project[] => [])
  const featuredProject = projects.find((p) => p.featured) ?? null

  return <WorksClient projects={projects} featuredProject={featuredProject} />
}
