import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        midnight: {
          DEFAULT: "#09080F",
          light: "#120F1F",
          dark: "#050409",
        },
        purple: {
          deep: "#171126",
          royal: "#30204D",
          mystic: "#493570",
        },
        lavender: {
          DEFAULT: "#C5B2E8",
          light: "#E1D6F6",
          dark: "#9E82D1",
        },
        dustypink: {
          DEFAULT: "#DDAEBC",
          light: "#EDC9D4",
          dark: "#B88697",
        },
        gold: {
          DEFAULT: "#D6BD8B",
          champagne: "#D6BD8B",
          light: "#EFE2C5",
          dark: "#A38A52",
        },
        ivory: {
          DEFAULT: "#F5F0E8",
          warm: "#F5F0E8",
          soft: "#FAF7F2",
          muted: "#E0D7C8",
        },
      },
      fontFamily: {
        serif: ["var(--font-cormorant)", "Georgia", "serif"],
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        script: ["var(--font-great-vibes)", "cursive"],
        cinematic: ["var(--font-cinzel)", "Cinzel", "serif"],
      },
      animation: {
        "float-slow": "float 8s ease-in-out infinite",
        "float-medium": "float 5s ease-in-out infinite",
        "pulse-subtle": "pulseSubtle 4s ease-in-out infinite",
        "glow": "glow 3s ease-in-out infinite alternate",
        "twinkle": "twinkle 3s ease-in-out infinite alternate",
        "shimmer": "shimmer 2.5s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        pulseSubtle: {
          "0%, 100%": { opacity: "1", transform: "scale(1)" },
          "50%": { opacity: "0.85", transform: "scale(1.02)" },
        },
        glow: {
          "0%": { filter: "drop-shadow(0 0 10px rgba(214, 189, 139, 0.3))" },
          "100%": { filter: "drop-shadow(0 0 24px rgba(214, 189, 139, 0.7))" },
        },
        twinkle: {
          "0%": { opacity: "0.2", transform: "scale(0.8)" },
          "100%": { opacity: "1", transform: "scale(1.2)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "cosmic-glow": "radial-gradient(ellipse at 50% 30%, rgba(48, 32, 77, 0.6) 0%, rgba(23, 17, 38, 0.8) 50%, rgba(9, 8, 15, 1) 100%)",
        "gold-shimmer": "linear-gradient(90deg, #D6BD8B 0%, #FFF4DE 50%, #D6BD8B 100%)",
      },
    },
  },
  plugins: [],
};

export default config;
