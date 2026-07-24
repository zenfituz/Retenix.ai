import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

export async function GET() {
  const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8614316875:AAELbAmeGQiAa8SfrhW5pc6O-5UQMRPU_vw';
  const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://retenix-ai.vercel.app';
  const WEBHOOK_URL = `${APP_URL}/api/telegram/bot`;
  const MINI_APP_URL = `${APP_URL}/member`;

  try {
    const webhookRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setWebhook`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        url: WEBHOOK_URL,
        secret_token: process.env.TELEGRAM_WEBHOOK_SECRET || undefined,
      })
    });
    const webhookData = await webhookRes.json();

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

    const commandsRes = await fetch(`https://api.telegram.org/bot${BOT_TOKEN}/setMyCommands`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        commands: [
          { command: 'start', description: 'Start Bot & Link Account' },
          { command: 'app', description: 'Open Mini App' },
          { command: 'today', description: "Show today's workout" },
          { command: 'checkin', description: 'Turnstile QR Code Pass' },
          { command: 'streak', description: 'Show current streak' },
          { command: 'coach', description: 'Ask AI Coach' },
          { command: 'help', description: 'Show available commands' }
        ]
      })
    });
    const commandsData = await commandsRes.json();

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
