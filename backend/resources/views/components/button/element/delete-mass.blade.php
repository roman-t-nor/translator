<button
    {{ $attributes->merge(["class" => "btn btn-danger", "type" => "submit"]) }}
    x-data="{
        isEveryElementUnchecked: true
    }"
    @is-every-element-unchecked.window="isEveryElementUnchecked = $event.detail"
    :disabled="isEveryElementUnchecked"
><i class="bi bi-trash3-fill"></i>&nbsp;Delete element(s)
</button>
