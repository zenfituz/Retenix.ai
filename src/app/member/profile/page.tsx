"use client";

import { useState } from 'react';
import { useTelegram } from '@/lib/telegram/provider';
import { User, Bell, Shield, LogOut, CheckCircle2 } from 'lucide-react';

export default function ProfilePage() {
  const { user } = useTelegram();
  
  const [prefs, setPrefs] = useState({
    workoutReminders: true,
    streakRisk: true,
    challengeUpdates: false,
    aiInsights: true,
  });

  const togglePref = (key: keyof typeof prefs) => {
    setPrefs(prev => ({ ...prev, [key]: !prev[key] }));
  };

  return (
    <div className="p-4 space-y-6">
      <div className="text-center py-6">
        <div className="w-24 h-24 mx-auto bg-[#1a1a26] rounded-full border-2 border-[#E8FF47] flex items-center justify-center mb-4 overflow-hidden relative">
          {user?.photoUrl ? (
            <img src={user.photoUrl} alt="Avatar" className="w-full h-full object-cover" />
          ) : (
            <User className="w-10 h-10 text-gray-400" />
          )}
          <div className="absolute bottom-0 w-full h-1/3 bg-black/50 backdrop-blur-sm flex items-center justify-center">
            <span className="text-[10px] font-bold text-white uppercase tracking-wider">PRO</span>
          </div>
        </div>
        <h1 className="text-2xl font-bold font-unbounded text-white">{user?.firstName || 'O\'ktam'} {user?.lastName || ''}</h1>
        <p className="text-[#5DCAA5] font-medium mt-1">Retenix Elite Gym</p>
      </div>

      {/* Account Info */}
      <div className="bg-[#13131c] rounded-2xl border border-[#1e1e2c] p-4">
        <div className="flex items-center gap-2 mb-4">
          <Shield className="w-5 h-5 text-[#E8C547]" />
          <h2 className="font-bold text-white font-unbounded">Account Status</h2>
        </div>
        
        <div className="space-y-4">
          <div className="flex justify-between items-center py-2 border-b border-[#1e1e2c]">
            <span className="text-gray-400 text-sm">Membership Tier</span>
            <span className="font-bold text-[#E8FF47]">Premium Plan</span>
          </div>
          <div className="flex justify-between items-center py-2 border-b border-[#1e1e2c]">
            <span className="text-gray-400 text-sm">Valid Until</span>
            <span className="font-bold text-white">15 Sep 2026</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-gray-400 text-sm">Telegram Link</span>
            <div className="flex items-center gap-1">
              <CheckCircle2 className="w-4 h-4 text-[#5DCAA5]" />
              <span className="font-bold text-[#5DCAA5]">Connected</span>
            </div>
          </div>
        </div>
      </div>

      {/* Notifications */}
      <div className="bg-[#13131c] rounded-2xl border border-[#1e1e2c] p-4">
        <div className="flex items-center gap-2 mb-4">
          <Bell className="w-5 h-5 text-[#7BB6E8]" />
          <h2 className="font-bold text-white font-unbounded">Notifications</h2>
        </div>
        
        <div className="space-y-1">
          <div className="flex justify-between items-center py-3 border-b border-[#1e1e2c]">
            <div>
              <p className="font-medium text-white text-sm">Workout Reminders</p>
              <p className="text-xs text-gray-500">Get notified when it's time to train</p>
            </div>
            <Toggle isOn={prefs.workoutReminders} onToggle={() => togglePref('workoutReminders')} />
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-[#1e1e2c]">
            <div>
              <p className="font-medium text-white text-sm">Streak Risk Alerts</p>
              <p className="text-xs text-gray-500">Warn me before I lose my streak</p>
            </div>
            <Toggle isOn={prefs.streakRisk} onToggle={() => togglePref('streakRisk')} />
          </div>
          
          <div className="flex justify-between items-center py-3 border-b border-[#1e1e2c]">
            <div>
              <p className="font-medium text-white text-sm">Challenge Updates</p>
              <p className="text-xs text-gray-500">Progress and new gym challenges</p>
            </div>
            <Toggle isOn={prefs.challengeUpdates} onToggle={() => togglePref('challengeUpdates')} />
          </div>
          
          <div className="flex justify-between items-center py-3">
            <div>
              <p className="font-medium text-white text-sm">AI Insights</p>
              <p className="text-xs text-gray-500">Weekly reports and recommendations</p>
            </div>
            <Toggle isOn={prefs.aiInsights} onToggle={() => togglePref('aiInsights')} />
          </div>
        </div>
      </div>

      <button className="w-full py-4 bg-[#1a1a26] text-[#E24B4A] font-bold rounded-2xl border border-[#2a2a3a] flex items-center justify-center gap-2 hover:bg-[#2a2a3a] transition-colors mt-8">
        <LogOut className="w-5 h-5" />
        Sign Out
      </button>
    </div>
  );
}

function Toggle({ isOn, onToggle }: { isOn: boolean; onToggle: () => void }) {
  return (
    <button 
      onClick={onToggle}
      className={\`w-12 h-6 rounded-full p-1 transition-colors duration-300 ease-in-out \${isOn ? 'bg-[#5DCAA5]' : 'bg-[#2a2a3a]'}\`}
    >
      <div className={\`w-4 h-4 bg-white rounded-full shadow-md transform transition-transform duration-300 ease-in-out \${isOn ? 'translate-x-6' : 'translate-x-0'}\`} />
    </button>
  );
}
