"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Sparkles, ArrowRight, CheckCircle2 } from "lucide-react";

export default function MemberOnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState("muscle");
  const [days, setDays] = useState(3);
  const [generating, setGenerating] = useState(false);

  const handleFinishOnboarding = () => {
    setGenerating(true);
    setTimeout(() => {
      setGenerating(false);
      router.push("/member");
    }, 2500);
  };

  return (
    <div className="space-y-6 text-center">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-3xl space-y-4">
        
        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8FF47]/10 border border-[#E8FF47]/30 text-[#E8FF47] text-[10px] font-mono">
          <Sparkles className="w-3.5 h-3.5" /> 2-SAVOLLI AI ONBOARDING
        </div>

        {generating ? (
          <div className="py-12 space-y-4">
            <div className="w-12 h-12 border-4 border-[#E8FF47] border-t-transparent rounded-full animate-spin mx-auto" />
            <h2 className="text-lg font-display font-bold text-white">Retenix AI siz uchun moslashtirilgan 7 kunlik reja yaratmoqda...</h2>
            <p className="text-xs text-gray-400 font-mono">90 soniyalik "Wow Moment" tayyorlanmoqda</p>
          </div>
        ) : step === 1 ? (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-white">1. Asosiy fitnes maqsadingiz nima?</h2>
            
            <div className="grid grid-cols-2 gap-3 text-xs font-semibold">
              {[
                { id: "muscle", label: "Massa & Mushak", icon: "💪" },
                { id: "fat", label: "Yog' yo'qotish (Ozish)", icon: "🔥" },
                { id: "stamina", label: "Chidamlik & Kardio", icon: "⚡" },
                { id: "health", label: "Umumiy Salomatlik", icon: "🌿" },
              ].map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`p-4 rounded-xl border flex flex-col items-center gap-2 transition-all ${
                    goal === g.id
                      ? "bg-[#E8FF47] text-[#080810] border-[#E8FF47] shadow-[0_0_15px_rgba(232,255,71,0.2)]"
                      : "bg-[#13131c] text-white border-[#1e1e2c]"
                  }`}
                >
                  <span className="text-2xl">{g.icon}</span>
                  <span>{g.label}</span>
                </button>
              ))}
            </div>

            <button
              onClick={() => setStep(2)}
              className="w-full bg-[#E8FF47] text-[#080810] py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 mt-4"
            >
              <span>Davom etish</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        ) : (
          <div className="space-y-4">
            <h2 className="text-xl font-display font-bold text-white">2. Haftada necha kun shug'ullana olasiz?</h2>

            <div className="grid grid-cols-3 gap-3 text-xs font-mono font-bold">
              {[2, 3, 4, 5].map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`p-4 rounded-xl border transition-all ${
                    days === d
                      ? "bg-[#E8FF47] text-[#080810] border-[#E8FF47]"
                      : "bg-[#13131c] text-white border-[#1e1e2c]"
                  }`}
                >
                  {d} KUN / HAF
                </button>
              ))}
            </div>

            <button
              onClick={handleFinishOnboarding}
              className="w-full bg-[#E8FF47] text-[#080810] py-3.5 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 mt-4 shadow-[0_0_20px_rgba(232,255,71,0.25)]"
            >
              <span>AI Rejani Yaratish</span>
              <Sparkles className="w-4 h-4" />
            </button>
          </div>
        )}

      </div>
    </div>
  );
}
