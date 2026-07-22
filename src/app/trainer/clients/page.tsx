"use client";

import React, { useState } from "react";
import { Users, Search, Filter, MessageSquare, Flame, Activity, ArrowRight, MoreHorizontal } from "lucide-react";
import { Card, CardContent } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Pill } from "@/components/ui/pill";

const MY_CLIENTS_DATA = [
  { id: "1", name: "Jasur Toshmatov", email: "jasur@example.com", goal: "Hypertrophy 4x", adherence: "94%", streak: "🔥 14 kun", visits: 18, status: "Active", joined: "12 fev, 2026" },
  { id: "2", name: "Nilufar Mirzaeva", email: "nilufar@example.com", goal: "Fat Loss 3x", adherence: "85%", streak: "🔥 7 kun", visits: 12, status: "Active", joined: "3 mar, 2026" },
  { id: "3", name: "Doniyor Raxmonov", email: "doniyor@example.com", goal: "Strength & Rehab", adherence: "42%", streak: "0 kun", visits: 3, status: "Risk", joined: "20 yan, 2026" },
  { id: "4", name: "Mohira Aliyeva", email: "mohira@example.com", goal: "Beginner Fitness 3x", adherence: "78%", streak: "🌱 2 kun", visits: 6, status: "New", joined: "24 iyun, 2026" },
  { id: "5", name: "Sevara Qodirova", email: "sevara@example.com", goal: "Weight Loss", adherence: "38%", streak: "0 kun", visits: 2, status: "Risk", joined: "8 fev, 2026" },
];

export default function TrainerClientsPage() {
  const [filter, setFilter] = useState("All");
  const [query, setQuery] = useState("");

  const filtered = MY_CLIENTS_DATA.filter((c) => {
    const matchesFilter = filter === "All" || c.status === filter;
    const matchesQuery = c.name.toLowerCase().includes(query.toLowerCase()) || c.goal.toLowerCase().includes(query.toLowerCase());
    return matchesFilter && matchesQuery;
  });

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-text-hi flex items-center gap-2">
            <Users className="w-7 h-7 text-accent" /> Mijozlarim (My Clients)
          </h1>
          <p className="text-text-dim text-sm mt-1">Sizga biriktirilgan shaxsiy mijozlar ro'yxati va ularning faolligi</p>
        </div>
        <div className="text-xs font-mono text-text-dim bg-surface-2 border border-border px-3 py-1.5 rounded-full">
          Jami: <span className="text-accent">{MY_CLIENTS_DATA.length} ta mijoz</span>
        </div>
      </div>

      {/* Controls & Filter */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Mijoz ismi yoki maqsadini qidirish..."
              className="w-full pl-9 pr-4 py-2.5 bg-surface-2 border border-border-2 rounded-xl text-xs text-text-hi focus:outline-none focus:border-accent font-body"
            />
          </div>

          <div className="flex gap-2 w-full sm:w-auto overflow-x-auto">
            {["All", "Active", "Risk", "New"].map((f) => (
              <button
                key={f}
                onClick={() => setFilter(f)}
                className={`px-3.5 py-1.5 rounded-xl text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
                  filter === f ? "bg-accent text-bg font-semibold" : "bg-surface-2 text-text-mid hover:text-text-hi border border-border"
                }`}
              >
                {f === "All" ? "Barchasi" : f === "Active" ? "Faol" : f === "Risk" ? "Risk (Xavf)" : "Yangi"}
              </button>
            ))}
          </div>
        </div>

        {/* Responsive List */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-text-dim font-mono uppercase tracking-wider">
                <th className="pb-3 pl-2">Mijoz</th>
                <th className="pb-3">Trenirovka Maqsadi</th>
                <th className="pb-3">Adherence %</th>
                <th className="pb-3">Streak</th>
                <th className="pb-3">Holat</th>
                <th className="pb-3 text-right pr-2">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-2">
              {filtered.map((client) => (
                <tr key={client.id} className="hover:bg-surface-2/50 transition-colors">
                  <td className="py-4 pl-2 font-semibold text-text-hi flex items-center gap-3">
                    <Avatar fallback={client.name.substring(0, 2).toUpperCase()} size="sm" />
                    <div>
                      <div>{client.name}</div>
                      <div className="text-[10px] text-text-dim font-mono">{client.email}</div>
                    </div>
                  </td>
                  <td className="py-4 text-text-mid font-mono">{client.goal}</td>
                  <td className="py-4 font-mono">
                    <span className={parseInt(client.adherence) > 80 ? "text-good font-bold" : "text-bad font-bold"}>
                      {client.adherence}
                    </span>
                  </td>
                  <td className="py-4 font-mono text-accent font-semibold">{client.streak}</td>
                  <td className="py-4">
                    <Pill variant={client.status === "Active" ? "success" : client.status === "Risk" ? "danger" : "default"}>
                      {client.status}
                    </Pill>
                  </td>
                  <td className="py-4 text-right pr-2">
                    <button className="px-3 py-1.5 bg-accent/10 hover:bg-accent/20 border border-accent/30 text-accent font-mono text-[11px] rounded-lg transition-colors inline-flex items-center gap-1 cursor-pointer">
                      <MessageSquare className="w-3 h-3" /> Xabar
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
