'use client';

import Link from 'next/link';
import { YarnProduct } from '@/lib/types';
import { getProductImageUrl } from '@/lib/yarn-photos';

const weightLabels: Record<string, string> = {
  lace: 'Lace',
  fingering: 'Fingering',
  sport: 'Sport',
  dk: 'DK',
  worsted: 'Worsted',
  aran: 'Aran',
  bulky: 'Bulky',
  'super-bulky': 'Super Bulky',
};

interface InlineProductCardProps {
  product: YarnProduct;
}

export function InlineProductCard({ product }: InlineProductCardProps) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex gap-3 bg-white rounded-lg border border-linen p-3 hover:shadow-sm transition-shadow duration-200 no-underline"
      style={{ maxWidth: 360 }}
    >
      {/* Image */}
      <div className="shrink-0 rounded-sm overflow-hidden" style={{ width: 60, height: 80 }}>
        <img
          src={getProductImageUrl(product, { w: 60, h: 80 })}
          alt={product.name}
          className="w-full h-full object-cover"
          width={60}
          height={80}
        />
      </div>

      {/* Info */}
      <div className="flex-1 min-w-0 flex flex-col justify-between gap-1">
        {/* Weight badge */}
        <span className="font-body text-xs uppercase tracking-widest text-forest bg-sage/20 rounded-sm px-1.5 py-0.5 self-start leading-none">
          {weightLabels[product.weight] ?? product.weight}
        </span>

        {/* Name + brand */}
        <div>
          <span className="block font-display text-base text-charcoal leading-tight truncate">
            {product.name}
          </span>
          <span className="block font-body text-xs text-warm-grey truncate">
            {product.brand}
          </span>
        </div>

        {/* Gauge text */}
        <span className="font-body text-xs text-warm-grey">
          {product.gauge.stitches} oczka / 10cm
        </span>

        {/* Price + CTA */}
        <div className="flex items-center justify-between gap-2 mt-auto">
          <span className="font-body text-sm font-medium text-forest">
            {product.price} zł
          </span>
          <span className="font-body text-xs border border-forest text-forest rounded px-2 py-0.5 group-hover:bg-forest group-hover:text-cream transition-colors duration-150 whitespace-nowrap">
            Zobacz →
          </span>
        </div>
      </div>
    </Link>
  );
}
