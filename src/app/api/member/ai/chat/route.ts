import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { message, member_id } = await req.json();
    const supabase = await createClient();

    // Gather context
    const { data: member } = await supabase.from('members').select('goal, current_streak').eq('id', member_id).single();
    const { data: plan } = await supabase.from('workout_plans').select('name').eq('member_id', member_id).eq('is_active', true).single();
    const { data: logs } = await supabase.from('food_logs').select('food_name, calories').eq('member_id', member_id).order('created_at', { ascending: false }).limit(3);

    const goal = member?.goal || 'General fitness';
    const streak = member?.current_streak || 0;
    const planName = plan?.name || 'No active plan';
    const recentFood = logs?.map(l => `${l.food_name} (${l.calories} kcal)`).join(', ') || 'None';

    const systemPrompt = `You are the Retenix AI Coach, an encouraging and highly knowledgeable fitness assistant. You specialize in fitness, nutrition, and understand Uzbek language and culture well.
Context for the current member:
- Fitness Goal: ${goal}
- Current Streak: ${streak} days
- Active Workout Plan: ${planName}
- Recent Food Logs: ${recentFood}

Guidelines:
- Tailor your advice to their specific goal.
- Be encouraging and supportive. Keep the tone friendly.
- Provide actionable suggestions (e.g., specific stretches, hydration tips, simple healthy Uzbek food alternatives).
- Reply in the language the user speaks to you (Uzbek or English preferred).
- Keep responses relatively concise and focused on fitness/health.`;

    let reply = "Keep up the great work! I'm always here if you need more fitness advice. 💪";

    try {
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: systemPrompt },
            { role: "user", content: message }
          ]
        })
      });

      if (res.ok) {
        const data = await res.json();
        reply = data.choices[0].message.content;
      }
    } catch (e) {
      console.warn("AI Chat API failed, using fallback reply", e);
    }

    return NextResponse.json({ reply });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
