<x-layout :$title>

    <form
        method="post"
        @isset($element)
            action="{{ route('admin.sections.elements.update', compact('section', 'element')) }}"
        @else
            action="{{ route('admin.sections.elements.store', compact('section')) }}"
        @endisset
        id="elements_store"
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
                        value="{{ $element->name ?? old('title') }}"
                    >
                    @error("title")
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                    @enderror
                </div>
            </div>

            <div class="row mb-3">
                <label for="translation" class="col-sm-1 col-form-label">Translation</label>
                <div class="col-sm-6">
                    <input
                        type="text"
                        name="translation"
                        class="form-control @error('translation') is-invalid @enderror"
                        aria-invalid="true"
                        id="translation"
                        value="{{ $element->translation ?? old('translation') }}"
                    >
                    @error("translation")
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                    @enderror
                </div>
            </div>

            <div class="row mb-3">
                <label for="context" class="col-sm-1 col-form-label">Context</label>
                <div class="col-sm-6">
                    <textarea
                        type="text"
                        name="context"
                        class="form-control @error('context') is-invalid @enderror"
                        aria-invalid="true"
                        id="context"
                        rows="3"
                    >{{ $element->context ?? old('context') }}</textarea>
                    @error("context")
                    <div class="invalid-feedback">
                        {{ $message }}
                    </div>
                    @enderror
                </div>
            </div>

            <div class="row mb-3">
                <label for="section" class="col-sm-1 col-form-label">Parent section</label>
                <div class="col-sm-6">
                    <select class="form-select mb-3" id="section" size="10" name="section_id">
                        @foreach($sections as $s)
                            <option
                                value="{{ $s->id }}"
                                @selected($s->id === $section->id)
                            >
                                {!! Str::repeat("&nbsp;-&nbsp;", $s->depth) !!}
                                {{ $s->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

        </div>

        @isset($element)
            @method("PUT")
        @endisset
    </form>

    @isset($element)
        <form
            method="post"
            action="{{ route('admin.sections.elements.destroy', compact('section', 'element')) }}"
            id="elements_destroy"
        >
            @csrf
            @method("DELETE")
        </form>
    @endisset

    <x-slot:footer>
        <x-button.back :url="route('admin.sections.elements.index', compact('section'))"/>

        @isset($element)
            <x-button.element.update form="elements_store"/>
            <x-button.delete form="elements_destroy" class="ms-auto"/>
        @else
            <x-button.element.save form="elements_store"/>
        @endisset
    </x-slot:footer>

</x-layout>
