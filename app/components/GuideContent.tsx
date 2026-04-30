"use client";

import { useState } from "react";
import { useTheme } from "./ThemeProvider";
import { CodeBlock } from "./CodeBlock";
import { Callout } from "./Callout";
import { FadeSection } from "./FadeSection";
import { Hash, Monitor, Terminal } from "lucide-react";

function SectionHeading({ id, children, level = 2 }: {
  id?: string;
  children: React.ReactNode;
  level?: 2 | 3;
}) {
  const { theme } = useTheme();
  const dark = theme === "dark";

  const handleClick = () => {
    if (id) {
      window.location.hash = id;
    }
  };

  if (level === 2) {
    return (
      <h2
        className="group flex items-center gap-2 font-bold leading-tight mt-12 mb-4"
        style={{
          fontSize: "1.5rem",
          color: dark ? "#E8E8EA" : "#18181B",
        }}
      >
        {children}
        {id && (
          <a
            href={`#${id}`}
            onClick={handleClick}
            className="anchor-link"
            aria-label={`Link to section`}
            style={{ color: "#6366F1" }}
          >
            <Hash size={18} />
          </a>
        )}
      </h2>
    );
  }

  return (
    <h3
      className="group flex items-center gap-2 font-semibold leading-tight mt-8 mb-3"
      style={{
        fontSize: "1.125rem",
        color: dark ? "#E8E8EA" : "#18181B",
      }}
    >
      {children}
      {id && (
        <a
          href={`#${id}`}
          onClick={handleClick}
          className="anchor-link"
          aria-label="Link to section"
          style={{ color: "#6366F1" }}
        >
          <Hash size={15} />
        </a>
      )}
    </h3>
  );
}

function StepBadge({ n }: { n: number }) {
  return (
    <div
      className="inline-flex items-center justify-center w-8 h-8 rounded-full text-sm font-bold mr-3 flex-shrink-0"
      style={{
        backgroundColor: "rgba(99,102,241,0.15)",
        color: "#818CF8",
        border: "1px solid rgba(99,102,241,0.3)",
      }}
    >
      {n}
    </div>
  );
}

function StepHeader({ n, title, id }: { n: number; title: string; id: string }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <div className="flex items-center mb-6 mt-2" id={id}>
      <StepBadge n={n} />
      <h2
        className="font-bold"
        style={{
          fontSize: "1.5rem",
          color: dark ? "#E8E8EA" : "#18181B",
          lineHeight: 1.3,
        }}
      >
        {title}
      </h2>
    </div>
  );
}

function Prose({ children }: { children: React.ReactNode }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <div
      style={{
        color: dark ? "#C8C8CE" : "#3f3f46",
        lineHeight: "1.75",
        fontSize: "1rem",
      }}
    >
      {children}
    </div>
  );
}

function BulletList({ items }: { items: React.ReactNode[] }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <ul className="my-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="mt-2.5 w-1.5 h-1.5 rounded-full flex-shrink-0"
            style={{ backgroundColor: "#6366F1" }}
          />
          <span style={{ color: dark ? "#C8C8CE" : "#3f3f46", lineHeight: "1.75" }}>
            {item}
          </span>
        </li>
      ))}
    </ul>
  );
}

function NumberedList({ items }: { items: React.ReactNode[] }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <ol className="my-4 space-y-2">
      {items.map((item, i) => (
        <li key={i} className="flex items-start gap-3">
          <span
            className="text-xs font-bold mt-1 w-5 h-5 rounded flex-shrink-0 flex items-center justify-center"
            style={{
              color: "#818CF8",
              backgroundColor: "rgba(99,102,241,0.1)",
              fontFamily: "JetBrains Mono, monospace",
            }}
          >
            {i + 1}
          </span>
          <span style={{ color: dark ? "#C8C8CE" : "#3f3f46", lineHeight: "1.75" }}>
            {item}
          </span>
        </li>
      ))}
    </ol>
  );
}

function Divider() {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <hr
      className="my-12"
      style={{ borderColor: dark ? "#2A2A32" : "#E4E4E7", borderTopWidth: 1 }}
    />
  );
}

function InlineCode({ children }: { children: string }) {
  const { theme } = useTheme();
  const dark = theme === "dark";
  return (
    <code
      style={{
        fontFamily: "JetBrains Mono, monospace",
        fontSize: "0.875em",
        backgroundColor: dark ? "#1E1E24" : "#F4F4F8",
        color: dark ? "#818CF8" : "#6366F1",
        padding: "0.15em 0.4em",
        borderRadius: "4px",
        border: `1px solid ${dark ? "#2A2A32" : "#E4E4E7"}`,
      }}
    >
      {children}
    </code>
  );
}

function DualCodeBlock({
  prompt,
  command,
  commandLabel,
}: {
  prompt: string;
  command: string;
  commandLabel?: string;
}) {
  const [showCode, setShowCode] = useState(false);
  const { theme } = useTheme();
  const dark = theme === "dark";

  const activeStyle = {
    backgroundColor: "#6366F1",
    color: "#FFFFFF",
  };
  const inactiveStyle = {
    backgroundColor: dark ? "#1E1E24" : "#F4F4F8",
    color: dark ? "#8A8A92" : "#71717A",
    border: `1px solid ${dark ? "#2A2A32" : "#E4E4E7"}`,
  };

  return (
    <div className="my-6">
      <div className="flex gap-1.5 mb-3">
        <button
          onClick={() => setShowCode(false)}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
          style={!showCode ? activeStyle : inactiveStyle}
        >
          Claude Prompt
        </button>
        <button
          onClick={() => setShowCode(true)}
          className="px-3 py-1.5 rounded-md text-xs font-medium transition-all duration-150"
          style={showCode ? activeStyle : inactiveStyle}
        >
          Show Command
        </button>
      </div>
      {showCode ? (
        <CodeBlock type="terminal" code={command} label={commandLabel} />
      ) : (
        <CodeBlock type="prompt" code={prompt} />
      )}
    </div>
  );
}

