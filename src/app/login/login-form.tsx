"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { 
  Zap, Mail, Lock, User, Eye, EyeOff, LockKeyhole, ArrowRight, 
  Send, ShieldAlert, CheckCircle2, Building2, UserCheck, Smartphone, Sparkles
} from "lucide-react";
import InteractiveDotGrid from "@/components/ui/interactive-dot-grid";

export default function LoginForm() {
  const router = useRouter();
  const [tab, setTab] = useState<"login" | "signup">("login");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Form inputs
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [gymCode, setGymCode] = useState("");

  const handleAuth = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      // Role resolution logic based on email domain / credentials
      const lowerEmail = email.toLowerCase().trim();
      let targetPath = "/member";

      if (lowerEmail.includes("owner") || lowerEmail.includes("fitzone")) {
        targetPath = "/owner/dashboard";
      } else if (lowerEmail.includes("trainer")) {
        targetPath = "/trainer/dashboard";
      } else if (lowerEmail.includes("admin") || lowerEmail.includes("super")) {
        targetPath = "/superadmin/dashboard";
      } else {
        targetPath = "/member";
      }

      router.push(targetPath);
    } catch (err: any) {
      setError(err?.message || "Avtorizatsiyada xatolik yuz berdi");
    } finally {
      setLoading(false);
    }
  };

  const handleDemoLogin = (role: "owner" | "trainer" | "member" | "superadmin") => {
    setLoading(true);
    setTimeout(() => {
      if (role === "owner") router.push("/owner/dashboard");
      else if (role === "trainer") router.push("/trainer/dashboard");
      else if (role === "superadmin") router.push("/superadmin/dashboard");
      else router.push("/member");
    }, 400);
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white flex items-center justify-center p-4 lg:p-8 font-body selection:bg-[#E8FF47]/25 selection:text-black relative overflow-hidden">
      
      {/* Background Dot Grid for full page */}
      <InteractiveDotGrid gap={28} glowRadius={180} />

      <div className="w-full max-w-5xl bg-[#0d0d16]/90 backdrop-blur-xl border border-[#1e1e2c] rounded-3xl overflow-hidden shadow-2xl grid lg:grid-cols-12 relative z-10 my-auto">
        
        {/* Left Brand Panel (Desktop/Tablet) */}
        <div className="lg:col-span-5 bg-[#13131c] border-b lg:border-b-0 lg:border-r border-[#1e1e2c] p-8 lg:p-10 flex flex-col justify-between relative overflow-hidden">
          <InteractiveDotGrid gap={20} glowRadius={140} activeColor="rgba(232, 255, 71, 0.4)" />
          
          <div className="relative z-10 space-y-6">
            <Link href="/" className="inline-flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-[#E8FF47] flex items-center justify-center text-[#080810] font-display font-black text-lg shadow-[0_0_20px_rgba(232,255,71,0.3)]">
                R
              </div>
              <span className="font-display font-bold text-xl tracking-tight text-white">Retenix.ai</span>
            </Link>

            <div className="space-y-3 pt-4">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8FF47]/10 border border-[#E8FF47]/30 text-[#E8FF47] text-[11px] font-mono">
                <Sparkles className="w-3.5 h-3.5" /> 5-Factor Churn Engine
              </div>
              <h2 className="text-2xl lg:text-3xl font-display font-bold leading-tight text-white">
                Zal mijozlarini <span className="text-[#E8FF47]">14 kun oldin</span> ushlab qoling
              </h2>
              <p className="text-sm text-gray-400 leading-relaxed">
                Retenix sun'iy intellekt platformasi orqali a'zolar davomadini oshiring va oylik daromadni saqlab qoling.
              </p>
            </div>
          </div>

          {/* 1-Click Quick Demo Accounts */}
          <div className="relative z-10 pt-8 space-y-3 border-t border-[#1e1e2c] mt-8">
            <span className="text-[10px] font-mono uppercase tracking-widest text-gray-400 block mb-2">
              ⚡ 1-CLICK DEMO AKKUNTLAR
            </span>
            <div className="grid grid-cols-2 gap-2">
              <button 
                type="button"
                onClick={() => handleDemoLogin("owner")}
                className="p-2.5 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] hover:border-[#E8FF47]/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-[#E8FF47]">
                  <span>Gym Owner</span>
                  <Building2 className="w-3.5 h-3.5 text-[#E8FF47]" />
                </div>
                <span className="text-[10px] font-mono text-gray-400 block mt-0.5">owner@fitzone.uz</span>
              </button>

              <button 
                type="button"
                onClick={() => handleDemoLogin("trainer")}
                className="p-2.5 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] hover:border-[#E8FF47]/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-[#E8FF47]">
                  <span>Trainer</span>
                  <UserCheck className="w-3.5 h-3.5 text-[#5DCAA5]" />
                </div>
                <span className="text-[10px] font-mono text-gray-400 block mt-0.5">trainer@fitzone.uz</span>
              </button>

              <button 
                type="button"
                onClick={() => handleDemoLogin("member")}
                className="p-2.5 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] hover:border-[#E8FF47]/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-[#E8FF47]">
                  <span>Member (TMA)</span>
                  <Smartphone className="w-3.5 h-3.5 text-[#7BB6E8]" />
                </div>
                <span className="text-[10px] font-mono text-gray-400 block mt-0.5">member@fitzone.uz</span>
              </button>

              <button 
                type="button"
                onClick={() => handleDemoLogin("superadmin")}
                className="p-2.5 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] hover:border-[#E8FF47]/50 text-left transition-all group"
              >
                <div className="flex items-center justify-between text-xs font-semibold text-white group-hover:text-[#E8FF47]">
                  <span>SuperAdmin</span>
                  <LockKeyhole className="w-3.5 h-3.5 text-[#E24B4A]" />
                </div>
                <span className="text-[10px] font-mono text-gray-400 block mt-0.5">admin@retenix.ai</span>
              </button>
            </div>
          </div>

        </div>

        {/* Right Form Panel */}
        <div className="lg:col-span-7 p-6 sm:p-8 lg:p-12 flex flex-col justify-center">
          
          {/* Header */}
          <div className="mb-6">
            <h1 className="font-display text-2xl sm:text-3xl font-bold text-white mb-1.5">
              {tab === "login" ? "Xush kelibsiz" : "Hisob yarating"}
            </h1>
            <p className="text-xs sm:text-sm text-gray-400">
              {tab === "login" 
                ? "Davom etish uchun kiring yoki ro'yxatdan o'ting" 
                : "Zal a'zosi sifatidagi profilni faollashtiring"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-[#0d0d16] border border-[#1e1e2c] rounded-xl p-1 mb-6">
            <button
              type="button"
              onClick={() => setTab("login")}
              className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                tab === "login"
                  ? "bg-[#E8FF47] text-[#080810] shadow-[0_0_15px_rgba(232,255,71,0.2)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Kirish
            </button>
            <button
              type="button"
              onClick={() => setTab("signup")}
              className={`flex-1 py-2.5 rounded-lg text-xs sm:text-sm font-medium transition-all ${
                tab === "signup"
                  ? "bg-[#E8FF47] text-[#080810] shadow-[0_0_15px_rgba(232,255,71,0.2)]"
                  : "text-gray-400 hover:text-white"
              }`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {/* Telegram 1-Click Auth */}
          <button
            type="button"
            onClick={() => handleDemoLogin("member")}
            className="w-full bg-[#13131c] hover:bg-[#1a1a26] border border-[#1e1e2c] text-white py-3 px-4 rounded-xl text-xs sm:text-sm font-medium flex items-center justify-center gap-2.5 transition-all mb-4 group"
          >
            <Send className="w-4 h-4 text-[#2AABEE]" />
            <span>Telegram orqali davom etish</span>
          </button>

          <div className="flex items-center gap-3 my-4">
            <div className="flex-1 h-[1px] bg-[#1e1e2c]" />
            <span className="font-mono text-[10px] text-gray-400 uppercase tracking-widest">
              YOKI EMAIL BILAN
            </span>
            <div className="flex-1 h-[1px] bg-[#1e1e2c]" />
          </div>

          {error && (
            <div className="mb-4 p-3 rounded-xl bg-[#E24B4A]/10 border border-[#E24B4A]/30 text-[#E24B4A] text-xs flex items-center gap-2">
              <ShieldAlert className="w-4 h-4 flex-shrink-0" />
              <span>{error}</span>
            </div>
          )}

          {/* Auth Form */}
          <form onSubmit={handleAuth} className="space-y-4">
            {tab === "signup" && (
              <>
                <div>
                  <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                    F.I.SH (ISM-FAMILIYA)
                  </label>
                  <div className="flex items-center bg-[#0d0d16] border border-[#1e1e2c] rounded-xl px-3.5 focus-within:border-[#E8FF47]/50 transition-colors">
                    <User className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      required
                      value={fullName}
                      onChange={(e) => setFullName(e.target.value)}
                      placeholder="Jasur Toshmatov"
                      className="w-full bg-transparent border-none text-white text-xs sm:text-sm px-3 py-3 outline-none"
                    />
                  </div>
                </div>

                <div>
                  <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                    ZAL MAXSUS KODI (GYM CODE)
                  </label>
                  <div className="flex items-center bg-[#0d0d16] border border-[#1e1e2c] rounded-xl px-3.5 focus-within:border-[#E8FF47]/50 transition-colors">
                    <Building2 className="w-4 h-4 text-gray-400 flex-shrink-0" />
                    <input
                      type="text"
                      value={gymCode}
                      onChange={(e) => setGymCode(e.target.value)}
                      placeholder="FITZONE-2026"
                      className="w-full bg-transparent border-none text-white text-xs sm:text-sm px-3 py-3 outline-none"
                    />
                  </div>
                </div>
              </>
            )}

            <div>
              <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                EMAIL
              </label>
              <div className="flex items-center bg-[#0d0d16] border border-[#1e1e2c] rounded-xl px-3.5 focus-within:border-[#E8FF47]/50 transition-colors">
                <Mail className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ism@gym.uz"
                  className="w-full bg-transparent border-none text-white text-xs sm:text-sm px-3 py-3 outline-none"
                />
              </div>
            </div>

            <div>
              <label className="block font-mono text-[10px] text-gray-400 uppercase tracking-widest mb-1.5">
                PAROL
              </label>
              <div className="flex items-center bg-[#0d0d16] border border-[#1e1e2c] rounded-xl px-3.5 focus-within:border-[#E8FF47]/50 transition-colors">
                <Lock className="w-4 h-4 text-gray-400 flex-shrink-0" />
                <input
                  type={showPassword ? "text" : "password"}
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  className="w-full bg-transparent border-none text-white text-xs sm:text-sm px-3 py-3 outline-none"
                />
                <button
                  type="button"
                  onClick={() => setShowPassword(!showPassword)}
                  className="text-gray-400 hover:text-white"
                >
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {tab === "login" && (
              <div className="flex justify-end pt-1">
                <button type="button" className="text-xs text-[#E8FF47] hover:underline font-medium">
                  Parolni unutdingizmi?
                </button>
              </div>
            )}

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-[#E8FF47] hover:bg-[#d8ef37] text-[#080810] py-3.5 px-4 rounded-xl text-sm font-semibold flex items-center justify-center gap-2 transition-all shadow-[0_0_20px_rgba(232,255,71,0.2)] mt-6"
            >
              <span>{loading ? "Yuklanmoqda..." : tab === "login" ? "Kirish" : "Ro'yxatdan o'tish"}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </form>

          {/* Role Access Information Note */}
          <div className="mt-6 p-3.5 rounded-xl bg-[#13131c] border border-[#1e1e2c] text-[11px] text-gray-400 space-y-1">
            <span className="font-semibold text-white block">ℹ️ Rolga kirish qoidalari:</span>
            <p>• <strong>Gym Owner / Trainer</strong>: SuperAdmin yoki Zal Egasi tomonidan ro'yxatdan o'tkaziladi.</p>
            <p>• <strong>Member</strong>: Sayt va Telegram Mini App orqali o'zi ro'yxatdan o'tadi.</p>
          </div>

        </div>

      </div>
    </div>
  );
}
