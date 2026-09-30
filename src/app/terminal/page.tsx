import Navigation from '@/components/Navigation';
import BrowserTerminal from '@/components/BrowserTerminal';

export const metadata = { title: 'Terminal — RELAYSTRIDE_' };

export default function TerminalPage() {
  return (
    <div className="font-mono">
      <Navigation />
      <main className="bg-rs-charcoal min-h-screen pt-14">
        <div className="max-w-5xl mx-auto px-6 py-8">
          <div className="flex justify-between items-center mb-6">
            <span className="text-rs-dim text-xs tracking-[0.3em] uppercase">TERMINAL</span>
            <span className="text-rs-dim text-xs tracking-[0.3em] uppercase">ROBINHOOD CHAIN MAINNET / 4663</span>
          </div>
          <div className="h-[calc(100vh-12rem)]">
            <BrowserTerminal />
          </div>
        </div>
      </main>
    </div>
  );
}
