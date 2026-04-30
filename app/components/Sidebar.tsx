"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { id: "intro", label: "Introduction" },
  { id: "prerequisites", label: "Prerequisites" },
  { id: "step-1", label: "Step 1: Build with Claude Code" },
  { id: "step-2", label: "Step 2: Create GitHub Repo" },
  { id: "step-3", label: "Step 3: Connect to GitHub" },
  { id: "step-4", label: "Step 4: GitHub Auth (PAT)" },
  { id: "step-5", label: "Step 5: Commit & Push" },
  { id: "step-6", label: "Step 6: Sign Up for Vercel" },
  { id: "step-7", label: "Step 7: Deploy & Share" },
  { id: "troubleshooting", label: "Troubleshooting" },
  { id: "tips", label: "Pro Tips" },
];

interface SidebarProps {
  mobileOpen: boolean;
  onClose: () => void;
}

export function Sidebar({ mobileOpen, onClose }: SidebarProps) {
  const [activeId, setActiveId] = useState("intro");
  const { theme } = useTheme();
  const dark = theme === "dark";

  useEffect(() => {
    const sectionIds = navItems.map((n) => n.id);
    const observers: IntersectionObserver[] = [];

    const options = {
      root: null,
      rootMargin: "-20% 0px -60% 0px",
      threshold: 0,
    };

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (!el) return;
      const obs = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        });
      }, options);
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
    }
    onClose();
  };

  const sidebarBg = dark ? "#16161A" : "#FFFFFF";
  const borderColor = dark ? "#2A2A32" : "#E4E4E7";
  const textColor = dark ? "#8A8A92" : "#71717A";
  const activeTextColor = "#6366F1";
  const activeBg = dark ? "rgba(99,102,241,0.1)" : "rgba(99,102,241,0.08)";
  const hoverBg = dark ? "rgba(255,255,255,0.04)" : "rgba(0,0,0,0.04)";

  const sidebarContent = (
    <nav aria-label="Page sections">
      <div className="px-4 py-5">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: dark ? "#4A4A52" : "#A1A1AA", letterSpacing: "0.1em" }}
        >
          Contents
        </p>
        <ul className="space-y-0.5">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className="w-full text-left px-3 py-2 rounded-md text-sm transition-all duration-200"
                  style={{
                    color: isActive ? activeTextColor : textColor,
                    backgroundColor: isActive ? activeBg : "transparent",
                    fontWeight: isActive ? 500 : 400,
                  }}
                  onMouseEnter={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = hoverBg;
                      (e.currentTarget as HTMLElement).style.color = dark ? "#E8E8EA" : "#18181B";
                    }
                  }}
                  onMouseLeave={(e) => {
                    if (!isActive) {
                      (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                      (e.currentTarget as HTMLElement).style.color = textColor;
                    }
                  }}
                >
                  {item.label}
                </button>
              </li>
            );
          })}
        </ul>
      </div>
    </nav>
  );

  return (
    <>
      {/* Desktop sidebar */}
      <aside
        className="hidden lg:block sticky top-0 h-screen overflow-y-auto flex-shrink-0"
        style={{
          width: "240px",
          backgroundColor: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
        }}
        aria-label="Navigation"
      >
        <div className="pt-16">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden"
          onClick={onClose}
          style={{ backgroundColor: "rgba(0,0,0,0.6)" }}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className="fixed top-0 left-0 h-full z-50 lg:hidden overflow-y-auto"
        style={{
          width: "280px",
          backgroundColor: sidebarBg,
          borderRight: `1px solid ${borderColor}`,
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 200ms ease-out",
        }}
        aria-label="Navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b" style={{ borderColor }}>
          <span className="text-sm font-semibold" style={{ color: dark ? "#E8E8EA" : "#18181B" }}>
            Navigation
          </span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-md transition-colors duration-200"
            aria-label="Close navigation"
            style={{ color: textColor }}
            onMouseEnter={(e) => (e.currentTarget.style.backgroundColor = hoverBg)}
            onMouseLeave={(e) => (e.currentTarget.style.backgroundColor = "transparent")}
          >
            <X size={18} />
          </button>
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}
