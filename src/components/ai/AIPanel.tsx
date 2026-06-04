'use client';

import { useState } from 'react';
import { X, Upload, Zap } from 'lucide-react';
import { useAI } from '@/contexts/AIContext';
import { Button } from '@/components/ui/Button';
import { products } from '@/lib/mock-data/products';

type ProjectType = 'Sweter' | 'Czapka' | 'Koc' | 'Skarpety' | 'Inne';

const projectTypes: ProjectType[] = ['Sweter', 'Czapka', 'Koc', 'Skarpety', 'Inne'];

const mockRecommendation = products.find((p) => p.id === 'p09') ?? products[0];
const mockAlt1 = products.find((p) => p.id === 'p12') ?? products[1];
const mockAlt2 = products.find((p) => p.id === 'p07') ?? products[2];

export function AIPanel() {
  const { isOpen, closePanel, currentProduct } = useAI();
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [prompt, setPrompt] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSubmit = () => {
    if (!prompt.trim() && !selectedProject) return;
    setState('loading');
    setTimeout(() => setState('done'), 1500);
  };

  const reset = () => {
    setState('idle');
    setPrompt('');
    setSelectedProject(null);
  };

  const firstMessage = currentProduct
    ? `Widzę, że patrzysz na ${currentProduct.name} — ${currentProduct.weight}, gauge ${currentProduct.gauge.stitches} oczek/10cm. Do jakiego projektu jej szukasz?`
    : null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] bg-charcoal/30 backdrop-blur-sm"
          onClick={closePanel}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[80] w-full md:w-[480px] bg-ai-light flex flex-col shadow-2xl transition-transform duration-[350ms] ease-[cubic-bezier(0.25,0.46,0.45,0.94)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        {/* Header */}
        <div className="bg-ai-accent text-white px-5 py-4 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-2">
            <Zap size={16} />
            <span className="font-body text-sm font-medium tracking-wide uppercase">
              Asystent Yarn Over
            </span>
          </div>
          <button onClick={closePanel} className="hover:opacity-70 transition-opacity">
            <X size={20} />
          </button>
        </div>

        {/* Body */}
        <div className="flex-1 overflow-y-auto px-5 py-6 flex flex-col gap-5">
          {state === 'done' ? (
            /* Mock response */
            <div className="flex flex-col gap-4">
              {firstMessage && (
                <div className="bg-ai-bubble-ai rounded p-3 font-body text-sm text-charcoal border-l-2 border-ai-accent">
                  {firstMessage}
                </div>
              )}
              <div className="bg-white rounded p-4 font-body text-sm text-charcoal space-y-3">
                <p className="text-warm-grey text-xs uppercase tracking-widest">Odpowiedź asystenta</p>
                <p>
                  Na podstawie opisu twojego wzoru (DK weight, 22 oczka/10 cm):
                </p>

                {/* Recommendation card */}
                <div className="border border-linen bg-parchment p-3 flex gap-3">
                  <img
                    src={mockRecommendation.images[0]}
                    alt={mockRecommendation.name}
                    className="w-14 h-20 object-cover shrink-0"
                  />
                  <div>
                    <p className="font-body text-[10px] uppercase tracking-widest text-sage mb-0.5">
                      Rekomendacja
                    </p>
                    <p className="font-display text-base text-charcoal">{mockRecommendation.name}</p>
                    <p className="font-body text-xs text-warm-grey mb-1">{mockRecommendation.brand}</p>
                    <p className="font-body text-xs text-charcoal">
                      Gauge: {mockRecommendation.gauge.stitches} st/10cm · {mockRecommendation.composition[0]} · {mockRecommendation.price} zł
                    </p>
                  </div>
                </div>

                <p className="font-body text-sm">
                  Dlaczego pasuje: Gauge identyczne z wzorem. {mockRecommendation.composition[0]} zachowa ciepło i kształt swetra.
                </p>

                <div>
                  <p className="font-body text-xs text-warm-grey uppercase tracking-widest mb-2">Alternatywy</p>
                  <ul className="space-y-1 font-body text-sm text-charcoal">
                    <li>— {mockAlt1.name} ({mockAlt1.weight}, {mockAlt1.gauge.stitches} st, {mockAlt1.composition[0]}, {mockAlt1.price} zł)</li>
                    <li>— {mockAlt2.name} ({mockAlt2.weight}, {mockAlt2.gauge.stitches} st — uwaga: gauge lekko inny)</li>
                  </ul>
                </div>

                <p className="font-body text-sm">Chcesz żebym sprawdziła gauge?</p>
              </div>

              <button
                onClick={reset}
                className="font-body text-xs text-warm-grey underline hover:text-charcoal transition-colors"
              >
                Zadaj nowe pytanie
              </button>
            </div>
          ) : (
            <>
              {/* Intro */}
              {firstMessage ? (
                <div className="bg-white border-l-2 border-ai-accent p-3 font-body text-sm text-charcoal">
                  {firstMessage}
                </div>
              ) : (
                <>
                  <h2 className="font-display text-2xl font-light italic text-charcoal leading-snug">
                    Pomogę dobrać włóczkę
                    <br />
                    do twojego wzoru.
                  </h2>
                  <p className="font-body text-sm text-warm-grey leading-relaxed -mt-2">
                    Opisz projekt lub wgraj wzór — powiem Ci czy wybrana włóczka zadziała i co zrobić z gauge.
                  </p>
                </>
              )}

              {/* Project type chips */}
              <div>
                <p className="font-body text-xs uppercase tracking-widest text-warm-grey mb-2">
                  Nad czym pracujesz?
                </p>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((pt) => (
                    <button
                      key={pt}
                      onClick={() => setSelectedProject(pt === selectedProject ? null : pt)}
                      className={`font-body text-sm px-3 py-1.5 border transition-colors ${
                        selectedProject === pt
                          ? 'bg-ai-accent text-white border-ai-accent'
                          : 'bg-white text-charcoal border-linen hover:border-ai-accent'
                      }`}
                    >
                      {pt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <textarea
                rows={5}
                value={prompt}
                onChange={(e) => setPrompt(e.target.value)}
                placeholder="Opisz wzór: np. 'sweter z merino DK, gauge 22 oczka, potrzebuję zamiennika za Drops Lima'"
                className="w-full bg-white border border-linen text-charcoal font-body text-sm p-3 resize-none outline-none focus:border-ai-accent transition-colors placeholder:text-warm-grey"
              />

              {/* PDF upload */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full border border-dashed border-linen bg-white text-warm-grey font-body text-sm py-3 hover:border-ai-accent hover:text-ai-accent transition-colors"
              >
                <Upload size={14} />
                Wgraj PDF wzoru
              </button>

              {/* Submit */}
              <Button
                variant="ai"
                size="lg"
                className="w-full justify-center"
                onClick={handleSubmit}
                disabled={state === 'loading'}
              >
                {state === 'loading' ? 'Analizuję...' : 'Sprawdź →'}
              </Button>
            </>
          )}
        </div>

        {/* Footer disclaimer */}
        <div className="px-5 py-3 border-t border-linen shrink-0">
          <p className="font-body text-xs text-warm-grey leading-relaxed">
            Asystent działa wyłącznie na asortymencie Yarn Over.
            Nie zapamiętuje danych między sesjami.
          </p>
        </div>
      </div>
    </>
  );
}
