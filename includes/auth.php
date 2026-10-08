<?php
/**
 * includes/auth.php
 * Helper session & autentikasi sederhana untuk area admin (Booking & Anggota).
 * Data akun disimpan hardcode untuk keperluan jobsheet (bukan produksi).
 */
if (session_status() === PHP_SESSION_NONE) {
    session_start();
}

// Akun demo
$GLOBALS['AKUN_ADMIN'] = [
    'username' => 'admin',
    'password' => 'batu2026', // demo only
    'nama'     => 'Admin BatuCam',
];

function isLoggedIn() {
    return isset($_SESSION['user']) && !empty($_SESSION['user']['username']);
}

function requireLogin() {
    if (!isLoggedIn()) {
        header('Location: ' . baseUrl('login.php'));
        exit;
    }
}

/**
 * Mengembalikan path relatif menuju root project (jobsheet-08/)
 * supaya link tetap benar walau file dipanggil dari sub-folder (buku/, anggota/, produk/).
 */
function baseUrl($path = '') {
    // Deteksi kedalaman folder berdasarkan SCRIPT_NAME
    $script = $_SERVER['SCRIPT_NAME'] ?? '';
    $inSubfolder = (strpos($script, '/buku/') !== false)
        || (strpos($script, '/anggota/') !== false)
        || (strpos($script, '/produk/') !== false);
    $prefix = $inSubfolder ? '../' : '';
    return $prefix . $path;
}

function flash($key, $message = null) {
    if ($message !== null) {
        $_SESSION['flash'][$key] = $message;
        return;
    }
    if (!empty($_SESSION['flash'][$key])) {
        $msg = $_SESSION['flash'][$key];
        unset($_SESSION['flash'][$key]);
        return $msg;
    }
    return null;
}
