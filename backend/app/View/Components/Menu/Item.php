<?php

namespace App\View\Components\Menu;

class Item
{
    public int $id;
    public string $title;
    public int $depth;
    public bool $is_parent;
    public bool $is_active;

    public function __construct(int $id, string $title, int $depth, bool $is_parent, bool $is_active)
    {
        $this->id = $id;
        $this->title = $title;
        $this->depth = $depth;
        $this->is_parent = $is_parent;
        $this->is_active = $is_active;
    }
}
