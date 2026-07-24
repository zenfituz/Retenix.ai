"use client";

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { Target, Calendar, Loader2, Dumbbell, Sparkles, ArrowRight } from 'lucide-react';

export default function OnboardingPage() {
  const router = useRouter();
  const [step, setStep] = useState(1);
  const [goal, setGoal] = useState('');
  const [days, setDays] = useState('');

  const [isGenerating, setIsGenerating] = useState(false);
  const [progress, setProgress] = useState(0);

  const goals = [
    { id: 'lose_fat', label: 'Lose Fat', desc: 'Burn calories & trim down' },
    { id: 'build_muscle', label: 'Build Muscle', desc: 'Increase muscle mass' },
    { id: 'get_stronger', label: 'Get Stronger', desc: 'Increase max lifts' },
    { id: 'general', label: 'General Fitness', desc: 'Stay healthy & active' },
  ];

  const dayOptions = ['2', '3', '4', '5+'];

  const handleNext = () => {
    if (step === 1 && goal) setStep(2);
    else if (step === 2 && days) {
      setStep(3);
      startGeneration();
    }
  };

  const startGeneration = () => {
    setIsGenerating(true);
    let currentProgress = 0;
    const interval = setInterval(() => {
      currentProgress += Math.floor(Math.random() * 15) + 5;
      if (currentProgress >= 100) {
        currentProgress = 100;
        clearInterval(interval);
        setTimeout(() => setIsGenerating(false), 500); // small delay before showing result
      }
      setProgress(currentProgress);
    }, 400);
  };

  if (step === 3) {
    if (isGenerating) {
      return (
        <div className="flex flex-col items-center justify-center min-h-screen p-4 text-center space-y-8 bg-[#080810] absolute inset-0 z-50">
          <div className="relative w-32 h-32">
            <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
              <circle cx="50" cy="50" r="45" fill="none" stroke="#1a1a26" strokeWidth="8" />
              <circle 
                cx="50" cy="50" r="45" fill="none" stroke="#E8FF47" strokeWidth="8" 
                strokeDasharray="283" strokeDashoffset={283 - (283 * progress) / 100} 
                className="transition-all duration-300 ease-out"
              />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
              <Loader2 className="w-10 h-10 text-[#E8FF47] animate-spin" />
            </div>
          </div>
          
          <div className="space-y-2">
            <h2 className="text-xl font-bold font-unbounded text-white">Retenix AI</h2>
            <p className="text-gray-400">Siz uchun boshlang'ich reja tayyorlamoqda...</p>
          </div>
          
          <p className="text-[#5DCAA5] font-bold text-lg">{progress}%</p>
        </div>
      );
    }

    return (
      <div className="flex flex-col min-h-screen p-4 bg-[#080810] absolute inset-0 z-50 overflow-y-auto pt-12 pb-24">
        <div className="text-center mb-10 animate-in slide-in-from-bottom-4 duration-700">
          <div className="w-20 h-20 bg-[#E8FF47]/20 rounded-full flex items-center justify-center mx-auto mb-6">
            <Sparkles className="w-10 h-10 text-[#E8FF47]" />
          </div>
          <h1 className="text-3xl font-bold font-unbounded text-white mb-3">Your Plan is Ready!</h1>
          <p className="text-gray-400">Personalized for {goals.find(g => g.id === goal)?.label} • {days} days/week</p>
        </div>

        <div className="space-y-4 mb-10 animate-in slide-in-from-bottom-8 duration-700 delay-300 fill-mode-both">
          <div className="bg-[#13131c] rounded-2xl border border-[#E8FF47]/30 p-5 shadow-[0_0_30px_rgba(232,255,71,0.1)]">
            <h3 className="font-bold text-white mb-4 border-b border-[#1e1e2c] pb-2">Weekly Schedule Overview</h3>
            <ul className="space-y-3">
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a26] flex items-center justify-center text-xs font-bold text-gray-400">1</div>
                <div className="flex-1">
                  <p className="font-medium text-white">Full Body Foundation</p>
                  <p className="text-xs text-gray-500">6 exercises • 45 min</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a26] flex items-center justify-center text-xs font-bold text-gray-400">2</div>
                <div className="flex-1">
                  <p className="font-medium text-white">Active Recovery</p>
                  <p className="text-xs text-gray-500">Light cardio & mobility</p>
                </div>
              </li>
              <li className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-full bg-[#1a1a26] flex items-center justify-center text-xs font-bold text-gray-400">3</div>
                <div className="flex-1">
                  <p className="font-medium text-white">Upper Body Focus</p>
                  <p className="text-xs text-gray-500">5 exercises • 40 min</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="fixed bottom-6 left-0 right-0 px-4 max-w-md mx-auto z-50 animate-in slide-in-from-bottom-12 duration-700 delay-500 fill-mode-both">
          <button 
            onClick={() => router.push('/member')}
            className="w-full py-4 bg-[#E8FF47] text-black font-bold rounded-2xl flex items-center justify-center gap-2 shadow-[0_0_25px_rgba(232,255,71,0.3)] hover:scale-105 active:scale-95 transition-all"
          >
            Start First Workout
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col min-h-screen p-4 bg-[#080810] absolute inset-0 z-50 pt-12">
      {/* Progress Bar */}
      <div className="w-full h-1 bg-[#1a1a26] rounded-full overflow-hidden mb-10">
        <div className="h-full bg-[#E8FF47] transition-all duration-300" style={{ width: \`\${(step / 2) * 100}%\` }}></div>
      </div>

      <div className="flex-1">
        {step === 1 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <div className="w-12 h-12 bg-[#1a1a26] rounded-2xl flex items-center justify-center mb-4 border border-[#2a2a3a]">
                <Target className="w-6 h-6 text-[#E8FF47]" />
              </div>
              <h1 className="text-2xl font-bold font-unbounded text-white mb-2">What's your main goal?</h1>
              <p className="text-gray-400">This helps our AI build the right plan for you.</p>
            </div>

            <div className="space-y-3">
              {goals.map((g) => (
                <button
                  key={g.id}
                  onClick={() => setGoal(g.id)}
                  className={`w-full text-left p-4 rounded-2xl border-2 transition-all ${goal === g.id ? 'border-[#E8FF47] bg-[#E8FF47]/5' : 'border-[#1e1e2c] bg-[#13131c] hover:border-gray-600'}`}
                >
                  <h3 className={`font-bold ${goal === g.id ? 'text-[#E8FF47]' : 'text-white'}`}>{g.label}</h3>
                  <p className="text-sm text-gray-500 mt-1">{g.desc}</p>
                </button>
              ))}
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6 animate-in slide-in-from-right duration-300">
            <div>
              <div className="w-12 h-12 bg-[#1a1a26] rounded-2xl flex items-center justify-center mb-4 border border-[#2a2a3a]">
                <Calendar className="w-6 h-6 text-[#5DCAA5]" />
              </div>
              <h1 className="text-2xl font-bold font-unbounded text-white mb-2">How many days?</h1>
              <p className="text-gray-400">How many days per week can you train?</p>
            </div>

            <div className="grid grid-cols-2 gap-4">
              {dayOptions.map((d) => (
                <button
                  key={d}
                  onClick={() => setDays(d)}
                  className={`aspect-square flex flex-col items-center justify-center rounded-2xl border-2 transition-all ${days === d ? 'border-[#5DCAA5] bg-[#5DCAA5]/5' : 'border-[#1e1e2c] bg-[#13131c] hover:border-gray-600'}`}
                >
                  <span className={`text-3xl font-bold mb-2 ${days === d ? 'text-[#5DCAA5]' : 'text-white'}`}>{d}</span>
                  <span className="text-sm text-gray-500">Days/Week</span>
                </button>
              ))}
            </div>
          </div>
        )}
      </div>

      <div className="pt-6 pb-6">
        <button
          onClick={handleNext}
          disabled={(step === 1 && !goal) || (step === 2 && !days)}
          className="w-full py-4 bg-[#E8FF47] text-black font-bold rounded-2xl disabled:opacity-50 disabled:bg-gray-700 disabled:text-gray-400 transition-all flex items-center justify-center"
        >
          {step === 2 ? 'Generate My Plan' : 'Continue'}
        </button>
      </div>
    </div>
  );
}
