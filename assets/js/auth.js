/**
 * assets/js/auth.js
 * Simulasi login & flash message di sisi client memakai sessionStorage
 * (sessionStorage otomatis kosong lagi saat tab/browser ditutup,
 * mirip perilaku $_SESSION di PHP).
 *
 * CATATAN: Ini login sisi client untuk keperluan demo/jobsheet.
 * Kredensial tersimpan di kode ini bisa dilihat siapa saja lewat
 * "view source" — jangan dipakai untuk data sungguhan/produksi.
 */
const AKUN_ADMIN = {
  username: 'admin',
  password: 'batu2026',
  nama: 'Admin BatuCam',
};

function isLoggedIn() {
  try {
    const user = JSON.parse(sessionStorage.getItem('user') || 'null');
    return !!(user && user.username);
  } catch (e) {
    return false;
  }
}

function currentUser() {
  try {
    return JSON.parse(sessionStorage.getItem('user') || 'null');
  } catch (e) {
    return null;
  }
}

function doLogin(username, password) {
  if (username === AKUN_ADMIN.username && password === AKUN_ADMIN.password) {
    sessionStorage.setItem('user', JSON.stringify({ username, nama: AKUN_ADMIN.nama }));
    return true;
  }
  return false;
}

function doLogout() {
  sessionStorage.removeItem('user');
}

/** Wajib login, kalau belum -> lempar ke login.html */
function requireLogin() {
  if (!isLoggedIn()) {
    window.location.href = 'login.html';
  }
}

/** Flash message sekali-tampil, mirip flash() di PHP */
function setFlash(message) {
  sessionStorage.setItem('flash_message', message);
}
function getFlash() {
  const msg = sessionStorage.getItem('flash_message');
  if (msg) sessionStorage.removeItem('flash_message');
  return msg;
}
