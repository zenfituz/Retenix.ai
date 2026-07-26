"use client";

import React, { useState } from "react";
import { QrCode, CheckCircle2, Zap } from "lucide-react";

export default function MemberCheckinPage() {
  const [scanned, setScanned] = useState(false);

  const handleSimulateScan = () => {
    setScanned(true);
  };

  return (
    <div className="space-y-4 text-center">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-5 rounded-2xl">
        <h1 className="text-xl font-display font-bold text-white">Turniket Check-in</h1>
        <p className="text-xs text-gray-400 mt-1">Zalga kirish uchun QR kodni skanerga ko'rsating</p>
      </div>

      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-3xl space-y-6 flex flex-col items-center">
        
        {/* QR Code Container with Holographic Laser Line */}
        <div className="relative w-56 h-56 bg-white p-4 rounded-2xl shadow-[0_0_30px_rgba(232,255,71,0.2)] overflow-hidden flex items-center justify-center">
          <div className="w-full h-full border-4 border-black flex items-center justify-center">
            <QrCode className="w-40 h-40 text-black" />
          </div>
          
          {/* Animated Holographic Laser Line */}
          <div className="absolute left-0 right-0 h-1 bg-[#E8FF47] shadow-[0_0_15px_#E8FF47] animate-scanner" />
        </div>

        {scanned ? (
          <div className="p-4 rounded-2xl bg-[#5DCAA5]/10 border border-[#5DCAA5]/30 text-[#5DCAA5] text-xs font-semibold flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5" />
            <span>Turniket ochildi! +20 XP berildi, streak uzaytirildi.</span>
          </div>
        ) : (
          <button
            onClick={handleSimulateScan}
            className="bg-[#E8FF47] hover:bg-[#d8ef37] text-[#080810] px-6 py-3 rounded-xl text-xs font-semibold transition-all shadow-[0_0_20px_rgba(232,255,71,0.25)]"
          >
            Check-in Qilish (Simulyatsiya +20 XP)
          </button>
        )}

        <div className="text-[10px] font-mono text-gray-400">
          Har 60 soniyada xavfsiz rotating token yangilanadi
        </div>
      </div>
    </div>
  );
}
