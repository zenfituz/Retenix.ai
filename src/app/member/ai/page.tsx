"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles, User, Dumbbell, Utensils, Zap, ArrowLeft } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { useLanguage } from "@/context/language-context";
import Link from "next/link";

interface ChatMessage {
  sender: "ai" | "user";
  text: string;
  time: string;
}

export default function MemberAiPage() {
  const { lang, t } = useLanguage();
  const [chatInput, setChatInput] = useState("");
  const [messages, setMessages] = useState<ChatMessage[]>([
    { 
      sender: "ai", 
      text: "Salom, Jasur! Men sizning shaxsiy 24/7 AI Treneringizman. Mashg'ulotlar, ovqatlanish yoki kaloriya bo'yicha har qanday savolingizga yordam beraman.", 
      time: "09:41" 
    },
    { 
      sender: "user", 
      text: "Osh necha kaloriya?", 
      time: "09:42" 
    },
    { 
      sender: "ai", 
      text: "O'rtacha porsiya osh (300g) — taxminan 540 kcal. Kunlik 1,840 kcal normangizning 30% ini tashkil etadi. Tushlikdan keyin 45 daqiqalik mashg'ulot o'tkazish juda samarali bo'ladi!", 
      time: "09:42" 
    },
  ]);

  const handleSend = () => {
    if (!chatInput.trim()) return;
    const userText = chatInput;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    setMessages(prev => [...prev, { sender: "user", text: userText, time: now }]);
    setChatInput("");

    setTimeout(() => {
      let reply = "Juda yaxshi savol! Shaxsiy maqsadingizga erishish uchun haftasiga 3 mahal trenirovka va yetarlicha uyqu muhim.";
      if (userText.toLowerCase().includes("tuxum")) {
        reply = "1 ta qaynatilgan tuxum taxminan 70 kcal va 6g yuqori sifatli protein beradi.";
      } else if (userText.toLowerCase().includes("suv")) {
        reply = "Kunda kamida 2.5 - 3 litr toza suv ichish moddalar almashinuvini 15% ga tezlashtiradi.";
      } else if (userText.toLowerCase().includes("protein")) {
        reply = "Sizning kunlik oqsil maqsadingiz 145g. Mashqdan keyin whey protein yoki tovuq ko'kragi iste'mol qiling.";
      }
      setMessages(prev => [...prev, { sender: "ai", text: reply, time: now }]);
    }, 600);
  };

  return (
    <div className="p-4 sm:p-6 max-w-4xl mx-auto space-y-4 pb-24 text-text-hi">
      {/* Header */}
      <div className="flex items-center justify-between border-b border-border pb-3">
        <div className="flex items-center gap-3">
          <Link href="/member" className="p-2 rounded-xl bg-surface-2 border border-border hover:border-accent/40">
            <ArrowLeft className="w-4 h-4 text-text-hi" />
          </Link>
          <div>
            <h1 className="text-xl sm:text-2xl font-display font-bold flex items-center gap-2">
              <Bot className="w-6 h-6 text-accent" /> Retenix AI Trener
            </h1>
            <p className="text-xs text-text-dim">Shaxsiy 24/7 Virtual Murabbiy va Dieta Boshqaruvchisi</p>
          </div>
        </div>
        <div className="px-3 py-1 rounded-full bg-good/10 border border-good/30 text-good font-mono text-xs flex items-center gap-1.5">
          <span className="w-2 h-2 rounded-full bg-good animate-pulse" /> Online
        </div>
      </div>

      {/* Suggested Quick Prompts */}
      <div className="flex gap-2 overflow-x-auto pb-2 scrollbar-none">
        {[
          "🥗 Osh necha kaloriya?",
          "🥚 Tuxum oqsili qancha?",
          "💧 Kunlik suv normam?",
          "🏋️ Dushanba mashg'ulot rejasi?"
        ].map((prompt, idx) => (
          <button
            key={idx}
            onClick={() => setChatInput(prompt.substring(2).trim())}
            className="px-3 py-1.5 rounded-xl bg-surface border border-border text-xs text-text-mid hover:text-accent hover:border-accent/40 whitespace-nowrap cursor-pointer transition-colors"
          >
            {prompt}
          </button>
        ))}
      </div>

      {/* Chat Conversation Area */}
      <Card className="bg-surface border-border">
        <CardContent className="p-4 space-y-3">
          <div className="space-y-3 min-h-[340px] max-h-[500px] overflow-y-auto pr-1 flex flex-col justify-end">
            {messages.map((msg, idx) => (
              <div 
                key={idx}
                className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-body leading-relaxed space-y-1 ${
                  msg.sender === 'ai'
                    ? "bg-surface-2 border border-border text-text-hi self-start rounded-tl-none"
                    : "bg-accent text-bg font-semibold ml-auto rounded-tr-none shadow-[0_0_15px_rgba(232,255,71,0.15)]"
                }`}
              >
                <div>{msg.text}</div>
                <div className={`text-[9px] font-mono text-right ${msg.sender === 'ai' ? 'text-text-dim' : 'text-bg/70'}`}>
                  {msg.time}
                </div>
              </div>
            ))}
          </div>

          {/* Input Box */}
          <div className="flex gap-2 pt-3 border-t border-border">
            <input
              type="text"
              value={chatInput}
              onChange={(e) => setChatInput(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && handleSend()}
              placeholder="Savolingizni yozing (masalan: Protein normasi)..."
              className="flex-1 bg-surface-2 border border-border rounded-xl px-4 py-3 text-xs text-text-hi focus:border-accent outline-none font-body"
            />
            <button
              onClick={handleSend}
              className="px-4 py-3 bg-accent text-bg rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer shadow-[0_0_15px_rgba(232,255,71,0.2)]"
            >
              <Send className="w-4 h-4" />
            </button>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
