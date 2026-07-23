"use client";

import React, { useState } from "react";
import Link from "next/link";
import { motion, AnimatePresence } from "framer-motion";
import { 
  ArrowRight, Activity, Zap, TrendingUp, ShieldCheck, CheckCircle2, 
  Bot, QrCode, Building2, Users, ChevronDown, Sparkles, Star, Award, 
  BarChart3, Dumbbell, Shield, HelpCircle, Layers, Cpu, Play
} from "lucide-react";

export default function LandingPage() {
  // Calculator State
  const [membersCount, setMembersCount] = useState(450);
  const [avgFee, setAvgFee] = useState(55);

  // Role Preview State
  const [activeTab, setActiveTab] = useState<"owner" | "trainer" | "member" | "superadmin">("owner");

  // FAQ State
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  // ROI Math
  const estimatedChurnedMembers = Math.round(membersCount * 0.18); // 18% avg churn
  const savedMembers = Math.round(estimatedChurnedMembers * 0.65); // 65% saved via Retenix
  const monthlySavedRevenue = savedMembers * avgFee;

  return (
    <div className="min-h-screen bg-bg text-text-hi font-body selection:bg-accent/25 selection:text-bg overflow-x-hidden">
      {/* ---------- Sticky Glass Navigation ---------- */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/85 backdrop-blur-xl border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center font-display font-black text-bg text-lg shadow-[0_0_20px_rgba(232,255,71,0.3)]">
              R
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-text-hi">Retenix AI</span>
          </Link>

          <div className="hidden md:flex items-center gap-8 text-xs font-mono text-text-mid">
            <a href="#engine" className="hover:text-accent transition-colors">5-Factor Engine</a>
            <a href="#showcase" className="hover:text-accent transition-colors">Platforma</a>
            <a href="#roi-calculator" className="hover:text-accent transition-colors">Kalkulyator</a>
            <Link href="/features" className="hover:text-accent transition-colors">Imkoniyatlar</Link>
            <Link href="/pricing" className="hover:text-accent transition-colors">Narxlar</Link>
            <Link href="/about" className="hover:text-accent transition-colors">Biz Haqimizda</Link>
          </div>

          <div className="flex items-center gap-3">
            <Link 
              href="/login" 
              className="hidden sm:block text-xs font-mono text-text-hi hover:text-accent px-3 py-2 transition-colors"
            >
              Kirish
            </Link>
            <Link 
              href="/login" 
              className="bg-accent text-bg px-5 py-2.5 rounded-xl text-xs font-semibold hover:opacity-90 transition-opacity shadow-[0_0_25px_rgba(232,255,71,0.25)] flex items-center gap-2"
            >
              Demo Sinash <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>
      </nav>

      {/* ---------- Hero Section (Modern Parallax & Animations) ---------- */}
      <section className="pt-40 pb-24 px-6 relative overflow-hidden">
        {/* Background Glow Orbs */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[800px] h-[500px] bg-accent/10 rounded-full blur-[160px] pointer-events-none" />
        <div className="absolute top-10 right-10 w-[350px] h-[350px] bg-info/10 rounded-full blur-[140px] pointer-events-none" />

        <div className="max-w-5xl mx-auto text-center relative z-10 space-y-8">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="space-y-6"
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface-2 border border-accent/30 shadow-[0_0_20px_rgba(232,255,71,0.1)]">
              <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono text-accent uppercase tracking-widest">
                5-Factor Churn Prediction Engine 2.0
              </span>
            </div>

            <h1 className="text-5xl md:text-7xl font-display font-bold leading-[1.1] tracking-tight">
              Mijozlar qachon ketishini <span className="text-bad underline decoration-bad/40">kutmang</span>.<br />
              Ularni <span className="text-accent">sun'iy intellekt</span> bilan ushlab qoling.
            </h1>

            <p className="text-base md:text-xl text-text-dim max-w-3xl mx-auto leading-relaxed font-body">
              Retenix platformasi fitness zal a'zolarining kelish grafigi, streak uzilishi, ovqatlanish jurnali va to'lovlar tarixini 5 faktor bo'yicha tahlil qilib, mijoz ketib qolishini (churn) 14 kun oldindan bashorat qiladi.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4">
              <Link 
                href="/login" 
                className="w-full sm:w-auto bg-accent text-bg px-8 py-4 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_35px_rgba(232,255,71,0.3)] flex items-center justify-center gap-2 cursor-pointer"
              >
                14-Kunlik Sinovni Boshlash <ArrowRight className="w-4 h-4" />
              </Link>
              <a 
                href="#showcase"
                className="w-full sm:w-auto bg-surface border border-border text-text-hi px-8 py-4 rounded-xl text-sm font-semibold hover:bg-surface-2 transition-colors flex items-center justify-center gap-2"
              >
                <Play className="w-4 h-4 text-accent fill-accent" /> Platforma Demoni Ko'rish
              </a>
            </div>
          </motion.div>

          {/* Hero Live Mockup Showcase */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="pt-12 relative mx-auto max-w-5xl"
          >
            <div className="rounded-3xl border border-accent/30 bg-surface/90 p-3 backdrop-blur-2xl shadow-[0_0_50px_rgba(0,0,0,0.8)] relative">
              <div className="rounded-2xl border border-border bg-surface-2 overflow-hidden space-y-4 p-6">
                {/* Header bar of mockup */}
                <div className="flex items-center justify-between pb-4 border-b border-border text-xs font-mono">
                  <div className="flex items-center gap-2 text-accent font-bold">
                    <span className="w-2.5 h-2.5 rounded-full bg-accent animate-ping" />
                    LIVE REAL-TIME CHURN MONITORING
                  </div>
                  <div className="text-text-dim">FitZone Gym Yunusobod • 450 ta a'zo</div>
                </div>

                {/* Key stats inside mockup */}
                <div className="grid grid-cols-1 sm:grid-cols-4 gap-4">
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">O'RTACHA RETENTION</div>
                    <div className="text-2xl font-display font-bold text-good mt-1">92.4%</div>
                    <div className="text-[10px] font-mono text-good mt-0.5">+2.1% bu oy</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">CHURN RISK XAVFI</div>
                    <div className="text-2xl font-display font-bold text-bad mt-1">14 ta mijoz</div>
                    <div className="text-[10px] font-mono text-bad mt-0.5">Xavf darajasi {'>'} 75%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">SAQLAB QOLINGAN MRR</div>
                    <div className="text-2xl font-display font-bold text-accent mt-1">$2,450</div>
                    <div className="text-[10px] font-mono text-accent mt-0.5">Retenix AI sharofati bilan</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">BUGUN FAOL A'ZOLAR</div>
                    <div className="text-2xl font-display font-bold text-text-hi mt-1">187 ta</div>
                    <div className="text-[10px] font-mono text-text-dim mt-0.5">Turniket check-in</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* ---------- Stats Banner ---------- */}
      <section className="py-12 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6 grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-accent">412+</div>
            <div className="text-xs font-mono text-text-dim mt-1">Faol Hamkor Zallar</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-good">34,000+</div>
            <div className="text-xs font-mono text-text-dim mt-1">Kuzatuvdagi A'zolar</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-info">94.8%</div>
            <div className="text-xs font-mono text-text-dim mt-1">AI Churn Aniqligi</div>
          </div>
          <div>
            <div className="text-3xl md:text-4xl font-display font-bold text-warn">$18.4K</div>
            <div className="text-xs font-mono text-text-dim mt-1">Oylik Saqlangan MRR</div>
          </div>
        </div>
      </section>

      {/* ---------- 5-Factor Churn Signal Engine Section ---------- */}
      <section id="engine" className="py-24 px-6 relative">
        <div className="max-w-7xl mx-auto space-y-16">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <span className="px-3.5 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs">
              AI CHURN SIGNAL ALGORITHM
            </span>
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Retenix 5-Faktorli Tahlil Dvigateli
            </h2>
            <p className="text-text-dim text-base">
              Har bir a'zoning xulq-atvori 5 ta alohida faktor bo'yicha doimiy skanerlanadi va zudlik bilan murabbiylarga xabar beriladi.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
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
                className="p-8 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all space-y-4 relative group"
              >
                <div className="flex items-center justify-between">
                  <div className={`w-12 h-12 rounded-xl bg-surface-2 border border-border flex items-center justify-center ${f.color}`}>
                    <f.icon className="w-6 h-6" />
                  </div>
                  <span className="font-mono text-xs font-bold text-text-dim group-hover:text-accent transition-colors">
                    {f.step}
                  </span>
                </div>
                <h3 className="text-xl font-display font-bold text-text-hi">{f.title}</h3>
                <p className="text-text-dim text-sm leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Interactive Role Showcase (Dual Render Tabs) ---------- */}
      <section id="showcase" className="py-24 bg-surface border-y border-border px-6">
        <div className="max-w-7xl mx-auto space-y-12">
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <h2 className="text-3xl md:text-5xl font-display font-bold">
              Har Bir Rol Uchun Shaxsiy Panellar
            </h2>
            <p className="text-text-dim text-sm">
              Platforma Gym Owner, Murabbiy, A'zolar va SuperAdmin uchun alohida optimal interfeyslarni taqdim etadi.
            </p>

            {/* Role Tabs */}
            <div className="flex flex-wrap justify-center gap-2 pt-4">
              {[
                { id: "owner", label: "🏢 Gym Owner View" },
                { id: "trainer", label: "🏋️ Trainer View" },
                { id: "member", label: "🧑 Member Telegram Mini App" },
                { id: "superadmin", label: "🛡️ SuperAdmin Global View" },
              ].map((tab) => (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as any)}
                  className={`px-5 py-2.5 rounded-xl text-xs font-mono transition-all cursor-pointer ${
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
          <div className="p-6 md:p-10 rounded-3xl bg-bg border border-border space-y-6 min-h-[360px] flex flex-col justify-center">
            {activeTab === "owner" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-text-hi">Gym Owner Dashboard</h3>
                    <p className="text-xs text-text-dim">Real-vaqt retention darajasi, billing va murabbiylar samaradorligi</p>
                  </div>
                  <Link href="/owner/dashboard" className="px-4 py-2 bg-accent text-bg text-xs font-semibold rounded-xl">
                    Owner Paneliga Kirish
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">JAMI A'ZOLAR</div>
                    <div className="text-2xl font-display font-bold text-accent">2,350 ta</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">RETENTION RATE</div>
                    <div className="text-2xl font-display font-bold text-good">92.4%</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">CHURN RISK</div>
                    <div className="text-2xl font-display font-bold text-bad">143 ta</div>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "trainer" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-text-hi">Trainer Dashboard</h3>
                    <p className="text-xs text-text-dim">Bugungi mijozlar seansi, jadval va xavf ostidagi a'zolar bilikmasi</p>
                  </div>
                  <Link href="/trainer/dashboard" className="px-4 py-2 bg-accent text-bg text-xs font-semibold rounded-xl">
                    Trainer Paneliga Kirish
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-text-hi">Jasur Toshmatov</div>
                      <div className="text-[10px] text-text-dim font-mono">Personal Training • 15:00</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-good/10 text-good text-[10px] font-mono font-bold">Faol</span>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border flex items-center justify-between">
                    <div>
                      <div className="text-xs font-semibold text-text-hi">Doniyor Raxmonov</div>
                      <div className="text-[10px] text-text-dim font-mono">14 kundan beri kelmadi</div>
                    </div>
                    <span className="px-2 py-1 rounded bg-bad/10 text-bad text-[10px] font-mono font-bold">Risk Alert</span>
                  </div>
                </div>
              </div>
            )}

            {activeTab === "member" && (
              <div className="space-y-6 max-w-md mx-auto text-center">
                <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-accent mx-auto">
                  <QrCode className="w-8 h-8" />
                </div>
                <div>
                  <h3 className="text-2xl font-display font-bold text-text-hi">Telegram Mini App</h3>
                  <p className="text-xs text-text-dim mt-1">A'zolar uchun ilovasiz, to'g'ridan-to'g'ri Telegram ichida ishlovchi raqamli turniket pass va olov stikerlari.</p>
                </div>
                <Link href="/member" className="inline-block px-6 py-3 bg-accent text-bg text-xs font-bold rounded-xl shadow-[0_0_20px_rgba(232,255,71,0.2)]">
                  Member App Demoni Ko'rish
                </Link>
              </div>
            )}

            {activeTab === "superadmin" && (
              <div className="space-y-6">
                <div className="flex justify-between items-center">
                  <div>
                    <h3 className="text-2xl font-display font-bold text-text-hi">SuperAdmin Global Platform</h3>
                    <p className="text-xs text-text-dim">412 ta zal boshqaruvi, platforma MRR va AI tokenlar sarfi</p>
                  </div>
                  <Link href="/superadmin/dashboard" className="px-4 py-2 bg-accent text-bg text-xs font-semibold rounded-xl">
                    SuperAdmin Paneliga Kirish
                  </Link>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">JAMI ZALLAR</div>
                    <div className="text-2xl font-display font-bold text-accent">412 ta</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">PLATFORMA MRR</div>
                    <div className="text-2xl font-display font-bold text-good">$18,450</div>
                  </div>
                  <div className="p-4 rounded-xl bg-surface border border-border">
                    <div className="text-[10px] font-mono text-text-dim">AI TOKEN CONSUMPTION</div>
                    <div className="text-2xl font-display font-bold text-info">1.4M / oy</div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* ---------- Interactive ROI & Revenue Savings Calculator ---------- */}
      <section id="roi-calculator" className="py-24 px-6 relative">
        <div className="max-w-5xl mx-auto bg-surface border border-border rounded-3xl p-8 md:p-12 space-y-8 shadow-2xl">
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <span className="px-3.5 py-1 rounded-full bg-accent/10 text-accent font-mono text-xs">
              INTERAKTIV DAROMAD KALKULYATORI
            </span>
            <h2 className="text-3xl md:text-4xl font-display font-bold">
              Retenix Zalingizga Qancha Daromad Olib Keladi?
            </h2>
            <p className="text-text-dim text-xs">
              Zalingizdagi a'zolar soni va oylik a'zolik narxini suring:
            </p>
          </div>

          <div className="grid md:grid-cols-2 gap-8 items-center">
            {/* Sliders */}
            <div className="space-y-6 bg-surface-2 p-6 rounded-2xl border border-border">
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
            <div className="p-6 rounded-2xl bg-accent/10 border border-accent/30 space-y-4 text-center">
              <div className="text-xs font-mono text-text-dim uppercase tracking-wider">
                OYLIK SAQLAB QOLINADIGAN QO'SHIMCHA DAROMAD:
              </div>
              <div className="text-4xl md:text-5xl font-display font-bold text-accent">
                +${monthlySavedRevenue.toLocaleString()} <span className="text-sm font-normal text-text-dim">/oy</span>
              </div>
              <div className="text-xs text-text-mid font-mono border-t border-accent/20 pt-3">
                Retenix har oy o'rtacha <span className="text-good font-bold">{savedMembers} ta a'zongizni</span> zalni tark etishidan saqlab qoladi.
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ---------- FAQ Accordion ---------- */}
      <section className="py-24 bg-surface border-t border-border px-6">
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="text-center space-y-3">
            <h2 className="text-3xl md:text-4xl font-display font-bold">Keng Tarqalgan Savollar (FAQ)</h2>
            <p className="text-text-dim text-sm">Retenix AI platformasi bo'yicha ko'p beriladigan savollar</p>
          </div>

          <div className="space-y-4">
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
                a: "Yo'q! A me'zolar to'g'ridan-to'g'ri Telegram Mini App orqali ilovasiz foydalanishadi."
              },
              {
                q: "14 kunlik bepul sinov davrida to'lov kartasi so'raladimi?",
                a: "Yo'q, 14 kunlik sinov davrida hech qanday to'lov kartasi so'ralmaydi."
              }
            ].map((item, idx) => (
              <div key={idx} className="rounded-2xl bg-surface-2 border border-border overflow-hidden">
                <button
                  onClick={() => setOpenFaq(openFaq === idx ? null : idx)}
                  className="w-full p-5 text-left font-display font-bold text-sm text-text-hi flex items-center justify-between cursor-pointer"
                >
                  <span>{item.q}</span>
                  <ChevronDown className={`w-4 h-4 text-accent transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                </button>
                {openFaq === idx && (
                  <div className="p-5 pt-0 text-xs text-text-dim leading-relaxed border-t border-border-2">
                    {item.a}
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ---------- Final CTA ---------- */}
      <section className="py-24 relative overflow-hidden text-center px-6">
        <div className="absolute inset-0 bg-accent/5 pointer-events-none" />
        <div className="max-w-4xl mx-auto space-y-6 relative z-10">
          <h2 className="text-4xl md:text-5xl font-display font-bold">
            Bugunoq Zalingiz Retention Darajasini Oshiring
          </h2>
          <p className="text-text-dim text-base max-w-xl mx-auto">
            Retenix AI platformasi bilan zalingiz daromadini oshiring va mijozlar ketib qolishining oldini oling.
          </p>
          <Link 
            href="/login" 
            className="inline-flex items-center gap-2 bg-accent text-bg px-10 py-4 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_35px_rgba(232,255,71,0.3)] cursor-pointer"
          >
            14-Kunlik Bepul Sinovni Boshlash <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>

      {/* ---------- Glass Footer ---------- */}
      <footer className="border-t border-border bg-surface py-12 px-6">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border border-accent/50 flex items-center justify-center font-display font-bold text-accent text-xs">
              R
            </div>
            <span className="font-display font-bold text-text-hi">Retenix AI Platform</span>
          </div>

          <div className="flex flex-wrap items-center gap-6 text-xs text-text-dim font-mono">
            <Link href="/features" className="hover:text-accent">Imkoniyatlar</Link>
            <Link href="/pricing" className="hover:text-accent">Narxlar</Link>
            <Link href="/about" className="hover:text-accent">Biz Haqimizda</Link>
            <Link href="/contact" className="hover:text-accent">Bog'lanish</Link>
          </div>

          <div className="text-xs text-text-dim font-mono">
            © {new Date().getFullYear()} Retenix. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
