"use client";

import React from "react";
import Link from "next/link";
import { motion } from "framer-motion";
import { ShieldCheck, Target, Users, Zap, ArrowRight, Award, Sparkles, Building2 } from "lucide-react";

export default function AboutPage() {
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
            <Link href="/features" className="hover:text-accent transition-colors">Imkoniyatlar</Link>
            <Link href="/pricing" className="hover:text-accent transition-colors">Narxlar</Link>
            <Link href="/about" className="text-accent font-semibold">Biz Haqimizda</Link>
            <Link href="/contact" className="hover:text-accent transition-colors">Bog'lanish</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="bg-accent text-bg px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,255,71,0.2)]">
              Tizimga Kirish
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-36 pb-20 px-6 relative overflow-hidden">
        <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[600px] h-[400px] bg-accent/5 rounded-full blur-[140px] pointer-events-none" />
        
        <div className="max-w-4xl mx-auto text-center relative z-10 space-y-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs mb-6">
              <Sparkles className="w-3.5 h-3.5" /> Retenix AI Haqida
            </span>
            <h1 className="text-4xl md:text-6xl font-display font-bold leading-tight">
              Fitness Industriyasini <span className="text-accent">Sun'iy Intellekt</span> Bilan Qayta Kashf Etamiz
            </h1>
            <p className="text-text-dim text-lg md:text-xl leading-relaxed max-w-2xl mx-auto mt-4">
              Biz zallarga mijozlar ketib qolishini (churn) taxmin qilish va ularni ushlab qolish daromadini 35% ga oshirishga yordam beramiz.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-16 px-6 bg-surface border-y border-border">
        <div className="max-w-6xl mx-auto grid md:grid-cols-3 gap-8">
          <div className="p-8 rounded-2xl bg-surface-2 border border-border-2 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Target className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold">Bizning Missiyamiz</h3>
            <p className="text-text-dim text-sm leading-relaxed">
              Fitness zallarga har bir mijoz bilan doimiy shaxsiy aloqa o'rnatish va sun'iy intellekt orqali uzluksiz a'zolikni ta'minlash.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-surface-2 border border-border-2 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-good/10 border border-good/20 flex items-center justify-center text-good">
              <Users className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold">412+ Hamkor Zallar</h3>
            <p className="text-text-dim text-sm leading-relaxed">
              Toshkent, Samarqand va O'zbekiston bo'ylab 400 dan ortiq zallar Retenix platformasidan har kuni foydalanmoqda.
            </p>
          </div>

          <div className="p-8 rounded-2xl bg-surface-2 border border-border-2 space-y-4">
            <div className="w-12 h-12 rounded-xl bg-info/10 border border-info/20 flex items-center justify-center text-info">
              <Award className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-display font-bold">94.8% Aniqlik</h3>
            <p className="text-text-dim text-sm leading-relaxed">
              Bizning 5-faktorli churn modelimiz mijoz zalni tark etishini 14 kun oldindan yuqori aniqlik bilan prognoz qiladi.
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border border-accent/50 flex items-center justify-center font-display font-bold text-accent text-xs">
              R
            </div>
            <span className="font-display font-bold text-text-hi">Retenix AI</span>
          </div>
          <div className="text-sm text-text-dim font-mono">
            © {new Date().getFullYear()} Retenix. AI Churn Engine.
          </div>
        </div>
      </footer>
    </div>
  );
}
