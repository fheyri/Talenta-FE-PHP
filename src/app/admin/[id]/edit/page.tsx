"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { useParams, useRouter } from "next/navigation";
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
  Info,
  Eye,
  EyeOff,
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

/* ============================ DATA ============================ */
// Nanti ganti dengan data dari API berdasarkan params.id

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
};

const dataAdmin: Admin[] = [
  { id: 1, nama: "El Razqa Chaeruzzaman", email: "elrazqa@gmail.com", role: "Super Admin", aktif: true },
  { id: 2, nama: "Arvin Hadiyyatullah", email: "arvin@gmail.com", role: "Admin", aktif: true },
  { id: 3, nama: "Fachry Achmad", email: "fachry@gmail.com", role: "Admin", aktif: true },
  { id: 4, nama: "Rehannur Rizqi", email: "rehan@gmail.com", role: "Admin", aktif: false },
];

const MIN_PASSWORD = 8;

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
    <Link
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
    </Link>
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

/* ============================ KOMPONEN FORM ============================ */

function Field({
  label,
  error,
  hint,
  children,
}: {
  label: string;
  error?: string;
  hint?: string;
  children: React.ReactNode;
}) {
  return (
    <div>
      <label className="mb-2 block text-[13px] font-semibold text-[#181B21]">{label}</label>
      {children}
      {error ? (
        <p className="mt-1.5 text-[12px] font-medium text-red-600">{error}</p>
      ) : (
        hint && <p className="mt-1.5 text-[12px] text-[#666666]">{hint}</p>
      )}
    </div>
  );
}

function inputClass(error?: string) {
  return `h-[46px] w-full rounded-md border bg-white px-4 text-[14px] text-[#181B21] placeholder:text-[#666666] focus:outline-none focus:ring-2 ${
    error
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-[#E8E9ED] focus:border-[#2E62EA] focus:ring-[#DCE6FD]"
  }`;
}

