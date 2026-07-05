import { createClient, type SupabaseClient } from '@supabase/supabase-js'

// Server-only — uses the service role key, which bypasses RLS entirely.
// Never import this from a Client Component or anything bundled to the browser.
// Only for API routes / server code that genuinely needs elevated write access
// (e.g. the visitor_logs / visitor_counter tables, which deny all anon/authenticated access).

let client: SupabaseClient | null = null

// Lazy singleton — constructed on first actual use, not at module load. Next.js
// imports every route module during build-time page-data collection regardless
// of how dynamic the route is, so eagerly calling createClient() here would
// crash `npm run build` whenever SUPABASE_SERVICE_ROLE_KEY isn't set locally.
// Deferring the throw to actual request time is the correct failure point.
export function getSupabaseAdmin(): SupabaseClient {
  if (!client) {
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || ''
    const supabaseServiceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY || ''
    client = createClient(supabaseUrl, supabaseServiceRoleKey, {
      auth: {
        autoRefreshToken: false,
        persistSession: false,
      },
    })
  }
  return client
}
