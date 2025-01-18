// register.js

document.addEventListener("DOMContentLoaded", function () {
    const form = document.querySelector("form");
    const passwordField = document.getElementById("password");
    const confirmPasswordField = document.getElementById("confirm-password");

    form.addEventListener("submit", function (event) {
        event.preventDefault(); // Prevent default form submission

        // Validate password matching
        if (passwordField.value !== confirmPasswordField.value) {
            alert("Passwords do not match!");
            confirmPasswordField.focus();
            return;
        }

        // Simulate registration success
        alert("Registration successful! Redirecting to login page...");

        // Redirect to login page
        window.location.href = "form_login.html";
    });
});
