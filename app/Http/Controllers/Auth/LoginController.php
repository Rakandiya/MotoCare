<?php
namespace App\Http\Controllers\Auth;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Validator;

class LoginController extends Controller
{
    public function login(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'email' => 'required|email',
            'password' => 'required|string|min:8',
        ]);

        if ($validator->fails()) {
            return response()->json($validator->errors(), 422);
        }

        $credentials = $request->only('email', 'password');

        if (Auth::attempt($credentials)) {
            $request->session()->regenerate();
            $user = Auth::user();

            if($user->role == 'admin') {
                return redirect(route('admin.dashboard'));
            }else{
                return redirect(route('user.home'));
            }
        }


        return response()->json(['message' => 'Invalid credentials'], 401);
    }

    public function logout(Request $request) {
        Auth::logout();
        return redirect('/');
    }
}
