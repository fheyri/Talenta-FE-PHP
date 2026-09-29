<?php
// Konfigurasi dasar Talenta-FE-PHP
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

define('API_BASE_URL', getenv('API_BASE_URL') ?: 'http://127.0.0.1:8000/api/v1');
define('APP_NAME', 'TALENTA - BKK & Admin Portal');
