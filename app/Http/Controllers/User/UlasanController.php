<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use App\Models\Ulasan;
use App\Models\FotoUlasan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Validator;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Storage;

class UlasanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ulasans = Ulasan::with(['fotoUlasans', 'user'])->get();
        // dd($ulasans);
        return Inertia::render('User/Ulasan', compact('ulasans'));
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

        
        $validator = Validator::make($request->all(), [
            'jenis_layanan' => 'required|string|max:255',
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'required|string',
            'foto' => 'array',
            'foto.*' => 'mimetypes:image/jpeg,image/png',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }



        
        try {
            $ulasan = Ulasan::create([
                'user_id' => Auth::user()->id,
                'jenis_layanan' => $request->jenis_layanan,
                'rating' => $request->rating,
                'review' => $request->review,
            ]);

            
            if(count($request->foto) > 0) {

                foreach ($request->foto as $key => $value) {
                    $path = $value->store('images/ulasan', 'public');
                    
                    FotoUlasan::create([
                        'ulasan_id' => $ulasan->id,
                        'foto' => $path
                    ]);
                }
            }



            return redirect()->back()->with([
                'message' => 'Ulasan created successfully',
            ]);

            
        } catch (\Exception $e) {
            \Log::error($e);
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }

    /**
     * Display the specified resource.
     */
    public function show(Ulasan $ulasan)
    {
        //
    }

    /**
     * Show the form for editing the specified resource.
     */
    public function edit(Ulasan $ulasan)
    {
        //
    }

    /**
     * Update the specified resource in storage.
     */
    public function update(Request $request, Ulasan $ulasan)
    {
        //
    }

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ulasan $ulasan)
    {
        //
    }
}
