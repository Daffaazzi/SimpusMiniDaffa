/**
 * assets/js/app.js
 * Interaksi UI umum: validasi form Bootstrap, toggle password,
 * sinkronisasi tanggal, konfirmasi hapus, dan efek highlight baris baru.
 */
document.addEventListener('DOMContentLoaded', function () {

  // 1) Auto-hilangkan alert Bootstrap setelah beberapa detik
  document.querySelectorAll('.alert.auto-dismiss').forEach(function (alertEl) {
    setTimeout(function () {
      const bsAlert = bootstrap.Alert.getOrCreateInstance(alertEl);
      bsAlert.close();
    }, 4000);
  });

  // 2) Validasi Bootstrap standar (needs-validation) untuk semua form
  document.querySelectorAll('form.needs-validation').forEach(function (form) {
    form.addEventListener('submit', function (event) {
      if (!form.checkValidity()) {
        event.preventDefault();
        event.stopPropagation();
      }
      form.classList.add('was-validated');
    }, false);
  });

  // 3) Validasi tambahan khusus form Booking: tanggal selesai >= tanggal mulai
  const tglMulai = document.getElementById('tgl_mulai');
  const tglSelesai = document.getElementById('tgl_selesai');
  if (tglMulai && tglSelesai) {
    function syncMinDate() {
      if (tglMulai.value) {
        tglSelesai.min = tglMulai.value;
        if (tglSelesai.value && tglSelesai.value < tglMulai.value) {
          tglSelesai.value = tglMulai.value;
        }
      }
    }
    tglMulai.addEventListener('change', syncMinDate);
    syncMinDate();
  }

  // 4) Konfirmasi sebelum hapus data (delegasi event, karena baris tabel dirender via JS).
  //    Dipasang di fase CAPTURE pada document supaya berjalan lebih dulu daripada
  //    listener hapus yang dipasang langsung di elemen tbody pada tiap halaman.
  document.addEventListener('click', function (e) {
    const btn = e.target.closest('.btn-hapus-konfirmasi');
    if (btn && !confirm('Yakin ingin menghapus data ini?')) {
      e.preventDefault();
      e.stopPropagation();
    }
  }, true);

  // 5) Toggle tampil/sembunyi password di halaman login
  const togglePass = document.getElementById('togglePassword');
  const passInput = document.getElementById('password');
  if (togglePass && passInput) {
    togglePass.addEventListener('click', function () {
      const isHidden = passInput.type === 'password';
      passInput.type = isHidden ? 'text' : 'password';
      togglePass.innerHTML = isHidden
        ? '<i class="fa-solid fa-eye-slash"></i>'
        : '<i class="fa-solid fa-eye"></i>';
    });
  }
});
