'use client';

import { useAI } from '@/contexts/AIContext';
import { Button } from '@/components/ui/Button';
import { YarnProduct } from '@/lib/types';
import { Sparkles, ArrowRight } from 'lucide-react';

type Variant = 'strip' | 'button' | 'inline';

interface AITriggerButtonProps {
  context?: 'homepage' | 'product' | 'collection';
  product?: YarnProduct;
  variant?: Variant;
}

/* ─── Mock chat messages shown in the preview ─── */
const mockMessages = [
  { role: 'user',      text: 'Szukam zamiennika za Drops Lima DK do swetra. Gauge 22 oczka.' },
  { role: 'assistant', text: 'Znalazłam trzy opcje z identycznym gauge. Najlepiej pasuje BC Garn Semilla — 100% bawełna organiczna, 22 st/10cm, 52 zł.' },
  { role: 'user',      text: 'A co z metrażem? Potrzebuję ok. 1000m.' },
  { role: 'assistant', text: 'Semilla ma 175m/100g, więc potrzebujesz ok. 6 motków — razem 312 zł. Mam ją dostępną w 5 kolorach.' },
];

/* ─── Chat bubble sub-component ─── */
function MockBubble({ role, text }: { role: string; text: string }) {
  const isUser = role === 'user';
  return (
    <div className={`flex items-end gap-2 ${isUser ? 'justify-end' : 'justify-start'}`}>
      {!isUser && (
        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#5A82A0] to-[#344F63] flex items-center justify-center shrink-0 mb-0.5">
          <Sparkles size={9} className="text-white" />
        </div>
      )}
      <div
        className="max-w-[82%] rounded-2xl px-3 py-2 font-body text-xs leading-relaxed"
        style={
          isUser
            ? { background: 'rgba(74,110,138,0.5)', color: 'rgba(255,255,255,0.9)', borderBottomRightRadius: 4 }
            : { background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.78)', borderBottomLeftRadius: 4 }
        }
      >
        {text}
      </div>
    </div>
  );
}

