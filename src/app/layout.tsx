import type { Metadata } from 'next';
import './globals.css';
import { Nav } from '@/components/layout/Nav';
import { Footer } from '@/components/layout/Footer';
import { AIProvider } from '@/contexts/AIContext';
import { AIPanel } from '@/components/ai/AIPanel';

export const metadata: Metadata = {
  title: 'Yarn Over — Włóczki z charakterem',
  description: 'Sklep z włóczkami z wbudowanym asystentem AI. Dobieramy włóczkę do wzoru — pewnie, bez zgadywania.',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pl" className="h-full">
      <body className="min-h-full flex flex-col bg-cream text-charcoal antialiased">
        <AIProvider>
          <Nav />
          <main className="flex-1">{children}</main>
          <Footer />
          <AIPanel />
        </AIProvider>
      </body>
    </html>
  );
}
