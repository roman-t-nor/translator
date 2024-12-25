<?php

namespace App\Http\Controllers;

use App\Models\Element;
use App\Models\Section;
use App\Requests\StoreElementRequest;
use App\View\Components\Message;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;

class ElementController
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

    public function store(StoreElementRequest $request, Section $section)
    {
        $element = Element::store(
            sectionId: $section->id,
            title: $request->input('title'),
            translation: $request->input('translation'),
            context: $request->input('context'),
        );

        Message::add('Element "'.$element->name.'" created');

        if ($request->input('saving_type') === 'just_save') {
            $route = redirect()->route('sections.elements.index', compact('section'));
        } else {
            $route = back(); // save and create
        }

        return $route;
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
            'title' => ['required', 'min:3', 'max:255'],
            'translation' => ['required', 'min:3', 'max:255'],
            'context' => ['min:3', 'max:1500', 'nullable']
        ]);

        $section = Section::findOrFail($request->integer('section_id'));

        $element->update([
            'name' => $request->input('title'),
            'translation' => $request->input('translation'),
            'context' => $request->input('context'),
            'section_id' => $section->id
        ]);

        Message::add('Element "'.$element->name.'" updated');
        return redirect()->route('sections.elements.index', compact('section'));
    }

    public function destroy(Section $section, Element $element): RedirectResponse
    {
        $element->delete();
        Message::add('Element "'.$element->name.'" deleted');
        return redirect()->route('sections.elements.index', compact('section'));
    }

    public function mass_destroy(Request $request): RedirectResponse
    {
        $ids = collect($request->input('element_id'))->map(fn(string $id) => (int) $id);

        if ($ids->count() === 1) {
            $element = Element::findOrFail($ids[0]);
            Message::add('Element "'.$element->name.'" deleted');
            $element->delete();
        } else {
            Message::add('Elements |('.$ids->count().')| deleted');
            Element::destroy($ids);
        }

        return back();
    }
}
