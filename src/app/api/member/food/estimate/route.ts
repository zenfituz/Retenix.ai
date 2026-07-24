import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { query } = await req.json();
    const supabase = await createClient();

    // 1. Check uzbek_food_reference for match
    const { data: refData, error: refError } = await supabase
      .from('uzbek_food_reference')
      .select('*')
      .ilike('food_name', `%${query}%`)
      .limit(1)
      .single();

    if (refData && !refError) {
      return NextResponse.json({
        food_name: refData.food_name,
        estimated_portion_g: refData.default_portion_g || 100,
        calories: refData.calories,
        protein_g: refData.protein_g,
        carbs_g: refData.carbs_g,
        fat_g: refData.fat_g,
        confidence: 'high'
      });
    }

    // 2. Estimate using AI if not found
    let estimated = {
      food_name: query,
      estimated_portion_g: 200,
      calories: 300,
      protein_g: 10,
      carbs_g: 30,
      fat_g: 15,
      confidence: 'low'
    };

    try {
      const prompt = `Estimate nutrition for the Uzbek food or query: "${query}". Respond ONLY with valid JSON.
      Format: { "food_name": string, "estimated_portion_g": number, "calories": number, "protein_g": number, "carbs_g": number, "fat_g": number }`;
      
      const res = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${process.env.OPENAI_API_KEY}`
        },
        body: JSON.stringify({
          model: "gpt-4o-mini",
          messages: [
            { role: "system", content: "You are an expert in Uzbek cuisine nutrition. Estimate portions and macros accurately for traditional foods like osh, somsa, manti, lag'mon, etc." },
            { role: "user", content: prompt }
          ],
          response_format: { type: "json_object" }
        })
      });

      if (res.ok) {
        const data = await res.json();
        const aiEst = JSON.parse(data.choices[0].message.content);
        estimated = { ...estimated, ...aiEst, confidence: 'medium' };
      }
    } catch (e) {
      console.warn("AI food estimation failed, using fallback", e);
    }

    return NextResponse.json(estimated);
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
