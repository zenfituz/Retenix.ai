"use client";

import React, { useEffect, useState } from "react";
import { Users, Activity, UserMinus, Dumbbell, UserPlus, Upload, Sparkles, CheckCircle2 } from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Pill } from "@/components/ui/pill";
import { ActivityLogPanel } from "@/components/shared/activity-log";
import { getCurrentUserSession } from "@/utils/demo-check";
import Link from "next/link";

const DEMO_RECENT_MEMBERS = [
  { id: 1, name: "Jasur Toshmatov", email: "jasur@example.com", status: "Active", time: "Hozirgina" },
  { id: 2, name: "Doniyor Raxmonov", email: "doniyor@example.com", status: "Risk", time: "30 min oldin" },
  { id: 3, name: "Mohira Aliyeva", email: "mohira@example.com", status: "New", time: "1 soat oldin" },
];

export default function OwnerDashboard() {
  const [isDemo, setIsDemo] = useState(true);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function checkUser() {
      const session = await getCurrentUserSession();
      setUserEmail(session.email);
      setIsDemo(session.isDemo);
      setLoading(false);
    }
    checkUser();
  }, []);

  if (loading) {
    return (
      <div className="flex-1 p-8 text-center text-text-dim font-mono text-xs">
        Yuklanmoqda...
      </div>
    );
  }

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-bg text-text-hi min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-text-hi">
            {isDemo ? "FitZone Owner Dashboard" : "Gym Owner Dashboard"}
          </h2>
          <p className="text-text-dim text-sm mt-1">
            {isDemo 
              ? "Zalingiz statistikasi va a'zolar faollik auditi (Demo Rejim)"
              : `Xush kelibsiz, ${userEmail || 'Zal Egasi'}! Zalingiz statistikasi va boshqaruvi.`
            }
          </p>
        </div>
      </div>

      {/* NEW REAL USER ONBOARDING BANNER (when not demo user) */}
      {!isDemo && (
        <Card className="bg-surface-2 border-accent/40 shadow-[0_0_30px_rgba(232,255,71,0.1)]">
          <CardContent className="p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
            <div className="space-y-1">
              <div className="flex items-center gap-2 font-display font-bold text-accent text-base">
                <Sparkles className="w-5 h-5 text-accent" /> Zalingiz Ishga Tushdi!
              </div>
              <p className="text-xs text-text-dim leading-relaxed max-w-xl">
                Retenix.ai platformasidagi shaxsiy zalingiz yaratildi. Birinchi a'zolaringizni ro'yxatga oling yoki CSV ro'yxatini import qiling.
              </p>
            </div>
            <div className="flex items-center gap-3 shrink-0">
              <Link 
                href="/owner/members" 
                className="px-4 py-2.5 bg-accent text-bg font-bold text-xs rounded-xl shadow-[0_0_15px_rgba(232,255,71,0.2)] flex items-center gap-1.5 hover:opacity-90"
              >
                <UserPlus className="w-4 h-4" /> + Birinchi A'zoni Qo'shish
              </Link>
            </div>
          </CardContent>
        </Card>
      )}

      {/* KPI GRID */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="Jami A'zolar" 
          value={isDemo ? "2,350" : "0 ta"} 
          icon={<Users className="h-4 w-4 text-accent" />} 
          trend={isDemo ? { value: "+12%", isPositive: true } : undefined} 
        />
        <KpiCard 
          title="Retention Rate" 
          value={isDemo ? "92.4%" : "100%"} 
          icon={<Activity className="h-4 w-4 text-good" />} 
          trend={isDemo ? { value: "+2.1%", isPositive: true } : undefined} 
        />
        <KpiCard 
          title="Churn Risk" 
          value={isDemo ? "143 ta" : "0 ta"} 
          icon={<UserMinus className="h-4 w-4 text-bad" />} 
          trend={isDemo ? { value: "-12", isPositive: true } : undefined} 
        />
        <KpiCard 
          title="Bugun Faol" 
          value={isDemo ? "573 ta" : "0 ta"} 
          icon={<Dumbbell className="h-4 w-4 text-accent" />} 
        />
      </div>

      {/* Main Grid: Activity Log + Recent Members */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-7">
        <div className="lg:col-span-4">
          <ActivityLogPanel />
        </div>

        <Card className="lg:col-span-3 bg-surface border-border">
          <CardHeader className="pb-3 border-b border-border">
            <CardTitle className="text-base font-display font-bold text-text-hi">
              {isDemo ? "So'nggi Qo'shilgan A'zolar" : "Zal A'zolari Ro'yxati"}
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {isDemo ? (
              DEMO_RECENT_MEMBERS.map((member) => (
                <div key={member.id} className="flex items-center justify-between p-3 rounded-xl bg-surface-2 border border-border-2">
                  <div className="flex items-center gap-3">
                    <Avatar fallback={member.name.substring(0, 2).toUpperCase()} size="sm" />
                    <div>
                      <p className="text-xs font-semibold text-text-hi">{member.name}</p>
                      <p className="text-[10px] font-mono text-text-dim">{member.email}</p>
                    </div>
                  </div>
                  <Pill variant={member.status === "Active" ? "success" : member.status === "Risk" ? "danger" : "default"}>
                    {member.status}
                  </Pill>
                </div>
              ))
            ) : (
              <div className="p-6 text-center space-y-3">
                <div className="w-10 h-10 rounded-full bg-surface-2 border border-border flex items-center justify-center text-text-dim mx-auto">
                  <Users className="w-5 h-5" />
                </div>
                <div className="text-xs font-semibold text-text-hi">Hali birorta a'zo qo'shilmadi</div>
                <p className="text-[11px] text-text-dim leading-relaxed">
                  Zalingizga yangi a'zolarni qo'shing va ularning davomati hamda churn xavfini avtomatik kuzating.
                </p>
                <Link 
                  href="/owner/members" 
                  className="inline-block px-4 py-2 bg-accent text-bg text-xs font-bold rounded-xl"
                >
                  A'zolarni Boshqarish
                </Link>
              </div>
            )}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
