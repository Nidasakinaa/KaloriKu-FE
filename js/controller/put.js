import { putData } from "https://bukulapak.github.io/api/process.js";
import { onClick, getValue } from "https://bukulapak.github.io/element/process.js";
import { urlPUT, AmbilResponse } from "../config/url_put.js";

function validateInput(value, fieldName) {
    if (!value) {
        alert(`Please enter a valid ${fieldName}`);
        return false;
    }
    return true;
}

function pushData() {
    let name = getValue("name");
    let description = getValue("description");
    let category = getValue("category");
    let image = getValue("image");

    if (
        validateInput(name, "Name") &&
        validateInput(description, "Description") &&
        validateInput(category, "Category") &&
        validateInput(image, "Image") 
    ) {
        let data = {
            name: name,
            description: description,
            category: category,            
            image: image,
        };
        putData(urlPUT, data, AmbilResponse);
    }
}

onClick("submitButton", pushData);
