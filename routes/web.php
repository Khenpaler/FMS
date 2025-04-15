<?php

use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('Dashboard');
    })->name('dashboard');

    Route::get('personnel', function () {
        return Inertia::render('Personnels');
    })->name('personnel');

    Route::get('bus-profile', function () {
        return Inertia::render('BusProfiles');
    })->name('bus-profile');

    Route::get('devices', function () {
        return Inertia::render('Devices');
    })->name('devices');

    Route::get('maintenance', function () {
        return Inertia::render('Maintenance');
    })->name('maintenance');

    Route::get('dispatch-monitoring', function () {
        return Inertia::render('DispatchMonitoring');
    })->name('dispatch-monitoring');

    Route::get('fuel-monitoring', function () {
        return Inertia::render('FuelMonitoring');
    })->name('fuel-monitoring');

    Route::get('feedbacks', function () {
        return Inertia::render('Feedbacks');
    })->name('feedbacks');
});

require __DIR__.'/settings.php';
require __DIR__.'/auth.php';
