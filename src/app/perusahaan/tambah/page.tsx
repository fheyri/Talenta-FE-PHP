"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useRouter, usePathname } from "next/navigation";
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
  ArrowLeft,
  Info,
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
  { label: "Kategori & Tag", href: "/kategori", icon: Tag },
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

/* ============================ DATA & VALIDASI FORM ============================ */

const BIDANG = [
  "Teknologi Informasi",
  "Desain & Kreatif",
  "Manufaktur & Industri",
  "Perdagangan & Retail",
  "Keuangan & Perbankan",
  "Kesehatan",
  "Pendidikan",
  "Pariwisata & Perhotelan",
  "Logistik & Transportasi",
  "Lainnya",
];

type FormData = {
  namaPerusahaan: string;
  bidang: string;
  kota: string;
  website: string;
  status: string;
  alamat: string;
  picNama: string;
  picJabatan: string;
  picTelepon: string;
};

type Errors = Partial<Record<keyof FormData, string>>;

function validasi(v: FormData): Errors {
  const e: Errors = {};
  if (!v.namaPerusahaan.trim()) e.namaPerusahaan = "Nama perusahaan wajib diisi";
  if (!v.bidang) e.bidang = "Pilih bidang sektor industri";
  if (!v.kota.trim()) e.kota = "Kota / lokasi kantor wajib diisi";
  if (v.website.trim() && !/^https?:\/\/\S+\.\S+/i.test(v.website.trim()))
    e.website = "Format tidak valid, contoh: https://perusahaan.co.id";
  if (!v.alamat.trim()) e.alamat = "Alamat lengkap kantor wajib diisi";
  if (!v.picNama.trim()) e.picNama = "Nama narahubung wajib diisi";
  if (!v.picJabatan.trim()) e.picJabatan = "Jabatan wajib diisi";
  if (!/^[0-9+\-\s]{8,16}$/.test(v.picTelepon.trim()))
    e.picTelepon = "Nomor telepon / WhatsApp tidak valid";
  return e;
}

/* ============================ KOMPONEN FORM ============================ */

const inputClass = (error?: string) =>
  `h-[50px] w-full rounded-lg border bg-white px-4 text-[15px] text-[#181B21] placeholder:text-[#9AA0A6] focus:outline-none focus:ring-2 focus:ring-[#DCE6FD] ${
    error ? "border-red-400" : "border-[#E8E9ED] focus:border-[#2E62EA]"
  }`;

function Field({
  label,
  error,
  className = "",
  children,
}: {
  label: string;
  error?: string;
  className?: string;
  children: React.ReactNode;
}) {
  return (
    <label className={`block ${className}`}>
      <span className="mb-2 block text-[15px] font-medium text-[#181B21]">{label}</span>
      {children}
      {error && <span className="mt-1.5 block text-sm text-red-600">{error}</span>}
    </label>
  );
}

