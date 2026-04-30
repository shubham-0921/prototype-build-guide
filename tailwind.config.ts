import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-bg": "#0A0A0B",
        "dark-surface": "#16161A",
        "dark-surface2": "#1E1E24",
        "dark-text": "#E8E8EA",
        "dark-muted": "#8A8A92",
        "dark-border": "#2A2A32",
        "light-bg": "#FAFAFA",
        "light-surface": "#FFFFFF",
        "light-text": "#18181B",
        "light-muted": "#71717A",
        "light-border": "#E4E4E7",
        accent: "#6366F1",
        "accent-hover": "#818CF8",
        "accent-subtle": "rgba(99,102,241,0.12)",
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        mono: ["JetBrains Mono", "Menlo", "monospace"],
      },
      typography: {},
    },
  },
  plugins: [],
};
export default config;
