<?php

// @formatter:off
// phpcs:ignoreFile
/**
 * A helper file for your Eloquent Models
 * Copy the phpDocs from this file to the correct Model,
 * And remove them from this file, to prevent double declarations.
 *
 * @author Barry vd. Heuvel <barryvdh@gmail.com>
 */


namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string|null $translation
 * @property string|null $context
 * @property int $section_id
 * @property int $active
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \App\Models\Section $section
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element whereActive($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element whereContext($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element whereSectionId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element whereTranslation($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|Element whereUpdatedAt($value)
 */
	class Element extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property int|null $parent_id
 * @property int $active
 * @property int $_lft
 * @property int $_rgt
 * @property Collection $elements
 * @mixin Eloquent
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Kalnoy\Nestedset\Collection<int, Section> $children
 * @property-read int|null $children_count
 * @property-read int|null $elements_count
 * @property-read Section|null $parent
 * @method static \Kalnoy\Nestedset\Collection<int, static> all($columns = ['*'])
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section ancestorsAndSelf($id, array $columns = [])
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section ancestorsOf($id, array $columns = [])
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section applyNestedSetScope(?string $table = null)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section countErrors()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section d()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section defaultOrder(string $dir = 'asc')
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section descendantsAndSelf($id, array $columns = [])
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section descendantsOf($id, array $columns = [], $andSelf = false)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section fixSubtree($root)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section fixTree($root = null)
 * @method static \Kalnoy\Nestedset\Collection<int, static> get($columns = ['*'])
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section getNodeData($id, $required = false)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section getPlainNodeData($id, $required = false)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section getTotalErrors()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section hasChildren()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section hasParent()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section isBroken()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section leaves(array $columns = [])
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section makeGap(int $cut, int $height)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section moveNode($key, $position)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section newModelQuery()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section newQuery()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section orWhereAncestorOf(bool $id, bool $andSelf = false)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section orWhereDescendantOf($id)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section orWhereNodeBetween($values)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section orWhereNotDescendantOf($id)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section query()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section rebuildSubtree($root, array $data, $delete = false)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section rebuildTree(array $data, $delete = false, $root = null)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section reversed()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section root(array $columns = [])
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereActive($value)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereAncestorOf($id, $andSelf = false, $boolean = 'and')
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereAncestorOrSelf($id)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereCreatedAt($value)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereDescendantOf($id, $boolean = 'and', $not = false, $andSelf = false)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereDescendantOrSelf(string $id, string $boolean = 'and', string $not = false)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereId($value)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereIsAfter($id, $boolean = 'and')
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereIsBefore($id, $boolean = 'and')
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereIsLeaf()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereIsRoot()
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereLft($value)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereName($value)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereNodeBetween($values, $boolean = 'and', $not = false, $query = null)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereNotDescendantOf($id)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereParentId($value)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereRgt($value)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section whereUpdatedAt($value)
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section withDepth(string $as = 'depth')
 * @method static \Kalnoy\Nestedset\QueryBuilder<static>|Section withoutRoot()
 */
	class Section extends \Eloquent {}
}

namespace App\Models{
/**
 * 
 *
 * @property int $id
 * @property string $name
 * @property string $email
 * @mixin Eloquent
 * @property \Illuminate\Support\Carbon|null $email_verified_at
 * @property string $password
 * @property string|null $remember_token
 * @property \Illuminate\Support\Carbon|null $created_at
 * @property \Illuminate\Support\Carbon|null $updated_at
 * @property-read \Illuminate\Notifications\DatabaseNotificationCollection<int, \Illuminate\Notifications\DatabaseNotification> $notifications
 * @property-read int|null $notifications_count
 * @method static \Database\Factories\UserFactory factory($count = null, $state = [])
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newModelQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User newQuery()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User query()
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereCreatedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmail($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereEmailVerifiedAt($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereId($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereName($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User wherePassword($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereRememberToken($value)
 * @method static \Illuminate\Database\Eloquent\Builder<static>|User whereUpdatedAt($value)
 */
	class User extends \Eloquent {}
}

