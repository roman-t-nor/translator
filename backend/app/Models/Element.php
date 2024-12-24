<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\BelongsTo;

class Element extends Model
{
    protected $fillable = ['name', 'section_id', 'translation', 'context'];

    public function section(): BelongsTo
    {
        return $this->belongsTo(Section::class);
    }

    public static function store(int $sectionId, string $title, string $translation, ?string $context)
    {
        if ($context) {
            $context = str_replace($title, '<b>'.$title.'</b>', $context);
        }
        return Element::create([
            'name' => $title,
            'translation' => $translation,
            'context' => $context,
            'section_id' => $sectionId
        ]);
    }
}
