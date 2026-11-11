"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/navigation";
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
  FileText,
  ClipboardList,
  Trash2,
  Save,
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
// Nanti ganti dengan data dari API backend.

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

const HURUF = ["A", "B", "C", "D"];
const SKOR_AWAL = [4, 3, 2, 1];

type Opsi = { huruf: string; teks: string; skor: number };
type Soal = { id: number; teks: string; opsi: Opsi[] };

function soalKosong(id: number): Soal {
  return {
    id,
    teks: "",
    opsi: HURUF.map((h, i) => ({ huruf: h, teks: "", skor: SKOR_AWAL[i] })),
  };
}

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

/* ============================ KOMPONEN FORM ============================ */

const inputClass =
  "w-full rounded-lg border border-[#D9DBE1] bg-white px-3 text-[13px] text-[#181B21] placeholder:text-[#666666] focus:border-[#2E62EA] focus:outline-none focus:ring-2 focus:ring-[#DCE6FD]";

function Label({ children }: { children: React.ReactNode }) {
  return <label className="mb-2 block text-[13px] font-bold text-[#181B21]">{children}</label>;
}

function AngkaField({
  label,
  value,
  onChange,
  suffix,
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  suffix: string;
  hint: string;
}) {
  return (
    <div>
      <Label>{label}</Label>
      <div className="relative">
        <input
          type="number"
          min={0}
          value={value}
          onChange={(e) => onChange(Math.max(0, Number(e.target.value)))}
          className={`${inputClass} h-[42px] pr-16`}
        />
        <span className="pointer-events-none absolute right-4 top-1/2 -translate-y-1/2 text-[12px] text-[#666666]">
          {suffix}
        </span>
      </div>
      <p className="mt-2 text-[12px] text-[#666666]">{hint}</p>
    </div>
  );
}

