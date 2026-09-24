# BatuCam Rental — Versi HTML Statis (HTML + CSS + JavaScript)

Website penyewaan kamera & lensa di Kota Batu. Dibangun **tanpa bahasa server** (tanpa PHP/Java) — murni **HTML**, **CSS**, dan **JavaScript**, memakai template **Bootswatch Brite** (Bootstrap 5) via CDN.

## Struktur Folder

```
jobsheet-07/
├── index.html                 # Beranda
├── login.html                 # Login admin (background foto + logo)
├── produk.html                 # Katalog 14 merk (filter kategori)
├── buku-list.html              # Data Booking (baca dari localStorage)
├── buku-tambah.html            # Form tambah booking
├── anggota-list.html           # Data Anggota (baca dari localStorage)
├── anggota-tambah.html         # Form tambah anggota
├── assets/
│   ├── css/style.css           # Styling tema Brite + kelas .flash
│   ├── js/
│   │   ├── data-merk.js        # Data 14 merk kamera & lensa
│   │   ├── auth.js             # Login/logout & flash message (sessionStorage)
│   │   ├── common.js           # Render navbar & footer (pengganti include)
│   │   ├── booking.js          # CRUD data booking (localStorage)
│   │   ├── anggota.js          # CRUD data anggota (localStorage)
│   │   └── app.js              # Validasi form & interaksi UI umum
│   └── img/
│       ├── logo.svg            # Logo kamera & lensa
│       ├── poster-bg.jpg       # Background hero & login
│       └── brands/*.svg        # 14 gambar merk (ilustrasi, bukan logo resmi)
├── docs/wireframe.md
├── Dokumentasi/
└── README.md
```

## Cara Menjalankan

Tidak perlu server/instalasi apa pun:

1. Ekstrak folder ini.
2. Buka file `index.html` langsung lewat browser (double-click), **atau**
3. Untuk hasil terbaik (supaya path relatif & localStorage konsisten), jalankan lewat server ringan, contoh:
   - VS Code + ekstensi **Live Server**, atau
   - `python3 -m http.server` lalu buka `http://localhost:8000`

Login admin memakai akun demo:
- Username: `admin`
- Password: `batu2026`

> Catatan: karena ini website statis, akun login hanya tersimpan di kode JavaScript (`assets/js/auth.js`) dan bisa dilihat lewat "View Source" — cocok untuk demo/tugas, **bukan untuk data sungguhan**.

## Fitur Utama

- **Beranda** dengan hero background foto, statistik, cara sewa, dan preview katalog.
- **Katalog 14 Merk** kamera & lensa (Canon, Nikon, Sony, Fujifilm, Panasonic Lumix, OM System/Olympus, Leica, Hasselblad, DJI, GoPro, Sigma, Tamron, Pentax, Zeiss) lengkap dengan gambar, kategori, dan harga sewa per hari — bisa difilter tanpa reload halaman.
- **Login Admin** dengan background foto dan logo kamera & lensa.
- **Data Booking**: tambah, lihat, dan hapus transaksi sewa — tersimpan di `localStorage`, dengan validasi JavaScript (tanggal, nomor WhatsApp, jumlah unit).
- **Data Anggota**: tambah, lihat, dan hapus data pelanggan tetap — tersimpan di `localStorage`, dengan validasi & cek duplikasi nomor identitas.
- Template mengikuti gaya **Bootswatch Brite** melalui CDN `cdnjs.cloudflare.com`.

## Teknologi

- **HTML** (struktur halaman, tanpa server/backend)
- **CSS** (kustomisasi di atas Bootswatch Brite)
- **JavaScript** (render navbar/footer, validasi form, autentikasi, dan penyimpanan data lewat `localStorage`/`sessionStorage`)

## Perbedaan dari Versi PHP Sebelumnya

| Versi PHP | Versi Statis (sekarang) |
|---|---|
| `$_SESSION` | `localStorage` (data) / `sessionStorage` (status login) |
| `include header.php/footer.php` | `common.js` merender navbar/footer ke placeholder `<div>` |
| `proses_tambah.php` (validasi server) | `booking.js` / `anggota.js` (validasi JavaScript) |
| Folder `buku/`, `anggota/`, `produk/` | File flat: `buku-list.html`, `buku-tambah.html`, dst. (supaya path lebih sederhana tanpa server) |
