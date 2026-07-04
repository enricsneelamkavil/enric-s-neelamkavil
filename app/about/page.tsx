import { getTimelineEvents } from '@/lib/timeline'
import AboutClient from '@/components/about/AboutClient'

export const dynamic = 'force-dynamic'

export default async function About() {
  const events = await getTimelineEvents()
  return <AboutClient timelineEvents={events} />
}
