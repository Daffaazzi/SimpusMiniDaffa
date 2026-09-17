// assets/js/app.js

document.addEventListener("DOMContentLoaded", function () {

    // =====================================================
    // 1. HAMBURGER MENU
    // =====================================================

    const nav = document.querySelector(".nav");
    const btnMenu = document.querySelector(".btn-menu");

    if (btnMenu && nav) {
        btnMenu.addEventListener("click", function () {
            const isOpen = nav.classList.toggle("nav-open");
            btnMenu.setAttribute("aria-expanded", isOpen);
        });
    }


    // =====================================================
    // 2. VALIDASI FORM
    // =====================================================

    function initValidasiForm(form) {
        if (!form) return;

        form.addEventListener("submit", function (event) {

            // Hapus pesan error sebelumnya
            const errorLama = form.querySelectorAll(".error-message");
            errorLama.forEach(function (error) {
                error.remove();
            });

            let valid = true;

            // Ambil semua field wajib
            const fieldWajib = form.querySelectorAll("[required]");

            fieldWajib.forEach(function (field) {
                if (field.value.trim() === "") {
                    tampilkanError(field, "Field ini wajib diisi.");
                    valid = false;
                }
            });


            // -------------------------------------------------
            // Validasi tahun
            // -------------------------------------------------

            const inputTahun = form.querySelector(
                'input[name="tahun"], input[name="tahun_terbit"]'
            );

            if (inputTahun && inputTahun.value.trim() !== "") {
                const tahun = parseInt(inputTahun.value, 10);
                const tahunSekarang = new Date().getFullYear();

                if (isNaN(tahun) || tahun < 1000 || tahun > tahunSekarang) {
                    tampilkanError(
                        inputTahun,
                        "Tahun harus berada antara 1000 dan " + tahunSekarang + "."
                    );
                    valid = false;
                }
            }


            // -------------------------------------------------
            // Validasi stok
            // -------------------------------------------------

            const inputStok = form.querySelector('input[name="stok"]');

            if (inputStok && inputStok.value.trim() !== "") {
                const stok = parseInt(inputStok.value, 10);

                if (isNaN(stok) || stok < 0) {
                    tampilkanError(
                        inputStok,
                        "Stok tidak boleh kurang dari 0."
                    );
                    valid = false;
                }
            }


            // Jika tidak valid, cegah form dikirim
            if (!valid) {
                event.preventDefault();
            }
        });
    }


    // Fungsi untuk menampilkan pesan error
    function tampilkanError(field, pesan) {
        const error = document.createElement("div");
        error.classList.add("error-message");
        error.textContent = pesan;

        field.insertAdjacentElement("afterend", error);
    }


    // Inisialisasi Form
    const formTambahBuku = document.querySelector("#form-tambah-buku");
    const formTambahAnggota = document.querySelector("#form-tambah-anggota");

    initValidasiForm(formTambahBuku);
    initValidasiForm(formTambahAnggota);


    // =====================================================
    // 3. FILTER TABEL REAL-TIME
    // =====================================================

    function initTableFilter(input, table) {
        if (!input || !table) return;

        const filterHandler = function () {
            const keyword = input.value.toLowerCase().trim();
            const rows = table.querySelectorAll("tbody tr");

            rows.forEach(function (row) {
                const text = row.textContent.toLowerCase();

                if (text.includes(keyword)) {
                    row.style.display = "";
                } else {
                    row.style.display = "none";
                }
            });
        };

        input.addEventListener("keyup", filterHandler);
        input.addEventListener("input", filterHandler);
    }


    // Inisialisasi Filter
    const searchBuku = document.querySelector("#search-buku");
    const tableBuku = document.querySelector("#table-buku");
    initTableFilter(searchBuku, tableBuku);

    const searchAnggota = document.querySelector("#search-anggota");
    const tableAnggota = document.querySelector("#table-anggota");
    initTableFilter(searchAnggota, tableAnggota);

    const searchGeneric = document.querySelector("#search-input");
    const tableGeneric = document.querySelector("table");
    if (searchGeneric && tableGeneric && !searchBuku && !searchAnggota) {
        initTableFilter(searchGeneric, tableGeneric);
    }


    // =====================================================
    // 4. TOMBOL HAPUS (EVENT DELEGATION)
    // =====================================================

    function initHapusConfirm() {
        document.addEventListener("click", function (event) {
            const button = event.target.closest(".btn-hapus");

            if (button) {
                const konfirmasi = confirm(
                    "Apakah kamu yakin ingin menghapus data ini?"
                );

                if (konfirmasi) {
                    const row = button.closest("tr");

                    if (row) {
                        row.style.transition = "opacity 0.3s ease, transform 0.3s ease";
                        row.style.opacity = "0";
                        row.style.transform = "scale(0.95)";

                        setTimeout(() => {
                            row.remove();
                        }, 300);
                    }
                }
            }
        });
    }

    initHapusConfirm();

});