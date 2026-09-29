<main class="flex-1 flex flex-col overflow-hidden">
    <header class="h-16 bg-white border-b border-slate-200 flex items-center justify-between px-8">
        <h1 class="text-xl font-bold text-slate-800">Kelola Perusahaan Mitra</h1>
        <button class="px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white font-semibold text-sm rounded-xl transition">
            + Tambah Perusahaan
        </button>
    </header>
    <div class="flex-1 overflow-y-auto p-8">
        <div class="bg-white rounded-2xl border border-slate-200/80 p-6 shadow-sm">
            <table class="w-full text-left text-sm">
                <thead class="bg-slate-50 text-slate-500 font-semibold border-b">
                    <tr>
                        <th class="py-3 px-4">Nama Perusahaan</th>
                        <th class="py-3 px-4">Alamat & Lokasi</th>
                        <th class="py-3 px-4">Kontak / Email</th>
                        <th class="py-3 px-4">Website</th>
                        <th class="py-3 px-4 text-right">Aksi</th>
                    </tr>
                </thead>
                <tbody class="divide-y divide-slate-100">
                    <tr>
                        <td class="py-3.5 px-4 font-semibold text-slate-800">PT Telkom Indonesia</td>
                        <td class="py-3.5 px-4 text-slate-600">Jakarta Selatan</td>
                        <td class="py-3.5 px-4 text-slate-500">recruitment@telkom.co.id</td>
                        <td class="py-3.5 px-4 text-blue-600">telkom.co.id</td>
                        <td class="py-3.5 px-4 text-right space-x-2">
                            <button class="text-blue-600 hover:underline">Edit</button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
</main>
