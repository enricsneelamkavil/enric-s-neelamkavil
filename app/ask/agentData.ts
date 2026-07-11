// Data constants for enriching agent-generated cards in AgentMessage.tsx.
// Kept in sync with the source-of-truth components they mirror:
// - WORKS         → components/home/MyWorks.tsx
// - TRAVEL_PHOTOS → components/about/personal/TravelSection.tsx
// - CREDIT_CARDS  → components/about/personal/CreditCardsSection.tsx

export interface WorkData {
  title: string
  description: string
  tags: string[]
  cover_image_url: string
  cta_url: string
  flagship?: boolean
}

// Only these 3 are card-eligible for the /ask chat experience (per explicit
// spec — "these 3 ONLY"). Other projects (Unnathi, etc.) stay text-only,
// covered in SYSTEM_PROMPT's PROJECTS section in route.ts.
export const WORKS: WorkData[] = [
  {
    title: 'Plush',
    description: 'AI-powered credit card assistant',
    tags: ['CASE STUDY', 'FIN TECH', 'APPLICATION'],
    cover_image_url: '/home/works/featured/plush-feature.webp',
    cta_url: 'https://plush.money',
    flagship: true,
  },
  {
    title: 'Urban Trash',
    description: 'B2B waste aggregation platform dedicated to sustainable waste management.',
    tags: ['B2B', 'WEB APP'],
    cover_image_url: '/home/works/urban-trash.webp',
    cta_url: 'https://urbantrash.in',
  },
  {
    title: 'ReputeUp',
    description: 'Review management platform for gathering and showcasing testimonials.',
    tags: ['AI', 'LANDING'],
    cover_image_url: '/home/works/repute-up.webp',
    cta_url: 'https://www.behance.net/gallery/229810827/ReputeUp-AI-Review-Management-Landing',
  },
]

// NOTE: the task spec listed these as .png/.jpg — those extensions don't
// exist on disk. TravelSection.tsx confirms every travel photo was migrated
// to .webp, so the real current paths are used here instead.
export const TRAVEL_PHOTOS: Record<string, string> = {
  Qatar: '/about/personal/travel/qatar.webp',
  Singapore: '/about/personal/travel/singapore.webp',
  Malaysia: '/about/personal/travel/malaysia.webp',
  Vietnam: '/about/personal/travel/vietnam.webp',
  Oman: '/about/personal/travel/oman.webp',
  India: '/about/personal/travel/india.webp',
}

export interface CreditCardData {
  card_name: string
  card_image: string
}

export const CREDIT_CARDS: CreditCardData[] = [
  { card_name: 'American Express Membership Rewards', card_image: '/about/personal/cards/american-express-membership-rewards.webp' },
  { card_name: 'HDFC Marriott Bonvoy', card_image: '/about/personal/cards/hdfc-marriott-bonvoy.webp' },
  { card_name: 'PhonePe SBI Select Black', card_image: '/about/personal/cards/phonepe-sbi-select-black.webp' },
  { card_name: 'IDFC First Select', card_image: '/about/personal/cards/idfc-first-select.webp' },
  { card_name: 'HDFC Millennia', card_image: '/about/personal/cards/hdfc-millenia.webp' },
  { card_name: 'HDFC Swiggy', card_image: '/about/personal/cards/hdfc-swiggy.webp' },
  { card_name: 'Flipkart Axis', card_image: '/about/personal/cards/flipkart-axis.webp' },
  { card_name: 'ICICI Amazon Pay', card_image: '/about/personal/cards/icici-amazon-pay.webp' },
]

// Fixed identity data for the profile card — not model-generated content,
// since it's the same every time regardless of what was asked.
// NOTE: the spec named /about/header-banner.jpg, which doesn't exist on disk.
// Substituted the existing About page professional banner instead.
export const PROFILE = {
  name: 'Enric S Neelamkavil',
  role: 'Product & Experience Designer',
  company: 'UST',
  location: 'Thrissur, Kerala, IN',
  banner: '/about/professional/header.webp',
}
