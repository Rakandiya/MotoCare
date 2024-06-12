<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\JenisLayanan;
use Inertia\Inertia;
use Symfony\Component\HttpFoundation\Response;

class JenisLayananController extends Controller
{
    public function index()
    {
        $jenisLayanans = JenisLayanan::all();

        // dd($jenisLayanans);
        return Inertia::render('Admin/ManajemenJenisLayanan', compact('jenisLayanans'));
    }

    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'jenis_layanan' => 'required|max:255',
            'harga' => 'required|numeric',
        ]);

        

    // var_dump($validatedData);
    // die;

    // $slug = Str::slug($validatedData['judul']);
    $jenisLayanan = JenisLayanan::create([
        'jenis_layanan' => $validatedData['jenis_layanan'],
        'harga' => $validatedData['harga'],
    ]);

    return redirect()->back();
    }

    public function update(Request $request, JenisLayanan $jenisLayanan)
    {
        $validatedData = $request->validate([
            'jenis_layanan' => 'required|max:255',
            'harga' => 'required',
        ]);

        $jenisLayanan->update([
            'jenis_layanan' => $validatedData['jenis_layanan'],
            'harga' => $validatedData['harga'],
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(JenisLayanan $jenisLayanan)
    {
        $jenisLayanan->delete();
        return redirect()->back();
    }
}
