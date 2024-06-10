<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Booking;
use App\Models\User;
use App\Models\Katalog;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;


class BookingController extends Controller
{
    // menampilkan daftar semua booking
    public function index()
    {
        $bookings = Booking::with(['user', 'katalog', 'invoice'])->where('user_id', auth()->user()->id)->get();
        return Inertia::render('Admin/ManajemenBooking', compact('bookings'));
    }

    // menampilkan form untuk tambah booking
    public function create()
    {
        
        $users = User::all();
        $katalogs = Katalog::all();
        return Inertia::render("Admin/TambahBooking", compact("users", "katalogs"));
    }

    // menyimpan data booking baru ke dalam database
    public function store(Request $request)
    {
        // dd($request->all());
        $validatedData = $request -> validate([
            'user_id' => 'required',
            'jenis_layanan' => 'required',
            'katalog_id' => 'required',
            'tahun_pembuatan' => 'required|numeric',
            'nomor_polisi' => 'required',
            'km_kendaraan' => 'required|numeric',
            'jadwal_booking' => 'required|date',
            'catatan' => 'required',

        ]);

        $booking = Booking::create([
            'user_id' => $validatedData['user_id'],
            'jenis_layanan' => $validatedData['jenis_layanan'],
            'katalog_id' => $validatedData['katalog_id'],
            'tahun_pembuatan' => $validatedData['tahun_pembuatan'],
            'nomor_polisi' => $validatedData['nomor_polisi'],
            'km_kendaraan' => $validatedData['km_kendaraan'],
            'jadwal_booking' => $validatedData['jadwal_booking'],
            'status' => 'diproses',
            'catatan' => $validatedData['catatan'],
        ]);


        Invoice::create([
            'user_id' => $validatedData['user_id'],
            'booking_id' => $booking->id,
            'status' => 'Unpaid',
        ]);
        return redirect()->route('admin.booking.index')->with('success', 'Data booking berhasil ditambahkan');
    }

    // menampilkan detail booking
    public function show(Booking $booking)
    {
        $dataBooking = Booking::with(['user', 'katalog', 'invoice.items.produk'])->find($booking->id);

        // Memanggil fungsi MySQL untuk menghitung total harga
        $totalPrice = DB::selectOne("SELECT calculate_total_price(?) AS total_price", [$dataBooking->invoice->id]);;

        $totalPrice = $totalPrice->total_price ?? 0;
        return Inertia::render("Admin/DetailBooking", compact('dataBooking', 'totalPrice'));
    }

    // menampilkan form untuk edit booking
    public function edit(Booking $booking)
    {
        $booking = Booking::with(['user', 'katalog', 'invoice'])->find($booking->id);
        $users = User::all();
        $katalogs = Katalog::all();
        return Inertia::render("Admin/EditBooking", compact('booking', 'users', 'katalogs'));
    }

    // memperbarui/update data booking yang ada
    public function update(Request $request, Booking $booking)
    {
        // untuk update
        $validatedData = $request->validate([
            'user_id' => 'required',
            'jenis_layanan' => 'required',
            'katalog_id' => 'required',
            'tahun_pembuatan' => 'required|numeric',
            'nomor_polisi' => 'required',
            'km_kendaraan' => 'required|numeric',
            'jadwal_booking' => 'required|date',
            'status' => 'required',
            'catatan' => 'nullable',
        ]);

        $booking->update([
            'user_id' => $validatedData['user_id'],
            'jenis_layanan' => $validatedData['jenis_layanan'],
            'katalog_id' => $validatedData['katalog_id'],
            'tahun_pembuatan' => $validatedData['tahun_pembuatan'],
            'nomor_polisi' => $validatedData['nomor_polisi'],
            'km_kendaraan' => $validatedData['km_kendaraan'],
            'jadwal_booking' => $validatedData['jadwal_booking'],
            'status' => $validatedData['status'],
            'catatan' => $validatedData['catatan'],
        ]);

        return redirect()->route('admin.booking.index')->with('success', 'Data booking berhasil diperbarui');
    }

    // menghapus data booking
    public function destroy(Booking $booking)
    {

        $invoice = Invoice::where('booking_id', $booking->id)->first();

        $invoiceItems = InvoiceItem::where('invoice_id', $invoice->id)->get();
        

        if($invoiceItems->count() > 0){
            foreach($invoiceItems as $invoiceItem){
                $invoiceItem->delete();
            }
        }
        $invoice->delete();
        $booking->delete();
        return redirect()->back();
    }

    // menampilkan form tambah invoice
    public function createInvoice(Booking $booking)
    {
        $produks = Produk::all();
        $booking = Booking::with(['user', 'katalog', 'invoice.items.produk'])->where('id', $booking->id)->first();
        return Inertia::render("Admin/TambahInvoice", compact('produks', 'booking'));
    }

    public function updateInvoice(Request $request, Booking $booking)
{
    $validatedData = $request->validate([
        'user_id' => 'required',
        'booking_id' => 'required',
        'tanggal' => 'required|date',
        'status' => 'required',
        'catatan' => 'nullable',
    ]);

    $totalHarga = 0;

    foreach ($request->produk as $produk) {
        $totalHarga += $produk['harga'] * $produk['jumlah'];
    }

    $invoice = Invoice::where('booking_id', $booking->id)->first();
    $invoice->update([
        'user_id' => $validatedData['user_id'],
        'booking_id' => $validatedData['booking_id'],
        'tanggal' => $validatedData['tanggal'],
        'status' => $validatedData['status'],
        'catatan' => $validatedData['catatan'],
        // 'total_harga' => $totalHarga,
    ]);

    $invoiceItems = InvoiceItem::where('invoice_id', $invoice->id)->get();

    if ($invoiceItems->count() > 0) {
        foreach ($invoiceItems as $invoiceItem) {
            $invoiceItem->delete();
        }
    }

    try {
        foreach ($request->produk as $produk) {
            // Check if stock is sufficient before inserting
            $product = Produk::find($produk['id']);
            if ($product->stok < $produk['jumlah']) {
                return redirect()->route('admin.booking.index')->with('error', 'Insufficient stock for product: ' . $product->nama_produk);
            }

            InvoiceItem::create([
                'invoice_id' => $invoice->id,
                'produk_id' => $produk['id'],
                'jumlah' => $produk['jumlah'],
                'harga' => $produk['harga'],
            ]);
        }
    } catch (QueryException $e) {
        // Handle potential errors thrown by the trigger
        if ($e->getCode() == '45000') {
            return redirect()->route('admin.booking.index')->with('error', 'Insufficient stock for product');
        }
        throw $e;
    }

    return redirect()->route('admin.booking.index')->with('success', 'Data invoice berhasil diperbarui');
}

    public function updateStatusBooking(Request $request, Booking $booking)
    {
        $validatedData = $request->validate([
            'status' => 'required',
        ]);

        $booking->update([
            'status' => $validatedData['status'],
        ]);

        return redirect()->back();
    }

    public function updateStatusPembayaran(Request $request, Invoice $invoice)
    {
        $validatedData = $request->validate([
            'status' => 'required',
        ]);


        $invoice->update([
            'status' => $validatedData['status'],
        ]);

        return redirect()->back();
    }

    // public function updateStatusBooking(Request $request, Booking $booking)
    // {
    //     $validatedData = $request->validate([
    //         'status' => 'required',
    //     ]);

    //     $booking->update([
    //         'status' => $validatedData['status'],
    //     ]);

    //     return redirect()->back();
    // }
}
