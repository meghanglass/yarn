'use client';

import { useState, useEffect, useRef } from 'react';
import { X, Upload, Sparkles, ArrowRight, RotateCcw, Lock, FileText } from 'lucide-react';
import Link from 'next/link';
import { useAI } from '@/contexts/AIContext';

interface PdfAttachment {
  name: string;
  base64: string;
}

type ProjectType = 'Sweter' | 'Czapka' | 'Koc' | 'Skarpety' | 'Inne';
const projectTypes: ProjectType[] = ['Sweter', 'Czapka', 'Koc', 'Skarpety', 'Inne'];

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

/* ─── Render assistant text — converts markdown links to Next.js Links ─── */
function renderContent(text: string) {
  // Split on markdown links: [text](url)
  const parts = text.split(/(\[[^\]]+\]\([^)]+\))/g);
  return parts.map((part, i) => {
    const match = part.match(/^\[([^\]]+)\]\(([^)]+)\)$/);
    if (match) {
      return (
        <Link
          key={i}
          href={match[2]}
          className="underline decoration-white/30 hover:decoration-white/70 transition-colors"
          style={{ color: 'rgba(130,190,210,0.9)' }}
        >
          {match[1]}
        </Link>
      );
    }
    // Render **bold** inline
    const boldParts = part.split(/(\*\*[^*]+\*\*)/g);
    return boldParts.map((bp, j) => {
      const bold = bp.match(/^\*\*([^*]+)\*\*$/);
      if (bold) return <strong key={j} className="font-medium text-white/90">{bold[1]}</strong>;
      return <span key={j}>{bp}</span>;
    });
  });
}

