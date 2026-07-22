"use client";

import React from "react";
import { Settings, Shield, Bell, User, Key, Save } from "lucide-react";

export default function SettingsPage() {
  return (
    <div className="p-4 md:p-8 space-y-6 max-w-4xl">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-text-hi flex items-center gap-2">
          <Settings className="w-7 h-7 text-accent" /> Sozlamalar
        </h1>
        <p className="text-text-dim text-sm mt-1">Hisob va xavfsizlik sozlamalarini boshqaring</p>
      </div>

      <div className="bg-surface border border-border rounded-2xl p-6 space-y-6">
        <div className="space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-text-dim">Profil ma'lumotlari</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-mono text-text-mid mb-1 block">Ism Familiya</label>
              <input defaultValue="Foydalanuvchi" className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-xs text-text-hi font-body" />
            </div>
            <div>
              <label className="text-xs font-mono text-text-mid mb-1 block">Email</label>
              <input defaultValue="user@fitzone.uz" className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-xs text-text-hi font-body" />
            </div>
          </div>
        </div>

        <div className="pt-4 border-t border-border space-y-4">
          <h3 className="text-sm font-mono uppercase tracking-wider text-text-dim">Bildirishnomalar</h3>
          <div className="space-y-3">
            {["Churn ogohlantirishlari (Email)", "Kunlik faollik hisoboti", "Telegram bot bildirishnomalari"].map((label, i) => (
              <label key={i} className="flex items-center justify-between p-3 rounded-xl bg-surface-2 border border-border cursor-pointer">
                <span className="text-xs text-text-hi font-medium">{label}</span>
                <input type="checkbox" defaultChecked className="accent-accent w-4 h-4" />
              </label>
            ))}
          </div>
        </div>

        <button className="bg-accent text-bg px-5 py-2.5 rounded-xl font-semibold text-xs flex items-center gap-2 hover:opacity-90 transition-opacity cursor-pointer">
          <Save className="w-4 h-4" /> Saqlash
        </button>
      </div>
    </div>
  );
}
