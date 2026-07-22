"use client";

import React from "react";
import { Users, Activity, UserMinus, Dumbbell, TrendingUp } from "lucide-react";
import { KpiCard } from "@/components/ui/kpi-card";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Avatar } from "@/components/ui/avatar";
import { Pill } from "@/components/ui/pill";
import { ActivityLogPanel } from "@/components/shared/activity-log";

const RECENT_MEMBERS = [
  { id: 1, name: "Jasur Toshmatov", email: "jasur@example.com", status: "Active", time: "Hozirgina" },
  { id: 2, name: "Doniyor Raxmonov", email: "doniyor@example.com", status: "Risk", time: "30 min oldin" },
  { id: 3, name: "Mohira Aliyeva", email: "mohira@example.com", status: "New", time: "1 soat oldin" },
];

export default function OwnerDashboard() {
  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6 bg-bg text-text-hi min-h-screen">
      <div className="flex items-center justify-between">
        <div>
          <h2 className="text-3xl font-display font-bold tracking-tight text-text-hi">
            FitZone Owner Dashboard
          </h2>
          <p className="text-text-dim text-sm mt-1">Zalingiz statistikasi va a'zolar faollik auditi</p>
        </div>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="Jami A'zolar" 
          value="2,350" 
          icon={<Users className="h-4 w-4 text-accent" />} 
          trend={{ value: "+12%", isPositive: true }} 
        />
        <KpiCard 
          title="Retention Rate" 
          value="92.4%" 
          icon={<Activity className="h-4 w-4 text-good" />} 
          trend={{ value: "+2.1%", isPositive: true }} 
        />
        <KpiCard 
          title="Churn Risk" 
          value="143 ta" 
          icon={<UserMinus className="h-4 w-4 text-bad" />} 
          trend={{ value: "-12", isPositive: true }} 
        />
        <KpiCard 
          title="Bugun Faol" 
          value="573 ta" 
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
            <CardTitle className="text-base font-display font-bold text-text-hi">So'nggi Qo'shilgan A'zolar</CardTitle>
          </CardHeader>
          <CardContent className="p-4 space-y-4">
            {RECENT_MEMBERS.map((member) => (
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
            ))}
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
