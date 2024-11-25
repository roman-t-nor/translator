<x-admin>
    @if($sections->isNotEmpty())
        <div class="card mb-4">
            <div class="card-body">
                <table class="table table-bordered">
                    <thead>
                    <tr>
                        <th style="width: 10px">#</th>
                        <th>Title</th>
                        <th>Id</th>
                    </tr>
                    </thead>
                    <tbody>
                    @foreach($sections as $section)
                        <tr class="align-middle">
                            <td>{{ $loop->iteration }}</td>
                            <td>
                                <a href="{{ route('admin.sections.show', ['section'=>$section->id]) }}"
                                   class="btn btn-secondary"
                                >{{ $section->name }}</a>
                            </td>
                            <td>{{ $section->id }}</td>
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
</x-admin>
