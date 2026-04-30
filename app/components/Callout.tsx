"use client";

import { Info, CheckCircle2, AlertTriangle, XOctagon } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type CalloutType = "info" | "success" | "warning" | "danger";

interface CalloutProps {
  type: CalloutType;
  label: string;
  children: React.ReactNode;
}

const calloutConfig: Record<
  CalloutType,
  { icon: React.ReactNode; bg: string; bgLight: string; border: string; labelColor: string; iconColor: string }
> = {
  info: {
    icon: <Info size={16} />,
    bg: "rgba(59,130,246,0.08)",
    bgLight: "rgba(59,130,246,0.06)",
    border: "rgba(59,130,246,0.3)",
    labelColor: "#60a5fa",
    iconColor: "#3b82f6",
  },
  success: {
    icon: <CheckCircle2 size={16} />,
    bg: "rgba(34,197,94,0.08)",
    bgLight: "rgba(34,197,94,0.06)",
    border: "rgba(34,197,94,0.3)",
    labelColor: "#4ade80",
    iconColor: "#22c55e",
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    bg: "rgba(245,158,11,0.08)",
    bgLight: "rgba(245,158,11,0.06)",
    border: "rgba(245,158,11,0.3)",
    labelColor: "#fbbf24",
    iconColor: "#f59e0b",
  },
  danger: {
    icon: <XOctagon size={16} />,
    bg: "rgba(239,68,68,0.08)",
    bgLight: "rgba(239,68,68,0.06)",
    border: "rgba(239,68,68,0.3)",
    labelColor: "#f87171",
    iconColor: "#ef4444",
  },
};

export function Callout({ type, label, children }: CalloutProps) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const cfg = calloutConfig[type];

  return (
    <div
      className="my-6 rounded-lg p-4"
      style={{
        backgroundColor: dark ? cfg.bg : cfg.bgLight,
        border: `1px solid ${cfg.border}`,
      }}
    >
      <div className="flex items-start gap-3">
        <span style={{ color: cfg.iconColor, marginTop: "2px", flexShrink: 0 }}>
          {cfg.icon}
        </span>
        <div>
          <p
            className="text-sm font-semibold mb-1"
            style={{ color: cfg.labelColor }}
          >
            {label}
          </p>
          <div
            className="text-sm leading-relaxed"
            style={{ color: dark ? "#C8C8CE" : "#3f3f46" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
