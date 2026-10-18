import { createClient } from '@supabase/supabase-js';

// Support standard NEXT_PUBLIC names, double-prefixed names, Vercel default SUPABASE_ names, or custom prefix names
const supabaseUrl = 
  process.env.NEXT_PUBLIC_SUPABASE_URL || 
  process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_URL ||
  process.env.SUPABASE_URL || 
  process.env.NEXT_PUBLIC_STORAGE_URL || 
  process.env.STORAGE_URL;

const supabaseAnonKey = 
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_SUPABASE_SUPABASE_ANON_KEY ||
  process.env.SUPABASE_ANON_KEY || 
  process.env.NEXT_PUBLIC_STORAGE_ANON_KEY || 
  process.env.STORAGE_ANON_KEY || 
  process.env.SUPABASE_SERVICE_ROLE_KEY ||
  process.env.STORAGE_SERVICE_ROLE_KEY;

export const isSupabaseConfigured = Boolean(supabaseUrl && supabaseAnonKey);

export const supabase = isSupabaseConfigured
  ? createClient(supabaseUrl, supabaseAnonKey)
  : null;

