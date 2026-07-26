"use client";

import React, { useState } from "react";
import Link from "next/link";
import { 
  ArrowRight, Activity, Zap, TrendingUp, ShieldCheck, CheckCircle2, 
  Bot, QrCode, Building2, Users, ChevronDown, Sparkles, Award, 
  BarChart3, Dumbbell, Shield, HelpCircle, Layers, Cpu, Play
} from "lucide-react";
import InteractiveDotGrid from "@/components/ui/interactive-dot-grid";

export default function LandingPage() {
  const [membersCount, setMembersCount] = useState(450);
  const [avgFee, setAvgFee] = useState(55);
  const [activeTab, setActiveTab] = useState<"owner" | "trainer" | "member">("owner");
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const estimatedChurnedMembers = Math.round(membersCount * 0.18);
  const savedMembers = Math.round(estimatedChurnedMembers * 0.65);
  const monthlySavedRevenue = savedMembers * avgFee;

  return (
    <div className="min-h-screen bg-[#080810] text-[#EEEEE8] font-body selection:bg-[#E8FF47]/25 selection:text-black overflow-x-hidden antialiased">
      
      {/* ---------- Sticky Glass Navigation ---------- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-[#0d0d16]/85 backdrop-blur-xl border-b border-[#1e1e2c]">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-[#E8FF47] flex items-center justify-center font-display font-black text-[#080810] text-base shadow-[0_0_16px_rgba(232,255,71,0.3)]">
              R
            </div>
            <span className="font-display font-bold text-base tracking-tight text-white">Retenix.ai</span>
          </Link>

          <div className="hidden md:flex items-center gap-6 text-xs font-mono text-gray-400">
            <a href="#hero-dashboard" className="hover:text-[#E8FF47] transition-colors">Dashboard</a>
            <a href="#engine" className="hover:text-[#E8FF47] transition-colors">5-Factor Engine</a>
            <a href="#showcase" className="hover:text-[#E8FF47] transition-colors">Panellar</a>
            <a href="#pricing" className="hover:text-[#E8FF47] transition-colors">Narxlar</a>
            <a href="#roi-calculator" className="hover:text-[#E8FF47] transition-colors">Kalkulyator</a>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="hidden sm:block text-xs font-mono text-white hover:text-[#E8FF47] px-3 py-1.5 transition-colors"
            >
              Kirish
            </Link>
            <Link 
              href="/login" 
              className="bg-[#E8FF47] text-[#080810] px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,255,71,0.25)] flex items-center gap-1.5"
            >
              Demo Sinash <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ---------- Hero Section ---------- */}
      <section className="pt-32 pb-20 md:pb-24 px-6 relative overflow-hidden">
        <InteractiveDotGrid gap={28} dotRadius={1} glowRadius={200} />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-6">
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-[#13131c] border border-[#E8FF47]/30 shadow-[0_0_20px_rgba(232,255,71,0.1)]">
            <span className="w-2 h-2 rounded-full bg-[#E8FF47] animate-pulse" />
            <span className="text-[11px] font-mono text-[#E8FF47] uppercase tracking-widest">
              🔥 5-FAKTORLI AI RETENTION PLATFORMASI
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl lg:text-[3.25rem] font-display font-bold leading-[1.15] tracking-tight max-w-3xl mx-auto text-white">
            Mijozlar ketib qolishini <span className="text-[#E24B4A] underline decoration-[#E24B4A]/30">kutmang</span>.<br />
            Ularni <span className="text-[#E8FF47]">Retenix.ai</span> bilan ushlab qoling.
          </h1>

          <p className="text-gray-400 text-sm sm:text-base max-w-2xl mx-auto leading-relaxed">
            AI Churn Prediction Engine 14 kun oldin ketish xavfi bor a'zolarni aniqlaydi. Turniket QR pass, Uzbek taomlar kaloriyasi va Telegram Mini App barchasi bitta tizimda.
          </p>

          <div className="pt-4 flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/login"
              className="w-full sm:w-auto bg-[#E8FF47] hover:bg-[#d8ef37] text-[#080810] px-8 py-4 rounded-2xl font-semibold text-sm transition-all shadow-[0_0_30px_rgba(232,255,71,0.3)] flex items-center justify-center gap-2"
            >
              <span>Platformaga Kirish</span>
              <ArrowRight className="w-4 h-4" />
            </Link>

            <a
              href="#engine"
              className="w-full sm:w-auto bg-[#0d0d16] hover:bg-[#13131c] border border-[#1e1e2c] text-white px-8 py-4 rounded-2xl font-semibold text-sm transition-all flex items-center justify-center gap-2"
            >
              <span>5-Faktorli AI Motorini Ko'rish</span>
            </a>
          </div>
        </div>
      </section>

      {/* ---------- 5-Factor Churn Signal Engine ---------- */}
      <section id="engine" className="py-20 px-6 bg-[#0d0d16] border-y border-[#1e1e2c]">
        <div className="max-w-6xl mx-auto space-y-12">
          
          <div className="text-center space-y-3 max-w-2xl mx-auto">
            <span className="text-[11px] font-mono text-[#E8FF47] uppercase tracking-widest">
              CORE BIZNES LOGIKA
            </span>
            <h2 className="text-2xl sm:text-4xl font-display font-bold text-white">
              5-Faktorli Churn Signal Engine Nima?
            </h2>
            <p className="text-xs sm:text-sm text-gray-400">
              Sun'iy intellekt har bir zal a'zosining xatti-harakatini 5 ta mustaqil ko'rsatkich bo'yicha baholaydi:
            </p>
          </div>

          <div className="grid md:grid-cols-3 lg:grid-cols-5 gap-4 font-body">
            {[
              { title: "Davomat Pasayishi", weight: "35%", desc: "So'nggi 14 kunlik check-inlar oldingi davrga nisbatan taqqoslanadi", color: "#E24B4A" },
              { title: "Streak Holati", weight: "25%", desc: "Uzluksiz kunlar zanjiri uzilishi va tiklanmasligi", color: "#E8C547" },
              { title: "Faollik Pasayishi", weight: "20%", desc: "AI Chat, taom jurnali kiritish chastotasining pasayishi", color: "#7BB6E8" },
              { title: "Reja Eskirishi", weight: "10%", desc: "Mashg'ulot rejasi yangilanmaganligi va bajarilish foizi", color: "#5DCAA5" },
              { title: "Tenure Risk", weight: "10%", desc: "Dastlabki 30 kunlik yangi a'zolar uchun yuqori xavf statistikasi", color: "#E8FF47" },
            ].map((item, idx) => (
              <div key={idx} className="bg-[#13131c] border border-[#1e1e2c] p-5 rounded-2xl space-y-3 hover:border-[#E8FF47]/40 transition-all">
                <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-[#1a1a26] text-white border border-[#2a2a3a]">
                  OG'IRLIK: {item.weight}
                </span>
                <h3 className="text-base font-display font-bold text-white">{item.title}</h3>
                <p className="text-xs text-gray-400 leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>

        </div>
      </section>

      {/* ---------- Interactive ROI Calculator ---------- */}
      <section id="roi-calculator" className="py-20 px-6 max-w-5xl mx-auto">
        <div className="bg-[#0d0d16] border border-[#1e1e2c] rounded-3xl p-6 sm:p-10 space-y-8 relative overflow-hidden">
          <InteractiveDotGrid gap={20} glowRadius={150} />

          <div className="relative z-10 space-y-2 text-center max-w-xl mx-auto">
            <span className="text-[11px] font-mono text-[#5DCAA5] uppercase tracking-widest">
              ROI DAROMAD KALKULYATORI
            </span>
            <h2 className="text-2xl sm:text-3xl font-display font-bold text-white">
              Retenix Zalingizga Qancha Pul Saqlab Qoladi?
            </h2>
          </div>

          <div className="relative z-10 grid md:grid-cols-2 gap-8 items-center">
            
            {/* Sliders */}
            <div className="space-y-6 bg-[#13131c] p-6 rounded-2xl border border-[#1e1e2c]">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">JAMI A'ZOLAR SONI</span>
                  <span className="text-[#E8FF47] font-bold text-sm">{membersCount} ta</span>
                </div>
                <input
                  type="range"
                  min="50"
                  max="2000"
                  step="25"
                  value={membersCount}
                  onChange={(e) => setMembersCount(Number(e.target.value))}
                  className="w-full accent-[#E8FF47] cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-gray-400">OYLIK A'ZOLIK TO'LOVI ($)</span>
                  <span className="text-[#5DCAA5] font-bold text-sm">${avgFee} / oy</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={avgFee}
                  onChange={(e) => setAvgFee(Number(e.target.value))}
                  className="w-full accent-[#5DCAA5] cursor-pointer"
                />
              </div>
            </div>

            {/* Result Math */}
            <div className="bg-[#13131c] border border-[#E8FF47]/30 bg-[#E8FF47]/5 p-6 rounded-2xl space-y-4 text-center">
              <span className="text-xs font-mono text-gray-400 uppercase block">TAXLMINIY OYLIK SAQLANADIGAN DAROMAD</span>
              <div className="text-4xl lg:text-5xl font-display font-black text-[#E8FF47]">
                ${monthlySavedRevenue.toLocaleString()}
              </div>
              <p className="text-xs text-gray-300 font-mono">
                Oyiga tahminan <strong>{savedMembers} ta a'zo</strong> ketib qolishining oldi olinadi.
              </p>
              <Link
                href="/login"
                className="w-full bg-[#E8FF47] text-[#080810] py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2"
              >
                <span>Hoziroq Sinab Ko'rish</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

          </div>
        </div>
      </section>

      {/* ---------- Footer ---------- */}
      <footer className="py-12 border-t border-[#1e1e2c] text-center text-xs font-mono text-gray-400">
        <div className="max-w-7xl mx-auto px-6 space-y-4">
          <div className="flex items-center justify-center gap-2">
            <div className="w-6 h-6 rounded-md bg-[#E8FF47] text-[#080810] font-display font-black flex items-center justify-center text-xs">
              R
            </div>
            <span className="font-display font-bold text-sm text-white">Retenix.ai</span>
          </div>
          <p>© 2026 Retenix AI Inc. Barcha huquqlar himoyalangan.</p>
        </div>
      </footer>

    </div>
  );
}
