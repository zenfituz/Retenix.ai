"use client";

import React from "react";
import { Trophy, Medal, Flame, Zap } from "lucide-react";

export default function MemberTopPage() {
  const leaderboard = [
    { rank: 1, name: "Sherzod Alimov", xp: 1420, streak: 28, badge: "🥇" },
    { rank: 2, name: "Bekzod M.", xp: 1280, streak: 21, badge: "🥈" },
    { rank: 3, name: "Nilufar K.", xp: 1150, streak: 18, badge: "🥉" },
    { rank: 4, name: "Jasur Toshmatov", xp: 940, streak: 14, badge: "#4" },
    { rank: 5, name: "Doniyor R.", xp: 820, streak: 10, badge: "#5" },
  ];

  return (
    <div className="space-y-4">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl">
        <h1 className="text-xl font-display font-bold text-white">Gym Top Leaderboard</h1>
        <p className="text-xs text-gray-400 mt-1">Zal a'zolarining umumiy XP va Streak reytingi</p>
      </div>

      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-2.5">
        {leaderboard.map((item) => (
          <div
            key={item.rank}
            className={`p-3.5 rounded-xl border flex items-center justify-between font-mono text-xs ${
              item.rank === 4
                ? "bg-[#E8FF47]/10 border-[#E8FF47]/40 text-white"
                : "bg-[#13131c] border-[#1e1e2c] text-gray-300"
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-base font-bold w-6 text-center">{item.badge}</span>
              <span className="font-semibold text-white">{item.name}</span>
            </div>

            <div className="flex items-center gap-3">
              <span>🔥 {item.streak}d</span>
              <span className="text-[#E8FF47] font-bold">⚡ {item.xp} XP</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
