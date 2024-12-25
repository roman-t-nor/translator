<x-layout :$title>
    @if($elements->isNotEmpty())
        <div class="card mb-4">
            <div class="card-body">
                <form
                    action="{{ route('elements.mass_destroy') }}"
                    method="post"
                    id="elements_mass_destroy"
                >
                    @csrf
                    @method('DELETE')
                    <table
                        class="table table-bordered align-middle text-center"
                        x-data="data"
                    >
                        <thead>
                        <tr>
                            <th style="width: 10px">#</th>
                            <th style="width: 10px">
                                <label>
                                    <input
                                        type="checkbox"
                                        class="form-check-input"
                                        :checked="isEveryElementsChecked"
                                        @click="toggleEveryElementsChecked"
                                    >
                                </label>
                            </th>
                            <th>Title</th>
                            <th>Translation</th>
                            <th>Context</th>
                            <th>Id</th>
                        </tr>
                        </thead>
                        <tbody>
                        @foreach($elements as $e)
                            <tr>
                                <td>{{ $loop->iteration }}</td>
                                <td style="width: 10px">
                                    <label>
                                        <input
                                            type="checkbox"
                                            class="form-check-input"
                                            name="element_id[]"
                                            value="{{ $e->id }}"
                                        >
                                    </label>
                                </td>
                                <td class="text-start">
                                    <a
                                        href="{{ route('sections.elements.edit', [
                                        'section' => $section,
                                        'element' => $e
                                    ]) }}"
                                        class="btn border element-link font-monospace text-nowrap"
                                    >{{ $e->name }}</a>
                                </td>
                                <td class="text-start">
                                    {{ $e->translation }}
                                </td>
                                <td class="text-start">
                                    {!! $e->context !!}
                                </td>
                                <td style="width: 80px">{{ $e->id }}</td>
                            </tr>
                        @endforeach
                        </tbody>
                    </table>
                </form>
            </div>

            @if($elements->hasPages())
                <div class="card-footer d-flex justify-content-center">
                    {{$elements->links()}}
                </div>
            @endif

        </div>
    @endif

    <x-slot:footer>
        <x-button.back :url="route('sections.show', compact('section'))"/>
        <x-button.element.create :url="route('sections.elements.create', compact('section'))"/>
        <x-button.element.delete-mass form="elements_mass_destroy" class="ms-auto"/>
    </x-slot:footer>
</x-layout>
