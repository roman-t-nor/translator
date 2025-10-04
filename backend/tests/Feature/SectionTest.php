<?php

use App\Models\Section;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Collection;

uses(RefreshDatabase::class);

beforeEach(function () {
    // Create test sections with nested structure
    $this->parentSection = Section::create([
        'name' => 'Parent Section',
        'parent_id' => null,
        'active' => 1,
        '_lft' => 1,
        '_rgt' => 6
    ]);

    $this->childSection = Section::create([
        'name' => 'Child Section',
        'parent_id' => $this->parentSection->id,
        'active' => 1,
        '_lft' => 2,
        '_rgt' => 5
    ]);

    $this->grandchildSection = Section::create([
        'name' => 'Grandchild Section',
        'parent_id' => $this->childSection->id,
        'active' => 1,
        '_lft' => 3,
        '_rgt' => 4
    ]);

    $this->inactiveParentSection = Section::create([
        'name' => 'Inactive Parent Section',
        'parent_id' => null,
        'active' => 0,
        '_lft' => 7,
        '_rgt' => 10
    ]);

    $this->activeChildOfInactiveParent = Section::create([
        'name' => 'Active Child of Inactive Parent',
        'parent_id' => $this->inactiveParentSection->id,
        'active' => 1,
        '_lft' => 8,
        '_rgt' => 9
    ]);
});

it('returns collection of active sections with correct structure', function () {
    $result = Section::getAllActiveSections();

    expect($result)->toBeInstanceOf(Collection::class);
    expect($result)->toHaveCount(3); // Only active sections with active ancestors
});

it('includes only sections with active ancestors', function () {
    $result = Section::getAllActiveSections();

    $sectionIds = $result->pluck('id')->toArray();

    expect($sectionIds)->toContain($this->parentSection->id);
    expect($sectionIds)->toContain($this->childSection->id);
    expect($sectionIds)->toContain($this->grandchildSection->id);
    expect($sectionIds)->not->toContain($this->inactiveParentSection->id);
    expect($sectionIds)->not->toContain($this->activeChildOfInactiveParent->id);
});

it('returns correct data structure for each section', function () {
    $result = Section::getAllActiveSections();

    $parentSectionData = $result->firstWhere('id', $this->parentSection->id);
    expect($parentSectionData)->toHaveKeys(['id', 'depth', 'name']);
    expect($parentSectionData['id'])->toBe($this->parentSection->id);
    expect($parentSectionData['name'])->toBe('Parent Section');
    expect($parentSectionData['depth'])->toBe(0);
});

it('returns correct depth values', function () {
    $result = Section::getAllActiveSections();

    $parentSectionData = $result->firstWhere('id', $this->parentSection->id);
    $childSectionData = $result->firstWhere('id', $this->childSection->id);
    $grandchildSectionData = $result->firstWhere('id', $this->grandchildSection->id);

    expect($parentSectionData['depth'])->toBe(0);
    expect($childSectionData['depth'])->toBe(1);
    expect($grandchildSectionData['depth'])->toBe(2);
});

it('excludes sections with inactive ancestors', function () {
    $result = Section::getAllActiveSections();

    // The active child of inactive parent should be excluded
    $activeChildData = $result->firstWhere('id', $this->activeChildOfInactiveParent->id);
    expect($activeChildData)->toBeNull();
});

it('handles empty database', function () {
    // Clear all sections
    Section::query()->delete();

    $result = Section::getAllActiveSections();

    expect($result)->toBeInstanceOf(Collection::class);
    expect($result)->toHaveCount(0);
});

it('handles sections with no ancestors', function () {
    // Create a standalone active section
    $standaloneSection = Section::create([
        'name' => 'Standalone Section',
        'parent_id' => null,
        'active' => 1,
        '_lft' => 11,
        '_rgt' => 12
    ]);

    $result = Section::getAllActiveSections();

    $standaloneData = $result->firstWhere('id', $standaloneSection->id);
    expect($standaloneData)->not->toBeNull();
    expect($standaloneData['depth'])->toBe(0);
});

it('maintains default order', function () {
    $result = Section::getAllActiveSections();

    // Should maintain the order based on _lft values
    $orderedIds = $result->pluck('id')->toArray();
    $expectedOrder = [
        $this->parentSection->id,
        $this->childSection->id,
        $this->grandchildSection->id
    ];

    expect($orderedIds)->toBe($expectedOrder);
});
