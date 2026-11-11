"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
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
  ArrowUp,
  CircleCheck,
  ChevronDown,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ============================ ANIMASI ============================ */
/*
  anim-masuk   : elemen muncul dari bawah + fade saat halaman dibuka (bergantian)
  anim-lebar   : bar horizontal tumbuh dari kiri ke kanan
  anim-tinggi  : grafik batang tumbuh dari bawah ke atas
  kartu-hover  : HANYA dipakai di 4 kartu statistik paling atas
*/
const animasiCSS = `
@keyframes masuk-naik {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes tumbuh-lebar  { from { width: 0; } }
@keyframes tumbuh-tinggi { from { height: 0; } }

.anim-masuk  { animation: masuk-naik 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.anim-lebar  { animation: tumbuh-lebar 0.9s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.anim-tinggi { animation: tumbuh-tinggi 1s cubic-bezier(0.22, 1, 0.36, 1) backwards; }

.kartu-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.kartu-hover:hover {
  transform: translateY(-6px);
  border-color: rgba(46, 98, 234, 0.35);
  box-shadow: 0 14px 30px -12px rgba(46, 98, 234, 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .anim-masuk, .anim-lebar, .anim-tinggi { animation: none; }
  .kartu-hover:hover { transform: none; }
}
`;

const tunda = (ms: number) => ({ animationDelay: `${ms}ms` });

/* ============================ TOOLTIP ============================ */
/*
  Cara pakai: bungkus elemen dengan className "relative group/tip",
  lalu taruh <Tip> di dalamnya. Tooltip muncul saat kursor di atas wrapper.
*/
function Tip({
  children,
  style,
}: {
  children: React.ReactNode;
  style?: React.CSSProperties;
}) {
  return (
    <span
      style={style}
      className="pointer-events-none absolute left-1/2 z-30 -translate-x-1/2 translate-y-1 whitespace-nowrap rounded-md bg-[#181B21] px-2.5 py-1.5 text-center text-xs font-medium leading-tight text-white opacity-0 shadow-lg transition-all duration-200 group-hover/tip:translate-y-0 group-hover/tip:opacity-100"
    >
      {children}
      <span className="absolute left-1/2 top-full -mt-1 h-2 w-2 -translate-x-1/2 rotate-45 bg-[#181B21]" />
    </span>
  );
}

/* ============================ DATA DUMMY ============================ */
// Nanti ganti dengan data dari API backend.

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

const stats: {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  badge?: string;
  note: string;
}[] = [
  { title: "TOTAL LOWONGAN", value: "500", icon: Briefcase, trend: "+12%", note: "Dari 52 mitra perusahaan" },
  { title: "LOWONGAN AKTIF", value: "150", icon: CircleCheck, badge: "Sedang tayang", note: "Sedang membuka pendaftaran" },
  { title: "TOTAL ALUMNI", value: "2.400", icon: GraduationCap, note: "Terdata di Sistem BKK" },
  { title: "ALUMNI BEKERJA", value: "1.200", icon: CircleCheck, badge: "Sedang Bekerja", note: "58.4% dari total alumni terdata" },
];

const statusKarier = [
  { label: "Bekerja", jumlah: 512, persen: 58, warna: "#16A34A" },
  { label: "Pendidikan ( Kuliah )", jumlah: 212, persen: 19, warna: "#2E62EA" },
  { label: "Wirausaha", jumlah: 96, persen: 11, warna: "#A855F7" },
  { label: "Lainnya ( Menunggu Kerja / Mencari Kerja )", jumlah: 100, persen: 11, warna: "#F59E0B" },
];

const statusLowongan = [
  { badge: "Aktif", badgeClass: "bg-green-50 text-green-600", ket: "Publikasi Terbuka", jumlah: 100, persen: 78 },
  { badge: "Expired", badgeClass: "bg-gray-200 text-[#666666]", ket: "Batas Waktu Berakhir", jumlah: 20, persen: 16 },
  { badge: "Draft", badgeClass: "bg-amber-100 text-amber-700", ket: "Data Belum Lengkap", jumlah: 9, persen: 10 },
];

const perkembangan = [
  { tahun: 2020, nilai: 108 },
  { tahun: 2021, nilai: 143 },
  { tahun: 2022, nilai: 415 },
  { tahun: 2023, nilai: 363 },
  { tahun: 2024, nilai: 415 },
  { tahun: 2025, nilai: 466 },
  { tahun: 2026, nilai: 480 },
];
const MAX_PERKEMBANGAN = 512;

