<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/koneksi.php';
requireLogin();

$pageTitle = 'Data Anggota';
$pesanSukses = flash('sukses');
$isBaru = isset($_GET['baru']);

if (isset($_GET['hapus'])) {
    $idHapus = (int) $_GET['hapus'];
    if ($idHapus > 0) {
        $stmt = $pdo->prepare('DELETE FROM anggota WHERE id = :id');
        $stmt->execute([':id' => $idHapus]);
        flash('sukses', 'Data anggota berhasil dihapus.');
    }
    header('Location: list.php');
    exit;
}

$anggotaList = $pdo->query('SELECT * FROM anggota ORDER BY id DESC')->fetchAll();

include __DIR__ . '/../includes/header.php';
?>

<div class="container py-5">
    <div class="d-flex justify-content-between align-items-center flex-wrap gap-2 mb-4">
        <div>
            <h2 class="section-title mb-1"><i class="fa-solid fa-users text-brand-accent me-2"></i>Data Anggota</h2>
            <p class="section-subtitle mb-0">Data diambil dari tabel <code>anggota</code> di PostgreSQL.</p>
        </div>
        <a href="tambah.php" class="btn btn-brand-accent"><i class="fa-solid fa-user-plus me-1"></i> Tambah Anggota</a>
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
                        <th>Nama</th>
                        <th>No. Identitas</th>
                        <th>WhatsApp</th>
                        <th>Email</th>
                        <th>Alamat</th>
                        <th class="text-end">Aksi</th>
                    </tr>
                </thead>
                <tbody>
                    <?php if (empty($anggotaList)): ?>
                        <tr>
                            <td colspan="7" class="text-center text-muted py-5">
                                <i class="fa-solid fa-user-slash fs-3 d-block mb-2"></i>
                                Belum ada data anggota. Klik "Tambah Anggota" untuk mulai.
                            </td>
                        </tr>
                    <?php else: ?>
                        <?php foreach ($anggotaList as $i => $a): ?>
                        <tr <?= ($isBaru && $i === 0) ? 'data-baru="1"' : '' ?>>
                            <td><?= $i + 1 ?></td>
                            <td class="fw-semibold"><?= htmlspecialchars($a['nama']) ?></td>
                            <td><?= htmlspecialchars($a['no_identitas']) ?></td>
                            <td><?= htmlspecialchars($a['whatsapp']) ?></td>
                            <td><?= htmlspecialchars($a['email']) ?></td>
                            <td class="small"><?= htmlspecialchars($a['alamat']) ?></td>
                            <td class="text-end">
                                <a href="list.php?hapus=<?= (int) $a['id'] ?>"
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
