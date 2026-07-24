"use client";

import { useEffect, useState } from 'react';
import { useTelegram } from '@/lib/telegram/provider';
import { Flame, Zap, Dumbbell, Medal, ArrowRight, Brain } from 'lucide-react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface DashboardData {
  member: {
    name: string;
    level: number;
    xp: number;
    nextLevelXp: number;
    streak: number;
    rank: number;
  };
  todayWorkout: {
    title: string;
    duration: string;
    exercises: number;
    completed: boolean;
  } | null;
  aiInsight: string;
  activeChallenge: {
    title: string;
    progress: number;
    total: number;
  };
}

export default function MemberDashboard() {
  const { user } = useTelegram();
  const router = useRouter();
  const [data, setData] = useState<DashboardData | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate real fetch or use actual fetch if endpoint exists
    const fetchDashboard = async () => {
      try {
        const res = await fetch('/api/member/dashboard');
        if (res.ok) {
          const json = await res.json();
          setData(json);
        } else {
          // Fallback mock data if API is not yet implemented
          setData({
            member: {
              name: user?.first_name || 'O\'ktam',
              level: 5,
              xp: 2450,
              nextLevelXp: 3000,
              streak: 12,
              rank: 4,
            },
            todayWorkout: {
              title: 'Upper Body Power',
              duration: '45 min',
              exercises: 6,
              completed: false,
            },
            aiInsight: "You've been consistent! Add 2.5kg to your bench press today.",
            activeChallenge: {
              title: 'Summer Shred',
              progress: 4,
              total: 10,
            }
          });
        }
      } catch (e) {
        console.error(e);
      } finally {
        setIsLoading(false);
      }
    };

    fetchDashboard();
  }, [user]);

  if (isLoading) {
    return (
      <div className="p-4 space-y-4 animate-pulse">
        <div className="h-8 bg-[#1a1a26] rounded w-1/2 mb-6"></div>
        <div className="grid grid-cols-2 gap-4">
          <div className="h-24 bg-[#1a1a26] rounded-2xl"></div>
          <div className="h-24 bg-[#1a1a26] rounded-2xl"></div>
        </div>
        <div className="h-40 bg-[#1a1a26] rounded-2xl"></div>
        <div className="h-32 bg-[#1a1a26] rounded-2xl"></div>
      </div>
    );
  }

  if (!data) return null;

  const xpProgress = (data.member.xp / data.member.nextLevelXp) * 100;

  return (
    <div className="p-4 space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <div>
          <p className="text-gray-400 text-sm">Welcome back,</p>
          <h1 className="text-2xl font-bold font-unbounded text-white">{data.member.name}</h1>
        </div>
        <div className="w-12 h-12 bg-[#1a1a26] rounded-full flex items-center justify-center border border-[#2a2a3a]">
          <span className="text-xl font-bold text-[#E8FF47]">#{data.member.rank}</span>
        </div>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-2 gap-4">
        <div className="bg-[#13131c] p-4 rounded-2xl border border-[#1e1e2c]">
          <div className="flex items-center gap-2 mb-2">
            <Flame className="w-5 h-5 text-[#E8C547]" />
            <span className="text-gray-400 text-sm font-medium">Streak</span>
          </div>
          <div className="flex items-baseline gap-1">
            <span className="text-2xl font-bold text-white">{data.member.streak}</span>
            <span className="text-gray-500 text-sm">days</span>
          </div>
        </div>
        <div className="bg-[#13131c] p-4 rounded-2xl border border-[#1e1e2c]">
          <div className="flex items-center gap-2 mb-2">
            <Zap className="w-5 h-5 text-[#5DCAA5]" />
            <span className="text-gray-400 text-sm font-medium">Level {data.member.level}</span>
          </div>
          <div className="flex flex-col gap-2">
            <span className="text-xl font-bold text-white">{data.member.xp} <span className="text-sm text-gray-500 font-normal">XP</span></span>
            <div className="h-1.5 w-full bg-[#1a1a26] rounded-full overflow-hidden">
              <div className="h-full bg-[#5DCAA5]" style={{ width: \`\${xpProgress}%\` }}></div>
            </div>
          </div>
        </div>
      </div>

      {/* AI Insight */}
      <div className="bg-gradient-to-r from-[#1a1a26] to-[#13131c] p-4 rounded-2xl border border-[#2a2a3a] flex items-start gap-3">
        <div className="w-10 h-10 bg-[#7BB6E8]/10 rounded-full flex items-center justify-center shrink-0">
          <Brain className="w-5 h-5 text-[#7BB6E8]" />
        </div>
        <div>
          <h3 className="text-sm font-bold text-[#7BB6E8] mb-1">AI Insight</h3>
          <p className="text-sm text-gray-300 leading-relaxed">{data.aiInsight}</p>
        </div>
      </div>

      {/* Today's Workout */}
      <div className="bg-[#13131c] rounded-2xl border border-[#1e1e2c] p-5">
        <div className="flex items-center gap-2 mb-4">
          <Dumbbell className="w-5 h-5 text-[#E8FF47]" />
          <h2 className="text-lg font-bold text-white font-unbounded">Today's Plan</h2>
        </div>
        
        {data.todayWorkout ? (
          <div>
            <h3 className="text-xl font-bold text-white mb-1">{data.todayWorkout.title}</h3>
            <p className="text-gray-400 text-sm mb-5">{data.todayWorkout.duration} • {data.todayWorkout.exercises} exercises</p>
            <button 
              onClick={() => router.push('/member/plan')}
              className="w-full py-3.5 bg-[#E8FF47] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#d4ed33] transition-colors"
            >
              Start Workout
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>
        ) : (
          <div className="text-center py-4">
            <p className="text-gray-400 mb-4">Rest day or no workout planned.</p>
            <button className="px-6 py-2 bg-[#1a1a26] text-white font-medium rounded-xl border border-[#2a2a3a]">
              Find a Workout
            </button>
          </div>
        )}
      </div>

      {/* Active Challenge */}
      <div className="bg-[#13131c] rounded-2xl border border-[#1e1e2c] p-5">
        <div className="flex justify-between items-center mb-4">
          <div className="flex items-center gap-2">
            <Medal className="w-5 h-5 text-[#E8C547]" />
            <h2 className="text-lg font-bold text-white font-unbounded">Challenge</h2>
          </div>
          <span className="text-xs font-medium bg-[#1a1a26] px-2 py-1 rounded text-gray-300">
            {data.activeChallenge.progress}/{data.activeChallenge.total}
          </span>
        </div>
        <h3 className="font-bold text-white mb-3">{data.activeChallenge.title}</h3>
        <div className="h-2 w-full bg-[#1a1a26] rounded-full overflow-hidden">
          <div 
            className="h-full bg-gradient-to-r from-[#E8C547] to-[#E8FF47]" 
            style={{ width: `${(data.activeChallenge.progress / data.activeChallenge.total) * 100}%` }}
          ></div>
        </div>
      </div>
    </div>
  );
}
