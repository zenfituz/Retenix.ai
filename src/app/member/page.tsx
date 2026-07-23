"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, QrCode, Flame, ShieldCheck, ChevronRight, CheckCircle2, Trophy, Utensils, 
  Dumbbell, Calendar, Zap, Sparkles, Bot, ArrowRight, Building2, Check, MessageSquare, 
  Send, Plus, Clock, Camera, RefreshCw
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";

export default function MemberApp() {
  const { lang, t } = useLanguage();
  const [step, setStep] = useState<number>(1);
  const [isOnboarding, setIsOnboarding] = useState<boolean>(true);
  const [isReady, setIsReady] = useState<boolean>(false);

  // Onboarding Form State
  const [goal, setGoal] = useState<string>("weight_loss");
  const [weight, setWeight] = useState<string>("76");
  const [height, setHeight] = useState<string>("178");
  const [age, setAge] = useState<string>("24");
  const [gymCode, setGymCode] = useState<string>("FITZONE-77");
  const [selectedTrainer, setSelectedTrainer] = useState<string>("aziz");
  const [gymCodeValid, setGymCodeValid] = useState<boolean>(true);

  useEffect(() => {
    const onboarded = localStorage.getItem("member_onboarded_v2");
    if (onboarded) {
      setIsOnboarding(false);
    }
    setIsReady(true);
  }, []);

  const completeOnboarding = () => {
    localStorage.setItem("member_onboarded_v2", "true");
    setIsOnboarding(false);
  };

  if (!isReady) return null;

  return (
    <div className="min-h-screen bg-bg text-text-hi font-body selection:bg-accent/25 selection:text-bg">
      <AnimatePresence mode="wait">
        {isOnboarding ? (
          <OnboardingWizard 
            key="onboarding"
            step={step}
            setStep={setStep}
            goal={goal}
            setGoal={setGoal}
            weight={weight}
            setWeight={setWeight}
            height={height}
            setHeight={setHeight}
            age={age}
            setAge={setAge}
            gymCode={gymCode}
            setGymCode={setGymCode}
            gymCodeValid={gymCodeValid}
            setGymCodeValid={setGymCodeValid}
            selectedTrainer={selectedTrainer}
            setSelectedTrainer={setSelectedTrainer}
            onComplete={completeOnboarding}
          />
        ) : (
          <ActionFirstDashboard key="dashboard" />
        )}
      </AnimatePresence>
    </div>
  );
}

