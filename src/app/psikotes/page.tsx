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
  Clock,
  CircleCheck,
  EllipsisVertical,
  ArrowLeft,
  ArrowRight,
  X,
  ClipboardList,
  CirclePlay,
  Timer,
  Smartphone,
  Eye,
  Pencil,
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

/* ============================ ANIMASI ============================ */
/*
  anim-masuk  : elemen muncul dari bawah + fade saat halaman dibuka (bergantian)
  anim-baris  : baris tabel muncul satu per satu dari kiri
  anim-overlay: latar popup memudar masuk
  anim-modal  : kotak popup membesar dari 94% sambil naik sedikit
  kartu-hover : HANYA dipakai di 3 kartu statistik paling atas
  Angka di kartu statistik juga naik dari 0 (count-up).
*/
const animasiCSS = `
@keyframes masuk-naik {
  from { opacity: 0; transform: translateY(18px); }
  to   { opacity: 1; transform: translateY(0); }
}
@keyframes masuk-kiri {
  from { opacity: 0; transform: translateX(-16px); }
  to   { opacity: 1; transform: translateX(0); }
}
@keyframes overlay-masuk {
  from { opacity: 0; }
  to   { opacity: 1; }
}
@keyframes modal-masuk {
  from { opacity: 0; transform: translateY(14px) scale(0.94); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.anim-masuk   { animation: masuk-naik 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.anim-baris   { animation: masuk-kiri 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.anim-overlay { animation: overlay-masuk 0.25s ease-out; }
.anim-modal   { animation: modal-masuk 0.35s cubic-bezier(0.22, 1, 0.36, 1); }

.kartu-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.kartu-hover:hover {
  transform: translateY(-6px);
  border-color: rgba(46, 98, 234, 0.35);
  box-shadow: 0 14px 30px -12px rgba(46, 98, 234, 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .anim-masuk, .anim-baris, .anim-overlay, .anim-modal { animation: none; }
  .kartu-hover:hover { transform: none; }
}
`;

const tunda = (ms: number) => ({ animationDelay: `${ms}ms` });

// Angka naik dari 0 ke target saat halaman dibuka
function useCountUp(target: number, durasi = 800, mulaiSetelah = 0) {
  const [nilai, setNilai] = useState(0);

  useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      setNilai(target);
      return;
    }
    let frame = 0;
    let t0 = 0;
    const timer = setTimeout(() => {
      const jalan = (t: number) => {
        if (!t0) t0 = t;
        const p = Math.min((t - t0) / durasi, 1);
        const ease = 1 - Math.pow(1 - p, 3);
        setNilai(Math.round(target * ease));
        if (p < 1) frame = requestAnimationFrame(jalan);
      };
      frame = requestAnimationFrame(jalan);
    }, mulaiSetelah);
    return () => {
      clearTimeout(timer);
      cancelAnimationFrame(frame);
    };
  }, [target, durasi, mulaiSetelah]);

  return nilai;
}

/* ============================ DATA DUMMY ============================ */
// Nanti ganti dengan data dari API backend.

const user = { nama: "Fachry Ahmad", inisial: "FA", role: "Super Admin" };

const mainMenu: { label: string; href: string; icon: LucideIcon; badge?: string }[] = [
  { label: "Dashboard", href: "/dashboard", icon: LayoutGrid },
  { label: "Lowongan", href: "/lowongan", icon: Briefcase, badge: "99+" },
  { label: "Perusahaan", href: "/perusahaan", icon: Building2 },
  { label: "Psikotes", href: "/psikotes", icon: Brain },
  { label: "Siswa", href: "/siswa", icon: Users },
  { label: "Alumni", href: "/alumni", icon: GraduationCap },
  { label: "Monitoring Karier", href: "/monitoring", icon: BarChart3 },
  { label: "Analytics", href: "/analytics", icon: Activity },
];

