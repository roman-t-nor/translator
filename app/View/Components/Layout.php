<?php

namespace App\View\Components;

use App\Models\Section;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\View\Component;

class Layout extends Component
{
    public Collection $sections;
    public string $title;

    public function __construct(string $title)
    {
        $this->title = $title;
        $this->sections = Section::prepareSections();
    }

    public function render(): View|Closure|string
    {
        return view('components.layout.layout');
    }
}
