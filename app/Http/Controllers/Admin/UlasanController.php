<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Models\Ulasan;
use App\models\FotoUlasan;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\Storage;

class UlasanController extends Controller
{
    /**
     * Display a listing of the resource.
     */
    public function index()
    {
        $ulasans = Ulasan::with(['fotoUlasans', 'user'])->get();

        
        return Inertia::render('Admin/Ulasan', compact('ulasans'));
    }

   

    /**
     * Remove the specified resource from storage.
     */
    public function destroy(Ulasan $ulasan)
    {
        if ($ulasan->fotoUlasans) {
            foreach ($ulasan->fotoUlasans as $foto) {
                Storage::disk('public')->delete($foto->foto);
            }
        }

        FotoUlasan::where('ulasan_id', $ulasan->id)->delete();
        $ulasan->delete();
        return redirect()->back();
    }
}
