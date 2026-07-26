"use client";

import React from "react";
import Link from "next/link";
import { Calendar, Users, Clock, Flame, CheckCircle2, ChevronRight, AlertTriangle } from "lucide-react";

export default function TrainerDashboardPage() {
  const todaySessions = [
    { time: "09:00 - 10:00", client: "Jasur Toshmatov", type: "Hypertrophy", zone: "Zona A", status: "bajarildi", adherence: "94%" },
    { time: "11:00 - 12:00", client: "Nilufar Mirzaeva", type: "Assessment", zone: "Zona B", status: "kutilmoqda", adherence: "85%" },
    { time: "15:00 - 16:00", client: "Doniyor Raxmonov", type: "Rehab & Recovery", zone: "Zona A", status: "kutilmoqda", adherence: "42%" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Trener Ish Maydoni — Bugungi Mashg'ulotlar</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Sizga biriktirilgan mijozlar va haftalik trenirovka seanslari</p>
      </div>

      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-4">
        <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
          <Clock className="w-5 h-5 text-[#E8FF47]" />
          <span>Bugungi Shaxsiy Mashg'ulotlar</span>
        </h2>

        <div className="space-y-3">
          {todaySessions.map((s, idx) => (
            <div key={idx} className="bg-[#13131c] border border-[#1e1e2c] p-4 rounded-xl flex items-center justify-between">
              <div>
                <span className="font-mono text-xs text-[#E8FF47] font-semibold block">{s.time}</span>
                <span className="font-semibold text-white text-sm block mt-0.5">{s.client}</span>
                <span className="text-xs text-gray-400">{s.type} · {s.zone}</span>
              </div>

              <div className="text-right font-mono">
                <span className={`px-2.5 py-1 rounded-full text-[10px] font-semibold block mb-1 ${
                  s.status === "bajarildi" ? "bg-[#5DCAA5]/15 text-[#5DCAA5]" : "bg-[#E8C547]/15 text-[#E8C547]"
                }`}>
                  {s.status.toUpperCase()}
                </span>
                <span className="text-xs text-gray-400 block">Adherence: {s.adherence}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
