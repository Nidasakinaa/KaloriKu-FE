document.addEventListener("DOMContentLoaded", function () {
    const form = document.getElementById("register-form");
    
    form.addEventListener("submit", async function (event) {
        event.preventDefault(); // Prevent default form submission

        const name = document.getElementById("fullname").value;
        const phone = document.getElementById("phone").value;
        const username = document.getElementById("username").value;
        const password = document.getElementById("password").value;
        const role = document.getElementById("role").value;
        
        const requestBody = {
            name: name,
            phone: phone,
            username: username,
            password: password,
            role: role // Bisa diganti sesuai kebutuhan
        };

        try {
            const response = await fetch("https://ws-kaloriku-4cf736febaf0.herokuapp.com/registeruser", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify(requestBody)                                
            });

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
            Swal.fire({
                icon: "error",
                title: "Registrasi Gagal",
                text: error.message,
                allowOutsideClick: false
            });
        }
    });
});