const systemMenu: { label: string; href: string; icon: LucideIcon }[] = [
  { label: "Manajemen Admin", href: "/admin", icon: Lock },
  { label: "Pengaturan", href: "/pengaturan", icon: Settings },
];

type Tes = {
  id: number;
  judul: string;
  jumlahSoal: number;
  skoring: string;
  durasi: number;
  percobaanGratis: number;
  token: number;
  aktif: boolean;
};

const daftarTes: Tes[] = [
  {
    id: 1,
    judul: "Tes Kesiapan Kerja",
    jumlahSoal: 25,
    skoring: "Skoring Standar Industri",
    durasi: 120,
    percobaanGratis: 3,
    token: 3,
    aktif: true,
  },
  {
    id: 2,
    judul: "Tes Minat Karier",
    jumlahSoal: 30,
    skoring: "Pemetaan Orientasi Kerja",
    durasi: 90,
    percobaanGratis: 2,
    token: 2,
    aktif: true,
  },
  {
    id: 3,
    judul: "Tes Minat Karier",
    jumlahSoal: 30,
    skoring: "Pemetaan Orientasi Kerja",
    durasi: 90,
    percobaanGratis: 2,
    token: 2,
    aktif: true,
  },
  {
    id: 4,
    judul: "Tes Minat Karier",
    jumlahSoal: 30,
    skoring: "Pemetaan Orientasi Kerja",
    durasi: 90,
    percobaanGratis: 2,
    token: 2,
    aktif: false,
  },
];

type Riwayat = {
  id: number;
  nama: string;
  tipe: "Siswa" | "Alumni";
  percobaan: number;
  status: "Selesai" | "Proses";
  skor: number | null;
  hasil: string | null;
  mulai: string;
  selesai: string;
};

