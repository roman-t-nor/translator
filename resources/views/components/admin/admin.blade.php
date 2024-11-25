<!DOCTYPE html>
<html lang="en">

<x-admin.head/>

<body class="layout-fixed sidebar-expand-lg bg-body-tertiary">
<div class="app-wrapper">
    <x-admin.aside :$sections/>
    <main class="app-main">
        <x-admin.main-header/>
        <div class="app-content">
            <div class="container-fluid">
                @if ($slot->isEmpty())
                    <div class="alert alert-warning">
                        No items found.
                    </div>
                @else
                    {{ $slot }}
                @endif
            </div>
        </div>
    </main>
    <x-admin.footer/>
</div>
<x-admin.scripts/>
</body>

</html>
