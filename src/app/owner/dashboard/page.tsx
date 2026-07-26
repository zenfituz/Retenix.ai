"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  Users, AlertTriangle, TrendingUp, Activity, ArrowRight, Zap, 
  Dumbbell, CheckCircle2, Bot, Plus, ChevronRight, Search, Filter, ShieldAlert
} from "lucide-react";

export default function OwnerDashboard() {
  const [filter, setFilter] = useState<"all" | "risk">("all");

  const membersList = [
    { id: "1", name: "Jasur Toshmatov", risk: 85, streak: 0, trainer: "Bekzod M.", joined: "12 May 2026", status: "risk", lastCheckin: "14 kun oldin" },
    { id: "2", name: "Nilufar Mirzaeva", risk: 72, streak: 1, trainer: "Sardor A.", joined: "01 Jun 2026", status: "risk", lastCheckin: "9 kun oldin" },
    { id: "3", name: "Doniyor Raxmonov", risk: 15, streak: 14, trainer: "Bekzod M.", joined: "15 Jan 2026", status: "active", lastCheckin: "Bugun 09:30" },
    { id: "4", name: "Malika Saipova", risk: 22, streak: 8, trainer: "Aziz K.", joined: "20 Feb 2026", status: "active", lastCheckin: "Kecha 18:45" },
    { id: "5", name: "Bobur Alimov", risk: 68, streak: 2, trainer: "Sardor A.", joined: "10 Apr 2026", status: "risk", lastCheckin: "6 kun oldin" },
  ];

  const filteredMembers = filter === "risk" ? membersList.filter(m => m.risk >= 70) : membersList;

  return (
    <div className="space-y-6">
      
      {/* Header Banner */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8FF47]/10 border border-[#E8FF47]/30 text-[#E8FF47] text-[10px] font-mono mb-2">
            <Zap className="w-3.5 h-3.5" /> FITZONE TASHKENT · PRO TIER
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Gym Owner Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Zal faoliyati va Churn xavfidagi mijozlar monitoringi</p>
        </div>

        <Link
          href="/owner/members"
          className="bg-[#E8FF47] hover:bg-[#d8ef37] text-[#080810] px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(232,255,71,0.2)]"
        >
          <Plus className="w-4 h-4" />
          <span>Yangi A'zo Qo'shish</span>
        </Link>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-mono uppercase tracking-wider">RETENTION RATE</span>
            <TrendingUp className="w-4 h-4 text-[#5DCAA5]" />
          </div>
          <div className="text-2xl lg:text-3xl font-display font-bold text-white">88.4%</div>
          <div className="text-[10px] font-mono text-[#5DCAA5] flex items-center gap-1">
            <span>+3.2% so'nggi 30 kunda</span>
          </div>
        </div>

        <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-mono uppercase tracking-wider">JAMI A'ZOLAR</span>
            <Users className="w-4 h-4 text-[#7BB6E8]" />
          </div>
          <div className="text-2xl lg:text-3xl font-display font-bold text-white">412</div>
          <div className="text-[10px] font-mono text-gray-400">348 ta faol a'zolik</div>
        </div>

        <div className="bg-[#0d0d16] border border-[#E24B4A]/30 bg-[#E24B4A]/5 p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-[#E24B4A]">
            <span className="text-xs font-mono uppercase tracking-wider font-semibold">CHURN XAVFI (HIGH)</span>
            <AlertTriangle className="w-4 h-4" />
          </div>
          <div className="text-2xl lg:text-3xl font-display font-bold text-white">9 ta</div>
          <div className="text-[10px] font-mono text-[#E24B4A]">14 kun ichida ketish xavfi yuqori</div>
        </div>

        <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-2">
          <div className="flex items-center justify-between text-gray-400">
            <span className="text-xs font-mono uppercase tracking-wider">BUGUNGI DAVOMAT</span>
            <Activity className="w-4 h-4 text-[#E8FF47]" />
          </div>
          <div className="text-2xl lg:text-3xl font-display font-bold text-white">128</div>
          <div className="text-[10px] font-mono text-gray-400">Turniket check-in lar</div>
        </div>
      </div>

      {/* Churn Risk Members Section */}
      <div className="bg-[#0d0d16] border border-[#1e1e2c] rounded-2xl p-5 lg:p-6 space-y-4">
        
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-3">
          <div>
            <h2 className="text-lg font-display font-bold text-white flex items-center gap-2">
              <ShieldAlert className="w-5 h-5 text-[#E24B4A]" />
              <span>Churn Signal Engine — Xavf Ostidagi Mijozlar</span>
            </h2>
            <p className="text-xs text-gray-400">5-Faktorli AI tahlil natijasida aniqlangan a'zolar</p>
          </div>

          <div className="flex items-center gap-2 bg-[#13131c] p-1 rounded-xl border border-[#1e1e2c]">
            <button
              onClick={() => setFilter("all")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === "all" ? "bg-[#E8FF47] text-[#080810]" : "text-gray-400 hover:text-white"
              }`}
            >
              Barchasi ({membersList.length})
            </button>
            <button
              onClick={() => setFilter("risk")}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all ${
                filter === "risk" ? "bg-[#E24B4A] text-white" : "text-gray-400 hover:text-white"
              }`}
            >
              Xavflilar (3)
            </button>
          </div>
        </div>

        {/* Desktop Table View (≥1024px) */}
        <div className="hidden lg:block overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead>
              <tr className="border-b border-[#1e1e2c] text-gray-400 font-mono uppercase">
                <th className="py-3 px-4">A'zo F.I.SH</th>
                <th className="py-3 px-4">Churn Xavfi (Score)</th>
                <th className="py-3 px-4">Streak</th>
                <th className="py-3 px-4">Trener</th>
                <th className="py-3 px-4">Oxirgi Check-in</th>
                <th className="py-3 px-4 text-right">Amal</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#1e1e2c]">
              {filteredMembers.map((m) => (
                <tr key={m.id} className="hover:bg-[#13131c] transition-colors">
                  <td className="py-3.5 px-4 font-medium text-white">
                    <div className="flex items-center gap-2.5">
                      <div className="w-7 h-7 rounded-lg bg-[#1a1a26] text-[#E8FF47] font-bold text-xs flex items-center justify-center font-display">
                        {m.name.charAt(0)}
                      </div>
                      <span>{m.name}</span>
                    </div>
                  </td>
                  <td className="py-3.5 px-4 font-mono">
                    <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                      m.risk >= 70 
                        ? "bg-[#E24B4A]/15 text-[#E24B4A] border border-[#E24B4A]/30" 
                        : "bg-[#5DCAA5]/15 text-[#5DCAA5] border border-[#5DCAA5]/30"
                    }`}>
                      {m.risk}% Xavf
                    </span>
                  </td>
                  <td className="py-3.5 px-4 font-mono text-gray-300">
                    🔥 {m.streak} kun
                  </td>
                  <td className="py-3.5 px-4 text-gray-300">{m.trainer}</td>
                  <td className="py-3.5 px-4 text-gray-400 font-mono">{m.lastCheckin}</td>
                  <td className="py-3.5 px-4 text-right">
                    <Link
                      href={`/owner/members/${m.id}`}
                      className="text-[#E8FF47] hover:underline font-semibold flex items-center justify-end gap-1"
                    >
                      <span>Batafsil</span>
                      <ChevronRight className="w-3.5 h-3.5" />
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Mobile/Tablet Card View (<1024px) */}
        <div className="lg:hidden space-y-3">
          {filteredMembers.map((m) => (
            <div key={m.id} className="bg-[#13131c] border border-[#1e1e2c] p-4 rounded-xl space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2.5">
                  <div className="w-8 h-8 rounded-lg bg-[#1a1a26] text-[#E8FF47] font-bold text-xs flex items-center justify-center font-display">
                    {m.name.charAt(0)}
                  </div>
                  <div>
                    <span className="font-semibold text-white text-sm block">{m.name}</span>
                    <span className="text-[11px] text-gray-400 font-mono">Trener: {m.trainer}</span>
                  </div>
                </div>

                <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold ${
                  m.risk >= 70 
                    ? "bg-[#E24B4A]/15 text-[#E24B4A] border border-[#E24B4A]/30" 
                    : "bg-[#5DCAA5]/15 text-[#5DCAA5] border border-[#5DCAA5]/30"
                }`}>
                  {m.risk}% Xavf
                </span>
              </div>

              <div className="flex items-center justify-between text-xs font-mono text-gray-400 border-t border-[#1e1e2c] pt-2.5">
                <span>🔥 Streak: {m.streak} kun</span>
                <span>{m.lastCheckin}</span>
              </div>

              <Link
                href={`/owner/members/${m.id}`}
                className="w-full bg-[#1a1a26] hover:bg-[#2a2a3a] text-[#E8FF47] py-2 rounded-lg text-xs font-semibold flex items-center justify-center gap-1 transition-colors border border-[#2a2a3a]"
              >
                <span>Tahlil va Interventsiya</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          ))}
        </div>

      </div>

    </div>
  );
}
