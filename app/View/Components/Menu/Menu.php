<?php

namespace App\View\Components\Menu;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\View\Component;

class Menu extends Component
{
    public Collection $items;

    public function __construct(Collection $elements)
    {
        $this->items = $this->getItems($elements);
    }

    private function getItems(Collection $elements): Collection
    {
        $items = collect();
        foreach ($elements as $e) {
            $items->push(new Item(
                $e->id,
                $e->name,
                $e->depth_level,
                $e->is_parent,
                $e->is_active
            ));
        }
        return $items;
    }

    public function render(): View|Closure|string
    {
        return view('components.menu.menu');
    }
}
