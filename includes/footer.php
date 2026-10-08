<footer class="site-footer mt-5">
    <div class="container py-5">
        <div class="row g-4">
            <div class="col-md-4">
                <a class="d-flex align-items-center gap-2 mb-3 text-decoration-none" href="<?= baseUrl('index.php') ?>">
                    <img src="<?= baseUrl('assets/img/logo.svg') ?>" alt="Logo" height="32">
                    <span class="fw-bold fs-5 text-white">BatuCam Rental</span>
                </a>
                <p class="text-white-50 small mb-0">
                    Jasa sewa kamera &amp; lensa profesional di Kota Batu. Abadikan momen terbaikmu
                    di antara pegunungan dan udara sejuk Kota Batu bersama peralatan pilihan kami.
                </p>
            </div>
            <div class="col-md-4">
                <h6 class="text-white fw-bold mb-3">Tautan</h6>
                <ul class="list-unstyled small">
                    <li class="mb-2"><a href="<?= baseUrl('index.php') ?>">Beranda</a></li>
                    <li class="mb-2"><a href="<?= baseUrl('produk/list.php') ?>">Katalog Merk Kamera &amp; Lensa</a></li>
                    <li class="mb-2"><a href="<?= baseUrl('login.php') ?>">Login Admin</a></li>
                </ul>
            </div>
            <div class="col-md-4">
                <h6 class="text-white fw-bold mb-3">Kontak</h6>
                <ul class="list-unstyled small text-white-50">
                    <li class="mb-2"><i class="fa-solid fa-location-dot me-2"></i>Jl. Ir. Soekarno, Kota Batu, Jawa Timur</li>
                    <li class="mb-2"><i class="fa-brands fa-whatsapp me-2"></i>+62 812-3456-7890</li>
                    <li class="mb-2"><i class="fa-solid fa-envelope me-2"></i>sewa@batucamrental.id</li>
                </ul>
            </div>
        </div>
        <hr class="border-secondary mt-4 mb-3">
        <p class="text-center text-white-50 small mb-0">
            &copy; <?= date('Y') ?> BatuCam Rental &mdash; Kota Batu. Jobsheet-08 &middot; Dibuat dengan PHP, JavaScript &amp; CSS.
        </p>
    </div>
</footer>

<script src="https://cdnjs.cloudflare.com/ajax/libs/bootstrap/5.3.3/js/bootstrap.bundle.min.js"></script>
<script src="<?= baseUrl('assets/js/app.js') ?>"></script>
</body>
</html>
