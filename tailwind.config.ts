import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        navy: "#0c1e3a",
        "navy-alt": "#0a1a33",
        "navy-cipriani": "#0f2545",
        "navy-footer": "#081428",
        primary: "#4a90d9",
        "primary-hover": "#5ba3e0",
        "accent-link": "#2f6fb5",
        "accent-light": "#7cc0f0",
        eyebrow: "#8fbde8",
      },
      fontFamily: {
        sans: ["var(--font-jost)", "system-ui", "sans-serif"],
      },
    },
  },
  plugins: [],
};

export default config;
