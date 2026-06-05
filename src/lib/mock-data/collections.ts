import { YarnCollection } from '../types';
import { COLLECTION_IMAGES } from '../yarn-photos';

export const collections: YarnCollection[] = [
  {
    id: 'col01',
    slug: 'jesien-zima',
    name: 'Jesień & Zima',
    description: 'Ciepłe włóczki na chłodne miesiące — grube wełny, alpaki i tweedowe mieszanki.',
    image: COLLECTION_IMAGES['jesien-zima'],
    productIds: ['p13', 'p14', 'p17', 'p18', 'p19', 'p20'],
  },
  {
    id: 'col02',
    slug: 'islandzkie-klimaty',
    name: 'Islandzkie Klimaty',
    description: 'Autentyczne wełny islandzkie do lopapeysy i nordyckich wzorów.',
    image: COLLECTION_IMAGES['islandzkie-klimaty'],
    productIds: ['p07', 'p10'],
  },
  {
    id: 'col03',
    slug: 'skarpety-i-akcesoria',
    name: 'Skarpety & Akcesoria',
    description: 'Cienkie, trwałe przędziwa idealne do skarpet, rękawiczek i drobnych projektów.',
    image: COLLECTION_IMAGES['skarpety-i-akcesoria'],
    productIds: ['p03', 'p05', 'p06'],
  },
  {
    id: 'col04',
    slug: 'eko-i-organiczne',
    name: 'Eko & Organiczne',
    description: 'Włóczki z certyfikowanych surowców, przyjazne dla środowiska i skóry.',
    image: COLLECTION_IMAGES['eko-i-organiczne'],
    productIds: ['p09', 'p11'],
  },
  {
    id: 'col05',
    slug: 'premium-luksus',
    name: 'Premium & Luksus',
    description: 'Wyjątkowe włóczki z najlepszych włókien — merino, alpaka, tweed. Dla wymagających.',
    image: COLLECTION_IMAGES['premium-luksus'],
    productIds: ['p02', 'p01', 'p17', 'p20', 'p04'],
  },
];
