"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
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
  Info,
  FileText,
  ClipboardList,
  ListChecks,
  History,
  SquarePen,
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
// Nanti ganti dengan data dari API backend berdasarkan id di URL.

const user = { nama: "Doni Subianto", inisial: "DN", role: "Super Admin" };

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

const tes = {
  judul: "Tes Kesiapan Kerja",
  deskripsi:
    "Evaluasi kesiapan kerja berdasarkan aspek sikap, kompetensi profesional, dan orientasi kerja.",
  aktif: true,
  percobaanGratis: 3,
  durasi: 120,
  totalSoal: 25,
  token: 3,
  dibuat: "12 Oktober 2026, 15:30 WIB",
  diperbarui: "12 Oktober 2026, 16:30 WIB",
  rentangSkoring: 4,
  totalPenyelesaian: 99,
  rataDurasi: 80,
};

const kategoriKelulusan = [
  { label: "Sangat siap", rentang: "Skor 85 - 100", warna: "bg-green-500" },
  { label: "Siap", rentang: "Skor 70 - 84", warna: "bg-[#2E62EA]" },
  { label: "Cukup siap", rentang: "Skor 55 - 69", warna: "bg-amber-500" },
  { label: "Perlu pembinaan", rentang: "Skor 0 - 54", warna: "bg-red-500" },
];

type OpsiSoal = { huruf: string; teks: string; skor: number };
type SoalTes = { id: number; teks: string; opsi: OpsiSoal[] };

const daftarSoal: SoalTes[] = Array.from({ length: 2 }, (_, i) => ({
  id: i + 1,
  teks: "Bagaimana Anda membagi prioritas kerja saat memiliki dua tugas tenggat waktu bersamaan dari pembimbing magang?",
  opsi: [
    { huruf: "A", teks: "Menilai dampak urgensi tiap tugas dan mengomunikasikan timeline penyelesaian realistis", skor: 4 },
    { huruf: "B", teks: "Menilai dampak urgensi tiap tugas dan mengomunikasikan timeline penyelesaian realistis", skor: 3 },
    { huruf: "C", teks: "Menilai dampak urgensi tiap tugas dan mengomunikasikan timeline penyelesaian realistis", skor: 2 },
    { huruf: "D", teks: "Menilai dampak urgensi tiap tugas dan mengomunikasikan timeline penyelesaian realistis", skor: 1 },
  ],
}));

// Warna badge skor: makin tinggi makin hijau, makin rendah makin merah
const warnaSkor: Record<number, string> = {
  4: "bg-green-100 text-green-700",
  3: "bg-[#EEF3FE] text-[#2E62EA]",
  2: "bg-yellow-50 text-yellow-500",
  1: "bg-red-100 text-red-500",
};

type TabKey = "info" | "soal" | "skor" | "riwayat";

const tabs: { key: TabKey; label: string; icon: LucideIcon }[] = [
  { key: "info", label: "Informasi Tes", icon: Info },
  { key: "soal", label: "Soal", icon: ClipboardList },
  { key: "skor", label: "Skor Jawaban", icon: ListChecks },
  { key: "riwayat", label: "Riwayat Hasil", icon: History },
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
            <NavItem key={m.label} {...m} active={m.label === "Tes Psikotes"} />
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

/* ============================ TAB: INFORMASI TES ============================ */

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="text-[12px] uppercase text-[#666666]">{label}</p>
      <div className="mt-1.5 text-[13px] font-bold text-[#181B21]">{children}</div>
    </div>
  );
}

