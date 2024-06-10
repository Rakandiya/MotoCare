<?php 
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Models\Katalog;
use App\Models\Invoice;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

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
        

        
        DB::transaction(function () use ($request) {
            $user = Auth::user(); // Get the currently authenticated user

            // dd($user);
            $validatedData = $request->validate([
                'jenis_layanan' => 'required',
                'katalog_id' => 'required',
                'tahun_pembuatan' => 'nullable|numeric',
                'nomor_polisi' => 'nullable|string',
                'km_kendaraan' => 'nullable|numeric',
                'jadwal_booking' => 'required|date',
                'catatan' => 'nullable',
            ]);

            // Memanggil stored procedure yang telah diperbarui
            DB::select('CALL CreateBooking(?, ?, ?, ?, ?, ?, ?, ?)', [
                $user->id,
                $validatedData['jenis_layanan'],
                $validatedData['katalog_id'],
                $validatedData['tahun_pembuatan'],
                $validatedData['nomor_polisi'],
                $validatedData['km_kendaraan'],
                $validatedData['jadwal_booking'],
                $validatedData['catatan']
            ]);
        });

        return redirect()->route('user.riwayat')->with('success', 'Data booking berhasil ditambahkan');
    }
}
?>