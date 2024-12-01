<ul class="text-white">
    @foreach($items as $item)
        @isset($prevDepth)
            @if($item->depth > $prevDepth)
                {!! "<ul>" !!}
            @else
                {!! "</li>" !!}
                @if($item->depth < $prevDepth)
                    {!! "</ul></li>" !!}
                @endif
            @endif
        @endisset
        <li>
            <a href="">{{ $item->title }}</a>
        @php
            $prevDepth = $item->depth
        @endphp
    @endforeach
    {!! Str::repeat("</li></ul>", $prevDepth - 1)."</li>" !!}
</ul>

<hr class="text-white">

<ul class="text-white">
    <li>
        <a>1</a>
    </li>
    <li>
        <a>2</a>
        <ul>
            <li>
                <a>22</a>
            </li>
            <li>
                <a>22</a>
                <ul>
                    <li><a>222</a></li>
                    <li><a>222</a></li>
                    <li><a>222</a></li>
                </ul>
            </li>
            <li>
                <a>22</a>
            </li>
        </ul>
    </li>
    <li>
        <a>3</a>
        <ul>
            <li>
                <a>33</a>
                <ul>
                    <li>
                        <a>333</a>
                    </li>
                    <li>
                        <a>333</a>
                    </li>
                    <li>
                        <a>333</a>
                        <ul>
                            <li><a>3333</a></li>
                            <li><a>3333</a></li>
                            <li><a>3333</a></li>
                        </ul>
                    </li>
                </ul>
            </li>
        </ul>
    </li>
</ul>
