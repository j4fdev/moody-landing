import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: "class",
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        moody: {
          surface: "#FAF7F2",
          surfaceContainer: "#EFECE4",
          surfaceHover: "#E5E1D6",
          primary: "#3F6353",
          primaryHover: "#335144",
          secondary: "#D97A53",
          secondaryHover: "#C46842",
          mist: "#6A8B9C",
          mistLight: "#E8EEF1",
          oat: "#E8DFD1",
          textPrimary: "#262C28",
          textSecondary: "#68736B",
          // Dark mode equivalents
          surfaceDark: "#191D1B",
          surfaceContainerDark: "#242B28",
          surfaceHoverDark: "#2C3431",
          primaryDark: "#86AFA0",
          primaryDarkHover: "#9ABFB2",
          secondaryDark: "#E89878",
          mistDark: "#8FAAB8",
          textPrimaryDark: "#F2F5F3",
          textSecondaryDark: "#A2AEA7",
          // Reactions
          empathy: "#E58EA4",
          strength: "#82B889",
          hope: "#7CB8D4",
          inspiration: "#E8A856",
          understood: "#B695C0",
        },
      },
      borderRadius: {
        "2xl": "16px",
        "3xl": "24px",
        "4xl": "32px",
      },
      animation: {
        "breathe-slow": "breathe 8s ease-in-out infinite",
        "fade-in": "fadeIn 0.4s ease-out forwards",
      },
      keyframes: {
        breathe: {
          "0%, 100%": { transform: "scale(1)", opacity: "0.8" },
          "50%": { transform: "scale(1.15)", opacity: "1" },
        },
        fadeIn: {
          "0%": { opacity: "0", transform: "translateY(8px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
