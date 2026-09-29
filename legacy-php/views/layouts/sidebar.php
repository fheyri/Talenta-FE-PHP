<!-- Sidebar Navigasi Admin BKK Sesuai Flowchart TALENTA -->
<aside class="w-64 bg-slate-900 text-slate-300 flex flex-col justify-between shrink-0 shadow-lg">
    <div>
        <!-- Logo Brand -->
        <div class="p-6 border-b border-slate-800 flex items-center space-x-3">
            <div class="w-10 h-10 rounded-xl bg-blue-600 flex items-center justify-center text-white font-bold text-xl shadow-md shadow-blue-500/30">
                <i class="fa-solid fa-graduation-cap"></i>
            </div>
            <div>
                <span class="text-white font-bold text-lg tracking-wide block">TALENTA</span>
                <span class="text-xs text-blue-400 font-medium">BKK & Admin Portal</span>
            </div>
        </div>

        <!-- Menu List -->
        <nav class="p-4 space-y-1 overflow-y-auto max-h-[calc(100vh-170px)]">
            <a href="index.php?page=dashboard" class="flex items-center space-x-3 px-4 py-3 rounded-xl transition font-medium hover:bg-slate-800 hover:text-white <?= ($currentPage ?? '') === 'dashboard' ? 'bg-blue-600 text-white font-semibold shadow-md shadow-blue-600/30' : '' ?>">
                <i class="fa-solid fa-chart-pie w-5 text-center"></i>
                <span>Overview</span>
            </a>
            
            <a href="index.php?page=lowongan" class="flex items-center space-x-3 px-4 py-3 rounded-xl transition font-medium hover:bg-slate-800 hover:text-white <?= ($currentPage ?? '') === 'lowongan' ? 'bg-blue-600 text-white font-semibold' : '' ?>">
                <i class="fa-solid fa-briefcase w-5 text-center"></i>
                <span>Kelola Lowongan</span>
            </a>

            <a href="index.php?page=perusahaan" class="flex items-center space-x-3 px-4 py-3 rounded-xl transition font-medium hover:bg-slate-800 hover:text-white <?= ($currentPage ?? '') === 'perusahaan' ? 'bg-blue-600 text-white font-semibold' : '' ?>">
                <i class="fa-solid fa-building w-5 text-center"></i>
                <span>Perusahaan / Mitra</span>
            </a>

            <a href="index.php?page=siswa" class="flex items-center space-x-3 px-4 py-3 rounded-xl transition font-medium hover:bg-slate-800 hover:text-white <?= ($currentPage ?? '') === 'siswa' ? 'bg-blue-600 text-white font-semibold' : '' ?>">
                <i class="fa-solid fa-user-graduate w-5 text-center"></i>
                <span>Data Siswa</span>
            </a>

            <a href="index.php?page=alumni" class="flex items-center space-x-3 px-4 py-3 rounded-xl transition font-medium hover:bg-slate-800 hover:text-white <?= ($currentPage ?? '') === 'alumni' ? 'bg-blue-600 text-white font-semibold' : '' ?>">
                <i class="fa-solid fa-user-tie w-5 text-center"></i>
                <span>Alumni & Tracer</span>
            </a>

            <a href="index.php?page=psikotes" class="flex items-center space-x-3 px-4 py-3 rounded-xl transition font-medium hover:bg-slate-800 hover:text-white <?= ($currentPage ?? '') === 'psikotes' ? 'bg-blue-600 text-white font-semibold' : '' ?>">
                <i class="fa-solid fa-brain w-5 text-center"></i>
                <span>Kelola Psikotes</span>
            </a>

            <a href="index.php?page=mentoring" class="flex items-center space-x-3 px-4 py-3 rounded-xl transition font-medium hover:bg-slate-800 hover:text-white <?= ($currentPage ?? '') === 'mentoring' ? 'bg-blue-600 text-white font-semibold' : '' ?>">
                <i class="fa-solid fa-comments w-5 text-center"></i>
                <span>Monitoring Mentoring</span>
            </a>

            <a href="index.php?page=analitik" class="flex items-center space-x-3 px-4 py-3 rounded-xl transition font-medium hover:bg-slate-800 hover:text-white <?= ($currentPage ?? '') === 'analitik' ? 'bg-blue-600 text-white font-semibold' : '' ?>">
                <i class="fa-solid fa-chart-line w-5 text-center"></i>
                <span>Analitik & Laporan</span>
            </a>
        </nav>
    </div>

    <!-- User Section & Logout -->
    <div class="p-4 border-t border-slate-800">
        <div class="flex items-center justify-between">
            <div class="flex items-center space-x-3">
                <div class="w-9 h-9 rounded-full bg-slate-800 flex items-center justify-center font-bold text-white text-sm">
                    A
                </div>
                <div class="overflow-hidden">
                    <span class="text-sm font-semibold text-white block truncate">Admin BKK</span>
                    <span class="text-xs text-slate-400 block truncate">admin@talenta.test</span>
                </div>
            </div>
            <a href="index.php?page=logout" class="p-2 text-slate-400 hover:text-rose-400 transition" title="Logout">
                <i class="fa-solid fa-arrow-right-from-bracket"></i>
            </a>
        </div>
    </div>
</aside>