function FormPerusahaan({
  judul,
  form,
  errors,
  ubah,
}: {
  judul: string;
  form: FormData;
  errors: Errors;
  ubah: (k: keyof FormData, v: string) => void;
}) {
  return (
    <section className="rounded-2xl border border-[#E8E9ED] bg-white px-8 py-8">
      <h2 className="flex items-center gap-3 text-[24px] font-bold text-[#181B21]">
        <Info className="h-7 w-7 text-[#2E62EA]" strokeWidth={1.75} />
        {judul}
      </h2>
      <p className="mt-2 text-[15px] text-[#666666]">
        Pastikan kelengkapan legalitas dan identitas kontak PIC valid untuk memudahkan verifikasi
        rekrutmen alumni & penempatan siswa.
      </p>

      {/* Informasi Data Perusahaan */}
      <h3 className="mt-9 text-[24px] font-bold text-[#2E62EA]">Informasi Data Perusahaan</h3>
      <div className="mt-4 grid grid-cols-1 gap-x-16 gap-y-5 lg:grid-cols-2">
        <Field label="Nama Resmi Perusahaan" error={errors.namaPerusahaan}>
          <input
            type="text"
            value={form.namaPerusahaan}
            onChange={(e) => ubah("namaPerusahaan", e.target.value)}
            placeholder="PT Teknologi Nusantara"
            className={inputClass(errors.namaPerusahaan)}
          />
        </Field>

        <Field label="Bidang Sektor Industri" error={errors.bidang}>
          <div className="relative">
            <select
              value={form.bidang}
              onChange={(e) => ubah("bidang", e.target.value)}
              className={`${inputClass(errors.bidang)} appearance-none pr-10 ${
                form.bidang ? "" : "text-[#9AA0A6]"
              }`}
            >
              <option value="">Pilih bidang industri</option>
              {BIDANG.map((b) => (
                <option key={b} value={b} className="text-[#181B21]">
                  {b}
                </option>
              ))}
            </select>
            <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
          </div>
        </Field>

        <Field label="Kota / Lokasi Kantor" error={errors.kota}>
          <input
            type="text"
            value={form.kota}
            onChange={(e) => ubah("kota", e.target.value)}
            placeholder="Contoh: Jakarta Selatan"
            className={inputClass(errors.kota)}
          />
        </Field>

        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
          <Field label="Website Resmi Perusahaan" error={errors.website}>
            <input
              type="text"
              value={form.website}
              onChange={(e) => ubah("website", e.target.value)}
              placeholder="https://www.teknologinusantara.co.id"
              className={inputClass(errors.website)}
            />
          </Field>

          <Field label="Status Kemitraan">
            <div className="relative">
              <select
                value={form.status}
                onChange={(e) => ubah("status", e.target.value)}
                className={`${inputClass()} appearance-none pr-10`}
              >
                <option value="Aktif">Aktif</option>
                <option value="Nonaktif">Nonaktif</option>
              </select>
              <ChevronDown className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-[#666666]" />
            </div>
          </Field>
        </div>

        <Field label="Alamat Lengkap Kantor" error={errors.alamat} className="lg:col-span-2">
          <textarea
            value={form.alamat}
            onChange={(e) => ubah("alamat", e.target.value)}
            placeholder="Jakarta Selatan ....."
            rows={3}
            className={`${inputClass(errors.alamat)} h-[110px] resize-none py-3`}
          />
        </Field>
      </div>

      {/* Narahubung */}
      <h3 className="mt-10 text-[24px] font-bold text-[#2E62EA]">Narahubung</h3>
      <div className="mt-4 grid grid-cols-1 gap-x-10 gap-y-5 md:grid-cols-3">
        <Field label="Nama Lengkap" error={errors.picNama}>
          <input
            type="text"
            value={form.picNama}
            onChange={(e) => ubah("picNama", e.target.value)}
            placeholder="Nama lengkap narahubung"
            className={inputClass(errors.picNama)}
          />
        </Field>

        <Field label="Jabatan" error={errors.picJabatan}>
          <input
            type="text"
            value={form.picJabatan}
            onChange={(e) => ubah("picJabatan", e.target.value)}
            placeholder="cth : HR Specialist"
            className={inputClass(errors.picJabatan)}
          />
        </Field>

        <Field label="Nomer Telepon / Whatsapp" error={errors.picTelepon}>
          <input
            type="tel"
            value={form.picTelepon}
            onChange={(e) => ubah("picTelepon", e.target.value)}
            placeholder="cth : 0892831827"
            className={inputClass(errors.picTelepon)}
          />
        </Field>
      </div>
    </section>
  );
}

/* ============================ HALAMAN TAMBAH PERUSAHAAN ============================ */

const formKosong: FormData = {
  namaPerusahaan: "",
  bidang: "",
  kota: "",
  website: "",
  status: "Aktif",
  alamat: "",
  picNama: "",
  picJabatan: "",
  picTelepon: "",
};

export default function TambahPerusahaanPage() {
  const router = useRouter();
  const [form, setForm] = useState<FormData>(formKosong);
  const [errors, setErrors] = useState<Errors>({});
  const [menyimpan, setMenyimpan] = useState(false);

  const ubah = (k: keyof FormData, v: string) => {
    setForm((f) => ({ ...f, [k]: v }));
    if (errors[k]) {
      setErrors((e) => {
        const baru = { ...e };
        delete baru[k];
        return baru;
      });
    }
  };

  const simpan = async (e: React.FormEvent) => {
    e.preventDefault();
    const hasil = validasi(form);
    setErrors(hasil);
    if (Object.keys(hasil).length > 0) return;

    setMenyimpan(true);
    // TODO: ganti dengan request POST ke API backend (kirim data `form`).
    await new Promise((resolve) => setTimeout(resolve, 600));
    router.push("/perusahaan");
  };

  return (
    <AdminShell>
      <Link
        href="/perusahaan"
        className="inline-flex items-center gap-3 text-[15px] font-medium text-[#2E62EA] hover:underline"
      >
        <ArrowLeft className="h-5 w-5" />
        Batal dan Kembali
      </Link>

      <h1 className="mt-7 text-[34px] font-bold text-[#181B21]">Tambah Perusahaan</h1>

      <form onSubmit={simpan} noValidate className="mt-7">
        <FormPerusahaan
          judul="Tambah Data Perusahaan ( DUDI )"
          form={form}
          errors={errors}
          ubah={ubah}
        />

        <div className="mt-8 flex justify-end">
          <button
            type="submit"
            disabled={menyimpan}
            className="flex h-[54px] items-center gap-3 rounded-lg bg-[#2E62EA] px-8 text-[16px] font-semibold text-white transition-colors hover:bg-[#4276E8] disabled:cursor-not-allowed disabled:opacity-60"
          >
            <Plus className="h-5 w-5" strokeWidth={2.25} />
            {menyimpan ? "Menyimpan..." : "Tambah Perusahaan"}
          </button>
        </div>
      </form>
    </AdminShell>
  );
}