const daftarRiwayat: Riwayat[] = [
  {
    id: 1,
    nama: "El Razqa Chaeruzzaman ( Siswa SIJA )",
    tipe: "Siswa",
    percobaan: 1,
    status: "Selesai",
    skor: 86,
    hasil: "Siap Kerja",
    mulai: "09 Nov 2026, 09:00 WIB",
    selesai: "09 Nov 2026, 09:50 WIB",
  },
  {
    id: 2,
    nama: "Fachry Ahmad ( Siswa SIJA )",
    tipe: "Siswa",
    percobaan: 1,
    status: "Selesai",
    skor: 86,
    hasil: "Siap Kerja",
    mulai: "09 Nov 2026, 09:00 WIB",
    selesai: "09 Nov 2026, 09:50 WIB",
  },
  {
    id: 3,
    nama: "Arvin Hadiyyatullah ( Siswa SIJA )",
    tipe: "Siswa",
    percobaan: 1,
    status: "Proses",
    skor: null,
    hasil: null,
    mulai: "09 Nov 2026, 09:00 WIB",
    selesai: "09 Nov 2026, 09:50 WIB",
  },
  {
    id: 4,
    nama: "Rehannur Rizqi ( Alumni RPL )",
    tipe: "Alumni",
    percobaan: 2,
    status: "Selesai",
    skor: 86,
    hasil: "Siap Kerja",
    mulai: "09 Nov 2026, 09:00 WIB",
    selesai: "09 Nov 2026, 09:50 WIB",
  },
  {
    id: 5,
    nama: "Putri Nur'aini ( Alumni SIJA )",
    tipe: "Alumni",
    percobaan: 3,
    status: "Selesai",
    skor: 86,
    hasil: "Siap Kerja",
    mulai: "09 Nov 2026, 09:00 WIB",
    selesai: "09 Nov 2026, 09:50 WIB",
  },
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
    <aside className="flex h-screen w-[260px] shrink-0 flex-col border-r border-[#E8E9ED] bg-white">
      <div className="flex h-[81px] items-center gap-3 px-7">
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

      <nav className="flex-1 overflow-y-auto px-2 py-3">
        <p className="mb-3 px-5 text-[15px] text-[#666666]">Main menu</p>
        <div className="space-y-1">
          {mainMenu.map((m) => (
            <NavItem key={m.label} {...m} active={m.label === "Psikotes"} />
          ))}
        </div>
        <p className="mb-3 mt-6 px-5 text-[15px] text-[#666666]">System</p>
        <div className="space-y-1">
          {systemMenu.map((m) => (
            <NavItem key={m.label} {...m} active={false} />
          ))}
        </div>
      </nav>

      <div className="mx-5 flex items-center gap-3 py-5">
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
    <header className="flex h-[81px] shrink-0 items-center gap-5 bg-[#F6F7F8] px-8">
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

/* ============================ KOMPONEN KECIL ============================ */

// Kartu statistik: kartu yang bergerak saat di-hover + angkanya naik dari 0
function StatCard({
  label,
  value,
  note,
  dot,
  icon: Icon,
  iconClass,
  delay,
}: {
  label: string;
  value: number;
  note: string;
  dot: string;
  icon: LucideIcon;
  iconClass: string;
  delay: number;
}) {
  const tampil = useCountUp(value, 800, delay + 200);

  return (
    <div
      style={tunda(delay)}
      className="anim-masuk kartu-hover group flex items-start justify-between rounded-xl border border-[#E8E9ED] bg-white px-5 py-4"
    >
      <div className="leading-tight">
        <p className="text-[12px] uppercase text-[#666666]">{label}</p>
        <p className="mt-3 text-[28px] font-bold tabular-nums text-[#181B21]">{tampil}</p>
        <p className="mt-2 flex items-center gap-1.5 text-[12px] text-[#666666]">
          <span className={`h-1.5 w-1.5 rounded-full ${dot}`} />
          {note}
        </p>
      </div>
      <span
        className={`flex h-9 w-9 shrink-0 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${iconClass}`}
      >
        <Icon className="h-[18px] w-[18px]" strokeWidth={1.75} />
      </span>
    </div>
  );
}

function StatusBadge({ aktif }: { aktif: boolean }) {
  return (
    <span
      className={`inline-block rounded border px-3 py-0.5 text-[11px] font-semibold ${
        aktif
          ? "border-emerald-600 bg-green-50 text-emerald-700"
          : "border-[#D9DBE1] bg-[#F6F7F8] text-[#666666]"
      }`}
    >
      {aktif ? "Aktif" : "Nonaktif"}
    </span>
  );
}

const thClass = "px-5 py-4 text-left text-[11px] font-semibold uppercase text-[#181B21]";

/* ============================ MODAL: DETAIL HASIL ============================ */

const bulanPanjang: Record<string, string> = {
  Jan: "Januari",
  Feb: "Februari",
  Mar: "Maret",
  Apr: "April",
  Mei: "Mei",
  Jun: "Juni",
  Jul: "Juli",
  Agu: "Agustus",
  Sep: "September",
  Okt: "Oktober",
  Nov: "November",
  Des: "Desember",
};

// "09 Nov 2026, 09:00 WIB" -> "09 November 2026, 09:00 WIB"
function tanggalPanjang(s: string) {
  return s.replace(/\b([A-Za-z]{3})\b/, (m) => bulanPanjang[m] ?? m);
}

function InfoLabel({ children }: { children: React.ReactNode }) {
  return <p className="text-[10px] uppercase text-[#666666]">{children}</p>;
}

function MetaItem({
  icon: Icon,
  label,
  value,
}: {
  icon: LucideIcon;
  label: string;
  value: string;
}) {
  return (
    <div className="flex items-center gap-3 rounded-lg border border-[#E8E9ED] bg-[#F6F7F8] px-3 py-3 transition-colors duration-200 hover:border-[#2E62EA]/30 hover:bg-[#EEF3FE]">
      <Icon className="h-4 w-4 shrink-0 text-[#181B21]" strokeWidth={1.75} />
      <div className="leading-tight">
        <p className="text-[11px] text-[#666666]">{label}</p>
        <p className="mt-1 text-[13px] font-bold text-[#181B21]">{value}</p>
      </div>
    </div>
  );
}

function DetailHasilModal({ data, onClose }: { data: Riwayat; onClose: () => void }) {
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  // Dummy: nanti ambil dari API berdasarkan data.id
  const selesai = data.status === "Selesai";
  const nama = data.nama.replace(/\s*\(.*\)\s*$/, "");
  const keterangan =
    data.tipe === "Alumni"
      ? "Alumni Angkatan 2027 - SMKN 1 Cibinong"
      : "Siswa Kelas XII - SMKN 1 Cibinong";
  const namaTes = "Tes Kesiapan Kerja";
  const totalPercobaan = 3;
  const durasi = selesai ? "72 Menit" : "-";
  const platform = "Aplikasi Mobile Talenta ( Android )";
  const deskripsi = selesai
    ? "Peserta menunjukkan tingkat kesiapan kerja yang baik, disiplin, dan mampu memenuhi standar kerja umum mitra industri."
    : "Hasil belum tersedia karena tes masih dalam pengerjaan.";

  return (
    <div
      className="anim-overlay fixed inset-0 z-50 flex items-center justify-center bg-[#181B21]/20 p-4 backdrop-blur-sm"
      onClick={onClose}
    >
      <div
        role="dialog"
        aria-modal="true"
        aria-labelledby="judul-detail-hasil"
        onClick={(e) => e.stopPropagation()}
        className="anim-modal max-h-[92vh] w-full max-w-[580px] overflow-y-auto rounded-3xl bg-white p-5 shadow-2xl"
      >
        {/* Header */}
        <div className="flex items-start gap-3">
          <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-[#EEF3FE] text-[#2E62EA]">
            <ClipboardList className="h-5 w-5" strokeWidth={1.75} />
          </span>
          <div className="flex-1 leading-tight">
            <h2 id="judul-detail-hasil" className="text-[20px] font-bold text-[#181B21]">
              Detail Hasil Pengerjaan Psikotes
            </h2>
            <p className="mt-1 text-[12px] text-[#666666]">
              Laporan hasil evaluasi pengerjaan siswa / alumni.
            </p>
          </div>
          <button
            aria-label="Tutup"
            onClick={onClose}
            className="flex h-8 w-8 items-center justify-center rounded-md text-[#181B21] transition-all duration-200 hover:rotate-90 hover:bg-[#EEF3FE]"
          >
            <X className="h-6 w-6" strokeWidth={1.75} />
          </button>
        </div>

        <hr className="mt-5 border-[#666666]/50" />

        {/* Informasi pengguna & tes */}
        <section className="mt-5 rounded-lg border border-[#E8E9ED] bg-[#F6F7F8] px-4 py-3">
          <div className="grid grid-cols-2 gap-4">
            <div>
              <InfoLabel>Nama Pengguna</InfoLabel>
              <p className="mt-1.5 text-[11px] font-bold text-[#181B21]">{nama}</p>
              <p className="mt-0.5 text-[10px] text-[#666666]">{keterangan}</p>
            </div>
            <div>
              <InfoLabel>Tipe Pengguna</InfoLabel>
              <span className="mt-1.5 inline-block rounded border border-[#2E62EA]/60 bg-[#EEF3FE] px-2 py-0.5 text-[10px] font-medium text-[#2E62EA]">
                {data.tipe}
              </span>
            </div>
          </div>

          <div className="my-3 border-t border-[#E8E9ED]" />

          <div className="grid grid-cols-2 gap-4">
            <div>
              <InfoLabel>Nama Tes</InfoLabel>
              <p className="mt-1.5 text-[11px] font-bold text-[#181B21]">{namaTes}</p>
            </div>
            <div>
              <InfoLabel>Percobaan Status</InfoLabel>
              <p className="mt-1.5 flex items-center gap-2 text-[11px] font-bold text-[#181B21]">
                Percobaan {data.percobaan} dari {totalPercobaan}
                <span
                  className={`rounded border px-2 py-0.5 text-[9px] font-semibold ${
                    selesai
                      ? "border-emerald-600 bg-green-50 text-emerald-700"
                      : "border-[#2E62EA] bg-[#EEF3FE] text-[#2E62EA]"
                  }`}
                >
                  {data.status}
                </span>
              </p>
            </div>
          </div>
        </section>

        {/* Skor & kategori */}
        <section className="mt-4 rounded-lg border border-[#DCE6FD] bg-[#EEF3FE]/60 px-4 py-3">
          <div className="flex items-start justify-between">
            <div>
              <p className="text-[10px] font-semibold uppercase text-[#2E62EA]">Total Skor Tes</p>
              <p className="mt-1 text-[24px] font-bold leading-none text-[#2E62EA]">
                {data.skor ?? "-"}
                <span className="ml-1.5 text-[11px] font-normal text-[#666666]">/ 100</span>
              </p>
            </div>
            <div className="flex flex-col items-end gap-1.5">
              <p className="text-[10px] font-bold uppercase text-[#181B21]">Kategori Hasil</p>
              <span
                className={`rounded-full px-3 py-1 text-[10px] font-semibold ${
                  data.hasil ? "bg-[#2E62EA] text-white" : "bg-[#E8E9ED] text-[#666666]"
                }`}
              >
                {data.hasil ?? "Dalam Pengerjaan"}
              </span>
            </div>
          </div>

          <div className="my-3 border-t border-[#E8E9ED]" />

          <p className="text-[10px] font-bold uppercase text-[#181B21]">Deskripsi Hasil :</p>
          <p className="mt-1.5 text-[11px] font-medium leading-relaxed text-[#181B21]">
            &ldquo;{deskripsi}&rdquo;
          </p>
        </section>

        {/* Metadata */}
        <p className="mt-5 text-[11px] uppercase text-[#666666]">Metadata Pengerjaan</p>
        <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
          <MetaItem icon={CirclePlay} label="Waktu Mulai" value={tanggalPanjang(data.mulai)} />
          <MetaItem
            icon={CircleCheck}
            label="Waktu Selesai"
            value={selesai ? tanggalPanjang(data.selesai) : "-"}
          />
          <MetaItem icon={Timer} label="Durasi Pengerjaan" value={durasi} />
          <MetaItem icon={Smartphone} label="Platform Pengerjaan" value={platform} />
        </div>
      </div>
    </div>
  );
}

/* ============================ HALAMAN ============================ */

export default function ManagemenPsikotesPage() {
  const [cari, setCari] = useState("");
  const [terpilih, setTerpilih] = useState<Riwayat | null>(null);

  // Menu titik tiga di tabel daftar tes
  const [menu, setMenu] = useState<{ id: number; top: number; right: number } | null>(null);

  // Tutup menu kalau klik di luar, scroll, ukuran layar berubah, atau tekan Esc
  useEffect(() => {
    if (!menu) return;
    const tutup = () => setMenu(null);
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") tutup();
    };
    window.addEventListener("click", tutup);
    window.addEventListener("resize", tutup);
    window.addEventListener("scroll", tutup, true);
    window.addEventListener("keydown", onKey);
    return () => {
      window.removeEventListener("click", tutup);
      window.removeEventListener("resize", tutup);
      window.removeEventListener("scroll", tutup, true);
      window.removeEventListener("keydown", onKey);
    };
  }, [menu]);

  const menuTes = menu ? daftarTes.find((t) => t.id === menu.id) : undefined;

  const totalTes = daftarTes.length;
  const tesAktif = daftarTes.filter((t) => t.aktif).length;
  const tesNonaktif = totalTes - tesAktif;

  const riwayat = daftarRiwayat.filter((r) =>
    r.nama.toLowerCase().includes(cari.trim().toLowerCase())
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <style>{animasiCSS}</style>

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 pb-10 pt-4">
          {/* ===== Header halaman ===== */}
          <div className="anim-masuk flex items-start justify-between gap-6" style={tunda(0)}>
            <div>
              <h1 className="text-[28px] font-bold leading-tight text-[#181B21]">Managemen Psikotes</h1>
              <p className="mt-2 text-[13px] text-[#666666]">
                Kelola tes psikotes, soal, pilihan jawaban, dan aturan hasil tes.
              </p>
            </div>

            <Link
              href="/psikotes/tambah"
              className="mt-1 flex h-[44px] items-center gap-2.5 rounded-lg bg-[#2E62EA] px-6 text-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4276E8] hover:shadow-lg hover:shadow-[#2E62EA]/30 active:translate-y-0 active:scale-95"
            >
              <Plus className="h-[18px] w-[18px]" strokeWidth={2.25} />
              Tambah Psikotes
            </Link>
          </div>

          {/* ===== Kartu statistik ===== */}
          <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
            <StatCard
              label="Total Tes"
              value={totalTes}
              note="Tes psikotes terdaftar"
              dot="bg-[#2E62EA]"
              icon={Briefcase}
              iconClass="bg-[#DCE6FD] text-[#4276E8]"
              delay={100}
            />
            <StatCard
              label="Tes Aktif"
              value={tesAktif}
              note="Siap dikerjakan oleh siswa / alumni"
              dot="bg-green-500"
              icon={CircleCheck}
              iconClass="bg-green-50 text-green-600"
              delay={180}
            />
            <StatCard
              label="Tes Nonaktif"
              value={tesNonaktif}
              note="Draft / Diarsipkan"
              dot="bg-[#D9DBE1]"
              icon={Briefcase}
              iconClass="bg-[#F6F7F8] text-[#666666]"
              delay={260}
            />
          </div>

          {/* ===== Tabel daftar tes ===== */}
          <section
            style={tunda(350)}
            className="anim-masuk mt-6 overflow-hidden rounded-xl border border-[#E8E9ED] bg-white"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8E9ED]">
                  <th className={`${thClass} w-[26%]`}>Judul Tes</th>
                  <th className={thClass}>Durasi</th>
                  <th className={thClass}>Percobaan Gratis</th>
                  <th className={thClass}>Token / Percobaan</th>
                  <th className={thClass}>Status</th>
                  <th className={`${thClass} text-center`}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {daftarTes.map((t, i) => (
                  <tr
                    key={t.id}
                    style={tunda(550 + i * 80)}
                    className="anim-baris transition-colors hover:bg-[#EEF3FE]/70"
                  >
                    <td className="px-5 py-4">
                      <Link
                        href={`/psikotes/${t.id}`}
                        className="text-[13px] font-bold text-[#181B21] transition-colors hover:text-[#2E62EA]"
                      >
                        {t.judul}
                      </Link>
                      <p className="mt-1 text-[11px] text-[#666666]">
                        {t.jumlahSoal} Soal • {t.skoring}
                      </p>
                    </td>
                    <td className="px-5 py-4">
                      <span className="flex items-center gap-2 text-[12px] font-semibold uppercase text-[#181B21]">
                        <Clock className="h-4 w-4 text-[#666666]" strokeWidth={1.75} />
                        {t.durasi} Menit
                      </span>
                    </td>
                    <td className="px-5 py-4 text-[12px] font-semibold uppercase text-[#181B21]">
                      {t.percobaanGratis} Percobaan
                    </td>
                    <td className="px-5 py-4 text-[12px] font-semibold uppercase text-[#181B21]">
                      {t.token} Token
                    </td>
                    <td className="px-5 py-4">
                      <StatusBadge aktif={t.aktif} />
                    </td>
                    <td className="px-5 py-4 text-center">
                      <button
                        aria-label={`Aksi untuk ${t.judul}`}
                        aria-haspopup="menu"
                        aria-expanded={menu?.id === t.id}
                        onClick={(e) => {
                          e.stopPropagation();
                          const r = e.currentTarget.getBoundingClientRect();
                          setMenu(
                            menu?.id === t.id
                              ? null
                              : { id: t.id, top: r.bottom + 4, right: window.innerWidth - r.right }
                          );
                        }}
                        className={`inline-flex h-8 w-8 items-center justify-center rounded-md transition-all duration-200 hover:bg-[#DCE6FD] hover:text-[#2E62EA] active:scale-90 ${
                          menu?.id === t.id ? "bg-[#DCE6FD] text-[#2E62EA]" : "text-[#181B21]"
                        }`}
                      >
                        <EllipsisVertical className="h-5 w-5" strokeWidth={2} />
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>

            <div className="flex items-center justify-between border-t border-[#E8E9ED] px-4 py-3">
              <p className="text-[13px] font-semibold text-[#181B21]">
                Menampilkan {daftarTes.length} Tes dari {totalTes} Tes Psikotes
              </p>
              <div className="flex items-center gap-2">
                <button className="flex h-9 items-center gap-2 rounded-md border border-[#E8E9ED] bg-white px-4 text-[12px] text-[#181B21] transition-colors hover:bg-[#EEF3FE]">
                  <ArrowLeft className="h-3.5 w-3.5" strokeWidth={2} />
                  Previous
                </button>
                <button className="flex h-9 w-9 items-center justify-center rounded-md bg-[#2E62EA] text-[12px] font-semibold text-white">
                  1
                </button>
                <button className="flex h-9 items-center gap-2 rounded-md border border-[#E8E9ED] bg-white px-4 text-[12px] text-[#181B21] transition-colors hover:bg-[#EEF3FE]">
                  Next
                  <ArrowRight className="h-3.5 w-3.5" strokeWidth={2} />
                </button>
              </div>
            </div>
          </section>

          {/* ===== Riwayat pengerjaan tes ===== */}
          <div
            style={tunda(600)}
            className="anim-masuk mt-8 flex items-end justify-between gap-6"
          >
            <div>
              <h2 className="text-[24px] font-bold leading-tight text-[#181B21]">Riwayat Pengerjaan tes</h2>
              <p className="mt-1.5 text-[12px] text-[#666666]">
                Audit riwayat pengerjaan tes yang tersimpan secara terpusat di sistem BKK.
              </p>
            </div>

            <div className="relative w-[300px]">
              <Search className="absolute left-3.5 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
              <input
                type="text"
                value={cari}
                onChange={(e) => setCari(e.target.value)}
                placeholder="Cari Nama Pengguna"
                className="h-[44px] w-full rounded-lg border border-[#E8E9ED] bg-white pl-10 pr-4 text-[13px] text-[#181B21] placeholder:text-[#666666] focus:border-[#2E62EA] focus:outline-none focus:ring-2 focus:ring-[#DCE6FD]"
              />
            </div>
          </div>

          <section
            style={tunda(680)}
            className="anim-masuk mt-4 overflow-hidden rounded-xl border border-[#E8E9ED] bg-white"
          >
            <table className="w-full">
              <thead>
                <tr className="border-b border-[#E8E9ED]">
                  <th className={`${thClass} px-4 text-[10px]`}>Nama Pengguna</th>
                  <th className={`${thClass} px-3 text-[10px]`}>Tipe</th>
                  <th className={`${thClass} px-3 text-[10px]`}>Percobaan Ke -</th>
                  <th className={`${thClass} px-3 text-[10px]`}>Status</th>
                  <th className={`${thClass} px-3 text-[10px]`}>Total Skor</th>
                  <th className={`${thClass} px-3 text-[10px]`}>Hasil</th>
                  <th className={`${thClass} px-3 text-[10px]`}>Waktu Mulai</th>
                  <th className={`${thClass} px-3 text-[10px]`}>Waktu Selesai</th>
                  <th className={`${thClass} px-3 text-[10px]`}>Aksi</th>
                </tr>
              </thead>
              <tbody>
                {riwayat.map((r, i) => {
                  const [tglMulai, jamMulai] = r.mulai.split(", ");
                  const [tglSelesai, jamSelesai] = r.selesai.split(", ");
                  return (
                    <tr
                      key={r.id}
                      style={tunda(850 + i * 80)}
                      className="anim-baris transition-colors hover:bg-[#EEF3FE]/70"
                    >
                      <td className="px-4 py-3.5 text-[12px] font-bold text-[#181B21]">{r.nama}</td>
                      <td className="px-3 py-3.5">
                        <span className="inline-block rounded bg-[#E8E9ED]/70 px-2.5 py-1 text-[11px] font-medium text-[#181B21]">
                          {r.tipe}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-[12px] text-[#181B21]">Percobaan {r.percobaan}</td>
                      <td className="px-3 py-3.5">
                        <span
                          className={`inline-block rounded border px-2.5 py-0.5 text-[11px] font-semibold ${
                            r.status === "Selesai"
                              ? "border-emerald-600 bg-green-50 text-emerald-700"
                              : "border-[#2E62EA] bg-[#EEF3FE] text-[#2E62EA]"
                          }`}
                        >
                          {r.status}
                        </span>
                      </td>
                      <td className="px-3 py-3.5 text-[12px] font-bold">
                        {r.skor !== null ? (
                          <span className="text-[#2E62EA]">Skor : {r.skor}</span>
                        ) : (
                          <span className="text-[#666666]">-</span>
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-[12px]">
                        {r.hasil ? (
                          <span className="text-[#181B21]">{r.hasil}</span>
                        ) : (
                          <span className="italic text-[#181B21]">
                            Dalam
                            <br />
                            Pengerjaan
                          </span>
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-[11px] leading-snug text-[#181B21]">
                        <p>{tglMulai},</p>
                        <p>{jamMulai}</p>
                      </td>
                      <td className="px-3 py-3.5 text-[11px] leading-snug text-[#181B21]">
                        <p>{tglSelesai},</p>
                        <p>{jamSelesai}</p>
                      </td>
                      <td className="px-3 py-3.5">
                        <button
                          onClick={() => setTerpilih(r)}
                          className="rounded-md px-2.5 py-1.5 text-[12px] font-bold text-[#2E62EA] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EEF3FE] active:translate-y-0 active:scale-95"
                        >
                          Lihat Hasil
                        </button>
                      </td>
                    </tr>
                  );
                })}

                {riwayat.length === 0 && (
                  <tr>
                    <td colSpan={9} className="px-6 py-12 text-center text-[13px] text-[#666666]">
                      Tidak ada riwayat untuk nama tersebut.
                    </td>
                  </tr>
                )}
              </tbody>
            </table>
          </section>
        </main>
      </div>

      {/* Menu titik tiga */}
      {menu && menuTes && (
        <div
          role="menu"
          style={{ top: menu.top, right: menu.right }}
          onClick={(e) => e.stopPropagation()}
          className="anim-overlay fixed z-40 w-48 rounded-xl border border-[#E8E9ED] bg-white p-1.5 shadow-lg"
        >
          <Link
            role="menuitem"
            href={`/psikotes/${menuTes.id}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-[#181B21] transition-colors hover:bg-[#EEF3FE] hover:text-[#2E62EA]"
          >
            <Eye className="h-4 w-4" /> Detail Tes
          </Link>
          <Link
            role="menuitem"
            href={`/psikotes/${menuTes.id}/edit`}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-[#181B21] transition-colors hover:bg-[#EEF3FE] hover:text-[#2E62EA]"
          >
            <Pencil className="h-4 w-4" /> Edit Tes
          </Link>
        </div>
      )}

      {terpilih && <DetailHasilModal data={terpilih} onClose={() => setTerpilih(null)} />}
    </div>
  );
}