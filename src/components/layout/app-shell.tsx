"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { 
  LayoutDashboard, Users, Dumbbell, CreditCard, Bot, User, Settings, 
  Calendar, Clock, Building2, Cpu, Home, Trophy, LogOut, Menu, X, Sparkles
} from "lucide-react";

export type RoleType = "owner" | "trainer" | "superadmin" | "member";

interface NavItem {
  id: string;
  href: string;
  icon: any;
  label: string;
}

const NAV_CONFIG: Record<RoleType, NavItem[]> = {
  owner: [
    { id: "dashboard", href: "/owner/dashboard", icon: LayoutDashboard, label: "Bosh Sahifa" },
    { id: "members", href: "/owner/members", icon: Users, label: "A'zolar" },
    { id: "trainers", href: "/owner/trainers", icon: Dumbbell, label: "Trenerlar" },
    { id: "billing", href: "/owner/billing", icon: CreditCard, label: "To'lovlar" },
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
    { id: "aiusage", href: "/superadmin/aiusage", icon: Cpu, label: "AI Monotoring" },
    { id: "copilot", href: "/superadmin/copilot", icon: Bot, label: "AI Copilot" },
    { id: "profile", href: "/superadmin/profile", icon: User, label: "Profil" },
    { id: "settings", href: "/superadmin/settings", icon: Settings, label: "Sozlamalar" },
  ],
  member: [
    { id: "home", href: "/member", icon: Home, label: "Bosh" },
    { id: "plan", href: "/member/plan", icon: Calendar, label: "Reja" },
    { id: "top", href: "/member/top", icon: Trophy, label: "Reyting" },
    { id: "profile", href: "/member/profile", icon: User, label: "Profil" },
  ],
};

const ROLE_LABELS: Record<RoleType, string> = {
  owner: "Gym Owner",
  trainer: "Trener Workspace",
  superadmin: "SuperAdmin Control",
  member: "Member Mini App",
};

