<?php
require_once __DIR__ . '/../includes/auth.php';
requireLogin();

$pageTitle = 'Tambah Anggota';
$errors = $_SESSION['form_errors'] ?? [];
$old = $_SESSION['form_old'] ?? [];
unset($_SESSION['form_errors'], $_SESSION['form_old']);

include __DIR__ . '/../includes/header.php';
?>

<div class="container py-5" style="max-width:680px;">
    <h2 class="section-title mb-1"><i class="fa-solid fa-user-plus text-brand-accent me-2"></i>Tambah Anggota</h2>
    <p class="section-subtitle mb-4">Data pelanggan tetap BatuCam Rental, disimpan ke database PostgreSQL.</p>

    <?php if (!empty($errors)): ?>
    <div class="alert alert-danger">
        <strong>Periksa kembali isian berikut:</strong>
        <ul class="mb-0 mt-1">
            <?php foreach ($errors as $e): ?>
                <li><?= htmlspecialchars($e) ?></li>
            <?php endforeach; ?>
        </ul>
    </div>
    <?php endif; ?>

    <div class="card shadow-sm border-0">
        <div class="card-body p-4">
            <form method="post" action="proses_tambah.php" class="needs-validation" novalidate>
                <div class="row g-3">
                    <div class="col-md-6">
                        <label class="form-label fw-semibold small">Nama Lengkap</label>
                        <input type="text" name="nama" class="form-control" required minlength="3"
                               value="<?= htmlspecialchars($old['nama'] ?? '') ?>">
                        <div class="invalid-feedback">Nama minimal 3 karakter.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold small">No. KTP / Identitas</label>
                        <input type="text" name="no_identitas" class="form-control" required pattern="[0-9]{10,16}"
                               value="<?= htmlspecialchars($old['no_identitas'] ?? '') ?>" placeholder="16 digit NIK">
                        <div class="invalid-feedback">Nomor identitas 10-16 digit angka.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold small">No. WhatsApp</label>
                        <input type="text" name="whatsapp" class="form-control" required pattern="[0-9+\s-]{8,15}"
                               value="<?= htmlspecialchars($old['whatsapp'] ?? '') ?>">
                        <div class="invalid-feedback">Nomor WhatsApp tidak valid.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold small">Email</label>
                        <input type="email" name="email" class="form-control" required
                               value="<?= htmlspecialchars($old['email'] ?? '') ?>">
                        <div class="invalid-feedback">Email tidak valid.</div>
                    </div>
                    <div class="col-12">
                        <label class="form-label fw-semibold small">Alamat</label>
                        <textarea name="alamat" class="form-control" rows="2" required minlength="8"><?= htmlspecialchars($old['alamat'] ?? '') ?></textarea>
                        <div class="invalid-feedback">Alamat minimal 8 karakter.</div>
                    </div>
                </div>

                <div class="d-flex gap-2 mt-4">
                    <button type="submit" class="btn btn-brand-accent px-4"><i class="fa-solid fa-check me-1"></i>Simpan Anggota</button>
                    <a href="list.php" class="btn btn-outline-dark px-4">Batal</a>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
