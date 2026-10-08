<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/data_merk.php';
requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: tambah.php');
    exit;
}

// Ambil & bersihkan input
$nama_penyewa = trim($_POST['nama_penyewa'] ?? '');
$whatsapp     = trim($_POST['whatsapp'] ?? '');
$merk         = trim($_POST['merk'] ?? '');
$jumlah_unit  = (int) ($_POST['jumlah_unit'] ?? 0);
$tgl_mulai    = trim($_POST['tgl_mulai'] ?? '');
$tgl_selesai  = trim($_POST['tgl_selesai'] ?? '');
$catatan      = trim($_POST['catatan'] ?? '');

$old = compact('nama_penyewa', 'whatsapp', 'merk', 'jumlah_unit', 'tgl_mulai', 'tgl_selesai', 'catatan');

// ===== VALIDASI SERVER =====
$errors = [];

if (mb_strlen($nama_penyewa) < 3) {
    $errors[] = 'Nama penyewa minimal 3 karakter.';
}
if (!preg_match('/^[0-9+\s-]{8,15}$/', $whatsapp)) {
    $errors[] = 'Nomor WhatsApp tidak valid.';
}
$merkData = cariMerk($merk);
if (!$merkData) {
    $errors[] = 'Merk yang dipilih tidak valid.';
}
if ($jumlah_unit < 1 || $jumlah_unit > 10) {
    $errors[] = 'Jumlah unit harus antara 1 sampai 10.';
}
$mulaiTs   = strtotime($tgl_mulai);
$selesaiTs = strtotime($tgl_selesai);
if (!$tgl_mulai || $mulaiTs === false) {
    $errors[] = 'Tanggal mulai wajib diisi dengan benar.';
} elseif ($mulaiTs < strtotime(date('Y-m-d'))) {
    $errors[] = 'Tanggal mulai tidak boleh sebelum hari ini.';
}
if (!$tgl_selesai || $selesaiTs === false) {
    $errors[] = 'Tanggal selesai wajib diisi dengan benar.';
} elseif ($mulaiTs !== false && $selesaiTs < $mulaiTs) {
    $errors[] = 'Tanggal selesai tidak boleh sebelum tanggal mulai.';
}

if (!empty($errors)) {
    $_SESSION['form_errors'] = $errors;
    $_SESSION['form_old'] = $old;
    header('Location: tambah.php');
    exit;
}

// ===== SIMPAN KE $_SESSION =====
if (!isset($_SESSION['booking_list']) || !is_array($_SESSION['booking_list'])) {
    $_SESSION['booking_list'] = [];
}

$lamaHari = max(1, round(($selesaiTs - $mulaiTs) / 86400) + 1);
$totalHarga = $lamaHari * $jumlah_unit * $merkData['harga'];

$_SESSION['booking_list'][] = [
    'id'            => uniqid('bk_'),
    'nama_penyewa'  => $nama_penyewa,
    'whatsapp'      => $whatsapp,
    'merk_slug'     => $merkData['slug'],
    'merk_nama'     => $merkData['nama'],
    'jumlah_unit'   => $jumlah_unit,
    'tgl_mulai'     => $tgl_mulai,
    'tgl_selesai'   => $tgl_selesai,
    'lama_hari'     => $lamaHari,
    'total_harga'   => $totalHarga,
    'catatan'       => $catatan,
    'status'        => 'Baru',
    'dibuat_pada'   => date('Y-m-d H:i:s'),
];

flash('sukses', 'Booking untuk ' . $nama_penyewa . ' berhasil disimpan.');
header('Location: list.php?baru=1');
exit;
