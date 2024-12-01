<?php

use App\Http\Controllers\SectionController;
use Illuminate\Support\Facades\Route;

Route::get("/", function () {
    return redirect()->route("admin.index");
});

Route::prefix("admin")->group(function () {
    Route::name("admin.")->group(function () {
        Route::get("/", [SectionController::class, "index"])->name("index");
        Route::resource("sections", SectionController::class);
        Route::view("settings", "settings")->name("settings");
    });
});
