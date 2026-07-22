"use client";

import React from "react";
import { useActivityLog } from "@/context/activity-log-context";
import { useLanguage } from "@/context/language-context";
import { Activity, Clock, Shield, User, Dumbbell, Building2 } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";

export function ActivityLogPanel() {
  const { logs } = useActivityLog();
  const { t } = useLanguage();

  return (
    <Card className="bg-surface border-border">
      <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
        <CardTitle className="text-base font-display font-bold text-text-hi flex items-center gap-2">
          <Activity className="w-4 h-4 text-accent" /> {t("activityLog")}
        </CardTitle>
        <span className="text-xs font-mono text-text-dim">{logs.length} ta yozuv</span>
      </CardHeader>
      <CardContent className="p-4 space-y-3">
        {logs.map((item) => (
          <div
            key={item.id}
            className="flex flex-col sm:flex-row sm:items-center justify-between gap-2.5 p-3.5 rounded-xl bg-surface-2 border border-border-2 hover:border-accent/30 transition-colors"
          >
            <div className="flex items-center gap-3">
              <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center text-accent shrink-0 font-bold text-xs">
                {item.role.substring(0, 1).toUpperCase()}
              </div>
              <div>
                <div className="text-xs font-semibold text-text-hi flex items-center gap-2">
                  <span>{item.user}</span>
                  <span className="text-[10px] font-mono px-2 py-0.5 rounded bg-surface-3 text-text-mid border border-border">
                    {item.role}
                  </span>
                </div>
                <div className="text-xs text-text-mid mt-0.5">
                  <span className="font-semibold text-text-hi">{item.action}:</span> {item.details}
                </div>
              </div>
            </div>

            <div className="text-[10px] font-mono text-text-dim flex items-center gap-1 self-end sm:self-auto shrink-0">
              <Clock className="w-3 h-3 text-accent" /> {item.timestamp}
            </div>
          </div>
        ))}
      </CardContent>
    </Card>
  );
}
