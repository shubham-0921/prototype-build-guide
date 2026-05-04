"use client";

import { useState } from "react";
import { ThemeProvider } from "./components/ThemeProvider";
import { ProgressBar } from "./components/ProgressBar";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { GuideContent } from "./components/GuideContent";
import { Clock3 } from "lucide-react";

function Hero() {
  const handleStartReading = () => {
    const el = document.getElementById("intro");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <div className="bg-gradient-to-br from-indigo-600 via-indigo-700 to-violet-700 rounded-2xl p-8 text-white relative overflow-hidden">
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-0 right-0 w-96 h-96 bg-white/10 rounded-full -translate-y-1/2 translate-x-1/2" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-white/10 rounded-full translate-y-1/2 -translate-x-1/2" />
      </div>

      <div className="relative">
        <div className="inline-flex items-center gap-2 px-3 py-1.5 text-xs font-semibold rounded-full bg-white/20 text-white backdrop-blur-sm mb-4">
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
          Internal PM Playbook
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold leading-tight mb-3">
          From idea to a live,<br />shareable prototype
        </h1>

        <p className="text-sm text-indigo-200 leading-relaxed max-w-lg">
          A clearer, lower-stress guide for Product Managers using Claude Code and Vercel to move from rough concept to working link.
        </p>

        <div className="flex flex-wrap gap-2 mt-6">
          {["7 steps", "No coding required", "Live URL at the end", "Reusable playbook"].map((tag) => (
            <span key={tag} className="px-3 py-1 text-xs font-medium rounded-full bg-white/15 text-white/90">
              {tag}
            </span>
          ))}
        </div>

        <div className="mt-6 flex flex-col gap-3 sm:flex-row sm:items-center">
          <button
            onClick={handleStartReading}
            className="inline-flex items-center justify-center gap-2 rounded-full bg-white px-6 py-2.5 text-sm font-semibold text-indigo-700 hover:bg-indigo-50 transition-colors sm:w-auto"
          >
            Start the walkthrough
          </button>
          <div className="flex items-center gap-2 text-sm text-indigo-200">
            <Clock3 size={15} />
            <span>7 steps, roughly 45–90 minutes end to end</span>
          </div>
        </div>
      </div>
    </div>
  );
}

function PageShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-950 text-slate-900 dark:text-slate-100 transition-colors duration-300">
      <ProgressBar />
      <Header onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 flex gap-8">
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 min-w-0 space-y-6">
          <Hero />
          <GuideContent />

          <footer className="pt-8 pb-16 border-t border-slate-200 dark:border-slate-800 text-center">
            <p className="text-xl font-semibold text-slate-900 dark:text-white">
              Now go ship something.
            </p>
<p className="text-xs mt-6 text-slate-400 dark:text-slate-600">
              Built by Shubham
            </p>
          </footer>
        </main>
      </div>
    </div>
  );
}

export default function Home() {
  return (
    <ThemeProvider>
      <PageShell />
    </ThemeProvider>
  );
}
