import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

export async function POST(req: Request) {
  try {
    const { token, telegram_user_id, telegram_username, telegram_first_name, telegram_last_name } = await req.json();

    if (!token || !telegram_user_id) {
      return NextResponse.json({ error: 'Missing parameters' }, { status: 400 });
    }

    const tokenHash = crypto.createHash('sha256').update(token).digest('hex');
    const supabaseAdmin = getSupabaseAdmin();

    // Look up token
    const { data: linkToken } = await supabaseAdmin
      .from('telegram_link_tokens')
      .select('*')
      .eq('token_hash', tokenHash)
      .is('used_at', null)
      .gt('expires_at', new Date().toISOString())
      .single();

    if (!linkToken) {
      // Return generic error
      return NextResponse.json({ success: false, error: 'Invalid or expired token' }, { status: 400 });
    }

    // Update member
    await supabaseAdmin
      .from('members')
      .update({
        telegram_user_id: telegram_user_id.toString(),
        telegram_username,
        telegram_first_name,
        telegram_last_name
      })
      .eq('id', linkToken.member_id);

    // Mark token as used
    await supabaseAdmin
      .from('telegram_link_tokens')
      .update({ used_at: new Date().toISOString() })
      .eq('id', linkToken.id);
      
    // Create webhook event entry for idempotency if applicable? Not really needed here, just returning success
    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Telegram Link Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
