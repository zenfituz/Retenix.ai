"use client";

import { useState, useEffect } from 'react';
import { QrCode, ShieldCheck, Flame, RefreshCw } from 'lucide-react';
import { useRouter } from 'next/navigation';

export default function CheckInPage() {
  const router = useRouter();
  const [isScanned, setIsScanned] = useState(false);
  const [timeRemaining, setTimeRemaining] = useState(30);

  useEffect(() => {
    // Timer for rotating QR code
    const timer = setInterval(() => {
      setTimeRemaining(prev => {
        if (prev <= 1) return 30; // Reset timer
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const simulateScan = () => {
    setIsScanned(true);
    // Simulate redirect after 3 seconds
    setTimeout(() => {
      router.push('/member');
    }, 3000);
  };

  if (isScanned) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[70vh] p-4 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[#5DCAA5]/20 rounded-full flex items-center justify-center mb-4 relative">
          <ShieldCheck className="w-12 h-12 text-[#5DCAA5]" />
          <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-[#E8C547]/20 rounded-full flex items-center justify-center border-2 border-[#080810]">
            <Flame className="w-5 h-5 text-[#E8C547]" />
          </div>
        </div>
        <div>
          <h1 className="text-3xl font-bold font-unbounded text-white mb-2">Access Granted</h1>
          <p className="text-gray-400">Welcome to Retenix Gym!</p>
        </div>
        
        <div className="bg-[#13131c] p-6 rounded-2xl border border-[#1e1e2c] w-full max-w-sm space-y-4">
          <div className="flex justify-between items-center">
            <span className="text-gray-400">XP Earned</span>
            <span className="font-bold text-[#5DCAA5]">+20 XP</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-gray-400">Current Streak</span>
            <div className="flex items-center gap-1">
              <span className="font-bold text-white">13 Days</span>
              <Flame className="w-4 h-4 text-[#E8C547]" />
            </div>
          </div>
        </div>
        
        <p className="text-sm text-gray-500 mt-8 animate-pulse">Redirecting to dashboard...</p>
      </div>
    );
  }

  return (
    <div className="p-4 flex flex-col items-center justify-center min-h-[70vh] space-y-8">
      <div className="text-center space-y-2">
        <h1 className="text-2xl font-bold font-unbounded text-white">Gym Access</h1>
        <p className="text-gray-400">Scan this code at the turnstile</p>
      </div>

      <div className="relative">
        <div className="bg-white p-6 rounded-3xl shadow-[0_0_40px_rgba(232,255,71,0.15)] relative overflow-hidden">
          {/* Simulated QR Code using borders and boxes for UI purposes */}
          <div className="w-64 h-64 grid grid-cols-4 grid-rows-4 gap-1 p-2">
            <div className="col-span-1 row-span-1 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
            <div className="col-span-2 bg-black opacity-80"></div>
            <div className="col-span-1 row-span-1 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
            
            <div className="bg-black opacity-60"></div>
            <div className="col-span-2 row-span-2 flex items-center justify-center">
              <QrCode className="w-16 h-16 text-black opacity-90" />
            </div>
            <div className="bg-black opacity-40"></div>
            
            <div className="bg-black opacity-70"></div>
            <div className="bg-black opacity-50"></div>
            
            <div className="col-span-1 row-span-1 border-4 border-black p-1"><div className="w-full h-full bg-black"></div></div>
            <div className="col-span-2 bg-black opacity-80"></div>
            <div className="col-span-1 bg-black opacity-90"></div>
          </div>
          
          {/* Scanning animation line */}
          <div className="absolute top-0 left-0 w-full h-1 bg-[#E8FF47] shadow-[0_0_10px_#E8FF47] animate-[scan_2s_ease-in-out_infinite]"></div>
        </div>
      </div>

      <div className="flex items-center gap-2 text-gray-400 bg-[#13131c] px-4 py-2 rounded-full border border-[#1e1e2c]">
        <RefreshCw className="w-4 h-4 animate-spin-slow" />
        <span className="text-sm">Code updates in <span className="font-bold text-white">{timeRemaining}s</span></span>
      </div>

      {/* Development only button to simulate scan */}
      <button 
        onClick={simulateScan}
        className="mt-8 px-6 py-3 bg-[#1a1a26] text-white rounded-xl border border-[#2a2a3a] text-sm hover:bg-[#2a2a3a] transition-colors"
      >
        Simulate Scan (Dev Only)
      </button>

      <style jsx global>{`
        @keyframes scan {
          0% { top: 0; }
          50% { top: 100%; }
          100% { top: 0; }
        }
        .animate-spin-slow {
          animation: spin 3s linear infinite;
        }
      `}</style>
    </div>
  );
}
