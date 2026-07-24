import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { goal, days_per_week, member_id } = await req.json();
    const supabase = await createClient();

    // Deterministic fallback template
    let plan = {
      name: `${goal} Plan`,
      description: `A ${days_per_week}-day workout plan tailored for ${goal}.`,
      days: Array.from({ length: days_per_week || 3 }).map((_, i) => ({
        day_number: i + 1,
        focus: "Full Body",
        exercises: [
          { name: "Push-ups", sets: 3, reps: "10-15" },
          { name: "Squats", sets: 3, reps: "15-20" },
          { name: "Plank", sets: 3, reps: "30-60 sec" }
        ]
      }))
    };

    // Try generating with LLM
    try {
      const prompt = `Generate a structured ${days_per_week}-day workout plan for the goal: ${goal}. Respond ONLY with valid JSON.
      Format: { "name": string, "description": string, "days": [ { "day_number": number, "focus": string, "exercises": [ { "name": string, "sets": number, "reps": string } ] } ] }`;
      
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [{ role: "user", content: prompt }],
          response_format: { type: "json_object" }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiPlan = JSON.parse(data.choices[0].message.content);
        if (aiPlan.name && aiPlan.days) {
          plan = aiPlan;
        }
      }
    } catch (e) {
      console.warn("LLM failed, using fallback template", e);
    }

    // Save to database
    // 1. Insert workout_plan
    const { data: planData, error: planError } = await supabase
      .from('workout_plans')
      .insert({ member_id, name: plan.name, description: plan.description, is_active: true })
      .select()
      .single();

    if (planError) throw planError;

    // 2. Insert items
    const itemsToInsert = [];
    for (const day of plan.days) {
      for (const exercise of day.exercises) {
        itemsToInsert.push({
          plan_id: planData.id,
          day_number: day.day_number,
          exercise_name: exercise.name,
          sets: exercise.sets,
          reps: exercise.reps,
          focus: day.focus
        });
      }
    }

    const { error: itemsError } = await supabase
      .from('workout_plan_items')
      .insert(itemsToInsert);

    if (itemsError) throw itemsError;

    return NextResponse.json({ success: true, plan });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
