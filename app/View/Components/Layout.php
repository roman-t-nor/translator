<?php

namespace App\View\Components;

use App\Models\Section;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\View\Component;

class Layout extends Component
{
    public Collection $sections;
    public ?Section $section;
    public string $title;

    public function __construct(string $title, $section = null)
    {
        $this->title = $title;
        $this->sections = Section::getSectionsTree($section);
        $this->section = $section;
    }

    public function render(): View|Closure|string
    {
        return view('components.layout.layout');
    }
}
