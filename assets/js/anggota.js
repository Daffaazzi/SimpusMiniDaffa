// assets/js/anggota.js

async function muatDataAnggota() {
    const tbody = document.querySelector("#table-anggota tbody");
    const loadingIndicator = document.querySelector("#loading-indicator");
    if (!tbody) return;

    // 1. Tampilkan indikator loading jika ada
    if (loadingIndicator) loadingIndicator.style.display = "block";

    try {
        // Simulasi delay jaringan (600ms)
        await new Promise(resolve => setTimeout(resolve, 600));

        // Melakukan Fetch Data
        const response = await fetch("../data/anggota.json");

        // Cek jika status HTTP bukan 200-299 (misal: 404 Not Found)
        if (!response.ok) {
            throw new Error(`Gagal memuat file (Status: ${response.status} ${response.statusText})`);
        }

        const dataAnggota = await response.json();

        // Kosongkan tbody dari isi lama
        tbody.innerHTML = "";

        // Jika data kosong dari JSON
        if (!dataAnggota || dataAnggota.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="7" style="text-align:center; padding: 1.5rem; color: #55677a;">
                        Belum ada data anggota yang terdaftar.
                    </td>
                </tr>`;
            return;
        }

        // Render data ke dalam tabel
        dataAnggota.forEach((anggota, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td>${escapeHtml(anggota.npm || anggota.no_anggota || "-")}</td>
                <td><strong>${escapeHtml(anggota.nama)}</strong></td>
                <td>${escapeHtml(anggota.email || "-")}</td>
                <td>${escapeHtml(anggota.telepon || anggota.no_hp || "-")}</td>
                <td>${escapeHtml(anggota.alamat || "-")}</td>
                <td>
                    <button type="button" class="btn-edit">Edit</button>
                    <button type="button" class="btn-hapus">Hapus</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

    } catch (error) {
        // 2. TANGKAP ERROR & TAMPILKAN DI DALAM TABEL
        console.error("Detail Error Anggota:", error);

        tbody.innerHTML = `
            <tr>
                <td colspan="7" style="text-align:center; padding: 1.5rem; color: #d9534f; background-color: #fdf7f7;">
                    <strong>⚠️ Terjadi Kesalahan:</strong> Gagal mengambil data anggota. (${escapeHtml(error.message)})
                </td>
            </tr>`;
    } finally {
        // 3. Sembunyikan indikator loading (selalu berjalan baik sukses/gagal)
        if (loadingIndicator) loadingIndicator.style.display = "none";
    }
}

// Fungsi pencegah XSS
function escapeHtml(str) {
    if (typeof str !== "string") return str;
    return str
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}

document.addEventListener("DOMContentLoaded", muatDataAnggota);