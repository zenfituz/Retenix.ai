import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { memberId, workoutPlanId, eventData } = body;

    if (!memberId) {
      return NextResponse.json({ error: 'Missing memberId' }, { status: 400 });
    }

    // 1. Record Workout Completion Event
    const { data: event, error: eventError } = await supabase
      .from('member_activity_events')
      .insert({
        member_id: memberId,
        event_type: 'workout_completed',
        metadata: { workoutPlanId, ...eventData }
      })
      .select('id')
      .single();

    if (eventError || !event) {
      throw new Error(eventError?.message || 'Failed to record workout event');
    }

    // 2. Update Streak & Award XP
    const { data: memberData } = await supabase
      .from('members')
      .select('current_streak, total_xp')
      .eq('id', memberId)
      .single();

    const currentStreak = (memberData?.current_streak || 0) + 1;
    
    // Update streak (if needed, maybe check if already checked in today)
    await supabase
      .from('members')
      .update({ current_streak: currentStreak })
      .eq('id', memberId);

    // Idempotent XP Transaction
    const transactionRef = `workout_${event.id}`;
    const xpReward = 30;

    const { error: xpError } = await supabase
      .from('xp_transactions')
      .insert({
        member_id: memberId,
        amount: xpReward,
        transaction_type: 'workout_completion',
        reference_id: transactionRef,
        description: 'Workout Completed'
      });

    // If duplicate key, ignore
    if (xpError && xpError.code !== '23505') {
       console.error("XP Error:", xpError);
    } else if (!xpError) {
       // Update total_xp
       await supabase
         .from('members')
         .update({ total_xp: (memberData?.total_xp || 0) + xpReward })
         .eq('id', memberId);
    }

    return NextResponse.json({ 
      success: true, 
      message: 'Workout completed successfully', 
      xpAwarded: xpReward,
      currentStreak
    });

  } catch (error: any) {
    console.error('Workout completion error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
