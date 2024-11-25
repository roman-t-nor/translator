<?php

use App\Http\Controllers\SectionController;
use Illuminate\Support\Facades\Route;

Route::get('/', function () {
    return redirect()->route('admin.sections.index');
});

Route::get('/admin', [SectionController::class, 'index']);

Route::prefix('admin')->group(function () {
    Route::name('admin.')->group(function () {
        Route::resource('sections', SectionController::class)->except(['index']);
    });
});
