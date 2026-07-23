"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { 
  User, QrCode, Flame, ShieldCheck, ChevronRight, CheckCircle2, Trophy, Utensils, 
  Dumbbell, Calendar, Zap, Sparkles, Bot, ArrowRight, Building2, Check, MessageSquare, 
  Send, Plus, Clock, Camera
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { useLanguage } from "@/context/language-context";

interface ChatMessage {
  sender: string;
  text: string;
}

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

  // AI Chat Messages State
  const [chatInput, setChatInput] = useState("");
  const [chatMessages, setChatMessages] = useState<ChatMessage[]>([
    { sender: "ai", text: "Salom! Men sizning 24/7 AI Treneringizman. Bugun nima haqida yordam bera olaman?" },
    { sender: "user", text: "Osh necha kaloriya?" },
    { sender: "ai", text: "O'rtacha porsiya osh (300g) — taxminan 540 kcal. Sizning kunlik normangizning 30% ini tashkil qiladi." },
  ]);

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

  const handleSendMessage = () => {
    if (!chatInput.trim()) return;
    const userMsg = chatInput;
    setChatMessages(prev => [...prev, { sender: "user", text: userMsg }]);
    setChatInput("");

    setTimeout(() => {
      let reply = "Juda yaxshi savol! Mashg'ulotlardan so'ng ko'proq oqsilli (protein) taomlar iste'mol qilish tavsiya etiladi.";
      if (userMsg.toLowerCase().includes("tuxum")) {
        reply = "1 ta qaynatilgan tuxum taxminan 70 kcal va 6g sifatli protein beradi.";
      } else if (userMsg.toLowerCase().includes("suv")) {
        reply = "Kunlik suv normangiz kamida 2.5 litr bo'lishi tavsiya etiladi.";
      }
      setChatMessages(prev => [...prev, { sender: "ai", text: reply }]);
    }, 600);
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
          <ActionFirstDashboard 
            key="dashboard"
            selectedTrainer={selectedTrainer}
            chatInput={chatInput}
            setChatInput={setChatInput}
            chatMessages={chatMessages}
            handleSendMessage={handleSendMessage}
            onResetOnboarding={() => setIsOnboarding(true)}
          />
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
                    ? "bg-accent/10 border-accent text-text-hi shadow-[0_0_20px_rgba(232,255,71,0.15)]"
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
                className="w-full bg-surface-2 border border-border rounded-xl p-3 text-sm text-text-hi font-mono focus:border-accent outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-text-dim">Bo'y (cm):</label>
              <input
                type="number"
                value={height}
                onChange={(e) => setHeight(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-xl p-3 text-sm text-text-hi font-mono focus:border-accent outline-none"
              />
            </div>
            <div className="space-y-1">
              <label className="text-xs font-mono text-text-dim">Yosh:</label>
              <input
                type="number"
                value={age}
                onChange={(e) => setAge(e.target.value)}
                className="w-full bg-surface-2 border border-border rounded-xl p-3 text-sm text-text-hi font-mono focus:border-accent outline-none"
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
                className="w-full bg-surface-2 border border-accent/40 rounded-xl pl-10 pr-4 py-3 text-sm font-mono text-accent uppercase font-bold focus:outline-none"
              />
            </div>

            {gymCodeValid && (
              <div className="p-3 rounded-xl bg-good/10 border border-good/30 text-good text-xs font-mono flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" /> FitZone Yunusobod Zali Biriktirildi!
              </div>
            )}
          </div>
        </motion.div>
      )}

      {/* STEP 4: 90-SECOND WOW MOMENT (AI PLAN GENERATED) */}
      {step === 4 && (
        <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} className="space-y-5 my-auto py-6 text-center">
          <div className="w-16 h-16 rounded-2xl bg-accent/10 border border-accent/30 flex items-center justify-center text-3xl mx-auto shadow-[0_0_30px_rgba(232,255,71,0.25)]">
            🎯
          </div>
          <div className="space-y-2">
            <h1 className="text-2xl sm:text-3xl font-display font-bold text-text-hi">Profilingiz Tayyor!</h1>
            <p className="text-xs text-text-dim max-w-xs mx-auto leading-relaxed">
              Retenix AI sizning {weight}kg vazningiz va maqsadingizga mos shaxsiy normani hisobladi:
            </p>
          </div>

          <div className="p-4 rounded-2xl bg-surface border border-accent/30 text-left space-y-2">
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
                className={`p-3.5 rounded-2xl border transition-all cursor-pointer flex items-center justify-between ${
                  selectedTrainer === t.id
                    ? "bg-accent/10 border-accent text-text-hi shadow-[0_0_15px_rgba(232,255,71,0.15)]"
                    : "bg-surface border-border text-text-mid hover:border-accent/40"
                }`}
              >
                <div>
                  <div className="text-xs font-bold">{t.name}</div>
                  <div className="text-[10px] text-text-dim">{t.role}</div>
                </div>
                <span className="px-2 py-0.5 rounded bg-surface-2 border border-border text-[9px] font-mono text-accent">
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
            className="flex-1 py-3.5 rounded-xl border border-border text-xs font-mono text-text-mid hover:text-text-hi"
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

interface ActionFirstDashboardProps {
  selectedTrainer: string;
  chatInput: string;
  setChatInput: (val: string) => void;
  chatMessages: ChatMessage[];
  handleSendMessage: () => void;
  onResetOnboarding: () => void;
}

{/* Action-First Dashboard Screen */}
function ActionFirstDashboard({
  selectedTrainer, chatInput, setChatInput, chatMessages, handleSendMessage, onResetOnboarding
}: ActionFirstDashboardProps) {
  const [checkedIn, setCheckedIn] = useState(false);

  return (
    <div className="p-4 sm:p-6 space-y-6 max-w-4xl mx-auto pb-24">
      {/* Top Header */}
      <div className="flex items-center justify-between">
        <div>
          <div className="text-[10px] font-mono text-text-dim uppercase tracking-widest">XUSH KELIBSIZ</div>
          <h2 className="text-xl sm:text-2xl font-display font-bold text-text-hi">Salom, Jasur 👋</h2>
        </div>
        <button 
          onClick={onResetOnboarding}
          className="text-[10px] font-mono text-accent bg-accent/10 border border-accent/20 px-2.5 py-1 rounded-lg hover:underline"
        >
          Onboarding-ni Qayta O'tish
        </button>
      </div>

      {/* Primary Action Card: Turnstile Check-in CTA */}
      <Card className="bg-surface border-accent/40 shadow-[0_0_30px_rgba(232,255,71,0.1)] p-5 text-center space-y-3">
        <div className="text-[10px] font-mono text-accent uppercase tracking-widest">
          {checkedIn ? "✓ TURNIKET KIK-IN BAJARILDI" : "BUGUN HALI CHECK-IN QILMADINGIZ"}
        </div>
        
        {checkedIn ? (
          <div className="p-3 rounded-xl bg-good/10 border border-good/30 text-good font-mono text-xs flex items-center justify-center gap-2">
            <CheckCircle2 className="w-4 h-4" /> FitZone Yunusobod Turniketidan Kirdingiz! (+10 XP)
          </div>
        ) : (
          <button
            onClick={() => setCheckedIn(true)}
            className="w-full py-4 rounded-xl bg-accent text-bg font-display font-bold text-sm hover:opacity-90 transition-opacity shadow-[0_0_25px_rgba(232,255,71,0.3)] flex items-center justify-center gap-2 cursor-pointer"
          >
            📍 Gym ga keldim (QR Turniket Pass)
          </button>
        )}
      </Card>

      {/* Daily Progress: Calorie Bar */}
      <Card className="bg-surface border-border p-4 space-y-2">
        <div className="flex justify-between items-center text-xs font-mono">
          <span className="text-text-dim">BUGUNGI KALORIYA NORMA</span>
          <span className="text-text-hi"><b className="text-accent">540</b> / 1,840 kcal</span>
        </div>
        <div className="h-2 bg-surface-2 rounded-full overflow-hidden border border-border">
          <div className="h-full bg-accent rounded-full" style={{ width: "30%" }} />
        </div>
      </Card>

      {/* Quick Action Buttons */}
      <div className="grid grid-cols-2 gap-3">
        <div className="p-4 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all text-center space-y-1.5 cursor-pointer">
          <div className="text-2xl">🥗</div>
          <div className="text-xs font-bold text-text-hi">Ovqat Qo'shish</div>
          <div className="text-[10px] text-text-dim font-mono">AI bilan yozish</div>
        </div>
        <div className="p-4 rounded-2xl bg-surface border border-border hover:border-accent/30 transition-all text-center space-y-1.5 cursor-pointer">
          <div className="text-2xl">📸</div>
          <div className="text-xs font-bold text-text-hi">Progress Foto</div>
          <div className="text-[10px] text-text-dim font-mono">AI tahlil</div>
        </div>
      </div>

      {/* 24/7 AI Coach Interface */}
      <Card className="bg-surface border-border">
        <CardHeader className="pb-2 border-b border-border flex flex-row items-center justify-between">
          <CardTitle className="text-xs font-display font-bold flex items-center gap-2 text-text-hi">
            <Bot className="w-4 h-4 text-accent" /> 24/7 AI Trener Bilan Muloqot
          </CardTitle>
          <span className="text-[10px] font-mono text-good flex items-center gap-1">
            <span className="w-1.5 h-1.5 rounded-full bg-good animate-pulse" /> Online
          </span>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          <div className="space-y-2.5 max-h-48 overflow-y-auto pr-1">
            {chatMessages.map((msg, idx) => (
              <div 
                key={idx}
                className={`max-w-[85%] p-3 rounded-xl text-xs font-body leading-relaxed ${
                  msg.sender === 'ai'
                    ? "bg-surface-2 border border-border text-text-hi self-start rounded-tl-none"
                    : "bg-accent text-bg font-semibold ml-auto rounded-tr-none"
                }`}
              >
                {msg.text}
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2 border-t border-border">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSendMessage()}
              placeholder="Savolingizni yozing..."
              className="flex-1 bg-surface-2 border border-border rounded-xl px-3 py-2 text-xs text-text-hi focus:border-accent outline-none"
            />
            <button
              onClick={handleSendMessage}
              className="p-2 bg-accent text-bg rounded-xl hover:opacity-90 cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
