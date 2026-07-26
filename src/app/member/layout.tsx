"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { Home, Calendar, PlusCircle, Trophy, User, QrCode, Utensils, Dumbbell } from "lucide-react";

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const router = useRouter();
  const [actionModalOpen, setActionModalOpen] = useState(false);

  const handleAction = (path: string) => {
    setActionModalOpen(false);
    router.push(path);
  };

  return (
    <div className="min-h-screen bg-[#080810] text-white flex flex-col relative font-body pb-[env(safe-area-inset-bottom,20px)]">
      
      <main className="flex-1 pb-24 overflow-y-auto w-full max-w-md mx-auto p-4">
        {children}
      </main>

      {/* Quick Action Modal */}
      {actionModalOpen && (
        <div 
          className="fixed inset-0 z-50 flex items-end justify-center bg-black/70 backdrop-blur-sm"
          onClick={() => setActionModalOpen(false)}
        >
          <div 
            className="bg-[#13131c] w-full max-w-md mx-auto rounded-t-3xl border-t border-[#1e1e2c] p-6 pb-10 space-y-6 shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            <h3 className="text-xl font-bold text-center font-display text-white">Tezkor Amallar</h3>
            <div className="grid grid-cols-3 gap-4">
              <button 
                onClick={() => handleAction('/member/checkin')}
                className="flex flex-col items-center justify-center p-4 bg-[#1a1a26] rounded-2xl border border-[#2a2a3a] hover:border-[#5DCAA5] transition-all group"
              >
                <div className="w-12 h-12 bg-[#5DCAA5]/10 rounded-full flex items-center justify-center mb-2 text-[#5DCAA5]">
                  <QrCode className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-gray-200">Check-in</span>
              </button>

              <button 
                onClick={() => handleAction('/member/food')}
                className="flex flex-col items-center justify-center p-4 bg-[#1a1a26] rounded-2xl border border-[#2a2a3a] hover:border-[#E8C547] transition-all group"
              >
                <div className="w-12 h-12 bg-[#E8C547]/10 rounded-full flex items-center justify-center mb-2 text-[#E8C547]">
                  <Utensils className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-gray-200">Taom (AI)</span>
              </button>

              <button 
                onClick={() => handleAction('/member/plan')}
                className="flex flex-col items-center justify-center p-4 bg-[#1a1a26] rounded-2xl border border-[#2a2a3a] hover:border-[#E8FF47] transition-all group"
              >
                <div className="w-12 h-12 bg-[#E8FF47]/10 rounded-full flex items-center justify-center mb-2 text-[#E8FF47]">
                  <Dumbbell className="w-6 h-6" />
                </div>
                <span className="text-xs font-medium text-gray-200">Workout</span>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Sticky TMA Bottom Navigation Bar */}
      <div className="fixed bottom-0 left-0 right-0 bg-[#0d0d16]/95 backdrop-blur-xl border-t border-[#1e1e2c] z-40">
        <div className="flex justify-around items-center h-[68px] px-2 max-w-md mx-auto relative">
          
          <Link
            href="/member"
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
              pathname === "/member" ? "text-[#E8FF47]" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <Home className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Bosh</span>
          </Link>

          <Link
            href="/member/plan"
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
              pathname === "/member/plan" ? "text-[#E8FF47]" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <Calendar className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Reja</span>
          </Link>

          {/* Center Action Button */}
          <div className="relative -top-5 flex justify-center w-14">
            <button
              onClick={() => setActionModalOpen(!actionModalOpen)}
              className="w-13 h-13 bg-[#E8FF47] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(232,255,71,0.3)] text-[#080810] border-4 border-[#080810] transition-transform active:scale-95"
            >
              <PlusCircle className={`w-7 h-7 transition-transform duration-300 ${actionModalOpen ? "rotate-45" : ""}`} />
            </button>
          </div>

          <Link
            href="/member/top"
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
              pathname === "/member/top" ? "text-[#E8FF47]" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <Trophy className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Reyting</span>
          </Link>

          <Link
            href="/member/profile"
            className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${
              pathname === "/member/profile" ? "text-[#E8FF47]" : "text-gray-400 hover:text-gray-300"
            }`}
          >
            <User className="w-5 h-5 mb-1" />
            <span className="text-[10px] font-medium">Profil</span>
          </Link>

        </div>
      </div>

    </div>
  );
}
