// assets/js/buku.js

async function muatDataBuku() {
    const tbody = document.querySelector("#table-buku tbody");
    const loadingIndicator = document.querySelector("#loading-indicator");
    if (!tbody) return;

    // 1. Tampilkan indikator loading jika ada
    if (loadingIndicator) loadingIndicator.style.display = "block";

    try {
        // Simulasi delay jaringan (600ms)
        await new Promise(resolve => setTimeout(resolve, 600));

        // Melakukan Fetch Data
        const response = await fetch("../data/buku.json");

        // Cek jika status HTTP bukan 200-299 (misal: 404 Not Found)
        if (!response.ok) {
            throw new Error(`Gagal memuat file (Status: ${response.status} ${response.statusText})`);
        }

        const dataBuku = await response.json();

        // Kosongkan tbody dari isi lama
        tbody.innerHTML = "";

        // Jika data kosong dari JSON
        if (!dataBuku || dataBuku.length === 0) {
            tbody.innerHTML = `
                <tr>
                    <td colspan="8" style="text-align:center; padding: 1.5rem; color: #55677a;">
                        Belum ada data buku yang tersimpan.
                    </td>
                </tr>`;
            return;
        }

        // Render data ke dalam tabel
        dataBuku.forEach((buku, index) => {
            const tr = document.createElement("tr");

            tr.innerHTML = `
                <td>${index + 1}</td>
                <td><strong>${escapeHtml(buku.judul)}</strong></td>
                <td>${escapeHtml(buku.pengarang)}</td>
                <td>${escapeHtml(buku.penerbit || "-")}</td>
                <td>${buku.tahun_terbit || buku.tahun || "-"}</td>
                <td>${escapeHtml(buku.kategori || "-")}</td>
                <td>${buku.stok ?? "-"}</td>
                <td>
                    <button type="button" class="btn-edit">Edit</button>
                    <button type="button" class="btn-hapus">Hapus</button>
                </td>
            `;

            tbody.appendChild(tr);
        });

    } catch (error) {
        // 2. TANGKAP ERROR & TAMPILKAN DI DALAM TABEL
        console.error("Detail Error Buku:", error);

        tbody.innerHTML = `
            <tr>
                <td colspan="8" style="text-align:center; padding: 1.5rem; color: #d9534f; background-color: #fdf7f7;">
                    <strong>⚠️ Terjadi Kesalahan:</strong> Gagal mengambil data buku. (${escapeHtml(error.message)})
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

document.addEventListener("DOMContentLoaded", muatDataBuku);