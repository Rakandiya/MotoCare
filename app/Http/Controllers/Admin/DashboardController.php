<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\User;
use App\Models\Ulasan;
use App\Models\Booking;
use Inertia\Inertia;

class DashboardController extends Controller
{
    public function index()
    {
        $totalUserMale = User::where('jenis_kelamin', 'Laki-laki')->count();
        $totalUserFemale = User::where('jenis_kelamin', 'Perempuan')->count();
        $ulasans = Ulasan::all();
        $totalBooking = Booking::count();
        return Inertia::render('Admin/Dashboard', compact('totalUserMale', 'totalUserFemale', 'ulasans', 'totalBooking'));
    }
}
