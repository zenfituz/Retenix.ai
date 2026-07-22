"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export type Language = "uz" | "ru" | "en";

interface LanguageContextType {
  lang: Language;
  setLang: (lang: Language) => void;
  t: (key: string) => string;
}

const TRANSLATIONS: Record<Language, Record<string, string>> = {
  uz: {
    dashboard: "Dashboard",
    members: "A'zolar",
    trainers: "Trenerlar",
    billing: "Billing & Plans",
    copilot: "AI Copilot",
    profile: "Profil",
    settings: "Sozlamalar",
    today: "Bugun",
    myClients: "Mijozlarim",
    schedule: "Jadval",
    platform: "Platforma",
    gyms: "Zallar",
    aiUsage: "AI Usage",
    home: "Bosh",
    plan: "Plan",
    food: "Ovqat",
    top: "Top",
    logout: "Chiqish",
    welcome: "Xush kelibsiz",
    selectRole: "Rolni Tanlang",
    activeMembers: "Faol A'zolar",
    churnRisk: "Churn Risk",
    activityLog: "Foydalanuvchi Harakatlari Logi",
    language: "Til",
  },
  ru: {
    dashboard: "Дашборд",
    members: "Участники",
    trainers: "Тренеры",
    billing: "Биллинг и тарифы",
    copilot: "AI Копилот",
    profile: "Профиль",
    settings: "Настройки",
    today: "Сегодня",
    myClients: "Мои клиенты",
    schedule: "Расписание",
    platform: "Платформа",
    gyms: "Залы",
    aiUsage: "Использование ИИ",
    home: "Главная",
    plan: "План",
    food: "Питание",
    top: "Топ",
    logout: "Выйти",
    welcome: "Добро пожаловать",
    selectRole: "Выберите роль",
    activeMembers: "Активные члены",
    churnRisk: "Риск оттока",
    activityLog: "Журнал действий пользователей",
    language: "Язык",
  },
  en: {
    dashboard: "Dashboard",
    members: "Members",
    trainers: "Trainers",
    billing: "Billing & Plans",
    copilot: "AI Copilot",
    profile: "Profile",
    settings: "Settings",
    today: "Today",
    myClients: "My Clients",
    schedule: "Schedule",
    platform: "Platform",
    gyms: "Gyms",
    aiUsage: "AI Usage",
    home: "Home",
    plan: "Plan",
    food: "Nutrition",
    top: "Top",
    logout: "Sign Out",
    welcome: "Welcome",
    selectRole: "Select Role",
    activeMembers: "Active Members",
    churnRisk: "Churn Risk",
    activityLog: "User Activity Log",
    language: "Language",
  },
};

const LanguageContext = createContext<LanguageContextType>({
  lang: "uz",
  setLang: () => {},
  t: (key) => key,
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLangState] = useState<Language>("uz");

  useEffect(() => {
    const saved = localStorage.getItem("retenix_lang") as Language;
    if (saved && (saved === "uz" || saved === "ru" || saved === "en")) {
      setLangState(saved);
    }
  }, []);

  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem("retenix_lang", newLang);
  };

  const t = (key: string): string => {
    return TRANSLATIONS[lang]?.[key] || TRANSLATIONS["uz"]?.[key] || key;
  };

  return (
    <LanguageContext.Provider value={{ lang, setLang, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLanguage = () => useContext(LanguageContext);
