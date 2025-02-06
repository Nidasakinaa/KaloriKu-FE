document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("register-form").addEventListener("submit", async function (event) {
        event.preventDefault();

        const name = document.getElementById("name").value.trim();
        const phone = document.getElementById("phone").value.trim();
        const username = document.getElementById("username").value.trim();
        const password = document.getElementById("password").value.trim();
        const role = document.getElementById("role").value;

        // Validasi nama
        if (!/^[a-zA-Z\s]+$/.test(name)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Name",
                text: "Nama harus berupa huruf.",
                allowOutsideClick: false
            });
            return;
        }

        // Validasi nomor HP
        if (!/^08\d{8,}$/.test(phone)) {
            Swal.fire({
                icon: "error",
                title: "Invalid Phone Number",
                text: "Nomor HP harus berupa angka dan diawali dengan 08.",
                allowOutsideClick: false
            });
            return;
        }

        // Validasi role
        if (!role) {
            Swal.fire({
                icon: "error",
                title: "Role Not Selected",
                text: "Harap pilih role.",
                allowOutsideClick: false
            });
            return;
        }

        const requestBody = {
            name: name,
            phone: phone,
            username: username,
            password: password,
            role: role
        };

        try {
            const response = await fetch("https://ws-kaloriku-4cf736febaf0.herokuapp.com/registeruser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)
            });

            if (!response.ok) {
                const errorData = await response.json();
                throw new Error(errorData.message || "Registrasi gagal. Silakan coba lagi.");
            }

            const result = await response.json();

            Swal.fire({
                icon: "success",
                title: "Registrasi Berhasil",
                text: "Akun Anda telah berhasil dibuat!",
                allowOutsideClick: false,
                confirmButtonText: "OK"
            }).then(() => {
                window.location.href = "/pages/form_login.html";
            });
        } catch (error) {
            console.error("Terjadi kesalahan saat registrasi:", error);

            Swal.fire({
                icon: "error",
                title: "Registrasi Gagal",
                text: error.message,
                allowOutsideClick: false
            });
        }
    });
});