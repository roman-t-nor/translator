<?php

namespace App\Http\Controllers;

use App\Models\Section;
use Illuminate\Http\Request;

class SectionController extends Controller
{
    public function index()
    {
        return view('sections.index', [
            'sections' => Section::getFirstLevelSections(),
            'title' => 'All sections',
        ]);
    }

    public function create()
    {
        return view('sections.create', ['title' => 'Create new section']);
    }

    public function store(Request $request)
    {
        $request->validate([
            "title" => ["required", "min:3"]
        ]);

        $s = Section::create(["name" => $request->input("title")]);

        return redirect()->route('admin.sections.show', ['section' => $s->id]);
    }

    public function show(Section $section)
    {
        return view(
            'sections.index',
            [
                'sections' => Section::getChildSections($section),
                'section' => $section,
                'title' => 'Section: '.$section->name
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
