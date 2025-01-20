const urlParams = new URLSearchParams(window.location.search);
const userId = urlParams.get("userId");

if (!muserId) {
    console.error("userId is missing in the URL");
} else {
    console.log("userId:", userId);
}

export let urlFetch = "http://localhost:8080/user/" + userId;

console.log("Fetching from URL:", urlFetch);

