'use client'

import React from 'react'
import { TrendingUp, Users, AlertTriangle, Activity } from 'lucide-react'
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card'

export default function OwnerAnalytics() {
  return (
    <div className="p-6 max-w-7xl mx-auto space-y-6">
      <div className="mb-8">
        <h1 className="text-2xl font-display font-bold text-text-hi tracking-tight">Analitika</h1>
        <p className="text-text-dim text-sm mt-1">Biznes ko'rsatkichlari va mijozlar analitikasi</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Retention Rate Chart */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-text-hi flex items-center gap-2">
              <Users className="w-5 h-5 text-accent" />
              Retention Rate (Oxirgi 6 oy)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex items-end gap-2 pb-4">
              {[85, 82, 88, 86, 91, 94].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2">
                  <div className="text-xs text-text-dim font-mono">{val}%</div>
                  <div 
                    className="w-full bg-accent/20 rounded-t-md hover:bg-accent/40 transition-colors border border-accent/30 border-b-0"
                    style={{ height: `${val}%` }}
                  />
                  <div className="text-xs text-text-dim mt-2">Oy {i+1}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* MRR Growth Chart */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-text-hi flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-good" />
              MRR O'sish ($)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex items-end gap-2 pb-4">
              {[3.2, 3.4, 3.8, 4.0, 4.5, 5.1].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2">
                  <div className="text-xs text-text-dim font-mono">{val}k</div>
                  <div 
                    className="w-full bg-good/20 rounded-t-md hover:bg-good/40 transition-colors border border-good/30 border-b-0"
                    style={{ height: `${(val / 6) * 100}%` }}
                  />
                  <div className="text-xs text-text-dim mt-2">Oy {i+1}</div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Churn Risk Distribution */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-text-hi flex items-center gap-2">
              <AlertTriangle className="w-5 h-5 text-bad" />
              Ketish Xavfi (Churn Risk)
            </CardTitle>
          </CardHeader>
          <CardContent className="flex items-center justify-center">
            <div className="w-48 h-48 rounded-full border-[16px] border-surface-2 relative flex items-center justify-center">
              <svg className="absolute inset-0 w-full h-full -rotate-90">
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="#222" strokeWidth="32" />
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="#ef4444" strokeWidth="32" strokeDasharray="502" strokeDashoffset="400" />
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="#eab308" strokeWidth="32" strokeDasharray="502" strokeDashoffset={100} style={{ transform: 'rotate(72deg)', transformOrigin: 'center' }} />
                <circle cx="96" cy="96" r="80" fill="transparent" stroke="#22c55e" strokeWidth="32" strokeDasharray="502" strokeDashoffset="250" style={{ transform: 'rotate(200deg)', transformOrigin: 'center' }} />
              </svg>
              <div className="text-center z-10 bg-surface rounded-full p-4">
                <div className="text-2xl font-bold text-text-hi">412</div>
                <div className="text-[10px] text-text-dim uppercase">A'zolar</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* DAU Weekly Histogram */}
        <Card className="bg-surface border-border">
          <CardHeader>
            <CardTitle className="text-text-hi flex items-center gap-2">
              <Activity className="w-5 h-5 text-accent" />
              Kunlik Faol Foydalanuvchilar (DAU)
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="h-[250px] w-full flex items-end gap-2 pb-4">
              {[120, 150, 140, 180, 160, 200, 110].map((val, i) => (
                <div key={i} className="flex-1 flex flex-col justify-end items-center gap-2">
                  <div className="text-xs text-text-dim font-mono">{val}</div>
                  <div 
                    className="w-full bg-accent/20 rounded-t-sm hover:bg-accent/40 transition-colors border border-accent/30 border-b-0"
                    style={{ height: `${(val / 200) * 100}%` }}
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
