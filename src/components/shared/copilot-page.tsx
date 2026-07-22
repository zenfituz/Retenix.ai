"use client";

import React, { useState, useRef, useEffect } from "react";
import { Bot, Send, Sparkles, AlertCircle, ArrowRight, Zap, CheckCircle2 } from "lucide-react";
import { RoleType } from "@/components/layout/app-shell";

const QUICK_PROMPTS: Record<RoleType, string[]> = {
  owner: ["Churn xavfidagi a'zolarni ko'rsat", "Bu oy daromad qanday?", "Qaysi kun faollik eng past?"],
  trainer: ["Bugun kimga e'tibor berish kerak?", "Madina uchun xabar tayyorla", "Adherence pasayganlar ro'yxati"],
  superadmin: ["AI sarfi anomaliyalari bormi?", "Oxirgi 7 kunda churned gymlar", "Qaysi gym eng yuqori MRR?"],
  member: ["Bugungi mashqim qanday?", "Protein normam qancha?", "Osh necha kaloriya?"],
};

const INSIGHTS: Record<RoleType, { id: string; tone: "warn" | "good" | "default"; title: string; body: string; action: string }[]> = {
  owner: [
    { id: "1", tone: "warn", title: "3 ta a'zo yuqori churn xavfida", body: "Birgalikda ehtimollik ~68%. Shaxsiy xabar yuborish tavsiya etiladi.", action: "Xabar tayyorlash →" },
    { id: "2", tone: "default", title: "Seshanba kunlari faollik eng past", body: "6 oy davomida Seshanba haftaning eng kam faol kuni.", action: "Eslatma sozlash →" },
    { id: "3", tone: "good", title: "Pro reja konversiyasi yaxshilanmoqda", body: "Starter'dan Pro'ga o'tish darajasi 6 oyda 14% dan 22% ga oshdi.", action: "To'liq tahlil →" },
  ],
  trainer: [
    { id: "1", tone: "warn", title: "Madina bilan bog'lanish kerak", body: "3 kun checkin yo'q + charchoq belgilari. Churn ehtimoli o'rtacha.", action: "Xabar tayyorlash →" },
    { id: "2", tone: "default", title: "Dilnozaning adherence pasaymoqda", body: "Oxirgi 2 haftada 65% dan 42% ga tushdi.", action: "Dasturni ko'rish →" },
  ],
  superadmin: [
    { id: "1", tone: "warn", title: "PowerFit Samarqand'da AI sarfi anomal", body: "Bitta foydalanuvchi haddan tashqari ko'p so'rov yubormoqda.", action: "Hisobni tekshirish →" },
    { id: "2", tone: "default", title: "6 gym churn xavfida", body: "To'lov kechikishi + faollik pasayishi kombinatsiyasi aniqlandi.", action: "Ro'yxatni ko'rish →" },
  ],
  member: [
    { id: "1", tone: "good", title: "7 kunlik streak rekord!", body: "Siz ketma-ket 7 kun mashq qildingiz. Bugun 500 XP bonus olindi.", action: "Ko'rish →" },
  ],
};

function simulateReply(text: string, role: RoleType): string {
  const t = text.toLowerCase();
  if (t.includes("churn") || t.includes("risk") || t.includes("xavf"))
    return "Hozirda 9 ta a'zo churn xavfida. Eng kritiklar: Doniyor (8 kun), Sevara (6 kun). Shaxsiy xabar yuborishni tavsiya qilaman.";
  if (t.includes("daromad") || t.includes("mrr"))
    return "Bu oy MRR $6,240 — o'tgan oydan 9.3% o'sdi. Eng ko'p daromad Pro reja a'zolaridan kelmoqda.";
  if (t.includes("osh") || t.includes("kaloriya") || t.includes("protein"))
    return "O'rtacha porsiya osh (300g) — taxminan 540 kcal. Kunlik normangizning ~30% i.";
  if (t.includes("adherence") || t.includes("faollik"))
    return "O'rtacha adherence 81%. Eng past: Dilnoza (42%) — dastur murakkabligini kamaytirish tavsiya etiladi.";
  if (role === "superadmin")
    return "Platforma bo'yicha anomaliya aniqlandi: PowerFit Samarqand'da AI sarfi bu hafta 3.2x oshgan.";
  return "Tushundim. Retenix AI dvigateli ma'lumotlarni tahlil qilmoqda — raqamlar bilan javob beraman.";
}

