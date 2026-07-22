"use client";

import React, { useState } from "react";
import { Trophy, Flame, Zap, Award, Star } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Pill } from "@/components/ui/pill";

const LEADERBOARD = [
  { rank: 1, name: "Botir Niyozov", streak: "🔥 21 kun", xp: 3420, badge: "🥇 Oltin Chempion" },
  { rank: 2, name: "Jasur Toshmatov", streak: "🔥 14 kun", xp: 2340, badge: "🥈 Kumush" },
  { rank: 3, name: "Nilufar Mirzaeva", streak: "🔥 7 kun", xp: 1890, badge: "🥉 Bronza" },
  { rank: 4, name: "Aziz Boltayev", streak: "🔥 5 kun", xp: 1450, badge: "⭐ Yulduz" },
  { rank: 5, name: "Mohira Aliyeva", streak: "🌱 2 kun", xp: 980, badge: "🌱 Yangi" },
];

export default function MemberTopPage() {
  const [filter, setFilter] = useState("Haftalik");

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-text-hi flex items-center gap-2">
          <Trophy className="w-7 h-7 text-accent" /> Zal Reytingi (Leaderboard)
        </h1>
        <p className="text-text-dim text-sm mt-1">FitZone Gym a'zolari o'rtasidagi faollik va XP reytingi</p>
      </div>

      {/* Filter Options */}
      <div className="flex gap-2 border-b border-border pb-3">
        {["Haftalik", "Oylik", "Barcha Vaqt"].map((tab) => (
          <button
            key={tab}
            onClick={() => setFilter(tab)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer ${
              filter === tab
                ? "bg-accent text-bg font-semibold"
                : "bg-surface-2 text-text-mid hover:text-text-hi"
            }`}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Current User Rank Card */}
      <div className="p-4 rounded-2xl bg-surface border border-accent/40 flex items-center justify-between shadow-xl">
        <div className="flex items-center gap-3">
          <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/30 flex items-center justify-center font-display font-black text-accent text-base">
            #2
          </div>
          <div>
            <div className="text-sm font-bold text-text-hi">Sizning O'rningiz: Top-3</div>
            <p className="text-xs text-text-dim font-mono">Jasur Toshmatov • 2,340 XP</p>
          </div>
        </div>
        <Pill variant="success">🥈 Kumush Chempion</Pill>
      </div>

      {/* Leaderboard Table */}
      <Card className="bg-surface border-border">
        <CardHeader className="pb-2 border-b border-border">
          <CardTitle className="text-base font-display font-bold text-text-hi">Reyting Jadvali</CardTitle>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {LEADERBOARD.map((user) => (
            <div
              key={user.rank}
              className={`p-3.5 rounded-xl border flex items-center justify-between transition-colors ${
                user.rank === 2
                  ? "bg-accent/5 border-accent/30"
                  : "bg-surface-2 border-border-2"
              }`}
            >
              <div className="flex items-center gap-3.5">
                <span className={`w-7 text-center font-display font-bold text-sm ${
                  user.rank === 1 ? "text-accent" : user.rank === 2 ? "text-good" : user.rank === 3 ? "text-warn" : "text-text-dim"
                }`}>
                  {user.rank === 1 ? "🥇" : user.rank === 2 ? "🥈" : user.rank === 3 ? "🥉" : `#${user.rank}`}
                </span>
                <Avatar fallback={user.name.substring(0, 2).toUpperCase()} size="sm" />
                <div>
                  <div className="text-xs font-semibold text-text-hi">{user.name}</div>
                  <div className="text-[10px] text-text-dim font-mono mt-0.5">{user.badge}</div>
                </div>
              </div>

              <div className="text-right font-mono text-xs">
                <div className="text-accent font-bold">{user.xp.toLocaleString()} XP</div>
                <div className="text-text-dim text-[10px] mt-0.5">{user.streak}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
