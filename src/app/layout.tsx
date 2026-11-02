import type { Metadata, Viewport } from "next";
import "@/styles/globals.css";
import { FloatingNavbar } from "@/components/navigation/FloatingNavbar";
import { BackToTop } from "@/components/common/BackToTop";
import { MusicPlayer } from "@/components/audio/MusicPlayer";

export const metadata: Metadata = {
  title: "HER UNIVERSE | Akriti Singh",
  description: "A little universe created exclusively for Akriti Singh. A universe where she is the main character.",
  keywords: ["Akriti Singh", "Birthday", "Her Universe", "19th Birthday", "Interactive Experience"],
  authors: [{ name: "Her Universe" }],
  openGraph: {
    title: "HER UNIVERSE | Akriti Singh",
    description: "A universe where she is the main character. An extraordinary interactive birthday experience.",
    type: "website",
  },
  icons: {
    icon: "/favicon.ico",
  },
};

export const viewport: Viewport = {
  themeColor: "#09080F",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="bg-midnight text-ivory antialiased selection:bg-gold/30 selection:text-white">
        <FloatingNavbar />
        <main className="relative min-h-screen">
          {children}
        </main>
        <MusicPlayer />
        <BackToTop />
      </body>
    </html>
  );
}
