'use client'

import React from 'react'
import { TrendingUp, Target, Users, Dumbbell } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function TrainerAnalytics() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-text-hi tracking-tight">Mijozlar Analitikasi</h1>
        <p className="text-text-dim text-sm mt-1">Mashg'ulotlar va ovqatlanish ko'rsatkichlari</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
        {[
          { label: "Mijozlar", value: "18", icon: Users, color: "text-accent" },
          { label: "Mashq Adherence", value: "84%", icon: Dumbbell, color: "text-good" },
          { label: "Maqsadga yetish", value: "62%", icon: Target, color: "text-accent" },
          { label: "O'sish", value: "+12%", icon: TrendingUp, color: "text-good" }
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
        {/* Client Adherence Breakdown */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-text-hi flex items-center gap-2">
              <Target className="w-5 h-5 text-accent" />
              Mijozlar Adherence (%)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {[
                { name: "Alisher", value: 95 },
                { name: "Malika", value: 88 },
                { name: "Rustam", value: 72 },
                { name: "Sardor", value: 45 },
                { name: "Nargiza", value: 91 }
              ].map((client, i) => (
                <div key={i} className="flex items-center gap-4">
                  <div className="w-20 text-sm text-text-hi font-medium truncate">{client.name}</div>
                  <div className="flex-1 h-3 bg-surface-2 rounded-full overflow-hidden border border-border">
                    <div 
                      className={`h-full ${client.value > 80 ? 'bg-good' : client.value > 60 ? 'bg-accent' : 'bg-bad'}`}
                      style={{ width: `${client.value}%` }}
                    />
                  </div>
                  <div className="w-10 text-xs text-text-dim text-right font-mono">{client.value}%</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Workout Completion Rate */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-text-hi flex items-center gap-2">
              <Dumbbell className="w-5 h-5 text-accent" />
              Mashqlar Bajarilishi
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex items-end gap-2 pb-4">
              {[70, 85, 90, 75, 88, 95, 82].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2">
                  <div className="text-xs text-text-dim font-mono">{val}%</div>
                  <div 
                    className="w-full bg-accent/20 rounded-t-sm hover:bg-accent/40 transition-colors border border-accent/30 border-b-0"
                    style={{ height: `${val}%` }}
                  />
                  <div className="text-xs text-text-dim mt-2">{['D','S','C','P','J','S','Y'][i]}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
