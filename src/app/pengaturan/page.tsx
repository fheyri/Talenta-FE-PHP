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
  CircleUser,
  KeyRound,
  School,
  BellRing,
  Eye,
  EyeOff,
  Save,
  Camera,
  Check,
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

const MIN_PASSWORD = 8;

const notifList: { key: string; judul: string; desc: string }[] = [
  { key: "lowonganBaru", judul: "Lowongan baru dipublikasikan", desc: "Terima pemberitahuan saat ada lowongan baru dari mitra." },
  { key: "deadline", judul: "Lowongan mendekati batas waktu", desc: "Pengingat untuk lowongan yang akan berakhir dalam 3 hari." },
  { key: "alumni", judul: "Pembaruan data alumni", desc: "Pemberitahuan saat alumni memperbarui status kariernya." },
  { key: "psikotes", judul: "Hasil tes psikotes masuk", desc: "Pemberitahuan saat siswa atau alumni menyelesaikan tes." },
  { key: "email", judul: "Kirim ringkasan ke email", desc: "Ringkasan aktivitas dashboard dikirim ke email setiap minggu." },
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
            <NavItem key={m.label} {...m} active={m.label === "Pengaturan"} />
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

const inputCls = (salah?: boolean) =>
  `h-[46px] w-full rounded-md border bg-white px-4 text-[14px] text-[#181B21] placeholder:text-[#9AA0AB] focus:outline-none focus:ring-2 ${
    salah
      ? "border-red-400 focus:border-red-500 focus:ring-red-100"
      : "border-[#E8E9ED] focus:border-[#2E62EA] focus:ring-[#DCE6FD]"
  }`;

function Section({
  icon: Icon,
  title,
  desc,
  children,
}: {
  icon: LucideIcon;
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#E8E9ED] bg-white p-7">
      <h2 className="flex items-center gap-3 text-[20px] font-bold text-[#181B21]">
        <Icon className="h-5 w-5 text-[#4276E8]" strokeWidth={1.75} />
        {title}
      </h2>
      <p className="mt-2 text-[14px] text-[#666666]">{desc}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

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

function PasswordInput({
  value,
  onChange,
  error,
  autoComplete,
  placeholder,
}: {
  value: string;
  onChange: (v: string) => void;
  error?: string;
  autoComplete: string;
  placeholder: string;
}) {
  const [lihat, setLihat] = useState(false);

  return (
    <div className="relative">
      <input
        type={lihat ? "text" : "password"}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        className={`${inputCls(!!error)} pr-12`}
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

function Toggle({ aktif, onChange, label }: { aktif: boolean; onChange: () => void; label: string }) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={aktif}
      aria-label={label}
      onClick={onChange}
      className={`relative h-6 w-11 shrink-0 rounded-full transition-colors ${aktif ? "bg-[#2E62EA]" : "bg-[#D9DBE1]"}`}
    >
      <span
        className={`absolute top-0.5 h-5 w-5 rounded-full bg-white shadow transition-all ${
          aktif ? "left-[22px]" : "left-0.5"
        }`}
      />
    </button>
  );
}

function SimpanBar({ berhasil, label = "Simpan Perubahan" }: { berhasil: boolean; label?: string }) {
  return (
    <div className="mt-7 flex items-center justify-end gap-4 border-t border-[#E8E9ED] pt-5">
      {berhasil && (
        <span className="flex items-center gap-2 text-[13px] font-medium text-green-700">
          <Check className="h-4 w-4" strokeWidth={2.5} /> Perubahan tersimpan
        </span>
      )}
      <button
        type="submit"
        className="flex h-11 items-center gap-3 rounded-md bg-[#2E62EA] px-6 text-[14px] font-semibold text-white hover:bg-[#4276E8]"
      >
        <Save className="h-4 w-4" /> {label}
      </button>
    </div>
  );
}

/* ============================ HALAMAN ============================ */

type PwError = Partial<Record<"lama" | "baru" | "konfirmasi", string>>;

export default function PengaturanPage() {
  // Penanda bagian mana yang baru saja tersimpan
  const [tersimpan, setTersimpan] = useState<string | null>(null);

  function tandaiTersimpan(bagian: string) {
    setTersimpan(bagian);
    setTimeout(() => setTersimpan((s) => (s === bagian ? null : s)), 3000);
  }

  /* ---- Profil ---- */
  const [profil, setProfil] = useState({
    nama: user.nama,
    email: "fachry@gmail.com",
    hp: "+62 831 7281 9910",
  });
  const [profilError, setProfilError] = useState<Partial<Record<"nama" | "email", string>>>({});

  function simpanProfil(e: React.FormEvent) {
    e.preventDefault();
    const err: typeof profilError = {};
    if (!profil.nama.trim()) err.nama = "Nama lengkap wajib diisi.";
    if (!profil.email.trim()) err.email = "Email wajib diisi.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(profil.email.trim())) err.email = "Format email tidak valid.";
    setProfilError(err);
    if (Object.keys(err).length) return;

    // TODO: kirim ke API backend
    console.log("profil", profil);
    tandaiTersimpan("profil");
  }

  /* ---- Password ---- */
  const [pw, setPw] = useState({ lama: "", baru: "", konfirmasi: "" });
  const [pwError, setPwError] = useState<PwError>({});

  function simpanPassword(e: React.FormEvent) {
    e.preventDefault();
    const err: PwError = {};
    if (!pw.lama) err.lama = "Kata sandi saat ini wajib diisi.";
    if (!pw.baru) err.baru = "Kata sandi baru wajib diisi.";
    else if (pw.baru.length < MIN_PASSWORD) err.baru = `Kata sandi minimal ${MIN_PASSWORD} karakter.`;
    else if (pw.baru === pw.lama) err.baru = "Kata sandi baru tidak boleh sama dengan yang lama.";
    if (!pw.konfirmasi) err.konfirmasi = "Konfirmasi kata sandi wajib diisi.";
    else if (pw.konfirmasi !== pw.baru) err.konfirmasi = "Konfirmasi kata sandi tidak sama.";
    setPwError(err);
    if (Object.keys(err).length) return;

    // TODO: kirim ke API backend lewat HTTPS. Jangan simpan password di sisi client.
    setPw({ lama: "", baru: "", konfirmasi: "" });
    tandaiTersimpan("password");
  }

  /* ---- Informasi sekolah ---- */
  const [sekolah, setSekolah] = useState({
    nama: "SMK Negeri 1 Cibinong",
    bkk: "Bursa Kerja Khusus SMKN 1 Cibinong",
    email: "bkk@smkn1cibinong.sch.id",
    telp: "(021) 8750 0000",
    alamat: "Jl. Raya Karadenan, Cibinong, Kabupaten Bogor, Jawa Barat",
  });

  function simpanSekolah(e: React.FormEvent) {
    e.preventDefault();

    // TODO: kirim ke API backend
    console.log("sekolah", sekolah);
    tandaiTersimpan("sekolah");
  }

  /* ---- Notifikasi ---- */
  const [notif, setNotif] = useState<Record<string, boolean>>({
    lowonganBaru: true,
    deadline: true,
    alumni: true,
    psikotes: false,
    email: false,
  });

  function simpanNotif(e: React.FormEvent) {
    e.preventDefault();

    // TODO: kirim ke API backend
    console.log("notif", notif);
    tandaiTersimpan("notif");
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-8">
          <h1 className="text-[32px] font-bold text-[#181B21]">Pengaturan</h1>
          <p className="mt-2 text-[14px] text-[#666666]">
            Kelola profil akun, keamanan, informasi sekolah, dan preferensi notifikasi dashboard.
          </p>

          <div className="mt-7 space-y-6 pb-6">
            {/* Profil */}
            <form onSubmit={simpanProfil} noValidate>
              <Section icon={CircleUser} title="Profil Akun" desc="Informasi dasar akun yang sedang digunakan.">
                <div className="flex items-center gap-5">
                  <div className="relative">
                    <div className="flex h-20 w-20 items-center justify-center rounded-full bg-[#2E62EA] text-2xl font-bold text-white ring-4 ring-[#DCE6FD]">
                      {user.inisial}
                    </div>
                    <button
                      type="button"
                      aria-label="Ganti foto profil"
                      className="absolute -bottom-1 -right-1 flex h-8 w-8 items-center justify-center rounded-full border border-[#E8E9ED] bg-white text-[#2E62EA] shadow-sm hover:bg-[#EEF3FE]"
                    >
                      <Camera className="h-4 w-4" />
                    </button>
                  </div>
                  <div>
                    <p className="text-[18px] font-bold text-[#181B21]">{user.nama}</p>
                    <span className="mt-1 inline-block rounded-full bg-[#DCE6FD] px-3 py-0.5 text-[12px] text-[#2E62EA]">
                      {user.role}
                    </span>
                  </div>
                </div>

                <div className="mt-6 grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  <Field label="Nama Lengkap" error={profilError.nama}>
                    <input
                      value={profil.nama}
                      onChange={(e) => setProfil({ ...profil, nama: e.target.value })}
                      autoComplete="name"
                      className={inputCls(!!profilError.nama)}
                    />
                  </Field>
                  <Field label="Email" error={profilError.email}>
                    <input
                      type="email"
                      value={profil.email}
                      onChange={(e) => setProfil({ ...profil, email: e.target.value })}
                      autoComplete="email"
                      className={inputCls(!!profilError.email)}
                    />
                  </Field>
                  <Field label="Nomor Telepon / Whatsapp">
                    <input
                      type="tel"
                      value={profil.hp}
                      onChange={(e) => setProfil({ ...profil, hp: e.target.value })}
                      autoComplete="tel"
                      className={inputCls()}
                    />
                  </Field>
                  <Field label="Role Akun" hint="Role hanya bisa diubah oleh Super Admin lain.">
                    <input value={user.role} disabled className={`${inputCls()} cursor-not-allowed bg-[#F6F7F8] text-[#666666]`} />
                  </Field>
                </div>

                <SimpanBar berhasil={tersimpan === "profil"} />
              </Section>
            </form>

            {/* Password */}
            <form onSubmit={simpanPassword} noValidate>
              <Section
                icon={KeyRound}
                title="Ganti Kata Sandi"
                desc="Gunakan kata sandi yang kuat dan tidak dipakai di akun lain."
              >
                <div className="max-w-[520px] space-y-5">
                  <Field label="Kata Sandi Saat Ini" error={pwError.lama}>
                    <PasswordInput
                      value={pw.lama}
                      onChange={(v) => setPw({ ...pw, lama: v })}
                      error={pwError.lama}
                      autoComplete="current-password"
                      placeholder="Masukkan kata sandi saat ini"
                    />
                  </Field>
                  <Field label="Kata Sandi Baru" error={pwError.baru} hint={`Minimal ${MIN_PASSWORD} karakter.`}>
                    <PasswordInput
                      value={pw.baru}
                      onChange={(v) => setPw({ ...pw, baru: v })}
                      error={pwError.baru}
                      autoComplete="new-password"
                      placeholder="Masukkan kata sandi baru"
                    />
                  </Field>
                  <Field label="Konfirmasi Kata Sandi Baru" error={pwError.konfirmasi}>
                    <PasswordInput
                      value={pw.konfirmasi}
                      onChange={(v) => setPw({ ...pw, konfirmasi: v })}
                      error={pwError.konfirmasi}
                      autoComplete="new-password"
                      placeholder="Ulangi kata sandi baru"
                    />
                  </Field>
                </div>

                <SimpanBar berhasil={tersimpan === "password"} label="Perbarui Kata Sandi" />
              </Section>
            </form>

            {/* Informasi sekolah */}
            <form onSubmit={simpanSekolah}>
              <Section
                icon={School}
                title="Informasi Sekolah & BKK"
                desc="Data ini ditampilkan kepada siswa dan alumni di aplikasi TALENTA."
              >
                <div className="grid grid-cols-1 gap-x-6 gap-y-5 md:grid-cols-2">
                  <Field label="Nama Sekolah">
                    <input
                      value={sekolah.nama}
                      onChange={(e) => setSekolah({ ...sekolah, nama: e.target.value })}
                      className={inputCls()}
                    />
                  </Field>
                  <Field label="Nama BKK">
                    <input
                      value={sekolah.bkk}
                      onChange={(e) => setSekolah({ ...sekolah, bkk: e.target.value })}
                      className={inputCls()}
                    />
                  </Field>
                  <Field label="Email BKK">
                    <input
                      type="email"
                      value={sekolah.email}
                      onChange={(e) => setSekolah({ ...sekolah, email: e.target.value })}
                      className={inputCls()}
                    />
                  </Field>
                  <Field label="Telepon BKK">
                    <input
                      type="tel"
                      value={sekolah.telp}
                      onChange={(e) => setSekolah({ ...sekolah, telp: e.target.value })}
                      className={inputCls()}
                    />
                  </Field>
                  <div className="md:col-span-2">
                    <Field label="Alamat">
                      <textarea
                        rows={3}
                        value={sekolah.alamat}
                        onChange={(e) => setSekolah({ ...sekolah, alamat: e.target.value })}
                        className={`${inputCls()} h-auto resize-y py-3`}
                      />
                    </Field>
                  </div>
                </div>

                <SimpanBar berhasil={tersimpan === "sekolah"} />
              </Section>
            </form>

            {/* Notifikasi */}
            <form onSubmit={simpanNotif}>
              <Section
                icon={BellRing}
                title="Notifikasi"
                desc="Pilih pemberitahuan yang ingin kamu terima di dashboard."
              >
                <ul className="divide-y divide-[#E8E9ED] rounded-xl border border-[#E8E9ED]">
                  {notifList.map((n) => (
                    <li key={n.key} className="flex items-center justify-between gap-6 px-5 py-4">
                      <div>
                        <p className="text-[14px] font-semibold text-[#181B21]">{n.judul}</p>
                        <p className="mt-0.5 text-[13px] text-[#666666]">{n.desc}</p>
                      </div>
                      <Toggle
                        aktif={notif[n.key]}
                        label={n.judul}
                        onChange={() => setNotif((prev) => ({ ...prev, [n.key]: !prev[n.key] }))}
                      />
                    </li>
                  ))}
                </ul>

                <SimpanBar berhasil={tersimpan === "notif"} />
              </Section>
            </form>
          </div>
        </main>
      </div>
    </div>
  );
}