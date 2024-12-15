<?php

namespace App\View\Components\Navigation;

use Illuminate\Support\Collection;

class Item
{
    public string $title;
    public string $route;
    public string $icon;
    public ?Collection $elements;
    public bool $active = false;

    public function __construct(
        string $title,
        string $route,
        string $icon,
        ?Collection $elements = null,
        bool $active = false
    ) {
        $this->title = $title;
        $this->route = $route;
        $this->icon = $icon;
        $this->elements = $elements;
        $this->active = $active;
    }

}
