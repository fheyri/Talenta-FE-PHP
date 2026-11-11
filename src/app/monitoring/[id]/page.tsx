"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
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
  Phone,
  Info,
  Check,
  CircleUser,
  Image as ImageIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/*
  COLOR PALETTE (sama dengan halaman lain)
  #2E62EA  Tombol utama, active state
  #4276E8  Highlight, icon
  #DCE6FD  Background card, selected state
  #EEF3FE  Background section / subtle highlight
  #F6F7F8  Background utama
  #181B21  Heading dan teks utama
  #666666  Deskripsi / secondary text
  #E8E9ED  Border dan divider
*/

/* ============================ DATA DUMMY ============================ */
// Nanti ganti dengan data dari API berdasarkan params.id

const user = { nama: "Fachry Achmad", inisial: "FH", role: "Super Admin" };

const alumni = {
  nama: "Arvin Hadiyyatullah",
  status: "Bekerja",
  email: "arvinh@gmail.com",
  jurusan: "Sistem Informasi Jaringan dan Aplikasi",
  angkatan: "2027",
  telp: "+62 831 7281 9910",
  hp: "0831-8291-9921",
  sekolah: "SMKN 1 Cibinong",
  bio: "Siswa lulusan dari Sistem Informasi Jaringan dan Aplikasi ( SIJA ) yang memiliki minat kepada UIUX Designer dan Frontend Developer",
  akun: {
    status: "Aktif",
    profile: "Lengkap",
    dibuat: "30 September 2026, 08:30 WIB",
    diperbarui: "04 Oktober 2026, 19:53 WIB",
  },
};

const riwayat = [
  {
    posisi: "Frontend Developer",
    perusahaan: "PT Solu Filantropi",
    periode: "2025 - Sekarang",
    bidang: "Teknologi Informasi",
    lokasi: "Jakarta Selatan, DKI Jakarta",
    aktif: true,
  },
  {
    posisi: "Backend Developer",
    perusahaan: "PT Itho",
    periode: "2024-2025",
    bidang: "Teknologi Informasi",
    lokasi: "Jakarta Selatan, DKI Jakarta",
    aktif: false,
  },
];

const mainMenu: { label: string; href: string; icon: LucideIcon; badge?: string }[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Lowongan", href: "/lowongan", icon: Briefcase, badge: "99+" },
  { label: "Perusahaan", href: "/perusahaan", icon: Building2 },
  { label: "Tes Psikotes", href: "/psikotes", icon: Brain },
  { label: "Siswa", href: "/siswa", icon: Users },
  { label: "Alumni", href: "/alumni", icon: GraduationCap },
  { label: "Monitoring Karier", href: "/monitoring", icon: BarChart3 },
  { label: "Analytics", href: "/analytics", icon: Activity },
];

const systemMenu: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Manajemen Admin", href: "/admin", icon: Lock },
  { label: "Pengaturan", href: "/pengaturan", icon: Settings },
];

/* ============================ SIDEBAR & TOPBAR ============================ */

function NavItem({
  label,
  href,
  icon: Icon,
  badge,
  active,
}: {
  label: string;
  href: string;
  icon: LucideIcon;
  badge?: string;
  active: boolean;
}) {
  return (
    <a
      href={href}
      className={`flex items-center gap-3 rounded-lg px-4 py-3 text-[15px] font-medium transition-colors ${
        active ? "bg-[#DCE6FD] text-[#2E62EA]" : "text-[#181B21] hover:bg-[#DCE6FD]/60"
      }`}
    >
      <Icon className={`h-5 w-5 ${active ? "text-[#2E62EA]" : "text-[#666666]"}`} strokeWidth={1.75} />
      <span className="flex-1">{label}</span>
      {badge && (
        <span className="rounded-full bg-[#DCE6FD] px-2 py-0.5 text-xs font-semibold text-[#2E62EA]">
          {badge}
        </span>
      )}
    </a>
  );
}

