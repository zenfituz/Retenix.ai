"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Check, Zap, Shield, Sparkles, ArrowRight } from "lucide-react";
import { Pill } from "@/components/ui/pill";

export default function PricingPage() {
  const [isAnnual, setIsAnnual] = useState(true);

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
            <Link href="/pricing" className="text-accent font-semibold">Narxlar</Link>
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
      <section className="pt-36 pb-12 px-6 text-center space-y-4">
        <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs">
          <Sparkles className="w-3.5 h-3.5" /> Shaffof va Moslashuvchan Tariflar
        </span>
        <h1 className="text-4xl md:text-6xl font-display font-bold">
          Zalingiz Hajmiga Mos Tarifni Tanlang
        </h1>
        <p className="text-text-dim text-lg max-w-xl mx-auto">
          Yashirin to'lovlarsiz. 14 kunlik bepul sinov muddati mavjud.
        </p>

        {/* Toggle */}
        <div className="flex items-center justify-center gap-3 pt-6">
          <span className={`text-xs font-mono ${!isAnnual ? 'text-accent font-bold' : 'text-text-dim'}`}>Oylik</span>
          <button
            onClick={() => setIsAnnual(!isAnnual)}
            className="w-14 h-7 rounded-full bg-surface-2 border border-border p-1 flex items-center cursor-pointer transition-colors"
          >
            <div className={`w-5 h-5 rounded-full bg-accent transition-transform ${isAnnual ? 'translate-x-7' : 'translate-x-0'}`} />
          </button>
          <span className={`text-xs font-mono flex items-center gap-1.5 ${isAnnual ? 'text-accent font-bold' : 'text-text-dim'}`}>
            Yillik <span className="px-2 py-0.5 rounded bg-accent/20 text-accent text-[10px] font-bold">-20% chegirma</span>
          </span>
        </div>
      </section>

      {/* Pricing Cards */}
      <section className="py-12 px-6 max-w-7xl mx-auto grid md:grid-cols-3 gap-8">
        {[
          {
            name: "Starter Plan",
            price: isAnnual ? "$39" : "$49",
            desc: "Kichik va o'rta zallar uchun ideal (200 tagacha a'zo)",
            features: [
              "200 tagacha faol a'zo",
              "5-factor churn riski tahlili",
              "3 ta murabbiy akkaunti",
              "Telegram Mini App biriktirish",
              "Standard AI Copilot promptlar"
            ],
            popular: false,
            cta: "Starter Boshlash"
          },
          {
            name: "Pro Plan",
            price: isAnnual ? "$69" : "$89",
            desc: "O'sayotgan va professional fitness zallar uchun",
            features: [
              "1,000 tagacha faol a'zo",
              "Kengaytirilgan Churn Signal Engine 2.0",
              "Cheksiz murabbiy va xodimlar",
              "Custom Telegram Mini App brending",
              "Proaktiv AI Copilot tavsiyalari",
              "Payme & Stripe to'lov shlyuzlari"
            ],
            popular: true,
            cta: "Pro Sinab Ko'rish"
          },
          {
            name: "Enterprise",
            price: isAnnual ? "$149" : "$189",
            desc: "Zallar tarmog'i va yirik komplekslar uchun",
            features: [
              "Cheksiz a'zolar va filiallar",
              "Shaxsiy AI model trenirovka",
              "Dedicated menejer & 24/7 VIP qo'llab-quvvatlash",
              "Custom API va ERP integratsiya",
              "Eksklyuziv analitik hisobotlar"
            ],
            popular: false,
            cta: "Sotuv Bo'limi Bilan Bog'lanish"
          }
        ].map((p, i) => (
          <div
            key={i}
            className={`rounded-2xl p-8 space-y-6 relative transition-all ${
              p.popular
                ? "bg-surface-2 border-2 border-accent shadow-[0_0_30px_rgba(232,255,71,0.15)]"
                : "bg-surface border border-border hover:border-border-2"
            }`}
          >
            {p.popular && (
              <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-accent text-bg text-[10px] font-mono font-bold tracking-wider uppercase">
                ENG MASHHUR
              </div>
            )}
            <div>
              <h3 className="text-xl font-display font-bold text-text-hi">{p.name}</h3>
              <p className="text-xs text-text-dim mt-1">{p.desc}</p>
            </div>

            <div className="font-mono">
              <span className="text-4xl font-bold text-accent">{p.price}</span>
              <span className="text-text-dim text-xs">/oy</span>
            </div>

            <ul className="space-y-3 pt-4 border-t border-border text-xs">
              {p.features.map((f, fIdx) => (
                <li key={fIdx} className="flex items-center gap-2.5 text-text-mid">
                  <Check className="w-4 h-4 text-accent shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <Link
              href="/login"
              className={`w-full py-3 rounded-xl font-semibold text-xs flex items-center justify-center gap-2 transition-opacity cursor-pointer ${
                p.popular
                  ? "bg-accent text-bg shadow-[0_0_20px_rgba(232,255,71,0.25)]"
                  : "bg-surface-2 border border-border text-text-hi hover:bg-surface-3"
              }`}
            >
              {p.cta} <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        ))}
      </section>
    </div>
  );
}
