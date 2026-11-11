"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname, useParams } from "next/navigation";
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
  ArrowLeft,
  ImageIcon,
  Check,
  CircleUser,
  Phone,
  Info,
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
// Nanti ganti dengan data dari API backend berdasarkan `id` di URL.

type StatusKarier = "Bekerja" | "Kuliah" | "Wirausaha" | "Lainnya";

type Karier = {
  id: number;
  posisi: string;
  perusahaan: string;
  periode: string;
  bidang: string;
  lokasi: string;
  aktif: boolean;
};

type DetailAlumni = {
  nama: string;
  email: string;
  telepon: string;
  sekolah: string;
  angkatan: string;
  jurusan: string;
  bio: string;
  statusKarier: StatusKarier;
  akunAktif: boolean;
  profilLengkap: boolean;
  akunDibuat: string;
  terakhirDiperbarui: string;
  riwayat: Karier[];
};

const gayaStatusKarier: Record<StatusKarier, string> = {
  Bekerja: "border-green-300 bg-green-50 text-green-700",
  Kuliah: "border-[#2E62EA] bg-[#EEF3FE] text-[#2E62EA]",
  Wirausaha: "border-purple-300 bg-purple-50 text-purple-600",
  Lainnya: "border-amber-400 bg-amber-50 text-amber-600",
};

function ambilDetailAlumni(id: string): DetailAlumni {
  void id; // TODO: ganti dengan request GET ke API backend memakai `id`.
  return {
    nama: "Arvin Hadiyyatullah",
    email: "arvin@gmail.com",
    telepon: "+62 831 7281 9910",
    sekolah: "SMKN 1 Cibinong",
    angkatan: "2027",
    jurusan: "Sistem Informasi Jaringan & Aplikasi",
    bio: "Siswa lulusan dari Sistem Informasi Jaringan dan Aplikasi ( SIJA ) yang memiliki minat kepada UIUX Designer dan Frontend Developer",
    statusKarier: "Bekerja",
    akunAktif: true,
    profilLengkap: true,
    akunDibuat: "30 September 2026, 08:30 WIB",
    terakhirDiperbarui: "04 Oktober 2026, 19:53 WIB",
    riwayat: [
      { id: 1, posisi: "Frontend Developer", perusahaan: "PT Solu Filantropi", periode: "2025 - Sekarang", bidang: "Teknologi Informasi", lokasi: "Jakarta Selatan, DKI Jakarta", aktif: true },
      { id: 2, posisi: "Backend Developer", perusahaan: "PT Itho", periode: "2024-2025", bidang: "Teknologi Informasi", lokasi: "Jakarta Selatan, DKI Jakarta", aktif: false },
    ],
  };
}

/* ============================ KOMPONEN KECIL ============================ */

function KartuJudul({
  icon: Icon,
  judul,
  keterangan,
}: {
  icon: LucideIcon;
  judul: string;
  keterangan?: string;
}) {
  return (
    <div className="flex items-center justify-between border-b border-[#E8E9ED] pb-5">
      <h2 className="flex items-center gap-3 text-[22px] font-bold text-[#181B21]">
        <Icon className="h-6 w-6 text-[#2E62EA]" strokeWidth={1.75} />
        {judul}
      </h2>
      {keterangan && <span className="text-[15px] text-[#181B21]">{keterangan}</span>}
    </div>
  );
}

