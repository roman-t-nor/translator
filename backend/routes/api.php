<?php

use App\Models\Section;
use Illuminate\Support\Facades\Route;

Route::get('/sections', fn() => Section::getAllActiveSections());
