<x-layout :$title>
    @if($elements->isNotEmpty())
        <div class="card mb-4">
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                    <tr class="align-middle text-center">
                        <th style="width: 10px">#</th>
                        <th>Title</th>
                        <th>Translation</th>
                        <th>Context</th>
                        <th>Id</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($elements as $e)
                        <tr class="align-middle text-center">
                            <td>{{ $loop->iteration }}</td>
                            <td class="text-start">
                                <a
                                    href="{{ route('admin.sections.elements.edit', [
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
            </div>

            @if($elements->hasPages())
                <div class="card-footer d-flex justify-content-center">
                    {{$elements->links()}}
                </div>
            @endif

        </div>
    @endif

    <x-slot:footer>
        <x-button.back :url="route('admin.sections.show', compact('section'))"/>
        <x-button.element.create :url="route('admin.sections.elements.create', compact('section'))"/>
    </x-slot:footer>

</x-layout>
