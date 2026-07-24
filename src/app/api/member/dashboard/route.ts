import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient();
    
    // In a real app we'd get memberId from auth token or session
    // For now we'll get it from query string if available or fail
    const { searchParams } = new URL(request.url);
    const memberId = searchParams.get('memberId');
    
    if (!memberId) {
      return NextResponse.json({ error: 'memberId is required' }, { status: 400 });
    }

    // 1. Member Profile & Stats (from members table)
    const { data: member, error: memberError } = await supabase
      .from('members')
      .select('id, user_id, gym_id, current_streak, total_xp, rank')
      .eq('id', memberId)
      .single();
      
    if (memberError || !member) {
      return NextResponse.json({ error: 'Member not found' }, { status: 404 });
    }

    // 2. Badges
    const { data: memberBadges } = await supabase
      .from('member_badges')
      .select('unlocked_at, badges(id, code, title, description, icon_name, xp_reward)')
      .eq('member_id', memberId);

    // 3. Active Challenge
    const { data: challengeParticipation } = await supabase
      .from('challenge_participants')
      .select('progress, completed, challenges(id, title, description, xp_reward, start_date, end_date)')
      .eq('member_id', memberId)
      .eq('completed', false)
      .limit(1);

    // 4. Today's Workout
    const dayOfWeek = new Date().getDay();
    const { data: todayWorkout } = await supabase
      .from('workout_plans')
      .select('id, title, workout_plan_items(exercise_name, sets, reps, weight_kg, order_index)')
      .eq('member_id', memberId)
      .eq('is_active', true)
      .limit(1);
      
    // Filter items for today locally as Supabase nested filtering can be tricky
    let workoutForToday = null;
    if (todayWorkout && todayWorkout.length > 0) {
      const plan = todayWorkout[0];
      // In a real scenario we'd do a more complex join, this is simplified
      workoutForToday = {
        title: plan.title,
        items: plan.workout_plan_items
      };
    }

    return NextResponse.json({
      member,
      badges: memberBadges || [],
      activeChallenge: challengeParticipation?.[0] || null,
      todayWorkout: workoutForToday,
      aiInsight: "You're on a great streak! Don't forget to hydrate."
    });

  } catch (error: any) {
    console.error('Error fetching dashboard:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
