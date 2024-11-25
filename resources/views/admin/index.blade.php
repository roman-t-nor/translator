<x-admin :$sections>
    @if($sections)
        <ul class="nav">
            @foreach($sections as $section)
                <li class="nav-item">
                    <a href="{{ route('admin.sections.show', ['section'=>$section->id]) }}" class="nav-link">
                        {!! str_repeat('&nbsp;&nbsp;&nbsp;', $section->depth_level) !!}
                        <i class="av-arrow bi bi-folder"></i>
                        <p>
                            {{ $section->name }}
                            @if($section->is_parent)
                                <i class="nav-arrow bi bi-chevron-right"></i>
                            @endif
                        </p>
                    </a>
                </li>
            @endforeach
        </ul>
    @endif
</x-admin>
