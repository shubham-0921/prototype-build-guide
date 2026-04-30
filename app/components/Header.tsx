"use client";

import { Moon, Sun, Menu } from "lucide-react";
import { useTheme } from "./ThemeProvider";

interface HeaderProps {
  onMenuClick: () => void;
}

export function Header({ onMenuClick }: HeaderProps) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";

  const bg = dark ? "rgba(10,10,11,0.85)" : "rgba(250,250,250,0.85)";
  const border = dark ? "rgba(42,42,50,0.8)" : "rgba(228,228,231,0.8)";
  const textMuted = dark ? "#8A8A92" : "#71717A";
  const hoverBg = dark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)";

  return (
    <header
      className="fixed top-2 left-0 right-0 z-30 flex items-center justify-between px-4 lg:px-6 h-14"
      style={{
        backgroundColor: bg,
        backdropFilter: "blur(12px)",
        WebkitBackdropFilter: "blur(12px)",
        borderBottom: `1px solid ${border}`,
      }}
    >
      {/* Mobile menu button */}
      <button
        onClick={onMenuClick}
        className="lg:hidden p-2 rounded-md transition-colors duration-200"
        aria-label="Open navigation menu"
        style={{ color: textMuted }}
        onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
        onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
      >
        <Menu size={20} />
      </button>

      {/* Logo / title on mobile */}
      <span
        className="lg:hidden text-sm font-semibold truncate"
        style={{ color: dark ? "#E8E8EA" : "#18181B" }}
      >
        From Idea to Live Link
      </span>

      {/* Spacer for desktop */}
      <div className="hidden lg:block" />

      {/* Theme toggle */}
      <button
        onClick={toggle}
        className="flex items-center gap-2 px-3 py-1.5 rounded-md text-sm font-medium transition-all duration-200"
        aria-label={dark ? "Switch to light mode" : "Switch to dark mode"}
        style={{ color: textMuted }}
        onMouseEnter={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = hoverBg;
          (e.currentTarget as HTMLElement).style.color = dark ? "#E8E8EA" : "#18181B";
        }}
        onMouseLeave={(e) => {
          (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
          (e.currentTarget as HTMLElement).style.color = textMuted;
        }}
      >
        {dark ? <Sun size={16} /> : <Moon size={16} />}
        <span className="hidden sm:inline">{dark ? "Light mode" : "Dark mode"}</span>
      </button>
    </header>
  );
}
