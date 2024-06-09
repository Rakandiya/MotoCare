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
        $oneStar = Ulasan::where('rating', 1)->count();
        $twoStar = Ulasan::where('rating', 2)->count();
        $threeStar = Ulasan::where('rating', 3)->count();
        $fourStar = Ulasan::where('rating', 4)->count();
        $fiveStar = Ulasan::where('rating', 5)->count();
        $totalUlasan = Ulasan::count();
        $ulasans = Ulasan::with(['fotoUlasans', 'user'])->get();
        // dd($ulasans);
        return Inertia::render('User/Ulasan', compact('ulasans', 'oneStar', 'twoStar', 'threeStar', 'fourStar', 'fiveStar', 'totalUlasan'));
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

        
        $validator = $request->validate([
            'jenis_layanan' => 'required|string|max:255',
            'rating' => 'required|numeric|min:1|max:5',
            'review' => 'required|string',
            'foto' => 'nullable|array',
            'foto.*' => 'nullable|mimetypes:image/jpeg,image/png,image/jpg,image/webp',
        ]);

        
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

            return to_route('user.ulasan');



            // return redirect()->back()->with([
            //     'ulasans' => Ulasan::with(['fotoUlasans', 'user'])->get(),
            // ]);

            
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
