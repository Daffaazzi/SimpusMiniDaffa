// =====================================================
// assets/js/buku.js
// =====================================================

document.addEventListener("DOMContentLoaded", function () {
    muatDataBuku();
    aktifkanPencarianBuku();
});


// =====================================================
// MEMUAT DATA BUKU
// =====================================================

async function muatDataBuku() {

    const tbody =
        document.querySelector("#table-buku tbody");

    const loadingIndicator =
        document.querySelector("#loading-indicator");

    if (!tbody) {
        console.error(
            "Elemen #table-buku tbody tidak ditemukan."
        );
        return;
    }

    // Tampilkan loading
    if (loadingIndicator) {
        loadingIndicator.style.display = "block";
    }


    try {

        // Simulasi delay jaringan
        await new Promise(function (resolve) {
            setTimeout(resolve, 600);
        });


        // Ambil data unit
        const response =
            await fetch("../data/buku.json", {
                cache: "no-cache"
            });


        // Cek response
        if (!response.ok) {
            throw new Error(
                `Gagal memuat data. Status: ${response.status} ${response.statusText}`
            );
        }


        // Ubah response menjadi JSON
        const dataBuku =
            await response.json();


        // Pastikan JSON berbentuk array
        if (!Array.isArray(dataBuku)) {
            throw new Error(
                "Format buku.json tidak valid. Data harus berupa array."
            );
        }


        // Simpan data untuk pencarian
        window.dataBuku = dataBuku;


        // Kosongkan tabel
        tbody.innerHTML = "";


        // Jika tidak ada data
        if (dataBuku.length === 0) {
            tampilkanDataBukuKosong(tbody);
            return;
        }


        // Tampilkan data
        renderDataBuku(dataBuku);


    } catch (error) {

        console.error(
            "Detail Error Buku:",
            error
        );


        tbody.innerHTML = `
            <tr>
                <td colspan="8" class="error-table">
                    <strong>Terjadi Kesalahan</strong>
                    <br>
                    Gagal mengambil data unit kamera/lensa.
                    <br>
                    <small>
                        ${escapeHtml(error.message)}
                    </small>
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
// RENDER DATA BUKU
// =====================================================

function renderDataBuku(data) {

    const tbody =
        document.querySelector("#table-buku tbody");

    if (!tbody) return;

    tbody.innerHTML = "";


    if (!data || data.length === 0) {
        tampilkanDataBukuKosong(tbody);
        return;
    }


    data.forEach(function (buku, index) {

        const tr =
            document.createElement("tr");


        const judul =
            buku.judul || "-";

        const pengarang =
            buku.pengarang || "-";

        const penerbit =
            buku.penerbit || "-";

        const tahun =
            buku.tahun_terbit ||
            buku.tahun ||
            "-";

        const kategori =
            buku.kategori || "-";

        const stok =
            buku.stok ?? "-";


        tr.innerHTML = `
            <td>${index + 1}</td>

            <td>
                <strong>
                    ${escapeHtml(judul)}
                </strong>
            </td>

            <td>
                ${escapeHtml(pengarang)}
            </td>

            <td>
                ${escapeHtml(penerbit)}
            </td>

            <td>
                ${escapeHtml(tahun)}
            </td>

            <td>
                ${escapeHtml(kategori)}
            </td>

            <td>
                ${escapeHtml(stok)}
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


    aktifkanTombolBuku();

}


// =====================================================
// DATA BUKU KOSONG
// =====================================================

function tampilkanDataBukuKosong(tbody) {

    tbody.innerHTML = `
        <tr>
            <td colspan="8" class="empty-data">
                Belum ada data unit kamera/lensa yang tersimpan.
            </td>
        </tr>
    `;

}


// =====================================================
// PENCARIAN BUKU
// =====================================================

function aktifkanPencarianBuku() {

    const searchInput =
        document.querySelector("#search-buku");

    if (!searchInput) return;


    searchInput.addEventListener(
        "input",
        function () {

            const keyword =
                this.value
                    .toLowerCase()
                    .trim();


            const data =
                window.dataBuku || [];


            // Jika pencarian kosong
            if (!keyword) {
                renderDataBuku(data);
                return;
            }


            // Filter data
            const hasil =
                data.filter(function (buku) {

                    const judul =
                        String(
                            buku.judul || ""
                        ).toLowerCase();

                    const pengarang =
                        String(
                            buku.pengarang || ""
                        ).toLowerCase();

                    const penerbit =
                        String(
                            buku.penerbit || ""
                        ).toLowerCase();

                    const kategori =
                        String(
                            buku.kategori || ""
                        ).toLowerCase();

                    const tahun =
                        String(
                            buku.tahun_terbit ||
                            buku.tahun ||
                            ""
                        ).toLowerCase();


                    return (
                        judul.includes(keyword) ||
                        pengarang.includes(keyword) ||
                        penerbit.includes(keyword) ||
                        kategori.includes(keyword) ||
                        tahun.includes(keyword)
                    );

                });


            // Jika tidak ditemukan
            if (hasil.length === 0) {

                const tbody =
                    document.querySelector(
                        "#table-buku tbody"
                    );


                tbody.innerHTML = `
                    <tr>
                        <td colspan="8" class="empty-data">
                            Data unit tidak ditemukan.
                        </td>
                    </tr>
                `;

                return;
            }


            renderDataBuku(hasil);

        }
    );

}


// =====================================================
// TOMBOL EDIT & HAPUS
// =====================================================

function aktifkanTombolBuku() {


    // -----------------------------------------
    // Tombol Edit
    // -----------------------------------------

    document
        .querySelectorAll(".btn-edit")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(this.dataset.index);


                    const data =
                        window.dataBuku || [];


                    const buku =
                        data[index];


                    if (!buku) return;


                    alert(
                        `Edit buku:\n\n` +
                        `Merek: ${buku.judul || "-"}\n` +
                        `Tipe Unit: ${buku.pengarang || "-"}\n` +
                        `Lokasi: ${buku.penerbit || "-"}`
                    );

                }
            );

        });


    // -----------------------------------------
    // Tombol Hapus
    // -----------------------------------------

    document
        .querySelectorAll(".btn-hapus")
        .forEach(function (button) {

            button.addEventListener(
                "click",
                function () {

                    const index =
                        Number(this.dataset.index);


                    const data =
                        window.dataBuku || [];


                    const buku =
                        data[index];


                    if (!buku) return;


                    const namaBuku =
                        buku.judul ||
                        "unit ini";


                    const yakin =
                        confirm(
                            `Apakah kamu yakin ingin menghapus "${namaBuku}"?`
                        );


                    if (!yakin) return;


                    // Hapus dari array
                    data.splice(index, 1);


                    // Simpan kembali ke memory
                    window.dataBuku = data;


                    // Tampilkan ulang
                    renderDataBuku(data);

                }
            );

        });

}


// =====================================================
// ESCAPE HTML / MENCEGAH XSS
// =====================================================

function escapeHtml(value) {

    if (
        value === null ||
        value === undefined
    ) {
        return "";
    }


    return String(value)
        .replace(/&/g, "&amp;")
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#039;");
}
