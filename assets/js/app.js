/**
 * assets/js/app.js
 * Tidak berubah secara struktur dari jobsheet-06 — ditambah validasi form
 * booking & anggota, plus efek highlight baris baru (.flash).
 */
document.addEventListener('DOMContentLoaded', function () {

    // 1) Auto-hilangkan alert Bootstrap setelah beberapa detik
    document.querySelectorAll('.alert.auto-dismiss').forEach(function (alertEl) {
        setTimeout(function () {
            var bsAlert = bootstrap.Alert.getOrCreateInstance(alertEl);
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
    var tglMulai = document.getElementById('tgl_mulai');
    var tglSelesai = document.getElementById('tgl_selesai');
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

    // 4) Konfirmasi sebelum hapus data (dipakai di list.php)
    document.querySelectorAll('.btn-hapus-konfirmasi').forEach(function (btn) {
        btn.addEventListener('click', function (e) {
            if (!confirm('Yakin ingin menghapus data ini?')) {
                e.preventDefault();
            }
        });
    });

    // 5) Sorot baris tabel yang baru saja ditambahkan (class .flash dari CSS)
    var rowBaru = document.querySelector('tr[data-baru="1"]');
    if (rowBaru) {
        rowBaru.classList.add('flash');
    }

    // 6) Toggle tampil/sembunyi password di halaman login
    var togglePass = document.getElementById('togglePassword');
    var passInput = document.getElementById('password');
    if (togglePass && passInput) {
        togglePass.addEventListener('click', function () {
            var isHidden = passInput.type === 'password';
            passInput.type = isHidden ? 'text' : 'password';
            togglePass.innerHTML = isHidden
                ? '<i class="fa-solid fa-eye-slash"></i>'
                : '<i class="fa-solid fa-eye"></i>';
        });
    }

    // 7) Isi otomatis pilihan merk pada form Booking bila datang dari Katalog (?merk=...)
    var params = new URLSearchParams(window.location.search);
    var merkParam = params.get('merk');
    var selectMerk = document.getElementById('merk');
    if (merkParam && selectMerk) {
        selectMerk.value = merkParam;
    }
});
