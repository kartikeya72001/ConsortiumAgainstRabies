import { createClient } from '@supabase/supabase-js';

function cleanEnv(val) {
  if (!val || typeof val !== 'string') return '';
  return val.trim().replace(/^["']|["']$/g, '').trim();
}

// Support standard NEXT_PUBLIC names, double-prefixed names, Vercel default SUPABASE_ names, or fallback from host
const rawUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_URL ||
  process.env.SUPABASE_URL || 
  process.env.NEXT_PUBLIC_STORAGE_URL || 
  process.env.STORAGE_URL ||
  (process.env.SUPABASE_POSTGRES_HOST ? `https://${cleanEnv(process.env.SUPABASE_POSTGRES_HOST).replace(/^db\./, '')}` : '');

const rawKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ||
  process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_PUBLISHABLE_KEY ||
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.STORAGE_SERVICE_ROLE_KEY ||
  process.env.NEXT_PUBLIC_STORAGE_ANON_KEY || 
  process.env.STORAGE_ANON_KEY;

export const supabaseUrl = cleanEnv(rawUrl);
export const supabaseAnonKey = cleanEnv(rawKey);

export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseUrl.startsWith('http') && 
  supabaseAnonKey && 
  supabaseAnonKey.length > 20
);

let supabaseClient = null;

if (isSupabaseConfigured) {
  try {
    supabaseClient = createClient(supabaseUrl, supabaseAnonKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });
  } catch (err) {
    console.error('Failed to create Supabase client:', err);
    supabaseClient = null;
  }
}

export const supabase = supabaseClient;

export function getSupabaseDiagnostics() {
  const envCheck = {
    NEXT_PUBLIC_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_SUPABASE_URL: Boolean(process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_URL),
    SUPABASE_URL: Boolean(process.env.SUPABASE_URL),
    NEXT_PUBLIC_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY),
    NEXT_PUBLIC_SUPABASE_SUPABASE_ANON_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_ANON_KEY),
    SUPABASE_ANON_KEY: Boolean(process.env.SUPABASE_ANON_KEY),
    NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY),
    NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY: Boolean(process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_PUBLISHABLE_KEY),
    SUPABASE_SERVICE_ROLE_KEY: Boolean(process.env.SUPABASE_SERVICE_ROLE_KEY),
  };

  const activeKeys = Object.entries(envCheck)
    .filter(([, v]) => v)
    .map(([k]) => k);

  return {
    isConfigured: isSupabaseConfigured,
    clientInitialized: Boolean(supabaseClient),
    resolvedUrl: supabaseUrl ? `${supabaseUrl.substring(0, 25)}...` : null,
    keyLength: supabaseAnonKey ? supabaseAnonKey.length : 0,
    activeKeys,
  };
}
