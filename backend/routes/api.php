<?php

use App\Api\Controllers\ElementController;
use App\Api\Controllers\TranslationController;
use App\Models\Section;
use Illuminate\Support\Facades\Route;

Route::get('/sections', fn() => Section::getAllActiveSections());
Route::post('/translate', [TranslationController::class, 'translate']);
Route::apiResource('sections.elements', ElementController::class);
