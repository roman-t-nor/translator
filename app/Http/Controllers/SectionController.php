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

    public function create(?Section $section)
    {
        return view('sections.create', [
            'title' => 'Create new section',
            'sections' => Section::getAllSections(),
            'section' => $section,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "title" => ["required", "min:3"]
        ]);
        $attributes = [
            "name" => $request->input("title")
        ];

        $parentSectionId = $request->integer("parent_section_id");
        if ($parentSectionId) {
            $parentSection = Section::findOrFail($parentSectionId);
            $section = new Section($attributes);
            $parentSection->appendNode($section);
        } else {
            $section = Section::create($attributes);
        }


        return redirect()->route('admin.sections.show', compact('section'));
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