function PilihStatus({
  selected,
  onSelect,
  title,
  badge,
  badgeClass,
  desc,
}: {
  selected: boolean;
  onSelect: () => void;
  title: string;
  badge: string;
  badgeClass: string;
  desc: string;
}) {
  return (
    <button
      type="button"
      onClick={onSelect}
      className={`flex min-w-[245px] items-start gap-3 rounded-md border px-3 py-3 text-left transition-colors ${
        selected ? "border-[#2E62EA] bg-[#EEF3FE]" : "border-transparent bg-[#EEEEEE]"
      }`}
    >
      <span
        className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
          selected ? "border-[#2E62EA]" : "border-[#C4C7CF] bg-white"
        }`}
      >
        {selected && <span className="h-2 w-2 rounded-full bg-[#2E62EA]" />}
      </span>
      <span className="leading-tight">
        <span className="flex items-center gap-2 text-[13px] font-medium text-[#181B21]">
          {title}
          <span className={`rounded border px-1.5 py-px text-[9px] font-bold ${badgeClass}`}>{badge}</span>
        </span>
        <span className="mt-1 block text-[12px] text-[#666666]">{desc}</span>
      </span>
    </button>
  );
}

function SoalCard({
  soal,
  nomor,
  bisaHapus,
  onUbahTeks,
  onUbahOpsi,
  onHapus,
}: {
  soal: Soal;
  nomor: number;
  bisaHapus: boolean;
  onUbahTeks: (v: string) => void;
  onUbahOpsi: (idx: number, field: "teks" | "skor", v: string | number) => void;
  onHapus: () => void;
}) {
  return (
    <section className="rounded-2xl border border-[#E8E9ED] bg-white px-5 py-5">
      <div className="flex items-start justify-between gap-4 border-b border-[#E8E9ED] pb-4">
        <div>
          <div className="flex items-center gap-3">
            <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#DCE6FD] text-[#2E62EA]">
              <ClipboardList className="h-4 w-4" strokeWidth={1.75} />
            </span>
            <h2 className="text-[17px] font-bold text-[#181B21]">Daftar Soal Psikotes</h2>
          </div>
          <p className="mt-2 text-[12px] text-[#666666]">
            Setiap opsi jawaban memiliki bobot skor masing-masing sesuai metodologi psikometri tanpa konsep
            benar/salah absolut.
          </p>
        </div>

        <button
          type="button"
          onClick={onHapus}
          disabled={!bisaHapus}
          className="flex shrink-0 items-center gap-2 text-[14px] text-[#666666] hover:text-red-600 disabled:cursor-not-allowed disabled:opacity-40 disabled:hover:text-[#666666]"
        >
          <Trash2 className="h-4 w-4" strokeWidth={1.75} />
          Hapus Soal
        </button>
      </div>

      <div className="mt-4 flex items-center gap-3">
        <span className="flex h-6 w-6 items-center justify-center rounded bg-[#2E62EA] text-[13px] font-semibold text-white">
          {nomor}
        </span>
        <p className="text-[15px] font-medium text-[#181B21]">Soal Psikotes</p>
      </div>

      <p className="mt-2 text-[12px] uppercase tracking-wide text-[#666666]">Teks pertanyaan</p>
      <textarea
        value={soal.teks}
        onChange={(e) => onUbahTeks(e.target.value)}
        placeholder="Tulis pertanyaan psikotes di sini ....."
        rows={3}
        className={`${inputClass} mt-2 resize-none py-3`}
      />

      <p className="mt-6 text-[12px] uppercase tracking-wide text-[#666666]">Pilihan ganda & bobot skor</p>
      <div className="mt-3 space-y-3">
        {soal.opsi.map((o, i) => (
          <div key={o.huruf} className="flex items-center gap-3">
            <span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-md bg-[#DCE6FD] text-[15px] font-bold text-[#2E62EA]">
              {o.huruf}
            </span>
            <input
              type="text"
              value={o.teks}
              onChange={(e) => onUbahOpsi(i, "teks", e.target.value)}
              placeholder={`Isi pilihan jawaban ${o.huruf}`}
              className={`${inputClass} h-9 flex-1`}
            />
            <span className="flex h-9 shrink-0 items-center rounded-md border border-[#D9DBE1] bg-white px-3 text-[12px] text-[#181B21]">
              Skor :
            </span>
            <input
              type="number"
              min={0}
              value={o.skor}
              onChange={(e) => onUbahOpsi(i, "skor", Math.max(0, Number(e.target.value)))}
              aria-label={`Skor pilihan ${o.huruf}`}
              className="h-9 w-14 shrink-0 rounded-md bg-[#EEF3FE] text-center text-[14px] text-[#181B21] focus:outline-none focus:ring-2 focus:ring-[#DCE6FD]"
            />
          </div>
        ))}
      </div>
    </section>
  );
}

/* ============================ HALAMAN ============================ */

export default function TambahSoalPsikotesPage() {
  const router = useRouter();

  // Informasi tes
  const [judul, setJudul] = useState("");
  const [deskripsi, setDeskripsi] = useState("");
  const [durasi, setDurasi] = useState(120);
  const [percobaan, setPercobaan] = useState(3);
  const [token, setToken] = useState(3);
  const [aktif, setAktif] = useState(true);

  // Daftar soal
  const [soal, setSoal] = useState<Soal[]>([soalKosong(1)]);
  const [nextId, setNextId] = useState(2);
  const [error, setError] = useState("");

  function tambahSoal() {
    setSoal((prev) => [...prev, soalKosong(nextId)]);
    setNextId((n) => n + 1);
  }

  function hapusSoal(id: number) {
    setSoal((prev) => (prev.length > 1 ? prev.filter((s) => s.id !== id) : prev));
  }

  function ubahTeks(id: number, teks: string) {
    setSoal((prev) => prev.map((s) => (s.id === id ? { ...s, teks } : s)));
  }

  function ubahOpsi(id: number, idx: number, field: "teks" | "skor", v: string | number) {
    setSoal((prev) =>
      prev.map((s) =>
        s.id === id
          ? { ...s, opsi: s.opsi.map((o, i) => (i === idx ? { ...o, [field]: v } : o)) }
          : s
      )
    );
  }

  function simpan() {
    if (!judul.trim()) return setError("Judul tes wajib diisi.");
    if (soal.some((s) => !s.teks.trim())) return setError("Teks pertanyaan pada semua soal wajib diisi.");
    if (soal.some((s) => s.opsi.some((o) => !o.teks.trim())))
      return setError("Semua pilihan jawaban (A–D) wajib diisi.");

    setError("");
    const payload = { judul, deskripsi, durasi, percobaan, token, aktif, soal };
    console.log("Simpan psikotes:", payload); // TODO: kirim ke API backend
    router.push("/psikotes");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-8">
          <h1 className="text-[28px] font-bold text-[#181B21]">Tambah Soal Psikotes</h1>
          <p className="mt-2 text-[13px] text-[#666666]">
            Lengkapi informasi tes dan tambahkan soal psikotes sebelum menyimpannya.
          </p>

          <div className="mt-6 space-y-6">
            {/* ===== Informasi Tes ===== */}
            <section className="rounded-2xl border border-[#E8E9ED] bg-white px-4 py-5">
              <div className="flex items-center gap-3">
                <span className="flex h-7 w-7 items-center justify-center rounded-md bg-[#DCE6FD] text-[#2E62EA]">
                  <FileText className="h-4 w-4" strokeWidth={1.75} />
                </span>
                <h2 className="text-[17px] font-bold text-[#181B21]">Informasi Tes</h2>
              </div>

              <div className="mt-6">
                <Label>JUDUL TES</Label>
                <input
                  type="text"
                  value={judul}
                  onChange={(e) => setJudul(e.target.value)}
                  placeholder="contoh : Tes Psikotes"
                  className={`${inputClass} h-[38px]`}
                />
              </div>

              <div className="mt-5">
                <Label>DESKRIPSI</Label>
                <textarea
                  value={deskripsi}
                  onChange={(e) => setDeskripsi(e.target.value)}
                  placeholder="Deskripsi"
                  rows={4}
                  className={`${inputClass} resize-none py-3`}
                />
              </div>

              <div className="mt-5 grid grid-cols-1 gap-6 md:grid-cols-3">
                <AngkaField
                  label="DURASI TES"
                  value={durasi}
                  onChange={setDurasi}
                  suffix="Menit"
                  hint="Waktu Hitung Mundur Keseluruhan"
                />
                <AngkaField
                  label="JUMLAH PERCOBAAN GRATIS"
                  value={percobaan}
                  onChange={setPercobaan}
                  suffix="Kali"
                  hint="Batas percobaan siswa"
                />
                <AngkaField
                  label="TOKEN PER PERCOBAAN"
                  value={token}
                  onChange={setToken}
                  suffix="Token"
                  hint="Token yang dibutuhkan untuk uji coba"
                />
              </div>

              <div className="mt-6">
                <Label>STATUS PUBLIKASI TES</Label>
                <div className="flex flex-wrap gap-6">
                  <PilihStatus
                    selected={aktif}
                    onSelect={() => setAktif(true)}
                    title="Aktif"
                    badge="Aktif"
                    badgeClass="border-emerald-600 bg-green-50 text-emerald-700"
                    desc="Langsung Publikasi ke Siswa"
                  />
                  <PilihStatus
                    selected={!aktif}
                    onSelect={() => setAktif(false)}
                    title="Nonaktif"
                    badge="Draft"
                    badgeClass="border-transparent bg-[#D9DBE1] text-[#666666]"
                    desc="Disimpan sebagai draft sistem"
                  />
                </div>
              </div>
            </section>

            {/* ===== Daftar Soal ===== */}
            {soal.map((s, i) => (
              <SoalCard
                key={s.id}
                soal={s}
                nomor={i + 1}
                bisaHapus={soal.length > 1}
                onUbahTeks={(v) => ubahTeks(s.id, v)}
                onUbahOpsi={(idx, field, v) => ubahOpsi(s.id, idx, field, v)}
                onHapus={() => hapusSoal(s.id)}
              />
            ))}

            <button
              type="button"
              onClick={tambahSoal}
              className="flex h-[52px] w-full items-center justify-center gap-3 rounded-lg border border-[#2E62EA] bg-[#EEF3FE] text-[14px] font-semibold text-[#2E62EA] transition-colors hover:bg-[#DCE6FD]"
            >
              <Plus className="h-4 w-4" strokeWidth={2.5} />
              Tambah Soal Baru
            </button>

            {/* ===== Aksi ===== */}
            {error && (
              <p className="rounded-lg border border-red-200 bg-red-50 px-4 py-3 text-[13px] text-red-600">
                {error}
              </p>
            )}

            <div className="flex items-center justify-end gap-3 pb-4">
              <Link
                href="/psikotes"
                className="flex h-[42px] items-center rounded-md border border-[#D9DBE1] bg-white px-9 text-[14px] font-medium text-[#181B21] hover:bg-[#EEF3FE]"
              >
                Batal
              </Link>
              <button
                type="button"
                onClick={simpan}
                className="flex h-[42px] items-center gap-3 rounded-md bg-[#2E62EA] px-6 text-[14px] font-semibold text-white transition-colors hover:bg-[#4276E8]"
              >
                <Save className="h-4 w-4" strokeWidth={1.75} />
                Simpan Soal & Informasi
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}