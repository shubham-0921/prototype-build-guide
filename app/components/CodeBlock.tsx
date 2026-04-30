"use client";

import { useState } from "react";
import { Copy, Check, Terminal, FileCode, Settings } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type BlockType = "prompt" | "terminal" | "config";

interface CodeBlockProps {
  code: string;
  type?: BlockType;
  label?: string;
}

const typeConfig: Record<BlockType, { label: string; icon: React.ReactNode }> = {
  prompt: {
    label: "Sample Prompt",
    icon: <FileCode size={13} />,
  },
  terminal: {
    label: "Terminal",
    icon: <Terminal size={13} />,
  },
  config: {
    label: "Configuration",
    icon: <Settings size={13} />,
  },
};

export function CodeBlock({ code, type = "prompt", label }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const { theme } = useTheme();
  const dark = theme === "dark";

  const handleCopy = async () => {
    await navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { label: defaultLabel, icon } = typeConfig[type];
  const displayLabel = label || defaultLabel;

  return (
    <div className="my-6 group">
      <div
        className="flex items-center gap-1.5 mb-2"
        style={{ color: dark ? "#8A8A92" : "#71717A" }}
      >
        <span style={{ color: "#6366F1" }}>{icon}</span>
        <span className="text-xs font-medium tracking-wide uppercase" style={{ fontFamily: "Inter, sans-serif", letterSpacing: "0.08em" }}>
          {displayLabel}
        </span>
      </div>
      <div
        className="relative rounded-lg border-l-[3px]"
        style={{
          borderLeftColor: "#6366F1",
          backgroundColor: dark ? "#1E1E24" : "#F4F4F8",
          border: `1px solid ${dark ? "#2A2A32" : "#E4E4E7"}`,
          borderLeft: "3px solid #6366F1",
        }}
      >
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied!" : "Copy code"}
          className="absolute top-3 right-3 flex items-center gap-1.5 px-2.5 py-1.5 rounded-md text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 focus-visible:opacity-100"
          style={{
            backgroundColor: dark ? "#2A2A32" : "#E4E4E7",
            color: copied ? "#22c55e" : dark ? "#8A8A92" : "#71717A",
          }}
        >
          {copied ? (
            <>
              <Check size={12} />
              <span>Copied!</span>
            </>
          ) : (
            <>
              <Copy size={12} />
              <span>Copy</span>
            </>
          )}
        </button>
        <pre
          className="code-block overflow-x-auto p-5 text-sm leading-relaxed"
          style={{
            color: dark ? "#E8E8EA" : "#18181B",
            fontFamily: "'JetBrains Mono', Menlo, monospace",
            lineHeight: "1.75",
            margin: 0,
            whiteSpace: "pre-wrap",
            wordBreak: "break-word",
          }}
        >
          <code>{code}</code>
        </pre>
      </div>
    </div>
  );
}
