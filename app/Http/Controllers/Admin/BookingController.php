<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Models\Katalog;
use Illuminate\Http\Request;
use Inertia\Inertia;

class BookingController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        

        return Inertia::render("Admin/ManajemenBooking");
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        $users = User::all();
        $katalogs = Katalog::all();
        return Inertia::render("Admin/TambahBooking", compact("users", "katalogs"));
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        //
    }

    /**
     * Display the specified resource.
     */
    public function show(Booking $booking)
    {
        return Inertia::render("Admin/DetailBooking");
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Booking $booking)
    {
        return Inertia::render("Admin/EditBooking");
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Booking $booking)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Booking $booking)
    {
        //
    }

    public function createInvoice()
    {
        return Inertia::render("Admin/TambahInvoice");
    }
}
