# Wireframe - BatuCam Rental (Versi HTML Statis)

## Alur Halaman

```
Beranda (index.html)
 ├─ Hero (background foto, judul, CTA "Booking Sekarang")
 ├─ Statistik singkat
 ├─ Cara Sewa (3 langkah)
 └─ Preview Katalog Merk (8 dari 14 merk, dirender via JS)
        │
        ▼
Katalog Merk (produk.html)
 ├─ Filter kategori: Semua / Body Kamera / Lensa (JS, tanpa reload halaman)
 └─ 14 kartu merk (gambar, tipe, harga/hari, tombol "Sewa Sekarang")
        │
        ▼  (butuh login)
Login (login.html)
 ├─ Background foto (sama seperti hero)
 ├─ Logo kamera & lensa
 └─ Form username & password → disimpan ke sessionStorage
        │
        ▼
┌───────────────────────┬──────────────────────────┐
│  Data Booking          │  Data Anggota              │
│  - buku-list.html      │  - anggota-list.html       │
│  - buku-tambah.html    │  - anggota-tambah.html     │
└───────────────────────┴──────────────────────────┘
```

## Catatan Desain
- Template mengikuti tema Bootswatch **Brite** (Bootstrap 5) via CDN cdnjs.
- Warna aksen oranye (`--brand-accent`) ditambahkan di atas palet Brite untuk identitas merk BatuCam Rental.
- **Tidak ada server/bahasa backend** (PHP/Java) — murni HTML + CSS + JavaScript, bisa langsung dibuka dari file `index.html` di browser.
- Navbar & footer dirender oleh `assets/js/common.js` ke dalam `<div id="navbar-placeholder">` dan `<div id="footer-placeholder">` di setiap halaman, menggantikan pola *include* di PHP.
- Data transaksi (booking & anggota) disimpan di **localStorage** (bertahan walau browser ditutup), sedangkan status login disimpan di **sessionStorage** (hilang saat tab ditutup) — meniru perilaku `$_SESSION` di versi PHP.
- Form booking & anggota divalidasi di JavaScript (`assets/js/booking.js` & `assets/js/anggota.js`) sebelum disimpan.
