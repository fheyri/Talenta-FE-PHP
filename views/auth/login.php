<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Login - TALENTA BKK & Admin</title>
    <script src="https://cdn.tailwindcss.com"></script>
    <link href="https://fonts.googleapis.com/css2?family=Plus+Jakarta+Sans:wght@400;500;600;700&display=swap" rel="stylesheet">
    <style>body { font-family: 'Plus Jakarta Sans', sans-serif; }</style>
</head>
<body class="bg-slate-900 min-h-screen flex items-center justify-center p-4">
    <div class="max-w-md w-full bg-white rounded-3xl p-8 shadow-2xl">
        <div class="text-center mb-8">
            <div class="w-16 h-16 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white text-2xl font-bold shadow-lg shadow-blue-500/30 mb-4">
                🎓
            </div>
            <h1 class="text-2xl font-bold text-slate-900">Portal BKK & Admin</h1>
            <p class="text-slate-500 text-sm mt-1">Masuk untuk mengelola data siswa, alumni, dan lowongan TALENTA.</p>
        </div>

        <?php if (!empty($errorMessage)): ?>
            <div class="mb-5 p-4 rounded-xl bg-rose-50 border border-rose-200 text-rose-700 text-sm flex items-center">
                <span class="mr-2 font-bold">Error:</span> <?= htmlspecialchars($errorMessage) ?>
            </div>
        <?php endif; ?>

        <form action="index.php?page=login" method="POST" class="space-y-5">
            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">E-mail Admin</label>
                <input type="email" name="email" required placeholder="admin@talenta.test" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition">
            </div>

            <div>
                <label class="block text-sm font-semibold text-slate-700 mb-2">Kata Sandi</label>
                <input type="password" name="password" required placeholder="••••••••" class="w-full px-4 py-3 rounded-xl border border-slate-200 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent transition">
            </div>

            <button type="submit" class="w-full py-3.5 px-4 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-xl shadow-lg shadow-blue-600/30 transition duration-200">
                Masuk ke Dashboard
            </button>
        </form>

        <p class="text-center text-xs text-slate-400 mt-8">
            &copy; <?= date('Y') ?> TALENTA Career Ecosystem.
        </p>
    </div>
</body>
</html>
