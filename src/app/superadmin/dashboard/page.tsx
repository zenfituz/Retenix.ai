"use client";

import React from 'react';
import { Building2, CreditCard, Users, TrendingUp, Activity, ArrowUpRight } from 'lucide-react';
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";

const RECENT_GYMS = [
  { id: 1, name: "FitLife Toshkent", owner: "Rustam Toshmatov", status: "Active", revenue: "$1,200", plan: "Pro" },
  { id: 2, name: "Iron Gym Samarqand", owner: "Aziz Boltayev", status: "Trial", revenue: "$0", plan: "Starter" },
  { id: 3, name: "BeFit Premium", owner: "Leyla Mirzaeva", status: "Active", revenue: "$2,850", plan: "Scale" },
  { id: 4, name: "Olympia Fitness", owner: "Nodir Qodirov", status: "Active", revenue: "$950", plan: "Pro" },
];

export default function SuperadminDashboard() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 min-h-screen bg-bg text-text-hi">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-text-hi">
            Platforma Boshqaruvi
          </h2>
          <p className="text-text-dim text-sm mt-1">Barcha zallar, daromadlar va global platforma KPI ko'rsatkichlari</p>
        </div>
        <div className="px-3.5 py-1.5 rounded-full bg-accent/10 border border-accent/30 text-accent font-mono text-xs flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
          412 ta faol zal barchasi online
        </div>
      </div>

      {/* KPI Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard
          title="Jami Zallar"
          value="412 ta"
          icon={<Building2 className="h-4 w-4 text-accent" />}
          trend={{ value: "+14 bu oy", isPositive: true }}
        />
        <KpiCard
          title="Platforma MRR"
          value="$18,450"
          icon={<CreditCard className="h-4 w-4 text-good" />}
          trend={{ value: "+9.3%", isPositive: true }}
        />
        <KpiCard
          title="Jami A'zolar"
          value="34,120"
          icon={<Users className="h-4 w-4 text-info" />}
          trend={{ value: "+15%", isPositive: true }}
        />
        <KpiCard
          title="O'rtacha Retention"
          value="88.4%"
          icon={<Activity className="h-4 w-4 text-accent" />}
          trend={{ value: "+2.1%", isPositive: true }}
        />
      </div>

      {/* Analytics & Gyms Section */}
      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-7">
        {/* Revenue Growth Histogram */}
        <Card className="col-span-4 bg-surface border-border">
          <CardHeader className="flex flex-row items-center justify-between pb-2 border-b border-border">
            <CardTitle className="text-base font-display font-bold flex items-center gap-2">
              <TrendingUp className="w-4 h-4 text-accent" /> Platforma Oylik Daromad Dinamikasi
            </CardTitle>
            <span className="text-xs font-mono text-text-dim">2026 yil</span>
          </CardHeader>
          <CardContent className="p-6">
            <div className="h-60 flex items-end justify-between gap-3 pt-6 border-b border-border pb-4">
              {[40, 55, 48, 65, 72, 80, 88, 92, 85, 96, 90, 100].map((height, i) => (
                <div key={i} className="flex-1 flex flex-col items-center gap-2 group">
                  <div
                    className="w-full bg-surface-3 group-hover:bg-accent transition-all rounded-t"
                    style={{ height: `${height}%` }}
                  />
                </div>
              ))}
            </div>
            <div className="flex justify-between mt-3 text-[11px] font-mono text-text-dim">
              <span>Yan</span><span>Fev</span><span>Mar</span><span>Apr</span><span>May</span><span>Iyun</span>
              <span>Iyul</span><span>Avg</span><span>Sen</span><span>Okt</span><span>Noy</span><span>Dek</span>
            </div>
          </CardContent>
        </Card>

        {/* Recent Gyms */}
        <Card className="col-span-3 bg-surface border-border">
          <CardHeader className="pb-2 border-b border-border">
            <CardTitle className="text-base font-display font-bold flex items-center gap-2">
              <Building2 className="w-4 h-4 text-accent" /> So'nggi Qo'shilgan Zallar
            </CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-3">
            {RECENT_GYMS.map((gym) => (
              <div
                key={gym.id}
                className="flex items-center justify-between p-3.5 rounded-xl bg-surface-2 border border-border-2"
              >
                <div>
                  <div className="text-sm font-semibold text-text-hi">{gym.name}</div>
                  <div className="text-xs text-text-dim mt-0.5">{gym.owner} • {gym.plan}</div>
                </div>
                <div className="text-right">
                  <div className="text-xs font-mono text-accent font-semibold">{gym.revenue}</div>
                  <div className="mt-1">
                    <Pill variant={gym.status === 'Active' ? 'success' : 'warning'}>
                      {gym.status}
                    </Pill>
                  </div>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
