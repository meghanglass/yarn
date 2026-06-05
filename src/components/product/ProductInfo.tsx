'use client';

import { useState } from 'react';
import Link from 'next/link';
import { Minus, Plus, Star } from 'lucide-react';
import { YarnProduct } from '@/lib/types';
import { Badge } from '@/components/ui/Badge';
import { Button } from '@/components/ui/Button';
import { ColorSwatch } from '@/components/ui/ColorSwatch';
import { GaugeBar } from '@/components/ui/GaugeBar';
import { useAI } from '@/contexts/AIContext';

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

interface ProductInfoProps {
  product: YarnProduct;
}

export function ProductInfo({ product }: ProductInfoProps) {
  const [selectedColorId, setSelectedColorId] = useState(product.colors[0]?.id);
  const [qty, setQty] = useState(1);
  const { openPanel } = useAI();

  const selectedColor = product.colors.find((c) => c.id === selectedColorId);

  return (
    <div className="sticky top-24">
      {/* Breadcrumb */}
      <nav className="flex items-center gap-1 font-body text-xs text-warm-grey mb-4">
        <Link href="/collections/all" className="hover:text-forest transition-colors">Sklep</Link>
        <span>/</span>
        <Link href={`/collections/${product.weight}`} className="hover:text-forest transition-colors capitalize">
          {weightLabels[product.weight]}
        </Link>
        <span>/</span>
        <span className="text-charcoal">{product.name}</span>
      </nav>

      {/* Badge row */}
      <div className="flex gap-2 mb-3">
        <Badge variant="weight">{weightLabels[product.weight]}</Badge>
        {product.isNew && <Badge variant="new">Nowość</Badge>}
        {product.isBestseller && <Badge variant="sale">Bestseller</Badge>}
      </div>

      {/* Name */}
      <h1 className="font-display text-4xl font-light text-charcoal leading-tight mb-1">
        {product.name}
      </h1>

      {/* Brand */}
      <p className="font-body text-sm text-warm-grey mb-3">
        przez{' '}
        <Link href="#" className="text-forest hover:underline">
          {product.brand}
        </Link>
      </p>

      {/* Rating */}
      <div className="flex items-center gap-2 mb-4">
        <div className="flex gap-0.5">
          {Array.from({ length: 5 }).map((_, i) => (
            <Star
              key={i}
              size={14}
              className={i < Math.round(product.rating) ? 'text-terracotta' : 'text-linen'}
              strokeWidth={1.5}
            />
          ))}
        </div>
        <span className="font-body text-xs text-warm-grey">{product.reviewCount} opinii</span>
      </div>

      {/* Price */}
      <p className="font-body text-xl font-medium text-forest mb-4">
        {product.price} zł / {product.weightGrams}g
        <span className="text-warm-grey text-sm font-normal ml-2">· ~{product.yardage}m</span>
      </p>

      <hr className="border-linen mb-4" />

      {/* Color selector */}
      <div className="mb-4">
        <p className="font-body text-sm text-charcoal mb-2">
          Kolor:{' '}
          <span className="font-medium">{selectedColor?.name ?? '—'}</span>
        </p>
        <div className="flex flex-wrap gap-2">
          {product.colors.map((c) => (
            <ColorSwatch
              key={c.id}
              color={c}
              selected={c.id === selectedColorId}
              onClick={() => setSelectedColorId(c.id)}
              size="lg"
            />
          ))}
        </div>
      </div>

      {/* Quantity stepper */}
      <div className="flex items-center gap-4 mb-5">
        <div className="flex items-center border border-linen">
          <button
            onClick={() => setQty((q) => Math.max(1, q - 1))}
            className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-parchment transition-colors"
          >
            <Minus size={14} />
          </button>
          <span className="w-10 text-center font-body text-sm">{qty}</span>
          <button
            onClick={() => setQty((q) => q + 1)}
            className="w-9 h-9 flex items-center justify-center text-charcoal hover:bg-parchment transition-colors"
          >
            <Plus size={14} />
          </button>
        </div>
        <p className="font-body text-xs text-warm-grey">
          {qty * product.weightGrams}g łącznie
        </p>
      </div>

      {/* CTAs */}
      <div className="flex flex-col gap-3 mb-6">
        <Button variant="primary" size="lg" className="w-full justify-center">
          Dodaj do koszyka
        </Button>
        {/* AI INTEGRATION POINT — następny etap */}
        <Button
          variant="secondary"
          size="md"
          className="w-full justify-center"
          onClick={() => openPanel(product)}
        >
          Sprawdź czy pasuje do twojego wzoru →
        </Button>
      </div>

      <hr className="border-linen mb-5" />

      {/* Specs */}
      <div className="mb-5">
        <p className="font-body text-xs uppercase tracking-widest text-warm-grey mb-3">
          Parametry techniczne
        </p>
        <dl className="space-y-2">
          {[
            ['Gęstość (gauge)', `${product.gauge.stitches} oczek / 10cm`],
            ['Waga', weightLabels[product.weight]],
            ['Skład', product.composition.join(', ')],
            ['Metraż', `${product.yardage}m / ${product.weightGrams}g`],
            ['Pielęgnacja', product.careInstructions[0]],
            ['Rozmiar drutu', product.gauge.needleSize],
          ].map(([label, value]) => (
            <div key={label} className="flex gap-2">
              <dt className="font-body text-xs text-warm-grey w-28 shrink-0">{label}</dt>
              <dd className="font-body text-xs text-charcoal">{value}</dd>
            </div>
          ))}
        </dl>
      </div>

      {/* Gauge bar */}
      <div className="mb-5">
        <GaugeBar stitches={product.gauge.stitches} weight={product.weight} />
      </div>

      {/* Project tags */}
      <div className="flex flex-wrap gap-2">
        {product.projectTypes.map((pt) => (
          <Link
            key={pt}
            href={`/collections/all?project=${pt}`}
            className="font-body text-xs uppercase tracking-widest text-forest border border-forest/30 px-3 py-1 hover:bg-forest hover:text-cream transition-colors"
          >
            {pt}
          </Link>
        ))}
      </div>
    </div>
  );
}
