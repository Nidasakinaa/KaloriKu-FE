export let urlPOST = "http://localhost:8080/insert"

export function AmbilResponse(result) {
    console.log(result); 
    alert(result.message); 
    window.location.href = "menu.html"; 
}