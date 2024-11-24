<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\View\View;

class AdminController extends Controller
{
    public function show(): View
    {
        return view('admin.index', ["sections" => Section::prepareSections()]);
    }
}
