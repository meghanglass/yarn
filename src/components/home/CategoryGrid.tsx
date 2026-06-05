import Link from 'next/link';
import { CATEGORY_IMAGES } from '@/lib/yarn-photos';

const categories = [
  {
    slug: 'fingering',
    name: 'Fingering & Lace',
    description: 'Do skarpet i chust.',
    image: CATEGORY_IMAGES['fingering'],
  },
  {
    slug: 'dk',
    name: 'DK & Worsted',
    description: 'Wszechstronne. Swetrów ponad.',
    image: CATEGORY_IMAGES['dk'],
  },
  {
    slug: 'bulky',
    name: 'Bulky',
    description: 'Szybkie projekty.',
    image: CATEGORY_IMAGES['bulky'],
  },
];

export function CategoryGrid() {
  return (
    <section className="py-20 bg-parchment">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          {categories.map((cat) => (
            <Link
              key={cat.slug}
              href={`/collections/${cat.slug}`}
              className="group relative overflow-hidden bg-linen"
              style={{ aspectRatio: '4/3' }}
            >
              <img
                src={cat.image}
                alt={cat.name}
                className="absolute inset-0 w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-charcoal/20 group-hover:bg-charcoal/40 transition-colors duration-300" />
              <div className="absolute inset-0 flex flex-col justify-end p-6">
                <h3 className="font-display font-light italic text-cream text-2xl leading-tight mb-1">
                  {cat.name}
                </h3>
                <p className="font-body text-sm text-cream/80 mb-3">{cat.description}</p>
                <span className="font-body text-xs uppercase tracking-widest text-cream/70 group-hover:text-cream transition-colors">
                  Przeglądaj →
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
