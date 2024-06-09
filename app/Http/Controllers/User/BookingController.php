<?php 
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Models\Katalog;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class BookingController extends Controller
{
    // menampilkan daftar semua booking
    public function index()
    {
        $bookings = Booking::all();
        $katalogs = Katalog::all();
        return Inertia::render('User/Booking', compact('bookings', 'katalogs'));
    }

    // menampilkan form untuk tambah booking
    

    public function store(Request $request)
    {
        // dd($request->all());
        $validatedData = $request->validate([
            'jenis_layanan' => 'required',
            'katalog_id' => 'required',
            'tahun_pembuatan' => 'nullable|numeric',
            'nomor_polisi' => 'nullable|string',
            'km_kendaraan' => 'nullable|numeric',
            'jadwal_booking' => 'required|date',
            'catatan' => 'nullable',
        ]);

        $user = Auth::user(); // Get the currently authenticated user

        

        $booking = Booking::create([
            'user_id' => $user->id || $request->user_id, // Use the id of the authenticated user
            'jenis_layanan' => $validatedData['jenis_layanan'],
            'katalog_id' => $request->katalog_id, // Menggunakan katalog_id dari request jika ada, jika tidak menggunakan id dari katalog pertama
            'tahun_pembuatan' => $validatedData['tahun_pembuatan'],
            'nomor_polisi' => $validatedData['nomor_polisi'],
            'km_kendaraan' => $validatedData['km_kendaraan'],
            'jadwal_booking' => $validatedData['jadwal_booking'],
            'status' => 'Diproses',
            'catatan' => $validatedData['catatan'],
        ]);

        Invoice::create([
            'user_id' => $validatedData['user_id'],
            'booking_id' => $booking->id,
            'status' => 'Unpaid',
        ]);

        return redirect()->route('user.riwayat')->with('success', 'Data booking berhasil ditambahkan');
    }
}
?>