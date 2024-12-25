import axios from "axios";
import Alpine from "alpinejs";
import checkboxes from "./checkboxes.js";

window.axios = axios;
window.axios.defaults.headers.common["X-Requested-With"] = "XMLHttpRequest";

Alpine.data("data", checkboxes);
Alpine.start();
