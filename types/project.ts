export interface Project {
  id: string
  title: string
  description: string
  long_description: string | null
  tagline: string | null
  role: string | null
  timeline: string | null
  tags: string[]
  type: 'case-study' | 'landing' | 'brand-identity'
  featured: boolean
  cover_image_url: string | null
  logo_url: string | null
  cta_label: string | null
  cta_url: string | null
  sort_order: number
  created_at: string
}

export type ProjectType = Project['type']
