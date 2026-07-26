"use client";

import React, { useState } from "react";
import { Dumbbell, Plus, Users, Award, Star, CheckCircle2, ChevronRight } from "lucide-react";

export default function OwnerTrainersPage() {
  const trainersList = [
    { id: "1", name: "Bekzod Muvaffaqiyatov", specialty: "Kulturizm & Gipertrofiya", clients: 24, score: 98, status: "Aktiv" },
    { id: "2", name: "Sardor Azimov", specialty: "Krossfit & Quruq Massa", clients: 18, score: 94, status: "Aktiv" },
    { id: "3", name: "Aziz Karimov", specialty: "Kardio & Funtksional", clients: 15, score: 91, status: "Aktiv" },
    { id: "4", name: "Dilshod Baxtiyorov", specialty: "Ozish & Reabilitatsiya", clients: 12, score: 89, status: "Aktiv" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Murabbiylar Boshqaruvi</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Zal trenerlari, biriktirilgan mijozlar va natijadorlik bali</p>
        </div>

        <button className="bg-[#E8FF47] hover:bg-[#d8ef37] text-[#080810] px-4 py-2.5 rounded-xl font-semibold text-xs sm:text-sm flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(232,255,71,0.2)]">
          <Plus className="w-4 h-4" />
          <span>Yangi Trener Biriktirish</span>
        </button>
      </div>

      {/* Trainers Grid */}
      <div className="grid md:grid-cols-2 gap-4">
        {trainersList.map((t) => (
          <div key={t.id} className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-4 hover:border-[#E8FF47]/40 transition-all">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] text-[#E8FF47] font-bold flex items-center justify-center font-display text-lg">
                  {t.name.charAt(0)}
                </div>
                <div>
                  <h3 className="font-display font-bold text-white text-base">{t.name}</h3>
                  <span className="text-xs text-gray-400 font-mono">{t.specialty}</span>
                </div>
              </div>

              <span className="px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold bg-[#5DCAA5]/15 text-[#5DCAA5] border border-[#5DCAA5]/30">
                {t.status}
              </span>
            </div>

            <div className="grid grid-cols-2 gap-3 font-mono text-xs pt-2">
              <div className="p-3 rounded-xl bg-[#13131c] border border-[#1e1e2c]">
                <span className="text-gray-400 block text-[10px]">BIRIKTIRILGAN MIJOZLAR</span>
                <span className="text-white font-bold text-base mt-1 block">{t.clients} ta mijoz</span>
              </div>

              <div className="p-3 rounded-xl bg-[#13131c] border border-[#1e1e2c]">
                <span className="text-gray-400 block text-[10px]">NATIJADORLIK BALI</span>
                <span className="text-[#E8FF47] font-bold text-base mt-1 block">⭐ {t.score}/100</span>
              </div>
            </div>
          </div>
        ))}
      </div>

    </div>
  );
}
