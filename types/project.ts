export interface Project {
  id: string
  title: string
  description: string
  tags: string[]
  type: 'case-study' | 'landing' | 'brand-identity'
  cover_image_url: string | null
  cta_url: string | null
  bg_color?: string
  sort_order: number
  created_at: string
}

export type ProjectType = Project['type']
