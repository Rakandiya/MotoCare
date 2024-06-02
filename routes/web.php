<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use App\Http\Controllers\TutorialController;



Route::group(['prefix' => 'admin'], function () {
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    Route::get('/manajemen-tutorial', [TutorialController::class, 'index'])->name('tutorial.index');

    Route::post('/manajemen-tutorial', [TutorialController::class, 'store'])->name('tutorial.store');

    Route::put("/manajemen-tutorial/{tutorial}", [TutorialController::class, 'update'])->name('tutorial.update');
})->name('admin.');

// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';
