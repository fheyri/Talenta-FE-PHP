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
  ArrowUp,
  ArrowLeft,
  ArrowRight,
  CircleCheck,
  FileText,
  CalendarX,
  MoreVertical,
  Eye,
  Pencil,
  Archive,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/* ============================ ANIMASI ============================ */
/*
  anim-masuk  : elemen muncul dari bawah + fade saat halaman dibuka (bergantian)
  anim-baris  : baris tabel muncul satu per satu dari kiri
  anim-menu   : menu titik tiga membuka dari atas (scale + fade)
  kartu-hover : HANYA dipakai di 4 kartu statistik paling atas
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
@keyframes menu-buka {
  from { opacity: 0; transform: translateY(-6px) scale(0.95); }
  to   { opacity: 1; transform: translateY(0) scale(1); }
}

.anim-masuk { animation: masuk-naik 0.6s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.anim-baris { animation: masuk-kiri 0.5s cubic-bezier(0.22, 1, 0.36, 1) backwards; }
.anim-menu  { animation: menu-buka 0.2s cubic-bezier(0.22, 1, 0.36, 1); transform-origin: top right; }

.kartu-hover {
  transition: transform 0.3s ease, box-shadow 0.3s ease, border-color 0.3s ease;
}
.kartu-hover:hover {
  transform: translateY(-6px);
  border-color: rgba(46, 98, 234, 0.35);
  box-shadow: 0 14px 30px -12px rgba(46, 98, 234, 0.35);
}

@media (prefers-reduced-motion: reduce) {
  .anim-masuk, .anim-baris, .anim-menu { animation: none; }
  .kartu-hover:hover { transform: none; }
}
`;

const tunda = (ms: number) => ({ animationDelay: `${ms}ms` });

// Angka naik dari 0 ke target saat halaman dibuka
function useCountUp(target: number, durasi = 900, mulaiSetelah = 0) {
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
  value: number;
  icon: LucideIcon;
  trend?: string;
  badge?: string;
  note: string;
}[] = [
  { title: "TOTAL LOWONGAN", value: 50, icon: Briefcase, trend: "+12%", note: "48 Aktif saat ini" },
  { title: "LOWONGAN AKTIF", value: 48, icon: CircleCheck, badge: "Sedang tayang", note: "Tayang di portal siswa" },
  { title: "LOWONGAN DRAFT", value: 20, icon: FileText, note: "Draft belum terbit" },
  { title: "LOWONGAN EXPIRED", value: 28, icon: CalendarX, note: "Batas waktu sudah lewat" },
];

const posisiContoh = [
  "UI/UX Designer",
  "Graphic Designer & Content Creator",
  "Digital Marketing",
  "Social Media Specialist",
  "Frontend Developer",
  "Mobile App Developer ( Flutter )",
];

// 50 data dummy supaya pagination benar-benar jalan
const semuaLowongan = Array.from({ length: 50 }, (_, i) => ({
  id: i + 1,
  posisi: posisiContoh[i % posisiContoh.length],
  tipe: "Full-Time • SMK/D3",
  perusahaan: "PT Kreasi Digital",
  lokasi: "Jakarta Selatan",
  kategori: "Teknologi",
  deadline: "30 September 2026",
  status: "Aktif",
}));

const PER_PAGE = 10;

/* ============================ KOMPONEN KECIL ============================ */

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
          className={`rounded-md px-5 py-2 text-[15px] font-medium transition-all duration-200 active:scale-95 ${
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
            <NavItem key={m.label} {...m} active={m.label === "Lowongan"} />
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

/* ============================ KONTEN LOWONGAN ============================ */

// Kartu statistik: kartu yang bergerak saat di-hover + angkanya naik dari 0
function StatCard({ item, delay }: { item: (typeof stats)[number]; delay: number }) {
  const Icon = item.icon;
  const tag = item.trend ?? item.badge;
  const tampil = useCountUp(item.value, 900, delay + 200);

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
        <p className="text-[34px] font-bold leading-none tabular-nums text-[#181B21]">{tampil}</p>
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

function JobTable({ delay }: { delay: number }) {
  const [page, setPage] = useState(1);
  const [menu, setMenu] = useState<{ id: number; top: number; right: number } | null>(null);

  // Tutup menu kalau klik di luar, scroll, atau ukuran layar berubah
  useEffect(() => {
    if (!menu) return;
    const tutup = () => setMenu(null);
    window.addEventListener("click", tutup);
    window.addEventListener("resize", tutup);
    window.addEventListener("scroll", tutup, true);
    return () => {
      window.removeEventListener("click", tutup);
      window.removeEventListener("resize", tutup);
      window.removeEventListener("scroll", tutup, true);
    };
  }, [menu]);

  const totalPages = Math.ceil(semuaLowongan.length / PER_PAGE);
  const mulai = (page - 1) * PER_PAGE;
  const data = semuaLowongan.slice(mulai, mulai + PER_PAGE);
  const dari = mulai + 1;
  const sampai = Math.min(mulai + PER_PAGE, semuaLowongan.length);

  return (
    <section
      style={tunda(delay)}
      className="anim-masuk overflow-hidden rounded-2xl border border-[#E8E9ED] bg-white"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-[15px]">
          <thead className="border-b border-[#E8E9ED] bg-[#EEF3FE]/60">
            <tr className="text-[#181B21]">
              {["POSISI", "PERUSAHAAN", "LOKASI", "KATEGORI", "DEADLINE", "STATUS", "AKSI"].map((h) => (
                <th key={h} className={`px-6 py-5 font-bold ${h === "AKSI" ? "text-center" : ""}`}>
                  {h}
                </th>
              ))}
            </tr>
          </thead>

          {/* key berubah tiap pindah halaman, jadi baris muncul ulang dengan animasi */}
          <tbody key={page} className="divide-y divide-[#E8E9ED]">
            {data.map((j, i) => (
              <tr
                key={j.id}
                style={tunda(delay + 250 + i * 60)}
                className="anim-baris transition-colors hover:bg-[#EEF3FE]/70"
              >
                <td className="px-6 py-5">
                  <Link
                    href={`/lowongan/${j.id}`}
                    className="block max-w-[200px] font-bold leading-snug text-[#181B21] transition-colors hover:text-[#2E62EA] hover:underline"
                  >
                    {j.posisi}
                  </Link>
                  <p className="mt-1 text-sm text-[#666666]">{j.tipe}</p>
                </td>
                <td className="px-6 py-5 text-[#666666]">{j.perusahaan}</td>
                <td className="px-6 py-5 text-[#666666]">{j.lokasi}</td>
                <td className="px-6 py-5">
                  <span className="rounded-md bg-[#DCE6FD] px-3 py-1 text-sm font-medium text-[#2E62EA]">
                    {j.kategori}
                  </span>
                </td>
                <td className="px-6 py-5 text-[#666666]">{j.deadline}</td>
                <td className="px-6 py-5">
                  <span className="rounded-md border border-green-300 bg-green-50 px-3 py-1 text-sm font-medium text-green-700">
                    {j.status}
                  </span>
                </td>
                <td className="px-6 py-5 text-center">
                  <button
                    aria-label="Aksi"
                    onClick={(e) => {
                      e.stopPropagation();
                      const r = e.currentTarget.getBoundingClientRect();
                      setMenu(
                        menu?.id === j.id
                          ? null
                          : { id: j.id, top: r.bottom + 4, right: window.innerWidth - r.right }
                      );
                    }}
                    className="rounded-md p-1.5 text-[#181B21] transition-all duration-200 hover:bg-[#DCE6FD] hover:text-[#2E62EA] active:scale-90"
                  >
                    <MoreVertical className="h-5 w-5" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-[#E8E9ED] px-6 py-5">
        <p className="text-[15px] font-bold text-[#181B21]">
          Menampilkan {dari}-{sampai} dari {semuaLowongan.length} Lowongan
        </p>

        <div className="flex items-center gap-2 text-[15px]">
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
              className={`h-10 w-10 rounded-lg font-medium transition-all duration-200 active:scale-90 ${
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

      {/* Menu titik tiga */}
      {menu && (
        <div
          style={{ top: menu.top, right: menu.right }}
          onClick={(e) => e.stopPropagation()}
          className="anim-menu fixed z-50 w-52 rounded-xl border border-[#E8E9ED] bg-white p-1.5 shadow-lg"
        >
          <Link
            href={`/lowongan/${menu.id}`}
            className="flex items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-[#181B21] transition-colors hover:bg-[#EEF3FE] hover:text-[#2E62EA]"
          >
            <Eye className="h-4 w-4" /> Detail Lowongan
          </Link>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-[#181B21] transition-colors hover:bg-[#EEF3FE] hover:text-[#2E62EA]">
            <Pencil className="h-4 w-4" /> Edit Lowongan
          </button>
          <button className="flex w-full items-center gap-3 rounded-lg px-3 py-2.5 text-[14px] font-medium text-[#666666] transition-colors hover:bg-[#EEF3FE]">
            <Archive className="h-4 w-4" /> Arsipkan Lowongan
          </button>
        </div>
      )}
    </section>
  );
}

/* ============================ HALAMAN ============================ */

export default function LowonganPage() {
  const [periode, setPeriode] = useState("Bulan ini");

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <style>{animasiCSS}</style>

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-10">
          <div className="anim-masuk flex items-start justify-between" style={tunda(0)}>
            <div>
              <h1 className="text-[34px] font-bold text-[#181B21]">Lowongan</h1>
              <p className="mt-2 max-w-[560px] text-[15px] text-[#666666]">
                Kelola, terbitkan, dan pantau seluruh informasi lowongan kerja di Bursa Kerja Khusus SMK Negeri 1 Cibinong.
              </p>
            </div>
            <Segmented
              options={["Bulan ini", "Bulan lalu", "Tahun 2026"]}
              value={periode}
              onChange={setPeriode}
            />
          </div>

          <div className="mt-9 grid grid-cols-1 gap-6 md:grid-cols-2 xl:grid-cols-4">
            {stats.map((s, i) => (
              <StatCard key={s.title} item={s} delay={100 + i * 80} />
            ))}
          </div>

          <div className="mt-9 pb-4">
            <JobTable delay={450} />
          </div>
        </main>
      </div>
    </div>
  );
}