"use client";

import React, { useState } from "react";
import { Dumbbell, CheckCircle2, Flame, Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";

const WEEK_WORKOUTS = [
  {
    day: "Dushanba",
    title: "Ko'krak & Triceps (Chest & Triceps)",
    duration: "60 daqiqa",
    completed: true,
    exercises: [
      { name: "Bench Press (Shtanga)", sets: "4 set × 10 rep", weight: "75 kg", done: true },
      { name: "Incline Dumbbell Press", sets: "3 set × 12 rep", weight: "26 kg", done: true },
      { name: "Cable Crossover", sets: "3 set × 15 rep", weight: "15 kg", done: true },
      { name: "Triceps Pushdown", sets: "4 set × 12 rep", weight: "35 kg", done: true },
    ]
  },
  {
    day: "Chorshanba",
    title: "Orqa & Biceps (Back & Biceps)",
    duration: "65 daqiqa",
    completed: false,
    exercises: [
      { name: "Lat Pulldown (Keng tortish)", sets: "4 set × 10 rep", weight: "60 kg", done: false },
      { name: "Bent-Over Barbell Row", sets: "3 set × 12 rep", weight: "50 kg", done: false },
      { name: "Biceps Curl (Gantel)", sets: "4 set × 12 rep", weight: "14 kg", done: false },
    ]
  },
  {
    day: "Juma",
    title: "Oyoq & Yelka (Legs & Shoulders)",
    duration: "70 daqiqa",
    completed: false,
    exercises: [
      { name: "Barbell Squat (Oyoq bukish)", sets: "4 set × 8 rep", weight: "90 kg", done: false },
      { name: "Leg Press", sets: "3 set × 12 rep", weight: "140 kg", done: false },
      { name: "Overhead Dumbbell Press", sets: "4 set × 10 rep", weight: "20 kg", done: false },
    ]
  }
];

export default function MemberPlanPage() {
  const [workouts, setWorkouts] = useState(WEEK_WORKOUTS);

  const toggleExercise = (wIndex: number, eIndex: number) => {
    setWorkouts(prev => {
      const next = [...prev];
      next[wIndex].exercises[eIndex].done = !next[wIndex].exercises[eIndex].done;
      return next;
    });
  };

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-text-hi flex items-center gap-2">
          <Dumbbell className="w-7 h-7 text-accent" /> Mashqlar Rejasi (Workout Plan)
        </h1>
        <p className="text-text-dim text-sm mt-1">Shaxsiy murabbiyingiz tomonidan belgilangan haftalik trenirovka durlari</p>
      </div>

      <div className="space-y-6">
        {workouts.map((w, wIdx) => (
          <Card key={wIdx} className="bg-surface border-border">
            <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border">
              <div className="flex items-center gap-3">
                <div className="w-8 h-8 rounded-lg bg-accent/10 border border-accent/20 flex items-center justify-center font-mono text-accent text-xs font-bold">
                  {w.day.substring(0, 2)}
                </div>
                <div>
                  <CardTitle className="text-base font-display font-bold text-text-hi">{w.title}</CardTitle>
                  <div className="text-xs text-text-dim font-mono mt-0.5 flex items-center gap-2">
                    <Clock className="w-3 h-3 text-accent" /> {w.duration}
                  </div>
                </div>
              </div>
              <Pill variant={w.completed ? "success" : "default"}>
                {w.completed ? "Bajarildi" : "Kutilmoqda"}
              </Pill>
            </CardHeader>
            <CardContent className="p-4 space-y-2.5">
              {w.exercises.map((ex, eIdx) => (
                <div
                  key={eIdx}
                  onClick={() => toggleExercise(wIdx, eIdx)}
                  className="flex items-center justify-between p-3 rounded-xl bg-surface-2 border border-border-2 hover:border-accent/30 transition-colors cursor-pointer"
                >
                  <div className="flex items-center gap-3">
                    <div className={`w-5 h-5 rounded-md border flex items-center justify-center transition-colors ${
                      ex.done ? "bg-good border-good text-bg" : "border-border-2"
                    }`}>
                      {ex.done && <CheckCircle2 className="w-3.5 h-3.5" />}
                    </div>
                    <div>
                      <div className={`text-xs font-medium ${ex.done ? "line-through text-text-dim" : "text-text-hi"}`}>
                        {ex.name}
                      </div>
                      <div className="text-[10px] font-mono text-text-dim mt-0.5">{ex.sets}</div>
                    </div>
                  </div>
                  <div className="text-xs font-mono text-accent font-semibold">{ex.weight}</div>
                </div>
              ))}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
}
