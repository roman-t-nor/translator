<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

class Section extends Model
{
    public bool $is_parent = false;

    public static function prepareSections(): Collection
    {
        $sections = self::orderBy('left_margin')->get();
        foreach ($sections as $section) {
            if ($section->parent_id) {
                self::markSectionsAsParent($section->parent_id, $sections);
            }
        }
        return $sections;
    }

    private static function markSectionsAsParent(int $parent_id, Collection $sections): void
    {
        $sections->map(function (self $section) use ($parent_id) {
            if ($section->id === $parent_id) {
                $section->is_parent = true;
            }
        });
    }

    public static function getFirstLevelSections(): Collection
    {
        return self::where('depth_level', 1)->orderBy('left_margin')->get();
    }

    public static function getSectionsByParentSectionId(int $id)
    {
        return Section::where('parent_id', $id)->get();
    }
}
