<?php

use App\Http\Controllers\SectionController;
use Illuminate\Support\Facades\Route;

Route::get("/", function () {
    return redirect()->route("admin.index");
});

Route::prefix("admin")->group(function () {
    Route::name("admin.")->group(function () {
        Route::get("/", [SectionController::class, "index"])->name("index");
        Route::get("sections/{section}/create", [SectionController::class, "create"])
            ->name("sections.create-child-section");
        Route::resource("sections", SectionController::class);
        Route::view("settings", "settings.index")->name("settings");
    });
});
