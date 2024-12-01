<?php

namespace App\View\Components\Menu;

class Item
{
    public string $title;
    public int $depth;

    public function __construct(string $title, int $depth)
    {
        $this->title = $title;
        $this->depth = $depth;
    }
}
