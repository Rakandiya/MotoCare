<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;

class ProfileController extends Controller
{
    public function store(Request $request, $id)
    {
        $request->validate([
            'nama' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'no_telepon' => 'required|string|max:15',
            'jenis_kelamin' => 'required|string|max:20',
            'role' => 'required|string|max:20',
            'foto' => 'nullable|image|max:2048',
        ]);

        $user = User::findOrFail($id);

        $data = $request->only('nama', 'tanggal_lahir', 'no_telepon', 'jenis_kelamin', 'role');

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('public/foto_profil');
            $data['foto'] = Storage::url($path);
        }

        $user->update($data);

        return redirect()->route('user.home')->with('message', 'Profile updated successfully.');
    }
}


