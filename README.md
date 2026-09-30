# RELAYSTRIDE_

Reliable service router for AI agents on Robinhood Chain.

One request. A reliable route.

---

## What it does

RelayStride helps agents obtain usable data from multiple providers through one interface. It selects a compatible provider, validates the returned data, and switches providers when a request fails.

**Live capabilities** — all read-only, no keys required:

| Capability | Method | Status |
|:---|:---|:---|
| Network status | `eth_chainId` + `eth_blockNumber` | ✅ Live |
| Native ETH balance | `eth_getBalance` | ✅ Live |
| Transaction receipt | `eth_getTransactionReceipt` | ✅ Live |
| Token metadata | ERC-20 `name`, `symbol`, `decimals` | ✅ Live |
| Token balance | ERC-20 `balanceOf` | ✅ Live |
| Provider failover | Sequential fallback | ✅ Live |
| Response validation | Chain ID + format checks | ✅ Live |
| Browser terminal | Constrained command set | ✅ Live |
| Terminal demo | Simulated failover animation | Demo |
| Paid API routing | — | 🔲 Planned |

## Robinhood Chain

| | Mainnet | Testnet |
|:---|:---|:---|
| **Chain ID** | `4663` | `46630` |
| **RPC** | `https://rpc.mainnet.chain.robinhood.com` | `https://rpc.testnet.chain.robinhood.com` |
| **Explorer** | [robinhoodchain.blockscout.com](https://robinhoodchain.blockscout.com) | [explorer.testnet.chain.robinhood.com](https://explorer.testnet.chain.robinhood.com) |
| **Type** | Arbitrum Orbit L2 | Arbitrum Orbit L2 |
| **Native asset** | ETH | ETH |

Public RPCs are rate-limited. For production use, configure a provider like Alchemy, QuickNode, or Goldsky.

## Setup

```bash
git clone https://github.com/RelayStrideRH/relaystride.git
cd relaystride
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

No environment variables required — the app uses Robinhood Chain's public RPCs by default.

## Routes

| Route | Description |
|:---|:---|
| `/` | Landing page — hero, terminal demo, capabilities, health table, examples |
| `/terminal` | Interactive browser terminal with live RPC calls |
| `/docs` | CLI reference, provider configuration, MCP integration |
| `/status` | Live provider health dashboard |

## Project structure

```
src/
├── app/
│   ├── layout.tsx              # Root layout, JetBrains Mono font
│   ├── page.tsx                # Landing page (7 sections)
│   ├── globals.css             # Dark theme, halftone shader styles
│   ├── terminal/page.tsx       # Browser terminal
│   ├── docs/page.tsx           # Documentation
│   ├── status/page.tsx         # Provider health dashboard
│   └── api/
│       ├── health/route.ts     # GET — provider health JSON
│       └── terminal/route.ts   # POST — command execution (rate-limited)
├── components/
│   ├── Navigation.tsx          # Sticky header with numbered nav
│   ├── Footer.tsx              # Minimal footer
│   ├── TerminalPreview.tsx     # Animated failover demo
│   ├── BrowserTerminal.tsx     # Interactive terminal
│   ├── InstallBlock.tsx        # Copyable install command
│   └── HalftoneBackground.tsx  # WebGL halftone shader background
└── lib/
    ├── types.ts                # TypeScript type definitions
    ├── providers.ts            # RPC calls, health checks, balance, receipt
    └── commands.ts             # Terminal command processor
```

## Browser terminal commands

```
help                  Show available commands
clear                 Clear terminal output
providers             List configured providers
health                Check provider health
balance <address>     Get native ETH balance
receipt <txHash>      Get transaction receipt
```

## Design

- **Font**: JetBrains Mono — monospace throughout
- **Palette**: Near-black `#0a0a0a`, charcoal `#111111`, muted grey `#888888`
- **Borders**: 1px `#2a2a2a`, square corners, no rounded elements
- **Background**: WebGL halftone shader — 34-cell FBM-driven dot lattice with pointer interaction
- **Terminal demo**: Animated provider timeout → fallback → success, labeled `[DEMO]`

## Tech stack

- [Next.js 15](https://nextjs.org) with App Router
- [Tailwind CSS](https://tailwindcss.com)
- TypeScript (strict mode)
- WebGL fragment shader (no dependencies)

## Limitations

- **Public RPCs only** — aggressively rate-limited, no archive data
- **No paid routing** — cost tracking infrastructure exists but no payment integration
- **Not published** — no npm package, no deployment
- **No private keys** — read-only MVP, never requests seed phrases or credentials

## License

MIT
