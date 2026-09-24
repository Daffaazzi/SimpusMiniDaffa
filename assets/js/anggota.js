/**
 * assets/js/anggota.js
 * Simpan & baca data anggota di localStorage (pengganti $_SESSION['anggota_list']).
 */
const KEY_ANGGOTA = 'anggota_list';

function getAnggotaList() {
  try {
    return JSON.parse(localStorage.getItem(KEY_ANGGOTA) || '[]');
  } catch (e) {
    return [];
  }
}

function saveAnggotaList(list) {
  localStorage.setItem(KEY_ANGGOTA, JSON.stringify(list));
}

function hapusAnggota(id) {
  const list = getAnggotaList().filter(a => a.id !== id);
  saveAnggotaList(list);
}

/**
 * Validasi & simpan anggota baru.
 * Mengembalikan { ok: true } atau { ok: false, errors: [...] }
 */
function tambahAnggota(data) {
  const errors = [];

  const nama = (data.nama || '').trim();
  const noIdentitas = (data.no_identitas || '').trim();
  const whatsapp = (data.whatsapp || '').trim();
  const email = (data.email || '').trim();
  const alamat = (data.alamat || '').trim();

  if (nama.length < 3) errors.push('Nama minimal 3 karakter.');
  if (!/^[0-9]{10,16}$/.test(noIdentitas)) errors.push('Nomor identitas harus 10-16 digit angka.');
  if (!/^[0-9+\s-]{8,15}$/.test(whatsapp)) errors.push('Nomor WhatsApp tidak valid.');
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.push('Format email tidak valid.');
  if (alamat.length < 8) errors.push('Alamat minimal 8 karakter.');

  const existing = getAnggotaList();
  if (errors.length === 0 && existing.some(a => a.no_identitas === noIdentitas)) {
    errors.push('Nomor identitas sudah terdaftar sebagai anggota.');
  }

  if (errors.length > 0) {
    return { ok: false, errors };
  }

  existing.push({
    id: 'ag_' + Date.now() + '_' + Math.floor(Math.random() * 1000),
    nama,
    no_identitas: noIdentitas,
    whatsapp,
    email,
    alamat,
    dibuat_pada: new Date().toISOString(),
  });
  saveAnggotaList(existing);

  return { ok: true };
}