function Kotak({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-[#DCE6FD] bg-[#EEF3FE] px-4 py-3 ${className}`}>
      <p className="text-[14px] uppercase text-[#181B21]">{label}</p>
      <p className="mt-1 text-[15px] font-bold leading-snug text-[#181B21]">{value}</p>
    </div>
  );
}

function Pill({ aktif, teks }: { aktif: boolean; teks: string }) {
  return (
    <span
      className={`inline-block rounded-full border px-5 py-1.5 text-[16px] font-semibold ${
        aktif
          ? "border-green-300 bg-green-50 text-green-700"
          : "border-[#E8E9ED] bg-[#F6F7F8] text-[#666666]"
      }`}
    >
      {teks}
    </span>
  );
}

/* ============================ HALAMAN DETAIL ALUMNI ============================ */

export default function DetailAlumniPage() {
  const params = useParams<{ id: string }>();
  const d = ambilDetailAlumni(params.id);

  return (
    <AdminShell>
      <Link
        href="/alumni"
        className="inline-flex items-center gap-3 text-[15px] font-medium text-[#2E62EA] hover:underline"
      >
        <ArrowLeft className="h-5 w-5" />
        Kembali ke Alumni
      </Link>

      <h1 className="mt-6 text-[34px] font-bold text-[#181B21]">Detail Alumni</h1>
      <p className="mt-1 text-[15px] text-[#666666]">
        Informasi lengkap mengenai data alumni, status karier, dan riwayat pekerjaan.
      </p>

      {/* Kartu identitas */}
      <section className="mt-7 flex flex-wrap items-center justify-between gap-6 rounded-2xl border border-[#E8E9ED] bg-white px-8 py-6">
        <div className="flex items-center gap-6">
          <div className="relative shrink-0">
            <div className="flex h-[88px] w-[88px] items-center justify-center rounded-xl border border-[#DCE6FD] bg-[#DCE6FD]/60 text-[#2E62EA]">
              <ImageIcon className="h-9 w-9" strokeWidth={1.5} />
            </div>
            <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-700 text-white ring-2 ring-white">
              <Check className="h-3.5 w-3.5" strokeWidth={3} />
            </span>
          </div>

          <div>
            <div className="flex flex-wrap items-center gap-3">
              <h2 className="text-[30px] font-bold leading-tight text-[#181B21]">{d.nama}</h2>
              <span
                className={`rounded-md border px-3 py-1 text-[14px] font-medium ${gayaStatusKarier[d.statusKarier]}`}
              >
                {d.statusKarier}
              </span>
            </div>
            <p className="mt-2 flex flex-wrap items-center gap-x-8 gap-y-1 text-[16px] text-[#666666]">
              <span>{d.email}</span>
              <span>{d.jurusan}</span>
              <span>Angkatan {d.angkatan}</span>
            </p>
          </div>
        </div>

        <div className="flex items-center gap-3 rounded-lg border border-[#E8E9ED] bg-[#F6F7F8]/60 px-6 py-3.5 text-[16px] text-[#181B21]">
          <Phone className="h-5 w-5 text-[#666666]" strokeWidth={1.75} />
          {d.telepon}
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
        {/* ===== Kolom kiri ===== */}
        <div className="space-y-6">
          {/* Informasi Alumni */}
          <section className="rounded-2xl border border-[#E8E9ED] bg-white p-7">
            <KartuJudul icon={CircleUser} judul="Informasi Alumni" />

            <div className="mt-6 grid grid-cols-1 gap-4 sm:grid-cols-2">
              <Kotak label="Nama Lengkap" value={d.nama} />
              <Kotak label="Email" value={d.email} />
              <Kotak label="Nomor HP" value={d.telepon} />
              <Kotak label="Sekolah" value={d.sekolah} />
              <Kotak label="Angkatan" value={d.angkatan} />
              <Kotak label="Jurusan" value={d.jurusan} />
              <Kotak label="Bio" value={d.bio} className="sm:col-span-2" />
            </div>
          </section>

          {/* Riwayat Karier */}
          <section className="rounded-2xl border border-[#E8E9ED] bg-white p-7">
            <KartuJudul icon={CircleUser} judul="Riwayat Karier" />

            <div className="relative mt-6 space-y-5">
              {/* garis timeline */}
              <span className="absolute bottom-6 left-[19px] top-6 w-px bg-[#E8E9ED]" />

              {d.riwayat.map((k) => (
                <div key={k.id} className="relative pl-14">
                  {/* titik timeline */}
                  <span
                    className={`absolute left-0 top-3 flex h-10 w-10 items-center justify-center rounded-full ${
                      k.aktif ? "bg-[#DCE6FD]" : "bg-[#E8E9ED]"
                    }`}
                  >
                    <span
                      className={`h-5 w-5 rounded-full ${
                        k.aktif ? "bg-[#2E62EA] ring-4 ring-white" : "bg-[#666666]/70 ring-4 ring-white"
                      }`}
                    />
                  </span>

                  <div
                    className={`rounded-xl border px-5 py-4 ${
                      k.aktif
                        ? "border-[#E8E9ED] bg-white"
                        : "border-[#E8E9ED] bg-[#F6F7F8]"
                    }`}
                  >
                    <div className="flex items-start justify-between gap-3">
                      <div className="leading-snug">
                        <p className="text-[19px] font-bold text-[#181B21]">{k.posisi}</p>
                        <p className="mt-1 flex flex-wrap items-center gap-x-4 text-[16px] text-[#181B21]">
                          <span>{k.perusahaan}</span>
                          <span className={k.aktif ? "text-[#2E62EA]" : "text-[#666666]"}>
                            {k.periode}
                          </span>
                        </p>
                      </div>
                      {k.aktif ? (
                        <span className="shrink-0 rounded-md border border-green-300 bg-green-50 px-3 py-1 text-[14px] font-medium text-green-700">
                          Sedang Bekerja
                        </span>
                      ) : (
                        <span className="shrink-0 rounded-md border border-[#E8E9ED] bg-white px-3 py-1 text-[14px] text-[#666666]">
                          Riwayat
                        </span>
                      )}
                    </div>

                    <p className="mt-3 flex flex-wrap items-center gap-x-8 gap-y-1 text-[15px] text-[#181B21]">
                      <span>Bidang : {k.bidang}</span>
                      <span>{k.lokasi}</span>
                    </p>
                  </div>
                </div>
              ))}

              {d.riwayat.length === 0 && (
                <p className="py-6 text-center text-[#666666]">Belum ada riwayat karier.</p>
              )}
            </div>
          </section>
        </div>

        {/* ===== Kolom kanan ===== */}
        <div>
          <section className="rounded-2xl border border-[#E8E9ED] bg-white p-7">
            <KartuJudul icon={Info} judul="Informasi Akun" keterangan="Status" />
            <dl className="mt-6 space-y-5 text-[18px] text-[#181B21]">
              <div className="flex items-center justify-between gap-4">
                <dt>Status akun</dt>
                <dd>
                  <Pill aktif={d.akunAktif} teks={d.akunAktif ? "Aktif" : "Nonaktif"} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt>Status profile</dt>
                <dd>
                  <Pill aktif={d.profilLengkap} teks={d.profilLengkap ? "Lengkap" : "Belum Lengkap"} />
                </dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt>Akun Dibuat</dt>
                <dd>{d.akunDibuat}</dd>
              </div>
              <div className="flex items-center justify-between gap-4">
                <dt>Terakhir di perbarui</dt>
                <dd>{d.terakhirDiperbarui}</dd>
              </div>
            </dl>
          </section>
        </div>
      </div>
    </AdminShell>
  );
}