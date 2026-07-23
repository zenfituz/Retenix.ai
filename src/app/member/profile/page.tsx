"use client";

import React, { useState } from "react";
import { 
  User, Shield, Flame, Trophy, Award, Zap, CreditCard, Clock, CheckCircle2, 
  LogOut, Lock, ArrowUpRight, Dumbbell, Sparkles, Receipt
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { Avatar } from "@/components/ui/avatar";
import { signOut } from "@/app/login/actions";
import { useLanguage } from "@/context/language-context";

const BADGES = [
  { id: "1", icon: "✅", label: "Birinchi Qadam", unlocked: true, date: "1-iyul, 2026" },
  { id: "2", icon: "🔥", label: "7 Kunlik Olov", unlocked: true, date: "8-iyul, 2026" },
  { id: "3", icon: "🗓️", label: "2 Hafta Jangchisi", unlocked: true, date: "15-iyul, 2026" },
  { id: "4", icon: "🤖", label: "AI Do'sti", unlocked: true, date: "18-iyul, 2026" },
  { id: "5", icon: "🛡️", label: "30 Kunlik Temir", unlocked: false, hint: "16 kun qoldi" },
  { id: "6", icon: "👑", label: "Zal Afsonasi", unlocked: false, hint: "Level 10 talab etiladi" },
];

const PAYMENTS = [
  { id: "#INV-8492", plan: "Pro Annual Plan", date: "2026-06-10", amount: "$240.00", method: "Payme", status: "Muvaffaqiyatli" },
  { id: "#INV-7102", plan: "Pro Annual Plan", date: "2025-06-10", amount: "$220.00", method: "Click", status: "Muvaffaqiyatli" },
];

export default function MemberProfilePage() {
  const { lang, t } = useLanguage();

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto text-text-hi">
      {/* Header Profile Info */}
      <Card className="bg-surface border-border p-6 shadow-xl">
        <div className="flex flex-col sm:flex-row items-center sm:items-start justify-between gap-5 text-center sm:text-left">
          <div className="flex flex-col sm:flex-row items-center gap-4">
            <Avatar fallback="JT" size="lg" className="w-16 h-16 border-2 border-accent text-lg" />
            <div className="space-y-1">
              <div className="flex items-center gap-2 justify-center sm:justify-start">
                <h1 className="text-2xl font-display font-bold text-text-hi">Jasur Toshmatov</h1>
                <Pill variant="success">Pro A'zo</Pill>
              </div>
              <p className="text-xs text-text-dim font-mono">jasur@example.com • FitZone Yunusobod</p>
              <div className="text-[11px] font-mono text-accent pt-1">
                ID: #RET-8492
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 bg-surface-2 border border-accent/30 px-4 py-2 rounded-2xl">
            <div className="text-right">
              <div className="text-xs font-bold text-accent">👑 Daraja 5 · Usta</div>
              <div className="text-[10px] font-mono text-text-dim">Reyting: #3 (2,340 XP)</div>
            </div>
          </div>
        </div>
      </Card>

      {/* XP Gamification & Progress */}
      <Card className="bg-surface border-accent/40 p-5 space-y-3 shadow-[0_0_25px_rgba(232,255,71,0.1)] glass-card-hover">
        <div className="flex items-center justify-between text-xs font-mono">
          <span className="text-text-dim uppercase tracking-wider flex items-center gap-1.5 font-bold">
            <Zap className="w-4 h-4 text-accent fill-accent/20" /> XP GAMIFIKATSIYA VA LEVEL PROGRESS
          </span>
          <span className="text-accent font-bold">2,340 / 3,000 XP</span>
        </div>
        <div className="w-full h-3 bg-surface-2 rounded-full overflow-hidden border border-border p-0.5">
          <div className="h-full bg-accent rounded-full shadow-[0_0_15px_rgba(232,255,71,0.5)] transition-all duration-700" style={{ width: "78%" }} />
        </div>
        <div className="flex justify-between text-[10px] font-mono text-text-dim">
          <span className="text-text-hi font-semibold">Daraja 5 (Usta)</span>
          <span>Daraja 6 (Afsona) uchun 660 XP qoldi</span>
        </div>
      </Card>

      {/* Best Results & Streak Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
          <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
            <Flame className="w-5 h-5" />
          </div>
          <div className="text-xl font-display font-bold text-text-hi">🔥 14 Kun</div>
          <div className="text-[10px] font-mono text-text-dim uppercase mt-0.5">Joriy Streak</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
          <div className="w-9 h-9 rounded-full bg-good/10 flex items-center justify-center text-good mb-2">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="text-xl font-display font-bold text-text-hi">18 Tashrif</div>
          <div className="text-[10px] font-mono text-text-dim uppercase mt-0.5">Bu Oydagi Tashrif</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
          <div className="w-9 h-9 rounded-full bg-info/10 flex items-center justify-center text-info mb-2">
            <Dumbbell className="w-5 h-5" />
          </div>
          <div className="text-xl font-display font-bold text-accent">85 kg</div>
          <div className="text-[10px] font-mono text-text-dim uppercase mt-0.5">PR Bench Press</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
          <div className="w-9 h-9 rounded-full bg-warn/10 flex items-center justify-center text-warn mb-2">
            <Trophy className="w-5 h-5" />
          </div>
          <div className="text-xl font-display font-bold text-text-hi">110 kg</div>
          <div className="text-[10px] font-mono text-text-dim uppercase mt-0.5">PR Squat</div>
        </div>
      </div>

      {/* Badges Gallery */}
      <Card className="bg-surface border-border">
        <CardHeader className="pb-3 border-b border-border">
          <CardTitle className="text-base font-display font-bold flex items-center gap-2 text-text-hi">
            <Award className="w-5 h-5 text-accent" /> Yutuqlar va Nishonlar (Badges)
          </CardTitle>
        </CardHeader>
        <CardContent className="p-4">
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-3">
            {BADGES.map((b) => (
              <div
                key={b.id}
                className={`p-3 rounded-xl border text-center transition-all ${
                  b.unlocked
                    ? "bg-surface-2 border-accent/40 text-text-hi shadow-[0_0_15px_rgba(232,255,71,0.08)]"
                    : "bg-surface-3 border-border opacity-50 text-text-dim"
                }`}
              >
                <div className="text-2xl mb-1.5">{b.icon}</div>
                <div className="text-xs font-semibold">{b.label}</div>
                <div className="text-[9px] font-mono text-text-dim mt-1">
                  {b.unlocked ? b.date : b.hint}
                </div>
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Payments & Subscriptions History */}
      <Card className="bg-surface border-border">
        <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
          <CardTitle className="text-base font-display font-bold flex items-center gap-2 text-text-hi">
            <CreditCard className="w-5 h-5 text-accent" /> To'lovlar va Obuna Tarixi
          </CardTitle>
          <div className="text-xs font-mono text-good bg-good/10 border border-good/30 px-3 py-1 rounded-lg">
            ✓ Obuna Faol (18 kun qoldi)
          </div>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {PAYMENTS.map((p) => (
            <div key={p.id} className="p-3.5 rounded-xl bg-surface-2 border border-border-2 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-9 h-9 rounded-lg bg-surface border border-border flex items-center justify-center text-accent">
                  <Receipt className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-xs font-bold text-text-hi">{p.plan} ({p.id})</div>
                  <div className="text-[10px] font-mono text-text-dim">{p.date} • {p.method}</div>
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs font-mono font-bold text-accent">{p.amount}</div>
                <div className="text-[9px] font-mono text-good">{p.status}</div>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>

      {/* EDIT PROFILE & RE-RUN ONBOARDING BUTTON */}
      <div className="pt-4 border-t border-border space-y-3">
        <button
          onClick={() => {
            localStorage.removeItem("member_onboarded_v2");
            window.location.href = "/member";
          }}
          className="w-full py-3.5 rounded-xl bg-surface-2 border border-accent/40 text-accent font-semibold text-xs hover:bg-accent/10 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Sparkles className="w-4 h-4" />
          <span>Profilni Tahrirlash & Onboarding-ni Qayta O'tish</span>
        </button>

        <form action={signOut}>
          <button
            type="submit"
            className="w-full py-3.5 rounded-xl bg-bad-dim/20 border border-bad/40 text-bad font-semibold text-xs hover:bg-bad-dim/40 transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-lg"
          >
            <LogOut className="w-4 h-4" />
            <span>Tizimdan Chiqish (Sign Out)</span>
          </button>
        </form>
      </div>
    </div>
  );
}
