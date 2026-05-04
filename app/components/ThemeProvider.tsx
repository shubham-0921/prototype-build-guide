"use client";

import { createContext, useContext, useEffect, useState } from "react";

type Theme = "dark" | "light";
export type Mode = "desktop" | "terminal";

const ThemeContext = createContext<{
  theme: Theme;
  toggle: () => void;
  mode: Mode;
  setMode: (m: Mode) => void;
  projectName: string;
  setProjectName: (v: string) => void;
  githubUsername: string;
  setGithubUsername: (v: string) => void;
}>({
  theme: "light",
  toggle: () => {},
  mode: "desktop",
  setMode: () => {},
  projectName: "feedback-collector",
  setProjectName: () => {},
  githubUsername: "",
  setGithubUsername: () => {},
});

export function ThemeProvider({ children }: { children: React.ReactNode }) {
  const [theme, setTheme] = useState<Theme>("light");
  const [mode, setMode] = useState<Mode>("desktop");
  const [projectName, setProjectNameState] = useState("feedback-collector");
  const [githubUsername, setGithubUsernameState] = useState("");
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
    localStorage.removeItem("theme");
    const storedProject = localStorage.getItem("projectName");
    if (storedProject) setProjectNameState(storedProject);
    const storedUsername = localStorage.getItem("githubUsername");
    if (storedUsername) setGithubUsernameState(storedUsername);
  }, []);

  useEffect(() => {
    if (!mounted) return;
    const root = document.documentElement;
    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme, mounted]);

  const toggle = () => setTheme((t) => (t === "dark" ? "light" : "dark"));

  const setProjectName = (v: string) => {
    setProjectNameState(v);
    localStorage.setItem("projectName", v);
  };

  const setGithubUsername = (v: string) => {
    setGithubUsernameState(v);
    localStorage.setItem("githubUsername", v);
  };

  if (!mounted) return <div style={{ visibility: "hidden" }}>{children}</div>;

  return (
    <ThemeContext.Provider value={{ theme, toggle, mode, setMode, projectName, setProjectName, githubUsername, setGithubUsername }}>
      {children}
    </ThemeContext.Provider>
  );
}

export function useTheme() {
  return useContext(ThemeContext);
}
