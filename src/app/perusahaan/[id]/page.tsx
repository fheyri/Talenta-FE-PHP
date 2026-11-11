"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
import { motion, MotionConfig, type Variants } from "framer-motion";
import {
  LayoutGrid,
  Briefcase,
  Building2,
  Brain,
  Users,
  GraduationCap,
  BarChart3,
  Activity,
  Lock,
  Settings,
  LogOut,
  Search,
  Plus,
  Bell,
  Calendar,
  ArrowLeft,
  Info,
  MapPin,
  Globe,
  Mail,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/*
  COLOR PALETTE (dipakai sebagai class Tailwind di bawah)
  #2E62EA  Tombol utama, card utama, active state
  #4276E8  Highlight, icon, elemen interaktif
  #6F94EE  Gradient / secondary element
  #DCE6FD  Background card, selected state
  #EEF3FE  Background section / subtle highlight
  #F6F7F8  Background utama dashboard
  #181B21  Heading dan teks utama
  #666666  Deskripsi / secondary text
  #E8E9ED  Border dan divider
*/

/* ============================ LAYOUT: SIDEBAR + TOPBAR ============================ */

type MenuItem = { label: string; href: string; icon: LucideIcon; badge?: string };

const mainMenu: MenuItem[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Lowongan", href: "/lowongan", icon: Briefcase, badge: "99+" },
  { label: "Perusahaan", href: "/perusahaan", icon: Building2 },
  { label: "Tes Psikotes", href: "/psikotes", icon: Brain },
  { label: "Siswa", href: "/siswa", icon: Users },
  { label: "Alumni", href: "/alumni", icon: GraduationCap },
  { label: "Monitoring Karier", href: "/monitoring", icon: BarChart3 },
  { label: "Analytics", href: "/analytics", icon: Activity },
];

const systemMenu: MenuItem[] = [
  { label: "Manajemen Admin", href: "/admin", icon: Lock },
  { label: "Pengaturan", href: "/pengaturan", icon: Settings },
];

function NavItem({ item, active }: { item: MenuItem; active: boolean }) {
  const Icon = item.icon;
  return (
    <Link
      href={item.href}
      className={`group flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-all duration-200 hover:translate-x-1 ${
        active ? "bg-[#DCE6FD] text-[#2E62EA]" : "text-[#181B21] hover:bg-[#DCE6FD]/60"
      }`}
    >
      <Icon
        className={`h-5 w-5 transition-transform duration-200 group-hover:scale-110 ${active ? "text-[#2E62EA]" : "text-[#666666]"}`}
        strokeWidth={1.75}
      />
      <span className="flex-1">{item.label}</span>
      {item.badge && (
        <span className="rounded-full bg-[#DCE6FD] px-2 py-0.5 text-xs font-semibold text-[#2E62EA]">
          {item.badge}
        </span>
      )}
    </Link>
  );
}

function Sidebar() {
  const pathname = usePathname();
  const isActive = (href: string) => pathname === href || pathname.startsWith(href + "/");

  return (
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-[#E8E9ED] bg-[#EEF3FE]">
      <div className="flex h-[81px] items-center gap-3 border-b border-[#E8E9ED] px-7">
        <Image
          src="/images/logo-talenta.png"
          alt="Logo Talenta"
          width={44}
          height={44}
          className="h-11 w-auto object-contain"
          priority
        />
        <div className="leading-tight">
          <p className="text-xl font-bold text-[#181B21]">Talenta</p>
          <p className="text-sm text-[#666666]">SMKN 1 Cibinong</p>
        </div>
      </div>

      <nav className="flex-1 overflow-y-auto px-2 py-5">
        <p className="mb-3 px-5 text-[15px] text-[#666666]">Main menu</p>
        <div className="space-y-1">
          {mainMenu.map((m) => (
            <NavItem key={m.label} item={m} active={isActive(m.href)} />
          ))}
        </div>

        <p className="mb-3 mt-6 px-5 text-[15px] text-[#666666]">System</p>
        <div className="space-y-1">
          {systemMenu.map((m) => (
            <NavItem key={m.label} item={m} active={isActive(m.href)} />
          ))}
        </div>
      </nav>

      <div className="mx-5 flex items-center gap-3 border-t border-[#E8E9ED] py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2E62EA] text-base font-bold text-white ring-2 ring-[#DCE6FD]">
          FA
        </div>
        <div className="flex-1 leading-tight">
          <p className="font-bold text-[#181B21]">Fachry Ahmad</p>
          <p className="text-sm text-[#666666]">SMKN 1 Cibinong</p>
        </div>
        <button aria-label="Keluar" className="text-[#666666] hover:text-[#181B21]">
          <LogOut className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
    </aside>
  );
}

function Topbar() {
  const [tanggal, setTanggal] = useState("");

  useEffect(() => {
    const t = new Intl.DateTimeFormat("id-ID", {
      weekday: "long",
      day: "numeric",
      month: "long",
      year: "numeric",
    }).format(new Date());
    setTanggal(t.replace(/^([^\s,]+),?\s*/, "$1, "));
  }, []);

  return (
    <header className="flex h-[81px] shrink-0 items-center gap-5 border-b border-[#E8E9ED] bg-[#F6F7F8] px-8">
      <div className="relative max-w-[590px] flex-1">
        <Search className="absolute left-4 top-1/2 h-5 w-5 -translate-y-1/2 text-[#666666]" />
        <input
          type="text"
          placeholder="Cari data siswa, lowongan, atau perusahaan ....."
          className="h-[52px] w-full rounded-lg border border-[#E8E9ED] bg-white pl-12 pr-4 text-[15px] text-[#181B21] placeholder:text-[#666666] focus:border-[#2E62EA] focus:outline-none focus:ring-2 focus:ring-[#DCE6FD]"
        />
      </div>

      <Link
        href="/lowongan/tambah"
        className="flex h-[52px] items-center gap-3 rounded-lg bg-[#2E62EA] px-7 text-[15px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4276E8] hover:shadow-md active:scale-[0.98]"
      >
        <Plus className="h-5 w-5" strokeWidth={2.25} />
        Tambah Lowongan
      </Link>

      <motion.button
        aria-label="Notifikasi"
        initial="diam"
        whileHover="goyang"
        whileTap={{ scale: 0.95 }}
        className="relative flex h-[52px] w-[62px] items-center justify-center rounded-lg border border-[#E8E9ED] bg-white text-[#181B21] transition-colors hover:bg-[#EEF3FE]"
      >
        <motion.span
          className="inline-flex origin-top"
          variants={{
            diam: { rotate: 0 },
            goyang: { rotate: [0, -18, 14, -10, 6, 0], transition: { duration: 0.6 } },
          }}
        >
          <Bell className="h-6 w-6" strokeWidth={1.75} />
        </motion.span>
        <span className="absolute right-[18px] top-[13px] h-2.5 w-2.5 animate-ping rounded-full bg-red-400 opacity-75" />
        <span className="absolute right-[18px] top-[13px] h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
      </motion.button>

      <div className="flex h-[52px] min-w-[240px] items-center gap-3 rounded-lg border border-[#E8E9ED] bg-white px-5 text-[15px] text-[#666666]">
        <Calendar className="h-5 w-5" strokeWidth={1.75} />
        <span>{tanggal}</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2E62EA] text-lg font-bold text-white ring-2 ring-[#DCE6FD]">
          FA
        </div>
        <div className="leading-tight">
          <p className="text-xl font-bold text-[#181B21]">Fachry Ahmad</p>
          <span className="mt-1 inline-block rounded-full bg-[#DCE6FD] px-3 py-0.5 text-sm text-[#2E62EA]">
            Super Admin
          </span>
        </div>
      </div>
    </header>
  );
}

function AdminShell({ children }: { children: React.ReactNode }) {
  return (
    <MotionConfig reducedMotion="user">
      <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto px-10 py-10">{children}</main>
        </div>
      </div>
    </MotionConfig>
  );
}

/* ============================ ANIMASI ============================ */
// Memakai framer-motion (sudah terpasang di project, dipakai juga di halaman login).
// Otomatis menyesuaikan dengan pengaturan "kurangi animasi" di perangkat (lihat MotionConfig di AdminShell).

const easeHalus: [number, number, number, number] = [0.22, 1, 0.36, 1];

// Kontainer: anak-anaknya muncul satu per satu
const wadah: Variants = {
  tersembunyi: {},
  tampil: { transition: { staggerChildren: 0.07, delayChildren: 0.05 } },
};

// Elemen muncul dari bawah sambil memudar masuk
const naik: Variants = {
  tersembunyi: { opacity: 0, y: 18 },
  tampil: { opacity: 1, y: 0, transition: { duration: 0.5, ease: easeHalus } },
};

// Untuk baris tabel / daftar
const wadahBaris: Variants = {
  tersembunyi: {},
  tampil: { transition: { staggerChildren: 0.045, delayChildren: 0.15 } },
};

const baris: Variants = {
  tersembunyi: { opacity: 0, x: -12 },
  tampil: { opacity: 1, x: 0, transition: { duration: 0.35, ease: easeHalus } },
};

// Angka yang menghitung naik dari 0 saat halaman dibuka
function AngkaNaik({ nilai }: { nilai: string }) {
  const target = Number(nilai.replace(/\D/g, ""));
  const [tampil, setTampil] = useState(0);

  useEffect(() => {
    const kurangiGerak = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const durasi = kurangiGerak ? 0 : 1000;
    const mulai = performance.now();
    let frame = 0;

    const tick = (sekarang: number) => {
      const p = durasi === 0 ? 1 : Math.min((sekarang - mulai) / durasi, 1);
      const halus = 1 - Math.pow(1 - p, 3);
      setTampil(Math.round(target * halus));
      if (p < 1) frame = requestAnimationFrame(tick);
    };

    frame = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(frame);
  }, [target]);

  return <>{new Intl.NumberFormat("id-ID").format(tampil)}</>;
}

/* ============================ DATA DUMMY ============================ */
// Nanti ganti dengan data dari API backend berdasarkan `id` di URL.

type LowonganPerusahaan = {
  id: number;
  posisi: string;
  jurusan: string[];
  tipe: string;
  kuota: number;
  batas: string;
  aktif: boolean;
};

type DetailPerusahaan = {
  nama: string;
  inisial: string;
  idKemitraan: string;
  terdaftarSejak: string;
  verifikasi: string;
  alamat: string;
  website: string;
  email: string;
  totalLowongan: number;
  lowonganAktif: number;
  siswaDiterima: number;
  profil: string;
  skala: string;
  program: string;
  pic: { nama: string; jabatan: string; telepon: string; email: string };
  lowongan: LowonganPerusahaan[];
};

function ambilDetailPerusahaan(id: string): DetailPerusahaan {
  void id; // TODO: ganti dengan request GET ke API backend memakai `id`.
  return {
    nama: "PT Teknologi Nusantara",
    inisial: "TN",
    idKemitraan: "0001-2026-001",
    terdaftarSejak: "14 Januari 2022",
    verifikasi: "Terverifikasi BKK Pusat Keunggulan",
    alamat: "Jl. Sudirman Kav. 52-53, Jakarta Selatan",
    website: "www.teknologinusantara.co.id",
    email: "hrd@teknologinusantara.co.id",
    totalLowongan: 4,
    lowonganAktif: 3,
    siswaDiterima: 8,
    profil:
      "Kami membuka kesempatan bagi talenta muda SMK Negeri 1 Cibinong untuk bergabung dalam tim Software Engineering PT Teknologi Nusantara. Anda akan terlibat langsung dalam pembangunan komponen antarmuka sistem enterprise menggunakan standar modern front-end web stack.",
    skala: "Enterprise (500 - 1.000 Karyawan)",
    program: "PKL 6 Bulan, Kelas Industri, Rekrutmen Lulusan",
    pic: {
      nama: "Dayu Destamy",
      jabatan: "Head of Talent Acquisition & HRD",
      telepon: "08391272322",
      email: "dayu.teknologinusantara@gmail.com",
    },
    lowongan: [
      { id: 1, posisi: "Junior Frontend Developer ( React / Next.js )", jurusan: ["RPL"], tipe: "Full Time / Onsite Jakarta", kuota: 3, batas: "02 Oktober 2026", aktif: true },
      { id: 2, posisi: "UIUX Designer", jurusan: ["RPL", "SIJA", "DKV"], tipe: "Full Time / Onsite Jakarta", kuota: 3, batas: "02 Oktober 2026", aktif: true },
      { id: 3, posisi: "Junior Frontend Developer ( React / Next.js )", jurusan: ["RPL"], tipe: "Full time Kontrak", kuota: 3, batas: "02 Oktober 2026", aktif: true },
    ],
  };
}

/* ============================ HALAMAN DETAIL PERUSAHAAN ============================ */

export default function DetailPerusahaanPage() {
  const params = useParams<{ id: string }>();
  const d = ambilDetailPerusahaan(params.id);

  const ringkasan = [
    { label: "Total Lowongan", nilai: d.totalLowongan },
    { label: "Lowongan Aktif", nilai: d.lowonganAktif },
    { label: "Siswa Diterima", nilai: d.siswaDiterima },
  ];

  return (
    <AdminShell>
      <motion.div variants={wadah} initial="tersembunyi" animate="tampil">
        <motion.div variants={naik}>
          <Link
            href="/perusahaan"
            className="inline-flex items-center gap-3 text-[15px] font-medium text-[#2E62EA] hover:underline"
          >
            <ArrowLeft className="h-5 w-5" />
            Kembali ke Perusahaan
          </Link>

          <h1 className="mt-7 text-[34px] font-bold text-[#181B21]">Detail Perusahaan</h1>
        </motion.div>

        {/* Kartu identitas perusahaan */}
        <motion.section variants={naik} className="mt-7 flex flex-col gap-6 rounded-2xl border border-[#E8E9ED] bg-white px-8 py-7 xl:flex-row xl:items-center xl:justify-between xl:gap-8 transition-shadow duration-300 hover:shadow-md">
          <div className="flex min-w-0 items-center gap-5">
            <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-xl border border-[#6F94EE] bg-[#DCE6FD]/60 text-[28px] font-bold text-[#2E62EA]">
              {d.inisial}
            </div>

            <div className="min-w-0">
              <h2 className="text-[28px] font-bold leading-tight text-[#181B21]">{d.nama}</h2>
              <p className="mt-2 text-[14px] text-[#666666]">
                ID Kemitraan: {d.idKemitraan} • Terdaftar sejak {d.terdaftarSejak} • {d.verifikasi}
              </p>
              <div className="mt-3 flex flex-wrap items-center gap-x-5 gap-y-2 text-[14px] text-[#181B21]">
                <span className="flex items-center gap-2">
                  <MapPin className="h-4 w-4 text-[#666666]" strokeWidth={1.75} />
                  {d.alamat}
                </span>
                <span className="flex items-center gap-2">
                  <Globe className="h-4 w-4 text-[#666666]" strokeWidth={1.75} />
                  {d.website}
                </span>
                <span className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-[#666666]" strokeWidth={1.75} />
                  {d.email}
                </span>
              </div>
            </div>
          </div>

          {/* Ringkasan angka */}
          <div className="grid shrink-0 grid-cols-3 divide-x divide-[#6F94EE]/50 self-start rounded-xl border border-[#6F94EE] bg-[#EEF3FE]/60 py-4 xl:self-center">
            {ringkasan.map((r) => (
              <div key={r.label} className="px-5 text-center">
                <p className="text-[13px] text-[#666666]">{r.label}</p>
                <p className="mt-2 text-[28px] font-bold leading-none text-[#181B21]"><AngkaNaik nilai={String(r.nilai)} />
                </p>
              </div>
            ))}
          </div>
        </motion.section>

        {/* Profile + Kontak */}
        <div className="mt-7 grid grid-cols-1 gap-6 xl:grid-cols-[2.1fr_1fr]">
          <motion.section variants={naik} className="rounded-2xl border border-[#E8E9ED] bg-white p-8 transition-shadow duration-300 hover:shadow-md">
            <h2 className="flex items-center gap-3 text-[24px] font-bold text-[#181B21]">
              <Info className="h-6 w-6 text-[#2E62EA]" strokeWidth={1.75} />
              Profile Perusahaan
            </h2>
            <p className="mt-6 text-[16px] leading-8 text-[#181B21]">{d.profil}</p>

            <div className="mt-8 border-t border-[#E8E9ED] pt-8">
              <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
                <div>
                  <p className="text-[15px] text-[#666666]">Skala Perusahaan</p>
                  <p className="mt-2 text-[20px] text-[#181B21]">{d.skala}</p>
                </div>
                <div>
                  <p className="text-[15px] text-[#666666]">Program Kemitraan</p>
                  <p className="mt-2 text-[20px] text-[#181B21]">{d.program}</p>
                </div>
              </div>
            </div>
          </motion.section>

          <motion.section variants={naik} className="rounded-2xl border border-[#E8E9ED] bg-white p-8 transition-shadow duration-300 hover:shadow-md">
            <h2 className="flex items-center gap-3 text-[24px] font-bold text-[#181B21]">
              <Info className="h-6 w-6 text-[#2E62EA]" strokeWidth={1.75} />
              Kontak Person
            </h2>

            <div className="mt-6 flex items-center gap-4">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-full bg-[#2E62EA] text-xl font-bold text-white">
                {d.pic.nama
                  .split(" ")
                  .map((k) => k[0])
                  .slice(0, 2)
                  .join("")}
              </div>
              <div className="leading-snug">
                <p className="text-[17px] font-semibold text-[#181B21]">{d.pic.nama}</p>
                <p className="text-[15px] text-[#666666]">{d.pic.jabatan}</p>
              </div>
            </div>

            <div className="mt-7 space-y-3">
              <div className="flex items-center justify-between gap-4 rounded-lg border border-[#DCE6FD] bg-[#EEF3FE]/60 px-4 py-3.5">
                <span className="text-[15px] text-[#666666]">No Whatsapp / Telp</span>
                <a href={`tel:${d.pic.telepon}`} className="text-[17px] text-[#181B21] hover:text-[#2E62EA]">
                  {d.pic.telepon}
                </a>
              </div>
              <div className="flex items-center justify-between gap-4 rounded-lg border border-[#DCE6FD] bg-[#EEF3FE]/60 px-4 py-3.5">
                <span className="text-[15px] text-[#666666]">Email</span>
                <a
                  href={`mailto:${d.pic.email}`}
                  className="break-all text-right text-[17px] text-[#181B21] hover:text-[#2E62EA]"
                >
                  {d.pic.email}
                </a>
              </div>
            </div>
          </motion.section>
        </div>

        {/* Daftar lowongan */}
        <motion.section variants={naik} className="mt-7 overflow-hidden rounded-2xl border border-[#E8E9ED] bg-white transition-shadow duration-300 hover:shadow-md">
          <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#E8E9ED] px-8 py-5">
            <div className="flex items-center gap-4">
              <h2 className="text-[17px] font-bold text-[#181B21]">Daftar Lowongan dari Perusahaan Ini</h2>
              <span className="rounded-full bg-[#DCE6FD] px-3.5 py-1 text-sm font-medium text-[#2E62EA]">
                {d.lowonganAktif} Aktif
              </span>
            </div>
            <Link
              href="/lowongan/tambah"
              className="flex items-center gap-1.5 text-[15px] font-semibold text-[#2E62EA] hover:underline"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              Tambah Lowongan Baru
            </Link>
          </div>

          <div className="overflow-x-auto">
            <table className="w-full min-w-[900px] text-left text-[15px]">
              <thead>
                <tr className="border-b border-[#E8E9ED] bg-[#EEF3FE]/50 text-[#181B21]">
                  <th className="px-8 py-5 font-bold">POSISI LOWONGAN</th>
                  <th className="px-4 py-5 font-bold">JURUSAN PRIORITAS</th>
                  <th className="px-4 py-5 font-bold">TIPE KERJA</th>
                  <th className="px-4 py-5 font-bold">KUOTA</th>
                  <th className="px-4 py-5 text-center font-bold">BATAS PENDAFTARAN</th>
                  <th className="px-8 py-5 text-center font-bold">STATUS</th>
                </tr>
              </thead>
              <motion.tbody variants={wadahBaris}>
                {d.lowongan.map((l) => (
                  <motion.tr
                    key={l.id}
                    variants={baris}
                    className="group border-b border-[#E8E9ED] transition-colors duration-200 last:border-b-0 hover:bg-[#EEF3FE]/60"
                  >
                    <td className="px-8 py-5 font-semibold text-[#181B21] transition-colors group-hover:text-[#2E62EA]">{l.posisi}</td>
                    <td className="px-4 py-5">
                      <div className="flex flex-wrap gap-2">
                        {l.jurusan.map((j) => (
                          <span
                            key={j}
                            className="rounded-md bg-[#DCE6FD] px-3.5 py-1.5 text-sm font-semibold text-[#2E62EA]"
                          >
                            {j}
                          </span>
                        ))}
                      </div>
                    </td>
                    <td className="px-4 py-5 text-[#181B21]">{l.tipe}</td>
                    <td className="px-4 py-5 font-semibold text-[#2E62EA]">{l.kuota} Siswa</td>
                    <td className="px-4 py-5 text-center text-[#181B21]">{l.batas}</td>
                    <td className="px-8 py-5 text-center">
                      <span
                        className={`inline-block rounded-md border px-4 py-1.5 font-medium ${
                          l.aktif
                            ? "border-green-300 bg-green-50 text-green-700"
                            : "border-[#E8E9ED] bg-[#F6F7F8] text-[#666666]"
                        }`}
                      >
                        {l.aktif ? "Aktif" : "Expired"}
                      </span>
                    </td>
                  </motion.tr>
                ))}

                {d.lowongan.length === 0 && (
                  <tr>
                    <td colSpan={6} className="px-8 py-12 text-center text-[#666666]">
                      Perusahaan ini belum memiliki lowongan.
                    </td>
                  </tr>
                )}
              </motion.tbody>
            </table>
          </div>
        </motion.section>
      </motion.div>
    </AdminShell>
  );
}