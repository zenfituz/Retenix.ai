import React from "react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-[#080810] text-white flex flex-col items-center justify-center p-6 text-center">
      <div className="w-12 h-12 rounded-2xl bg-[#E8FF47] text-black font-black flex items-center justify-center text-xl mb-6 shadow-[0_0_25px_rgba(232,255,71,0.3)]">
        R
      </div>
      <h1 className="text-4xl md:text-6xl font-bold font-display tracking-tight mb-4">
        Retenix.ai
      </h1>
      <p className="text-gray-400 text-lg max-w-md">
        Barcha eski backend va frontend tozalandi. Yangi dizayn bilan boshlashga tayyor.
      </p>
    </div>
  );
}
