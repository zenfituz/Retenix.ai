"use client";

import React, { useState, useEffect } from "react";
import { Users, Calendar, Flame, Activity, MessageSquare, CheckCircle2, Clock, AlertTriangle, ArrowRight } from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Pill } from "@/components/ui/pill";
import { getCurrentUserSession } from "@/utils/demo-check";
import Link from "next/link";

const DEMO_SCHEDULE = [
  { id: 1, time: "09:00 - 10:00", client: "Jasur Toshmatov", type: "Personal Training", status: "Completed" },
  { id: 2, time: "11:00 - 12:00", client: "Nilufar Mirzaeva", type: "Fitness Assessment", status: "Upcoming" },
  { id: 3, time: "15:00 - 16:00", client: "Doniyor Raxmonov", type: "Rehab & Recovery", status: "Risk Alert" },
  { id: 4, time: "17:30 - 18:30", client: "Mohira Aliyeva", type: "Strength Training", status: "Upcoming" },
];

const DEMO_CLIENTS = [
  { id: 1, name: "Jasur Toshmatov", plan: "Hypertrophy 4x", streak: "🔥 14 kun", adherence: "94%", status: "Active" },
  { id: 2, name: "Nilufar Mirzaeva", plan: "Fat Loss 3x", streak: "🔥 7 kun", adherence: "85%", status: "Active" },
  { id: 3, name: "Doniyor Raxmonov", plan: "Strength 4x", streak: "0 kun", adherence: "42%", status: "Risk" },
  { id: 4, name: "Mohira Aliyeva", plan: "Beginner 3x", streak: "🌱 2 kun", adherence: "78%", status: "New" },
];

export default function TrainerDashboard() {
  const [isDemo, setIsDemo] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const [schedule, setSchedule] = useState(DEMO_SCHEDULE);

  useEffect(() => {
    async function checkUser() {
      const session = await getCurrentUserSession();
      setUserEmail(session.email);
      setIsDemo(session.isDemo);
      if (!session.isDemo) {
        setSchedule([]);
      }
      setLoading(false);
    }
    checkUser();
  }, []);

  const toggleComplete = (id: number) => {
    setSchedule(prev => prev.map(s => s.id === id ? { ...s, status: s.status === 'Completed' ? 'Upcoming' : 'Completed' } : s));
  };

  if (loading) {
    return (
      <div className="flex-1 p-8 text-center text-text-dim font-mono text-xs">
        Yuklanmoqda...
      </div>
    );
  }

  const clientsList = isDemo ? DEMO_CLIENTS : [];

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 min-h-screen bg-bg text-text-hi">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-text-hi">
            {isDemo ? "Salom, Coach Aziz 👋" : `Salom, ${userEmail?.split('@')[0] || 'Murabbiy'} 👋`}
          </h2>
          <p className="text-text-dim text-sm mt-1">
            {isDemo ? "Bugungi jadvalingiz va mijozlaringiz faolligi (Demo Rejim)" : "Bugungi jadvalingiz va sizga biriktirilgan mijozlar"}
          </p>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          {isDemo ? "4 ta mashg'ulot belgilangan" : `${schedule.length} ta mashg'ulot`}
        </div>
      </div>

      {/* KPI Section */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Mening Mijozlarim"
          value={isDemo ? "18 ta" : "0 ta"}
          icon={<Users className="h-4 w-4 text-accent" />}
          trend={isDemo ? { value: "+2 yangi", isPositive: true } : undefined}
        />
        <KpiCard
          title="O'rtacha Adherence"
          value={isDemo ? "82%" : "100%"}
          icon={<Activity className="h-4 w-4 text-good" />}
          trend={isDemo ? { value: "+4%", isPositive: true } : undefined}
        />
        <KpiCard
          title="Diqqat Talab (Risk)"
          value={isDemo ? "2 ta" : "0 ta"}
          icon={<AlertTriangle className="h-4 w-4 text-bad" />}
        />
        <KpiCard
          title="Bugungi Mashg'ulotlar"
          value={isDemo ? "4 ta" : `${schedule.length} ta`}
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
            {schedule.length > 0 ? (
              schedule.map((item) => (
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
                      <h4 className="text-xs font-semibold text-text-hi">{item.client}</h4>
                      <p className="text-[10px] font-mono text-text-dim mt-0.5">{item.time} • {item.type}</p>
                    </div>
                  </div>
                  <Pill variant={item.status === 'Completed' ? 'success' : item.status === 'Risk Alert' ? 'danger' : 'default'}>
                    {item.status}
                  </Pill>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-text-dim text-xs space-y-2">
                <div>Bugun uchun birorta ham seans belgilanmagan.</div>
              </div>
            )}
          </CardContent>
        </Card>

        {/* Right Column: My Clients */}
        <Card className="col-span-3 bg-surface border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
            <CardTitle className="text-base font-display font-bold">Biriktirilgan Mijozlar</CardTitle>
            <Link href="/trainer/clients" className="text-xs text-accent font-mono hover:underline">
              Barchasi →
            </Link>
          </CardHeader>
          <CardContent className="p-4 pt-4 space-y-3">
            {clientsList.length > 0 ? (
              clientsList.map((client) => (
                <div key={client.id} className="p-3 rounded-xl bg-surface-2 border border-border-2 flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={client.name.substring(0, 2).toUpperCase()} size="sm" />
                    <div>
                      <p className="text-xs font-semibold text-text-hi">{client.name}</p>
                      <p className="text-[10px] font-mono text-text-dim">{client.plan}</p>
                    </div>
                  </div>
                  <div className="text-right">
                    <span className="text-xs font-bold text-accent font-mono">{client.adherence}</span>
                    <p className="text-[9px] text-text-dim font-mono">{client.streak}</p>
                  </div>
                </div>
              ))
            ) : (
              <div className="p-6 text-center text-text-dim text-xs space-y-2">
                <div>Sizga hali birorta mijoz biriktirilmadi. Zal egasi sizga mijoz biriktirishi kutilmoqda.</div>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
