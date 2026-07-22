import React from 'react'
import { User, Mail, Shield, Building2, Activity, Key, Lock } from 'lucide-react'

interface ProfilePageProps {
  role: string
  fullName?: string
  email?: string
  gymInfo?: string
  stats?: {
    label: string
    value: string
  }[]
}

export function ProfilePage({ role, fullName = "Foydalanuvchi", email, gymInfo, stats }: ProfilePageProps) {
  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <h1 className="text-2xl font-display font-bold text-text-hi mb-4">Profil</h1>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* User Card */}
        <div className="col-span-1 bg-surface border border-border rounded-2xl p-6 flex flex-col items-center text-center">
          <div className="w-24 h-24 rounded-full bg-surface-3 border-2 border-accent flex items-center justify-center text-4xl font-display font-black text-text-hi mb-4">
            {fullName.charAt(0).toUpperCase()}
          </div>
          <h2 className="text-lg font-bold text-text-hi">{fullName}</h2>
          <div className="flex items-center gap-1.5 mt-1 text-text-dim text-sm">
            <Mail className="w-4 h-4" />
            {email || `${role}@demo.com`}
          </div>
          <div className="mt-3 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent text-xs font-mono uppercase tracking-wider">
            {role}
          </div>
          {gymInfo && (
            <div className="mt-4 pt-4 border-t border-border w-full flex items-center justify-center gap-2 text-sm text-text-mid">
              <Building2 className="w-4 h-4" />
              {gymInfo}
            </div>
          )}
        </div>

        {/* Activity & Stats */}
        <div className="col-span-1 md:col-span-2 space-y-6">
          {stats && stats.length > 0 && (
            <div className="bg-surface border border-border rounded-2xl p-6">
              <h3 className="text-sm font-semibold text-text-hi flex items-center gap-2 mb-4">
                <Activity className="w-4 h-4 text-accent" />
                Faollik Statistikasi
              </h3>
              <div className="grid grid-cols-2 gap-4">
                {stats.map((stat, i) => (
                  <div key={i} className="bg-surface-2 rounded-xl p-4 border border-border">
                    <div className="text-xs text-text-dim font-mono mb-1">{stat.label}</div>
                    <div className="text-xl font-bold text-text-hi">{stat.value}</div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Password Update */}
          <div className="bg-surface border border-border rounded-2xl p-6">
            <h3 className="text-sm font-semibold text-text-hi flex items-center gap-2 mb-4">
              <Lock className="w-4 h-4 text-accent" />
              Parolni O'zgartirish
            </h3>
            <form className="space-y-4">
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-text-dim uppercase">Yangi Parol</label>
                <input type="password" placeholder="••••••••" className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-hi focus:outline-none focus:border-accent" />
              </div>
              <div className="space-y-1.5">
                <label className="text-xs font-mono text-text-dim uppercase">Parolni Tasdiqlang</label>
                <input type="password" placeholder="••••••••" className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-sm text-text-hi focus:outline-none focus:border-accent" />
              </div>
              <button type="button" className="bg-surface-3 hover:bg-surface-3/80 border border-border text-text-hi px-4 py-2.5 rounded-xl text-sm font-medium transition-colors">
                Yangilash
              </button>
            </form>
          </div>
        </div>
      </div>
    </div>
  )
}
