'use client';

import Link from 'next/link';

const shopLinks = [
  { label: 'Wszystkie produkty', href: '/collections/all' },
  { label: 'DK & Worsted', href: '/collections/dk' },
  { label: 'Fingering & Lace', href: '/collections/fingering' },
  { label: 'Bulky', href: '/collections/bulky' },
  { label: 'Nowości', href: '/collections/all' },
];

const helpLinks = [
  { label: 'FAQ', href: '#' },
  { label: 'Kontakt', href: '#' },
  { label: 'Polityka zwrotów', href: '#' },
  { label: 'Wysyłka', href: '#' },
];

export function Footer() {
  return (
    <footer className="bg-charcoal text-cream">
      <div className="max-w-content mx-auto px-4 md:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
          {/* Col 1: Brand */}
          <div>
            <p className="font-display font-light tracking-[0.15em] text-2xl mb-4">YARN OVER</p>
            <p className="font-body text-sm text-warm-grey leading-relaxed mb-6">
              Włóczki z charakterem.<br />Dobrane z głową.
            </p>
            <div className="flex gap-4">
              <a href="#" className="text-warm-grey hover:text-cream transition-colors font-body text-xs tracking-widest pt-0.5">
                Instagram
              </a>
              <a href="#" className="text-warm-grey hover:text-cream transition-colors">
                {/* Pinterest */}
                <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5">
                  <path d="M12 2C6.48 2 2 6.48 2 12c0 4.24 2.65 7.86 6.39 9.29-.09-.78-.17-1.98.04-2.83.18-.77 1.22-5.18 1.22-5.18s-.31-.63-.31-1.56c0-1.46.85-2.55 1.9-2.55.9 0 1.34.67 1.34 1.48 0 .9-.58 2.25-.88 3.5-.25 1.04.52 1.89 1.55 1.89 1.86 0 3.12-2.4 3.12-5.24 0-2.16-1.46-3.68-3.55-3.68-2.42 0-3.84 1.81-3.84 3.69 0 .73.28 1.51.63 1.94a.25.25 0 0 1 .06.24c-.06.26-.21.86-.24.98-.04.16-.13.19-.3.12-1.1-.51-1.79-2.13-1.79-3.43 0-2.78 2.02-5.34 5.83-5.34 3.06 0 5.44 2.18 5.44 5.09 0 3.04-1.91 5.48-4.56 5.48-.89 0-1.73-.46-2.02-1.01l-.55 2.06c-.2.77-.74 1.73-1.1 2.32.83.26 1.7.4 2.61.4 5.52 0 10-4.48 10-10S17.52 2 12 2z" />
                </svg>
              </a>
              <a href="#" className="text-warm-grey hover:text-cream transition-colors font-body text-xs tracking-widest pt-0.5">
                Ravelry
              </a>
            </div>
          </div>

          {/* Col 2: Shop */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-warm-grey mb-4">Sklep</p>
            <ul className="space-y-3">
              {shopLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Help */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-warm-grey mb-4">Pomoc</p>
            <ul className="space-y-3">
              {helpLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="font-body text-sm text-cream/70 hover:text-cream transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 4: Newsletter */}
          <div>
            <p className="font-body text-xs uppercase tracking-widest text-warm-grey mb-4">Newsletter</p>
            <p className="font-body text-sm text-cream/70 mb-4 leading-relaxed">
              Nowości, wskazówki i informacje o kolekcjach — bez spamu.
            </p>
            <form onSubmit={(e) => e.preventDefault()} className="flex gap-2">
              <input
                type="email"
                placeholder="twój@email.pl"
                className="flex-1 bg-white/10 border border-white/20 text-cream placeholder:text-warm-grey font-body text-sm px-3 py-2 outline-none focus:border-cream transition-colors"
              />
              <button
                type="submit"
                className="bg-terracotta text-white font-body text-sm px-4 py-2 hover:bg-terracotta-light transition-colors whitespace-nowrap"
              >
                Zapisz się
              </button>
            </form>
          </div>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-white/10">
        <div className="max-w-content mx-auto px-4 md:px-8 py-4 flex flex-col md:flex-row justify-between items-center gap-2">
          <p className="font-body text-xs text-warm-grey">© 2026 Yarn Over</p>
          <div className="flex gap-4">
            <a href="#" className="font-body text-xs text-warm-grey hover:text-cream transition-colors">
              Polityka prywatności
            </a>
            <a href="#" className="font-body text-xs text-warm-grey hover:text-cream transition-colors">
              Cookies
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
