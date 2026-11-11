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
  ChevronRight,
  ArrowLeft,
  Archive,
  Pencil,
  Banknote,
  CalendarDays,
  Hourglass,
  MapPin,
  Info,
  ClipboardList,
  ExternalLink,
  Globe,
  MessageCircle,
  Image as ImageIcon,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

/*
  COLOR PALETTE (sama dengan Dashboard & Lowongan)
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

const lowongan = {
  id: "#TES-2026-0049",
  posisi: "Frontend Developer ( Magang / Internship )",
  jurusan: "SMK / D3 / S1 Rekayasa perangkat lunak / Sistem Informasi / Sejenisnya",
  perusahaan: "PT Teknologi Nusantara",
  bidang: "Software House & IT Solutions",
  diposting: "30 September 2026, 16:00 WIB",
  kuota: "10 Siswa",
  uangSaku: "Rp 1.1jt - 1.5jt",
  periode: "6 Bulan Penuh",
  periodeNote: "Juli 2026 - Januari 2027",
  batas: "01 Oktober 2026",
  sisa: "Tersisa 3 Hari",
  lokasi: "Jakarta Selatan",
  alamat: "Jakarta Selatan, Jawa Barat",
  website: "https://talenta-karier/apply/smkn1cibinong-2026",
  deadline: "02 Oktober 2026",
  poster: { nama: "Poster lowongan.jpg", info: "Format PNG / PDF", size: "( 1.2 MB )" },
  hr: { nama: "Lily Latuconsina", telp: "+62 831 9281 9201" },
  deskripsi:
    "Kami membuka kesempatan bagi talenta muda SMK Negeri 1 Cibinong untuk bergabung dalam tim Software Engineering PT Teknologi Nusantara. Anda akan terlibat langsung dalam pembangunan komponen antarmuka sistem enterprise menggunakan standar modern front-end web stack.",
  persyaratan: [
    { judul: "Persyaratan Akademik", isi: "Siswa aktif jenjang SMK kelas XI/XII atau alumni fresh graduate maksimal 1 tahun dari kelulusan." },
    { judul: "Dasar Pemrograman Web", isi: "Memahami dasar-dasar HTML5, CSS3 modern (Flexbox/Grid), dan dasar JavaScript interaktif." },
    { judul: "Portofolio Dasar", isi: "Memiliki minimal 1 contoh karya web sederhana atau repositori proyek yang dapat ditunjukkan saat proses seleksi." },
  ],
};

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

/* ============================ KOMPONEN DETAIL ============================ */

function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <section className={`rounded-2xl border border-[#E8E9ED] bg-white p-7 ${className}`}>
      {children}
    </section>
  );
}

function CardTitle({ icon: Icon, children }: { icon: LucideIcon; children: React.ReactNode }) {
  return (
    <h2 className="mb-5 flex items-center gap-3 text-[18px] font-bold text-[#181B21]">
      <Icon className="h-5 w-5 text-[#4276E8]" strokeWidth={1.75} />
      {children}
    </h2>
  );
}

function InfoCard({
  label,
  value,
  note,
  icon: Icon,
  noteClass = "text-[#666666]",
}: {
  label: string;
  value: string;
  note: string;
  icon: LucideIcon;
  noteClass?: string;
}) {
  return (
    <div className="rounded-2xl border border-[#E8E9ED] bg-white px-5 py-4">
      <div className="flex items-center justify-between">
        <p className="text-[13px] text-[#666666]">{label}</p>
        <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#EEF3FE] text-[#4276E8]">
          <Icon className="h-4 w-4" strokeWidth={1.75} />
        </span>
      </div>
      <p className="mt-4 text-[20px] font-bold leading-tight text-[#181B21]">{value}</p>
      <p className={`mt-1 text-[13px] ${noteClass}`}>{note}</p>
    </div>
  );
}

/* ============================ HALAMAN ============================ */