function Sidebar() {
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
            <NavItem key={m.label} {...m} active={m.label === "Monitoring Karier"} />
          ))}
        </div>
        <p className="mb-3 mt-6 px-5 text-[15px] text-[#666666]">System</p>
        <div className="space-y-1">
          {systemMenu.map((m) => (
            <NavItem key={m.label} {...m} active={false} />
          ))}
        </div>
      </nav>

      <div className="mx-5 flex items-center gap-3 border-t border-[#E8E9ED] py-5">
        <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#2E62EA] text-base font-bold text-white ring-2 ring-[#DCE6FD]">
          {user.inisial}
        </div>
        <div className="flex-1 leading-tight">
          <p className="font-bold text-[#181B21]">{user.nama}</p>
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
    setTanggal(t.replace(/^(\S+)/, "$1,"));
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
          {user.inisial}
        </div>
        <div className="leading-tight">
          <p className="text-xl font-bold text-[#181B21]">{user.nama}</p>
          <span className="mt-1 inline-block rounded-full bg-[#DCE6FD] px-3 py-0.5 text-sm text-[#2E62EA]">
            {user.role}
          </span>
        </div>
      </div>
    </header>
  );
}

/* ============================ KOMPONEN DETAIL ============================ */

function Card({
  title,
  icon: Icon,
  right,
  children,
  className = "",
}: {
  title: string;
  icon: LucideIcon;
  right?: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <section className={`rounded-2xl border border-[#E8E9ED] bg-white p-6 ${className}`}>
      <div className="flex items-center justify-between border-b border-[#E8E9ED] pb-4">
        <h2 className="flex items-center gap-3 text-[16px] font-bold text-[#181B21]">
          <Icon className="h-5 w-5 text-[#4276E8]" strokeWidth={1.75} />
          {title}
        </h2>
        {right}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

function Field({
  label,
  value,
  className = "",
}: {
  label: string;
  value: string;
  className?: string;
}) {
  return (
    <div className={`rounded-lg border border-[#DCE6FD] bg-[#EEF3FE] px-3.5 py-2.5 ${className}`}>
      <p className="text-[11px] uppercase text-[#666666]">{label}</p>
      <p className="mt-0.5 text-[13px] font-bold leading-snug text-[#181B21]">{value}</p>
    </div>
  );
}

function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="rounded-full border border-green-300 bg-green-50 px-4 py-1 text-[13px] font-semibold text-green-700">
      {children}
    </span>
  );
}

function BarisAkun({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between py-2.5 text-[14px]">
      <span className="text-[#181B21]">{label}</span>
      {children}
    </div>
  );
}

/* ============================ HALAMAN ============================ */

