"use client";

import { useState } from "react";
import { ThemeProvider, useTheme } from "./components/ThemeProvider";
import { ProgressBar } from "./components/ProgressBar";
import { Header } from "./components/Header";
import { Sidebar } from "./components/Sidebar";
import { GuideContent } from "./components/GuideContent";
import { ArrowDown, Zap } from "lucide-react";

function Hero() {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const handleStartReading = () => {
    const el = document.getElementById("intro");
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
  };

  return (
    <section
      className="hero-gradient relative flex flex-col items-center justify-center text-center px-6 py-24 lg:min-h-screen"
      aria-label="Introduction"
    >
      {/* Noise overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          background: dark
            ? "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.06) 0%, transparent 70%)"
            : "radial-gradient(ellipse 80% 60% at 50% 50%, rgba(99,102,241,0.08) 0%, transparent 70%)",
        }}
      />

      <div className="relative z-10 max-w-3xl mx-auto">
        {/* Eyebrow */}
        <div
          className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-medium mb-8 border"
          style={{
            backgroundColor: dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.08)",
            borderColor: "rgba(99,102,241,0.25)",
            color: "#818CF8",
          }}
        >
          <Zap size={11} />
          <span>Internal PM Playbook</span>
        </div>

        <h1
          className="font-extrabold mb-5 tracking-tight"
          style={{
            fontSize: "clamp(2.5rem, 7vw, 4.5rem)",
            color: dark ? "#E8E8EA" : "#18181B",
            lineHeight: 1.1,
            letterSpacing: "-0.03em",
          }}
        >
          From Idea to{" "}
          <span
            style={{
              background: "linear-gradient(135deg, #6366F1, #818CF8)",
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
              backgroundClip: "text",
            }}
          >
            Live Link
          </span>
        </h1>

        <p
          className="mb-10 max-w-2xl mx-auto"
          style={{
            fontSize: "clamp(1rem, 2.5vw, 1.25rem)",
            color: dark ? "#8A8A92" : "#71717A",
            lineHeight: "1.7",
          }}
        >
          A Product Manager&apos;s Guide to Building &amp; Deploying Prototypes
          with Claude Code and Vercel
        </p>

        {/* Meta callout */}
        <div
          className="inline-block text-left rounded-xl p-5 mb-10 max-w-lg w-full"
          style={{
            backgroundColor: dark ? "rgba(22,22,26,0.9)" : "rgba(255,255,255,0.9)",
            border: `1px solid ${dark ? "#2A2A32" : "#E4E4E7"}`,
            backdropFilter: "blur(8px)",
          }}
        >
          <div className="flex items-start gap-3">
            <div
              className="w-2 h-2 rounded-full mt-2 flex-shrink-0"
              style={{ backgroundColor: "#22c55e" }}
            />
            <p
              style={{
                color: dark ? "#C8C8CE" : "#3f3f46",
                fontSize: "0.9375rem",
                lineHeight: "1.65",
              }}
            >
              <strong style={{ color: dark ? "#E8E8EA" : "#18181B" }}>
                This guide was built using Claude Code and deployed on Vercel
              </strong>{" "}
              — using the exact 7 steps below. Total build time: under an hour.
            </p>
          </div>
        </div>

        <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
          <button
            onClick={handleStartReading}
            className="flex items-center gap-2 px-6 py-3 rounded-lg font-semibold text-sm transition-all duration-200"
            style={{
              backgroundColor: "#6366F1",
              color: "#FFFFFF",
            }}
            onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#818CF8")}
            onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.backgroundColor = "#6366F1")}
          >
            <span>Start reading</span>
            <ArrowDown size={15} />
          </button>

          <div
            className="text-sm"
            style={{ color: dark ? "#4A4A52" : "#A1A1AA" }}
          >
            7 steps · 45–90 min end-to-end
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2"
        style={{ color: dark ? "#4A4A52" : "#C4C4C8" }}
      >
        <div
          className="w-5 h-8 rounded-full border-2 flex items-start justify-center pt-1.5"
          style={{ borderColor: dark ? "#2A2A32" : "#E4E4E7" }}
        >
          <div
            className="w-1 h-1.5 rounded-full"
            style={{
              backgroundColor: "#6366F1",
              animation: "bounce 2s infinite",
            }}
          />
        </div>
      </div>
    </section>
  );
}

function PageShell() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { theme } = useTheme();
  const dark = theme === "dark";

  const bg = dark ? "#0A0A0B" : "#FAFAFA";
  const surfaceBg = dark ? "#16161A" : "#FFFFFF";
  const borderColor = dark ? "#2A2A32" : "#E4E4E7";
  const mutedText = dark ? "#4A4A52" : "#A1A1AA";
  const bodyText = dark ? "#C8C8CE" : "#3f3f46";

  return (
    <div style={{ backgroundColor: bg, minHeight: "100vh" }}>
      <ProgressBar />
      <Header onMenuClick={() => setMobileMenuOpen(true)} />

      <div className="flex min-h-screen pt-14">
        <Sidebar
          mobileOpen={mobileMenuOpen}
          onClose={() => setMobileMenuOpen(false)}
        />

        <main className="flex-1 min-w-0">
          <Hero />

          {/* Content area */}
          <div
            className="mx-auto px-6 py-16 lg:py-20"
            style={{ maxWidth: "760px" }}
          >
            <GuideContent />
          </div>

          {/* Footer */}
          <footer
            className="mx-auto px-6 pb-16 pt-8"
            style={{
              maxWidth: "760px",
              borderTop: `1px solid ${borderColor}`,
            }}
          >
            <p
              className="text-center italic text-lg font-medium"
              style={{ color: dark ? "#E8E8EA" : "#18181B" }}
            >
              Now go ship something.
            </p>
            <p
              className="text-center text-sm mt-3"
              style={{ color: mutedText }}
            >
              Last updated: April 30, 2026
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
