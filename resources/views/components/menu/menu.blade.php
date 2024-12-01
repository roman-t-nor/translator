<ul class="nav sidebar-menu flex-column mb-4" data-lte-toggle="treeview" role="menu" data-accordion="true">
    <li class="nav-item menu-open">
        <a href="#" class="nav-link active">
            <i class="av-arrow bi bi-diagram-3"></i>
            <p>
                Content
                <i class="nav-arrow bi bi-chevron-right"></i>
            </p>
        </a>
        <ul class="nav d-block">
            @foreach($items as $i)
                @isset($prevDepth)
                    @if($i->depth > $prevDepth)
                        {!! "<ul class='nav d-block'>" !!}
                    @else
                        {!! "</li>" !!}
                        @if($i->depth < $prevDepth)
                            {!! "</ul></li>" !!}
                        @endif
                    @endif
                @endisset
                {!! "<li class='nav-item'>" !!}
                <a href="{{ route('admin.sections.show', ['section'=>$i->id]) }}" class="nav-link">
                    {!! str_repeat('&nbsp;', $i->depth * 4) !!}
                    @if($i->is_active)
                        <i class="nav-icon bi bi-folder2-open text-primary-emphasis"></i>
                    @else
                        <i class="nav-icon bi bi-folder2"></i>
                    @endif
                    <p>
                        @if($i->is_active)
                            <span class=" text-primary-emphasis">{{$i->title}}</span>
                        @else
                            {{$i->title}}
                        @endif
                        @if($i->is_parent)
                            @if($i->is_active)
                                <i class="nav-arrow bi bi-chevron-down"></i>
                            @else
                                <i class="nav-arrow bi bi-chevron-right"></i>
                            @endif
                        @endif
                    </p>
                </a>
                @php
                    $prevDepth = $i->depth
                @endphp
            @endforeach
        </ul>

        @isset($prevDepth)
            {!! Str::repeat("</li></ul>", $prevDepth - 1)."</li>" !!}
        @endisset
    </li>
</ul>
