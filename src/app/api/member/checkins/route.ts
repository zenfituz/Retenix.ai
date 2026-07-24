import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function POST(request: Request) {
  try {
    const supabase = createAdminClient();
    const body = await request.json();
    const { memberId, gymId, qrCodePayload } = body;

    if (!memberId || !gymId) {
      return NextResponse.json({ error: 'Missing required fields' }, { status: 400 });
    }

    // 1. Cooldown Check (60 mins)
    const { data: recentCheckins, error: checkinError } = await supabase
      .from('checkins')
      .select('created_at')
      .eq('member_id', memberId)
      .order('created_at', { ascending: false })
      .limit(1);

    if (recentCheckins && recentCheckins.length > 0) {
      const lastCheckin = new Date(recentCheckins[0].created_at);
      const now = new Date();
      const diffMins = (now.getTime() - lastCheckin.getTime()) / (1000 * 60);
      if (diffMins < 60) {
        return NextResponse.json({ error: 'Cooldown active. Please wait 60 minutes between check-ins.' }, { status: 429 });
      }
    }

    // 2. Insert Check-in
    const { data: checkin, error: insertError } = await supabase
      .from('checkins')
      .insert({ member_id: memberId, gym_id: gymId })
      .select('id')
      .single();

    if (insertError || !checkin) {
      throw new Error(insertError?.message || 'Failed to record check-in');
    }

    // 3. Update Streak & Award XP
    // Fetch current streak first
    const { data: memberData } = await supabase
      .from('members')
      .select('current_streak, total_xp')
      .eq('id', memberId)
      .single();

    const currentStreak = (memberData?.current_streak || 0) + 1;
    
    // Update streak on member
    await supabase
      .from('members')
      .update({ current_streak: currentStreak })
      .eq('id', memberId);

    // Idempotent XP Transaction
    const transactionRef = `checkin_${checkin.id}`;
    const xpReward = 20;

    const { error: xpError } = await supabase
      .from('xp_transactions')
      .insert({
        member_id: memberId,
        amount: xpReward,
        transaction_type: 'checkin',
        reference_id: transactionRef,
        description: 'Gym Check-in'
      });

    // If it fails with duplicate key, it means it was already awarded, so we ignore it
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
      message: 'Check-in successful', 
      xpAwarded: xpReward,
      currentStreak
    });

  } catch (error: any) {
    console.error('Check-in error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
