const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get('userId');

export let urlPUT = "http://localhost:8080/updateuser/" + userId;

export function AmbilResponse(result) {
    console.log(result);
    alert(result.message); 
    window.location.href = "user.html"; 
}