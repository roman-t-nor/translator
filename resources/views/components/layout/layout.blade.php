<!DOCTYPE html>
<html lang="en">

<x-layout.head/>

<body class="layout-fixed sidebar-expand-lg bg-body-tertiary">
<div class="app-wrapper">
    <x-layout.aside :$sections/>
    <main class="app-main">
        <x-message class="container-fluid mt-2"/>
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

    @isset($footer)
        <x-layout.footer :$footer/>
    @endisset

</div>

<x-layout.scripts/>

</body>

</html>
