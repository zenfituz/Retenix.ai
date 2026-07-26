"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useParams } from "next/navigation";
import { 
  ArrowLeft, AlertTriangle, Flame, Activity, Zap, Dumbbell, 
  Send, Phone, Tag, CheckCircle2, Bot, Calendar, Clock, Trophy, MessageSquare
} from "lucide-react";

export default function MemberDetailPage() {
  const params = useParams();
  const memberId = params?.id || "1";
  const [interventionSuccess, setInterventionSuccess] = useState(false);

  const memberData = {
    id: memberId,
    name: "Jasur Toshmatov",
    phone: "+998 90 123 45 67",
    email: "jasur@fitzone.uz",
    status: "risk",
    riskScore: 85,
    streak: 0,
    xp: 940,
    rank: 4,
    trainer: "Bekzod M.",
    joined: "12 May 2026",
    plan: "VIP Unlimited (Oylik)",
    factors: [
      { name: "Davomat Pasayishi (35%)", impact: "High", desc: "So'nggi 14 kunda 0 ta check-in (oldingi davrga nisbatan -100%)" },
      { name: "Streak Uzilishi (25%)", impact: "High", desc: "14 kunlik streak uzilgan, qayta tiklanmagan" },
      { name: "Faollik Pasayishi (20%)", impact: "Mid", desc: "AI chat va taom kiritish 10 kundan beri to'xtatilgan" },
      { name: "Reja Bajarilishi (10%)", impact: "Low", desc: "Mashg'ulot plani 3 hafta oldin yangilangan" },
      { name: "A'zolik Muddati Xavfi (10%)", impact: "Mid", desc: "Dastlabki 30 kunlik eng nozik davr" },
    ]
  };

  const handleIntervention = (type: string) => {
    setInterventionSuccess(true);
    setTimeout(() => setInterventionSuccess(false), 4000);
  };

  return (
    <div className="space-y-6">
      
      {/* Back Button */}
      <Link
        href="/owner/members"
        className="inline-flex items-center gap-2 text-xs font-mono text-gray-400 hover:text-[#E8FF47] transition-colors"
      >
        <ArrowLeft className="w-4 h-4" />
        <span>A'ZOLAR RO'YXATIGA QAYTISH</span>
      </Link>

      {/* Member Profile Header Card */}
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
        <div className="flex items-center gap-4">
          <div className="w-14 h-14 rounded-2xl bg-[#1a1a26] border border-[#2a2a3a] text-[#E8FF47] font-bold text-2xl flex items-center justify-center font-display shadow-[0_0_20px_rgba(232,255,71,0.15)]">
            {memberData.name.charAt(0)}
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-2xl font-display font-bold text-white">{memberData.name}</h1>
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-mono font-semibold bg-[#E24B4A]/15 text-[#E24B4A] border border-[#E24B4A]/30">
                85% CHURN XAVFI
              </span>
            </div>
            <p className="text-xs text-gray-400 font-mono mt-1">
              Tel: {memberData.phone} · Trener: {memberData.trainer} · Reja: {memberData.plan}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => handleIntervention("telegram")}
            className="bg-[#2AABEE]/10 border border-[#2AABEE]/30 text-[#2AABEE] hover:bg-[#2AABEE]/20 px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all"
          >
            <Send className="w-4 h-4" />
            <span>Telegram Xabar</span>
          </button>
          <button
            onClick={() => handleIntervention("discount")}
            className="bg-[#E8FF47] text-[#080810] hover:bg-[#d8ef37] px-3.5 py-2 rounded-xl text-xs font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(232,255,71,0.2)]"
          >
            <Tag className="w-4 h-4" />
            <span>Chegirma Taklifi</span>
          </button>
        </div>
      </div>

      {interventionSuccess && (
        <div className="p-4 rounded-xl bg-[#5DCAA5]/10 border border-[#5DCAA5]/30 text-[#5DCAA5] text-xs font-medium flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" />
          <span>Interventsiya qayd etildi! Signal Guarantee datasetiga saqlandi.</span>
        </div>
      )}

      {/* 5-Factor AI Breakdown */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        <div className="lg:col-span-8 bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <Bot className="w-5 h-5 text-[#E8FF47]" />
            <span>5-Faktorli AI Churn Nima Uchun Yuqori?</span>
          </h2>

          <div className="space-y-3">
            {memberData.factors.map((f, idx) => (
              <div key={idx} className="p-4 rounded-xl bg-[#13131c] border border-[#1e1e2c] space-y-1">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-semibold text-white">{f.name}</span>
                  <span className={`text-[10px] font-mono font-semibold px-2 py-0.5 rounded-full ${
                    f.impact === "High" ? "bg-[#E24B4A]/15 text-[#E24B4A]" : "bg-[#E8C547]/15 text-[#E8C547]"
                  }`}>
                    {f.impact} Ta'sir
                  </span>
                </div>
                <p className="text-xs text-gray-400 leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Member Stats & Gamification Summary */}
        <div className="lg:col-span-4 bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-display font-bold text-white">Gamifikatsiya & Ballar</h2>

          <div className="space-y-3 font-mono text-xs">
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#13131c] border border-[#1e1e2c]">
              <span className="text-gray-400">🔥 Current Streak</span>
              <span className="text-white font-bold">{memberData.streak} kun</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#13131c] border border-[#1e1e2c]">
              <span className="text-gray-400">⚡ Jami XP</span>
              <span className="text-[#E8FF47] font-bold">{memberData.xp} XP</span>
            </div>
            <div className="flex items-center justify-between p-3 rounded-xl bg-[#13131c] border border-[#1e1e2c]">
              <span className="text-gray-400">🏆 Gym Rank</span>
              <span className="text-[#7BB6E8] font-bold">#{memberData.rank} o'rin</span>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
}
