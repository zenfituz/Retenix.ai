"use client"
import { useState, useEffect } from "react"
import { Filter, Search, MoreHorizontal, UserPlus, Users } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Pill } from "@/components/ui/pill"
import { getCurrentUserSession } from "@/utils/demo-check"
import Link from "next/link"

const DEMO_MEMBERS = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", status: "Active", streak: 12, lastVisit: "2 hours ago", trainer: "Jasur" },
  { id: "2", name: "Maria Garcia", email: "maria@example.com", status: "Risk", streak: 0, lastVisit: "2 weeks ago", trainer: "Biriktirilmagan" },
  { id: "3", name: "James Smith", email: "james@example.com", status: "New", streak: 3, lastVisit: "1 day ago", trainer: "Malika" },
  { id: "4", name: "Linda Williams", email: "linda@example.com", status: "Active", streak: 45, lastVisit: "Today", trainer: "Rustam" },
  { id: "5", name: "Robert Brown", email: "robert@example.com", status: "Risk", streak: 1, lastVisit: "10 days ago", trainer: "Biriktirilmagan" },
]

export default function MembersList() {
  const [isDemo, setIsDemo] = useState(true)
  const [filter, setFilter] = useState("All")
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    async function checkUser() {
      const session = await getCurrentUserSession()
      setIsDemo(session.isDemo)
      setLoading(false)
    }
    checkUser()
  }, [])

  const membersList = isDemo ? DEMO_MEMBERS : []
  const filteredMembers = membersList.filter(m => filter === "All" || m.status === filter)

  if (loading) {
    return (
      <div className="flex-1 p-8 text-center text-zinc-500 font-mono text-xs">
        Yuklanmoqda...
      </div>
    )
  }

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <div>
          <h2 className="text-3xl font-bold tracking-tight text-white">Members</h2>
          <p className="text-xs text-zinc-400 mt-1">
            {isDemo ? "Demo Zal A'zolari Ro'yxati" : "Sizning Zalingiz A'zolari"}
          </p>
        </div>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
            <input 
              placeholder="A'zoni qidirish..." 
              className="w-full bg-black/40 border border-white/10 rounded-md pl-8 pr-4 py-2 text-sm text-white focus:outline-none focus:ring-1 focus:ring-[#E8FF47]"
            />
          </div>
        </div>
      </div>

      <div className="flex space-x-2 overflow-x-auto pb-2">
        {["All", "Active", "Risk", "New"].map(f => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap cursor-pointer ${
              filter === f 
                ? "bg-[#E8FF47] text-black font-bold" 
                : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {!isDemo && filteredMembers.length === 0 ? (
        <Card className="bg-black/40 border-white/10 p-8 text-center space-y-4">
          <div className="w-12 h-12 rounded-full bg-zinc-800/80 border border-white/10 flex items-center justify-center text-zinc-400 mx-auto">
            <Users className="w-6 h-6" />
          </div>
          <div className="space-y-1">
            <h3 className="text-lg font-bold text-white">Hali a'zolar mavjud emas</h3>
            <p className="text-xs text-zinc-400 max-w-sm mx-auto">
              Zalingizga yangi mijozlarni qo'shing. Ularga Telegram Mini App va turniket QR kodi taqdim etiladi.
            </p>
          </div>
          <button className="px-5 py-2.5 bg-[#E8FF47] text-black font-bold text-xs rounded-xl hover:opacity-90 inline-flex items-center gap-2">
            <UserPlus className="w-4 h-4" /> Yangi A'zo Qo'shish
          </button>
        </Card>
      ) : (
        /* Desktop Table View */
        <div className="hidden md:block rounded-md border border-white/10 bg-black/40 backdrop-blur-md overflow-hidden">
          <table className="w-full text-sm text-left">
            <thead className="text-xs text-zinc-400 uppercase bg-black/60 border-b border-white/10">
              <tr>
                <th className="px-6 py-4 font-medium">Member</th>
                <th className="px-6 py-4 font-medium">Status</th>
                <th className="px-6 py-4 font-medium">Trener</th>
                <th className="px-6 py-4 font-medium">Streak</th>
                <th className="px-6 py-4 font-medium">Last Visit</th>
                <th className="px-6 py-4 font-medium text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {filteredMembers.map(member => (
                <tr key={member.id} className="border-b border-white/5 hover:bg-white/5 transition-colors">
                  <td className="px-6 py-4">
                    <div className="flex items-center">
                      <Avatar fallback={member.name.substring(0, 2).toUpperCase()} size="sm" />
                      <div className="ml-3">
                        <div className="text-white font-medium hover:underline">
                          <Link href={`/owner/members/${member.id}`}>{member.name}</Link>
                        </div>
                        <div className="text-zinc-500 text-xs">{member.email}</div>
                      </div>
                    </div>
                  </td>
                  <td className="px-6 py-4">
                    <Pill variant={member.status === 'Active' ? 'success' : member.status === 'Risk' ? 'danger' : 'default'}>
                      {member.status}
                    </Pill>
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    {member.trainer}
                  </td>
                  <td className="px-6 py-4 text-white">
                    {member.streak} kun
                  </td>
                  <td className="px-6 py-4 text-zinc-400">
                    {member.lastVisit}
                  </td>
                  <td className="px-6 py-4 text-right">
                    <button className="text-zinc-400 hover:text-white p-2">
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )
}
