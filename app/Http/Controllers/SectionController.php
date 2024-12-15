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
        return view('sections.create-edit', [
            'title' => 'Create new section',
            'sections' => Section::getAllSections(),
            'parent_section_id' => $section->id ?? null,
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
            $section = Section::create($attributes, $parentSection);
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

    public function edit(Section $section)
    {
        return view('sections.create-edit', [
            'title' => 'Edit section: '.$section->name,
            'sections' => Section::getAllSections(),
            'section' => $section,
            'parent_section_id' => $section->parent_id ?? null,
        ]);
    }

    public function update(Request $request, Section $section)
    {
        $request->validate([
            "title" => ["required", "min:3"]
        ]);
        $attributes = [
            "name" => $request->input("title"),
            "parent_id" => $request->integer("parent_section_id"),
            "active" => $request->input("is_active") ? 1 : 0
        ];

        $section->update($attributes);

        if ($section->parent_id) {
            $back = redirect()->route('admin.sections.show', ["section" => $section->parent_id]);
        } else {
            $back = redirect()->route('admin.sections.index');
        }

        return $back;
    }

    public function destroy(Section $section)
    {
        $parentId = $section->parent_id ?? null;

        $section->delete();

        if ($parentId) {
            $back = redirect()->route('admin.sections.show', ["section" => $parentId]);
        } else {
            $back = redirect()->route('admin.sections.index');
        }

        return $back;
    }
}
