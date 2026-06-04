'use client';

import { createContext, useContext, useState, ReactNode } from 'react';
import { YarnProduct } from '@/lib/types';

interface AIContextValue {
  isOpen: boolean;
  currentProduct: YarnProduct | null;
  openPanel: (product?: YarnProduct) => void;
  closePanel: () => void;
}

const AIContext = createContext<AIContextValue | null>(null);

export function AIProvider({ children }: { children: ReactNode }) {
  const [isOpen, setIsOpen] = useState(false);
  const [currentProduct, setCurrentProduct] = useState<YarnProduct | null>(null);

  const openPanel = (product?: YarnProduct) => {
    setCurrentProduct(product ?? null);
    setIsOpen(true);
  };

  const closePanel = () => {
    setIsOpen(false);
    setCurrentProduct(null);
  };

  return (
    <AIContext.Provider value={{ isOpen, currentProduct, openPanel, closePanel }}>
      {children}
    </AIContext.Provider>
  );
}

export function useAI() {
  const ctx = useContext(AIContext);
  if (!ctx) throw new Error('useAI must be used inside AIProvider');
  return ctx;
}
