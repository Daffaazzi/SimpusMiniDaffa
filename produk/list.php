<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/data_merk.php';

$pageTitle = 'Katalog Merk';
$merkList = daftarMerk();
$filter = $_GET['kategori'] ?? 'Semua';

include __DIR__ . '/../includes/header.php';
?>

<section class="hero-section" style="min-height:34vh;">
    <div class="container">
        <span class="badge hero-badge text-white px-3 py-2 rounded-pill mb-3">
            <i class="fa-solid fa-camera me-1"></i> Katalog
        </span>
        <h1 class="mb-2" style="font-size:clamp(1.8rem,4vw,2.6rem);">Katalog Merk Kamera &amp; Lensa</h1>
        <p class="lead mb-0">14 merk pilihan, tersedia untuk disewa harian di Kota Batu.</p>
    </div>
</section>

<div class="container py-5">

    <!-- FILTER KATEGORI -->
    <div class="d-flex flex-wrap gap-2 mb-4">
        <a href="?kategori=Semua" class="btn btn-sm <?= $filter === 'Semua' ? 'btn-brand-accent' : 'btn-outline-dark' ?>">Semua</a>
        <a href="?kategori=Kamera" class="btn btn-sm <?= $filter === 'Kamera' ? 'btn-brand-accent' : 'btn-outline-dark' ?>">Body Kamera</a>
        <a href="?kategori=Lensa" class="btn btn-sm <?= $filter === 'Lensa' ? 'btn-brand-accent' : 'btn-outline-dark' ?>">Lensa</a>
    </div>

    <div class="row g-4">
        <?php foreach ($merkList as $m):
            if ($filter !== 'Semua' && $m['kategori'] !== $filter) continue;
        ?>
        <div class="col-6 col-md-4 col-lg-3">
            <div class="card brand-card">
                <img src="../assets/img/brands/<?= $m['slug'] ?>.svg" alt="<?= htmlspecialchars($m['nama']) ?>">
                <div class="card-body d-flex flex-column">
                    <span class="badge bg-secondary-subtle text-secondary-emphasis mb-2 align-self-start"><?= $m['kategori'] ?></span>
                    <h6 class="fw-bold mb-1"><?= htmlspecialchars($m['nama']) ?></h6>
                    <p class="small text-muted mb-2 flex-grow-1"><?= htmlspecialchars($m['tipe']) ?></p>
                    <p class="fw-bold text-brand-accent mb-3"><?= formatRupiah($m['harga']) ?> <span class="fw-normal text-muted small">/hari</span></p>
                    <a href="<?= isLoggedIn() ? '../buku/tambah.php?merk=' . urlencode($m['slug']) : '../login.php' ?>"
                       class="btn btn-brand-accent btn-sm w-100">
                        <i class="fa-solid fa-cart-plus me-1"></i> Sewa Sekarang
                    </a>
                </div>
            </div>
        </div>
        <?php endforeach; ?>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
