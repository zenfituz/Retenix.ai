"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, QrCode, Flame, ShieldCheck, ChevronRight, CheckCircle2, Trophy, Utensils, Dumbbell, Calendar, Zap, Sparkles } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { KpiCard } from "@/components/ui/kpi-card";
import { Pill } from "@/components/ui/pill";

const BADGES = [
  { id: "1", icon: "✅", label: "Birinchi qadam", unlocked: true },
  { id: "2", icon: "🔥", label: "7 kunlik olov", unlocked: true },
  { id: "3", icon: "🗓️", label: "2 hafta jangchisi", unlocked: true },
  { id: "4", icon: "🛡️", label: "30 kunlik temir", unlocked: false, hint: "16 kun qoldi" },
  { id: "5", icon: "🤖", label: "AI do'sti", unlocked: true },
];

export default function MemberApp() {
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    const onboarded = localStorage.getItem("tma_onboarded");
    if (onboarded) {
      setIsOnboarding(false);
    }
    setIsReady(true);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("tma_onboarded", "true");
    setIsOnboarding(false);
  };

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-bg text-text-hi font-body selection:bg-accent/25 selection:text-bg">
      <AnimatePresence mode="wait">
        {isOnboarding ? (
          <OnboardingScreen key="onboarding" onComplete={completeOnboarding} />
        ) : (
          <DashboardScreen key="dashboard" />
        )}
      </AnimatePresence>
    </div>
  );
}

function OnboardingScreen({ onComplete }: { onComplete: () => void }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, x: -20 }}
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center max-w-md mx-auto"
    >
      <div className="w-20 h-20 mb-6 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center shadow-[0_0_30px_rgba(232,255,71,0.2)]">
        <ShieldCheck className="w-10 h-10 text-accent" />
      </div>
      <h1 className="text-3xl font-display font-bold mb-3 text-text-hi">
        Retenix Member App
      </h1>
      <p className="text-text-dim text-sm mb-8 max-w-xs leading-relaxed">
        Raqamli a'zolik kartangiz, check-in QR pass, mashqlar jadvali va AI treneringiz bir joyda.
      </p>

      <div className="space-y-3 w-full mb-10 text-left">
        {[
          { icon: <QrCode size={18} />, text: "Tezkor QR Check-in Pass" },
          { icon: <Flame size={18} />, text: "Streak va Gamifikatsiya XP" },
          { icon: <User size={18} />, text: "A'zolik va Shaxsiy Reja" },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.2 }}
            className="flex items-center gap-3.5 p-3.5 rounded-xl bg-surface border border-border"
          >
            <div className="text-accent">{feature.icon}</div>
            <span className="text-xs font-medium text-text-hi">{feature.text}</span>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onComplete}
        className="w-full py-3.5 px-6 rounded-xl bg-accent text-bg font-semibold text-sm hover:opacity-90 transition-opacity flex items-center justify-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(232,255,71,0.25)]"
      >
        Boshlash <ChevronRight size={18} />
      </button>
    </motion.div>
  );
}

function DashboardScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto"
    >
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-2xl md:text-3xl font-display font-bold text-text-hi">
            Xush kelibsiz, Jasur Toshmatov 👋
          </h2>
          <p className="text-text-dim text-sm mt-1">FitZone Gym Yunusobod • Pro A'zo</p>
        </div>
        <div className="flex items-center gap-2 bg-surface-2 border border-border px-3.5 py-1.5 rounded-full font-mono text-xs text-accent">
          <span>👑 Daraja 5 · Usta</span>
          <span>•</span>
          <span>2,340 XP</span>
        </div>
      </div>

      {/* Main Grid: Responsive Desktop + Mobile */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left / Main Column: Digital Membership Pass + Stats */}
        <div className="lg:col-span-2 space-y-6">
          {/* Digital QR Card */}
          <div className="bg-surface border border-accent/30 rounded-2xl p-6 relative overflow-hidden shadow-2xl">
            <div className="flex justify-between items-start mb-6 relative z-10">
              <div>
                <Pill variant="success" className="mb-2">
                  ✓ Faol Obuna
                </Pill>
                <h3 className="text-2xl font-display font-bold text-text-hi">Pro Annual Plan</h3>
                <p className="text-text-dim text-xs mt-1 font-mono">Qolgan muddat: 18 kun • Yunusobod Filiali</p>
              </div>
              <div className="font-mono text-xs text-accent bg-accent/10 border border-accent/20 px-3 py-1 rounded-lg">
                ID: #RET-8492
              </div>
            </div>

            {/* QR Pass Box */}
            <div className="bg-surface-2 border border-border rounded-xl p-5 flex flex-col sm:flex-row items-center gap-6 max-w-lg mx-auto my-2">
              <div className="w-36 h-36 bg-white rounded-xl p-2 flex items-center justify-center shrink-0">
                <QrCode className="w-full h-full text-black" strokeWidth={1} />
              </div>
              <div className="space-y-2 text-center sm:text-left">
                <div className="text-xs font-semibold text-text-hi">Turniket Check-in QR Koda</div>
                <p className="text-[11px] text-text-dim leading-relaxed">
                  Zalga kirish uchun turniket skaneriga ushbu QR kodni ko'rsating. Har 30 soniyada yangilanadi.
                </p>
                <div className="text-[10px] font-mono text-accent">● Avtomatik faol</div>
              </div>
            </div>
          </div>

          {/* Gamification Stats Grid */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-full bg-accent/10 flex items-center justify-center text-accent mb-2">
                <Flame className="w-5 h-5" />
              </div>
              <div className="text-xl font-display font-bold text-text-hi">🔥 14</div>
              <div className="text-[10px] font-mono text-text-dim uppercase mt-0.5">Kunlik Streak</div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-full bg-good/10 flex items-center justify-center text-good mb-2">
                <CheckCircle2 className="w-5 h-5" />
              </div>
              <div className="text-xl font-display font-bold text-text-hi">18</div>
              <div className="text-[10px] font-mono text-text-dim uppercase mt-0.5">Bu Oydagi Tashrif</div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-full bg-info/10 flex items-center justify-center text-info mb-2">
                <Trophy className="w-5 h-5" />
              </div>
              <div className="text-xl font-display font-bold text-accent">#3</div>
              <div className="text-[10px] font-mono text-text-dim uppercase mt-0.5">Reyting O'rni</div>
            </div>

            <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
              <div className="w-9 h-9 rounded-full bg-warn/10 flex items-center justify-center text-warn mb-2">
                <Zap className="w-5 h-5" />
              </div>
              <div className="text-xl font-display font-bold text-text-hi">2,340</div>
              <div className="text-[10px] font-mono text-text-dim uppercase mt-0.5">Jami XP</div>
            </div>
          </div>
        </div>

        {/* Right Column: Gamification Badges & Today's Workout */}
        <div className="space-y-6">
          {/* Badges Box */}
          <Card className="bg-surface border-border">
            <CardHeader className="pb-2 border-b border-border">
              <CardTitle className="text-sm font-display font-bold flex items-center gap-2">
                <Trophy className="w-4 h-4 text-accent" /> Yutuqlar (Badges)
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4">
              <div className="grid grid-cols-3 gap-2">
                {BADGES.map((b) => (
                  <div
                    key={b.id}
                    title={b.unlocked ? "Ochilgan" : b.hint}
                    className={`p-3 rounded-xl bg-surface-2 border border-border flex flex-col items-center text-center transition-all ${
                      b.unlocked ? "opacity-100" : "opacity-40 grayscale"
                    }`}
                  >
                    <span className="text-2xl mb-1">{b.unlocked ? b.icon : "🔒"}</span>
                    <span className="text-[10px] font-medium text-text-mid leading-tight">{b.label}</span>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>

          {/* Today's Workout Plan */}
          <Card className="bg-surface border-border">
            <CardHeader className="pb-2 border-b border-border">
              <CardTitle className="text-sm font-display font-bold flex items-center gap-2">
                <Dumbbell className="w-4 h-4 text-accent" /> Bugungi Trenirovka Rejasi
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3">
              <div className="p-3 rounded-xl bg-surface-2 border border-border-2 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-text-hi">Bench Press (Ko'krak)</div>
                  <div className="text-[10px] text-text-dim font-mono mt-0.5">4 set × 10 takrorlash • 75 kg</div>
                </div>
                <Pill variant="success">Bajarildi</Pill>
              </div>

              <div className="p-3 rounded-xl bg-surface-2 border border-border-2 flex items-center justify-between">
                <div>
                  <div className="text-xs font-semibold text-text-hi">Incline Dumbbell Press</div>
                  <div className="text-[10px] text-text-dim font-mono mt-0.5">3 set × 12 takrorlash • 26 kg</div>
                </div>
                <Pill variant="default">Kutilmoqda</Pill>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </motion.div>
  );
}
