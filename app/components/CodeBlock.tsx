"use client";

import { useEffect, useState } from "react";
import { Copy, Check, Terminal, FileCode, Settings } from "lucide-react";
import { useTheme } from "./ThemeProvider";

type BlockType = "prompt" | "terminal" | "config";

interface CodeBlockProps {
  code: string;
  type?: BlockType;
  label?: string;
  editable?: boolean;
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

export function CodeBlock({
  code,
  type = "prompt",
  label,
  editable = true,
}: CodeBlockProps) {
  const [copied, setCopied] = useState(false);
  const [draft, setDraft] = useState(code);
  const { theme } = useTheme();
  const dark = theme === "dark";

  useEffect(() => {
    setDraft(code);
  }, [code]);

  const handleCopy = async () => {
    await navigator.clipboard.writeText(editable ? draft : code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const { label: defaultLabel, icon } = typeConfig[type];
  const displayLabel = label || defaultLabel;

  return (
    <div className="my-6 group">
      <div className="mb-2 flex items-center gap-1.5 text-slate-500 dark:text-slate-400">
        <span className="text-indigo-500 dark:text-indigo-400">{icon}</span>
        <span
          className="text-xs font-medium uppercase"
          style={{ fontFamily: "var(--font-sans)", letterSpacing: "0.08em" }}
        >
          {displayLabel}
        </span>
        {editable && (
          <span className="ml-2 text-[11px] text-slate-400 dark:text-slate-500">
            Edit in place before copying
          </span>
        )}
      </div>
      <div className="relative rounded-2xl border border-slate-200 dark:border-slate-700 bg-white dark:bg-slate-900 shadow-sm overflow-hidden">
        <button
          onClick={handleCopy}
          aria-label={copied ? "Copied!" : "Copy code"}
          className="absolute right-3 top-3 flex items-center gap-1.5 rounded-full px-2.5 py-1.5 text-xs font-medium transition-all duration-200 opacity-0 group-hover:opacity-100 focus-visible:opacity-100 bg-slate-100 dark:bg-slate-800 text-slate-500 dark:text-slate-400 hover:text-slate-700 dark:hover:text-slate-200"
          style={{ color: copied ? "#22c55e" : undefined }}
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
        {editable ? (
          <textarea
            aria-label={displayLabel}
            value={draft}
            onChange={(e) => setDraft(e.currentTarget.value)}
            spellCheck={false}
            className="code-block min-h-[280px] w-full resize-y bg-transparent p-5 pr-20 text-sm leading-relaxed md:p-6 md:pr-24 text-slate-800 dark:text-slate-200"
            style={{ lineHeight: "1.9" }}
          />
        ) : (
          <pre
            className="code-block overflow-x-auto p-5 text-sm leading-relaxed md:p-6 text-slate-800 dark:text-slate-200"
            style={{ lineHeight: "1.9", margin: 0, whiteSpace: "pre-wrap", wordBreak: "break-word" }}
          >
            <code>{code}</code>
          </pre>
        )}
      </div>
    </div>
  );
}
