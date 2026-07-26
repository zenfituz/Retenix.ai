"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Users, Search, Filter, Plus, ChevronRight, AlertTriangle, ShieldCheck } from "lucide-react";

export default function OwnerMembersPage() {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] = useState<"all" | "active" | "risk">("all");

  const membersList = [
    { id: "1", name: "Jasur Toshmatov", risk: 85, streak: 0, trainer: "Bekzod M.", plan: "VIP Unlim", joined: "12 May 2026", status: "risk" },
    { id: "2", name: "Nilufar Mirzaeva", risk: 72, streak: 1, trainer: "Sardor A.", plan: "Standard Monthly", joined: "01 Jun 2026", status: "risk" },
    { id: "3", name: "Doniyor Raxmonov", risk: 15, streak: 14, trainer: "Bekzod M.", plan: "VIP Unlim", joined: "15 Jan 2026", status: "active" },
    { id: "4", name: "Malika Saipova", risk: 22, streak: 8, trainer: "Aziz K.", plan: "Student Pass", joined: "20 Feb 2026", status: "active" },
    { id: "5", name: "Bobur Alimov", risk: 68, streak: 2, trainer: "Sardor A.", plan: "Standard Monthly", joined: "10 Apr 2026", status: "risk" },
    { id: "6", name: "Farrux Zokirov", risk: 10, streak: 20, trainer: "Aziz K.", plan: "VIP Unlim", joined: "05 Jan 2026", status: "active" },
  ];

  const filtered = membersList.filter(m => {
    const matchesSearch = m.name.toLowerCase().includes(search.toLowerCase()) || m.trainer.toLowerCase().includes(search.toLowerCase());
    const matchesStatus = statusFilter === "all" ? true : statusFilter === "risk" ? m.risk >= 70 : m.risk < 70;
    return matchesSearch && matchesStatus;
  });

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Zal A'zolari Ro'yxati</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Barcha a'zolarning churn darajasi va trenirovkalar jurnali</p>
        </div>

        <button className="bg-[#E8FF47] hover:bg-[#d8ef37] text-[#080810] px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(232,255,71,0.2)]">
          <Plus className="w-4 h-4" />
          <span>A'zo Qo'shish</span>
        </button>
      </div>

      {/* Filter Controls */}
      <div className="flex flex-col sm:flex-row gap-3 bg-[#0d0d16] border border-[#1e1e2c] p-4 rounded-2xl">
        <div className="flex-1 flex items-center bg-[#13131c] border border-[#1e1e2c] rounded-xl px-3.5 focus-within:border-[#E8FF47]/50 transition-colors">
          <Search className="w-4 h-4 text-gray-400 flex-shrink-0" />
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="A'zo ismi yoki trener bo'yicha qidiruv..."
            className="w-full bg-transparent border-none text-white text-xs sm:text-sm px-3 py-2.5 outline-none"
          />
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setStatusFilter("all")}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              statusFilter === "all" ? "bg-[#E8FF47] text-[#080810] border-[#E8FF47]" : "bg-[#13131c] text-gray-400 border-[#1e1e2c]"
            }`}
          >
            Barchasi
          </button>
          <button
            onClick={() => setStatusFilter("risk")}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              statusFilter === "risk" ? "bg-[#E24B4A] text-white border-[#E24B4A]" : "bg-[#13131c] text-gray-400 border-[#1e1e2c]"
            }`}
          >
            Xavflilar (High Risk)
          </button>
          <button
            onClick={() => setStatusFilter("active")}
            className={`px-3 py-2 rounded-xl text-xs font-medium border transition-all ${
              statusFilter === "active" ? "bg-[#5DCAA5] text-[#080810] border-[#5DCAA5]" : "bg-[#13131c] text-gray-400 border-[#1e1e2c]"
            }`}
          >
            Faollar
          </button>
        </div>
      </div>

      {/* Members Grid/Table */}
      <div className="bg-[#0d0d16] border border-[#1e1e2c] rounded-2xl p-5 overflow-x-auto">
        <table className="w-full text-left text-xs">
          <thead>
            <tr className="border-b border-[#1e1e2c] text-gray-400 font-mono uppercase">
              <th className="py-3 px-4">A'zo F.I.SH</th>
              <th className="py-3 px-4">A'zolik Rejasi</th>
              <th className="py-3 px-4">Churn Xavfi</th>
              <th className="py-3 px-4">Streak</th>
              <th className="py-3 px-4">Biriktirilgan Trener</th>
              <th className="py-3 px-4 text-right">Amal</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#1e1e2c]">
            {filtered.map((m) => (
              <tr key={m.id} className="hover:bg-[#13131c] transition-colors">
                <td className="py-3.5 px-4 font-medium text-white">
                  <div className="flex items-center gap-2.5">
                    <div className="w-7 h-7 rounded-lg bg-[#1a1a26] text-[#E8FF47] font-bold text-xs flex items-center justify-center font-display">
                      {m.name.charAt(0)}
                    </div>
                    <span>{m.name}</span>
                  </div>
                </td>
                <td className="py-3.5 px-4 text-gray-300 font-mono">{m.plan}</td>
                <td className="py-3.5 px-4 font-mono">
                  <span className={`px-2.5 py-1 rounded-full text-[11px] font-semibold ${
                    m.risk >= 70 
                      ? "bg-[#E24B4A]/15 text-[#E24B4A] border border-[#E24B4A]/30" 
                      : "bg-[#5DCAA5]/15 text-[#5DCAA5] border border-[#5DCAA5]/30"
                  }`}>
                    {m.risk}% Xavf
                  </span>
                </td>
                <td className="py-3.5 px-4 font-mono text-gray-300">🔥 {m.streak} kun</td>
                <td className="py-3.5 px-4 text-gray-300">{m.trainer}</td>
                <td className="py-3.5 px-4 text-right">
                  <Link
                    href={`/owner/members/${m.id}`}
                    className="text-[#E8FF47] hover:underline font-semibold inline-flex items-center gap-1"
                  >
                    <span>Profil</span>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

    </div>
  );
}
