document.addEventListener("DOMContentLoaded", function () {
    // Pastikan elemen form login terlihat setelah halaman dimuat
    const loginFormContainer = document.getElementById("loginFormContainer");
    if (loginFormContainer) {
        loginFormContainer.style.display = "block";
    } else {
        console.error("Elemen loginFormContainer tidak ditemukan.");
    }

    // Event listener untuk menangani form login
    const loginForm = document.getElementById("loginForm");
    if (!loginForm) {
        console.error("Elemen loginForm tidak ditemukan.");
        return;
    }

    loginForm.addEventListener("submit", async function (event) {
        event.preventDefault(); // Mencegah reload halaman

        // Ambil nilai input username, password, dan role
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        // Validasi input kosong
        if (!username || !password || !role) {
            Swal.fire({
                icon: "error",
                title: "Oops...",
                text: "Harap isi username, password, dan role!",
                allowOutsideClick: false
            });
            return;
        }

        try {
            // Kirim request ke API menggunakan fetch
            const response = await fetch("https://ws-kaloriku-4cf736febaf0.herokuapp.com/login", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ username, password, role })
            });

            // Periksa apakah respons dari server berhasil
            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Login gagal. Silakan coba lagi.");
            }

            // Periksa token dan role
            const token = data.token;

            if (!token) {
                throw new Error("Token tidak valid. Silakan coba lagi.");
            }

            // Simpan token & role ke localStorage
            localStorage.setItem("token", token);
            localStorage.setItem("role", role);

            // Login berhasil
            Swal.fire({
                icon: "success",
                title: "Login Berhasil",
                text: `Selamat datang, ${username}!`,
                allowOutsideClick: false,
                confirmButtonText: "OK"
            }).then(() => {
                // Redirect ke halaman sesuai role
                if (role === "admin") {
                    window.location.href = "../../pages/admin/dashboard_admin.html";
                } else if (role === "customer") {
                    window.location.href = "../../pages/costumer/dashboard_cost.html";
                } else {
                    window.location.href = "../../pages/index.html"; // Default redirect jika role tidak dikenali
                }
            });

        } catch (error) {
            console.error("Terjadi kesalahan saat login:", error);

            // Tangani kesalahan login
            Swal.fire({
                icon: "error",
                title: "Login Gagal",
                text: error.message,
                allowOutsideClick: false
            });
        }
    });
});