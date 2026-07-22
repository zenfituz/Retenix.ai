"use client"
import { useState } from "react"
import { Filter, Search, MoreHorizontal } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { Avatar } from "@/components/ui/avatar"
import { Pill } from "@/components/ui/pill"
import Link from "next/link"

const members = [
  { id: "1", name: "Alex Johnson", email: "alex@example.com", status: "Active", streak: 12, lastVisit: "2 hours ago", trainer: "Jasur" },
  { id: "2", name: "Maria Garcia", email: "maria@example.com", status: "Risk", streak: 0, lastVisit: "2 weeks ago", trainer: "Biriktirilmagan" },
  { id: "3", name: "James Smith", email: "james@example.com", status: "New", streak: 3, lastVisit: "1 day ago", trainer: "Malika" },
  { id: "4", name: "Linda Williams", email: "linda@example.com", status: "Active", streak: 45, lastVisit: "Today", trainer: "Rustam" },
  { id: "5", name: "Robert Brown", email: "robert@example.com", status: "Risk", streak: 1, lastVisit: "10 days ago", trainer: "Biriktirilmagan" },
]

export default function MembersList() {
  const [filter, setFilter] = useState("All")

  const filteredMembers = members.filter(m => filter === "All" || m.status === filter)

  return (
    <div className="flex-1 space-y-4 p-4 md:p-8 pt-6">
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between space-y-2 sm:space-y-0">
        <h2 className="text-3xl font-bold tracking-tight text-white">Members</h2>
        <div className="flex items-center space-x-2 w-full sm:w-auto">
          <div className="relative w-full sm:w-64">
            <Search className="absolute left-2 top-2.5 h-4 w-4 text-zinc-500" />
            <input 
              placeholder="Search members..." 
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
            className={`px-4 py-1.5 rounded-full text-sm font-medium transition-colors whitespace-nowrap ${
              filter === f 
                ? "bg-[#E8FF47] text-black" 
                : "bg-zinc-800/50 text-zinc-300 hover:bg-zinc-800"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* Desktop Table View */}
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
                      <div className="text-zinc-500">{member.email}</div>
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
                  {member.streak} days
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

      {/* Mobile Card View */}
      <div className="grid grid-cols-1 gap-4 md:hidden">
        {filteredMembers.map(member => (
          <Card key={member.id}>
            <CardContent className="p-4 flex flex-col space-y-3">
              <div className="flex items-center justify-between">
                <div className="flex items-center space-x-3">
                  <Avatar fallback={member.name.substring(0, 2).toUpperCase()} />
                  <div>
                    <Link href={`/owner/members/${member.id}`} className="text-white font-medium text-sm hover:underline">
                      {member.name}
                    </Link>
                    <p className="text-zinc-500 text-xs">{member.email}</p>
                  </div>
                </div>
                <MoreHorizontal className="h-4 w-4 text-zinc-500" />
              </div>
              <div className="flex items-center justify-between text-xs pt-2 border-t border-white/5">
                <Pill variant={member.status === 'Active' ? 'success' : member.status === 'Risk' ? 'danger' : 'default'}>
                  {member.status}
                </Pill>
                <div className="text-zinc-400 flex space-x-3">
                  <span>🔥 {member.streak}</span>
                  <span>{member.lastVisit}</span>
                </div>
              </div>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  )
}
