'use client';

import Link from 'next/link';
import { Button } from '@/components/ui/Button';
import { AITriggerButton } from '@/components/ai/AITriggerButton';

const heroImages = [
  'https://picsum.photos/seed/yarn-warm1/400/530',
  'https://picsum.photos/seed/yarn-warm2/340/460',
  'https://picsum.photos/seed/yarn-warm3/380/500',
  'https://picsum.photos/seed/yarn-warm4/360/480',
];

export function Hero() {
  return (
    <section
      className="relative min-h-screen flex items-center bg-cream overflow-hidden"
      style={{
        backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='200' height='200'%3E%3Cfilter id='n'%3E%3CfeTurbulence type='fractalNoise' baseFrequency='0.85' numOctaves='4' stitchTiles='stitch'/%3E%3C/filter%3E%3Crect width='200' height='200' filter='url(%23n)' opacity='0.03'/%3E%3C/svg%3E")`,
      }}
    >
      <div className="max-w-content mx-auto px-4 md:px-8 w-full py-24 md:py-0">
        <div className="grid grid-cols-1 md:grid-cols-[40fr_60fr] gap-12 md:gap-8 items-center min-h-[calc(100svh-5rem)]">
          {/* Left: text */}
          <div className="flex flex-col justify-center py-16">
            <p className="font-body text-xs uppercase tracking-widest text-warm-grey mb-6">
              Kolekcja Jesień · 2026
            </p>

            <h1 className="font-display font-light italic text-charcoal leading-[1.05] mb-6"
              style={{ fontSize: 'clamp(3rem, 5vw, 5rem)' }}
            >
              Włóczka, która
              <br />
              zadziała.
            </h1>

            <p className="font-body text-lg text-warm-grey max-w-sm mb-8 leading-relaxed">
              Nie zgadujesz. Dobierasz pewnie.
            </p>

            <div className="flex flex-wrap gap-3">
              <Link href="/collections/all">
                <Button variant="primary" size="lg">
                  Przeglądaj kolekcję →
                </Button>
              </Link>
              <AITriggerButton variant="button" context="homepage" />
            </div>

            {/* Scroll indicator */}
            <div className="hidden md:flex items-center gap-3 mt-16 text-warm-grey">
              <div className="w-12 h-px bg-linen" />
              <span className="font-body text-xs uppercase tracking-widest">przewiń</span>
            </div>
          </div>

          {/* Right: asymmetric image grid */}
          <div className="relative hidden md:grid grid-cols-2 gap-4 py-12 pr-4">
            <div className="flex flex-col gap-4 pt-8">
              <div className="overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img src={heroImages[0]} alt="" className="w-full h-full object-cover" />
              </div>
              <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img src={heroImages[1]} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
            <div className="flex flex-col gap-4">
              <div className="overflow-hidden" style={{ aspectRatio: '4/3' }}>
                <img src={heroImages[2]} alt="" className="w-full h-full object-cover transform rotate-[-2deg] scale-105" />
              </div>
              <div className="overflow-hidden" style={{ aspectRatio: '3/4' }}>
                <img src={heroImages[3]} alt="" className="w-full h-full object-cover" />
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
