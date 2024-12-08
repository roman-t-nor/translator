<x-layout :$title>
    @if($sections->isNotEmpty())
        <div class="card mb-4">
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                    <tr class="align-middle text-center">
                        <th style="width: 10px">#</th>
                        <th>Title</th>
                        <th>Active</th>
                        <th>Id</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($sections as $s)
                        <tr class="align-middle text-center">
                            <td>{{ $loop->iteration }}</td>
                            <td class="text-start">
                                <a href="{{ route('admin.sections.show', ['section'=>$s->id]) }}"
                                   class="btn btn-secondary"
                                >{{ $s->name }}</a>
                            </td>
                            <td style="width: 80px">
                                @if($s->active)
                                    <span class="text-success fs-6"><i class="bi bi-circle-fill"></i></span>
                                @else
                                    <span class="text-secondary fs-6"><i class="bi bi-circle-fill"></i></span>
                                @endif
                            </td>
                            <td style="width: 80px">{{ $s->id }}</td>
                            <td style="width: 80px">
                                <a href="{{ route('admin.sections.edit', ['section'=>$s->id]) }}"
                                   class="btn btn-outline-secondary"
                                >Edit</a></td>
                        </tr>
                    @endforeach
                    </tbody>
                </table>
            </div>

            @if($sections->hasPages())
                <div class="card-footer d-flex justify-content-center">
                    {{$sections->links()}}
                </div>
            @endif

        </div>
    @endif

    <x-slot:footer>
        @isset($section)
            @if($section->parent_id)
                <x-button.back :url="route('admin.sections.show', ['section' => $section->parent_id])"/>
            @else
                <x-button.back :url="route('admin.sections.index')"/>
            @endif
        @endisset

        @isset($section)
            <x-button.create-section
                :url="route('admin.sections.create-child-section', compact('section'))"
            />
        @else
            <x-button.create-section :url="route('admin.sections.create')"/>
        @endisset

        <x-button.create-element :url="route('admin.sections.create')"/>
    </x-slot:footer>
</x-layout>
