"use client";

import React from "react";
import { CreditCard, CheckCircle2, ShieldCheck, Zap } from "lucide-react";

export default function OwnerBillingPage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">To'lovlar va Obuna (Billing)</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Retenix SaaS Obunangizni boshqarish va to'lovlar tarixi</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        <div className="bg-[#0d0d16] border border-[#E8FF47]/30 bg-[#E8FF47]/5 p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <span className="text-xs font-mono uppercase tracking-widest text-[#E8FF47]">JORIY TARIF</span>
            <span className="px-2.5 py-1 rounded-full text-[10px] font-mono bg-[#E8FF47] text-[#080810] font-bold">FAOL</span>
          </div>
          <h2 className="text-3xl font-display font-bold text-white">Pro Tier Plan</h2>
          <p className="text-xs text-gray-300">$69 / oy · 500 ta a'zo limity, AI Churn Signal Engine va Telegram Mini App o'z ichiga olgan.</p>
          <div className="pt-4 border-t border-[#1e1e2c] flex items-center justify-between font-mono text-xs text-gray-400">
            <span>Keyingi to'lov: 15 Avgust 2026</span>
            <span className="text-white font-bold">$69.00 / UZS 870,000</span>
          </div>
        </div>

        <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-4 flex flex-col justify-between">
          <div>
            <h3 className="text-base font-display font-bold text-white mb-2">To'lov Usullari</h3>
            <p className="text-xs text-gray-400">O'zbekiston Payme va Click tizimlari orqali avtomatik billing</p>
          </div>

          <div className="flex gap-3">
            <button className="flex-1 bg-[#13131c] hover:bg-[#1a1a26] border border-[#1e1e2c] text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4 text-[#5DCAA5]" />
              <span>Payme Bilan To'lash</span>
            </button>
            <button className="flex-1 bg-[#13131c] hover:bg-[#1a1a26] border border-[#1e1e2c] text-white py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2">
              <CreditCard className="w-4 h-4 text-[#7BB6E8]" />
              <span>Click Bilan To'lash</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
