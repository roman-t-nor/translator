<?php

use App\Http\Controllers\TranslationController;
use App\Models\Section;
use Illuminate\Support\Facades\Route;

Route::get('/sections', fn() => Section::getAllActiveSections());
Route::get('/translate', [TranslationController::class, 'translate']);
