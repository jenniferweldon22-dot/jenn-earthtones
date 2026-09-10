export const CATEGORIES = [
  { label: 'All Work', value: 'all' },
  { label: 'Landscape', value: 'landscape' },
  { label: 'Abstract', value: 'abstract' },
  { label: 'Wildlife', value: 'wildlife' },
  { label: 'Lifestyle', value: 'lifestyle' },
]

export const PRODUCTS = [
  {
    id: 1,
    slug: 'dune-solitude',
    title: 'Dune Solitude',
    artNumber: 'No. 001',
    price: 19.99,
    category: 'landscape',
    description: 'Quiet desert curves rendered in warm terracotta, sand, and muted olive sediment.',
    details: [
      'Dune Solitude captures the silent calm of desert topography through soft, sweeping bands of natural color.',
      'Printed on premium heavyweight archival fine art paper with vivid, fade-resistant mineral inks.',
    ],
    medium: 'Archival Fine Art Print',
    badge: 'Best Seller',
    sizes: [
      { label: 'Fine Art Print — 8" x 10"', dimensions: '8 x 10 in', price: 19.99 },
      { label: 'Fine Art Print — 12" x 16"', dimensions: '12 x 16 in', price: 29.99 },
      { label: 'Fine Art Print — 18" x 24"', dimensions: '18 x 24 in', price: 44.99 },
    ],
    palette: ['#C08A5C', '#E4C9A3', '#707A46', '#F7F1E7'],
    images: ['/art/art-1.jpg'],
    isNew: false,
    available: true,
    createdAt: '2026-08-22',
    checkoutUrl: 'https://square.link/u/cxsQGWXR',
  },
  {
    id: 2,
    slug: 'strata-in-ochre',
    title: 'Strata in Ochre',
    artNumber: 'No. 002',
    price: 19.99,
    category: 'abstract',
    description: 'Rich, tactile wave ridges in terracotta, warm mustard, and slate grey.',
    details: [
      'Captures the physical depth of heavy-body palette knife strokes and layered mineral pigments.',
      'Printed on museum-grade matte archival paper to highlight the layered impasto textures.',
    ],
    medium: 'Archival Fine Art Print',
    badge: 'Limited Edition',
    sizes: [
      { label: 'Fine Art Print — 8" x 10"', dimensions: '8 x 10 in', price: 19.99 },
      { label: 'Fine Art Print — 12" x 12"', dimensions: '12 x 12 in', price: 24.99 },
      { label: 'Fine Art Print — 18" x 18"', dimensions: '18 x 18 in', price: 39.99 },
    ],
    palette: ['#B14E33', '#C99A3A', '#6B7076', '#3A342F'],
    images: ['/art/art-2.jpg'],
    isNew: false,
    available: true,
    createdAt: '2026-07-30',
    checkoutUrl: 'https://square.link/u/RODWuxYW',
  },
  {
    id: 3,
    slug: 'sedona-sunset',
    title: 'Sedona Sunset',
    artNumber: 'No. 003',
    price: 19.99,
    category: 'landscape',
    description: 'Golden hour amber sun sinking behind layered canyon rock formations.',
    details: [
      'Drenched in rich dusk red, warm rust, and glowing desert light.',
      'Reproduced on archival cotton-rag stock for rich color saturation and warmth.',
    ],
    medium: 'Archival Fine Art Print',
    badge: 'New',
    sizes: [
      { label: 'Fine Art Print — 8" x 10"', dimensions: '8 x 10 in', price: 19.99 },
      { label: 'Fine Art Print — 12" x 16"', dimensions: '12 x 16 in', price: 29.99 },
      { label: 'Fine Art Print — 16" x 20"', dimensions: '16 x 20 in', price: 39.99 },
    ],
    palette: ['#9A3B30', '#E0A339', '#D97A54', '#3A2418'],
    images: ['/art/art-3.jpg'],
    isNew: true,
    available: true,
    createdAt: '2026-09-02',
    checkoutUrl: 'https://square.link/u/80al1zUK',
  },
  {
    id: 4,
    slug: 'alabaster-spiral',
    title: 'Alabaster Spiral',
    artNumber: 'No. 004',
    price: 19.99,
    category: 'abstract',
    description: 'Textured plaster relief arcs creating natural shadow and organic movement.',
    details: [
      'A monochrome, architectural relief celebrating light, shadow, and tactile contour.',
      'Printed on textured fine art stock preserving every sculpted groove.',
    ],
    medium: 'Archival Fine Art Print',
    badge: 'Original Edition',
    sizes: [
      { label: 'Fine Art Print — 8" x 10"', dimensions: '8 x 10 in', price: 19.99 },
      { label: 'Fine Art Print — 12" x 12"', dimensions: '12 x 12 in', price: 24.99 },
      { label: 'Fine Art Print — 18" x 18"', dimensions: '18 x 18 in', price: 39.99 },
    ],
    palette: ['#D8C7AE', '#B39A78', '#8A7150', '#4A3B2A'],
    images: ['/art/art-4.jpg'],
    isNew: false,
    available: true,
    createdAt: '2026-06-18',
    checkoutUrl: 'https://square.link/u/dtIwRiL3',
  },
  {
    id: 5,
    slug: 'the-sentinel',
    title: 'The Sentinel',
    artNumber: 'No. 005',
    price: 19.99,
    category: 'wildlife',
    description: 'A focused cheetah portrait framed by deep botanical greenery and wild orchids.',
    details: [
      'Pairs a calm, direct wildlife gaze with vivid jungle botanical tones.',
      'High-definition archival print showcasing fine pattern work and vibrant tropical hues.',
    ],
    medium: 'Archival Fine Art Print',
    badge: 'Best Seller',
    sizes: [
      { label: 'Fine Art Print — 8" x 10"', dimensions: '8 x 10 in', price: 19.99 },
      { label: 'Fine Art Print — 12" x 18"', dimensions: '12 x 18 in', price: 29.99 },
      { label: 'Fine Art Print — 18" x 27"', dimensions: '18 x 27 in', price: 44.99 },
    ],
    palette: ['#C99A3A', '#4E5631', '#9A3B30', '#F7F1E7'],
    images: ['/art/art-5.jpg'],
    isNew: false,
    available: true,
    createdAt: '2026-07-05',
    checkoutUrl: 'https://square.link/u/TYgsPYLZ',
  },
  {
    id: 6,
    slug: 'aperitivo-hour',
    title: 'Aperitivo Hour',
    artNumber: 'No. 006',
    price: 19.99,
    category: 'lifestyle',
    description: 'Sunny table flat-lay with an Aperol spritz, sliced oranges, and gingham pattern.',
    details: [
      'A vibrant Mediterranean afternoon frozen in crisp color and cheerful pattern.',
      'Archival print with rich pigments designed to bring instant warmth to any dining or kitchen space.',
    ],
    medium: 'Archival Fine Art Print',
    badge: 'New',
    sizes: [
      { label: 'Fine Art Print — 8" x 10"', dimensions: '8 x 10 in', price: 19.99 },
      { label: 'Fine Art Print — 11" x 14"', dimensions: '11 x 14 in', price: 24.99 },
      { label: 'Fine Art Print — 16" x 20"', dimensions: '16 x 20 in', price: 34.99 },
    ],
    palette: ['#E0A339', '#3B5C86', '#F7F1E7', '#B14E33'],
    images: ['/art/art-6.jpg'],
    isNew: true,
    available: true,
    createdAt: '2026-09-05',
    checkoutUrl: 'https://square.link/u/Q8XlKMTG',
  },
]

// Named alias and default export to ensure compatibility across all imports
export const products = PRODUCTS
export default PRODUCTS

export function getProductBySlug(slug) {
  return PRODUCTS.find((p) => p.slug === slug)
}

export function getRelatedProducts(product, count = 4) {
  if (!product) return []
  const sameCategory = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category === product.category
  )
  if (sameCategory.length >= count) return sameCategory.slice(0, count)

  const rest = PRODUCTS.filter(
    (p) => p.id !== product.id && p.category !== product.category
  )
  return [...sameCategory, ...rest].slice(0, count)
}
