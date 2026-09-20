// =====================================================
// assets/js/app.js
// =====================================================

document.addEventListener("DOMContentLoaded", function () {

    function adaSegmenPath(segmen) {
        return window.location.pathname
            .replace(/\\/g, "/")
            .includes(segmen);
    }

    function halamanDiSubfolder() {
        return adaSegmenPath("/buku/") || adaSegmenPath("/anggota/");
    }

    function buatPathRelatif(pathRoot) {
        return halamanDiSubfolder()
            ? `../${pathRoot}`
            : pathRoot;
    }

    // =================================================
    // 0. CEK LOGIN & STATUS NAV
    // =================================================

    const halamanLogin =
        window.location.pathname.toLowerCase().endsWith("/login.html") ||
        window.location.pathname.toLowerCase().endsWith("\\login.html");

    if (!halamanLogin && localStorage.getItem("isLoggedIn") !== "true") {
        window.location.href = buatPathRelatif("login.html");

        return;
    }

    const btnLogout = document.querySelector(".btn-logout");

    if (btnLogout) {

        btnLogout.addEventListener("click", function () {

            const konfirmasi = confirm("Keluar dari sesi sekarang?");

            if (!konfirmasi) return;

            localStorage.removeItem("isLoggedIn");

            window.location.href = buatPathRelatif("login.html");

        });

    }

    const pathSaatIni =
        window.location.pathname
            .replace(/\\/g, "/")
            .split("/")
            .pop();

    document.querySelectorAll("nav a").forEach(function (link) {

        const href =
            link.getAttribute("href") || "";

        const namaFile =
            href.replace(/\\/g, "/").split("/").pop();

        if (namaFile === pathSaatIni) {
            link.classList.add("active");
        }

    });

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
    // 3B. RINGKASAN BERANDA
    // =================================================

    async function isiStatistikDashboard() {

        const statTotalBuku =
            document.querySelector("#stat-total-buku");

        const statTotalAnggota =
            document.querySelector("#stat-total-anggota");

        const statTotalPinjam =
            document.querySelector("#stat-total-pinjam");

        if (!statTotalBuku || !statTotalAnggota || !statTotalPinjam) {
            return;
        }

        try {

            const [dataBukuResponse, dataAnggotaResponse] =
                await Promise.all([
                    fetch(buatPathRelatif("data/buku.json"), { cache: "no-cache" }),
                    fetch(buatPathRelatif("data/anggota.json"), { cache: "no-cache" })
                ]);

            const dataBuku =
                dataBukuResponse.ok
                    ? await dataBukuResponse.json()
                    : [];

            const dataAnggota =
                dataAnggotaResponse.ok
                    ? await dataAnggotaResponse.json()
                    : [];

            const totalBuku =
                Array.isArray(dataBuku)
                    ? dataBuku.length
                    : 0;

            const totalAnggota =
                Array.isArray(dataAnggota)
                    ? dataAnggota.length
                    : 0;

            const totalDipinjam =
                Array.isArray(dataBuku)
                    ? dataBuku.filter(function (item) {
                        return Number(item.stok) >= 0 && Number(item.stok) <= 3;
                    }).length
                    : 0;

            statTotalBuku.textContent = String(totalBuku);
            statTotalAnggota.textContent = String(totalAnggota);
            statTotalPinjam.textContent = String(totalDipinjam);

        } catch (error) {

            console.error("Gagal memuat statistik dashboard:", error);

            statTotalBuku.textContent = "-";
            statTotalAnggota.textContent = "-";
            statTotalPinjam.textContent = "-";

        }

    }

    isiStatistikDashboard();


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


});
