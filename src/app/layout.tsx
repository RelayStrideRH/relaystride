import type { Metadata } from 'next';
import { JetBrains_Mono } from 'next/font/google';
import HalftoneBackground from '@/components/HalftoneBackground';
import './globals.css';

const jetbrains = JetBrains_Mono({
  subsets: ['latin'],
  variable: '--font-jetbrains',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'RELAYSTRIDE_ — Reliable Service Router for AI Agents',
  description:
    'Reliable data and tools for AI agents on Robinhood Chain. Set a budget, validate responses, and switch providers when a request fails.',
  keywords: ['AI agents', 'Robinhood Chain', 'service router', 'provider routing', 'blockchain'],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={jetbrains.variable}>
      <body className="font-mono antialiased">
        <HalftoneBackground />
        <div className="relative" style={{ zIndex: 1 }}>
          {children}
        </div>
      </body>
    </html>
  );
}
