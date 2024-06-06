<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Hash;

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
        // Validasi data
        $validatedData = $request->validate([
            'nama' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users',
            'email' => 'required|email|max:255|unique:users',
            'tanggal_lahir' => 'required|date',
            'no_telepon' => 'required|string|max:20',
            'jenis_kelamin' => 'required|in:Laki-laki,Perempuan,Lainnya',
            'password' => 'required|string|min:8|confirmed',
            'role' => 'required|in:Admin,User',
            'foto' => 'nullable|image|mimes:jpg,jpeg,png|max:2048',
        ]);

        // Simpan data user ke database
        $user = User::create([
            'nama' => $validatedData['nama'],
            'username' => $validatedData['username'],
            'email' => $validatedData['email'],
            'tanggal_lahir' => $validatedData['tanggal_lahir'],
            'no_telepon' => $validatedData['no_telepon'],
            'jenis_kelamin' => $validatedData['jenis_kelamin'],
            'password' => Hash::make($validatedData['password']),
            'role' => $validatedData['role'],
        ]);

        // Jika ada foto profil, simpan file-nya
        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('public/profile_photos');
            $user->foto = basename($path);
            $user->save();
        }

        // Mengembalikan respons JSON yang sesuai
        return response()->json(['message' => 'User created successfully!', 'user' => $user], 201);

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
        return Inertia::render('Admin/EditUser', ['user' => $user]);
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, User $user)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'username' => 'required|string|max:255|unique:users,username,' . $user->id,
            'email' => 'required|string|email|max:255|unique:users,email,' . $user->id,
            'tanggal_lahir' => 'required|date',
            'no_telepon' => 'required|string|max:15',
            'jenis_kelamin' => 'required|string|in:Laki-laki,Perempuan,Lainnya',
            'password' => 'nullable|string|min:8|confirmed',
            'role' => 'required|string|in:Admin,User',
            'foto' => 'nullable|image|mimes:jpeg,png,jpg,gif,svg|max:2048',
        ]);

        $user->name = $request->nama;
        $user->username = $request->username;
        $user->email = $request->email;
        $user->tanggal_lahir = $request->tanggal_lahir;
        $user->no_telepon = $request->no_telepon;
        $user->jenis_kelamin = $request->jenis_kelamin;
        if ($request->filled('password')) {
            $user->password = Hash::make($request->password);
        }
        $user->role = $request->role;

        if ($request->hasFile('foto')) {
            $file = $request->file('foto');
            $filename = time() . '.' . $file->getClientOriginalExtension();
            $file->move(public_path('uploads/profile_pictures'), $filename);
            $user->foto = $filename;
        }

        $user->save();

        return redirect()->route('admin.user.index')->with('success', 'User updated successfully');
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(User $user)
    {
        $user->delete();
        return redirect()->route('admin.user.index')->with('success', 'User deleted successfully');
    }
}

