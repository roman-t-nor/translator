<ul class="nav nav-treeview">
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
        <a href="{{ route('sections.show', ['section'=>$i->id]) }}" class="nav-link">
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
        @isset($prevDepth)
            @php
                $prevDepth = $i->depth
            @endphp
        @endisset
    @endforeach

    @isset($prevDepth)
        {!! Str::repeat("</li></ul>", $prevDepth - 1)."</li>" !!}
    @endisset
</ul>


