<?php 
namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\Invoice;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;

class RiwayatController extends Controller
{
    // menampilkan daftar semua booking yang sesuai dengan user yang login
    public function index()
    {
        if(Auth::check()){
            $bookings = Booking::with(['user', 'katalog', 'invoice.items.produk'])->where('user_id', auth()->user()->id)->get();
            // dd($bookings);
            return Inertia::render('User/Riwayat', compact('bookings'));
        }else{
            return redirect()->route('auth');
        }
    }
}
?>