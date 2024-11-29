<ol {{ $attributes->merge(['class' => 'breadcrumb']) }}>
    @foreach($items as $item)
        @if($item["url"])
            <li class="breadcrumb-item"><a href="{{$item["url"]}}">{{ $item["title"] }}</a></li>
        @else
            <li class="breadcrumb-item active">{{ $item["title"] }}</li>
        @endif
    @endforeach
</ol>
