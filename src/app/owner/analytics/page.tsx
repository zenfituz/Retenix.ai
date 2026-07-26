"use client";

import React from "react";
import { 
  ResponsiveContainer, AreaChart, Area, XAxis, YAxis, Tooltip, 
  BarChart, Bar, PieChart, Pie, Cell, CartesianGrid 
} from "recharts";
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
    { name: "Past Xavf (Low)", value: 348, color: "#5DCAA5" },
    { name: "O'rta Xavf (Mid)", value: 55, color: "#E8C547" },
    { name: "Yuqori Xavf (High)", value: 9, color: "#E24B4A" },
  ];

  const dauData = [
    { day: "Dush", checkins: 142 },
    { day: "Sesh", checkins: 168 },
    { day: "Chorsh", checkins: 155 },
    { day: "Pay", checkins: 172 },
    { day: "Juma", checkins: 180 },
    { day: "Shan", checkins: 130 },
    { day: "Yak", checkins: 95 },
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
        
        {/* Retention & MRR Area Chart */}
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

          <div className="h-72 w-full">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={retentionData}>
                <defs>
                  <linearGradient id="colorRetention" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#E8FF47" stopOpacity={0.4}/>
                    <stop offset="95%" stopColor="#E8FF47" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2c" />
                <XAxis dataKey="month" stroke="#8888a0" fontSize={11} fontFamily="JetBrains Mono" />
                <YAxis stroke="#8888a0" fontSize={11} fontFamily="JetBrains Mono" />
                <Tooltip 
                  contentStyle={{ backgroundColor: "#13131c", borderColor: "#2a2a3a", borderRadius: "12px", color: "#fff" }}
                />
                <Area type="monotone" dataKey="retention" stroke="#E8FF47" strokeWidth={3} fillOpacity={1} fill="url(#colorRetention)" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Churn Risk Pie Chart */}
        <div className="lg:col-span-4 bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl space-y-4">
          <h2 className="text-base font-display font-bold text-white flex items-center gap-2">
            <AlertTriangle className="w-5 h-5 text-[#E24B4A]" />
            <span>Churn Xavfi Taqsimoti</span>
          </h2>

          <div className="h-56 w-full flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={churnDistribution} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5}>
                  {churnDistribution.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={entry.color} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: "#13131c", borderColor: "#2a2a3a", borderRadius: "12px" }} />
              </PieChart>
            </ResponsiveContainer>
          </div>

          <div className="space-y-2 font-mono text-xs">
            {churnDistribution.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between p-2 rounded-lg bg-[#13131c] border border-[#1e1e2c]">
                <div className="flex items-center gap-2">
                  <div className="w-3 h-3 rounded-full" style={{ backgroundColor: item.color }} />
                  <span className="text-gray-300">{item.name}</span>
                </div>
                <span className="font-bold text-white">{item.value} ta</span>
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

        <div className="h-64 w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart data={dauData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#1e1e2c" />
              <XAxis dataKey="day" stroke="#8888a0" fontSize={11} fontFamily="JetBrains Mono" />
              <YAxis stroke="#8888a0" fontSize={11} fontFamily="JetBrains Mono" />
              <Tooltip contentStyle={{ backgroundColor: "#13131c", borderColor: "#2a2a3a", borderRadius: "12px" }} />
              <Bar dataKey="checkins" fill="#7BB6E8" radius={[8, 8, 0, 0]} />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>

    </div>
  );
}
