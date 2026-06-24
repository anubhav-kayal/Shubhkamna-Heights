import { createClient, type SupabaseClient } from '@supabase/supabase-js';
import { isSupabaseConfigured, supabaseAnonKey, supabaseUrl } from './config';

const globalFetch = typeof globalThis !== 'undefined' ? globalThis.fetch : fetch;

export function getSupabaseServerClient(): SupabaseClient | null {
  if (!isSupabaseConfigured) {
    return null;
  }

  return createClient(supabaseUrl, supabaseAnonKey, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
    global: {
      fetch: (url, options) => {
        return globalFetch(url, {
          ...options,
          next: { revalidate: 60 },
        });
      },
    },
  });
}
