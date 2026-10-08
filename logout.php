<?php
require_once __DIR__ . '/includes/auth.php';

unset($_SESSION['user']);
flash('sukses', 'Anda telah keluar dari sesi admin.');

header('Location: login.php');
exit;
