import { NextResponse } from 'next/server';
import { createAdminClient } from '@/utils/supabase/admin';

export async function GET(request: Request) {
  try {
    const supabase = createAdminClient();
    const { searchParams } = new URL(request.url);
    const limit = parseInt(searchParams.get('limit') || '10', 10);
    const gymId = searchParams.get('gymId'); // Optional gym filter

    let query = supabase
      .from('members')
      .select('id, user_id, gym_id, total_xp, rank')
      .order('total_xp', { ascending: false })
      .limit(limit);

    if (gymId) {
      query = query.eq('gym_id', gymId);
    }

    const { data: leaderboard, error } = await query;

    if (error) {
      throw new Error(error.message);
    }

    return NextResponse.json({ leaderboard });
  } catch (error: any) {
    console.error('Leaderboard error:', error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
