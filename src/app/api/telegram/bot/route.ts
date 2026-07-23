import { NextResponse } from 'next/server';

export const dynamic = 'force-dynamic';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8614316875:AAELbAmeGQiAa8SfrhW5pc6O-5UQMRPU_vw';
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://retenix-ai.vercel.app';

async function sendTelegramMessage(chatId: number, text: string, replyMarkup?: any) {
  try {
    await fetch(`${TELEGRAM_API}/sendMessage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        chat_id: chatId,
        text: text,
        parse_mode: 'HTML',
        reply_markup: replyMarkup
      })
    });
  } catch (err) {
    console.error("Telegram API SendMessage Error:", err);
  }
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message) {
      return NextResponse.json({ ok: true, note: "No message payload" });
    }

    const chatId = message.chat?.id;
    const text = message.text || '';
    const firstName = message.from?.first_name || 'A\'zo';

    if (!chatId) {
      return NextResponse.json({ ok: true, note: "No chat_id" });
    }

    if (text.startsWith('/start')) {
      const replyText = `Salom <b>${firstName}</b>! 👋\n\nRetenix.ai — fitness zal a'zolari uchun rasmiy Telegram Bot & Mini App platformasiga xush kelibsiz!\n\nRaqamli a'zolik kartangiz, turniket QR pass, mashqlar rejasi va 24/7 AI treneringiz bir joyda.`;
      const replyMarkup = {
        inline_keyboard: [
          [
            {
              text: "📱 Retenix Mini App-ni Ochish",
              web_app: { url: `${APP_URL}/member` }
            }
          ],
          [
            {
              text: "📍 Turniket QR Pass",
              web_app: { url: `${APP_URL}/member` }
            },
            {
              text: "🤖 AI Trener",
              web_app: { url: `${APP_URL}/member/ai` }
            }
          ]
        ]
      };
      await sendTelegramMessage(chatId, replyText, replyMarkup);
    } else if (text.startsWith('/checkin')) {
      const replyText = `📍 <b>Turniket Check-in Pass</b>\n\nFitZone Yunusobod turniketi uchun QR kodingiz tayyor. Telegram Mini App orqali skanerlang.`;
      const replyMarkup = {
        inline_keyboard: [
          [
            {
              text: "📍 QR Kodni Ko'rsatish",
              web_app: { url: `${APP_URL}/member` }
            }
          ]
        ]
      };
      await sendTelegramMessage(chatId, replyText, replyMarkup);
    } else if (text.startsWith('/plan')) {
      const replyText = `💪 <b>Bugungi Mashq Rejangiz</b>:\n\n• Flat Barbell Bench Press: 4 set × 10 rep\n• Incline Dumbbell Press: 3 set × 12 rep\n• Cable Crossover: 3 set × 15 rep\n• Triceps Pushdown: 4 set × 12 rep\n\nO'zgarish kiritish va AI bilan muloqot uchun Mini App-ni oching.`;
      const replyMarkup = {
        inline_keyboard: [
          [
            {
              text: "💪 Planni Boshqarish",
              web_app: { url: `${APP_URL}/member/plan` }
            }
          ]
        ]
      };
      await sendTelegramMessage(chatId, replyText, replyMarkup);
    } else {
      const replyText = `🤖 <b>Retenix AI Trener Javobi:</b>\n\n"${text}" savolingiz qabul qilindi. 24/7 AI Trener bilan chuqurroq muloqot va oziq-ovqat trekkeri uchun Telegram Mini App-ni oching.`;
      const replyMarkup = {
        inline_keyboard: [
          [
            {
              text: "🤖 AI Trener Bilan Chat",
              web_app: { url: `${APP_URL}/member/ai` }
            }
          ]
        ]
      };
      await sendTelegramMessage(chatId, replyText, replyMarkup);
    }

    return NextResponse.json({ ok: true });
  } catch (error) {
    console.error('Telegram Bot Webhook Error:', error);
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET(req: Request) {
  try {
    const webhookUrl = `${APP_URL}/api/telegram/bot`;
    const res = await fetch(`${TELEGRAM_API}/setWebhook?url=${webhookUrl}`);
    const data = await res.json();
    return NextResponse.json({
      ok: true,
      bot_token_configured: true,
      webhook_url: webhookUrl,
      telegram_response: data,
      mini_app_url: `${APP_URL}/member`,
      commands: ["/start", "/checkin", "/plan", "/ai"]
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}
