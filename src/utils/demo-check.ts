import { createClient } from "@/utils/supabase/client";

export const DEMO_EMAILS = [
  "owner@fitzone.uz",
  "trainer@fitzone.uz",
  "member@fitzone.uz",
  "admin@retenix.ai",
];

export function isDemoEmail(email?: string | null): boolean {
  if (!email) return false;
  return DEMO_EMAILS.includes(email.toLowerCase().trim());
}

export async function getCurrentUserSession() {
  try {
    const supabase = createClient();
    const { data: { user } } = await supabase.auth.getUser();
    return {
      user,
      email: user?.email || null,
      isDemo: isDemoEmail(user?.email),
    };
  } catch (error) {
    return { user: null, email: null, isDemo: false };
  }
}
