<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    Route::get('personnel', function () {
        return Inertia::render('personnels/index');
    })->name('personnel');

    Route::get('bus-profile', function () {
        return Inertia::render('bus-profiles/index');
    })->name('bus-profile');

    Route::get('devices', function () {
        return Inertia::render('devices/index');
    })->name('devices');

    Route::get('maintenance', function () {
        return Inertia::render('maintenance/index');
    })->name('maintenance');

    Route::get('dispatch-monitoring', function () {
        return Inertia::render('dispatch-monitoring/index');
    })->name('dispatch-monitoring');

    Route::get('fuel-monitoring', function () {
        return Inertia::render('fuel-monitoring/index');
    })->name('fuel-monitoring');

    Route::get('feedbacks', function () {
        return Inertia::render('feedbacks/index');
    })->name('feedbacks');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
