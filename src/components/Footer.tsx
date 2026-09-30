import Link from 'next/link';

export default function Footer() {
  return (
    <footer className="border-t border-rs-border bg-rs-black py-12 px-6 font-mono">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row gap-6 justify-between items-center">
        <div className="flex items-center gap-3 text-rs-dim text-sm tracking-widest">
          <img src="/icon.png" alt="RelayStride" width={22} height={22} />
          RELAYSTRIDE_
        </div>
        <div className="text-rs-dim text-xs">
          © 2026 - RelayStride
        </div>
        <div className="flex gap-4">
          <a href="https://github.com/RelayStrideRH" target="_blank" rel="noopener noreferrer" className="text-rs-muted text-xs hover:text-white">
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
