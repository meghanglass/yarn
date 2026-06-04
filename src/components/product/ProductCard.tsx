'use client';

import Link from 'next/link';
import { Heart, ShoppingCart } from 'lucide-react';
import { YarnProduct } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { GaugeBar } from '@/components/ui/GaugeBar';
import { ColorSwatch } from '@/components/ui/ColorSwatch';
import { useState } from 'react';

interface ProductCardProps {
  product: YarnProduct;
  showNewBadge?: boolean;
}

const weightLabels: Record<string, string> = {
  lace: 'Lace',
  fingering: 'Fingering',
  sport: 'Sport',
  dk: 'DK Weight',
  worsted: 'Worsted',
  aran: 'Aran',
  bulky: 'Bulky',
  'super-bulky': 'Super Bulky',
};

export function ProductCard({ product, showNewBadge }: ProductCardProps) {
  const [hovered, setHovered] = useState(false);

  return (
    <Link
      href={`/products/${product.slug}`}
      className="group block"
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      {/* Image */}
      <div
        className="relative overflow-hidden bg-parchment mb-3"
        style={{ aspectRatio: '3/4' }}
      >
        <img
          src={product.images[0]}
          alt={product.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* Hover overlay */}
        <div
          className={`absolute inset-0 bg-charcoal/20 flex flex-col items-center justify-end pb-4 gap-2 transition-opacity duration-200 ${
            hovered ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <button
            type="button"
            onClick={(e) => e.preventDefault()}
            className="flex items-center gap-2 bg-cream text-charcoal font-body text-sm px-4 py-2 hover:bg-forest hover:text-cream transition-colors"
          >
            <ShoppingCart size={14} />
            Dodaj do koszyka
          </button>
        </div>

        {/* Wishlist */}
        <button
          type="button"
          onClick={(e) => e.preventDefault()}
          className="absolute top-3 right-3 w-8 h-8 bg-cream/80 flex items-center justify-center hover:bg-cream transition-colors"
        >
          <Heart size={14} className="text-charcoal" />
        </button>

        {/* Badges */}
        <div className="absolute top-3 left-3 flex flex-col gap-1">
          {(showNewBadge || product.isNew) && <Badge variant="new">Nowość</Badge>}
          {product.isBestseller && <Badge variant="sale">Bestseller</Badge>}
        </div>
      </div>

      {/* Info */}
      <div
        className={`transition-transform duration-250 ${hovered ? '-translate-y-1' : ''}`}
      >
        <p className="font-body text-[11px] uppercase tracking-widest text-sage mb-1">
          {weightLabels[product.weight]}
          {product.composition[0] && ` · ${product.composition[0].replace(/^\d+% /, '')}`}
        </p>

        <h3 className="font-display text-lg text-charcoal leading-tight mb-0.5">
          {product.name}
        </h3>
        <p className="font-body text-xs text-warm-grey mb-2">przez {product.brand}</p>

        <GaugeBar stitches={product.gauge.stitches} weight={product.weight} mini />

        <div className="flex items-center gap-1.5 my-2">
          {product.colors.slice(0, 4).map((c) => (
            <ColorSwatch key={c.id} color={c} size="sm" />
          ))}
          {product.colors.length > 4 && (
            <span className="font-body text-[10px] text-warm-grey">
              +{product.colors.length - 4}
            </span>
          )}
        </div>

        <p className="font-body text-sm font-medium text-forest">
          {product.price} zł / {product.weightGrams}g
        </p>
      </div>
    </Link>
  );
}
