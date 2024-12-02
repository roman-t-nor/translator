<!DOCTYPE html>
<html lang="en">

<x-layout.head/>

<body class="layout-fixed sidebar-expand-lg bg-body-tertiary">
<div class="app-wrapper">
    <x-layout.aside :$sections/>
    <main class="app-main">
        <x-layout.main-header/>
        <div class="app-content">
            <div class="container-fluid">
                @if ($slot->isEmpty())
                    <div class="alert alert-warning">
                        No content for this page.
                    </div>
                @else
                    {{ $slot }}
                @endif
            </div>
        </div>
    </main>
    <x-layout.footer :$footer/>
</div>
<x-layout.scripts/>
</body>

</html>
