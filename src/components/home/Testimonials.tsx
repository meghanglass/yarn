const testimonials = [
  {
    quote:
      'Wreszcie narzędzie, które mówi wprost czy włóczka zadziała, a nie "może być podobna".',
    name: 'Kasia',
    location: 'Kraków',
    detail: 'szydełkuje od 5 lat',
  },
  {
    quote:
      'Asystent powiedział wprost że moja włóczka nie zadziała do wzoru i zaproponował trzy inne. Kupiłam jedną. Pasuje.',
    name: 'Joanna',
    location: 'Wrocław',
    detail: 'dzierga od 20 lat',
  },
];

export function Testimonials() {
  return (
    <section className="py-20 bg-parchment">
      <div className="max-w-content mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {testimonials.map((t) => (
            <div
              key={t.name}
              className="bg-cream p-8 border-l-2 border-terracotta"
            >
              <p className="font-display font-light italic text-charcoal text-xl leading-snug mb-6">
                &ldquo;{t.quote}&rdquo;
              </p>
              <div>
                <p className="font-body text-sm font-medium text-charcoal">
                  — {t.name}, {t.location}
                </p>
                <p className="font-body text-xs text-warm-grey">{t.detail}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
