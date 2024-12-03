<x-layout :$title>

    <form method="post" action="{{ route("admin.sections.store") }}" id="sections_store"
    >
        @csrf
        <div class="card-body">
            <div class="row mb-3">
                <label for="title" class="col-sm-1 col-form-label">Title</label>
                <div class="col-sm-11">
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
        </div>
    </form>

    <x-slot:footer>

        @isset($section)
            <x-button.back :url="route('admin.sections.show', ['section' => $section->id])"/>
        @else
            <x-button.back :url="route('admin.sections.index')"/>
        @endisset

        <x-button.save form="sections_store"/>

    </x-slot:footer>
</x-layout>
