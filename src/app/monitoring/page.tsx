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
  ArrowLeft,
  ArrowRight,
  ChevronDown,
  School,
  Store,
  LayoutList,
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

/* ============================ ANIMASI ============================ */
/*
  anim-masuk  : elemen muncul dari bawah + fade saat halaman dibuka (bergantian)
  anim-baris  : baris tabel muncul satu per satu dari kiri
  kartu-hover : HANYA dipakai di 5 kartu statistik paling atas
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

.anim-masuk { animation: masuk-naik 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.anim-baris { animation: masuk-kiri 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards; }

.kartu-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.kartu-hover:hover {
  transform: translateY(-6px);
  border-color: rgba(46, 98, 234, 0.35);
  box-shadow: 0 14px 30px -12px rgba(46, 98, 234, 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .anim-masuk, .anim-baris { animation: none; }
  .kartu-hover:hover { transform: none; }
}
`;

const tunda = (ms: number) => ({ animationDelay: `${ms}ms` });

// Angka naik dari 0 ke target saat halaman dibuka
function useCountUp(target: number, durasi = 1000, mulaiSetelah = 0) {
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

const user = { nama: "Fachry Achmad", inisial: "FH", role: "Super Admin" };

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

type StatusKarier = "Bekerja" | "Kuliah" | "Wirausaha" | "Lainnya";

const stats: {
  title: string;
  value: number;
  note: string;
  icon: LucideIcon;
  iconClass: string;
}[] = [
  { title: "TOTAL ALUMNI", value: 2400, note: "Terdaftar di sistem", icon: GraduationCap, iconClass: "bg-[#EEF3FE] text-[#2E62EA]" },
  { title: "BEKERJA", value: 1400, note: "Alumni Bekerja", icon: Briefcase, iconClass: "bg-emerald-50 text-emerald-600" },
  { title: "PENDIDIKAN", value: 890, note: "Melanjutkan Studi", icon: School, iconClass: "bg-blue-50 text-blue-600" },
  { title: "WIRAUSAHA", value: 500, note: "Merintis Usaha", icon: Store, iconClass: "bg-purple-50 text-purple-600" },
  { title: "LAINNYA", value: 100, note: "Mencari kerja / lainnya", icon: LayoutList, iconClass: "bg-amber-50 text-amber-500" },
];

const badgeClass: Record<StatusKarier, string> = {
  Bekerja: "border-green-300 bg-green-50 text-green-700",
  Kuliah: "border-blue-400 bg-blue-50 text-blue-700",
  Wirausaha: "border-purple-400 bg-purple-50 text-purple-700",
  Lainnya: "border-amber-400 bg-amber-50 text-amber-700",
};

const namaContoh = [
  "Arvin Hadiyyatullah",
  "El Razqa Chaeruzzaman",
  "Fachry Achmad",
  "Jilan Indah Aprilianti",
  "Tiara Ahmadita",
  "Talita Vicki Sakhi",
  "Khalila Zira Adzkia",
];
const statusContoh: StatusKarier[] = ["Bekerja", "Kuliah", "Wirausaha", "Lainnya", "Bekerja", "Bekerja", "Bekerja"];
const angkatanContoh = [2027, 2027, 2026, 2025];
const jurusanContoh = [
  "Sistem Informasi Jaringan & Aplikasi ( SIJA )",
  "Sistem Informasi Jaringan & Aplikasi ( SIJA )",
  "Sistem Informasi Jaringan & Aplikasi ( SIJA )",
  "Rekayasa Perangkat Lunak ( RPL )",
];

// 50 data dummy supaya pagination dan filter benar-benar jalan
const semuaAlumni = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  nama: namaContoh[i % namaContoh.length],
  email: `${namaContoh[i % namaContoh.length].split(" ")[0].toLowerCase()}@gmail.com`,
  angkatan: angkatanContoh[i % angkatanContoh.length],
  jurusan: jurusanContoh[i % jurusanContoh.length],
  status: statusContoh[i % statusContoh.length],
  akun: "Aktif",
}));

const daftarAngkatan = Array.from(new Set(semuaAlumni.map((a) => a.angkatan))).sort((a, b) => b - a);
const daftarJurusan = Array.from(new Set(semuaAlumni.map((a) => a.jurusan)));

const PER_PAGE = 10;

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

/* ============================ KOMPONEN HALAMAN ============================ */

