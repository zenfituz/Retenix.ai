"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Activity, Zap, TrendingUp, ShieldCheck, CheckCircle2, 
  Bot, QrCode, Building2, Users, ChevronDown, Sparkles, Star, Award, 
  BarChart3, Dumbbell, Shield, HelpCircle, Layers, Cpu, Play, Bell, AlertTriangle, ArrowUpRight, Flame, Smartphone
} from "lucide-react";

export default function LandingPage() {
  // Calculator State
  const [membersCount, setMembersCount] = useState(450);
  const [avgFee, setAvgFee] = useState(55);

  // Role Preview State (Owner, Trainer, Member - SuperAdmin removed per request)
  const [activeTab, setActiveTab] = useState<"owner" | "trainer" | "member">("owner");

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ROI Math
  const estimatedChurnedMembers = Math.round(membersCount * 0.18);
  const savedMembers = Math.round(estimatedChurnedMembers * 0.65);
  const monthlySavedRevenue = savedMembers * avgFee;

  return (
    <div className="min-h-screen bg-bg text-text-hi font-body selection:bg-accent/25 selection:text-bg overflow-x-hidden">
      {/* ---------- Sticky Glass Navigation ---------- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-2.5">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center font-display font-black text-bg text-base shadow-[0_0_16px_rgba(232,255,71,0.3)]">
              R
            </div>
            <span className="font-display font-bold text-lg tracking-tight text-text-hi">Retenix AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-7 text-xs font-mono text-text-mid">
            <a href="#hero-dashboard" className="hover:text-accent transition-colors">Dashboard</a>
            <a href="#engine" className="hover:text-accent transition-colors">5-Factor Engine</a>
            <a href="#showcase" className="hover:text-accent transition-colors">Panellar</a>
            <a href="#roi-calculator" className="hover:text-accent transition-colors">Kalkulyator</a>
            <Link href="/features" className="hover:text-accent transition-colors">Imkoniyatlar</Link>
            <Link href="/pricing" className="hover:text-accent transition-colors">Narxlar</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="hidden sm:block text-xs font-mono text-text-hi hover:text-accent px-3 py-1.5 transition-colors"
            >
              Kirish
            </Link>
            <Link 
              href="/login" 
              className="bg-accent text-bg px-4 py-2 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,255,71,0.25)] flex items-center gap-1.5"
            >
              Demo Sinash <ArrowRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ---------- Halsa-Inspired Hero Section ---------- */}
      <section className="pt-28 pb-20 px-6 relative overflow-hidden">
        {/* Ambient Glows */}
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[450px] bg-accent/8 rounded-full blur-[150px] pointer-events-none" />
        <div className="absolute top-20 right-10 w-[300px] h-[300px] bg-info/10 rounded-full blur-[130px] pointer-events-none" />

        <div className="max-w-6xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="space-y-4"
          >
            {/* Pill Badge */}
            <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-2 border border-accent/30 shadow-[0_0_20px_rgba(232,255,71,0.1)]">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-[11px] font-mono text-accent uppercase tracking-widest">
                5-FACTOR CHURN PREDICTION ENGINE 2.0
              </span>
            </div>

            {/* Headline */}
            <h1 className="text-3xl sm:text-5xl lg:text-6xl font-display font-bold leading-[1.15] tracking-tight max-w-4xl mx-auto">
              Mijozlar ketib qolishini <span className="text-bad underline decoration-bad/30">kutmang</span>.<br />
              Ularni <span className="text-accent">sun'iy intellekt</span> bilan ushlab qoling.
            </h1>

            <p className="text-xs sm:text-sm text-text-dim max-w-2xl mx-auto leading-relaxed font-body">
              Retenix platformasi fitness zal a'zolarining kelish grafigi, streak uzilishi, ovqatlanish jurnali va to'lovlar tarixini tahlil qilib, mijoz ketib qolishini (churn) 14 kun oldindan aniq prognoz qiladi.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 pt-2">
              <Link 
                href="/login" 
                className="w-full sm:w-auto bg-accent text-bg px-6 py-3 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(232,255,71,0.25)] flex items-center justify-center gap-2 cursor-pointer"
              >
                14-Kunlik Sinovni Boshlash <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="#hero-dashboard"
                className="w-full sm:w-auto bg-surface border border-border text-text-hi px-6 py-3 rounded-xl text-xs font-semibold hover:bg-surface-2 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-3.5 h-3.5 text-accent fill-accent" /> Platforma Demoni Ko'rish
              </a>
            </div>
          </motion.div>

          {/* ---------- Halsa-Style Realistic Interactive Dashboard Showcase ---------- */}
          <motion.div 
            id="hero-dashboard"
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="pt-8 relative mx-auto max-w-5xl"
          >
            <div className="rounded-3xl border border-accent/20 bg-surface/90 p-2.5 backdrop-blur-2xl shadow-[0_0_60px_rgba(0,0,0,0.9)] relative">
              <div className="rounded-2xl border border-border bg-[#0a0a14] overflow-hidden text-left shadow-2xl">
                
                {/* Top Window Navigation Bar */}
                <div className="bg-surface border-b border-border px-4 py-3 flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full bg-bad/80" />
                    <div className="w-3 h-3 rounded-full bg-warn/80" />
                    <div className="w-3 h-3 rounded-full bg-good/80" />
                    <span className="text-[11px] font-mono text-text-dim ml-3 hidden sm:inline">
                      https://app.retenix.ai/owner/dashboard
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-[10px]">
                      <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                      450 Ta A'zo Kuzatuvda
                    </div>
                    <div className="w-7 h-7 rounded-lg bg-surface-2 border border-border flex items-center justify-center text-text-mid">
                      <Bell className="w-3.5 h-3.5 text-accent" />
                    </div>
                  </div>
                </div>

                {/* Dashboard Main Grid Area */}
                <div className="p-5 space-y-5">
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    <div className="p-3.5 rounded-xl bg-surface border border-border">
                      <div className="text-[10px] font-mono text-text-dim uppercase">RETENTION DARAJASI</div>
                      <div className="text-xl font-display font-bold text-good mt-1">92.4%</div>
                      <div className="text-[9px] font-mono text-good mt-0.5">+2.1% bu oy</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-surface border border-border">
                      <div className="text-[10px] font-mono text-text-dim uppercase">CHURN RISK XAVFI</div>
                      <div className="text-xl font-display font-bold text-bad mt-1">14 ta mijoz</div>
                      <div className="text-[9px] font-mono text-bad mt-0.5">Xavf bali {'>'} 75%</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-surface border border-border">
                      <div className="text-[10px] font-mono text-text-dim uppercase">SAQLANGAN MRR</div>
                      <div className="text-xl font-display font-bold text-accent mt-1">$2,450</div>
                      <div className="text-[9px] font-mono text-accent mt-0.5">Retenix AI sharofati bilan</div>
                    </div>

                    <div className="p-3.5 rounded-xl bg-surface border border-border">
                      <div className="text-[10px] font-mono text-text-dim uppercase">BUGUN FAOL A'ZOLAR</div>
                      <div className="text-xl font-display font-bold text-text-hi mt-1">187 ta</div>
                      <div className="text-[9px] font-mono text-text-dim mt-0.5">Turniket pass</div>
                    </div>
                  </div>

                  <div className="grid md:grid-cols-7 gap-4">
                    <div className="md:col-span-4 p-4 rounded-xl bg-surface border border-border space-y-3">
                      <div className="flex items-center justify-between pb-2 border-b border-border">
                        <div className="text-xs font-display font-bold text-text-hi flex items-center gap-2">
                          <AlertTriangle className="w-3.5 h-3.5 text-bad" /> Yuqori Churn Xavfidagi Mijozlar
                        </div>
                        <span className="text-[10px] font-mono text-accent">AI Auto-Detect</span>
                      </div>

                      <div className="space-y-2">
                        {[
                          { name: "Doniyor Raxmonov", risk: "85%", reason: "14 kundan beri kelmadi • Streak uzildi", trainer: "Coach Aziz" },
                          { name: "Sevara Qodirova", risk: "78%", reason: "Ovqat kiritish to'xtadi • To'lov kechikmoqda", trainer: "Coach Dilshod" },
                          { name: "Mohira Aliyeva", risk: "64%", reason: "Haftalik kelish 3x -> 1x ga tushdi", trainer: "Coach Aziz" },
                        ].map((m, idx) => (
                          <div key={idx} className="p-2.5 rounded-lg bg-surface-2 border border-border-2 flex items-center justify-between gap-2">
                            <div>
                              <div className="text-xs font-semibold text-text-hi">{m.name}</div>
                              <div className="text-[10px] text-text-dim font-mono mt-0.5">{m.reason}</div>
                            </div>
                            <div className="text-right shrink-0">
                              <span className="px-2 py-0.5 rounded bg-bad/10 border border-bad/30 text-bad font-mono text-[10px] font-bold">
                                {m.risk} Risk
                              </span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>

                    <div className="md:col-span-3 p-4 rounded-xl bg-surface-2 border border-accent/30 space-y-3 relative overflow-hidden">
                      <div className="flex items-center gap-2 text-xs font-display font-bold text-accent">
                        <Bot className="w-4 h-4 text-accent" /> Retenix AI Copilot
                      </div>
                      <p className="text-[11px] text-text-dim leading-relaxed">
                        "Doniyor Raxmonov ketish xavfi 85%. Unga 20% chegirmali murabbiy seansi taklif qilish tavsiya etiladi."
                      </p>
                      <button className="w-full py-2 bg-accent text-bg font-semibold rounded-lg text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_15px_rgba(232,255,71,0.2)]">
                        Proaktiv Xabar Yuborish
                      </button>
                    </div>
                  </div>
                </div>

              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Evotrack-Style Metric Banner ---------- */}
      <section className="py-10 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-6 text-center">
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold text-accent">412+</div>
            <div className="text-[11px] font-mono text-text-dim mt-0.5">Faol Hamkor Zallar</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold text-good">34,000+</div>
            <div className="text-[11px] font-mono text-text-dim mt-0.5">Kuzatuvdagi A'zolar</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold text-info">94.8%</div>
            <div className="text-[11px] font-mono text-text-dim mt-0.5">AI Churn Aniqligi</div>
          </div>
          <div>
            <div className="text-2xl md:text-3xl font-display font-bold text-warn">$18.4K</div>
            <div className="text-[11px] font-mono text-text-dim mt-0.5">Oylik Saqlangan MRR</div>
          </div>
        </div>
      </section>

      {/* ---------- 5-Factor Churn Signal Engine Section ---------- */}
      <section id="engine" className="py-20 px-6 relative">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-[11px]">
              AI CHURN SIGNAL ALGORITHM
            </span>
            <h2 className="text-2xl md:text-4xl font-display font-bold">
              Retenix 5-Faktorli Tahlil Dvigateli
            </h2>
            <p className="text-text-dim text-xs leading-relaxed">
              Har bir a'zoning xulq-atvori 5 ta alohida faktor bo'yicha doimiy skanerlanadi va zudlik bilan murabbiylarga xabar beriladi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                step: "01",
                title: "Attendance Decline (Davomad)",
                desc: "So'nggi 14 kunlik kelish chastotasi a'zoning 60 kunlik o'rtacha ko'rsatkichi bilan solishtiriladi.",
                icon: Activity,
                color: "text-bad"
              },
              {
                step: "02",
                title: "Streak Broken (Olov Uzilishi)",
                desc: "Ketma-ket 3+ hafta davomida o'rnatilgan trenirovka odatlari va streak ko'rsatkichi to'satdan to'xtashi.",
                icon: TrendingUp,
                color: "text-warn"
              },
              {
                step: "03",
                title: "Class & App Engagement",
                desc: "Ovqatlanish jurnali va Telegram Mini App-da trenirovka rejalarini belgilash faolligi pasayishi.",
                icon: Zap,
                color: "text-accent"
              },
              {
                step: "04",
                title: "Plan Staleness (Tarif Eskirishi)",
                desc: "A'zoning bir xil tarifda o'zgarishsiz uzoq qolishi va yangi maqsadlar belgilamasligi.",
                icon: ShieldCheck,
                color: "text-good"
              },
              {
                step: "05",
                title: "Payment Delay Signals",
                desc: "Oylik obuna to'lovining kechikishi va to'lov turlari o'zgarishi alomatlari.",
                icon: Layers,
                color: "text-info"
              },
              {
                step: "AI",
                title: "Proaktiv AI Copilot Prompt",
                desc: "Tizim avtomatik ravishda murabbiyga mijozni qaytarish bo'yicha maxsus chegirma yoki qo'ng'iroq matnini tayyorlab beradi.",
                icon: Bot,
                color: "text-accent"
              }
            ].map((f, i) => (
              <div 
                key={i}
                className="p-6 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all space-y-3 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-10 h-10 rounded-xl bg-surface-2 border border-border flex items-center justify-center ${f.color}`}>
                    <f.icon className="w-5 h-5" />
                  </div>
                  <span className="font-mono text-xs font-bold text-text-dim group-hover:text-accent transition-colors">
                    {f.step}
                  </span>
                </div>
                <h3 className="text-base font-display font-bold text-text-hi">{f.title}</h3>
                <p className="text-text-dim text-xs leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Interactive Role Showcase (Dual Render Tabs) ---------- */}
      <section id="showcase" className="py-20 bg-surface border-y border-border px-6">
        <div className="max-w-7xl mx-auto space-y-10">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <h2 className="text-2xl md:text-4xl font-display font-bold">
              Har Bir Rol Uchun Shaxsiy Panellar
            </h2>
            <p className="text-text-dim text-xs">
              Platforma Gym Owner, Murabbiy va A'zolar uchun alohida interfeyslarni taqdim etadi.
            </p>

            {/* Role Tabs (Owner, Trainer, Member - SuperAdmin removed) */}
            <div className="flex flex-wrap justify-center gap-2 pt-2">
              {[
                { id: "owner", label: "🏢 Gym Owner Dashboard" },
                { id: "trainer", label: "🏋️ Trainer Dashboard" },
                { id: "member", label: "📱 Member Telegram App (Mobile)" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-4 py-2 rounded-xl text-xs font-mono transition-all cursor-pointer ${
                    activeTab === tab.id
                      ? "bg-accent text-bg font-bold shadow-[0_0_20px_rgba(232,255,71,0.25)]"
                      : "bg-surface-2 text-text-mid border border-border hover:text-text-hi"
                  }`}
                >
                  {tab.label}
                </button>
              ))}
            </div>
          </div>

          {/* Role Screen Demo Preview */}
          <div className="p-6 md:p-8 rounded-2xl bg-bg border border-border space-y-6 min-h-[360px] flex flex-col justify-center">
            {activeTab === "owner" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-hi">Gym Owner Dashboard</h3>
                    <p className="text-xs text-text-dim">Real-vaqt retention darajasi, billing va murabbiylar samaradorligi</p>
                  </div>
                  <Link href="/owner/dashboard" className="px-3.5 py-1.5 bg-accent text-bg text-xs font-semibold rounded-xl">
                    Owner Paneliga Kirish
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                  <div className="p-3.5 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">JAMI A'ZOLAR</div>
                    <div className="text-xl font-display font-bold text-accent">2,350 ta</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">RETENTION RATE</div>
                    <div className="text-xl font-display font-bold text-good">92.4%</div>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">CHURN RISK</div>
                    <div className="text-xl font-display font-bold text-bad">143 ta</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "trainer" && (
              <div className="space-y-4">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-xl font-display font-bold text-text-hi">Trainer Dashboard</h3>
                    <p className="text-xs text-text-dim">Bugungi mijozlar seansi, jadval va xavf ostidagi a'zolar</p>
                  </div>
                  <Link href="/trainer/dashboard" className="px-3.5 py-1.5 bg-accent text-bg text-xs font-semibold rounded-xl">
                    Trainer Paneliga Kirish
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                  <div className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-text-hi">Jasur Toshmatov</div>
                      <div className="text-[10px] text-text-dim font-mono">Personal Training • 15:00</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-good/10 text-good text-[10px] font-mono font-bold">Faol</span>
                  </div>
                  <div className="p-3.5 rounded-xl bg-surface border border-border flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-text-hi">Doniyor Raxmonov</div>
                      <div className="text-[10px] text-text-dim font-mono">14 kundan beri kelmadi</div>
                    </div>
                    <span className="px-2 py-0.5 rounded bg-bad/10 text-bad text-[10px] font-mono font-bold">Risk Alert</span>
                  </div>
                </div>
              </div>
            )}

            {/* MEMBER MOBILE SMARTPHONE FRAME DEMO */}
            {activeTab === "member" && (
              <div className="flex flex-col md:flex-row items-center justify-center gap-8 py-2">
                {/* Mobile Phone Mockup */}
                <div className="w-[280px] h-[480px] rounded-[36px] bg-[#050508] border-4 border-border shadow-[0_0_40px_rgba(232,255,71,0.15)] p-3 relative flex flex-col justify-between shrink-0">
                  {/* Phone Notch */}
                  <div className="w-24 h-4 rounded-full bg-border mx-auto mb-3" />

                  {/* App Screen Inside Phone */}
                  <div className="flex-1 bg-surface rounded-[24px] border border-border p-4 space-y-4 text-left overflow-y-auto">
                    <div className="flex items-center justify-between">
                      <div>
                        <span className="text-[9px] font-mono text-text-dim">MEMBER PASS</span>
                        <div className="text-xs font-bold text-text-hi">Jasur Toshmatov</div>
                      </div>
                      <span className="text-[9px] font-mono text-accent bg-accent/10 px-2 py-0.5 rounded-full border border-accent/20">
                        Pro A'zo
                      </span>
                    </div>

                    {/* QR Code Pass Box */}
                    <div className="p-3 rounded-xl bg-surface-2 border border-accent/30 text-center space-y-2">
                      <div className="w-24 h-24 bg-white rounded-lg p-1.5 mx-auto flex items-center justify-center">
                        <QrCode className="w-full h-full text-black" />
                      </div>
                      <div className="text-[9px] font-mono text-accent">● Turniket Check-in Pass</div>
                    </div>

                    {/* Streaks & XP */}
                    <div className="grid grid-cols-2 gap-2 text-center">
                      <div className="p-2 rounded-lg bg-surface-2 border border-border">
                        <div className="text-xs font-bold text-text-hi">🔥 14 kun</div>
                        <div className="text-[8px] font-mono text-text-dim">Streak</div>
                      </div>
                      <div className="p-2 rounded-lg bg-surface-2 border border-border">
                        <div className="text-xs font-bold text-accent">2,340 XP</div>
                        <div className="text-[8px] font-mono text-text-dim">Reyting #2</div>
                      </div>
                    </div>
                  </div>

                  {/* Phone Home Indicator */}
                  <div className="w-20 h-1 rounded-full bg-border mx-auto mt-2" />
                </div>

                {/* Info Text */}
                <div className="space-y-4 max-w-sm text-center md:text-left">
                  <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-mono text-[10px]">
                    TELEGRAM MINI APP DEMO
                  </span>
                  <h4 className="text-xl font-display font-bold text-text-hi">A'zolar Uchun Mobil Ilovasiz Turniket Pass</h4>
                  <p className="text-xs text-text-dim leading-relaxed">
                    A me'zolar hech qanday alohida ilova o'rnatishi shart emas. Telegram Mini App orqali turniket pass kodi, mashqlar jadvali va ovqatlanish jurnali darhol ochiladi.
                  </p>
                  <Link 
                    href="/member" 
                    className="inline-flex items-center gap-2 px-5 py-2.5 bg-accent text-bg text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(232,255,71,0.2)]"
                  >
                    Member App Demoni Ochish <ArrowRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Interactive ROI & Revenue Savings Calculator ---------- */}
      <section id="roi-calculator" className="py-20 px-6 relative">
        <div className="max-w-4xl mx-auto bg-surface border border-border rounded-2xl p-6 md:p-10 space-y-6 shadow-2xl">
          <div className="text-center max-w-xl mx-auto space-y-2">
            <span className="px-3 py-1 rounded-full bg-accent/10 text-accent font-mono text-[11px]">
              INTERAKTIV DAROMAD KALKULYATORI
            </span>
            <h2 className="text-2xl md:text-3xl font-display font-bold">
              Retenix Zalingizga Qancha Daromad Olib Keladi?
            </h2>
            <p className="text-text-dim text-xs">
              Zalingizdagi a'zolar soni va oylik a'zolik narxini suring:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-6 items-center">
            {/* Sliders */}
            <div className="space-y-5 bg-surface-2 p-5 rounded-xl border border-border">
              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-text-dim">Zaldagi A'zolar Soni:</span>
                  <span className="text-accent font-bold">{membersCount} ta a'zo</span>
                </div>
                <input
                  type="range"
                  min="100"
                  max="2000"
                  step="50"
                  value={membersCount}
                  onChange={(e) => setMembersCount(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer"
                />
              </div>

              <div className="space-y-2">
                <div className="flex justify-between text-xs font-mono">
                  <span className="text-text-dim">O'rtacha Oylik Abonent To'lovi:</span>
                  <span className="text-accent font-bold">${avgFee} / oy</span>
                </div>
                <input
                  type="range"
                  min="20"
                  max="200"
                  step="5"
                  value={avgFee}
                  onChange={(e) => setAvgFee(Number(e.target.value))}
                  className="w-full accent-accent cursor-pointer"
                />
              </div>
            </div>

            {/* Results */}
            <div className="p-5 rounded-xl bg-accent/10 border border-accent/30 space-y-3 text-center">
              <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider">
                OYLIK SAQLAB QOLINADIGAN QO'SHIMCHA DAROMAD:
              </div>
              <div className="text-3xl md:text-4xl font-display font-bold text-accent">
                +${monthlySavedRevenue.toLocaleString()} <span className="text-xs font-normal text-text-dim">/oy</span>
              </div>
              <div className="text-xs text-text-mid font-mono border-t border-accent/20 pt-2.5">
                Retenix har oy o'rtacha <span className="text-good font-bold">{savedMembers} ta a'zongizni</span> zalni tark etishidan saqlab qoladi.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ Accordion ---------- */}
      <section className="py-20 bg-surface border-t border-border px-6">
        <div className="max-w-3xl mx-auto space-y-8">
          <div className="text-center space-y-2">
            <h2 className="text-2xl md:text-3xl font-display font-bold">Keng Tarqalgan Savollar (FAQ)</h2>
            <p className="text-text-dim text-xs">Retenix AI platformasi bo'yicha ko'p beriladigan savollar</p>
          </div>

          <div className="space-y-3">
            {[
              {
                q: "Retenix mavjud zallarga qanday integratsiya qilinadi?",
                a: "Retenix loyihangizdagi Excel/CSV ro'yxatlarni bir zumda import qiladi va Telegram Mini App bilan 10 daqiqada ulanadi."
              },
              {
                q: "5-factor Churn engine aniqligi qanday kafolatlanadi?",
                a: "Bizning algoritmimiz 400 dan ortiq zallar va 34,000 dan ziyod mijozlar ma'lumotlarida o'qitilgan bo'lib, 94.8% aniqlik bilan churn xavfini ko'rsatadi."
              },
              {
                q: "A'zolar telefoniga yangi ilova yuklab olishi shartmi?",
                a: "Yo'q! A'zolar to'g'ridan-to'g'ri Telegram Mini App orqali ilovasiz foydalanishadi."
              },
              {
                q: "14 kunlik bepul sinov davrida to'lov kartasi so'raladimi?",
                a: "Yo'q, 14 kunlik sinov davrida hech qanday to'lov kartasi so'ralmaydi."
              }
            ].map((item, idx) => (
              <div key={idx} className="rounded-xl bg-surface-2 border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-4 text-left font-display font-bold text-xs text-text-hi flex items-center justify-between cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-accent transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-4 pt-0 text-[11px] text-text-dim leading-relaxed border-t border-border-2">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="py-20 relative overflow-hidden text-center px-6">
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
        <div className="max-w-3xl mx-auto space-y-4 relative z-10">
          <h2 className="text-3xl md:text-4xl font-display font-bold">
            Bugunoq Zalingiz Retention Darajasini Oshiring
          </h2>
          <p className="text-text-dim text-xs max-w-md mx-auto">
            Retenix AI platformasi bilan zalingiz daromadini oshiring va mijozlar ketib qolishining oldini oling.
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 bg-accent text-bg px-8 py-3.5 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity shadow-[0_0_35px_rgba(232,255,71,0.3)] cursor-pointer"
          >
            14-Kunlik Bepul Sinovni Boshlash <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ---------- Glass Footer ---------- */}
      <footer className="border-t border-border bg-surface py-10 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <div className="w-5 h-5 rounded border border-accent/50 flex items-center justify-center font-display font-bold text-accent text-[10px]">
              R
            </div>
            <span className="font-display font-bold text-xs text-text-hi">Retenix AI Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-5 text-xs text-text-dim font-mono">
            <Link href="/features" className="hover:text-accent">Imkoniyatlar</Link>
            <Link href="/pricing" className="hover:text-accent">Narxlar</Link>
            <Link href="/about" className="hover:text-accent">Biz Haqimizda</Link>
            <Link href="/contact" className="hover:text-accent">Bog'lanish</Link>
          </div>

          <div className="text-[11px] text-text-dim font-mono">
            © {new Date().getFullYear()} Retenix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
