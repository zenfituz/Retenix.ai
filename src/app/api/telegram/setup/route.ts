import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8614316875:AAELbAmeGQiAa8SfrhW5pc6O-5UQMRPU_vw';
  const WEBHOOK_URL = 'https://retenix-ai.vercel.app/api/telegram/bot';

  try {
    const telegramRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}`);
    const data = await telegramRes.json();

    const infoRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
    const infoData = await infoRes.json();

    return NextResponse.json({
      status: "Telegram setWebhook executed via Cloud Server",
      setWebhook_response: data,
      webhook_info: infoData
    });
  } catch (err: any) {
    return NextResponse.json({ status: "error", error: err.message }, { status: 500 });
  }
}
