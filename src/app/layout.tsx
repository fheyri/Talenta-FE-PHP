import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { SplashScreen } from "@/components/splash-screen";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TALENTA BKK OS - Portal Khusus Pengelola BKK Sekolah",
  description:
    "Platform tata kelola karir terpadu untuk monitoring tracer study, verifikasi lowongan kerja resmi, dan rekapitulasi data BKK sekolah secara akurat.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased font-sans`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-[#0F62FE] selection:text-white antialiased">
        <SplashScreen />
        {children}
      </body>
    </html>
  );
}
