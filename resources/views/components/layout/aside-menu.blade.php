<ul class="nav sidebar-menu flex-column mb-4" data-lte-toggle="treeview" role="menu" data-accordion="true">
    <li class="nav-item menu-open">
        <a href="#" class="nav-link active">
            <i class="av-arrow bi bi-diagram-3"></i>
            <p>
                Content
                <i class="nav-arrow bi bi-chevron-right"></i>
            </p>
        </a>
        @if($sections)
            <ul class="nav">{{-- ul root sections start --}}
                @foreach($sections as $s)
                    @isset($prevDepthLevel)
                        @if($s->depth_level === $prevDepthLevel)
                            {!! "</li>" !!}
                        @endif
                        @if($s->depth_level < $prevDepthLevel)
                            {!! "</li></ul>" !!}
                        @endif
                        @if($s->depth_level > $prevDepthLevel)
                            {!! "<ul class='nav'>" !!}
                        @endif
                    @endisset

                    <li class="w-100">

                        <a href="{{ route('admin.sections.show', ['section'=>$s->id]) }}" class="nav-link">
                            {!! str_repeat('&nbsp;&nbsp;&nbsp;&nbsp;', $s->depth_level) !!}
                            @if($s->is_active)
                                <i class="av-arrow bi bi-folder2-open text-primary-emphasis"></i>
                            @else
                                <i class="av-arrow bi bi-folder2"></i>
                            @endif
                            <p>
                                @if($s->is_active)
                                    <span class=" text-primary-emphasis">{{$s->name}}</span>
                                @else
                                    {{$s->name}}
                                @endif
                                @if($s->is_parent)
                                    @if($s->is_active)
                                        <i class="nav-arrow bi bi-chevron-down"></i>
                                    @else
                                        <i class="nav-arrow bi bi-chevron-right"></i>
                                    @endif
                                @endif
                            </p>
                        </a>

                        @php
                            $prevDepthLevel = $s->depth_level;
                        @endphp
                        @endforeach
                    </li>
            </ul>{{-- ul root sections end --}}
        @endif
    </li>{{--Content--}}
</ul>{{--nav sidebar-menu--}}

