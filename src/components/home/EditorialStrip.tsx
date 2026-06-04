export function EditorialStrip() {
  return (
    <section className="bg-cream overflow-hidden">
      <div className="max-w-content mx-auto">
        <div className="grid grid-cols-1 md:grid-cols-[60fr_40fr]">
          {/* Image */}
          <div className="overflow-hidden" style={{ minHeight: '480px' }}>
            <img
              src="https://picsum.photos/seed/editorial-yarn/900/600"
              alt="Włóczka z charakterem"
              className="w-full h-full object-cover"
            />
          </div>

          {/* Text */}
          <div className="flex flex-col justify-center px-8 md:px-12 py-16 bg-parchment">
            <h2
              className="font-display font-light italic text-charcoal leading-tight mb-6"
              style={{ fontSize: 'clamp(2.5rem, 4vw, 3.5rem)' }}
            >
              Materiał
              <br />
              ma
              <br />
              znaczenie.
            </h2>
            <p className="font-body text-base text-warm-grey leading-relaxed mb-8 max-w-xs">
              Dlatego podajemy gauge, skład, metraż i warunki pielęgnacji dla każdego produktu w sklepie.
              Na etykietach producenta i w naszym asystencie AI.
            </p>
            <button className="font-body text-sm text-forest hover:underline self-start">
              Poznaj naszą filozofię →
            </button>
          </div>
        </div>
      </div>
    </section>
  );
}
