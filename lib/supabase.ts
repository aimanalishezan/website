import { createClient } from '@supabase/supabase-js';

const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

// The site is designed to work out of the box with bundled demo data even
// before Supabase env vars are configured, so `supabase` may be null.
export const supabase =
  url && anonKey ? createClient(url, anonKey, { auth: { persistSession: false } }) : null;

export const isSupabaseConfigured = Boolean(supabase);
