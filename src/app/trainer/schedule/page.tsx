"use client";

import React from "react";
import { Clock, Calendar } from "lucide-react";

export default function TrainerSchedulePage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Haftalik Seanslar Jadvali</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Dushanbadan Yakshanbagacha belgilangan vaqt slotlari</p>
      </div>

      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-4">
        <div className="grid grid-cols-7 gap-2 text-center font-mono text-xs">
          {["Dush", "Sesh", "Chorsh", "Pay", "Juma", "Shan", "Yak"].map((d, idx) => (
            <div key={idx} className="p-3 rounded-xl bg-[#13131c] border border-[#1e1e2c] text-[#E8FF47] font-bold">
              {d}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
