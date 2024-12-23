<?php

namespace App\Api\Controllers;

use App\Models\Element;
use App\Models\Section;
use App\View\Components\Message;
use Exception;
use Illuminate\Http\Request;

class ElementController
{
    public function store(Section $section, Request $request): void
    {
        $context = $request->input('context');
        $translateFrom = $request->input('translate_from');
        $translateTo = $request->input('translate_to');

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
        }
    }

}
