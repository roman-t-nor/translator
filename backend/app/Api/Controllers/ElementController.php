<?php

namespace App\Api\Controllers;

use App\Models\Element;
use App\Models\Section;
use App\View\Components\Message;
use Exception;
use Illuminate\Http\Request;
use Illuminate\Support\Collection;

class ElementController
{
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

            $elementDuplicates = Element::where('name', $title)->get();
            if ($elementDuplicates->count() > 1) {
                $duplicates = $duplicates->concat($elementDuplicates);
            }
        }

        if ($duplicates->isEmpty()) {
            return null;
        }

        return $duplicates;
    }

}
