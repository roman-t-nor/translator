<?php

namespace App\View\Components;

use App\Models\Section;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Database\Eloquent\Collection;
use Illuminate\View\Component;

class Admin extends Component
{
    public function __construct(public Collection $sections)
    {
        $this->sections = Section::prepareSections();
    }

    public function render(): View|Closure|string
    {
        return view('components.admin.admin');
    }
}
