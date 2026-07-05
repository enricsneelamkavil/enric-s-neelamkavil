import { NextResponse } from 'next/server';
import { getSupabaseAdmin } from '@/lib/supabaseAdmin';

// x-forwarded-for can be a comma-separated chain of proxies — the client's
// real IP is always the first entry. x-real-ip is a single-value fallback.
function getClientIp(request: Request): string {
  const forwardedFor = request.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0].trim();
  }
  return request.headers.get('x-real-ip') || 'unknown';
}

export async function POST(request: Request) {
  try {
    const ip = getClientIp(request);

    // Atomic in Postgres: logs (ip, today) into visitor_logs, only bumps the
    // running total if that pair wasn't already there — see CLAUDE.md for the
    // full SQL (visitor_logs + visitor_counter tables, increment_visitor_unique RPC).
    const { data, error } = await getSupabaseAdmin().rpc('increment_visitor_unique', {
      p_ip: ip,
    });

    if (error) {
      console.error('Supabase RPC Error:', error);
      throw error;
    }

    return NextResponse.json({ count: data });
  } catch (error) {
    console.error('Failed to increment count:', error);
    return NextResponse.json({ error: 'Failed to increment count' }, { status: 500 });
  }
}
