<?php

namespace App\Models;

use Eloquent;
use Illuminate\Contracts\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\Database\Eloquent\Model;

/**
 *
 *
 * @property int $id
 * @property string $name
 * @property int|null $parent_id
 * @property int $active
 * @property int $left_margin
 * @property int $right_margin
 * @property int $depth_level
 * @mixin Eloquent
 */
class Section extends Model
{
    public bool $is_parent = false;

    public static function getFirstLevelSections(): Collection
    {
        return self::where('depth_level', 1)->orderBy('left_margin')->get();
    }

    public static function getChildSections(self $section): Collection
    {
        return Section::where('parent_id', $section->id)->get();
    }

    public static function getParentSections(self $section, $parentSections = []): array
    {
        if (!count($parentSections)) {
            $parentSections = [$section];
        }

        if (!$section->parent_id) {
            return $parentSections;
        }

        $parentSection = Section::findOrFail($section->parent_id);
        $parentSections[] = $parentSection;

        return self::getParentSections($parentSection, $parentSections);
    }

    public static function getSectionsTree(?self $section): Collection
    {
        $query = Section::where('depth_level', 1)->orderBy('left_margin');

        if ($section) {
            $parentSections = self::getParentSections($section);
            foreach ($parentSections as $s) {
                $query->orWhere(function (Builder $builder) use ($s) {
                    $builder->where('left_margin', '>', $s->left_margin)
                        ->where('right_margin', '<', $s->right_margin)
                        ->where('depth_level', $s->depth_level + 1);
                });
            }
        }

        return self::prepareSections($query->get());
    }

    private static function prepareSections($sections): Collection
    {
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

}
