import { NextRequest, NextResponse } from 'next/server';
import { processCommand } from '@/lib/commands';

const ALLOWED_COMMANDS = ['help', 'providers', 'health', 'balance', 'receipt'];

// Simple in-memory rate limiter
const rateLimit = new Map<string, { count: number; resetAt: number }>();
const RATE_LIMIT_WINDOW = 60000; // 1 minute
const RATE_LIMIT_MAX = 60; // 60 requests per minute

function checkRateLimit(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimit.get(ip);
  if (!entry || now > entry.resetAt) {
    rateLimit.set(ip, { count: 1, resetAt: now + RATE_LIMIT_WINDOW });
    return true;
  }
  if (entry.count >= RATE_LIMIT_MAX) return false;
  entry.count++;
  return true;
}

export async function POST(request: NextRequest) {
  // Rate limiting
  const ip = request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown';
  if (!checkRateLimit(ip)) {
    return NextResponse.json({ error: 'Rate limit exceeded. Try again later.' }, { status: 429 });
  }

  try {
    const body = await request.json();
    const { command, args } = body as { command?: string; args?: string[] };

    if (!command || typeof command !== 'string') {
      return NextResponse.json({ error: 'Missing command parameter.' }, { status: 400 });
    }

    // Sanitize: only allow known commands
    const cleanCommand = command.trim().toLowerCase();
    if (!ALLOWED_COMMANDS.includes(cleanCommand)) {
      return NextResponse.json({
        output: `Unknown command: ${cleanCommand}\nType "help" for available commands.`,
      });
    }

    // Sanitize args
    const cleanArgs = (args || []).map((a: unknown) => String(a).trim().slice(0, 200));

    const output = await processCommand(cleanCommand, cleanArgs);
    return NextResponse.json({ output });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Command processing failed.' },
      { status: 500 }
    );
  }
}
