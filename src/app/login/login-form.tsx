'use client'

import React, { useState, useEffect } from 'react'
import { login, signup } from './actions'
import { Shield, Building2, Dumbbell, User, ArrowRight, ArrowLeft, CheckCircle2, Bot, Send, Sparkles } from 'lucide-react'

const ROLE_CARDS = [
  {
    id: 'owner',
    icon: Building2,
    title: 'Gym Owner',
    desc: 'CRM, a\'zolar va retention analitikasi',
    badge: 'Biznes boshqaruvi',
    demoEmail: 'owner@fitzone.uz'
  },
  {
    id: 'trainer',
    icon: Dumbbell,
    title: 'Trainer',
    desc: 'Mijozlar, jadval va AI Copilot',
    badge: 'Trenerlar uchun',
    demoEmail: 'trainer@fitzone.uz'
  },
  {
    id: 'member',
    icon: User,
    title: 'Member',
    desc: 'Mobil ilova — mashq, ovqat va AI Trener',
    badge: 'Zal a\'zosi',
    demoEmail: 'member@fitzone.uz'
  },
  {
    id: 'superadmin',
    icon: Shield,
    title: 'Super Admin',
    desc: 'Platforma darajasidagi global nazorat',
    badge: 'Tizim ma\'muri',
    demoEmail: 'admin@retenix.ai'
  }
]

