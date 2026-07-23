'use client'

import React, { useState, useEffect } from 'react'
import { login, signup } from './actions'
import Link from 'next/link'
import { 
  ArrowRight, CheckCircle2, Send, Eye, EyeOff, 
  Mail, Lock, User, KeyRound, Sparkles, Zap, Shield
} from 'lucide-react'
import InteractiveDotGrid from '@/components/ui/interactive-dot-grid'

export function LoginForm({ message }: { message?: string }) {
  const [tab, setTab] = useState<'login' | 'signup'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  const [telegramUser, setTelegramUser] = useState<any>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const tg = (window as any).Telegram?.WebApp
      if (tg && tg.initDataUnsafe?.user) {
        const u = tg.initDataUnsafe.user
        setTelegramUser(u)
        const tgEmail = u.username ? `${u.username}@telegram.me` : `tg_${u.id}@retenix.ai`
        setEmail(tgEmail)
        setPassword('123456')
        setName(u.first_name + (u.last_name ? ' ' + u.last_name : ''))
      }
    }
  }, [])

  const handleTelegramAuth = () => {
    if (telegramUser) {
      const form = document.createElement('form')
      form.method = 'POST'
      form.action = login as any
      const inputEmail = document.createElement('input')
      inputEmail.name = 'email'
      inputEmail.value = email || 'member@fitzone.uz'
      const inputPass = document.createElement('input')
      inputPass.name = 'password'
      inputPass.value = '123456'
      form.appendChild(inputEmail)
      form.appendChild(inputPass)
      document.body.appendChild(form)
      form.submit()
    } else {
      window.open('https://t.me/retenixai_bot', '_blank')
    }
  }

  const passwordMismatch = tab === 'signup' && confirmPassword.length > 0 && password !== confirmPassword

  return (
    <div className="min-h-screen bg-bg flex relative overflow-hidden">
      {/* ---------- LEFT SIDE: Brand Panel (desktop/tablet only) ---------- */}
      <div className="hidden lg:flex lg:w-[480px] xl:w-[540px] relative flex-col justify-between p-10 xl:p-14 bg-surface border-r border-border overflow-hidden">
        {/* Dot Grid Background */}
        <InteractiveDotGrid
          gap={32}
          dotRadius={0.8}
          glowRadius={160}
          baseColor="rgba(82, 82, 106, 0.15)"
          activeColor="rgba(232, 255, 71, 0.6)"
        />
        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-accent/6 rounded-full blur-[140px] pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-[250px] h-[250px] bg-info/8 rounded-full blur-[120px] pointer-events-none" />

        {/* Top: Logo */}
        <div className="relative z-10">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-accent flex items-center justify-center font-display font-black text-bg text-xl shadow-[0_0_24px_rgba(232,255,71,0.3)] group-hover:shadow-[0_0_32px_rgba(232,255,71,0.5)] transition-shadow">
              R
            </div>
            <span className="font-display font-bold text-lg text-text-hi tracking-tight">Retenix.ai</span>
          </Link>
        </div>

        {/* Middle: Value Prop */}
        <div className="relative z-10 space-y-8">
          <div className="space-y-4">
            <h2 className="text-2xl xl:text-3xl font-display font-bold text-text-hi leading-tight">
              Fitness zalingiz uchun <span className="text-accent">AI-quvvatli</span> retention platformasi
            </h2>
            <p className="text-sm text-text-dim leading-relaxed max-w-sm">
              Mijozlar ketib qolishini 14 kun oldindan aniqlang va zudlik bilan saqlab qoling. 5-faktorli AI algoritm bilan.
            </p>
          </div>

          {/* Feature Chips */}
          <div className="space-y-3">
            {[
              { icon: Zap, text: '94.8% aniqlikda churn bashorat', color: 'text-accent' },
              { icon: Shield, text: 'Telegram Mini App — ilovasiz foydalanish', color: 'text-info' },
              { icon: Sparkles, text: '24/7 AI Trener va Copilot', color: 'text-good' },
            ].map((f, i) => (
              <div key={i} className="flex items-center gap-3 text-sm text-text-mid">
                <div className={`w-8 h-8 rounded-lg bg-surface-2 border border-border flex items-center justify-center ${f.color} flex-shrink-0`}>
                  <f.icon className="w-4 h-4" />
                </div>
                <span>{f.text}</span>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom: Stats */}
        <div className="relative z-10 flex items-center gap-6 text-center">
          <div>
            <div className="text-lg font-display font-bold text-accent">412+</div>
            <div className="text-[10px] font-mono text-text-dim">Zallar</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <div className="text-lg font-display font-bold text-good">34K+</div>
            <div className="text-[10px] font-mono text-text-dim">Faol a'zolar</div>
          </div>
          <div className="w-px h-8 bg-border" />
          <div>
            <div className="text-lg font-display font-bold text-info">94.8%</div>
            <div className="text-[10px] font-mono text-text-dim">Aniqlik</div>
          </div>
        </div>
      </div>

      {/* ---------- RIGHT SIDE: Auth Form ---------- */}
      <div className="flex-1 flex items-center justify-center p-6 sm:p-8 md:p-12 relative">
        {/* Background glow */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[500px] h-[500px] bg-accent/4 rounded-full blur-[150px] pointer-events-none" />

        <div className="w-full max-w-[420px] relative z-10">
          {/* Mobile Logo (hidden on desktop) */}
          <div className="flex items-center gap-2.5 mb-8 lg:hidden">
            <Link href="/" className="flex items-center gap-2.5">
              <div className="w-9 h-9 rounded-xl bg-accent flex items-center justify-center font-display font-black text-bg text-lg shadow-[0_0_20px_rgba(232,255,71,0.25)]">
                R
              </div>
              <span className="font-display font-bold text-base text-text-hi tracking-tight">Retenix.ai</span>
            </Link>
          </div>

          {/* Header */}
          <div className="mb-7">
            <h1 className="text-2xl sm:text-[1.7rem] font-display font-bold text-text-hi leading-tight">
              {tab === 'login' ? 'Xush kelibsiz' : 'Hisob yarating'}
            </h1>
            <p className="text-sm text-text-dim mt-1.5">
              {tab === 'login'
                ? "Davom etish uchun kiring yoki ro'yxatdan o'ting"
                : "Zal a'zosi sifatida ro'yxatdan o'ting"}
            </p>
          </div>

          {/* Tab Switcher */}
          <div className="flex bg-surface border border-border rounded-xl p-1 mb-6">
            <button
              onClick={() => setTab('login')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                tab === 'login'
                  ? 'bg-accent text-bg font-semibold shadow-[0_0_12px_rgba(232,255,71,0.2)]'
                  : 'text-text-dim hover:text-text-mid'
              }`}
            >
              Kirish
            </button>
            <button
              onClick={() => setTab('signup')}
              className={`flex-1 py-2.5 rounded-lg text-sm font-medium transition-all cursor-pointer ${
                tab === 'signup'
                  ? 'bg-accent text-bg font-semibold shadow-[0_0_12px_rgba(232,255,71,0.2)]'
                  : 'text-text-dim hover:text-text-mid'
              }`}
            >
              Ro'yxatdan o'tish
            </button>
          </div>

          {/* Telegram Auto-Detect Banner */}
          {telegramUser && (
            <div className="mb-5 p-3.5 rounded-xl bg-accent/10 border border-accent/30 text-accent text-xs font-mono flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Send className="w-4 h-4 text-accent flex-shrink-0" />
                <span className="truncate">✈️ {telegramUser.first_name} {telegramUser.last_name || ''} ({telegramUser.username ? '@' + telegramUser.username : 'ID: #' + telegramUser.id})</span>
              </div>
              <span className="text-[10px] bg-accent text-bg px-2 py-0.5 rounded font-bold flex-shrink-0 ml-2">Avto-profil</span>
            </div>
          )}

          {/* Telegram Button */}
          <button
            type="button"
            onClick={handleTelegramAuth}
            className="w-full py-3.5 rounded-xl bg-[#229ED9]/12 border border-[#229ED9]/35 text-[#56B4E9] hover:bg-[#229ED9]/20 font-medium text-sm transition-all flex items-center justify-center gap-2.5 cursor-pointer mb-5 group"
          >
            <Send className="w-4.5 h-4.5 group-hover:translate-x-0.5 transition-transform" />
            <span>
              {telegramUser 
                ? `Telegram bilan kirish (${telegramUser.first_name})`
                : "Telegram orqali davom etish"}
            </span>
          </button>

          {/* Divider */}
          <div className="flex items-center gap-3 mb-5">
            <div className="flex-1 h-px bg-border" />
            <span className="font-mono text-[10px] text-text-dim uppercase tracking-wider">yoki email bilan</span>
            <div className="flex-1 h-px bg-border" />
          </div>

          {/* Form */}
          <form className="space-y-4">
            <input type="hidden" name="role" value={tab === 'signup' ? 'member' : ''} />

            {/* Name (signup only) */}
            {tab === 'signup' && (
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-text-dim uppercase tracking-wider block" htmlFor="name">ISM</label>
                <div className="flex items-center bg-surface border border-border rounded-xl px-4 focus-within:border-accent/50 transition-colors">
                  <User className="w-4 h-4 text-text-dim flex-shrink-0" />
                  <input
                    id="name"
                    name="name"
                    type="text"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="Ismingiz"
                    className="flex-1 bg-transparent border-none outline-none text-sm text-text-hi placeholder:text-text-dim/50 py-3.5 px-3 font-body"
                  />
                </div>
              </div>
            )}

            {/* Email */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-text-dim uppercase tracking-wider block" htmlFor="email">EMAIL</label>
              <div className="flex items-center bg-surface border border-border rounded-xl px-4 focus-within:border-accent/50 transition-colors">
                <Mail className="w-4 h-4 text-text-dim flex-shrink-0" />
                <input
                  id="email"
                  name="email"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  placeholder="ism@gym.uz"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-text-hi placeholder:text-text-dim/50 py-3.5 px-3 font-body"
                />
              </div>
            </div>

            {/* Password */}
            <div className="space-y-1.5">
              <label className="font-mono text-[10px] text-text-dim uppercase tracking-wider block" htmlFor="password">PAROL</label>
              <div className="flex items-center bg-surface border border-border rounded-xl px-4 focus-within:border-accent/50 transition-colors">
                <Lock className="w-4 h-4 text-text-dim flex-shrink-0" />
                <input
                  id="password"
                  name="password"
                  type={showPassword ? 'text' : 'password'}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  placeholder="••••••••"
                  className="flex-1 bg-transparent border-none outline-none text-sm text-text-hi placeholder:text-text-dim/50 py-3.5 px-3 font-body"
                />
                <button type="button" onClick={() => setShowPassword(!showPassword)} className="text-text-dim hover:text-text-mid transition-colors cursor-pointer p-1">
                  {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                </button>
              </div>
            </div>

            {/* Confirm Password (signup only) */}
            {tab === 'signup' && (
              <div className="space-y-1.5">
                <label className="font-mono text-[10px] text-text-dim uppercase tracking-wider block" htmlFor="confirmPassword">PAROLNI TASDIQLANG</label>
                <div className={`flex items-center bg-surface border rounded-xl px-4 transition-colors ${
                  passwordMismatch ? 'border-bad/50' : 'border-border focus-within:border-accent/50'
                }`}>
                  <KeyRound className="w-4 h-4 text-text-dim flex-shrink-0" />
                  <input
                    id="confirmPassword"
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    required
                    placeholder="••••••••"
                    className="flex-1 bg-transparent border-none outline-none text-sm text-text-hi placeholder:text-text-dim/50 py-3.5 px-3 font-body"
                  />
                </div>
                {passwordMismatch && (
                  <p className="text-[11px] text-bad font-mono">Parollar mos kelmaydi</p>
                )}
              </div>
            )}

            {/* Forgot Password (login only) */}
            {tab === 'login' && (
              <div className="text-right">
                <button type="button" className="text-xs text-accent hover:text-accent/80 transition-colors cursor-pointer font-medium">
                  Parolni unutdingizmi?
                </button>
              </div>
            )}

            {/* Error Message */}
            {message && (
              <div className={`text-xs p-3.5 rounded-xl text-center font-mono border ${
                message.includes('Muvaffaqiyatli') 
                  ? 'text-good bg-good-dim border-good/30' 
                  : 'text-bad bg-bad-dim border-bad/30'
              }`}>
                {message}
              </div>
            )}

            {/* Submit Button */}
            {tab === 'login' ? (
              <button
                formAction={login}
                disabled={!email || !password}
                className="w-full bg-accent text-bg py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_25px_rgba(232,255,71,0.2)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                Kirish <ArrowRight className="w-4 h-4" />
              </button>
            ) : (
              <button
                formAction={signup}
                disabled={!email || !password || passwordMismatch || !name}
                className="w-full bg-accent text-bg py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_25px_rgba(232,255,71,0.2)] cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed mt-2"
              >
                Ro'yxatdan o'tish <CheckCircle2 className="w-4 h-4" />
              </button>
            )}
          </form>

          {/* Switch Line */}
          <p className="text-center text-sm text-text-dim mt-6">
            {tab === 'login' ? (
              <>Hisobingiz yo'qmi? <button onClick={() => setTab('signup')} className="text-accent font-medium hover:underline cursor-pointer">Ro'yxatdan o'tish</button></>
            ) : (
              <>Hisobingiz bormi? <button onClick={() => setTab('login')} className="text-accent font-medium hover:underline cursor-pointer">Kirish</button></>
            )}
          </p>

          {/* Info Note */}
          <div className="mt-6 p-3.5 rounded-xl bg-surface-2 border border-border text-[11px] text-text-dim font-mono leading-relaxed space-y-2">
            <div className="text-text-mid font-semibold text-xs mb-1.5">ℹ️ Tizimga qanday kirish mumkin?</div>
            <div className="flex items-start gap-2">
              <span className="text-accent">●</span>
              <span><span className="text-text-mid font-semibold">A'zo (Member)</span> — o'zingiz ro'yxatdan o'ting, keyin zal kodini kiritib qo'shilasiz</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-info">●</span>
              <span><span className="text-text-mid font-semibold">Zal egasi (Owner)</span> — Superadmin tomonidan yaratiladi</span>
            </div>
            <div className="flex items-start gap-2">
              <span className="text-good">●</span>
              <span><span className="text-text-mid font-semibold">Trener (Trainer)</span> — Zal egasi tomonidan yaratiladi</span>
            </div>
          </div>

          {/* Demo Quick Login */}
          <div className="mt-5 space-y-2">
            <div className="text-[10px] font-mono text-text-dim uppercase tracking-wider text-center">Demo hisoblar bilan sinab ko'ring</div>
            <div className="grid grid-cols-2 gap-2">
              {[
                { label: 'Owner', email: 'owner@fitzone.uz', color: 'border-accent/30 hover:border-accent/60' },
                { label: 'Trainer', email: 'trainer@fitzone.uz', color: 'border-info/30 hover:border-info/60' },
                { label: 'Member', email: 'member@fitzone.uz', color: 'border-good/30 hover:border-good/60' },
                { label: 'Admin', email: 'admin@retenix.ai', color: 'border-warn/30 hover:border-warn/60' },
              ].map((d) => (
                <form key={d.label} action={login}>
                  <input type="hidden" name="email" value={d.email} />
                  <input type="hidden" name="password" value="123456" />
                  <button
                    type="submit"
                    className={`w-full px-3 py-2.5 rounded-lg bg-surface border ${d.color} text-[11px] font-mono text-text-mid hover:text-text-hi transition-all cursor-pointer text-center`}
                  >
                    <div className="font-semibold text-text-hi">{d.label}</div>
                    <div className="text-[9px] text-text-dim mt-0.5 truncate">{d.email}</div>
                  </button>
                </form>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
