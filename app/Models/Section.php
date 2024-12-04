<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Pagination\LengthAwarePaginator;
use Illuminate\Support\Collection;
use Kalnoy\Nestedset\NodeTrait;

/**
 * @property int $id
 * @property string $name
 * @property int|null $parent_id
 * @property int $active
 * @property int $_lft
 * @property int $_rgt
 * @mixin Eloquent
 */
class Section extends Model
{
    use NodeTrait;

    public bool $is_parent = false;
    public bool $is_active = false;
    protected $fillable = ["name"];

    public static function getFirstLevelSections(): LengthAwarePaginator
    {
        return self::whereIsRoot()->paginate(20);
    }

    public static function getChildSections(self $section): LengthAwarePaginator
    {
        return Section::where('parent_id', $section->id)->paginate(20);
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

    public static function getSectionsTree(?self $section)
    {
        $query = Section::withDepth()->defaultOrder()->whereIsRoot();

        if ($section) {
            $parentSections = self::getParentSections($section);
            foreach ($parentSections as $s) {
                $query->orWhere(function (Builder $builder) use ($s) {
                    $builder->where('_lft', '>', $s->_lft)
                        ->where('_rgt', '<', $s->_rgt)
                        ->where('parent_id', $s->id);
                });
            }
        }

        $sections = $query->get();

        $sections = self::setIsParent($sections);
        if (!empty($parentSections)) {
            $parentSectionsId = $parentSections->pluck('id');
            $sections->each(function (self $s) use ($parentSectionsId) {
                if ($parentSectionsId->contains($s->id)) {
                    $s->is_active = true;
                }
            });
        }

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
