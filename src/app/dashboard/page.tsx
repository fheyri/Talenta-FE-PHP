"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
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
  ArrowRight,
  ChevronDown,
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
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <Sidebar />
      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />
        <main className="flex-1 overflow-y-auto px-10 py-10">{children}</main>
      </div>
    </div>
  );
}

/* ============================ TOMBOL PILIHAN PERIODE ============================ */

function Segmented({
  options,
  value,
  onChange,
}: {
  options: string[];
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <div className="flex rounded-lg border border-[#E8E9ED] bg-[#F6F7F8] p-1">
      {options.map((opt) => (
        <button
          key={opt}
          onClick={() => onChange(opt)}
          className={`rounded-md px-5 py-2 text-[15px] font-medium transition-colors ${
            value === opt
              ? "bg-white text-[#2E62EA] shadow-sm"
              : "text-[#666666] hover:text-[#181B21]"
          }`}
        >
          {opt}
        </button>
      ))}
    </div>
  );
}

/* ============================ DATA DUMMY ============================ */
// Nanti ganti dengan data dari API backend.

const stats: {
  title: string;
  value: string;
  icon: LucideIcon;
  trend?: string;
  badge?: string;
  note: string;
}[] = [
  { title: "TOTAL LOWONGAN", value: "50", icon: Briefcase, trend: "+12%", note: "48 Aktif saat ini" },
  { title: "TOTAL SISWA", value: "1.248", icon: Users, trend: "+10%", note: "Kelas XII & Tingkat Akhir" },
  { title: "TOTAL Alumni", value: "1.500", icon: GraduationCap, trend: "+8%", note: "Terserap 80.1%" },
  { title: "LOWONGAN AKTIF", value: "48", icon: GraduationCap, badge: "Sedang tayang", note: "Lowongan yang sedang di publikasikan" },
];

const chartData = [
  { bulan: "Jan", aktif: 148, expired: 29 },
  { bulan: "Feb", aktif: 114, expired: 47 },
  { bulan: "March", aktif: 160, expired: 47 },
  { bulan: "April", aktif: 104, expired: 89 },
  { bulan: "May", aktif: 187, expired: 61 },
  { bulan: "June", aktif: 201, expired: 38 },
  { bulan: "July", aktif: 228, expired: 89 },
];

const alumni = [
  { label: "Bekerja ( PT / Industri )", persen: 58, jumlah: 508, warna: "bg-[#2E62EA]" },
  { label: "Melanjutkan Kuliah ( PTN / PTS / PTLN )", persen: 24, jumlah: 200, warna: "bg-[#4276E8]" },
  { label: "Wirausaha Mandiri", persen: 10, jumlah: 108, warna: "bg-[#6F94EE]" },
  { label: "Mencari Kerja / Menunggu", persen: 7, jumlah: 60, warna: "bg-[#DCE6FD]" },
];

const lowongan = [
  { posisi: "UI/UX Designer", tipe: "Full-Time • SMK/D3", perusahaan: "PT Kreasi Digital", lokasi: "Jakarta Selatan", deadline: "12 Sep 2026", aktif: true },
  { posisi: "Frontend Developer", tipe: "Magang / Internship", perusahaan: "PT Teknologi Nusantara", lokasi: "Bandung", deadline: "18 Sep 2026", aktif: true },
  { posisi: "Graphic Designer", tipe: "Full-Time", perusahaan: "Studio Kreatif Indonesia", lokasi: "Jakarta Pusat", deadline: "22 Sep 2026", aktif: true },
  { posisi: "Quality Assurance Tester", tipe: "Kontrak 1 Tahun", perusahaan: "PT Astra Graphia IT", lokasi: "Surabaya", deadline: "28 Sep 2026", aktif: true },
  { posisi: "Backend Engineer (Golang)", tipe: "Full-Time", perusahaan: "PT Mitra Solusi Solusindo", lokasi: "Semarang", deadline: "20 Agu 2026", aktif: false },
];

const perhatian = [
  { judul: "7 lowongan akan berakhir dalam 3 hari", link: "Lihat Lowongan", desc: "Posisi IT Support & Drafter segera ditutup." },
  { judul: "12 lowongan akan berakhir minggu ini", link: "Lihat Lowongan", desc: "Periksa pembaruan kuota pelamar dan tenggat waktu." },
  { judul: "18 data alumni belum memperbarui informasi karier", link: "Lihat Alumni", desc: "Form tracer study angkatan 2025 belum tuntas terisi." },
];

