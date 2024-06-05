<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use App\Models\User;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Facades\Validator;

use Inertia\Inertia;

class RegisterController extends Controller
{
    public function register(Request $request)
    {
        \Log::info($request->all()); // Tambahkan log ini untuk memastikan data yang diterima

        $validator = Validator::make($request->all(), [
            'username' => 'required|string|max:255',
            'email' => 'required|string|email|max:255|unique:users',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        
        try {
            $user = User::create([
                'username' => $request->username,
                'email' => $request->email,
                'password' => Hash::make($request->password),
            ]);

            return Inertia::render('User/Register', [
                'message' => 'User registered successfully',
                'user' => $user
            ]);
        } catch (\Exception $e) {
            \Log::error($e);
            return response()->json(['message' => $e->getMessage()], 500);
        }
    }
}


