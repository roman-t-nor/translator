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
                @foreach($sections as $section)
                    @isset($prevDepthLevel)
                        @if($section->depth_level < $prevDepthLevel)
                            {!! "</ul>" !!}
                        @endif
                    @endisset

                    <li class="nav-item">

                        <a href="/xxx" class="nav-link">
                            {!! str_repeat('&nbsp;&nbsp;&nbsp;', $section->depth_level) !!}
                            <i class="av-arrow bi bi-folder"></i>
                            <p>
                                {{ $section->name }}
                                @if($section->is_parent)
                                    <i class="nav-arrow bi bi-chevron-right"></i>
                                @endif
                            </p>
                        </a>
                        @if($section->is_parent)
                            <ul class="nav nav-treeview">
                        @endif
                    </li>
                    @php
                        $prevDepthLevel = $section->depth_level;
                    @endphp
                @endforeach
            </ul>
        @endif
    </li>

</ul>
