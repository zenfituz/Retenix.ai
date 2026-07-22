"use client";

import React, { createContext, useContext, useState, useEffect } from "react";

export interface ActivityItem {
  id: string;
  user: string;
  role: string;
  action: string;
  details: string;
  timestamp: string;
}

const INITIAL_LOGS: ActivityItem[] = [
  { id: "1", user: "Jasur Toshmatov", role: "Member", action: "QR Check-in", details: "FitZone Yunusobod turniketi orqali kirdi", timestamp: "Hozirgina" },
  { id: "2", user: "Coach Aziz", role: "Trainer", action: "Mashg'ulot yakunlandi", details: "Jasur Toshmatov bilan Personal Training bajarildi", timestamp: "10 min oldin" },
  { id: "3", user: "Botir Niyozov", role: "Owner", action: "Trener biriktirildi", details: "Doniyor Raxmonov -> Coach Aziz ga biriktirildi", timestamp: "30 min oldin" },
  { id: "4", user: "Nilufar Mirzaeva", role: "Member", action: "Ovqat kiritildi", details: "Osh (580 kcal, 24g protein) jurnalga qo'shildi", timestamp: "1 soat oldin" },
  { id: "5", user: "Platform Admin", role: "Superadmin", action: "Zal tasdiqlandi", details: "FitLife Toshkent Pro tarifi yangilandi", timestamp: "2 soat oldin" },
];

interface ActivityLogContextType {
  logs: ActivityItem[];
  addLog: (action: string, details: string, user?: string, role?: string) => void;
}

const ActivityLogContext = createContext<ActivityLogContextType>({
  logs: [],
  addLog: () => {},
});

export function ActivityLogProvider({ children }: { children: React.ReactNode }) {
  const [logs, setLogs] = useState<ActivityItem[]>(INITIAL_LOGS);

  useEffect(() => {
    const saved = localStorage.getItem("retenix_activity_logs");
    if (saved) {
      try {
        setLogs(JSON.parse(saved));
      } catch (e) {
        console.error(e);
      }
    }
  }, []);

  const addLog = (action: string, details: string, user = "Joriy Foydalanuvchi", role = "User") => {
    const newLog: ActivityItem = {
      id: Date.now().toString(),
      user,
      role,
      action,
      details,
      timestamp: "Hozirgina",
    };
    setLogs((prev) => {
      const updated = [newLog, ...prev.slice(0, 49)];
      localStorage.setItem("retenix_activity_logs", JSON.stringify(updated));
      return updated;
    });
  };

  return (
    <ActivityLogContext.Provider value={{ logs, addLog }}>
      {children}
    </ActivityLogContext.Provider>
  );
}

export const useActivityLog = () => useContext(ActivityLogContext);
