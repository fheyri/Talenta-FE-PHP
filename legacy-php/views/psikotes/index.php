<main class="flex-1 flex flex-col overflow-hidden">
    <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
        <h1 class="text-xl font-bold text-slate-800">Kelola Tes Psikotes & Bank Soal</h1>
        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition">
            + Buat Tes Baru
        </button>
    </header>
    <div class="flex-1 overflow-y-auto p-8">
        <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 text-slate-500 font-semibold border-b">
                    <tr>
                        <th class="py-3 px-4">Nama Modul Tes</th>
                        <th class="py-3 px-4">Jumlah Pertanyaan</th>
                        <th class="py-3 px-4">Durasi Waktu</th>
                        <th class="py-3 px-4">Biaya Token</th>
                        <th class="py-3 px-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr>
                        <td class="py-3.5 px-4 font-semibold text-slate-800">Tes Minat Bakat RIASEC</td>
                        <td class="py-3.5 px-4">60 Soal Pilihan Ganda</td>
                        <td class="py-3.5 px-4">120 Menit</td>
                        <td class="py-3.5 px-4"><span class="px-2 py-0.5 bg-emerald-50 text-emerald-700 rounded text-xs font-semibold">3x Gratis, lalu 3 Token</span></td>
                        <td class="py-3.5 px-4 text-right space-x-2">
                            <button class="text-blue-600 hover:underline">Kelola Soal</button>
                            <button class="text-slate-600 hover:underline">Hasil Peserta</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</main>
