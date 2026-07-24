"use client";

import { useState } from 'react';
import { CheckCircle2, Circle, ChevronLeft, ChevronRight, Trophy } from 'lucide-react';
import { useRouter } from 'next/navigation';

interface Exercise {
  id: string;
  name: string;
  sets: number;
  reps: string;
  weight?: string;
  completedSets: number;
}

export default function WorkoutPlanPage() {
  const router = useRouter();
  const [selectedDay, setSelectedDay] = useState(2); // Wednesday (0-6)
  const [isCompleting, setIsCompleting] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);
  
  const days = ['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'];
  
  const [exercises, setExercises] = useState<Exercise[]>([
    { id: '1', name: 'Barbell Bench Press', sets: 4, reps: '8-10', weight: '60kg', completedSets: 0 },
    { id: '2', name: 'Incline Dumbbell Press', sets: 3, reps: '10-12', weight: '22kg', completedSets: 0 },
    { id: '3', name: 'Cable Crossovers', sets: 3, reps: '15', weight: '15kg', completedSets: 0 },
    { id: '4', name: 'Tricep Pushdowns', sets: 4, reps: '12-15', weight: '25kg', completedSets: 0 },
  ]);

  const toggleSet = (exerciseId: string, setIndex: number) => {
    setExercises(prev => prev.map(ex => {
      if (ex.id === exerciseId) {
        // Simple toggle logic: if clicking the next available set, mark it completed. 
        // If clicking the last completed set, unmark it.
        let newCompleted = ex.completedSets;
        if (setIndex === ex.completedSets) {
          newCompleted = ex.completedSets + 1;
        } else if (setIndex === ex.completedSets - 1) {
          newCompleted = ex.completedSets - 1;
        }
        return { ...ex, completedSets: newCompleted };
      }
      return ex;
    }));
  };

  const finishWorkout = async () => {
    setIsCompleting(true);
    try {
      // Simulate API call
      // await fetch('/api/member/workouts/complete', { method: 'POST' });
      await new Promise(resolve => setTimeout(resolve, 1000));
      setShowConfetti(true);
      setTimeout(() => {
        router.push('/member');
      }, 3000);
    } catch (e) {
      console.error(e);
    } finally {
      setIsCompleting(false);
    }
  };

  const allCompleted = exercises.every(ex => ex.completedSets === ex.sets);
  const someCompleted = exercises.some(ex => ex.completedSets > 0);

  if (showConfetti) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-4 text-center space-y-6 animate-in fade-in zoom-in duration-500">
        <div className="w-24 h-24 bg-[#E8FF47]/20 rounded-full flex items-center justify-center mb-4">
          <Trophy className="w-12 h-12 text-[#E8FF47]" />
        </div>
        <h1 className="text-3xl font-bold font-unbounded text-white">Workout Complete!</h1>
        <p className="text-[#5DCAA5] text-xl font-bold">+30 XP Earned</p>
        <p className="text-gray-400">Your progress has been saved. Redirecting to home...</p>
      </div>
    );
  }

  return (
    <div className="p-4 space-y-6">
      {/* Weekly Schedule */}
      <div className="bg-[#13131c] rounded-2xl border border-[#1e1e2c] p-4">
        <div className="flex justify-between items-center mb-4">
          <button className="p-1 text-gray-400 hover:text-white"><ChevronLeft className="w-5 h-5" /></button>
          <span className="font-bold text-white">This Week</span>
          <button className="p-1 text-gray-400 hover:text-white"><ChevronRight className="w-5 h-5" /></button>
        </div>
        <div className="flex justify-between">
          {days.map((day, idx) => (
            <button
              key={day}
              onClick={() => setSelectedDay(idx)}
              className={`flex flex-col items-center gap-2 p-2 rounded-xl transition-colors ${selectedDay === idx ? 'bg-[#E8FF47] text-black' : 'text-gray-400 hover:bg-[#1a1a26]'}`}
            >
              <span className="text-xs font-medium">{day}</span>
              <span className={`w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold ${idx < 2 ? 'bg-[#5DCAA5] text-[#080810]' : selectedDay === idx ? 'bg-black text-[#E8FF47]' : 'bg-[#1a1a26] text-gray-300'}`}>
                {idx + 14}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* Workout Details */}
      <div className="space-y-4">
        <div className="flex justify-between items-end">
          <div>
            <h2 className="text-2xl font-bold text-white font-unbounded">Chest & Triceps</h2>
            <p className="text-gray-400 text-sm">4 exercises • 45 min</p>
          </div>
        </div>

        <div className="space-y-3">
          {exercises.map((exercise) => (
            <div key={exercise.id} className="bg-[#13131c] rounded-2xl border border-[#1e1e2c] p-4">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h3 className="font-bold text-white text-lg">{exercise.name}</h3>
                  <p className="text-gray-400 text-sm">{exercise.sets} sets x {exercise.reps} {exercise.weight && `• ${exercise.weight}`}</p>
                </div>
              </div>
              
              <div className="flex gap-3 overflow-x-auto pb-2">
                {Array.from({ length: exercise.sets }).map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => toggleSet(exercise.id, idx)}
                    className={`flex-shrink-0 w-12 h-12 rounded-xl flex items-center justify-center border-2 transition-all ${idx < exercise.completedSets ? 'bg-[#5DCAA5]/20 border-[#5DCAA5] text-[#5DCAA5]' : 'bg-[#1a1a26] border-[#2a2a3a] text-gray-500 hover:border-gray-400'}`}
                  >
                    {idx < exercise.completedSets ? (
                      <CheckCircle2 className="w-6 h-6" />
                    ) : (
                      <span className="font-bold">{idx + 1}</span>
                    )}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Finish Button */}
      {(someCompleted || allCompleted) && (
        <div className="fixed bottom-24 left-0 right-0 px-4 max-w-md mx-auto z-30">
          <button
            onClick={finishWorkout}
            disabled={isCompleting}
            className={`w-full py-4 rounded-2xl font-bold text-lg flex items-center justify-center shadow-lg transition-all ${allCompleted ? 'bg-[#5DCAA5] text-[#080810] shadow-[0_4px_20px_rgba(93,202,165,0.4)]' : 'bg-[#E8FF47] text-black shadow-[0_4px_20px_rgba(232,255,71,0.3)]'}`}
          >
            {isCompleting ? (
              <span className="animate-pulse">Saving...</span>
            ) : allCompleted ? (
              'Finish Workout'
            ) : (
              'Finish Early'
            )}
          </button>
        </div>
      )}
    </div>
  );
}
