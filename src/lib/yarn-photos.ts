/**
 * yarn-photos.ts
 * Unsplash photo mapping for yarn products.
 * Photo selection is based on weight category, with special handling
 * for alpaca (soft textures) and Icelandic wool (rustic textures).
 *
 * Usage:
 *   getProductImageUrl(product)              → 600×800 gallery URL
 *   getProductImageUrl(product, { w:60, h:80 }) → thumbnail URL
 *   getProductGalleryImages(product)         → [center, top, bottom] crop variants
 */

const BASE = 'https://images.unsplash.com/photo-';

// ─── Photo pools per weight category ─────────────────────────────────────────
// 3 photos per pool, rotated by product.id numeric index

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
const ALPACA_POOL = ['BEvyoJYYSj0', 'x68qb8XY3Sg', 'tR-WQwtDLZk'];

// Icelandic wool: rustic, natural, unspun character
const ICELANDIC_POOL = ['lxw686JyMT8', '2V3EFff6-V8', 'f1vPjvlE9Xs'];

// ─── Lifestyle / editorial photos (non-product) ───────────────────────────────

export const HERO_IMAGES = [
  { id: 'e7ReGL97vyA', w: 400, h: 530 }, // person holding yarn ball
  { id: 'mwPjGCBc2H8', w: 340, h: 460 }, // woman in pink sweater
  { id: 'NFY_Wp26FQs', w: 380, h: 500 }, // basket of yarn with plant
  { id: 'xOws9FMLwMw', w: 360, h: 480 }, // skeins on wooden table
].map(({ id, w, h }) => `${BASE}${id}?w=${w}&h=${h}&fit=crop&q=80`);

export const CATEGORY_IMAGES: Record<string, string> = {
  fingering: `${BASE}neCu4YrL5F4?w=800&h=600&fit=crop&q=80`,
  dk:        `${BASE}fBC5zbfYUR4?w=800&h=600&fit=crop&q=80`,
  bulky:     `${BASE}yxWcKOZMNtk?w=800&h=600&fit=crop&q=80`,
};

export const COLLECTION_IMAGES: Record<string, string> = {
  'jesien-zima':         `${BASE}lxw686JyMT8?w=800&h=600&fit=crop&q=80`, // rustic knit — autumn/winter
  'islandzkie-klimaty':  `${BASE}2V3EFff6-V8?w=800&h=600&fit=crop&q=80`, // natural icelandic rolls
  'skarpety-i-akcesoria':`${BASE}kfzzaTbvEJg?w=800&h=600&fit=crop&q=80`, // colorful thin yarns
  'eko-i-organiczne':    `${BASE}NFY_Wp26FQs?w=800&h=600&fit=crop&q=80`, // basket with plant — natural
  'premium-luksus':      `${BASE}BEvyoJYYSj0?w=800&h=600&fit=crop&q=80`, // ultra soft close-up
};

export const EDITORIAL_IMAGE = `${BASE}mwPjGCBc2H8?w=900&h=600&fit=crop&q=80`;

// ─── Core helpers ─────────────────────────────────────────────────────────────

interface ImageOpts {
  w?: number;
  h?: number;
  fit?: string;
  q?: number;
  crop?: 'center' | 'top' | 'bottom';
}

export function buildUnsplashUrl(photoId: string, opts: ImageOpts = {}): string {
  const { w = 600, h = 800, fit = 'crop', q = 80, crop } = opts;
  const cropParam = crop ? `&crop=${crop}` : '';
  return `${BASE}${photoId}?w=${w}&h=${h}&fit=${fit}${cropParam}&q=${q}`;
}

function isAlpaca(composition: string[]): boolean {
  return composition.some(c => c.toLowerCase().includes('alpaka'));
}

function isIcelandic(composition: string[]): boolean {
  return composition.some(c => c.toLowerCase().includes('islandzka'));
}

function selectPool(weight: string, composition: string[]): string[] {
  if (isIcelandic(composition)) return ICELANDIC_POOL;
  if (isAlpaca(composition))    return ALPACA_POOL;
  return WEIGHT_POOLS[weight] ?? WEIGHT_POOLS['dk'];
}

function idToIndex(productId: string): number {
  return parseInt(productId.replace(/\D/g, ''), 10) || 0;
}

// ─── Public API ───────────────────────────────────────────────────────────────

/**
 * Returns a single Unsplash image URL for a product.
 * Default size: 600×800 (gallery). Pass opts to override dimensions.
 */
export function getProductImageUrl(
  product: { id: string; weight: string; composition: string[] },
  opts: ImageOpts = {}
): string {
  const pool = selectPool(product.weight, product.composition);
  const idx = idToIndex(product.id) % pool.length;
  return buildUnsplashUrl(pool[idx], opts);
}

/**
 * Returns 3 crop variants of the same image for use in a product gallery.
 */
export function getProductGalleryImages(
  product: { id: string; weight: string; composition: string[] }
): [string, string, string] {
  const pool = selectPool(product.weight, product.composition);
  const idx = idToIndex(product.id) % pool.length;
  const id = pool[idx];
  return [
    buildUnsplashUrl(id, { crop: 'center' }),
    buildUnsplashUrl(id, { crop: 'top' }),
    buildUnsplashUrl(id, { crop: 'bottom' }),
  ];
}
