import { NetworkConfig, ProviderConfig, ProviderHealth } from './types';

export const NETWORKS: Record<string, NetworkConfig> = {
  'robinhood-mainnet': {
    chainId: 4663,
    name: 'Robinhood Chain Mainnet',
    shortName: 'Mainnet',
    rpcUrl: 'https://rpc.mainnet.chain.robinhood.com',
    explorerUrl: 'https://robinhoodchain.blockscout.com',
    nativeAsset: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    isTestnet: false,
  },
  'robinhood-testnet': {
    chainId: 46630,
    name: 'Robinhood Chain Testnet',
    shortName: 'Testnet',
    rpcUrl: 'https://rpc.testnet.chain.robinhood.com',
    explorerUrl: 'https://explorer.testnet.chain.robinhood.com',
    nativeAsset: { name: 'Ether', symbol: 'ETH', decimals: 18 },
    isTestnet: true,
  },
};

export const PROVIDERS: ProviderConfig[] = [
  {
    name: 'robinhood-public-1',
    url: 'https://rpc.mainnet.chain.robinhood.com',
    network: 'robinhood-mainnet',
    capabilities: ['balance', 'tx_receipt', 'network_status', 'token_metadata', 'token_balance'],
    priority: 1,
    timeoutMs: 5000,
    cost: { perRequest: 0, currency: 'none', confirmed: true },
  },
  {
    name: 'robinhood-public-2',
    url: 'https://rpc.mainnet.chain.robinhood.com',
    network: 'robinhood-mainnet',
    capabilities: ['balance', 'tx_receipt', 'network_status', 'token_metadata', 'token_balance'],
    priority: 2,
    timeoutMs: 5000,
    cost: { perRequest: 0, currency: 'none', confirmed: true },
  },
  {
    name: 'robinhood-testnet-1',
    url: 'https://rpc.testnet.chain.robinhood.com',
    network: 'robinhood-testnet',
    capabilities: ['balance', 'tx_receipt', 'network_status', 'token_metadata', 'token_balance'],
    priority: 1,
    timeoutMs: 5000,
    cost: { perRequest: 0, currency: 'none', confirmed: true },
  },
];

// JSON-RPC helper
async function rpcCall(url: string, method: string, params: unknown[] = [], timeoutMs: number = 5000): Promise<{ result?: unknown; error?: { code: number; message: string } }> {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    const response = await fetch(url, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ jsonrpc: '2.0', id: Date.now(), method, params }),
      signal: controller.signal,
    });
    const data = await response.json();
    return data;
  } catch (err: unknown) {
    const message = err instanceof Error ? err.message : 'Unknown error';
    return { error: { code: -1, message: message.includes('abort') ? 'Request timeout' : message } };
  } finally {
    clearTimeout(timeout);
  }
}

// Check health of a single provider
export async function checkProviderHealth(provider: ProviderConfig): Promise<ProviderHealth> {
  const start = Date.now();
  try {
    const chainIdResult = await rpcCall(provider.url, 'eth_chainId', [], provider.timeoutMs);
    const blockResult = await rpcCall(provider.url, 'eth_blockNumber', [], provider.timeoutMs);
    const latency = Date.now() - start;
    
    if (chainIdResult.error) {
      return {
        name: provider.name,
        network: provider.network,
        status: 'down',
        latencyMs: latency,
        chainId: null,
        blockNumber: null,
        lastChecked: new Date().toISOString(),
        error: chainIdResult.error.message,
      };
    }

    const chainId = parseInt(chainIdResult.result as string, 16);
    const blockNumber = blockResult.result ? parseInt(blockResult.result as string, 16) : null;
    const network = Object.values(NETWORKS).find(n => n.chainId === chainId);
    const expectedNetwork = NETWORKS[provider.network];
    
    // Verify chain ID matches
    const chainMismatch = expectedNetwork && chainId !== expectedNetwork.chainId;

    return {
      name: provider.name,
      network: provider.network,
      status: chainMismatch ? 'degraded' : 'healthy',
      latencyMs: latency,
      chainId,
      blockNumber,
      lastChecked: new Date().toISOString(),
      error: chainMismatch ? `Chain ID mismatch: expected ${expectedNetwork.chainId}, got ${chainId}` : undefined,
    };
  } catch (err: unknown) {
    return {
      name: provider.name,
      network: provider.network,
      status: 'down',
      latencyMs: Date.now() - start,
      chainId: null,
      blockNumber: null,
      lastChecked: new Date().toISOString(),
      error: err instanceof Error ? err.message : 'Unknown error',
    };
  }
}

// Check all providers
export async function checkAllProviders(): Promise<ProviderHealth[]> {
  return Promise.all(PROVIDERS.map(checkProviderHealth));
}

// Get balance for an address
export async function getBalance(address: string, networkKey: string = 'robinhood-mainnet'): Promise<{ balance: string; formatted: string; address: string; network: string; provider: string; latencyMs: number } | { error: string }> {
  // Validate address format
  if (!/^0x[0-9a-fA-F]{40}$/.test(address)) {
    return { error: 'Invalid address format. Expected 0x followed by 40 hex characters.' };
  }

  const networkProviders = PROVIDERS.filter(p => p.network === networkKey && p.capabilities.includes('balance'));
  if (networkProviders.length === 0) {
    return { error: `No providers available for network: ${networkKey}` };
  }

  // Try providers in priority order
  for (const provider of networkProviders.sort((a, b) => a.priority - b.priority)) {
    const start = Date.now();
    const result = await rpcCall(provider.url, 'eth_getBalance', [address, 'latest'], provider.timeoutMs);
    const latency = Date.now() - start;

    if (!result.error && result.result) {
      const balanceWei = BigInt(result.result as string);
      const balanceEth = Number(balanceWei) / 1e18;
      return {
        balance: balanceWei.toString(),
        formatted: `${balanceEth.toFixed(4)} ETH`,
        address,
        network: networkKey,
        provider: provider.name,
        latencyMs: latency,
      };
    }
  }

  return { error: 'All providers failed to respond.' };
}

// Get transaction receipt
export async function getTransactionReceipt(txHash: string, networkKey: string = 'robinhood-mainnet'): Promise<Record<string, unknown> | { error: string }> {
  if (!/^0x[0-9a-fA-F]{64}$/.test(txHash)) {
    return { error: 'Invalid transaction hash. Expected 0x followed by 64 hex characters.' };
  }

  const networkProviders = PROVIDERS.filter(p => p.network === networkKey && p.capabilities.includes('tx_receipt'));
  if (networkProviders.length === 0) {
    return { error: `No providers available for network: ${networkKey}` };
  }

  for (const provider of networkProviders.sort((a, b) => a.priority - b.priority)) {
    const result = await rpcCall(provider.url, 'eth_getTransactionReceipt', [txHash], provider.timeoutMs);
    if (!result.error && result.result) {
      return result.result as Record<string, unknown>;
    }
  }

  return { error: 'Transaction not found or all providers failed.' };
}
