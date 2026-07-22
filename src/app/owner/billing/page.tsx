"use client";

import React from 'react';
import { CreditCard, Check, Zap, Shield, CheckCircle2 } from 'lucide-react';
import { Pill } from "@/components/ui/pill";

export default function OwnerBilling() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 min-h-screen bg-bg text-text-hi">
      {/* Header */}
      <div>
        <h2 className="text-3xl font-display font-bold tracking-tight text-text-hi">
          Billing & Obunalar
        </h2>
        <p className="text-text-dim text-sm mt-1">Zalingiz tarifi, to'lov tarixi va to'lov tizimlari integratsiyasi</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 space-y-6">
          {/* Current Plan Card */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <h3 className="text-base font-display font-bold flex items-center gap-2 text-text-hi">
              <Zap className="w-5 h-5 text-accent" /> Joriy Tarif Rejasi
            </h3>
            
            <div className="flex items-center justify-between p-4 bg-surface-2 border border-accent/20 rounded-xl">
              <div>
                <div className="text-lg font-bold text-accent font-display">Pro Plan</div>
                <p className="text-xs text-text-dim mt-1 font-mono">Oylik obuna • Keyingi to'lov: $69 (1-Avugst, 2026)</p>
              </div>
              <div className="text-right font-mono">
                <span className="text-2xl font-bold text-accent">$69</span>
                <span className="text-text-dim text-xs">/oy</span>
              </div>
            </div>
            
            <div className="flex flex-wrap gap-3 pt-2">
              <button className="px-4 py-2.5 bg-accent text-bg font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(232,255,71,0.2)]">
                Tarifni Yangilash
              </button>
              <button className="px-4 py-2.5 bg-surface-2 border border-border-2 text-text-mid hover:text-text-hi rounded-xl text-xs font-medium hover:bg-surface-3 transition-colors cursor-pointer">
                Obunani Bekor Qilish
              </button>
            </div>
          </div>

          {/* Payment Gateways */}
          <div className="p-6 rounded-2xl bg-surface border border-border space-y-4">
            <h3 className="text-base font-display font-bold flex items-center gap-2 text-text-hi">
              <CreditCard className="w-5 h-5 text-accent" /> To'lov Tizimlari Integratsiyasi
            </h3>
            <p className="text-text-dim text-xs">
              Mijozlaringizdan to'g'ridan-to'g'ri to'lovlarni qabul qilish uchun to'lov shlyuzlarini ulang.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="p-4 border border-border rounded-xl bg-surface-2 flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-surface-3 border border-border rounded-lg flex items-center justify-center font-bold text-accent text-xs">
                    Stripe
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-text-hi">Stripe</h4>
                    <p className="text-[10px] text-text-dim">Xalqaro karta to'lovlari</p>
                  </div>
                </div>
                <button className="text-xs px-3 py-1.5 bg-accent text-bg font-semibold rounded-lg hover:opacity-90 transition-opacity cursor-pointer">
                  Ulash
                </button>
              </div>

              <div className="p-4 border border-good/30 bg-good/5 rounded-xl flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-good/10 border border-good/20 rounded-lg flex items-center justify-center font-bold text-good text-xs">
                    Payme
                  </div>
                  <div>
                    <h4 className="font-semibold text-xs text-text-hi">Payme / Click</h4>
                    <p className="text-[10px] text-good font-mono flex items-center gap-1">
                      <CheckCircle2 className="w-3 h-3" /> Ulangan
                    </p>
                  </div>
                </div>
                <button className="text-xs px-3 py-1.5 border border-border rounded-lg text-text-mid hover:text-text-hi hover:bg-surface-3 transition-colors cursor-pointer">
                  Sozlash
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Enterprise Upgrade Card */}
        <div>
          <div className="p-6 rounded-2xl bg-surface-2 border border-accent/30 space-y-4 relative overflow-hidden">
            <div className="w-10 h-10 rounded-xl bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
              <Shield className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-display font-bold text-text-hi">Enterprise Tarif</h3>
              <p className="text-xs text-text-dim mt-1 leading-relaxed">
                Cheksiz filiallar, shaxsiy mobil ilova va maxsus AI tahlil modellari.
              </p>
            </div>

            <ul className="space-y-2 pt-2 border-t border-border">
              {['Cheksiz a\'zolar va murabbiylar', 'Custom Telegram Mini App', 'Shaxsiy AI Copilot trenirovka', '24/7 VIP Qo\'llab-quvvatlash'].map((f, i) => (
                <li key={i} className="flex items-center text-xs text-text-mid gap-2">
                  <Check className="w-3.5 h-3.5 text-accent shrink-0" />
                  <span>{f}</span>
                </li>
              ))}
            </ul>

            <button className="w-full py-3 bg-accent text-bg font-semibold rounded-xl text-xs hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(232,255,71,0.2)]">
              Sotuv Bo'limi Bilan Bog'lanish
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
