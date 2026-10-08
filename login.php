<?php
require_once __DIR__ . '/includes/auth.php';

if (isLoggedIn()) {
    header('Location: index.php');
    exit;
}

$error = null;

if ($_SERVER['REQUEST_METHOD'] === 'POST') {
    $username = trim($_POST['username'] ?? '');
    $password = trim($_POST['password'] ?? '');

    if ($username === '' || $password === '') {
        $error = 'Username dan password wajib diisi.';
    } elseif (
        $username === $GLOBALS['AKUN_ADMIN']['username'] &&
        $password === $GLOBALS['AKUN_ADMIN']['password']
    ) {
        $_SESSION['user'] = [
            'username' => $username,
            'nama'     => $GLOBALS['AKUN_ADMIN']['nama'],
        ];
        flash('sukses', 'Berhasil masuk. Selamat datang kembali!');
        header('Location: index.php');
        exit;
    } else {
        $error = 'Username atau password salah.';
    }
}

$pageTitle = 'Login Admin';
?>
<!DOCTYPE html>
<html lang="id">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1, viewport-fit=cover">
    <title>Login Admin - BatuCam Rental</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/bootswatch/5.3.8/brite/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.1/css/all.min.css">
    <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;500;600;700;800&display=swap">
    <link rel="stylesheet" href="assets/css/style.css">
    <link rel="icon" href="assets/img/logo.svg" type="image/svg+xml">
</head>
<body>

<div class="login-page">
    <div class="login-card">
        <img src="assets/img/logo.svg" alt="Logo BatuCam Rental" class="login-logo">
        <h4 class="text-center fw-bold mb-1">BatuCam Rental</h4>
        <p class="text-center text-muted small mb-4">Masuk sebagai admin untuk kelola booking &amp; anggota</p>

        <?php if ($error): ?>
            <div class="alert alert-danger py-2 small"><i class="fa-solid fa-circle-exclamation me-1"></i><?= htmlspecialchars($error) ?></div>
        <?php endif; ?>

        <form method="post" class="needs-validation" novalidate>
            <div class="mb-3">
                <label for="username" class="form-label small fw-semibold">Username</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa-solid fa-user"></i></span>
                    <input type="text" class="form-control" id="username" name="username" required
                           value="<?= htmlspecialchars($_POST['username'] ?? '') ?>" placeholder="admin">
                    <div class="invalid-feedback">Username wajib diisi.</div>
                </div>
            </div>
            <div class="mb-3">
                <label for="password" class="form-label small fw-semibold">Password</label>
                <div class="input-group">
                    <span class="input-group-text"><i class="fa-solid fa-lock"></i></span>
                    <input type="password" class="form-control" id="password" name="password" required
                           placeholder="••••••••">
                    <button class="btn btn-outline-secondary" type="button" id="togglePassword">
                        <i class="fa-solid fa-eye"></i>
                    </button>
                    <div class="invalid-feedback">Password wajib diisi.</div>
                </div>
            </div>
            <button type="submit" class="btn btn-brand-accent w-100 py-2 fw-bold mt-2">
                <i class="fa-solid fa-right-to-bracket me-1"></i> Masuk
            </button>
        </form>

        <p class="text-center small text-muted mt-3 mb-0">
            Demo akun &mdash; username: <code>admin</code> / password: <code>batu2026</code>
        </p>
        <p class="text-center small mt-2 mb-0">
            <a href="index.php"><i class="fa-solid fa-arrow-left me-1"></i>Kembali ke beranda</a>
        </p>
    </div>
</div>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js"></script>
<script src="assets/js/app.js"></script>
</body>
</html>
