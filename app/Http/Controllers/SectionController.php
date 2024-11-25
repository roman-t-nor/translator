<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function index()
    {
        return view('sections', [
            'sections' => Section::getFirstLevelSections(),
            'title' => 'All sections',
        ]);
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
            'sections',
            [
                'sections' => Section::getSections($section),
                'section' => $section,
                'title' => 'Section: ' . $section->name
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
