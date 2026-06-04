'use client';

import { useAI } from '@/contexts/AIContext';
import { Button } from '@/components/ui/Button';
import { YarnProduct } from '@/lib/types';

type Variant = 'strip' | 'button' | 'inline';

interface AITriggerButtonProps {
  context?: 'homepage' | 'product' | 'collection';
  product?: YarnProduct;
  variant?: Variant;
}

export function AITriggerButton({ product, variant = 'button' }: AITriggerButtonProps) {
  const { openPanel } = useAI();

  // AI INTEGRATION POINT — następny etap
  if (variant === 'strip') {
    return (
      <section className="bg-ai-light border-l-4 border-ai-accent">
        <div className="max-w-content mx-auto px-4 md:px-8 py-12 md:py-16 flex flex-col md:flex-row items-center gap-8 md:gap-16">
          {/* Icon */}
          <div className="shrink-0 text-ai-accent opacity-60 text-6xl font-display italic select-none">
            AI
          </div>

          {/* Text */}
          <div className="flex-1">
            <p className="font-body text-xs uppercase tracking-widest text-ai-accent mb-3">
              Asystent AI · Yarn Over
            </p>
            <h2 className="font-display text-3xl md:text-4xl font-light text-charcoal leading-snug mb-3">
              Nie wiesz, czy ta włóczka
              <br className="hidden md:block" /> zadziała w twoim wzorze?
            </h2>
            <p className="font-body text-base text-warm-grey leading-relaxed mb-6 max-w-prose">
              Powiedz mi co robisz i jaki masz gauge.
              Powiem Ci wprost: pasuje, nie pasuje, co zmienić i ile oczek przeliczyć.
            </p>
            <Button variant="ai" onClick={() => openPanel()}>
              Zapytaj asystenta →
            </Button>
          </div>
        </div>
      </section>
    );
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={() => openPanel(product)}
        className="font-body text-sm text-ai-accent underline hover:no-underline transition-all"
      >
        Zapytaj asystenta →
      </button>
    );
  }

  return (
    <Button variant="secondary" onClick={() => openPanel(product)}>
      Jak działa asystent?
    </Button>
  );
}
