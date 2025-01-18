const urlParams = new URLSearchParams(window.location.search);
const menuItemId = urlParams.get("menuItemId");

export let urlFetch = "https://ws-kaloriku-4cf736febaf0.herokuapp.com/menu/" + menuItemId;