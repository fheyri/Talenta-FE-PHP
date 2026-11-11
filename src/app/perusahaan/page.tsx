"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import {
  LayoutGrid,
  Briefcase,
  Building2,
  Tag,
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
  MoreVertical,
  ArrowLeft,
  ArrowRight,
  ClipboardList,
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

type Perusahaan = {
  id: number;
  nama: string;
  kode: string;
  terverifikasi: boolean;
  bidang: string;
  lokasi: string;
  jumlahLowongan: number;
  aktif: boolean;
  lowonganAktif: number;
};

const contoh = [
  { nama: "PT Teknologi Nusantara", bidang: "Teknologi Informasi", lokasi: "Jakarta Selatan" },
  { nama: "PT Kreasi Digital", bidang: "Teknologi Informasi", lokasi: "Jakarta Selatan" },
  { nama: "Studio Kreatif Indonesia", bidang: "Desain & Kreatif", lokasi: "Jakarta Pusat" },
  { nama: "PT Astra Graphia IT", bidang: "Teknologi Informasi", lokasi: "Surabaya" },
  { nama: "PT Mitra Solusi Solusindo", bidang: "Teknologi Informasi", lokasi: "Semarang" },
];

const semuaPerusahaan: Perusahaan[] = Array.from({ length: 50 }, (_, i) => {
  const c = contoh[i % contoh.length];
  return {
    id: i + 1,
    nama: c.nama,
    kode: `0123-2026-${String(i + 1).padStart(3, "0")}`,
    terverifikasi: true,
    bidang: c.bidang,
    lokasi: c.lokasi,
    jumlahLowongan: 12,
    aktif: true,
    lowonganAktif: 3,
  };
});

const PER_HALAMAN = 10;

const stats = [
  {
    title: "TOTAL PERUSAHAAN",
    value: "50",
    note: "Terdaftar di BKK",
    dot: "bg-[#2E62EA]",
    noteColor: "text-[#666666]",
    icon: Briefcase,
    iconBox: "bg-[#DCE6FD] text-[#2E62EA]",
  },
  {
    title: "PERUSAHAAN AKTIF",
    value: "50",
    note: "Status Aktif Di Kemitraan",
    dot: "bg-green-600",
    noteColor: "text-green-600",
    icon: CheckCircle2,
    iconBox: "bg-green-50 text-green-600",
  },
  {
    title: "Lowongan Aktif",
    value: "50",
    note: "Memiliki Kuota Siswa / Alumni",
    dot: "bg-[#2E62EA]",
    noteColor: "text-[#666666]",
    icon: Briefcase,
    iconBox: "bg-[#DCE6FD] text-[#2E62EA]",
  },
  {
    title: "Perusahaan Baru",
    value: "50",
    note: "Bulan Ini",
    dot: "bg-amber-700",
    noteColor: "text-amber-800",
    icon: CheckCircle2,
    iconBox: "bg-amber-100 text-amber-600",
  },
];

/* ============================ KOMPONEN ============================ */

function buatDaftarHalaman(sekarang: number, total: number): (number | "...")[] {
  if (total <= 6) return Array.from({ length: total }, (_, i) => i + 1);
  if (sekarang <= 3) return [1, 2, 3, "...", total];
  if (sekarang >= total - 2) return [1, "...", total - 2, total - 1, total];
  return [1, "...", sekarang - 1, sekarang, sekarang + 1, "...", total];
}

function RowMenu({ id, onHapus }: { id: number; onHapus: () => void }) {
  const [buka, setBuka] = useState(false);

  return (
    <div className="relative inline-block">
      <button
        aria-label="Menu aksi"
        onClick={() => setBuka((b) => !b)}
        className="rounded-md p-1 text-[#181B21] hover:bg-[#EEF3FE]"
      >
        <MoreVertical className="h-5 w-5" />
      </button>

      {buka && (
        <>
          {/* klik di luar menu untuk menutup */}
          <button
            aria-label="Tutup menu"
            className="fixed inset-0 z-10 cursor-default"
            onClick={() => setBuka(false)}
          />
          <div className="absolute right-0 z-20 mt-1 w-40 overflow-hidden rounded-lg border border-[#E8E9ED] bg-white py-1 shadow-lg">
            <Link
              href={`/perusahaan/${id}`}
              className="block px-4 py-2.5 text-[15px] text-[#181B21] hover:bg-[#EEF3FE]"
            >
              Lihat Detail
            </Link>
            <Link
              href={`/perusahaan/${id}/edit`}
              className="block px-4 py-2.5 text-[15px] text-[#181B21] hover:bg-[#EEF3FE]"
            >
              Edit
            </Link>
            <button
              onClick={() => {
                setBuka(false);
                onHapus();
              }}
              className="block w-full px-4 py-2.5 text-left text-[15px] text-red-600 hover:bg-red-50"
            >
              Hapus
            </button>
          </div>
        </>
      )}
    </div>
  );
}

