import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8614316875:AAELbAmeGQiAa8SfrhW5pc6O-5UQMRPU_vw';
  const WEBHOOK_URL = 'https://retenix-ai.vercel.app/api/telegram/bot';
  const MINI_APP_URL = 'https://retenix-ai.vercel.app/member';

  try {
    // 1. Set Webhook
    const webhookRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook?url=${WEBHOOK_URL}`);
    const webhookData = await webhookRes.json();

    // 2. Set Bot Menu Button (Web App)
    const menuRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setChatMenuButton`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        menu_button: {
          type: 'web_app',
          text: '📱 Open App',
          web_app: { url: MINI_APP_URL }
        }
      })
    });
    const menuData = await menuRes.json();

    // 3. Set Bot Commands
    const commandsRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commands: [
          { command: 'start', description: 'Start Bot & Open Retenix Mini App' },
          { command: 'checkin', description: 'Turnstile QR Code Pass' },
          { command: 'plan', description: 'Daily Workout Plan' },
          { command: 'ai', description: '24/7 AI Coach Chat' }
        ]
      })
    });
    const commandsData = await commandsRes.json();

    // 4. Get Webhook Info
    const infoRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/getWebhookInfo`);
    const infoData = await infoRes.json();

    return NextResponse.json({
      status: "Telegram Ecosystem Full Live Setup Completed!",
      setWebhook: webhookData,
      setChatMenuButton: menuData,
      setMyCommands: commandsData,
      webhook_info: infoData
    });
  } catch (err: any) {
    return NextResponse.json({ status: "error", error: err.message }, { status: 500 });
  }
}
