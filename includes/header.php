<?php
require_once __DIR__ . '/auth.php';
$currentPage = basename($_SERVER['SCRIPT_NAME']);
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title><?= isset($pageTitle) ? htmlspecialchars($pageTitle) . ' - ' : '' ?>BatuCam Rental | Sewa Kamera & Lensa Kota Batu</title>

    <!-- Bootswatch Brite (Bootstrap 5) -->
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.8/brite/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap">
    <link rel="stylesheet" href="<?= baseUrl('assets/css/style.css') ?>">
    <link rel="icon" href="<?= baseUrl('assets/img/logo.svg') ?>" type="image/svg+xml">
</head>
<body>

<nav class="navbar navbar-expand-lg navbar-dark sticky-top">
    <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2" href="<?= baseUrl('index.php') ?>">
            <img src="<?= baseUrl('assets/img/logo.svg') ?>" alt="Logo BatuCam" height="34">
            <span>BatuCam <span class="text-brand-accent">Rental</span></span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
            <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
            <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
                <li class="nav-item">
                    <a class="nav-link <?= $currentPage === 'index.php' ? 'active' : '' ?>" href="<?= baseUrl('index.php') ?>">Beranda</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?= baseUrl('produk/list.php') ?>">Katalog Merk</a>
                </li>
                <?php if (isLoggedIn()): ?>
                <li class="nav-item">
                    <a class="nav-link" href="<?= baseUrl('buku/list.php') ?>">Data Booking</a>
                </li>
                <li class="nav-item">
                    <a class="nav-link" href="<?= baseUrl('anggota/list.php') ?>">Data Anggota</a>
                </li>
                <li class="nav-item ms-lg-2">
                    <span class="navbar-text small text-white-50 me-2">
                        <i class="fa-solid fa-circle-user"></i> <?= htmlspecialchars($_SESSION['user']['nama']) ?>
                    </span>
                    <a class="btn btn-sm btn-outline-light" href="<?= baseUrl('logout.php') ?>">Logout</a>
                </li>
                <?php else: ?>
                <li class="nav-item ms-lg-2">
                    <a class="btn btn-brand-accent btn-sm px-3" href="<?= baseUrl('login.php') ?>">
                        <i class="fa-solid fa-right-to-bracket"></i> Login Admin
                    </a>
                </li>
                <?php endif; ?>
            </ul>
        </div>
    </div>
</nav>
