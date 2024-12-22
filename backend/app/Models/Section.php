<?php

namespace App\Models;

use Eloquent;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;
use Illuminate\Database\Eloquent\Relations\HasMany;
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
 * @property Collection $elements
 * @mixin Eloquent
 */
class Section extends Model
{
    use NodeTrait;

    public bool $is_parent = false;
    public bool $is_active = false;
    protected $fillable = ["name", "parent_id", "active"];

    public function elements(): HasMany
    {
        return $this->hasMany(Element::class);
    }

    public static function getFirstLevelSections(): LengthAwarePaginator
    {
        return self::whereIsRoot()->paginate(20);
    }

    public static function getAllSections(): Collection
    {
        return self::withDepth()->defaultOrder()->get();
    }

    public static function getAllActiveSections(): Collection
    {
        $sections = self::withDepth()->with('ancestors')->where('active', 1)->defaultOrder()->get();
        $sections = $sections->filter(
            function (Section $s) {
                return $s->ancestors->every(function (Section $ancestor) {
                    return $ancestor->active;
                });
            })->values();

        $sections = $sections->map(function (Section $s) {
            return [
                "id" => $s->id,
                "depth" => $s->depth,
                "name" => $s->name
            ];
        });

        return $sections;
    }

    public static function getChildSections(self $section): LengthAwarePaginator
    {
        return Section::where('parent_id', $section->id)->paginate(20);
    }

    public static function getParentSections(self $section): Collection
    {
        return Section::defaultOrder()->ancestorsAndSelf($section);
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
        return Section::hasChildren()->pluck('id');
    }

}
