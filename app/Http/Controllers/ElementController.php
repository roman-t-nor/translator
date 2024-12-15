<?php

namespace App\Http\Controllers;

use App\Models\Element;
use App\Models\Section;
use Illuminate\Http\Request;

class ElementController extends Controller
{
    public function index(Section $section)
    {
        return view('elements.index', [
            'section' => $section,
            'elements' => $section->elements()->paginate(20),
            'title' => 'Elements from section: "'.$section->name.'"',
        ]);
    }

    public function create(Section $section)
    {
        return view('elements.create-edit', [
            'title' => 'Create Element',
            'section' => $section,
            'sections' => Section::getAllSections(),
            'parent_section_id' => null,
        ]);
    }

    public function store(Request $request)
    {
        $request->validate([
            "title" => ["required", "min:3"]
        ]);

        $section = Section::findOrFail($request->integer("section_id"));

        Element::create([
            'name' => $request->input('title'),
            'section_id' => $section->id
        ]);

        return redirect()->route('admin.sections.elements.index', compact('section'));
    }

    public function edit(Section $section, Element $element)
    {
        return view('elements.create-edit', [
            'title' => 'Edit Element',
            'section' => $section,
            'element' => $element,
            'sections' => Section::getAllSections(),
            'parent_section_id' => $section->id ?? null,
        ]);
    }

    public function update(Request $request, Section $section, Element $element)
    {
        $request->validate([
            "title" => ["required", "min:3"]
        ]);

        $section = Section::findOrFail($request->integer("section_id"));

        $element->update([
            'name' => $request->input('title'),
            'section_id' => $section->id
        ]);

        return redirect()->route('admin.sections.elements.index', compact('section'));
    }

    public function destroy(Section $section, Element $element)
    {
        $element->delete();
        return redirect()->route('admin.sections.elements.index', compact('section'));
    }
}
