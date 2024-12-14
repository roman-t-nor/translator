<a
    href="{{ $url }}"
    {{ $attributes->merge(["class" => "btn bg-success text-white"]) }}
    style="min-width: 80px"
><i class="bi bi-files"></i> {{ $slot }} {{ $count }}</a>
