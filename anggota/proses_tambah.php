<?php
require_once __DIR__ . '/../includes/auth.php';
requireLogin();

if ($_SERVER['REQUEST_METHOD'] !== 'POST') {
    header('Location: tambah.php');
    exit;
}

$nama         = trim($_POST['nama'] ?? '');
$no_identitas = trim($_POST['no_identitas'] ?? '');
$whatsapp     = trim($_POST['whatsapp'] ?? '');
$email        = trim($_POST['email'] ?? '');
$alamat       = trim($_POST['alamat'] ?? '');

$old = compact('nama', 'no_identitas', 'whatsapp', 'email', 'alamat');

// ===== VALIDASI SERVER =====
$errors = [];

if (mb_strlen($nama) < 3) {
    $errors[] = 'Nama minimal 3 karakter.';
}
if (!preg_match('/^[0-9]{10,16}$/', $no_identitas)) {
    $errors[] = 'Nomor identitas harus 10-16 digit angka.';
}
if (!preg_match('/^[0-9+\s-]{8,15}$/', $whatsapp)) {
    $errors[] = 'Nomor WhatsApp tidak valid.';
}
if (!filter_var($email, FILTER_VALIDATE_EMAIL)) {
    $errors[] = 'Format email tidak valid.';
}
if (mb_strlen($alamat) < 8) {
    $errors[] = 'Alamat minimal 8 karakter.';
}

// Cek duplikasi nomor identitas
if (empty($errors) && !empty($_SESSION['anggota_list'])) {
    foreach ($_SESSION['anggota_list'] as $a) {
        if ($a['no_identitas'] === $no_identitas) {
            $errors[] = 'Nomor identitas sudah terdaftar sebagai anggota.';
            break;
        }
    }
}

if (!empty($errors)) {
    $_SESSION['form_errors'] = $errors;
    $_SESSION['form_old'] = $old;
    header('Location: tambah.php');
    exit;
}

// ===== SIMPAN KE $_SESSION =====
if (!isset($_SESSION['anggota_list']) || !is_array($_SESSION['anggota_list'])) {
    $_SESSION['anggota_list'] = [];
}

$_SESSION['anggota_list'][] = [
    'id'           => uniqid('ag_'),
    'nama'         => $nama,
    'no_identitas' => $no_identitas,
    'whatsapp'     => $whatsapp,
    'email'        => $email,
    'alamat'       => $alamat,
    'dibuat_pada'  => date('Y-m-d H:i:s'),
];

flash('sukses', 'Anggota ' . $nama . ' berhasil ditambahkan.');
header('Location: list.php?baru=1');
exit;
