"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  Store,
  BookOpen,
  ImageIcon,
  ArrowLeft,
  ArrowRight,
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
// Nanti ganti dengan data dari API backend.

type StatusKarier = "Bekerja" | "Kuliah" | "Wirausaha" | "Lainnya";

type Alumni = {
  id: number;
  nama: string;
  email: string;
  angkatan: string;
  jurusan: string;
  statusKarier: StatusKarier;
  akunAktif: boolean;
};

const contoh = [
  "Arvin Hadiyyatullah",
  "El Razqa Chaeruzzaman",
  "Fachry Ahmad",
  "Jilan Indah Aprilianti",
  "Tiara Ahmadita",
  "Talita Vicki Sakhi",
  "Khalila Zira Adzkia",
];

const urutanStatus: StatusKarier[] = [
  "Bekerja",
  "Kuliah",
  "Wirausaha",
  "Lainnya",
  "Bekerja",
  "Bekerja",
  "Bekerja",
];

const daftarJurusan = [
  "Sistem Informasi Jaringan & Aplikasi ( SIJA )",
  "Rekayasa Perangkat Lunak ( RPL )",
  "Desain Komunikasi Visual ( DKV )",
  "Teknik Komputer & Jaringan ( TKJ )",
];

const daftarAngkatan = ["2027", "2026", "2025"];

const semuaAlumni: Alumni[] = Array.from({ length: 50 }, (_, i) => {
  const nama = contoh[i % contoh.length];
  return {
    id: i + 1,
    nama,
    email: `${nama.split(" ")[0].toLowerCase()}${i + 1}@gmail.com`,
    angkatan: daftarAngkatan[Math.floor(i / 10) % daftarAngkatan.length],
    jurusan: daftarJurusan[Math.floor(i / 7) % daftarJurusan.length],
    statusKarier: urutanStatus[i % urutanStatus.length],
    akunAktif: i % 11 !== 10,
  };
});

const PER_HALAMAN = 10;

const gayaStatusKarier: Record<StatusKarier, string> = {
  Bekerja: "border-green-300 bg-green-50 text-green-700",
  Kuliah: "border-[#2E62EA] bg-[#EEF3FE] text-[#2E62EA]",
  Wirausaha: "border-purple-300 bg-purple-50 text-purple-600",
  Lainnya: "border-amber-400 bg-amber-50 text-amber-600",
};

const stats: {
  title: string;
  value: string;
  note: string;
  icon: LucideIcon;
  iconBox: string;
}[] = [
  { title: "TOTAL Alumni", value: "2.400", note: "Terdaftar di sistem", icon: GraduationCap, iconBox: "bg-[#DCE6FD] text-[#2E62EA]" },
  { title: "BEKERJA", value: "1.400", note: "Alumni Bekerja", icon: Briefcase, iconBox: "bg-green-50 text-green-600" },
  { title: "PENDIDIKAN", value: "890", note: "Melanjutkan Studi", icon: Building2, iconBox: "bg-[#DCE6FD] text-[#2E62EA]" },
  { title: "WIRAUSAHA", value: "500", note: "Merintis Usaha", icon: Store, iconBox: "bg-purple-50 text-purple-600" },
  { title: "LAINNYA", value: "100", note: "Mencari kerja / lainnya", icon: BookOpen, iconBox: "bg-amber-100 text-amber-600" },
];

