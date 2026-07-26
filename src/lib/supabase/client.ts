import { createBrowserClient } from '@supabase/ssr'

export function createClient() {
  return createBrowserClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || 'https://oecatazwrfsaanvhklat.supabase.co',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im9lY2F0YXp3cmZzYWFudmhrbGF0Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3Njg5ODE2OTAsImV4cCI6MjA4NDU1NzY5MH0.placeholder'
  )
}
