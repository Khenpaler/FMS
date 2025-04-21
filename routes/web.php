<?php

use App\Http\Controllers\UserProfileController;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

Route::get('/', function () {
    return Inertia::render('Welcome');
})->name('home');

Route::middleware(['auth', 'verified'])->group(function () {
    Route::get('dashboard', function () {
        return Inertia::render('dashboard/index');
    })->name('dashboard');

    // Personnel Management Routes
    Route::prefix('personnel-management')->name('personnel-management.')->group(function () {
        Route::get('personnels', [UserProfileController::class, 'index'])->name('personnels.index');
        Route::post('personnels', [UserProfileController::class, 'store'])->name('personnels.store');
        Route::get('personnels/{user_profile}', [UserProfileController::class, 'show'])->name('personnels.show');
        Route::put('personnels/{user_profile}', [UserProfileController::class, 'update'])->name('personnels.update');
        Route::delete('personnels/{user_profile}', [UserProfileController::class, 'destroy'])->name('personnels.destroy');

        // Accounts Routes (placeholder)
        Route::get('accounts', function () {
            return Inertia::render('personnel-management/accounts/index');
        })->name('accounts.index');
    });

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
