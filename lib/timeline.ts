import { supabase } from '@/lib/supabase'

export interface TimelineEvent {
  id: string
  title: string
  subtitle: string
  description: string | null
  photo_url: string | null
  image_position: 'above' | 'below'
  sort_order: number
  created_at: string
}

export async function getTimelineEvents(): Promise<TimelineEvent[]> {
  const { data, error } = await supabase
    .from('timeline_events')
    .select('*')
    .order('sort_order', { ascending: true })

  if (error) {
    console.error('Failed to fetch timeline events:', error)
    return []
  }

  return (data ?? []) as TimelineEvent[]
}
