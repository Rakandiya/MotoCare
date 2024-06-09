<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use App\Models\Ulasan;
use App\Models\FotoUlasan;
use App\Models\Booking;
use App\Models\Invoice;
use App\Models\InvoiceItem;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rule;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class UserController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $users = User::all();
        return Inertia::render('Admin/ManajemenUser', ['users' => $users]);
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        return Inertia::render('Admin/TambahUser');
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {

        $validation = Validator::make($request->all(), [
            'nama' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|string|email|max:255|unique:users',
            'tanggal_lahir' => 'required|date',
            'no_telepon' => 'required|string|max:15',
            'jenis_kelamin' => ['required', Rule::in(['Laki-laki', 'Perempuan', 'Lainnya'])],
            'password' => 'required|string|confirmed|min:8',
            'role' => ['required', Rule::in(['admin', 'user'])],
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);
        

        if ($validation->fails()) {
            return redirect()->back()->withErrors($validation->messages())->withInput();
        }

        $user = new User();
        $user->nama = $request->nama;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->tanggal_lahir = $request->tanggal_lahir;
        $user->no_telepon = $request->no_telepon;
        $user->jenis_kelamin = $request->jenis_kelamin;
        $user->password = Hash::make($request->password);
        $user->role = $request->role;

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('images/foto', 'public');
            $user->foto = $path;
        }

        $user->save();

        return redirect()->route('admin.user.index')->with('success', 'User created successfully!');
    }

    /**
     * Display the specified resource.
     */
    public function show(User $user)
    {
        return Inertia::render('Admin/DetailUser', ['user' => $user]);
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(User $user)
    {
        return Inertia::render('Admin/EditUser', compact('user'));
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {

        // dd($user->id);

        $validation = [
            'nama' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'tanggal_lahir' => 'required|date',
            'no_telepon' => 'required|string|max:15',
            'jenis_kelamin' => ['required', Rule::in(['Laki-laki', 'Perempuan'])],
            'role' => ['required', Rule::in(['admin', 'user'])],
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ];

        $data = [];

        $validated = Validator::make($request->data, $validation);


        if ($validated->fails()) {
            return redirect()->back()->withErrors($validated->messages())->withInput();
        }

        

        $data['nama'] = $request->data['nama'];
        $data['username'] = $request->data['username'];
        $data['email'] = $request->data['email'];
        $data['tanggal_lahir'] = $request->data['tanggal_lahir'];
        $data['no_telepon'] = $request->data['no_telepon'];
        $data['jenis_kelamin'] = $request->data['jenis_kelamin'];
        $data['role'] = $request->data['role'];

        if ($request->data['foto']) {
            if (Storage::disk('public')->exists($user->foto)) {
                Storage::disk('public')->delete($user->foto);
            }
            $path = $request->data['foto']->store('images/foto', 'public');
            $data['foto'] = $path;
        }

        User::where('id', $user->id)->update($data);

        return redirect()->route('admin.user.index')->with('success', 'User updated successfully!');
        
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $ulasans = Ulasan::where('user_id', $user->id)->get();

        if($ulasans->count() > 0){
            foreach($ulasans as $ulasan){
                $fotoUlasans = FotoUlasan::where('ulasan_id', $ulasan->id)->get();
                if($fotoUlasans->count() > 0){
                    foreach($fotoUlasans as $fotoUlasan){
                        Storage::disk('public')->delete($fotoUlasan->foto);
                        $fotoUlasan->delete();
                    }
                }
                $ulasan->delete();
            }
        }

        $bookings = Booking::where('user_id', $user->id)->get();

        if($bookings->count() > 0){
            foreach($bookings as $booking){
                $invoice = Invoice::where('booking_id', $booking->id)->first();

                $invoiceItems = InvoiceItem::where('invoice_id', $invoice->id)->get();
                if($invoiceItems->count() > 0){
                    foreach($invoiceItems as $invoiceItem){
                        $invoiceItem->delete();
                    }
                }

                $invoice->delete();
                $booking->delete();
            }
        }

        if($user->foto) {
            Storage::disk('public')->delete($user->foto);
        }
        $user->delete();

        return redirect()->route('admin.user.index')->with('success', 'User deleted successfully!');
    }
}


