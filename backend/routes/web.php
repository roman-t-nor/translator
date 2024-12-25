<?php

use App\Http\Controllers\ElementController;
use App\Http\Controllers\SectionController;
use Illuminate\Support\Facades\Route;

Route::get('/', [SectionController::class, 'index'])->name('index');
Route::get('sections/{section}/create', [SectionController::class, 'create'])
    ->name('sections.create-child-section');
Route::resource('sections', SectionController::class);

Route::delete('elements', [ElementController::class, 'mass_destroy'])->name('elements.mass_destroy');
Route::resource('sections.elements', ElementController::class);

Route::view('settings', 'settings.index')->name('settings');
