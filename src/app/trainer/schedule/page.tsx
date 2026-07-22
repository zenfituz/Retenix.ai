"use client";

import React, { useState } from "react";
import { Calendar as CalendarIcon, Clock, Plus, CheckCircle2, AlertTriangle, User } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";

const DAYS = ["Dushanba", "Seshanba", "Chorshanba", "Payshanba", "Juma", "Shanba", "Yakshanba"];

const SCHEDULE_ITEMS = [
  { id: 1, day: "Dushanba", time: "09:00 - 10:00", client: "Jasur Toshmatov", type: "Personal Training", room: "Zona A", status: "Completed" },
  { id: 2, day: "Dushanba", time: "11:00 - 12:00", client: "Nilufar Mirzaeva", type: "Fitness Assessment", room: "Zona B", status: "Upcoming" },
  { id: 3, day: "Dushanba", time: "15:00 - 16:00", client: "Doniyor Raxmonov", type: "Rehab & Recovery", room: "Zona A", status: "Risk Alert" },
  { id: 4, day: "Chorshanba", time: "10:00 - 11:00", client: "Mohira Aliyeva", type: "Strength Training", room: "Zona C", status: "Upcoming" },
  { id: 5, day: "Juma", time: "17:30 - 18:30", client: "Jasur Toshmatov", type: "Hypertrophy Session", room: "Zona A", status: "Upcoming" },
];

export default function TrainerSchedulePage() {
  const [selectedDay, setSelectedDay] = useState("Dushanba");

  const daySessions = SCHEDULE_ITEMS.filter((s) => s.day === selectedDay);

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-7xl mx-auto">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-text-hi flex items-center gap-2">
            <CalendarIcon className="w-7 h-7 text-accent" /> Haftalik Mashg'ulotlar Jadvali (Schedule)
          </h1>
          <p className="text-text-dim text-sm mt-1">Kunlik mashg'ulotlar seanslari va zal zonalari bo'yicha jadval</p>
        </div>
        <button className="px-4 py-2.5 bg-accent text-bg font-semibold text-xs rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 cursor-pointer shadow-[0_0_20px_rgba(232,255,71,0.2)]">
          <Plus className="w-4 h-4" /> Yangi Seans Belgilash
        </button>
      </div>

      {/* Day Selector Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-2 border-b border-border">
        {DAYS.map((day) => (
          <button
            key={day}
            onClick={() => setSelectedDay(day)}
            className={`px-4 py-2 rounded-xl text-xs font-mono transition-colors cursor-pointer whitespace-nowrap ${
              selectedDay === day
                ? "bg-accent text-bg font-semibold"
                : "bg-surface-2 text-text-mid hover:text-text-hi border border-border"
            }`}
          >
            {day}
          </button>
        ))}
      </div>

      {/* Schedule Sessions Card */}
      <Card className="bg-surface border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border">
          <CardTitle className="text-base font-display font-bold text-text-hi flex items-center gap-2">
            <Clock className="w-4 h-4 text-accent" /> {selectedDay} Kungi Mashg'ulotlar
          </CardTitle>
          <span className="text-xs font-mono text-text-dim">{daySessions.length} ta seans</span>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {daySessions.length === 0 ? (
            <div className="py-12 text-center text-text-dim font-mono text-xs">
              Bu kunga mashg'ulotlar belgilanmagan.
            </div>
          ) : (
            daySessions.map((session) => (
              <div
                key={session.id}
                className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 p-4 rounded-xl bg-surface-2 border border-border-2 hover:border-accent/30 transition-colors"
              >
                <div className="flex items-center gap-4">
                  <div className="px-3 py-2 rounded-lg bg-surface-3 border border-border font-mono text-xs text-accent font-semibold text-center shrink-0">
                    {session.time}
                  </div>
                  <div>
                    <div className="text-sm font-semibold text-text-hi flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-accent" /> {session.client}
                    </div>
                    <div className="text-xs text-text-dim font-mono mt-1 flex items-center gap-2">
                      <span>{session.type}</span>
                      <span>•</span>
                      <span className="text-text-mid">{session.room}</span>
                    </div>
                  </div>
                </div>

                <Pill
                  variant={
                    session.status === "Completed"
                      ? "success"
                      : session.status === "Risk Alert"
                      ? "danger"
                      : "default"
                  }
                >
                  {session.status}
                </Pill>
              </div>
            ))
          )}
        </CardContent>
      </Card>
    </div>
  );
}
