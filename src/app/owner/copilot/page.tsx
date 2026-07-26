"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles, User, RefreshCw } from "lucide-react";

export default function OwnerCopilotPage() {
  const [messages, setMessages] = useState([
    { role: "ai", text: "Salom! Men Retenix AI Copilot asistentiman. Zal a'zolarining churn xavfi va saqlab qolish bo'yicha qanday savolingiz bor?" }
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const quickPrompts = [
    "9 ta churn xavfidagi mijozlar kimlar?",
    "Retention darajasini qanday oshirish mumkin?",
    "Eng yaxshi natijador trener kim?",
    "Joriy oy uchun MRR prognozi",
  ];

  const handleSend = async (textToSend?: string) => {
    const msg = textToSend || input;
    if (!msg.trim()) return;

    const userMsg = { role: "user", text: msg };
    setMessages(prev => [...prev, userMsg]);
    if (!textToSend) setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/copilot/message", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: msg, role: "owner" })
      });
      const data = await res.json();
      setMessages(prev => [...prev, { role: "ai", text: data.reply }]);
    } catch (err) {
      setMessages(prev => [...prev, { role: "ai", text: "Kechirasiz, javob olishda xatolik yuz berdi." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="space-y-6">
      
      {/* Header */}
      <div className="bg-[#0d0d16] border border-[#1e1e2c] p-6 rounded-2xl flex items-center justify-between">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-[#E8FF47]/10 border border-[#E8FF47]/30 text-[#E8FF47] text-[10px] font-mono mb-2">
            <Sparkles className="w-3.5 h-3.5" /> CLAUDE 3.5 SONNET POWERED
          </div>
          <h1 className="text-2xl sm:text-3xl font-display font-bold text-white">AI Copilot Asistent</h1>
          <p className="text-xs sm:text-sm text-gray-400 mt-1">Zal ma'lumotlari asosida proaktiv tahlil va tavsiyalar</p>
        </div>
      </div>

      {/* Quick Prompts */}
      <div className="flex gap-2 overflow-x-auto pb-2">
        {quickPrompts.map((qp, idx) => (
          <button
            key={idx}
            onClick={() => handleSend(qp)}
            className="px-3.5 py-2 rounded-xl bg-[#13131c] hover:bg-[#1a1a26] border border-[#1e1e2c] hover:border-[#E8FF47]/40 text-xs text-gray-300 whitespace-nowrap transition-all"
          >
            💡 {qp}
          </button>
        ))}
      </div>

      {/* Chat Messages Panel */}
      <div className="bg-[#0d0d16] border border-[#1e1e2c] rounded-2xl p-6 h-[480px] flex flex-col justify-between">
        <div className="overflow-y-auto space-y-4 pr-2">
          {messages.map((m, idx) => (
            <div
              key={idx}
              className={`flex gap-3 ${m.role === "user" ? "justify-end" : "justify-start"}`}
            >
              {m.role === "ai" && (
                <div className="w-8 h-8 rounded-xl bg-[#E8FF47] text-[#080810] flex items-center justify-center font-bold flex-shrink-0 shadow-[0_0_10px_rgba(232,255,71,0.3)]">
                  <Bot className="w-5 h-5" />
                </div>
              )}

              <div className={`p-4 rounded-2xl text-xs sm:text-sm max-w-[80%] leading-relaxed ${
                m.role === "user"
                  ? "bg-[#E8FF47] text-[#080810] font-medium"
                  : "bg-[#13131c] border border-[#1e1e2c] text-gray-200"
              }`}>
                {m.text}
              </div>

              {m.role === "user" && (
                <div className="w-8 h-8 rounded-xl bg-[#1a1a26] border border-[#2a2a3a] text-white flex items-center justify-center flex-shrink-0">
                  <User className="w-4 h-4" />
                </div>
              )}
            </div>
          ))}

          {loading && (
            <div className="flex gap-3 justify-start items-center text-xs text-gray-400 font-mono">
              <div className="w-8 h-8 rounded-xl bg-[#E8FF47] text-[#080810] flex items-center justify-center font-bold">
                <Bot className="w-4 h-4 animate-spin" />
              </div>
              <span>Retenix AI o'ylamoqda...</span>
            </div>
          )}
        </div>

        {/* Input Bar */}
        <form onSubmit={(e) => { e.preventDefault(); handleSend(); }} className="flex gap-2 pt-4 border-t border-[#1e1e2c]">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            placeholder="AI Copilot'ga savol bering..."
            className="flex-1 bg-[#13131c] border border-[#1e1e2c] rounded-xl px-4 py-3 text-xs sm:text-sm text-white outline-none focus:border-[#E8FF47]/50 transition-colors"
          />
          <button
            type="submit"
            disabled={loading}
            className="bg-[#E8FF47] hover:bg-[#d8ef37] text-[#080810] px-5 py-3 rounded-xl text-xs sm:text-sm font-semibold flex items-center gap-2 transition-all shadow-[0_0_15px_rgba(232,255,71,0.2)]"
          >
            <Send className="w-4 h-4" />
          </button>
        </form>
      </div>

    </div>
  );
}
