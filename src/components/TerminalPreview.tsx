'use client';

import { useEffect, useState, useRef } from 'react';

const DEMO_SEQUENCE = [
  { text: '$ relaystride health --network robinhood-mainnet', delay: 800, type: 'command' },
  { text: '', delay: 100, type: 'blank' },
  { text: '  PROVIDER HEALTH CHECK', delay: 100, type: 'data' },
  { text: '  Network: Robinhood Chain Mainnet (4663)', delay: 100, type: 'data' },
  { text: '', delay: 100, type: 'blank' },
  { text: '  ┌─────────────────────────┬──────────┬─────────┐', delay: 100, type: 'table' },
  { text: '  │ Provider                │ Status   │ Latency │', delay: 100, type: 'table' },
  { text: '  ├─────────────────────────┼──────────┼─────────┤', delay: 100, type: 'table' },
  { text: '  │ robinhood-public-1      │ healthy  │ 142ms   │', delay: 100, type: 'table-row-healthy' },
  { text: '  │ robinhood-public-2      │ healthy  │ 238ms   │', delay: 100, type: 'table-row-healthy' },
  { text: '  └─────────────────────────┴──────────┴─────────┘', delay: 100, type: 'table' },
  { text: '', delay: 100, type: 'blank' },
  { text: '$ relaystride balance 0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18', delay: 800, type: 'command' },
  { text: '', delay: 100, type: 'blank' },
  { text: '  → Trying provider: robinhood-public-1...', delay: 100, type: 'trying' },
  { text: '  ✗ Provider timeout after 5000ms', delay: 1500, type: 'error' },
  { text: '  → Falling back to: robinhood-public-2...', delay: 100, type: 'trying' },
  { text: '  ✓ Response received (234ms)', delay: 234, type: 'success' },
  { text: '', delay: 100, type: 'blank' },
  { text: '  BALANCE', delay: 100, type: 'data' },
  { text: '  Address: 0x742d...2bD18', delay: 100, type: 'data' },
  { text: '  Balance: 1.4237 ETH', delay: 100, type: 'data' },
  { text: '  Network: Robinhood Chain Mainnet (4663)', delay: 100, type: 'data' },
  { text: '', delay: 100, type: 'blank' },
  { text: '  [DEMO] Simulated output — not live data', delay: 100, type: 'demo' },
];

export default function TerminalPreview() {
  const [lines, setLines] = useState<typeof DEMO_SEQUENCE>([]);
  const [isPlaying, setIsPlaying] = useState(true);
  const timeoutsRef = useRef<NodeJS.Timeout[]>([]);
  const scrollRef = useRef<HTMLDivElement>(null);

  const startAnimation = () => {
    setLines([]);
    setIsPlaying(true);
    timeoutsRef.current.forEach(clearTimeout);
    timeoutsRef.current = [];

    let currentDelay = 0;
    DEMO_SEQUENCE.forEach((line, index) => {
      currentDelay += line.delay;
      const timeout = setTimeout(() => {
        setLines(prev => [...prev, line]);
        if (index === DEMO_SEQUENCE.length - 1) {
          setIsPlaying(false);
        }
      }, currentDelay);
      timeoutsRef.current.push(timeout);
    });
  };

  useEffect(() => {
    startAnimation();
    return () => {
      timeoutsRef.current.forEach(clearTimeout);
    };
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [lines]);

  const renderLine = (line: typeof DEMO_SEQUENCE[0], index: number) => {
    switch (line.type) {
      case 'command':
        return <div key={index}><span className="text-rs-muted">$ </span><span className="text-white">{line.text.substring(2)}</span></div>;
      case 'table-row-healthy':
        return (
          <div key={index} className="text-rs-dim">
            {line.text.split('healthy').map((part, i, arr) => (
              <span key={i}>
                {part}
                {i < arr.length - 1 && <span className="text-green-500">healthy</span>}
              </span>
            ))}
          </div>
        );
      case 'error':
        return (
          <div key={index}>
            <span className="text-red-400">  ✗ </span>
            <span className="text-white">{line.text.substring(4)}</span>
          </div>
        );
      case 'success':
        return (
          <div key={index}>
            <span className="text-green-400">  ✓ </span>
            <span className="text-white">{line.text.substring(4)}</span>
          </div>
        );
      case 'trying':
        return (
          <div key={index}>
            <span className="text-rs-muted">  → </span>
            <span className="text-white">{line.text.substring(4)}</span>
          </div>
        );
      case 'demo':
        return <div key={index} className="text-rs-dim italic">{line.text}</div>;
      case 'table':
        return <div key={index} className="text-rs-dim">{line.text}</div>;
      default:
        return <div key={index} className="text-white">{line.text || ' '}</div>;
    }
  };

  return (
    <div className="terminal-window w-full bg-rs-charcoal border border-rs-border font-mono">
      <div className="h-10 bg-rs-black border-b border-rs-border flex items-center px-4 gap-2 justify-between">
        <div className="flex items-center gap-2">
          <span className="terminal-dot w-2.5 h-2.5 bg-rs-border block" />
          <span className="terminal-dot w-2.5 h-2.5 bg-rs-border block" />
          <span className="terminal-dot w-2.5 h-2.5 bg-rs-border block" />
        </div>
        <div className="text-rs-dim text-xs">relaystride — demo</div>
        <div 
          onClick={startAnimation}
          className="text-rs-dim text-xs hover:text-white cursor-pointer transition-colors"
        >
          ↺ replay
        </div>
      </div>
      <div ref={scrollRef} className="p-6 min-h-[400px] h-[400px] overflow-y-auto text-sm leading-relaxed whitespace-pre font-mono bg-rs-charcoal">
        {lines.map((line, index) => renderLine(line, index))}
        {isPlaying && <span className="inline-block w-2 h-4 bg-white animate-pulse mt-1 ml-1 align-middle" />}
      </div>
    </div>
  );
}
