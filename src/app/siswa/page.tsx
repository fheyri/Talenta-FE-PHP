"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Briefcase,
  Building2,
  ClipboardList,
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
  CheckCircle2,
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
  { label: "Psikotes", href: "/psikotes", icon: ClipboardList },
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
      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-colors ${
        active ? "bg-[#DCE6FD] text-[#2E62EA]" : "text-[#181B21] hover:bg-[#DCE6FD]/60"
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? "text-[#2E62EA]" : "text-[#666666]"}`} strokeWidth={1.75} />
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
          <p className="font-bold text-[#181B21]">Fachry Achmad</p>
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
        className="flex h-[52px] items-center gap-3 rounded-lg bg-[#2E62EA] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#4276E8]"
      >
        <Plus className="h-5 w-5" strokeWidth={2.25} />
        Tambah Lowongan
      </Link>

      <button
        aria-label="Notifikasi"
        className="relative flex h-[52px] w-[62px] items-center justify-center rounded-lg border border-[#E8E9ED] bg-white text-[#181B21] hover:bg-[#EEF3FE]"
      >
        <Bell className="h-6 w-6" strokeWidth={1.75} />
        <span className="absolute right-[18px] top-[13px] h-2.5 w-2.5 rounded-full bg-red-500 ring-2 ring-white" />
      </button>

      <div className="flex h-[52px] min-w-[240px] items-center gap-3 rounded-lg border border-[#E8E9ED] bg-white px-5 text-[15px] text-[#666666]">
        <Calendar className="h-5 w-5" strokeWidth={1.75} />
        <span>{tanggal}</span>
      </div>

      <div className="ml-auto flex items-center gap-3">
        <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#2E62EA] text-lg font-bold text-white ring-2 ring-[#DCE6FD]">
          FA
        </div>
        <div className="leading-tight">
          <p className="text-xl font-bold text-[#181B21]">Fachry Achmad</p>
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
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-10 py-10">{children}</main>
      </div>
    </div>
  );
}

/* ============================ DATA DUMMY ============================ */
// Nanti ganti dengan data dari API backend.

type Siswa = {
  id: number;
  nama: string;
  email: string;
  nis: string;
  kelas: string;
  jurusan: string;
  akunAktif: boolean;
  profilLengkap: boolean;
};

const contoh = [
  "Arvin Hadiyyatullah",
  "El Razqa Chaeruzzaman",
  "Fachry Achmad",
  "Jilan Indah Aprilianti",
  "Putri Nuraini",
  "Talita Vicki Sakhi",
];

const daftarJurusan = ["SIJA", "RPL", "DKV", "TKJ"];

const semuaSiswa: Siswa[] = Array.from({ length: 50 }, (_, i) => {
  const nama = contoh[i % contoh.length];
  const jurusan = daftarJurusan[i % daftarJurusan.length];
  return {
    id: i + 1,
    nama,
    email: `${nama.split(" ")[0].toLowerCase()}${i + 1}@gmail.com`,
    nis: String(89992291 + i).padStart(10, "0"),
    kelas: `XIII ${jurusan} ${(i % 3) + 1}`,
    jurusan,
    akunAktif: i % 9 !== 8,
    profilLengkap: i % 7 !== 6,
  };
});

const PER_HALAMAN = 10;

const stats = [
  {
    title: "TOTAL SISWA",
    value: "2.400",
    note: "Terdaftar di sistem",
    dot: "bg-[#2E62EA]",
    noteColor: "text-[#666666]",
    icon: Briefcase,
    iconBox: "bg-[#DCE6FD] text-[#2E62EA]",
  },
  {
    title: "PROFILE LENGKAP",
    value: "986",
    note: "Biodata",
    dot: "bg-green-600",
    noteColor: "text-green-600",
    icon: Briefcase,
    iconBox: "bg-green-50 text-green-600",
  },
  {
    title: "PROFILE BELUM LENGKAP",
    value: "50",
    note: "Perlu dilengkapi siswa",
    dot: "bg-amber-700",
    noteColor: "text-amber-800",
    icon: CheckCircle2,
    iconBox: "bg-amber-100 text-amber-600",
  },
  {
    title: "AKUN AKTIF DI PLATFORM",
    value: "1.900",
    note: "User aktif di platform",
    dot: "bg-[#2E62EA]",
    noteColor: "text-[#2E62EA]",
    icon: CheckCircle2,
    iconBox: "bg-[#DCE6FD] text-[#2E62EA]",
  },
];

/* ============================ KOMPONEN ============================ */

function buatDaftarHalaman(sekarang: number, total: number): (number | "...")[] {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (sekarang <= 3) return [1, 2, 3, "...", total];
  if (sekarang >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", sekarang - 1, sekarang, sekarang + 1, "...", total];
}

/* ============================ HALAMAN SISWA ============================ */

export default function SiswaPage() {
  const [halaman, setHalaman] = useState(1);

  const totalHalaman = Math.max(1, Math.ceil(semuaSiswa.length / PER_HALAMAN));
  const awal = (halaman - 1) * PER_HALAMAN;
  const tampil = semuaSiswa.slice(awal, awal + PER_HALAMAN);

  return (
    <AdminShell>
      {/* Judul */}
      <div>
        <h1 className="text-[34px] font-bold text-[#181B21]">Manajemen Siswa</h1>
        <p className="mt-2 text-[15px] text-[#666666]">
          Kelola data siswa yang terdaftar sebagai pengguna di TALENTA.
        </p>
      </div>

      {/* 4 kartu */}
      <div className="mt-8 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => {
          const Icon = s.icon;
          return (
            <div
              key={s.title}
              className="rounded-2xl border border-[#E8E9ED] bg-white px-6 py-5 shadow-sm"
            >
              <p className="text-[15px] text-[#666666]">{s.title}</p>
              <div className="mt-4 flex items-center justify-between">
                <p className="text-[34px] font-bold leading-none text-[#181B21]">{s.value}</p>
                <span className={`flex h-11 w-11 items-center justify-center rounded-lg ${s.iconBox}`}>
                  <Icon className="h-5 w-5" strokeWidth={1.75} />
                </span>
              </div>
              <p className={`mt-3 flex items-center gap-2 text-[15px] ${s.noteColor}`}>
                <span className={`h-2 w-2 rounded-full ${s.dot}`} />
                {s.note}
              </p>
            </div>
          );
        })}
      </div>

      {/* Tabel */}
      <section className="mt-8 overflow-hidden rounded-2xl border border-[#E8E9ED] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[1000px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-[#E8E9ED] bg-[#EEF3FE]/50 text-[#181B21]">
                <th className="px-8 py-5 font-bold">SISWA</th>
                <th className="px-4 py-5 font-bold">NIS</th>
                <th className="px-4 py-5 font-bold">KELAS</th>
                <th className="px-4 py-5 font-bold">JURUSAN</th>
                <th className="px-4 py-5 text-center font-bold">STATUS AKUN</th>
                <th className="px-4 py-5 text-center font-bold">KELENGKAPAN AKUN</th>
                <th className="px-8 py-5 text-center font-bold">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {tampil.map((s) => (
                <tr key={s.id} className="border-b border-[#E8E9ED] last:border-b-0">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <span className="flex h-[52px] w-[52px] shrink-0 items-center justify-center rounded-full bg-[#DCE6FD] text-[#2E62EA]">
                        <ImageIcon className="h-6 w-6" strokeWidth={1.75} />
                      </span>
                      <div className="leading-snug">
                        <p className="font-bold text-[#181B21]">{s.nama}</p>
                        <p className="text-[14px] text-[#666666]">{s.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-4 py-5 text-[#181B21]">{s.nis}</td>
                  <td className="px-4 py-5 text-[#181B21]">{s.kelas}</td>
                  <td className="px-4 py-5 text-[#666666]">{s.jurusan}</td>
                  <td className="px-4 py-5 text-center">
                    <span
                      className={`inline-block rounded-md border px-4 py-1.5 font-bold ${
                        s.akunAktif
                          ? "border-green-300 bg-green-50 text-green-700"
                          : "border-[#E8E9ED] bg-[#F6F7F8] text-[#666666]"
                      }`}
                    >
                      {s.akunAktif ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-5 text-center">
                    <span
                      className={`inline-block whitespace-nowrap rounded-md border px-4 py-1.5 font-bold ${
                        s.profilLengkap
                          ? "border-green-300 bg-green-50 text-green-700"
                          : "border-amber-300 bg-amber-50 text-amber-700"
                      }`}
                    >
                      {s.profilLengkap ? "Lengkap" : "Belum Lengkap"}
                    </span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <Link
                      href={`/siswa/${s.id}`}
                      className="whitespace-nowrap font-bold text-[#2E62EA] hover:underline"
                    >
                      Lihat Detail
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E8E9ED] px-8 py-5">
          <p className="text-[17px] font-bold text-[#181B21]">
            Menampilkan {awal + 1}-{Math.min(awal + PER_HALAMAN, semuaSiswa.length)} dari{" "}
            {semuaSiswa.length} Siswa
          </p>

          <div className="flex items-center gap-3">
            <button
              onClick={() => setHalaman((h) => Math.max(1, h - 1))}
              disabled={halaman === 1}
              className="flex h-11 items-center gap-2 rounded-lg border border-[#E8E9ED] px-5 text-[15px] font-medium text-[#181B21] hover:bg-[#EEF3FE] disabled:cursor-not-allowed disabled:opacity-50"
            >
              <ArrowLeft className="h-4 w-4" /> Previous
            </button>

            {buatDaftarHalaman(halaman, totalHalaman).map((h, i) =>
              h === "..." ? (
                <span key={`titik-${i}`} className="px-2 text-xl font-bold text-[#181B21]">
                  •••
                </span>
              ) : (
                <button
                  key={h}
                  onClick={() => setHalaman(h)}
                  className={`h-11 w-11 rounded-lg border text-[15px] font-medium ${
                    h === halaman
                      ? "border-[#2E62EA] bg-[#2E62EA] text-white"
                      : "border-[#E8E9ED] text-[#181B21] hover:bg-[#EEF3FE]"
                  }`}
                >
                  {h}
                </button>
              )
            )}

            <button
              onClick={() => setHalaman((h) => Math.min(totalHalaman, h + 1))}
              disabled={halaman === totalHalaman}
              className="flex h-11 items-center gap-2 rounded-lg border border-[#E8E9ED] px-5 text-[15px] font-medium text-[#181B21] hover:bg-[#EEF3FE] disabled:cursor-not-allowed disabled:opacity-50"
            >
              Next <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>
    </AdminShell>
  );
}