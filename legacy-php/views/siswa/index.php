<main class="flex-1 flex flex-col overflow-hidden">
    <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
        <h1 class="text-xl font-bold text-slate-800">Data Siswa & Kompetensi</h1>
    </header>
    <div class="flex-1 overflow-y-auto p-8">
        <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <input type="text" placeholder="Cari nama siswa, NISN, atau jurusan..." class="px-4 py-2 border rounded-xl w-80 text-sm">
            </div>
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 text-slate-500 font-semibold border-b">
                    <tr>
                        <th class="py-3 px-4">Nama Siswa</th>
                        <th class="py-3 px-4">Jurusan & Kelas</th>
                        <th class="py-3 px-4">Skills Utama</th>
                        <th class="py-3 px-4">Hasil Psikotes</th>
                        <th class="py-3 px-4 text-right">Detail</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr>
                        <td class="py-3.5 px-4 font-semibold text-slate-800">Ahmad Budi</td>
                        <td class="py-3.5 px-4 text-slate-600">RPL - XII A</td>
                        <td class="py-3.5 px-4"><span class="px-2 py-0.5 bg-blue-50 text-blue-700 rounded text-xs">PHP, Flutter</span></td>
                        <td class="py-3.5 px-4 text-emerald-600 font-semibold">Skor: 88 (Siap Kerja)</td>
                        <td class="py-3.5 px-4 text-right">
                            <button class="text-blue-600 hover:underline">Lihat Profil</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</main>
