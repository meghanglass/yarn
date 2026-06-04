import { clsx } from 'clsx';

type BadgeVariant = 'weight' | 'new' | 'sale' | 'ai';

interface BadgeProps {
  variant?: BadgeVariant;
  children: React.ReactNode;
  className?: string;
}

const variantClasses: Record<BadgeVariant, string> = {
  weight: 'bg-sage-light text-forest',
  new: 'bg-terracotta text-white',
  sale: 'bg-charcoal text-cream',
  ai: 'bg-ai-light text-ai-accent',
};

export function Badge({ variant = 'weight', children, className }: BadgeProps) {
  return (
    <span
      className={clsx(
        'inline-block text-xs uppercase tracking-widest px-2 py-0.5 font-body',
        variantClasses[variant],
        className
      )}
    >
      {children}
    </span>
  );
}