function RingkasanItem({
  label,
  value,
  unit,
  note,
}: {
  label: string;
  value: number;
  unit?: string;
  note: string;
}) {
  return (
    <div className="flex items-center justify-between rounded-lg border border-[#E8E9ED] bg-[#EEF3FE]/60 px-3 py-3">
      <div className="leading-tight">
        <p className="text-[11px] uppercase text-[#666666]">{label}</p>
        <p className="mt-1.5 text-[18px] font-bold text-[#181B21]">
          {value}
          {unit && <span className="ml-1 text-[10px] font-normal text-[#666666]">{unit}</span>}
        </p>
        <p className="mt-1 text-[11px] text-[#666666]">{note}</p>
      </div>
      <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-[#DCE6FD] text-[#4276E8]">
        <SquarePen className="h-4 w-4" strokeWidth={1.75} />
      </span>
    </div>
  );
}

function TabInformasi() {
  return (
    <div className="grid grid-cols-1 items-start gap-6 xl:grid-cols-[1fr_370px]">
      {/* ===== Informasi Umum Tes ===== */}
      <section className="rounded-2xl border border-[#E8E9ED] bg-white px-4 py-5">
        <div className="flex items-center gap-3 px-1">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#DCE6FD] text-[#2E62EA]">
            <FileText className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <h2 className="text-[17px] font-bold text-[#181B21]">Informasi Umum Tes</h2>
        </div>

        <p className="mt-5 rounded-md bg-[#EEF3FE] px-4 py-3.5 text-[13px] text-[#666666]">
          {tes.deskripsi}
        </p>

        <p className="mt-4 flex items-center gap-3 rounded-md bg-[#EEF3FE] px-4 py-3 text-[13px] font-medium text-[#2E62EA]">
          <Info className="h-4 w-4 shrink-0" strokeWidth={1.75} />
          Tes ini dapat dikerjakan oleh siswa dan alumni melalui aplikasi TALENTA.
        </p>

        <div className="mt-6 grid grid-cols-1 gap-x-8 gap-y-6 px-1 sm:grid-cols-2">
          <Field label="Judul Tes">{tes.judul}</Field>
          <Field label="Status Tes">
            <span
              className={`inline-block rounded border px-2 py-0.5 text-[10px] font-semibold ${
                tes.aktif
                  ? "border-emerald-600 bg-green-50 text-emerald-700"
                  : "border-[#D9DBE1] bg-[#F6F7F8] text-[#666666]"
              }`}
            >
              {tes.aktif ? "Aktif" : "Nonaktif"}
            </span>
          </Field>

          <Field label="Percobaan Gratis">{tes.percobaanGratis} Kali kesempatan pengerjaan</Field>
          <Field label="Durasi Pengerjaan">{tes.durasi} MENIT</Field>

          <Field label="Total Soal Terdaftar">{tes.totalSoal} Soal Pilihan Ganda</Field>
          <Field label="Token per Percobaan">{tes.token} Token</Field>

          <Field label="Tanggal Dibuat">{tes.dibuat}</Field>
          <Field label="Terakhir Diperbarui">{tes.diperbarui}</Field>
        </div>
      </section>

      {/* ===== Ringkasan Konfigurasi ===== */}
      <aside className="rounded-2xl border border-[#E8E9ED] bg-white px-3 py-5">
        <h2 className="px-1 text-[15px] font-bold text-[#181B21]">Ringkasan Konfigurasi</h2>

        <div className="mt-3 space-y-3">
          <RingkasanItem label="Total Soal" value={tes.totalSoal} note="Butir soal berbobot" />
          <RingkasanItem label="Rentang Skoring" value={tes.rentangSkoring} note="Kategori kelulusan" />
          <RingkasanItem
            label="Total Penyelesaian"
            value={tes.totalPenyelesaian}
            note="Kali dikerjakan siswa / alumni"
          />
          <RingkasanItem
            label="Rata Rata Durasi"
            value={tes.rataDurasi}
            unit="Menit"
            note="Butir soal berbobot"
          />
        </div>

        <h3 className="mt-6 px-1 text-[15px] font-bold text-[#181B21]">
          {kategoriKelulusan.length} Kategori Kelulusan
        </h3>
        <ul className="mt-3 space-y-2">
          {kategoriKelulusan.map((k) => (
            <li
              key={k.label}
              className="flex items-center gap-3 rounded-md bg-[#EEF3FE]/70 px-3 py-2.5 text-[12px]"
            >
              <span className={`h-2 w-2 shrink-0 rounded-full ${k.warna}`} />
              <span className="flex-1 font-medium text-[#181B21]">{k.label}</span>
              <span className="text-[10px] text-[#666666]">{k.rentang}</span>
            </li>
          ))}
        </ul>
      </aside>
    </div>
  );
}

/* ============================ TAB: SOAL ============================ */

function TabSoal() {
  return (
    <div className="max-w-[880px] space-y-4">
      {/* Header daftar soal */}
      <section className="flex items-center justify-between rounded-xl border border-[#E8E9ED] bg-white px-4 py-3">
        <div className="flex items-center gap-3">
          <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#DCE6FD] text-[#2E62EA]">
            <ClipboardList className="h-4 w-4" strokeWidth={1.75} />
          </span>
          <h2 className="text-[17px] font-bold text-[#181B21]">Daftar Soal Terdaftar</h2>
        </div>

        <Link
          href="/psikotes/tambah"
          className="flex h-[38px] items-center gap-2 rounded-md bg-[#DCE6FD] px-5 text-[13px] font-semibold text-[#2E62EA] transition-colors hover:bg-[#c9d9fb]"
        >
          <Plus className="h-4 w-4" strokeWidth={2.25} />
          Tambah Soal
        </Link>
      </section>

      {/* Daftar soal */}
      {daftarSoal.map((s, i) => (
        <section key={s.id} className="rounded-xl border border-[#E8E9ED] bg-white px-3 py-3">
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center rounded bg-[#2E62EA] text-[13px] font-semibold text-white">
              {i + 1}
            </span>
            <p className="text-[14px] font-bold text-[#181B21]">{s.teks}</p>
          </div>

          <div className="mt-3 space-y-2.5">
            {s.opsi.map((o) => (
              <div key={o.huruf} className="flex items-center gap-3">
                <span className="flex h-8 w-8 shrink-0 items-center justify-center rounded-md bg-[#EEF3FE] text-[14px] font-semibold text-[#2E62EA]">
                  {o.huruf}
                </span>
                <p className="flex-1 rounded-md border border-[#D9DBE1] bg-white px-3 py-2 text-[12px] text-[#181B21]">
                  {o.teks}
                </p>
                <span
                  className={`w-[54px] shrink-0 rounded-md py-1 text-center text-[11px] font-semibold ${
                    warnaSkor[o.skor] ?? "bg-[#F6F7F8] text-[#666666]"
                  }`}
                >
                  Skor : {o.skor}
                </span>
              </div>
            ))}
          </div>
        </section>
      ))}

      {daftarSoal.length === 0 && (
        <div className="rounded-xl border border-[#E8E9ED] bg-white px-6 py-16 text-center text-[14px] text-[#666666]">
          Belum ada soal. Klik Tambah Soal untuk membuat soal pertama.
        </div>
      )}
    </div>
  );
}

/* ============================ TAB KOSONG (sementara) ============================ */

function TabKosong({ nama }: { nama: string }) {
  return (
    <div className="rounded-2xl border border-[#E8E9ED] bg-white px-6 py-16 text-center text-[14px] text-[#666666]">
      Halaman <b className="text-[#181B21]">{nama}</b> belum dibuat.
    </div>
  );
}

/* ============================ HALAMAN ============================ */

export default function DetailPsikotesPage() {
  const params = useParams<{ id: string }>();
  const [tab, setTab] = useState<TabKey>("info");

  // TODO: ambil data tes dari API pakai params.id
  void params;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-8">
          <h1 className="text-[28px] font-bold text-[#181B21]">Detail Tes Psikotes</h1>
          <p className="mt-2 text-[13px] text-[#666666]">
            Detail konfigurasi, parameter pelaksanaan, dan informasi umum tes psikotes.
          </p>

          {/* Tab */}
          <div className="mt-6 flex items-center gap-7">
            {tabs.map((t) => {
              const Icon = t.icon;
              const aktif = tab === t.key;
              return (
                <button
                  key={t.key}
                  onClick={() => setTab(t.key)}
                  className={`flex items-center gap-2 border-b-2 pb-2 text-[13px] font-semibold transition-colors ${
                    aktif
                      ? "border-[#2E62EA] text-[#2E62EA]"
                      : "border-transparent text-[#181B21] hover:text-[#2E62EA]"
                  }`}
                >
                  <Icon className="h-4 w-4" strokeWidth={1.75} />
                  {t.label}
                </button>
              );
            })}
          </div>

          <div className="mt-5 pb-6">
            {tab === "info" && <TabInformasi />}
            {tab === "soal" && <TabSoal />}
            {tab === "skor" && <TabKosong nama="Skor Jawaban" />}
            {tab === "riwayat" && <TabKosong nama="Riwayat Hasil" />}
          </div>
        </main>
      </div>
    </div>
  );
}