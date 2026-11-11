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
  ChevronDown,
  ShieldCheck,
  Pencil,
  ArrowLeft,
  ArrowRight,
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

/*
  STRUKTUR FOLDER
  src/app/admin/
  ├── page.tsx            ← halaman ini (daftar admin)
  ├── tambah/page.tsx
  └── [id]/
      ├── page.tsx        ← detail admin  (/admin/1)
      └── edit/page.tsx   ← edit admin    (/admin/1/edit)
*/

/* ============================ ANIMASI ============================ */
/*
  anim-masuk  : elemen muncul dari bawah + fade saat halaman dibuka (bergantian)
  anim-baris  : baris tabel muncul satu per satu dari kiri
  kartu-hover : HANYA dipakai di 2 kartu statistik paling atas
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

type Admin = {
  id: number;
  nama: string;
  email: string;
  role: "Super Admin" | "Admin";
  aktif: boolean;
  dibuat: string;
};

const dataAwal: Admin[] = [
  { id: 1, nama: "El Razqa Chaeruzzaman", email: "elrazqa@gmail.com", role: "Super Admin", aktif: true, dibuat: "07 Oktober 2026, 17:24 WIB" },
  { id: 2, nama: "Arvin Hadiyyatullah", email: "arvin@gmail.com", role: "Admin", aktif: true, dibuat: "08 Oktober 2026, 09:37 WIB" },
  { id: 3, nama: "Fachry Achmad", email: "fachry@gmail.com", role: "Admin", aktif: true, dibuat: "08 Oktober 2026, 09:37 WIB" },
  { id: 4, nama: "Rehannur Rizqi", email: "rehan@gmail.com", role: "Admin", aktif: false, dibuat: "08 Oktober 2026, 09:37 WIB" },
];

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
            <NavItem key={m.label} {...m} active={false} />
          ))}
        </div>
        <p className="mb-3 mt-6 px-5 text-[15px] text-[#666666]">System</p>
        <div className="space-y-1">
          {systemMenu.map((m) => (
            <NavItem key={m.label} {...m} active={m.label === "Manajemen Admin"} />
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

// Kartu statistik: kartu yang bergerak saat di-hover + angkanya naik dari 0
function StatCard({
  title,
  value,
  note,
  delay,
}: {
  title: string;
  value: number;
  note: string;
  delay: number;
}) {
  const tampil = useCountUp(value, 900, delay + 200);

  return (
    <div
      style={tunda(delay)}
      className="anim-masuk kartu-hover group rounded-2xl border border-[#E8E9ED] bg-white px-6 py-5 shadow-sm"
    >
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[#666666]">{title}</p>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF3FE] text-[#4276E8] transition-transform duration-300 group-hover:scale-110 group-hover:rotate-6">
          <ShieldCheck className="h-4 w-4" strokeWidth={1.75} />
        </span>
      </div>
      <div className="mt-6 flex items-baseline gap-3">
        <p className="text-[34px] font-bold leading-none tabular-nums text-[#181B21]">
          {String(tampil).padStart(2, "0")}
        </p>
        <p className="text-[13px] text-[#666666]">{note}</p>
      </div>
    </div>
  );
}

function AdminTable({
  admins,
  onToggle,
  delay,
}: {
  admins: Admin[];
  onToggle: (id: number) => void;
  delay: number;
}) {
  const [page, setPage] = useState(1);

  const totalPages = Math.max(1, Math.ceil(admins.length / PER_PAGE));
  const halaman = Math.min(page, totalPages);
  const mulai = (halaman - 1) * PER_PAGE;
  const data = admins.slice(mulai, mulai + PER_PAGE);

  // Berubah kalau halaman / daftar admin berubah, sehingga baris muncul ulang dengan animasi
  const kunciBaris = `${halaman}-${data.map((d) => d.id).join(",")}`;

  return (
    <section
      style={tunda(delay)}
      className="anim-masuk overflow-hidden rounded-2xl border border-[#E8E9ED] bg-white"
    >
      <div className="overflow-x-auto">
        <table className="w-full min-w-[900px] text-left text-[14px]">
          <thead className="border-b border-[#E8E9ED] bg-[#EEF3FE]/60">
            <tr className="text-[#181B21]">
              <th className="px-6 py-5 font-bold">NAMA</th>
              <th className="px-3 py-5 font-bold">EMAIL</th>
              <th className="px-3 py-5 font-bold">STATUS</th>
              <th className="px-3 py-5 font-bold">TANGGAL DIBUAT</th>
              <th className="px-6 py-5 text-right font-bold">AKSI</th>
            </tr>
          </thead>
          <tbody key={kunciBaris} className="divide-y divide-[#E8E9ED]">
            {data.map((a, i) => {
              const superAdmin = a.role === "Super Admin";
              return (
                <tr
                  key={a.id}
                  style={tunda(delay + 250 + i * 90)}
                  className="anim-baris transition-colors hover:bg-[#EEF3FE]/70"
                >
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-4">
                      <span className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#DCE6FD] text-[#4276E8]">
                        <ImageIcon className="h-5 w-5" strokeWidth={1.75} />
                      </span>
                      <p className="font-bold text-[#181B21]">{a.nama}</p>
                      <span
                        className={`rounded-md border px-3 py-1 text-[12px] font-semibold ${
                          superAdmin
                            ? "border-[#2E62EA] bg-white text-[#2E62EA]"
                            : "border-[#DCE6FD] bg-[#EEF3FE] text-[#666666]"
                        }`}
                      >
                        {a.role}
                      </span>
                    </div>
                  </td>
                  <td className="px-3 py-4 text-[#666666]">{a.email}</td>
                  <td className="px-3 py-4">
                    <span
                      className={`rounded-md border px-3 py-1 text-[12px] font-semibold transition-colors duration-300 ${
                        a.aktif
                          ? "border-green-300 bg-green-50 text-green-700"
                          : "border-[#D9DBE1] bg-[#F6F7F8] text-[#666666]"
                      }`}
                    >
                      {a.aktif ? "Aktif" : "Nonaktif"}
                    </span>
                  </td>
                  <td className="px-3 py-4 text-[#666666]">{a.dibuat}</td>
                  <td className="px-6 py-4">
                    <div className="flex items-center justify-end gap-3">
                      <Link
                        href={`/admin/${a.id}/edit`}
                        className="flex h-9 items-center gap-2 rounded-md border border-[#E8E9ED] bg-white px-4 text-[13px] font-medium text-[#181B21] transition-all duration-200 hover:-translate-y-0.5 hover:border-[#2E62EA]/40 hover:bg-[#EEF3FE] hover:text-[#2E62EA] active:translate-y-0 active:scale-95"
                      >
                        <Pencil className="h-3.5 w-3.5" /> Edit
                      </Link>

                      {superAdmin ? (
                        <button
                          disabled
                          className="flex h-9 cursor-not-allowed items-center gap-2 rounded-md border border-[#E8E9ED] bg-[#F6F7F8] px-4 text-[13px] text-[#9AA0AB]"
                        >
                          <Lock className="h-3.5 w-3.5" /> terkunci
                        </button>
                      ) : a.aktif ? (
                        <button
                          onClick={() => onToggle(a.id)}
                          className="h-9 rounded-md border border-[#E8E9ED] bg-[#F6F7F8] px-4 text-[13px] font-medium text-[#666666] transition-all duration-200 hover:-translate-y-0.5 hover:border-red-300 hover:bg-red-50 hover:text-red-600 active:translate-y-0 active:scale-95"
                        >
                          Nonaktifkan
                        </button>
                      ) : (
                        <button
                          onClick={() => onToggle(a.id)}
                          className="h-9 rounded-md border border-green-300 bg-green-50 px-4 text-[13px] font-semibold text-green-700 transition-all duration-200 hover:-translate-y-0.5 hover:bg-green-100 active:translate-y-0 active:scale-95"
                        >
                          Aktifkan
                        </button>
                      )}
                    </div>
                  </td>
                </tr>
              );
            })}

            {data.length === 0 && (
              <tr>
                <td colSpan={5} className="px-6 py-16 text-center text-[#666666]">
                  Tidak ada admin dengan status ini.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between border-t border-[#E8E9ED] px-6 py-5">
        <p className="text-[14px] font-bold text-[#181B21]">
          Menampilkan {data.length} Admin dari {admins.length} Admin
        </p>

        <div className="flex items-center gap-2 text-[14px]">
          <button
            onClick={() => setPage((p) => Math.max(1, p - 1))}
            disabled={halaman === 1}
            className="flex items-center gap-2 rounded-lg border border-[#E8E9ED] px-4 py-2.5 text-[#181B21] transition-colors hover:bg-[#EEF3FE] disabled:cursor-not-allowed disabled:opacity-40"
          >
            <ArrowLeft className="h-4 w-4" /> Previous
          </button>

          {Array.from({ length: totalPages }, (_, i) => i + 1).map((p) => (
            <button
              key={p}
              onClick={() => setPage(p)}
              className={`h-10 w-10 rounded-lg font-medium transition-colors ${
                p === halaman
                  ? "bg-[#2E62EA] text-white"
                  : "border border-[#E8E9ED] text-[#181B21] hover:bg-[#EEF3FE]"
              }`}
            >
              {p}
            </button>
          ))}

          <button
            onClick={() => setPage((p) => Math.min(totalPages, p + 1))}
            disabled={halaman === totalPages}
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

export default function ManajemenAdminPage() {
  const [admins, setAdmins] = useState<Admin[]>(dataAwal);
  const [filter, setFilter] = useState("semua");

  // Aktif <-> Nonaktif (Super Admin tidak bisa diubah)
  function toggle(id: number) {
    setAdmins((prev) => prev.map((a) => (a.id === id ? { ...a, aktif: !a.aktif } : a)));
  }

  const totalAdmin = admins.length;
  const adminAktif = admins.filter((a) => a.aktif).length;

  const tampil = admins.filter(
    (a) => filter === "semua" || (filter === "aktif" ? a.aktif : !a.aktif)
  );

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <style>{animasiCSS}</style>

      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-8">
          <div className="anim-masuk flex items-start justify-between gap-6" style={tunda(0)}>
            <div>
              <h1 className="text-[32px] font-bold text-[#181B21]">Managemen Admin</h1>
              <p className="mt-2 text-[14px] text-[#666666]">
                Kelola akun Admin BKK yang memiliki akses ke dashboard.
              </p>
            </div>

            <div className="flex items-center gap-4">
              <Link
                href="/admin/tambah"
                className="flex h-[46px] items-center gap-2 rounded-lg bg-[#2E62EA] px-5 text-[14px] font-semibold text-white transition-all duration-200 hover:-translate-y-0.5 hover:bg-[#4276E8] hover:shadow-lg hover:shadow-[#2E62EA]/30 active:translate-y-0 active:scale-95"
              >
                <Plus className="h-4 w-4" strokeWidth={2.5} />
                Tambah Admin
              </Link>

              <div className="relative">
                <select
                  value={filter}
                  onChange={(e) => setFilter(e.target.value)}
                  className="h-[46px] w-[190px] appearance-none rounded-lg border border-[#E8E9ED] bg-white pl-4 pr-10 text-[14px] font-medium text-[#181B21] focus:border-[#2E62EA] focus:outline-none focus:ring-2 focus:ring-[#DCE6FD]"
                >
                  <option value="semua">Semua Status</option>
                  <option value="aktif">Aktif</option>
                  <option value="nonaktif">Nonaktif</option>
                </select>
                <ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
              </div>
            </div>
          </div>

          <div className="mt-7 grid grid-cols-1 gap-5 md:grid-cols-2">
            <StatCard title="TOTAL ADMIN" value={totalAdmin} note="Termasuk Super Admin" delay={100} />
            <StatCard title="ADMIN AKTIF" value={adminAktif} note="Memiliki Akses Aktif" delay={180} />
          </div>

          <div className="mt-7 pb-4">
            <AdminTable admins={tampil} onToggle={toggle} delay={300} />
          </div>
        </main>
      </div>
    </div>
  );
}