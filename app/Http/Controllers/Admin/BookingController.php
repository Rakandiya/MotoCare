<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Tutorial;
use App\Models\User;
use App\Models\Katalog;
use Illuminate\Http\Request;
use Inertia\Inertia;


class BookingController extends Controller
{
    // menampilkan daftar semua booking
    public function index()
    {
        $bookings = Booking::all();
        return Inertia::render('Admin/ManajemenBooking', compact('bookings'));
    }

    // menampilkan form untuk tambah booking
    public function create()
    {
        // direct tombolBooking ke tambahBooking
        // return Inertia::render("Admin/TambahBooking");
        // panggil data user
        $users = User::all();
        $katalogs = Katalog::all();
        return Inertia::render("Admin/TambahBooking", compact("users", "katalogs"));
    }

    // menyimpan data booking baru ke dalam database
    public function store(Request $request)
    {
        dd($request->all());
        $validatedData = $request -> validate([
            'nama' => 'required',
            'jenis_layanan' => 'required',
            'merk_motor' => 'required',
            'tahun_pembuatan' => 'required|numeric',
            'nomor_polisi' => 'required',
            'km_kendaraan' => 'required|numeric',
            'jadwal_booking' => 'required|date',
            'catatan' => 'required',

        ]);

        $booking = Booking::create([
            'nama' => $validatedData['nama'],
            'jenis_layanan' => $validatedData['jenis_layanan'],
            'merk_motor' => $validatedData['merk_motor'],
            'tahun_pembuatan' => $validatedData['tahun_pembuatan'],
            'nomor_polisi' => $validatedData['nomor_polisi'],
            'km_kendaraan' => $validatedData['km_kendaraan'],
            'jadwal_booking' => $validatedData['jadwal_booking'],
            'catatan' => $validatedData['catatan'],
        ]);

        // return redirect()->route('admin.booking.index')->with('success', 'Data booking berhasil ditambahkan');
    }

    // menampilkan detail booking
    public function show(Booking $booking)
    {
        return Inertia::render("Admin/DetailBooking");
    }

    // menampilkan form untuk edit booking
    public function edit(Booking $booking)
    {
        return Inertia::render("Admin/EditBooking");
    }

    // memperbarui/update data booking yang ada
    public function update(Request $request, Booking $booking)
    {
        // untuk update
        $validatedData = $request->validate([
            'nama' => 'required',
            'jenis_layanan' => 'required',
            'merk_motor' => 'required',
            'tahun_pembuatan' => 'required|numeric',
            'nomor_polisi' => 'required',
            'km_kendaraan' => 'required|numeric',
            'jadwal_booking' => 'required|date',
            'catatan' => 'nullable',
        ]);

        $booking->update([
            'nama' => $validatedData['nama'],
            'jenis_layanan' => $validatedData['jenis_layanan'],
            'merk_motor' => $validatedData['merk_motor'],
            'tahun_pembuatan' => $validatedData['tahun_pembuatan'],
            'nomor_polisi' => $validatedData['nomor_polisi'],
            'km_kendaraan' => $validatedData['km_kendaraan'],
            'jadwal_booking' => $validatedData['jadwal_booking'],
            'catatan' => $validatedData['catatan'],
        ]);

        return redirect()->back()->with('success', 'Data booking berhasil diperbarui');
    }

    // menghapus data booking
    public function destroy(Booking $booking)
    {
        // untuk hapus
        $booking->delete();
        return redirect()->back();
    }

    // menampilkan form tambah invoice
    public function createInvoice()
    {
        return Inertia::render("Admin/TambahInvoice");
    }
}
