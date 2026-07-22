"use client";

import React, { useState } from "react";
import { Dumbbell, Users, Star, UserPlus, Search, CheckCircle2, AlertTriangle, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Pill } from "@/components/ui/pill";

const TRAINERS = [
  { id: 1, name: "Coach Aziz", email: "aziz@fitzone.uz", clientsCount: 18, rating: 4.9, activeStreak: "14 kun", status: "Active" },
  { id: 2, name: "Coach Dilshod", email: "dilshod@fitzone.uz", clientsCount: 14, rating: 4.8, activeStreak: "21 kun", status: "Active" },
  { id: 3, name: "Coach Shahnoza", email: "shahnoza@fitzone.uz", clientsCount: 12, rating: 4.95, activeStreak: "30 kun", status: "Active" },
];

const UNASSIGNED_MEMBERS = [
  { id: "3", name: "Doniyor Raxmonov", email: "doniyor@example.com", status: "Risk" },
  { id: "4", name: "Mohira Aliyeva", email: "mohira@example.com", status: "New" },
  { id: "5", name: "Sevara Qodirova", email: "sevara@example.com", status: "Risk" },
];

export default function TrainersPage() {
  const [selectedTrainer, setSelectedTrainer] = useState<number | null>(null);
  const [assignModal, setAssignModal] = useState(false);
  const [assignedSuccess, setAssignedSuccess] = useState<string | null>(null);

  const handleAssign = (memberName: string, trainerName: string) => {
    setAssignedSuccess(`${memberName} muvaffaqiyatli ${trainerName}ga biriktirildi!`);
    setAssignModal(false);
    setTimeout(() => setAssignedSuccess(null), 3000);
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 min-h-screen bg-bg text-text-hi">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-text-hi">
            Zal Murabbiylari (Trainers)
          </h2>
          <p className="text-text-dim text-sm mt-1">Trenerlar ro'yxati, ularning mijozlari va biriktirish boshqaruvi</p>
        </div>
        <button
          onClick={() => setAssignModal(true)}
          className="px-4 py-2.5 bg-accent text-bg font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(232,255,71,0.2)]"
        >
          <UserPlus className="w-4 h-4" /> A'zoni Trenerga Biriktirish
        </button>
      </div>

      {assignedSuccess && (
        <div className="p-3.5 rounded-xl bg-good/10 border border-good/30 text-good text-xs font-mono flex items-center gap-2">
          <CheckCircle2 className="w-4 h-4" /> {assignedSuccess}
        </div>
      )}

      {/* Trainers Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {TRAINERS.map((trainer) => (
          <Card key={trainer.id} className="bg-surface border-border hover:border-accent/40 transition-all">
            <CardContent className="p-6 space-y-4">
              <div className="flex items-start justify-between">
                <div className="flex items-center gap-3">
                  <Avatar fallback={trainer.name.substring(6, 8).toUpperCase()} size="md" />
                  <div>
                    <h3 className="font-display font-bold text-sm text-text-hi">{trainer.name}</h3>
                    <p className="text-xs text-text-dim font-mono">{trainer.email}</p>
                  </div>
                </div>
                <Pill variant="success">{trainer.status}</Pill>
              </div>

              <div className="grid grid-cols-2 gap-3 pt-3 border-t border-border">
                <div className="p-2.5 rounded-xl bg-surface-2 border border-border-2">
                  <div className="text-[10px] font-mono text-text-dim">MIJOZLAR</div>
                  <div className="text-base font-display font-bold text-accent mt-0.5">{trainer.clientsCount} ta</div>
                </div>
                <div className="p-2.5 rounded-xl bg-surface-2 border border-border-2">
                  <div className="text-[10px] font-mono text-text-dim">REYTING</div>
                  <div className="text-base font-display font-bold text-good mt-0.5 flex items-center gap-1">
                    <Star className="w-3.5 h-3.5 fill-good" /> {trainer.rating}
                  </div>
                </div>
              </div>

              <button
                onClick={() => {
                  setSelectedTrainer(trainer.id);
                  setAssignModal(true);
                }}
                className="w-full py-2.5 rounded-xl bg-surface-2 border border-border-2 text-xs font-mono text-text-mid hover:text-accent hover:border-accent/40 transition-colors flex items-center justify-center gap-2 cursor-pointer"
              >
                A'zo Biriktirish <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Assign Modal */}
      {assignModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={() => setAssignModal(false)} />
          <div className="relative bg-surface border border-border rounded-2xl p-6 w-full max-w-md space-y-4 z-10 shadow-2xl">
            <h3 className="text-lg font-display font-bold text-text-hi">Trenerga A'zo Biriktirish</h3>
            <p className="text-xs text-text-dim">Trener biriktirish uchun a'zoni va murabbiyni tanlang:</p>

            <div className="space-y-3">
              <label className="text-xs font-mono text-text-mid block">A'zo (Member)</label>
              <select className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-xs text-text-hi font-body outline-none">
                {UNASSIGNED_MEMBERS.map((m) => (
                  <option key={m.id} value={m.id}>
                    {m.name} ({m.status})
                  </option>
                ))}
              </select>
            </div>

            <div className="space-y-3">
              <label className="text-xs font-mono text-text-mid block">Murabbiy (Trainer)</label>
              <select className="w-full bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-xs text-text-hi font-body outline-none">
                {TRAINERS.map((t) => (
                  <option key={t.id} value={t.id}>
                    {t.name} ({t.clientsCount} mijoz)
                  </option>
                ))}
              </select>
            </div>

            <div className="flex gap-3 pt-2">
              <button
                onClick={() => handleAssign("Doniyor Raxmonov", "Coach Aziz")}
                className="flex-1 py-3 bg-accent text-bg font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity cursor-pointer shadow-[0_0_20px_rgba(232,255,71,0.2)]"
              >
                Biriktirishni Saqlash
              </button>
              <button
                onClick={() => setAssignModal(false)}
                className="px-4 py-3 bg-surface-2 border border-border text-text-mid hover:text-text-hi text-xs font-medium rounded-xl cursor-pointer"
              >
                Bekor Qilish
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
