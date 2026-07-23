"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Mail, Phone, MapPin, Send, CheckCircle2, MessageSquare } from "lucide-react";

export default function ContactPage() {
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitted(true);
  };

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
            <Link href="/about" className="hover:text-accent transition-colors">Biz Haqimizda</Link>
            <Link href="/contact" className="text-accent font-semibold">Bog'lanish</Link>
          </div>
          <div className="flex items-center gap-4">
            <Link href="/login" className="bg-accent text-bg px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,255,71,0.2)]">
              Tizimga Kirish
            </Link>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <section className="pt-36 pb-20 px-6 max-w-6xl mx-auto">
        <div className="text-center max-w-2xl mx-auto mb-16 space-y-3">
          <h1 className="text-4xl md:text-5xl font-display font-bold">Biz Bilan Bog'laning</h1>
          <p className="text-text-dim text-sm">Savollaringiz bormi yoki zalingiz uchun maxsus taqdimot demo xohlaysizmi?</p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Details */}
          <div className="space-y-8">
            <div className="p-6 rounded-2xl bg-surface border border-border space-y-6">
              <h3 className="text-xl font-display font-bold text-text-hi">Aloqa Ma'lumotlari</h3>
              
              <div className="space-y-4 text-xs font-mono">
                <div className="flex items-center gap-3 text-text-mid">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Phone className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-text-dim">TELEFON / TELEGRAM</div>
                    <div className="text-text-hi font-semibold mt-0.5">+998 90 123-45-67</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-text-mid">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <Mail className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-text-dim">EMAIL</div>
                    <div className="text-text-hi font-semibold mt-0.5">support@retenix.ai</div>
                  </div>
                </div>

                <div className="flex items-center gap-3 text-text-mid">
                  <div className="w-9 h-9 rounded-lg bg-accent/10 flex items-center justify-center text-accent shrink-0">
                    <MapPin className="w-4 h-4" />
                  </div>
                  <div>
                    <div className="text-[10px] text-text-dim">MANZIL</div>
                    <div className="text-text-hi font-semibold mt-0.5">Toshkent sh., Yunusobod t., IT Park</div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="p-8 rounded-2xl bg-surface border border-border">
            {submitted ? (
              <div className="py-12 text-center space-y-4">
                <div className="w-16 h-16 rounded-full bg-good/10 text-good border border-good/30 flex items-center justify-center mx-auto">
                  <CheckCircle2 className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-display font-bold text-text-hi">Xabaringiz Qabul Qilindi!</h3>
                <p className="text-xs text-text-dim max-w-xs mx-auto">
                  Tez orada mutaxassisimiz siz bilan bog'lanadi va taqdimot tashkillashtiradi.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-4">
                <h3 className="text-lg font-display font-bold text-text-hi mb-2">So'rov Qoldiring</h3>
                
                <div className="space-y-1">
                  <label className="text-xs font-mono text-text-dim">Ismingiz</label>
                  <input
                    required
                    placeholder="Masalan: Rustam Toshmatov"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border-2 text-xs text-text-hi focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-text-dim">Zal Nomi va Shahar</label>
                  <input
                    required
                    placeholder="Masalan: FitZone Gym Yunusobod"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border-2 text-xs text-text-hi focus:outline-none focus:border-accent"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-text-dim">Telefon Raqamingiz</label>
                  <input
                    required
                    placeholder="+998 90 123 45 67"
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border-2 text-xs text-text-hi focus:outline-none focus:border-accent font-mono"
                  />
                </div>

                <div className="space-y-1">
                  <label className="text-xs font-mono text-text-dim">Xabar yoki Savolingiz</label>
                  <textarea
                    rows={4}
                    placeholder="Sizni nima qiziqtirmoqda?..."
                    className="w-full px-4 py-2.5 rounded-xl bg-surface-2 border border-border-2 text-xs text-text-hi focus:outline-none focus:border-accent"
                  />
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 bg-accent text-bg font-semibold rounded-xl text-xs hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(232,255,71,0.2)]"
                >
                  <Send className="w-4 h-4" /> Xabarni Yuborish
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