export default function DetailAlumniPage() {
  const a = alumni;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-8">
          <Link href="/monitoring" className="text-[13px] font-medium text-[#2E62EA] hover:underline">
            Kembali ke Siswa
          </Link>

          <h1 className="mt-3 text-[30px] font-bold text-[#181B21]">Detail Siswa</h1>
          <p className="mt-1.5 text-[13px] text-[#666666]">
            Informasi lengkap mengenai data siswa, kompetensi, sertifikat, dan pengalaman proyek/PKL.
          </p>

          {/* Header profil */}
          <section className="mt-6 flex items-center justify-between gap-6 rounded-2xl border border-[#E8E9ED] bg-white px-6 py-5">
            <div className="flex items-center gap-5">
              <div className="relative">
                <span className="flex h-[72px] w-[72px] items-center justify-center rounded-xl bg-[#DCE6FD] text-[#4276E8]">
                  <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
                </span>
                <span className="absolute -bottom-1 -right-1 flex h-5 w-5 items-center justify-center rounded-full bg-emerald-600 text-white ring-2 ring-white">
                  <Check className="h-3 w-3" strokeWidth={3} />
                </span>
              </div>

              <div>
                <div className="flex items-center gap-3">
                  <h2 className="text-[22px] font-bold text-[#181B21]">{a.nama}</h2>
                  <span className="rounded-md border border-green-300 bg-green-50 px-3 py-0.5 text-[12px] font-semibold text-green-700">
                    {a.status}
                  </span>
                </div>
                <p className="mt-1.5 flex flex-wrap items-center gap-x-8 text-[12px] text-[#666666]">
                  <span>{a.email}</span>
                  <span>{a.jurusan}</span>
                  <span>Angkatan {a.angkatan}</span>
                </p>
              </div>
            </div>

            <a
              href={`https://wa.me/${a.telp.replace(/\D/g, "")}`}
              target="_blank"
              rel="noreferrer"
              className="flex h-12 min-w-[200px] items-center gap-3 rounded-lg border border-[#E8E9ED] bg-[#F6F7F8] px-5 text-[13px] text-[#666666] hover:bg-[#EEF3FE]"
            >
              <Phone className="h-4 w-4" />
              {a.telp}
            </a>
          </section>

          {/* Konten */}
          <div className="mt-5 grid grid-cols-1 items-start gap-5 xl:grid-cols-[1.5fr_1fr]">
            {/* Kiri */}
            <div className="space-y-5">
              <Card title="Informasi Alumni" icon={CircleUser}>
                <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                  <Field label="Nama Lengkap" value={a.nama} />
                  <Field label="Email" value={a.email} />
                  <Field label="Nomor HP" value={a.hp} />
                  <Field label="Sekolah" value={a.sekolah} />
                  <Field label="Angkatan" value={a.angkatan} />
                  <Field label="Jurusan" value={a.jurusan} />
                  <Field label="Bio" value={a.bio} className="sm:col-span-2" />
                </div>
              </Card>

              <Card title="Riwayat Karier" icon={CircleUser}>
                <ol>
                  {riwayat.map((r, i) => (
                    <li key={r.posisi} className="relative flex gap-4 pb-4 last:pb-0">
                      {/* Garis penghubung */}
                      {i < riwayat.length - 1 && (
                        <span className="absolute left-[11px] top-7 h-[calc(100%-1rem)] w-px bg-[#E8E9ED]" />
                      )}

                      {/* Titik timeline */}
                      <span
                        className={`relative mt-6 flex h-6 w-6 shrink-0 items-center justify-center rounded-full ${
                          r.aktif ? "bg-[#2E62EA] ring-4 ring-[#DCE6FD]" : "bg-[#D9DBE1]"
                        }`}
                      >
                        <span className={`h-2 w-2 rounded-full ${r.aktif ? "bg-white" : "bg-[#666666]"}`} />
                      </span>

                      <div className="flex-1 rounded-lg border border-[#E8E9ED] bg-[#F6F7F8] px-4 py-3">
                        <div className="flex items-start justify-between gap-3">
                          <p className="text-[14px] font-bold text-[#181B21]">{r.posisi}</p>
                          <span
                            className={`shrink-0 rounded-md border px-3 py-0.5 text-[11px] font-semibold ${
                              r.aktif
                                ? "border-green-300 bg-green-50 text-green-700"
                                : "border-[#D9DBE1] bg-white text-[#666666]"
                            }`}
                          >
                            {r.aktif ? "Sedang Bekerja" : "Riwayat"}
                          </span>
                        </div>
                        <p className="mt-1 text-[12px] text-[#666666]">
                          {r.perusahaan}
                          <span className={`ml-3 ${r.aktif ? "font-medium text-[#2E62EA]" : ""}`}>{r.periode}</span>
                        </p>
                        <p className="mt-1.5 flex flex-wrap gap-x-5 text-[12px] text-[#181B21]">
                          <span>Bidang : {r.bidang}</span>
                          <span>{r.lokasi}</span>
                        </p>
                      </div>
                    </li>
                  ))}
                </ol>
              </Card>
            </div>

            {/* Kanan */}
            <Card
              title="Informasi Akun"
              icon={Info}
              right={<span className="text-[12px] text-[#181B21]">Status</span>}
            >
              <div className="divide-y divide-transparent">
                <BarisAkun label="Status akun">
                  <Pill>{a.akun.status}</Pill>
                </BarisAkun>
                <BarisAkun label="Status profile">
                  <Pill>{a.akun.profile}</Pill>
                </BarisAkun>
                <BarisAkun label="Akun Dibuat">
                  <span className="font-semibold text-[#181B21]">{a.akun.dibuat}</span>
                </BarisAkun>
                <BarisAkun label="Terakhir di perbarui">
                  <span className="font-semibold text-[#181B21]">{a.akun.diperbarui}</span>
                </BarisAkun>
              </div>
            </Card>
          </div>
        </main>
      </div>
    </div>
  );
}