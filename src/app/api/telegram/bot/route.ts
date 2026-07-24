import { NextResponse } from 'next/server';
import { createClient } from '@supabase/supabase-js';

export const dynamic = 'force-dynamic';

const BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || '8614316875:AAELbAmeGQiAa8SfrhW5pc6O-5UQMRPU_vw';
const TELEGRAM_API = `https://api.telegram.org/bot${BOT_TOKEN}`;
const APP_URL = process.env.NEXT_PUBLIC_APP_URL || 'https://retenix-ai.vercel.app';
const WEBHOOK_SECRET = process.env.TELEGRAM_WEBHOOK_SECRET;

const getSupabaseAdmin = () => createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',
  process.env.SUPABASE_SERVICE_ROLE_KEY || '',
  { auth: { autoRefreshToken: false, persistSession: false } }
);

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
    if (WEBHOOK_SECRET) {
      const secretToken = req.headers.get('x-telegram-bot-api-secret-token');
      if (secretToken !== WEBHOOK_SECRET) {
        return NextResponse.json({ error: 'Unauthorized' }, { status: 401 });
      }
    }

    const body = await req.json();
    const updateId = body.update_id;
    const message = body?.message;

    if (!updateId) {
      return NextResponse.json({ ok: true, note: "No update_id" });
    }

    const supabaseAdmin = getSupabaseAdmin();

    // Idempotency check
    const { data: existingEvent } = await supabaseAdmin
      .from('telegram_webhook_events')
      .select('id')
      .eq('update_id', updateId)
      .single();

    if (existingEvent) {
      return NextResponse.json({ ok: true });
    }

    await supabaseAdmin.from('telegram_webhook_events').insert({ update_id: updateId });

    if (!message) {
      return NextResponse.json({ ok: true });
    }

    const chatId = message.chat?.id;
    const text = message.text || '';
    const telegramUserId = message.from?.id;

    if (!chatId || !telegramUserId) {
      return NextResponse.json({ ok: true });
    }

    // Lookup user by telegram_user_id in members table
    const { data: member } = await supabaseAdmin
      .from('members')
      .select('id, full_name, telegram_first_name, current_streak, xp, gym_rank, today_workout, status, gym_id')
      .eq('telegram_user_id', telegramUserId.toString())
      .neq('status', 'inactive')
      .single();

    if (text.startsWith('/start')) {
      // Check deep link
      const parts = text.split(' ');
      if (parts.length > 1 && parts[1].startsWith('link_')) {
        const token = parts[1].substring(5);
        const { createHash } = await import('crypto');
        const tokenHash = createHash('sha256').update(token).digest('hex');
        
        const { data: linkToken } = await supabaseAdmin
          .from('telegram_link_tokens')
          .select('*')
          .eq('token_hash', tokenHash)
          .is('used_at', null)
          .gt('expires_at', new Date().toISOString())
          .single();

        if (linkToken) {
          await supabaseAdmin.from('members').update({
            telegram_user_id: telegramUserId.toString(),
            telegram_username: message.from?.username,
            telegram_first_name: message.from?.first_name,
            telegram_last_name: message.from?.last_name
          }).eq('id', linkToken.member_id);

          await supabaseAdmin.from('telegram_link_tokens').update({ used_at: new Date().toISOString() }).eq('id', linkToken.id);
          
          await sendTelegramMessage(chatId, "✅ Hisobingiz muvaffaqiyatli bog'landi! /start buyrug'ini qayta yuboring.");
          return NextResponse.json({ ok: true });
        } else {
          await sendTelegramMessage(chatId, "❌ Link yaroqsiz yoki muddati o'tgan.");
          return NextResponse.json({ ok: true });
        }
      }

      if (member) {
        const firstName = member.telegram_first_name || member.full_name || message.from?.first_name || 'A\'zo';
        const streak = member.current_streak || 0;
        const xp = member.xp || 0;
        const rank = member.gym_rank || 0;
        const workout = member.today_workout || 'Belgilanmagan';

        const replyText = `<b>Retenix</b>\nSalom, <b>${firstName}</b>\n\n🔥 <b>${streak}</b> kunlik streak\n🏋️ Bugun: <b>${workout}</b>\n⚡ <b>${xp}</b> XP\n🏆 Gym ranking: <b>#${rank}</b>`;
        
        const replyMarkup = {
          inline_keyboard: [
            [
              { text: "📱 Open Retenix", web_app: { url: `${APP_URL}/member` } },
              { text: "💪 Today's Workout", web_app: { url: `${APP_URL}/member/plan` } }
            ],
            [
              { text: "📍 Check-in", web_app: { url: `${APP_URL}/member` } },
              { text: "🤖 Ask AI Coach", web_app: { url: `${APP_URL}/member/ai` } }
            ]
          ]
        };
        await sendTelegramMessage(chatId, replyText, replyMarkup);
      } else {
        const replyText = "Retenix hisobingiz hali Telegram bilan bog'lanmagan.";
        const replyMarkup = {
          inline_keyboard: [
            [
              { text: "🔗 Link account", web_app: { url: `${APP_URL}/link` } },
              { text: "📞 Contact gym", url: "https://t.me/retenix_support" }
            ]
          ]
        };
        await sendTelegramMessage(chatId, replyText, replyMarkup);
      }
    } else if (text.startsWith('/app')) {
      await sendTelegramMessage(chatId, "📱 Open Mini App", {
        inline_keyboard: [[{ text: "📱 Open Retenix", web_app: { url: `${APP_URL}/member` } }]]
      });
    } else if (text.startsWith('/today')) {
      if (!member) {
        await sendTelegramMessage(chatId, "Hisobingiz bog'lanmagan. /start buyrug'ini yuboring.");
      } else {
        const workout = member.today_workout || 'Bugun uchun mashq belgilanmagan';
        await sendTelegramMessage(chatId, `🏋️ <b>Bugungi mashq:</b>\n${workout}`, {
          inline_keyboard: [[{ text: "💪 Mashq rejasi", web_app: { url: `${APP_URL}/member/plan` } }]]
        });
      }
    } else if (text.startsWith('/checkin')) {
      await sendTelegramMessage(chatId, "📍 Check-in", {
        inline_keyboard: [[{ text: "📍 Check-in qilish", web_app: { url: `${APP_URL}/member` } }]]
      });
    } else if (text.startsWith('/streak')) {
      const streak = member?.current_streak || 0;
      await sendTelegramMessage(chatId, `🔥 Sizning joriy streakingiz: <b>${streak}</b> kun`);
    } else if (text.startsWith('/coach')) {
      await sendTelegramMessage(chatId, "🤖 Ask AI Coach", {
        inline_keyboard: [[{ text: "🤖 Open AI Coach", web_app: { url: `${APP_URL}/member/ai` } }]]
      });
    } else if (text.startsWith('/help')) {
      const replyText = `Available commands:\n/start - Start Bot\n/app - Open Mini App\n/today - Today's Workout\n/checkin - Turnstile Pass\n/streak - Show Streak\n/coach - Ask AI Coach\n/help - Show this message`;
      await sendTelegramMessage(chatId, replyText);
    } else {
      await sendTelegramMessage(chatId, "AI Coach xabari qabul qilindi. Mini App orqali davom eting.", {
        inline_keyboard: [[{ text: "🤖 Open AI Coach", web_app: { url: `${APP_URL}/member/ai` } }]]
      });
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
      name: "Retenix Telegram Bot Webhook API",
      status: "active",
      bot_token_configured: true,
      webhook_url: webhookUrl,
      mini_app_url: `${APP_URL}/member`
    });
  } catch (err: any) {
    return NextResponse.json({ ok: false, error: err.message });
  }
}
