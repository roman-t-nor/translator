<?php

namespace App\View\Components;

use App\Models\Section;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\Support\Collection;
use Illuminate\View\Component;

class Breadcrumbs extends Component
{
    public ?Collection $items;

    public function __construct(?Section $section)
    {
        $this->items = collect();
        if ($section) {
            $this->getItems($section);
        }
    }

    private function getItems(Section $section)
    {
        $sections = Section::getParentSections($section)->reverse();

        $sections->each(function (Section $s) use ($section) {
            $item = ["title" => $s->name];
            if ($s === $section) {
                $item["url"] = "";
            } else {
                $item["url"] = route('admin.sections.show', ['section' => $s->id]);
            }
            $this->items->push($item);
        });

        $this->items->prepend(["url" => route('admin.sections.index'), "title" => "Home"]);
    }

    public function render(): View|Closure|string
    {
        return view('components.breadcrumbs');
    }
}
