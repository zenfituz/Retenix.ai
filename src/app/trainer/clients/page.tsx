"use client";

import React from "react";
import Link from "next/link";
import { Users, Search, ChevronRight } from "lucide-react";

export default function TrainerClientsPage() {
  const clients = [
    { id: "1", name: "Jasur Toshmatov", goal: "Gipertrofiya", adherence: "94%", streak: 0, status: "risk" },
    { id: "2", name: "Nilufar Mirzaeva", goal: "Vazn tashlash", adherence: "85%", streak: 1, status: "risk" },
    { id: "3", name: "Doniyor Raxmonov", goal: "Quruq massa", adherence: "42%", streak: 14, status: "active" },
  ];

  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Mening Mijozlarim</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Sizga biriktirilgan zal a'zolari ro'yxati</p>
      </div>

      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-3">
        {clients.map((c) => (
          <div key={c.id} className="p-4 rounded-xl bg-[#13131c] border border-[#1e1e2c] flex items-center justify-between">
            <div>
              <span className="font-semibold text-white text-sm block">{c.name}</span>
              <span className="text-xs text-gray-400 font-mono">Maqsad: {c.goal} · Adherence: {c.adherence}</span>
            </div>
            <Link href={`/owner/members/${c.id}`} className="text-[#E8FF47] font-semibold text-xs flex items-center gap-1">
              <span>Batafsil</span>
              <ChevronRight className="w-3.5 h-3.5" />
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
}
