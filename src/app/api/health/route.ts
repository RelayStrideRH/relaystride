import { NextResponse } from 'next/server';
import { checkAllProviders } from '@/lib/providers';

export const dynamic = 'force-dynamic';

export async function GET() {
  try {
    const results = await checkAllProviders();
    return NextResponse.json({ providers: results, timestamp: new Date().toISOString() });
  } catch (err: unknown) {
    return NextResponse.json(
      { error: err instanceof Error ? err.message : 'Health check failed' },
      { status: 500 }
    );
  }
}
