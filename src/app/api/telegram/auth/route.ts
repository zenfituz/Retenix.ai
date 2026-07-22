import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const { initData } = body;

    if (!initData) {
      return NextResponse.json({ error: 'Missing initData' }, { status: 400 });
    }

    // MOCK: Telegram Web App InitData HMAC validation
    // The real implementation would be:
    // 1. Parse initData into key-value pairs
    // 2. Sort by keys alphabetically
    // 3. Create a data check string (e.g., "auth_date=...&query_id=...&user=...")
    // 4. Compute secret_key = HMAC_SHA256(bot_token, "WebAppData")
    // 5. Compute hash = HMAC_SHA256(secret_key, data_check_string)
    // 6. Compare computed hash with the hash provided in initData

    const urlParams = new URLSearchParams(initData);
    const hash = urlParams.get('hash');
    const userStr = urlParams.get('user');

    if (!hash || !userStr) {
      return NextResponse.json({ error: 'Invalid initData format' }, { status: 400 });
    }

    const user = JSON.parse(decodeURIComponent(userStr));

    // MOCK Validation Check (Always passes for now)
    const isValid = true; 

    if (!isValid) {
      return NextResponse.json({ error: 'Invalid hash' }, { status: 401 });
    }

    // Assuming user is authenticated, we might create a JWT or session here
    
    return NextResponse.json({ 
      success: true, 
      user: user,
      message: 'Authentication successful' 
    });
  } catch (error) {
    console.error('Telegram Auth Error:', error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
