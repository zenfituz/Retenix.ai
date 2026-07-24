import { NextResponse } from 'next/server';
import { createClient } from '@/utils/supabase/server';

export async function POST(req: Request) {
  try {
    const { member_id, food_name, portion_g, calories, protein_g, carbs_g, fat_g, source } = await req.json();
    const supabase = await createClient();

    // Insert food log
    const { error: logError } = await supabase
      .from('food_logs')
      .insert({
        member_id,
        food_name,
        portion_g,
        calories,
        protein_g,
        carbs_g,
        fat_g,
        source: source || 'manual'
      });

    if (logError) throw logError;

    // Insert +5 XP transaction
    // Using a pseudo-unique string as idempotency key or just rely on db schema if configured
    const transactionRef = `food_log_xp_${member_id}_${Date.now()}`;
    
    const { error: xpError } = await supabase
      .from('xp_transactions')
      .insert({
        member_id,
        amount: 5,
        reason: 'Food logged',
        transaction_ref: transactionRef
      });

    if (xpError) {
      console.warn("XP transaction failed (could be duplicate constraint)", xpError);
    }

    return NextResponse.json({ success: true, xp_awarded: 5 });
  } catch (error: any) {
    return NextResponse.json({ success: false, error: error.message }, { status: 500 });
  }
}
