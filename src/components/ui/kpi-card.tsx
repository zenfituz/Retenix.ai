import * as React from "react";
import { Card, CardContent, CardHeader, CardTitle } from "./card";

interface KpiCardProps {
  title: string;
  value: string | number;
  icon?: React.ReactNode;
  trend?: {
    value: string | number;
    isPositive: boolean;
  };
}

export function KpiCard({ title, value, icon, trend }: KpiCardProps) {
  return (
    <Card className="bg-surface border-border hover:border-accent/40 transition-all duration-300 glass-card-hover relative overflow-hidden group">
      <div className="absolute top-0 right-0 w-24 h-24 bg-accent/5 rounded-full blur-2xl group-hover:bg-accent/10 transition-all" />
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2 relative z-10">
        <CardTitle className="text-xs font-mono font-medium text-text-mid uppercase tracking-wider">
          {title}
        </CardTitle>
        {icon && (
          <div className="p-2 rounded-xl bg-surface-2 border border-border text-accent group-hover:scale-110 transition-transform">
            {icon}
          </div>
        )}
      </CardHeader>
      <CardContent className="relative z-10 space-y-1">
        <div className="text-2xl sm:text-3xl font-display font-bold text-text-hi">{value}</div>
        {trend && (
          <div className="flex items-center gap-1">
            <span className={`text-[10px] font-mono px-2 py-0.5 rounded-full font-semibold ${
              trend.isPositive 
                ? 'bg-good/10 text-good border border-good/30' 
                : 'bg-bad/10 text-bad border border-bad/30'
            }`}>
              {trend.isPositive ? '↑' : '↓'} {trend.value}
            </span>
            <span className="text-[10px] font-mono text-text-dim">o'tgan oyga nisbatan</span>
          </div>
        )}
      </CardContent>
    </Card>
  );
}
