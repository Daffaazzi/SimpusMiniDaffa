/**
 * assets/js/data-merk.js
 * Data katalog 14 merk kamera & lensa. Dipakai bersama oleh
 * index.html, produk.html, dan buku-tambah.html.
 */
const DAFTAR_MERK = [
  { slug: 'canon',      nama: 'Canon',              kategori: 'Kamera', tipe: 'DSLR & Mirrorless EOS',       harga: 150000 },
  { slug: 'nikon',      nama: 'Nikon',               kategori: 'Kamera', tipe: 'DSLR & Mirrorless Z-Series',  harga: 150000 },
  { slug: 'sony',       nama: 'Sony',                kategori: 'Kamera', tipe: 'Mirrorless Full-Frame Alpha', harga: 175000 },
  { slug: 'fujifilm',   nama: 'Fujifilm',            kategori: 'Kamera', tipe: 'Mirrorless X-Series',         harga: 160000 },
  { slug: 'panasonic',  nama: 'Panasonic Lumix',     kategori: 'Kamera', tipe: 'Mirrorless Hybrid Video',     harga: 165000 },
  { slug: 'olympus',    nama: 'OM System / Olympus', kategori: 'Kamera', tipe: 'Mirrorless Mikro 4/3',        harga: 130000 },
  { slug: 'leica',      nama: 'Leica',               kategori: 'Kamera', tipe: 'Rangefinder Premium',         harga: 350000 },
  { slug: 'hasselblad', nama: 'Hasselblad',          kategori: 'Kamera', tipe: 'Medium Format',                harga: 450000 },
  { slug: 'dji',        nama: 'DJI',                 kategori: 'Kamera', tipe: 'Drone & Gimbal Aksi',          harga: 200000 },
  { slug: 'gopro',      nama: 'GoPro',               kategori: 'Kamera', tipe: 'Kamera Aksi & Underwater',     harga: 90000  },
  { slug: 'sigma',      nama: 'Sigma',               kategori: 'Lensa',  tipe: 'Lensa Art & Contemporary',     harga: 100000 },
  { slug: 'tamron',     nama: 'Tamron',              kategori: 'Lensa',  tipe: 'Lensa Zoom Serbaguna',         harga: 90000  },
  { slug: 'pentax',     nama: 'Pentax',              kategori: 'Kamera', tipe: 'DSLR Tahan Cuaca',             harga: 120000 },
  { slug: 'zeiss',      nama: 'Zeiss',               kategori: 'Lensa',  tipe: 'Lensa Prime Presisi Tinggi',   harga: 140000 },
];

function cariMerk(slug) {
  return DAFTAR_MERK.find(m => m.slug === slug) || null;
}

function formatRupiah(angka) {
  return 'Rp ' + Number(angka).toLocaleString('id-ID');
}
