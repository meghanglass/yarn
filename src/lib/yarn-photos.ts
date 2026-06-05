/**
 * yarn-photos.ts
 * Curated Unsplash photo mapping for yarn products.
 * Uses real CDN URLs (images.unsplash.com / plus.unsplash.com).
 *
 * Photo selection by weight category, with overrides for:
 *   – alpaka (soft, tactile close-ups)
 *   – wełna islandzka (rustic, natural textures)
 *
 * Rotation: product is assigned pool[parseInt(id) % pool.length]
 */

// ─── CDN lookup table (Unsplash slug → real CDN base URL) ────────────────────

const PHOTO_URLS: Record<string, string> = {
  // Free tier
  'huX8hfbrEh4': 'https://images.unsplash.com/photo-1700170726155-fe844921b8b3',
  'eHm_wq_Ys7M': 'https://images.unsplash.com/photo-1668072587819-7b393944b426',
  'BEvyoJYYSj0': 'https://images.unsplash.com/photo-1651651705570-0a081884ce44',
  'NFY_Wp26FQs': 'https://images.unsplash.com/photo-1646282993025-1489baeab7c2',
  'lxw686JyMT8': 'https://images.unsplash.com/photo-1594350532402-72001d9fe5a0',
  'fBC5zbfYUR4': 'https://images.unsplash.com/photo-1682954100067-c4356f636c6b',
  'VtEhG6WCi0Y': 'https://images.unsplash.com/photo-1573515823142-bcf3395c2fec',
  'nEA6MiZVmMM': 'https://images.unsplash.com/photo-1668072587859-f0f30c8fa938',
  '2V3EFff6-V8': 'https://images.unsplash.com/photo-1598871956222-26b66d6559fe',
  'pQEVLcIPcig': 'https://images.unsplash.com/photo-1610383120881-32c3b9db9408',
  'f1vPjvlE9Xs': 'https://images.unsplash.com/photo-1585910464277-ee5c59db78e4',
  'kfzzaTbvEJg': 'https://images.unsplash.com/photo-1573966096406-46add444162f',
  'neCu4YrL5F4': 'https://images.unsplash.com/photo-1673696267683-90e6b4bcb24d',
  'tR-WQwtDLZk': 'https://images.unsplash.com/photo-1674069686850-e350be379976',
  'xOws9FMLwMw': 'https://images.unsplash.com/photo-1632335023958-149d57da14fb',
  'uABNMG8e2ic': 'https://images.unsplash.com/photo-1645550294607-c9955e906ba2',
  '1t1jNg1XCkg': 'https://images.unsplash.com/photo-1773747688454-61ad512ffd5b',
  'e7ReGL97vyA': 'https://images.unsplash.com/photo-1674069687674-bff44be844ec',
  // Plus (premium)
  'lDCSMallwyk': 'https://plus.unsplash.com/premium_photo-1675799745773-d00668d9790d',
  'x68qb8XY3Sg': 'https://plus.unsplash.com/premium_photo-1675799887840-98178eff888d',
  'BaG_neaXJM4': 'https://plus.unsplash.com/premium_photo-1674624789813-aee3aaa976cb',
  'yxWcKOZMNtk': 'https://plus.unsplash.com/premium_photo-1675799579678-c4298935a936',
  'eb2sS_sRGog': 'https://plus.unsplash.com/premium_photo-1675799551089-d264f8f2900b',
  'mwPjGCBc2H8': 'https://plus.unsplash.com/premium_photo-1706520001443-e099ad30b807',
};

// ─── Photo pools per weight category (3 slugs each) ──────────────────────────

const WEIGHT_POOLS: Record<string, string[]> = {
  'lace':         ['huX8hfbrEh4', 'VtEhG6WCi0Y', 'neCu4YrL5F4'],
  'fingering':    ['uABNMG8e2ic', 'kfzzaTbvEJg', '1t1jNg1XCkg'],
  'sport':        ['neCu4YrL5F4', 'e7ReGL97vyA', '1t1jNg1XCkg'],
  'dk':           ['lDCSMallwyk', 'NFY_Wp26FQs', 'fBC5zbfYUR4'],
  'worsted':      ['eb2sS_sRGog', 'nEA6MiZVmMM', 'pQEVLcIPcig'],
  'aran':         ['pQEVLcIPcig', 'yxWcKOZMNtk', 'xOws9FMLwMw'],
  'bulky':        ['yxWcKOZMNtk', 'BaG_neaXJM4', 'eHm_wq_Ys7M'],
  'super-bulky':  ['eHm_wq_Ys7M', 'BaG_neaXJM4', 'lDCSMallwyk'],
};

