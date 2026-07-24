import { NextResponse } from 'next/server';
import crypto from 'crypto';
import { createClient } from '@supabase/supabase-js';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8614316875:AAELbAmeGQiAa8SfrhW5pc6O-5UQMRPU_vw';

const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

// Simple rate limit in-memory store
const rateLimitMap = new Map<string, { count: number; timestamp: number }>();

export async function POST(req: Request) {
  try {
    const ip = req.headers.get('x-forwarded-for') || 'unknown';
    const now = Date.now();
    
    // Clean up old entries
    if (rateLimitMap.has(ip)) {
      const entry = rateLimitMap.get(ip)!;
      if (now - entry.timestamp > 60000) {
        rateLimitMap.set(ip, { count: 1, timestamp: now });
      } else {
        if (entry.count >= 20) {
          return NextResponse.json({ error: 'Too many requests' }, { status: 429 });
        }
        entry.count++;
      }
    } else {
      rateLimitMap.set(ip, { count: 1, timestamp: now });
    }

    const body = await req.json().catch(() => ({}));
    const initData = req.headers.get('x-telegram-init-data') || body.initData;

    if (!initData) {
      return NextResponse.json({ error: 'Missing initData' }, { status: 400 });
    }

    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    
    if (!hash) {
      return NextResponse.json({ error: 'Invalid initData format' }, { status: 400 });
    }
    
    urlParams.delete('hash');
    const authDate = urlParams.get('auth_date');
    if (!authDate || (now / 1000 - parseInt(authDate)) > 300) {
      return NextResponse.json({ error: 'Data is outdated' }, { status: 401 });
    }

    const keys = Array.from(urlParams.keys()).sort();
    const dataCheckString = keys.map(k => `${k}=${urlParams.get(k)}`).join('\n');

    const secretKey = crypto.createHmac('sha256', 'WebAppData').update(BOT_TOKEN).digest();
    const computedHash = crypto.createHmac('sha256', secretKey).update(dataCheckString).digest('hex');

    if (computedHash !== hash) {
      return NextResponse.json({ error: 'Invalid hash' }, { status: 401 });
    }

    const userStr = urlParams.get('user');
    let user = null;
    if (userStr) {
      user = JSON.parse(userStr);
    }

    if (!user) {
      return NextResponse.json({ error: 'User data missing' }, { status: 400 });
    }

    // Check if user is linked
    const supabaseAdmin = getSupabaseAdmin();
    const { data: member } = await supabaseAdmin
      .from('members')
      .select('*')
      .eq('telegram_user_id', user.id.toString())
      .single();

    return NextResponse.json({ 
      success: true, 
      user: user,
      member: member || null,
      is_linked: !!member
    });
  } catch (error) {
    console.error('Telegram Auth Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
