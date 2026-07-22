"use client";

import React from "react";
import { motion } from "framer-motion";
import { ArrowRight, Activity, Zap, TrendingUp, ShieldCheck, CheckCircle2 } from "lucide-react";

export default function LandingPage() {
  return (
    <div className="min-h-screen bg-bg overflow-x-hidden">
      {/* Navigation */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-surface/80 backdrop-blur-md border-b border-border">
        <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 rounded-lg bg-accent flex items-center justify-center font-display font-black text-bg text-lg">
              R
            </div>
            <span className="font-display font-bold text-xl tracking-tight">Retenix</span>
          </div>
          <div className="hidden md:flex items-center gap-8 text-sm font-medium text-text-mid">
            <a href="#features" className="hover:text-accent transition-colors">Features</a>
            <a href="#how-it-works" className="hover:text-accent transition-colors">How it works</a>
            <a href="#pricing" className="hover:text-accent transition-colors">Pricing</a>
          </div>
          <div className="flex items-center gap-4">
            <button className="hidden md:block text-sm font-medium text-text-hi hover:text-accent transition-colors">
              Log in
            </button>
            <button className="bg-accent text-bg px-5 py-2.5 rounded-xl text-sm font-semibold hover:opacity-90 transition-opacity shadow-[0_0_20px_rgba(232,255,71,0.2)]">
              Book a Demo
            </button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-40 pb-20 px-6 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[600px] bg-accent/5 rounded-full blur-[120px] pointer-events-none" />
        
        <div className="max-w-5xl mx-auto text-center relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-surface border border-border mb-8">
              <span className="flex h-2 w-2 rounded-full bg-accent animate-pulse" />
              <span className="text-xs font-mono text-text-mid uppercase tracking-wider">Introducing the 5-Factor Churn Engine</span>
            </div>
            <h1 className="text-5xl md:text-7xl font-display font-bold leading-tight mb-6">
              Stop guessing who will <span className="text-bad">quit</span>.<br />
              Start knowing who to <span className="text-accent">save</span>.
            </h1>
            <p className="text-lg md:text-xl text-text-dim max-w-2xl mx-auto mb-10">
              Retenix analyzes attendance, streaks, engagement, plan staleness, and tenure risk to predict gym member churn before it happens.
            </p>
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <button className="w-full sm:w-auto bg-accent text-bg px-8 py-4 rounded-xl text-base font-semibold hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(232,255,71,0.25)] flex items-center justify-center gap-2">
                Start Free Trial <ArrowRight className="w-5 h-5" />
              </button>
              <button className="w-full sm:w-auto bg-surface border border-border text-text-hi px-8 py-4 rounded-xl text-base font-semibold hover:bg-surface-2 transition-colors">
                View Live Demo
              </button>
            </div>
          </motion.div>
          
          {/* Hero Image/Dashboard Mockup */}
          <motion.div 
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.7, delay: 0.2 }}
            className="mt-20 relative mx-auto max-w-4xl"
          >
            <div className="rounded-2xl border border-border bg-surface p-2 shadow-2xl relative">
              <div className="absolute inset-0 bg-gradient-to-t from-bg via-transparent to-transparent z-10 rounded-2xl" />
              <div className="rounded-xl border border-border-2 bg-surface-2 overflow-hidden flex flex-col md:flex-row">
                <div className="w-full md:w-64 border-r border-border-2 p-4 hidden md:block">
                  <div className="h-6 w-32 bg-border-2 rounded mb-8" />
                  <div className="space-y-3">
                    {[1, 2, 3, 4, 5].map((i) => (
                      <div key={i} className="h-8 w-full bg-surface-3 rounded-lg" />
                    ))}
                  </div>
                </div>
                <div className="flex-1 p-6">
                  <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
                    {[
                      { l: "RETENTION", v: "73%", c: "text-good" },
                      { l: "CHURN RISK", v: "9", c: "text-bad" },
                      { l: "FAOL BUGUN", v: "87", c: "text-accent" }
                    ].map((k, i) => (
                      <div key={i} className="bg-surface border border-border rounded-xl p-4">
                        <div className="text-[10px] font-mono text-text-dim tracking-wider mb-2">{k.l}</div>
                        <div className={`text-2xl font-display font-bold ${k.c}`}>{k.v}</div>
                      </div>
                    ))}
                  </div>
                  <div className="bg-surface border border-border rounded-xl p-8 h-48 flex flex-col items-center justify-center relative overflow-hidden">
                    <div className="absolute inset-0 bg-accent/5 opacity-50"></div>
                    <Activity className="w-10 h-10 text-accent mb-4 opacity-50" />
                    <div className="text-text-dim font-mono text-sm relative z-10">Real-time Churn Monitoring Active</div>
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Value Prop Section */}
      <section id="features" className="py-24 bg-surface border-y border-border">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-display font-bold mb-4">The 5-Factor Churn Signal Engine</h2>
            <p className="text-text-dim text-lg max-w-2xl mx-auto">Our proprietary algorithm analyzes multiple data points to generate an accurate churn score for every single member.</p>
          </div>
          
          <div className="grid md:grid-cols-3 gap-8">
            {[
              { title: "Attendance Decline", desc: "Monitors trailing 14-day check-in frequency against historical baseline.", icon: Activity },
              { title: "Streak Status", desc: "Tracks broken habits and gamification streak interruptions.", icon: TrendingUp },
              { title: "Engagement Drop", desc: "Analyzes interaction with AI coaching and nutrition logs.", icon: Zap },
            ].map((f, i) => (
              <div key={i} className="bg-surface-2 border border-border-2 rounded-2xl p-8 hover:border-accent/50 transition-colors group">
                <div className="w-12 h-12 rounded-xl bg-accent/10 flex items-center justify-center mb-6 text-accent group-hover:scale-110 transition-transform">
                  <f.icon className="w-6 h-6" />
                </div>
                <h3 className="text-xl font-bold mb-3">{f.title}</h3>
                <p className="text-text-dim leading-relaxed">{f.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 relative overflow-hidden">
        <div className="absolute inset-0 bg-accent/5" />
        <div className="max-w-4xl mx-auto px-6 relative z-10 text-center">
          <h2 className="text-4xl md:text-5xl font-display font-bold mb-6">Ready to retain your members?</h2>
          <p className="text-xl text-text-dim mb-10">Join forward-thinking gym owners using Retenix to boost MRR and member satisfaction.</p>
          <button className="bg-accent text-bg px-10 py-4 rounded-xl text-lg font-semibold hover:opacity-90 transition-opacity shadow-[0_0_30px_rgba(232,255,71,0.25)]">
            Start Your 14-Day Free Trial
          </button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-surface py-12">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-2">
            <div className="w-6 h-6 rounded border border-accent/50 flex items-center justify-center font-display font-bold text-accent text-xs">
              R
            </div>
            <span className="font-display font-bold text-text-hi">Retenix</span>
          </div>
          <div className="text-sm text-text-dim">
            © {new Date().getFullYear()} Retenix Platform. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}
