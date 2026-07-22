"use client";

import React from "react";
import { useLanguage, Language } from "@/context/language-context";
import { Globe } from "lucide-react";

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage();

  return (
    <div className="flex items-center gap-1.5 bg-surface-2 border border-border px-2.5 py-1 rounded-xl text-xs font-mono">
      <Globe className="w-3.5 h-3.5 text-accent" />
      <select
        value={lang}
        onChange={(e) => setLang(e.target.value as Language)}
        className="bg-transparent text-text-hi font-mono focus:outline-none cursor-pointer text-xs"
      >
        <option value="uz" className="bg-surface text-text-hi">🇺🇿 UZ</option>
        <option value="ru" className="bg-surface text-text-hi">🇷🇺 RU</option>
        <option value="en" className="bg-surface text-text-hi">🇬🇧 EN</option>
      </select>
    </div>
  );
}
