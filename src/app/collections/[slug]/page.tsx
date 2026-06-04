'use client';

import { useState, useMemo, use } from 'react';
import { X } from 'lucide-react';
import { products } from '@/lib/mock-data/products';
import { YarnWeight } from '@/lib/types';
import { ProductGrid } from '@/components/product/ProductGrid';

const weightLabels: Record<string, string> = {
  all: 'Wszystkie produkty',
  lace: 'Lace Weight',
  fingering: 'Fingering Weight',
  sport: 'Sport Weight',
  dk: 'DK Weight',
  worsted: 'Worsted Weight',
  aran: 'Aran Weight',
  bulky: 'Bulky Weight',
  'super-bulky': 'Super Bulky',
};

const weightDescriptions: Record<string, string> = {
  all: 'Pełen asortyment — lace, fingering, DK, worsted, bulky i więcej.',
  fingering: '30–35 oczek / 10 cm · Do skarpet, rękawiczek i delikatnych akcesoriów',
  lace: '28–36 oczek / 10 cm · Koronkowe szale, chusty i delikatne swetry',
  dk: '22–24 oczka / 10 cm · Wszechstronne włóczki na swetery, czapki i akcesoria',
  worsted: '18–20 oczek / 10 cm · Klasyczne projekty, Aran, swetery i koce',
  bulky: '12–14 oczek / 10 cm · Szybkie projekty — gotowe w jeden wieczór',
};

export default function CollectionPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);

  const [filters, setFilters] = useState<{ weight: YarnWeight[]; priceMax: number }>({
    weight: [],
    priceMax: 200,
  });
  const [sort, setSort] = useState<'featured' | 'price-asc' | 'price-desc' | 'new'>('featured');

  const filtered = useMemo(() => {
    let list = [...products];

    // Slug filter
    if (slug !== 'all' && Object.keys(weightLabels).includes(slug)) {
      list = list.filter((p) => p.weight === slug);
    }

    // Active weight filter chips
    if (filters.weight.length > 0) {
      list = list.filter((p) => filters.weight.includes(p.weight));
    }

    // Price filter
    list = list.filter((p) => p.price <= filters.priceMax);

    // Sort
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price);
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price);
    else if (sort === 'new') list.sort((a, b) => (b.isNew ? 1 : 0) - (a.isNew ? 1 : 0));

    return list;
  }, [slug, filters, sort]);

  const title = weightLabels[slug] ?? 'Kolekcja';
  const description = weightDescriptions[slug] ?? '';

  const removeWeightFilter = (w: YarnWeight) =>
    setFilters((f) => ({ ...f, weight: f.weight.filter((x) => x !== w) }));

  return (
    <div className="bg-cream min-h-screen">
      {/* Collection header */}
      <div className="max-w-content mx-auto px-4 md:px-8 pt-32 pb-8">
        <h1 className="font-display font-light text-charcoal leading-tight mb-2"
          style={{ fontSize: 'clamp(2rem, 4vw, 3.5rem)' }}
        >
          {title}
        </h1>
        {description && (
          <p className="font-body text-sm text-warm-grey mb-2">{description}</p>
        )}
        <p className="font-body text-xs text-warm-grey">{filtered.length} produktów</p>
      </div>

      {/* Filter + Sort bar */}
      <div className="sticky top-16 md:top-20 z-30 bg-cream border-y border-linen">
        <div className="max-w-content mx-auto px-4 md:px-8 py-3 flex items-center justify-between gap-4">
          <div className="flex items-center gap-2 overflow-x-auto">
            <span className="font-body text-xs uppercase tracking-widest text-warm-grey shrink-0">Filtry:</span>
            {(['fingering', 'dk', 'worsted', 'bulky', 'lace'] as YarnWeight[]).map((w) => (
              <button
                key={w}
                onClick={() =>
                  setFilters((f) => ({
                    ...f,
                    weight: f.weight.includes(w)
                      ? f.weight.filter((x) => x !== w)
                      : [...f.weight, w],
                  }))
                }
                className={`font-body text-xs px-3 py-1 border transition-colors whitespace-nowrap capitalize ${
                  filters.weight.includes(w)
                    ? 'bg-forest text-cream border-forest'
                    : 'border-linen text-charcoal hover:border-forest'
                }`}
              >
                {w}
              </button>
            ))}
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className="font-body text-xs text-warm-grey hidden md:block">Sort:</span>
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="font-body text-xs border border-linen bg-cream text-charcoal px-2 py-1 outline-none"
            >
              <option value="featured">Polecane</option>
              <option value="price-asc">Cena rosnąco</option>
              <option value="price-desc">Cena malejąco</option>
              <option value="new">Nowości</option>
            </select>
          </div>
        </div>

        {/* Active filter chips */}
        {filters.weight.length > 0 && (
          <div className="max-w-content mx-auto px-4 md:px-8 pb-3 flex items-center gap-2 flex-wrap">
            {filters.weight.map((w) => (
              <button
                key={w}
                onClick={() => removeWeightFilter(w)}
                className="flex items-center gap-1 font-body text-xs bg-forest/10 text-forest px-2 py-1 capitalize"
              >
                {w} <X size={10} />
              </button>
            ))}
            <button
              onClick={() => setFilters((f) => ({ ...f, weight: [] }))}
              className="font-body text-xs text-warm-grey underline hover:text-charcoal"
            >
              Wyczyść wszystko
            </button>
          </div>
        )}
      </div>

      {/* Product grid */}
      <div className="max-w-content mx-auto px-4 md:px-8 py-10">
        <p className="font-body text-xs text-warm-grey mb-6">
          Pokazuję {filtered.length} z {products.length} produktów
        </p>

        {filtered.length > 0 ? (
          <ProductGrid products={filtered} columns={4} />
        ) : (
          <div className="py-24 text-center">
            <p className="font-display text-2xl font-light italic text-warm-grey mb-4">
              Brak produktów spełniających kryteria.
            </p>
            <button
              onClick={() => setFilters({ weight: [], priceMax: 200 })}
              className="font-body text-sm text-forest underline"
            >
              Wyczyść filtry
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
