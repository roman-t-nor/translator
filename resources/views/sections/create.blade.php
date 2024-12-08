<x-layout :$title>

    <form
        method="post"
        action="{{ route("admin.sections.store") }}"
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
                        value="{{ old('title') }}"
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
                    <input class="form-check-input" type="checkbox" value="" id="is_active">
                </div>
            </div>
            <div class="row mb-3">
                <label for="parent_section" class="col-sm-1 col-form-label">Parent section</label>
                <div class="col-sm-6">
                    <select class="form-select mb-3" id="parent_section" size="10" name="parent_section_id">

                        <option @unless($section->id) selected @endunless>- Root -</option>
                        @foreach($sections as $s)
                            <option
                                value="{{ $s->id }}"
                                @if($s->id === $section->id) selected @endif
                            >
                                {!! Str::repeat("&nbsp;-&nbsp;", $s->depth) !!}
                                {{ $s->name }}
                            </option>
                        @endforeach
                    </select>
                </div>
            </div>

        </div>
    </form>

    <x-slot:footer>

        @isset($s)
            <x-button.back :url="route('admin.sections.show', ['section' => $s->id])"/>
        @else
            <x-button.back :url="route('admin.sections.index')"/>
        @endisset

        <x-button.save form="sections_store"/>

    </x-slot:footer>
</x-layout>
