"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { 
  LayoutDashboard, Users, TrendingUp, Target, Bot, Settings, CreditCard, 
  Calendar, Clock, Building2, Cpu, Home, Dumbbell, Utensils, Trophy, User, 
  LogOut, Sparkles, Menu, X, MoreHorizontal 
} from "lucide-react";
import { signOut } from "@/app/login/actions";

export type RoleType = "owner" | "trainer" | "superadmin" | "member";

interface NavItem {
  id: string;
  href: string;
  icon: any;
  label: string;
}

const NAV_CONFIG: Record<RoleType, NavItem[]> = {
  owner: [
    { id: "dashboard", href: "/owner/dashboard", icon: LayoutDashboard, label: "Dashboard" },
    { id: "members", href: "/owner/members", icon: Users, label: "A'zolar" },
    { id: "trainers", href: "/owner/trainers", icon: Dumbbell, label: "Trenerlar" },
    { id: "billing", href: "/owner/billing", icon: CreditCard, label: "Billing & Plans" },
    { id: "copilot", href: "/owner/copilot", icon: Bot, label: "AI Copilot" },
    { id: "profile", href: "/owner/profile", icon: User, label: "Profil" },
    { id: "settings", href: "/owner/settings", icon: Settings, label: "Sozlamalar" },
  ],
  trainer: [
    { id: "dashboard", href: "/trainer/dashboard", icon: Calendar, label: "Bugun" },
    { id: "clients", href: "/trainer/clients", icon: Users, label: "Mijozlarim" },
    { id: "schedule", href: "/trainer/schedule", icon: Clock, label: "Jadval" },
    { id: "copilot", href: "/trainer/copilot", icon: Bot, label: "AI Copilot" },
    { id: "profile", href: "/trainer/profile", icon: User, label: "Profil" },
    { id: "settings", href: "/trainer/settings", icon: Settings, label: "Sozlamalar" },
  ],
  superadmin: [
    { id: "dashboard", href: "/superadmin/dashboard", icon: LayoutDashboard, label: "Platforma" },
    { id: "gyms", href: "/superadmin/gyms", icon: Building2, label: "Zallar" },
    { id: "billing", href: "/superadmin/billing", icon: CreditCard, label: "Billing" },
    { id: "aiusage", href: "/superadmin/aiusage", icon: Cpu, label: "AI Usage" },
    { id: "copilot", href: "/superadmin/copilot", icon: Bot, label: "AI Copilot" },
    { id: "profile", href: "/superadmin/profile", icon: User, label: "Profil" },
    { id: "settings", href: "/superadmin/settings", icon: Settings, label: "Sozlamalar" },
  ],
  member: [
    { id: "home", href: "/member", icon: Home, label: "Bosh" },
    { id: "plan", href: "/member/plan", icon: Dumbbell, label: "Plan" },
    { id: "food", href: "/member/food", icon: Utensils, label: "Ovqat" },
    { id: "top", href: "/member/top", icon: Trophy, label: "Top" },
    { id: "profile", href: "/member/profile", icon: User, label: "Profil" },
  ],
};

const PLAN_CARDS: Record<RoleType, { label: string; value: string }> = {
  owner: { label: "JORIY REJA", value: "Pro · $69/oy" },
  trainer: { label: "DARAJA", value: "👑 Daraja 4 · Pro" },
  superadmin: { label: "PLATFORMA", value: "412 gym · $18.4k MRR" },
  member: { label: "DARAJA", value: "👑 Daraja 5 · Usta" },
};

