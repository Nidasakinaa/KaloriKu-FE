const urlParams = new URLSearchParams(window.location.search);
const menuItemId = urlParams.get('menuItemId');

export let urlPUT = "http://localhost:8080/update/" + menuItemId;

export function AmbilResponse(result) {
    console.log(result);
    alert(result.message); 
    window.location.href = "menu.html"; 
}