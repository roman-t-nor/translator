<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function index()
    {
        return view('admin.sections', ['sections' => Section::getFirstLevelSections()]);
    }

    public function create()
    {
    }

    public function store(Request $request)
    {
    }

    public function show(Section $section)
    {
        return view(
            'admin.sections',
            [
                'sections' => Section::getSections($section),
                'section' => $section
            ]
        );
    }

    public function edit(string $id)
    {
    }

    public function update(Request $request, string $id)
    {
    }

    public function destroy(string $id)
    {
    }
}
