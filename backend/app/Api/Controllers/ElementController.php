<?php

namespace App\Api\Controllers;

use App\Models\Element;
use App\Models\Section;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ElementController
{
    public function index(Section $section): ?Collection
    {
        return $section->elements()->get();
    }

    public function store(Section $section, Request $request): ?Collection
    {
        $context = $request->input('context');
        $translateFrom = $request->input('translate_from');
        $translateTo = $request->input('translate_to');

        $duplicates = collect();
        foreach ($translateFrom as $key => $title) {
            if (empty($title) || empty($translateTo[$key])) {
                continue;
            }

            Element::store(
                sectionId: $section->id,
                title: $title,
                translation: $translateTo[$key],
                context: $context,
            );

            $elementDuplicates = $this->getDuplicates($title);
            if ($elementDuplicates) {
                $duplicates = $duplicates->concat($elementDuplicates);
            }
        }

        if ($duplicates->isEmpty()) {
            return null;
        }

        return $duplicates;
    }

    private function getDuplicates(string $title)
    {
        $duplicates = Element::where('name', $title)->get();
        if ($duplicates->count() < 2) {
            return null;
        }
        foreach ($duplicates as $k => $duplicate) {
            $ancestors = Section::defaultOrder()->ancestorsAndSelf($duplicate->section_id);
            $duplicate->path = $ancestors->pluck('name')->join(' / ');
            $duplicates[$k] = $duplicate;
        }

        return $duplicates;
    }

    public function update(Request $request, Section $section, Element $element)
    {
        $request->validate([
            'title' => ['required', 'min:3', 'max:255'],
            'translation' => ['required', 'min:3', 'max:255'],
            'context' => ['min:3', 'max:1500', 'nullable']
        ]);

        $element->update([
            'name' => $request->input('title'),
            'translation' => $request->input('translation'),
            'context' => $request->input('context'),
        ]);

        return 'Element "'.$element->name.'" updated';
    }

    public function destroy(Section $section, Element $element)
    {
        $element->delete();
        return 'Element "'.$element->name.'" deleted';
    }

}
