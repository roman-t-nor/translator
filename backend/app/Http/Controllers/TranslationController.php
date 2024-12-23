<?php

namespace App\Http\Controllers;

use App\Models\Translation;
use Illuminate\Http\Request;
use Illuminate\Validation\Rule;

class TranslationController extends Controller
{
    public static function translate(Request $request)
    {
        $validated = $request->validate([
            'text' => ['required', 'min:2'],
            'languageFrom' => ['required', Rule::in(['NB', 'EN'])],
            'languageTo' => ['required', Rule::in(['EN-US', 'RU'])],
            'context' => ['string', 'nullable'],
        ]);

        return [Translation::translate(...$validated)];
    }
}
