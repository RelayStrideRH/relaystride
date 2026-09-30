'use client';

import { useState, useRef, useEffect, KeyboardEvent } from 'react';

interface TerminalLine {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
}

const INITIAL_OUTPUT: TerminalLine[] = [
  { type: 'system', content: 'RELAYSTRIDE_ v0.1.0' },
  { type: 'system', content: 'Robinhood Chain — Read-only Agent Infrastructure' },
  { type: 'system', content: 'Type "help" for available commands.' },
];

const HELP_TEXT = `RELAYSTRIDE TERMINAL

Available commands:
  help                  Show this help message
  clear                 Clear terminal output
  providers             List configured providers
  health                Check provider health
  balance <address>     Get native ETH balance
  receipt <txHash>      Get transaction receipt`;

export default function BrowserTerminal() {
  const [lines, setLines] = useState<TerminalLine[]>(INITIAL_OUTPUT);
  const [inputValue, setInputValue] = useState('');
  const [history, setHistory] = useState<string[]>([]);
  const [historyIndex, setHistoryIndex] = useState(-1);
  const [isProcessing, setIsProcessing] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  };

  useEffect(() => {
    scrollToBottom();
  }, [lines, isProcessing]);

  const handleFocus = () => {
    inputRef.current?.focus();
  };

  const processCommand = async (cmdStr: string) => {
    const trimmed = cmdStr.trim();
    if (!trimmed) return;

    setLines(prev => [...prev, { type: 'input', content: trimmed }]);
    setHistory(prev => [...prev, trimmed]);
    setHistoryIndex(-1);
    
    const parts = trimmed.split(/\s+/);
    const command = parts[0].toLowerCase();
    const args = parts.slice(1);

    if (command === 'clear') {
      setLines([]);
      return;
    }

    if (command === 'help') {
      setLines(prev => [...prev, { type: 'output', content: HELP_TEXT }]);
      return;
    }

    const apiCommands = ['providers', 'health', 'balance', 'receipt'];
    
    if (apiCommands.includes(command)) {
      if (command === 'balance' && args.length !== 1) {
        setLines(prev => [...prev, { type: 'error', content: 'Usage: balance <address>' }]);
        return;
      }
      if (command === 'receipt' && args.length !== 1) {
        setLines(prev => [...prev, { type: 'error', content: 'Usage: receipt <txHash>' }]);
        return;
      }

      setIsProcessing(true);
      try {
        const response = await fetch('/api/terminal', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ command, args }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
          setLines(prev => [...prev, { type: 'error', content: data.error || 'API Error' }]);
        } else {
          setLines(prev => [...prev, { type: 'output', content: data.output || 'Success' }]);
        }
      } catch {
        setLines(prev => [...prev, { type: 'error', content: 'Failed to connect to API server.' }]);
      } finally {
        setIsProcessing(false);
      }
    } else {
      setLines(prev => [...prev, { type: 'error', content: 'Unknown command. Type "help" for available commands.' }]);
    }
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      if (!isProcessing) {
        processCommand(inputValue);
        setInputValue('');
      }
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      if (history.length > 0) {
        const nextIndex = historyIndex < history.length - 1 ? historyIndex + 1 : historyIndex;
        setHistoryIndex(nextIndex);
        setInputValue(history[history.length - 1 - nextIndex]);
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault();
      if (historyIndex > 0) {
        const nextIndex = historyIndex - 1;
        setHistoryIndex(nextIndex);
        setInputValue(history[history.length - 1 - nextIndex]);
      } else if (historyIndex === 0) {
        setHistoryIndex(-1);
        setInputValue('');
      }
    }
  };

  return (
    <div className="terminal-window w-full h-[600px] flex flex-col bg-rs-charcoal border border-rs-border font-mono text-sm" onClick={handleFocus}>
      <div className="h-10 shrink-0 bg-rs-black border-b border-rs-border flex items-center px-4 gap-2">
        <div className="flex items-center gap-2">
          <span className="terminal-dot w-2.5 h-2.5 bg-rs-border block" />
          <span className="terminal-dot w-2.5 h-2.5 bg-rs-border block" />
          <span className="terminal-dot w-2.5 h-2.5 bg-rs-border block" />
        </div>
        <div className="text-rs-dim text-xs flex-1 text-center pr-8">relaystride — terminal</div>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto p-6 flex flex-col whitespace-pre-wrap leading-relaxed">
        {lines.map((line, idx) => (
          <div key={idx} className="mb-1">
            {line.type === 'input' && (
              <div>
                <span className="text-rs-muted">$ </span>
                <span className="text-white">{line.content}</span>
              </div>
            )}
            {line.type === 'output' && <div className="text-white">{line.content}</div>}
            {line.type === 'error' && <div className="text-red-400">{line.content}</div>}
            {line.type === 'system' && <div className="text-white">{line.content}</div>}
          </div>
        ))}
        {isProcessing && (
          <div className="text-rs-muted mt-2">→ Processing...</div>
        )}
      </div>

      <div className="shrink-0 border-t border-rs-border bg-rs-black p-4 flex items-center">
        <span className="text-rs-muted mr-2">$</span>
        <input
          ref={inputRef}
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={handleKeyDown}
          disabled={isProcessing}
          className="bg-transparent text-white outline-none w-full font-mono text-sm"
          spellCheck={false}
          autoComplete="off"
        />
      </div>
    </div>
  );
}
