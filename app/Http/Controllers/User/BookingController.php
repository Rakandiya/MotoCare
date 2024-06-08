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
        return Inertia::render('User/Booking', compact('bookings'));
    }

    // menampilkan form untuk tambah booking
    public function create()
    {
        $users = User::all();
        $katalogs = Katalog::all();
        return Inertia::render("User/Booking", compact("users", "katalogs"));
    }

    public function store(Request $request)
    {
        // dd($request->all());
        $validatedData = $request->validate([
            'jenis_layanan' => 'required',
            'tahun_pembuatan' => 'required|numeric',
            'nomor_polisi' => 'required',
            'km_kendaraan' => 'required|numeric',
            'jadwal_booking' => 'required|date',
            'catatan' => 'required',
        ]);

        $user = Auth::user(); // Get the currently authenticated user

        $katalog = Katalog::first(); // Mengambil katalog pertama sebagai default jika tidak ada yang dipilih

        $booking = Booking::create([
            'user_id' => $user->id, // Use the id of the authenticated user
            'jenis_layanan' => $validatedData['jenis_layanan'],
            'katalog_id' => $request->katalog_id ?? $katalog->id, // Menggunakan katalog_id dari request jika ada, jika tidak menggunakan id dari katalog pertama
            'tahun_pembuatan' => $validatedData['tahun_pembuatan'],
            'nomor_polisi' => $validatedData['nomor_polisi'],
            'km_kendaraan' => $validatedData['km_kendaraan'],
            'jadwal_booking' => $validatedData['jadwal_booking'],
            'status' => 'diproses',
            'catatan' => $validatedData['catatan'],
        ]);

        return redirect()->route('user.booking')->with('success', 'Data booking berhasil ditambahkan');
    }
}
?>