/* ============================ HALAMAN ============================ */

export default function PerusahaanPage() {
  const [periode, setPeriode] = useState("Bulan ini");
  const [data, setData] = useState<Perusahaan[]>(semuaPerusahaan);
  const [halaman, setHalaman] = useState(1);

  const totalHalaman = Math.max(1, Math.ceil(data.length / PER_HALAMAN));
  const awal = (halaman - 1) * PER_HALAMAN;
  const tampil = data.slice(awal, awal + PER_HALAMAN);

  const hapus = (id: number, nama: string) => {
    // Nanti ganti dengan request DELETE ke API backend.
    if (window.confirm(`Hapus ${nama}?`)) {
      const sisa = data.filter((p) => p.id !== id);
      setData(sisa);
      setHalaman((h) => Math.min(h, Math.max(1, Math.ceil(sisa.length / PER_HALAMAN))));
    }
  };

  return (
    <AdminShell>
      {/* Judul */}
      <div className="flex items-start justify-between gap-6">
        <div>
          <h1 className="text-[34px] font-bold text-[#181B21]">Perusahaan</h1>
          <p className="mt-2 text-[15px] text-[#666666]">
            Kelola data perusahaan yang menjadi sumber informasi lowongan di TALENTA.
          </p>
        </div>

        <div className="flex items-center gap-5">
          <Link
            href="/perusahaan/tambah"
            className="flex h-[54px] items-center gap-3 rounded-lg bg-[#2E62EA] px-7 text-[15px] font-semibold text-white transition-colors hover:bg-[#4276E8]"
          >
            <Plus className="h-5 w-5" strokeWidth={2.25} />
            Tambah Perusahaan
          </Link>
          <Segmented
            options={["Bulan ini", "Bulan lalu", "Tahun 2026"]}
            value={periode}
            onChange={setPeriode}
          />
        </div>
      </div>

      {/* 4 kartu */}
      <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
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
      <section className="mt-9 overflow-hidden rounded-2xl border border-[#E8E9ED] bg-white">
        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-[15px]">
            <thead>
              <tr className="border-b border-[#E8E9ED] bg-[#EEF3FE]/50 text-[#181B21]">
                <th className="px-8 py-5 font-bold">Perusahaan</th>
                <th className="px-4 py-5 font-bold">Bidang</th>
                <th className="px-4 py-5 font-bold">LOKASI</th>
                <th className="px-4 py-5 text-center font-bold">Jumlah Lowongan</th>
                <th className="px-4 py-5 text-center font-bold">STATUS</th>
                <th className="px-4 py-5 text-center font-bold">Lowongan Aktif</th>
                <th className="px-8 py-5 text-center font-bold">AKSI</th>
              </tr>
            </thead>
            <tbody>
              {tampil.map((p) => (
                <tr key={p.id} className="border-b border-[#E8E9ED] last:border-b-0">
                  <td className="px-8 py-6">
                    <p className="font-bold text-[#181B21]">{p.nama}</p>
                    <p className="mt-1 text-sm text-[#666666]">
                      ID : {p.kode}
                      {p.terverifikasi && " • Terverifikasi"}
                    </p>
                  </td>
                  <td className="px-4 py-6">
                    <span className="inline-block whitespace-nowrap rounded-md bg-[#DCE6FD] px-3.5 py-2 text-sm font-semibold text-[#2E62EA]">
                      {p.bidang}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-[#666666]">{p.lokasi}</td>
                  <td className="px-4 py-6 text-center text-[#666666]">{p.jumlahLowongan}</td>
                  <td className="px-4 py-6 text-center">
                    <span
                      className={`inline-block rounded-md border px-4 py-1.5 font-medium ${
                        p.aktif
                          ? "border-green-300 bg-green-50 text-green-700"
                          : "border-[#E8E9ED] bg-[#F6F7F8] text-[#666666]"
                      }`}
                    >
                      {p.aktif ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-4 py-6 text-center">
                    <span className="inline-block whitespace-nowrap rounded-md border border-green-300 bg-green-50 px-4 py-1.5 font-medium text-green-700">
                      {p.lowonganAktif} Aktif
                    </span>
                  </td>
                  <td className="px-8 py-6 text-center">
                    <RowMenu id={p.id} onHapus={() => hapus(p.id, p.nama)} />
                  </td>
                </tr>
              ))}

              {tampil.length === 0 && (
                <tr>
                  <td colSpan={7} className="px-8 py-14 text-center text-[#666666]">
                    Belum ada data perusahaan. Klik <b>Tambah Perusahaan</b> untuk menambahkan.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex flex-wrap items-center justify-between gap-4 border-t border-[#E8E9ED] px-8 py-5">
          <p className="text-[17px] font-bold text-[#181B21]">
            Menampilkan {data.length === 0 ? 0 : awal + 1}-{Math.min(awal + PER_HALAMAN, data.length)} dari{" "}
            {data.length} Perusahaan
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