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
  { icon: React.ReactNode; darkBg: string; lightBg: string; border: string; labelColor: string; iconColor: string; lightLabel: string }
> = {
  info: {
    icon: <Info size={16} />,
    darkBg: "rgba(14,165,233,0.1)",
    lightBg: "rgba(239,246,255,1)",
    border: "rgba(147,197,253,0.6)",
    labelColor: "#3b82f6",
    iconColor: "#3b82f6",
    lightLabel: "#1d4ed8",
  },
  success: {
    icon: <CheckCircle2 size={16} />,
    darkBg: "rgba(34,197,94,0.1)",
    lightBg: "rgba(240,253,244,1)",
    border: "rgba(134,239,172,0.6)",
    labelColor: "#16a34a",
    iconColor: "#22c55e",
    lightLabel: "#15803d",
  },
  warning: {
    icon: <AlertTriangle size={16} />,
    darkBg: "rgba(234,179,8,0.1)",
    lightBg: "rgba(254,252,232,1)",
    border: "rgba(253,224,71,0.5)",
    labelColor: "#ca8a04",
    iconColor: "#f59e0b",
    lightLabel: "#a16207",
  },
  danger: {
    icon: <XOctagon size={16} />,
    darkBg: "rgba(239,68,68,0.1)",
    lightBg: "rgba(254,242,242,1)",
    border: "rgba(252,165,165,0.6)",
    labelColor: "#dc2626",
    iconColor: "#ef4444",
    lightLabel: "#b91c1c",
  },
};

export function Callout({ type, label, children }: CalloutProps) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  const cfg = calloutConfig[type];

  return (
    <div
      className="my-8 rounded-2xl p-5"
      style={{
        backgroundColor: dark ? cfg.darkBg : cfg.lightBg,
        border: `1px solid ${cfg.border}`,
      }}
    >
      <div className="flex items-start gap-3">
        <span
          className="flex h-8 w-8 items-center justify-center rounded-xl flex-shrink-0"
          style={{
            color: cfg.iconColor,
            marginTop: "2px",
            backgroundColor: dark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.7)",
          }}
        >
          {cfg.icon}
        </span>
        <div>
          <p
            className="mb-1 text-sm font-semibold"
            style={{ color: dark ? cfg.labelColor : cfg.lightLabel }}
          >
            {label}
          </p>
          <div
            className="text-sm leading-7"
            style={{ color: dark ? "#CBD5E1" : "#334155" }}
          >
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
