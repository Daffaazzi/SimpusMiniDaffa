# BatuCam Rental — Jobsheet-07

Website penyewaan kamera & lensa di Kota Batu. Dibangun dengan **PHP**, **JavaScript**, dan **CSS**, memakai template **Bootswatch Brite** (Bootstrap 5) via CDN.

## Struktur Folder

```
jobsheet-07/
├── index.php                 # Beranda
├── login.php                 # Login admin (background foto + logo)
├── logout.php                # Hapus session login
├── includes/
│   ├── header.php            # Navbar, dipakai ulang
│   ├── footer.php            # Footer, dipakai ulang
│   ├── auth.php              # Helper session & login
│   └── data_merk.php         # Data 14 merk kamera & lensa
├── assets/
│   ├── css/style.css         # Styling tema Brite + kelas .flash
│   ├── js/app.js             # Validasi form & interaksi
│   └── img/
│       ├── logo.svg          # Logo kamera & lensa
│       ├── poster-bg.jpg     # Background hero & login
│       └── brands/*.svg      # 14 gambar merk (ilustrasi, bukan logo resmi)
├── buku/                     # Data Booking (transaksi sewa)
│   ├── list.php               # Render dari $_SESSION
│   ├── tambah.php             # Form dengan method="post" & action
│   └── proses_tambah.php      # Validasi server + simpan ke $_SESSION
├── anggota/                  # Data Anggota / pelanggan
│   ├── list.php
│   ├── tambah.php
│   └── proses_tambah.php
├── produk/
│   └── list.php               # Katalog 14 merk dengan gambar & filter
├── docs/wireframe.md
├── Dokumentasi/
└── README.md
```

## Cara Menjalankan

1. Pastikan PHP 8+ terpasang (bisa pakai XAMPP/Laragon).
2. Letakkan folder `jobsheet-07/` di dalam `htdocs/` (XAMPP) atau `www/` (Laragon).
3. Jalankan server, lalu buka `http://localhost/jobsheet-07/`.
4. Login admin memakai akun demo:
   - Username: `admin`
   - Password: `batu2026`

## Fitur Utama

- **Beranda** dengan hero background foto, statistik, cara sewa, dan preview katalog.
- **Katalog 14 Merk** kamera & lensa (Canon, Nikon, Sony, Fujifilm, Panasonic Lumix, OM System/Olympus, Leica, Hasselblad, DJI, GoPro, Sigma, Tamron, Pentax, Zeiss) lengkap dengan gambar, kategori, dan harga sewa per hari.
- **Login Admin** dengan background foto dan logo kamera & lensa.
- **Data Booking**: tambah, lihat, dan hapus transaksi sewa — tersimpan di `$_SESSION`, dengan validasi server (tanggal, nomor WhatsApp, jumlah unit).
- **Data Anggota**: tambah, lihat, dan hapus data pelanggan tetap — tersimpan di `$_SESSION`, dengan validasi & cek duplikasi nomor identitas.
- Template mengikuti gaya **Bootswatch Brite** melalui CDN `cdnjs.cloudflare.com`.

## Teknologi

- PHP (native, tanpa framework, tanpa database — memakai `$_SESSION`)
- JavaScript (validasi form, efek UI)
- CSS (kustomisasi di atas Bootswatch Brite)