export default function DetailLowonganPage() {
  const { id } = useParams<{ id: string }>();
  const [status, setStatus] = useState<"Aktif" | "Draft">("Aktif");
  const d = lowongan;

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-8">
          {/* Breadcrumb */}
          <nav className="mb-6 flex items-center gap-3 text-[15px]">
            <a href="/dashboard" className="text-[#666666] hover:text-[#2E62EA]">Dasboard</a>
            <ChevronRight className="h-4 w-4 text-[#666666]" />
            <a href="/lowongan" className="text-[#666666] hover:text-[#2E62EA]">Lowongan</a>
            <ChevronRight className="h-4 w-4 text-[#666666]" />
            <span className="font-medium text-[#2E62EA]">UI UX Designer</span>
          </nav>

          {/* Header lowongan */}
          <Card className="!p-6">
            <div className="flex items-start justify-between gap-6">
              <div className="min-w-0">
                <a href="/lowongan" className="flex items-center gap-2 text-[14px] font-medium text-[#2E62EA] hover:underline">
                  <ArrowLeft className="h-4 w-4" /> Kembali ke daftar lowongan
                </a>

                <div className="mt-3 flex flex-wrap items-center gap-3">
                  <h1 className="text-[26px] font-bold text-[#181B21]">{d.posisi}</h1>
                  <span className="rounded-md border border-green-300 bg-green-50 px-3 py-0.5 text-sm font-medium text-green-700">
                    {status}
                  </span>
                </div>

                <div className="mt-3 flex flex-wrap items-center gap-4">
                  <span className="rounded-md bg-[#DCE6FD] px-3 py-1.5 text-[13px] font-medium text-[#2E62EA]">
                    {d.jurusan}
                  </span>
                  <div className="flex rounded-lg border border-[#E8E9ED] bg-[#F6F7F8] p-1 text-[13px]">
                    {(["Aktif", "Draft"] as const).map((s) => (
                      <button
                        key={s}
                        onClick={() => setStatus(s)}
                        className={`rounded-md px-4 py-1 font-medium transition-colors ${
                          status === s ? "bg-white text-[#181B21] shadow-sm" : "text-[#666666]"
                        }`}
                      >
                        {s}
                      </button>
                    ))}
                  </div>
                </div>

                <p className="mt-4 text-[14px] text-[#181B21]">
                  <span>ID Lowongan : <b>{d.id}</b></span>
                  <span className="mx-3 text-[#666666]">•</span>
                  <span>Diposting oleh : <b>{d.perusahaan}</b></span>
                  <span className="mx-3 text-[#666666]">•</span>
                  <b>{d.diposting}</b>
                </p>
              </div>

              <div className="flex shrink-0 items-center gap-3">
                <button className="flex h-11 items-center gap-2 rounded-lg border border-[#E8E9ED] bg-white px-5 text-[14px] font-medium text-[#666666] hover:bg-[#EEF3FE]">
                  <Archive className="h-4 w-4" /> Arsipkan Lowongan
                </button>
               <Link
  href={`/lowongan/${id}/edit`}
  className="flex h-11 items-center gap-2 rounded-lg bg-[#2E62EA] px-5 text-[14px] font-semibold text-white hover:bg-[#4276E8]"
>
  <Pencil className="h-4 w-4" /> Edit Lowongan
</Link>
              </div>
            </div>
          </Card>

          {/* 5 kartu info */}
          <div className="mt-5 grid grid-cols-1 gap-4 md:grid-cols-2 xl:grid-cols-5">
            <InfoCard label="KUOTA SISWA" value={d.kuota} note="Siswa / Alumni Aktif" icon={Users} />
            <InfoCard label="UANG SAKU / GAJI" value={d.uangSaku} note="Nanti akan Diskusikan Kembali" icon={Banknote} />
            <InfoCard label="PERIODE MAGANG" value={d.periode} note={d.periodeNote} icon={CalendarDays} />
            <InfoCard label="BATAS PENDAFTARAN" value={d.batas} note={d.sisa} icon={Hourglass} noteClass="font-semibold text-red-600" />
            <InfoCard label="PENEMPATAN KERJA" value={d.lokasi} note="On-Site" icon={MapPin} />
          </div>

          {/* Konten utama */}
          <div className="mt-5 grid grid-cols-1 gap-5 xl:grid-cols-[1.25fr_1fr]">
            {/* Baris 1 */}
            <Card>
              <CardTitle icon={Info}>Deskripsi Lowongan</CardTitle>
              <p className="text-[15px] leading-relaxed text-[#181B21]">{d.deskripsi}</p>
            </Card>

            <Card>
              <div className="flex items-center gap-4 border-b border-[#E8E9ED] pb-5">
                <span className="flex h-14 w-14 items-center justify-center rounded-xl bg-[#DCE6FD] text-[#4276E8]">
                  <ImageIcon className="h-7 w-7" strokeWidth={1.5} />
                </span>
                <div>
                  <p className="text-[18px] font-bold text-[#181B21]">{d.perusahaan}</p>
                  <p className="text-[14px] text-[#666666]">{d.bidang}</p>
                </div>
              </div>
              <ul className="mt-5 space-y-3 text-[15px] text-[#181B21]">
                <li className="flex items-center gap-3">
                  <MapPin className="h-4 w-4" /> {d.alamat}
                </li>
                <li className="flex items-center gap-3">
                  <Globe className="h-4 w-4" />
                  <a href={d.website} className="hover:text-[#2E62EA] hover:underline">{d.website}</a>
                </li>
              </ul>
            </Card>

            {/* Baris 2 kiri: persyaratan */}
            <Card className="self-start">
              <CardTitle icon={ClipboardList}>Persyaratan & Kualifikasi</CardTitle>
              <div className="space-y-4 text-[15px] leading-relaxed text-[#181B21]">
                {d.persyaratan.map((p) => (
                  <p key={p.judul}>
                    <b>{p.judul} :</b> {p.isi}
                  </p>
                ))}
              </div>
            </Card>

            {/* Baris 2 kanan: tumpukan */}
            <div className="flex flex-col gap-5">
              <Card>
                <CardTitle icon={Info}>Informasi Pendaftaran</CardTitle>

                <div className="rounded-lg bg-[#DCE6FD]/70 px-4 py-3">
                  <p className="text-[13px] text-[#666666]">Deadline Pendaftaran</p>
                  <p className="mt-0.5 text-[17px] font-bold text-[#181B21]">{d.deadline}</p>
                </div>

                <p className="mb-2 mt-5 text-[13px] font-medium text-[#181B21]">Link pendaftaran eksternal :</p>
                <a
                  href={d.website}
                  target="_blank"
                  rel="noreferrer"
                  className="flex h-12 items-center justify-center gap-3 rounded-lg bg-[#0B4FD6] text-[14px] font-semibold text-white hover:bg-[#2E62EA]"
                >
                  Buka Link Pendaftaran <ExternalLink className="h-4 w-4" />
                </a>

                <p className="mb-2 mt-5 text-[13px] font-medium text-[#181B21]">Poster Pendaftaran :</p>
                <div className="flex items-center gap-4 rounded-lg bg-[#DCE6FD]/70 px-4 py-3">
                  <span className="flex h-11 w-11 items-center justify-center rounded-lg bg-white text-[#4276E8]">
                    <ImageIcon className="h-6 w-6" strokeWidth={1.5} />
                  </span>
                  <div className="text-[13px] leading-snug">
                    <p className="font-bold text-[#181B21]">{d.poster.nama}</p>
                    <p className="text-[#666666]">{d.poster.info}</p>
                    <p className="text-[#666666]">{d.poster.size}</p>
                  </div>
                </div>
              </Card>

              <Card>
                <CardTitle icon={Info}>Kontak HR</CardTitle>
                <p className="mb-2 text-[13px] font-medium text-[#181B21]">Kontak Person :</p>
                <div className="rounded-lg bg-[#DCE6FD]/70 px-4 py-3 text-[13px]">
                  <p className="text-[#666666]">Nama Kontak HR</p>
                  <p className="font-bold text-[#181B21]">{d.hr.nama}</p>
                  <p className="mt-1.5 text-[#666666]">Nomor Telepon / Whatsapp</p>
                  <p className="font-bold text-[#181B21]">{d.hr.telp}</p>
                </div>
                <a
                  href={`https://wa.me/${d.hr.telp.replace(/\D/g, "")}`}
                  target="_blank"
                  rel="noreferrer"
                  className="mt-4 flex h-11 items-center justify-center gap-3 rounded-lg bg-[#16A34A] text-[14px] font-semibold text-white hover:bg-[#15803D]"
                >
                  <MessageCircle className="h-4 w-4" /> Hubungi Via Whatsapp
                </a>
              </Card>

              <Card className="!p-5">
                <div className="flex items-center justify-between text-[13px]">
                  <span className="text-[#181B21]">Status Lowongan Saat Ini :</span>
                  <span className="rounded-md border border-green-300 bg-green-50 px-3 py-0.5 text-xs font-medium text-green-700">
                    {status}
                  </span>
                </div>
                <div className="mt-4 grid grid-cols-2 gap-3">
                  <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E8E9ED] text-[13px] font-medium text-[#181B21] hover:bg-[#EEF3FE]">
                    <Pencil className="h-4 w-4" /> Edit
                  </button>
                  <button className="flex h-10 items-center justify-center gap-2 rounded-lg border border-[#E8E9ED] text-[13px] font-medium text-[#666666] hover:bg-[#EEF3FE]">
                    <Archive className="h-4 w-4" /> Arsipkan Lowongan
                  </button>
                </div>
              </Card>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}