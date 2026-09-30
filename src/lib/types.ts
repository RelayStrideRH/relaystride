export type ProviderStatus = 'healthy' | 'degraded' | 'down' | 'unknown';

export interface NetworkConfig {
  chainId: number;
  name: string;
  shortName: string;
  rpcUrl: string;
  explorerUrl: string;
  nativeAsset: { name: string; symbol: string; decimals: number };
  isTestnet: boolean;
}

export interface ProviderConfig {
  name: string;
  url: string;
  network: string;
  capabilities: string[];
  priority: number;
  timeoutMs: number;
  cost: { perRequest: number; currency: string; confirmed: boolean };
}

export interface ProviderHealth {
  name: string;
  network: string;
  status: ProviderStatus;
  latencyMs: number | null;
  chainId: number | null;
  blockNumber: number | null;
  lastChecked: string;
  error?: string;
}

export interface TerminalOutput {
  type: 'input' | 'output' | 'error' | 'system';
  content: string;
  timestamp?: number;
}

export interface TerminalRequest {
  command: string;
  args: string[];
}

export interface TerminalResponse {
  output: string;
  error?: string;
}
