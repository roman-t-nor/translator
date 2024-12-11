<x-layout :$title>

    <form
        method="post"
        @isset($section)
            action="{{ route("admin.sections.update", compact("section")) }}"
        @else
            action="{{ route("admin.sections.store") }}"
        @endisset
        id="sections_store"
    >
        @csrf
        <div class="card-body">
            <div class="row mb-3">
                <label for="title" class="col-sm-1 col-form-label">Title</label>
                <div class="col-sm-6">
                    <input
                        type="text"
                        name="title"
                        class="form-control @error('title') is-invalid @enderror"
                        aria-invalid="true"
                        id="title"
                        value="{{ $section->name ?? old('title') }}"
                    >
                    @error("title")
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                    @enderror
                </div>
            </div>

            <div class="row mb-3">
                <label class="form-check-label col-sm-1" for="is_active">Is active</label>
                <div class="col-sm-6">
                    <input
                        class="form-check-input"
                        type="checkbox"
                        id="is_active"
                        name="is_active"
                        @isset($section)
                            @if($section->active) checked @endif
                        @endisset
                    >
                </div>
            </div>
            <div class="row mb-3">
                <label for="parent_section" class="col-sm-1 col-form-label">Parent section</label>
                <div class="col-sm-6">
                    <select class="form-select mb-3" id="parent_section" size="10" name="parent_section_id">

                        <option @unless($parent_section_id) selected @endunless>- Root -</option>
                        @foreach($sections as $s)
                            <option
                                value="{{ $s->id }}"
                                @if($s->id === $parent_section_id) selected @endif
                            >
                                {!! Str::repeat("&nbsp;-&nbsp;", $s->depth) !!}
                                {{ $s->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

        </div>

        @isset($section)
            @method("PUT")
        @endisset
    </form>

    @isset($section)
        <form
            method="post"
            action="{{ route("admin.sections.destroy", compact("section")) }}"
            id="sections_destroy"
        >
            @csrf
            @method("DELETE")
        </form>
    @endisset

    <x-slot:footer>
        @isset($section)
            <x-button.back :url="route('admin.sections.show', compact('section'))"/>
            <x-button.section.update form="sections_store"/>
            <x-button.delete form="sections_destroy" class="ms-auto"/>
        @else
            <x-button.back :url="route('admin.sections.index')"/>
            <x-button.section.save form="sections_store"/>
        @endisset
    </x-slot:footer>

</x-layout>
