# Yarn Over — Prototyp e-commerce

Prototyp sklepu z włóczkami zbudowany w Next.js 16 (App Router) z TypeScript i Tailwind CSS v4.

## Jak odpalić

```bash
npm run dev
```

Otwórz [http://localhost:3000](http://localhost:3000) w przeglądarce.

## Struktura folderów

```
src/
├── app/
│   ├── layout.tsx
│   ├── page.tsx
│   ├── globals.css
│   ├── collections/[slug]/page.tsx
│   └── products/[slug]/page.tsx
├── components/
│   ├── layout/        # Header, Footer, Navigation
│   ├── home/          # Sekcje strony głównej
│   ├── product/       # Karty i strony produktów
│   ├── ai/            # Komponenty AI asystenta
│   └── ui/            # Reużywalne elementy UI
└── lib/
    ├── mock-data/
    │   ├── products.ts    # 20 produktów włóczkowych
    │   └── collections.ts # 5 kolekcji
    └── types.ts           # Typy TypeScript
```

## Stack technologiczny

- **Next.js 16** — App Router, Server Components
- **TypeScript** — pełne typowanie
- **Tailwind CSS v4** — konfiguracja przez @theme w CSS
- **Radix UI** — dostępne komponenty (Dialog, Select, Tabs, Tooltip)
- **Framer Motion** — animacje
- **Lucide React** — ikony
- **next-themes** — dark/light mode

## Dane testowe

20 produktów włóczkowych w 5 wagach:
- 2 × lace (Hazel Knits, Malabrigo)
- 4 × fingering (Drops, Lang Yarns)
- 6 × DK (Istex, Drops, BC Garn)
- 5 × worsted (Cascade, Rowan, Schoppel)
- 3 × bulky (Drops, Katia)

## Następne kroki

1. Zbudować layout (Header, Footer, Navigation)
2. Zbudować stronę główną (Hero, Kolekcje, Produkty, Marquee)
3. Zbudować stronę produktu
4. Dodać AI asystenta
