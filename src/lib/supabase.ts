import { createClient } from "@supabase/supabase-js";

/**
 * Browser Supabase client for the static site (Path B).
 *
 * Uses public env vars only — the anon key is safe to ship to the browser
 * because Row-Level-Security policies (see supabase/migrations) restrict what
 * it can do: inquiries can be INSERTed but never read back by anon.
 *
 * Guarded so the app still builds/runs locally before keys are configured;
 * `isSupabaseConfigured` lets the UI degrade gracefully to call/WhatsApp.
 */
const url = process.env.NEXT_PUBLIC_SUPABASE_URL;
const anonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

export const isSupabaseConfigured = Boolean(url && anonKey);

export const supabase = isSupabaseConfigured
  ? createClient(url as string, anonKey as string, {
      auth: {
        persistSession: true,
        autoRefreshToken: true,
        detectSessionInUrl: false,
      },
    })
  : null;
