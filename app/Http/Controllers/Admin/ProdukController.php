<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Produk;
use Illuminate\Http\Request;
use Inertia\Inertia;

class ProdukController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $produks = Produk::all();
        return Inertia::render("Admin/ManajemenProduk", compact("produks"));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'nama_produk' => 'required|max:255',
            'harga' => 'required|numeric',
            'stok' => 'required|numeric',
            'deskripsi' => 'required',
        ]);

        // var_dump($validatedData);
        // die;

        // $slug = Str::slug($validatedData['judul']);
        $produk = Produk::create([
            'nama_produk' => $validatedData['nama_produk'],
            'harga' => $validatedData['harga'],
            'stok' => $validatedData['stok'],
            'deskripsi' => $validatedData['deskripsi'],
        ]);

        return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Produk $produk)
    {
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Produk $produk)
    {
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Produk $produk)
    {
        $validatedData = $request->validate([
            'nama_produk' => 'required|max:255',
            'harga' => 'required|numeric',
            'stok' => 'required|numeric',
            'deskripsi' => 'required',
        ]);

        // var_dump($validatedData);
        // die;

        // $slug = Str::slug($validatedData['judul']);
        $produk->update([
            'nama_produk' => $validatedData['nama_produk'],
            'harga' => $validatedData['harga'],
            'stok' => $validatedData['stok'],
            'deskripsi' => $validatedData['deskripsi'],
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Produk $produk)
    {
        $produk->delete();
        return redirect()->back();
    }
}