function buatDaftarHalaman(sekarang: number, total: number): (number | "...")[] {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (sekarang <= 3) return [1, 2, 3, "...", total];
  if (sekarang >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", sekarang - 1, sekarang, sekarang + 1, "...", total];
}

/* ============================ HALAMAN ALUMNI ============================ */

export default function AlumniPage() {
  const [halaman, setHalaman] = useState(1);

  const totalHalaman = Math.max(1, Math.ceil(semuaAlumni.length / PER_HALAMAN));
  const awal = (halaman - 1) * PER_HALAMAN;
  const tampil = semuaAlumni.slice(awal, awal + PER_HALAMAN);

  return (
    <AdminShell>
      <motion.div variants={wadah} initial="tersembunyi" animate="tampil">
        {/* Judul */}
        <motion.div variants={naik}>
          <h1 className="text-[34px] font-bold text-[#181B21]">Manajemen Alumni</h1>
          <p className="mt-2 text-[15px] text-[#666666]">
            Kelola dan pantau data alumni serta perkembangan status karier lulusan.
          </p>
        </motion.div>

        {/* 5 kartu */}
        <div className="mt-8 grid grid-cols-1 gap-5 sm:grid-cols-2 xl:grid-cols-5">
          {stats.map((s) => {
            const Icon = s.icon;
            return (
              <motion.div
                key={s.title}
                variants={naik}
                whileHover={{ y: -6, transition: { duration: 0.2 } }}
                className="group rounded-2xl border border-[#E8E9ED] bg-white px-5 py-5 shadow-sm transition-[box-shadow,border-color] duration-300 hover:border-[#6F94EE] hover:shadow-lg"
              >
                <div className="flex items-start justify-between">
                  <p className="text-[15px] text-[#666666]">{s.title}</p>
                  <span
                    className={`flex h-9 w-9 items-center justify-center rounded-lg transition-transform duration-300 group-hover:rotate-6 group-hover:scale-110 ${s.iconBox}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                </div>
                <p className="mt-3 text-[34px] font-bold leading-none text-[#181B21]">
                  <AngkaNaik nilai={s.value} />
                </p>
                <p className="mt-3 flex items-center gap-2 text-[15px] text-[#666666]">
                  <span className="h-2 w-2 shrink-0 rounded-full bg-[#2E62EA]" />
                  {s.note}
                </p>
              </motion.div>
            );
          })}
        </div>

        {/* Tabel */}
        <motion.section
          variants={naik}
          className="mt-8 overflow-hidden rounded-2xl border border-[#E8E9ED] bg-white"
        >
          <div className="overflow-x-auto">
            <table className="w-full min-w-[1000px] text-left text-[15px]">
              <thead>
                <tr className="border-b border-[#E8E9ED] bg-[#EEF3FE]/50 text-[#181B21]">
                  <th className="px-8 py-5 font-bold">ALUMNI</th>
                  <th className="px-4 py-5 font-bold">ANGKATAN</th>
                  <th className="px-4 py-5 font-bold">JURUSAN</th>
                  <th className="px-4 py-5 font-bold">STATUS KARIER</th>
                  <th className="px-4 py-5 font-bold">STATUS AKUN</th>
                  <th className="px-8 py-5 text-center font-bold">AKSI</th>
                </tr>
              </thead>
              {/* key={halaman}: baris muncul ulang dengan animasi setiap pindah halaman */}
              <motion.tbody key={halaman} variants={wadahBaris} initial="tersembunyi" animate="tampil">
                {tampil.map((a) => (
                  <motion.tr
                    key={a.id}
                    variants={baris}
                    className="group border-b border-[#E8E9ED] transition-colors duration-200 last:border-b-0 hover:bg-[#EEF3FE]/60"
                  >
                    <td className="px-8 py-5">
                      <div className="flex items-center gap-4">
                        <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#DCE6FD] text-[#2E62EA] transition-transform duration-300 group-hover:scale-110">
                          <ImageIcon className="h-6 w-6" strokeWidth={1.75} />
                        </span>
                        <div className="leading-snug">
                          <p className="font-bold text-[#181B21]">{a.nama}</p>
                          <p className="text-[14px] text-[#666666]">{a.email}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-4 py-5 text-[#181B21]">{a.angkatan}</td>
                    <td className="max-w-[260px] px-4 py-5 leading-snug text-[#181B21]">{a.jurusan}</td>
                    <td className="px-4 py-5">
                      <span
                        className={`inline-block whitespace-nowrap rounded-md border px-4 py-1.5 font-bold transition-transform duration-200 group-hover:scale-105 ${gayaStatusKarier[a.statusKarier]}`}
                      >
                        {a.statusKarier}
                      </span>
                    </td>
                    <td className="px-4 py-5">
                      <span
                        className={`inline-block rounded-md border px-4 py-1.5 font-bold ${
                          a.akunAktif
                            ? "border-green-300 bg-green-50 text-green-700"
                            : "border-[#E8E9ED] bg-[#F6F7F8] text-[#666666]"
                        }`}
                      >
                        {a.akunAktif ? "Aktif" : "Nonaktif"}
                      </span>
                    </td>
                    <td className="px-8 py-5 text-center">
                      <Link
                        href={`/alumni/${a.id}`}
                        className="relative inline-block whitespace-nowrap font-bold text-[#2E62EA] after:absolute after:-bottom-0.5 after:left-0 after:h-0.5 after:w-0 after:bg-[#2E62EA] after:transition-all after:duration-300 hover:after:w-full"
                      >
                        Lihat Detail
                      </Link>
                    </td>
                  </motion.tr>
                ))}
              </motion.tbody>
            </table>
          </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E8E9ED] px-8 py-5">
          <p className="text-[17px] font-bold text-[#181B21]">
            Menampilkan {awal + 1}-{Math.min(awal + PER_HALAMAN, semuaAlumni.length)} dari{" "}
            {semuaAlumni.length} Alumni
          </p>

          <div className="flex items-center gap-3">
            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setHalaman((h) => Math.max(1, h - 1))}
              disabled={halaman === 1}
              className="flex h-11 items-center gap-2 rounded-lg border border-[#E8E9ED] px-5 text-[15px] font-medium text-[#181B21] transition-colors hover:bg-[#EEF3FE] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </motion.button>

            {buatDaftarHalaman(halaman, totalHalaman).map((h, i) =>
              h === "..." ? (
                <span key={`titik-${i}`} className="px-2 text-xl font-bold text-[#181B21]">
                  •••
                </span>
              ) : (
                <motion.button
                  key={h}
                  whileTap={{ scale: 0.9 }}
                  onClick={() => setHalaman(h)}
                  className={`h-11 w-11 rounded-lg border text-[15px] font-medium transition-colors ${
                    h === halaman
                      ? "border-[#2E62EA] bg-[#2E62EA] text-white"
                      : "border-[#E8E9ED] text-[#181B21] hover:bg-[#EEF3FE]"
                  }`}
                >
                  {h}
                </motion.button>
              )
            )}

            <motion.button
              whileTap={{ scale: 0.94 }}
              onClick={() => setHalaman((h) => Math.min(totalHalaman, h + 1))}
              disabled={halaman === totalHalaman}
              className="flex h-11 items-center gap-2 rounded-lg border border-[#E8E9ED] px-5 text-[15px] font-medium text-[#181B21] transition-colors hover:bg-[#EEF3FE] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next <ArrowRight className="h-4 w-4" />
            </motion.button>
          </div>
        </div>
        </motion.section>
      </motion.div>
    </AdminShell>
  );
}