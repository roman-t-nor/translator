<?php

namespace App\View\Components\Menu;

use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\View\Component;

class Menu extends Component
{
    public Collection $items;

    public function __construct()
    {
        $this->items = $this->getItems();
    }

    private function getItems(): Collection
    {
        $items = collect();
        $items->push(new Item("1", 1));
        $items->push(new Item("2", 1));
        $items->push(new Item("22", 2));
        $items->push(new Item("22", 2));
        $items->push(new Item("222", 3));
        $items->push(new Item("222", 3));
        $items->push(new Item("222", 3));
        $items->push(new Item("22", 2));
        $items->push(new Item("3", 1));
        $items->push(new Item("33", 2));
        $items->push(new Item("333", 3));
        $items->push(new Item("333", 3));
        $items->push(new Item("333", 3));
        $items->push(new Item("3333", 4));
        $items->push(new Item("3333", 4));
        $items->push(new Item("3333", 4));

        return $items;
    }

    public function render(): View|Closure|string
    {
        return view('components.menu.menu');
    }
}
