import type { Metadata, Viewport } from "next";
import "./globals.css";

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
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Cinzel:wght@400;600;700&family=Cormorant+Garamond:ital,wght@0,400;0,600;1,400&family=Dancing+Script:wght@500;700&family=Inter:wght@300;400;500;600&family=Playfair+Display:ital,wght@0,400;0,600;0,700;1,400&family=Space+Grotesk:wght@400;500;600&display=swap"
          rel="stylesheet"
        />
      </head>
      <body className="bg-[#07050B] text-[#F8F1E8] antialiased min-h-screen relative overflow-x-hidden selection:bg-[#E8C994] selection:text-[#07050B]">
        <audio
          id="her-universe-soundtrack"
          src="/assets/music/one-of-the-girls.mp3"
          loop
          preload="auto"
          playsInline
          autoPlay
        />
        {children}
      </body>
    </html>
  );
}
