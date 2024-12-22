import { defineConfig } from "vite";
import laravel from "laravel-vite-plugin";

export default defineConfig({
    plugins: [
        laravel({
            input: ["resources/css/app.css", "resources/js/app.js"],
            refresh: true,
            hotFile: "./public_html/admin/hot",
        }),
    ],
    build: {
        outDir: "./public_html/admin/dist",
        assetsDir: "",
    },
    publicDir: "resources/public",
});
