import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';

export const metadata = { title: 'Documentation — RELAYSTRIDE_' };

export default function DocsPage() {
  return (
    <div className="font-mono bg-rs-black min-h-screen text-white">
      <Navigation />
      <main className="max-w-4xl mx-auto px-6 py-20 pt-14">
        
        <section>
          <h2 className="text-white text-lg mb-6 mt-16 first:mt-0">1. GETTING STARTED</h2>
          <div className="text-rs-muted text-sm leading-relaxed space-y-4">
            <p>
              RelayStride is a smart JSON-RPC routing layer and provider failover system designed for the Robinhood Chain ecosystem.
            </p>
            <p>
              To run RelayStride locally, use the following commands:
            </p>
            <pre className="bg-rs-black border border-rs-border p-4 text-xs text-rs-muted mb-4 overflow-x-auto">
{`git clone https://github.com/RelayStrideRH/relaystride.git
cd relaystride
npm install
npm run dev`}
            </pre>
            <p>Open <code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">localhost:3000</code> in your browser to view the interface.</p>
          </div>
        </section>

        <section className="border-t border-rs-border pt-8 mt-16">
          <h2 className="text-white text-lg mb-6">2. CLI REFERENCE</h2>
          <div className="text-rs-muted text-sm leading-relaxed space-y-4">
            <p>Available CLI commands (Note: CLI is not yet published. Run locally with <code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">npx</code>):</p>
            
            <div className="overflow-x-auto">
              <table className="w-full border border-rs-border text-left">
                <thead className="bg-rs-surface text-rs-dim text-xs uppercase">
                  <tr>
                    <th className="px-4 py-2 font-normal">Command</th>
                    <th className="px-4 py-2 font-normal">Description</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rs-border text-rs-muted text-sm">
                  <tr><td className="px-4 py-2"><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">init</code></td><td className="px-4 py-2">Initialize configuration</td></tr>
                  <tr><td className="px-4 py-2"><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">providers list</code></td><td className="px-4 py-2">List configured providers</td></tr>
                  <tr><td className="px-4 py-2"><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">health</code></td><td className="px-4 py-2">Check provider health</td></tr>
                  <tr><td className="px-4 py-2"><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">balance</code></td><td className="px-4 py-2">Get ETH balance for address</td></tr>
                  <tr><td className="px-4 py-2"><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">receipt</code></td><td className="px-4 py-2">Get transaction receipt</td></tr>
                  <tr><td className="px-4 py-2"><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">request</code></td><td className="px-4 py-2">Make raw JSON-RPC request</td></tr>
                  <tr><td className="px-4 py-2"><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">receipts list</code></td><td className="px-4 py-2">List routing receipts</td></tr>
                  <tr><td className="px-4 py-2"><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">mcp</code></td><td className="px-4 py-2">Start MCP server</td></tr>
                </tbody>
              </table>
            </div>

            <h3 className="text-white text-sm mb-3 mt-8">Global Options</h3>
            <p>
              <code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">--json</code>, <code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">--network</code>, <code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">--timeout</code>, <code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">--dry-run</code>
            </p>

            <h3 className="text-white text-sm mb-3 mt-8">Exit Codes</h3>
            <div className="overflow-x-auto">
              <table className="w-full border border-rs-border text-left">
                <thead className="bg-rs-surface text-rs-dim text-xs uppercase">
                  <tr>
                    <th className="px-4 py-2 font-normal">Code</th>
                    <th className="px-4 py-2 font-normal">Meaning</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-rs-border text-rs-muted text-sm">
                  <tr><td className="px-4 py-2">0</td><td className="px-4 py-2">Success</td></tr>
                  <tr><td className="px-4 py-2">1</td><td className="px-4 py-2">Error</td></tr>
                  <tr><td className="px-4 py-2">2</td><td className="px-4 py-2">No providers available</td></tr>
                  <tr><td className="px-4 py-2">3</td><td className="px-4 py-2">Budget exceeded</td></tr>
                  <tr><td className="px-4 py-2">4</td><td className="px-4 py-2">Validation failure</td></tr>
                  <tr><td className="px-4 py-2">5</td><td className="px-4 py-2">Timeout</td></tr>
                  <tr><td className="px-4 py-2">6</td><td className="px-4 py-2">Unresolved payment</td></tr>
                </tbody>
              </table>
            </div>
          </div>
        </section>

        <section className="border-t border-rs-border pt-8 mt-16">
          <h2 className="text-white text-lg mb-6">3. PROVIDER CONFIGURATION</h2>
          <div className="text-rs-muted text-sm leading-relaxed space-y-4">
            <p>
              By default, RelayStride comes configured with Robinhood Chain public RPCs. 
            </p>
            <p>
              To add custom providers, edit your configuration file. Rate limits apply strictly to public RPC endpoints. 
            </p>
            <h3 className="text-white text-sm mb-3 mt-8">Environment Variables</h3>
            <pre className="bg-rs-black border border-rs-border p-4 text-xs text-rs-muted mb-4 overflow-x-auto">
{`RELAYSTRIDE_NETWORK=robinhood-mainnet
RELAYSTRIDE_BUDGET=10.00
RELAYSTRIDE_PROVIDER_TIMEOUT=5000`}
            </pre>
          </div>
        </section>

        <section className="border-t border-rs-border pt-8 mt-16">
          <h2 className="text-white text-lg mb-6">4. MCP INTEGRATION</h2>
          <div className="text-rs-muted text-sm leading-relaxed space-y-4">
            <p>
              RelayStride supports Model Context Protocol (MCP) to provide tools for LLMs (like Claude and Cursor).
            </p>
            <h3 className="text-white text-sm mb-3 mt-8">Available Tools</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">provider_health</code></li>
              <li><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">get_balance</code></li>
              <li><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">get_tx_receipt</code></li>
              <li><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">get_token_balance</code></li>
              <li><code className="bg-rs-surface px-1.5 py-0.5 text-rs-muted text-xs">list_capabilities</code></li>
            </ul>
            <p className="mt-4 italic">Note: All tools are currently read-only.</p>
            <h3 className="text-white text-sm mb-3 mt-8">Configuration for Claude Desktop</h3>
            <pre className="bg-rs-black border border-rs-border p-4 text-xs text-rs-muted mb-4 overflow-x-auto">
{`{
  "mcpServers": {
    "relaystride": {
      "command": "npx",
      "args": ["relaystride", "mcp"]
    }
  }
}`}
            </pre>
          </div>
        </section>

        <section className="border-t border-rs-border pt-8 mt-16">
          <h2 className="text-white text-lg mb-6">5. ROUTING ENGINE</h2>
          <div className="text-rs-muted text-sm leading-relaxed space-y-4">
            <p>
              The routing engine intelligently selects the best provider based on health, latency, cost, and priority.
            </p>
            <h3 className="text-white text-sm mb-3 mt-8">Circuit Breaker States</h3>
            <ul className="list-disc list-inside space-y-1 ml-4">
              <li><strong>Closed:</strong> Normal operation. Requests flow freely.</li>
              <li><strong>Open:</strong> Provider marked unhealthy. Requests are blocked and rerouted.</li>
              <li><strong>Half-Open:</strong> Testing recovery. A single test request is allowed.</li>
            </ul>
            <p className="mt-4">
              Budget enforcement prevents accidental overspend by tracking the aggregate cost of API requests. Unknown cost providers require explicit opt-in.
            </p>
          </div>
        </section>

        <section className="border-t border-rs-border pt-8 mt-16">
          <h2 className="text-white text-lg mb-6">6. RECEIPT FORMAT</h2>
          <div className="text-rs-muted text-sm leading-relaxed space-y-4">
            <p>
              Every routed request generates a local routing receipt (Note: these are NOT on-chain transaction receipts).
            </p>
            <pre className="bg-rs-black border border-rs-border p-4 text-xs text-rs-muted mb-4 overflow-x-auto">
{`{
  "receiptId": "rec_1a2b3c",
  "timestamp": "2023-10-27T10:00:00Z",
  "method": "eth_getBalance",
  "provider": "robinhood-public-1",
  "latencyMs": 142,
  "cost": {
    "amount": 0,
    "currency": "none"
  },
  "status": "success"
}`}
            </pre>
          </div>
        </section>

        <section className="border-t border-rs-border pt-8 mt-16 mb-20">
          <h2 className="text-white text-lg mb-6">7. LIMITATIONS & ROADMAP</h2>
          <div className="text-rs-muted text-sm leading-relaxed space-y-4">
            <h3 className="text-white text-sm mb-3 mt-8">Live Features</h3>
            <p>
              Network status, balance checking, transaction receipts, token metadata and balance querying, provider failover, response validation, budget enforcement (for free RPCs), browser terminal, and MCP tools.
            </p>
            <h3 className="text-white text-sm mb-3 mt-8">Planned Roadmap</h3>
            <p>
              Paid API routing integration, npm package publishing, deployment features, and support for additional networks.
            </p>
            <h3 className="text-white text-sm mb-3 mt-8">Known Issues</h3>
            <p>
              Public RPCs are heavily rate-limited. No paid provider integration is actively connected yet.
            </p>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
