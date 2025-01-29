// Fungsi untuk mengambil data dari API dan menampilkannya di tabel
async function fetchMenuData() {
    try {
      // Ambil data dari endpoint
      const response = await fetch("https://ws-kaloriku-4cf736febaf0.herokuapp.com/menu");
  
      // Periksa apakah respons sukses
      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
  
      // Parse data ke JSON
      const menuItems = await response.json();
      console.log("Menu Data:", menuItems);
      // Elemen container untuk tabel
      const tbody = document.querySelector("tbody");
  
      // Hapus konten lama (jika ada)
      tbody.innerHTML = "";
  
      // Loop melalui data dan buat elemen HTML untuk setiap item
      menuItems.forEach((item) => {
        const tr = document.createElement("tr");
        tr.className = "whitespace-nowrap h-11 border-b border-gray-200";
  
        tr.innerHTML = `
                  <td class="px-4 py-2">
                    <img src="${item.image}" alt="User Image" class="w-full h-80 object-cover rounded-lg mb-4">
                  </td>
                  <td class="text-xl font-semibold mb-2">${item.name}</td>
                  <td class="text-gray-700 mb-2"><strong>Kalori:</strong>${item.calories}</td>
                  <td class="px-4 py-2"><strong>komposisi:</strong>${item.ingredients}</td>
              `;
  
        // Tambahkan baris ke tabel
        tbody.appendChild(tr);
      });
  
      document.querySelectorAll(".edit-btn").forEach((button) => {
        button.addEventListener("click", (event) => {
          event.preventDefault(); // Mencegah navigasi langsung
  
          const id = button.getAttribute("data-id");
          const item = menuItems.find((menuItem) => menuItem._id === id);
          console.log("Menu Data:", item); // Tampilkan data menu di console
  
          // Tampilkan popup konfirmasi
          if (confirm(`Edit menu item: ${item.name}?`)) {
            console.log("Menu Data:", item); // Tampilkan data menu di console
  
            // Navigasi ke halaman edit
            window.location.href = `edit_menu.html?menuItemId=${id}`;
          }
        });
      });
  
      // Tambahkan event listener untuk tombol delete
      document.querySelectorAll(".delete-btn").forEach((button) => {
        button.addEventListener("click", async (event) => {
          event.preventDefault();
          const id = button.getAttribute("data-id");
          if (confirm("Are you sure you want to delete this menu item?")) {
            await deleteMenuItem(id);
          }
        });
      });
    } catch (error) {
      console.error("Error fetching menu data:", error);
  
      // Tampilkan pesan error di halaman
      const tbody = document.querySelector("tbody");
      tbody.innerHTML =
        '<tr><td colspan="7" class="text-center text-red-500">Failed to load menu data. Please try again later.</td></tr>';
    }
  }
  
  // Fungsi untuk menghapus item menu berdasarkan ID
  async function deleteMenuItem(id) {
    try {
      const response = await fetch(`https://ws-kaloriku-4cf736febaf0.herokuapp.com/delete/${id}`, {
        method: "DELETE",
      });
  
      if (response.ok) {
        alert("Menu item deleted successfully.");
        fetchMenuData(); // Refresh data setelah menghapus
      } else {
        throw new Error(`HTTP error! status: ${response.status}`);
      }
    } catch (error) {
      console.error("Error deleting menu item:", error);
      alert("Failed to delete menu item. Please try again later.");
    }
  }
  
  // Panggil fungsi fetchMenuData saat halaman dimuat
  document.addEventListener("DOMContentLoaded", fetchMenuData);
  