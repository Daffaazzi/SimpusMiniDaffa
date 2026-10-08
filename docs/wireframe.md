# Wireframe - BatuCam Rental (Jobsheet-07)

## Alur Halaman

```
Beranda (index.php)
 ├─ Hero (background foto, judul, CTA "Booking Sekarang")
 ├─ Statistik singkat
 ├─ Cara Sewa (3 langkah)
 └─ Preview Katalog Merk (8 dari 14 merk)
        │
        ▼
Katalog Merk (produk/list.php)
 ├─ Filter kategori: Semua / Body Kamera / Lensa
 └─ 14 kartu merk (gambar, tipe, harga/hari, tombol "Sewa Sekarang")
        │
        ▼  (butuh login)
Login (login.php)
 ├─ Background foto (sama seperti hero)
 ├─ Logo kamera & lensa
 └─ Form username & password → set $_SESSION['user']
        │
        ▼
┌────────────────────┬─────────────────────┐
│  Data Booking       │  Data Anggota        │
│  (buku/)            │  (anggota/)          │
│  - list.php         │  - list.php          │
│  - tambah.php       │  - tambah.php        │
│  - proses_tambah.php│  - proses_tambah.php │
└────────────────────┴─────────────────────┘
```

## Catatan Desain
- Template mengikuti tema Bootswatch **Brite** (Bootstrap 5) via CDN cdnjs.
- Warna aksen oranye (`--brand-accent`) ditambahkan di atas palet Brite untuk identitas merk BatuCam Rental.
- Semua data transaksi (booking & anggota) disimpan di `$_SESSION`, tidak memakai database — konsisten dengan pendekatan jobsheet-06.
- Form booking & anggota divalidasi di sisi server (`proses_tambah.php`) sebelum disimpan; error dikembalikan lewat `$_SESSION['form_errors']`.
