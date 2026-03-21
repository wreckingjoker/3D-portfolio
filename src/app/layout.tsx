import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import ModeController from "@/components/ModeController";
import CursorTrail from "@/components/CursorTrail";
import ThemeToggle from "@/components/ThemeToggle";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Shon Varghese — AI Automation · AI Video · 3D Web",
  description:
    "Portfolio of Shon Varghese — AI Automation Developer, AI Video Creator, and 3D Scroll Animation Website Builder based in Dubai, UAE.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased`}>
        <ModeController />
        <CursorTrail />
        <ThemeToggle />
        {children}
      </body>
    </html>
  );
}