/* ============================ KONTEN DASHBOARD ============================ */

function StatCard({ item }: { item: (typeof stats)[number] }) {
  const Icon = item.icon;
  return (
    <div className="rounded-2xl border border-[#E8E9ED] bg-white px-6 py-5 shadow-sm">
      <div className="flex items-center justify-between">
        <p className="text-[15px] text-[#666666]">{item.title}</p>
        <span className="flex h-9 w-9 items-center justify-center rounded-lg bg-[#EEF3FE] text-[#4276E8]">
          <Icon className="h-5 w-5" strokeWidth={1.75} />
        </span>
      </div>
      <div className="mt-5 flex items-center gap-3">
        <p className="text-[34px] font-bold leading-none text-[#181B21]">{item.value}</p>
        <span className="flex items-center gap-1 rounded-md bg-green-50 px-2 py-1 text-sm font-medium text-green-600">
          {item.trend && <ArrowUp className="h-3.5 w-3.5" strokeWidth={2.25} />}
          {item.trend ?? item.badge}
        </span>
      </div>
      <p className="mt-4 text-[15px] text-[#666666]">{item.note}</p>
    </div>
  );
}

function OverviewChart() {
  const [filter, setFilter] = useState("Semua");
  const tinggi = 240;

  return (
    <section className="rounded-2xl border border-[#E8E9ED] bg-white p-8">
      <div className="flex items-start justify-between gap-4">
        <div>
          <h2 className="text-[28px] font-bold text-[#181B21]">Overview Lowongan</h2>
          <p className="mt-2 max-w-[330px] text-[15px] text-[#666666]">
            Statistik pertumbuhan lowongan dan distribusi lowongan 2026
          </p>
        </div>
        <Segmented options={["Semua", "Aktif", "Expired"]} value={filter} onChange={setFilter} />
      </div>

      <div className="mt-6 border-t border-[#E8E9ED]" />

      <div className="flex items-end justify-between px-4 pt-6" style={{ height: tinggi + 60 }}>
        {chartData.map((d) => (
          <div key={d.bulan} className="flex flex-col items-center gap-3">
            <div className="flex items-end gap-1" style={{ height: tinggi }}>
              {filter !== "Expired" && (
                <div className="w-5 rounded-t-[3px] bg-[#2E62EA]" style={{ height: d.aktif }} />
              )}
              {filter !== "Aktif" && (
                <div className="w-5 rounded-t-[3px] bg-[#D9DBE1]" style={{ height: d.expired }} />
              )}
            </div>
            <span className="text-[15px] text-[#666666]">{d.bulan}</span>
          </div>
        ))}
      </div>

      <div className="mt-5 flex items-center justify-between border-t border-[#E8E9ED] pt-5 text-[15px] text-[#181B21]">
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#2E62EA]" /> Aktif ( 142 )
        </span>
        <span className="flex items-center gap-2">
          <span className="h-3 w-3 rounded-full bg-[#D9DBE1]" /> Expired ( 42 )
        </span>
      </div>
    </section>
  );
}

function AlumniProgress() {
  return (
    <section className="rounded-2xl border border-[#E8E9ED] bg-white p-8">
      <h2 className="text-[28px] font-bold text-[#181B21]">Perkembangan Karier Alumni</h2>
      <p className="mt-2 text-[15px] text-[#666666]">Distribusi alumni angkatan 2025-2026</p>

      <div className="mt-6 border-t border-[#E8E9ED]" />

      <div className="mt-6 flex h-3.5 overflow-hidden rounded-full bg-[#F6F7F8]">
        {alumni.map((a) => (
          <div key={a.label} className={a.warna} style={{ width: `${a.persen}%` }} />
        ))}
      </div>

      <ul className="mt-7 space-y-5">
        {alumni.map((a) => (
          <li key={a.label} className="flex items-center gap-3 text-[15px]">
            <span className="h-3 w-3 shrink-0 rounded-full bg-[#2E62EA]" />
            <span className="flex-1 text-[#181B21]">{a.label}</span>
            <span className="font-bold text-[#181B21]">{a.persen}%</span>
            <span className="w-[88px] text-right text-[#666666]">( {a.jumlah} Siswa )</span>
          </li>
        ))}
      </ul>
    </section>
  );
}

