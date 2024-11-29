<?php

namespace App\View\Components;

use App\Models\Section;
use Closure;
use Illuminate\Contracts\View\View;
use Illuminate\View\Component;

class Breadcrumbs extends Component
{
    public array $items = [];

    public function __construct(?Section $section)
    {
        if ($section) {
            $this->items = $this->getItems($section);
        }
    }

    private function getItems(Section $section): array
    {
        $parentSections = Section::getParentSections($section);
        $sections = [...array_reverse($parentSections), $section];

        $items = array_map(function (Section $s) use ($section): array {
            $item = ["title" => $s->name];
            if ($s === $section) {
                $item["url"] = "";
            } else {
                $item["url"] = route('admin.sections.show', ['section' => $s->id]);
            }
            return $item;
        }, $sections);

        return [["url" => route('admin.sections.index'), "title" => "Home"], ...$items];
    }

    public function render(): View|Closure|string
    {
        return view('components.breadcrumbs');
    }
}
