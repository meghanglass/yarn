import Link from 'next/link';
import { products } from '@/lib/mock-data/products';
import { ProductGrid } from '@/components/product/ProductGrid';

const newProducts = products.filter((p) => p.isNew).slice(0, 4);

export function NewArrivals() {
  return (
    <section className="py-20 bg-parchment">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="flex flex-col md:flex-row md:items-end gap-6 md:gap-16 mb-12">
          <h2 className="font-display font-light text-charcoal leading-tight"
            style={{ fontSize: 'clamp(2rem, 4vw, 3rem)' }}
          >
            Właśnie
            <br />dotarło
          </h2>
          <Link
            href="/collections/all"
            className="font-body text-sm text-forest hover:underline md:mb-2"
          >
            Zobacz wszystkie nowości →
          </Link>
        </div>

        <ProductGrid products={newProducts} columns={4} showNewBadge />
      </div>
    </section>
  );
}
