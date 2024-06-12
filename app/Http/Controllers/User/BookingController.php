<?php 
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Models\Katalog;
use App\Models\JenisLayanan;
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
        $jenisLayanans = JenisLayanan::all();
        return Inertia::render('User/Booking', compact('bookings', 'katalogs', 'jenisLayanans'));
    }

    // menampilkan form untuk tambah booking
    

    public function store(Request $request)
    {
        // dd($request->all());
        DB::transaction(function () use ($request) {
            $validatedData = $request->validate([
                'user_id' => 'required',
                'jenis_layanan_id' => 'required',
                'katalog_id' => 'required',
                'tahun_pembuatan' => 'required|numeric',
                'nomor_polisi' => 'required',
                'km_kendaraan' => 'required|numeric',
                'jadwal_booking' => 'required|date',
                'catatan' => 'required',
            ]);

            // Memanggil stored procedure yang telah diperbarui
            DB::select('CALL CreateBooking(?, ?, ?, ?, ?, ?, ?, ?)', [
                $validatedData['user_id'],
                $validatedData['jenis_layanan_id'],
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