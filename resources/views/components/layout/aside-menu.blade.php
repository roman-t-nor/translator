<ul class="nav sidebar-menu flex-column" data-lte-toggle="treeview" role="menu" data-accordion="true">
    <li class="nav-item menu-open">
        <a href="#" class="nav-link active">
            <i class="av-arrow bi bi-diagram-3"></i>
            <p>
                Content
                <i class="nav-arrow bi bi-chevron-right"></i>
            </p>
        </a>
        @if($sections)
            <ul class="nav nav-treeview">
                @foreach($sections as $s)
                    @isset($prevDepthLevel)
                        @if($s->depth_level < $prevDepthLevel)
                            {!! "</ul>" !!}
                        @endif
                    @endisset

                    <li class="nav-item">

                        <a href="{{ route('admin.sections.show', ['section'=>$s->id]) }}" class="nav-link">
                            {!! str_repeat('&nbsp;&nbsp;&nbsp;', $s->depth_level) !!}
                            <i class="av-arrow bi bi-folder"></i>
                            <p>
                                {{ $s->name }}
                                @if($s->is_parent)
                                    <i class="nav-arrow bi bi-chevron-right"></i>
                                @endif
                            </p>
                        </a>
                        @if($s->is_parent)
                            <ul class="nav">
                        @endif
                    </li>
                    @php
                        $prevDepthLevel = $s->depth_level;
                    @endphp
                @endforeach
            </ul>
        @endif
    </li>

</ul>