const kategoriLowongan = [
  { nama: "Software & IT Development", posisi: 40, persen: 100 },
  { nama: "Network & Infrastructure", posisi: 40, persen: 84 },
  { nama: "Multimedia & Desain Grafis", posisi: 40, persen: 97 },
  { nama: "Software & IT Development", posisi: 40, persen: 80 },
  { nama: "Software & IT Development", posisi: 40, persen: 65 },
];

const bidangPekerjaan = [
  { nama: "Teknologi Informasi", jumlah: 500, persen: 42.5 },
  { nama: "Industri Kreatif & Media", jumlah: 450, persen: 38.5 },
  { nama: "Teknik Permesinan", jumlah: 720, persen: 88.5 },
  { nama: "Teknologi Informasi", jumlah: 500, persen: 42.5 },
  { nama: "Teknologi Informasi", jumlah: 500, persen: 42.5 },
];

const jurusan = [
  { kode: "SIJA", nama: "Sistem Informasi Jaringan dan Aplikasi", total: 240, bekerja: 180, pendidikan: 180, wirausaha: 180, lainnya: 20, persen: "74.5%" },
  { kode: "RPL", nama: "Rekayasa Perangkat Lunak", total: 260, bekerja: 180, pendidikan: 180, wirausaha: 180, lainnya: 20, persen: "74.5%" },
  { kode: "TKJ", nama: "Teknik Komputer dan Jaringan", total: 260, bekerja: 180, pendidikan: 180, wirausaha: 180, lainnya: 20, persen: "74.5%" },
  { kode: "DKV", nama: "Desain Grafis Visual", total: 260, bekerja: 180, pendidikan: 180, wirausaha: 180, lainnya: 20, persen: "74.5%" },
  { kode: "DPIB", nama: "Desain Pemodelan dan Informasi Bangunan", total: 260, bekerja: 180, pendidikan: 180, wirausaha: 180, lainnya: 20, persen: "74.5%" },
  { kode: "TKR", nama: "Teknik Kendaraan Ringan", total: 260, bekerja: 180, pendidikan: 180, wirausaha: 180, lainnya: 20, persen: "74.5%" },
];

const periodeOpsi = ["Semua Periode", "Bulan ini", "Bulan lalu", "Tahun 2026"];

/* ============================ KOMPONEN KECIL ============================ */

function Card({
  title,
  subtitle,
  right,
  children,
  delay = 0,
  className = "",
}: {
  title: string;
  subtitle: string;
  right?: React.ReactNode;
  children: React.ReactNode;
  delay?: number;
  className?: string;
}) {
  return (
    <section
      style={tunda(delay)}
      className={`anim-masuk rounded-2xl border border-[#E8E9ED] bg-white px-6 py-6 ${className}`}
    >
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[17px] font-bold text-[#181B21]">{title}</h2>
          <p className="mt-1 text-sm text-[#666666]">{subtitle}</p>
        </div>
        {right}
      </div>
      <div className="mt-5">{children}</div>
    </section>
  );
}

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

/* ============================ SIDEBAR ============================ */

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
            <NavItem key={m.label} {...m} active={m.label === "Analytics"} />
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
          DN
        </div>
        <div className="flex-1 leading-tight">
          <p className="font-bold text-[#181B21]">Doni Subianto</p>
          <p className="text-sm text-[#666666]">SMKN 1 Cibinong</p>
        </div>
        <button aria-label="Keluar" className="text-[#666666] hover:text-[#181B21]">
          <LogOut className="h-5 w-5" strokeWidth={1.75} />
        </button>
      </div>
    </aside>
  );
}

/* ============================ TOPBAR ============================ */

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

      <a
        href="/lowongan/tambah"
        className="flex h-[52px] items-center gap-3 rounded-lg bg-[#2E62EA] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#4276E8]"
      >
        <Plus className="h-5 w-5" strokeWidth={2.25} />
        Tambah Lowongan
      </a>

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
          DN
        </div>
        <div className="leading-tight">
          <p className="text-xl font-bold text-[#181B21]">Doni Subianto</p>
          <span className="mt-1 inline-block rounded-full bg-[#DCE6FD] px-3 py-0.5 text-sm text-[#2E62EA]">
            Super Admin
          </span>
        </div>
      </div>
    </header>
  );
}

/* ============================ KONTEN ANALYTICS ============================ */

