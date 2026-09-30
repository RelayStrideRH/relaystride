import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-rs-border bg-rs-black py-12 px-6 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="text-rs-dim text-sm tracking-widest">
          RELAYSTRIDE_
        </div>
        <div className="text-rs-dim text-xs">
          Read-only MVP — v0.1.0
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/RelayStrideRH/relaystride" target="_blank" rel="noopener noreferrer" className="text-rs-muted text-xs hover:text-white">
            GitHub ↗
          </a>
          <Link href="/docs" className="text-rs-muted text-xs hover:text-white">
            Docs
          </Link>
        </div>
      </div>
    </footer>
  );
}