export function AppShell({
  role,
  children,
}: {
  role: RoleType;
  children: React.ReactNode;
}) {
  const pathname = usePathname();
  const router = useRouter();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const navItems = NAV_CONFIG[role] || NAV_CONFIG.owner;

  const handleSignOut = () => {
    router.push("/login");
  };

  return (
    <div className="vf-shell min-h-screen bg-[#080810] text-[#EEEEE8] flex flex-col lg:flex-row font-body relative selection:bg-[#E8FF47]/25 selection:text-black">
      
      {/* ---------- Mobile Topbar (< 1024px) ---------- */}
      <header className="lg:hidden h-14 bg-[#0d0d16]/95 backdrop-blur-md border-b border-[#1e1e2c] px-4 flex items-center justify-between sticky top-0 z-40">
        <Link href="/" className="flex items-center gap-2">
          <div className="w-6 h-6 rounded-md bg-[#E8FF47] text-[#080810] font-display font-black text-xs flex items-center justify-center">
            R
          </div>
          <span className="font-display font-bold text-sm text-white tracking-tight">Retenix</span>
          <span className="text-[10px] font-mono px-2 py-0.5 rounded-full bg-[#1a1a26] text-[#E8FF47] border border-[#2a2a3a]">
            {ROLE_LABELS[role]}
          </span>
        </Link>

        <div className="flex items-center gap-2">
          <button 
            onClick={handleSignOut}
            className="p-1.5 rounded-lg bg-[#13131c] border border-[#1e1e2c] text-gray-400 hover:text-white"
            title="Chiqish"
          >
            <LogOut className="w-4 h-4 text-[#E24B4A]" />
          </button>
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-1.5 rounded-lg bg-[#13131c] border border-[#1e1e2c] text-gray-400 hover:text-white"
          >
            {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
          </button>
        </div>
      </header>

      {/* ---------- Mobile Navigation Drawer (< 1024px) ---------- */}
      {mobileMenuOpen && (
        <div className="lg:hidden fixed inset-0 top-14 bg-[#080810]/95 backdrop-blur-xl z-30 p-6 space-y-3 overflow-y-auto">
          <div className="text-[10px] font-mono uppercase tracking-widest text-gray-400 mb-2">NAVIGATSIYA MENU</div>
          {navItems.map((item) => {
            const isActive = pathname === item.href;
            return (
              <Link
                key={item.id}
                href={item.href}
                onClick={() => setMobileMenuOpen(false)}
                className={`flex items-center gap-3 p-3.5 rounded-xl text-sm font-medium transition-all ${
                  isActive 
                    ? "bg-[#E8FF47] text-[#080810] font-semibold" 
                    : "bg-[#0d0d16] text-gray-300 border border-[#1e1e2c]"
                }`}
              >
                <item.icon className="w-5 h-5 flex-shrink-0" />
                <span>{item.label}</span>
              </Link>
            );
          })}
          <div className="pt-6 border-t border-[#1e1e2c]">
            <button
              onClick={handleSignOut}
              className="w-full flex items-center justify-center gap-2 p-3 rounded-xl bg-[#E24B4A]/10 border border-[#E24B4A]/30 text-[#E24B4A] font-medium text-sm"
            >
              <LogOut className="w-4 h-4" />
              <span>Chiqish (Sign Out)</span>
            </button>
          </div>
        </div>
      )}

      {/* ---------- Desktop Sidebar (≥ 1024px) ---------- */}
      <aside className="hidden lg:flex w-[232px] flex-shrink-0 bg-[#0d0d16] border-r border-[#1e1e2c] flex-col justify-between p-5 h-screen sticky top-0 z-30">
        <div className="space-y-6">
          <Link href="/" className="flex items-center gap-2.5 px-2">
            <div className="w-8 h-8 rounded-lg bg-[#E8FF47] text-[#080810] font-display font-black text-base flex items-center justify-center shadow-[0_0_15px_rgba(232,255,71,0.3)]">
              R
            </div>
            <div>
              <span className="font-display font-bold text-base text-white tracking-tight block leading-none">Retenix.ai</span>
              <span className="font-mono text-[9px] text-[#E8FF47] uppercase tracking-widest block mt-1">{ROLE_LABELS[role]}</span>
            </div>
          </Link>

          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.id}
                  href={item.href}
                  className={`flex items-center gap-3 px-3 py-2.5 rounded-xl text-xs font-medium transition-all ${
                    isActive
                      ? "bg-[#E8FF47] text-[#080810] font-semibold shadow-[0_0_15px_rgba(232,255,71,0.2)]"
                      : "text-gray-400 hover:text-white hover:bg-[#13131c]"
                  }`}
                >
                  <item.icon className={`w-4 h-4 flex-shrink-0 ${isActive ? "text-[#080810]" : "text-gray-400"}`} />
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>

        {/* User Card & Sign Out */}
        <div className="pt-4 border-t border-[#1e1e2c] space-y-3">
          <div className="flex items-center justify-between px-2">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-lg bg-[#1a1a26] border border-[#2a2a3a] text-[#E8FF47] flex items-center justify-center font-bold text-xs font-display">
                UZ
              </div>
              <div className="overflow-hidden">
                <span className="text-xs font-semibold text-white block truncate">FitZone Gym</span>
                <span className="text-[10px] font-mono text-gray-400 block truncate">{role.toUpperCase()}</span>
              </div>
            </div>
            <button 
              onClick={handleSignOut}
              className="p-1.5 rounded-lg bg-[#13131c] hover:bg-[#1a1a26] text-gray-400 hover:text-[#E24B4A] border border-[#1e1e2c] transition-colors"
              title="Chiqish"
            >
              <LogOut className="w-4 h-4" />
            </button>
          </div>
        </div>
      </aside>

      {/* ---------- Main Content Container ---------- */}
      <main className="flex-1 min-w-0 p-4 sm:p-6 lg:p-8 max-w-7xl mx-auto overflow-y-auto">
        {children}
      </main>

      {/* ---------- Mobile Bottom Navigation Bar (< 1024px) ---------- */}
      <nav className="lg:hidden fixed bottom-0 left-0 right-0 h-16 bg-[#0d0d16]/95 backdrop-blur-md border-t border-[#1e1e2c] px-2 flex items-center justify-around z-40">
        {navItems.slice(0, 5).map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.id}
              href={item.href}
              className={`flex flex-col items-center justify-center w-14 h-full transition-colors ${
                isActive ? "text-[#E8FF47]" : "text-gray-400 hover:text-gray-300"
              }`}
            >
              <item.icon className="w-5 h-5 mb-0.5" />
              <span className="text-[9px] font-medium truncate max-w-[54px]">{item.label}</span>
            </Link>
          );
        })}
      </nav>

    </div>
  );
}