function ModeSelector() {
  const { theme, mode, setMode } = useTheme();
  const dark = theme === "dark";

  const activeCard = {
    backgroundColor: dark ? "rgba(99,102,241,0.12)" : "rgba(99,102,241,0.08)",
    border: "2px solid #6366F1",
    color: dark ? "#E8E8EA" : "#18181B",
  };
  const inactiveCard = {
    backgroundColor: dark ? "#16161A" : "#FFFFFF",
    border: `2px solid ${dark ? "#2A2A32" : "#E4E4E7"}`,
    color: dark ? "#8A8A92" : "#71717A",
    cursor: "pointer",
  };

  return (
    <div
      className="mb-10 p-6 rounded-xl"
      style={{
        backgroundColor: dark ? "#16161A" : "#FFFFFF",
        border: `1px solid ${dark ? "#2A2A32" : "#E4E4E7"}`,
      }}
    >
      <p
        className="text-sm font-semibold mb-1"
        style={{ color: dark ? "#8A8A92" : "#71717A", textTransform: "uppercase", letterSpacing: "0.08em" }}
      >
        Before you begin
      </p>
      <p
        className="font-bold mb-5"
        style={{ fontSize: "1.125rem", color: dark ? "#E8E8EA" : "#18181B" }}
      >
        How will you use Claude Code?
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
        <button
          onClick={() => setMode("desktop")}
          className="flex items-start gap-4 p-4 rounded-lg text-left transition-all duration-150"
          style={mode === "desktop" ? activeCard : inactiveCard}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              backgroundColor: mode === "desktop" ? "rgba(99,102,241,0.2)" : dark ? "#1E1E24" : "#F4F4F8",
            }}
          >
            <Monitor size={18} style={{ color: mode === "desktop" ? "#818CF8" : dark ? "#4A4A52" : "#A1A1AA" }} />
          </div>
          <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: mode === "desktop" ? (dark ? "#E8E8EA" : "#18181B") : "inherit" }}>
              Claude Desktop App
            </p>
            <p className="text-xs leading-relaxed" style={{ color: dark ? "#6A6A72" : "#A1A1AA" }}>
              Built-in Claude Code — no terminal needed to get started
            </p>
          </div>
          {mode === "desktop" && (
            <span
              className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "rgba(99,102,241,0.2)", color: "#818CF8" }}
            >
              Selected
            </span>
          )}
        </button>

        <button
          onClick={() => setMode("terminal")}
          className="flex items-start gap-4 p-4 rounded-lg text-left transition-all duration-150"
          style={mode === "terminal" ? activeCard : inactiveCard}
        >
          <div
            className="w-9 h-9 rounded-lg flex items-center justify-center flex-shrink-0 mt-0.5"
            style={{
              backgroundColor: mode === "terminal" ? "rgba(99,102,241,0.2)" : dark ? "#1E1E24" : "#F4F4F8",
            }}
          >
            <Terminal size={18} style={{ color: mode === "terminal" ? "#818CF8" : dark ? "#4A4A52" : "#A1A1AA" }} />
          </div>
          <div>
            <p className="font-semibold text-sm mb-0.5" style={{ color: mode === "terminal" ? (dark ? "#E8E8EA" : "#18181B") : "inherit" }}>
              Terminal / CLI
            </p>
            <p className="text-xs leading-relaxed" style={{ color: dark ? "#6A6A72" : "#A1A1AA" }}>
              Install Claude Code via npm and run it in your terminal
            </p>
          </div>
          {mode === "terminal" && (
            <span
              className="ml-auto text-xs font-semibold px-2 py-0.5 rounded-full flex-shrink-0"
              style={{ backgroundColor: "rgba(99,102,241,0.2)", color: "#818CF8" }}
            >
              Selected
            </span>
          )}
        </button>
      </div>
    </div>
  );
}

