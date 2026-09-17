// =====================================================
// assets/js/app.js
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    // =================================================
    // 1. HAMBURGER MENU
    // =================================================

    const nav = document.querySelector(".nav");
    const btnMenu = document.querySelector(".btn-menu");

    if (btnMenu && nav) {

        btnMenu.addEventListener("click", function () {

            const isOpen = nav.classList.toggle("nav-open");

            btnMenu.setAttribute(
                "aria-expanded",
                String(isOpen)
            );

        });

    }


    // =================================================
    // 2. VALIDASI FORM
    // =================================================

    function initValidasiForm(form) {

        if (!form) return;

        form.addEventListener("submit", function (event) {

            // Hapus error lama
            const errorLama =
                form.querySelectorAll(".error-message");

            errorLama.forEach(function (error) {
                error.remove();
            });

            let valid = true;


            // -----------------------------------------
            // Validasi field wajib
            // -----------------------------------------

            const fieldWajib =
                form.querySelectorAll("[required]");

            fieldWajib.forEach(function (field) {

                if (field.value.trim() === "") {

                    tampilkanError(
                        field,
                        "Field ini wajib diisi."
                    );

                    valid = false;
                }

            });


            // -----------------------------------------
            // Validasi tahun
            // -----------------------------------------

            const inputTahun = form.querySelector(
                'input[name="tahun"], input[name="tahun_terbit"]'
            );

            if (
                inputTahun &&
                inputTahun.value.trim() !== ""
            ) {

                const tahun =
                    parseInt(inputTahun.value, 10);

                const tahunSekarang =
                    new Date().getFullYear();

                if (
                    isNaN(tahun) ||
                    tahun < 1000 ||
                    tahun > tahunSekarang
                ) {

                    tampilkanError(
                        inputTahun,
                        "Tahun harus berada antara 1000 dan " +
                        tahunSekarang + "."
                    );

                    valid = false;
                }

            }


            // -----------------------------------------
            // Validasi stok
            // -----------------------------------------

            const inputStok =
                form.querySelector('input[name="stok"]');

            if (
                inputStok &&
                inputStok.value.trim() !== ""
            ) {

                const stok =
                    parseInt(inputStok.value, 10);

                if (
                    isNaN(stok) ||
                    stok < 0
                ) {

                    tampilkanError(
                        inputStok,
                        "Stok tidak boleh kurang dari 0."
                    );

                    valid = false;
                }

            }


            // -----------------------------------------
            // Cegah submit jika tidak valid
            // -----------------------------------------

            if (!valid) {
                event.preventDefault();
            }

        });

    }


    // =================================================
    // FUNGSI MENAMPILKAN ERROR
    // =================================================

    function tampilkanError(field, pesan) {

        const error =
            document.createElement("div");

        error.className = "error-message";

        error.textContent = pesan;

        field.insertAdjacentElement(
            "afterend",
            error
        );

    }


    // =================================================
    // INISIALISASI FORM
    // =================================================

    const formTambahBuku =
        document.querySelector("#form-tambah-buku");

    const formTambahAnggota =
        document.querySelector("#form-tambah-anggota");

    initValidasiForm(formTambahBuku);
    initValidasiForm(formTambahAnggota);


    // =================================================
    // 3. FILTER TABEL REAL-TIME
    // =================================================

    function initTableFilter(input, table) {

        if (!input || !table) return;

        function filterHandler() {

            const keyword =
                input.value
                    .toLowerCase()
                    .trim();

            const rows =
                table.querySelectorAll("tbody tr");

            rows.forEach(function (row) {

                const text =
                    row.textContent.toLowerCase();

                if (text.includes(keyword)) {

                    row.style.display = "";

                } else {

                    row.style.display = "none";

                }

            });

        }


        input.addEventListener(
            "input",
            filterHandler
        );

    }


    // =================================================
    // FILTER BUKU
    // =================================================

    const searchBuku =
        document.querySelector("#search-buku");

    const tableBuku =
        document.querySelector("#table-buku");

    initTableFilter(
        searchBuku,
        tableBuku
    );


    // =================================================
    // FILTER ANGGOTA
    // =================================================

    const searchAnggota =
        document.querySelector("#search-anggota");

    const tableAnggota =
        document.querySelector("#table-anggota");

    /*
     * Jangan menjalankan filter anggota jika
     * anggota.js sudah menangani pencarian.
     *
     * anggota.js versi sebelumnya sudah memiliki
     * fitur pencarian sendiri.
     */

    if (!window.dataAnggota) {

        initTableFilter(
            searchAnggota,
            tableAnggota
        );

    }


    // =================================================
    // FILTER GENERIC
    // =================================================

    const searchGeneric =
        document.querySelector("#search-input");

    const tableGeneric =
        document.querySelector("table");

    if (
        searchGeneric &&
        tableGeneric &&
        !searchBuku &&
        !searchAnggota
    ) {

        initTableFilter(
            searchGeneric,
            tableGeneric
        );

    }


    // =================================================
    // 4. KONFIRMASI TOMBOL HAPUS
    // =================================================

    document.addEventListener(
        "click",
        function (event) {

            const button =
                event.target.closest(".btn-hapus");

            if (!button) return;


            const konfirmasi =
                confirm(
                    "Apakah kamu yakin ingin menghapus data ini?"
                );


            if (!konfirmasi) return;


            const row =
                button.closest("tr");

            if (!row) return;


            // Animasi menghilang
            row.style.transition =
                "opacity 0.3s ease, transform 0.3s ease";

            row.style.opacity = "0";

            row.style.transform =
                "scale(0.95)";


            setTimeout(function () {

                row.remove();

            }, 300);

        }
    );

});
