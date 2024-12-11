<a
    href="{{ $url }}"
    {{ $attributes->merge(["class" => "btn btn-success"]) }}
    style="min-width: 80px"
><i class="bi bi-files"></i> {{ $slot }} {{ $count }}</a>