function PasswordInput({
  value,
  onChange,
  error,
  autoComplete,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete: string;
}) {
  const [lihat, setLihat] = useState(false);

  return (
    <div className="relative">
      <input
        type={lihat ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder="Masukkan kata sandi baru"
        className={`${inputClass(error)} pr-12`}
      />
      <button
        type="button"
        aria-label={lihat ? "Sembunyikan kata sandi" : "Tampilkan kata sandi"}
        onClick={() => setLihat((v) => !v)}
        className="absolute right-4 top-1/2 -translate-y-1/2 text-[#666666] hover:text-[#181B21]"
      >
        {lihat ? <EyeOff className="h-[18px] w-[18px]" /> : <Eye className="h-[18px] w-[18px]" />}
      </button>
    </div>
  );
}

function PilihanStatus({
  aktif,
  dipilih,
  disabled,
  onClick,
}: {
  aktif: boolean;
  dipilih: boolean;
  disabled?: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      role="radio"
      aria-checked={dipilih}
      disabled={disabled}
      onClick={onClick}
      className={`flex min-w-[260px] items-start gap-3 rounded-md border px-4 py-3 text-left transition-colors disabled:cursor-not-allowed ${
        dipilih ? "border-[#2E62EA] bg-[#EEF3FE]" : "border-[#E8E9ED] bg-[#F6F7F8] enabled:hover:border-[#DCE6FD]"
      } ${disabled && !dipilih ? "opacity-50" : ""}`}
    >
      <span
        className={`mt-1 flex h-4 w-4 shrink-0 items-center justify-center rounded-full border-2 ${
          dipilih ? "border-[#2E62EA]" : "border-[#C4C7CF]"
        }`}
      >
        {dipilih && <span className="h-2 w-2 rounded-full bg-[#2E62EA]" />}
      </span>
      <span className="leading-snug">
        <span className="flex items-center gap-2 text-[14px] font-medium text-[#181B21]">
          {aktif ? "Aktif" : "Nonaktif"}
          <span
            className={`rounded border px-1.5 py-px text-[9px] font-bold ${
              aktif
                ? "border-emerald-600 bg-green-50 text-emerald-700"
                : "border-[#D9DBE1] bg-[#E8E9ED] text-[#666666]"
            }`}
          >
            {aktif ? "Aktif" : "Nonaktif"}
          </span>
        </span>
        <span className="mt-0.5 block text-[12px] text-[#666666]">
          {aktif ? "Akun dapat login dan mengakses dashboard." : "Akun tidak bisa login sampai diaktifkan lagi."}
        </span>
      </span>
    </button>
  );
}

/* ============================ HALAMAN ============================ */

type Errors = Partial<Record<"nama" | "email" | "password" | "konfirmasi", string>>;

export default function EditAdminPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();

  // Nanti ganti dengan fetch ke API berdasarkan id
  const admin = dataAdmin.find((a) => a.id === Number(id));

  const [nama, setNama] = useState(admin?.nama ?? "");
  const [email, setEmail] = useState(admin?.email ?? "");
  const [password, setPassword] = useState("");
  const [konfirmasi, setKonfirmasi] = useState("");
  const [aktif, setAktif] = useState(admin?.aktif ?? true);
  const [errors, setErrors] = useState<Errors>({});

  if (!admin) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto px-10 py-8">
            <section className="rounded-2xl border border-dashed border-[#DCE6FD] bg-white px-6 py-20 text-center">
              <p className="text-[18px] font-bold text-[#181B21]">Admin tidak ditemukan</p>
              <p className="mt-2 text-[14px] text-[#666666]">Akun dengan ID tersebut tidak ada atau sudah dihapus.</p>
              <Link
                href="/admin"
                className="mt-6 inline-flex h-11 items-center rounded-lg bg-[#2E62EA] px-6 text-[14px] font-semibold text-white hover:bg-[#4276E8]"
              >
                Kembali ke Manajemen Admin
              </Link>
            </section>
          </main>
        </div>
      </div>
    );
  }

  const superAdmin = admin.role === "Super Admin";

  function validasi(): Errors {
    const e: Errors = {};
    if (!nama.trim()) e.nama = "Nama lengkap wajib diisi.";
    if (!email.trim()) e.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim())) e.email = "Format email tidak valid.";

    // Password opsional: hanya dicek kalau salah satu kolom diisi
    if (password || konfirmasi) {
      if (password.length < MIN_PASSWORD) e.password = `Kata sandi minimal ${MIN_PASSWORD} karakter.`;
      if (konfirmasi !== password) e.konfirmasi = "Konfirmasi kata sandi tidak sama.";
    }
    return e;
  }

  function simpan(ev: React.FormEvent) {
    ev.preventDefault();
    const e = validasi();
    setErrors(e);
    if (Object.keys(e).length > 0) return;

    // TODO: kirim ke API backend. Jangan simpan password di sisi client.
    // Kirim password hanya kalau diisi (kosong = tidak diubah).
    console.log({
      id: admin!.id,
      nama: nama.trim(),
      email: email.trim(),
      status: aktif ? "Aktif" : "Nonaktif",
      gantiPassword: password.length > 0,
    });

    router.push("/admin");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-8">
          <Link
            href="/admin"
            className="inline-flex items-center gap-2 text-[13px] font-medium text-[#2E62EA] hover:underline"
          >
            <ArrowLeft className="h-4 w-4" /> Batal dan Kembali
          </Link>

          <h1 className="mt-4 text-[32px] font-bold text-[#181B21]">Edit Admin</h1>
          <p className="mt-1.5 text-[13px] text-[#666666]">
            Perbarui informasi akun Admin yang mengelola dashboard BKK.
          </p>

          <form onSubmit={simpan} noValidate>
            <section className="mt-6 rounded-2xl border border-[#E8E9ED] bg-white p-7">
              <div className="flex items-center justify-between border-b border-[#E8E9ED] pb-4">
                <h2 className="flex items-center gap-3 text-[18px] font-bold text-[#181B21]">
                  <Info className="h-5 w-5 text-[#4276E8]" strokeWidth={1.75} />
                  Informasi Akun Admin
                </h2>
                <span className="text-[13px] text-[#666666]">*Wajib diisi</span>
              </div>

              <div className="mt-6 space-y-5">
                <Field label="Nama Lengkap" error={errors.nama}>
                  <input
                    value={nama}
                    onChange={(e) => setNama(e.target.value)}
                    placeholder="contoh : el razqa chaeruzzaman"
                    autoComplete="name"
                    className={inputClass(errors.nama)}
                  />
                </Field>

                <Field label="Email" error={errors.email}>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="contoh : elrazqa@gmail.com"
                    autoComplete="email"
                    className={inputClass(errors.email)}
                  />
                </Field>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  <Field
                    label="Password Baru"
                    error={errors.password}
                    hint={`Kosongkan jika tidak ingin mengganti. Minimal ${MIN_PASSWORD} karakter.`}
                  >
                    <PasswordInput
                      value={password}
                      onChange={setPassword}
                      error={errors.password}
                      autoComplete="new-password"
                    />
                  </Field>
                  <Field label="Konfirmasi Password Baru" error={errors.konfirmasi}>
                    <PasswordInput
                      value={konfirmasi}
                      onChange={setKonfirmasi}
                      error={errors.konfirmasi}
                      autoComplete="new-password"
                    />
                  </Field>
                </div>

                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  <div>
                    <p className="mb-2 text-[13px] font-semibold text-[#181B21]">Role Akun</p>
                    <span
                      className={`inline-block rounded-md border px-4 py-1.5 text-[12px] font-semibold ${
                        superAdmin
                          ? "border-[#2E62EA] bg-white text-[#2E62EA]"
                          : "border-[#2E62EA] bg-[#EEF3FE] text-[#2E62EA]"
                      }`}
                    >
                      {admin.role}
                    </span>
                    <p className="mt-2 text-[12px] text-[#666666]">
                      {superAdmin
                        ? "Role Super Admin tidak dapat diubah dari halaman ini."
                        : "Akun ini memiliki akses ke fitur pengelolaan BKK sesuai hak akses Admin."}
                    </p>
                  </div>

                  <div>
                    <p className="mb-2 text-[13px] font-semibold text-[#181B21]">Status Akun</p>
                    <div role="radiogroup" className="flex flex-wrap gap-4">
                      <PilihanStatus aktif dipilih={aktif} disabled={superAdmin} onClick={() => setAktif(true)} />
                      <PilihanStatus
                        aktif={false}
                        dipilih={!aktif}
                        disabled={superAdmin}
                        onClick={() => setAktif(false)}
                      />
                    </div>
                    {superAdmin && (
                      <p className="mt-2 flex items-center gap-2 text-[12px] text-[#666666]">
                        <Lock className="h-3.5 w-3.5" /> Status Super Admin terkunci dan selalu aktif.
                      </p>
                    )}
                  </div>
                </div>
              </div>
            </section>

            <div className="mt-5 flex items-center justify-end gap-3 pb-6">
              <Link
                href="/admin"
                className="flex h-12 items-center rounded-lg border border-[#E8E9ED] bg-white px-7 text-[14px] font-medium text-[#181B21] hover:bg-[#EEF3FE]"
              >
                Kembali
              </Link>
              <button
                type="submit"
                className="flex h-12 items-center gap-3 rounded-lg bg-[#2E62EA] px-7 text-[14px] font-semibold text-white hover:bg-[#4276E8]"
              >
                <Save className="h-5 w-5" strokeWidth={1.75} />
                Simpan Perubahan
              </button>
            </div>
          </form>
        </main>
      </div>
    </div>
  );
}