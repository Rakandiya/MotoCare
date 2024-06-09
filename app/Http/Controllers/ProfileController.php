<?php

namespace App\Http\Controllers;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;

class ProfileController extends Controller
{
    public function store(Request $request, $id)
    {

        // dd($request->all());

        $validation = [
            'nama' => 'required|string|max:255',
            'tanggal_lahir' => 'required|date',
            'no_telepon' => 'required|string|max:15',
            'jenis_kelamin' => 'required|max:20',
            'foto' => 'nullable|image|max:2048',
        ];

        $validated = Validator::make($request->data, $validation);
        
        
        
        $data = [
            'nama' => $request->data['nama'],
            'tanggal_lahir' => $request->data['tanggal_lahir'],
            'no_telepon' => $request->data['no_telepon'],
            'jenis_kelamin' => $request->data['jenis_kelamin'],
        ];

        // dd($user);

        if ($request->hasFile('foto')) {
            $path = $request->file('foto')->store('images/foto_profil', 'public');
            $data['foto'] = $path;
        }

        User::where('id', $id)->update($data);

        return redirect()->route('user.home')->with('message', 'Profile updated successfully.');
    }
}


