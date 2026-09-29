import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "TALENTA BKK OS - Portal Khusus Pengelola BKK Sekolah",
  description:
    "Platform tata kelola karir terpadu untuk monitoring tracer study, verifikasi lowongan kerja resmi, dan rekapitulasi data BKK sekolah secara akurat.",
  keywords: [
    "TALENTA",
    "BKK OS",
    "Bursa Kerja Khusus",
    "Tracer Study",
    "Vokasi",
    "SMK",
    "Lowongan Kerja",
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col font-sans selection:bg-[#0F62FE] selection:text-white">
        {children}
      </body>
    </html>
  );
}
