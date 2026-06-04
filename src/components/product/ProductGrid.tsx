import { YarnProduct } from '@/lib/types';
import { ProductCard } from './ProductCard';
import { clsx } from 'clsx';

interface ProductGridProps {
  products: YarnProduct[];
  columns?: 2 | 3 | 4;
  showNewBadge?: boolean;
}

const colClasses: Record<number, string> = {
  2: 'grid-cols-2',
  3: 'grid-cols-1 sm:grid-cols-2 lg:grid-cols-3',
  4: 'grid-cols-2 md:grid-cols-3 lg:grid-cols-4',
};

export function ProductGrid({ products, columns = 4, showNewBadge }: ProductGridProps) {
  return (
    <div className={clsx('grid gap-x-4 gap-y-8 md:gap-x-6', colClasses[columns])}>
      {products.map((product) => (
        <ProductCard key={product.id} product={product} showNewBadge={showNewBadge} />
      ))}
    </div>
  );
}
