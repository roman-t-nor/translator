<?php

namespace App\Models;

use DeepL\Translator;
use Illuminate\Database\Eloquent\Model;

class Translation extends Model
{
    public static function translate(string $text, string $languageFrom, string $languageTo, ?string $context): string
    {
        $translator = new Translator(config('deepl.auth_key'));
        $result = $translator->translateText($text, $languageFrom, $languageTo, compact('context'));

        return $result->text;
    }
}
