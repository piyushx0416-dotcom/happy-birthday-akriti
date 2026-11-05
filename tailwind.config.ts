import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        universe: {
          black: "#08080D", // Primary Background
          charcoal: "#111119", // Secondary Background
          surface: "#151522",
          card: "#191928",
          border: "rgba(255, 61, 145, 0.18)",
        },
        accent: {
          pink: "#FF3D91", // Primary Accent (Electric Pink)
          rose: "#FF9FCB", // Secondary Accent (Soft Rose)
          gold: "#E8C994", // Additional Accent (Champagne Gold)
          lavender: "#BBA7FF", // Additional Accent (Lavender)
          ivory: "#F8F1E8", // Additional Accent (Warm Ivory)
        },
        obsidian: {
          950: "#08080D",
          900: "#0d0d16",
          800: "#141422",
          700: "#1c1c30",
        },
        gold: {
          champagne: "#E8C994",
          metallic: "#d4af37",
          shimmer: "#ebd399",
        },
        ivory: {
          warm: "#F8F1E8",
          soft: "#f2ece2",
          paper: "#faf6ef",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Playfair Display", "serif"],
        display: ["var(--font-playfair)", "var(--font-cinzel)", "serif"],
        sans: ["var(--font-space-grotesk)", "var(--font-inter)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
        dancing: ["var(--font-dancing)", "Dancing Script", "cursive"],
      },
      animation: {
        "float-slow": "float 7s ease-in-out infinite",
        "float-reverse": "floatReverse 8s ease-in-out infinite",
        "pulse-glow": "pulseGlow 3.5s ease-in-out infinite",
        "pulse-pink": "pulsePink 2.5s ease-in-out infinite",
        "shimmer-slide": "shimmerSlide 3s linear infinite",
        "spin-slow": "spin 25s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        floatReverse: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(12px)" },
        },
        pulseGlow: {
          "0%, 100%": { opacity: "0.6", transform: "scale(1)" },
          "50%": { opacity: "1", transform: "scale(1.04)" },
        },
        pulsePink: {
          "0%, 100%": {
            boxShadow: "0 0 15px rgba(255, 61, 145, 0.3)",
            borderColor: "rgba(255, 61, 145, 0.4)",
          },
          "50%": {
            boxShadow: "0 0 35px rgba(255, 61, 145, 0.7)",
            borderColor: "rgba(255, 61, 145, 0.9)",
          },
        },
        shimmerSlide: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
