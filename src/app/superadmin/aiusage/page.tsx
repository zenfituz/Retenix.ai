'use client'

import React from 'react'
import { Cpu, Activity, Zap, Database } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function AIUsagePage() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-text-hi tracking-tight flex items-center gap-2">
          <Cpu className="w-8 h-8 text-accent" />
          AI Token Usage
        </h1>
        <p className="text-text-dim text-sm mt-1">Platforma bo'ylab AI sarflari va API holati</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Jami Tokenlar", value: "24.5M", icon: Database, color: "text-accent" },
          { label: "O'rtacha Latency", value: "840ms", icon: Zap, color: "text-good" },
          { label: "So'rovlar (24s)", value: "128.4k", icon: Activity, color: "text-accent" },
          { label: "Xarajatlar", value: "$412.50", icon: Cpu, color: "text-bad" }
        ].map((stat, i) => (
          <Card key={i} className="bg-surface border-border">
            <CardContent className="p-6 flex flex-col justify-between h-full">
              <div className="flex items-center justify-between mb-4">
                <div className="text-sm font-medium text-text-mid">{stat.label}</div>
                <stat.icon className={`w-5 h-5 ${stat.color}`} />
              </div>
              <div className="text-3xl font-display font-bold text-text-hi">{stat.value}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Token Consumption Graph */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-text-hi">Token Sarflari (Oxirgi 7 kun)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-end gap-3 pb-4">
              {[2.1, 2.4, 1.8, 3.2, 4.5, 3.8, 5.1].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2">
                  <div className="text-[10px] text-text-dim font-mono">{val}M</div>
                  <div 
                    className="w-full bg-accent/20 rounded-t-sm hover:bg-accent/40 transition-colors border border-accent/30 border-b-0"
                    style={{ height: `${(val / 6) * 100}%` }}
                  />
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* API Latency Chart */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-text-hi">API Latency Metrics (ms)</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[300px] w-full flex items-end gap-1 pb-4">
              {Array.from({ length: 24 }).map((_, i) => {
                const val = 600 + Math.random() * 400 + (i === 14 ? 800 : 0)
                return (
                  <div key={i} className="flex-1 flex flex-col justify-end items-center gap-1 group relative">
                    {val > 1000 && <div className="absolute -top-6 text-[8px] text-bad bg-bad/20 px-1 rounded border border-bad/30">Spike</div>}
                    <div 
                      className={`w-full rounded-t-sm transition-colors border-b-0 ${val > 1000 ? 'bg-bad/40 border-bad/50 border' : 'bg-surface-3 border border-border'}`}
                      style={{ height: `${(val / 2000) * 100}%` }}
                    />
                  </div>
                )
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
