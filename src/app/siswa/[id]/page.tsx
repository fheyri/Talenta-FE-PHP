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
  Brain,
  Award,
  Download,
  FileText,
  Info,
  SquareKanban,
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

type Sertifikat = { id: number; judul: string; penerbit: string; tahun: string; namaFile: string; url: string };
type Pengalaman = { id: number; jenis: string; judul: string; perusahaan: string; periode: string; deskripsi: string };

type DetailSiswa = {
  nama: string;
  nis: string;
  kelas: string;
  email: string;
  whatsapp: string;
  sekolah: string;
  keahlianProgram: string;
  alamat: string;
  bio: string;
  akunAktif: boolean;
  profilLengkap: boolean;
  akunDibuat: string;
  terakhirDiperbarui: string;
  kompetensi: string[];
  sertifikat: Sertifikat[];
  pengalaman: Pengalaman[];
};

function ambilDetailSiswa(id: string): DetailSiswa {
  void id; // TODO: ganti dengan request GET ke API backend memakai `id`.
  return {
    nama: "Arvin Hadiyyatullah",
    nis: "00891223",
    kelas: "XIII SIJA 2",
    email: "arvin@gmail.com",
    whatsapp: "0831728162",
    sekolah: "SMKN 1 Cibinong",
    keahlianProgram: "Sistem Informasi Jaringan & Aplikasi",
    alamat: "Jl Pemda Karadenan Cibinong Kota Bogor Jawa Barat",
    bio: "Siswa lulusan dari Sistem Informasi Jaringan dan Aplikasi ( SIJA ) yang memiliki minat kepada UIUX Designer dan Frontend Developer",
    akunAktif: true,
    profilLengkap: true,
    akunDibuat: "30 September 2026, 08:30 WIB",
    terakhirDiperbarui: "04 Oktober 2026, 19:53 WIB",
    kompetensi: ["Frontend developer", "UIUX Designer", "DevOps Enginer"],
    sertifikat: [
      { id: 1, judul: "UIUX Designer Competition Universitas Udayana", penerbit: "Universitas Udayana Bali", tahun: "2025", namaFile: "Sertifikat-uiux.pdf", url: "#" },
      { id: 2, judul: "UIUX Designer Competition Universitas Udayana", penerbit: "Universitas Udayana Bali", tahun: "2025", namaFile: "Sertifikat-uiux.pdf", url: "#" },
    ],
    pengalaman: [
      {
        id: 1,
        jenis: "PKL",
        judul: "Frontend Developer Internship",
        perusahaan: "PT Solu Filantropi",
        periode: "1 Juli 2026 — 31 Juli 2027",
        deskripsi:
          "Mengembangkan dan mengimplementasikan desain UI/UX menjadi website responsif menggunakan teknologi frontend, melakukan debugging dan testing, serta berkolaborasi dengan tim untuk menghasilkan website yang fungsional dan user-friendly.",
      },
      {
        id: 2,
        jenis: "PKL",
        judul: "Frontend Developer Internship",
        perusahaan: "PT Solu Filantropi",
        periode: "1 Juli 2026 — 31 Juli 2027",
        deskripsi:
          "Mengembangkan dan mengimplementasikan desain UI/UX menjadi website responsif menggunakan teknologi frontend, melakukan debugging dan testing, serta berkolaborasi dengan tim untuk menghasilkan website yang fungsional dan user-friendly.",
      },
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

function Data({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <p className="text-[14px] uppercase text-[#181B21]">{label}</p>
      <p className="mt-1 text-[15px] font-bold text-[#181B21]">{value}</p>
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

/* ============================ HALAMAN DETAIL SISWA ============================ */

export default function DetailSiswaPage() {
  const params = useParams<{ id: string }>();
  const d = ambilDetailSiswa(params.id);

  return (
    <AdminShell>
      <Link
        href="/siswa"
        className="inline-flex items-center gap-3 text-[15px] font-medium text-[#2E62EA] hover:underline"
      >
        <ArrowLeft className="h-5 w-5" />
        Kembali ke Siswa
      </Link>

      <h1 className="mt-6 text-[34px] font-bold text-[#181B21]">Detail Siswa</h1>
      <p className="mt-1 text-[15px] text-[#666666]">
        Informasi lengkap mengenai data siswa, kompetensi, sertifikat, dan pengalaman proyek/PKL.
      </p>

      {/* Kartu identitas */}
      <section className="mt-7 flex items-center gap-7 rounded-2xl border border-[#E8E9ED] bg-white px-8 py-7">
        <div className="relative shrink-0">
          <div className="flex h-[96px] w-[96px] items-center justify-center rounded-xl border border-[#DCE6FD] bg-[#DCE6FD]/60 text-[#2E62EA]">
            <ImageIcon className="h-10 w-10" strokeWidth={1.5} />
          </div>
          <span className="absolute -bottom-1.5 -right-1.5 flex h-6 w-6 items-center justify-center rounded-full bg-green-700 text-white ring-2 ring-white">
            <Check className="h-3.5 w-3.5" strokeWidth={3} />
          </span>
        </div>

        <div>
          <div className="flex flex-wrap items-center gap-3">
            <h2 className="text-[30px] font-bold leading-tight text-[#181B21]">{d.nama}</h2>
            <span
              className={`rounded-md border px-3 py-1 text-[14px] font-medium ${
                d.akunAktif
                  ? "border-green-300 bg-green-50 text-green-700"
                  : "border-[#E8E9ED] bg-[#F6F7F8] text-[#666666]"
              }`}
            >
              {d.akunAktif ? "Aktif" : "Nonaktif"}
            </span>
          </div>
          <p className="mt-2 flex flex-wrap items-center gap-x-6 gap-y-1 text-[16px] text-[#181B21]">
            <span>
              <span className="text-[#666666]">NIS : </span>
              {d.nis}
            </span>
            <span>
              <span className="text-[#666666]">Kelas : </span>
              {d.kelas}
            </span>
            <span>{d.email}</span>
          </p>
        </div>
      </section>

      <div className="mt-6 grid grid-cols-1 items-start gap-6 xl:grid-cols-2">
        {/* ===== Kolom kiri ===== */}
        <div className="space-y-6">
          {/* Informasi Siswa */}
          <section className="rounded-2xl border border-[#E8E9ED] bg-white p-7">
            <KartuJudul icon={CircleUser} judul="Informasi Siswa" />

            <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
              <Data label="Nama Lengkap" value={d.nama} />
              <Data label="Nomor Induk Siswa ( NIS )" value={d.nis} />
              <Data label="Email Siswa" value={d.email} />
              <Data label="No Whatsapp / Telp" value={d.whatsapp} />
              <Data label="Sekolah Asal" value={d.sekolah} />
              <Data label="Kelas" value={d.kelas} />
              <Data label="Keahlian Program" value={d.keahlianProgram} className="sm:col-span-2" />
            </div>

            <div className="mt-8 border-t border-[#E8E9ED] pt-6">
              <Data label="Alamat Domisili" value={d.alamat} />

              <p className="mt-6 text-[14px] uppercase text-[#181B21]">Deskripsi / Bio</p>
              <p className="mt-2 rounded-lg border border-[#DCE6FD] bg-[#EEF3FE] px-4 py-3 text-[15px] font-bold leading-snug text-[#181B21]">
                {d.bio}
              </p>
            </div>
          </section>

          {/* Project & PKL */}
          <section className="rounded-2xl border border-[#E8E9ED] bg-white p-7">
            <KartuJudul icon={SquareKanban} judul="Project & PKL" keterangan="Pengalaman" />

            <div className="mt-6 space-y-5">
              {d.pengalaman.map((p) => (
                <div
                  key={p.id}
                  className="rounded-xl border border-[#E8E9ED] bg-[#EEF3FE]/50 px-5 py-4"
                >
                  <div className="flex flex-wrap items-start justify-between gap-3">
                    <div className="flex items-center gap-3">
                      <span className="rounded-full bg-[#DCE6FD] px-3 py-1 text-[13px] font-semibold text-[#2E62EA]">
                        {p.jenis}
                      </span>
                      <div className="leading-snug">
                        <p className="font-bold text-[#181B21]">{p.judul}</p>
                        <p className="text-[15px] text-[#181B21]">{p.perusahaan}</p>
                      </div>
                    </div>
                    <span className="flex items-center gap-2.5 rounded-full border border-[#E8E9ED] bg-white px-4 py-2 text-[14px] text-[#181B21]">
                      <Calendar className="h-4 w-4 text-[#666666]" strokeWidth={1.75} />
                      {p.periode}
                    </span>
                  </div>

                  <p className="mt-4 border-t border-[#E8E9ED] pt-4 text-[15px] leading-relaxed text-[#181B21]">
                    {p.deskripsi}
                  </p>
                </div>
              ))}
            </div>
          </section>
        </div>

        {/* ===== Kolom kanan ===== */}
        <div className="space-y-6">
          {/* Kompetensi */}
          <section className="rounded-2xl border border-[#E8E9ED] bg-white p-7">
            <KartuJudul icon={Brain} judul="Kompetensi" keterangan={`${d.kompetensi.length} keahlian`} />
            <ul className="mt-6 space-y-5">
              {d.kompetensi.map((k) => (
                <li key={k} className="text-[19px] font-bold text-[#181B21]">
                  {k}
                </li>
              ))}
            </ul>
          </section>

          {/* Sertifikat */}
          <section className="rounded-2xl border border-[#E8E9ED] bg-white p-7">
            <KartuJudul icon={Award} judul="Sertifikat" keterangan={`${d.sertifikat.length} Dokumen`} />
            <div className="mt-6 space-y-5">
              {d.sertifikat.map((s) => (
                <div
                  key={s.id}
                  className="flex items-center gap-4 rounded-xl border border-[#DCE6FD] bg-[#EEF3FE] px-4 py-4"
                >
                  <span className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-[#E8E9ED] bg-white text-[#181B21]">
                    <FileText className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1 leading-snug">
                    <p className="font-bold text-[#181B21]">{s.judul}</p>
                    <p className="text-[14px] text-[#181B21]">
                      {s.penerbit} • {s.tahun}
                    </p>
                    <a href={s.url} className="text-[14px] text-[#2E62EA] hover:underline">
                      {s.namaFile}
                    </a>
                  </div>
                  <a
                    href={s.url}
                    download
                    aria-label={`Unduh ${s.namaFile}`}
                    className="rounded-md p-2 text-[#181B21] hover:bg-white"
                  >
                    <Download className="h-5 w-5" />
                  </a>
                </div>
              ))}
            </div>
          </section>

          {/* Informasi Akun */}
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