<?php

namespace App\View\Components\Navigation;

use App\Models\Section;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Component;

class Navigation extends Component
{
    public ?Collection $items;

    public function __construct()
    {
        $routeName = Route::currentRouteName();

        $this->items = collect();

        $this->items->push(new Item(
            title: 'Content',
            route: 'sections.index',
            icon: 'av-arrow bi bi-diagram-3',
            elements: $this->getSections(),
            active: !!strpos($routeName, 'sections')
        ));

        $this->items->push(new Item(
            title: 'Settings',
            route: 'settings',
            icon: 'av-arrow bi bi-gear',
            active: $routeName === 'settings'
        ));
    }

    private function getSections(): Collection
    {
        $section = Route::current()->parameter("section");
        return Section::getSectionsTree($section);
    }

    public function render(): View|Closure|string
    {
        return view('components.layout.navigation');
    }
}
