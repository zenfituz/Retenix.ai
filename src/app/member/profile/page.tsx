"use client";

import React from "react";
import Link from "next/link";
import { User, ShieldCheck, Send, LogOut, CheckCircle2 } from "lucide-react";

export default function MemberProfilePage() {
  return (
    <div className="space-y-4">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl">
        <h1 className="text-xl font-display font-bold text-white">Mening Profilim</h1>
        <p className="text-xs text-gray-400 mt-1">A'zolik ma'lumotlari va Telegram ulanganligi</p>
      </div>

      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-4">
        <div className="flex items-center gap-3">
          <div className="w-12 h-12 rounded-2xl bg-[#E8FF47] text-[#080810] font-bold font-display flex items-center justify-center text-lg shadow-[0_0_15px_rgba(232,255,71,0.25)]">
            JT
          </div>
          <div>
            <h2 className="text-base font-display font-bold text-white">Jasur Toshmatov</h2>
            <span className="text-xs text-gray-400 font-mono">FitZone Gym · VIP Plan</span>
          </div>
        </div>

        <div className="p-3.5 rounded-xl bg-[#13131c] border border-[#1e1e2c] flex items-center justify-between text-xs font-mono">
          <div className="flex items-center gap-2 text-gray-300">
            <Send className="w-4 h-4 text-[#2AABEE]" />
            <span>Telegram Bog'langan: @jasur_t</span>
          </div>
          <span className="text-[#5DCAA5] font-bold">Faol</span>
        </div>

        <Link
          href="/member/onboarding"
          className="w-full bg-[#13131c] hover:bg-[#1a1a26] border border-[#1e1e2c] text-gray-300 py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all"
        >
          <span>AI Mashg'ulot Rejasini Yangilash</span>
        </Link>
      </div>
    </div>
  );
}
