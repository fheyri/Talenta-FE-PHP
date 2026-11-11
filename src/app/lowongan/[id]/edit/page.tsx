"use client";

import { useEffect, useRef, useState } from "react";
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
  ChevronRight,
  Info,
  Upload,
  Trash2,
  X,
  FileText,
  Pencil,
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

const kategoriList = [
  "Teknologi Informasi & Software",
  "Desain & Kreatif",
  "Marketing & Media Sosial",
  "Administrasi & Perkantoran",
  "Manufaktur & Teknik",
  "Perhotelan & Pariwisata",
];

const jenisList = ["Full-Time", "Part-Time", "Internship / PKL", "Kontrak"];

const MAX_POSTER_MB = 5;
const TOTAL_LOWONGAN = 50;

const posisiContoh = [
  "UI/UX Designer",
  "Graphic Designer & Content Creator",
  "Digital Marketing",
  "Social Media Specialist",
  "Frontend Developer",
  "Mobile App Developer ( Flutter )",
];

// Data contoh untuk id 1-50 (sama dengan jumlah di halaman daftar)
function ambilLowongan(id: number) {
  if (!Number.isInteger(id) || id < 1 || id > TOTAL_LOWONGAN) return null;
  return {
    posisi: posisiContoh[(id - 1) % posisiContoh.length],
    perusahaan: "PT Teknologi Nusantara",
    kategori: "Teknologi Informasi & Software",
    jenis: "Internship / PKL",
    lokasi: "Jakarta Selatan",
    kuota: "10",
    uangSaku: "Rp. 1.500.000 / Bulan",
    deskripsi:
      "Kami membuka kesempatan bagi talenta muda SMK Negeri 1 Cibinong untuk bergabung dalam tim Software Engineering PT Teknologi Nusantara. Anda akan terlibat langsung dalam pembangunan komponen antarmuka sistem enterprise menggunakan standar modern front-end web stack.",
    tanggungJawab:
      "• Menerjemahkan desain Figma dan wireframe menjadi kode HTML/CSS Tailwind yang responsif.\n• Berkolaborasi dengan tim backend dan QA dalam integrasi RESTful API.\n• Memelihara standar kualitas clean code dan dokumentasi komponen internal.",
    persyaratan:
      "• Siswa aktif Kelas XII atau Alumni maksimal 1 tahun kelulusan.\n• Memiliki portofolio mini web project yang pernah dikerjakan di sekolah.\n• Bersedia hadir tatap muka di kantor Surabaya minimal 3 hari dalam seminggu.",
    skills: ["Figma", "UIUX", "HTML", "NEXT.JS", "FLUTTER"],
    deadline: "2026-10-01",
    link: "https://talenta-karier/apply/smkn1cibinong-2026",
    poster: { nama: "poster rekrutmen frontend.jpg", ukuran: "2.0 MB" },
    namaHr: "Lily Latuconsina",
    telpHr: "+62 831 82919 8283",
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
  "h-[42px] w-full rounded-md border border-[#E8E9ED] bg-white px-3 text-[14px] text-[#181B21] placeholder:text-[#9AA0AB] focus:border-[#2E62EA] focus:outline-none focus:ring-2 focus:ring-[#DCE6FD]";

const textareaClass =
  "w-full resize-y rounded-md border border-[#E8E9ED] bg-white px-3 py-2.5 text-[14px] leading-relaxed text-[#181B21] placeholder:text-[#9AA0AB] focus:border-[#2E62EA] focus:outline-none focus:ring-2 focus:ring-[#DCE6FD]";

function Section({
  title,
  desc,
  children,
}: {
  title: string;
  desc: string;
  children: React.ReactNode;
}) {
  return (
    <section className="rounded-2xl border border-[#E8E9ED] bg-white p-7">
      <h2 className="flex items-center gap-3 text-[20px] font-bold text-[#181B21]">
        <Info className="h-5 w-5 text-[#4276E8]" strokeWidth={1.75} />
        {title}
      </h2>
      <p className="mt-2 text-[14px] text-[#666666]">{desc}</p>
      <div className="mt-6">{children}</div>
    </section>
  );
}

function Field({
  label,
  children,
  hint,
  className = "",
}: {
  label: string;
  children: React.ReactNode;
  hint?: string;
  className?: string;
}) {
  return (
    <div className={className}>
      <label className="mb-2 block text-[13px] font-semibold text-[#181B21]">{label}</label>
      {children}
      {hint && <p className="mt-2 text-[13px] text-[#666666]">{hint}</p>}
    </div>
  );
}

function formatSize(bytes: number) {
  return bytes >= 1024 * 1024
    ? `${(bytes / (1024 * 1024)).toFixed(1)} MB`
    : `${Math.max(1, Math.round(bytes / 1024))} KB`;
}

/* ============================ HALAMAN ============================ */

export default function EditLowonganPage() {
  const router = useRouter();
  const { id } = useParams<{ id: string }>();
  const fileRef = useRef<HTMLInputElement>(null);

  // Nanti ganti dengan fetch ke API berdasarkan id
  const data = ambilLowongan(Number(id));

  const [form, setForm] = useState({
    posisi: data?.posisi ?? "",
    perusahaan: data?.perusahaan ?? "",
    kategori: data?.kategori ?? "",
    jenis: data?.jenis ?? "",
    lokasi: data?.lokasi ?? "",
    kuota: data?.kuota ?? "",
    uangSaku: data?.uangSaku ?? "",
    deskripsi: data?.deskripsi ?? "",
    tanggungJawab: data?.tanggungJawab ?? "",
    persyaratan: data?.persyaratan ?? "",
    deadline: data?.deadline ?? "",
    link: data?.link ?? "",
    namaHr: data?.namaHr ?? "",
    telpHr: data?.telpHr ?? "",
  });

  const [skills, setSkills] = useState<string[]>(data?.skills ?? []);
  const [skillBaru, setSkillBaru] = useState("");

  // Poster lama (dari data) dan poster baru (hasil upload)
  const [posterLama, setPosterLama] = useState(data?.poster ?? null);
  const [posterBaru, setPosterBaru] = useState<File | null>(null);
  const [posterError, setPosterError] = useState("");

  const [formError, setFormError] = useState("");

  if (!data) {
    return (
      <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
        <Sidebar />
        <div className="flex min-w-0 flex-1 flex-col">
          <Topbar />
          <main className="flex-1 overflow-y-auto px-10 py-8">
            <section className="rounded-2xl border border-dashed border-[#DCE6FD] bg-white px-6 py-20 text-center">
              <p className="text-[18px] font-bold text-[#181B21]">Lowongan tidak ditemukan</p>
              <p className="mt-2 text-[14px] text-[#666666]">Lowongan dengan ID tersebut tidak ada atau sudah dihapus.</p>
              <Link
                href="/lowongan"
                className="mt-6 inline-flex h-11 items-center rounded-lg bg-[#2E62EA] px-6 text-[14px] font-semibold text-white hover:bg-[#4276E8]"
              >
                Kembali ke Daftar Lowongan
              </Link>
            </section>
          </main>
        </div>
      </div>
    );
  }

  const set =
    (key: keyof typeof form) =>
    (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) =>
      setForm((f) => ({ ...f, [key]: e.target.value }));

  function tambahSkill() {
    const s = skillBaru.trim();
    if (!s) return;
    if (!skills.some((x) => x.toLowerCase() === s.toLowerCase())) {
      setSkills((prev) => [...prev, s]);
    }
    setSkillBaru("");
  }

  function pilihPoster(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    e.target.value = "";
    if (!file) return;

    if (!["image/jpeg", "image/png"].includes(file.type)) {
      setPosterError("Format harus JPG atau PNG.");
      return;
    }
    if (file.size > MAX_POSTER_MB * 1024 * 1024) {
      setPosterError(`Ukuran file maksimal ${MAX_POSTER_MB} MB.`);
      return;
    }
    setPosterError("");
    setPosterBaru(file);
  }

  function hapusPoster() {
    setPosterBaru(null);
    setPosterLama(null);
    setPosterError("");
  }

  const namaPoster = posterBaru?.name ?? posterLama?.nama;
  const ukuranPoster = posterBaru ? formatSize(posterBaru.size) : posterLama?.ukuran;

  function simpan(status: "draft" | "aktif") {
    if (status === "aktif") {
      const kosong = [
        !form.posisi.trim() && "Posisi",
        !form.perusahaan.trim() && "Perusahaan",
        !form.deadline && "Deadline",
      ].filter(Boolean);
      if (kosong.length) {
        setFormError(`Lengkapi dulu: ${kosong.join(", ")}.`);
        return;
      }
    } else if (!form.posisi.trim()) {
      setFormError("Isi minimal nama posisi untuk menyimpan draft.");
      return;
    }

    setFormError("");

    // TODO: kirim ke API backend (pakai FormData supaya poster ikut terkirim)
    console.log({
      id,
      ...form,
      skills,
      posterBaru,
      posterDihapus: !posterBaru && !posterLama,
      status,
    });

    router.push(`/lowongan/${id}`);
  }

  return (
    <div className="flex h-screen overflow-hidden bg-[#F6F7F8] font-sans text-[#181B21]">
      <Sidebar />

      <div className="flex min-w-0 flex-1 flex-col">
        <Topbar />

        <main className="flex-1 overflow-y-auto px-10 py-8">
          {/* Breadcrumb */}
          <nav className="mb-3 flex items-center gap-3 text-[14px]">
            <Link href="/dashboard" className="text-[#666666] hover:text-[#2E62EA]">Dasboard</Link>
            <ChevronRight className="h-4 w-4 text-[#666666]" />
            <Link href="/lowongan" className="text-[#666666] hover:text-[#2E62EA]">Lowongan</Link>
            <ChevronRight className="h-4 w-4 text-[#666666]" />
            <span className="font-medium text-[#2E62EA]">Edit Lowongan</span>
          </nav>

          <h1 className="text-[30px] font-bold text-[#181B21]">Edit Lowongan</h1>
          <p className="mt-2 text-[14px] text-[#666666]">
            Perbarui informasi lowongan kerja dari mitra untuk langsung dipublikasikan atau disimpan sebagai draft.
          </p>

          <div className="mt-6 space-y-6">
            {/* Informasi Lowongan */}
            <Section title="Informasi Lowongan" desc="Informasi dasar mengenai posisi dan perusahaan.">
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                <Field label="Posisi">
                  <input className={inputClass} placeholder="Frontend Developer" value={form.posisi} onChange={set("posisi")} />
                </Field>
                <Field label="Perusahaan">
                  <input className={inputClass} placeholder="PT Teknologi Nusantara" value={form.perusahaan} onChange={set("perusahaan")} />
                </Field>
                <Field label="Kategori">
                  <select className={inputClass} value={form.kategori} onChange={set("kategori")}>
                    <option value="">Pilih kategori</option>
                    {kategoriList.map((k) => (
                      <option key={k} value={k}>{k}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Jenis Pekerjaan">
                  <select className={inputClass} value={form.jenis} onChange={set("jenis")}>
                    <option value="">Pilih jenis pekerjaan</option>
                    {jenisList.map((j) => (
                      <option key={j} value={j}>{j}</option>
                    ))}
                  </select>
                </Field>
                <Field label="Lokasi Penempatan">
                  <input className={inputClass} placeholder="Jakarta Selatan" value={form.lokasi} onChange={set("lokasi")} />
                </Field>
                <div className="grid grid-cols-2 gap-5">
                  <Field label="Kuota Siswa">
                    <input type="number" min={1} className={inputClass} placeholder="10" value={form.kuota} onChange={set("kuota")} />
                  </Field>
                  <Field label="Uang Saku">
                    <input className={inputClass} placeholder="Rp. 1.500.000 / Bulan" value={form.uangSaku} onChange={set("uangSaku")} />
                  </Field>
                </div>
              </div>
            </Section>

            {/* Detail Lowongan */}
            <Section title="Detail Lowongan" desc="Jelaskan informasi pekerjaan agar mudah dipahami oleh siswa dan alumni.">
              <div className="space-y-6">
                <Field label="Deskripsi">
                  <textarea rows={3} className={textareaClass} placeholder="Jelaskan gambaran umum posisi ini..." value={form.deskripsi} onChange={set("deskripsi")} />
                </Field>
                <Field label="Tanggung Jawab Utama">
                  <textarea rows={3} className={textareaClass} placeholder={"• Tuliskan tanggung jawab, satu per baris"} value={form.tanggungJawab} onChange={set("tanggungJawab")} />
                </Field>
                <Field label="Persyaratan Khusus & Kualifikasi Jurusan">
                  <textarea rows={3} className={textareaClass} placeholder={"• Tuliskan persyaratan, satu per baris"} value={form.persyaratan} onChange={set("persyaratan")} />
                </Field>
              </div>
            </Section>

            {/* Skill */}
            <Section title="Skill / Keahlian" desc="Keahlian atau keahlian kompetensi yang dibutuhkan dari siswa.">
              <div className="flex min-h-[52px] max-w-[760px] flex-wrap items-center gap-3 rounded-lg border border-[#E8E9ED] bg-white px-4 py-2.5">
                {skills.map((s) => (
                  <span
                    key={s}
                    className="flex items-center gap-2 rounded-md border border-[#DCE6FD] bg-[#EEF3FE] px-3 py-1.5 text-[13px] font-semibold text-[#2E62EA]"
                  >
                    {s}
                    <button
                      type="button"
                      aria-label={`Hapus ${s}`}
                      onClick={() => setSkills((prev) => prev.filter((x) => x !== s))}
                    >
                      <X className="h-4 w-4" strokeWidth={2.5} />
                    </button>
                  </span>
                ))}
                <input
                  value={skillBaru}
                  onChange={(e) => setSkillBaru(e.target.value)}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      tambahSkill();
                    }
                  }}
                  onBlur={tambahSkill}
                  placeholder="+ Tambah Kompetensi"
                  className="min-w-[160px] flex-1 bg-transparent text-[14px] text-[#181B21] placeholder:text-[#666666] focus:outline-none"
                />
              </div>
              <p className="mt-2 text-[13px] text-[#666666]">Ketik skill lalu tekan Enter untuk menambahkan.</p>
            </Section>

            {/* Publikasi */}
            <Section title="Informasi Publikasi" desc="Tentukan masa berlaku dan sumber informasi lowongan">
              <div className="max-w-[640px] space-y-6">
                <Field label="Batas Waktu Pendaftaran ( Deadline )">
                  <input type="date" className={inputClass} value={form.deadline} onChange={set("deadline")} />
                </Field>
                <Field label="Link Pendaftaran / Formulir Eksternal">
                  <input
                    type="url"
                    className={inputClass}
                    placeholder="https://talenta-karier/apply/smkn1cibinong-2026"
                    value={form.link}
                    onChange={set("link")}
                  />
                </Field>
              </div>
            </Section>

            {/* Poster */}
            <Section
              title="QR / Poster Pendaftaran"
              desc="Upload gambar QR atau poster yang digunakan untuk mengarahkan siswa dan alumni ke informasi atau formulir pendaftaran."
            >
              <input ref={fileRef} type="file" accept="image/png,image/jpeg" className="hidden" onChange={pilihPoster} />

              {namaPoster ? (
                <div className="flex items-center gap-4 rounded-lg border border-[#E8E9ED] bg-[#F6F7F8] p-4 shadow-sm">
                  <span className="flex h-16 w-16 items-center justify-center rounded-lg bg-[#DCE6FD] text-[#4276E8]">
                    <ImageIcon className="h-8 w-8" strokeWidth={1.5} />
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate text-[16px] font-medium text-[#181B21]">{namaPoster}</p>
                    <p className="mt-1 text-[12px] text-[#666666]">Ukuran : {ukuranPoster}</p>
                  </div>
                  <button
                    type="button"
                    onClick={() => fileRef.current?.click()}
                    className="flex h-9 items-center gap-2 rounded-md border border-[#E8E9ED] bg-white px-4 text-[12px] font-medium text-[#181B21] hover:bg-[#EEF3FE]"
                  >
                    <Upload className="h-4 w-4" /> Ganti Gambar
                  </button>
                  <button
                    type="button"
                    onClick={hapusPoster}
                    className="flex h-9 items-center gap-2 rounded-md border border-red-300 bg-white px-4 text-[12px] font-medium text-red-600 hover:bg-red-50"
                  >
                    <Trash2 className="h-4 w-4" /> Hapus
                  </button>
                </div>
              ) : (
                <button
                  type="button"
                  onClick={() => fileRef.current?.click()}
                  className="flex w-full flex-col items-center gap-2 rounded-lg border-2 border-dashed border-[#DCE6FD] bg-[#EEF3FE]/50 py-8 text-[14px] text-[#666666] hover:border-[#2E62EA]"
                >
                  <Upload className="h-6 w-6 text-[#4276E8]" />
                  Klik untuk upload gambar QR / poster
                </button>
              )}

              <p className={`mt-3 flex items-center gap-2 text-[13px] ${posterError ? "text-red-600" : "text-[#666666]"}`}>
                <Info className="h-4 w-4 shrink-0" />
                {posterError ||
                  `Format yang didukung: JPG, PNG, maksimal ${MAX_POSTER_MB} MB. Pastikan barcode atau kode QR terbaca dengan jelas.`}
              </p>
            </Section>

            {/* Kontak HR */}
            <Section title="Kontak HR" desc="Informasi kontak perusahaan yang dapat dihubungi terkait lowongan.">
              <div className="grid grid-cols-1 gap-x-8 gap-y-5 md:grid-cols-2">
                <Field label="Nama Kontak HR">
                  <input className={inputClass} placeholder="Lily Latuconsina" value={form.namaHr} onChange={set("namaHr")} />
                </Field>
                <Field
                  label="Nomor Telepon / Whatsapp"
                  hint="Dapat dihubungi siswa/alumni untuk konfirmasi berkas atau pertanyaan teknis."
                >
                  <input type="tel" className={inputClass} placeholder="+62 831 82919 8283" value={form.telpHr} onChange={set("telpHr")} />
                </Field>
              </div>
            </Section>
          </div>

          {/* Aksi */}
          <div className="mt-6 flex flex-col items-end gap-3 pb-6">
            {formError && <p className="text-[14px] font-medium text-red-600">{formError}</p>}
            <div className="flex items-center gap-3">
              <button
                type="button"
                onClick={() => simpan("draft")}
                className="flex h-12 items-center gap-3 rounded-lg border border-[#E8E9ED] bg-white px-7 text-[15px] font-medium text-[#181B21] hover:bg-[#EEF3FE]"
              >
                <FileText className="h-5 w-5" strokeWidth={1.5} /> Simpan Sebagai Draft
              </button>
              <button
                type="button"
                onClick={() => simpan("aktif")}
                className="flex h-12 items-center gap-3 rounded-lg bg-[#2E62EA] px-7 text-[15px] font-semibold text-white hover:bg-[#4276E8]"
              >
                <Pencil className="h-4 w-4" strokeWidth={2.25} /> Edit Lowongan
              </button>
            </div>
          </div>
        </main>
      </div>
    </div>
  );
}