import { NextResponse } from 'next/server';
import { supabase, isSupabaseConfigured, getSupabaseDiagnostics } from '@/lib/supabase';

export const dynamic = 'force-dynamic';

export async function GET() {
  const diagnostics = getSupabaseDiagnostics();
  let queryResult = null;
  let queryError = null;

  if (isSupabaseConfigured && supabase) {
    try {
      const { data, count, error } = await supabase
        .from('members')
        .select('id, membership_id, name, state_code', { count: 'exact' })
        .limit(3);

      if (error) {
        queryError = {
          code: error.code,
          message: error.message,
          details: error.details,
          hint: error.hint,
        };
      } else {
        queryResult = {
          success: true,
          totalCount: count,
          sampleMembers: data,
        };
      }
    } catch (err) {
      queryError = {
        message: err.message,
        stack: err.stack,
      };
    }
  }

  return NextResponse.json({
    status: queryResult?.success ? 'connected' : 'disconnected',
    timestamp: new Date().toISOString(),
    isConfigured: isSupabaseConfigured,
    diagnostics,
    queryResult,
    queryError,
    troubleshooting: !queryResult?.success ? [
      'Check that NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY are set in Vercel Project Settings -> Environment Variables.',
      'Ensure the variables are assigned to the Production environment in Vercel.',
      'After updating environment variables in Vercel, you must trigger a Redeploy (Deployments -> ... -> Redeploy) for changes to take effect.'
    ] : null,
  });
}
