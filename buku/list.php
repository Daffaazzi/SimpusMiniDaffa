<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/data_merk.php';
requireLogin();

$pageTitle = 'Data Booking';
$pesanSukses = flash('sukses');
$isBaru = isset($_GET['baru']);

// Hapus data (opsional, by id)
if (isset($_GET['hapus']) && !empty($_SESSION['booking_list'])) {
    $idHapus = $_GET['hapus'];
    $_SESSION['booking_list'] = array_values(array_filter(
        $_SESSION['booking_list'],
        fn($b) => $b['id'] !== $idHapus
    ));
    flash('sukses', 'Data booking berhasil dihapus.');
    header('Location: list.php');
    exit;
}

$bookingList = $_SESSION['booking_list'] ?? [];
// urutkan terbaru di atas
$bookingList = array_reverse($bookingList);

include __DIR__ . '/../includes/header.php';
?>

<div class="container py-5">
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
            <h2 class="section-title mb-1"><i class="fa-solid fa-calendar-days text-brand-accent me-2"></i>Data Booking Sewa</h2>
            <p class="section-subtitle mb-0">Data dirender langsung dari <code>$_SESSION</code> — tidak memakai fetch/JSON.</p>
        </div>
        <a href="tambah.php" class="btn btn-brand-accent"><i class="fa-solid fa-plus me-1"></i> Tambah Booking</a>
    </div>

    <?php if ($pesanSukses): ?>
    <div class="alert alert-success alert-dismissible fade show auto-dismiss">
        <i class="fa-solid fa-circle-check me-1"></i><?= htmlspecialchars($pesanSukses) ?>
        <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>
    <?php endif; ?>

    <div class="card border-0 shadow-sm">
        <div class="table-responsive">
            <table class="table table-hover align-middle mb-0">
                <thead>
                    <tr>
                        <th>#</th>
                        <th>Penyewa</th>
                        <th>WhatsApp</th>
                        <th>Merk</th>
                        <th>Unit</th>
                        <th>Periode Sewa</th>
                        <th>Total</th>
                        <th>Status</th>
                        <th class="text-end">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($bookingList)): ?>
                        <tr>
                            <td colspan="9" class="text-center text-muted py-5">
                                <i class="fa-solid fa-inbox fs-3 d-block mb-2"></i>
                                Belum ada data booking. Klik "Tambah Booking" untuk mulai.
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($bookingList as $i => $b): ?>
                        <tr <?= ($isBaru && $i === 0) ? 'data-baru="1"' : '' ?>>
                            <td><?= $i + 1 ?></td>
                            <td class="fw-semibold"><?= htmlspecialchars($b['nama_penyewa']) ?></td>
                            <td><?= htmlspecialchars($b['whatsapp']) ?></td>
                            <td><?= htmlspecialchars($b['merk_nama']) ?></td>
                            <td><?= (int) $b['jumlah_unit'] ?> unit</td>
                            <td class="small">
                                <?= date('d M Y', strtotime($b['tgl_mulai'])) ?> &ndash;
                                <?= date('d M Y', strtotime($b['tgl_selesai'])) ?>
                                <span class="text-muted">(<?= $b['lama_hari'] ?> hari)</span>
                            </td>
                            <td class="fw-bold text-brand-accent"><?= formatRupiah($b['total_harga']) ?></td>
                            <td><span class="badge badge-status-baru text-dark"><?= htmlspecialchars($b['status']) ?></span></td>
                            <td class="text-end">
                                <a href="list.php?hapus=<?= urlencode($b['id']) ?>"
                                   class="btn btn-sm btn-outline-danger btn-hapus-konfirmasi">
                                    <i class="fa-solid fa-trash"></i>
                                </a>
                            </td>
                        </tr>
                        <?php endforeach; ?>
                    <?php endif; ?>
                </tbody>
            </table>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
