"use client";

import { useEffect, useState } from 'react';
import { Trophy, Flame, Loader2, Medal } from 'lucide-react';
import { useTelegram } from '@/lib/telegram/provider';

interface LeaderboardMember {
  id: string;
  name: string;
  xp: number;
  streak: number;
  rank: number;
  isCurrentUser?: boolean;
}

export default function LeaderboardPage() {
  const { user } = useTelegram();
  const [leaders, setLeaders] = useState<LeaderboardMember[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const fetchLeaderboard = async () => {
      try {
        // Simulate API call
        await new Promise(resolve => setTimeout(resolve, 800));
        
        // Mock data
        const mockLeaders: LeaderboardMember[] = [
          { id: '1', name: 'Alisher R.', xp: 12500, streak: 45, rank: 1 },
          { id: '2', name: 'Bekzod M.', xp: 11200, streak: 32, rank: 2 },
          { id: '3', name: 'Sardor A.', xp: 10800, streak: 28, rank: 3 },
          { id: '4', name: user?.firstName || 'O\'ktam', xp: 9500, streak: 12, rank: 4, isCurrentUser: true },
          { id: '5', name: 'Javohir T.', xp: 9200, streak: 15, rank: 5 },
          { id: '6', name: 'Aziz K.', xp: 8700, streak: 8, rank: 6 },
          { id: '7', name: 'Dilshod B.', xp: 8100, streak: 20, rank: 7 },
          { id: '8', name: 'Timur Y.', xp: 7500, streak: 5, rank: 8 },
          { id: '9', name: 'Rustam N.', xp: 6900, streak: 2, rank: 9 },
          { id: '10', name: 'Farhod O.', xp: 6200, streak: 1, rank: 10 },
        ];
        
        setLeaders(mockLeaders);
      } catch (error) {
        console.error(error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLeaderboard();
  }, [user]);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <span className="text-2xl">🥇</span>;
      case 2: return <span className="text-2xl">🥈</span>;
      case 3: return <span className="text-2xl">🥉</span>;
      default: return <span className="text-gray-500 font-bold w-6 text-center">{rank}</span>;
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="flex flex-col items-center justify-center py-6 bg-gradient-to-b from-[#E8FF47]/10 to-transparent rounded-3xl border border-[#E8FF47]/20">
        <div className="w-16 h-16 bg-[#E8FF47]/20 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-8 h-8 text-[#E8FF47]" />
        </div>
        <h1 className="text-2xl font-bold font-unbounded text-white">Gym Leaderboard</h1>
        <p className="text-gray-400 text-sm mt-1">Top 10 Members this month</p>
      </div>

      {isLoading ? (
        <div className="flex justify-center py-12">
          <Loader2 className="w-8 h-8 text-[#E8FF47] animate-spin" />
        </div>
      ) : (
        <div className="bg-[#13131c] rounded-2xl border border-[#1e1e2c] overflow-hidden">
          {leaders.map((member, index) => (
            <div 
              key={member.id} 
              className={`flex items-center p-4 ${index !== leaders.length - 1 ? 'border-b border-[#1e1e2c]' : ''} ${member.isCurrentUser ? 'bg-[#E8FF47]/5 border-l-4 border-l-[#E8FF47]' : 'hover:bg-[#1a1a26]'} transition-colors`}
            >
              <div className="w-10 flex justify-center shrink-0 mr-3">
                {getRankIcon(member.rank)}
              </div>
              
              <div className="flex-1 min-w-0">
                <h3 className={`font-bold truncate ${member.isCurrentUser ? 'text-[#E8FF47]' : 'text-white'}`}>
                  {member.name} {member.isCurrentUser && '(You)'}
                </h3>
                <div className="flex items-center gap-1 mt-1">
                  <Medal className="w-3 h-3 text-[#5DCAA5]" />
                  <span className="text-xs text-gray-400">{member.xp} XP</span>
                </div>
              </div>
              
              <div className="flex flex-col items-end shrink-0 ml-2">
                <div className="flex items-center gap-1 bg-[#1a1a26] px-2 py-1 rounded-lg border border-[#2a2a3a]">
                  <Flame className={`w-3.5 h-3.5 ${member.streak >= 3 ? 'text-[#E8C547]' : 'text-gray-500'}`} />
                  <span className={`text-xs font-bold ${member.streak >= 3 ? 'text-white' : 'text-gray-500'}`}>
                    {member.streak}
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
      
      {!isLoading && (
        <div className="text-center">
          <p className="text-xs text-gray-500">Earn XP by completing workouts, logging food, and keeping your streak alive!</p>
        </div>
      )}
    </div>
  );
}
