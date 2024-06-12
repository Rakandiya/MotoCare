<?php

use App\Http\Controllers\ProfileController;
use Illuminate\Foundation\Application;
use Illuminate\Support\Facades\Route;
use Inertia\Inertia;
use Illuminate\Support\Facades\Auth;

// // Admin Controller
use App\Http\Controllers\Admin\DashboardController;
use App\Http\Controllers\Admin\TutorialController;
use App\Http\Controllers\Auth\RegisterController;
use App\Http\Controllers\Admin\UserController;
use App\Http\Controllers\Admin\BookingController;
use App\Http\Controllers\Admin\KatalogController;
use App\Http\Controllers\Admin\UlasanController;
use App\Http\Controllers\Admin\ProdukController;
use App\Http\Controllers\Admin\JenisLayananController;
use App\Http\Controllers\Auth\LoginController;

// // User Controller
use App\Http\Controllers\User\HomeController;
use App\Http\Controllers\User\TutorialController as UserTutorialController;
use App\Http\Controllers\User\UlasanController as UserUlasanController;
use App\Http\Controllers\User\KatalogController as UserKatalogController;

use App\Http\Controllers\User\BookingController as UserBookingController; // Corrected Controller
use App\Http\Controllers\User\RiwayatController as UserRiwayatController; // Added Controller
use App\Http\Controllers\User\ProfileController as UserProfileController;

// //Middleware
use App\Http\Middleware\AdminMiddleware;
use App\Models\User;

// // Route::get('/', function () {
// //     return Inertia::render('Welcome', [
// //         'canLogin' => Route::has('login'),
// //         'canRegister' => Route::has('register'),
// //         'laravelVersion' => Application::VERSION,
// //         'phpVersion' => PHP_VERSION,
// //     ]);
// // });

Route::get('/dashboard', function () {
    return redirect()->route('user.home');
})->middleware(['auth'])->name('dashboard');

// Route::middleware('auth')->group(function () {
//     Route::get('/profile', [ProfileController::class, 'edit'])->name('profile.edit');
//     Route::patch('/profile', [ProfileController::class, 'update'])->name('profile.update');
//     Route::delete('/profile', [ProfileController::class, 'destroy'])->name('profile.destroy');
// });

Route::group(['prefix' => 'admin', 'as' => 'admin.', 'middleware' => ['admin']], function () {
    // Route Dashboard
    Route::get('/', [DashboardController::class, 'index'])->name('dashboard');

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
    Route::post('/manajemen-booking', [BookingController::class, 'store'])->name('booking.store');
    Route::get('/manajemen-booking/edit/{booking}', [BookingController::class, 'edit'])->name('booking.edit');
    Route::put("/manajemen-booking/{booking}", [BookingController::class, 'update'])->name('booking.update');
    
    Route::delete("/manajemen-booking/{booking}", [BookingController::class, 'destroy'])->name('booking.delete');

    Route::put("/manajemen-booking/{booking}/update-status-booking", [BookingController::class, 'updateStatusBooking'])->name('booking.updateStatusBooking');

    // Route Tambah Invoice
    Route::get('/manajemen-booking/{booking}/tambah-invoice', [BookingController::class, 'createInvoice'])->name('booking.createInvoice');
    Route::put('/manajemen-booking/{booking}/tambah-invoice', [BookingController::class, 'updateInvoice'])->name('booking.updateInvoice');
    Route::put('/manajemen-booking/{invoice}/update-status-pembayaran', [BookingController::class, 'updateStatusPembayaran'])->name('booking.updateStatusPembayaran');
    

    // Route Manajemen Katalog
    //tambahan
    // Route::resource('admin/katalog', KatalogController::class);
    
    Route::get('/manajemen-katalog', [KatalogController::class, 'index'])->name('katalog.index');
    Route::post('/manajemen-katalog', [KatalogController::class, 'store'])->name('katalog.store');
    Route::put("/manajemen-katalog/{katalog}", [KatalogController::class, 'update'])->name('katalog.update');
    Route::delete("/manajemen-katalog/{katalog}", [KatalogController::class, 'destroy'])->name('katalog.delete');

    // Route Manajemen Ulasan
    Route::get('/manajemen-ulasan', [UlasanController::class, 'index'])->name('ulasan.index');
    Route::delete("/manajemen-ulasan/{ulasan}", [UlasanController::class, 'destroy'])->name('ulasan.delete');

    // Route Manajemen Produk
    Route::get('/manajemen-produk', [ProdukController::class, 'index'])->name('produk.index');
    Route::post('/manajemen-produk', [ProdukController::class, 'store'])->name('produk.store');
    Route::put("/manajemen-produk/{produk}", [ProdukController::class, 'update'])->name('produk.update');
    Route::delete("/manajemen-produk/{produk}", [ProdukController::class, 'destroy'])->name('produk.delete');

    // Route Manajemen Jenis Layanan
    Route::get('/manajemen-jenis-layanan', [JenisLayananController::class, 'index'])->name('jenisLayanan.index');
    Route::post('/manajemen-jenis-layanan', [JenisLayananController::class, 'store'])->name('jenisLayanan.store');
    Route::put("/manajemen-jenis-layanan/{jenisLayanan}", [JenisLayananController::class, 'update'])->name('jenisLayanan.update');
    Route::delete("/manajemen-jenis-layanan/{jenisLayanan}", [JenisLayananController::class, 'destroy'])->name('jenisLayanan.delete');
})->middleware(["admin"])->name('admin.');


Route::group(['prefix' => 'user', 'as' => 'user.', 'middleware' => ['admin']], function () {
    Route::get('/tutorial', [UserTutorialController::class, 'index'])->name('tutorial');
    Route::get('/tutorial/search', [UserTutorialController::class, 'search'])->name('tutorial.search');

    Route::get('/ulasan', [UserUlasanController::class, 'index'])->name('ulasan');

    Route::post('/ulasan', [UserUlasanController::class, 'store'])->name('ulasan.create')->middleware('verified');
    
    Route::get('/katalog', [UserKatalogController::class, 'index'])->name('katalog');
    
    Route::get('/home', [HomeController::class, 'index'])->name('home');

    Route::get('/about', function () {
        return Inertia::render('User/About');
    })->name('about');

    Route::get('/tambah-profil/{id}', function ($id) {
        return Inertia::render('User/TambahProfil', ['userId' => $id]);
    })->name('tambah-profil');

    Route::put('/tambah-profil/{id}', [UserProfileController::class, 'store'])->name('profile.store');

    // route booking
    Route::get('/booking', [UserBookingController::class, 'index'])->name('booking');
    Route::post('/booking', [UserBookingController::class, 'store'])->name('booking.store')->middleware('verified'); // Corrected Controller
    

    Route::get('/riwayat', [UserRiwayatController::class, 'index'])->name('riwayat')->middleware('verified'); // Corrected route to use RiwayatController

    Route::get('/FaQ', function () {
        return Inertia::render('User/FaQ');
    })->name('FaQ');
})->name('user.');

Route::get('/', function () {
    return Inertia::render('Register');
})->name('auth');

Route::post('/login', [LoginController::class, 'login'])->name('login');
Route::post('/forgot', [LoginController::class, 'forgot'])->name('forgot');
Route::post('/logout', [LoginController::class, 'logout'])->name('logout');

require __DIR__.'/auth.php';

// Route::get('/', function () {
//     echo "OK";
// });
