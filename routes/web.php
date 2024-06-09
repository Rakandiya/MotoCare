<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;

// Admin Controller
use App\Http\Controllers\Admin\TutorialController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\KatalogController;
use App\Http\Controllers\Admin\UlasanController;
use App\Http\Controllers\Admin\ProdukController;
use App\Http\Controllers\Auth\LoginController;

// User Controller
use App\Http\Controllers\User\TutorialController as UserTutorialController;
use App\Http\Controllers\User\UlasanController as UserUlasanController;
use App\Http\Controllers\User\BookingController as UserBookingController; // Corrected Controller
use App\Http\Controllers\User\RiwayatController as UserRiwayatController; // Added Controller

//Middleware
use App\Http\Middleware\AdminMiddleware;
use App\Models\User;

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => 'admin'], function () {
    // Route Dashboard
    Route::get('/', function () {
        return Inertia::render('Admin/Dashboard');
    })->name('dashboard');

    // Route Manajemen Tutorial
    Route::get('/manajemen-tutorial', [TutorialController::class, 'index'])->name('tutorial.index');
    Route::post('/manajemen-tutorial', [TutorialController::class, 'store'])->name('tutorial.store');
    Route::put("/manajemen-tutorial/{tutorial}", [TutorialController::class, 'update'])->name('tutorial.update');
    Route::delete("/manajemen-tutorial/{tutorial}", [TutorialController::class, 'destroy'])->name('tutorial.delete');

    // Route Manajemen User
    Route::get('/manajemen-user', [UserController::class, 'index'])->name('user.index');
    Route::get('/manajemen-user/detail/{user}', [UserController::class, 'show'])->name('user.show');
    Route::get('/manajemen-user/tambah', [UserController::class, 'create'])->name('user.create');
    Route::post('/manajemen-user', [UserController::class, 'store'])->name('user.store');
    Route::get('/manajemen-user/edit/{user}', [UserController::class, 'edit'])->name('user.edit');
    Route::put("/manajemen-user/{user}", [UserController::class, 'update'])->name('user.update');
    Route::delete('/manajemen-user/{user}', [UserController::class, 'destroy'])->name('user.destroy');

    // Route Manajemen Booking
    Route::get('/manajemen-booking', [BookingController::class, 'index'])->name('booking.index');
    Route::get('/manajemen-booking/detail/{booking}', [BookingController::class, 'show'])->name('booking.show');
    Route::get('/manajemen-booking/tambah', [BookingController::class, 'create'])->name('booking.create');
    Route::get('/manajemen-booking/tambah-invoice', [BookingController::class, 'createInvoice'])->name('booking.createInvoice');
    Route::post('/manajemen-booking', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/manajemen-booking/edit/{booking}', [BookingController::class, 'edit'])->name('booking.edit');
    Route::put("/manajemen-booking/{booking}", [BookingController::class, 'update'])->name('booking.update');
    Route::delete("/manajemen-booking/{booking}", [BookingController::class, 'destroy'])->name('booking.delete');
    

    // Route Manajemen Katalog
    //tambahan
    // Route::resource('admin/katalog', KatalogController::class);
    
    Route::get('/manajemen-katalog', [KatalogController::class, 'index'])->name('katalog.index');
    Route::post('/manajemen-katalog', [KatalogController::class, 'store'])->name('katalog.store');
    Route::put("/manajemen-katalog/{katalog}", [KatalogController::class, 'update'])->name('katalog.update');
    Route::delete("/manajemen-katalog/{katalog}", [KatalogController::class, 'destroy'])->name('katalog.delete');

    // Route Manajemen Ulasan
    Route::get('/manajemen-ulasan', [UlasanController::class, 'index'])->name('ulasan.index');

    // Route Manajemen Produk
    Route::get('/manajemen-produk', [ProdukController::class, 'index'])->name('produk.index');
    Route::post('/manajemen-produk', [ProdukController::class, 'store'])->name('produk.store');
    Route::put("/manajemen-produk/{produk}", [ProdukController::class, 'update'])->name('produk.update');
    Route::delete("/manajemen-produk/{produk}", [ProdukController::class, 'destroy'])->name('produk.delete');
})->middleware(["admin", "auth"])->name('admin.');


Route::group(['prefix' => 'user', 'as' => 'user.'], function () {
    Route::get('/tutorial', [UserTutorialController::class, 'index'])->name('tutorial');
    Route::get('/tutorial/search', [UserTutorialController::class, 'search'])->name('tutorial.search');

    Route::get('/ulasan', [UserUlasanController::class, 'index'])->name('ulasan');

    Route::post('/ulasan', [UserUlasanController::class, 'store'])->name('ulasan.create');
    
    Route::get('/katalog', function () {
        return Inertia::render('User/Katalog');
    })->name('katalog');
    
    Route::get('/home', function () {
        return Inertia::render('User/Home');
    })->name('home');

    Route::get('/tambah-profil/{id}', function ($id) {
        return Inertia::render('User/TambahProfil', ['userId' => $id]);
    })->name('tambah-profil');

    // route booking
    Route::get('/booking', function () {
        return Inertia::render('User/Booking');
    })->name('booking');
    
    Route::post('/booking', [UserBookingController::class, 'store'])->name('booking.store'); // Corrected Controller
    

    Route::get('/riwayat', [UserRiwayatController::class, 'index'])->name('riwayat'); // Corrected route to use RiwayatController

})->name('user.');

Route::get('/', function () {
    return Inertia::render('Register');
})->name('auth');

Route::post('/register', [RegisterController::class, 'register']);
Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');
Route::post('/profile', [ProfileController::class, 'store'])->name('profile.store');

// Uncomment if needed
// Route::get('/dashboard', function () {
//     return Inertia::render('Dashboard');
// })->middleware(['auth', 'verified'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

// require __DIR__.'/auth.php';
