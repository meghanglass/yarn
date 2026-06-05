export function Marquee() {
  const items = [
    'YARN OVER', 'MERINO', 'ALPACA', 'BAWEŁNA', 'FINGERING', 'DK WEIGHT', 'GĘSTOŚĆ (GAUGE)', 'WORSTED', 'LACE', 'NATURALNE WŁÓKNA',
  ];
  const text = items.join('  ·  ') + '  ·  ';

  return (
    <div className="bg-charcoal overflow-hidden py-4 group">
      <div className="flex animate-marquee group-hover:[animation-play-state:paused] whitespace-nowrap">
        {/* Duplicate for seamless loop */}
        {[0, 1].map((n) => (
          <span key={n} className="font-display font-light italic text-cream text-xl px-4 shrink-0">
            {text}
          </span>
        ))}
      </div>
    </div>
  );
}
