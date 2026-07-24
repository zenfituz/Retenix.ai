import { createClient } from '@supabase/supabase-js'

/**
 * Creates a Supabase admin client with service-role key.
 * 
 * SECURITY: This client bypasses RLS. Use ONLY in server-side API routes.
 * NEVER import this in client components or expose the service-role key.
 * 
 * For cookie-based auth (server components/actions), use @/utils/supabase/server instead.
 * This admin client is for API routes where no user cookies are available
 * (e.g., Telegram webhook handlers).
 */
export function createAdminClient() {
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
  const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY

  if (!supabaseUrl || !serviceRoleKey) {
    throw new Error(
      'Missing NEXT_PUBLIC_SUPABASE_URL or SUPABASE_SERVICE_ROLE_KEY. ' +
      'These are required for admin/service operations.'
    )
  }

  return createClient(supabaseUrl, serviceRoleKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  })
}
