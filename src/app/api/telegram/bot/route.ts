import { NextResponse } from 'next/server';

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const message = body?.message;

    if (!message) {
      return NextResponse.json({ ok: true, note: "No message to process" });
    }

    const chatId = message.chat?.id;
    const text = message.text || '';
    const firstName = message.from?.first_name || 'A\'zo';

    let replyText = '';
    let replyMarkup: any = null;

    if (text.startsWith('/start')) {
      replyText = `Salom ${firstName}! 👋\n\nRetenix.ai — fitness zal a'zolari uchun rasmiy Telegram Bot & Mini App platformasiga xush kelibsiz!\n\nRaqamli a'zolik kartangiz, turniket QR pass, mashqlar rejasi va 24/7 AI treneringiz bir joyda.`;
      replyMarkup = {
        inline_keyboard: [
          [
            {
              text: "📱 Retenix Mini App-ni Ochish",
              web_app: { url: "https://retenix-ai.vercel.app/member" }
            }
          ],
          [
            { text: "📊 Mashq Rejasi", callback_data: "plan" },
            { text: "📍 Turniket Pass", callback_data: "checkin" }
          ]
        ]
      };
    } else if (text.startsWith('/checkin')) {
      replyText = `📍 Turniket Check-in Pass\n\nFitZone Yunusobod turniketi uchun QR kodingiz tayyor. Telegram Mini App orqali skanerlang.`;
      replyMarkup = {
        inline_keyboard: [
          [
            {
              text: "📍 QR Kodni Ko'rsatish",
              web_app: { url: "https://retenix-ai.vercel.app/member" }
            }
          ]
        ]
      };
    } else if (text.startsWith('/plan')) {
      replyText = `💪 Bugungi Mashq Rejangiz:\n\n• Flat Barbell Bench Press: 4 set × 10 rep\n• Incline Dumbbell Press: 3 set × 12 rep\n• Cable Crossover: 3 set × 15 rep\n• Triceps Pushdown: 4 set × 12 rep\n\nO'zgarish kiritish va AI bilan muloqot uchun Mini App-ni oching.`;
      replyMarkup = {
        inline_keyboard: [
          [
            {
              text: "💪 Planni Boshqarish",
              web_app: { url: "https://retenix-ai.vercel.app/member/plan" }
            }
          ]
        ]
      };
    } else {
      replyText = `🤖 AI Trener Javobi:\n\n"${text}" savolingiz qabul qilindi. 24/7 AI Trener bilan chuqurroq muloqot va oziq-ovqat trekkeri uchun Telegram Mini App-ni oching.`;
      replyMarkup = {
        inline_keyboard: [
          [
            {
              text: "🤖 AI Trener Bilan Chat",
              web_app: { url: "https://retenix-ai.vercel.app/member/ai" }
            }
          ]
        ]
      };
    }

    return NextResponse.json({
      ok: true,
      chat_id: chatId,
      text: replyText,
      reply_markup: replyMarkup
    });
  } catch (error) {
    console.error('Telegram Bot Webhook Error:', error);
    return NextResponse.json({ ok: false, error: 'Internal Server Error' }, { status: 500 });
  }
}

export async function GET() {
  return NextResponse.json({
    name: "Retenix Telegram Bot Webhook API",
    status: "active",
    bot: "@RetenixAiBot",
    mini_app_url: "https://retenix-ai.vercel.app/member",
    commands: ["/start", "/checkin", "/plan", "/ai", "/help"]
  });
}
