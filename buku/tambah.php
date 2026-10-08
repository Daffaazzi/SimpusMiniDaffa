<?php
require_once __DIR__ . '/../includes/auth.php';
require_once __DIR__ . '/../includes/data_merk.php';
requireLogin();

$pageTitle = 'Tambah Booking';
$merkList = daftarMerk();
$merkTerpilih = $_GET['merk'] ?? '';
$errors = $_SESSION['form_errors'] ?? [];
$old = $_SESSION['form_old'] ?? [];
unset($_SESSION['form_errors'], $_SESSION['form_old']);

include __DIR__ . '/../includes/header.php';
?>

<div class="container py-5" style="max-width:760px;">
    <h2 class="section-title mb-1"><i class="fa-solid fa-calendar-plus text-brand-accent me-2"></i>Tambah Booking Sewa</h2>
    <p class="section-subtitle mb-4">Form ini divalidasi di server &amp; disimpan ke database PostgreSQL.</p>

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
                        <label class="form-label fw-semibold small">Nama Penyewa</label>
                        <input type="text" name="nama_penyewa" class="form-control" required minlength="3"
                               value="<?= htmlspecialchars($old['nama_penyewa'] ?? '') ?>" placeholder="Nama lengkap">
                        <div class="invalid-feedback">Nama minimal 3 karakter.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold small">No. WhatsApp</label>
                        <input type="text" name="whatsapp" class="form-control" required pattern="[0-9+\s-]{8,15}"
                               value="<?= htmlspecialchars($old['whatsapp'] ?? '') ?>" placeholder="08xxxxxxxxxx">
                        <div class="invalid-feedback">Nomor WhatsApp tidak valid.</div>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold small">Merk Kamera / Lensa</label>
                        <select name="merk" id="merk" class="form-select" required>
                            <option value="" disabled <?= empty($old['merk']) ? 'selected' : '' ?>>-- Pilih merk --</option>
                            <?php foreach ($merkList as $m): ?>
                                <option value="<?= $m['slug'] ?>"
                                    <?= (($old['merk'] ?? $merkTerpilih) === $m['slug']) ? 'selected' : '' ?>>
                                    <?= htmlspecialchars($m['nama']) ?> (<?= $m['kategori'] ?>) - <?= formatRupiah($m['harga']) ?>/hari
                                </option>
                            <?php endforeach; ?>
                        </select>
                        <div class="invalid-feedback">Pilih salah satu merk.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold small">Jumlah Unit</label>
                        <input type="number" name="jumlah_unit" class="form-control" required min="1" max="10"
                               value="<?= htmlspecialchars($old['jumlah_unit'] ?? 1) ?>">
                        <div class="invalid-feedback">Jumlah unit 1-10.</div>
                    </div>

                    <div class="col-md-6">
                        <label class="form-label fw-semibold small">Tanggal Mulai Sewa</label>
                        <input type="date" name="tgl_mulai" id="tgl_mulai" class="form-control" required
                               min="<?= date('Y-m-d') ?>" value="<?= htmlspecialchars($old['tgl_mulai'] ?? '') ?>">
                        <div class="invalid-feedback">Tanggal mulai wajib diisi.</div>
                    </div>
                    <div class="col-md-6">
                        <label class="form-label fw-semibold small">Tanggal Selesai Sewa</label>
                        <input type="date" name="tgl_selesai" id="tgl_selesai" class="form-control" required
                               value="<?= htmlspecialchars($old['tgl_selesai'] ?? '') ?>">
                        <div class="invalid-feedback">Tanggal selesai wajib diisi &amp; tidak boleh sebelum tanggal mulai.</div>
                    </div>

                    <div class="col-12">
                        <label class="form-label fw-semibold small">Catatan (opsional)</label>
                        <textarea name="catatan" class="form-control" rows="2" placeholder="Kebutuhan tambahan, lokasi pemotretan, dll."><?= htmlspecialchars($old['catatan'] ?? '') ?></textarea>
                    </div>
                </div>

                <div class="d-flex gap-2 mt-4">
                    <button type="submit" class="btn btn-brand-accent px-4"><i class="fa-solid fa-check me-1"></i>Simpan Booking</button>
                    <a href="list.php" class="btn btn-outline-dark px-4">Batal</a>
                </div>
            </form>
        </div>
    </div>
</div>

<?php include __DIR__ . '/../includes/footer.php'; ?>
