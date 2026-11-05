import type { Metadata, Viewport } from "next";
import { Cormorant_Garamond, Playfair_Display, Cinzel, Space_Grotesk, Inter, Dancing_Script } from "next/font/google";
import "./globals.css";

const cormorant = Cormorant_Garamond({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-cormorant",
  display: "swap",
});

const dancing = Dancing_Script({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  variable: "--font-dancing",
  display: "swap",
});

const playfair = Playfair_Display({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-playfair",
  display: "swap",
});

const cinzel = Cinzel({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-cinzel",
  display: "swap",
});

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
  variable: "--font-space-grotesk",
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
  variable: "--font-inter",
  display: "swap",
});

export const viewport: Viewport = {
  themeColor: "#07050B",
  width: "device-width",
  initialScale: 1,
};

export const metadata: Metadata = {
  title: "AKRITI SINGH // 06.NOV — HAUTE ÉDITION",
  description: "An extraordinary personalized digital experience created for Akriti Singh's 19th Birthday on November 6, 2026.",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${cormorant.variable} ${dancing.variable} ${playfair.variable} ${cinzel.variable} ${spaceGrotesk.variable} ${inter.variable}`}
    >
      <body className="bg-[#07050B] text-[#F8F1E8] antialiased min-h-screen relative overflow-x-hidden selection:bg-[#E8C994] selection:text-[#07050B]">
        {children}
      </body>
    </html>
  );
}
