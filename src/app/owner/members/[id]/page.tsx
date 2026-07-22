"use client"
import { useParams } from "next/navigation"
import { ArrowLeft, Calendar, Flame, Activity, Mail, Phone, MessageSquare } from "lucide-react"
import Link from "next/link"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Pill } from "@/components/ui/pill"

// Mock data
const getMember = (id: string) => ({
  id,
  name: "Alex Johnson",
  email: "alex@example.com",
  phone: "+1 (555) 123-4567",
  status: "Active",
  joinDate: "Jan 15, 2023",
  streak: 12,
  visitsThisMonth: 18,
  lastVisit: "2 hours ago",
  plan: "Premium Annual",
  trainer: "Jasur"
})

export default function MemberDetail() {
  const params = useParams()
  const id = params.id as string
  const member = getMember(id)

  return (
    <div className="flex-1 space-y-6 p-4 md:p-8 pt-6">
      <div className="flex items-center space-x-4">
        <Link href="/owner/members" className="text-zinc-400 hover:text-white transition-colors">
          <ArrowLeft className="h-5 w-5" />
        </Link>
        <h2 className="text-2xl md:text-3xl font-bold tracking-tight text-white">Member Profile</h2>
      </div>

      <div className="grid gap-6 md:grid-cols-3">
        {/* Left Column - Profile Info */}
        <Card className="md:col-span-1 h-fit">
          <CardContent className="p-6 flex flex-col items-center text-center space-y-4">
            <Avatar fallback={member.name.substring(0, 2).toUpperCase()} size="lg" className="h-24 w-24 text-2xl" />
            <div>
              <h3 className="text-xl font-bold text-white">{member.name}</h3>
              <p className="text-zinc-400">{member.plan}</p>
            </div>
            <Pill variant={member.status === 'Active' ? 'success' : member.status === 'Risk' ? 'danger' : 'default'}>
              {member.status}
            </Pill>
            
            <div className="w-full pt-4 border-t border-white/10 space-y-3">
              <div className="flex items-center text-zinc-300 text-sm">
                <Mail className="h-4 w-4 mr-3 text-zinc-500" />
                {member.email}
              </div>
              <div className="flex items-center text-zinc-300 text-sm">
                <Phone className="h-4 w-4 mr-3 text-zinc-500" />
                {member.phone}
              </div>
              <div className="flex items-center text-zinc-300 text-sm">
                <Calendar className="h-4 w-4 mr-3 text-zinc-500" />
                Joined {member.joinDate}
              </div>
              <div className="flex items-center justify-between text-zinc-300 text-sm pt-2 border-t border-white/5">
                <div className="flex items-center">
                  <Activity className="h-4 w-4 mr-3 text-zinc-500" />
                  Trener: {member.trainer}
                </div>
                <button className="text-xs text-[#E8FF47] hover:underline">O'zgartirish</button>
              </div>
            </div>

            <div className="w-full pt-4 flex space-x-2">
              <button className="flex-1 bg-[#E8FF47] text-black font-semibold py-2 rounded-md hover:bg-[#d4ed3a] transition-colors flex items-center justify-center">
                <MessageSquare className="h-4 w-4 mr-2" /> Message
              </button>
            </div>
          </CardContent>
        </Card>

        {/* Right Column - Stats & Activity */}
        <div className="md:col-span-2 space-y-6">
          <div className="grid gap-4 grid-cols-2 lg:grid-cols-3">
            <Card>
              <CardContent className="p-4 flex flex-col justify-center space-y-2">
                <div className="flex items-center text-zinc-400 text-sm">
                  <Flame className="h-4 w-4 mr-2 text-orange-500" /> Streak
                </div>
                <div className="text-2xl font-bold text-white">{member.streak} days</div>
              </CardContent>
            </Card>
            <Card>
              <CardContent className="p-4 flex flex-col justify-center space-y-2">
                <div className="flex items-center text-zinc-400 text-sm">
                  <Activity className="h-4 w-4 mr-2 text-[#E8FF47]" /> Visits Month
                </div>
                <div className="text-2xl font-bold text-white">{member.visitsThisMonth}</div>
              </CardContent>
            </Card>
            <Card className="col-span-2 lg:col-span-1">
              <CardContent className="p-4 flex flex-col justify-center space-y-2">
                <div className="flex items-center text-zinc-400 text-sm">
                  <Calendar className="h-4 w-4 mr-2 text-blue-500" /> Last Visit
                </div>
                <div className="text-xl font-bold text-white">{member.lastVisit}</div>
              </CardContent>
            </Card>
          </div>

          <Card>
            <CardHeader>
              <CardTitle>Recent Activity</CardTitle>
            </CardHeader>
            <CardContent>
              <div className="relative border-l border-white/10 ml-3 space-y-6 pb-4">
                {[1, 2, 3].map((_, i) => (
                  <div key={i} className="pl-6 relative">
                    <div className="absolute w-3 h-3 bg-[#E8FF47] rounded-full -left-[1.5px] top-1.5 border-2 border-black"></div>
                    <p className="text-sm font-medium text-white">Checked in to facility</p>
                    <p className="text-xs text-zinc-500 mt-1">{i === 0 ? 'Today at 6:30 AM' : i === 1 ? 'Yesterday at 5:45 PM' : '3 days ago at 7:00 AM'}</p>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  )
}
