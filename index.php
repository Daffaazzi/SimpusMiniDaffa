<?php
require_once __DIR__ . '/includes/auth.php';
require_once __DIR__ . '/includes/data_merk.php';

$pageTitle = 'Beranda';
$merkList = daftarMerk();
$pesanSukses = flash('sukses');
include __DIR__ . '/includes/header.php';
?>

<?php if ($pesanSukses): ?>
<div class="container mt-3">
    <div class="alert alert-success alert-dismissible fade show auto-dismiss" role="alert">
        <i class="fa-solid fa-circle-check me-1"></i><?= htmlspecialchars($pesanSukses) ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
</div>
<?php endif; ?>

<!-- HERO -->
<section class="hero-section">
    <div class="container">
        <span class="badge hero-badge text-white px-3 py-2 rounded-pill mb-3">
            <i class="fa-solid fa-location-dot me-1"></i> Kota Batu, Jawa Timur
        </span>
        <h1 class="mb-3">Sewa Kamera &amp; Lensa<br>di Kota Batu</h1>
        <p class="lead mb-4">
            Abadikan momen terbaikmu di antara pegunungan Kota Batu. Tersedia 14 merk kamera &amp; lensa
            DSLR, mirrorless, hingga aksi — siap disewa harian dengan proses cepat &amp; mudah.
        </p>
        <div class="d-flex flex-wrap gap-3">
            <a href="produk/list.php" class="btn btn-brand-accent btn-lg px-4">
                <i class="fa-solid fa-camera me-1"></i> Lihat Katalog Merk
            </a>
            <a href="<?= isLoggedIn() ? 'buku/tambah.php' : 'login.php' ?>" class="btn btn-outline-light btn-lg px-4">
                <i class="fa-solid fa-calendar-check me-1"></i> Booking Sekarang
            </a>
        </div>
    </div>
</section>

<!-- STATISTIK SINGKAT -->
<section class="container py-5">
    <div class="row g-4 text-center">
        <div class="col-6 col-md-3">
            <h3 class="fw-800 text-brand-accent mb-0"><?= count($merkList) ?></h3>
            <p class="section-subtitle small mb-0">Merk Kamera &amp; Lensa</p>
        </div>
        <div class="col-6 col-md-3">
            <h3 class="fw-800 text-brand-accent mb-0">50+</h3>
            <p class="section-subtitle small mb-0">Unit Siap Sewa</p>
        </div>
        <div class="col-6 col-md-3">
            <h3 class="fw-800 text-brand-accent mb-0">1.200+</h3>
            <p class="section-subtitle small mb-0">Transaksi Selesai</p>
        </div>
        <div class="col-6 col-md-3">
            <h3 class="fw-800 text-brand-accent mb-0">4.9/5</h3>
            <p class="section-subtitle small mb-0">Rating Pelanggan</p>
        </div>
    </div>
</section>

<!-- CARA SEWA -->
<section class="container py-4">
    <h2 class="section-title text-center mb-2">Cara Sewa</h2>
    <p class="section-subtitle text-center mb-5">Tiga langkah mudah untuk membawa pulang kamera impianmu</p>
    <div class="row g-4">
        <div class="col-md-4">
            <div class="d-flex gap-3">
                <div class="step-icon flex-shrink-0"><i class="fa-solid fa-list-check"></i></div>
                <div>
                    <h5 class="fw-bold">1. Pilih Merk</h5>
                    <p class="text-muted small mb-0">Jelajahi katalog 14 merk kamera &amp; lensa sesuai kebutuhanmu.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="d-flex gap-3">
                <div class="step-icon flex-shrink-0"><i class="fa-solid fa-file-signature"></i></div>
                <div>
                    <h5 class="fw-bold">2. Booking</h5>
                    <p class="text-muted small mb-0">Isi formulir booking dengan tanggal sewa &amp; data dirimu.</p>
                </div>
            </div>
        </div>
        <div class="col-md-4">
            <div class="d-flex gap-3">
                <div class="step-icon flex-shrink-0"><i class="fa-solid fa-camera-retro"></i></div>
                <div>
                    <h5 class="fw-bold">3. Ambil &amp; Motret</h5>
                    <p class="text-muted small mb-0">Ambil unit di toko kami dan mulai abadikan momenmu.</p>
                </div>
            </div>
        </div>
    </div>
</section>

<!-- PREVIEW KATALOG -->
<section class="container py-5">
    <div class="d-flex justify-content-between align-items-end mb-4 flex-wrap gap-2">
        <div>
            <h2 class="section-title mb-1">Merk Tersedia</h2>
            <p class="section-subtitle mb-0">14 pilihan merk kamera &amp; lensa siap disewa</p>
        </div>
        <a href="produk/list.php" class="btn btn-outline-dark btn-sm">Lihat Semua <i class="fa-solid fa-arrow-right ms-1"></i></a>
    </div>
    <div class="row g-4">
        <?php foreach (array_slice($merkList, 0, 8) as $m): ?>
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card brand-card">
                <img src="assets/img/brands/<?= $m['slug'] ?>.svg" alt="<?= htmlspecialchars($m['nama']) ?>">
                <div class="card-body">
                    <span class="badge bg-secondary-subtle text-secondary-emphasis mb-2"><?= $m['kategori'] ?></span>
                    <h6 class="fw-bold mb-1"><?= htmlspecialchars($m['nama']) ?></h6>
                    <p class="small text-muted mb-2"><?= htmlspecialchars($m['tipe']) ?></p>
                    <p class="fw-bold text-brand-accent mb-0"><?= formatRupiah($m['harga']) ?> <span class="fw-normal text-muted small">/hari</span></p>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</section>

<?php include __DIR__ . '/includes/footer.php'; ?>
