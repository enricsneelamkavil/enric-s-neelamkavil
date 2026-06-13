import { NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';

export async function POST() {
  try {
    // Call the RPC function to increment securely
    const { data, error } = await supabase.rpc('increment_visitor_count');

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
