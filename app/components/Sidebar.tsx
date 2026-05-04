"use client";

import { useEffect, useState } from "react";
import { X } from "lucide-react";
import { useTheme } from "./ThemeProvider";

const navItems = [
  { id: "intro", num: null, label: "Introduction", subtitle: "Why this guide exists" },
  { id: "prerequisites", num: null, label: "Prerequisites", subtitle: "One-time setup" },
  { id: "step-1", num: 1, label: "Build with Claude Code", subtitle: "Write your first prompt" },
  { id: "step-2", num: 2, label: "Create GitHub Repo", subtitle: "Cloud code storage" },
  { id: "step-3", num: 3, label: "Connect to GitHub", subtitle: "Link local to remote" },
  { id: "step-4", num: 4, label: "GitHub Auth (PAT)", subtitle: "Personal access token" },
  { id: "step-5", num: 5, label: "Commit & Push", subtitle: "Send to the cloud" },
  { id: "step-6", num: 6, label: "Sign Up for Vercel", subtitle: "Deployment platform" },
  { id: "step-7", num: 7, label: "Deploy & Share", subtitle: "Get your live link" },
  { id: "existing-repo", num: null, label: "Existing Repo Flow", subtitle: "Alternative path" },
  { id: "troubleshooting", num: null, label: "Troubleshooting", subtitle: "Common issues" },
  { id: "tips", num: null, label: "Pro Tips", subtitle: "Level up your prototypes" },
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
          if (entry.isIntersecting) setActiveId(id);
        });
      }, options);
      obs.observe(el);
      observers.push(obs);
    });

    return () => observers.forEach((o) => o.disconnect());
  }, []);

  const handleNavClick = (id: string) => {
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth", block: "start" });
    onClose();
  };

  const sidebarContent = (
    <nav aria-label="Page sections">
      <div className="px-3 py-5">
        <p className="text-xs font-semibold text-slate-400 dark:text-slate-500 uppercase tracking-widest px-3 mb-4">
          Guide Map
        </p>
        <ul className="space-y-1">
          {navItems.map((item) => {
            const isActive = activeId === item.id;
            return (
              <li key={item.id}>
                <button
                  onClick={() => handleNavClick(item.id)}
                  className={`sidebar-link w-full text-left ${
                    isActive
                      ? "bg-indigo-50 dark:bg-indigo-950/40 text-indigo-700 dark:text-indigo-300"
                      : "text-slate-600 dark:text-slate-400 hover:bg-slate-100 dark:hover:bg-slate-800/60 hover:text-slate-900 dark:hover:text-slate-200"
                  }`}
                >
                  <div
                    className={`w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold shrink-0 transition-colors ${
                      isActive
                        ? "bg-indigo-600 text-white"
                        : "bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400"
                    }`}
                  >
                    {item.num ?? (
                      <span className="w-1.5 h-1.5 rounded-full bg-current" />
                    )}
                  </div>
                  <div className="min-w-0">
                    <p className={`text-xs font-semibold truncate ${isActive ? "text-indigo-700 dark:text-indigo-300" : ""}`}>
                      {item.label}
                    </p>
                    <p className="text-xs text-slate-400 dark:text-slate-500 truncate mt-0.5">
                      {item.subtitle}
                    </p>
                  </div>
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
        className="hidden lg:block w-64 shrink-0"
        aria-label="Navigation"
      >
        <div className="sticky top-24 space-y-1">
          {sidebarContent}
        </div>
      </aside>

      {/* Mobile overlay */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-40 lg:hidden bg-black/60"
          onClick={onClose}
          aria-hidden="true"
        />
      )}

      {/* Mobile sidebar */}
      <aside
        className="fixed top-0 left-0 h-full z-50 lg:hidden overflow-y-auto bg-white dark:bg-slate-900 border-r border-slate-200 dark:border-slate-800"
        style={{
          width: "280px",
          transform: mobileOpen ? "translateX(0)" : "translateX(-100%)",
          transition: "transform 200ms ease-out",
        }}
        aria-label="Navigation"
        aria-hidden={!mobileOpen}
      >
        <div className="flex items-center justify-between px-4 pt-4 pb-2 border-b border-slate-200 dark:border-slate-800">
          <span className="text-sm font-semibold text-slate-900 dark:text-white">Navigation</span>
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg text-slate-500 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors"
            aria-label="Close navigation"
          >
            <X size={18} />
          </button>
        </div>
        {sidebarContent}
      </aside>
    </>
  );
}
