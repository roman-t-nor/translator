<?php

namespace App\View\Components;

use App\Models\Section;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Component;

class Breadcrumbs extends Component
{
    public ?Collection $items;

    public function __construct()
    {
        $this->items = collect();

        /** @var Section | null $section */
        $section = Route::current()->parameter("section");
        if ($section) {
            $this->getItems($section);
            $this->addLastItem();
        }

    }

    private function addLastItem()
    {
        $lastItem = match (Route::currentRouteName()) {
            'sections.create-child-section' => 'Create new section',
            'sections.edit' => 'Update section',
            'sections.elements.index' => 'Elements',
            'sections.elements.create' => 'Create new element',
            'sections.elements.edit' => 'Edit element',
            default => null
        };

        if (!empty($lastItem)) {
            $this->items->push(['title' => $lastItem]);
        }
    }

    private function getItems(Section $section)
    {
        $sections = Section::getParentSections($section);

        $sections->each(
            function (Section $s) use ($section) {
                $this->items->push([
                    "title" => $s->name,
                    "url" => route('sections.show', ['section' => $s])
                ]);
            });

        $this->items->prepend(["url" => route('sections.index'), "title" => "Home"]);
    }

    public function render(): View|Closure|string
    {
        return view('components.breadcrumbs');
    }
}
