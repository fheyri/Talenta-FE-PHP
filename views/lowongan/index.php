<main class="flex-1 flex flex-col overflow-hidden">
    <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
        <h1 class="text-xl font-bold text-slate-800">Kelola Lowongan Kerja & Magang</h1>
        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition">
            + Tambah Lowongan
        </button>
    </header>
    <div class="flex-1 overflow-y-auto p-8">
        <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <div class="flex items-center justify-between mb-4">
                <input type="text" placeholder="Cari posisi atau nama perusahaan..." class="px-4 py-2 border rounded-xl w-72 text-sm">
                <div class="space-x-2">
                    <button class="px-3 py-1.5 border rounded-lg text-sm">Semua</button>
                    <button class="px-3 py-1.5 border rounded-lg text-sm bg-blue-50 text-blue-600 font-semibold">Aktif</button>
                    <button class="px-3 py-1.5 border rounded-lg text-sm">Expired</button>
                </div>
            </div>
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 text-slate-500 font-semibold border-b">
                    <tr>
                        <th class="py-3 px-4">Posisi</th>
                        <th class="py-3 px-4">Perusahaan</th>
                        <th class="py-3 px-4">Deadline</th>
                        <th class="py-3 px-4">Status</th>
                        <th class="py-3 px-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr>
                        <td class="py-3.5 px-4 font-semibold text-slate-800">Junior Web Developer</td>
                        <td class="py-3.5 px-4 text-slate-600">PT Solu Digital</td>
                        <td class="py-3.5 px-4 text-slate-500">30 Okt 2026</td>
                        <td class="py-3.5 px-4"><span class="px-2.5 py-1 text-xs font-semibold rounded-full bg-emerald-100 text-emerald-800">Aktif</span></td>
                        <td class="py-3.5 px-4 text-right space-x-2">
                            <button class="text-blue-600 hover:underline">Edit</button>
                            <button class="text-rose-600 hover:underline">Hapus</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</main>
