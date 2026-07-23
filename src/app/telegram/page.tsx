"use client";

import React, { useState } from "react";
import { Bot, Send, Sparkles, Smartphone, CheckCircle2, ArrowRight, ExternalLink, QrCode, Shield, RefreshCw } from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Pill } from "@/components/ui/pill";
import Link from "next/link";

interface SimMessage {
  sender: "bot" | "user";
  text: string;
  buttons?: { text: string; url: string }[];
  time: string;
}

export default function TelegramPage() {
  const [inputCommand, setInputCommand] = useState("/start");
  const [messages, setMessages] = useState<SimMessage[]>([
    {
      sender: "bot",
      text: "Salom Jasur! 👋\n\nRetenix.ai — fitness zal a'zolari uchun rasmiy Telegram Bot & Mini App platformasiga xush kelibsiz!\n\nRaqamli a'zolik kartangiz, turniket QR pass, mashqlar rejasi va 24/7 AI treneringiz bir joyda.",
      buttons: [
        { text: "📱 Retenix Mini App-ni Ochish", url: "/member" },
        { text: "📍 Turniket Pass", url: "/member" }
      ],
      time: "09:41"
    }
  ]);

  const handleRunCommand = (cmdText?: string) => {
    const cmd = cmdText || inputCommand;
    if (!cmd.trim()) return;
    const now = new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });

    const userMsg: SimMessage = { sender: "user", text: cmd, time: now };
    
    let botReply: SimMessage = {
      sender: "bot",
      text: `🤖 Command received: ${cmd}`,
      time: now
    };

    if (cmd.startsWith('/start')) {
      botReply = {
        sender: "bot",
        text: "Salom! 👋 Retenix.ai Telegram Bot platformasiga xush kelibsiz!",
        buttons: [{ text: "📱 Retenix Mini App-ni Ochish", url: "/member" }],
        time: now
      };
    } else if (cmd.startsWith('/checkin')) {
      botReply = {
        sender: "bot",
        text: "📍 Turniket Check-in Pass\n\nFitZone Yunusobod turniketi uchun QR kodingiz tayyor. Telegram Mini App orqali skanerlang.",
        buttons: [{ text: "📍 QR Kodni Ko'rsatish", url: "/member" }],
        time: now
      };
    } else if (cmd.startsWith('/plan')) {
      botReply = {
        sender: "bot",
        text: "💪 Bugungi Mashq Rejangiz:\n• Bench Press: 4×10 (75kg)\n• Dumbbell Press: 3×12 (26kg)\n• Cable Fly: 3×15 (15kg)",
        buttons: [{ text: "💪 Planni Boshqarish", url: "/member/plan" }],
        time: now
      };
    } else if (cmd.startsWith('/ai')) {
      botReply = {
        sender: "bot",
        text: "🤖 AI Trener: Kunlik 1,840 kcal normangiz saqlandi. 24/7 AI chat uchun Mini App-ni oching.",
        buttons: [{ text: "🤖 AI Trener Bilan Muloqot", url: "/member/ai" }],
        time: now
      };
    }

    setMessages(prev => [...prev, userMsg, botReply]);
    setInputCommand("");
  };

  return (
    <div className="p-4 sm:p-8 space-y-8 max-w-5xl mx-auto text-text-hi min-h-screen">
      {/* Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-border pb-6">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-accent/10 border border-accent/20 text-accent font-mono text-xs mb-2">
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" /> TELEGRAM BOT & MINI APP INTEGRATION
          </div>
          <h1 className="text-2xl sm:text-4xl font-display font-bold">Retenix Telegram Ecosystem</h1>
          <p className="text-text-dim text-xs sm:text-sm mt-1">
            Zal a'zolari ilovasiz to'g'ridan-to'g'ri Telegram Bot va Mini App orqali turniketdan o'tadi va AI plandan foydalanadi.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <a
            href="https://t.me/RetenixAiBot"
            target="_blank"
            rel="noopener noreferrer"
            className="px-4 py-2.5 bg-accent text-bg font-bold text-xs rounded-xl hover:opacity-90 transition-opacity flex items-center gap-2 shadow-[0_0_20px_rgba(232,255,71,0.25)]"
          >
            <Bot className="w-4 h-4" /> Telegram Bot-da Ochish <ExternalLink className="w-3.5 h-3.5" />
          </a>
        </div>
      </div>

      {/* Grid: Bot Benefits + Live Chat Simulator */}
      <div className="grid md:grid-cols-7 gap-6">
        {/* Left Column: Benefits & Integration Guide */}
        <div className="md:col-span-3 space-y-4">
          <Card className="bg-surface border-border">
            <CardHeader className="pb-2 border-b border-border">
              <CardTitle className="text-sm font-display font-bold flex items-center gap-2">
                <Smartphone className="w-4 h-4 text-accent" /> Nima Uchun Telegram Mini App?
              </CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-3 text-xs text-text-dim leading-relaxed">
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-good shrink-0 mt-0.5" />
                <div><strong className="text-text-hi">Ilovasiz (No-App-Download):</strong> A mezonlar AppStore yoki PlayMarketdan ilova yuklab olishi shart emas.</div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-good shrink-0 mt-0.5" />
                <div><strong className="text-text-hi">Tezkor Turniket QR:</strong> Telegram-ni ochib 1 ta tugma bilan QR turniket passini ko'rsatadi.</div>
              </div>
              <div className="flex items-start gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-good shrink-0 mt-0.5" />
                <div><strong className="text-text-hi">Push Xabarnomalar:</strong> Trenirovka eslatmalari va promo-kodlar to'g'ridan-to'g'ri Telegram-ga boradi.</div>
              </div>
            </CardContent>
          </Card>

          {/* Quick Bot Commands List */}
          <Card className="bg-surface border-border">
            <CardHeader className="pb-2 border-b border-border">
              <CardTitle className="text-sm font-display font-bold">Bot Buyruqlari (Commands)</CardTitle>
            </CardHeader>
            <CardContent className="p-4 space-y-2 font-mono text-xs">
              {[
                { cmd: "/start", desc: "Mini App-ni ishga tushirish" },
                { cmd: "/checkin", desc: "Turniket QR kodi pass" },
                { cmd: "/plan", desc: "Bugungi mashq rejasi" },
                { cmd: "/ai", desc: "24/7 AI Trener suhbati" }
              ].map((c, i) => (
                <div 
                  key={i} 
                  onClick={() => handleRunCommand(c.cmd)}
                  className="p-2 rounded-lg bg-surface-2 border border-border flex items-center justify-between cursor-pointer hover:border-accent/40 transition-colors"
                >
                  <span className="text-accent font-bold">{c.cmd}</span>
                  <span className="text-[10px] text-text-dim">{c.desc}</span>
                </div>
              ))}
            </CardContent>
          </Card>
        </div>

        {/* Right Column: Live Telegram Chat & Mini App Simulator */}
        <Card className="md:col-span-4 bg-surface border-accent/30 shadow-2xl flex flex-col justify-between">
          <CardHeader className="pb-3 border-b border-border flex flex-row items-center justify-between">
            <div className="flex items-center gap-2.5">
              <div className="w-8 h-8 rounded-full bg-accent/15 border border-accent/30 flex items-center justify-center font-display font-bold text-accent text-xs">
                🤖
              </div>
              <div>
                <CardTitle className="text-sm font-display font-bold text-text-hi">@RetenixAiBot (Simulyator)</CardTitle>
                <p className="text-[10px] font-mono text-good flex items-center gap-1">
                  <span className="w-1.5 h-1.5 rounded-full bg-good animate-pulse" /> Bot Server Online
                </p>
              </div>
            </div>
            <Link 
              href="/member"
              className="text-xs text-accent font-mono hover:underline flex items-center gap-1"
            >
              Mini App Demo →
            </Link>
          </CardHeader>

          <CardContent className="p-4 space-y-4 flex-1 flex flex-col justify-between">
            <div className="space-y-3 min-h-[320px] max-h-[420px] overflow-y-auto pr-1">
              {messages.map((m, idx) => (
                <div 
                  key={idx}
                  className={`max-w-[85%] p-3.5 rounded-2xl text-xs font-body leading-relaxed space-y-2 ${
                    m.sender === 'bot'
                      ? "bg-surface-2 border border-border text-text-hi self-start rounded-tl-none"
                      : "bg-accent text-bg font-semibold ml-auto rounded-tr-none"
                  }`}
                >
                  <div className="whitespace-pre-line">{m.text}</div>
                  
                  {m.buttons && m.buttons.length > 0 && (
                    <div className="pt-2 space-y-1.5">
                      {m.buttons.map((btn, bIdx) => (
                        <Link
                          key={bIdx}
                          href={btn.url}
                          className="w-full py-2 px-3 bg-accent text-bg text-[11px] font-bold rounded-xl flex items-center justify-center gap-1.5 shadow-md hover:opacity-90 transition-opacity"
                        >
                          {btn.text}
                        </Link>
                      ))}
                    </div>
                  )}

                  <div className={`text-[9px] font-mono text-right ${m.sender === 'bot' ? 'text-text-dim' : 'text-bg/70'}`}>
                    {m.time}
                  </div>
                </div>
              ))}
            </div>

            <div className="flex gap-2 pt-2 border-t border-border">
              <input
                type="text"
                value={inputCommand}
                onChange={(e) => setInputCommand(e.target.value)}
                onKeyDown={(e) => e.key === "Enter" && handleRunCommand()}
                placeholder="Buyruq yozing (masalan: /start, /checkin)..."
                className="flex-1 bg-surface-2 border border-border rounded-xl px-4 py-2.5 text-xs text-text-hi focus:border-accent outline-none font-mono"
              />
              <button
                onClick={() => handleRunCommand()}
                className="px-4 py-2.5 bg-accent text-bg rounded-xl font-bold hover:opacity-90 transition-opacity flex items-center justify-center cursor-pointer"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
