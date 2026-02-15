import type { Config } from "tailwindcss";

export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      colors: {
        ink: {
          950: "#111827",
          900: "#1f2937",
          800: "#334155",
          700: "#475569",
        },
        surf: {
          100: "#f8fafc",
          200: "#eef2f7",
          300: "#dbe4ef",
        },
        aqua: {
          100: "#dff5ff",
          200: "#bfeeff",
          300: "#8fe2ff",
          400: "#44c8ff",
          500: "#109dd8",
        },
      },
      fontFamily: {
        sans: ["IBM Plex Sans", "ui-sans-serif", "system-ui", "sans-serif"],
        display: ["Sora", "ui-sans-serif", "system-ui", "sans-serif"],
      },
      boxShadow: {
        panel: "0 24px 60px -28px rgba(15, 23, 42, 0.35)",
        card: "0 12px 28px -16px rgba(15, 23, 42, 0.28)",
      },
      keyframes: {
        riseIn: {
          "0%": { opacity: "0", transform: "translateY(14px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        riseIn: "riseIn 350ms ease-out both",
      },
    },
  },
  plugins: [],
} satisfies Config;
