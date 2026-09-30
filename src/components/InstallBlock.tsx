'use client';

import { useState } from 'react';

export default function InstallBlock({ command }: { command: string }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(command);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error('Failed to copy', err);
    }
  };

  return (
    <div className="bg-rs-surface border border-rs-border px-4 py-2.5 flex items-center gap-3">
      <code className="text-rs-muted text-sm flex-1 select-all">{command}</code>
      <button 
        onClick={handleCopy}
        className="text-rs-dim text-xs hover:text-white transition-colors uppercase tracking-wider"
      >
        {copied ? 'Copied!' : 'Copy'}
      </button>
    </div>
  );
}
