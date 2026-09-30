'use client';

import { useState, useEffect } from 'react';
import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import { ProviderHealth } from '@/lib/types';

export default function StatusPage() {
  const [providers, setProviders] = useState<ProviderHealth[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastChecked, setLastChecked] = useState<string>('');

  const fetchStatus = async () => {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch('/api/health');
      if (!res.ok) {
        throw new Error('Failed to fetch provider health');
      }
      const data = await res.json();
      setProviders(data.providers);
      setLastChecked(new Date(data.timestamp).toLocaleTimeString());
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred');
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchStatus();
  }, []);

  return (
    <div className="font-mono bg-rs-black min-h-screen text-white">
      <Navigation />
      <main className="max-w-5xl mx-auto px-6 py-20 pt-14">
        
        <div className="flex justify-between items-center mb-8">
          <span className="text-rs-dim text-xs tracking-[0.3em] uppercase">PROVIDER STATUS</span>
          <button 
            onClick={fetchStatus}
            disabled={loading}
            className="text-rs-muted text-xs border border-rs-border px-3 py-1.5 hover:text-white hover:border-white transition-colors disabled:opacity-50"
          >
            {loading ? 'REFRESHING...' : 'REFRESH'}
          </button>
        </div>

        {error && (
          <div className="bg-rs-surface border border-rs-border p-4 text-red-400 text-sm mb-6">
            Error: {error}
          </div>
        )}

        <div className="overflow-x-auto border border-rs-border mb-4">
          <table className="w-full text-left whitespace-nowrap">
            <thead className="bg-rs-surface text-rs-dim text-xs uppercase border-b border-rs-border">
              <tr>
                <th className="px-4 py-3 font-normal">Provider</th>
                <th className="px-4 py-3 font-normal">Network</th>
                <th className="px-4 py-3 font-normal">Chain ID</th>
                <th className="px-4 py-3 font-normal">Status</th>
                <th className="px-4 py-3 font-normal">Block #</th>
                <th className="px-4 py-3 font-normal">Latency</th>
                <th className="px-4 py-3 font-normal">Last Checked</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-rs-border text-rs-muted text-sm bg-rs-black">
              {loading && providers.length === 0 ? (
                <tr>
                  <td colSpan={7} className="px-4 py-6 text-center text-rs-dim">Checking providers...</td>
                </tr>
              ) : providers.map((p, i) => (
                <tr key={i} className="hover:bg-rs-surface/50 transition-colors">
                  <td className="px-4 py-3 text-white">{p.name}</td>
                  <td className="px-4 py-3">{p.network}</td>
                  <td className="px-4 py-3">{p.chainId ?? '—'}</td>
                  <td className="px-4 py-3 flex items-center gap-2">
                    <span className={
                      p.status === 'healthy' ? 'text-green-500' :
                      p.status === 'degraded' ? 'text-yellow-500' :
                      p.status === 'down' ? 'text-red-500' : 'text-gray-500'
                    }>●</span>
                    <span className="capitalize">{p.status}</span>
                  </td>
                  <td className="px-4 py-3">{p.blockNumber ?? '—'}</td>
                  <td className="px-4 py-3">{p.latencyMs !== null ? `${p.latencyMs}ms` : '—'}</td>
                  <td className="px-4 py-3 text-xs">{new Date(p.lastChecked).toLocaleTimeString()}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex justify-between items-center">
          <div className="text-rs-dim text-xs">
            {lastChecked && `Last checked: ${lastChecked}`}
          </div>
          <div className="flex gap-4 text-xs text-rs-dim">
            <span className="flex items-center gap-1"><span className="text-green-500">●</span> healthy</span>
            <span className="flex items-center gap-1"><span className="text-yellow-500">●</span> degraded</span>
            <span className="flex items-center gap-1"><span className="text-red-500">●</span> down</span>
          </div>
        </div>

      </main>
      <Footer />
    </div>
  );
}
