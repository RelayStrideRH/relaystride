import Image from 'next/image';
import Link from 'next/link';

export default function Navigation() {
  return (
    <header className="sticky top-0 z-50 h-14 flex items-center justify-between px-6 border-b border-rs-border bg-rs-black font-mono">
      <div className="flex items-center gap-2">
        <Image src="/logo.svg" alt="RelayStride" width={24} height={24} />
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

      <div>
        <a href="https://github.com/RelayStrideRH/relaystride" target="_blank" rel="noopener noreferrer" className="text-rs-muted text-xs hover:text-white uppercase tracking-wider">
          GitHub ↗
        </a>
      </div>
    </header>
  );
}
