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
}
