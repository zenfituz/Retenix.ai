"use client";

import React, { useState } from 'react';
import { Search, Filter, MoreHorizontal, Building2, MapPin, Plus } from 'lucide-react';
import { Card, CardContent } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";

const GYMS_DATA = [
  { id: 1, name: "FitLife Toshkent", location: "Toshkent, Yunusobod", owner: "Rustam Toshmatov", members: 450, status: "Active", joined: "2026-01-15", plan: "Pro" },
  { id: 2, name: "Iron Gym Samarqand", location: "Samarqand, Markaz", owner: "Aziz Boltayev", members: 120, status: "Trial", joined: "2026-03-22", plan: "Starter" },
  { id: 3, name: "BeFit Premium", location: "Toshkent, Mirzo Ulug'bek", owner: "Leyla Mirzaeva", members: 890, status: "Active", joined: "2025-11-05", plan: "Scale" },
  { id: 4, name: "PowerHouse Buxoro", location: "Buxoro", owner: "Timur Aliyev", members: 210, status: "Inactive", joined: "2025-08-12", plan: "Pro" },
  { id: 5, name: "Olympia Fitness", location: "Toshkent, Chilonzor", owner: "Nodir Qodirov", members: 340, status: "Active", joined: "2026-02-10", plan: "Pro" },
];

export default function GymsList() {
  const [query, setQuery] = useState("");

  const filtered = GYMS_DATA.filter(g => 
    g.name.toLowerCase().includes(query.toLowerCase()) || 
    g.owner.toLowerCase().includes(query.toLowerCase())
  );

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 min-h-screen bg-bg text-text-hi">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-text-hi">
            Zallar Ro'yxati
          </h2>
          <p className="text-text-dim text-sm mt-1">Platformadagi barcha ro'yxatdan o'tgan fitness zallar</p>
        </div>
        <button className="px-4 py-2.5 bg-accent text-bg font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(232,255,71,0.2)]">
          <Plus className="w-4 h-4" /> Yangi Zal Qo'shish
        </button>
      </div>

      {/* Filter & Table Container */}
      <div className="bg-surface border border-border rounded-2xl p-6 space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
          <div className="relative w-full sm:w-72">
            <Search className="w-4 h-4 absolute left-3 top-1/2 -translate-y-1/2 text-text-dim" />
            <input
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Zal yoki egasini qidirish..."
              className="w-full pl-9 pr-4 py-2.5 bg-surface-2 border border-border-2 rounded-xl text-xs text-text-hi focus:outline-none focus:border-accent font-body"
            />
          </div>
          <div className="text-xs font-mono text-text-dim">
            Jami: <span className="text-accent">{filtered.length} ta zal</span>
          </div>
        </div>

        {/* Responsive Table */}
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs border-collapse">
            <thead>
              <tr className="border-b border-border text-text-dim font-mono uppercase tracking-wider">
                <th className="pb-3 pl-2">Zal Nomi</th>
                <th className="pb-3">Joylashuv</th>
                <th className="pb-3">Egar / Owner</th>
                <th className="pb-3">A'zolar</th>
                <th className="pb-3">Holat</th>
                <th className="pb-3">A'zo Bo'lgan</th>
                <th className="pb-3 text-right pr-2">Amallar</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-2">
              {filtered.map((gym) => (
                <tr key={gym.id} className="hover:bg-surface-2/50 transition-colors">
                  <td className="py-4 pl-2 font-semibold text-text-hi flex items-center gap-3">
                    <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent">
                      <Building2 className="w-4 h-4" />
                    </div>
                    {gym.name}
                  </td>
                  <td className="py-4 text-text-mid">
                    <span className="flex items-center gap-1">
                      <MapPin className="w-3 h-3 text-text-dim" /> {gym.location}
                    </span>
                  </td>
                  <td className="py-4 text-text-hi">{gym.owner}</td>
                  <td className="py-4 font-mono text-accent">{gym.members} ta</td>
                  <td className="py-4">
                    <Pill variant={gym.status === 'Active' ? 'success' : gym.status === 'Trial' ? 'warning' : 'danger'}>
                      {gym.status}
                    </Pill>
                  </td>
                  <td className="py-4 font-mono text-text-dim">{gym.joined}</td>
                  <td className="py-4 text-right pr-2">
                    <button className="p-1.5 text-text-dim hover:text-text-hi transition-colors cursor-pointer">
                      <MoreHorizontal className="w-4 h-4" />
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