export function GuideContent() {
  const { theme, mode } = useTheme();
  const dark = theme === "dark";
  const textMain = dark ? "#E8E8EA" : "#18181B";
  const textBody = dark ? "#C8C8CE" : "#3f3f46";
  const surfaceBg = dark ? "#16161A" : "#FFFFFF";
  const borderColor = dark ? "#2A2A32" : "#E4E4E7";

  return (
    <article style={{ lineHeight: "1.75" }}>

      {/* ─── Mode selector ─── */}
      <ModeSelector />

      {/* ─── Introduction ─── */}
      <FadeSection id="intro">
        <h1
          className="font-bold mb-4"
          style={{ fontSize: "2rem", color: textMain, lineHeight: 1.25 }}
        >
          Why this guide exists
        </h1>
        <Prose>
          <p className="mb-4">
            As Product Managers, we live in the gap between an idea and the engineering team&apos;s roadmap.
            The fastest way to close that gap is a working prototype — not a Figma mock, not a slide,
            but something a stakeholder can click on a real URL.
          </p>
          <p className="mb-4">
            This guide walks you through the full path: writing a prompt, getting Claude Code to build
            a working app on your machine, pushing it to GitHub, and deploying it to Vercel so anyone
            with the link can try it. Every step has the exact commands and prompts you can copy.
          </p>
          <p className="mb-6 font-medium" style={{ color: textMain }}>
            Who this is for: PMs with little to no coding background. You will need access to Claude Code
            and a GitHub account. Beyond that, this guide assumes nothing.
          </p>
        </Prose>

        <SectionHeading level={2}>The seven-step flow at a glance</SectionHeading>
        <NumberedList items={[
          "Build a prototype using Claude Code locally and verify it runs.",
          "Create an empty repo on github.com and copy its URL.",
          "Paste the URL in Claude Code and ask it to wire up your local project to that repo.",
          "If GitHub authentication isn't set up, create a Personal Access Token (PAT).",
          "Ask Claude Code to commit and push your code to GitHub.",
          "Sign in to vercel.com and connect your GitHub account.",
          "Vercel auto-detects the project, deploys it, and gives you a permanent shareable link.",
        ]} />

        <Callout type="success" label="What you'll have at the end">
          A live URL like <InlineCode>my-prototype.vercel.app</InlineCode> you can drop in Slack, send to a
          stakeholder, or include in a PRD. Every time you push new code, Vercel redeploys automatically.
        </Callout>
      </FadeSection>

      <Divider />

      {/* ─── Prerequisites ─── */}
      <FadeSection id="prerequisites">
        <h2
          className="font-bold mb-2"
          style={{ fontSize: "1.75rem", color: textMain, lineHeight: 1.25 }}
        >
          Before you start: one-time setup
        </h2>
        <Prose>
          <p className="mb-6">
            These things need to exist on your machine and your accounts. If you already have them,
            skip ahead.
          </p>
        </Prose>

        {/* Prereq 1 — differs by mode */}
        {mode === "desktop" ? (
          <>
            <SectionHeading level={3}>1. Claude Desktop app installed</SectionHeading>
            <Prose>
              <p className="mb-3">
                Download the Claude desktop app from <strong>claude.ai/download</strong> and install it.
                Sign in with your Anthropic account. Claude Code is built into the app — no terminal
                or <InlineCode>npm</InlineCode> required to get started.
              </p>
              <p className="mb-4">
                Once installed, open the app and look for the <strong>Claude Code</strong> icon in the
                left sidebar (it looks like a terminal or code brackets). That&apos;s where all your
                sessions will live.
              </p>
            </Prose>
            <Callout type="info" label="Don't have an Anthropic account?">
              Sign up at <strong>claude.ai</strong> — a free account works for prototyping. You&apos;ll
              need a paid plan if you want extended sessions or heavier usage.
            </Callout>
          </>
        ) : (
          <>
            <SectionHeading level={3}>1. Claude Code installed</SectionHeading>
            <Prose>
              <p className="mb-3">
                Claude Code is a terminal tool from Anthropic. Open your Terminal (Mac) or PowerShell
                (Windows) and run:
              </p>
            </Prose>
            <CodeBlock type="terminal" code={`npm install -g @anthropic-ai/claude-code`} />
            <Prose><p className="mb-3">Then verify:</p></Prose>
            <CodeBlock type="terminal" code={`claude --version`} />
            <Callout type="info" label="Node.js required">
              If you get an error about <InlineCode>npm not being found</InlineCode>, install Node.js
              first from <strong>nodejs.org</strong> (the LTS version is fine).
            </Callout>
          </>
        )}

        <SectionHeading level={3}>2. A GitHub account</SectionHeading>
        <Prose>
          <p className="mb-4">
            Sign up at <strong>github.com</strong> if you don&apos;t have one. Use your work email if your
            team plans to share repos.
          </p>
        </Prose>

        <SectionHeading level={3}>3. Git installed locally</SectionHeading>
        <Prose><p className="mb-3">Most Macs have it pre-installed. To check:</p></Prose>
        <CodeBlock type="terminal" code={`git --version`} />
        <Prose>
          <p className="mb-4">
            If missing on Windows, install from <strong>git-scm.com</strong>. On Mac, run{" "}
            <InlineCode>xcode-select --install</InlineCode>.
          </p>
        </Prose>

        <SectionHeading level={3}>4. A code editor (optional but useful)</SectionHeading>
        <Prose>
          <p className="mb-4">
            VS Code (<strong>code.visualstudio.com</strong>) is the standard. You won&apos;t write code
            by hand, but it&apos;s helpful for opening the project folder and seeing what Claude built.
          </p>
        </Prose>
      </FadeSection>

      <Divider />

      {/* ─── Step 1 ─── */}
      <FadeSection>
        <StepHeader n={1} title="Build a prototype with Claude Code" id="step-1" />
        <Prose>
          <p className="mb-6">
            This is where the magic happens. You describe the prototype you want; Claude Code writes
            the code, runs it, and shows it to you in your browser.
          </p>
        </Prose>

        {/* Step 1.1 — differs by mode */}
        <SectionHeading level={3}>1.1 Create a project folder and start a session</SectionHeading>

        {mode === "desktop" ? (
          <>
            <Prose>
              <p className="mb-3">
                In Claude Desktop, open Claude Code from the left sidebar, then start a new project.
              </p>
            </Prose>
            <NumberedList items={[
              <span key="1">Open <strong>Claude Desktop</strong> and click the <strong>Claude Code</strong> icon in the left sidebar.</span>,
              <span key="2">Click <strong>&quot;New Project&quot;</strong> (or the + button).</span>,
              <span key="3">In the file picker, navigate to where you keep your projects and create a new folder called <InlineCode>feedback-collector</InlineCode>. Select it.</span>,
              "You're now in a Claude Code session — a chat interface where you type prompts on the left and see your project files on the right.",
            ]} />
            <Callout type="info" label="Folder name matters">
              Use lowercase with dashes and no spaces — this name will become your GitHub repo name
              and your Vercel URL in later steps.
            </Callout>
          </>
        ) : (
          <>
            <Prose>
              <p className="mb-3">
                Pick a clean folder name (lowercase, dashes, no spaces) — this will become your repo
                name later. Open Terminal and run:
              </p>
            </Prose>
            <CodeBlock type="terminal" code={`mkdir feedback-collector\ncd feedback-collector\nclaude`} />
            <Prose>
              <p className="mb-6">
                You&apos;re now inside Claude Code. Your terminal prompt will change to show you&apos;re
                in a Claude session.
              </p>
            </Prose>
          </>
        )}

        <SectionHeading level={3}>1.2 Write a clear first prompt</SectionHeading>
        <Prose>
          <p className="mb-3">
            The quality of your prototype is mostly determined by the quality of your first prompt.
            A good prompt has four parts:
          </p>
        </Prose>
        <BulletList items={[
          <span key="1"><strong style={{ color: textMain }}>What it is</strong> — one sentence describing the product.</span>,
          <span key="2"><strong style={{ color: textMain }}>Who it&apos;s for</strong> — the user and the use case.</span>,
          <span key="3"><strong style={{ color: textMain }}>Core features</strong> — the 3 to 5 things it must do.</span>,
          <span key="4"><strong style={{ color: textMain }}>Tech stack hint</strong> — say &quot;Next.js&quot; so Vercel deployment is friction-free.</span>,
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

        <Callout type="info" label="Why Next.js?">
          Vercel is built by the team behind Next.js, so deployment is a single click with zero
          configuration. If you ask for plain HTML or a different framework, you can still deploy —
          it&apos;s just one extra step.
        </Callout>

        <SectionHeading level={3}>1.3 Let Claude Code work</SectionHeading>
        <Prose><p className="mb-3">Claude Code will:</p></Prose>
        <BulletList items={[
          <span key="1">Set up the project (run <InlineCode>create-next-app</InlineCode>, install dependencies).</span>,
          "Write the actual page, components, and styles.",
          <span key="3">Ask for permission before running commands — say <strong style={{ color: textMain }}>yes</strong>.</span>,
          <span key="4">Start the dev server and share a URL like <InlineCode>http://localhost:3000</InlineCode>.</span>,
        ]} />
        <Prose>
          <p className="mt-3 mb-6">
            The first build can take 2–5 minutes. You&apos;ll see live progress in the chat.
          </p>
        </Prose>

        <SectionHeading level={3}>1.4 Verify it works in your browser</SectionHeading>
        <Prose>
          <p className="mb-3">
            Open <InlineCode>http://localhost:3000</InlineCode> in Chrome. Click around. Submit
            something. Refresh the page. Try to break it.
          </p>
          <p className="mb-2 font-medium" style={{ color: textMain }}>Things to check before moving on:</p>
        </Prose>
        <BulletList items={[
          "The page actually loads (no error screen).",
          "All the features from your prompt actually work.",
          <span key="3">Nothing in the terminal is screaming red <strong>&quot;Error&quot;</strong>.</span>,
        ]} />

        <SectionHeading level={3}>1.5 Iterate until it&apos;s right</SectionHeading>
        <Prose>
          <p className="mb-4">
            This is the part most PMs skip. Don&apos;t ship the first version — give Claude two or
            three rounds of feedback the way you&apos;d give feedback to a designer.
          </p>
        </Prose>
        <CodeBlock
          type="prompt"
          label="Sample Iteration Prompt"
          code={`The submit button is too small and the form feels cramped.
Increase padding everywhere, make the button full-width on
mobile, and add a subtle hover state.`}
        />
        <CodeBlock
          type="prompt"
          label="Sample Iteration Prompt"
          code={`Add an empty state for when there's no feedback yet — a
centered illustration or icon and the text "No feedback yet.
Be the first to share!"`}
        />
        <CodeBlock
          type="prompt"
          label="Sample Iteration Prompt"
          code={`The Bug pill should be red, Idea should be blue, Praise should
be green. Use soft pastel backgrounds with darker text for
readability.`}
        />

        <Callout type="warning" label="Stop the dev server before moving on">
          Press <InlineCode>Ctrl+C</InlineCode> in the terminal to kill the local server. You don&apos;t
          need it running for the next steps.
        </Callout>
      </FadeSection>

      <Divider />

      {/* ─── Step 2 ─── */}
      <FadeSection>
        <StepHeader n={2} title="Create a GitHub repository" id="step-2" />
        <Prose>
          <p className="mb-6">
            GitHub is where your code lives in the cloud. Vercel reads from GitHub to know what to
            deploy, so this step is mandatory.
          </p>
        </Prose>

        <SectionHeading level={3}>2.1 Create the repo</SectionHeading>
        <NumberedList items={[
          <span key="1">Go to <strong>github.com</strong> and sign in.</span>,
          <span key="2">Click the <strong>&quot;+&quot;</strong> icon in the top-right corner and select <strong>&quot;New repository&quot;</strong>.</span>,
          <span key="3">Repository name: use the same name as your local folder (e.g. <InlineCode>feedback-collector</InlineCode>). Lowercase, dashes, no spaces.</span>,
          <span key="4">Description: optional but helpful — <em>&quot;Internal feedback collector prototype.&quot;</em></span>,
          <span key="5">Visibility: choose <strong>Private</strong> if it&apos;s internal, <strong>Public</strong> if it&apos;s open. For PM prototypes, Private is the safe default.</span>,
          <span key="6"><strong>CRITICAL:</strong> leave the &quot;Initialize this repository&quot; checkboxes <strong>UNCHECKED</strong>. Do not add a README, .gitignore, or license here. Claude Code will handle all of that.</span>,
          <span key="7">Click <strong>&quot;Create repository&quot;</strong>.</span>,
        ]} />

        <SectionHeading level={3}>2.2 Copy the repo URL</SectionHeading>
        <Prose>
          <p className="mb-3">
            On the next page, GitHub shows a setup screen. Look for the URL at the top — it&apos;ll
            look like:
          </p>
        </Prose>
        <CodeBlock type="terminal" code={`https://github.com/your-username/feedback-collector.git`} />
        <Prose>
          <p className="mb-6">Click the copy icon next to it. Keep it on your clipboard.</p>
        </Prose>

        <Callout type="info" label="Why we left the repo empty">
          If GitHub creates a README for you, your local project and the GitHub repo will have
          different histories, and the push in Step 5 will fail. Empty repo = clean push.
        </Callout>
      </FadeSection>

      <Divider />

      {/* ─── Step 3 ─── */}
      <FadeSection>
        <StepHeader n={3} title="Connect Claude Code to your GitHub repo" id="step-3" />
        <Prose>
          <p className="mb-6">
            Now we tell Claude Code where to push the code. Go back to your Claude Code session.
          </p>
        </Prose>

        <SectionHeading level={3}>3.1 Sample prompt — paste your repo URL</SectionHeading>
        <CodeBlock
          type="prompt"
          code={`I've created a GitHub repo for this project. Set up this
local folder so it's connected to that remote repo.

Repo URL: https://github.com/your-username/feedback-collector.git

Initialize git, add a sensible .gitignore for a Next.js
project, create an initial commit with all the project files,
and configure the remote — but don't push yet, I want to
verify everything first.`}
        />
        <Prose>
          <p className="mb-6">Replace the URL with the one you copied in Step 2.</p>
        </Prose>

        <SectionHeading level={3}>3.2 What Claude Code will do</SectionHeading>
        <BulletList items={[
          "Initialize git version control in your project folder.",
          "Create a .gitignore so node_modules, build files, and secrets don't get pushed.",
          "Stage all your project files.",
          "Make an initial commit.",
          "Add your GitHub URL as the \"origin\" remote.",
          "Show you a summary and wait for the push instruction.",
        ]} />

        <SectionHeading level={3}>3.3 Sanity check</SectionHeading>
        <Prose><p className="mb-3">Ask Claude:</p></Prose>
        <CodeBlock type="prompt" code={`Show me the git status and confirm the remote is set correctly.`} />
        <Prose>
          <p className="mb-4">
            You should see: &quot;On branch main, nothing to commit, working tree clean,&quot; and a
            remote called <InlineCode>origin</InlineCode> pointing to your GitHub URL.
          </p>
        </Prose>
      </FadeSection>

      <Divider />

      {/* ─── Step 4 ─── */}
      <FadeSection>
        <StepHeader n={4} title="Set up GitHub authentication (Personal Access Token)" id="step-4" />
        <Prose>
          <p className="mb-4">
            When you push code to GitHub, GitHub asks: &quot;Are you really who you say you are?&quot;
            Passwords don&apos;t work for this anymore — you need a Personal Access Token (PAT). Think
            of it as a long, random password that only works for the things you allow.
          </p>
        </Prose>

        <Callout type="info" label="Skip this step if...">
          You&apos;ve pushed to GitHub from this machine before, OR you have GitHub Desktop installed
          and signed in. Try Step 5 first; if the push works, your auth is already configured. Come
          back here only if you see an authentication error.
        </Callout>

        <SectionHeading level={3}>4.1 Create the token on GitHub</SectionHeading>
        <NumberedList items={[
          <span key="1">Go to <strong>github.com</strong> and sign in.</span>,
          "Click your profile picture in the top-right → Settings.",
          <span key="3">Scroll down the left sidebar to <strong>&quot;Developer settings&quot;</strong> (it&apos;s at the very bottom).</span>,
          <span key="4">Click <strong>&quot;Personal access tokens&quot;</strong> → <strong>&quot;Tokens (classic)&quot;</strong>.</span>,
          <span key="5">Click <strong>&quot;Generate new token&quot;</strong> → <strong>&quot;Generate new token (classic)&quot;</strong>.</span>,
          "You may be asked to confirm your password.",
        ]} />

        <SectionHeading level={3}>4.2 Configure the token</SectionHeading>
        <BulletList items={[
          <span key="1"><strong style={{ color: textMain }}>Note:</strong> give it a memorable name like <em>&quot;Claude Code on my MacBook&quot;</em> so you know what it&apos;s for later.</span>,
          <span key="2"><strong style={{ color: textMain }}>Expiration:</strong> 90 days is a good balance. Don&apos;t pick &quot;No expiration&quot; — it&apos;s a security risk.</span>,
          <span key="3"><strong style={{ color: textMain }}>Scopes:</strong> check the box next to <InlineCode>repo</InlineCode> (this gives full read/write access to your repositories — exactly what we need). Leave everything else unchecked.</span>,
          <span key="4">Click <strong>&quot;Generate token&quot;</strong> at the bottom.</span>,
        ]} />

        <SectionHeading level={3}>4.3 Copy the token IMMEDIATELY</SectionHeading>
        <Prose>
          <p className="mb-3">
            GitHub will show your token once and only once. It looks like a long string starting
            with <InlineCode>ghp_...</InlineCode>
          </p>
        </Prose>

        <Callout type="danger" label="DO NOT close this tab yet">
          If you navigate away before saving the token, you can&apos;t recover it — you&apos;ll have
          to delete it and create a new one. Copy it and paste it into a password manager (1Password,
          Bitwarden, your Notes app) <strong>RIGHT NOW.</strong>
        </Callout>

        <SectionHeading level={3}>4.4 Use the token in your terminal</SectionHeading>
        <Prose>
          <p className="mb-3">
            The next time you run a git push, GitHub will prompt you for credentials:
          </p>
        </Prose>
        <CodeBlock type="terminal" code={`Username for 'https://github.com': your-github-username\nPassword for 'https://your-github-username@github.com': <paste the PAT here>`} />
        <Callout type="info" label="Invisible paste is normal">
          When you paste the token, you won&apos;t see any characters appear in the terminal —
          that&apos;s normal, terminals hide passwords. Just paste and press Enter.
        </Callout>

        <SectionHeading level={3}>4.5 Make Git remember your token (optional but recommended)</SectionHeading>
        <Prose>
          <p className="mb-4">
            So you don&apos;t have to paste it every time, tell Git to cache it. Ask Claude Code to do
            this for you, or run the command directly.
          </p>
        </Prose>

        <SectionHeading level={3}>On Mac:</SectionHeading>
        <DualCodeBlock
          prompt={`Set up git credential caching on my Mac using the macOS Keychain so I don't have to paste my GitHub token on every push.`}
          command={`git config --global credential.helper osxkeychain`}
          commandLabel="Mac Terminal"
        />
        <Prose><p className="mb-4">Mac stores it in your Keychain after the next push. Future pushes won&apos;t ask.</p></Prose>

        <SectionHeading level={3}>On Windows:</SectionHeading>
        <DualCodeBlock
          prompt={`Set up git credential caching on Windows using the Windows Credential Manager so I don't have to paste my GitHub token on every push.`}
          command={`git config --global credential.helper manager`}
          commandLabel="Windows Terminal"
        />
        <Prose><p className="mb-4">Windows uses Credential Manager — same idea.</p></Prose>

        <SectionHeading level={3}>On Linux:</SectionHeading>
        <DualCodeBlock
          prompt={`Set up git credential caching on Linux so I don't have to paste my GitHub token on every push. Cache it for 24 hours.`}
          command={`git config --global credential.helper "cache --timeout=86400"`}
          commandLabel="Linux Terminal"
        />
        <Prose><p className="mb-6">This caches the token for 24 hours.</p></Prose>

        <Callout type="warning" label="Token rotation">
          When your token expires (in 90 days), pushes will start failing. Just go back to Step 4.1
          and generate a new one — same scopes, paste it on the next push, and you&apos;re back in
          business.
        </Callout>
      </FadeSection>

      <Divider />

      {/* ─── Step 5 ─── */}
      <FadeSection>
        <StepHeader n={5} title="Commit and push to GitHub" id="step-5" />
        <Prose>
          <p className="mb-6">Time to actually send your code to the cloud.</p>
        </Prose>

        <SectionHeading level={3}>5.1 Sample prompt — push to GitHub</SectionHeading>
        <CodeBlock
          type="prompt"
          code={`Push the project to GitHub now. Use the main branch.
If git asks for credentials, I'll handle that — just run
the push and show me the output.`}
        />

        <SectionHeading level={3}>5.2 What happens next</SectionHeading>
        <BulletList items={[
          "Claude Code runs the push command to send your code to GitHub.",
          "Git may prompt for your username and PAT (see Step 4.4 if it does).",
          <span key="3">You&apos;ll see upload progress, then a success line ending in <em>&quot;branch &apos;main&apos; set up to track &apos;origin/main&apos;.&quot;</em></span>,
        ]} />

        <SectionHeading level={3}>5.3 Verify on GitHub</SectionHeading>
        <Prose>
          <p className="mb-6">
            Go back to your repo page on github.com and refresh. You should now see all your project
            files — <InlineCode>package.json</InlineCode>, the <InlineCode>app</InlineCode> folder,
            your components, and so on. The &quot;This branch is up to date with main&quot; message
            confirms everything pushed cleanly.
          </p>
        </Prose>

        <SectionHeading level={3}>5.4 Future updates</SectionHeading>
        <Prose>
          <p className="mb-3">
            Every time you make changes with Claude Code from now on, ask:
          </p>
        </Prose>
        <CodeBlock
          type="prompt"
          code={`Commit these changes with a clear message describing what
changed, then push to GitHub.`}
        />
        <Callout type="success" label="Auto-deploy from here on">
          Claude will write a sensible commit message, commit the changes, and push them. Vercel
          (Step 6 onward) will pick up the new commit and redeploy automatically — no extra work from you.
        </Callout>
      </FadeSection>

      <Divider />

      {/* ─── Step 6 ─── */}
      <FadeSection>
        <StepHeader n={6} title="Sign up for Vercel and connect GitHub" id="step-6" />
        <Prose>
          <p className="mb-6">
            Vercel takes the code in your GitHub repo, builds it, and serves it on a public URL.
            The free tier is generous — more than enough for prototypes and internal demos.
          </p>
        </Prose>

        <SectionHeading level={3}>6.1 Create your Vercel account</SectionHeading>
        <NumberedList items={[
          <span key="1">Go to <strong>vercel.com</strong>.</span>,
          <span key="2">Click <strong>&quot;Sign Up&quot;</strong>.</span>,
          <span key="3">Choose <strong>&quot;Continue with GitHub&quot;</strong> — this is the easiest path because it links the two accounts in one step.</span>,
          "Authorize Vercel to access your GitHub on the prompt that appears.",
          <span key="5">Pick the <strong>Hobby (free)</strong> plan when asked. It&apos;s perfect for prototypes.</span>,
        ]} />

        <SectionHeading level={3}>6.2 Grant Vercel access to your repo</SectionHeading>
        <Prose>
          <p className="mb-3">
            After signup, Vercel asks which GitHub repos it should be allowed to deploy. You have
            two choices:
          </p>
        </Prose>
        <BulletList items={[
          <span key="1"><strong style={{ color: textMain }}>All repositories:</strong> fastest, but Vercel can see everything in your account.</span>,
          <span key="2"><strong style={{ color: textMain }}>Only select repositories:</strong> more secure. Pick this and select only <InlineCode>feedback-collector</InlineCode> (or whatever your repo is called).</span>,
        ]} />
        <Prose>
          <p className="mb-4">
            For internal/work projects, &quot;Only select repositories&quot; is the right call. You
            can always add more repos later.
          </p>
        </Prose>
        <Callout type="info" label="If you missed the prompt">
          Go to <strong>github.com → Settings → Applications → Vercel → Configure</strong>, and
          adjust repo access there.
        </Callout>
      </FadeSection>

      <Divider />

      {/* ─── Step 7 ─── */}
      <FadeSection>
        <StepHeader n={7} title="Deploy and get your shareable link" id="step-7" />
        <Prose>
          <p className="mb-6">
            This is the payoff. From the moment you click &quot;Deploy,&quot; Vercel does everything
            automatically.
          </p>
        </Prose>

        <SectionHeading level={3}>7.1 Import the project</SectionHeading>
        <NumberedList items={[
          <span key="1">In your Vercel dashboard, click <strong>&quot;Add New…&quot;</strong> → <strong>&quot;Project&quot;</strong>.</span>,
          <span key="2">You&apos;ll see a list of your GitHub repos. Find <InlineCode>feedback-collector</InlineCode> and click <strong>&quot;Import&quot;</strong>.</span>,
        ]} />

        <SectionHeading level={3}>7.2 Configure (almost nothing to do)</SectionHeading>
        <Prose>
          <p className="mb-3">
            Vercel auto-detects that it&apos;s a Next.js project and pre-fills everything correctly:
          </p>
        </Prose>
        <BulletList items={[
          <span key="1"><strong style={{ color: textMain }}>Framework Preset:</strong> Next.js</span>,
          <span key="2"><strong style={{ color: textMain }}>Build Command:</strong> <InlineCode>next build</InlineCode> (auto)</span>,
          <span key="3"><strong style={{ color: textMain }}>Output Directory:</strong> <InlineCode>.next</InlineCode> (auto)</span>,
          <span key="4"><strong style={{ color: textMain }}>Install Command:</strong> <InlineCode>npm install</InlineCode> (auto)</span>,
        ]} />
        <Prose>
          <p className="mb-4">Don&apos;t change any of it. Just click <strong>&quot;Deploy&quot;</strong> at the bottom.</p>
        </Prose>
        <Callout type="info" label="If your prototype isn't Next.js">
          Vercel will still try to detect the framework. For plain HTML, it works out of the box.
          For Vite, Create React App, SvelteKit, etc., it auto-detects them too. Only change
          settings if Vercel asks you to.
        </Callout>

        <SectionHeading level={3}>7.3 Watch it build</SectionHeading>
        <Prose>
          <p className="mb-6">
            Vercel shows live build logs. The first deploy takes 1–3 minutes — installing
            dependencies, building the app, optimizing assets. When it finishes you&apos;ll see a
            celebration screen with confetti and a screenshot of your live site.
          </p>
        </Prose>

        <SectionHeading level={3}>7.4 Get your shareable link</SectionHeading>
        <Prose>
          <p className="mb-3">
            Click &quot;Continue to Dashboard,&quot; then look at the Overview section. You&apos;ll
            see your project&apos;s permanent URL:
          </p>
        </Prose>
        <CodeBlock type="terminal" code={`https://feedback-collector.vercel.app`} />
        <Prose>
          <p className="mb-6">
            (Vercel may add a random suffix if the name is taken —{" "}
            <InlineCode>feedback-collector-shubham.vercel.app</InlineCode>, etc.) This URL is
            permanent — share it with your team, paste it in your PRD, demo it on a call. It works
            on any device, anywhere in the world.
          </p>
        </Prose>

        <SectionHeading level={3}>7.5 Custom domain (optional)</SectionHeading>
        <Prose>
          <p className="mb-6">
            If you want a friendlier URL like <InlineCode>prototype.yourcompany.com</InlineCode>,
            go to <strong>Project Settings → Domains</strong> and follow the prompts. You&apos;ll
            need to own the domain and update its DNS records — your IT team can help with the
            latter.
          </p>
        </Prose>

        <SectionHeading level={3}>7.6 Auto-deploy on every push</SectionHeading>
        <Prose>
          <p className="mb-6">
            From now on, every time you push to GitHub (Step 5.4), Vercel automatically builds and
            redeploys. Each deployment gets its own preview URL too, so you can compare versions or
            share work-in-progress links separately from your main URL.
          </p>
        </Prose>

        <Callout type="success" label="You're done!">
          You went from idea → working prototype → live URL without writing a line of code by hand.
          Send the link to a stakeholder and watch their reaction. That&apos;s the PM superpower
          this guide unlocks.
        </Callout>
      </FadeSection>

      <Divider />

      {/* ─── Troubleshooting ─── */}
      <FadeSection id="troubleshooting">
        <h2
          className="font-bold mb-8"
          style={{ fontSize: "1.75rem", color: textMain, lineHeight: 1.25 }}
        >
          Troubleshooting common issues
        </h2>

        {[
          {
            problem: mode === "terminal" ? '"npm: command not found" when starting Claude Code' : 'Claude Desktop app won\'t open or sign in fails',
            solution: mode === "terminal"
              ? <span>Node.js isn&apos;t installed. Download the LTS installer from <strong>nodejs.org</strong>, run it, then restart your terminal.</span>
              : <span>Try signing out and back in at <strong>claude.ai</strong>. If the app won&apos;t launch, re-download the latest version from <strong>claude.ai/download</strong>.</span>,
          },
          {
            problem: "Local server doesn't start (port 3000 in use)",
            solution: <span>Another app is using that port. Tell Claude Code: <em>&quot;Kill anything running on port 3000 and restart the dev server,&quot;</em> or just restart your computer.</span>,
          },
          {
            problem: '"Authentication failed" when pushing to GitHub',
            solution: "Your PAT is wrong, expired, or you typed the username instead. Go back to Step 4 and generate a fresh token. Make sure you check the repo scope.",
          },
          {
            problem: '"Repository not found" when pushing',
            solution: <span>The repo URL is wrong, or you don&apos;t have permission to push to it. Ask Claude Code: <em>&quot;Show me the git remote URL for this project&quot;</em> and compare it with the URL on GitHub.</span>,
          },
          {
            problem: "Vercel deploy fails with a build error",
            solution: <span>Open the build logs on Vercel — they&apos;ll show the exact error. Copy the error message into Claude Code and ask: <em>&quot;My Vercel build failed with this error: [paste]. Fix it.&quot;</em> Then commit and push the fix.</span>,
          },
          {
            problem: 'Vercel says "No Next.js version detected"',
            solution: <span>Your prototype isn&apos;t Next.js. In Vercel project settings, manually set the <strong>Framework Preset</strong> to whatever you actually have (Vite, plain HTML, etc.) and redeploy.</span>,
          },
          {
            problem: "The deployed site looks broken / shows a 404",
            solution: <span>Usually a build issue. Check that your dev server worked locally before pushing. If it worked locally but fails in production, ask Claude Code: <em>&quot;My site works on localhost but breaks on Vercel — investigate and fix.&quot;</em></span>,
          },
        ].map(({ problem, solution }, i) => (
          <div
            key={i}
            className="mb-4 rounded-lg p-5"
            style={{
              backgroundColor: surfaceBg,
              border: `1px solid ${borderColor}`,
            }}
          >
            <p
              className="font-semibold mb-2"
              style={{ color: textMain, fontSize: "0.9375rem" }}
            >
              {problem}
            </p>
            <p style={{ color: textBody, fontSize: "0.9375rem", lineHeight: "1.7" }}>
              {solution}
            </p>
          </div>
        ))}
      </FadeSection>

      <Divider />

      {/* ─── Tips ─── */}
      <FadeSection id="tips">
        <h2
          className="font-bold mb-6"
          style={{ fontSize: "1.75rem", color: textMain, lineHeight: 1.25 }}
        >
          Tips for higher-quality prototypes
        </h2>
        <div className="space-y-4">
          {[
            {
              title: "Show, don't tell",
              body: "If you want a specific UI style, paste a screenshot of a site you like into Claude Code and say \"Style it like this.\"",
            },
            {
              title: "One feature per iteration",
              body: "Don't ask for ten changes in one prompt — you'll lose track of what worked. Ship small, push often.",
            },
            {
              title: "Use seed data",
              body: "An empty prototype is unimpressive. Ask Claude to pre-populate it with 5–10 realistic example entries so demos feel real.",
            },
            {
              title: "Mobile matters",
              body: "Always ask Claude to make the prototype responsive. Stakeholders will open your link on their phone.",
            },
            {
              title: "Fake the backend",
              body: "For prototypes, localStorage or hardcoded JSON is enough. Don't waste time wiring up databases unless the prototype is specifically about a backend interaction.",
            },
            {
              title: "Keep prompts in your PRD",
              body: "When you hand off to engineering, the prompts you used are themselves great spec material — they show exactly what behavior you intended.",
            },
          ].map(({ title, body }, i) => (
            <div
              key={i}
              className="flex gap-4 rounded-lg p-5"
              style={{
                backgroundColor: surfaceBg,
                border: `1px solid ${borderColor}`,
              }}
            >
              <div
                className="w-1.5 rounded-full flex-shrink-0 mt-1"
                style={{ backgroundColor: "#6366F1", alignSelf: "stretch", minHeight: "1.5rem" }}
              />
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
