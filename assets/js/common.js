/**
 * assets/js/common.js
 * Merender navbar & footer yang dipakai ulang di semua halaman,
 * menggantikan pola include header.php / footer.php di versi PHP.
 * Dipanggil lewat: renderNavbar('index.html'); renderFooter();
 */

function renderNavbar(activePage) {
  const target = document.getElementById('navbar-placeholder');
  if (!target) return;

  const loggedIn = isLoggedIn();
  const user = currentUser();

  const linkClass = (page) => 'nav-link' + (activePage === page ? ' active' : '');

  target.innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark sticky-top">
      <div class="container">
        <a class="navbar-brand d-flex align-items-center gap-2" href="index.html">
          <img src="assets/img/logo.svg" alt="Logo BatuCam" height="34">
          <span>BatuCam <span class="text-brand-accent">Rental</span></span>
        </a>
        <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navMain">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="navMain">
          <ul class="navbar-nav ms-auto align-items-lg-center gap-lg-1">
            <li class="nav-item">
              <a class="${linkClass('index.html')}" href="index.html">Beranda</a>
            </li>
            <li class="nav-item">
              <a class="${linkClass('produk.html')}" href="produk.html">Katalog Merk</a>
            </li>
            ${loggedIn ? `
            <li class="nav-item">
              <a class="${linkClass('buku-list.html')}" href="buku-list.html">Data Booking</a>
            </li>
            <li class="nav-item">
              <a class="${linkClass('anggota-list.html')}" href="anggota-list.html">Data Anggota</a>
            </li>
            <li class="nav-item ms-lg-2">
              <span class="navbar-text small text-white-50 me-2">
                <i class="fa-solid fa-circle-user"></i> ${user ? user.nama : ''}
              </span>
              <a class="btn btn-sm btn-outline-light" href="#" id="btnLogout">Logout</a>
            </li>` : `
            <li class="nav-item ms-lg-2">
              <a class="btn btn-brand-accent btn-sm px-3" href="login.html">
                <i class="fa-solid fa-right-to-bracket"></i> Login Admin
              </a>
            </li>`}
          </ul>
        </div>
      </div>
    </nav>
  `;

  const btnLogout = document.getElementById('btnLogout');
  if (btnLogout) {
    btnLogout.addEventListener('click', function (e) {
      e.preventDefault();
      doLogout();
      setFlash('Anda telah keluar dari sesi admin.');
      window.location.href = 'login.html';
    });
  }
}

function renderFooter() {
  const target = document.getElementById('footer-placeholder');
  if (!target) return;

  target.innerHTML = `
    <footer class="site-footer mt-5">
      <div class="container py-5">
        <div class="row g-4">
          <div class="col-md-4">
            <a class="d-flex align-items-center gap-2 mb-3 text-decoration-none" href="index.html">
              <img src="assets/img/logo.svg" alt="Logo" height="32">
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
              <li class="mb-2"><a href="index.html">Beranda</a></li>
              <li class="mb-2"><a href="produk.html">Katalog Merk Kamera &amp; Lensa</a></li>
              <li class="mb-2"><a href="login.html">Login Admin</a></li>
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
          &copy; <span id="tahunSekarang"></span> BatuCam Rental &mdash; Kota Batu. Jobsheet-07 &middot; HTML, CSS &amp; JavaScript.
        </p>
      </div>
    </footer>
  `;
  const y = document.getElementById('tahunSekarang');
  if (y) y.textContent = new Date().getFullYear();
}

/** Tampilkan alert flash (sukses) di elemen dengan id="flashArea" bila ada pesan tersimpan */
function tampilkanFlash() {
  const area = document.getElementById('flashArea');
  if (!area) return;
  const msg = getFlash();
  if (!msg) return;
  area.innerHTML = `
    <div class="alert alert-success alert-dismissible fade show auto-dismiss" role="alert">
      <i class="fa-solid fa-circle-check me-1"></i>${msg}
      <button type="button" class="btn-close" data-bs-dismiss="alert"></button>
    </div>`;
}

document.addEventListener('DOMContentLoaded', tampilkanFlash);
