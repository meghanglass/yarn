'use client';

import { notFound } from 'next/navigation';
import { useState, use } from 'react';
import { products } from '@/lib/mock-data/products';
import { ProductGallery } from '@/components/product/ProductGallery';
import { ProductInfo } from '@/components/product/ProductInfo';
import { ProductGrid } from '@/components/product/ProductGrid';

const tabList = ['Opis', 'Szczegóły techniczne', 'Wskazówki pielęgnacji', 'Opinie'];

export default function ProductPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = use(params);
  const product = products.find((p) => p.slug === slug);
  const [activeTab, setActiveTab] = useState(0);

  if (!product) notFound();

  const related = products
    .filter((p) => p.weight === product.weight && p.id !== product.id)
    .slice(0, 4);

  return (
    <div className="bg-cream min-h-screen">
      {/* Main 2-col layout */}
      <div className="max-w-content mx-auto px-4 md:px-8 pt-28 pb-16">
        <div className="grid grid-cols-1 md:grid-cols-[55fr_45fr] gap-8 md:gap-12">
          <ProductGallery images={product.images} productName={product.name} />
          <ProductInfo product={product} />
        </div>
      </div>

      {/* Tabs section */}
      <div className="border-t border-linen bg-cream">
        <div className="max-w-content mx-auto px-4 md:px-8">
          {/* Tab bar */}
          <div className="flex border-b border-linen overflow-x-auto">
            {tabList.map((tab, i) => (
              <button
                key={tab}
                onClick={() => setActiveTab(i)}
                className={`font-body text-sm px-5 py-4 whitespace-nowrap border-b-2 transition-colors ${
                  activeTab === i
                    ? 'border-charcoal text-charcoal'
                    : 'border-transparent text-warm-grey hover:text-charcoal'
                }`}
              >
                {tab === 'Opinie' ? `${tab} (${product.reviewCount})` : tab}
              </button>
            ))}
          </div>

          {/* Tab content */}
          <div className="py-8 max-w-text">
            {activeTab === 0 && (
              <p className="font-body text-base text-charcoal leading-relaxed">{product.description}</p>
            )}
            {activeTab === 1 && (
              <dl className="space-y-3">
                {[
                  ['Skład', product.composition.join(', ')],
                  ['Metraż', `${product.yardage}m / ${product.weightGrams}g`],
                  ['Gęstość (gauge)', `${product.gauge.stitches} oczek / ${product.gauge.rows} rzędów na 10cm`],
                  ['Rozmiar drutu', product.gauge.needleSize],
                  ['Tagi', product.tags.join(', ')],
                ].map(([k, v]) => (
                  <div key={k} className="flex gap-4">
                    <dt className="font-body text-xs uppercase tracking-widest text-warm-grey w-32 shrink-0 pt-0.5">{k}</dt>
                    <dd className="font-body text-sm text-charcoal">{v}</dd>
                  </div>
                ))}
              </dl>
            )}
            {activeTab === 2 && (
              <ul className="space-y-2">
                {product.careInstructions.map((instr) => (
                  <li key={instr} className="flex items-start gap-2 font-body text-sm text-charcoal">
                    <span className="text-sage mt-0.5">—</span>
                    {instr}
                  </li>
                ))}
              </ul>
            )}
            {activeTab === 3 && (
              <div className="text-center py-8">
                <p className="font-display text-2xl font-light italic text-warm-grey mb-2">
                  {product.reviewCount} opinii
                </p>
                <p className="font-body text-sm text-warm-grey">
                  Opinie klientów będą dostępne wkrótce.
                </p>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Related products */}
      {related.length > 0 && (
        <div className="border-t border-linen bg-parchment py-16">
          <div className="max-w-content mx-auto px-4 md:px-8">
            <h2 className="font-display font-light text-charcoal text-2xl mb-8">
              Możesz też potrzebować
            </h2>
            <ProductGrid products={related} columns={4} />
          </div>
        </div>
      )}
    </div>
  );
}
