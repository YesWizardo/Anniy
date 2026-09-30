import type { Config } from "tailwindcss";

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rage: {
          pink: "#ff77a8",
          blood: "#8b0000",
          neon: "#39ff14",
          blue: "#003366",
          vomit: "#b0bf1a",
          acid: "#eaff00",
          dark: "#0b0c10",
          paper: "#fcf8ed"
        }
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        pixel: ["'Press Start 2P'", "monospace"],
        creepy: ["Creepster", "cursive"],
        bubbly: ["Bungee", "cursive"],
        serif: ["'Playfair Display'", "serif"],
        code: ["'Fira Code'", "monospace"]
      }
    },
  },
  plugins: [],
} satisfies Config;
