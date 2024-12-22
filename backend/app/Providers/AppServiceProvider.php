<?php

namespace App\Providers;

use App\Models\Section;
use Illuminate\Pagination\Paginator;
use Illuminate\Support\Facades\Route;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    /**
     * Register any application services.
     */
    public function register(): void
    {
        $this->app->usePublicPath($_SERVER['DOCUMENT_ROOT'].'/admin');
    }

    /**
     * Bootstrap any application services.
     */
    public function boot(): void
    {
        Route::model('section', Section::class);
        Paginator::useBootstrapFive();
    }
}
