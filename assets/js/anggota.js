// =====================================================
// assets/js/anggota.js
// =====================================================

document.addEventListener("DOMContentLoaded", () => {
    muatDataAnggota();
    aktifkanPencarian();
});


// =====================================================
// MEMUAT DATA ANGGOTA
// =====================================================

async function muatDataAnggota() {
    const tbody = document.querySelector("#table-anggota tbody");
    const loadingIndicator = document.querySelector("#loading-indicator");

    if (!tbody) {
        console.error("Elemen #table-anggota tbody tidak ditemukan.");
        return;
    }

    // Tampilkan loading
    if (loadingIndicator) {
        loadingIndicator.style.display = "block";
    }

    try {
        // Simulasi loading jaringan
        await new Promise(resolve => setTimeout(resolve, 600));

        // Ambil data JSON
        const response = await fetch("../data/anggota.json", {
            cache: "no-cache"
        });

        // Cek response
        if (!response.ok) {
            throw new Error(
                `Gagal memuat data. Status: ${response.status} ${response.statusText}`
            );
        }

        // Ubah response menjadi JSON
        const dataAnggota = await response.json();

        // Pastikan data berbentuk array
        if (!Array.isArray(dataAnggota)) {
            throw new Error("Format data anggota.json tidak valid. Data harus berupa array.");
        }

        // Kosongkan tabel
        tbody.innerHTML = "";

        // Jika data kosong
        if (dataAnggota.length === 0) {
            tampilkanDataKosong(tbody);
            return;
        }

        // Simpan data agar bisa digunakan oleh pencarian
        window.dataAnggota = dataAnggota;

        // Tampilkan data
        renderDataAnggota(dataAnggota);

    } catch (error) {
        console.error("Detail Error Anggota:", error);

        tbody.innerHTML = `
            <tr>
                <td colspan="7" class="error-table">
                    <strong>⚠️ Terjadi Kesalahan</strong>
                    <br>
                    Gagal mengambil data anggota.
                    <br>
                    <small>${escapeHtml(error.message)}</small>
                </td>
            </tr>
        `;

    } finally {
        // Sembunyikan loading
        if (loadingIndicator) {
            loadingIndicator.style.display = "none";
        }
    }
}


// =====================================================
// RENDER DATA KE TABEL
// =====================================================

function renderDataAnggota(data) {
    const tbody = document.querySelector("#table-anggota tbody");

    if (!tbody) return;

    tbody.innerHTML = "";

    if (!data || data.length === 0) {
        tampilkanDataKosong(tbody);
        return;
    }

    data.forEach((anggota, index) => {

        const tr = document.createElement("tr");

        const npm =
            anggota.npm ||
            anggota.no_anggota ||
            "-";

        const nama =
            anggota.nama ||
            "-";

        const email =
            anggota.email ||
            "-";

        const telepon =
            anggota.telepon ||
            anggota.no_hp ||
            "-";

        const alamat =
            anggota.alamat ||
            "-";

        tr.innerHTML = `
            <td>${index + 1}</td>

            <td>
                ${escapeHtml(npm)}
            </td>

            <td>
                <strong>
                    ${escapeHtml(nama)}
                </strong>
            </td>

            <td>
                ${escapeHtml(email)}
            </td>

            <td>
                ${escapeHtml(telepon)}
            </td>

            <td>
                ${escapeHtml(alamat)}
            </td>

            <td>
                <button
                    type="button"
                    class="btn-edit"
                    data-index="${index}">
                    Edit
                </button>

                <button
                    type="button"
                    class="btn-hapus"
                    data-index="${index}">
                    Hapus
                </button>
            </td>
        `;

        tbody.appendChild(tr);
    });

    aktifkanTombolAksi();
}


// =====================================================
// DATA KOSONG
// =====================================================

function tampilkanDataKosong(tbody) {
    tbody.innerHTML = `
        <tr>
            <td colspan="7" class="empty-data">
                📚 Belum ada data anggota yang terdaftar.
            </td>
        </tr>
    `;
}


// =====================================================
// PENCARIAN ANGGOTA
// =====================================================

function aktifkanPencarian() {
    const searchInput = document.querySelector("#search-anggota");

    if (!searchInput) return;

    searchInput.addEventListener("input", function () {

        const keyword = this.value
            .toLowerCase()
            .trim();

        const data = window.dataAnggota || [];

        if (!keyword) {
            renderDataAnggota(data);
            return;
        }

        const hasilPencarian = data.filter(anggota => {

            const npm =
                String(
                    anggota.npm ||
                    anggota.no_anggota ||
                    ""
                ).toLowerCase();

            const nama =
                String(
                    anggota.nama ||
                    ""
                ).toLowerCase();

            const email =
                String(
                    anggota.email ||
                    ""
                ).toLowerCase();

            const telepon =
                String(
                    anggota.telepon ||
                    anggota.no_hp ||
                    ""
                ).toLowerCase();

            const alamat =
                String(
                    anggota.alamat ||
                    ""
                ).toLowerCase();

            return (
                npm.includes(keyword) ||
                nama.includes(keyword) ||
                email.includes(keyword) ||
                telepon.includes(keyword) ||
                alamat.includes(keyword)
            );
        });

        if (hasilPencarian.length === 0) {
            const tbody = document.querySelector(
                "#table-anggota tbody"
            );

            tbody.innerHTML = `
                <tr>
                    <td colspan="7" class="empty-data">
                        🔍 Data anggota tidak ditemukan.
                    </td>
                </tr>
            `;

            return;
        }

        renderDataAnggota(hasilPencarian);
    });
}


// =====================================================
// TOMBOL EDIT & HAPUS
// =====================================================

function aktifkanTombolAksi() {

    // Tombol Edit
    document.querySelectorAll(".btn-edit").forEach(button => {

        button.addEventListener("click", function () {

            const index = Number(this.dataset.index);

            const data = window.dataAnggota || [];

            const anggota = data[index];

            if (!anggota) return;

            alert(
                `Edit anggota:\n\n` +
                `Nama: ${anggota.nama || "-"}\n` +
                `NPM: ${anggota.npm || anggota.no_anggota || "-"}`
            );

        });
    });


    // Tombol Hapus
    document.querySelectorAll(".btn-hapus").forEach(button => {

        button.addEventListener("click", function () {

            const index = Number(this.dataset.index);

            const data = window.dataAnggota || [];

            const anggota = data[index];

            if (!anggota) return;

            const nama = anggota.nama || "anggota ini";

            const yakin = confirm(
                `Apakah kamu yakin ingin menghapus ${nama}?`
            );

            if (!yakin) return;

            data.splice(index, 1);

            window.dataAnggota = data;

            renderDataAnggota(data);
        });
    });
}


// =====================================================
// ESCAPE HTML / MENCEGAH XSS
// =====================================================

function escapeHtml(value) {

    if (value === null || value === undefined) {
        return "";
    }

    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