// Kartu statistik: satu-satunya kartu yang bergerak saat di-hover
function StatCard({ item, delay }: { item: (typeof stats)[number]; delay: number }) {
  const Icon = item.icon;
  const tag = item.trend ?? item.badge;
  return (
    <div
      style={tunda(delay)}
      className="anim-masuk kartu-hover group rounded-2xl border border-[#E8E9ED] bg-white px-6 py-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-[15px] text-[#666666]">{item.title}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF3FE] text-[#4276E8] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <p className="text-[34px] font-bold leading-none text-[#181B21]">{item.value}</p>
        {tag && (
          <span className="flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-600">
            {item.trend && <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.25} />}
            {tag}
          </span>
        )}
      </div>
      <p className="mt-4 text-[15px] text-[#666666]">{item.note}</p>
    </div>
  );
}

function StatusKarierCard({ delay }: { delay: number }) {
  return (
    <Card title="Status Karier Alumni" subtitle="Distribusi Status Lulusan Terdata" delay={delay}>
      {/* Bar bertumpuk (hover tiap segmen untuk lihat jumlahnya) */}
      <div className="flex h-3 w-full">
        {statusKarier.map((s, i) => (
          <div
            key={s.label}
            className="anim-lebar group/tip relative h-3 transition-[filter] first:rounded-l-full last:rounded-r-full hover:brightness-110"
            style={{ width: `${s.persen}%`, backgroundColor: s.warna, ...tunda(delay + 300 + i * 120) }}
          >
            <Tip style={{ bottom: "calc(100% + 8px)" }}>
              <b>{s.label.split(" (")[0]}</b>
              <br />
              {s.jumlah} alumni ({s.persen}%)
            </Tip>
          </div>
        ))}
      </div>

      <ul className="mt-6 space-y-4">
        {statusKarier.map((s) => (
          <li key={s.label} className="flex items-center gap-3 text-[15px]">
            <span className="h-3 w-3 shrink-0 rounded-full" style={{ backgroundColor: s.warna }} />
            <span className="flex-1 font-bold text-[#181B21]">{s.label}</span>
            <span className="w-[110px] font-semibold text-[#181B21]">{s.jumlah} Alumni</span>
            <span className="w-10 text-right text-[#666666]">{s.persen}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function StatusLowonganCard({ delay }: { delay: number }) {
  return (
    <Card
      title="Status Lowongan Kerja"
      subtitle="Status operasional lowongan mitra industri"
      delay={delay}
      right={
        <div className="text-right">
          <p className="text-[15px] text-[#181B21]">Total Lowongan Kerja</p>
          <p className="font-bold text-[#181B21]">202 Posisi</p>
        </div>
      }
    >
      <ul className="space-y-5">
        {statusLowongan.map((s) => (
          <li key={s.badge} className="flex items-center gap-4 text-[15px]">
            <span className={`w-16 rounded-md px-2 py-1 text-center text-sm font-semibold ${s.badgeClass}`}>
              {s.badge}
            </span>
            <span className="flex-1 font-medium text-[#181B21]">{s.ket}</span>
            <span className="text-[#181B21]">{s.jumlah} Lowongan</span>
            <span className="w-10 text-right text-[#666666]">{s.persen}%</span>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function PerkembanganCard({ delay }: { delay: number }) {
  return (
    <Card
      title="Perkembangan Karier Alumni"
      subtitle="Distribusi waktu mulai karier berdasarkan riwayat"
      delay={delay}
    >
      <div className="flex h-[200px] items-end justify-between gap-4 px-4">
        {perkembangan.map((p, i) => {
          const tinggi = (p.nilai / MAX_PERKEMBANGAN) * 100;
          return (
            <div key={p.tahun} className="group/tip relative flex h-full flex-1 flex-col justify-end">
              {/* Batang naik dari bawah saat halaman dibuka */}
              <div className="flex h-full items-end overflow-hidden rounded-t-md bg-[#EEF0F4]">
                <div
                  className="anim-tinggi w-full rounded-t-md bg-[#2E62EA] transition-colors duration-300 group-hover/tip:bg-[#4276E8]"
                  style={{ height: `${tinggi}%`, ...tunda(delay + 300 + i * 100) }}
                />
              </div>

              <Tip style={{ bottom: `calc(${tinggi}% + 8px)` }}>
                <b>{p.tahun}</b>
                <br />
                {p.nilai} alumni
              </Tip>
            </div>
          );
        })}
      </div>

      <div className="mt-3 flex justify-between gap-4 px-4">
        {perkembangan.map((p) => (
          <span key={p.tahun} className="flex-1 text-center text-lg text-[#666666]">
            {p.tahun}
          </span>
        ))}
      </div>

      <div className="mt-6 flex items-center gap-3 border-t border-[#E8E9ED] pt-5 text-[15px] font-medium text-[#181B21]">
        <span className="h-2.5 w-2.5 rounded-full bg-green-600" />
        Sedang Bekerja Aktif : 512 alumni
      </div>
    </Card>
  );
}

function KategoriCard({ delay }: { delay: number }) {
  return (
    <Card
      title="Lowongan Berdasarkan Kategori"
      subtitle="Distribusi waktu mulai karier berdasarkan riwayat"
      delay={delay}
    >
      <ul className="space-y-5">
        {kategoriLowongan.map((k, i) => (
          <li key={i}>
            <div className="flex items-center justify-between text-sm">
              <span className="font-medium text-[#181B21]">{k.nama}</span>
              <span>
                <b className="font-semibold text-[#2E62EA]">{k.posisi}</b>{" "}
                <span className="text-xs text-[#666666]">Posisi</span>
              </span>
            </div>

            <div className="group/tip relative mt-2">
              <div className="h-2.5 w-full overflow-hidden rounded-full bg-[#EEF0F4]">
                <div
                  className="anim-lebar h-full rounded-full bg-[#2E62EA] transition-colors duration-300 group-hover/tip:bg-[#4276E8]"
                  style={{ width: `${k.persen}%`, ...tunda(delay + 300 + i * 100) }}
                />
              </div>
              <Tip style={{ left: `${Math.min(k.persen, 88)}%`, bottom: "calc(100% + 6px)" }}>
                <b>{k.nama}</b>
                <br />
                {k.posisi} posisi
              </Tip>
            </div>
          </li>
        ))}
      </ul>
    </Card>
  );
}

function BidangCard({ delay }: { delay: number }) {
  return (
    <Card
      title="Bidang Pekerjaan Alumni"
      subtitle="Distribusi bidang industri tempat alumni berkarier"
      delay={delay}
    >
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-5">
        {bidangPekerjaan.map((b, i) => (
          <div key={i} className="rounded-xl border border-[#E8E9ED] bg-white p-4">
            <div className="flex items-center justify-between">
              <Briefcase className="h-4 w-4 text-[#2E62EA]" strokeWidth={1.75} />
              <span className="rounded border border-[#2E62EA] bg-[#EEF3FE] px-1.5 py-0.5 text-[11px] font-medium text-[#2E62EA]">
                {b.persen}%
              </span>
            </div>
            <p className="mt-3 text-sm font-semibold text-[#181B21]">{b.nama}</p>
            <p className="mt-3 flex items-baseline gap-2">
              <span className="text-[28px] font-bold leading-none text-[#181B21]">{b.jumlah}</span>
              <span className="text-sm text-[#666666]">Alumni</span>
            </p>

            <div className="group/tip relative mt-3">
              <div className="h-2 w-full overflow-hidden rounded-full bg-[#EEF0F4]">
                <div
                  className="anim-lebar h-full rounded-full bg-[#2E62EA] transition-colors duration-300 group-hover/tip:bg-[#4276E8]"
                  style={{ width: `${Math.min(b.persen, 100)}%`, ...tunda(delay + 300 + i * 100) }}
                />
              </div>
              <Tip style={{ left: `${Math.min(Math.max(b.persen, 15), 85)}%`, bottom: "calc(100% + 6px)" }}>
                <b>{b.nama}</b>
                <br />
                {b.jumlah} alumni ({b.persen}%)
              </Tip>
            </div>
          </div>
        ))}
      </div>
    </Card>
  );
}

function Pill({ children, className }: { children: React.ReactNode; className: string }) {
  return (
    <span
      className={`inline-block min-w-[48px] rounded-full border px-3 py-0.5 text-center text-sm font-semibold ${className}`}
    >
      {children}
    </span>
  );
}

function JurusanTable({ delay }: { delay: number }) {
  const total = (k: "total" | "bekerja" | "pendidikan" | "wirausaha" | "lainnya") =>
    jurusan.reduce((acc, j) => acc + j[k], 0);

  return (
    <section
      style={tunda(delay)}
      className="anim-masuk overflow-hidden rounded-2xl border border-[#E8E9ED] bg-white"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-[15px]">
          <thead className="border-b border-[#E8E9ED] bg-[#EEF3FE]/60">
            <tr className="text-[13px] font-bold text-[#181B21]">
              <th className="px-6 py-5">JURUSAN</th>
              <th className="px-4 py-5 text-center">TOTAL ALUMNI</th>
              <th className="px-4 py-5 text-center">BEKERJA</th>
              <th className="px-4 py-5 text-center">PENDIDIKAN</th>
              <th className="px-4 py-5 text-center">WIRAUSAHA</th>
              <th className="px-4 py-5 text-center">LAINNYA</th>
              <th className="px-6 py-5 text-center">PRESENTASE BEKERJA</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#E8E9ED]">
            {jurusan.map((j) => (
              <tr key={j.kode} className="transition-colors hover:bg-[#EEF3FE]/70">
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <span className="w-[62px] shrink-0 rounded border border-[#2E62EA] px-2 py-1 text-center text-xs font-semibold text-[#2E62EA]">
                      {j.kode}
                    </span>
                    <span className="max-w-[200px] text-sm font-bold leading-snug text-[#181B21]">{j.nama}</span>
                  </div>
                </td>
                <td className="px-4 py-4 text-center font-bold text-[#181B21]">{j.total}</td>
                <td className="px-4 py-4 text-center">
                  <Pill className="border-emerald-300 bg-emerald-50 text-emerald-700">{j.bekerja}</Pill>
                </td>
                <td className="px-4 py-4 text-center">
                  <Pill className="border-purple-300 bg-purple-50 text-purple-500">{j.pendidikan}</Pill>
                </td>
                <td className="px-4 py-4 text-center">
                  <Pill className="border-blue-300 bg-blue-50 text-[#2E62EA]">{j.wirausaha}</Pill>
                </td>
                <td className="px-4 py-4 text-center">
                  <Pill className="border-gray-300 bg-gray-100 text-[#666666]">{j.lainnya}</Pill>
                </td>
                <td className="px-6 py-4 text-center font-bold text-emerald-700">{j.persen}</td>
              </tr>
            ))}
          </tbody>
          <tfoot className="border-t border-[#E8E9ED] bg-[#EEF3FE]/60 font-bold">
            <tr>
              <td className="px-6 py-5 text-[#181B21]">Total Semua Jurusan</td>
              <td className="px-4 py-5 text-center text-[#181B21]">{total("total")}</td>
              <td className="px-4 py-5 text-center text-emerald-700">{total("bekerja")}</td>
              <td className="px-4 py-5 text-center text-purple-500">{total("pendidikan")}</td>
              <td className="px-4 py-5 text-center text-[#2E62EA]">{total("wirausaha")}</td>
              <td className="px-4 py-5 text-center text-[#666666]">{total("lainnya")}</td>
              <td className="px-6 py-5 text-center text-emerald-700">75%</td>
            </tr>
          </tfoot>
        </table>
      </div>
    </section>
  );
}

/* ============================ HALAMAN ============================ */

export default function AnalyticsPage() {
  const [periode, setPeriode] = useState(periodeOpsi[0]);

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <style>{animasiCSS}</style>

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-10">
          <div className="anim-masuk flex items-start justify-between" style={tunda(0)}>
            <div>
              <h1 className="text-[34px] font-bold text-[#181B21]">Analytics</h1>
              <p className="mt-2 max-w-[560px] text-[15px] text-[#666666]">
                Lihat ringkasan perkembangan lowongan dan karier alumni berdasarkan data TALENTA.
              </p>
            </div>

            <div className="relative">
              <select
                value={periode}
                onChange={(e) => setPeriode(e.target.value)}
                className="h-[48px] w-[220px] appearance-none rounded-lg border border-[#E8E9ED] bg-white pl-4 pr-10 text-[15px] text-[#181B21] focus:border-[#2E62EA] focus:outline-none focus:ring-2 focus:ring-[#DCE6FD]"
              >
                {periodeOpsi.map((o) => (
                  <option key={o}>{o}</option>
                ))}
              </select>
              <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
            </div>
          </div>

          {/* Statistik ringkas */}
          <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((s, i) => (
              <StatCard key={s.title} item={s} delay={100 + i * 80} />
            ))}
          </div>

          {/* Baris 1: status karier + status lowongan */}
          <div className="mt-8 grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.05fr_1fr]">
            <StatusKarierCard delay={450} />
            <StatusLowonganCard delay={530} />
          </div>

          {/* Baris 2: perkembangan + kategori */}
          <div className="mt-8 grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.05fr_1fr]">
            <PerkembanganCard delay={650} />
            <KategoriCard delay={730} />
          </div>

          {/* Bidang pekerjaan */}
          <div className="mt-8">
            <BidangCard delay={850} />
          </div>

          {/* Tabel jurusan */}
          <div className="mt-8 pb-4">
            <JurusanTable delay={950} />
          </div>
        </main>
      </div>
    </div>
  );
}