/* ─── Assistant message bubble ─── */
function AssistantBubble({ content }: { content: string }) {
  // Split into paragraphs for readability
  const paragraphs = content.split(/\n\n+/).filter(Boolean);
  return (
    <div className="flex gap-3 items-start">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5A82A0] to-[#344F63] flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
        <Sparkles size={12} className="text-white" />
      </div>
      <div
        className="flex-1 rounded-2xl rounded-tl-sm px-4 py-3 space-y-2"
        style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        {paragraphs.map((para, i) => {
          // Bullet list lines
          const lines = para.split('\n');
          const isList = lines.every((l) => l.startsWith('- ') || l.startsWith('* ') || l.match(/^[\d]+\. /));
          if (isList) {
            return (
              <ul key={i} className="space-y-1 pl-1">
                {lines.map((line, j) => (
                  <li key={j} className="flex gap-2 font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
                    <span style={{ color: 'rgba(255,255,255,0.3)' }}>—</span>
                    <span>{renderContent(line.replace(/^[-*]\s+/, '').replace(/^\d+\.\s+/, ''))}</span>
                  </li>
                ))}
              </ul>
            );
          }
          // Heading line (starts with ##)
          if (para.startsWith('## ') || para.startsWith('# ')) {
            return (
              <p key={i} className="font-body text-[10px] uppercase tracking-widest pt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>
                {para.replace(/^#+\s+/, '')}
              </p>
            );
          }
          return (
            <p key={i} className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
              {renderContent(para)}
            </p>
          );
        })}
      </div>
    </div>
  );
}

/* ─── User message bubble ─── */
function UserBubble({ content }: { content: string }) {
  return (
    <div className="flex justify-end">
      <div
        className="max-w-[80%] rounded-2xl rounded-tr-sm px-4 py-3 font-body text-sm text-white leading-relaxed"
        style={{ background: 'rgba(74,110,138,0.45)', border: '1px solid rgba(74,110,138,0.4)' }}
      >
        {content}
      </div>
    </div>
  );
}

/* ─── Typing indicator ─── */
function LoadingBubble() {
  return (
    <div className="flex gap-3 items-start">
      <div className="w-7 h-7 rounded-full bg-gradient-to-br from-[#5A82A0] to-[#344F63] flex items-center justify-center shrink-0 shadow-sm">
        <Sparkles size={12} className="text-white" />
      </div>
      <div
        className="rounded-2xl rounded-tl-sm px-4 py-3"
        style={{ background: 'rgba(255,255,255,0.10)', border: '1px solid rgba(255,255,255,0.12)' }}
      >
        <div className="flex gap-1.5 items-center h-4">
          {[0, 1, 2].map((i) => (
            <span
              key={i}
              className="w-1.5 h-1.5 rounded-full bg-white/40 animate-bounce"
              style={{ animationDelay: `${i * 0.15}s`, animationDuration: '0.9s' }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

/* ─── Main component ─── */
export function AIPanel() {
  const { isOpen, closePanel, currentProduct } = useAI();
  const [messages, setMessages] = useState<Message[]>([]);
  const [selectedProject, setSelectedProject] = useState<ProjectType | null>(null);
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [pdfAttachment, setPdfAttachment] = useState<PdfAttachment | null>(null);
  const scrollRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Reset conversation when panel opens with a new product
  useEffect(() => {
    if (isOpen) {
      setMessages([]);
      setPrompt('');
      setSelectedProject(null);
      setError(null);
      setPdfAttachment(null);
    }
  }, [isOpen, currentProduct?.id]);

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      const result = reader.result as ArrayBuffer;
      const bytes = new Uint8Array(result);
      let binary = '';
      bytes.forEach((b) => (binary += String.fromCharCode(b)));
      const base64 = btoa(binary);
      setPdfAttachment({ name: file.name, base64 });
    };
    reader.readAsArrayBuffer(file);
    // Reset input so the same file can be re-selected if removed and re-added
    e.target.value = '';
  };

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages, isLoading]);

  const handleSubmit = async () => {
    const text = [selectedProject, prompt.trim()].filter(Boolean).join(' — ');
    if (!text && !pdfAttachment) return;

    const userMessage: Message = { role: 'user', content: text || '(wzór w PDF)' };
    const nextMessages = [...messages, userMessage];
    setMessages(nextMessages);
    setPrompt('');
    setSelectedProject(null);
    setIsLoading(true);
    setError(null);

    // PDF is only sent with the first user message; clear it from UI after send
    const pdfToSend = messages.length === 0 ? pdfAttachment : null;
    if (pdfToSend) setPdfAttachment(null);

    try {
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          messages: nextMessages,
          productContext: currentProduct
            ? {
                id: currentProduct.id,
                name: currentProduct.name,
                weight: currentProduct.weight,
                gauge: currentProduct.gauge.stitches,
              }
            : undefined,
          pdfData: pdfToSend?.base64 ?? undefined,
        }),
      });

      if (!res.ok) throw new Error(`HTTP ${res.status}`);

      const data = await res.json();
      const assistantText: string =
        data?.content?.[0]?.text ?? 'Przepraszam, coś poszło nie tak.';

      setMessages((prev) => [...prev, { role: 'assistant', content: assistantText }]);
    } catch (e) {
      setError('Nie udało się połączyć z asystentem. Spróbuj ponownie.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === 'Enter' && (e.metaKey || e.ctrlKey)) handleSubmit();
  };

  const reset = () => {
    setMessages([]);
    setPrompt('');
    setSelectedProject(null);
    setError(null);
  };

  const hasConversation = messages.length > 0 || isLoading;
  const canSubmit = !isLoading && (!!prompt.trim() || !!selectedProject || !!pdfAttachment);

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
        className={`fixed top-0 right-0 bottom-0 z-[80] w-full md:w-[460px] flex flex-col transition-transform duration-[380ms] ease-[cubic-bezier(0.22,1,0.36,1)] ${
          isOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
        style={{ background: 'linear-gradient(160deg, #1a2e3d 0%, #1e3347 45%, #16283a 100%)' }}
      >
        {/* ── Header ── */}
        <div
          className="relative px-5 pt-6 pb-5 shrink-0 overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, rgba(90,130,160,0.25) 0%, transparent 60%)',
            borderBottom: '1px solid rgba(255,255,255,0.08)',
          }}
        >
          <div
            className="absolute -top-10 -right-10 w-40 h-40 rounded-full pointer-events-none"
            style={{ background: 'radial-gradient(circle, rgba(74,110,138,0.35) 0%, transparent 70%)' }}
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
              <h2
                className="font-display font-light italic text-white leading-tight"
                style={{ fontSize: 'clamp(1.5rem, 3vw, 1.85rem)' }}
              >
                Pomogę dobrać włóczkę
                <br />do twojego wzoru.
              </h2>
              <p className="font-body text-sm mt-2 leading-relaxed" style={{ color: 'rgba(255,255,255,0.5)' }}>
                Opisz projekt — powiem czy włóczka zadziała.
              </p>
            </div>
            <button
              onClick={closePanel}
              className="w-8 h-8 rounded-full flex items-center justify-center transition-colors shrink-0 mt-0.5"
              style={{ background: 'rgba(255,255,255,0.08)', color: 'rgba(255,255,255,0.6)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.15)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.background = 'rgba(255,255,255,0.08)')}
            >
              <X size={15} />
            </button>
          </div>
        </div>

        {/* ── Scrollable conversation ── */}
        <div
          ref={scrollRef}
          className="flex-1 overflow-y-auto px-5 py-5 flex flex-col gap-4"
          style={{ scrollbarWidth: 'thin', scrollbarColor: 'rgba(255,255,255,0.1) transparent' }}
        >
          {/* Product context bubble */}
          {currentProduct && !hasConversation && (
            <AssistantBubble
              content={`Widzę, że patrzysz na ${currentProduct.name} — ${currentProduct.weight}, gauge ${currentProduct.gauge.stitches} oczek/10cm. Do jakiego projektu jej szukasz?`}
            />
          )}

          {/* Conversation history */}
          {messages.map((msg, i) =>
            msg.role === 'user'
              ? <UserBubble key={i} content={msg.content} />
              : <AssistantBubble key={i} content={msg.content} />
          )}

          {isLoading && <LoadingBubble />}

          {error && (
            <div
              className="rounded-xl px-4 py-3 font-body text-sm"
              style={{ background: 'rgba(180,60,60,0.2)', border: '1px solid rgba(200,80,80,0.3)', color: 'rgba(255,180,180,0.9)' }}
            >
              {error}
            </div>
          )}

          {/* Reset button — shown after at least one exchange */}
          {messages.length >= 2 && !isLoading && (
            <button
              onClick={reset}
              className="flex items-center gap-1.5 mx-auto font-body text-xs transition-colors mt-2"
              style={{ color: 'rgba(255,255,255,0.3)' }}
              onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.6)')}
              onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.3)')}
            >
              <RotateCcw size={11} />
              Zacznij od nowa
            </button>
          )}
        </div>

        {/* ── Input area ── */}
        <div
          className="shrink-0 px-5 py-4 flex flex-col gap-3"
          style={{ borderTop: '1px solid rgba(255,255,255,0.08)' }}
        >
          {/* Project chips — only before first message */}
          {!hasConversation && (
            <div className="flex flex-wrap gap-2">
              {projectTypes.map((pt) => (
                <button
                  key={pt}
                  onClick={() => setSelectedProject(pt === selectedProject ? null : pt)}
                  className="font-body text-sm px-3.5 py-1.5 rounded-full transition-all duration-200"
                  style={
                    selectedProject === pt
                      ? { background: 'rgba(74,110,138,0.9)', color: '#fff', border: '1px solid rgba(74,110,138,0.6)', boxShadow: '0 0 0 3px rgba(74,110,138,0.2)' }
                      : { background: 'rgba(255,255,255,0.06)', color: 'rgba(255,255,255,0.6)', border: '1px solid rgba(255,255,255,0.12)' }
                  }
                >
                  {pt}
                </button>
              ))}
            </div>
          )}

          {/* Textarea + send */}
          <div className="flex gap-2 items-end">
            <textarea
              rows={hasConversation ? 2 : 3}
              value={prompt}
              onChange={(e) => setPrompt(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                hasConversation
                  ? 'Kontynuuj rozmowę…'
                  : "Opisz wzór: np. 'sweter DK, gauge 22 oczka, zamiennik za Drops Lima'"
              }
              className="ai-panel-textarea flex-1 font-body text-sm resize-none outline-none rounded-xl px-4 py-3 transition-all duration-200"
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
            <button
              onClick={handleSubmit}
              disabled={!canSubmit}
              className="w-10 h-10 rounded-xl flex items-center justify-center shrink-0 transition-all duration-200"
              style={{
                background: !canSubmit
                  ? 'rgba(74,110,138,0.3)'
                  : 'linear-gradient(135deg, #4A6E8A 0%, #3a5870 100%)',
                boxShadow: !canSubmit ? 'none' : '0 4px 16px rgba(74,110,138,0.4)',
              }}
            >
              <ArrowRight size={16} className="text-white" />
            </button>
          </div>

          {/* PDF upload — only before first message */}
          {!hasConversation && (
            <>
              {/* Hidden file input */}
              <input
                ref={fileInputRef}
                type="file"
                accept=".pdf"
                className="hidden"
                onChange={handleFileChange}
              />

              {pdfAttachment ? (
                /* Attached file feedback */
                <div
                  className="flex items-center gap-2 rounded-xl px-3 py-2 font-body text-xs"
                  style={{ background: 'rgba(74,110,138,0.18)', border: '1px solid rgba(74,110,138,0.35)' }}
                >
                  <FileText size={13} style={{ color: 'rgba(130,190,210,0.8)', flexShrink: 0 }} />
                  <span className="flex-1 truncate" style={{ color: 'rgba(255,255,255,0.7)' }}>
                    {pdfAttachment.name}
                  </span>
                  <button
                    type="button"
                    onClick={() => setPdfAttachment(null)}
                    className="shrink-0 transition-colors"
                    style={{ color: 'rgba(255,255,255,0.35)' }}
                    onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.7)')}
                    onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)')}
                    aria-label="Usuń plik"
                  >
                    <X size={13} />
                  </button>
                </div>
              ) : (
                /* Upload trigger button */
                <button
                  type="button"
                  onClick={() => fileInputRef.current?.click()}
                  className="flex items-center justify-center gap-2 w-full rounded-xl py-2 font-body text-xs transition-all duration-200"
                  style={{ background: 'rgba(255,255,255,0.03)', border: '1px dashed rgba(255,255,255,0.12)', color: 'rgba(255,255,255,0.35)' }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(74,110,138,0.4)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.55)'; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.borderColor = 'rgba(255,255,255,0.12)'; (e.currentTarget as HTMLElement).style.color = 'rgba(255,255,255,0.35)'; }}
                >
                  <Upload size={12} />
                  Wgraj PDF wzoru
                </button>
              )}
            </>
          )}

          <p className="font-body text-[10px] text-center" style={{ color: 'rgba(255,255,255,0.2)' }}>
            <Lock size={9} className="inline mr-1 mb-0.5" />
            Działa wyłącznie na asortymencie Yarn Over · Cmd+Enter wysyła
          </p>
        </div>
      </div>

      <style>{`
        .ai-panel-textarea::placeholder { color: rgba(255,255,255,0.22); }
      `}</style>
    </>
  );
}
