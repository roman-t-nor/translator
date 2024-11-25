<x-layout :$title>
    @if($sections->isNotEmpty())
        <div class="card mb-4">
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th style="width: 10px">#</th>
                        <th>Title</th>
                        <th>Id</th>
                        <th>Edit</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($sections as $s)
                        <tr class="align-middle">
                            <td>{{ $loop->iteration }}</td>
                            <td>
                                <a href="{{ route('admin.sections.show', ['section'=>$s->id]) }}"
                                   class="btn btn-secondary"
                                >{{ $s->name }}</a>
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
            <div class="card-footer d-flex justify-content-center">
                <ul class="pagination m-0">
                    <li class="page-item"><a class="page-link" href="#">«</a></li>
                    <li class="page-item"><a class="page-link" href="#">1</a></li>
                    <li class="page-item"><a class="page-link" href="#">2</a></li>
                    <li class="page-item"><a class="page-link" href="#">3</a></li>
                    <li class="page-item"><a class="page-link" href="#">»</a></li>
                </ul>
            </div>
        </div>
    @endif

    @isset($section)
        @if($section->parent_id)
            <x-button-back :url="route('admin.sections.show', ['section' => $section->parent_id])"/>
        @else
            <x-button-back :url="route('admin.sections.index')"/>
        @endif
    @endisset

</x-layout>
