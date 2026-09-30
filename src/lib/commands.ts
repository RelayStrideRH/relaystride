import { PROVIDERS, NETWORKS, checkAllProviders, getBalance, getTransactionReceipt } from './providers';

export async function processCommand(command: string, args: string[]): Promise<string> {
  switch (command) {
    case 'help':
      return formatHelp();
    case 'providers':
      return formatProviders();
    case 'health':
      return await formatHealth();
    case 'balance':
      return await formatBalance(args[0]);
    case 'receipt':
      return await formatReceipt(args[0]);
    default:
      return `Unknown command: ${command}\nType "help" for available commands.`;
  }
}

function formatHelp(): string {
  return [
    'RELAYSTRIDE TERMINAL',
    '',
    'Available commands:',
    '  help                  Show this help message',
    '  clear                 Clear terminal output',
    '  providers             List configured providers',
    '  health                Check provider health',
    '  balance <address>     Get native ETH balance',
    '  receipt <txHash>      Get transaction receipt',
    '',
    'Network: Robinhood Chain Mainnet (4663)',
  ].join('\n');
}

function formatProviders(): string {
  const lines = [
    'CONFIGURED PROVIDERS',
    '',
  ];
  for (const p of PROVIDERS) {
    const network = NETWORKS[p.network];
    lines.push(`  ${p.name}`);
    lines.push(`    Network: ${network?.name || p.network} (${network?.chainId || '?'})`);
    lines.push(`    Capabilities: ${p.capabilities.join(', ')}`);
    lines.push(`    Cost: ${p.cost.perRequest === 0 ? 'Free (public RPC)' : `${p.cost.perRequest} ${p.cost.currency}/req`}`);
    lines.push(`    Timeout: ${p.timeoutMs}ms`);
    lines.push('');
  }
  return lines.join('\n');
}

async function formatHealth(): Promise<string> {
  const results = await checkAllProviders();
  const lines = [
    'PROVIDER HEALTH CHECK',
    '',
  ];
  
  // Simple table
  const nameWidth = 24;
  const statusWidth = 10;
  const latencyWidth = 9;
  
  lines.push(`  ${'Provider'.padEnd(nameWidth)} ${'Status'.padEnd(statusWidth)} ${'Latency'.padEnd(latencyWidth)}`);
  lines.push(`  ${'─'.repeat(nameWidth)} ${'─'.repeat(statusWidth)} ${'─'.repeat(latencyWidth)}`);
  
  for (const r of results) {
    const latency = r.latencyMs !== null ? `${r.latencyMs}ms` : 'N/A';
    lines.push(`  ${r.name.padEnd(nameWidth)} ${r.status.padEnd(statusWidth)} ${latency.padEnd(latencyWidth)}`);
  }
  
  lines.push('');
  lines.push(`  Checked at ${new Date().toLocaleTimeString()}`);
  
  return lines.join('\n');
}

async function formatBalance(address?: string): Promise<string> {
  if (!address) {
    return 'Usage: balance <address>\nExample: balance 0x742d35Cc6634C0532925a3b844Bc9e7595f2bD18';
  }
  
  const result = await getBalance(address);
  if ('error' in result) {
    return `Error: ${result.error}`;
  }
  
  return [
    'BALANCE',
    '',
    `  Address:  ${result.address}`,
    `  Balance:  ${result.formatted}`,
    `  Network:  ${NETWORKS[result.network]?.name || result.network}`,
    `  Provider: ${result.provider}`,
    `  Latency:  ${result.latencyMs}ms`,
  ].join('\n');
}

async function formatReceipt(txHash?: string): Promise<string> {
  if (!txHash) {
    return 'Usage: receipt <txHash>\nExample: receipt 0xabc123...';
  }
  
  const result = await getTransactionReceipt(txHash);
  if ('error' in result) {
    return `Error: ${(result as { error: string }).error}`;
  }
  
  return [
    'TRANSACTION RECEIPT',
    '',
    JSON.stringify(result, null, 2),
  ].join('\n');
}
