"use client";

import React, { useState } from "react";
import { Utensils, Flame, Plus, CheckCircle2, Sparkles, PieChart } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import { useLanguage } from "@/context/language-context";

export default function MemberFoodPage() {
  const { lang, t } = useLanguage();

  const getLocalizedMeals = () => {
    if (lang === "ru") {
      return [
        { name: "Завтрак", items: "3 вареных яйца, овсяная каша, зеленый чай", calories: 480, protein: "32г", time: "08:30" },
        { name: "Обед", items: "Узбекский плов (300г), салат из огурцов", calories: 580, protein: "24г", time: "13:00" },
        { name: "Перекус", items: "Протеиновый коктейль, 1 банан", calories: 250, protein: "28г", time: "16:30" },
        { name: "Ужин", items: "Куриное филе (200г) и запеченные овощи", calories: 420, protein: "45г", time: "20:00" },
      ];
    }
    if (lang === "en") {
      return [
        { name: "Breakfast", items: "3 boiled eggs, oatmeal, green tea", calories: 480, protein: "32g", time: "08:30" },
        { name: "Lunch", items: "Traditional Beef Pilaf (300g), cucumber salad", calories: 580, protein: "24g", time: "13:00" },
        { name: "Snack", items: "Whey Protein Shake, 1 banana", calories: 250, protein: "28g", time: "16:30" },
        { name: "Dinner", items: "Grilled chicken breast (200g) with steamed veggies", calories: 420, protein: "45g", time: "20:00" },
      ];
    }
    // Default UZ
    return [
      { name: "Nonushta (Breakfast)", items: "3 ta qaynatilgan tuxum, suli bo'tqasi, yashil choy", calories: 480, protein: "32g", time: "08:30" },
      { name: "Tushlik (Lunch)", items: "O'zbekcha Milliy Osh (300g), bodring salat", calories: 580, protein: "24g", time: "13:00" },
      { name: "Peshindan keyin (Snack)", items: "Protein kokteyli, 1 ta banan", calories: 250, protein: "28g", time: "16:30" },
      { name: "Kechki taom (Dinner)", items: "Tovuq ko'kragi (200g) va pishirilgan sabzavotlar", calories: 420, protein: "45g", time: "20:00" },
    ];
  };

  const [meals, setMeals] = useState(getLocalizedMeals());

  return (
    <div className="p-4 md:p-8 space-y-6 max-w-5xl mx-auto">
      <div>
        <h1 className="text-2xl md:text-3xl font-display font-bold text-text-hi flex items-center gap-2">
          <Utensils className="w-7 h-7 text-accent" /> {t("foodJournal")}
        </h1>
        <p className="text-text-dim text-sm mt-1">
          {lang === 'ru' ? "Учет калорий, белков и макронутриентов за день" : lang === 'en' ? "Daily calorie, protein, and macronutrient tracking" : "Kunlik kaloriya, protein va makronutrientlar hisobi"}
        </p>
      </div>

      {/* Macro Summary Grid */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
          <div className="text-[10px] font-mono text-text-dim uppercase">
            {lang === 'ru' ? "КАЛОРИИ" : lang === 'en' ? "CALORIES" : "KALORIYA"}
          </div>
          <div className="text-2xl font-display font-bold text-accent mt-1">1,730</div>
          <div className="text-[10px] font-mono text-text-dim mt-0.5">/ 2,400 kcal</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
          <div className="text-[10px] font-mono text-text-dim uppercase">
            {lang === 'ru' ? "БЕЛОК" : lang === 'en' ? "PROTEIN" : "PROTEIN"}
          </div>
          <div className="text-2xl font-display font-bold text-good mt-1">129g</div>
          <div className="text-[10px] font-mono text-text-dim mt-0.5">/ 160g {lang === 'ru' ? "цель" : lang === 'en' ? "target" : "maqsad"}</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
          <div className="text-[10px] font-mono text-text-dim uppercase">
            {lang === 'ru' ? "УГЛЕВОДЫ" : lang === 'en' ? "CARBS" : "UGLEVODLAR"}
          </div>
          <div className="text-2xl font-display font-bold text-warn mt-1">185g</div>
          <div className="text-[10px] font-mono text-text-dim mt-0.5">/ 220g {lang === 'ru' ? "цель" : lang === 'en' ? "target" : "maqsad"}</div>
        </div>

        <div className="p-4 rounded-xl bg-surface border border-border flex flex-col items-center text-center">
          <div className="text-[10px] font-mono text-text-dim uppercase">
            {lang === 'ru' ? "ЖИРЫ" : lang === 'en' ? "FATS" : "YOG'LAR"}
          </div>
          <div className="text-2xl font-display font-bold text-info mt-1">52g</div>
          <div className="text-[10px] font-mono text-text-dim mt-0.5">/ 65g {lang === 'ru' ? "цель" : lang === 'en' ? "target" : "maqsad"}</div>
        </div>
      </div>

      {/* Meals Log List */}
      <Card className="bg-surface border-border">
        <CardHeader className="flex flex-row items-center justify-between pb-3 border-b border-border">
          <CardTitle className="text-base font-display font-bold text-text-hi">
            {lang === 'ru' ? "Список приемов пищи за сегодня" : lang === 'en' ? "Today's Meal Log" : "Bugungi Ovqatlar Ro'yxati"}
          </CardTitle>
          <button className="px-3 py-1.5 bg-accent text-bg font-semibold text-xs rounded-xl flex items-center gap-1 cursor-pointer">
            <Plus className="w-3.5 h-3.5" /> {lang === 'ru' ? "Добавить прием пищи" : lang === 'en' ? "Add Meal" : "Ovqat Qo'shish"}
          </button>
        </CardHeader>
        <CardContent className="p-4 space-y-3">
          {meals.map((m, idx) => (
            <div key={idx} className="p-3.5 rounded-xl bg-surface-2 border border-border-2 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
              <div>
                <div className="text-xs font-bold text-text-hi flex items-center gap-2">
                  <span>{m.name}</span>
                  <span className="text-[10px] font-mono text-text-dim">({m.time})</span>
                </div>
                <div className="text-xs text-text-mid mt-1">{m.items}</div>
              </div>
              <div className="flex items-center gap-3 font-mono text-xs text-right">
                <span className="text-accent font-semibold">{m.calories} kcal</span>
                <span className="text-good font-semibold">{m.protein} protein</span>
              </div>
            </div>
          ))}
        </CardContent>
      </Card>
    </div>
  );
}
