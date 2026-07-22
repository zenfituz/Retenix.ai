"use client"
import { Users, Activity, UserMinus, Dumbbell } from "lucide-react"
import { KpiCard } from "@/components/ui/kpi-card"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Pill } from "@/components/ui/pill"

const recentMembers = [
  { id: 1, name: "Alex Johnson", email: "alex@example.com", status: "Active", time: "2 hours ago" },
  { id: 2, name: "Maria Garcia", email: "maria@example.com", status: "Risk", time: "5 hours ago" },
  { id: 3, name: "James Smith", email: "james@example.com", status: "New", time: "1 day ago" },
]

export default function OwnerDashboard() {
  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex items-center justify-between space-y-2">
        <h2 className="text-3xl font-bold tracking-tight text-white">Dashboard</h2>
      </div>
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <KpiCard 
          title="Total Members" 
          value="2,350" 
          icon={<Users className="h-4 w-4" />} 
          trend={{ value: "12%", isPositive: true }} 
        />
        <KpiCard 
          title="Retention Rate" 
          value="92.4%" 
          icon={<Activity className="h-4 w-4" />} 
          trend={{ value: "2.1%", isPositive: true }} 
        />
        <KpiCard 
          title="Churn Risk" 
          value="143" 
          icon={<UserMinus className="h-4 w-4" />} 
          trend={{ value: "12", isPositive: false }} 
        />
        <KpiCard 
          title="Active Today" 
          value="573" 
          icon={<Dumbbell className="h-4 w-4" />} 
        />
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7 mt-4">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Activity Overview</CardTitle>
          </CardHeader>
          <CardContent className="pl-2">
            <div className="h-[200px] w-full flex items-center justify-center text-zinc-500 border border-dashed border-zinc-700 rounded-md">
              [Chart Placeholder]
            </div>
          </CardContent>
        </Card>
        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-8">
              {recentMembers.map(member => (
                <div key={member.id} className="flex items-center">
                  <Avatar fallback={member.name.substring(0, 2).toUpperCase()} />
                  <div className="ml-4 space-y-1">
                    <p className="text-sm font-medium leading-none text-white">{member.name}</p>
                    <p className="text-sm text-zinc-400">{member.email}</p>
                  </div>
                  <div className="ml-auto font-medium">
                    <Pill variant={member.status === 'Active' ? 'success' : member.status === 'Risk' ? 'danger' : 'default'}>
                      {member.status}
                    </Pill>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