// Alpaca: soft, muted, tactile close-ups
const ALPACA_POOL  = ['BEvyoJYYSj0', 'x68qb8XY3Sg', 'tR-WQwtDLZk'];

// Icelandic wool: rustic, natural
const ICELANDIC_POOL = ['lxw686JyMT8', '2V3EFff6-V8', 'f1vPjvlE9Xs'];

// ─── Static exports ───────────────────────────────────────────────────────────

export const HERO_IMAGES = [
  u('e7ReGL97vyA', { w: 400, h: 530 }),
  u('mwPjGCBc2H8', { w: 340, h: 460 }),
  u('NFY_Wp26FQs',  { w: 380, h: 500 }),
  u('xOws9FMLwMw',  { w: 360, h: 480 }),
];

export const CATEGORY_IMAGES: Record<string, string> = {
  fingering: u('neCu4YrL5F4', { w: 800, h: 600 }),
  dk:        u('fBC5zbfYUR4', { w: 800, h: 600 }),
  bulky:     u('yxWcKOZMNtk', { w: 800, h: 600 }),
};

export const COLLECTION_IMAGES: Record<string, string> = {
  'jesien-zima':          u('lxw686JyMT8', { w: 800, h: 600 }),
  'islandzkie-klimaty':   u('2V3EFff6-V8', { w: 800, h: 600 }),
  'skarpety-i-akcesoria': u('kfzzaTbvEJg', { w: 800, h: 600 }),
  'eko-i-organiczne':     u('NFY_Wp26FQs', { w: 800, h: 600 }),
  'premium-luksus':       u('BEvyoJYYSj0', { w: 800, h: 600 }),
};

export const EDITORIAL_IMAGE = u('mwPjGCBc2H8', { w: 900, h: 600 });

// ─── Core helpers ─────────────────────────────────────────────────────────────

interface ImageOpts {
  w?: number;
  h?: number;
  fit?: string;
  q?: number;
  crop?: 'center' | 'top' | 'bottom';
}

function u(slugId: string, opts: ImageOpts = {}): string {
  const base = PHOTO_URLS[slugId];
  if (!base) {
    console.warn(`[yarn-photos] Unknown slug: ${slugId}`);
    return '';
  }
  const { w = 600, h = 800, fit = 'crop', q = 80, crop } = opts;
  const cropParam = crop ? `&crop=${crop}` : '';
  return `${base}?w=${w}&h=${h}&fit=${fit}${cropParam}&q=${q}`;
}

// Public alias (used in components that need custom sizes)
export { u as buildUnsplashUrl };

function isAlpaca(composition: string[])    { return composition.some(c => c.toLowerCase().includes('alpaka')); }
function isIcelandic(composition: string[]) { return composition.some(c => c.toLowerCase().includes('islandzka')); }

function selectPool(weight: string, composition: string[]): string[] {
  if (isIcelandic(composition)) return ICELANDIC_POOL;
  if (isAlpaca(composition))    return ALPACA_POOL;
  return WEIGHT_POOLS[weight] ?? WEIGHT_POOLS['dk'];
}

function idToIndex(productId: string): number {
  return parseInt(productId.replace(/\D/g, ''), 10) || 0;
}

// ─── Public API ───────────────────────────────────────────────────────────────

export function getProductImageUrl(
  product: { id: string; weight: string; composition: string[] },
  opts: ImageOpts = {}
): string {
  const pool = selectPool(product.weight, product.composition);
  const slug = pool[idToIndex(product.id) % pool.length];
  return u(slug, opts);
}

export function getProductGalleryImages(
  product: { id: string; weight: string; composition: string[] }
): [string, string, string] {
  const pool = selectPool(product.weight, product.composition);
  const slug = pool[idToIndex(product.id) % pool.length];
  return [
    u(slug, { crop: 'center' }),
    u(slug, { crop: 'top' }),
    u(slug, { crop: 'bottom' }),
  ];
}
