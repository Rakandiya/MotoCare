<?php

namespace App\Http\Controllers\User;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Illuminate\Support\Facades\DB;

class HomeController extends Controller
{
    //

    public function index() {
        $results = DB::select("
            SELECT 
                ranking_query.user_id,
                users.nama,
                users.foto,
                ranking_query.total_booking,
                DENSE_RANK() OVER (ORDER BY ranking_query.total_booking DESC) AS rank
            FROM (
                SELECT 
                    user_id,
                    COUNT(*) AS total_booking
                FROM 
                    bookings
                GROUP BY 
                    user_id
            ) AS ranking_query
            JOIN users ON users.id = ranking_query.user_id
            ORDER BY ranking_query.total_booking DESC
            LIMIT 5
        ");

        return Inertia::render('User/Home', compact('results'));
    }
}
