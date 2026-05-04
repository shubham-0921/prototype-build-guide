"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { FadeSection } from "./FadeSection";
import { Hash, Monitor, Terminal } from "lucide-react";

function ExternalLink({ href, children }: { href: string; children: React.ReactNode }) {
  return (
    <a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="text-indigo-600 dark:text-indigo-400 hover:underline font-medium"
    >
      {children}
    </a>
  );
}

function SectionHeading({ id, children, level = 2 }: {
  id?: string;
  children: React.ReactNode;
  level?: 2 | 3;
}) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const handleClick = () => {
    if (id) window.location.hash = id;
  };

  if (level === 2) {
    return (
      <h2
        className="group mt-14 mb-5 flex items-center gap-2 font-semibold leading-tight"
        style={{ fontSize: "1.65rem", color: dark ? "#F8FAFC" : "#172033", letterSpacing: "-0.03em" }}
      >
        {children}
        {id && (
          <a href={`#${id}`} onClick={handleClick} className="anchor-link" aria-label="Link to section"
            style={{ color: dark ? "#818CF8" : "#4F46E5" }}>
            <Hash size={18} />
          </a>
        )}
      </h2>
    );
  }

  return (
    <h3
      className="group mt-10 mb-4 flex items-center gap-2 font-semibold leading-tight"
      style={{ fontSize: "1.18rem", color: dark ? "#F8FAFC" : "#172033" }}
    >
      {children}
      {id && (
        <a href={`#${id}`} onClick={handleClick} className="anchor-link" aria-label="Link to section"
          style={{ color: dark ? "#818CF8" : "#4F46E5" }}>
          <Hash size={15} />
        </a>
      )}
    </h3>
  );
}

function StepHeader({ n, title, id }: { n: number; title: string; id: string }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <div className="mb-8 pb-6 flex items-center gap-4 border-b border-slate-100 dark:border-slate-800" id={id}>
      <div
        className="w-10 h-10 rounded-xl flex items-center justify-center text-sm font-bold shrink-0"
        style={{
          backgroundColor: dark ? "rgba(99,102,241,0.18)" : "rgba(99,102,241,0.1)",
          color: dark ? "#818CF8" : "#4F46E5",
          border: `1px solid ${dark ? "rgba(99,102,241,0.3)" : "rgba(99,102,241,0.2)"}`,
        }}
      >
        {n}
      </div>
      <div>
        <p className="mb-1 text-xs font-semibold uppercase tracking-[0.24em]"
          style={{ color: dark ? "#818CF8" : "#4F46E5" }}>
          Step {n}
        </p>
        <h2 className="font-semibold"
          style={{ fontSize: "1.8rem", color: dark ? "#F8FAFC" : "#172033", lineHeight: 1.2, letterSpacing: "-0.03em" }}>
          {title}
        </h2>
      </div>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <div className="text-[1rem] md:text-[1.03rem]"
      style={{ color: dark ? "#CBD5E1" : "#334155", lineHeight: "1.9" }}>
      {children}
    </div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <ul className="my-5 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3.5">
          <span className="mt-3 h-2 w-2 flex-shrink-0 rounded-full"
            style={{ backgroundColor: dark ? "#818CF8" : "#4F46E5" }} />
          <span style={{ color: dark ? "#CBD5E1" : "#334155", lineHeight: "1.85" }}>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: React.ReactNode[] }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <ol className="my-5 space-y-3">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3.5">
          <span
            className="mt-0.5 flex h-6 w-6 flex-shrink-0 items-center justify-center rounded-full text-xs font-bold"
            style={{
              color: dark ? "#818CF8" : "#4F46E5",
              backgroundColor: dark ? "rgba(99,102,241,0.14)" : "rgba(99,102,241,0.1)",
              fontFamily: "var(--font-mono)",
            }}
          >
            {i + 1}
          </span>
          <span style={{ color: dark ? "#CBD5E1" : "#334155", lineHeight: "1.85" }}>{item}</span>
        </li>
      ))}
    </ol>
  );
}

function InlineCode({ children }: { children: string }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <code style={{
      fontFamily: "var(--font-mono)",
      fontSize: "0.875em",
      backgroundColor: dark ? "rgba(30,41,59,0.72)" : "rgba(241,245,249,0.9)",
      color: dark ? "#A5B4FC" : "#4F46E5",
      padding: "0.18em 0.48em",
      borderRadius: "999px",
      border: `1px solid ${dark ? "rgba(148,163,184,0.2)" : "rgba(99,102,241,0.18)"}`,
    }}>
      {children}
    </code>
  );
}

function DualCodeBlock({
  prompt, command, commandLabel, editablePrompt = false, editableCommand = false,
}: {
  prompt: string; command: string; commandLabel?: string;
  editablePrompt?: boolean; editableCommand?: boolean;
}) {
  const [showCode, setShowCode] = useState(false);
  const { theme } = useTheme();
  const dark = theme === "dark";

  const activeStyle = { backgroundColor: dark ? "#6366F1" : "#4F46E5", color: "#FFFFFF" };
  const inactiveStyle = {
    backgroundColor: dark ? "rgba(30,41,59,0.72)" : "rgba(255,255,255,0.9)",
    color: dark ? "#94A3B8" : "#64748B",
    border: `1px solid ${dark ? "rgba(148,163,184,0.18)" : "rgba(148,163,184,0.22)"}`,
  };

  return (
    <div className="my-8">
      <div className="mb-3 flex gap-2">
        <button onClick={() => setShowCode(false)}
          className="rounded-full px-3.5 py-2 text-xs font-medium transition-all duration-150"
          style={!showCode ? activeStyle : inactiveStyle}>
          Claude Prompt
        </button>
        <button onClick={() => setShowCode(true)}
          className="rounded-full px-3.5 py-2 text-xs font-medium transition-all duration-150"
          style={showCode ? activeStyle : inactiveStyle}>
          Terminal Command
        </button>
      </div>
      {showCode
        ? <CodeBlock type="terminal" code={command} label={commandLabel} editable={editableCommand} />
        : <CodeBlock type="prompt" code={prompt} editable={editablePrompt} />}
    </div>
  );
}

