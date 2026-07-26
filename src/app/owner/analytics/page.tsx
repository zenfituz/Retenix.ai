"use client";

import React from "react";
import { TrendingUp, Activity, CreditCard, AlertTriangle, ShieldCheck } from "lucide-react";

export default function OwnerAnalyticsPage() {
  const retentionData = [
    { month: "Jan", retention: 82, mrr: 12400 },
    { month: "Feb", retention: 84, mrr: 13800 },
    { month: "Mar", retention: 83, mrr: 14200 },
    { month: "Apr", retention: 86, mrr: 15600 },
    { month: "May", retention: 87, mrr: 16900 },
    { month: "Jun", retention: 88.4, mrr: 18400 },
  ];

  const churnDistribution = [
    { name: "Past Xavf (Low)", value: 348, color: "#5DCAA5", percent: "84.4%" },
    { name: "O'rta Xavf (Mid)", value: 55, color: "#E8C547", percent: "13.3%" },
    { name: "Yuqori Xavf (High)", value: 9, color: "#E24B4A", percent: "2.3%" },
  ];

  const dauData = [
    { day: "Dush", checkins: 142, height: "70%" },
    { day: "Sesh", checkins: 168, height: "85%" },
    { day: "Chorsh", checkins: 155, height: "78%" },
    { day: "Pay", checkins: 172, height: "88%" },
    { day: "Juma", checkins: 180, height: "95%" },
    { day: "Shan", checkins: 130, height: "65%" },
    { day: "Yak", checkins: 95, height: "48%" },
  ];

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl">
        <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">Graph Analitika & MRR Dinamikasi</h1>
        <p className="text-xs sm:text-sm text-gray-400 mt-1">Zal retention ko'rsatkichlari, daromad o'sishi va kunlik faollik</p>
      </div>

      {/* Main Charts Grid */}
      <div className="grid lg:grid-cols-12 gap-6">
        
        {/* Retention & MRR Area Chart (Pure SVG) */}
        <div className="lg:col-span-8 bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-[#E8FF47]" />
              <span>Retention Darajasi (%) & Oylik Daromad ($ MRR)</span>
            </h2>
            <span className="text-xs font-mono text-[#5DCAA5] bg-[#5DCAA5]/10 px-2.5 py-1 rounded-full border border-[#5DCAA5]/30">
              +6.4% O'sish
            </span>
          </div>

          {/* SVG Trend Line */}
          <div className="h-64 w-full bg-[#13131c] border border-[#1e1e2c] rounded-xl p-4 flex flex-col justify-between relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-b from-[#E8FF47]/10 to-transparent pointer-events-none" />
            
            <div className="flex justify-between items-end h-44 border-b border-[#2a2a3a] pb-2 relative z-10 px-4">
              {retentionData.map((d, i) => (
                <div key={i} className="flex flex-col items-center gap-1 group">
                  <span className="text-[10px] font-mono text-[#E8FF47] opacity-0 group-hover:opacity-100 transition-opacity font-bold">
                    {d.retention}% (${d.mrr})
                  </span>
                  <div 
                    className="w-3 rounded-t-lg bg-[#E8FF47] transition-all group-hover:shadow-[0_0_15px_#E8FF47]"
                    style={{ height: `${(d.retention - 70) * 4}px` }}
                  />
                  <span className="text-[10px] font-mono text-gray-400 mt-2">{d.month}</span>
                </div>
              ))}
            </div>

            <div className="flex justify-between text-[11px] font-mono text-gray-400 pt-2 relative z-10">
              <span>Boshlanish: 82%</span>
              <span className="text-[#E8FF47] font-bold">Hozirgi: 88.4% MRR $18,400</span>
            </div>
          </div>
        </div>

        {/* Churn Risk Breakdown */}
        <div className="lg:col-span-4 bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#E24B4A]" />
            <span>Churn Xavfi Taqsimoti</span>
          </h2>

          <div className="space-y-3 font-mono text-xs pt-2">
            {churnDistribution.map((item, idx) => (
              <div key={idx} className="p-3.5 rounded-xl bg-[#13131c] border border-[#1e1e2c] space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                    <span className="text-gray-300 font-semibold">{item.name}</span>
                  </div>
                  <span className="font-bold text-white">{item.value} ta ({item.percent})</span>
                </div>
                <div className="w-full h-2 bg-[#1a1a26] rounded-full overflow-hidden">
                  <div className="h-full rounded-full" style={{ width: item.percent, backgroundColor: item.color }} />
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

      {/* DAU Daily Histogram */}
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-4">
        <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
          <Activity className="w-5 h-5 text-[#7BB6E8]" />
          <span>Haftalik Kunlik Tashriflar (DAU Histogram)</span>
        </h2>

        <div className="bg-[#13131c] border border-[#1e1e2c] p-6 rounded-xl">
          <div className="flex justify-between items-end h-48 border-b border-[#2a2a3a] pb-2 px-4">
            {dauData.map((d, i) => (
              <div key={i} className="flex flex-col items-center gap-2 group flex-1">
                <span className="text-[10px] font-mono text-[#7BB6E8] font-bold">{d.checkins}</span>
                <div 
                  className="w-8 rounded-t-lg bg-[#7BB6E8] group-hover:bg-[#E8FF47] transition-all group-hover:shadow-[0_0_15px_#E8FF47]"
                  style={{ height: d.height }}
                />
                <span className="text-[10px] font-mono text-gray-400 mt-2">{d.day}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
}
