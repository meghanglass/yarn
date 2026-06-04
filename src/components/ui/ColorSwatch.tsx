'use client';

import { YarnColor } from '@/lib/types';
import { clsx } from 'clsx';
import { useState } from 'react';

type SwatchSize = 'sm' | 'md' | 'lg';

interface ColorSwatchProps {
  color: YarnColor;
  selected?: boolean;
  onClick?: () => void;
  size?: SwatchSize;
}

const sizeMap: Record<SwatchSize, { outer: string; inner: string }> = {
  sm: { outer: 'w-4 h-4', inner: 'w-3 h-3' },
  md: { outer: 'w-5 h-5', inner: 'w-5 h-5' },
  lg: { outer: 'w-6 h-6', inner: 'w-6 h-6' },
};

export function ColorSwatch({ color, selected = false, onClick, size = 'md' }: ColorSwatchProps) {
  const [showTooltip, setShowTooltip] = useState(false);
  const { outer } = sizeMap[size];

  return (
    <div className="relative inline-block">
      <button
        type="button"
        title={color.name}
        onClick={onClick}
        onMouseEnter={() => setShowTooltip(true)}
        onMouseLeave={() => setShowTooltip(false)}
        className={clsx(
          'rounded-full transition-all duration-150 flex-shrink-0',
          outer,
          selected
            ? 'ring-2 ring-charcoal ring-offset-1'
            : 'ring-1 ring-linen',
          !color.inStock && 'opacity-40'
        )}
        style={{ backgroundColor: color.hex }}
      />
      {showTooltip && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-1.5 z-50 pointer-events-none">
          <div className="bg-charcoal text-cream font-body text-[10px] px-2 py-1 whitespace-nowrap">
            {color.name}
            {!color.inStock && ' (brak)'}
          </div>
        </div>
      )}
    </div>
  );
}
