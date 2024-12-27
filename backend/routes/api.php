<?php

use App\Api\Controllers\ElementController;
use App\Api\Controllers\TranslationController;
use App\Models\Section;
use Illuminate\Support\Facades\Route;

Route::get('/sections', fn() => Section::getAllActiveSections());
Route::get('/translate', [TranslationController::class, 'translate']);
Route::get('/sections/{section}/elements', [ElementController::class, 'index']);
Route::post('/sections/{section}/elements', [ElementController::class, 'store']);
