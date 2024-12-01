<?php

namespace App\View\Components;

use App\Models\Section;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\Support\Facades\Route;
use Illuminate\View\Component;

class Layout extends Component
{
    public Collection $sections;
    public string $title;

    public function __construct(string $title)
    {
        $this->title = $title;
        $section = Route::current()->parameter("section");
        $this->sections = Section::getSectionsTree($section);
    }

    public function render(): View|Closure|string
    {
        return view('components.layout.layout');
    }
}
