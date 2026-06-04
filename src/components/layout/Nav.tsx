'use client';

import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Search, Heart, ShoppingCart, Menu, X, ChevronDown } from 'lucide-react';
import { clsx } from 'clsx';
import { products } from '@/lib/mock-data/products';
import { useAI } from '@/contexts/AIContext';

const bestseller = products.find((p) => p.isBestseller) ?? products[0];

const shopWeights = [
  { label: 'Lace', href: '/collections/lace' },
  { label: 'Fingering', href: '/collections/fingering' },
  { label: 'DK', href: '/collections/dk' },
  { label: 'Worsted', href: '/collections/worsted' },
  { label: 'Bulky', href: '/collections/bulky' },
];

const shopComposition = [
  { label: 'Wełna', href: '/collections/welna' },
  { label: 'Merino', href: '/collections/merino' },
  { label: 'Bawełna', href: '/collections/bawelna' },
  { label: 'Alpaka', href: '/collections/alpaka' },
  { label: 'Mieszanki', href: '/collections/mieszanki' },
];

const mainLinks = [
  { label: 'Sklep', href: '/collections/all', hasDropdown: true },
  { label: 'Kolekcje', href: '/collections/all', hasDropdown: false },
  { label: 'O nas', href: '#', hasDropdown: false },
  { label: 'Blog', href: '#', hasDropdown: false },
];

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const [shopOpen, setShopOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  return (
    <>
      <header
        className={clsx(
          'fixed top-0 left-0 right-0 z-50 transition-all duration-300',
          scrolled ? 'bg-cream shadow-sm' : 'bg-transparent'
        )}
      >
        <div className="max-w-content mx-auto px-4 md:px-8">
          <div className="flex items-center justify-between h-16 md:h-20">
            {/* Logo */}
            <Link
              href="/"
              className="font-display font-light tracking-[0.15em] text-2xl text-charcoal hover:text-forest transition-colors"
            >
              YARN OVER
            </Link>

            {/* Desktop nav */}
            <nav className="hidden md:flex items-center gap-8">
              {mainLinks.map((link) =>
                link.hasDropdown ? (
                  <div
                    key={link.label}
                    className="relative"
                    onMouseEnter={() => setShopOpen(true)}
                    onMouseLeave={() => setShopOpen(false)}
                  >
                    <button className="flex items-center gap-1 font-body text-sm uppercase tracking-[0.06em] text-charcoal hover:text-forest transition-colors">
                      {link.label}
                      <ChevronDown size={14} className={clsx('transition-transform', shopOpen && 'rotate-180')} />
                    </button>

                    {shopOpen && (
                      <div className="absolute top-full left-1/2 -translate-x-1/2 pt-4">
                        <div className="bg-cream border border-linen shadow-lg p-6 grid grid-cols-3 gap-8 w-[640px]">
                          <div>
                            <p className="font-body text-xs uppercase tracking-widest text-warm-grey mb-3">
                              Według wagi
                            </p>
                            <ul className="space-y-2">
                              {shopWeights.map((w) => (
                                <li key={w.label}>
                                  <Link
                                    href={w.href}
                                    className="font-body text-sm text-charcoal hover:text-forest transition-colors"
                                  >
                                    {w.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-body text-xs uppercase tracking-widest text-warm-grey mb-3">
                              Według składu
                            </p>
                            <ul className="space-y-2">
                              {shopComposition.map((c) => (
                                <li key={c.label}>
                                  <Link
                                    href={c.href}
                                    className="font-body text-sm text-charcoal hover:text-forest transition-colors"
                                  >
                                    {c.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          </div>
                          <div>
                            <p className="font-body text-xs uppercase tracking-widest text-warm-grey mb-3">
                              Polecamy
                            </p>
                            <Link href={`/products/${bestseller.slug}`} className="block group">
                              <div
                                className="aspect-[3/4] bg-linen mb-2 overflow-hidden"
                                style={{
                                  backgroundImage: `url(${bestseller.images[0]})`,
                                  backgroundSize: 'cover',
                                  backgroundPosition: 'center',
                                }}
                              />
                              <p className="font-display text-sm text-charcoal group-hover:text-forest transition-colors">
                                {bestseller.name}
                              </p>
                              <p className="font-body text-xs text-warm-grey">{bestseller.brand}</p>
                            </Link>
                          </div>
                        </div>
                      </div>
                    )}
                  </div>
                ) : (
                  <Link
                    key={link.label}
                    href={link.href}
                    className="font-body text-sm uppercase tracking-[0.06em] text-charcoal hover:text-forest transition-colors"
                  >
                    {link.label}
                  </Link>
                )
              )}
            </nav>

            {/* Desktop icons */}
            <div className="hidden md:flex items-center gap-4">
              <button className="text-charcoal hover:text-forest transition-colors">
                <Search size={20} />
              </button>
              <button className="text-charcoal hover:text-forest transition-colors">
                <Heart size={20} />
              </button>
              <button className="relative text-charcoal hover:text-forest transition-colors">
                <ShoppingCart size={20} />
                <span className="absolute -top-2 -right-2 w-4 h-4 bg-terracotta text-white text-[10px] rounded-full flex items-center justify-center font-body">
                  0
                </span>
              </button>
            </div>

            {/* Mobile icons */}
            <div className="flex md:hidden items-center gap-3">
              <button className="text-charcoal">
                <Search size={20} />
              </button>
              <button className="relative text-charcoal">
                <ShoppingCart size={20} />
              </button>
              <button
                className="text-charcoal"
                onClick={() => setMobileOpen(true)}
              >
                <Menu size={24} />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Mobile overlay menu */}
      {mobileOpen && (
        <div className="fixed inset-0 z-[60] bg-cream flex flex-col">
          <div className="flex items-center justify-between px-4 h-16">
            <span className="font-display font-light tracking-[0.15em] text-2xl text-charcoal">
              YARN OVER
            </span>
            <button onClick={() => setMobileOpen(false)} className="text-charcoal">
              <X size={24} />
            </button>
          </div>
          <nav className="flex-1 px-6 py-8 flex flex-col gap-6">
            {mainLinks.map((link) => (
              <Link
                key={link.label}
                href={link.href}
                onClick={() => setMobileOpen(false)}
                className="font-display font-light text-3xl text-charcoal hover:text-forest transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>
        </div>
      )}
    </>
  );
}
