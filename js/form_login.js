// Pastikan DOM sudah dimuat sepenuhnya
document.addEventListener("DOMContentLoaded", () => {
    // Ambil elemen form dan tombol login
    const loginForm = document.getElementById("login-form");
    const loginBtn = document.getElementById("login-btn");

    // Tambahkan event listener pada tombol login
    loginBtn.addEventListener("click", (event) => {
        event.preventDefault(); // Hindari perilaku default form submission

        // Ambil nilai dari input username dan password
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();

        // Validasi input
        if (username && password) {
            // Login berhasil (bisa ditambahkan autentikasi lebih lanjut di sini)
            alert(`Welcome, ${username}!`);
            // Redirect after login success
            window.location.href = "home.html";  // Ganti URL sesuai dengan halaman index Anda
        } else {
            // Tampilkan pesan error jika input kosong
            alert("Please fill in both username and password!");
        }
    });
});
