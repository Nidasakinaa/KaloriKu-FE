//logout.js
document.getElementById('logout').addEventListener('click', function(event) {
    event.preventDefault();
    // Hapus sesi atau token autentikasi di sini
    // Contoh: localStorage.removeItem('authToken');
    localStorage.removeItem('authToken');
    // Redirect ke halaman login
    window.location.href = '../../pages/form_login.html';
});