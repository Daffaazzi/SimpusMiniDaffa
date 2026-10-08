<?php
/**
 * includes/koneksi.php
 * Koneksi PDO ke PostgreSQL. Di-include oleh semua halaman yang butuh database.
 * Hasilnya variabel $pdo yang siap dipakai untuk query.
 *
 * Sesuaikan $pass dengan password user postgres yang dibuat saat install PostgreSQL.
 */
$host = 'localhost';
$port = '5432';
$db   = 'simpus_mini';
$user = 'postgres';
$pass = '12345678';

try {
    $pdo = new PDO(
        "pgsql:host=$host;port=$port;dbname=$db",
        $user,
        $pass,
        [
            PDO::ATTR_ERRMODE            => PDO::ERRMODE_EXCEPTION,
            PDO::ATTR_DEFAULT_FETCH_MODE => PDO::FETCH_ASSOC,
            PDO::ATTR_EMULATE_PREPARES   => false,
        ]
    );
} catch (PDOException $e) {
    http_response_code(500);
    die('Koneksi database gagal: ' . htmlspecialchars($e->getMessage())
        . '<br>Periksa host, port, nama database, user, dan password di includes/koneksi.php.');
}
