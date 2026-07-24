"use client";

import { TelegramProvider } from '@/lib/telegram/provider';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { Home, Calendar, PlusCircle, Trophy, User, Utensils, QrCode, Dumbbell } from 'lucide-react';
import { useState } from 'react';

export default function MemberLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const [isActionModalOpen, setActionModalOpen] = useState(false);
  const router = useRouter();

  const navItems = [
    { href: '/member', icon: Home, label: 'Home' },
    { href: '/member/plan', icon: Calendar, label: 'Plan' },
  ];

  const navItemsRight = [
    { href: '/member/top', icon: Trophy, label: 'Top' },
    { href: '/member/profile', icon: User, label: 'Profile' },
  ];

  const handleAction = (path: string) => {
    setActionModalOpen(false);
    router.push(path);
  };

  return (
    <TelegramProvider>
      <div className="min-h-screen bg-[#080810] text-white pb-[env(safe-area-inset-bottom,20px)] flex flex-col relative font-sans">
        <main className="flex-1 pb-24 overflow-y-auto w-full max-w-md mx-auto">
          {children}
        </main>

        {/* Action Modal */}
        {isActionModalOpen && (
          <div className="fixed inset-0 z-50 flex items-end justify-center bg-black/60 backdrop-blur-sm" onClick={() => setActionModalOpen(false)}>
            <div 
              className="bg-[#13131c] w-full max-w-md mx-auto rounded-t-3xl border-t border-[#1e1e2c] p-6 pb-[calc(24px+env(safe-area-inset-bottom,20px))] shadow-2xl transition-transform duration-300 transform translate-y-0"
              onClick={e => e.stopPropagation()}
            >
              <h3 className="text-xl font-bold mb-6 text-center font-unbounded text-white">Quick Actions</h3>
              <div className="grid grid-cols-3 gap-4">
                <button onClick={() => handleAction('/member/checkin')} className="flex flex-col items-center justify-center p-4 bg-[#1a1a26] rounded-2xl border border-[#2a2a3a] hover:bg-[#2a2a3a] transition-colors group">
                  <div className="w-14 h-14 bg-[#5DCAA5]/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#5DCAA5]/20 transition-colors border border-[#5DCAA5]/20">
                    <QrCode className="w-7 h-7 text-[#5DCAA5]" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">Check-in</span>
                </button>
                <button onClick={() => handleAction('/member/food')} className="flex flex-col items-center justify-center p-4 bg-[#1a1a26] rounded-2xl border border-[#2a2a3a] hover:bg-[#2a2a3a] transition-colors group">
                  <div className="w-14 h-14 bg-[#E8C547]/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#E8C547]/20 transition-colors border border-[#E8C547]/20">
                    <Utensils className="w-7 h-7 text-[#E8C547]" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">Log Food</span>
                </button>
                <button onClick={() => handleAction('/member/plan')} className="flex flex-col items-center justify-center p-4 bg-[#1a1a26] rounded-2xl border border-[#2a2a3a] hover:bg-[#2a2a3a] transition-colors group">
                  <div className="w-14 h-14 bg-[#E8FF47]/10 rounded-full flex items-center justify-center mb-3 group-hover:bg-[#E8FF47]/20 transition-colors border border-[#E8FF47]/20">
                    <Dumbbell className="w-7 h-7 text-[#E8FF47]" />
                  </div>
                  <span className="text-sm font-medium text-gray-300">Workout</span>
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Bottom Navigation */}
        <div className="fixed bottom-0 left-0 right-0 bg-[#0d0d16]/90 backdrop-blur-md border-t border-[#1e1e2c] pb-[env(safe-area-inset-bottom,0px)] z-40">
          <div className="flex justify-around items-center h-[68px] px-2 max-w-md mx-auto">
            {navItems.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${isActive ? 'text-[#E8FF47]' : 'text-gray-400 hover:text-gray-300'}`}
                >
                  <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-[#E8FF47]/20' : ''}`} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            })}
            
            {/* Center Action Button */}
            <div className="relative -top-6 flex justify-center w-16">
              <button 
                onClick={() => setActionModalOpen(!isActionModalOpen)}
                className="w-14 h-14 bg-[#E8FF47] rounded-full flex items-center justify-center shadow-[0_0_20px_rgba(232,255,71,0.25)] hover:shadow-[0_0_25px_rgba(232,255,71,0.4)] transition-all text-black border-4 border-[#080810]"
              >
                <PlusCircle className={`w-8 h-8 transition-transform duration-300 ${isActionModalOpen ? 'rotate-45' : ''}`} />
              </button>
            </div>

            {navItemsRight.map((item) => {
              const isActive = pathname === item.href;
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`flex flex-col items-center justify-center w-16 h-full transition-colors ${isActive ? 'text-[#E8FF47]' : 'text-gray-400 hover:text-gray-300'}`}
                >
                  <item.icon className={`w-6 h-6 mb-1 ${isActive ? 'fill-[#E8FF47]/20' : ''}`} />
                  <span className="text-[10px] font-medium">{item.label}</span>
                </Link>
              );
            })}
          </div>
        </div>
      </div>
    </TelegramProvider>
  );
}
