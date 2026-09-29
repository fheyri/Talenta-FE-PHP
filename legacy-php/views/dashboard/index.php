<main class="flex-1 flex flex-col overflow-hidden">
    <!-- Topbar -->
    <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
        <h1 class="text-xl font-bold text-slate-800">Overview Dashboard BKK</h1>
        <div class="flex items-center space-x-4">
            <span class="text-xs bg-emerald-100 text-emerald-800 font-semibold px-3 py-1 rounded-full">Server Active</span>
        </div>
    </header>

    <!-- Content Area -->
    <div class="flex-1 overflow-y-auto p-8 space-y-8">
        <!-- 4 Summary Cards Sesuai Flowchart -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                    <span class="text-sm font-semibold text-slate-500 block">Total Siswa</span>
                    <span class="text-2xl font-bold text-slate-900 mt-1 block">128</span>
                </div>
                <div class="w-12 h-12 rounded-xl bg-blue-50 text-blue-600 flex items-center justify-center text-xl">
                    <i class="fa-solid fa-user-graduate"></i>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                    <span class="text-sm font-semibold text-slate-500 block">Total Alumni</span>
                    <span class="text-2xl font-bold text-slate-900 mt-1 block">342</span>
                </div>
                <div class="w-12 h-12 rounded-xl bg-purple-50 text-purple-600 flex items-center justify-center text-xl">
                    <i class="fa-solid fa-user-tie"></i>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                    <span class="text-sm font-semibold text-slate-500 block">Lowongan Aktif</span>
                    <span class="text-2xl font-bold text-slate-900 mt-1 block">18</span>
                </div>
                <div class="w-12 h-12 rounded-xl bg-amber-50 text-amber-600 flex items-center justify-center text-xl">
                    <i class="fa-solid fa-briefcase"></i>
                </div>
            </div>

            <div class="bg-white p-6 rounded-2xl border border-slate-200/80 shadow-sm flex items-center justify-between">
                <div>
                    <span class="text-sm font-semibold text-slate-500 block">Sesi Psikotes</span>
                    <span class="text-2xl font-bold text-slate-900 mt-1 block">64</span>
                </div>
                <div class="w-12 h-12 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center text-xl">
                    <i class="fa-solid fa-brain"></i>
                </div>
            </div>
        </div>

        <!-- Quick Actions & Recent Activity -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6">
            <div class="lg:col-span-2 bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <div class="flex items-center justify-between mb-4">
                    <h2 class="text-lg font-bold text-slate-900">Lowongan Butuh Verifikasi BKK</h2>
                    <a href="index.php?page=lowongan" class="text-sm text-blue-600 font-semibold hover:underline">Lihat Semua</a>
                </div>
                <div class="divide-y divide-slate-100">
                    <div class="py-3 flex items-center justify-between">
                        <div>
                            <span class="font-semibold text-slate-800 block text-sm">Junior Frontend Web Developer</span>
                            <span class="text-xs text-slate-400">PT Telkom Akses • Deadline: 10 Okt 2026</span>
                        </div>
                        <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-amber-100 text-amber-800">Menunggu Verifikasi</span>
                    </div>
                    <div class="py-3 flex items-center justify-between">
                        <div>
                            <span class="font-semibold text-slate-800 block text-sm">Staff Administrasi BKK</span>
                            <span class="text-xs text-slate-400">Mitra Industri Mandiri • Deadline: 15 Okt 2026</span>
                        </div>
                        <span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">Aktif Dipublikasi</span>
                    </div>
                </div>
            </div>

            <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
                <h2 class="text-lg font-bold text-slate-900 mb-4">Aksi Cepat</h2>
                <div class="space-y-3">
                    <a href="index.php?page=lowongan" class="block w-full text-center py-2.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl text-sm transition">
                        + Tambah Lowongan
                    </a>
                    <a href="index.php?page=perusahaan" class="block w-full text-center py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition">
                        + Tambah Mitra Perusahaan
                    </a>
                    <a href="index.php?page=psikotes" class="block w-full text-center py-2.5 px-4 bg-slate-100 hover:bg-slate-200 text-slate-800 font-semibold rounded-xl text-sm transition">
                        Kelola Soal Psikotes
                    </a>
                </div>
            </div>
        </div>
    </div>
</main>
