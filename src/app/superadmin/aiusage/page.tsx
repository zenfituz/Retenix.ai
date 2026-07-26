"use client";

import React from "react";
import { Cpu, Zap, Activity } from "lucide-react";

export default function SuperAdminAiUsagePage() {
  return (
    <div className="space-y-6">
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">AI Token Sarfi va Latency Monitoring</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Anthropic Claude API token sarfi, xarajatlar va o'rtacha javob berish vaqti</p>
      </div>

      <div className="grid md:grid-cols-3 gap-4 font-mono text-xs">
        <div className="p-5 rounded-2xl bg-[#0d0d16] border border-[#1e1e2c] space-y-1">
          <span className="text-gray-400">JAMI TOKEN SARFI</span>
          <div className="text-2xl font-bold text-[#E8FF47] font-display">1,420,500</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0d0d16] border border-[#1e1e2c] space-y-1">
          <span className="text-gray-400">XARAJAT ($ USD)</span>
          <div className="text-2xl font-bold text-[#5DCAA5] font-display">$18.40</div>
        </div>
        <div className="p-5 rounded-2xl bg-[#0d0d16] border border-[#1e1e2c] space-y-1">
          <span className="text-gray-400">LATENCY (JAVOB VAQTI)</span>
          <div className="text-2xl font-bold text-[#7BB6E8] font-display">340 ms</div>
        </div>
      </div>
    </div>
  );
}
