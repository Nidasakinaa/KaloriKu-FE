// Fungsi untuk mengambil data dari API dan menampilkannya di tabel
async function fetchMenuData() {
  try {
    const response = await fetch("https://ws-kaloriku-4cf736febaf0.herokuapp.com/menu");

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const menuItems = await response.json();
    console.log("Menu Data:", menuItems);

    const tbody = document.querySelector("tbody");
    tbody.innerHTML = "";

    menuItems.forEach((item) => {
      let imageUrl = item.image;

      // Jika gambar berasal dari Google Drive, ubah ke format yang benar
      if (imageUrl.includes("googleusercontent.com")) {
        const fileId = imageUrl.split("/d/")[1]?.split("/")[0];
        if (fileId) {
          imageUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;
        }
      }

      // Jika gambar berasal dari GitHub Pages, pastikan formatnya benar
      if (imageUrl.includes("github.io")) {
        imageUrl = imageUrl.replace("github.com", "github.io").replace("/blob/", "/");
      }

      const tr = document.createElement("tr");
      tr.className = "whitespace-nowrap h-11 border-b border-gray-200";

      tr.innerHTML = `
        <td class="px-4 py-2">
          <img src="${imageUrl}" alt="${item.name}" class="w-16 h-16 object-cover rounded-full">
        </td>
        <td class="px-4 py-2">${item.name}</td>
        <td class="px-4 py-2">${item.ingredients}</td>
        <td class="px-4 py-2">${item.calories}</td>
        <td class="px-4 py-2">${item.description}</td>
        <td class="px-4 py-2">${item.category}</td>
        <td class="px-4 py-2">
          <a href="edit_menu.html?menuItemId=${item._id}" class="text-blue-500 hover:underline edit-btn" data-id="${item._id}">Edit</a>
          <a href="#" class="text-red-500 hover:underline delete-btn" data-id="${item._id}">Delete</a>
        </td>
      `;

      tbody.appendChild(tr);
    });

    // Event listener untuk tombol edit
    document.querySelectorAll(".edit-btn").forEach((button) => {
      button.addEventListener("click", (event) => {
        event.preventDefault();
        const id = button.getAttribute("data-id");
        const item = menuItems.find((menuItem) => menuItem._id === id);
        if (confirm(`Edit menu item: ${item.name}?`)) {
          window.location.href = `edit_menu.html?menuItemId=${id}`;
        }
      });
    });

    // Event listener untuk tombol delete
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
    document.querySelector("tbody").innerHTML =
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
      fetchMenuData();
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
