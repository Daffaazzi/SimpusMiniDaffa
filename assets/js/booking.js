/**
 * assets/js/booking.js
 * Simpan & baca data booking di localStorage (pengganti $_SESSION['booking_list']).
 * localStorage dipilih (bukan sessionStorage) supaya data booking tetap ada
 * walau tab ditutup, mirip data yang "tersimpan" di server.
 */
const KEY_BOOKING = 'booking_list';

function getBookingList() {
  try {
    return JSON.parse(localStorage.getItem(KEY_BOOKING) || '[]');
  } catch (e) {
    return [];
  }
}

function saveBookingList(list) {
  localStorage.setItem(KEY_BOOKING, JSON.stringify(list));
}

function hapusBooking(id) {
  const list = getBookingList().filter(b => b.id !== id);
  saveBookingList(list);
}

/**
 * Validasi & simpan booking baru.
 * Mengembalikan { ok: true } atau { ok: false, errors: [...] }
 */
function tambahBooking(data) {
  const errors = [];

  const namaPenyewa = (data.nama_penyewa || '').trim();
  const whatsapp = (data.whatsapp || '').trim();
  const merkSlug = (data.merk || '').trim();
  const jumlahUnit = parseInt(data.jumlah_unit, 10);
  const tglMulai = data.tgl_mulai;
  const tglSelesai = data.tgl_selesai;
  const catatan = (data.catatan || '').trim();

  if (namaPenyewa.length < 3) errors.push('Nama penyewa minimal 3 karakter.');
  if (!/^[0-9+\s-]{8,15}$/.test(whatsapp)) errors.push('Nomor WhatsApp tidak valid.');

  const merkData = cariMerk(merkSlug);
  if (!merkData) errors.push('Merk yang dipilih tidak valid.');

  if (!jumlahUnit || jumlahUnit < 1 || jumlahUnit > 10) errors.push('Jumlah unit harus antara 1 sampai 10.');

  const mulaiTs = tglMulai ? new Date(tglMulai + 'T00:00:00').getTime() : NaN;
  const selesaiTs = tglSelesai ? new Date(tglSelesai + 'T00:00:00').getTime() : NaN;
  const hariIniTs = new Date(new Date().toDateString()).getTime();

  if (!tglMulai || isNaN(mulaiTs)) {
    errors.push('Tanggal mulai wajib diisi dengan benar.');
  } else if (mulaiTs < hariIniTs) {
    errors.push('Tanggal mulai tidak boleh sebelum hari ini.');
  }
  if (!tglSelesai || isNaN(selesaiTs)) {
    errors.push('Tanggal selesai wajib diisi dengan benar.');
  } else if (!isNaN(mulaiTs) && selesaiTs < mulaiTs) {
    errors.push('Tanggal selesai tidak boleh sebelum tanggal mulai.');
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  const lamaHari = Math.max(1, Math.round((selesaiTs - mulaiTs) / 86400000) + 1);
  const totalHarga = lamaHari * jumlahUnit * merkData.harga;

  const list = getBookingList();
  list.push({
    id: 'bk_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    nama_penyewa: namaPenyewa,
    whatsapp,
    merk_slug: merkData.slug,
    merk_nama: merkData.nama,
    jumlah_unit: jumlahUnit,
    tgl_mulai: tglMulai,
    tgl_selesai: tglSelesai,
    lama_hari: lamaHari,
    total_harga: totalHarga,
    catatan,
    status: 'Baru',
    dibuat_pada: new Date().toISOString(),
  });
  saveBookingList(list);

  return { ok: true };
}