function RecentJobs() {
  return (
    <section className="rounded-2xl border border-[#E8E9ED] bg-white p-8">
      <div className="flex items-start justify-between">
        <div>
          <h2 className="text-[28px] font-bold text-[#181B21]">Lowongan Terbaru</h2>
          <p className="mt-2 text-[15px] text-[#666666]">
            Daftar postingan lowongan kerja dan status peninjauan
          </p>
        </div>
        <div className="flex items-center gap-4">
          <button className="flex items-center gap-8 rounded-lg border border-[#E8E9ED] px-4 py-2.5 text-[15px] text-[#666666]">
            Semua Kategori <ChevronDown className="h-4 w-4" />
          </button>
          <Link href="/lowongan" className="flex items-center gap-2 text-[15px] font-semibold text-[#2E62EA]">
            Lihat Semua <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>

      <div className="mt-6 overflow-x-auto">
        <table className="w-full min-w-[720px] text-left text-[15px]">
          <thead>
            <tr className="text-[#666666]">
              {["POSISI", "PERUSAHAAN", "LOKASI", "DEADLINE", "STATUS", "AKSI"].map((h) => (
                <th key={h} className="pb-4 pr-4 font-semibold">{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {lowongan.map((j) => (
              <tr key={j.posisi}>
                <td className="py-5 pr-4">
                  <p className="font-bold text-[#181B21]">{j.posisi}</p>
                  <p className="mt-1 text-sm text-[#666666]">{j.tipe}</p>
                </td>
                <td className="py-5 pr-6 text-[#666666]">{j.perusahaan}</td>
                <td className="py-5 pr-6 text-[#666666]">{j.lokasi}</td>
                <td className="py-5 pr-6 text-[#666666]">{j.deadline}</td>
                <td className="py-5 pr-4">
                  {j.aktif ? (
                    <span className="inline-flex items-center gap-2 rounded-md border border-green-300 bg-green-50 px-4 py-1.5 font-medium text-green-700">
                      <span className="h-2 w-2 rounded-full bg-green-600" /> Aktif
                    </span>
                  ) : (
                    <span className="px-4 text-[#666666]">Expired</span>
                  )}
                </td>
                <td className="py-5">
                  <a href="#" className="font-medium text-[#2E62EA] hover:underline">Detail</a>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}

function Attention() {
  return (
    <section className="flex flex-col rounded-2xl border border-[#E8E9ED] bg-white p-8">
      <div className="flex items-center justify-between">
        <h2 className="flex items-center gap-3 text-[24px] font-bold text-[#181B21]">
          <span className="h-3 w-3 rounded-full bg-amber-500" />
          Perlu Perhatian
        </h2>
        <span className="text-[15px] text-[#666666]">3 Perhatian</span>
      </div>

      <div className="mt-8 flex-1 space-y-7">
        {perhatian.map((p) => (
          <div key={p.judul}>
            <div className="flex items-start justify-between gap-4">
              <p className="max-w-[200px] text-[17px] font-bold leading-snug text-[#181B21]">{p.judul}</p>
              <a href="#" className="shrink-0 text-[15px] font-medium text-[#2E62EA] hover:underline">{p.link}</a>
            </div>
            <p className="mt-2 text-[15px] text-[#666666]">{p.desc}</p>
          </div>
        ))}
      </div>

      <a
        href="#"
        className="mt-6 flex items-center justify-center gap-2 text-[15px] font-medium text-[#181B21] hover:text-[#2E62EA]"
      >
        Buka Pusat Notifikasi & Log <ArrowRight className="h-4 w-4" />
      </a>
    </section>
  );
}

/* ============================ HALAMAN ============================ */

export default function DashboardPage() {
  const [periode, setPeriode] = useState("Bulan ini");

  return (
    <AdminShell>
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-[34px] font-bold text-[#181B21]">Dasboard</h1>
          <p className="mt-2 text-[15px] text-[#666666]">
            Selamat datang kembali, Admin. Kelola data dan informasi BKK dengan lebih mudah.
          </p>
        </div>
        <Segmented
          options={["Bulan ini", "Bulan lalu", "Tahun 2026"]}
          value={periode}
          onChange={setPeriode}
        />
      </div>

      <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
        {stats.map((s) => (
          <StatCard key={s.title} item={s} />
        ))}
      </div>

      <div className="mt-9 grid grid-cols-1 items-start gap-6 xl:grid-cols-[1.45fr_1fr]">
        <OverviewChart />
        <AlumniProgress />
      </div>

      <div className="mt-9 grid grid-cols-1 gap-6 xl:grid-cols-[1.75fr_1fr]">
        <RecentJobs />
        <Attention />
      </div>
    </AdminShell>
  );
}