"use client";

import React, { useState } from "react";
import { Users, Calendar, Flame, Activity, MessageSquare, CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Pill } from "@/components/ui/pill";

const TODAY_SCHEDULE = [
  { id: 1, time: "09:00 - 10:00", client: "Jasur Toshmatov", type: "Personal Training", status: "Completed" },
  { id: 2, time: "11:00 - 12:00", client: "Nilufar Mirzaeva", type: "Fitness Assessment", status: "Upcoming" },
  { id: 3, time: "15:00 - 16:00", client: "Doniyor Raxmonov", type: "Rehab & Recovery", status: "Risk Alert" },
  { id: 4, time: "17:30 - 18:30", client: "Mohira Aliyeva", type: "Strength Training", status: "Upcoming" },
];

const MY_CLIENTS = [
  { id: 1, name: "Jasur Toshmatov", plan: "Hypertrophy 4x", streak: "🔥 14 kun", adherence: "94%", status: "Active" },
  { id: 2, name: "Nilufar Mirzaeva", plan: "Fat Loss 3x", streak: "🔥 7 kun", adherence: "85%", status: "Active" },
  { id: 3, name: "Doniyor Raxmonov", plan: "Strength 4x", streak: "0 kun", adherence: "42%", status: "Risk" },
  { id: 4, name: "Mohira Aliyeva", plan: "Beginner 3x", streak: "🌱 2 kun", adherence: "78%", status: "New" },
];

export default function TrainerDashboard() {
  const [schedule, setSchedule] = useState(TODAY_SCHEDULE);

  const toggleComplete = (id: number) => {
    setSchedule(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Completed' ? 'Upcoming' : 'Completed' } : s));
  };

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 min-h-screen bg-bg text-text-hi">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-text-hi">
            Salom, Coach Aziz 👋
          </h2>
          <p className="text-text-dim text-sm mt-1">Bugungi jadvalingiz va mijozlaringiz faolligi</p>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          4 ta mashg'ulot belgilangan
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Mening Mijozlarim"
          value="18 ta"
          icon={<Users className="h-4 w-4 text-accent" />}
          trend={{ value: "+2 yangi", isPositive: true }}
        />
        <KpiCard
          title="O'rtacha Adherence"
          value="82%"
          icon={<Activity className="h-4 w-4 text-good" />}
          trend={{ value: "+4%", isPositive: true }}
        />
        <KpiCard
          title="Diqqat Talab (Risk)"
          value="2 ta"
          icon={<AlertTriangle className="h-4 w-4 text-bad" />}
          trend={{ value: "E'tibor berilsin", isPositive: false }}
        />
        <KpiCard
          title="Bugungi Mashg'ulotlar"
          value="4 ta"
          icon={<Calendar className="h-4 w-4 text-info" />}
        />
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Left Column: Schedule */}
        <Card className="col-span-4 bg-surface border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
            <CardTitle className="text-base font-display font-bold flex items-center gap-2">
              <Clock className="w-4 h-4 text-accent" /> Bugungi Mashg'ulotlar Jadvali
            </CardTitle>
            <span className="text-xs font-mono text-text-dim">{new Date().toLocaleDateString('uz-UZ')}</span>
          </CardHeader>
          <CardContent className="p-4 pt-4 space-y-3">
            {schedule.map((item) => (
              <div
                key={item.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2 border border-border-2 hover:border-border transition-colors"
              >
                <div className="flex items-center gap-3.5">
                  <button
                    onClick={() => toggleComplete(item.id)}
                    className={`w-6 h-6 rounded-lg border flex items-center justify-center transition-colors cursor-pointer ${
                      item.status === 'Completed'
                        ? 'bg-good/20 border-good text-good'
                        : 'border-border-2 text-transparent hover:border-text-dim'
                    }`}
                  >
                    <CheckCircle2 className="w-4 h-4" />
                  </button>
                  <div>
                    <div className="text-sm font-semibold text-text-hi">{item.client}</div>
                    <div className="text-xs text-text-dim flex items-center gap-2 mt-0.5 font-mono">
                      <span>{item.time}</span>
                      <span>•</span>
                      <span>{item.type}</span>
                    </div>
                  </div>
                </div>

                <Pill
                  variant={
                    item.status === 'Completed'
                      ? 'success'
                      : item.status === 'Risk Alert'
                      ? 'danger'
                      : 'default'
                  }
                >
                  {item.status}
                </Pill>
              </div>
            ))}
          </CardContent>
        </Card>

        {/* Right Column: At-Risk & Top Clients */}
        <Card className="col-span-3 bg-surface border-border">
          <CardHeader className="pb-2 border-b border-border">
            <CardTitle className="text-base font-display font-bold flex items-center gap-2">
              <Flame className="w-4 h-4 text-accent" /> Mijozlar Holati
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {MY_CLIENTS.map((client) => (
              <div
                key={client.id}
                className="flex items-center justify-between p-3 rounded-xl bg-surface-2 border border-border-2"
              >
                <div className="flex items-center gap-3">
                  <Avatar fallback={client.name.substring(0, 2).toUpperCase()} size="sm" />
                  <div>
                    <div className="text-sm font-medium text-text-hi">{client.name}</div>
                    <div className="text-xs text-text-dim mt-0.5">{client.plan}</div>
                  </div>
                </div>

                <div className="text-right">
                  <div className="text-xs font-mono text-accent font-semibold">{client.streak}</div>
                  <div className="text-[11px] text-text-dim font-mono mt-0.5">Adherence: {client.adherence}</div>
                </div>
              </div>
            ))}

            <button className="w-full mt-2 py-2.5 px-4 rounded-xl bg-surface-3 border border-border-2 text-xs font-mono text-text-mid hover:text-accent hover:border-accent/40 transition-colors flex items-center justify-center gap-2 cursor-pointer">
              Barcha Mijozlarni Ko'rish <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
