@aware(['title', 'section'])
<div class="app-content-header">
    <div class="container-fluid">
        <div class="row">
            <div class="col-sm-6">
                <h3 class="mb-0">{{ $title }}</h3>
            </div>
            <div class="col-sm-6">
                <x-breadcrumbs class="float-sm-end" :$section/>
            </div>
        </div>
    </div>
</div>
