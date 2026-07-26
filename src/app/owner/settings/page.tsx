"use client";

import React, { useState } from "react";
import { Settings, Bell, Lock, Shield, CheckCircle2 } from "lucide-react";

export default function OwnerSettingsPage() {
  const [notifications, setNotifications] = useState(true);
  const [aiLimitAlert, setAiLimitAlert] = useState(true);

  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Tizim Sozlamalari</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Churn bildirishnomalari va AI token limitlarini sozlash</p>
      </div>

      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-6">
        <div className="flex items-center justify-between p-4 rounded-xl bg-[#13131c] border border-[#1e1e2c]">
          <div>
            <span className="text-sm font-semibold text-white block">Churn Alert Bildirishnomalari</span>
            <span className="text-xs text-gray-400">A'zo 70%+ risk ostiga tushganda darhol Telegram xabari yuborish</span>
          </div>
          <input
            type="checkbox"
            checked={notifications}
            onChange={(e) => setNotifications(e.target.checked)}
            className="w-5 h-5 accent-[#E8FF47] cursor-pointer"
          />
        </div>

        <div className="flex items-center justify-between p-4 rounded-xl bg-[#13131c] border border-[#1e1e2c]">
          <div>
            <span className="text-sm font-semibold text-white block">Gym AI Limit Ogohlantirishi</span>
            <span className="text-xs text-gray-400">Oylik AI Token narxi $20 ga yetganda ogohlantirish</span>
          </div>
          <input
            type="checkbox"
            checked={aiLimitAlert}
            onChange={(e) => setAiLimitAlert(e.target.checked)}
            className="w-5 h-5 accent-[#E8FF47] cursor-pointer"
          />
        </div>
      </div>
    </div>
  );
}
