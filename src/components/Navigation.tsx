import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 h-14 flex items-center justify-between px-6 border-b border-rs-border bg-rs-black font-mono">
      <div className="flex items-center gap-3">
        <Image src="/icon.png" alt="RelayStride" width={28} height={28} className="block" priority />
        <span className="text-white text-sm tracking-widest font-bold">RELAYSTRIDE_</span>
      </div>
      
      <nav className="hidden md:flex items-center gap-8">
        <Link href="/" className="text-rs-muted text-xs tracking-wider uppercase hover:text-white transition-colors">
          <span className="text-rs-dim mr-2">01</span>Home
        </Link>
        <Link href="/#install" className="text-rs-muted text-xs tracking-wider uppercase hover:text-white transition-colors">
          <span className="text-rs-dim mr-2">02</span>Setup
        </Link>
        <Link href="/#capabilities" className="text-rs-muted text-xs tracking-wider uppercase hover:text-white transition-colors">
          <span className="text-rs-dim mr-2">03</span>Routing
        </Link>
        <Link href="/terminal" className="text-rs-muted text-xs tracking-wider uppercase hover:text-white transition-colors">
          <span className="text-rs-dim mr-2">04</span>Terminal
        </Link>
        <Link href="/docs" className="text-rs-muted text-xs tracking-wider uppercase hover:text-white transition-colors">
          <span className="text-rs-dim mr-2">05</span>Docs
        </Link>
      </nav>

      <div className="flex items-center gap-5">
        <a href="https://x.com/relaystride" target="_blank" rel="noopener noreferrer" className="text-rs-muted hover:text-white transition-colors" aria-label="X (Twitter)">
          <svg width="14" height="14" viewBox="0 0 24 24" fill="currentColor">
            <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
          </svg>
        </a>
        <a href="https://github.com/RelayStrideRH" target="_blank" rel="noopener noreferrer" className="text-rs-muted text-xs hover:text-white uppercase tracking-wider">
          GitHub ↗
        </a>
      </div>
    </header>
  );
}
