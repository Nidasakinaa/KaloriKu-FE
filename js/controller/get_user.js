import { addInner } from "https://bukulapak.github.io/element/process.js";
import { isiTabel } from "../temp/tableUser.js";
export function isiTableUser(results) {
    results.forEach(isiRow);
    console.log(results);
}
function isiRow(value) {
    let content =
        isiTabel
            .replace("#ID#", value._id)
            .replace("#NAMA LENGKAP#", value.name ? value.name : "Nama Menu tidak tersedia")
            .replace("#NO.HP#", value.phone ? value.phone : "No.HP tidak tersedia")
            .replace("#USERNAME#", value.username ? value.username : "Useername tidak tersedia")
            .replace("#PASSWORD#", value.password ? value.password : "Password tidak tersedia")
            .replace("#ROLE#", value.role ? value.role : "Role tidak tersedia")
            .replace("#IDEDIT#", value._id)
            .replace("#IDHAPUS#", value._id);
    addInner("iniTabelUser", content);
}