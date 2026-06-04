'use client';

import { useState } from 'react';
import { X, Upload, Sparkles, ArrowRight, RotateCcw, Lock } from 'lucide-react';
import { useAI } from '@/contexts/AIContext';
import { products } from '@/lib/mock-data/products';

type ProjectType = 'Sweter' | 'Czapka' | 'Koc' | 'Skarpety' | 'Inne';

const projectTypes: ProjectType[] = ['Sweter', 'Czapka', 'Koc', 'Skarpety', 'Inne'];

const projectIcons: Record<ProjectType, string> = {
  Sweter: '🧥',
  Czapka: '🧢',
  Koc: '🛏',
  Skarpety: '🧦',
  Inne: '✦',
};

const mockRecommendation = products.find((p) => p.id === 'p09') ?? products[0];
const mockAlt1 = products.find((p) => p.id === 'p12') ?? products[1];
const mockAlt2 = products.find((p) => p.id === 'p07') ?? products[2];

/* ---------- sub-components ---------- */

function AssistantBubble({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5A82A0] to-[#344F63] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
        <Sparkles size={12} className="text-white" />
      </div>
      <div className="flex-1 bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <p className="font-body text-sm text-[#2C2A27] leading-relaxed">{children}</p>
      </div>
    </div>
  );
}

function LoadingBubble() {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5A82A0] to-[#344F63] flex items-center justify-center shrink-0 shadow-sm">
        <Sparkles size={12} className="text-white" />
      </div>
      <div className="bg-white/70 backdrop-blur-sm border border-white/80 rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm">
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-[#4A6E8A] animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ---------- main component ---------- */

export function AIPanel() {
  const { isOpen, closePanel, currentProduct } = useAI();
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [prompt, setPrompt] = useState('');
  const [state, setState] = useState<'idle' | 'loading' | 'done'>('idle');

  const handleSubmit = () => {
    if (!prompt.trim() && !selectedProject) return;
    setState('loading');
    setTimeout(() => setState('done'), 1800);
  };

  const reset = () => {
    setState('idle');
    setPrompt('');
    setSelectedProject(null);
  };

  const contextMessage = currentProduct
    ? `Widzę, że patrzysz na ${currentProduct.name} — ${currentProduct.weight}, gauge ${currentProduct.gauge.stitches} oczek/10cm. Do jakiego projektu jej szukasz?`
    : null;

  return (
    <>
      {/* Backdrop */}
      {isOpen && (
        <div
          className="fixed inset-0 z-[70] bg-black/40 backdrop-blur-[2px]"
          onClick={closePanel}
        />
      )}

      {/* Panel */}
      <div
        className={`fixed top-0 right-0 bottom-0 z-[80] w-full md:w-[460px] flex flex-col shadow-[−8px_0_48px_rgba(0,0,0,0.18)] transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{
          background: 'linear-gradient(160deg, #1a2e3d 0%, #1e3347 45%, #16283a 100%)',
        }}
      >
        {/* ── Header ── */}
        <div
          className="relative px-5 pt-6 pb-5 shrink-0 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(90,130,160,0.25) 0%, transparent 60%)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          {/* Decorative orb */}
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
            style={{
              background: 'radial-gradient(circle, rgba(74,110,138,0.35) 0%, transparent 70%)',
            }}
          />

          <div className="relative flex items-start justify-between">
            <div>
              <div className="flex items-center gap-2 mb-3">
                <div className="w-6 h-6 rounded-md bg-gradient-to-br from-[#5A82A0] to-[#3a5f7a] flex items-center justify-center shadow">
                  <Sparkles size={12} className="text-white" />
                </div>
                <span className="font-body text-[10px] uppercase tracking-[0.14em] text-white/50">
                  Asystent Yarn Over
                </span>
              </div>
              <h2 className="font-display font-light italic text-white leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 1.85rem)' }}
              >
                Pomogę dobrać włóczkę
                <br />
                do twojego wzoru.
              </h2>
              <p className="font-body text-sm mt-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Opisz projekt — powiem czy włóczka zadziała.
              </p>
            </div>
            <button
              onClick={closePanel}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 mt-0.5"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.15)')}
              onMouseLeave={(e) => (e.currentTarget.style.background = 'rgba(255,255,255,0.08)')}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ── Scrollable body ── */}
        <div className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-5"
          style={{
            scrollbarWidth: 'thin',
            scrollbarColor: 'rgba(255,255,255,0.1) transparent',
          }}
        >
          {/* Context bubble (from product page) */}
          {contextMessage && (
            <AssistantBubble>{contextMessage}</AssistantBubble>
          )}

          {state === 'loading' && (
            <>
              {/* User message echo */}
              <div className="flex justify-end">
                <div
                  className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3 font-body text-sm text-white"
                  style={{ background: 'rgba(74,110,138,0.45)', border: '1px solid rgba(74,110,138,0.4)' }}
                >
                  {selectedProject && <span className="mr-1">{projectIcons[selectedProject]}</span>}
                  {prompt || selectedProject}
                </div>
              </div>
              <LoadingBubble />
            </>
          )}

          {state === 'done' && (
            <>
              {/* User echo */}
              <div className="flex justify-end">
                <div
                  className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3 font-body text-sm text-white"
                  style={{ background: 'rgba(74,110,138,0.45)', border: '1px solid rgba(74,110,138,0.4)' }}
                >
                  {selectedProject && <span className="mr-1">{projectIcons[selectedProject]}</span>}
                  {prompt || selectedProject}
                </div>
              </div>

              {/* AI response bubble */}
              <div className="flex gap-3 items-start">
                <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5A82A0] to-[#344F63] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                  <Sparkles size={12} className="text-white" />
                </div>
                <div className="flex-1 space-y-3">
                  {/* Intro text */}
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 shadow-sm"
                    style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <p className="font-body text-sm text-white/80 leading-relaxed">
                      Na podstawie opisu twojego wzoru (DK weight, 22 oczka/10 cm):
                    </p>
                  </div>

                  {/* Recommendation card */}
                  <div
                    className="rounded-2xl overflow-hidden shadow-lg"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.12)' }}
                  >
                    <div className="flex gap-0">
                      <div className="w-20 shrink-0">
                        <img
                          src={mockRecommendation.images[0]}
                          alt={mockRecommendation.name}
                          className="w-full h-full object-cover"
                          style={{ minHeight: '90px' }}
                        />
                      </div>
                      <div className="flex-1 p-3">
                        <div className="flex items-center gap-1.5 mb-1">
                          <span
                            className="font-body text-[9px] uppercase tracking-widest px-1.5 py-0.5 rounded-sm"
                            style={{ background: 'rgba(90,160,140,0.25)', color: '#90c4b4' }}
                          >
                            Rekomendacja
                          </span>
                        </div>
                        <p className="font-display text-white text-base leading-tight">
                          {mockRecommendation.name}
                        </p>
                        <p className="font-body text-[11px] mb-1.5" style={{ color: 'rgba(255,255,255,0.45)' }}>
                          {mockRecommendation.brand}
                        </p>
                        <p className="font-body text-xs" style={{ color: 'rgba(255,255,255,0.6)' }}>
                          {mockRecommendation.gauge.stitches} st/10cm · {mockRecommendation.composition[0]} · {mockRecommendation.price} zł
                        </p>
                      </div>
                    </div>
                    <div
                      className="px-3 py-2.5 font-body text-xs leading-relaxed"
                      style={{ borderTop: '1px solid rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
                    >
                      Gauge identyczne z wzorem. {mockRecommendation.composition[0]} zachowa ciepło i kształt swetra.
                    </div>
                  </div>

                  {/* Alternatives */}
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3 space-y-2"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
                  >
                    <p className="font-body text-[10px] uppercase tracking-widest mb-2" style={{ color: 'rgba(255,255,255,0.35)' }}>
                      Alternatywy
                    </p>
                    {[mockAlt1, mockAlt2].map((alt, i) => (
                      <div key={i} className="flex items-center gap-2">
                        <div className="w-1 h-1 rounded-full shrink-0" style={{ background: 'rgba(255,255,255,0.3)' }} />
                        <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.65)' }}>
                          {alt.name}{' '}
                          <span style={{ color: 'rgba(255,255,255,0.35)' }}>
                            ({alt.weight}, {alt.gauge.stitches} st
                            {i === 1 ? ' — gauge lekko inny' : ''})
                          </span>
                        </p>
                      </div>
                    ))}
                  </div>

                  {/* Follow-up */}
                  <div
                    className="rounded-2xl rounded-tl-sm px-4 py-3"
                    style={{ background: 'rgba(255,255,255,0.07)', border: '1px solid rgba(255,255,255,0.10)' }}
                  >
                    <p className="font-body text-sm" style={{ color: 'rgba(255,255,255,0.7)' }}>
                      Chcesz żebym sprawdziła gauge?
                    </p>
                  </div>
                </div>
              </div>

              {/* Reset */}
              <button
                onClick={reset}
                className="flex items-center gap-1.5 mx-auto font-body text-xs transition-colors"
                style={{ color: 'rgba(255,255,255,0.35)' }}
                onMouseEnter={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.65)')}
                onMouseLeave={(e) => (e.currentTarget.style.color = 'rgba(255,255,255,0.35)')}
              >
                <RotateCcw size={11} />
                Zadaj nowe pytanie
              </button>
            </>
          )}

          {/* ── Input form (idle only) ── */}
          {state === 'idle' && (
            <div className="flex flex-col gap-4 mt-auto">
              {/* Project chips */}
              <div>
                <p className="font-body text-[10px] uppercase tracking-[0.12em] mb-2.5"
                  style={{ color: 'rgba(255,255,255,0.4)' }}
                >
                  Nad czym pracujesz?
                </p>
                <div className="flex flex-wrap gap-2">
                  {projectTypes.map((pt) => (
                    <button
                      key={pt}
                      onClick={() => setSelectedProject(pt === selectedProject ? null : pt)}
                      className="font-body text-sm px-3.5 py-1.5 rounded-full transition-all duration-200 flex items-center gap-1.5"
                      style={
                        selectedProject === pt
                          ? {
                              background: 'rgba(74,110,138,0.9)',
                              color: '#ffffff',
                              border: '1px solid rgba(74,110,138,0.6)',
                              boxShadow: '0 0 0 3px rgba(74,110,138,0.2)',
                            }
                          : {
                              background: 'rgba(255,255,255,0.06)',
                              color: 'rgba(255,255,255,0.6)',
                              border: '1px solid rgba(255,255,255,0.12)',
                            }
                      }
                    >
                      <span>{projectIcons[pt]}</span>
                      {pt}
                    </button>
                  ))}
                </div>
              </div>

              {/* Textarea */}
              <div className="relative">
                <textarea
                  rows={4}
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Opisz wzór: np. 'sweter z merino DK, gauge 22 oczka, potrzebuję zamiennika za Drops Lima'"
                  className="ai-panel-textarea w-full font-body text-sm resize-none outline-none rounded-xl px-4 py-3.5 transition-all duration-200"
                  style={{
                    background: 'rgba(255,255,255,0.07)',
                    border: '1px solid rgba(255,255,255,0.12)',
                    color: 'rgba(255,255,255,0.9)',
                    caretColor: '#7aA8C8',
                  }}
                  onFocus={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(74,110,138,0.7)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.09)';
                    e.currentTarget.style.boxShadow = '0 0 0 3px rgba(74,110,138,0.12)';
                  }}
                  onBlur={(e) => {
                    e.currentTarget.style.border = '1px solid rgba(255,255,255,0.12)';
                    e.currentTarget.style.background = 'rgba(255,255,255,0.07)';
                    e.currentTarget.style.boxShadow = 'none';
                  }}
                />
                {/* Placeholder color override via global style isn't possible inline; handled via CSS below */}
              </div>

              {/* PDF upload */}
              <button
                type="button"
                className="flex items-center justify-center gap-2 w-full rounded-xl py-2.5 font-body text-sm transition-all duration-200"
                style={{
                  background: 'rgba(255,255,255,0.04)',
                  border: '1px dashed rgba(255,255,255,0.15)',
                  color: 'rgba(255,255,255,0.4)',
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.08)';
                  e.currentTarget.style.borderColor = 'rgba(74,110,138,0.5)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.65)';
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.background = 'rgba(255,255,255,0.04)';
                  e.currentTarget.style.borderColor = 'rgba(255,255,255,0.15)';
                  e.currentTarget.style.color = 'rgba(255,255,255,0.4)';
                }}
              >
                <Upload size={13} />
                Wgraj PDF wzoru
              </button>

              {/* Submit CTA */}
              <button
                onClick={handleSubmit}
                disabled={!prompt.trim() && !selectedProject}
                className="relative w-full flex items-center justify-center gap-2 font-body text-sm font-medium rounded-xl py-3.5 transition-all duration-200 overflow-hidden group"
                style={{
                  background: 'linear-gradient(135deg, #4A6E8A 0%, #3a5870 100%)',
                  color: '#ffffff',
                  boxShadow: '0 4px 20px rgba(74,110,138,0.4)',
                  opacity: !prompt.trim() && !selectedProject ? 0.45 : 1,
                }}
                onMouseEnter={(e) => {
                  if (prompt.trim() || selectedProject) {
                    e.currentTarget.style.boxShadow = '0 6px 28px rgba(74,110,138,0.55)';
                    e.currentTarget.style.transform = 'translateY(-1px)';
                  }
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.boxShadow = '0 4px 20px rgba(74,110,138,0.4)';
                  e.currentTarget.style.transform = 'translateY(0)';
                }}
              >
                {/* shimmer */}
                <div
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none"
                  style={{
                    background: 'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.06) 50%, transparent 100%)',
                  }}
                />
                <Sparkles size={14} />
                Sprawdź dopasowanie
                <ArrowRight size={14} />
              </button>
            </div>
          )}
        </div>

        {/* ── Footer ── */}
        <div
          className="px-5 py-3.5 shrink-0 flex items-center gap-2"
          style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
        >
          <Lock size={10} style={{ color: 'rgba(255,255,255,0.25)' }} />
          <p className="font-body text-[11px] leading-relaxed" style={{ color: 'rgba(255,255,255,0.3)' }}>
            Asystent działa wyłącznie na asortymencie Yarn Over. Nie zapamiętuje danych między sesjami.
          </p>
        </div>
      </div>

      {/* Global style for textarea placeholder */}
      <style>{`
        .ai-panel-textarea::placeholder { color: rgba(255,255,255,0.25); }
      `}</style>
    </>
  );
}
