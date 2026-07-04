export interface MediumArticle {
  title: string
  url: string
  thumbnail: string | null
  readTime: string
  pubDate: string
}

const FEED_URL =
  'https://api.rss2json.com/v1/api.json?rss_url=https://medium.com/feed/@enricsneelamkavil'

function stripHtml(html: string): string {
  return html.replace(/<[^>]*>/g, ' ').replace(/\s+/g, ' ').trim()
}

function calcReadTime(content: string): string {
  const words = stripHtml(content).split(/\s+/).filter(Boolean).length
  const minutes = Math.max(1, Math.ceil(words / 200))
  return `${minutes} min read`
}

interface RssItem {
  title: string
  link: string
  thumbnail?: string
  description?: string
  content?: string
  pubDate?: string
}

interface RssResponse {
  status: string
  items: RssItem[]
}

function extractThumbnail(item: RssItem): string | null {
  if (item.thumbnail) return item.thumbnail
  const html = item.content ?? item.description ?? ''
  const match = html.match(/<img[^>]+src=["']([^"']+)["']/i)
  return match ? match[1] : null
}

export async function fetchMediumArticles(): Promise<MediumArticle[]> {
  const res = await fetch(FEED_URL)
  if (!res.ok) throw new Error(`rss2json error: ${res.status}`)
  const data: RssResponse = await res.json()
  if (data.status !== 'ok') throw new Error('Feed not ok')
  return data.items.slice(0, 3).map(item => ({
    title: item.title,
    url: item.link,
    thumbnail: extractThumbnail(item),
    readTime: calcReadTime(item.content ?? item.description ?? ''),
    pubDate: item.pubDate ?? '',
  }))
}
