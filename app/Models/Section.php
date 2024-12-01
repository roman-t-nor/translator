<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Support\Collection;

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
    public bool $is_active = false;

    public static function getFirstLevelSections(): Collection
    {
        return self::where('depth_level', 1)->orderBy('left_margin')->get();
    }

    public static function getChildSections(self $section): Collection
    {
        return Section::where('parent_id', $section->id)->get();
    }

    public static function getParentSections(self $section, $parentSections = []): Collection
    {
        if (!count($parentSections)) {
            $parentSections = collect([$section]);
        }

        if (!$section->parent_id) {
            return $parentSections;
        }

        $parentSection = Section::findOrFail($section->parent_id);
        $parentSections->push($parentSection);

        return self::getParentSections($parentSection, $parentSections);
    }

    public static function getSectionsTree(?self $section): Collection
    {
//        $query = Section::where('depth_level', 1)->orderBy('left_margin');
//
//        if ($section) {
//            $parentSections = self::getParentSections($section);
//            foreach ($parentSections as $s) {
//                $query->orWhere(function (Builder $builder) use ($s) {
//                    $builder->where('left_margin', '>', $s->left_margin)
//                        ->where('right_margin', '<', $s->right_margin)
//                        ->where('depth_level', $s->depth_level + 1);
//                });
//            }
//        }
//
//        $sections = $query->get();
//
//        $sections = self::setIsParent($sections);
//        if (!empty($parentSections)) {
//            $parentSectionsId = $parentSections->pluck('id');
//            $sections->each(function (self $s) use ($parentSectionsId) {
//                if ($parentSectionsId->contains($s->id)) {
//                    $s->is_active = true;
//                }
//            });
//        }

        $sections = collect();
        $sections->push(["id" => 18, "depth_level", "title", ]);

        return $sections;
    }

    private static function setIsParent(Collection $sections): Collection
    {
        $parentSectionsId = self::getAllParentSectionsId();

        $sections->map(function (self $s) use ($parentSectionsId) {
            if ($parentSectionsId->contains($s->id)) {
                $s->is_parent = true;
            }
        });

        return $sections;
    }

    private static function getAllParentSectionsId(): Collection
    {
        return Section::whereNotNull('parent_id')->distinct()->pluck('parent_id');
    }

}
