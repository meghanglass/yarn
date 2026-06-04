export interface GaugeSpec {
  stitches: number;
  rows: number;
  needleSize: string;
}

export interface YarnColor {
  id: string;
  name: string;
  hex: string;
  inStock: boolean;
}

export type YarnWeight =
  | 'lace' | 'fingering' | 'sport' | 'dk'
  | 'worsted' | 'aran' | 'bulky' | 'super-bulky';

export type ProjectType =
  | 'sweter' | 'czapka' | 'skarpety' | 'koc'
  | 'amigurumi' | 'akcesoria' | 'szal';

export interface YarnProduct {
  id: string;
  slug: string;
  name: string;
  brand: string;
  weight: YarnWeight;
  gauge: GaugeSpec;
  composition: string[];
  yardage: number;
  weightGrams: number;
  price: number;
  colors: YarnColor[];
  description: string;
  images: string[];
  tags: string[];
  rating: number;
  reviewCount: number;
  isNew: boolean;
  isBestseller: boolean;
  projectTypes: ProjectType[];
  careInstructions: string[];
}

export interface YarnCollection {
  id: string;
  slug: string;
  name: string;
  description: string;
  image: string;
  productIds: string[];
}
