"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { User, QrCode, Flame, ShieldCheck, ChevronRight, CheckCircle2 } from "lucide-react";

export default function MemberApp() {
  const [isOnboarding, setIsOnboarding] = useState(true);
  const [isReady, setIsReady] = useState(false);

  useEffect(() => {
    // Check if user has completed onboarding before
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
    <div className="min-h-screen bg-neutral-950 text-white font-sans selection:bg-indigo-500/30 overflow-hidden relative">
      {/* Background gradients for dark glassmorphism */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-indigo-600/20 blur-[120px] rounded-full" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-purple-600/20 blur-[120px] rounded-full" />
      </div>

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
      className="flex flex-col items-center justify-center min-h-screen p-6 text-center"
    >
      <div className="w-24 h-24 mb-8 rounded-full bg-white/5 border border-white/10 flex items-center justify-center shadow-[0_0_40px_rgba(79,70,229,0.3)] backdrop-blur-md">
        <ShieldCheck className="w-12 h-12 text-indigo-400" />
      </div>
      <h1 className="text-3xl font-bold mb-4 bg-gradient-to-br from-white to-neutral-400 bg-clip-text text-transparent">
        Welcome to Retenix
      </h1>
      <p className="text-neutral-400 mb-10 max-w-xs leading-relaxed">
        Your digital membership card, attendance tracker, and community access all in one place.
      </p>

      <div className="space-y-4 w-full max-w-xs mb-12 text-left">
        {[
          { icon: <QrCode size={20} />, text: "Instant Gym Access" },
          { icon: <Flame size={20} />, text: "Track Your Streaks" },
          { icon: <User size={20} />, text: "Manage Membership" },
        ].map((feature, i) => (
          <motion.div
            key={i}
            initial={{ opacity: 0, x: -10 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ delay: i * 0.1 + 0.3 }}
            className="flex items-center gap-4 p-3 rounded-2xl bg-white/5 border border-white/5 backdrop-blur-sm"
          >
            <div className="text-indigo-400">{feature.icon}</div>
            <span className="text-sm font-medium text-neutral-200">{feature.text}</span>
          </motion.div>
        ))}
      </div>

      <button
        onClick={onComplete}
        className="w-full max-w-xs py-4 px-6 rounded-2xl bg-indigo-600 hover:bg-indigo-700 text-white font-semibold transition-colors flex items-center justify-center gap-2 active:scale-[0.98]"
      >
        Get Started <ChevronRight size={18} />
      </button>
    </motion.div>
  );
}

function DashboardScreen() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      className="flex flex-col min-h-screen p-4 pb-24"
    >
      {/* Header */}
      <header className="flex items-center justify-between mb-8 pt-4">
        <div>
          <h2 className="text-sm font-medium text-neutral-400">Welcome back,</h2>
          <h1 className="text-xl font-bold">Alex Walker</h1>
        </div>
        <div className="w-12 h-12 rounded-full bg-gradient-to-br from-indigo-500 to-purple-600 p-[2px]">
          <div className="w-full h-full rounded-full bg-neutral-900 flex items-center justify-center overflow-hidden">
             <User className="text-neutral-400" />
          </div>
        </div>
      </header>

      {/* Main Card (Glassmorphism) */}
      <div className="relative rounded-[32px] p-6 mb-6 overflow-hidden bg-white/5 border border-white/10 backdrop-blur-xl shadow-2xl">
        <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/20 blur-[50px] rounded-full" />
        
        <div className="flex justify-between items-start mb-8 relative z-10">
          <div>
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-green-500/10 text-green-400 text-xs font-semibold mb-3 border border-green-500/20">
              <CheckCircle2 size={14} /> Active
            </span>
            <h3 className="text-2xl font-bold tracking-tight">Pro Plan</h3>
            <p className="text-neutral-400 text-sm mt-1">Renews in 14 days</p>
          </div>
        </div>

        <div className="bg-white/5 rounded-2xl p-4 flex items-center justify-center aspect-square max-w-[200px] mx-auto mb-6 border border-white/10 backdrop-blur-md relative z-10">
          {/* Mock QR Code */}
          <div className="w-full h-full bg-white rounded-xl p-2 flex items-center justify-center">
            <QrCode className="w-full h-full text-black" strokeWidth={1} />
          </div>
        </div>
        
        <p className="text-center text-xs text-neutral-400 relative z-10">
          Scan at the entrance to access
        </p>
      </div>

      {/* Stats/Streak */}
      <div className="grid grid-cols-2 gap-4 mb-6">
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-orange-500/20 flex items-center justify-center mb-3 text-orange-400">
            <Flame size={20} />
          </div>
          <h4 className="text-2xl font-bold mb-1">12 <span className="text-sm font-normal text-neutral-400">days</span></h4>
          <p className="text-xs text-neutral-400 font-medium">Current Streak</p>
        </div>
        <div className="p-5 rounded-3xl bg-white/5 border border-white/10 backdrop-blur-md flex flex-col items-center justify-center text-center">
          <div className="w-10 h-10 rounded-full bg-indigo-500/20 flex items-center justify-center mb-3 text-indigo-400">
            <ShieldCheck size={20} />
          </div>
          <h4 className="text-2xl font-bold mb-1">24 <span className="text-sm font-normal text-neutral-400">visits</span></h4>
          <p className="text-xs text-neutral-400 font-medium">This Month</p>
        </div>
      </div>
    </motion.div>
  );
}
