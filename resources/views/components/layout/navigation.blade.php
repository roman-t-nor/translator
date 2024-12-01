<nav class="mt-2">
    <ul class="nav sidebar-menu flex-column mb-4" data-lte-toggle="treeview" role="menu" data-accordion="false">
        <li class="nav-item menu-open">
            <a href="#" class="nav-link active">
                <i class="av-arrow bi bi-diagram-3"></i>
                <p>
                    Content
                    <i class="nav-arrow bi bi-chevron-right"></i>
                </p>
            </a>
            <x-menu :elements="$sections"/>
        </li>
        <li class="nav-item">
            <a href="{{ route("admin.settings") }}" class="nav-link">
                <i class="av-arrow bi bi-gear"></i>
                <p>
                    Settings
                </p>
            </a>
        </li>
    </ul>
</nav>
