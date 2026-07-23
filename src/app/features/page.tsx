"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Zap, TrendingUp, ShieldCheck, QrCode, Bot, Users, ArrowRight, CheckCircle2, Sparkles, Cpu } from "lucide-react";

export default function FeaturesPage() {
  return (
    <div className="min-h-screen bg-bg text-text-hi font-body selection:bg-accent/25 selection:text-bg">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-display font-black text-bg text-lg shadow-[0_0_16px_rgba(232,255,71,0.2)]">
              R
            </div>
            <span className="font-display font-bold text-xl tracking-tight text-text-hi">Retenix AI</span>
          </Link>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-mid">
            <Link href="/" className="hover:text-accent transition-colors">Bosh Sahifa</Link>
            <Link href="/features" className="text-accent font-semibold">Imkoniyatlar</Link>
            <Link href="/pricing" className="hover:text-accent transition-colors">Narxlar</Link>
            <Link href="/about" className="hover:text-accent transition-colors">Biz Haqimizda</Link>
            <Link href="/contact" className="hover:text-accent transition-colors">Bog'lanish</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="bg-accent text-bg px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,255,71,0.2)]">
              Tizimga Kirish
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Header */}
      <section className="pt-36 pb-16 px-6 text-center">
        <div className="max-w-4xl mx-auto space-y-4">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs">
            <Sparkles className="w-3.5 h-3.5" /> Platforma Funksiyalari
          </span>
          <h1 className="text-4xl md:text-6xl font-display font-bold">
            Retenix AI Ekotizimining Barcha Imkoniyatlari
          </h1>
          <p className="text-text-dim text-lg max-w-2xl mx-auto">
            Gym Owner, Trener, SuperAdmin va A'zolar uchun birlashtirilgan aqlli ERP & CRM platformasi.
          </p>
        </div>
      </section>

      {/* Main Features Grid */}
      <section className="py-12 px-6 max-w-7xl mx-auto grid md:grid-cols-2 lg:grid-cols-3 gap-8">
        {[
          {
            title: "5-Factor Churn Signal Engine",
            desc: "A'zolar davomadi, streak uzilishi, ovqatlanish jurnali va to'lovlar tarixidan 5 bosqichli xavf balini hisoblaydi.",
            icon: Activity,
            badge: "AI Engine",
          },
          {
            title: "Telegram Mini App",
            desc: "A'zolar uchun Telegram ichidagi qulay mobil ilova: Turniket QR pass, trenirovka durlari va kaloriya hisoblagichi.",
            icon: QrCode,
            badge: "TMA App",
          },
          {
            title: "AI Copilot Asistent",
            desc: "Zal egasi va murabbiylarga har bir mijozni ushlab qolish va shaxsiy tavsiyalar berish bo'yicha proaktiv promptlar.",
            icon: Bot,
            badge: "AI Assistant",
          },
          {
            title: "Trenerlar va A'zolarni Boshqarish",
            desc: "Murabbiylarga a'zolarni biriktirish, ularning haftalik mashg'ulotlar jadvali va mijozlar adherence ko'rsatkichi.",
            icon: Users,
            badge: "CRM Engine",
          },
          {
            title: "Graph Analitika va MRR Dinamikasi",
            desc: "Retention darajasi, oylik daromad (MRR), Churn xavfi taqsimoti va kunlik faollik gistogrammalari.",
            icon: TrendingUp,
            badge: "Analytics",
          },
          {
            title: "Ko'p Tilli Interfeys (UZ, RU, EN)",
            desc: "Tizim to'liq O'zbek, Rus va Ingliz tillarida ishlaydi. Istalgan vaqtda 1-click bilan almashtirish mumkin.",
            icon: Cpu,
            badge: "Localization",
          },
        ].map((f, i) => (
          <div key={i} className="p-8 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all space-y-4">
            <div className="flex items-center justify-between">
              <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                <f.icon className="w-6 h-6" />
              </div>
              <span className="text-[10px] font-mono px-2.5 py-1 rounded-full bg-surface-2 border border-border text-accent font-semibold">
                {f.badge}
              </span>
            </div>
            <h3 className="text-xl font-display font-bold text-text-hi">{f.title}</h3>
            <p className="text-text-dim text-sm leading-relaxed">{f.desc}</p>
          </div>
        ))}
      </section>

      {/* CTA */}
      <section className="py-20 text-center bg-surface border-t border-border">
        <div className="max-w-3xl mx-auto px-6 space-y-6">
          <h2 className="text-3xl font-display font-bold">Retenix AI Bilan Zal Tarqqiyotini Boshlang</h2>
          <Link href="/login" className="inline-flex items-center gap-2 bg-accent text-bg px-8 py-4 rounded-xl font-semibold text-sm hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(232,255,71,0.25)]">
            Demoni Sinab Ko'rish <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </section>
    </div>
  );
}