export function LoginForm({ message }: { message?: string }) {
  const [selectedRole, setSelectedRole] = useState<string | null>(null)
  const [isRegisterMode, setIsRegisterMode] = useState(false)
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [telegramUser, setTelegramUser] = useState<any>(null)

  useEffect(() => {
    // Auto-detect Telegram WebApp User Data
    if (typeof window !== 'undefined') {
      const tg = (window as any).Telegram?.WebApp
      if (tg && tg.initDataUnsafe?.user) {
        const u = tg.initDataUnsafe.user
        setTelegramUser(u)
        // Pre-fill email and default role for Telegram member
        const tgEmail = u.username ? `${u.username}@telegram.me` : `tg_${u.id}@fitzone.uz`
        setEmail(tgEmail)
        setPassword('123456')
        setSelectedRole('member')
      }
    }
  }, [])

  const activeRoleCard = ROLE_CARDS.find(r => r.id === selectedRole)

  const handleSelectRole = (roleId: string) => {
    setSelectedRole(roleId)
    const card = ROLE_CARDS.find(r => r.id === roleId)
    if (card) {
      setEmail(card.demoEmail)
    }
  }

  const handleTelegramAuth = () => {
    if (telegramUser) {
      // Direct login inside Telegram
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
      // Redirect to Telegram Bot
      window.open('https://t.me/RetenixAiBot', '_blank')
    }
  }

  return (
    <div className="w-full max-w-md bg-surface border border-border rounded-2xl p-8 relative z-10 shadow-2xl transition-all">
      {/* Header Logo */}
      <div className="flex flex-col items-center mb-6">
        <div className="w-12 h-12 rounded-xl bg-accent flex items-center justify-center font-display font-black text-bg text-2xl mb-3 shadow-[0_0_20px_rgba(232,255,71,0.25)]">
          R
        </div>
        <h1 className="text-2xl font-display font-bold text-text-hi tracking-tight">Retenix AI</h1>
        <p className="text-text-dim text-xs mt-1 font-mono uppercase tracking-wider">
          {selectedRole ? `${activeRoleCard?.title} Sifatida Kirish` : 'Rolni Tanlang'}
        </p>
      </div>

      {/* TELEGRAM AUTO-DETECTED BANNER */}
      {telegramUser && (
        <div className="mb-5 p-3 rounded-xl bg-accent/10 border border-accent/30 text-accent text-xs font-mono flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Bot className="w-4 h-4 text-accent" />
            <span>✈️ {telegramUser.first_name} {telegramUser.last_name || ''} (@{telegramUser.username || 'tg'})</span>
          </div>
          <span className="text-[10px] bg-accent text-bg px-2 py-0.5 rounded font-bold">Avto-profil</span>
        </div>
      )}

      {/* TELEGRAM 1-CLICK AUTH BUTTON */}
      <div className="mb-6">
        <button
          type="button"
          onClick={handleTelegramAuth}
          className="w-full py-3 rounded-xl bg-[#229ED9]/15 border border-[#229ED9]/40 text-[#229ED9] hover:bg-[#229ED9]/25 font-semibold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer shadow-md"
        >
          <Send className="w-4 h-4" />
          <span>{telegramUser ? `Telegram Profilingiz Bilan Kirish (${telegramUser.first_name})` : "Telegram Orqali Kirish / Ro'yxatdan O'tish (@RetenixAiBot)"}</span>
        </button>
      </div>

      <div className="relative flex py-2 items-center mb-5">
        <div className="flex-grow border-t border-border"></div>
        <span className="flex-shrink mx-3 text-text-dim font-mono text-[10px] uppercase">yoki email orqali</span>
        <div className="flex-grow border-t border-border"></div>
      </div>

      {/* Step 1: Role Picker */}
      {!selectedRole ? (
        <div className="flex flex-col gap-3">
          <p className="text-center text-xs text-text-mid mb-2">
            Istalgan rolni tanlab, tizimga kiring yoki ro'yxatdan o'ting:
          </p>

          {ROLE_CARDS.map((card) => {
            const Icon = card.icon
            return (
              <div key={card.id} className="group relative bg-surface-2 border border-border hover:border-accent/40 rounded-xl overflow-hidden transition-all hover:bg-surface-3">
                <button
                  onClick={() => handleSelectRole(card.id)}
                  type="button"
                  className="w-full flex items-center gap-4 p-4 text-left cursor-pointer z-10 relative"
                >
                  <div className="w-10 h-10 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent group-hover:scale-105 transition-transform flex-shrink-0">
                    <Icon className="w-5 h-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2">
                      <span className="font-display font-semibold text-sm text-text-hi">{card.title}</span>
                      <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface3 text-text-mid border border-border">
                        {card.badge}
                      </span>
                    </div>
                    <p className="text-xs text-text-dim mt-0.5 truncate">{card.desc}</p>
                    <div className="text-[10px] text-text-dim mt-1 font-mono">Demo: {card.demoEmail} (123456)</div>
                  </div>
                </button>
                <form action={login} className="absolute right-4 top-1/2 -translate-y-1/2 z-20 opacity-0 group-hover:opacity-100 transition-opacity">
                  <input type="hidden" name="email" value={card.demoEmail} />
                  <input type="hidden" name="password" value="123456" />
                  <button type="submit" className="bg-accent text-bg px-3 py-1.5 rounded-lg text-xs font-semibold hover:opacity-90 flex items-center gap-1 shadow-[0_0_10px_rgba(232,255,71,0.2)]">
                    1-Click
                  </button>
                </form>
              </div>
            )
          })}
        </div>
      ) : (
        /* Step 2: Auth Form (Login / Register) */
        <form className="flex flex-col gap-4">
          <input type="hidden" name="role" value={selectedRole} />

          {/* Role Indicator Bar */}
          <div className="flex items-center justify-between bg-surface-2 border border-accent/20 rounded-xl px-4 py-3 mb-2">
            <div className="flex items-center gap-3">
              {activeRoleCard && (
                <activeRoleCard.icon className="w-5 h-5 text-accent" />
              )}
              <div>
                <div className="text-xs font-semibold text-text-hi">{activeRoleCard?.title}</div>
                <div className="text-[10px] text-text-dim font-mono">{activeRoleCard?.badge}</div>
              </div>
            </div>
            <button
              type="button"
              onClick={() => setSelectedRole(null)}
              className="text-xs text-text-mid hover:text-accent flex items-center gap-1 font-mono transition-colors"
            >
              <ArrowLeft className="w-3 h-3" /> Ortga
            </button>
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono tracking-wider text-text-mid uppercase" htmlFor="email">
              Email / Telegram Pochta
            </label>
            <input
              id="email"
              name="email"
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              className="bg-surface-2 border border-border-2 rounded-xl px-4 py-3 text-sm text-text-hi placeholder-text-dim focus:outline-none focus:border-accent transition-colors font-mono"
              placeholder="user@example.com"
            />
          </div>

          <div className="flex flex-col gap-1.5">
            <label className="text-xs font-mono tracking-wider text-text-mid uppercase" htmlFor="password">
              Parol
            </label>
            <input
              id="password"
              name="password"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              className="bg-surface-2 border border-border-2 rounded-xl px-4 py-3 text-sm text-text-hi placeholder-text-dim focus:outline-none focus:border-accent transition-colors font-mono"
              placeholder="••••••••"
            />
          </div>

          {message && (
            <div className="text-xs text-bad bg-bad-dim border border-bad/30 p-3 rounded-xl text-center font-mono">
              {message}
            </div>
          )}

          <div className="flex flex-col gap-2.5 mt-3">
            {!isRegisterMode ? (
              <>
                <button
                  formAction={login}
                  className="bg-accent text-bg px-4 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,255,71,0.2)] cursor-pointer"
                >
                  Kirish <ArrowRight className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(true)}
                  className="bg-transparent border border-border-2 text-text-mid hover:text-text-hi px-4 py-3 rounded-xl font-medium text-xs hover:bg-surface-2 transition-colors cursor-pointer"
                >
                  Yangi akkaunt yaratish (Register)
                </button>
              </>
            ) : (
              <>
                <button
                  formAction={signup}
                  className="bg-accent text-bg px-4 py-3.5 rounded-xl font-semibold text-sm flex items-center justify-center gap-2 hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,255,71,0.2)] cursor-pointer"
                >
                  Ro'yxatdan o'tish <CheckCircle2 className="w-4 h-4" />
                </button>
                <button
                  type="button"
                  onClick={() => setIsRegisterMode(false)}
                  className="bg-transparent border border-border-2 text-text-mid hover:text-text-hi px-4 py-3 rounded-xl font-medium text-xs hover:bg-surface-2 transition-colors cursor-pointer"
                >
                  Mavjud akkauntga kirish (Login)
                </button>
              </>
            )}
          </div>
        </form>
      )}
    </div>
  )
}
