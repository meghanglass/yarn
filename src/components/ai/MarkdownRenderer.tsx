'use client';

import ReactMarkdown from 'react-markdown';
import type { Components } from 'react-markdown';
import Link from 'next/link';
import { products } from '@/lib/mock-data/products';
import { InlineProductCard } from './InlineProductCard';

// Matches a line that is ONLY a markdown product link: [text](/products/slug)
const PRODUCT_LINK_LINE = /^\[([^\]]+)\]\(\/products\/([^)]+)\)$/;

const mdComponents: Components = {
  p({ children }) {
    return (
      <p className="font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
        {children}
      </p>
    );
  },
  strong({ children }) {
    return <strong className="font-medium text-white/90">{children}</strong>;
  },
  ul({ children }) {
    return <ul className="space-y-1 pl-1">{children}</ul>;
  },
  ol({ children }) {
    return <ol className="space-y-1 pl-1 list-none">{children}</ol>;
  },
  li({ children }) {
    return (
      <li className="flex gap-2 font-body text-sm leading-relaxed" style={{ color: 'rgba(255,255,255,0.78)' }}>
        <span style={{ color: 'rgba(255,255,255,0.3)', flexShrink: 0 }}>—</span>
        <span>{children}</span>
      </li>
    );
  },
  a({ href, children }) {
    return (
      <Link
        href={href ?? '#'}
        className="underline decoration-white/30 hover:decoration-white/70 transition-colors"
        style={{ color: 'rgba(130,190,210,0.9)' }}
      >
        {children}
      </Link>
    );
  },
  h1({ children }) {
    return <p className="font-body text-[10px] uppercase tracking-widest pt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{children}</p>;
  },
  h2({ children }) {
    return <p className="font-body text-[10px] uppercase tracking-widest pt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{children}</p>;
  },
  h3({ children }) {
    return <p className="font-body text-[10px] uppercase tracking-widest pt-1" style={{ color: 'rgba(255,255,255,0.35)' }}>{children}</p>;
  },
};

type Segment =
  | { type: 'text'; content: string }
  | { type: 'card'; slug: string; label: string };

/**
 * Split markdown into alternating text/card segments.
 * Lines that are ONLY a product link become card segments so they
 * render as block elements outside any <p>, avoiding invalid nesting.
 */
function parseSegments(content: string): Segment[] {
  const lines = content.split('\n');
  const segments: Segment[] = [];
  let textBuffer: string[] = [];

  for (const line of lines) {
    const m = line.trim().match(PRODUCT_LINK_LINE);
    if (m) {
      if (textBuffer.length > 0) {
        segments.push({ type: 'text', content: textBuffer.join('\n') });
        textBuffer = [];
      }
      segments.push({ type: 'card', label: m[1], slug: m[2] });
    } else {
      textBuffer.push(line);
    }
  }

  if (textBuffer.length > 0) {
    segments.push({ type: 'text', content: textBuffer.join('\n') });
  }

  return segments;
}

export function MarkdownRenderer({ content }: { content: string }) {
  const segments = parseSegments(content);

  return (
    <div className="flex flex-col gap-2">
      {segments.map((seg, i) => {
        if (seg.type === 'card') {
          const product = products.find((p) => p.slug === seg.slug);
          if (product) {
            return (
              <div key={i} className="my-1">
                <InlineProductCard product={product} />
              </div>
            );
          }
          // Fallback: plain link if product not found
          return (
            <Link
              key={i}
              href={`/products/${seg.slug}`}
              className="underline decoration-white/30 hover:decoration-white/70 transition-colors font-body text-sm"
              style={{ color: 'rgba(130,190,210,0.9)' }}
            >
              {seg.label}
            </Link>
          );
        }

        const trimmed = seg.content.trim();
        if (!trimmed) return null;

        return (
          <ReactMarkdown key={i} components={mdComponents}>
            {trimmed}
          </ReactMarkdown>
        );
      })}
    </div>
  );
}