export function CopilotPage({ role }: { role: RoleType }) {
  const [messages, setMessages] = useState([
    { id: "1", role: "ai", text: `Salom! Men Retenix AI Copilot yordamchisiman. Bugun qaysi masalada tahlil yoki proaktiv tavsiya kerak?` },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const send = async (text: string) => {
    if (!text.trim()) return;
    setMessages((p) => [...p, { id: Date.now().toString(), role: "user", text }]);
    setInput("");
    setLoading(true);

    setTimeout(() => {
      const reply = simulateReply(text, role);
      setMessages((p) => [...p, { id: (Date.now() + 1).toString(), role: "ai", text: reply }]);
      setLoading(false);
    }, 600);
  };

  const prompts = QUICK_PROMPTS[role] || QUICK_PROMPTS.owner;
  const insights = INSIGHTS[role] || INSIGHTS.owner;

  return (
    <div className="p-4 md:p-8 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl md:text-3xl font-display font-bold text-text-hi flex items-center gap-2">
            <Bot className="w-7 h-7 text-accent" /> AI Copilot
          </h1>
          <p className="text-text-dim text-sm mt-1">Proaktiv retention tavsiyalari va sun'iy intellekt muloqoti</p>
        </div>
        <span className="px-3 py-1 rounded-full bg-good/10 text-good border border-good/20 font-mono text-xs flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-good animate-pulse" /> AI Online
        </span>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Chat Area */}
        <div className="lg:col-span-2 bg-surface border border-border rounded-2xl p-5 flex flex-col h-[560px]">
          <div className="flex-1 overflow-y-auto space-y-3 pr-2" ref={scrollRef}>
            {messages.map((m) => (
              <div
                key={m.id}
                className={`max-w-[82%] p-3.5 rounded-2xl text-xs leading-relaxed ${
                  m.role === "user"
                    ? "ml-auto bg-accent text-bg font-medium rounded-br-none"
                    : "mr-auto bg-surface-2 border border-border text-text-hi rounded-bl-none"
                }`}
              >
                {m.text}
              </div>
            ))}
            {loading && (
              <div className="mr-auto bg-surface-2 border border-border text-text-dim px-4 py-2.5 rounded-2xl text-xs font-mono animate-pulse">
                AI o'ylamoqda...
              </div>
            )}
          </div>

          {/* Quick Prompts */}
          <div className="flex flex-wrap gap-2 mt-4 pt-3 border-t border-border">
            {prompts.map((p) => (
              <button
                key={p}
                onClick={() => send(p)}
                className="px-3 py-1.5 rounded-full bg-surface-2 hover:bg-surface-3 border border-border text-[11px] text-text-mid hover:text-accent font-mono transition-colors cursor-pointer"
              >
                {p}
              </button>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex gap-2 mt-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && send(input)}
              placeholder="Savolingizni yozing..."
              className="flex-1 bg-surface-2 border border-border rounded-xl px-4 py-3 text-xs text-text-hi focus:outline-none focus:border-accent font-body"
            />
            <button
              onClick={() => send(input)}
              className="px-4 bg-accent text-bg rounded-xl font-semibold flex items-center justify-center hover:opacity-90 transition-opacity cursor-pointer"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Proactive Insights Column */}
        <div className="space-y-4">
          <div className="font-mono text-xs tracking-wider text-text-dim uppercase flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-accent" /> Proaktiv Tavsiyalar
          </div>
          {insights.map((item) => (
            <div
              key={item.id}
              className={`p-4 rounded-xl border bg-surface ${
                item.tone === "warn"
                  ? "border-bad/30 border-l-4 border-l-bad"
                  : item.tone === "good"
                  ? "border-good/30 border-l-4 border-l-good"
                  : "border-accent/30 border-l-4 border-l-accent"
              }`}
            >
              <div className="text-sm font-bold text-text-hi mb-1">{item.title}</div>
              <div className="text-xs text-text-dim leading-relaxed mb-3">{item.body}</div>
              <button className="text-xs font-mono text-accent hover:underline flex items-center gap-1 cursor-pointer">
                {item.action}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
