'use client';

import { useState } from 'react';

const CA = '0xd44f2212a899d4eea62a46f9c629570147f47a14';

export default function CopyAddress() {
  const [copied, setCopied] = useState(false);

  const copy = () => {
    navigator.clipboard.writeText(CA);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <button
      onClick={copy}
      className="flex items-center gap-3 bg-rs-surface border border-rs-border px-4 py-2.5 text-xs tracking-wider hover:border-rs-muted transition-colors cursor-pointer group"
      title="Copy contract address"
    >
      <span className="text-rs-dim">CA</span>
      <span className="text-rs-muted group-hover:text-white transition-colors font-mono">
        {CA}
      </span>
      <span className="text-rs-dim text-[10px]">{copied ? '✓ COPIED' : 'COPY'}</span>
    </button>
  );
}
