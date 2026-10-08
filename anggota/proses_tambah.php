<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/koneksi.php';
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

// Cek duplikasi nomor identitas di database
if (empty($errors)) {
    $cek = $pdo->prepare('SELECT COUNT(*) FROM anggota WHERE no_identitas = :no');
    $cek->execute([':no' => $no_identitas]);
    if ((int) $cek->fetchColumn() > 0) {
        $errors[] = 'Nomor identitas sudah terdaftar sebagai anggota.';
    }
}

if (!empty($errors)) {
    $_SESSION['form_errors'] = $errors;
    $_SESSION['form_old'] = $old;
    header('Location: tambah.php');
    exit;
}

// ===== SIMPAN KE DATABASE (prepared statement) =====
try {
    $stmt = $pdo->prepare(
        'INSERT INTO anggota (nama, no_identitas, whatsapp, email, alamat)
         VALUES (:nama, :no_identitas, :whatsapp, :email, :alamat)'
    );
    $stmt->execute([
        ':nama'         => $nama,
        ':no_identitas' => $no_identitas,
        ':whatsapp'     => $whatsapp,
        ':email'        => $email,
        ':alamat'       => $alamat,
    ]);
} catch (PDOException $e) {
    // 23505 = unique_violation (jaga-jaga kalau dua request masuk bersamaan)
    $pesan = ($e->getCode() === '23505')
        ? 'Nomor identitas sudah terdaftar sebagai anggota.'
        : 'Gagal menyimpan ke database: ' . $e->getMessage();
    $_SESSION['form_errors'] = [$pesan];
    $_SESSION['form_old'] = $old;
    header('Location: tambah.php');
    exit;
}

flash('sukses', 'Anggota ' . $nama . ' berhasil ditambahkan.');
header('Location: list.php?baru=1');
exit;