/* ─── Strip variant: full-width dark feature module ─── */
function AIFeatureStrip({ onOpen }: { onOpen: () => void }) {
  return (
    <section
      className="relative overflow-hidden"
      style={{ background: 'linear-gradient(150deg, #162534 0%, #1b2f40 50%, #131f2b 100%)' }}
    >
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden">
        {/* top-left orb */}
        <div className="absolute -top-24 -left-24 w-96 h-96 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(74,110,138,0.18) 0%, transparent 65%)' }} />
        {/* bottom-right orb */}
        <div className="absolute -bottom-16 right-0 w-80 h-80 rounded-full"
          style={{ background: 'radial-gradient(circle, rgba(74,110,138,0.12) 0%, transparent 65%)' }} />
        {/* subtle grid */}
        <div className="absolute inset-0 opacity-[0.025]"
          style={{
            backgroundImage: `linear-gradient(rgba(255,255,255,0.6) 1px, transparent 1px),
                              linear-gradient(90deg, rgba(255,255,255,0.6) 1px, transparent 1px)`,
            backgroundSize: '40px 40px',
          }} />
      </div>

      <div className="relative max-w-content mx-auto px-4 md:px-8 py-16 md:py-20">
        <div className="grid grid-cols-1 lg:grid-cols-[1fr_420px] gap-12 lg:gap-16 items-center">

          {/* ── Left: copy ── */}
          <div>
            {/* Label */}
            <div className="flex items-center gap-2 mb-5">
              <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#5A82A0] to-[#3a5f7a] flex items-center justify-center">
                <Sparkles size={10} className="text-white" />
              </div>
              <span className="font-body text-[10px] uppercase tracking-[0.14em]"
                style={{ color: 'rgba(255,255,255,0.4)' }}>
                Asystent AI · Yarn Over
              </span>
            </div>

            {/* Headline */}
            <h2
              className="font-display font-light italic text-white leading-tight mb-5"
              style={{ fontSize: 'clamp(2rem, 4vw, 3.25rem)' }}
            >
              Nie wiesz, czy ta włóczka
              <br />zadziała w twoim wzorze?
            </h2>

            {/* Body */}
            <p className="font-body text-base leading-relaxed mb-8 max-w-md"
              style={{ color: 'rgba(255,255,255,0.5)' }}>
              Powiedz nam co robisz i jaki masz gauge.
              Odpowiemy wprost: pasuje, nie pasuje —
              i podamy konkretne zamienniki z uzasadnieniem.
            </p>

            {/* Feature pills */}
            <div className="flex flex-wrap gap-2 mb-8">
              {['Dopasowanie gauge', 'Zamienniki włóczek', 'Przelicznik oczek', 'Skład i pielęgnacja'].map((f) => (
                <span key={f}
                  className="font-body text-xs px-3 py-1.5 rounded-full"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    color: 'rgba(255,255,255,0.55)',
                  }}>
                  {f}
                </span>
              ))}
            </div>

            {/* CTA */}
            <button
              onClick={onOpen}
              className="group inline-flex items-center gap-2.5 font-body text-sm font-medium rounded-xl px-6 py-3.5 transition-all duration-200"
              style={{
                background: 'linear-gradient(135deg, #4A6E8A 0%, #3a5870 100%)',
                color: '#ffffff',
                boxShadow: '0 4px 24px rgba(74,110,138,0.4)',
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 6px 32px rgba(74,110,138,0.6)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(-1px)';
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = '0 4px 24px rgba(74,110,138,0.4)';
                (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
              }}
            >
              <Sparkles size={14} />
              Zapytaj asystenta
              <ArrowRight size={14} className="transition-transform duration-150 group-hover:translate-x-0.5" />
            </button>
          </div>

          {/* ── Right: chat preview ── */}
          <div className="hidden lg:block">
            {/* "Window" frame */}
            <div
              className="rounded-2xl overflow-hidden shadow-2xl"
              style={{
                background: 'linear-gradient(160deg, #1a2e3d 0%, #1e3347 100%)',
                border: '1px solid rgba(255,255,255,0.10)',
                boxShadow: '0 32px 64px rgba(0,0,0,0.35), 0 0 0 1px rgba(255,255,255,0.06)',
              }}
            >
              {/* Fake panel header */}
              <div
                className="px-4 py-3.5 flex items-center gap-2"
                style={{
                  background: 'linear-gradient(135deg, rgba(90,130,160,0.22) 0%, transparent 60%)',
                  borderBottom: '1px solid rgba(255,255,255,0.07)',
                }}
              >
                <div className="w-5 h-5 rounded-md bg-gradient-to-br from-[#5A82A0] to-[#344F63] flex items-center justify-center">
                  <Sparkles size={9} className="text-white" />
                </div>
                <span className="font-body text-[10px] uppercase tracking-[0.12em]"
                  style={{ color: 'rgba(255,255,255,0.4)' }}>
                  Asystent Yarn Over
                </span>
                {/* Fake traffic lights */}
                <div className="ml-auto flex gap-1.5">
                  {['rgba(255,255,255,0.12)', 'rgba(255,255,255,0.12)', 'rgba(255,255,255,0.12)'].map((c, i) => (
                    <div key={i} className="w-2 h-2 rounded-full" style={{ background: c }} />
                  ))}
                </div>
              </div>

              {/* Chat messages */}
              <div className="px-4 py-4 space-y-3">
                {mockMessages.map((m, i) => (
                  <MockBubble key={i} role={m.role} text={m.text} />
                ))}

                {/* Typing indicator */}
                <div className="flex gap-2 items-end">
                  <div className="w-5 h-5 rounded-full bg-gradient-to-br from-[#5A82A0] to-[#344F63] flex items-center justify-center shrink-0">
                    <Sparkles size={9} className="text-white" />
                  </div>
                  <div
                    className="rounded-2xl rounded-bl-sm px-3 py-2.5"
                    style={{ background: 'rgba(255,255,255,0.08)', border: '1px solid rgba(255,255,255,0.10)' }}
                  >
                    <div className="flex gap-1 items-center h-3">
                      {[0, 1, 2].map((i) => (
                        <span
                          key={i}
                          className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
                          style={{ animationDelay: `${i * 0.18}s`, animationDuration: '1s' }}
                        />
                      ))}
                    </div>
                  </div>
                </div>
              </div>

              {/* Fake input bar */}
              <div
                className="px-4 py-3 flex items-center gap-2"
                style={{ borderTop: '1px solid rgba(255,255,255,0.07)' }}
              >
                <div
                  className="flex-1 rounded-lg px-3 py-2 font-body text-xs"
                  style={{
                    background: 'rgba(255,255,255,0.06)',
                    border: '1px solid rgba(255,255,255,0.10)',
                    color: 'rgba(255,255,255,0.25)',
                  }}
                >
                  Opisz swój wzór…
                </div>
                <div
                  className="w-7 h-7 rounded-lg flex items-center justify-center shrink-0"
                  style={{ background: 'linear-gradient(135deg, #4A6E8A 0%, #3a5870 100%)' }}
                >
                  <ArrowRight size={12} className="text-white" />
                </div>
              </div>
            </div>

            {/* Caption below preview */}
            <p className="text-center font-body text-[11px] mt-4"
              style={{ color: 'rgba(255,255,255,0.22)' }}>
              Podgląd rozmowy z asystentem
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}

/* ─── Main export ─── */
export function AITriggerButton({ product, variant = 'button' }: AITriggerButtonProps) {
  const { openPanel } = useAI();

  // AI INTEGRATION POINT — następny etap
  if (variant === 'strip') {
    return <AIFeatureStrip onOpen={() => openPanel()} />;
  }

  if (variant === 'inline') {
    return (
      <button
        onClick={() => openPanel(product)}
        className="font-body text-sm text-ai-accent underline hover:no-underline transition-all"
      >
        Zapytaj asystenta →
      </button>
    );
  }

  return (
    <Button variant="secondary" onClick={() => openPanel(product)}>
      Jak działa asystent?
    </Button>
  );
}
