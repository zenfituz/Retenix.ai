"use client";

import React, { useState } from "react";
import { CheckCircle2, Dumbbell, Flame, Zap } from "lucide-react";

export default function MemberPlanPage() {
  const [completed, setCompleted] = useState(false);

  const exercises = [
    { name: "Shtanga bilan skameykada siqish", sets: "4 set x 10 rep", weight: "80 kg" },
    { name: "Gantel bilan qiya skameykada siqish", sets: "3 set x 12 rep", weight: "24 kg" },
    { name: "Brusyada ko'tarilish", sets: "3 set x max", weight: "Tana vazni" },
    { name: "Triceps blokda pastga siqish", sets: "4 set x 12 rep", weight: "35 kg" },
  ];

  const handleFinish = () => {
    setCompleted(true);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl">
        <h1 className="text-xl font-display font-bold text-white">Haftalik Trenirovka Rejasi</h1>
        <p className="text-xs text-gray-400 mt-1">AI va Treneringiz tomonidan tayyorlangan dastur</p>
      </div>

      {completed && (
        <div className="p-4 rounded-2xl bg-[#5DCAA5]/10 border border-[#5DCAA5]/30 text-[#5DCAA5] text-xs font-semibold flex items-center justify-between">
          <div className="flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Tabriklaymiz! Mashg'ulot yakunlandi.</span>
          </div>
          <span className="font-mono text-sm">+30 XP</span>
        </div>
      )}

      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-3">
        <h2 className="text-sm font-display font-bold text-white">Bugungi Mashqlar (Ko'krak va Triceps)</h2>
        
        <div className="space-y-2.5">
          {exercises.map((e, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-[#13131c] border border-[#1e1e2c] flex items-center justify-between">
              <div>
                <span className="text-xs font-semibold text-white block">{e.name}</span>
                <span className="text-[10px] font-mono text-gray-400">{e.sets} · {e.weight}</span>
              </div>
              <input type="checkbox" className="w-4 h-4 accent-[#E8FF47] cursor-pointer" />
            </div>
          ))}
        </div>

        <button
          onClick={handleFinish}
          disabled={completed}
          className="w-full bg-[#E8FF47] hover:bg-[#d8ef37] text-[#080810] py-3 rounded-xl text-xs font-semibold flex items-center justify-center gap-2 transition-all mt-4 shadow-[0_0_15px_rgba(232,255,71,0.2)]"
        >
          <span>{completed ? "Mashg'ulot Bajarildi" : "Mashg'ulotni Yakunlash (+30 XP)"}</span>
        </button>
      </div>
    </div>
  );
}