function Select({
  value,
  onChange,
  children,
}: {
  value: string;
  onChange: (v: string) => void;
  children: React.ReactNode;
}) {
  return (
    <div className="relative">
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="h-[46px] w-[190px] appearance-none rounded-lg border border-[#E8E9ED] bg-white pl-4 pr-10 text-[14px] font-medium text-[#181B21] transition-shadow focus:border-[#2E62EA] focus:outline-none focus:ring-2 focus:ring-[#DCE6FD]"
      >
        {children}
      </select>
      <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
    </div>
  );
}

// Kartu statistik: kartu yang bergerak saat di-hover + angkanya naik dari 0
function StatCard({
  item,
  delay,
}: {
  item: (typeof stats)[number];
  delay: number;
}) {
  const Icon = item.icon;
  const tampil = useCountUp(item.value, 1000, delay + 200);

  return (
    <div
      style={tunda(delay)}
      className="anim-masuk kartu-hover group rounded-2xl border border-[#E8E9ED] bg-white px-5 py-4 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[#666666]">{item.title}</p>
        <span
          className={`flex h-8 w-8 items-center justify-center rounded-lg transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6 ${item.iconClass}`}
        >
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-3 text-[30px] font-bold leading-none tabular-nums text-[#181B21]">
        {tampil.toLocaleString("id-ID")}
      </p>
      <p className="mt-3 flex items-center gap-2 text-[13px] text-[#666666]">
        <span className="h-1.5 w-1.5 rounded-full bg-[#2E62EA]" />
        {item.note}
      </p>
    </div>
  );
}

function AlumniTable({
  angkatan,
  jurusan,
  delay,
}: {
  angkatan: string;
  jurusan: string;
  delay: number;
}) {
  const [page, setPage] = useState(1);

  // Balik ke halaman 1 setiap filter berubah
  useEffect(() => {
    setPage(1);
  }, [angkatan, jurusan]);

  const hasil = semuaAlumni.filter(
    (a) =>
      (angkatan === "semua" || String(a.angkatan) === angkatan) &&
      (jurusan === "semua" || a.jurusan === jurusan)
  );

  const totalPages = Math.max(1, Math.ceil(hasil.length / PER_PAGE));
  const mulai = (page - 1) * PER_PAGE;
  const data = hasil.slice(mulai, mulai + PER_PAGE);
  const dari = hasil.length === 0 ? 0 : mulai + 1;
  const sampai = Math.min(mulai + PER_PAGE, hasil.length);

  // Berubah kalau halaman / filter berubah, sehingga baris muncul ulang dengan animasi
  const kunciBaris = `${page}-${angkatan}-${jurusan}`;

  return (
    <section
      style={tunda(delay)}
      className="anim-masuk overflow-hidden rounded-2xl border border-[#E8E9ED] bg-white"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[960px] text-left text-[14px]">
          <thead className="border-b border-[#E8E9ED] bg-[#EEF3FE]/60">
            <tr className="text-[#181B21]">
              <th className="px-6 py-5 font-bold">ALUMNI</th>
              <th className="px-3 py-5 font-bold">ANGKATAN</th>
              <th className="px-3 py-5 font-bold">JURUSAN</th>
              <th className="px-3 py-5 font-bold">STATUS KARIER</th>
              <th className="px-3 py-5 font-bold">STATUS AKUN</th>
              <th className="px-6 py-5 text-center font-bold">AKSI</th>
            </tr>
          </thead>
          <tbody key={kunciBaris} className="divide-y divide-[#E8E9ED]">
            {data.map((a, i) => (
              <tr
                key={a.id}
                style={tunda(delay + 250 + i * 70)}
                className="anim-baris transition-colors hover:bg-[#EEF3FE]/70"
              >
                <td className="px-6 py-4">
                  <div className="flex items-center gap-4">
                    <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCE6FD] text-[#4276E8]">
                      <ImageIcon className="h-5 w-5" strokeWidth={1.75} />
                    </span>
                    <div className="leading-snug">
                      <p className="font-bold text-[#181B21]">{a.nama}</p>
                      <p className="text-[13px] text-[#666666]">{a.email}</p>
                    </div>
                  </div>
                </td>
                <td className="px-3 py-4 text-[#666666]">{a.angkatan}</td>
                <td className="px-3 py-4 text-[#666666]">
                  <p className="max-w-[200px] leading-snug">{a.jurusan}</p>
                </td>
                <td className="px-3 py-4">
                  <span className={`rounded-md border px-3 py-1 text-[12px] font-semibold ${badgeClass[a.status]}`}>
                    {a.status}
                  </span>
                </td>
                <td className="px-3 py-4">
                  <span className="rounded-md border border-green-300 bg-green-50 px-3 py-1 text-[12px] font-semibold text-green-700">
                    {a.akun}
                  </span>
                </td>
                <td className="px-6 py-4 text-center">
                  <Link
                    href={`/monitoring/${a.id}`}
                    className="inline-block rounded-md px-3 py-1.5 text-[13px] font-bold text-[#2E62EA] transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#EEF3FE] active:translate-y-0 active:scale-95"
                  >
                    Lihat Detail
                  </Link>
                </td>
              </tr>
            ))}

            {data.length === 0 && (
              <tr>
                <td colSpan={6} className="px-6 py-16 text-center text-[#666666]">
                  Tidak ada alumni yang cocok dengan filter ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-[#E8E9ED] px-6 py-5">
        <p className="text-[14px] font-bold text-[#181B21]">
          Menampilkan {dari}-{sampai} dari {hasil.length} Alumni
        </p>

        <div className="flex items-center gap-2 text-[14px]">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={page === 1}
            className="flex items-center gap-2 rounded-lg border border-[#E8E9ED] px-4 py-2.5 text-[#181B21] transition-colors hover:bg-[#EEF3FE] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-10 w-10 rounded-lg font-medium transition-colors ${
                p === page
                  ? "bg-[#2E62EA] text-white"
                  : "border border-[#E8E9ED] text-[#181B21] hover:bg-[#EEF3FE]"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={page === totalPages}
            className="flex items-center gap-2 rounded-lg border border-[#E8E9ED] px-4 py-2.5 text-[#181B21] transition-colors hover:bg-[#EEF3FE] disabled:cursor-not-allowed disabled:opacity-40"
          >
            Next <ArrowRight className="h-4 w-4" />
          </button>
        </div>
      </div>
    </section>
  );
}

/* ============================ HALAMAN ============================ */

export default function MonitoringKarierPage() {
  const [angkatan, setAngkatan] = useState("semua");
  const [jurusan, setJurusan] = useState("semua");

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <style>{animasiCSS}</style>

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-8">
          <div className="anim-masuk flex items-start justify-between gap-6" style={tunda(0)}>
            <div>
              <h1 className="text-[32px] font-bold text-[#181B21]">Monitoring Karier</h1>
              <p className="mt-2 text-[14px] text-[#666666]">
                Kelola dan pantau data alumni serta perkembangan status karier lulusan.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Select value={angkatan} onChange={setAngkatan}>
                <option value="semua">Semua Angkatan</option>
                {daftarAngkatan.map((a) => (
                  <option key={a} value={String(a)}>
                    Angkatan {a}
                  </option>
                ))}
              </Select>
              <Select value={jurusan} onChange={setJurusan}>
                <option value="semua">Semua Jurusan</option>
                {daftarJurusan.map((j) => (
                  <option key={j} value={j}>
                    {j}
                  </option>
                ))}
              </Select>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            {stats.map((s, i) => (
              <StatCard key={s.title} item={s} delay={100 + i * 80} />
            ))}
          </div>

          <div className="mt-7 pb-4">
            <AlumniTable angkatan={angkatan} jurusan={jurusan} delay={500} />
          </div>
        </main>
      </div>
    </div>
  );
}