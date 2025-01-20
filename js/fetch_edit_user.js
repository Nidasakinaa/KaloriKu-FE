import { get } from "https://bukulapak.github.io/api/process.js";
import { isiDataUser } from "./controller/edit_user.js";
import { urlFetch } from "./config/url_get_detail_user.js";
get(urlFetch, isiDataUser); 