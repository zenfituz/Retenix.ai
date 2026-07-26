"use client";

import React from "react";
import Link from "next/link";
import { Building2, TrendingUp, Cpu, CreditCard, Plus, ChevronRight } from "lucide-react";

export default function SuperAdminDashboardPage() {
  const gymsList = [
    { id: "1", name: "FitZone Tashkent", city: "Toshkent", tier: "pro", members: 412, status: "active", mrr: "$69/oy" },
    { id: "2", name: "BeFit Premium", city: "Toshkent", tier: "enterprise", members: 1250, status: "active", mrr: "$199/oy" },
    { id: "3", name: "Gold Gym Samarkand", city: "Samarqand", tier: "starter", members: 180, status: "risk", mrr: "$29/oy" },
    { id: "4", name: "Powerhouse Namangan", city: "Namangan", tier: "pro", members: 320, status: "active", mrr: "$69/oy" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">SuperAdmin Global Dashboard</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Butun platforma zallari, global MRR va AI token hajmi</p>
        </div>

        <button className="bg-[#E8FF47] hover:bg-[#d8ef37] text-[#080810] px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(232,255,71,0.2)]">
          <Plus className="w-4 h-4" />
          <span>Yangi Zal Ro'yxatdan O'tkazish</span>
        </button>
      </div>

      {/* Global KPIs */}
      <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 font-mono text-xs">
        <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-1">
          <span className="text-gray-400 uppercase">JAMI PLATFORMA ZALLARI</span>
          <div className="text-2xl font-bold text-white font-display">412 Zal</div>
        </div>
        <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-1">
          <span className="text-gray-400 uppercase">GLOBAL MRR</span>
          <div className="text-2xl font-bold text-[#E8FF47] font-display">$18,400/oy</div>
        </div>
        <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-1">
          <span className="text-gray-400 uppercase">AI TOKENS (OYLIK)</span>
          <div className="text-2xl font-bold text-[#7BB6E8] font-display">1.4M Tokens</div>
        </div>
        <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-1">
          <span className="text-gray-400 uppercase">A'ZOLAR (JAMI)</span>
          <div className="text-2xl font-bold text-white font-display">34,500+</div>
        </div>
      </div>

      {/* Gyms List */}
      <div className="bg-[#0d0d16] border border-[#1e1e2c] rounded-2xl p-5 overflow-x-auto space-y-4">
        <h2 className="text-base font-display font-bold text-white">Ro'yxatdan O'tgan Zallar</h2>
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1e1e2c] text-gray-400 font-mono uppercase">
              <th className="py-3 px-4">Zal Nomi</th>
              <th className="py-3 px-4">Shahar</th>
              <th className="py-3 px-4">Tarif</th>
              <th className="py-3 px-4">A'zolar</th>
              <th className="py-3 px-4">Holat</th>
              <th className="py-3 px-4 text-right">MRR</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e2c]">
            {gymsList.map((g) => (
              <tr key={g.id} className="hover:bg-[#13131c] transition-colors">
                <td className="py-3.5 px-4 font-semibold text-white">{g.name}</td>
                <td className="py-3.5 px-4 text-gray-300 font-mono">{g.city}</td>
                <td className="py-3.5 px-4 text-gray-300 font-mono uppercase">{g.tier}</td>
                <td className="py-3.5 px-4 text-gray-300 font-mono">{g.members} ta</td>
                <td className="py-3.5 px-4">
                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold ${
                    g.status === "active" ? "bg-[#5DCAA5]/15 text-[#5DCAA5]" : "bg-[#E8C547]/15 text-[#E8C547]"
                  }`}>
                    {g.status.toUpperCase()}
                  </span>
                </td>
                <td className="py-3.5 px-4 text-right font-mono font-bold text-[#E8FF47]">{g.mrr}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
