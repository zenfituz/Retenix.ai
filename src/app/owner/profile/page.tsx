"use client";

import React from "react";
import { User, Building2, Mail, Shield, CheckCircle2 } from "lucide-react";

export default function OwnerProfilePage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Zal Egasi Profili</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Shaxsiy va zal ma'lumotlarini ko'rish hamda tahrirlash</p>
      </div>

      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-6">
        <div className="flex items-center gap-4">
          <div className="w-16 h-16 rounded-2xl bg-[#E8FF47] text-[#080810] font-display font-black text-2xl flex items-center justify-center shadow-[0_0_20px_rgba(232,255,71,0.3)]">
            FZ
          </div>
          <div>
            <h2 className="text-xl font-display font-bold text-white">FitZone Gym Tashkent</h2>
            <span className="text-xs font-mono text-[#E8FF47] bg-[#E8FF47]/10 px-2.5 py-1 rounded-full border border-[#E8FF47]/30">
              Pro SaaS Tier Plan
            </span>
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4 font-mono text-xs">
          <div className="p-4 rounded-xl bg-[#13131c] border border-[#1e1e2c] space-y-1">
            <span className="text-gray-400 block text-[10px]">MAS'UL SHAXS</span>
            <span className="text-white font-bold text-sm block">Bekzod Muvaffaqiyatov</span>
          </div>
          <div className="p-4 rounded-xl bg-[#13131c] border border-[#1e1e2c] space-y-1">
            <span className="text-gray-400 block text-[10px]">EMAIL ALOQA</span>
            <span className="text-white font-bold text-sm block">owner@fitzone.uz</span>
          </div>
        </div>
      </div>
    </div>
  );
}
