import { YarnWeight } from '@/lib/types';
import { clsx } from 'clsx';

interface GaugeBarProps {
  stitches: number;
  weight: YarnWeight;
  mini?: boolean;
}

const GAUGE_MIN = 10;
const GAUGE_MAX = 36;

export function GaugeBar({ stitches, mini = false }: GaugeBarProps) {
  const pct = Math.min(100, Math.max(0, ((stitches - GAUGE_MIN) / (GAUGE_MAX - GAUGE_MIN)) * 100));

  return (
    <div className={clsx('w-full', mini ? 'py-1' : 'py-2')}>
      {!mini && (
        <div className="flex justify-between items-center mb-1">
          <span className="font-body text-xs text-warm-grey uppercase tracking-widest">Gauge</span>
          <span className="font-body text-xs text-charcoal">{stitches} oczek/10cm</span>
        </div>
      )}
      <div className="relative w-full bg-linen rounded-full" style={{ height: mini ? 3 : 4 }}>
        <div
          className="absolute inset-y-0 left-0 bg-forest rounded-full"
          style={{ width: `${pct}%` }}
        />
        <div
          className="absolute top-1/2 -translate-y-1/2 -translate-x-1/2 w-2 h-2 bg-forest rounded-full border-2 border-cream"
          style={{ left: `${pct}%` }}
        />
      </div>
      {!mini && (
        <div className="flex justify-between mt-1">
          <span className="font-body text-[10px] text-warm-grey">bulky</span>
          <span className="font-body text-[10px] text-warm-grey">lace</span>
        </div>
      )}
    </div>
  );
}
