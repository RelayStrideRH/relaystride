import Navigation from '@/components/Navigation';
import Footer from '@/components/Footer';
import TerminalPreview from '@/components/TerminalPreview';
import InstallBlock from '@/components/InstallBlock';

export default function Home() {
  return (
    <div className="min-h-screen font-mono">
      <Navigation />

      {/* SECTION 1: HERO */}
      <section className="hero-texture relative" style={{ backgroundColor: 'rgba(10,10,10,0.85)' }}>
        <div className="max-w-7xl mx-auto px-6 pt-32 pb-20 relative z-10">
          
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 md:gap-0 mb-16">
            <span className="text-rs-dim text-xs tracking-[0.3em] uppercase">
              RELAYSTRIDE / SYSTEM 01
            </span>
            <span className="text-rs-dim text-xs tracking-[0.3em] uppercase md:text-right">
              ROBINHOOD CHAIN / AGENT INFRASTRUCTURE
            </span>
          </div>

          <div className="max-w-3xl mb-10">
            <h1 className="text-white text-5xl md:text-7xl font-light tracking-tight leading-none">
              One request.
            </h1>
            <h1 className="text-rs-muted text-5xl md:text-7xl font-light tracking-tight leading-none mt-2">
              A reliable route.
            </h1>
          </div>

          <p className="max-w-xl mb-12 text-rs-muted text-sm leading-relaxed">
            Reliable data and tools for AI agents on Robinhood Chain. Set a budget, validate responses, and switch providers when a request fails.
          </p>

          <div className="flex flex-col md:flex-row md:items-center gap-8">
            <a 
              href="/terminal" 
              className="text-white text-sm border-b border-white pb-1 hover:text-rs-muted hover:border-rs-muted transition-colors self-start"
            >
              Open terminal ↗
            </a>
            <div>
              <div className="text-rs-muted text-xs tracking-wider uppercase mb-2">
                Install CLI
              </div>
              <InstallBlock command="git clone https://github.com/RelayStrideRH/relaystride.git" />
            </div>
          </div>
        </div>

        {/* TERMINAL PREVIEW */}
        <div className="max-w-5xl mx-auto px-6 pb-20 relative z-10 overflow-x-auto">
          <TerminalPreview />
        </div>
      </section>

      {/* SECTION 2: INSTALL & FIRST COMMAND */}
      <section id="install" className="py-20 px-6 border-t border-rs-border bg-[rgba(17,17,17,0.88)]">
        <div className="max-w-7xl mx-auto">
          <div className="grid md:grid-cols-2 gap-16">
            
            <div>
              <div className="text-rs-dim text-xs tracking-[0.3em] uppercase mb-6">SETUP</div>
              <h2 className="text-white text-2xl font-light mb-4">Get started in seconds</h2>
              <p className="text-rs-muted text-sm leading-relaxed mb-8">
                Clone the repository, install dependencies, and initialize your local configuration.
              </p>
              
              <div className="bg-rs-surface border border-rs-border p-4 mb-4">
                <div className="text-rs-dim text-xs mb-2">01 — Clone & install</div>
                <div className="text-rs-muted text-sm">git clone https://github.com/RelayStrideRH/relaystride.git && cd relaystride && npm install</div>
              </div>

              <div className="bg-rs-surface border border-rs-border p-4">
                <div className="text-rs-dim text-xs mb-2">02 — Initialize</div>
                <div className="text-rs-muted text-sm">npx relaystride init</div>
              </div>
            </div>

            <div>
              <div className="text-rs-dim text-xs tracking-[0.3em] uppercase mb-6">FIRST COMMAND</div>
              <div className="bg-rs-black border border-rs-border p-6 overflow-x-auto">
                <div className="text-white text-sm mb-4 whitespace-nowrap">
                  <span className="text-rs-dim">$</span> relaystride providers list
                </div>
                <pre className="text-rs-muted text-xs leading-relaxed font-mono">
{`Configured Providers
Network: Robinhood Chain Mainnet (4663)

robinhood-public-1
  URL: rpc.mainnet.chain.robinhood.com
  Capabilities: balance, tx_receipt, network_status
  Cost: Free (public RPC)

robinhood-public-2
  URL: rpc.mainnet.chain.robinhood.com
  Capabilities: balance, tx_receipt, network_status
  Cost: Free (public RPC)`}
                </pre>
              </div>
            </div>
            
          </div>
        </div>
      </section>

      {/* SECTION 3: CAPABILITIES */}
      <section id="capabilities" className="py-20 px-6 border-t border-rs-border bg-[rgba(17,17,17,0.88)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-rs-dim text-xs tracking-[0.3em] uppercase mb-12">CAPABILITIES</div>
          
          <div className="grid md:grid-cols-3 gap-0">
            <div className="border-l-0 border-rs-border md:pr-8 py-2 md:border-l-0 md:pl-0 border-t pt-8 md:border-t-0 md:pt-2">
              <div className="text-rs-dim text-xs mb-4">01</div>
              <h3 className="text-white text-lg mb-3">Provider routing</h3>
              <p className="text-rs-muted text-sm leading-relaxed">
                Select a compatible provider for each request. When a provider fails or times out, automatically fall back to the next available option.
              </p>
            </div>
            
            <div className="border-l-0 md:border-l border-rs-border md:pl-8 py-2 border-t md:border-t-0 pt-8 md:pt-2">
              <div className="text-rs-dim text-xs mb-4">02</div>
              <h3 className="text-white text-lg mb-3">Response validation</h3>
              <p className="text-rs-muted text-sm leading-relaxed">
                Validate response schemas, check chain IDs match the requested network, and flag stale data. Reject malformed or wrong-chain responses before they reach your agent.
              </p>
            </div>
            
            <div className="border-l-0 md:border-l border-rs-border md:pl-8 py-2 border-t md:border-t-0 pt-8 md:pt-2">
              <div className="text-rs-dim text-xs mb-4">03</div>
              <h3 className="text-white text-lg mb-3">Budget enforcement</h3>
              <p className="text-rs-muted text-sm leading-relaxed">
                Set a per-request cost limit. Track charges across provider attempts. Refuse to retry when the cost is unknown or would exceed the budget.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 4: REQUEST LIFECYCLE */}
      <section className="py-20 px-6 border-t border-rs-border bg-[rgba(17,17,17,0.88)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between items-start gap-4 md:gap-0 mb-16">
            <div className="text-rs-dim text-xs tracking-[0.3em] uppercase">REQUEST LIFECYCLE</div>
            <div className="text-rs-dim text-xs tracking-[0.3em] uppercase">HOW ROUTING WORKS</div>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
            <div>
              <div className="text-rs-dim text-xs mb-4">01</div>
              <div className="h-px bg-rs-border w-full mb-4 hidden md:block"></div>
              <h4 className="text-white text-sm mb-2">Request</h4>
              <p className="text-rs-muted text-xs leading-relaxed">
                Your agent sends a request with a capability, target network, and optional budget.
              </p>
            </div>
            <div>
              <div className="text-rs-dim text-xs mb-4">02</div>
              <div className="h-px bg-rs-border w-full mb-4 hidden md:block"></div>
              <h4 className="text-white text-sm mb-2">Provider selection</h4>
              <p className="text-rs-muted text-xs leading-relaxed">
                The router filters providers by capability and health, then selects the best available option.
              </p>
            </div>
            <div>
              <div className="text-rs-dim text-xs mb-4">03</div>
              <div className="h-px bg-rs-border w-full mb-4 hidden md:block"></div>
              <h4 className="text-white text-sm mb-2">Validation</h4>
              <p className="text-rs-muted text-xs leading-relaxed">
                The response is checked against the expected schema. Chain ID and data freshness are verified.
              </p>
            </div>
            <div>
              <div className="text-rs-dim text-xs mb-4">04</div>
              <div className="h-px bg-rs-border w-full mb-4 hidden md:block opacity-0"></div>
              <h4 className="text-white text-sm mb-2">Result</h4>
              <p className="text-rs-muted text-xs leading-relaxed">
                A routing receipt is returned with the result, provider attempts, latency, and any charges.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 5: PROVIDER HEALTH */}
      <section className="py-20 px-6 border-t border-rs-border bg-[rgba(17,17,17,0.88)]">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:justify-between md:items-center gap-4 md:gap-0 mb-8">
            <div className="text-rs-dim text-xs tracking-[0.3em] uppercase">PROVIDER STATUS</div>
            <div className="text-rs-dim text-xs">Default providers — public RPCs</div>
          </div>

          <div className="w-full overflow-x-auto border border-rs-border">
            <table className="w-full text-left border-collapse min-w-[800px]">
              <thead>
                <tr className="bg-rs-surface text-rs-dim text-xs uppercase tracking-wider">
                  <th className="px-4 py-3 font-normal">Provider</th>
                  <th className="px-4 py-3 font-normal">Network</th>
                  <th className="px-4 py-3 font-normal">Status</th>
                  <th className="px-4 py-3 font-normal">Latency</th>
                  <th className="px-4 py-3 font-normal">Capabilities</th>
                </tr>
              </thead>
              <tbody className="text-sm">
                <tr className="border-t border-rs-border">
                  <td className="px-4 py-3 text-white">robinhood-public-1</td>
                  <td className="px-4 py-3 text-rs-muted">Mainnet (4663)</td>
                  <td className="px-4 py-3 text-rs-muted flex items-center gap-2">
                    <span className="text-green-500 text-xs">●</span> healthy
                  </td>
                  <td className="px-4 py-3 text-rs-muted">~140ms</td>
                  <td className="px-4 py-3 text-rs-muted">balance, tx_receipt, status</td>
                </tr>
                <tr className="border-t border-rs-border">
                  <td className="px-4 py-3 text-white">robinhood-public-2</td>
                  <td className="px-4 py-3 text-rs-muted">Mainnet (4663)</td>
                  <td className="px-4 py-3 text-rs-muted flex items-center gap-2">
                    <span className="text-green-500 text-xs">●</span> healthy
                  </td>
                  <td className="px-4 py-3 text-rs-muted">~235ms</td>
                  <td className="px-4 py-3 text-rs-muted">balance, tx_receipt, status</td>
                </tr>
                <tr className="border-t border-rs-border">
                  <td className="px-4 py-3 text-white">robinhood-testnet</td>
                  <td className="px-4 py-3 text-rs-muted">Testnet (46630)</td>
                  <td className="px-4 py-3 text-rs-muted flex items-center gap-2">
                    <span className="text-green-500 text-xs">●</span> healthy
                  </td>
                  <td className="px-4 py-3 text-rs-muted">~180ms</td>
                  <td className="px-4 py-3 text-rs-muted">balance, tx_receipt, status</td>
                </tr>
              </tbody>
            </table>
          </div>
          <div className="text-rs-dim text-xs mt-4">Static defaults — use /status for live checks</div>
        </div>
      </section>

      {/* SECTION 6: CLI & MCP EXAMPLES */}
      <section className="py-20 px-6 border-t border-rs-border bg-[rgba(17,17,17,0.88)]">
        <div className="max-w-7xl mx-auto">
          <div className="text-rs-dim text-xs tracking-[0.3em] uppercase mb-12">INTEGRATION</div>

          <div className="grid md:grid-cols-2 gap-8">
            <div>
              <div className="text-rs-dim text-xs tracking-wider mb-4">CLI</div>
              <div className="bg-rs-black border border-rs-border p-6 overflow-x-auto">
                <pre className="text-rs-muted text-sm font-mono leading-relaxed">
{`$ relaystride balance 0x742d...2bD18 --json

{
  "requestId": "req_01H...",
  "capability": "balance",
  "network": "robinhood-mainnet",
  "result": {
    "address": "0x742d...2bD18",
    "balance": "1423700000000000000",
    "formatted": "1.4237 ETH"
  },
  "provider": "robinhood-public-2",
  "latency": 234,
  "attempts": 2,
  "cost": { "total": 0, "confirmed": true }
}`}
                </pre>
              </div>
            </div>

            <div>
              <div className="text-rs-dim text-xs tracking-wider mb-4">MCP CONFIGURATION</div>
              <div className="bg-rs-black border border-rs-border p-6 overflow-x-auto">
                <pre className="text-rs-muted text-sm font-mono leading-relaxed">
{`{
  "mcpServers": {
    "relaystride": {
      "command": "npx",
      "args": ["relaystride", "mcp"],
      "env": {
        "NETWORK": "robinhood-mainnet"
      }
    }
  }
}`}
                </pre>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* SECTION 7: FOOTER */}
      <Footer />
    </div>
  );
}