{/* Onboarding Wizard Component */}
function OnboardingWizard({
  step, setStep, goal, setGoal, weight, setWeight, height, setHeight,
  age, setAge, gymCode, setGymCode, gymCodeValid, setGymCodeValid,
  selectedTrainer, setSelectedTrainer, onComplete
}: any) {
  return (
    <div className="min-h-screen flex flex-col justify-between p-4 sm:p-6 max-w-md mx-auto relative">
      {/* Progress Bar Header */}
      <div className="pt-4 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono text-text-dim">
          <span>QADAM {step} / 5</span>
          <span className="text-accent font-bold">
            {step === 1 ? "MAQSAD" : step === 2 ? "PARAMETRLAR" : step === 3 ? "ZAL KODI" : step === 4 ? "AI PLAN" : "MURABBIY"}
          </span>
        </div>
        <div className="h-1.5 bg-surface-2 rounded-full overflow-hidden border border-border">
          <div 
            className="h-full bg-accent rounded-full transition-all duration-300 shadow-[0_0_10px_rgba(232,255,71,0.3)]"
            style={{ width: `${(step / 5) * 100}%` }}
          />
        </div>
      </div>

      {/* STEP 1: GOAL SELECTION */}
      {step === 1 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 my-auto py-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-hi">Asosiy maqsadingiz nima?</h1>
            <p className="text-xs text-text-dim leading-relaxed">Barchasi va shaxsiy AI mashqlar rejangiz shunga qarab moslashtiriladi.</p>
          </div>

          <div className="space-y-3">
            {[
              { id: "weight_loss", icon: "🔥", title: "Vazn Yo'qotish", desc: "Yog'larni eritish va yengillik" },
              { id: "muscle_gain", icon: "💪", title: "Mushak O'stirish", desc: "Kuch, hajm va shaklga kirish" },
              { id: "healthy", icon: "❤️", title: "Sog'lom Turmush", desc: "Umumiy energiya va moslashuvchanlik" },
            ].map((g) => (
              <div
                key={g.id}
                onClick={() => setGoal(g.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center gap-4 ${
                  goal === g.id
                    ? "bg-accent/10 border-accent text-text-hi shadow-[0_0_20px_rgba(232,255,71,0.15)] scale-[1.02]"
                    : "bg-surface border-border text-text-mid hover:border-accent/40"
                }`}
              >
                <div className="text-3xl">{g.icon}</div>
                <div>
                  <div className="text-sm font-bold">{g.title}</div>
                  <div className="text-xs text-text-dim">{g.desc}</div>
                </div>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* STEP 2: BODY PARAMETERS */}
      {step === 2 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 my-auto py-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-hi">Tana ko'rsatkichlaringiz</h1>
            <p className="text-xs text-text-dim">AI kaloriya va oqsil normasini aniq hisoblashi uchun kiritiladi.</p>
          </div>

          <div className="space-y-4">
            <div className="space-y-1">
              <label className="text-xs font-mono text-text-dim">Vazn (kg):</label>
              <input
                type="number"
                value={weight}
                onChange={(e) => setWeight(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-xl p-3.5 text-sm text-text-hi font-mono focus:border-accent outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-text-dim">Bo'y (cm):</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-xl p-3.5 text-sm text-text-hi font-mono focus:border-accent outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-text-dim">Yosh:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-xl p-3.5 text-sm text-text-hi font-mono focus:border-accent outline-none"
              />
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 3: SPECIAL GYM CODE */}
      {step === 3 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 my-auto py-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-hi">Zal Maxsus Kodi (Gym Code)</h1>
            <p className="text-xs text-text-dim leading-relaxed">
              Zalingiz taqdim etgan maxsus kodni kiriting. Bu sizni avtomatik ravishda zal turniketi va murabbiylariga bog'laydi.
            </p>
          </div>

          <div className="space-y-3">
            <div className="relative">
              <Building2 className="absolute left-3.5 top-3.5 h-4 w-4 text-text-dim" />
              <input
                type="text"
                value={gymCode}
                onChange={(e) => {
                  setGymCode(e.target.value.toUpperCase());
                  setGymCodeValid(e.target.value.length >= 4);
                }}
                placeholder="Masalan: FITZONE-77"
                className="w-full bg-surface-2 border border-accent/40 rounded-xl pl-10 pr-4 py-3.5 text-sm font-mono text-accent uppercase font-bold focus:outline-none"
              />
            </div>

            {gymCodeValid && (
              <div className="p-3.5 rounded-xl bg-good/10 border border-good/30 text-good text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> FitZone Yunusobod Zali Biriktirildi!
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* STEP 4: 90-SECOND WOW MOMENT (AI PLAN GENERATED) */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 my-auto py-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-3xl mx-auto shadow-[0_0_30px_rgba(232,255,71,0.25)] animate-pulse">
            🎯
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-hi">Profilingiz Tayyor!</h1>
            <p className="text-xs text-text-dim max-w-xs mx-auto leading-relaxed">
              Retenix AI sizning {weight}kg vazningiz va maqsadingizga mos shaxsiy normani hisobladi:
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-accent/30 text-left space-y-2.5 shadow-lg">
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-dim">Kunlik Kaloriya Normasi:</span>
              <span className="text-accent font-mono font-bold text-sm">1,840 kcal</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-dim">Kunlik Oqsil (Protein):</span>
              <span className="text-good font-mono font-bold text-sm">145 gramm</span>
            </div>
            <div className="flex justify-between items-center text-xs">
              <span className="text-text-dim">Haftalik Trenirovka:</span>
              <span className="text-text-hi font-mono font-bold">3 kun (Dush/Chor/Juma)</span>
            </div>
          </div>
        </motion.div>
      )}

      {/* STEP 5: TRAINER SELECTION & SYNC WORKFLOW */}
      {step === 5 && (
        <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} className="space-y-6 my-auto py-6">
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-hi">Murabbiy Tanlang</h1>
            <p className="text-xs text-text-dim leading-relaxed">
              Tanlangan murabbiyga AI planingiz yuboriladi va u mashqlaringizni avtomatik audit qilib beradi.
            </p>
          </div>

          <div className="space-y-3">
            {[
              { id: "none", name: "Mustaqil Shug'ullanaman", role: "AI Trener bilan", badge: "AI Copilot" },
              { id: "aziz", name: "Coach Aziz Raximov", role: "FitZone Bosh Murabbiyi", badge: "4.9 ★ Rating" },
              { id: "dilshod", name: "Coach Dilshod Sobirov", role: "Kuch va Formagiruva", badge: "4.8 ★ Rating" },
            ].map((t) => (
              <div
                key={t.id}
                onClick={() => setSelectedTrainer(t.id)}
                className={`p-4 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedTrainer === t.id
                    ? "bg-accent/10 border-accent text-text-hi shadow-[0_0_15px_rgba(232,255,71,0.15)] scale-[1.01]"
                    : "bg-surface border-border text-text-mid hover:border-accent/40"
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{t.name}</div>
                  <div className="text-[10px] text-text-dim">{t.role}</div>
                </div>
                <span className="px-2.5 py-1 rounded-lg bg-surface-2 border border-border text-[9px] font-mono text-accent font-semibold">
                  {t.badge}
                </span>
              </div>
            ))}
          </div>
        </motion.div>
      )}

      {/* Wizard Footer Controls */}
      <div className="pt-4 flex gap-3">
        {step > 1 && (
          <button
            onClick={() => setStep(step - 1)}
            className="flex-1 py-3.5 rounded-xl border border-border text-xs font-mono text-text-mid hover:text-text-hi cursor-pointer"
          >
            Orqaga
          </button>
        )}
        <button
          onClick={() => {
            if (step < 5) {
              setStep(step + 1);
            } else {
              onComplete();
            }
          }}
          className="flex-1 py-3.5 rounded-xl bg-accent text-bg font-semibold text-xs hover:opacity-90 shadow-[0_0_20px_rgba(232,255,71,0.25)] flex items-center justify-center gap-2 cursor-pointer"
        >
          {step === 5 ? "Boshlash 🚀" : "Davom Etish →"}
        </button>
      </div>
    </div>
  );
}

{/* Action-First Dashboard Screen */}
function ActionFirstDashboard() {
  const [checkedIn, setCheckedIn] = useState(false);
  const [countdown, setCountdown] = useState(28);

  useEffect(() => {
    const timer = setInterval(() => {
      setCountdown((prev) => (prev > 1 ? prev - 1 : 30));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto pb-24 text-text-hi">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono text-text-dim uppercase tracking-widest flex items-center gap-1.5">
            <span className="w-1.5 h-1.5 rounded-full bg-good animate-pulse" /> FITZONE YUNUSOBOD
          </div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text-hi">Salom, Jasur 👋</h2>
        </div>
        <div className="flex items-center gap-2">
          <span className="px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs font-bold shadow-[0_0_15px_rgba(232,255,71,0.15)] flex items-center gap-1">
            <Flame className="w-3.5 h-3.5 fill-accent" /> 14 Kun Streak
          </span>
        </div>
      </div>

      {/* Primary Action Card: Interactive Turnstile Check-in QR Pass with Laser Scanner Effect */}
      <Card className="bg-surface border-accent/40 shadow-[0_0_35px_rgba(232,255,71,0.12)] p-5 text-center space-y-4 relative overflow-hidden glass-card-hover">
        <div className="flex items-center justify-between text-[10px] font-mono uppercase tracking-widest">
          <span className="text-accent font-bold">
            {checkedIn ? "✓ TURNIKET CHECK-IN BAJARILDI" : "📍 RAQAMLI QR TURNIKET PASS"}
          </span>
          <span className="text-text-dim flex items-center gap-1">
            <Clock className="w-3 h-3 text-accent" /> Yangilanish: {countdown}s
          </span>
        </div>
        
        {checkedIn ? (
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="p-5 rounded-2xl bg-good/10 border border-good/30 text-good font-mono text-xs space-y-2">
            <div className="flex items-center justify-center gap-2 font-bold text-sm">
              <CheckCircle2 className="w-5 h-5 text-good" /> FitZone Turniketidan Muvaffaqiyatli O'tdingiz!
            </div>
            <div className="text-[11px] text-text-hi">+10 XP va kunlik streak saqlandi (14 kun)</div>
          </motion.div>
        ) : (
          <div 
            onClick={() => setCheckedIn(true)}
            className="bg-surface-2 border border-border hover:border-accent/50 rounded-2xl p-5 flex flex-col sm:flex-row items-center justify-center gap-5 cursor-pointer transition-all max-w-md mx-auto group relative overflow-hidden"
          >
            {/* Holographic Laser Scanner Container */}
            <div className="w-36 h-36 bg-white rounded-xl p-2.5 shrink-0 flex items-center justify-center shadow-xl relative overflow-hidden group-hover:scale-105 transition-transform">
              <QrCode className="w-full h-full text-black" strokeWidth={1.5} />
              {/* Laser Line */}
              <div className="absolute left-0 right-0 h-1 bg-accent shadow-[0_0_12px_#E8FF47] animate-scanner" />
            </div>

            <div className="text-left space-y-2">
              <div className="text-xs font-bold text-text-hi flex items-center gap-1.5">
                <span>📍 Turniket Skaneriga Ko'rsating</span>
              </div>
              <p className="text-[11px] text-text-dim leading-relaxed">
                Zalga kirish uchun turniket skaneriga ushbu dinamik QR kodni tuting. Avtomatik tekshiruv va garov ruxsatnomasi.
              </p>
              <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-accent/15 border border-accent/30 text-accent text-[10px] font-mono font-bold">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> Skanerlash uchun bosing (+10 XP)
              </div>
            </div>
          </div>
        )}
      </Card>

      {/* Daily Progress: Calorie & Protein Tracker */}
      <Card className="bg-surface border-border p-4 space-y-3">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-text-dim font-bold flex items-center gap-1.5">
            <Utensils className="w-3.5 h-3.5 text-accent" /> BUGUNGI KALORIYA NORMA
          </span>
          <span className="text-text-hi"><b className="text-accent text-sm">540</b> / 1,840 kcal</span>
        </div>
        <div className="h-2.5 bg-surface-2 rounded-full overflow-hidden border border-border">
          <div className="h-full bg-accent rounded-full shadow-[0_0_10px_rgba(232,255,71,0.4)] transition-all duration-500" style={{ width: "30%" }} />
        </div>
        <div className="grid grid-cols-3 gap-2 pt-1 text-[11px] font-mono text-center">
          <div className="p-2 rounded-xl bg-surface-2 border border-border">
            <div className="text-text-dim text-[9px]">OQSIL (PROTEIN)</div>
            <div className="font-bold text-good">48g / 145g</div>
          </div>
          <div className="p-2 rounded-xl bg-surface-2 border border-border">
            <div className="text-text-dim text-[9px]">UGLAVOD (CARB)</div>
            <div className="font-bold text-warn">65g / 210g</div>
          </div>
          <div className="p-2 rounded-xl bg-surface-2 border border-border">
            <div className="text-text-dim text-[9px]">YOG' (FAT)</div>
            <div className="font-bold text-info">18g / 55g</div>
          </div>
        </div>
      </Card>

      {/* Quick Action Navigation Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <Link href="/member/food" className="p-4 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all text-center space-y-1.5 cursor-pointer glass-card-hover">
          <div className="text-2xl">🥗</div>
          <div className="text-xs font-bold text-text-hi">Ovqat Qo'shish</div>
          <div className="text-[10px] text-text-dim font-mono">AI tahlil</div>
        </Link>
        <Link href="/member/plan" className="p-4 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all text-center space-y-1.5 cursor-pointer glass-card-hover">
          <div className="text-2xl">💪</div>
          <div className="text-xs font-bold text-text-hi">Mashq Rejasi</div>
          <div className="text-[10px] text-text-dim font-mono">Bugungi mashq</div>
        </Link>
        <Link href="/member/ai" className="p-4 rounded-2xl bg-surface border border-accent/40 bg-accent/5 transition-all text-center space-y-1.5 cursor-pointer glass-card-hover">
          <div className="text-2xl">🤖</div>
          <div className="text-xs font-bold text-accent">AI Trener</div>
          <div className="text-[10px] text-text-dim font-mono">24/7 Chat</div>
        </Link>
        <Link href="/member/profile" className="p-4 rounded-2xl bg-surface border border-border hover:border-accent/40 transition-all text-center space-y-1.5 cursor-pointer glass-card-hover">
          <div className="text-2xl">👑</div>
          <div className="text-xs font-bold text-text-hi">Reyting & XP</div>
          <div className="text-[10px] text-text-dim font-mono">Daraja 5</div>
        </Link>
      </div>

      {/* Sleek AI Coach Direct Banner */}
      <Card className="bg-surface-2 border border-accent/30 p-4.5 flex items-center justify-between gap-4 glass-card-hover">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-2xl bg-accent/15 border border-accent/30 flex items-center justify-center text-accent shrink-0 shadow-[0_0_15px_rgba(232,255,71,0.2)]">
            <Bot className="w-6 h-6" />
          </div>
          <div>
            <div className="text-xs font-bold text-text-hi flex items-center gap-1.5">
              <span>Retenix AI Trener Bilan Muloqot</span>
              <span className="w-2 h-2 rounded-full bg-good animate-pulse" />
            </div>
            <p className="text-[11px] text-text-dim mt-0.5">24/7 Shaxsiy virtual murabbiyingizdan savollaringizga javob oling</p>
          </div>
        </div>
        <Link href="/member/ai" className="px-4 py-2.5 bg-accent text-bg text-xs font-bold rounded-xl whitespace-nowrap hover:opacity-90 shrink-0 shadow-[0_0_15px_rgba(232,255,71,0.25)]">
          Chatni Ochish →
        </Link>
      </Card>
    </div>
  );
}
