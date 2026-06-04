'use client';

import { useState } from 'react';

interface ProductGalleryProps {
  images: string[];
  productName: string;
}

export function ProductGallery({ images, productName }: ProductGalleryProps) {
  const [active, setActive] = useState(0);
  const [zoomed, setZoomed] = useState(false);

  const allImages = images.length > 1
    ? images
    : (() => {
        // Extract seed from picsum URL (e.g. "yarn-p09") and generate variants
        const match = images[0].match(/\/seed\/([^/]+)\//);
        if (match) {
          const base = `https://picsum.photos/seed`;
          return [
            images[0],
            `${base}/${match[1]}-b/600/800`,
            `${base}/${match[1]}-c/600/800`,
          ];
        }
        return [images[0], images[0], images[0]];
      })();

  return (
    <>
      {/* Desktop */}
      <div className="hidden md:flex gap-3">
        {/* Thumbnails */}
        <div className="flex flex-col gap-2 w-16 shrink-0">
          {allImages.map((src, i) => (
            <button
              key={i}
              onClick={() => setActive(i)}
              className={`aspect-square bg-parchment overflow-hidden border-2 transition-colors ${
                active === i ? 'border-charcoal' : 'border-transparent hover:border-linen'
              }`}
            >
              <img src={src} alt="" className="w-full h-full object-cover" />
            </button>
          ))}
        </div>

        {/* Main image */}
        <div
          className="flex-1 bg-parchment overflow-hidden cursor-zoom-in relative"
          style={{ aspectRatio: '3/4' }}
          onClick={() => setZoomed(true)}
        >
          <img
            src={allImages[active]}
            alt={productName}
            className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
          />
        </div>
      </div>

      {/* Mobile: horizontal scroll */}
      <div className="md:hidden">
        <div className="flex gap-3 overflow-x-auto snap-x snap-mandatory pb-3 scrollbar-hide">
          {allImages.map((src, i) => (
            <div
              key={i}
              className="snap-start shrink-0 w-[85vw] bg-parchment overflow-hidden"
              style={{ aspectRatio: '3/4' }}
            >
              <img
                src={src}
                alt={productName}
                className="w-full h-full object-cover"
              />
            </div>
          ))}
        </div>
        {/* Dots */}
        <div className="flex justify-center gap-1.5 mt-2">
          {allImages.map((_, i) => (
            <div
              key={i}
              className={`w-1.5 h-1.5 rounded-full transition-colors ${
                i === active ? 'bg-charcoal' : 'bg-linen'
              }`}
            />
          ))}
        </div>
      </div>

      {/* Lightbox */}
      {zoomed && (
        <div
          className="fixed inset-0 z-[100] bg-charcoal/90 flex items-center justify-center p-4 cursor-zoom-out"
          onClick={() => setZoomed(false)}
        >
          <img
            src={allImages[active]}
            alt={productName}
            className="max-h-[90vh] max-w-[90vw] object-contain"
          />
        </div>
      )}
    </>
  );
}
