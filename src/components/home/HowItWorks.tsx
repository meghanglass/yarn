const steps = [
  {
    number: '01',
    title: 'Znajdź wzór',
    description: 'Wgraj PDF lub opisz co robisz.',
  },
  {
    number: '02',
    title: 'Sprawdź asystenta',
    description: 'Podaj gęstość (gauge) i skład ze wzoru.',
  },
  {
    number: '03',
    title: 'Kup pewnie',
    description: 'Dostaniesz listę pasujących włóczek z uzasadnieniem.',
  },
];

export function HowItWorks() {
  return (
    <section className="py-24 bg-cream">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <p className="font-body text-xs uppercase tracking-widest text-warm-grey text-center mb-16">
          Jak to działa
        </p>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 md:gap-8">
          {steps.map((step) => (
            <div key={step.number} className="text-center flex flex-col items-center">
              <span className="font-display font-light italic text-linen select-none leading-none mb-4"
                style={{ fontSize: 'clamp(4rem, 8vw, 7rem)' }}
              >
                {step.number}
              </span>
              <h3 className="font-display text-2xl font-light text-charcoal mb-3">{step.title}</h3>
              <p className="font-body text-sm text-warm-grey leading-relaxed max-w-xs">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
