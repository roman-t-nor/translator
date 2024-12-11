<x-layout :$title>
    @if($elements->isNotEmpty())
        <div class="card mb-4">
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                    <tr class="align-middle text-center">
                        <th style="width: 10px">#</th>
                        <th>Title</th>
                        <th>Active</th>
                        <th>Id</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($elements as $e)
                        <tr class="align-middle text-center">
                            <td>{{ $loop->iteration }}</td>
                            <td class="text-start">
                                <a href="" class="btn btn-link">{{ $e->name }}</a>
                            </td>
                            <td style="width: 80px">
                                @if($e->active)
                                    <span class="text-success fs-6"><i class="bi bi-circle-fill"></i></span>
                                @else
                                    <span class="text-secondary fs-6"><i class="bi bi-circle-fill"></i></span>
                                @endif
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
        <x-button.back :url="route('admin.sections.show', ['section' => $section->id])"/>
        <x-button.element.create :url="route('admin.sections.elements.create', ['section' => $section->id])"/>
    </x-slot:footer>

</x-layout>