export function AppShell({
  role,
  children,
}: {
  role: RoleType;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const nav = NAV_CONFIG[role] || NAV_CONFIG.owner;
  const plan = PLAN_CARDS[role];
  const [moreOpen, setMoreOpen] = useState(false);

  const bottomItems = nav.length > 5 ? nav.slice(0, 4) : nav;
  const overflowItems = nav.length > 5 ? nav.slice(4) : [];

  return (
    <div className="flex min-h-screen bg-bg text-text-hi font-body">
      {/* ---------- Sidebar: Desktop (>= 1024px) ---------- */}
      <aside className="hidden lg:flex w-60 flex-col shrink-0 bg-[#0a0a12] border-r border-border sticky top-0 h-screen overflow-y-auto">
        <div className="p-5 flex flex-col flex-1">
          {/* Logo & Brand */}
          <Link href="/" className="flex items-center gap-2.5 mb-6 px-1">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-display font-black text-bg text-sm shrink-0 shadow-[0_0_16px_rgba(232,255,71,0.2)]">
              R
            </div>
            <span className="font-display font-bold text-base tracking-tight text-text-hi">
              Retenix AI
            </span>
          </Link>

          {/* Role Badge */}
          <div className="font-mono text-[10px] tracking-widest text-text-dim mb-4 px-1 uppercase">
            {role}
          </div>

          {/* Navigation Items */}
          <nav className="flex flex-col gap-1 flex-1">
            {nav.map((item) => {
              const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-sm font-medium transition-all ${
                    active
                      ? "bg-accent/10 text-accent font-semibold border border-accent/20"
                      : "text-text-mid hover:text-text-hi hover:bg-surface-2"
                  }`}
                >
                  <Icon className={`w-4 h-4 shrink-0 ${active ? "text-accent" : "text-text-dim"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>

          {/* User Section & Logout */}
          <div className="pt-4 border-t border-border mt-auto flex flex-col gap-3">
            <form action={signOut}>
              <button
                type="submit"
                className="w-full flex items-center gap-2.5 px-3 py-2 rounded-xl text-xs font-medium text-bad hover:bg-bad-dim/20 transition-colors cursor-pointer"
              >
                <LogOut className="w-4 h-4 shrink-0" />
                <span>Chiqish (Sign Out)</span>
              </button>
            </form>

            {/* Plan Card */}
            <div className="bg-surface-2 border border-border rounded-xl p-3">
              <div className="font-mono text-[9px] text-text-dim tracking-wider mb-1">
                {plan.label}
              </div>
              <div className="text-xs font-semibold text-accent font-mono">
                {plan.value}
              </div>
            </div>
          </div>
        </div>
      </aside>

      {/* ---------- Main Content Area ---------- */}
      <div className="flex-1 min-w-0 flex flex-col min-h-screen">
        {/* Mobile Topbar (< 1024px) */}
        <header className="lg:hidden flex items-center justify-between px-4 py-3 bg-surface border-b border-border sticky top-0 z-40">
          <Link href="/" className="flex items-center gap-2">
            <div className="w-7 h-7 rounded-lg bg-accent flex items-center justify-center font-display font-black text-bg text-xs">
              R
            </div>
            <span className="font-display font-bold text-sm text-text-hi">Retenix</span>
          </Link>
          <span className="font-mono text-[10px] uppercase px-2 py-0.5 rounded bg-surface-2 border border-border text-text-mid">
            {role}
          </span>
        </header>

        {/* Content */}
        <main className="flex-1 pb-24 lg:pb-8">
          <div className="max-w-7xl mx-auto">{children}</div>
        </main>
      </div>

      {/* ---------- Mobile Bottom Navigation (< 1024px) ---------- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 bg-surface/95 backdrop-blur-md border-t border-border z-40 flex items-center justify-around py-2 px-1">
        {bottomItems.map((item) => {
          const active = pathname === item.href || (item.href !== "/" && pathname.startsWith(item.href + "/"));
          const Icon = item.icon;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium transition-colors ${
                active ? "text-accent" : "text-text-dim hover:text-text-mid"
              }`}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </Link>
          );
        })}
        {overflowItems.length > 0 && (
          <button
            onClick={() => setMoreOpen(!moreOpen)}
            className="flex flex-col items-center gap-1 py-1 px-3 text-[10px] font-medium text-text-dim hover:text-text-mid cursor-pointer"
          >
            <MoreHorizontal className="w-5 h-5" />
            <span>Ko'proq</span>
          </button>
        )}
      </nav>

      {/* Overflow Sheet for Mobile */}
      {overflowItems.length > 0 && moreOpen && (
        <div className="lg:hidden fixed inset-0 z-50 flex flex-col justify-end">
          <div className="absolute inset-0 bg-bg/80 backdrop-blur-sm" onClick={() => setMoreOpen(false)} />
          <div className="relative bg-surface border-t border-border rounded-t-2xl p-6 space-y-3 max-h-[70vh] overflow-y-auto">
            <div className="w-10 h-1 bg-border-2 rounded-full mx-auto mb-4" />
            {overflowItems.map((item) => {
              const Icon = item.icon;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  onClick={() => setMoreOpen(false)}
                  className="flex items-center gap-3 p-3 rounded-xl bg-surface-2 text-sm text-text-hi"
                >
                  <Icon className="w-5 h-5 text-accent" />
                  <span>{item.label}</span>
                </Link>
              );
            })}
            <form action={signOut}>
              <button
                type="submit"
                onClick={() => setMoreOpen(false)}
                className="w-full flex items-center gap-3 p-3 rounded-xl bg-bad-dim/20 text-sm text-bad border border-bad/30 cursor-pointer"
              >
                <LogOut className="w-5 h-5" />
                <span>Chiqish (Sign Out)</span>
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
