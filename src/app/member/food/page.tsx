"use client";

import React, { useState } from "react";
import { Utensils, Search, CheckCircle2, Sparkles } from "lucide-react";

export default function MemberFoodPage() {
  const [query, setQuery] = useState("");
  const [result, setResult] = useState<any>(null);
  const [logged, setLogged] = useState(false);

  const uzbekDishes = [
    { name: "Osh (Toshkent palov)", portion: "350g", cal: 720, p: 25, c: 88, f: 28 },
    { name: "Somsa (Mol go'shti)", portion: "180g", cal: 420, p: 16, c: 38, f: 22 },
    { name: "Manti (Tugilgan)", portion: "250g", cal: 480, p: 20, c: 52, f: 20 },
    { name: "Lag'mon (Qovurma)", portion: "400g", cal: 650, p: 24, c: 75, f: 26 },
  ];

  const handleSearch = (dishName?: string) => {
    const q = dishName || query;
    const found = uzbekDishes.find(d => d.name.toLowerCase().includes(q.toLowerCase())) || uzbekDishes[0];
    setResult(found);
    setLogged(false);
  };

  const handleLogFood = () => {
    setLogged(true);
  };

  return (
    <div className="space-y-4">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl">
        <h1 className="text-xl font-display font-bold text-white">Uzbek AI Food Calorie Estimator</h1>
        <p className="text-xs text-gray-400 mt-1">Milliy taomlar va kunlik taomnoma kaloriya hisobi</p>
      </div>

      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl space-y-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="Taom nomi (masalan: Osh, Somsa, Manti...)"
            className="flex-1 bg-[#13131c] border border-[#1e1e2c] rounded-xl px-4 py-2.5 text-xs text-white outline-none focus:border-[#E8FF47]/50"
          />
          <button
            onClick={() => handleSearch()}
            className="bg-[#E8FF47] text-[#080810] px-4 py-2.5 rounded-xl text-xs font-semibold"
          >
            AI Hisoblash
          </button>
        </div>

        <div className="flex gap-2 overflow-x-auto pb-1">
          {["Osh", "Somsa", "Manti", "Lag'mon"].map((d, i) => (
            <button
              key={i}
              onClick={() => handleSearch(d)}
              className="px-3 py-1.5 rounded-lg bg-[#13131c] border border-[#1e1e2c] text-xs text-gray-300 whitespace-nowrap"
            >
              🍲 {d}
            </button>
          ))}
        </div>

        {result && (
          <div className="p-4 rounded-xl bg-[#13131c] border border-[#1e1e2c] space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-semibold text-white text-sm">{result.name} ({result.portion})</span>
              <span className="text-xs font-mono text-[#E8FF47] font-bold">{result.cal} kcal</span>
            </div>

            <div className="grid grid-cols-3 gap-2 text-center font-mono text-[11px]">
              <div className="p-2 rounded-lg bg-[#1a1a26] border border-[#2a2a3a]">
                <span className="text-gray-400 block text-[9px]">PROT</span>
                <span className="text-[#5DCAA5] font-bold">{result.p}g</span>
              </div>
              <div className="p-2 rounded-lg bg-[#1a1a26] border border-[#2a2a3a]">
                <span className="text-gray-400 block text-[9px]">CARB</span>
                <span className="text-[#E8C547] font-bold">{result.c}g</span>
              </div>
              <div className="p-2 rounded-lg bg-[#1a1a26] border border-[#2a2a3a]">
                <span className="text-gray-400 block text-[9px]">FAT</span>
                <span className="text-[#E24B4A] font-bold">{result.f}g</span>
              </div>
            </div>

            {logged ? (
              <div className="p-3 rounded-lg bg-[#5DCAA5]/10 border border-[#5DCAA5]/30 text-[#5DCAA5] text-xs font-semibold flex items-center justify-between">
                <span>Kunlik kunga saqlandi!</span>
                <span>+5 XP</span>
              </div>
            ) : (
              <button
                onClick={handleLogFood}
                className="w-full bg-[#E8FF47] text-[#080810] py-2.5 rounded-xl text-xs font-semibold"
              >
                Jurnalga Yozish (+5 XP)
              </button>
            )}
          </div>
        )}
      </div>
    </div>
  );
}
