<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use App\Models\Katalog;
use Inertia\Inertia;

class KatalogController extends Controller
{
    public function index()
    {
        $katalogs = Katalog::all();
        return Inertia::render('User/Katalog', ['katalogs' => $katalogs]);
    }
}
