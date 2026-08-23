import type { Config } from "tailwindcss";

const config: Config = {
  darkMode: ["class"],
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./lib/**/*.{ts,tsx}",
    "./types/**/*.{ts,tsx}"
  ],
  theme: {
    extend: {
      colors: {
        border: "hsl(var(--border))",
        input: "hsl(var(--input))",
        ring: "hsl(var(--ring))",
        background: "hsl(var(--background))",
        foreground: "hsl(var(--foreground))",
        primary: {
          DEFAULT: "hsl(var(--primary))",
          foreground: "hsl(var(--primary-foreground))"
        },
        secondary: {
          DEFAULT: "hsl(var(--secondary))",
          foreground: "hsl(var(--secondary-foreground))"
        },
        muted: {
          DEFAULT: "hsl(var(--muted))",
          foreground: "hsl(var(--muted-foreground))"
        },
        accent: {
          DEFAULT: "hsl(var(--accent))",
          foreground: "hsl(var(--accent-foreground))"
        },
        card: {
          DEFAULT: "hsl(var(--card))",
          foreground: "hsl(var(--card-foreground))"
        },
        destructive: {
          DEFAULT: "hsl(var(--destructive))",
          foreground: "hsl(var(--destructive-foreground))"
        }
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)"
      },
      keyframes: {
        wave: {
          "0%, 100%": { transform: "scaleY(.28)", opacity: ".62" },
          "45%": { transform: "scaleY(1)", opacity: "1" }
        },
        pulseSoft: {
          "0%, 100%": { opacity: ".55" },
          "50%": { opacity: "1" }
        },
        floatPanel: {
          "0%, 100%": { transform: "translate3d(0, 0, 0) rotate(0deg)" },
          "50%": { transform: "translate3d(0, -14px, 0) rotate(1deg)" }
        },
        drift: {
          "0%": { transform: "translateX(-12%)" },
          "100%": { transform: "translateX(12%)" }
        },
        slideUp: {
          "0%": { transform: "translateY(18px)", opacity: "0" },
          "100%": { transform: "translateY(0)", opacity: "1" }
        },
        shimmer: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" }
        }
      },
      animation: {
        wave: "wave 1.15s ease-in-out infinite",
        pulseSoft: "pulseSoft 1.8s ease-in-out infinite",
        floatPanel: "floatPanel 6s ease-in-out infinite",
        drift: "drift 8s ease-in-out infinite alternate",
        slideUp: "slideUp .7s ease-out both",
        shimmer: "shimmer 5s linear infinite"
      }
    }
  },
  plugins: []
};

export default config;
