import * as React from "react"
import { Card, CardContent, CardHeader, CardTitle } from "./card"

interface KpiCardProps {
  title: string
  value: string | number
  icon?: React.ReactNode
  trend?: {
    value: string | number
    isPositive: boolean
  }
}

export function KpiCard({ title, value, icon, trend }: KpiCardProps) {
  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
        <CardTitle className="text-sm font-medium text-zinc-400">
          {title}
        </CardTitle>
        {icon && <div className="text-[#E8FF47]">{icon}</div>}
      </CardHeader>
      <CardContent>
        <div className="text-2xl font-bold">{value}</div>
        {trend && (
          <p className={`text-xs mt-1 ${trend.isPositive ? 'text-[#E8FF47]' : 'text-red-500'}`}>
            {trend.isPositive ? '+' : '-'}{trend.value} from last month
          </p>
        )}
      </CardContent>
    </Card>
  )
}