function CredentialHelper() {
  const [platform, setPlatform] = useState<"mac" | "windows" | "linux">("mac");
  const { theme } = useTheme();
  const dark = theme === "dark";

  const configs = {
    mac: {
      prompt: `Set up git credential caching on my Mac using the macOS Keychain so I don't have to paste my GitHub token on every push.`,
      command: `git config --global credential.helper osxkeychain`,
      label: "Mac Terminal",
      note: "After your next push, Mac saves the token in Keychain. Future pushes won't ask for it again.",
    },
    windows: {
      prompt: `Set up git credential caching on Windows using the Windows Credential Manager so I don't have to paste my GitHub token on every push.`,
      command: `git config --global credential.helper manager`,
      label: "Windows Terminal",
      note: "Windows stores the token in Credential Manager — same idea, nothing extra to set up after.",
    },
    linux: {
      prompt: `Set up git credential caching on Linux so I don't have to paste my GitHub token on every push. Cache it for 24 hours.`,
      command: `git config --global credential.helper "cache --timeout=86400"`,
      label: "Linux Terminal",
      note: "This keeps the token remembered for 24 hours. You'll need to paste it again after that.",
    },
  };

  const tabs = [
    { id: "mac" as const, label: "Mac" },
    { id: "windows" as const, label: "Windows" },
    { id: "linux" as const, label: "Linux" },
  ];

  const active = configs[platform];

  return (
    <div>
      <div className="flex gap-2 mb-4">
        {tabs.map((t) => (
          <button
            key={t.id}
            onClick={() => setPlatform(t.id)}
            className={`px-4 py-1.5 rounded-full text-xs font-semibold transition-all duration-150 ${
              platform === t.id
                ? "bg-indigo-600 text-white"
                : "bg-slate-100 dark:bg-slate-800 text-slate-600 dark:text-slate-400 hover:bg-slate-200 dark:hover:bg-slate-700"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>
      <DualCodeBlock prompt={active.prompt} command={active.command} commandLabel={active.label} />
      <p className="text-sm mt-2" style={{ color: dark ? "#94A3B8" : "#64748B" }}>{active.note}</p>
    </div>
  );
}

function ModeSelector() {
  const { theme, mode, setMode } = useTheme();
  const dark = theme === "dark";

  const activeCard = {
    backgroundColor: dark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
    border: "1px solid rgba(99,102,241,0.3)",
    color: dark ? "#F8FAFC" : "#172033",
  };
  const inactiveCard = {
    backgroundColor: dark ? "rgba(15,23,42,0.72)" : "rgba(255,255,255,0.9)",
    border: `1px solid ${dark ? "rgba(148,163,184,0.18)" : "rgba(148,163,184,0.22)"}`,
    color: dark ? "#94A3B8" : "#64748B",
    cursor: "pointer",
  };

  return (
    <div className="step-card p-6 mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: dark ? "#818CF8" : "#4F46E5" }}>
        Before you begin
      </p>
      <p className="mb-6 font-semibold"
        style={{ fontSize: "1.25rem", color: dark ? "#F8FAFC" : "#172033", letterSpacing: "-0.02em" }}>
        How will you use Claude Code?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button onClick={() => setMode("desktop")}
          className="flex items-start gap-4 rounded-[18px] p-5 text-left transition-all duration-150"
          style={mode === "desktop" ? activeCard : inactiveCard}>
          <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: mode === "desktop" ? "rgba(99,102,241,0.18)" : dark ? "rgba(30,41,59,0.9)" : "rgba(241,245,249,0.9)" }}>
            <Monitor size={18} style={{ color: mode === "desktop" ? "#818CF8" : dark ? "#64748B" : "#94A3B8" }} />
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold"
              style={{ color: mode === "desktop" ? (dark ? "#F8FAFC" : "#172033") : "inherit" }}>
              Claude Desktop App
            </p>
            <p className="text-xs leading-relaxed" style={{ color: dark ? "#94A3B8" : "#64748B" }}>
              Built-in Claude Code — click-to-run, no terminal needed
            </p>
          </div>
          {mode === "desktop" && (
            <span className="ml-auto flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: "rgba(99,102,241,0.16)", color: "#818CF8" }}>
              Selected
            </span>
          )}
        </button>

        <button onClick={() => setMode("terminal")}
          className="flex items-start gap-4 rounded-[18px] p-5 text-left transition-all duration-150"
          style={mode === "terminal" ? activeCard : inactiveCard}>
          <div className="mt-0.5 flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-2xl"
            style={{ backgroundColor: mode === "terminal" ? "rgba(99,102,241,0.18)" : dark ? "rgba(30,41,59,0.9)" : "rgba(241,245,249,0.9)" }}>
            <Terminal size={18} style={{ color: mode === "terminal" ? "#818CF8" : dark ? "#64748B" : "#94A3B8" }} />
          </div>
          <div>
            <p className="mb-1 text-sm font-semibold"
              style={{ color: mode === "terminal" ? (dark ? "#F8FAFC" : "#172033") : "inherit" }}>
              Terminal / CLI
            </p>
            <p className="text-xs leading-relaxed" style={{ color: dark ? "#94A3B8" : "#64748B" }}>
              Install Claude Code via npm and run it from your terminal
            </p>
          </div>
          {mode === "terminal" && (
            <span className="ml-auto flex-shrink-0 rounded-full px-2.5 py-1 text-xs font-semibold"
              style={{ backgroundColor: "rgba(99,102,241,0.16)", color: "#818CF8" }}>
              Selected
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

function PersonalizePanel() {
  const { theme, projectName, setProjectName, githubUsername, setGithubUsername } = useTheme();
  const dark = theme === "dark";

  const inputStyle = {
    backgroundColor: dark ? "rgba(15,23,42,0.72)" : "#ffffff",
    border: `1px solid ${dark ? "rgba(148,163,184,0.22)" : "rgba(203,213,225,0.9)"}`,
    color: dark ? "#E2E8F0" : "#172033",
  };

  return (
    <div className="step-card p-6 mb-6">
      <p className="mb-2 text-xs font-semibold uppercase tracking-[0.2em]"
        style={{ color: dark ? "#818CF8" : "#4F46E5" }}>
        Personalize this guide
      </p>
      <p className="mb-1 font-semibold"
        style={{ fontSize: "1.15rem", color: dark ? "#F8FAFC" : "#172033", letterSpacing: "-0.02em" }}>
        Fill these in once — they&apos;ll auto-update every code block below
      </p>
      <p className="mb-5 text-sm" style={{ color: dark ? "#94A3B8" : "#64748B" }}>
        No need to hunt for placeholders. Just enter your details here.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-slate-500 dark:text-slate-400">
            Project name
          </label>
          <input
            type="text"
            value={projectName}
            onChange={(e) => setProjectName(e.target.value.toLowerCase().replace(/\s+/g, "-").replace(/[^a-z0-9-]/g, ""))}
            placeholder="feedback-collector"
            className="w-full px-3 py-2.5 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
            style={inputStyle}
          />
          <p className="text-xs mt-1.5" style={{ color: dark ? "#64748B" : "#94A3B8" }}>
            Becomes your folder name, repo name, and Vercel URL
          </p>
        </div>
        <div>
          <label className="block text-xs font-semibold mb-1.5 text-slate-500 dark:text-slate-400">
            GitHub username
          </label>
          <input
            type="text"
            value={githubUsername}
            onChange={(e) => setGithubUsername(e.target.value.trim())}
            placeholder="your-github-username"
            className="w-full px-3 py-2.5 rounded-xl text-sm transition-colors focus:outline-none focus:ring-2 focus:ring-indigo-400"
            style={inputStyle}
          />
          <p className="text-xs mt-1.5" style={{ color: dark ? "#64748B" : "#94A3B8" }}>
            Your username on <ExternalLink href="https://github.com">github.com</ExternalLink>
          </p>
        </div>
      </div>
    </div>
  );
}

export function GuideContent() {
  const { theme, mode, projectName, githubUsername } = useTheme();
  const dark = theme === "dark";
  const textMain = dark ? "#F8FAFC" : "#172033";
  const textBody = dark ? "#CBD5E1" : "#334155";
  const surfaceBg = dark ? "rgba(30,41,59,0.5)" : "rgba(248,250,252,0.9)";
  const borderColor = dark ? "rgba(148,163,184,0.16)" : "rgba(226,232,240,0.9)";

  const repoName = projectName || "feedback-collector";
  const username = githubUsername || "your-username";
  const repoUrl = `https://github.com/${username}/${repoName}.git`;
  const vercelUrl = `https://${repoName}.vercel.app`;

  return (
    <article className="space-y-6" style={{ lineHeight: "1.75" }}>

      {/* ─── Mode + Personalize selectors ─── */}
      <ModeSelector />
      <PersonalizePanel />

      {/* ─── Introduction ─── */}
      <FadeSection id="intro" className="step-card p-6 md:p-9 scroll-mt-24">
        <h1 className="font-bold mb-4"
          style={{ fontSize: "2rem", color: textMain, lineHeight: 1.25 }}>
          Why this guide exists
        </h1>
        <Prose>
          <p className="mb-4">
            As Product Managers, we live in the gap between an idea and the engineering team&apos;s roadmap.
            The fastest way to close that gap is a working prototype — not a Figma mock, not a slide,
            but something a stakeholder can actually click on a real URL.
          </p>
          <p className="mb-4">
            This guide walks you through the full path: writing a prompt, getting Claude Code to build
            a working app on your machine, pushing it to GitHub (think of it as Google Drive for code),
            and deploying it to Vercel (a platform that turns your code into a live website) so anyone
            with the link can try it. Every step has exact prompts and commands you can copy.
          </p>
          <p className="mb-6 font-medium" style={{ color: textMain }}>
            Who this is for: PMs with little to no coding background. You will need access to Claude Code
            and a GitHub account. Beyond that, this guide assumes nothing.
          </p>
        </Prose>

        <SectionHeading level={2}>The seven-step flow at a glance</SectionHeading>
        <NumberedList items={[
          "Build a prototype using Claude Code locally and verify it opens in your browser.",
          "Create an empty storage space (repo) on github.com and copy its URL.",
          "Paste the URL into Claude Code and ask it to connect your local project to GitHub.",
          "If GitHub asks for authentication, create a Personal Access Token (like a one-time password).",
          "Ask Claude Code to save and upload your code to GitHub.",
          "Sign in to Vercel and connect it to your GitHub account.",
          "Vercel detects your project, deploys it, and gives you a permanent shareable link.",
        ]} />

        <Callout type="success" label="What you'll have at the end">
          A live URL like <InlineCode>{vercelUrl}</InlineCode> you can drop in Slack, send to a
          stakeholder, or include in a PRD. Every time you push new code, Vercel redeploys automatically.
        </Callout>
      </FadeSection>

      {/* ─── Prerequisites ─── */}
      <FadeSection id="prerequisites" className="step-card p-6 md:p-9 scroll-mt-24">
        <h2 className="font-bold mb-2"
          style={{ fontSize: "1.75rem", color: textMain, lineHeight: 1.25 }}>
          Before you start: one-time setup
        </h2>
        <Prose>
          <p className="mb-6">
            These only need to be set up once. If you&apos;ve done them before, skip ahead.
          </p>
        </Prose>

        {mode === "desktop" ? (
          <>
            <SectionHeading level={3}>1. Claude Desktop app installed</SectionHeading>
            <Prose>
              <p className="mb-3">
                Download the Claude Desktop app from <ExternalLink href="https://claude.ai/download">claude.ai/download</ExternalLink> and install it.
                Sign in with your Anthropic account. Claude Code is built right into the app — no terminal or coding tools required.
              </p>
              <p className="mb-4">
                Once installed, open the app and look for the <strong>Claude Code</strong> icon in the
                left sidebar (it looks like a terminal with a &gt;_ symbol). That&apos;s where all your
                sessions will live.
              </p>
            </Prose>
            <Callout type="info" label="Don't have an Anthropic account?">
              Sign up at <ExternalLink href="https://claude.ai">claude.ai</ExternalLink> — a free account works for prototyping. You&apos;ll
              need a paid plan for extended sessions or heavier usage.
            </Callout>
          </>
        ) : (
          <>
            <SectionHeading level={3}>1. Claude Code installed</SectionHeading>
            <Prose>
              <p className="mb-3">
                Claude Code runs in your Mac Terminal or Windows PowerShell. Open it and run:
              </p>
            </Prose>
            <CodeBlock type="terminal" code={`npm install -g @anthropic-ai/claude-code`} />
            <Prose><p className="mb-3">Then confirm it worked:</p></Prose>
            <CodeBlock type="terminal" code={`claude --version`} />
            <Callout type="info" label="Getting a 'npm not found' error?">
              You need to install Node.js first — it&apos;s the engine Claude Code runs on. Download the LTS installer from{" "}
              <ExternalLink href="https://nodejs.org">nodejs.org</ExternalLink>, run it, restart your terminal, then try again.
            </Callout>
          </>
        )}

        <SectionHeading level={3}>2. A GitHub account</SectionHeading>
        <Prose>
          <p className="mb-4">
            GitHub is like Google Drive for code — it stores your project online and makes it accessible
            to Vercel for deployment. Sign up at <ExternalLink href="https://github.com">github.com</ExternalLink> if you don&apos;t have one.
            Use your work email if your team plans to share repos.
          </p>
        </Prose>

        <SectionHeading level={3}>3. Git installed on your computer</SectionHeading>
        <Prose>
          <p className="mb-3">
            Git is the tool that tracks changes to your code and syncs it to GitHub. Think of it like
            &quot;track changes&quot; for code.{" "}
            {mode === "desktop"
              ? <>Claude Desktop uses git under the hood for all GitHub operations, so it still needs to be installed. Open <strong>Terminal</strong> (macOS) or <strong>PowerShell</strong> (Windows) once to verify:</>
              : <>Most Macs come with it pre-installed. To check, open Terminal and run:</>
            }
          </p>
        </Prose>
        <CodeBlock type="terminal" code={`git --version`} />
        <Prose>
          <p className="mb-3">
            You should see something like <InlineCode>git version 2.39.3</InlineCode>. Any version number
            means you&apos;re good to go.
          </p>
          <p className="mb-4">
            If you see <strong>&quot;command not found&quot;</strong> instead:
          </p>
        </Prose>
        <BulletList items={[
          <span key="mac"><strong style={{ color: textMain }}>Mac:</strong> Run <InlineCode>xcode-select --install</InlineCode> in Terminal. A popup will guide you through the install.</span>,
          <span key="win"><strong style={{ color: textMain }}>Windows:</strong> Download and run the installer from <ExternalLink href="https://git-scm.com">git-scm.com</ExternalLink>. Use all default settings.</span>,
        ]} />

        <SectionHeading level={3}>4. A code editor (optional but helpful)</SectionHeading>
        <Prose>
          <p className="mb-4">
            You won&apos;t write code by hand, but having <ExternalLink href="https://code.visualstudio.com">VS Code</ExternalLink> installed lets
            you peek at what Claude built and understand the project structure. It&apos;s free and widely used.
          </p>
        </Prose>
      </FadeSection>

      {/* ─── Step 1 ─── */}
      <FadeSection className="step-card p-6 md:p-9 scroll-mt-24">
        <StepHeader n={1} title="Build a prototype with Claude Code" id="step-1" />
        <Prose>
          <p className="mb-6">
            This is where the magic happens. You describe the prototype you want in plain English;
            Claude Code writes all the code, runs it, and shows it to you in your browser — no coding
            knowledge needed.
          </p>
        </Prose>

        <SectionHeading level={3}>1.1 Create a project folder and start a session</SectionHeading>

        {mode === "desktop" ? (
          <>
            <Prose>
              <p className="mb-3">
                In Claude Desktop, open Claude Code from the sidebar and create a new project.
              </p>
            </Prose>
            <NumberedList items={[
              <span key="1">Open <strong>Claude Desktop</strong> and click the <strong>Claude Code</strong> icon (&gt;_) in the left sidebar.</span>,
              <span key="2">Click <strong>&quot;New Project&quot;</strong> (or the + button).</span>,
              <span key="3">A file picker opens. Navigate to where you keep your work and create a new folder called <InlineCode>{repoName}</InlineCode>. Select it.</span>,
              "You're now in a Claude Code session — type your requests on the left, see your project files on the right.",
            ]} />
            <Callout type="info" label="Why the folder name matters">
              Use lowercase with dashes and no spaces — this name will become your GitHub repo name
              and your Vercel URL. If you filled in &quot;Project name&quot; above, use <InlineCode>{repoName}</InlineCode>.
            </Callout>
          </>
        ) : (
          <>
            <Prose>
              <p className="mb-3">
                Open Terminal and run these three commands one by one. The first creates your project folder,
                the second enters it, the third starts Claude Code:
              </p>
            </Prose>
            <CodeBlock type="terminal" code={`mkdir ${repoName}\ncd ${repoName}\nclaude`} />
            <Prose>
              <p className="mb-6">
                Your terminal prompt will change to show you&apos;re now inside a Claude Code session.
                Type your request and Claude will respond.
              </p>
            </Prose>
          </>
        )}

        <SectionHeading level={3}>1.2 Write a clear first prompt</SectionHeading>
        <Prose>
          <p className="mb-3">
            The clearer your description, the better the prototype. A good prompt has four parts:
          </p>
        </Prose>
        <BulletList items={[
          <span key="1"><strong style={{ color: textMain }}>What it is</strong> — one sentence describing the product.</span>,
          <span key="2"><strong style={{ color: textMain }}>Who it&apos;s for</strong> — the user and the context they&apos;d use it in.</span>,
          <span key="3"><strong style={{ color: textMain }}>Core features</strong> — the 3–5 things it absolutely must do.</span>,
          <span key="4"><strong style={{ color: textMain }}>Tech stack: Next.js</strong> — saying this ensures Vercel deployment works with zero friction later.</span>,
        ]} />

        <CodeBlock
          type="prompt"
          code={`Build a working prototype called "Feedback Collector".

What it is: a single-page web app where users can submit
anonymous product feedback and see all submitted feedback
below the form in real time.

Who it's for: PMs collecting quick reactions from their team
during a feature review.

Features:
1. A text area to type feedback (max 500 chars).
2. A dropdown to tag the feedback as Bug / Idea / Praise.
3. A Submit button that adds the entry to a list below.
4. The list shows newest feedback first, with the tag as a
   colored pill and a relative timestamp (e.g. "2 mins ago").
5. Persist feedback in localStorage so it survives a refresh.

Tech stack: Next.js with the App Router and Tailwind CSS.
Make it look polished — clean typography, good spacing, a
soft neutral background, and one accent color.

Once it's built, run the dev server and tell me the URL.`}
        />

        <Callout type="info" label="Why Next.js specifically?">
          Vercel is built by the same team that created Next.js, so it detects and deploys Next.js projects
          automatically — no extra setup. Asking for any other framework still works, but adds one
          configuration step.
        </Callout>

        <SectionHeading level={3}>1.3 Let Claude Code do its thing</SectionHeading>
        <Prose><p className="mb-3">Claude Code will walk through several stages automatically:</p></Prose>
        <BulletList items={[
          <span key="1">Set up the project structure and install everything it needs. This can take 2–5 minutes.</span>,
          "Write the page, components, and styles based on your prompt.",
          <span key="3">Ask for your permission before running anything — click <strong style={{ color: textMain }}>Allow</strong> or type <strong style={{ color: textMain }}>yes</strong> when prompted.</span>,
          <span key="4">Start a local preview server and share a URL like <InlineCode>http://localhost:3000</InlineCode>.</span>,
        ]} />

        <SectionHeading level={3}>1.4 Check it in your browser</SectionHeading>
        <Prose>
          <p className="mb-3">
            {mode === "desktop"
              ? <>Claude Desktop will open a browser preview automatically when the dev server starts. If it doesn&apos;t, click the preview link in the session or open <ExternalLink href="http://localhost:3000">http://localhost:3000</ExternalLink> manually. Click through the prototype like a real user would.</>
              : <>Open <ExternalLink href="http://localhost:3000">http://localhost:3000</ExternalLink> in your browser (Chrome, Safari, or Edge). Click through the prototype like a real user would.</>
            }
          </p>
          <p className="mb-2 font-medium" style={{ color: textMain }}>Quick checklist before moving on:</p>
        </Prose>
        <BulletList items={[
          "The page loads without a blank screen or error message.",
          "The features you asked for actually work.",
          "Nothing in the terminal or chat shows a red error.",
        ]} />

        <SectionHeading level={3}>1.5 Iterate until it looks right</SectionHeading>
        <Prose>
          <p className="mb-4">
            Most PMs skip this step and regret it. Give Claude two or three rounds of feedback —
            treat it like giving design notes to a teammate.
          </p>
        </Prose>
        <CodeBlock type="prompt" label="Sample Iteration Prompt"
          code={`The submit button is too small and the form feels cramped.
Increase padding everywhere, make the button full-width on
mobile, and add a subtle hover state.`} />
        <CodeBlock type="prompt" label="Sample Iteration Prompt"
          code={`Add an empty state for when there's no feedback yet — a
centered illustration or icon and the text "No feedback yet.
Be the first to share!"`} />
        <CodeBlock type="prompt" label="Sample Iteration Prompt"
          code={`The Bug pill should be red, Idea should be blue, Praise should
be green. Use soft pastel backgrounds with darker text for
readability.`} />

        {mode === "terminal" ? (
          <Callout type="warning" label="Stop the preview before moving on">
            Press <InlineCode>Ctrl+C</InlineCode> in the terminal to stop the local server. You don&apos;t
            need it running for the GitHub and deployment steps.
          </Callout>
        ) : (
          <Callout type="info" label="Finished reviewing the prototype?">
            You can leave the preview running — Claude Desktop manages it for you. Just move on to the
            next step when you&apos;re happy with how it looks.
          </Callout>
        )}
      </FadeSection>

      {/* ─── Step 2 ─── */}
      <FadeSection className="step-card p-6 md:p-9 scroll-mt-24">
        <StepHeader n={2} title="Create a GitHub repository" id="step-2" />
        <Prose>
          <p className="mb-6">
            GitHub stores your code in the cloud. Think of it like Google Drive, but for code files.
            Vercel will read from GitHub to know what to deploy — so this step is required.
          </p>
        </Prose>

        <SectionHeading level={3}>2.1 Create the repo</SectionHeading>
        <NumberedList items={[
          <span key="1">Go to <ExternalLink href="https://github.com">github.com</ExternalLink> and sign in.</span>,
          <span key="2">Click the <strong>&quot;+&quot;</strong> icon in the top-right corner → <strong>&quot;New repository&quot;</strong>.</span>,
          <span key="3">Repository name: <InlineCode>{repoName}</InlineCode> (use the same name as your local folder — lowercase, dashes, no spaces).</span>,
          <span key="4">Description: optional. Something like <em>&quot;Internal feedback prototype.&quot;</em></span>,
          <span key="5">Visibility: <strong>Private</strong> is the safe default for internal work. You can make it Public later.</span>,
          <span key="6"><strong>Important:</strong> leave all &quot;Initialize this repository&quot; checkboxes <strong>unchecked</strong>. Don&apos;t add a README, .gitignore, or license — Claude Code will create those for you.</span>,
          <span key="7">Click <strong>&quot;Create repository&quot;</strong>.</span>,
        ]} />

        <SectionHeading level={3}>2.2 Copy the repo URL</SectionHeading>
        <Prose>
          <p className="mb-3">
            GitHub shows a setup page. Copy the URL at the top — it looks like this:
          </p>
        </Prose>
        <CodeBlock type="terminal" code={repoUrl} />
        <Prose>
          <p className="mb-6">Click the copy icon next to it, or select all and copy. Keep it on your clipboard for the next step.</p>
        </Prose>

        <Callout type="info" label="Why leave the repo empty?">
          If GitHub creates a README for you, your local project and the GitHub repo will have different
          starting points, and the upload (push) in Step 5 will fail. Empty repo = clean connection.
        </Callout>
      </FadeSection>

      {/* ─── Step 3 ─── */}
      <FadeSection className="step-card p-6 md:p-9 scroll-mt-24">
        <StepHeader n={3} title="Connect Claude Code to your GitHub repo" id="step-3" />
        <Prose>
          <p className="mb-6">
            Now we tell Claude Code where to send the code. Go back to your Claude Code session and paste this prompt.
          </p>
        </Prose>

        <SectionHeading level={3}>3.1 Paste this prompt</SectionHeading>
        <CodeBlock
          type="prompt"
          code={`I've created a GitHub repo for this project. Connect this
local folder to that remote repo.

Repo URL: ${repoUrl}

Set up git, add a .gitignore for a Next.js project, make an
initial commit with all the project files, and configure
the remote. Don't push yet — I want to verify first.`}
        />
        <Prose>
          <p className="mb-6">Claude Code will take care of the technical setup automatically.</p>
        </Prose>

        <SectionHeading level={3}>3.2 What Claude Code will do</SectionHeading>
        <BulletList items={[
          "Turn on version tracking (git) in your project folder.",
          <span key="gi">Create a list of files to exclude from GitHub — things like downloaded packages that don&apos;t need to be uploaded (<InlineCode>.gitignore</InlineCode>).</span>,
          "Take a snapshot of all your project files (initial commit).",
          "Link your local folder to the GitHub repo you just created.",
          "Stop and wait for you to confirm before uploading anything.",
        ]} />

        <SectionHeading level={3}>3.3 Quick sanity check</SectionHeading>
        <Prose><p className="mb-3">Ask Claude to confirm everything looks right:</p></Prose>
        <CodeBlock type="prompt" code={`Show me the git status and confirm the remote is set correctly.`} />
        <Prose>
          <p className="mb-4">
            You should see: &quot;nothing to commit, working tree clean&quot; and a remote pointing
            to <InlineCode>{repoUrl}</InlineCode>.
          </p>
        </Prose>
      </FadeSection>

      {/* ─── Step 4 ─── */}
      <FadeSection className="step-card p-6 md:p-9 scroll-mt-24">
        <StepHeader n={4} title="Set up GitHub authentication" id="step-4" />
        <Prose>
          <p className="mb-4">
            When you upload code to GitHub, it needs to confirm you&apos;re authorized. Passwords no
            longer work for this — GitHub requires a <strong>Personal Access Token (PAT)</strong>. Think
            of it as a special app-specific password that you create once and GitHub remembers.
          </p>
        </Prose>

        <Callout type="info" label="Already pushed to GitHub before? Skip this.">
          If you&apos;ve ever pushed code to GitHub from this computer, or you have GitHub Desktop
          signed in, your auth is probably already set up. Try Step 5 first — if the push works,
          come back here only if you see an &quot;authentication failed&quot; error.
        </Callout>

        <SectionHeading level={3}>4.1 Create the token on GitHub</SectionHeading>
        <NumberedList items={[
          <span key="1">Go to <ExternalLink href="https://github.com/settings/tokens">github.com → Settings → Developer settings → Personal access tokens → Tokens (classic)</ExternalLink>.</span>,
          <span key="2">Click <strong>&quot;Generate new token (classic)&quot;</strong>. You may need to confirm your password.</span>,
          <span key="3"><strong>Note (name):</strong> something memorable like <em>&quot;Claude Code – my laptop&quot;</em>.</span>,
          <span key="4"><strong>Expiration:</strong> 90 days is a safe balance — not forever, but not too short.</span>,
          <span key="5"><strong>Scopes:</strong> check <InlineCode>repo</InlineCode> only. That gives Claude Code read and write access to your repositories.</span>,
          <span key="6">Click <strong>&quot;Generate token&quot;</strong> at the bottom.</span>,
        ]} />

        <Callout type="danger" label="Save the token NOW — you won't see it again">
          GitHub shows your token only once. Copy it and paste it somewhere safe immediately —
          your password manager, Notes app, or anywhere you can retrieve it. If you close the page
          before saving, you&apos;ll need to delete it and create a new one.
        </Callout>

        <SectionHeading level={3}>4.2 Enter the token when GitHub asks</SectionHeading>
        {mode === "desktop" ? (
          <>
            <Prose>
              <p className="mb-3">
                When Claude Desktop runs <InlineCode>git push</InlineCode> on your behalf and GitHub
                asks for credentials, the prompt will appear inside the Claude Code session window —
                not in a separate terminal. It will look like a question asking for your username and
                password. Type your GitHub username, then paste your PAT as the password.
              </p>
            </Prose>
            <Callout type="info" label="Can't see what you're typing? That's normal.">
              Claude Desktop hides the token as you type — you won&apos;t see any characters appear.
              Just paste your token and press Enter.
            </Callout>
          </>
        ) : (
          <>
            <Prose>
              <p className="mb-3">
                When you push in Step 5, GitHub will prompt you for credentials in the terminal:
              </p>
            </Prose>
            <CodeBlock type="terminal"
              code={`Username for 'https://github.com': ${username}\nPassword for 'https://${username}@github.com': <paste your PAT here>`} />
            <Callout type="info" label="Can't see what you're typing? That's normal.">
              Terminals hide passwords as you type — you won&apos;t see any characters appear.
              Just paste your token and press Enter.
            </Callout>
          </>
        )}

        <SectionHeading level={3}>4.3 Make Git remember your token (recommended)</SectionHeading>
        <Prose>
          <p className="mb-4">
            {mode === "desktop"
              ? <>Run this once in <strong>Terminal</strong> (macOS) or <strong>PowerShell</strong> (Windows) — separate from Claude Desktop — and git will remember your token for future pushes. Pick your operating system:</>
              : <>Run this once and you&apos;ll never have to paste the token again. Pick your operating system:</>
            }
          </p>
        </Prose>
        <CredentialHelper />

        <Callout type="warning" label="Token expires in 90 days">
          When it expires, pushes will start failing with &quot;authentication failed.&quot; Just go
          back to Step 4.1, generate a fresh token, paste it on the next push, and you&apos;re back.
        </Callout>
      </FadeSection>

      {/* ─── Step 5 ─── */}
      <FadeSection className="step-card p-6 md:p-9 scroll-mt-24">
        <StepHeader n={5} title="Commit and push to GitHub" id="step-5" />
        <Prose>
          <p className="mb-6">
            &quot;Committing&quot; means saving a snapshot of your code. &quot;Pushing&quot; means
            uploading that snapshot to GitHub. These two steps together are how code travels from
            your computer to the cloud.
          </p>
        </Prose>

        <SectionHeading level={3}>5.1 Paste this prompt</SectionHeading>
        <CodeBlock
          type="prompt"
          code={`Push the project to GitHub now. Use the main branch.
If git asks for credentials, I'll handle that — just run
the push and show me the output.`}
        />

        <SectionHeading level={3}>5.2 What happens</SectionHeading>
        <BulletList items={[
          "Claude Code runs the upload command to send your code to GitHub.",
          "Git may prompt for your username and token — see Step 4.2 if it does.",
          <span key="3">You&apos;ll see upload progress, then a success line: <em>&quot;Branch &apos;main&apos; set up to track &apos;origin/main&apos;.&quot;</em></span>,
        ]} />

        <SectionHeading level={3}>5.3 Verify on GitHub</SectionHeading>
        <Prose>
          <p className="mb-6">
            Go to <ExternalLink href={`https://github.com/${username}/${repoName}`}>your repo on GitHub</ExternalLink> and
            refresh the page. You should see your project files — <InlineCode>package.json</InlineCode>, the <InlineCode>app</InlineCode> folder, and so on.
            The message &quot;This branch is up to date with main&quot; confirms everything uploaded cleanly.
          </p>
        </Prose>

        <SectionHeading level={3}>5.4 Future updates</SectionHeading>
        <Prose><p className="mb-3">Every time you make changes with Claude Code, use this prompt:</p></Prose>
        <CodeBlock type="prompt"
          code={`Commit these changes with a clear message describing what changed, then push to GitHub.`} />
        <Callout type="success" label="Auto-redeploy from here on">
          Once Vercel is connected (Step 6 and 7), every push automatically triggers a new deployment.
          Your live URL updates without you lifting a finger.
        </Callout>
      </FadeSection>

      {/* ─── Step 6 ─── */}
      <FadeSection className="step-card p-6 md:p-9 scroll-mt-24">
        <StepHeader n={6} title="Sign up for Vercel and connect GitHub" id="step-6" />
        <Prose>
          <p className="mb-6">
            Vercel takes the code in your GitHub repo, builds it, and serves it on a public URL — for free.
            The free Hobby plan is more than enough for prototypes and internal demos.
          </p>
        </Prose>

        <SectionHeading level={3}>6.1 Create your Vercel account</SectionHeading>
        <NumberedList items={[
          <span key="1">Go to <ExternalLink href="https://vercel.com/signup">vercel.com/signup</ExternalLink>.</span>,
          <span key="2">Click <strong>&quot;Continue with GitHub&quot;</strong> — this links both accounts in one step.</span>,
          "Authorize Vercel to access your GitHub when prompted.",
          <span key="4">Pick the <strong>Hobby (free)</strong> plan. It&apos;s all you need for prototypes.</span>,
        ]} />

        <SectionHeading level={3}>6.2 Grant Vercel access to your repo</SectionHeading>
        <Prose>
          <p className="mb-3">
            Vercel asks which GitHub repos it can deploy. Two options:
          </p>
        </Prose>
        <BulletList items={[
          <span key="1"><strong style={{ color: textMain }}>All repositories</strong> — easiest, but Vercel can see your entire account.</span>,
          <span key="2"><strong style={{ color: textMain }}>Only select repositories</strong> — more secure. Pick this and select only <InlineCode>{repoName}</InlineCode>. You can always add more later.</span>,
        ]} />
        <Prose>
          <p className="mb-4">
            For work projects, &quot;Only select repositories&quot; is the right call.
          </p>
        </Prose>
        <Callout type="info" label="If you missed the prompt">
          Go to <ExternalLink href="https://github.com/settings/installations">GitHub → Settings → Applications → Vercel → Configure</ExternalLink> to adjust repo access.
        </Callout>
      </FadeSection>

      {/* ─── Step 7 ─── */}
      <FadeSection className="step-card p-6 md:p-9 scroll-mt-24">
        <StepHeader n={7} title="Deploy and get your shareable link" id="step-7" />
        <Prose>
          <p className="mb-6">
            This is the payoff. Click Deploy, wait two minutes, and walk away with a URL.
          </p>
        </Prose>

        <SectionHeading level={3}>7.1 Import the project</SectionHeading>
        <NumberedList items={[
          <span key="1">In your <ExternalLink href="https://vercel.com/dashboard">Vercel dashboard</ExternalLink>, click <strong>&quot;Add New…&quot;</strong> → <strong>&quot;Project&quot;</strong>.</span>,
          <span key="2">Find <InlineCode>{repoName}</InlineCode> in the list and click <strong>&quot;Import&quot;</strong>.</span>,
        ]} />

        <SectionHeading level={3}>7.2 Configure (almost nothing needed)</SectionHeading>
        <Prose>
          <p className="mb-3">
            Vercel auto-detects Next.js and pre-fills everything:
          </p>
        </Prose>
        <BulletList items={[
          <span key="1"><strong style={{ color: textMain }}>Framework Preset:</strong> Next.js</span>,
          <span key="2"><strong style={{ color: textMain }}>Build Command:</strong> <InlineCode>next build</InlineCode> (auto-filled)</span>,
          <span key="3"><strong style={{ color: textMain }}>Output Directory:</strong> <InlineCode>.next</InlineCode> (auto-filled)</span>,
          <span key="4"><strong style={{ color: textMain }}>Install Command:</strong> <InlineCode>npm install</InlineCode> (auto-filled)</span>,
        ]} />
        <Prose>
          <p className="mb-4">Leave all of it as-is. Just click <strong>&quot;Deploy&quot;</strong>.</p>
        </Prose>
        <Callout type="info" label="Not using Next.js?">
          Vercel auto-detects most frameworks (Vite, plain HTML, SvelteKit, etc.). Only change settings
          if Vercel specifically asks you to.
        </Callout>

        <SectionHeading level={3}>7.3 Watch it build</SectionHeading>
        <Prose>
          <p className="mb-6">
            Vercel shows live logs. The first deploy takes 1–3 minutes. When it finishes, you&apos;ll
            see a celebration screen with confetti and a preview of your live site.
          </p>
        </Prose>

        <SectionHeading level={3}>7.4 Your shareable link</SectionHeading>
        <Prose>
          <p className="mb-3">
            Click &quot;Continue to Dashboard.&quot; Your permanent URL will be:
          </p>
        </Prose>
        <CodeBlock type="terminal" code={vercelUrl} />
        <Prose>
          <p className="mb-6">
            (Vercel may add a suffix if the name is taken — <InlineCode>{`${repoName}-${username}.vercel.app`}</InlineCode>, etc.)
            This URL is permanent. Share it in Slack, drop it in your PRD, demo it on a call — it
            works on any device, anywhere.
          </p>
        </Prose>

        <SectionHeading level={3}>7.5 Custom domain (optional)</SectionHeading>
        <Prose>
          <p className="mb-6">
            Want a URL like <InlineCode>prototype.yourcompany.com</InlineCode>? Go to
            <strong> Project Settings → Domains</strong> in your Vercel dashboard. You&apos;ll need to
            own the domain — your IT team can help with the DNS settings.
          </p>
        </Prose>

        <SectionHeading level={3}>7.6 Every push auto-redeploys</SectionHeading>
        <Prose>
          <p className="mb-6">
            From now on, every time you push to GitHub (using the prompt from Step 5.4), Vercel
            automatically builds and redeploys. Each deployment also gets a separate preview URL, so
            you can share work-in-progress without touching your main link.
          </p>
        </Prose>

        <Callout type="success" label="You're done!">
          Idea → prototype → live URL, without writing a single line of code by hand.
          Drop the link to a stakeholder and watch their reaction.
        </Callout>
      </FadeSection>

      {/* ─── Alternative Flow ─── */}
      <FadeSection id="existing-repo" className="step-card p-6 md:p-9 scroll-mt-24">
        <h2 className="font-bold mb-4"
          style={{ fontSize: "1.75rem", color: textMain, lineHeight: 1.25 }}>
          Alternative: start from an existing repo
        </h2>
        <Prose>
          <p className="mb-4">
            Sometimes you&apos;re not starting from scratch. A teammate has shared a codebase, or you
            want Claude Code to improve an existing prototype instead of building a new one.
          </p>
          <p className="mb-6">
            In that case, skip Steps 1–3 above and use this path instead. Give Claude Code the GitHub
            repo link and let it clone the project, install everything, and run it on your machine.
          </p>
        </Prose>

        <Callout type="info" label="When to use this path">
          Use this when the project already exists on GitHub and you want Claude Code to clone it,
          set it up locally, run it, and explain the app structure before you start making changes.
        </Callout>

        <SectionHeading level={3}>How to do it</SectionHeading>
        {mode === "desktop" ? (
          <>
            <Prose>
              <p className="mb-3">
                In Claude Desktop, open a fresh Claude Code session. You don&apos;t need to clone the
                repo yourself — just give Claude the URL and it handles everything.
              </p>
            </Prose>
            <NumberedList items={[
              <span key="1">Open <strong>Claude Desktop</strong> → <strong>Claude Code</strong>.</span>,
              "Start a new session.",
              "Paste the prompt below, replacing the repo URL and local folder path.",
              "Approve the steps Claude asks to run — it will clone, install, configure, and start the app.",
            ]} />
          </>
        ) : (
          <>
            <Prose>
              <p className="mb-3">
                Open Claude Code in Terminal. You don&apos;t need to be inside the repo — the prompt
                will ask Claude to clone it for you first.
              </p>
            </Prose>
            <CodeBlock type="terminal" code={`claude`} />
            <Prose>
              <p className="mb-4">
                Then paste the prompt below as your first message.
              </p>
            </Prose>
          </>
        )}

        <DualCodeBlock
          prompt={`Clone this GitHub repository and get it running locally for me:

Repo URL: https://github.com/your-company/your-repo.git
Local folder: /path/where/you-want-it-on-your-machine

Please:
1. Clone the repository into that local folder.
2. Inspect the codebase and identify the main app entry point.
3. Install dependencies using the correct package manager.
4. Check whether it needs environment variables or setup files like .env.local.
5. If anything is missing or broken, fix the local setup and explain what you changed.
6. Start the app locally and share the localhost URL once it is working.
7. Summarize the app structure in plain English — what it does, how it's organized.

Do all of this step by step and ask for approval before any command that needs it.`}
          command={`cd /path/where/you-want-it-on-your-machine
git clone https://github.com/your-company/your-repo.git
cd your-repo
npm install
npm run dev`}
          commandLabel="Likely command flow"
          editablePrompt
          editableCommand
        />

        <Callout type="success" label="Simple mental model">
          Existing repo flow = paste the repo link into Claude Code, let it clone and run the app,
          then keep iterating from there. Steps 4–7 above still apply once you&apos;re ready to deploy.
        </Callout>
      </FadeSection>

      {/* ─── Troubleshooting ─── */}
      <FadeSection id="troubleshooting" className="step-card p-6 md:p-9 scroll-mt-24">
        <h2 className="font-bold mb-8"
          style={{ fontSize: "1.75rem", color: textMain, lineHeight: 1.25 }}>
          Troubleshooting common issues
        </h2>

        {[
          {
            problem: mode === "terminal"
              ? '"npm: command not found" when starting Claude Code'
              : "Claude Desktop won't open or sign-in fails",
            solution: mode === "terminal"
              ? <span>Node.js isn&apos;t installed. Download the LTS installer from <ExternalLink href="https://nodejs.org">nodejs.org</ExternalLink>, run it, restart your terminal, and try again.</span>
              : <span>Try signing out and back in at <ExternalLink href="https://claude.ai">claude.ai</ExternalLink>. If the app won&apos;t launch, re-download the latest version from <ExternalLink href="https://claude.ai/download">claude.ai/download</ExternalLink>.</span>,
          },
          {
            problem: "Local preview doesn't start (port 3000 already in use)",
            solution: <span>Another app is using that port. Tell Claude Code: <em>&quot;Something is already running on port 3000 — kill it and restart the dev server.&quot;</em> Or just restart your computer.</span>,
          },
          {
            problem: '"Authentication failed" when pushing to GitHub',
            solution: <span>Your PAT is wrong, expired, or pasted in the wrong field. Go back to Step 4.1 and generate a fresh token. Make sure you check the <InlineCode>repo</InlineCode> scope.</span>,
          },
          {
            problem: '"Repository not found" when pushing',
            solution: <span>The repo URL is wrong, or you don&apos;t have push access. Ask Claude Code: <em>&quot;Show me the git remote URL for this project&quot;</em> and compare it with what&apos;s on GitHub.</span>,
          },
          {
            problem: "Vercel deploy fails with a build error",
            solution: <span>Open the build logs on Vercel — they show the exact error. Copy the error text into Claude Code and say: <em>&quot;My Vercel build failed with this error: [paste]. Fix it.&quot;</em> Then push the fix.</span>,
          },
          {
            problem: 'Vercel says "No framework detected" or builds wrong',
            solution: <span>Go to <ExternalLink href="https://vercel.com/dashboard">Vercel project settings</ExternalLink> and manually set the <strong>Framework Preset</strong> to match your stack (Next.js, Vite, plain HTML, etc.) and redeploy.</span>,
          },
          {
            problem: "The deployed site looks broken or shows a blank page",
            solution: <span>Usually a build mismatch. Check that your local preview worked before pushing. If it worked locally but fails on Vercel, ask Claude Code: <em>&quot;My site works on localhost but breaks on Vercel — investigate and fix.&quot;</em></span>,
          },
        ].map(({ problem, solution }, i) => (
          <div key={i} className="mb-4 rounded-xl p-5"
            style={{ backgroundColor: surfaceBg, border: `1px solid ${borderColor}` }}>
            <p className="font-semibold mb-2" style={{ color: textMain, fontSize: "0.9375rem" }}>
              {problem}
            </p>
            <p style={{ color: textBody, fontSize: "0.9375rem", lineHeight: "1.7" }}>
              {solution}
            </p>
          </div>
        ))}
      </FadeSection>

      {/* ─── Tips ─── */}
      <FadeSection id="tips" className="step-card p-6 md:p-9 scroll-mt-24">
        <h2 className="font-bold mb-6"
          style={{ fontSize: "1.75rem", color: textMain, lineHeight: 1.25 }}>
          Tips for higher-quality prototypes
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "Show, don't tell",
              body: "If you want a specific look and feel, take a screenshot of a product you admire, paste it into Claude Code, and say \"Make it look like this.\" Visual references beat written descriptions every time.",
            },
            {
              title: "One change per prompt",
              body: "Don't ask for ten changes at once — you'll lose track of what worked. Make one request, review, then move to the next. Small iterations add up fast.",
            },
            {
              title: "Pre-populate with realistic data",
              body: "An empty prototype is unimpressive in a demo. Ask Claude to pre-populate it with 5–10 realistic example entries so stakeholders can see it in action immediately.",
            },
            {
              title: "Test on mobile before sharing",
              body: "Stakeholders will open your link on their phone. Always ask Claude to make the prototype responsive, then test it yourself by opening the URL on your phone.",
            },
            {
              title: "Fake the backend — it's fine for prototypes",
              body: "localStorage and hardcoded data are completely fine for a PM prototype. Don't waste time wiring up a real database unless the prototype is specifically about a data flow.",
            },
            {
              title: "Save your prompts in your PRD",
              body: "The prompts you used to build the prototype are excellent spec material. They describe exactly what you intended, and engineers can use them as a baseline for the real build.",
            },
          ].map(({ title, body }, i) => (
            <div key={i} className="flex gap-4 rounded-xl p-5"
              style={{ backgroundColor: surfaceBg, border: `1px solid ${borderColor}` }}>
              <div className="w-1.5 rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: "#6366F1", alignSelf: "stretch", minHeight: "1.5rem" }} />
              <div>
                <p className="font-semibold mb-1" style={{ color: textMain, fontSize: "0.9375rem" }}>
                  {title}
                </p>
                <p style={{ color: textBody, fontSize: "0.9375rem", lineHeight: "1.7" }}>
                  {body}
                </p>
              </div>
            </div>
          ))}
        </div>
      </FadeSection>

    </article>
  );
}
