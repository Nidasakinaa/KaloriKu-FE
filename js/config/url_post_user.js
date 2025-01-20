export let urlPOST = "http://localhost:8080/insertuser";

export function AmbilResponse(result) {
    console.log(result); 
    alert(result.message); 
    window.location.href = "user.html"; 
}