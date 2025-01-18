// Pastikan file ini di-link di HTML Anda sebelum tag penutup </body>

// Fungsi untuk mengambil data dari API dan menampilkannya di halaman
async function fetchMenuData() {
    try {
        // Ambil data dari endpoint
        const response = await fetch('https://ws-kaloriku-4cf736febaf0.herokuapp.com/menu');

        // Periksa apakah respons sukses
        if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
        }

        // Parse data ke JSON
        const menuItems = await response.json();

        // Elemen container untuk item menu
        const container = document.querySelector('.row.g-4');

        // Hapus konten lama (jika ada)
        container.innerHTML = '';

        // Loop melalui data dan buat elemen HTML
        menuItems.forEach(item => {
            const colDiv = document.createElement('div');
            colDiv.className = 'col-md-4 wow fadeInUp';
            colDiv.setAttribute('data-wow-delay', '0.1s');

            colDiv.innerHTML = `
                <div class="product-item">
                    <img class="img-fluid w-100" src="${item.image || 'placeholder.jpg'}" alt="${item.name}">
                    <div class="text-center p-4">
                        <h5>${item.name}</h5>
                        <p><strong>Kalori:</strong> ${item.calories || 'N/A'} kcal</p>
                        <p><strong>Komposisi:</strong> ${item.description || 'Tidak tersedia'}</p>
                    </div>
                </div>
            `;

            // Tambahkan ke container
            container.appendChild(colDiv);
        });
    } catch (error) {
        console.error('Error fetching menu data:', error);

        // Tampilkan pesan error di halaman
        const container = document.querySelector('.row.g-4');
        container.innerHTML = '<p class="text-danger">Gagal memuat data menu. Silakan coba lagi nanti.</p>';
    }
}

// Panggil fungsi fetchMenuData saat halaman dimuat
document.addEventListener('DOMContentLoaded', fetchMenuData);
