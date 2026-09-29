<?php

require_once __DIR__ . '/config.php';
require_once __DIR__ . '/app/ApiService.php';

$page = $_GET['page'] ?? 'dashboard';

// Handle Logout
if ($page === 'logout') {
    if (!empty($_SESSION['auth_token'])) {
        ApiService::post('/auth/logout');
    }
    session_destroy();
    header('Location: index.php?page=login');
    exit;
}

// Handle Login POST
$errorMessage = null;
if ($page === 'login' && $_SERVER['REQUEST_METHOD'] === 'POST') {
    $email = trim($_POST['email'] ?? '');
    $password = $_POST['password'] ?? '';

    // Panggil API admin login ke Laravel
    $res = ApiService::post('/admin/auth/login', [
        'email' => $email,
        'password' => $password,
    ]);

    if ($res['status'] === 200 && !empty($res['data']['token'])) {
        $_SESSION['auth_token'] = $res['data']['token'];
        $_SESSION['user'] = $res['data']['user'];
        header('Location: index.php?page=dashboard');
        exit;
    } else {
        $errorMessage = $res['data']['message'] ?? 'Login gagal. Periksa kembali email dan kata sandi.';
    }
}

// Check session (Kecuali halaman login)
if ($page !== 'login' && empty($_SESSION['auth_token'])) {
    // Untuk kemudahan dev saat ini, izinkan melihat dashboard atau arahkan ke login jika mau
    // header('Location: index.php?page=login');
    // exit;
}

// Render Page
if ($page === 'login') {
    require_once __DIR__ . '/views/auth/login.php';
    exit;
}

// Layout dengan Header dan Sidebar
$currentPage = $page;
$pageTitle = ucfirst($page);

require_once __DIR__ . '/views/layouts/header.php';
require_once __DIR__ . '/views/layouts/sidebar.php';

switch ($page) {
    case 'lowongan':
        require_once __DIR__ . '/views/lowongan/index.php';
        break;
    case 'perusahaan':
        require_once __DIR__ . '/views/perusahaan/index.php';
        break;
    case 'siswa':
        require_once __DIR__ . '/views/siswa/index.php';
        break;
    case 'alumni':
        require_once __DIR__ . '/views/alumni/index.php';
        break;
    case 'psikotes':
        require_once __DIR__ . '/views/psikotes/index.php';
        break;
    case 'mentoring':
        require_once __DIR__ . '/views/mentoring/index.php';
        break;
    case 'analitik':
        require_once __DIR__ . '/views/analitik/index.php';
        break;
    case 'dashboard':
    default:
        require_once __DIR__ . '/views/dashboard/index.php';
        break;
}

require_once __DIR__ . '/views/layouts/footer.php';
