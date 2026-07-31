import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./content/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: "rgb(var(--color-bg) / <alpha-value>)",
        surface: "rgb(var(--color-surface) / <alpha-value>)",
        border: "rgb(var(--color-border) / <alpha-value>)",
        accent: "rgb(var(--color-accent) / <alpha-value>)",
        terminal: {
          DEFAULT: "rgb(var(--color-terminal) / <alpha-value>)",
          bright: "rgb(var(--color-terminal-bright) / <alpha-value>)",
        },
        text: {
          primary: "rgb(var(--color-text-primary) / <alpha-value>)",
          secondary: "rgb(var(--color-text-secondary) / <alpha-value>)",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains-mono)", "ui-monospace", "monospace"],
      },
      fontSize: {
        caption: ["0.75rem", { lineHeight: "1rem" }],
        body: ["1rem", { lineHeight: "1.5rem" }],
        lead: ["1.125rem", { lineHeight: "1.75rem" }],
        h3: ["1.5rem", { lineHeight: "2rem", fontWeight: "700" }],
        h2: ["2rem", { lineHeight: "2.25rem", fontWeight: "700" }],
        h1: ["clamp(2.5rem, 1rem + 5vw, 3.5rem)", { lineHeight: "1.1", fontWeight: "700" }],
      },
      borderRadius: {
        none: "0px",
        sm: "4px",
      },
    },
  },
  plugins: [],
};

export default config;
