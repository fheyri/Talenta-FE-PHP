# TALENTA BKK OS - Web Portal Khusus Pengelola BKK Sekolah

Platform tata kelola karir terpadu untuk monitoring tracer study, verifikasi lowongan kerja resmi, dan rekapitulasi data Bursa Kerja Khusus (BKK) sekolah secara akurat.

Portal ini dibangun menggunakan **Next.js (App Router) + TypeScript + Tailwind CSS** dengan font **Inter**, dirancang memiliki estetika modern *pixel-close* terhadap referensi desain dan animasi interaktif setara standar *senior frontend engineer*.

---

## 🏛️ Arsitektur Sistem Terintegrasi
Sesuai dengan **Full Flowchart Sistem TALENTA (Siswa + Alumni + BKK)**:
- **Web App (BKK / Admin)**: Dibangun dengan Next.js ini untuk mengelola lowongan, tracer study alumni, kemitraan perusahaan, psikotes, mentoring, dan analitik.
- **Mobile App (Siswa & Alumni)**: Dibangun dengan Flutter (`Talenta-mobile-Flutter`).
- **REST API (Backend)**: Didukung oleh Laravel (`talenta-api`), menyediakan otentikasi Sanctum dan endpoint terpusat.
- **Database**: MySQL terpusat yang menghubungkan seluruh ekosistem.

---

## ✨ Fitur & Animasi Senior Frontend

1. **Ambient Organic Gradient Blur**:
   - **Blob Kiri Atas**: Kontur gelombang organik (*multi-lobed curved wave*) dengan warna *ice-blue* (`#DCE6FD`) yang bernapas secara halus.
   - **Blob Kanan Atas**: Gradien biru royal menyala (*vibrant azure/royal blue* `#4A82F4` ➔ `#6C97F3` ➔ `#91B3F7`) memanjang ke bawah hingga ke belakang kartu autentikasi.
   - **Interactive Mouse Parallax**: Gradien ambient di latar belakang merespons pergerakan kursor mouse dengan akselerasi *spring physics* halus tanpa membebani performa browser.

2. **Staggered Spring Motion & Haptic Feedback**:
   - **Entrance Motion**: Animasi kemunculan bertahap (*staggered fade-up & spring scale*) menggunakan Framer Motion.
   - **Pulsing Radar Status Badge**: Indikator status resmi *"Portal Khusus Pengelola BKK Sekolah"* dengan animasi denyut radar real-time.
   - **Card Elevation & Top Highlight**: Kartu putih dengan sudut `rounded-[28px]` elegan, soft elevation shadow, dan garis refleksi kaca di bagian atas.
   - **Error Haptic Shake**: Kartu form akan bergetar halus (*subtle micro-shake*) ketika submit form gagal atau input tidak valid sebagai *visual feedback* yang intuitif.

3. **Komponen Reusable & Aksesibel**:
   - `AuthLayout`: Layout responsif 2 kolom di desktop (hero kiri + form kanan) dan stack vertikal di mobile.
   - `AuthCard`: Kontainer kartu putih `max-w-[460px]` dengan header semibold dan soft shadow.
   - `TextField`: Input teks aksesibel (tinggi 52px, rounded-xl) dengan *focus ring blue glow* dan pesan error real-time.
   - `PasswordField`: Input kata sandi dengan tombol toggle ikon mata (*eye/eye-off*) yang berotasi halus.
   - `PrimaryButton`: Tombol utama biru `#0F62FE` dengan efek *light shimmer sweep* mengkilap, *tap feedback*, dan *loading spinner*.
   - `AuthFooter`: Footer 3 kolom sejajar horizontal di desktop dan stack vertikal di mobile.

4. **Validasi & Integrasi API**:
   - Validasi ketat menggunakan **React Hook Form + Zod**.
   - Endpoint login siap menghubungkan ke Laravel API: `POST /api/auth/login` ➔ Laravel `adminLogin` (`/api/v1/admin/auth/login`).
   - Endpoint lupa password: `POST /api/auth/forgot-password`.
   - Dilengkapi fallback handler demo lokal instan (kredensial demo: `admin@gmail.com` / `admin123`).

---

## 🚀 Menjalankan Proyek

```bash
# 1. Jalankan development server
npm run dev

# Buka http://localhost:3000 di browser
```

Untuk build produksi:
```bash
npm run build
npm run start
```

---

## 📂 Struktur Direktori

```text
src/
├── app/
│   ├── api/
│   │   └── auth/
│   │       ├── login/route.ts            # Proxy ke Laravel adminLogin / Fallback demo
│   │       └── forgot-password/route.ts  # Handler reset password
│   ├── forgot-password/
│   │   └── page.tsx                      # Halaman Lupa Password
│   ├── login/
│   │   └── page.tsx                      # Halaman Login Utama
│   ├── globals.css                       # Styling tema Tailwind v4 + keyframe animations
│   ├── layout.tsx                        # Root layout dengan Inter Google Font
│   └── page.tsx                          # Redirect root / ke /login
├── components/
│   └── auth/
│       ├── AuthCard.tsx                  # Kontainer kartu form (28px rounded)
│       ├── AuthFooter.tsx                # Footer 3 bagian
│       ├── AuthLayout.tsx                # Layout responsif 2 kolom
│       ├── BackgroundGradient.tsx        # Dynamic organic SVG blobs + parallax
│       ├── PasswordField.tsx             # Input password dengan eye toggle
│       ├── PrimaryButton.tsx             # Tombol biru dengan shimmer & loading state
│       └── TextField.tsx                 # Input text field aksesibel
└── lib/
    ├── api.ts                            # Client helper otentikasi
    └── validations/
        └── auth.ts                       # Skema validasi Zod
```
