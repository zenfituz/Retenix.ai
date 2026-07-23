"use client";

import React, { useState } from "react";
import { Dumbbell, CheckCircle2, Flame, Calendar, Clock, ArrowRight } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { useLanguage } from "@/context/language-context";

export default function MemberPlanPage() {
  const { lang, t } = useLanguage();

  const getLocalizedWorkouts = () => {
    if (lang === "ru") {
      return [
        {
          day: "Понедельник",
          title: "Грудь и Трицепс (Chest & Triceps)",
          duration: "60 минут",
          completed: true,
          exercises: [
            { name: "Жим штанги лежа", sets: "4 сета × 10 повт", weight: "75 кг", done: true },
            { name: "Жим гантелей на наклонной", sets: "3 сета × 12 повт", weight: "26 кг", done: true },
            { name: "Кроссовер на блоке", sets: "3 сета × 15 повт", weight: "15 кг", done: true },
            { name: "Разгибание рук на трицепс", sets: "4 сета × 12 повт", weight: "35 кг", done: true },
          ]
        },
        {
          day: "Среда",
          title: "Спина и Бицепс (Back & Biceps)",
          duration: "65 минут",
          completed: false,
          exercises: [
            { name: "Тяга верхнего блока", sets: "4 сета × 10 повт", weight: "60 кг", done: false },
            { name: "Тяга штанги в наклоне", sets: "3 сета × 12 повт", weight: "50 кг", done: false },
            { name: "Сгибание рук с гантелями", sets: "4 сета × 12 повт", weight: "14 кг", done: false },
          ]
        },
        {
          day: "Пятница",
          title: "Ноги и Плечи (Legs & Shoulders)",
          duration: "70 минут",
          completed: false,
          exercises: [
            { name: "Приседания со штангой", sets: "4 сета × 8 повт", weight: "90 кг", done: false },
            { name: "Жим ногами в тренажере", sets: "3 сета × 12 повт", weight: "140 кг", done: false },
            { name: "Жим гантелей сидя", sets: "4 сета × 10 повт", weight: "20 кг", done: false },
          ]
        }
      ];
    }
    if (lang === "en") {
      return [
        {
          day: "Monday",
          title: "Chest & Triceps Focus",
          duration: "60 min",
          completed: true,
          exercises: [
            { name: "Flat Barbell Bench Press", sets: "4 sets × 10 reps", weight: "75 kg", done: true },
            { name: "Incline Dumbbell Press", sets: "3 sets × 12 reps", weight: "26 kg", done: true },
            { name: "Cable Fly Crossover", sets: "3 sets × 15 reps", weight: "15 kg", done: true },
            { name: "Triceps Rope Pushdown", sets: "4 sets × 12 reps", weight: "35 kg", done: true },
          ]
        },
        {
          day: "Wednesday",
          title: "Back & Biceps Pull",
          duration: "65 min",
          completed: false,
          exercises: [
            { name: "Lat Pulldown Wide Grip", sets: "4 sets × 10 reps", weight: "60 kg", done: false },
            { name: "Bent-Over Barbell Row", sets: "3 sets × 12 reps", weight: "50 kg", done: false },
            { name: "Dumbbell Biceps Curl", sets: "4 sets × 12 reps", weight: "14 kg", done: false },
          ]
        },
        {
          day: "Friday",
          title: "Legs & Shoulders Power",
          duration: "70 min",
          completed: false,
          exercises: [
            { name: "Barbell Back Squats", sets: "4 sets × 8 reps", weight: "90 kg", done: false },
            { name: "Leg Press Machine", sets: "3 sets × 12 reps", weight: "140 kg", done: false },
            { name: "Seated Dumbbell Shoulder Press", sets: "4 sets × 10 reps", weight: "20 kg", done: false },
          ]
        }
      ];
    }
    // Default UZ
    return [
      {
        day: "Dushanba",
        title: "Ko'krak va Triceps (Chest & Triceps)",
        duration: "60 daqiqa",
        completed: true,
        exercises: [
          { name: "Bench Press (Shtanga siqish)", sets: "4 set × 10 rep", weight: "75 kg", done: true },
          { name: "Incline Dumbbell Press", sets: "3 set × 12 rep", weight: "26 kg", done: true },
          { name: "Cable Crossover", sets: "3 set × 15 rep", weight: "15 kg", done: true },
          { name: "Triceps Pushdown", sets: "4 set × 12 rep", weight: "35 kg", done: true },
        ]
      },
      {
        day: "Chorshanba",
        title: "Orqa va Biceps (Back & Biceps)",
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
        title: "Oyoq va Yelka (Legs & Shoulders)",
        duration: "70 daqiqa",
        completed: false,
        exercises: [
          { name: "Barbell Squat (Oyoq bukish)", sets: "4 set × 8 rep", weight: "90 kg", done: false },
          { name: "Leg Press Machine", sets: "3 set × 12 rep", weight: "140 kg", done: false },
          { name: "Seated Dumbbell Press", sets: "4 set × 10 rep", weight: "20 kg", done: false },
        ]
      }
    ];
  };

  const [workouts, setWorkouts] = useState(getLocalizedWorkouts());

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
          <Dumbbell className="w-7 h-7 text-accent" /> {t("workoutPlan")}
        </h1>
        <p className="text-text-dim text-sm mt-1">
          {lang === 'ru' ? "Еженедельный план тренировок от вашего личного тренера" : lang === 'en' ? "Weekly workout program assigned by your personal coach" : "Shaxsiy murabbiyingiz tomonidan belgilangan haftalik trenirovka rejasi"}
        </p>
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
                {w.completed 
                  ? (lang === 'ru' ? "Выполнено" : lang === 'en' ? "Completed" : "Bajarildi")
                  : (lang === 'ru' ? "Ожидает" : lang === 'en' ? "Upcoming" : "Kutilmoqda")
                }
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
