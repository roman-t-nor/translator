<nav class="mt-2">
    <ul class="nav sidebar-menu flex-column mb-4" data-lte-toggle="treeview" role="menu" data-accordion="false">
        @foreach($items as $item)
            <li @class(['nav-item', 'menu-open' => $item->active])>
                <a href="{{ route($item->route) }}" class="nav-link">
                    <i @class([$item->icon])></i>
                    <p>
                        {{ $item->title }}
                        @if($item->elements)
                            <i class="nav-arrow bi bi-chevron-right"></i>
                        @endif
                    </p>
                </a>
                @if($item->elements)
                    <x-menu :elements="$item->elements"/>
                @endif
            </li>
        @endforeach
    </ul>
</nav>
