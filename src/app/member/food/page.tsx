"use client";

import { useState } from 'react';
import { Search, Loader2, Info, Utensils, CheckCircle2 } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface FoodEstimate {
  name: string;
  portion: string;
  calories: number;
  protein: number;
  carbs: number;
  fat: number;
}

export default function FoodLoggerPage() {
  const router = useRouter();
  const [query, setQuery] = useState('');
  const [isEstimating, setIsEstimating] = useState(false);
  const [estimate, setEstimate] = useState<FoodEstimate | null>(null);
  const [isSaving, setIsSaving] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSearch = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!query.trim()) return;

    setIsEstimating(true);
    setEstimate(null);
    
    try {
      // Simulate POST /api/member/food/estimate
      await new Promise(resolve => setTimeout(resolve, 1500));
      
      // Mock response based on typical Uzbek foods
      const mockEstimate: FoodEstimate = {
        name: query.charAt(0).toUpperCase() + query.slice(1),
        portion: "1 standard serving (approx. 300g)",
        calories: 550,
        protein: 18,
        carbs: 65,
        fat: 22
      };
      
      setEstimate(mockEstimate);
    } catch (error) {
      console.error(error);
    } finally {
      setIsEstimating(false);
    }
  };

  const handleSave = async () => {
    setIsSaving(true);
    try {
      // Simulate POST /api/member/food/log
      await new Promise(resolve => setTimeout(resolve, 1000));
      setIsSuccess(true);
      setTimeout(() => {
        router.push('/member');
      }, 2000);
    } catch (error) {
      console.error(error);
      setIsSaving(false);
    }
  };

  return (
    <div className="p-4 space-y-6">
      <div className="space-y-2">
        <h1 className="text-2xl font-bold font-unbounded text-white">Log Food</h1>
        <p className="text-gray-400 text-sm">Tell AI what you ate (e.g., "osh", "somsa", "manti")</p>
      </div>

      <form onSubmit={handleSearch} className="relative">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="I had 2 somsa for lunch..."
          className="w-full bg-[#13131c] border border-[#2a2a3a] rounded-2xl py-4 pl-4 pr-12 text-white placeholder-gray-500 focus:outline-none focus:border-[#E8FF47] transition-colors"
        />
        <button 
          type="submit"
          disabled={!query.trim() || isEstimating}
          className="absolute right-2 top-2 bottom-2 w-10 bg-[#E8FF47] rounded-xl flex items-center justify-center text-black disabled:opacity-50 disabled:bg-gray-700 disabled:text-gray-400 transition-colors"
        >
          {isEstimating ? <Loader2 className="w-5 h-5 animate-spin" /> : <Search className="w-5 h-5" />}
        </button>
      </form>

      {/* AI Processing State */}
      {isEstimating && (
        <div className="bg-[#13131c] rounded-2xl border border-[#1e1e2c] p-8 flex flex-col items-center justify-center text-center space-y-4 animate-pulse">
          <div className="w-16 h-16 bg-[#1a1a26] rounded-full flex items-center justify-center">
            <Utensils className="w-8 h-8 text-[#E8FF47] animate-bounce" />
          </div>
          <div>
            <p className="text-white font-medium">AI is analyzing...</p>
            <p className="text-gray-500 text-sm">Estimating nutritional value</p>
          </div>
        </div>
      )}

      {/* Result Modal / Card */}
      {estimate && !isSuccess && (
        <div className="bg-[#13131c] rounded-2xl border border-[#E8FF47]/30 p-5 shadow-[0_0_30px_rgba(232,255,71,0.05)] animate-in slide-in-from-bottom-4 duration-300">
          <div className="flex justify-between items-start mb-6">
            <div>
              <h2 className="text-xl font-bold text-white mb-1">{estimate.name}</h2>
              <p className="text-sm text-gray-400">{estimate.portion}</p>
            </div>
            <div className="bg-[#1a1a26] px-3 py-1.5 rounded-lg border border-[#2a2a3a]">
              <span className="font-bold text-[#E8FF47]">{estimate.calories}</span>
              <span className="text-xs text-gray-400 ml-1">kcal</span>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 mb-6">
            <div className="bg-[#1a1a26] p-3 rounded-xl border border-[#2a2a3a] text-center">
              <div className="text-lg font-bold text-[#5DCAA5] mb-1">{estimate.protein}g</div>
              <div className="text-xs text-gray-400">Protein</div>
            </div>
            <div className="bg-[#1a1a26] p-3 rounded-xl border border-[#2a2a3a] text-center">
              <div className="text-lg font-bold text-[#7BB6E8] mb-1">{estimate.carbs}g</div>
              <div className="text-xs text-gray-400">Carbs</div>
            </div>
            <div className="bg-[#1a1a26] p-3 rounded-xl border border-[#2a2a3a] text-center">
              <div className="text-lg font-bold text-[#E24B4A] mb-1">{estimate.fat}g</div>
              <div className="text-xs text-gray-400">Fat</div>
            </div>
          </div>

          <div className="flex items-start gap-2 mb-6 p-3 bg-[#1a1a26] rounded-xl text-sm text-gray-300">
            <Info className="w-5 h-5 text-[#E8C547] shrink-0 mt-0.5" />
            <p>This is an AI estimate based on standard Uzbek recipes. Macros may vary.</p>
          </div>

          <button
            onClick={handleSave}
            disabled={isSaving}
            className="w-full py-3.5 bg-[#E8FF47] text-black font-bold rounded-xl flex items-center justify-center gap-2 hover:bg-[#d4ed33] transition-colors"
          >
            {isSaving ? (
              <><Loader2 className="w-5 h-5 animate-spin" /> Saving...</>
            ) : (
              'Save & Log Food'
            )}
          </button>
        </div>
      )}

      {/* Success State */}
      {isSuccess && (
        <div className="bg-[#13131c] rounded-2xl border border-[#5DCAA5]/50 p-8 flex flex-col items-center justify-center text-center space-y-4 animate-in zoom-in duration-300">
          <div className="w-16 h-16 bg-[#5DCAA5]/20 rounded-full flex items-center justify-center">
            <CheckCircle2 className="w-8 h-8 text-[#5DCAA5]" />
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-1">Food Logged!</h2>
            <p className="text-[#5DCAA5] font-bold">+5 XP Earned</p>
          </div>
        </div>
      )}
    </div>
  );
}
