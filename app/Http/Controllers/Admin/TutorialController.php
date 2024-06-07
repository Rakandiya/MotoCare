<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Tutorial;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Str;

class TutorialController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $tutorials = Tutorial::all();   
        return Inertia::render('Admin/ManajemenTutorial', compact('tutorials'));
    }

    /**
     * Show the form for creating a new resource.
     */
    public function create()
    {
        //
    }

    /**
     * Store a newly created resource in storage.
     */
    public function store(Request $request)
    {
        $validatedData = $request->validate([
            'judul' => 'required|max:255',
            'deskripsi' => 'required',
            'link' => 'required|url'
        ]);

        

    // var_dump($validatedData);
    // die;

    // $slug = Str::slug($validatedData['judul']);
    $tutorial = Tutorial::create([
        'judul' => $validatedData['judul'],
        'slug' => Str::slug($validatedData['judul']),
        'deskripsi' => $validatedData['deskripsi'],
        'link' => $validatedData['link'],
    ]);

    return redirect()->back();
    }

    /**
     * Display the specified resource.
     */
    public function show(Tutorial $tutorial)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Tutorial $tutorial)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Tutorial $tutorial)
    {
        $validatedData = $request->validate([
            'judul' => 'required|max:255',
            'deskripsi' => 'required',
            'link' => 'required|url'
        ]);

        $tutorial->update([
            'judul' => $validatedData['judul'],
            'deskripsi' => $validatedData['deskripsi'],
            'link' => $validatedData['link'],
        ]);

        return redirect()->back();
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Tutorial $tutorial)
    {
        $tutorial->delete();
        return redirect()->back();
    }
}
