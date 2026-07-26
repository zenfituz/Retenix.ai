"use client";

import React from "react";
import Link from "next/link";
import { Flame, Zap, Dumbbell, Trophy, ArrowRight, Sparkles, QrCode, Utensils } from "lucide-react";

export default function MemberHomePage() {
  const member = {
    name: "Jasur Toshmatov",
    streak: 14,
    xp: 940,
    nextLevelXp: 1200,
    rank: 4,
    todayWorkout: "Oyoq va Yelka Mashg'uloti",
    aiInsight: "Sizning haftalik davomatingiz 94%! Bugungi trenirovkadan so'ng 1000 XP darajasiga yetasiz.",
  };

  return (
    <div className="space-y-4">
      
      {/* Top Header Card */}
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8FF47] text-[#080810] font-bold font-display flex items-center justify-center text-lg shadow-[0_0_15px_rgba(232,255,71,0.25)]">
            JT
          </div>
          <div>
            <span className="text-[10px] font-mono text-gray-400 block">XUSH KELIBSIZ</span>
            <h1 className="text-base font-display font-bold text-white leading-tight">{member.name}</h1>
          </div>
        </div>

        <Link
          href="/member/checkin"
          className="bg-[#5DCAA5]/10 border border-[#5DCAA5]/30 text-[#5DCAA5] p-2.5 rounded-xl flex items-center gap-1.5 text-xs font-semibold"
        >
          <QrCode className="w-4 h-4" />
          <span>Pass</span>
        </Link>
      </div>

      {/* Streak & XP Gamification Bar */}
      <div className="grid grid-cols-2 gap-3">
        <div className="bg-[#0d0d16] border border-[#E8FF47]/30 bg-[#E8FF47]/5 p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>STREAK</span>
            <Flame className="w-4 h-4 text-[#E8FF47]" />
          </div>
          <div className="text-2xl font-display font-bold text-white">🔥 {member.streak} kun</div>
          <span className="text-[10px] font-mono text-[#5DCAA5]">A'lo natija!</span>
        </div>

        <div className="bg-[#0d0d16] border border-[#1e1e2c] p-4 rounded-2xl space-y-1">
          <div className="flex items-center justify-between text-xs font-mono text-gray-400">
            <span>DARAJA (XP)</span>
            <Zap className="w-4 h-4 text-[#7BB6E8]" />
          </div>
          <div className="text-2xl font-display font-bold text-white">⚡ {member.xp} XP</div>
          <span className="text-[10px] font-mono text-gray-400">Reyting: #{member.rank} o'rin</span>
        </div>
      </div>

      {/* Today's Workout Card */}
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-3">
        <div className="flex items-center justify-between">
          <span className="text-xs font-mono text-gray-400 uppercase tracking-widest flex items-center gap-1">
            <Dumbbell className="w-3.5 h-3.5 text-[#E8FF47]" /> BUGUNGI MASHG'ULOT
          </span>
          <span className="text-[10px] font-mono text-[#5DCAA5]">45 DAQIQA</span>
        </div>

        <h2 className="text-lg font-display font-bold text-white">{member.todayWorkout}</h2>

        <Link
          href="/member/plan"
          className="w-full bg-[#E8FF47] hover:bg-[#d8ef37] text-[#080810] py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_15px_rgba(232,255,71,0.2)]"
        >
          <span>Mashg'ulotni Boshlash</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>

      {/* AI Coach Banner */}
      <div className="bg-[#13131c] border border-[#1e1e2c] p-4 rounded-2xl space-y-2">
        <div className="flex items-center gap-2 text-xs font-mono text-[#E8FF47]">
          <Sparkles className="w-4 h-4" /> AI COACH INSIGHT
        </div>
        <p className="text-xs text-gray-300 leading-relaxed">{member.aiInsight}</p>
      </div>

    </div>
  );
}
